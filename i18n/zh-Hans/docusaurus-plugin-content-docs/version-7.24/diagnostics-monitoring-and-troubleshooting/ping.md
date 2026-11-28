---
title: "Ping"
description: "本页介绍 MikroTik RouterOS Ping 工具，该工具使用 ICMP Echo 消息测试主机连通性并测量往返延迟。文中说明 TTL、interval、count 等参数，并支持 IPv4/IPv6 地址和 DNS 名称。文中还简要介绍了组播发现场景中的 MAC Ping。"
tags:
  - 'icmp'
  - 'ping'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/ping
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "diagnostics-monitoring-and-troubleshooting"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

[*Ping CLI Reference*](/docs/cli-reference/tool/ping)

Ping 使用 Internet Control Message Protocol（ICMP）Echo 消息判断远程主机是否处于活动状态，并确定与其通信时的往返延迟。Ping 工具向主机发送 ICMP（type 8）消息，并等待 ICMP echo-reply（type 0）。这两个事件之间的间隔称为一次往返。如果响应（称为 pong）在该间隔结束前未到达，则认为已超时。报告的第二个重要参数是 TTL（Time to Live）。数据包每经过一台处理它的设备，TTL 都会递减。只有当 TTL 大于源端和目的端之间的路由器数量时，数据包才会到达目的端。

### 快速示例 {#quick-example}

RouterOS Ping 工具允许配置多种附加参数，例如：

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

下面来看一个非常简单的示例：

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

也可以使用更短的 CLI 命令实现相同效果：

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

还可以 ping 组播地址，以发现属于某个组播组的所有主机：

```ros
[admin@MikroTik] > /ping ff02::1
HOST                                    SIZE  TTL TIME  STATUS                                         
fe80::20c:42ff:fe49:fceb                56    64  1ms   echo reply                                     
fe80::20c:42ff:fe72:a1b0                56    64  1ms   echo reply                                     
fe80::20c:42ff:fe28:7945                56    64  1ms   echo reply                                     
fe80::21a:4dff:fe5d:8e56                56    64  3ms   echo reply                                     
    sent=1 received=4 packet-loss=-300% min-rtt=1ms avg-rtt=1ms max-rtt=3ms 
```

按 DNS 名称 ping：

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
使用域名和 CLI 执行 ping 时，路由器将使用 [DNS](/docs/network-management/dns) 解析地址。使用 [WinBox](/docs/management-tools/winbox) 的 Tools/Ping 时，将使用计算机的 DNS 解析给定地址。
:::

### MAC Ping

该子菜单用于启用 [MAC Ping server](/docs/management-tools/mac-server)。

启用 MAC ping 后，同一广播域中的其他主机可以使用 ping 工具 ping MAC 地址：

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
默认情况下，MAC ping 会尝试通过所有活动接口到达目标。如果目标可通过多个接口到达，这可能会产生不必要的流量和重复回复。要将 MAC ping 限制到特定接口，请使用接口选择器（在 MAC 地址后附加 `%` 和接口名称）。例如：`/ping 00:11:22:33:44:55%ether1`
:::
