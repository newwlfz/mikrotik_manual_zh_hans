---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/torch"
sidebar_position: 3
title: "Torch"
sidebar_label: "Torch"
description: "MikroTik Torch 是一种实时流量监控工具，可观察流经接口的网络流量，从而能够分析源/目的地址、端口、协议、MAC、VLAN ID 和 DSCP 值，以便进行故障排查。"
tags:
  - 'traffic-monitoring'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/torch
captured_at: '2026-11-04T11:28:04+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik Torch 是一个实时流量监控工具，用于观察通过特定接口的流量。它是实时排查故障和分析网络负载的重要实用工具。

观看我们[关于此功能的视频](https://youtu.be/45E2uwI3xhc)。

:::warning
Torch 捕获的流量是在被防火墙过滤之前看到的。这意味着你会看到最终可能被防火墙规则丢弃的数据包。
:::

```ros
/tool/torch interface=ether1 src-address=0.0.0.0/0 dst-address=0.0.0.0/0
```

你可以监控按以下方式分类的流量：

- 源地址和目的地址（IPv4 和 IPv6）。
- 端口和协议。
- MAC 协议和 MAC 地址。
- VLAN ID。
- DSCP。

### 使用示例 {#usage-example}

要监控来自特定子网的 `ether1` 上的 HTTP 和 HTTPS 流量（接口可以作为未命名参数）：

```ros
/tool/torch ether1 port=80,443 src-address=192.168.88.0/24
```

Torch 会显示所选协议以及所选接口上每个条目的 TX/RX 数据速率。

:::warning
启用了客户端到客户端转发的无线客户端之间的单播流量对 Torch 工具不可见。同样，通过桥接上的硬件卸载处理的报文也不可见（不过未知单播、广播和部分组播流量仍然可见）。
:::
