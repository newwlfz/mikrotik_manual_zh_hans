---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/log"
title: "日志"
sidebar_label: "日志"
description: "RouterOS 在主题中记录系统事件；/system/logging 中的规则会将这些事件发送到内存、磁盘、控制台、syslog 服务器（UDP、TCP 或 TLS；syslog 或 CEF 格式）、电子邮件或脚本。使用 /log/print 读取日志。"
tags:
  - 'logging'
  - 'syslog'
  - 'system-management'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/log
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 会把事件写入系统日志：登录和登录失败、配置更改以及更改者、接口 up 和 down、DHCP 租约、协议状态变化和错误。每条条目都有时间、一个或多个主题（说明它来自哪里以及有多重要，例如 `dhcp,info` 或 `system,error,critical`）和一条消息。

两个菜单决定保留什么以及发送到哪里：

- `/system/logging` 中的规则按主题选择条目，并将它们传递给动作。
- `/system/logging/action` 中的动作将条目存储在内存或磁盘上的文件中，打印到控制台，发送到 syslog 服务器或通过电子邮件发送，或运行脚本。

默认配置有四条规则：

| 主题 | 动作 | 结果 |
| :-- | :-- | :-- |
| `info` | `memory` | 保存在 RAM 中。 |
| `error` | `memory` | 保存在 RAM 中。 |
| `warning` | `memory` | 保存在 RAM 中。 |
| `critical` | `echo` | 打印到已打开的终端；当没有终端打开时，在下次登录时打印。 |

`memory` 动作保留最新的 1000 条条目，路由器重启时这些条目会丢失。默认不记录调试消息。要在重启后保留日志，请记录到磁盘或 syslog 服务器。

如需视频介绍，请参见 [日志记录基础](https://www.youtube.com/watch?v=E-QAhaWtsnU)。

## 读取日志 {#read-the-log}

`/log/print` 显示内存中保留的条目，最旧的在前。用 `where` 过滤它们：`topics~` 针对主题匹配模式，`message~` 针对消息文本匹配。

```ros
[admin@MikroTik] > /log/print where topics~"interface|dhcp"
 2026-10-02 17:34:34 interface,info lo link up
 2026-10-02 17:34:42 interface,info ether2 link up (speed 1G, full duplex)
 2026-10-02 17:34:47 dhcp,info bridge on bridge got IP address 192.168.88.36
```

要实时查看新到达的条目，请添加 `follow`（先打印现有条目）或 `follow-only`（仅新条目）。按 <kbd>Space</kbd> 打印分隔线，按 <kbd>Control</kbd>+<kbd>C</kbd> 停止。例如，要监视失败的登录：

```ros
[admin@MikroTik] > /log/print follow-only where topics~"critical"
 = = =   = = =   = = =      = = =   = = =   = = =      = = =   = = =   = = =
2026-10-02 17:35:45 system,error,critical login failure for user admin from 192.168.88.17 via ssh
2026-10-02 17:35:45 system,error,critical login failure for user root from 192.168.88.17 via ssh
-- Ctrl-C to quit. Space prints separator. New entries will appear at bottom.
```

登录和防火墙条目带有额外字段，例如用户、服务和源地址。`with-extra-info` 会将它们添加到该行：

```ros
[admin@MikroTik] > /log/print with-extra-info where message~"login failure"
 2026-10-02 17:35:45 system,error,critical login failure for user admin from 192.168.88.17 via ssh app=ssh duser=admin outcome=failure src=192.168.88.17
 2026-10-02 17:35:45 system,error,critical login failure for user root from 192.168.88.17 via ssh app=ssh duser=root outcome=failure src=192.168.88.17
```

`/log/print` 还会列出其他 memory 动作的缓冲区以及 disk 动作的最新条目，因此一个由多个动作存储的条目会按动作分别显示一次。添加 `where buffer=memory` 可只查看默认缓冲区。

要将打印的条目保存到文件，请添加 `file=`：`/log/print file=log-before-upgrade` 会写入 `log-before-upgrade.txt`。

### 查找某个时间发生了什么 {#find-what-happened-at-a-certain-time}

将 `time` 与日期和时间比较，可查看某个时间段（例如一夜）的条目：

```ros
/log/print where time>"2026-10-02 01:00:00" and time<"2026-10-02 06:00:00"
```

上行链路丢失通常表现为 WAN 接口的 `interface,info ether1 link down` 和 `link up` 条目，以及 DHCP 客户端或 PPP 条目。当上行链路保持 up 但提供商停止转发流量时，不会记录任何内容；请使用 [网络监控](../netwatch.md) 记录此类中断。默认缓冲区的 1000 条条目能回溯多久取决于路由器记录了多少日志。要保留更多，请记录到磁盘或 syslog 服务器。

### 查明谁更改了配置 {#find-out-who-changed-the-configuration}

每次配置更改都会记录主题 `system,info`、更改者（用户以及该用户如何连接，或调度器条目）和命令：

```ros
[admin@MikroTik] > /log/print where topics~"system" and message~" by "
 2026-10-02 17:33:27 system,info static dns entry added by scheduler:add-nas-dns (*2 = /ip dns static add address=192.168.88.20 name=nas.lan)
```

### 写入自己的条目 {#write-your-own-entries}

脚本使用 `:log info`、`:log warning`、`:log error` 和 `:log debug` 写入日志。在命令行上，`/log/info`、`/log/warning`、`/log/error` 和 `/log/debug` 作用相同。这些条目会获得主题 `script,info`、`script,warning` 等。参见 [脚本](../../developer-guides/scripting/index.md)。

## 为某个功能记录调试消息 {#log-debug-messages-for-one-feature}

许多功能会写入调试消息，只有在规则选择它们时才会记录。要对某个功能进行故障排除，请将其 `debug` 消息记录到单独的内存缓冲区，以免它们将其他条目挤出默认缓冲区。例如，当客户端无法从 DHCP 服务器获取地址时：

```ros
/system/logging/action/add name=dhcpdebug target=memory \
    memory-lines=2000
/system/logging/add topics=dhcp,debug action=dhcpdebug
```

读取缓冲区，并在测试之间清空它：

```ros
/log/print where buffer=dhcpdebug
/system/logging/action/clear action=dhcpdebug
```

规则只匹配拥有其全部主题的条目，因此 `topics=dhcp,debug` 只选择 DHCP 调试消息，不选择其他内容。要排除某些功能添加的数据包转储，请用 `!` 排除主题，例如 `topics=ntp,debug,!packet`。

完成后，将缓冲区保存到文件，然后删除规则和动作。删除规则会清空缓冲区：

```ros
/log/print where buffer=dhcpdebug file=dhcp-debug
/system/logging/remove [find action=dhcpdebug]
/system/logging/action/remove dhcpdebug
```

:::warning
调试消息可能包含机密。例如，`ssh,debug` 会记录会话加密密钥，`ssh,debug,packet` 会记录会话内容。请将调试消息保存在本地缓冲区中，不要将它们发送到 syslog 服务器或通过电子邮件发送。
:::

## 重启后保留日志 {#keep-the-log-across-reboots}

默认的 `disk` 动作写入路由器存储上的文件。为每个要保留的主题添加规则：

```ros
/system/logging/add topics=info action=disk
/system/logging/add topics=warning action=disk
/system/logging/add topics=error action=disk
/system/logging/add topics=critical action=disk
```

该动作会写入 `log.0.txt`，直到它包含 `disk-lines-per-file` 行（默认 1000）。然后该文件被重命名为 `log.1.txt`，并开始新的 `log.0.txt`。该动作保留 `disk-file-count` 个文件（默认 2），并删除最旧的文件。这些文件位于 `/file`：

```ros
[admin@MikroTik] > /file/print where name~"^log"
Columns: NAME, TYPE, SIZE, LAST-MODIFIED
# NAME       TYPE       SIZE  LAST-MODIFIED
0 log.0.txt  .txt file  1956  2026-10-02 17:32:13
```

最新条目也会显示在 `/log/print` 中该动作的名称下，因此每个条目会在那里显示两次；添加 `where buffer=memory` 或 `where buffer=disk`。重启后，当前文件中的条目会再次显示在 `buffer=disk` 下。要读取较旧的文件，请打印其内容，或从 `/file` 下载它：

```ros
:put [/file/get log.1.txt contents]
```

要保留更多历史记录，请提高这两个值。要写入 USB 驱动器或其他磁盘，请将磁盘的文件夹放在文件名前面；该文件夹必须存在：

```ros
/system/logging/action/set disk disk-file-name=usb1/log \
    disk-lines-per-file=5000 disk-file-count=5
```

要限制对内部闪存的写入，请仅将所需的主题记录到磁盘，或使用外部磁盘。

## 将日志发送到 syslog 服务器 {#send-the-log-to-a-syslog-server}

默认的 `remote` 动作通过 UDP 端口 514 将条目发送到 syslog 服务器。它没有服务器地址（`remote=0.0.0.0`），也没有默认规则使用它。设置服务器和格式，并为每个主题添加规则：

```ros
/system/logging/action/set remote remote=192.0.2.10 \
    remote-log-format=syslog
/system/logging/add topics=info action=remote
/system/logging/add topics=warning action=remote
/system/logging/add topics=error action=remote
/system/logging/add topics=critical action=remote
```

使用单独的规则：一条 `topics=info,warning,error` 的规则只匹配同时具有这三个主题的条目，而这样的条目不存在。要仅发送登录和注销，请使用 `topics=account`；失败的登录具有主题 `system,error,critical`，因此它们会随 `error` 或 `critical` 发送。

要检查服务器是否收到条目，请自行写入一条：

```ros
/log/warning "syslog test"
```

`remote-log-format` 选择服务器接收的内容（示例见“技术细节”）：

- `default` - 主题和消息，不包含时间和主机名。
- `syslog` - BSD syslog（RFC 3164），正如大多数 syslog 服务器通过 UDP 所期望的：优先级、时间和路由器的身份（`/system/identity`）位于消息之前。facility 为 `daemon`，severity 来自主题；设置 `syslog-facility` 和 `syslog-severity` 可更改它们。不发送主题；设置 `add-topics-string=yes` 可将它们添加到消息之前，以便服务器能够区分，例如 DHCP 和防火墙条目。不支持 RFC 5424。
- `cef` - Common Event Format，用于安全信息和事件管理（SIEM）系统：登录和防火墙条目的额外字段（用户、服务、地址、接口）会变成 CEF 字段。

BSD 时间没有年份和时区，因此服务器采用自己的时区。当路由器和服务器位于不同时区时，设置 `syslog-time-format=iso8601`（`cef` 也会使用它），并使用 [NTP](../../system-information-and-utilities/ntp.md) 保持路由器时钟正确。

通过 UDP 时，服务器不可达期间条目会丢失。使用 `remote-protocol=tcp` 或 `tls` 时，路由器会在连接断开期间在内存中为所有 remote 动作一起保留最多 1000 条条目，并在连接恢复后发送它们；当缓冲区已满时，较新的条目会被丢弃，且缓冲区会在重启时丢失。通过 TCP 和 TLS 时，请使用 `remote-log-format=cef`：CEF 条目以分隔符（`cef-event-delimiter`）结尾，而 `default` 和 `syslog` 条目在流中彼此相连且没有分隔符，因此大多数服务器无法判断一个条目在哪里结束。

使用 `src-address` 选择源地址，当服务器可通过 [VRF](../../user-guides/routing-and-networking-protocols/vrf.md) 访问时使用 `vrf`。

以下指南设置 Elasticsearch 以接收和分析 RouterOS 日志：

<DocCardList />

### 通过 TLS 发送日志 {#send-the-log-over-tls}

要加密日志，请使用 `remote-protocol=tls`。要检查服务器证书，请导入签署该证书的 CA 的证书，并设置 `check-certificate=yes`。如果没有 `check-certificate=yes`，路由器会加密连接但接受任何证书：

```ros
/certificate/import file-name=syslog-ca.pem name=syslog-ca \
    passphrase="" trusted=yes
/system/logging/action/add name=siem target=remote remote=192.0.2.10 \
    remote-port=6514 remote-protocol=tls remote-log-format=cef \
    check-certificate=yes
/system/logging/add topics=info action=siem
/system/logging/add topics=warning action=siem
/system/logging/add topics=error action=siem
/system/logging/add topics=critical action=siem
```

当无法验证证书时，路由器不发送任何内容，会重试，并记录一条以 `ssl: no trusted CA certificate found` 结尾的 `ssld,error` 条目。

`check-certificate=yes` 会检查服务器证书是否由受信任的证书签署。它不会比较证书中的名称与服务器地址，因此来自任何受信任 CA 的证书都会通过：只信任你的日志服务器的 CA，或导入服务器自己的证书。路由器不会提供客户端证书。

发送到相同服务器地址和端口的动作共享一个连接。请为它们设置相同的 `remote-protocol` 和 `check-certificate`。

## 通过电子邮件发送日志消息 {#email-log-messages}

`email` 目标会为每个条目发送一封电子邮件，主题和正文分别是主题和消息。它使用 `/tool/e-mail` 的服务器、端口、TLS 模式和发件人，因此请先配置该项（参见 [电子邮件](../../system-information-and-utilities/e-mail.md)）。例如，要为每个 critical 条目（例如登录失败、看门狗重启或时钟校正）收到电子邮件：

```ros
/system/logging/action/add name=mail target=email \
    email-to=admin@example.com
/system/logging/add topics=critical action=mail
```

要仅接收失败登录的电子邮件，请添加消息必须匹配的 `regex`；`^` 表示消息以该文本开头：

```ros
/system/logging/add topics=critical regex="^login failure" action=mail
```

`email-cc` 可添加更多收件人。每封发送的电子邮件都会记录为 `e-mail,info sent <topics message> to: <address>`。请谨慎选择主题：每个条目都会发送一封电子邮件，因此密码猜测攻击会发送数百封。请改用防火墙阻止此类攻击（参见 [SSH 暴力破解防护](../../firewall-and-quality-of-service/user-guides/bruteforce-prevention.md)）。

## 在日志消息上运行脚本 {#run-a-script-on-a-log-message}

`script` 目标会针对其规则匹配的条目运行 `/system/script` 中的脚本。脚本通过两个变量获取条目：`$topics`（例如 `system,error,critical`）和 `$message`。在脚本仍在运行时匹配的条目会被跳过，脚本自身记录的条目不会再次启动它。

例如，要针对任何服务（SSH、WinBox、WebFig、API）将失败登录的源地址收集到地址列表中。地址在其最后一次失败登录后会在列表中保留一天：

```ros
/system/script/add name=login-failure source={
    :local at [:find $message " from "]
    :while ([:typeof [:find $message " from " $at]] = "num") do={
        :set at [:find $message " from " $at]
    }
    :local ip [:pick $message ($at + 6) [:find $message " via " $at]]
    /ip/firewall/address-list/remove [find list=login-fail address=$ip]
    /ip/firewall/address-list/add list=login-fail address=$ip timeout=1d
}
/system/logging/action/add name=loginfailure target=script \
    script=login-failure
/system/logging/add topics=critical regex="^login failure" \
    action=loginfailure
```

规则的 `regex` 将脚本限制为诸如 `login failure for user admin from 192.168.88.17 via ssh` 的条目。消息中的用户名来自客户端，可能包含空格和单词 `from`，因此脚本取最后一个 ` from ` 之后的地址，该地址由路由器自己写入。该列表本身不执行任何操作：请在防火墙规则中使用它（参见 [地址列表](../../firewall-and-quality-of-service/firewall/address-lists.md)），并豁免你自己的管理地址，以免输错密码将你锁定在外。

## 规则如何匹配条目 {#how-rules-match-entries}

当以下所有条件都成立时，规则会将条目传递给其动作：

- 条目拥有 `topics` 中列出的每个主题，并且不包含用 `!` 列出的任何主题。`topics=script,warning` 匹配 `script,warning` 条目，而不是每个 `script` 条目和每个 `warning` 条目。
- 当规则包含 `regex` 时，消息与它匹配。正则表达式还会看到消息之后的条目的额外字段，因此 `$` 不会匹配登录条目消息的结尾。
- 规则已启用。

没有 `topics` 的规则会匹配每个条目，包括调试消息。

每条匹配的规则都会传递自己的副本，因此一个条目可以同时进入内存、磁盘和 syslog 服务器。当两条规则将同一条目传递给同一个动作时，该动作只存储一次。

`prefix` 会为该规则的动作在消息前添加文本：`prefix=core1` 会存储和发送 `core1: <message>`。可用它在共享 syslog 服务器上区分路由器。

当你更改或禁用使用 memory 动作的唯一规则时，该动作的缓冲区会被清空。更改动作本身，或使用该动作的多条规则中的一条，会保留条目。

## 主题 {#topics}

每个条目都有一个或多个主题。通常一个主题命名写入该条目的功能，一个主题给出其重要性，某些功能还会添加更多主题。失败登录具有主题 `system,error,critical`；SSH 调试消息具有 `ssh,debug`，其数据包转储具有 `ssh,debug,packet`。

### 重要性主题 {#importance-topics}

| 主题 | 条目 |
| :-- | :-- |
| `critical` | 需要关注的事件，例如登录失败、看门狗重启和时钟校正。默认规则会将它们打印到控制台。 |
| `error` | 错误。 |
| `warning` | 警告。 |
| `info` | 信息性条目，例如登录、配置更改和链路状态变化。 |
| `debug` | 用于故障排除的详细消息，仅在规则要求时记录。 |
| `packet` | 已发送或接收的数据包内容（已解码）。 |
| `raw` | 原始内容，例如十六进制形式的数据包，或与 LTE 调制解调器交换的 AT 命令。 |

### 功能主题 {#feature-topics}

| 主题 | 条目 |
| :-- | :-- |
| `account` | 用户的登录和注销。 |
| `acme-client` | 获取证书的 ACME 客户端。 |
| `async` | LTE 调制解调器的命令通道。 |
| `backup` | 备份创建。 |
| `bfd` | BFD. |
| `bgp` | BGP. |
| `bridge` | 网桥。 |
| `calc` | 路由计算。 |
| `caps` | CAPsMAN 和 CAP。 |
| `certificate` | 证书。 |
| `clock` | 时钟变更，例如由 NTP 或 IP Cloud 触发。 |
| `container` | 容器。 |
| `ddns` | 动态 DNS。 |
| `dhcp` | DHCP 客户端、服务器和中继。 |
| `discover` | 邻居发现。 |
| `disk` | 磁盘。 |
| `dns` | DNS. |
| `dot1x` | 802.1X 认证。 |
| `dude` | The Dude. |
| `e-mail` | 电子邮件工具（`/tool/e-mail`）。 |
| `event` | 事件，例如已安装到路由表中的路由或来自 LTE 调制解调器的消息。 |
| `evpn` | EVPN. |
| `fetch` | fetch 工具。 |
| `firewall` | 防火墙规则，使用 `action=log` 或 `log=yes`，并带有其 `log-prefix`。 |
| `gps` | GPS. |
| `gsm` | GSM 调制解调器和 SMS 工具。 |
| `health` | 健康监控（电压、温度、风扇）。 |
| `hotspot` | HotSpot. |
| `igmp-proxy` | IGMP 代理。 |
| `interface` | 接口，例如链路启用和链路断开。 |
| `ipsec` | IPsec. |
| `iscsi` | iSCSI. |
| `isis` | IS-IS. |
| `kvm` | 虚拟机（KVM）。 |
| `l2tp` | L2TP 客户端和服务器。 |
| `ldp` | LDP. |
| `lora` | LoRa. |
| `lte` | LTE 和 5G 调制解调器。 |
| `manager` | User Manager. |
| `mpls` | MPLS. |
| `mqtt` | MQTT. |
| `mvrp` | MVRP. |
| `natpmp` | NAT-PMP. |
| `netwatch` | Netwatch. |
| `ntp` | NTP 客户端和服务器。 |
| `ospf` | OSPF. |
| `ovpn` | OpenVPN. |
| `pim` | PIM-SM. |
| `poe-in` | PoE-In 事件，例如当设备自身通过 PoE 供电时的 LLDP 功率协商。 |
| `poe-out` | PoE 输出。 |
| `pon` | PON SFP 模块。 |
| `ppp` | PPP. |
| `pppoe` | PPPoE 客户端和服务器。 |
| `pptp` | PPTP 客户端和服务器。 |
| `ptp` | 精确时间协议。 |
| `queue` | 队列。 |
| `radius` | RADIUS 客户端。 |
| `radvd` | IPv6 路由器通告。 |
| `rip` | RIP. |
| `route` | 路由。 |
| `rpki` | RPKI. |
| `rproxy` | 反向代理。 |
| `rsvp` | RSVP. |
| `script` | 脚本（`:log`）以及 `/log/info` 及相关命令。 |
| `sertcp` | 串口远程访问（`/port/remote-access`）。 |
| `smb` | SMB 服务器。 |
| `snmp` | SNMP. |
| `socksify` | Socksify. |
| `ssh` | SSH 服务器和客户端。 |
| `ssld` | RouterOS 功能的 TLS 连接，例如无法验证的服务器证书。 |
| `sstp` | SSTP 客户端和服务器。 |
| `stp` | 生成树。 |
| `system` | 系统消息，例如重启和配置变更。 |
| `tftp` | TFTP 服务器。 |
| `timer` | 定时器，例如 BGP keepalive 定时器。 |
| `tr069` | TR-069 客户端。 |
| `update` | 软件包更新。 |
| `upnp` | UPnP. |
| `ups` | UPS 监控。 |
| `vpls` | VPLS. |
| `vrrp` | VRRP. |
| `watchdog` | 看门狗。 |
| `web-proxy` | Web 代理。 |
| `wiliot` | Wiliot. |
| `wireguard` | WireGuard. |
| `wireless` | 无线接口。 |
| `zerotier` | ZeroTier. |

路由器还会列出主题 `amt`、`isdn`、`mme`、`read`、`simulator`、`state`、`store`、`telephony` 和 `write`，以及在 `option` 软件包中的 `netinstall`。

## 故障排除 {#troubleshoot}

| 问题 | 原因和解决方法 |
| :-- | :-- |
| syslog 服务器未收到任何内容。 | 默认的 `remote` 动作具有 `remote=0.0.0.0`；请设置服务器地址。检查是否有规则将条目传递给该动作：具有多个主题的规则需要所有这些主题。检查路由器从 `src-address` 并在 `vrf` 中能够到达服务器，并且服务器接受该协议和端口。 |
| TLS 日志未发送任何内容。 | 查找 `ssld,error` 条目。`no trusted CA certificate found` 表示服务器的 CA 证书未导入或不受信任。 |
| 服务器将多个条目显示为一个。 | 通过 TCP 和 TLS 时，`default` 和 `syslog` 条目没有分隔符；请使用 `remote-log-format=cef`。 |
| 条目在 `/log/print` 中显示多次。 | 多个动作存储了它们；用 `where buffer=memory` 过滤。 |
| 重启后日志为空。 | memory 动作在重启后不会保留；请记录到磁盘或 syslog 服务器。 |
| 某个 memory 缓冲区自行清空了。 | 使用它的唯一规则被更改或禁用了。 |
| `bad disk file name` | `disk-file-name` 中的文件夹不存在。 |
| `action name can contain only letters and numbers` | 动作名称不能包含 `-`、`_` 或其他字符。 |

## 技术细节 {#technical-details}

### 消息格式 {#message-formats}

同一条登录失败，在每种 `remote-log-format` 下服务器接收到的内容（使用 `syslog-time-format=bsd-syslog` 和身份 `MikroTik`）：

```text
system,error,critical login failure for user guest from 192.168.88.17 via ssh
<27>Oct  2 17:36:35 MikroTik login failure for user guest from 192.168.88.17 via ssh
Oct  2 17:36:35 MikroTik CEF:0|MikroTik|hAP ax^2|7.25beta5|10|system,error,critical|High|dvchost=MikroTik dvc=192.168.88.36 msg=login failure for user guest from 192.168.88.17 via ssh app=ssh duser=guest outcome=failure src=192.168.88.17
```

- `syslog` 格式不携带 tag 字段；消息跟在身份之后。
- 使用 `syslog-severity=auto` 时，severity 来自主题：`debug` 7、`info` 6、`warning` 4、`error` 3。同时具有 `error` 和 `critical` 的条目（如示例中所示）会得到 3，因此针对 severity `crit` 的服务器过滤器会漏掉登录失败。优先级是 facility 乘以 8 加上 severity：`daemon`（3）和 `error`（3）得到 `<27>`。
- CEF 头包含板名、RouterOS 版本、事件类编号、主题和 severity（`info` 和 `debug` 为 `Low`，`warning` 为 `Medium`，`error` 为 `High`）。`dvchost` 是身份，`dvc` 是路由器的一个地址，`msg` 是消息，随后是条目的额外字段。防火墙条目携带链、日志前缀、接口、地址和协议。值中的 `=` 和 `\` 会转义为 `\=` 和 `\\`。每条 CEF 消息以 `cef-event-delimiter` 结尾（默认 `\r\n`）。

### TCP 和 TLS {#tcp-and-tls}

- UDP 为每个条目发送一个数据报。TCP 和 TLS 为每个服务器地址和端口保持一个连接，由所有发送到那里的动作共享。
- 当 TCP 或 TLS 服务器不可达时，路由器会在一个缓冲区中为所有 remote 动作保留条目，并重试连接。该缓冲区会在重启时丢失。
- 当服务器不可达时，最多 1000 条条目会在内存中等待；当缓冲区已满时，较新的条目会被丢弃。
- CEF 消息以分隔符结尾；`default` 和 `syslog` 消息在流中彼此相连且没有分隔符。
- `check-certificate=yes` 会根据 `/certificate` 中的受信任证书检查服务器证书，而不是检查其中的名称。路由器提供 TLS 1.2。

### 磁盘文件 {#disk-files}

文件中的每一行都以自己格式的日期开头，`Oct/02/2026 16:49:36`，随后是主题和消息。`/system/logging/action/clear` 仅清空 memory 动作；对 disk 动作，它会失败并显示 `cleanup not supported on this target`。

有关所有参数，请参见 [`/system/logging`](../../cli-reference/system/logging/index.md) 和 [`/system/logging/action`](../../cli-reference/system/logging/action/index.md) CLI 参考，以及 [`/log`](../../cli-reference/log.md) 中的条目。
