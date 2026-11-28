---
title: "日志"
description: "RouterOS 按主题记录系统事件；`/system/logging` 中的规则会将日志发送到内存、磁盘、控制台、syslog 服务器（UDP、TCP 或 TLS；syslog 或 CEF 格式）、电子邮件或脚本。使用 `/log/print` 查看日志。"
tags:
  - 'logging'
  - 'syslog'
  - 'system-management'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/log
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 将事件写入系统日志：登录和登录失败、配置更改及执行者、接口状态变化、DHCP 租约、协议状态变化和错误。每条记录都包含时间、一个或多个主题（用于说明来源和重要性，例如 `dhcp,info` 或 `system,error,critical`）以及消息。

两个菜单决定保留哪些内容以及将其发送到何处：

- `/system/logging` 中的规则按主题选择记录，并将其传递给 action。
- `/system/logging/action` 中的 action 将记录存储在内存或磁盘上的文件中、打印到控制台、发送到 syslog 服务器或通过电子邮件发送，或运行脚本。

默认配置包含四条规则：

| Topics | Action | Result |
| :-- | :-- | :-- |
| `info` | `memory` | 保留在 RAM 中。 |
| `error` | `memory` | 保留在 RAM 中。 |
| `warning` | `memory` | 保留在 RAM 中。 |
| `critical` | `echo` | 打印到已打开的终端；如果没有打开的终端，则在下次登录时打印。 |

`memory` action 保留最新的 1000 条记录，路由器重启后这些记录会丢失。默认情况下不记录调试消息。要在重启后保留日志，请将日志记录到磁盘或 syslog 服务器。

视频介绍请参阅 [Logging basics](https://www.youtube.com/watch?v=E-QAhaWtsnU)。

## 读取日志 {#read-the-log}

`/log/print` 显示保存在内存中的条目，最早的记录在前。使用 `where` 过滤：`topics~` 按模式匹配主题，`message~` 匹配消息文本。

```ros
[admin@MikroTik] > /log/print where topics~"interface|dhcp"
 2026-10-02 17:34:34 interface,info lo link up
 2026-10-02 17:34:42 interface,info ether2 link up (speed 1G, full duplex)
 2026-10-02 17:34:47 dhcp,info bridge on bridge got IP address 192.168.88.36
```

要实时查看新条目，添加 `follow`（先打印现有条目）或 `follow-only`（仅打印新条目）。按 <kbd>Space</kbd> 打印分隔线，按 <kbd>Control</kbd>+<kbd>C</kbd> 停止。例如，查看登录失败记录：

```ros
[admin@MikroTik] > /log/print follow-only where topics~"critical"
 = = =   = = =   = = =      = = =   = = =   = = =      = = =   = = =   = = =
2026-10-02 17:35:45 system,error,critical login failure for user admin from 192.168.88.17 via ssh
2026-10-02 17:35:45 system,error,critical login failure for user root from 192.168.88.17 via ssh
-- Ctrl-C to quit. Space prints separator. New entries will appear at bottom.
```

登录和防火墙条目带有额外字段，例如用户、服务和源地址。`with-extra-info` 会将这些字段添加到行中：

```ros
[admin@MikroTik] > /log/print with-extra-info where message~"login failure"
 2026-10-02 17:35:45 system,error,critical login failure for user admin from 192.168.88.17 via ssh app=ssh duser=admin outcome=failure src=192.168.88.17
 2026-10-02 17:35:45 system,error,critical login failure for user root from 192.168.88.17 via ssh app=ssh duser=root outcome=failure src=192.168.88.17
```

`/log/print` 还会列出其他 memory action 的缓冲区以及 disk action 的最新条目，因此被多个 action 存储的条目会按 action 分别显示一次。添加 `where buffer=memory` 可仅查看默认缓冲区。

要将打印的条目保存到文件，添加 `file=`：`/log/print file=log-before-upgrade` 会写入 `log-before-upgrade.txt`。

### 查找特定时间发生的事件 {#find-what-happened-at-a-certain-time}

将 `time` 与日期和时间比较，可查看某个时间段的条目，例如夜间：

```ros
/log/print where time>"2026-10-02 01:00:00" and time<"2026-10-02 06:00:00"
```

上行链路中断通常表现为 WAN 接口的 `interface,info ether1 link down` 和 `link up` 条目，以及 DHCP 客户端或 PPP 条目。当上行链路保持连接但运营商停止转发流量时，不会记录任何日志；使用 [Netwatch](/docs/diagnostics-monitoring-and-troubleshooting/netwatch) 记录此类中断。默认缓冲区中的 1000 条记录能追溯到多久之前，取决于路由器的日志量。要保留更多记录，请将日志记录到磁盘或 syslog 服务器。

### 查找谁更改了配置 {#find-out-who-changed-the-configuration}

每项配置更改都会记录到主题 `system,info`，包括执行者（用户及其连接方式，或 scheduler 条目）以及命令：

```ros
[admin@MikroTik] > /log/print where topics~"system" and message~" by "
 2026-10-02 17:33:27 system,info static dns entry added by scheduler:add-nas-dns (*2 = /ip dns static add address=192.168.88.20 name=nas.lan)
```

### 写入自定义条目 {#write-your-own-entries}

脚本使用 `:log info`、`:log warning`、`:log error` 和 `:log debug` 写入日志。在命令行中，`/log/info`、`/log/warning`、`/log/error` 和 `/log/debug` 的作用相同。这些条目会获得主题 `script,info`、`script,warning` 等。详情请参阅 [Scripting](/docs/developer-guides/scripting)。

## 记录单个功能的调试消息 {#log-debug-messages-for-one-feature}

许多功能会写入调试消息，只有当规则选中这些消息时才会记录。要排查某个功能，请将其 `debug` 消息记录到单独的内存缓冲区，以免将其他条目挤出默认缓冲区。例如，当客户端无法从 DHCP 服务器获取地址时：

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

规则仅匹配包含其所有主题的条目，因此 `topics=dhcp,debug` 只选择 DHCP 调试消息，不选择其他消息。要排除某些功能添加的数据包转储，请使用 `!` 排除主题，例如 `topics=ntp,debug,!packet`。

完成后，将缓冲区保存到文件，然后删除规则和 action。删除规则会清空缓冲区：

```ros
/log/print where buffer=dhcpdebug file=dhcp-debug
/system/logging/remove [find action=dhcpdebug]
/system/logging/action/remove dhcpdebug
```

:::warning
调试消息可能包含机密信息。例如，`ssh,debug` 会记录会话加密密钥，`ssh,debug,packet` 会记录会话内容。请将调试消息保留在本地缓冲区中，不要发送到 syslog 服务器或通过电子邮件发送。
:::

## 跨重启保留日志 {#keep-the-log-across-reboots}

默认 `disk` action 会写入路由器存储上的文件。为每个要保留的 topic 添加一条规则：

```ros
/system/logging/add topics=info action=disk
/system/logging/add topics=warning action=disk
/system/logging/add topics=error action=disk
/system/logging/add topics=critical action=disk
```

该 action 会写入 `log.0.txt`，直到其中包含 `disk-lines-per-file` 行（默认为 1000）。随后该文件会重命名为 `log.1.txt`，并创建新的 `log.0.txt`。该 action 保留 `disk-file-count` 个文件（默认为 2），并删除最旧的文件。这些文件位于 `/file` 中：

```ros
[admin@MikroTik] > /file/print where name~"^log"
Columns: NAME, TYPE, SIZE, LAST-MODIFIED
# NAME       TYPE       SIZE  LAST-MODIFIED
0 log.0.txt  .txt file  1956  2026-10-02 17:32:13
```

最新条目也会显示在 `/log/print` 中，位于 action 名称下，因此每个条目在那里会显示两次；添加 `where buffer=memory` 或 `where buffer=disk`。重启后，当前文件中的条目会再次显示在 `buffer=disk` 下。要读取较旧的文件，请打印其内容，或从 `/file` 下载：

```ros
:put [/file/get log.1.txt contents]
```

要保留更多历史记录，请同时提高这两个值。要写入 USB 驱动器或其他磁盘，请将磁盘文件夹放在文件名前；该文件夹必须存在：

```ros
/system/logging/action/set disk disk-file-name=usb1/log \
    disk-lines-per-file=5000 disk-file-count=5
```

要限制对内部闪存的写入，请仅将需要的 topic 记录到磁盘，或使用外部磁盘。

## 将日志发送到 syslog 服务器 {#send-the-log-to-a-syslog-server}

默认 `remote` 操作通过 UDP 端口 514 将条目发送到 syslog 服务器。它没有服务器地址（`remote=0.0.0.0`），也没有默认规则使用它。设置服务器和格式，并为每个主题添加一条规则：

```ros
/system/logging/action/set remote remote=192.0.2.10 \
    remote-log-format=syslog
/system/logging/add topics=info action=remote
/system/logging/add topics=warning action=remote
/system/logging/add topics=error action=remote
/system/logging/add topics=critical action=remote
```

使用独立规则：一条 `topics=info,warning,error` 规则只匹配同时具有这三个主题的条目，而这样的条目不存在。要仅发送登录和登出，使用 `topics=account`；登录失败具有 `system,error,critical` 主题，因此会随 `error` 或 `critical` 一起发送。

要检查服务器是否收到条目，请自行写入一条：

```ros
/log/warning "syslog test"
```

`remote-log-format` 选择服务器接收的内容（示例见“技术细节”）：

- `default` - 主题和消息，不包含时间和主机名。
- `syslog` - BSD syslog（RFC 3164），大多数 syslog 服务器通过 UDP 接收时都采用该格式：在消息前包含优先级、时间和路由器标识（`/system/identity`）。设施为 `daemon`，严重级别来自主题；设置 `syslog-facility` 和 `syslog-severity` 可更改它们。主题不会被发送；设置 `add-topics-string=yes` 可将主题添加到消息前，使服务器能够区分例如 DHCP 条目和防火墙条目。不支持 RFC 5424。
- `cef` - Common Event Format，用于安全信息和事件管理（SIEM）系统：登录和防火墙条目的额外字段（用户、服务、地址、接口）会转换为 CEF 字段。

BSD 时间不包含年份和时区，因此服务器会采用自身时间。当路由器和服务器位于不同时区时，设置 `syslog-time-format=iso8601`（`cef` 也使用该格式），并通过 [NTP](/docs/system-information-and-utilities/ntp) 保持路由器时钟正确。

通过 UDP 发送时，服务器不可达期间会丢失条目。使用 `remote-protocol=tcp` 或 `tls` 时，连接中断期间路由器会在内存中保留最多 1000 条条目（所有 remote 操作合计），并在连接恢复后发送；缓冲区已满时会丢弃较新的条目，重启后缓冲区会丢失。通过 TCP 和 TLS 发送时，使用 `remote-log-format=cef`：CEF 条目以分隔符结尾（`cef-event-delimiter`），而 `default` 和 `syslog` 条目在流中彼此相连且没有分隔符，因此大多数服务器无法判断一条条目在哪里结束。

使用 `src-address` 选择源地址，当服务器可通过 [VRF](/docs/user-guides/routing-and-networking-protocols/vrf) 访问时使用 `vrf`。

以下指南设置 Elasticsearch 接收和分析 RouterOS 日志：

<DocCardList />

### 通过 TLS 发送日志 {#send-the-log-over-tls}

要加密日志，请使用 `remote-protocol=tls`。要检查服务器证书，请导入签署该证书的 CA 证书并设置 `check-certificate=yes`。未设置 `check-certificate=yes` 时，路由器会加密连接，但接受任意证书：

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

当证书无法验证时，路由器不会发送任何内容，会进行重试，并记录一条以 `ssl: no trusted CA certificate found` 结尾的 `ssld,error` 条目。

`check-certificate=yes` 会检查服务器证书是否由受信任的证书签名。它不会将证书中的名称与服务器地址进行比较，因此来自受信任 CA 的任意证书都会通过：仅信任日志服务器的 CA，或导入服务器自身的证书。路由器不会提供客户端证书。

发送到相同服务器地址和端口的操作共享一个连接。请为这些操作设置相同的 `remote-protocol` 和 `check-certificate`。

## 通过电子邮件发送日志消息 {#email-log-messages}

`email` 目标会为每个条目发送一封电子邮件，并将 topics 和消息分别作为主题和正文。它使用 `/tool/e-mail` 的服务器、端口、TLS 模式和发件人，因此请先配置该项（请参阅 [Email](/docs/system-information-and-utilities/e-mail)）。例如，要让每个关键条目都发送电子邮件，例如登录失败、由 watchdog 触发的重启或时钟校正：

```ros
/system/logging/action/add name=mail target=email \
    email-to=admin@example.com
/system/logging/add topics=critical action=mail
```

要仅在登录失败时收到电子邮件，请添加消息必须匹配的 `regex`；`^` 表示消息以该文本开头：

```ros
/system/logging/add topics=critical regex="^login failure" action=mail
```

`email-cc` 可添加更多收件人。每封发送的电子邮件都会记录为 `e-mail,info sent <topics message> to: <address>`。请谨慎选择 topics：每个条目都会发送一封电子邮件，因此密码猜测攻击会发送数百封。应改用防火墙阻止此类攻击（请参阅 [SSH brute-force protection](/docs/firewall-and-quality-of-service/user-guides/bruteforce-prevention)）。

## 在日志消息上运行脚本 {#run-a-script-on-a-log-message}

`script` 目标会针对其规则匹配的条目运行 `/system/script` 中的脚本。脚本通过两个变量获取条目：`$topics`（例如 `system,error,critical`）和 `$message`。脚本仍在运行时匹配的条目会被跳过，脚本自身记录的条目不会再次启动脚本。

例如，要将登录失败的源地址收集到地址列表中，适用于任何服务（SSH、WinBox、WebFig、API）。地址在最后一次登录失败后会在列表中保留一天：

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

该规则的 `regex` 将脚本限制为类似 `login failure for user admin from 192.168.88.17 via ssh` 的条目。消息中的用户名来自客户端，可能包含空格和单词 `from`，因此脚本会取最后一个 ` from ` 后面的地址，该部分由路由器自行写入。该列表本身不会执行任何操作：请在防火墙规则中使用它（请参阅 [Address lists](/docs/firewall-and-quality-of-service/firewall/address-lists)），并排除你自己的管理地址，以免输错密码导致自己被锁定。

## 规则如何匹配条目 {#how-rules-match-entries}

当满足以下所有条件时，规则会将条目传递给其 action：

- 条目包含 `topics` 中列出的所有主题，且不包含使用 `!` 列出的任何主题。`topics=script,warning` 匹配 `script,warning` 条目，而不是匹配每个 `script` 条目和每个 `warning` 条目。
- 当规则设置了 `regex` 时，消息与该表达式匹配。正则表达式还会看到消息之后条目的额外字段，因此 `$` 不会匹配登录条目消息的结尾。
- 规则已启用。

没有 `topics` 的规则匹配所有条目，包括 debug 消息。

每条匹配的规则都会传递自己的副本，因此一个条目可以同时进入内存、磁盘和 syslog 服务器。当两条规则将同一条目传递给同一 action 时，该 action 只存储一次。

`prefix` 会在该规则 action 的消息前添加文本：`prefix=core1` 会存储和发送 `core1: <message>`。使用它可以在共享 syslog 服务器上区分路由器。

当更改或禁用唯一使用某个 memory action 的规则时，该 action 的缓冲区会被清空。更改 action 本身，或更改使用该 action 的多条规则之一，会保留条目。

## 主题 {#topics}

每个条目都有一个或多个主题。通常一个主题表示写入该条目的功能，另一个主题表示其重要性，某些功能还会添加更多主题。登录失败具有主题 `system,error,critical`；SSH debug 消息具有 `ssh,debug`，其数据包转储具有 `ssh,debug,packet`。

### 重要性主题 {#importance-topics}

| 主题 | 条目 |
| :-- | :-- |
| `critical` | 需要注意的事件，例如登录失败、watchdog 重启和时钟校正。默认规则会将它们打印到控制台。 |
| `error` | 错误。 |
| `warning` | 警告。 |
| `info` | 信息性条目，例如登录、配置更改和链路状态变化。 |
| `debug` | 用于故障排查的详细消息，仅在规则请求时记录。 |
| `packet` | 已发送或接收数据包的内容，经过解码。 |
| `raw` | 原始内容，例如十六进制形式的数据包或与 LTE 调制解调器交换的 AT 命令。 |

### 功能主题 {#feature-topics}

| 主题 | 条目 |
| :-- | :-- |
| `account` | 用户的登录和登出。 |
| `acme-client` | 获取证书的 ACME 客户端。 |
| `async` | LTE 调制解调器的命令通道。 |
| `backup` | 备份创建。 |
| `bfd` | BFD。 |
| `bgp` | BGP。 |
| `bridge` | 网桥。 |
| `calc` | 路由计算。 |
| `caps` | CAPsMAN 和 CAP。 |
| `certificate` | 证书。 |
| `clock` | 时钟更改，例如由 NTP 或 IP Cloud 引起的更改。 |
| `container` | 容器。 |
| `ddns` | 动态 DNS。 |
| `dhcp` | DHCP 客户端、服务器和中继。 |
| `discover` | 邻居发现。 |
| `disk` | 磁盘。 |
| `dns` | DNS。 |
| `dot1x` | 802.1X 身份验证。 |
| `dude` | The Dude。 |
| `e-mail` | 电子邮件工具（`/tool/e-mail`）。 |
| `event` | 事件，例如安装到路由表中的路由或来自 LTE 调制解调器的消息。 |
| `evpn` | EVPN。 |
| `fetch` | fetch 工具。 |
| `firewall` | 带有 `action=log` 或 `log=yes` 的防火墙规则及其 `log-prefix`。 |
| `gps` | GPS。 |
| `gsm` | GSM 调制解调器和 SMS 工具。 |
| `health` | 健康监控（电压、温度、风扇）。 |
| `hotspot` | HotSpot。 |
| `igmp-proxy` | IGMP 代理。 |
| `interface` | 接口，例如链路建立和链路断开。 |
| `ipsec` | IPsec。 |
| `iscsi` | iSCSI。 |
| `isis` | IS-IS。 |
| `kvm` | 虚拟机（KVM）。 |
| `l2tp` | L2TP 客户端和服务器。 |
| `ldp` | LDP。 |
| `lora` | LoRa。 |
| `lte` | LTE 和 5G 调制解调器。 |
| `manager` | User Manager。 |
| `mpls` | MPLS。 |
| `mqtt` | MQTT。 |
| `mvrp` | MVRP。 |
| `natpmp` | NAT-PMP。 |
| `netwatch` | Netwatch。 |
| `ntp` | NTP 客户端和服务器。 |
| `ospf` | OSPF。 |
| `ovpn` | OpenVPN。 |
| `pim` | PIM-SM。 |
| `poe-in` | PoE 输入。 |
| `poe-out` | PoE 输出。 |
| `pon` | PON SFP 模块。 |
| `ppp` | PPP。 |
| `pppoe` | PPPoE 客户端和服务器。 |
| `pptp` | PPTP 客户端和服务器。 |
| `ptp` | 精确时间协议。 |
| `queue` | 队列。 |
| `radius` | RADIUS 客户端。 |
| `radvd` | IPv6 路由器通告。 |
| `rip` | RIP。 |
| `route` | 路由。 |
| `rpki` | RPKI。 |
| `rproxy` | 反向代理。 |
| `rsvp` | RSVP。 |
| `script` | 脚本（`:log`）以及 `/log/info` 和相关命令。 |
| `sertcp` | 串口远程访问（`/port/remote-access`）。 |
| `smb` | SMB 服务器。 |
| `snmp` | SNMP。 |
| `socksify` | Socksify。 |
| `ssh` | SSH 服务器和客户端。 |
| `ssld` | RouterOS 功能的 TLS 连接，例如无法验证的服务器证书。 |
| `sstp` | SSTP 客户端和服务器。 |
| `stp` | 生成树。 |
| `system` | 系统消息，例如重启和配置更改。 |
| `tftp` | TFTP 服务器。 |
| `timer` | 定时器，例如 BGP keepalive 定时器。 |
| `tr069` | TR-069 客户端。 |
| `update` | 软件包更新。 |
| `upnp` | UPnP。 |
| `ups` | UPS 监控。 |
| `vpls` | VPLS。 |
| `vrrp` | VRRP。 |
| `watchdog` | watchdog。 |
| `web-proxy` | Web 代理。 |
| `wiliot` | Wiliot。 |
| `wireguard` | WireGuard。 |
| `wireless` | 无线接口。 |
| `zerotier` | ZeroTier。 |

路由器还列出了主题 `amt`、`isdn`、`mme`、`read`、`simulator`、`state`、`store`、`telephony` 和 `write`，以及带有 `option` 软件包的 `netinstall`。

## 故障排查 {#troubleshoot}

| 问题 | 原因和修复方法 |
| :-- | :-- |
| syslog 服务器未收到任何内容。 | 默认 `remote` 操作使用 `remote=0.0.0.0`；请设置服务器地址。检查是否有规则将条目传递给该操作：包含多个主题的规则需要全部主题都匹配。检查路由器是否能从 `src-address` 并在 `vrf` 中访问服务器，以及服务器是否接受该协议和端口。 |
| TLS 日志未发送任何内容。 | 查找 `ssld,error` 条目。`no trusted CA certificate found` 表示服务器的 CA 证书未导入或不受信任。 |
| 服务器将多个条目显示为一个。 | 通过 TCP 和 TLS 传输时，`default` 和 `syslog` 条目没有分隔符；请使用 `remote-log-format=cef`。 |
| 条目在 `/log/print` 中多次显示。 | 多个操作存储了这些条目；请使用 `where buffer=memory` 进行过滤。 |
| 重启后日志为空。 | 内存操作无法在重启后保留；请将日志记录到磁盘或 syslog 服务器。 |
| 某个内存缓冲区自行清空。 | 唯一使用该缓冲区的规则已被更改或禁用。 |
| `bad disk file name` | `disk-file-name` 中的文件夹不存在。 |
| `action name can contain only letters and numbers` | 操作名称不能包含 `-`、`_` 或其他字符。 |

## 技术细节 {#technical-details}

### 消息格式 {#message-formats}

服务器在每种 `remote-log-format` 中收到的同一登录失败消息（`syslog-time-format=bsd-syslog`，标识为 `MikroTik`）：

```text
system,error,critical login failure for user guest from 192.168.88.17 via ssh
<27>Oct  2 17:36:35 MikroTik login failure for user guest from 192.168.88.17 via ssh
Oct  2 17:36:35 MikroTik CEF:0|MikroTik|hAP ax^2|7.25beta5|10|system,error,critical|High|dvchost=MikroTik dvc=192.168.88.36 msg=login failure for user guest from 192.168.88.17 via ssh app=ssh duser=guest outcome=failure src=192.168.88.17
```

- `syslog` 格式不带 tag 字段；消息跟在标识之后。
- 使用 `syslog-severity=auto` 时，严重级别来自 topics：`debug` 为 7，`info` 为 6，`warning` 为 4，`error` 为 3。示例中同时包含 `error` 和 `critical` 的条目会得到 3，因此针对严重级别 `crit` 的服务器过滤器会漏掉登录失败。优先级为 facility 乘以 8 再加严重级别：`daemon`（3）和 `error`（3）得到 `<27>`。
- CEF 标头包含主板名称、RouterOS 版本、事件类编号、topics 和严重级别（`info` 和 `debug` 为 `Low`，`warning` 为 `Medium`，`error` 为 `High`）。`dvchost` 是标识，`dvc` 是路由器地址，`msg` 是消息，条目的额外字段紧随其后。防火墙条目包含链、日志前缀、接口、地址和协议。值中的 `=` 和 `\` 会转义为 `\=` 和 `\\`。每条 CEF 消息以 `cef-event-delimiter` 结尾（默认为 `\r\n`）。

### TCP 和 TLS {#tcp-and-tls}

- UDP 每条条目发送一个数据报。TCP 和 TLS 为每个服务器地址和端口保持一个连接，由发送到该地址和端口的所有 action 共享。
- 当 TCP 或 TLS 服务器不可达时，路由器会将所有远程 action 的条目保留在一个缓冲区中，并重试连接。重启后缓冲区会丢失。
- 服务器不可达时，最多有 1000 条条目在内存中等待；缓冲区满后，新条目会被丢弃。
- CEF 消息以分隔符结尾；`default` 和 `syslog` 消息在流中依次排列，不带分隔符。
- `check-certificate=yes` 会根据 `/certificate` 中的受信任证书检查服务器证书，而不检查证书中的名称。路由器提供 TLS 1.2。

### 磁盘文件 {#disk-files}

文件中的每一行以其自身格式的日期开头，例如 `Oct/02/2026 16:49:36`，后跟 topics 和消息。`/system/logging/action/clear` 仅清空内存 action；对磁盘 action 会失败，并返回 `cleanup not supported on this target`。

有关所有参数，请参阅 [`/system/logging`](/docs/cli-reference/system/logging) 和 [`/system/logging/action`](/docs/cli-reference/system/logging/action) CLI 参考，以及有关条目的 [`/log`](/docs/cli-reference/log)。
