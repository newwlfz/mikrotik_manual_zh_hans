---
title: "Lora"
description: "本页介绍 MikroTik RouterOS LoRa 和 LoRaWAN 配置，涵盖网关设置、常规属性、服务器集成，以及使用 MQTT/HTTP 转发非 LoRaWAN 负载。文中详细说明支持的硬件、拓扑元素，以及加密负载的脚本要求。"
tags:
  - 'lora'
  - 'lorawan'
  - 'mqtt'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/lora
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 RouterOS 中的 LoRa 和 LoRaWAN 功能。可使用这些功能配置 LoRa 网关、通用属性以及与受支持的 LoRaWAN 网络的集成。

<DocCardList />

可用设置：

- ## [General Properties](/docs/internet-of-things/lora/general-properties)

网关初始步骤和不同的 LoRaWAN 设置示例：

- ## [User Guides](/docs/internet-of-things/lora/user-guides)

术语“LoRa”表示“射频”本身（“LoRa payloads”是节点使用 LoRa 频率广播的数据包），而术语“LoRaWAN”表示其上层的逻辑/链路层，用于实现“LoRa”设备之间的通信。换句话说，“LoRaWAN”是“LoRa”射频设备通信的方式。

**R11e-LR8**（工作在 863-870 MHz 频率）、**R11e-LR9**（工作在 902-928 MHz 频率）和 **R11e-LR2**（使用 2.4 GHz 频率）是基于 Semtech 芯片组、采用 mini PCIe 外形规格的 LoRa® 技术集中器网关卡。它们可为任何具有 mPCIe 插槽且连接 USB 线路的 MikroTik 产品提供 LoRa® 连接。

典型的 LoRaWAN 拓扑由 3 个主要元素组成 → 服务器、节点和网关。网关的工作只是将节点广播的已接收 LoRa 数据包（在相同受支持频谱内）转发到服务器。

MikroTik LoRaWAN 网关是装有 R11e-LR**x** miniPCIe 卡并安装了“iot”[软件包](/docs/getting-started/installation-and-upgrade/packages)（用于启用 LoRa 驱动）的设备。

MikroTik 网关设备的主要设计目标是作为 LoRaWAN 设备运行。为此，只需在 LoRa 接口设置中配置/选择正确的服务器即可。相关示例请参阅[用户指南部分](/docs/internet-of-things/lora/user-guides)。

#### 非 LoRaWAN 设置 {#non-lorawan-setup}

不过，如果不想使用 LoRaWAN 网络/拓扑，而是希望将“原始 LoRa”载荷转发到自己的服务器，也可以这样做。可以使用 [MQTT](/docs/internet-of-things/mqtt) 或 [HTTP post](/docs/system-information-and-utilities/fetch) 将接收到的载荷转发到 MQTT/HTTP 服务器，但这需要额外的[脚本](/docs/developer-guides/scripting)。脚本必须从 `IoT>LoRa>Traffic` 选项卡收集信息（载荷），将这些载荷存储为变量，根据变量构造 MQTT/HTTP 消息并发送。

:::info
请注意，如果节点广播的载荷已加密，并且希望将其转发到自己的 MQTT/HTTP 服务器（不使用 LoRaWAN），则需要在服务器端解密载荷。网关不具备解密节点数据的内置功能。服务器负责执行此任务。

此外，无法将下行 MQTT/HTTP 消息从 MQTT/HTTP 服务器“中继”回 LoRa 节点（只能将节点的上行载荷“转发”到服务器），主要原因是无法“让”LR 卡“广播”自定义载荷（无法将 MQTT/HTTP 下行消息的内容传入 LoRa 芯片）。
:::
