---
sidebar_key: "system-information-and-utilities/ip-packing"
sidebar_position: 7
title: "IP 打包"
sidebar_label: "IP 打包"
description: "IP Packing 会将链路上的出站数据包收集成更大的数据包，并可对其进行压缩；另一台路由器会将它们解包。两台路由器都需要在该链路上进行邻居发现。"
tags:
  - 'ip-packing'
  - 'packet-aggregation'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/ip-packing
captured_at: '2026-11-04T11:22:08+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

IP Packing 会把接口的出站数据包收集成更大的数据包（聚合），并且还能对它们进行压缩。链路另一端的路由器会再次将它们解包。两台路由器都运行 RouterOS；打包是 system 软件包的一部分。在那些大量小数据包的代价高于少量大数据包的链路上使用它。

:::warning
路由器自身通过打包链路发起的 TCP 连接会失败，例如 fetch 或带宽测试。解包后承载数据的 TCP 段会以错误的校验和到达并被丢弃，因此这些连接永远无法完成。Ping 可以通过。在把打包功能启用到生产链路之前，请先在测试链路上测试你需要的流量。
:::

## 先决条件 {#prerequisites}

- [邻居发现](./neighbor-discovery.md) 在两端路由器的该接口上运行：[`/ip/neighbor/discovery-settings`](../cli-reference/ip/neighbor/discovery-settings.md) 中的 `discover-interface-list` 包含该接口。默认配置只在 `LAN` 接口列表上进行发现，因此隧道或 WAN 接口需要一个包含它的列表。`LAN` 列表还决定默认防火墙信任什么，因此请为发现使用单独的列表，而不是把这样的接口添加到 `LAN` 中。例如，一个同时包含 `LAN` 列表和 `ether1` 的列表：

  ```ros
  /interface/list/add name=discover include=LAN
  /interface/list/member/add list=discover interface=ether1
  /ip/neighbor/discovery-settings/set discover-interface-list=discover
  ```

- 两台路由器共享一条二层链路：一根网线、一条桥接的无线链路或一个 EoIP 隧道。打包后的数据包在以太网帧中传输，而邻居发现工作在二层。
- 两台路由器对称配置：一台路由器打包的内容由另一台解包。只有当邻居通告它会解包时，路由器才会向该邻居打包。

## 配置打包 {#configure-packing}

Router-A 和 Router-B 用一根网线相连，分别接在 Router-A 的 `ether1` 和 Router-B 的 `ether3` 上。本示例聚合 Router-A 发送的数据包，而 Router-B 发出的数据包保持原样。

在 Router-A 上：

```ros
/ip/packing/add interface=ether1 packing=simple unpacking=none
```

在 Router-B 上：

```ros
/ip/packing/add interface=ether3 packing=none unpacking=simple
```

要在两个方向上都打包，请在两端路由器上都设置 `packing=simple unpacking=simple`。

默认的 `aggregated-size` 为 1500 字节，这是打包在发送数据包之前试图达到的大小。

在 WinBox 中，打开 **IP > Packing** 并选择 **New**：

1. 在 **Interface** 中选择链路接口，例如 Router-A 上的 `ether1`。截图显示的是尚未选择接口时的新规则。
2. 设置 **Packing**、**Unpacking** 和 **Aggregated Size**，使其与流量方向以及另一台路由器上的设置相匹配。对于示例中的 Router-A，使用 `simple`、`none` 和 `1500`，然后选择 **OK**。

![WinBox new IP Packing rule](/img/6a0182a999b77dc7.webp)

## 检查打包是否正常工作 {#check-that-packing-works}

每台路由器都会通过邻居发现通告自己的解包设置。在 Router-A 上运行 `/ip/neighbor/print detail where interface=ether1`：Router-B 对应的条目会显示 `unpack=simple`，因为 Router-B 会解包。在 Router-B 上，Router-A 对应的条目显示 `unpack=none`。值 `none`、`simple`、`uncompress-headers` 和 `uncompress-all` 分别对应于 `unpacking` 设置 `none`、`simple`、`compress-headers` 和 `compress-all`。

当远端路由器在该接口上没有邻居条目，或其条目显示 `unpack=none` 时，路由器不会向它打包，而是按原样发送数据包。

在抓包中，打包后的帧的 EtherType 为 0x9000。

## 延迟 {#latency}

打包会短暂地暂留数据包以便将它们合并，因此会增加延迟。在高速链路上，ping 往返时间可能从不到一毫秒上升到数十毫秒。对于语音和其他实时流量，需要考虑这一点。

有关所有参数，请参阅 [`/ip/packing`](../cli-reference/ip/packing.md) 和 [`/ip/neighbor/discovery-settings`](../cli-reference/ip/neighbor/discovery-settings.md) 的 CLI 参考。
