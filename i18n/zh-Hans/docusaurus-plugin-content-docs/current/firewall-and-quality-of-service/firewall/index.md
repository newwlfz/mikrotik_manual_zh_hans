---
sidebar_key: "firewall-and-quality-of-service/firewall"
title: "防火墙"
sidebar_label: "防火墙"
description: "MikroTik RouterOS 防火墙提供有状态和无状态数据包过滤、NAT 以及高级流量分类，以保护网络数据流并防止未经授权的访问。它包含 filter/raw、mangle 和 nat 模块，并带有预定义链，可实现高效的规则管理。"
tags:
  - 'firewall'
  - 'packet-flow'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/firewall
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

![Firewall fundamentals](/img/f4625aee0e2b1d17.webp)

防火墙通过利用连接跟踪实现有状态数据包过滤，并提供无状态数据包过滤，从而提供用于管理发往路由器、来自路由器以及经过路由器的数据流的安全功能。它与网络地址转换 (NAT) 一起，可作为防止未经授权访问直连网络和路由器本身的工具，同时也可作为出站流量的过滤器。

网络防火墙可防止外部威胁接触网络内部可用的敏感数据。每当不同网络连接在一起时，总存在来自网络外部的人闯入你的 LAN 的威胁。此类入侵可能导致私有数据被窃取和传播、有价值的数据被篡改或销毁，或者整个硬盘被擦除。防火墙被用作防止或最小化连接到其他网络时固有安全风险的手段。配置正确的防火墙在高效且安全的网络基础设施部署中起着关键作用。

MikroTik RouterOS 具有非常强大的防火墙实现，其功能包括：

- 无状态数据包检查。
- 有状态数据包检查。
- 第 7 层协议检测。
- 对等协议过滤。
- 流量分类依据：
  - 源 MAC 地址。
  - IP 地址（网络或列表）和地址类型（广播、本地、组播、单播）。
  - 端口或端口范围。
  - IP 协议。
  - 协议选项（ICMP 类型和代码字段、TCP 标志、IP 选项和 MSS）。
  - 数据包进入或离开的接口。
  - 内部流和连接标记。
  - DSCP 字节。
  - 数据包内容。
  - 数据包到达速率和序列号。
  - 数据包大小。
  - 数据包到达时间。

以及更多内容！

防火墙分为三个主要模块：

- **filter/raw** - 用于根据配置的策略拒绝流量。如果不需要连接跟踪，在 RAW 表中进行过滤可以节省资源。
- **mangle** - 用于标记特定连接、数据包、流，设置优先级以及执行其他任务。
- **nat** - 用于设置地址转换规则、重定向和端口转发。

## 链 {#chains}

防火墙过滤规则按链分组。这样可以让数据包在一个链中与一项共同条件匹配，然后传递到另一个链以根据其他共同条件进行处理。

例如，数据包应匹配 IP 地址:端口对。当然，可以通过向 forward 链添加所需数量的 IP 地址:端口匹配规则来实现，但更好的方法可能是添加一条匹配来自特定 IP 地址的流量的规则。然后，可以将针对不同端口执行匹配的规则添加到 "**mychain**" 链中，而无需指定 IP 地址。

```ros
/ip/firewall/filter 
add chain=mychain protocol=tcp dst-port=22 action=accept
add chain=mychain protocol=tcp dst-port=23 action=accept

add action=jump chain=input src-address=1.1.1.2/32 jump-target="mychain"
```

处理链时，规则按列出顺序从上到下从链中获取。如果数据包匹配规则的条件，则对其执行指定动作，并且不再处理该链中的更多规则（例外是 **passthrough** 动作和某些 [Mangle](./mangle.md) 动作）。

如果数据包未匹配链中的任何规则，则它会被接受。

每个防火墙模块都有其自己的预定义链：

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

更详细的 RouterOS 数据包处理在 [RouterOS 中的数据包流程](../packet-flow-in-routeros.md) 图中描述。
