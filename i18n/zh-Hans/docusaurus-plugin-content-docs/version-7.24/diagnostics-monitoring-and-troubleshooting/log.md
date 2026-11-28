---
title: "日志"
description: "本节概述 MikroTik RouterOS 的日志功能，包括如何使用 `/log` 菜单实时查看和过滤日志消息，以及通过 `/system/logging` 将日志转发到外部系统的详细配置选项。"
tags:
  - 'logging'
  - 'system-management'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/log
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍日志导出和集成示例。可使用这些示例将 RouterOS 日志转发到 Elasticsearch 等外部系统。

<DocCardList />

RouterOS 可以记录各种系统事件和状态信息。日志可以保存在路由器内存（RAM）、磁盘或文件中，也可以通过电子邮件发送，甚至发送到远程 syslog 服务器。

[Video: Logging Basics](http://youtube.com/watch?v=E-QAhaWtsnU)

## 日志消息 {#log-messages}

**子菜单：** `/log`

存储在路由器本地内存中的所有消息都可以从 `/log` 菜单打印。每条记录包含事件发生的时间和日期、该消息所属的主题以及消息本身。

```ros
[admin@MikroTik] /log> print 
1970-01-02 02:00:09 system,info router rebooted 
sep/15 09:54:33 system,info,account user admin logged in from 10.1.101.212 via winbox 
sep/15 12:33:18 system,info item added by admin 
sep/15 12:34:26 system,info mangle rule added by admin 
sep/15 12:34:29 system,info mangle rule moved by admin 
sep/15 12:35:34 system,info mangle rule changed by admin 
sep/15 12:42:14 system,info,account user admin logged in from 10.1.101.212 via telnet 
sep/15 12:42:55 system,info,account user admin logged out from 10.1.101.212 via telnet 
01:01:58 firewall,info input: in:ether1 out:(none), src-mac 00:21:29:6d:82:07, proto UDP, 
10.1.101.1:520->10.1.101.255:520, len 452
```

如果打印日志的日期与添加日志记录的日期相同，则只显示时间。在上面的示例中，可以看到第二条消息是在当年的 sep/15 添加的（不显示年份），最后一条消息是在今天添加的，因此只显示时间。

*Print* 命令接受多个参数，可用于检测新的日志记录、仅打印所需消息等。

例如，以下命令将打印所有主题之一为 info 的日志消息，并检测新的日志记录，直到按下 <kbd>Control</kbd>+<kbd>C</kbd>。

```ros
[admin@MikroTik] /log > print follow where topics~".info"
12:52:24 script,info hello from script
-- Ctrl-C to quit.
```

在本示例中，将只打印 dhcp 信息消息：

```ros
[admin@MikroTik] /log/print where topics~"dhcp.info"
11:42:32 dhcp,info defconf deassigned 192.168.88.37 for B0:E4:5C:27:EF:F2 Samsung
11:42:32 dhcp,info defconf assigned 192.168.88.37 for B0:E4:5C:27:EF:F2 Samsung
```

如果 print 处于跟随模式，可以按键盘上的“空格”插入分隔符：

```ros
[admin@MikroTik] /log > print follow where topics~".info"
12:52:24 script,info hello from script

= = = = = = = = = = = = = = = = = = = = = = = = = = =

-- Ctrl-C to quit.
```

## 日志配置 {#logging-configuration}

**子菜单：** `/system/logging`

| 属性 | 说明 |
| :--- | :--- |
| **action** (*name*；默认值：**memory**) | 指定系统默认操作之一，或 actions 菜单中列出的用户定义操作。 |
| **prefix** (*string*；默认值：none) | 添加到日志消息开头的后缀。 |
| **regex** (*string*；默认值：none) | 用于匹配日志消息的正则表达式。<br/>如果 regex 不匹配，则不会执行该操作，<br/>即使该 topic 已配置为记录日志。 |
| <strong>topics</strong> (<em>account, acme-client, amt, async, backup, bfd, <br/>bgp, bridge, calc, caps, certificate, clock, container, <br/>critical, ddns, debug, dhcp, discover, disk, dns, dot1x, <br/>dude, e-mail, error, event, evpn, fetch, firewall, gps, <br/>gsm, health, hotspot, igmp-proxy, info, interface, ipsec, <br/>iscsi, isdn, isis, kvm, l2tp, lora, ldp, lte, manager, mme, <br/>mpls, mqtt, mvrp, natpmp, netwatch, ntp, ospf, ovpn, <br/>packet, pim, poe-in, poe-out, ppp, pppoe, pptp, ptp, <br/>queue, radvd, radius, raw, read, rip, route, rpki, rproxy, <br/>rsvp, script, sertcp, simulator, smb, snmp, socksify, ssh, <br/>ssld, sstp, state, store, stp, system, telephony, tftp, <br/>timer, tr069, update, upnp, ups, vpls, vrrp, warning, <br/>watchdog, web-proxy, wiliot, wireguard, wireless, write, zerotier</em>；默认值：<strong>info</strong>) | 记录所有匹配指定 topic 或 topic 列表的消息。<br/>在 topic 前使用 <strong>!</strong> 字符可排除匹配的消息。<br/>例如，记录 NTP 调试消息但不包含数据包详情：<br/><br/><code>/system/logging/add topics=ntp,debug,!packet</code> |

### Actions

**子菜单：** `/system/logging/action`

| 属性 | 说明 |
| :--- | :--- |
| **add-topics-string** (*yes\|no*；默认值：**no**) |  |
| **cef-event-delimiter** (string；默认值：**\r\n**) | 该选项帮助远程 syslog 区分已发送批次中的各个事件 |
| **check-certificate** (*yes\|no*；默认值：no) | 使用 TLS 类型的远程日志操作时，是否检查服务器证书。 |
| **disk-file-count** (*integer [1..65535]*；默认值：**2**) | 指定用于存储日志消息的文件数量，仅适用于 action=disk |
| **disk-file-name** (*string*；默认值：**log**) | 用于存储日志消息的文件名，仅适用于 action=disk |
| **disk-lines-per-file** (*integer [1..65535]*；默认值：**100**) | 指定文件以行数计的最大大小，仅适用于 action=disk |
| **disk-stop-on-full** (*yes\|no*；默认值：**no**) | 当达到指定的 disk-lines-per-file 和 disk-file-count 数量后，是否停止将日志消息保存到磁盘，仅适用于 action=disk |
| **email-cc (*string*；默认值：)** | 日志以 CC 方式发送到的电子邮件地址，仅适用于 action=email |
| **email-start-tls** (*yes \| no*；默认值：**no**) | 发送电子邮件时是否使用 tls，仅适用于 action=email |
| **email-to** (*string*；默认值：) | 日志发送到的电子邮件地址，仅适用于 action=email |
| **memory-lines** (*integer [1..65535]*；默认值：**1000**) | 本地内存缓冲区中的记录数，仅适用于 action=memory |
| **memory-stop-on-full** (*yes\|no*；默认值：**no**) | 当达到指定的 memory-lines 数量后，是否停止将日志消息保存到本地缓冲区 |
| **name** (*string*；默认值：) | 操作名称。当 target=memory 时，该名称也用作特定内存缓冲区的标识符。可以创建多个 target=memory 的操作，每个操作都将日志存储在其独立的缓冲区中。 |
| **remember** (*yes\|no*；默认值：) | 是否保留尚未在控制台显示的日志消息，适用于 action=echo |
| **remote-log-format** (*cef, default, syslog*；默认值：**default**) | 发送到远程实例的日志格式：<br/><ul><li>cef - 日志以 CEF 格式发送；</li><li>default - 日志按原样发送；</li><li>syslog - 日志以 BSD-syslog 格式发送</li></ul> |
| **remote-port** (*integer [1..65535]*；默认值：**514**) | 远程日志服务器的 UDP 端口（地址通过 **remote** 属性配置）。 |
| **remote-protocol** (*tcp / udp / tls*；默认值：**udp**) | 远程日志消息的协议，TCP 和 TLS 仅适用于 CEF remote-log-format；对于 syslog，即使设置了 TCP / TLS，也始终使用 UDP |
| **script** |  |
| **src-address** (*IP address*；默认值：**0.0.0.0**) | 向远程服务器发送数据包时使用的源地址 |
| **syslog-facility** (*auth, authpriv, cron, daemon, ftp, kern, local0, local1, local2, local3, local4, local5, local6, local7, lpr, mail, news, ntp, syslog, user, uucp*；默认值：**daemon**) |  |
| **syslog-severity** (*alert, auto, critical, debug, emergency, error, info, notice, warning*；默认值：**auto**) | RFC 3164 中定义的严重级别指示：<ul class="bullets"><li>Emergency：系统不可用</li><li>Alert：必须立即采取行动</li><li>Critical：严重情况</li><li>Error：错误情况</li><li>Warning：警告情况</li><li>Notice：正常但重要的情况</li><li>Informational：信息性消息</li><li>Debug：调试级别消息</li></ul> |
| **syslog-time-format** (*bsd-syslog, iso8601*；默认值：**bsd-syslog**) | 消息的时间日志格式 |
| **target** (*disk, echo, email, memory, remote, script*；默认值：**memory**) | 日志消息的存储位置或目标<ul class="bullets"><li>disk - 日志保存到硬盘</li><li>echo - 日志显示在控制台屏幕上</li><li>email - 日志通过电子邮件发送</li><li>memory - 日志存储在本地内存缓冲区或多个独立缓冲区（RAM 文件）中。</li><li>remote - 日志发送到远程主机</li><li>script - 当日志消息匹配规则时，执行 /system/script/ 中的脚本。脚本接收两个变量：topics（日志 topic 字符串）和 message（日志消息内容）。</li></ul> |
| **vrf** (*name*；默认值：**main**) | 设置远程日志建立出站连接所使用的 VRF，仅适用于 target=remote。该设置自 RouterOS 7.19 起可用。 |

### 创建独立的内存日志缓冲区 {#create-separate-memory-logging-buffers}

就像为不同笔记使用不同文本文件一样，这些独立的内存缓冲区使你可以根据主题将特定类型的日志消息定向到内存中的不同存储区域。

- **隔离：** 发送到 `buffer_A` 的日志与发送到 `buffer_B` 的日志完全分离。
- **独立查看：** 你可以使用 `/log/print where buffer=buffer_name` 一次只查看一个缓冲区的内容。
- **定向清除：** 你可以使用 `/system/logging/action/clear action=buffer_name` 清除某个指定缓冲区的内容，而不会影响存储在其他内存缓冲区中的日志。

这可以更好地组织和控制存储在内存中的日志，尤其适用于调试或监控，而不会将它们全部混合到单个默认内存日志中。

**子菜单：** `/system/logging/action/clear`

从 7.20\_ab244 开始，可以使用以下命令清除内存日志（target=memory）：**`/system/logging/action/clear` action=\<`logging` action name>**  
  
Topics

 每条日志条目都有一个主题，用于描述日志消息的来源。一条日志消息可以分配多个主题。例如，OSPF 调试日志有四个不同的主题：route、ospf、debug 和 raw。

```ros
11:11:43 route,ospf,debug SEND: Hello Packet 10.255.255.1 -> 224.0.0.5 on lo0 
11:11:43 route,ospf,debug,raw PACKET: 
11:11:43 route,ospf,debug,raw 02 01 00 2C 0A FF FF 03 00 00 00 00 E7 9B 00 00 
11:11:43 route,ospf,debug,raw 00 00 00 00 00 00 00 00 FF FF FF FF 00 0A 02 01 
11:11:43 route,ospf,debug,raw 00 00 00 28 0A FF FF 01 00 00 00 00 
```

#### 与设施无关的主题列表 {#list-of-facility-independent-topics}

| 主题 | 描述 |
| :-- | :-- |
| **critical** | 标记为 critical 的日志条目；每次登录时，这些日志条目都会打印到控制台。 |
| **debug** | 调试日志条目 |
| **error** | 错误消息 |
| **info** | 信息性日志条目 |
| **packet** | 显示接收/发送数据包内容的日志条目 |
| **raw** | 显示接收/发送数据包原始内容的日志条目 |
| **warning** | 警告消息。 |

#### 各种 RouterOS 功能使用的主题 {#topics-used-by-various-routeros-facilities}

| Topic | Description |
| :-- | :-- |
| **account** | 由计费功能生成的日志消息。 |
| **async** | 由异步设备生成的日志消息 |
| **backup** | 由备份创建功能生成的日志消息。 |
| **bfd** | 由 BFD 协议生成的日志消息 |
| **bgp** | 由 BGP 协议生成的日志消息 |
| **calc** | 路由计算日志消息。 |
| **caps** | CAPsMAN 无线设备管理 |
| **certificate** | 安全证书 |
| **clock** | 由 Clock、IP Cloud 时间更改生成的日志消息。 |
| **dns** | 与名称服务器查询相关的信息 |
| **ddns** | 由 Dynamic DNS 工具生成的日志消息 |
| **dude** | 与 Dude server 软件包和 The Dude 工具相关的消息 |
| **dhcp** | DHCP 客户端、服务器和中继日志消息 |
| **e-mail** | 由 e-mail 工具生成的消息。 |
| **event** | 路由事件发生时生成的日志消息。例如，路由表中已安装新路由。 |
| **firewall** | 在防火墙规则中设置 **action=log** 时生成的防火墙日志消息 |
| **gsm** | 由 GSM 设备生成的日志消息 |
| **hotspot** | Hotspot 相关日志条目 |
| **igmp-proxy** | IGMP Proxy 相关日志条目 |
| **ipsec** | IPSec 日志条目 |
| **iscsi** |  |
| **isdn** |  |
| **interface** |  |
| **kvm** | 与 KVM 虚拟机功能相关的消息 |
| **l2tp** | 由 L2TP 客户端和服务器生成的日志条目 |
| **lte** | 与 LTE/4G 调制解调器配置相关的消息 |
| **ldp** | LDP 协议相关消息 |
| **manager** | User Manager 日志消息。 |
| **mme** | MME 路由协议消息 |
| **mpls** | MPLS 消息 |
| **ntp** | sNTP 客户端生成的日志条目 |
| **ospf** | OSPF 路由协议消息 |
| **ovpn** | OpenVPN 隧道消息 |
| **pim** | 组播 PIM-SM 相关消息 |
| **ppp** | ppp 功能消息 |
| **pppoe** | PPPoE 服务器/客户端相关消息 |
| **pptp** | PPTP 服务器/客户端相关消息 |
| **radius** | 由 RADIUS Client 生成的日志条目 |
| **radvd** | IPv6 radv 守护进程日志消息。 |
| **read** | SMS 工具消息 |
| **rip** | RIP 路由协议消息 |
| **route** | 路由功能日志条目 |
| **rsvp** | 由 Resource Reservation Protocol 生成的消息。 |
| **script** | 由脚本生成的日志条目 |
| **sertcp** | 与负责 "/port remote-access" 的功能相关的日志消息 |
| **simulator** |  |
| **state** | DHCP Client 和路由状态消息。 |
| **store** | 由 Store 功能生成的日志条目 |
| **smb** | 与 SMB 文件共享系统相关的消息 |
| **snmp** | 与 Simple network management protocol（SNMP）配置相关的消息 |
| **system** | 通用系统消息 |
| **telephony** | *已废弃！以前由 IP telephony 软件包使用* |
| **tftp** | TFTP 服务器生成的消息 |
| **timer** | 与 RouterOS 中使用的计时器相关的日志消息。例如 bgp keepalive 日志<br/><br/><code>12:41:40 route,bgp,debug,timer KeepaliveTimer expired</code><br/><code>12:41:40 route,bgp,debug,timer RemoteAddress=2001:470:1f09:131::1</code><br/> |
| **ups** | 由 UPS 监控工具生成的消息 |
| **vrrp** | 由 VRRP 生成的消息 |
| **watchdog** | Watchdog 生成的日志条目 |
| **web-proxy** | 由 web proxy 生成的日志消息 |
| **wireless** | 无线日志条目。 |
| **write** | SMS 工具消息。 |

## 示例 {#examples}

### 创建独立的内存日志缓冲区 {#create-separate-memory-logging-buffers-1}

创建新的内存日志缓冲区，用于将指定日志与默认内存日志分开存储。

```ros
/system/logging/action/add name=dhcpMemoryLog target=memory memory-lines=300
/system/logging/action/add name=wirelessLog target=memory memory-lines=500
```

为创建的缓冲区分配主题。以下规则将所有 DHCP 日志发送到 dhcpMemoryLog，将无线日志发送到 wirelessLog 缓冲区。

```ros
/system/logging/add topics=dhcp action=dhcpMemoryLog
/system/logging/add topics=wireless action=wirelessLog
```

```ros
# View only DHCP related logs stored in its dedicated buffer
/log/print where buffer=dhcpMemoryLog

# View only non-info Wireless logs stored in its dedicated buffer
/log/print where buffer=wirelessLog
```

```ros
/system/logging/action/clear action=dhcpMemoryLog
```

### 记录到文件 {#logging-to-file}

要将所有内容记录到文件，请添加新的日志动作：

```ros
/system/logging/action/add name=file target=disk disk-file-name=log
```

然后使用该新动作记录所有内容：

```ros
/system/logging/add action=file
```

可以通过以下命令仅记录错误：

```ros
/system/logging/add topics=error action=file 
```

这会将日志记录到文件 **log.0.txt** 和 **log.1.txt** 中。

可以通过指定 *disk-lines-per-file* 来设置文件的最大行数。**\<file>.0.txt** 是活动文件，新日志将追加到该文件中；当文件大小达到最大值时，它将变为 **\<file>.1.txt**，并创建新的空文件 **\<file>.0.txt**。

可以通过在文件名前指定目录名，将日志记录到 USB 闪存或 *MicroSD/CF*（在 Routerboard 上）。例如，如果 */files* 下存在可访问的 USB 闪存目录 **usb1**，应执行以下命令：

```ros
/system/logging/action/add name=usb target=disk disk-file-name=usb1/log
```

:::warning
文件中的日志条目将在重启后重新存储到内存中。
:::
