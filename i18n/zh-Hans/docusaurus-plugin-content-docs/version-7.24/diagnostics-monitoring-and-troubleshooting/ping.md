---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/ping"
sidebar_position: 1
title: "Ping"
sidebar_label: "Ping"
description: "本页面介绍 MikroTik RouterOS 的 Ping 工具，该工具使用 ICMP Echo 消息来测试主机连通性并测量往返延迟。页面解释了 TTL、interval、count 等参数，并支持 IPv4/IPv6 地址和 DNS 名称。文中还简要提及了 MAC Ping 在多播发现场景中的应用。"
tags:
  - 'icmp'
  - 'ping'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/ping
captured_at: '2026-11-04T11:28:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[*Ping CLI 参考*](../cli-reference/tool/ping.md)

Ping 使用 Internet Control Message Protocol (ICMP) Echo 消息来判断远程主机是活动还是非活动，并确定与其通信时的往返延迟。Ping 工具向主机发送 ICMP（类型 8）消息，并等待 ICMP echo-reply（类型 0）。这些事件之间的间隔称为往返时间。如果到间隔结束仍未收到响应（称为 pong），则认为已超时。报告的第二个重要参数是 TTL（Time to Live）。数据包经过的每台机器都会将其递减。只有当 TTL 大于源与目标之间的路由器数量时，数据包才会到达目的地。

### 快速示例 {#quick-example}

RouterOS Ping 工具允许配置各种附加参数，例如：

- arp-ping
- address
- src-address
- count
- dscp
- interface
- interval
- routing-table
- size
- ttl

让我们看一个非常简单的示例：

```ros
[admin@MikroTik] > /tool/ping address=10.155.126.252 count=5 interval=200ms  
  SEQ HOST                                     SIZE TTL TIME  STATUS                                                                                                                                                                              
    0 10.155.126.252                             56  64 0ms  
    1 10.155.126.252                             56  64 0ms  
    2 10.155.126.252                             56  64 0ms  
    3 10.155.126.252                             56  64 0ms  
    4 10.155.126.252                             56  64 0ms  
    sent=5 received=5 packet-loss=0% min-rtt=0ms avg-rtt=0ms max-rtt=0ms 
```

使用更短的 CLI 命令也可以实现相同效果：

```ros
[admin@MikroTik] > /ping 10.155.126.252 count=5 interval=50ms               
  SEQ HOST                                     SIZE TTL TIME  STATUS                                                                                                                                                                              
    0 10.155.126.252                             56  64 0ms  
    1 10.155.126.252                             56  64 0ms  
    2 10.155.126.252                             56  64 0ms  
    3 10.155.126.252                             56  64 0ms  
    4 10.155.126.252                             56  64 0ms  
    sent=5 received=5 packet-loss=0% min-rtt=0ms avg-rtt=0ms max-rtt=0ms
```

也可以 ping 一个组播地址来发现属于某个组播组的所有主机：

```ros
[admin@MikroTik] > /ping ff02::1
HOST                                    SIZE  TTL TIME  STATUS                                         
fe80::20c:42ff:fe49:fceb                56    64  1ms   echo reply                                     
fe80::20c:42ff:fe72:a1b0                56    64  1ms   echo reply                                     
fe80::20c:42ff:fe28:7945                56    64  1ms   echo reply                                     
fe80::21a:4dff:fe5d:8e56                56    64  3ms   echo reply                                     
    sent=1 received=4 packet-loss=-300% min-rtt=1ms avg-rtt=1ms max-rtt=3ms 
```

通过 DNS 名称 ping：

```ros
[admin@MikroTik]  > /ping www.google.com count=5 interval=50ms
  SEQ HOST                                     SIZE TTL TIME  STATUS                                                                                                                                                                              
    0 216.58.207.228                             56  51 14ms 
    1 216.58.207.228                             56  51 13ms 
    2 216.58.207.228                             56  51 13ms 
    3 216.58.207.228                             56  51 13ms 
    4 216.58.207.228                             56  51 13ms 
    sent=5 received=5 packet-loss=0% min-rtt=13ms avg-rtt=13ms max-rtt=14ms
```

:::info
当你在 ping 中使用域名和 CLI 时，路由器将使用 [DNS](../network-management/dns.md) 来解析地址。当你使用 [WinBox](../management-tools/winbox.md) 的 Tools/Ping 时，将使用你计算机的 DNS 来解析给定地址。
:::

### MAC Ping {#mac-ping}

此子菜单允许启用 [MAC Ping 服务器](../management-tools/mac-server.md)。

启用 MAC ping 后，同一广播域中的其他主机可以使用 ping 工具来 ping 一个 MAC 地址：

```ros
[admin@MikroTik]  > /tool/mac-server/ping/set enabled=yes 
```

Ping MAC 地址：

```ros
[admin@MikroTik]  > /ping 00:0C:42:72:A1:B0
HOST                                    SIZE  TTL TIME  STATUS                                         
00:0C:42:72:A1:B0                       56        0ms  
00:0C:42:72:A1:B0                       56        0ms  
    sent=2 received=2 packet-loss=0% min-rtt=0ms avg-rtt=0ms max-rtt=0ms 
```

:::info
默认情况下，MAC ping 会尝试通过所有活动接口到达目标。如果目标可通过多个接口到达，这可能会产生不必要的流量和重复回复。要将 MAC ping 限制到特定接口，请使用接口选择器（在 MAC 地址后追加 `%`，后跟接口名称）。例如：`/ping 00:11:22:33:44:55%ether1`
:::
