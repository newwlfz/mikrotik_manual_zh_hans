---
sidebar_key: "routing-and-networking-protocols/mpls/vpls/control-word"
sidebar_position: 1
title: "控制字"
sidebar_label: "控制字"
description: "VPLS 在 RouterOS 中使用 Control Words (CW) 进行数据包分片和重组，增加 4 字节开销以处理 L2MTU 限制。CW 字段包括 flags、fragmentation indicators、length 和用于数据包跟踪的 sequence numbers，其使用由 `use-control-word` 参数控制。"
tags:
  - 'vpls'
  - 'mpls'
  - 'control-word'
  - 'fragmentation'
slug: /user-guides/routing-and-networking-protocols/mpls/vpls/control-word
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/mpls/vpls/control-word
captured_at: '2026-11-04T11:33:59+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

VPLS 允许远程站点通过分组交换网络（PSN）上的 **伪线（PW）** 隧道连接站点，从而共享一个 Ethernet 广播域。由于 VPLS 封装会增加额外开销，LSP 中的每个接口都应能够传输足够大的数据包。

每个 Ethernet 芯片组在可传输的最大数据包大小方面都有硬件限制。即使现在，仍有只支持一个 Vlan 标签的 Ethernet 网络，这意味着不含 Ethernet 头部和校验和的最大数据包大小（L2MTU）为 1504 字节。显然，这不足以在不进行分片的情况下转发经过 VPLS 封装的 Ethernet 帧（至少需要支持 1526 的 L2MTU）。有关 RouterBOARD 上支持的最大 L2MTU，请参阅 [RouterOS 中的 MTU](../../../../hardware/mtu-in-routeros.md)。

由于并非所有 RouterBOARD 都支持足够大的 L2MTU 来在不进行分片的情况下传输经过 VPLS 封装的数据包，RouterOS 根据 RFC 4623 增加了使用 4 字节 **Control Word (CW)** 的伪线分片与重组（PWE3）支持。

## Control Word 的使用 {#control-word-usage}

在 RouterOS 中，Control Word 用于 VPLS 隧道内的数据包分片和重组。这是通过使用可选的 **Control Word (CW)** 来实现的。CW 被添加在 PW 标签（解复用器）和数据包有效载荷之间，并增加额外的 4 字节开销。

:::warning
未实现 OOO 数据包的重排序，乱序分片将被丢弃
:::

CW 的使用由 VPLS 配置中的 `use-control-word` 参数控制。

![](/img/53a24ce6c27ddc30.jpg#gh-light-mode-only)
![](/img/012019abb10aff98.png#gh-dark-mode-only)

如你所见，**Control Word** 被划分为 5 个字段：

- 0000 - 4 位，标识该数据包是 PW（不是 IP）。
- Flags - 4 位。
- Frag - 2 位值，表示有效载荷分片。
- Len - 6 位。
- Seq - 16 位序列号，用于检测数据包丢失/乱序。

根据 RFC，序列号的生成和处理是可选的。
