---
sidebar_key: "internet-of-things/lora/index"
sidebar_position: 3
title: "LoRa"
sidebar_label: "LoRa"
description: "本页介绍 MikroTik RouterOS LoRa 和 LoRaWAN 配置，涵盖网关设置、通用属性、服务器集成以及使用 MQTT/HTTP 的非 LoRaWAN 有效载荷转发。其中详细说明了支持的硬件、拓扑元素以及加密有效载荷的脚本要求。"
tags:
  - 'lora'
  - 'lorawan'
  - 'mqtt'
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/lora
captured_at: '2026-11-04T11:18:26+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 RouterOS 中的 LoRa 和 LoRaWAN 功能。使用它来配置 LoRa 网关、通用属性以及与受支持的 LoRaWAN 网络的集成。

<DocCardList />

可用设置：

- ## [通用属性](./general-properties.md)

网关初始步骤和不同的 LoRaWAN 设置示例：

- ## [用户指南](./user-guides/index.md)

术语“LoRa”表示“无线电”本身（“LoRa 负载”是节点使用 LoRa 频率广播的数据包），而术语“LoRaWAN”表示位于其上的逻辑/链路层，用于实现“LoRa”设备之间的通信。换句话说，“LoRaWAN”是“LoRa”无线电设备进行通信的方式。

**R11e-LR8**（工作在 863-870 MHz 频率）、**R11e-LR9**（工作在 902-928 MHz 频率）和 **R11e-LR2**（使用 2.4 GHz 频率工作）是基于 Semtech 芯片组的 mini PCIe 外形规格的 LoRa® 技术集中器网关卡。它们可为任何具有 mPCIe 插槽并已连接 USB 线路的 MikroTik 产品启用 LoRa® 连接。

典型的 LoRaWAN 拓扑由 3 个主要元素组成 → 服务器、节点和网关。网关的工作只是将接收到的、由节点广播的 LoRa 数据包（在相同受支持频谱范围内）转发到服务器。

MikroTik LoRaWAN 网关是带有 R11e-LR**x** miniPCIe 卡并安装了“iot”[软件包](../../getting-started/installation-and-upgrade/packages.md)（用于启用 LoRa 驱动）的设备。

MikroTik 网关设备的主要设计是作为 LoRaWAN 设备运行。要实现这一点，只需在 LoRa 接口设置中配置/选择正确的服务器。一些示例可以在[用户指南部分](./user-guides/index.md)中找到。

#### 非 LoRaWAN 设置 {#non-lorawan-setup}

但是，如果您不希望使用 LoRaWAN 网络/拓扑，并且希望将“原始 LoRa”负载转发到自己的服务器，则可以选择这样做。您可以使用 [MQTT](../mqtt/index.md) 或 [HTTP POST](../../system-information-and-utilities/fetch.md) 将接收到的负载转发到您的 MQTT/HTTP 服务器，但这将需要额外的[脚本](../../developer-guides/scripting/index.md)。脚本必须从 `IoT>LoRa>Traffic` 选项卡收集信息（负载），将这些负载存储为变量，用这些变量构造 MQTT/HTTP 消息并发送。

:::info
请注意，如果节点广播的负载已加密，并且您希望将它们转发到自己的 MQTT/HTTP 服务器（不使用 LoRaWAN），则需要在服务器端解密这些负载。网关没有内置的解密节点数据的功能。服务器负责此任务。

此外，无法将下行 MQTT/HTTP 消息从 MQTT/HTTP 服务器“中继”回 LoRa 节点（只能将来自节点的“上行”负载“转发”到服务器），主要原因是无法“让”LR 卡“广播”自定义负载（无法将 MQTT/HTTP 下行消息的内容传入 LoRa 芯片）。
:::
