---
sidebar_key: "wireless/user-guides/wireless-station-modes"
sidebar_position: 2
title: "无线站点模式"
sidebar_label: "无线站点模式"
description: "本页介绍 MikroTik RouterOS 无线 station 模式，说明它们在 L2 地址处理和桥接适用性方面的差异。内容涵盖标准 station 模式、用于 WDS 连接的 station-wds 以及 pseudobridge 模式，并包含适用性矩阵和协议支持详情。"
tags:
  - 'station-modes'
  - 'l2-bridging'
  - 'wireless-protocols'
source: https://manual.mikrotik.com/docs/wireless/user-guides/wireless-station-modes
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#overview}

任何 *station* 模式下的无线接口都会搜索可接受的接入点（AP）并连接到它。站点与 AP 之间的连接行为会因所使用的 *station* 模式类型而略有不同，因此必须针对给定应用和设备选择正确的模式。本文试图描述可用 *station* 模式之间的差异。

*station* 模式之间的主要区别在于 L2 地址如何被处理并在无线链路上转发。这直接影响无线链路作为 L2 桥接基础设施一部分的能力。

如果不需要通过无线链路进行 L2 桥接——例如在路由或 MPLS 交换网络中——建议使用基本的 **mode=station** 设置，这将提供最高效率。

特定 *station* 模式的可用性取决于无线网络中使用的 **wireless-protocol** 以及已安装的驱动程序（[`wireless` 或 `wifi-qcom`](../index.md#which-section-is-for-my-device)）。有关协议中模式支持的信息，请参阅[适用性矩阵](#applicability-matrix)。即使给定协议不支持特定模式，站点与 AP 之间的连接仍有可能建立。请注意，此类连接在 L2 桥接方面的行为将不符合预期。

## 802.11 对 L2 桥接的限制 {#80211-limitations-for-l2-bridging}

历史上，802.11 AP 设备本应能够在有线网段与无线之间桥接帧，但站点设备本不应进行 L2 桥接。

考虑以下网络：

```
[X]---[AP]-(     )-[STA]---[Y]
```

其中 X-to-AP 和 STA-to-Y 是有线以太网链路，但 AP-to-STA 是无线连接。根据 802.11，AP 可以透明地在 X 和 STA 之间桥接流量，但无法在 AP 和 Y 之间，或 X 和 Y 之间桥接流量。

802.11 标准规定，站点与 AP 设备之间的帧必须以所谓的 *3 address* 帧格式传输，这意味着帧头包含 3 个 MAC 地址。从 AP 传输到站点的帧具有以下地址：

- 目的地址——站点设备的地址，也是无线电接收方地址；
- 无线电发送方地址——AP 的地址；
- 源地址——特定帧的发起方地址。

从站点传输到 AP 的帧具有以下地址：

- 无线电接收方地址——AP 的地址；
- 源地址——站点设备的地址，也是无线电发送方地址；
- 目的地址。

考虑到每个帧都必须包含无线电发送方和接收方地址，显然 *3 address* 帧格式不适合在站点上进行透明 L2 桥接，因为站点无法发送源地址不同于自身地址的帧（例如来自 Y 的帧），同时 AP 也无法以包含 Y 地址的方式构造帧。

802.11 还包含一种额外的帧格式，即所谓的 *4 address* 帧格式，用于“无线分布系统”（WDS）——一种以无线方式互连 AP 的系统。在这种格式中会增加一个地址，从而生成包含以下地址的帧头：

- 无线电接收方地址；
- 无线电发送方地址；
- 目的地址；
- 源地址。

这种帧格式包含在无线链路上进行透明 L2 桥接所需的所有必要信息。遗憾的是，802.11 未规定应如何建立和管理 WDS 连接，因此 *4 address* 帧格式（以及 WDS）的任何使用都取决于具体实现。

不同的 *station* 模式试图解决标准 station 模式的缺点，以提供对 L2 桥接的支持。

## 适用性矩阵 {#applicability-matrix}

以下矩阵列出了每种受支持的无线协议和驱动程序可用的 *station* 模式。请注意，802.11 协议有 2 列：**802.11** 指定该模式在“纯”802.11 网络中的可用性（连接到任何厂商的 AP 时），而 **ROS 802.11** 指定连接到实现了该模式正常工作所需专有扩展的 RouterOS AP 时的可用性。

*该表适用于 RouterOS v5rc11 及更高版本：*

|  | 802.11 | ROS 802.11 `wireless` | nstreme `wireless` | nv2 `wireless` | ROS 802.11 `wifi-qcom` |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| **station** | V | V | V | V | V |
| **station-wds** |  | V | V | V | |
| **station-pseudobridge** | V | V | V |  | V |
| **station-pseudobridge-clone** | V | V | V |  | |
| **station-bridge** |  | V | V | V | V |

## *station* 模式 {#mode-station}

这是一种标准模式，不支持在站点上进行 L2 桥接——尝试将无线接口加入网桥不会产生预期结果。另一方面，此模式可被视为最高效的模式，因此如果不需要在站点上进行 L2 桥接——例如在路由或 MPLS 交换网络中——就应使用此模式。所有无线协议均支持此模式。

## *station-wds* 模式 {#mode-station-wds}

此模式仅适用于 RouterOS AP。协商连接后，会在 AP 上为给定站点创建一个单独的 WDS 接口。可以将此接口视为 AP 与给定站点之间的点对点连接——从 WDS 接口发出的任何内容都会交付给该站点（且仅交付给该特定站点），而站点发送给 AP 的任何内容都会从 WDS 接口接收（且不会在 AP 客户端之间转发），同时保留 L2 地址。

除连接到非 RouterOS 设备时使用 802.11 协议的情况外，所有无线协议均支持此模式。与 802.11 协议一起使用时，此模式使用 *4 address* 帧格式；对于其他协议（如 nstreme 或 nv2），则使用协议内部机制。

此模式可安全用于 L2 桥接，并通过单独的 WDS 接口在 AP 上提供最多的管理控制，例如使用网桥防火墙、用于环路检测和避免的 RSTP 等。

在 station-wds 模式下，无法连接到由 CAPsMAN 控制的 CAP。

## *station-pseudobridge* 模式 {#mode-station-pseudobridge}

从无线连接的角度看，此模式与标准 station 模式相同。它通过站点中实现的某些服务提供有限的 L2 桥接支持：

- IPv4 数据包的 MAC 地址转换——站点维护 IPv4 到 MAC 的映射表，在向 AP 发送帧时用自身地址替换源 MAC 地址（以便能够使用 *3 address* 帧格式），并对从 AP 接收的帧用映射表中的地址替换目的 MAC 地址。对于 VLAN 封装的帧，也会构建 IPv4 到 MAC 的映射。
- 对其余协议进行单一 MAC 地址转换——站点从第一个被转发的非 IPv4 帧中学习源 MAC 地址，并将其用作反向转换的默认地址——如果无法执行 IPv4 到 MAC 映射（例如非 IPv4 帧或缺少映射），则使用此 MAC 地址替换从 AP 接收的帧的目的 MAC 地址。

此模式仅限于通过单一 MAC 地址转换将数据完整地 L2 桥接到连接到站点的一台设备，并对 IPv4 帧桥接提供一定支持——将非 IP 协议桥接到多台设备将无法工作。此外，MAC 地址转换会将从 AP 侧对站点设备的访问限制为基于 IPv4 的访问——其余协议将通过单一 MAC 地址转换进行转换，而不会由站点本身接收。

除 nv2 外，所有协议均可使用此模式，并且***应尽可能避免***。仅当 AP 不支持更好的 L2 桥接模式（例如使用非 RouterOS AP 时），或仅有一台终端用户设备必须通过站点设备连接到网络时，使用此模式才有正当理由。

## *station-pseudobridge-clone* 模式 {#mode-station-pseudobridge-clone}

此模式与 *station-pseudobridge* 模式相同，不同之处在于它使用“克隆”的 MAC 地址连接到 AP——该地址要么是 **station-bridge-clone-mac** 参数中配置的地址（如果已配置），要么是第一个被转发帧的源地址。在 AP 看来，这实质上就像是连接到站点的一台终端用户设备连接到了 AP。

## *station-bridge* 模式 {#mode-station-bridge}

此模式仅适用于 RouterOS AP，并在站点设备上提供对与协议无关的透明 L2 桥接的支持。当使用 **bridge-mode** 参数启用时，RouterOS AP 会接受处于 *station-bridge* 模式的客户端。在此模式下，AP 维护一个转发表，其中包含哪些 MAC 地址可通过哪个站点设备到达的信息。

此模式为 MikroTik 专有模式，不能用于连接到其他品牌的设备。

此模式可安全用于 L2 桥接，并且是首选模式，除非有特定理由使用 *station-wds* 模式。在 station-bridge 模式下，无法连接到由 CAPsMAN 控制的 CAP。
