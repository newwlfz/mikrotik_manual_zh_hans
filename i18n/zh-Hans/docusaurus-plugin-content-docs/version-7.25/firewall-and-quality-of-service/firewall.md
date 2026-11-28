---
title: "防火墙"
description: "MikroTik RouterOS 防火墙提供有状态和无状态数据包过滤、NAT 和高级流量分类，以保护网络数据流并防止未经授权的访问。它包含 filter/raw、mangle 和 nat 模块，并带有预定义链，便于高效管理规则。"
tags:
  - 'firewall'
  - 'packet-flow'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/firewall
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

![Firewall fundamentals](/img/f4625aee0e2b1d17.webp)

防火墙实现有状态（利用连接跟踪）和无状态数据包过滤，并提供用于管理流入、流出和穿过路由器的数据流的安全功能。它与 Network Address Translation（NAT）一起，可作为防止未经授权访问直连网络和路由器自身的工具，也可作为出站流量的过滤器。

网络防火墙使外部威胁远离网络内部的敏感数据。当不同网络互连时，始终存在来自网络外部的人员闯入 LAN 的威胁。此类入侵可能导致私有数据被盗取和传播、重要数据被篡改或破坏，或整个硬盘被擦除。防火墙用于防止或降低连接其他网络时固有的安全风险。正确配置的防火墙在高效且安全的网络基础设施部署中发挥关键作用。

MikroTik RouterOS 具有非常强大的防火墙实现，功能包括：

- 无状态数据包检查。
- 有状态数据包检查。
- Layer-7 协议检测。
- 对等协议过滤。
- 按以下条件对流量进行分类：
  - 源 MAC 地址。
  - IP 地址（网络或列表）和地址类型（广播、本地、组播、单播）。
  - 端口或端口范围。
  - IP 协议。
  - 协议选项（ICMP 类型和代码字段、TCP 标志、IP 选项和 MSS）。
  - 数据包进入或离开的接口。
  - 内部流标记和连接标记。
  - DSCP 字节。
  - 数据包内容。
  - 数据包到达速率和序列号。
  - 数据包大小。
  - 数据包到达时间。

以及更多功能！

防火墙分为三个主要模块：

- **filter/raw** - 用于根据配置的策略拒绝流量。如果不需要连接跟踪，在 RAW 表中进行过滤可以节省资源。
- **mangle** - 用于标记特定连接、数据包、流，设置优先级以及执行其他任务。
- **nat** - 用于设置地址转换规则、重定向和端口转发。

## Chains

防火墙过滤规则按链分组。这样可以在一个链中按通用条件匹配数据包，然后将其传递到另一个链，按其他通用条件进行处理。

例如，应将数据包与 IP 地址：端口对进行匹配。当然，可以通过在 forward 链中添加任意数量的 IP 地址：端口匹配规则来实现，但更好的方式是添加一条匹配来自特定 IP 地址的流量的规则。然后，可以将针对单独端口执行匹配的规则添加到“**mychain**”链中，而无需指定 IP 地址。

```ros
/ip/firewall/filter 
add chain=mychain protocol=tcp dst-port=22 action=accept
add chain=mychain protocol=tcp dst-port=23 action=accept

add action=jump chain=input src-address=1.1.1.2/32 jump-target="mychain"
```

处理链时，规则按其在链中的排列顺序从上到下依次执行。如果数据包符合某条规则的条件，则对其执行指定的动作，并且不再处理该链中的其他规则（例外情况是 **passthrough** 动作和某些 [Mangle](/docs/7.24/firewall-and-quality-of-service/firewall/mangle) 动作）。

如果数据包未匹配链中的任何规则，则会被接受。

每个防火墙模块都有各自的预定义链：

- **raw**：
  - prerouting
  - output
- **filter**：
  - input
  - forward
  - output
- **mangle**：
  - prerouting
  - input
  - forward
  - output
  - postrouting
- **nat**：
  - srcnat
  - dstnat
  - input
  - output

RouterOS 中更详细的数据包处理过程见 [Packet Flow in the RouterOS](/docs/7.24/firewall-and-quality-of-service/packet-flow-in-routeros) 图示。
