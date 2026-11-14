---
sidebar_key: "internet-of-things/lora/user-guides/step-by-step-installation"
sidebar_position: 3
title: "逐步安装"
sidebar_label: "逐步安装"
description: "本页提供在 MikroTik RouterOS 上安装和配置 LoRa mini-PCIe 卡的分步指南，包括硬件安装、GUI 设置、软件包管理以及初始网络服务器配置。"
tags:
  - 'lora'
  - 'winbox'
source: https://manual.mikrotik.com/docs/internet-of-things/lora/user-guides/step-by-step-installation
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### LoRa 卡安装 {#lora-card-installation}

本节将以 LtAP LTE kit 为例。

打开路由器外壳。具体到 LtAP，卸下所有螺丝后，请小心地将上盖移到左侧，因为 LTE 天线连接在其内侧：

![1.png](/img/e6edfdc7248e1ed2.webp)

将 R11e-LoRa 卡插入 mini-PCIe 插槽，并将两颗螺丝拧入螺纹嵌件：

![](/img/3216d372cb58a8f1.webp)

将天线连接到卡上（UFL 连接器）。在此情况下还使用了 UFL → SMA 线缆，因为 LtAP 的外壳为其预留了专用插槽。

![](/img/05f26ab703eb8d36.webp)

完成上述步骤后，即可合上路由器外壳并继续进行配置。

### 配置 {#configuration}

#### GUI 设置 {#gui-setup}

通过 Winbox 或 WebFig 连接到路由器。

Winbox 可从[链接](https://mikrotik.com/download/winbox)下载。

运行它：

![](/img/b7d80526b099c3a2.webp)

强烈建议将 RouterOS 版本升级到最新可用版本。安装该版本将执行重启：

![](/img/64b1cc1f682aa7fd.webp)

如果您的设备没有 **IoT>LoRa** 菜单，请下载专门适用于您路由器架构和 rOS 版本的“**Extra packages**”。您可以在 Winbox 窗口顶部或 System →  Resources → Architecture Name 中查看路由器架构类型。
[https://mikrotik.com/download](https://mikrotik.com/download)
![](/img/7decbeb5ac631167.webp)

下载并解压软件包后，将 **IoT** 软件包上传到路由器。也可以通过拖放完成。上传完成后，它应出现在文件目录中。重启路由器（System → Reboot）以安装该软件包：
![](/img/c32844e13e18cf6c.webp)

重启后，该软件包应显示在软件包列表中：
![](/img/ce2d0ed5613a49ce.webp)

在 **IoT>LoRa>Devices** 下检查 LoRa 网关是否已初始化。如果它是 LtAP 型号，请确保将 USB Type 设置为 Mini-PCIe：
![](/img/d9b29f2a829113c8.webp)

一旦网关出现（在 **IoT>LoRa>Devices** 下），请选择它，从默认服务器中选择 Network Servers，或添加自己的服务器（在 **IoT>LoRa>Servers** 下），然后启用它：
![](/img/fe16df773e7591ff.webp)

转到 Traffic 选项卡，以监控周围节点发送请求：
![](/img/399073389e674daf.webp)

以上是 LoRa mini-PCIe 卡的基本安装和配置。如需更多设置，请查看：[常规属性](../general-properties.md)
