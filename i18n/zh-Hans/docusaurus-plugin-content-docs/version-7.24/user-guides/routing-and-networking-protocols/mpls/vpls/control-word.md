---
title: "控制字"
description: "RouterOS 中的 VPLS 使用 Control Words（CW）进行数据包分片和重组，并增加 4 字节开销以处理 L2MTU 限制。CW 字段包括标志、分片指示符、长度和用于数据包跟踪的序列号，其使用由 `use-control-word` 参数控制。"
tags:
  - 'vpls'
  - 'mpls'
  - 'control-word'
  - 'fragmentation'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/mpls/vpls/control-word
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "user-guides/routing-and-networking-protocols/mpls/vpls"
pagination_next: "user-guides/routing-and-networking-protocols/multicast"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

VPLS 通过在分组交换网络（PSN）上以**伪线（PW）**隧道连接站点，使远程站点共享以太网广播域。由于 VPLS 封装会增加额外开销，LSP 中的每个接口都应能够传输足够大的数据包。

每种以太网芯片组对其可传输的最大数据包大小都有硬件限制。即使现在，仍有一些以太网仅支持一个 Vlan 标签，这意味着不含以太网头和校验和的最大数据包大小（L2MTU）为 1504 字节。显然，这不足以在不分片的情况下转发 VPLS 封装的以太网帧（至少需要支持 1526 L2MTU）。有关 RouterBOARD 支持的最大 L2MTU，请参阅 [RouterOS 中的 MTU](/docs/hardware/mtu-in-routeros)。

由于并非所有 RouterBOARD 都支持足够的 L2MTU 来在不分片的情况下传输 VPLS 封装的数据包，RouterOS 根据 RFC 4623 增加了对伪线分片与重组（PWE3）的支持，使用 4 字节的**控制字（CW）**。

## 控制字用法 {#control-word-usage}

在 RouterOS 中，控制字用于 VPLS 隧道内的数据包分片与重组。这是通过可选的**控制字（CW）**实现的。CW 添加在 PW 标签（解复用器）和数据包载荷之间，并增加 4 字节的额外开销。

:::warning
未实现 OOO 数据包重排序，乱序分片将被丢弃
:::

CW 的使用由 VPLS 配置中的 `use-control-word` 参数控制。

![](/img/53a24ce6c27ddc30.jpg#gh-light-mode-only)
![](/img/012019abb10aff98.png#gh-dark-mode-only)

如你所见，**控制字**分为 5 个字段：

- 0000 - 4 bit，标识该数据包为 PW（不是 IP）。
- Flags - 4 bit。
- Frag - 2 bit 值，指示载荷分片。
- Len - 6 bit。
- Seq - 16 bit 序列号，用于检测数据包丢失 / 乱序。

根据 RFC，序列号的生成和处理是可选的。
