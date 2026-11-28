---
title: "无线站点模式"
description: "本页介绍 MikroTik RouterOS 无线 station 模式，说明它们在 L2 地址处理方面的差异以及是否适合网桥。内容涵盖标准 station 模式、用于 WDS 连接的 station-wds、pseudobridge 模式，以及适用性矩阵和协议支持详情。"
tags:
  - 'station-modes'
  - 'l2-bridging'
  - 'wireless-protocols'
source: https://manual.mikrotik.com/docs/7.24/wireless/user-guides/wireless-station-modes
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "mobile-networking"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概述 {#overview}

处于任一 *station* 模式的无线接口会搜索可接受的接入点（AP）并连接到该接入点。station 与 AP 之间的连接行为会因所使用的 *station* 模式类型而略有不同，因此必须为特定应用和设备选择正确的模式。本文尝试说明可用 *station* 模式之间的差异。

*station* 模式之间的主要区别在于 L2 地址如何跨无线链路处理和转发。这会直接影响无线链路作为 L2 桥接基础设施一部分的能力。

如果不需要通过无线链路进行 L2 桥接，例如路由网络或 MPLS 交换网络，建议使用基本的 **mode=station** 配置，该配置可提供最高效率。

特定 *station* 模式的可用性取决于无线网络中使用的 **wireless-protocol** 以及已安装的驱动程序（[`wireless` 或 `wifi-qcom`](/docs/wireless#which-section-is-for-my-device)）。有关协议对模式的支持信息，请参阅[适用性矩阵](#applicability-matrix)。即使某个协议不支持特定模式，station 与 AP 之间仍可能建立连接。请注意，此类连接在 L2 桥接方面的行为可能不符合预期。

## 802.11 对 L2 桥接的限制 {#80211-limitations-for-l2-bridging}

从历史上看，802.11 AP 设备应当能够在有线网段和无线网段之间桥接帧，但 station 设备不应执行 L2 桥接。

请考虑以下网络：

```
[X]---[AP]-(     )-[STA]---[Y]
```

其中 X-to-AP 和 STA-to-Y 是以太网链路，而 AP-to-STA 通过无线方式连接。根据 802.11，AP 可以在 X 和 STA 之间透明桥接流量，但无法在 AP 和 Y 之间，或 X 和 Y 之间桥接流量。

802.11 标准规定，站点与 AP 设备之间的帧必须以所谓的 *3 address* 帧格式传输，即帧头包含 3 个 MAC 地址。从 AP 发送到站点的帧包含以下地址：

- 目标地址 - 站点设备的地址，也是无线接收器地址；
- 无线发送器地址 - AP 的地址；
- 源地址 - 特定帧发起者的地址。

从站点发送到 AP 的帧包含以下地址：

- 无线接收器地址 - AP 的地址；
- 源地址 - 站点设备的地址，也是无线发送器地址；
- 目标地址。

考虑到每个帧都必须包含无线发送器和接收器地址，显然 *3 address* 帧格式不适合通过站点进行透明 L2 桥接，因为站点无法发送源地址与其自身地址不同的帧，例如来自 Y 的帧；同时，AP 也无法将帧格式化为包含 Y 地址的形式。

802.11 包含一种额外的帧格式，即所谓的 *4 address* 帧格式，用于“wireless distribution system”（WDS），这是一种以无线方式互连 AP 的系统。在该格式中增加了一个地址，生成的帧头包含以下地址：

- 无线接收器地址；
- 无线发送器地址；
- 目标地址；
- 源地址。

该帧格式包含通过无线链路进行透明 L2 桥接所需的全部信息。遗憾的是，802.11 并未规定 WDS 连接应如何建立和管理，因此 *4 address* 帧格式（以及 WDS）的任何使用都取决于具体实现。

不同的 *station* 模式尝试解决标准 station 模式的不足，以提供对 L2 网桥的支持。

## 适用性矩阵 {#applicability-matrix}

以下矩阵列出了每种受支持的无线协议和驱动程序可用的 *station* 模式。请注意，802.11 协议有 2 列：**802.11** 指定该模式在“纯” 802.11 网络中的可用性（连接到任意厂商 AP 时），**ROS 802.11** 指定连接到实现了该模式所需专有扩展的 RouterOS AP 时该模式的可用性。

*该表适用于 RouterOS v5rc11 及更高版本：*

|  | 802.11 | ROS 802.11 `wireless` | nstreme `wireless` | nv2 `wireless` | ROS 802.11 `wifi-qcom` |
| :-- | :-- | :-- | :-- | :-- |  :-- |
| **station** | V | V | V | V | V |
| **station-wds** |  | V | V | V | |
| **station-pseudobridge** | V | V | V |  | V |
| **station-pseudobridge-clone** | V | V | V |  | |
| **station-bridge** |  | V | V | V | V |

## *station* 模式 {#mode-station}

这是标准模式，不支持在 station 上进行 L2 桥接，将无线接口加入网桥不会产生预期结果。另一方面，该模式可视为效率最高的模式，因此在不需要在 station 上进行 L2 桥接时应使用该模式，例如路由网络或 MPLS 交换网络。所有无线协议均支持该模式。

## *station-wds* 模式 {#mode-station-wds}

该模式仅适用于 RouterOS AP。建立连接协商后，会在 AP 上为指定 station 创建单独的 WDS 接口。该接口可视为 AP 与指定 station 之间的点对点连接：从 WDS 接口发出的任何内容都会传送到该 station（且仅传送到该特定 station），station 发送到 AP 的任何内容都会从 WDS 接口接收（且不会在 AP 客户端之间转发），并保留 L2 地址。

除 802.11 协议用于连接非 RouterOS 设备的情况外，所有无线协议均支持该模式。与 802.11 协议一起使用时，该模式使用 *4 address* 帧格式；对于其他协议（例如 nstreme 或 nv2），则使用协议内部方式。

该模式可安全用于 L2 网桥，并通过单独的 WDS 接口在 AP 上提供最多的管理控制，例如使用网桥防火墙、RSTP 进行环路检测和避免等。

使用 station-wds 模式时，无法连接到 CAPsMAN 控制的 CAP。

## *station-pseudobridge* 模式 {#mode-station-pseudobridge}

从无线连接的角度来看，该模式与标准 station 模式相同。它通过 station 中实现的一些服务，对 L2 网桥提供有限支持：

- IPv4 数据包的 MAC 地址转换 - station 维护 IPv4 到 MAC 的映射表，在向 AP 发送帧时将源 MAC 地址替换为自身地址（以便使用 *3 address* 帧格式），并在收到来自 AP 的帧时，将目的 MAC 地址替换为映射表中的地址。IPv4 到 MAC 的映射也会为 VLAN 封装帧建立。
- 其余协议的单一 MAC 地址转换 - station 从第一个转发的非 IPv4 帧中学习源 MAC 地址，并将其用作反向转换的默认值。如果无法执行 IPv4 到 MAC 映射（例如非 IPv4 帧或缺少映射），则该 MAC 地址用于替换从 AP 收到的帧中的目的 MAC 地址。

该模式仅限于将数据完整 L2 桥接到连接到 station 的单个设备（通过单一 MAC 地址转换），并对 IPv4 帧桥接提供部分支持。将非 IP 协议桥接到多个设备将无法工作。此外，MAC 地址转换将 AP 侧对 station 设备的访问限制为基于 IPv4 的访问，其余协议将通过单一 MAC 地址转换，不会被 station 自身接收。

该模式适用于除 nv2 之外的所有协议，***应尽可能避免使用***。只有在 AP 不支持更好的 L2 网桥模式（例如使用非 RouterOS AP）时，或者只能通过 station 设备将单个终端用户设备连接到网络时，才可以使用该模式。

## 模式 *station-pseudobridge-clone* {#mode-station-pseudobridge-clone}

该模式与 *station-pseudobridge* 模式相同，区别在于它使用“克隆”的 MAC 地址连接到 AP，该地址可以是 **station-bridge-clone-mac** 参数中配置的的地址（如果已配置），也可以是第一个转发帧的源地址。这在 AP 上看起来本质上像是连接到 station 的终端用户设备连接到了 AP。

## 模式 *station-bridge* {#mode-station-bridge}

该模式仅适用于 RouterOS AP，并在 station 设备上提供与协议无关的透明 L2 网桥支持。当通过 **bridge-mode** 参数启用时，RouterOS AP 接受处于 *station-bridge* 模式的客户端。在该模式下，AP 维护一张转发表，记录哪些 MAC 地址可通过哪个 station 设备到达。

该模式为 MikroTik 专有模式，不能用于连接其他品牌的设备。

该模式可安全用于 L2 网桥，并且是首选模式，除非有特定原因需要使用 *station-wds* 模式。使用 station-bridge 模式时，无法连接到由 CAPsMAN 控制的 CAP。
