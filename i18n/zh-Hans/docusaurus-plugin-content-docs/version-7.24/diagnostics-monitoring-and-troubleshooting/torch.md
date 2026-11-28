---
title: "Torch"
description: "MikroTik Torch 是一款实时流量监控工具，用于观察通过接口的网络流，可分析源地址/目标地址、端口、协议、MAC、VLAN ID 和 DSCP 值，以便进行故障排查。"
tags:
  - 'traffic-monitoring'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/torch
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik Torch 是实时流量监控工具，用于观察通过指定接口的流量。它是实时排查故障和分析网络负载的重要工具。

观看有关此功能的[视频](https://youtu.be/45E2uwI3xhc)。

:::warning
Torch 捕获的流量是在经过防火墙过滤之前看到的。这意味着你将看到最终可能会被防火墙规则丢弃的数据包。
:::

```ros
/tool/torch interface=ether1 src-address=0.0.0.0/0 dst-address=0.0.0.0/0
```

你可以监控按以下类别分类的流量：

- 源地址和目的地址（IPv4 和 IPv6）。
- 端口和协议。
- MAC 协议和 MAC 地址。
- VLAN ID。
- DSCP。

### 使用示例 {#usage-example}

要监控来自特定子网中 `ether1` 的 HTTP 和 HTTPS 流量（接口可以作为未命名参数）：

```ros
/tool/torch ether1 port=80,443 src-address=192.168.88.0/24
```

Torch 会在所选接口上显示所选协议以及每个条目的 TX/RX 数据速率。

:::warning
启用 client-to-client forwarding 时，Wireless 客户端之间的单播流量不会对 Torch 工具可见。同样，通过网桥上的 hardware-offloading 处理的数据包也不会可见（但未知单播、广播和部分组播流量仍将可见）。
:::
