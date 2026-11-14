---
sidebar_key: "internet-of-things/lora/user-guides/the-things-stack"
sidebar_position: 5
title: "The Things Stack"
sidebar_label: "The Things Stack"
description: "本页面指导 MikroTik RouterOS 用户将 LoRaWAN 网关注册到 The Things Stack，涵盖 UDP 和 LNS/CUPS 协议。它说明了如何查找 Gateway EUI 值、配置服务器设置、生成身份验证密钥，以及导入根证书以便与 TTN 服务器进行安全通信。"
tags:
  - 'lora'
  - 'iot'
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/lora/user-guides/the-things-stack
captured_at: '2026-11-04T11:20:04+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[The Things Stack](https://console.cloud.thethings.network/) 是 The Things Network 的新版本。

![](/img/85a06075ddcb3e2a.webp)

选择您所在的区域，并使用 The Things Network 账户或其他凭据登录。

## 注册网关 {#registering-gateway}

登录后，导航到 “Go to gateways”：

![](/img/ce4dbbbc1730e36b.webp)

单击 “**+ Register gateway**” 按钮注册网关：

![](/img/aeaf84f3b36a7b46.webp)

从这里开始，网关可以通过两种方式连接到服务器：

- 使用 UDP 协议；

- 使用 LNS/CUPS 协议。

### UDP 场景 {#udp-scenario}

:::warning
[LNS/CUPS](./the-things-stack.md#lns-and-cups-scenario) 更加安全，我们建议改用 LNS/CUPS！
:::
UDP 是服务器与网关之间的一种传统通信方式。

#### UDP 协议网关注册 {#udp-protocol-gateway-registration}

填写空白项。输入 **Gateway EUI**。确保选择正确的频率计划。不要启用 “**Require authenticated connection**” 选项（该选项用于 LNS 和 CUPS）！

![](/img/4fdda867b0f2455a.webp)

在 RouterOS 中，**Gateway EUI** 值可在 “**IoT>LoRa>Devices>Gateway ID**” 下找到：

![](/img/95e95d931677b14b.webp)

更多信息请查看他们的 [文档页面](https://www.thethingsindustries.com/docs/getting-started/)。

#### UDP 协议 RouterOS 配置 {#udp-protocol-routeros-configuration}

请再次确认 LoRa 设备（在 RouterOS 中）选择了正确的 TTN 服务器，并且服务器设置使用 “UDP” 协议：

![](/img/e387d9dababfe19a.webp)

### LNS 和 CUPS 场景 {#lns-and-cups-scenario}

[**LNS/CUPS**](https://www.thethingsindustries.com/docs/hardware/gateways/concepts/lora-basics-station/) 是现代协议。它们通过使用 TCP（TLS）为每个数据包加密来提供更高的安全性，并引入了使用证书进行网关认证的机制（以及其他新功能）。

#### LNS 和 CUPS 协议网关注册 {#lns-and-cups-protocol-gateway-registration}

填写空白项。输入 **Gateway EUI**。确保选择正确的频率计划。启用 “**Require authenticated connection**” 以及后续选项（用于 LNS） “**Generate API key for LNS**” 和（用于 CUPS） “**Generate API key for CUPS**”：

![](/img/f4e048050dad02c9.webp)

在 RouterOS 中，**Gateway EUI** 值可在 “**IoT>LoRa>Devices>Gateway ID**” 下找到：

![](/img/95e95d931677b14b.webp)

单击 “**Register gateway**” 按钮后，系统应提示您下载密钥。请下载这些密钥。

要查看 LNS 和 CUPS 密钥，请检查下载的文件。LNS 密钥还应显示在 “**LoRa Basics Station LNS authentication Key**” 字段下：

![](/img/6b481c2675756635.webp)

更多信息请查看他们的 [文档页面](https://www.thethingsindustries.com/docs/getting-started/)。

#### LNS 协议 RouterOS 设置 {#lns-protocol-routeros-settings}

确保选择了正确的 TTN 服务器，配置了正确的端口（TTN 期望 LNS 使用 8887），选择了 LNS 协议，输入了 LNS 密钥（来自 “**LoRa Basics Station LNS authentication Key**” 字段），并且启用了 “**SSL**” 复选框：

![](/img/06acb23a58d3d095.webp)

如果您使用的是默认设置，则应为 **lora** 服务启用网关内部的 [**builtin-trust-store**](../../../authentication-authorization-accounting/certificates.md#settings)，并且应已预装所需的 Root CA。**您可以跳到下一步**。

**可选地**，如果您已禁用 [**builtin-trust-store**](../../../authentication-authorization-accounting/certificates.md#settings)，并且想要手动上传证书，请下载并导入 [Root Certificates](https://www.thethingsindustries.com/docs/reference/root-certificates/)。

证书文件下载后，将其拖放到 RouterOS 文件菜单中，并导入证书列表：

![](/img/bbb71910231fbee8.webp)

这应使证书列表变为受信任：

![](/img/6d8106139a7b15ce.webp)

#### CUPS 协议 RouterOS 设置 {#cups-protocol-routeros-settings}

确保选择了正确的 TTN 服务器，配置了正确的端口（TTN 期望 CUPS 使用 443），选择了 CUPS 协议，输入了 CUPS 密钥（在网关注册步骤中从下载的 cups.key 文件中获取），并且启用了 “**SSL**” 复选框：

![](/img/c3d21b3f77dbf8e1.webp)

如果您使用的是默认设置，则应为 **lora** 服务启用网关内部的 [**builtin-trust-store**](../../../authentication-authorization-accounting/certificates.md#settings)，并且应已预装所需的 Root CA。**您可以跳到下一步**。

**可选地**，如果您已禁用 [**builtin-trust-store**](../../../authentication-authorization-accounting/certificates.md#settings)，并且想要手动上传证书，请下载并导入 [Root Certificates](https://www.thethingsindustries.com/docs/reference/root-certificates/)。

证书文件下载后，将其拖放到 RouterOS 文件菜单中，并导入证书列表：

![](/img/bbb71910231fbee8.webp)

这应使证书列表变为受信任：

![](/img/6d8106139a7b15ce.webp)

### 网关注册验证 {#gateway-registration-verification}

如果一切配置正确，在 RouterOS 中启用 LoRa 接口（“**IoT>LoRa>Devices>Enable**”）后：

![](/img/c78b6928ce331176.webp)

您应会看到网关连接 “Live data” 更新：

![](/img/414378ecf0a2f937.webp)

## 注册节点 {#registering-the-node}

本节将演示如何将 MikroTik 的 **TG-LR** 标签（[**TG-LR82**](https://mikrotik.com/product/tg_lr82) 或 [**TG-LR92**](https://mikrotik.com/product/tg_lr92)）添加到门户中。

同样的原则适用于其他厂商的节点/传感器/标签。

### 创建应用 {#create-application}

在 TTS 门户中，导航到 “**Applications**” 选项卡，然后单击 “**add application**”：

![](/img/205f51eca2e54255.png)

输入您希望其使用的 ID，为其命名，添加描述，然后创建它（“**Create application**”）：

![](/img/29afd2dd097c71e0.png)

### 注册终端设备 {#register-end-device}

在您刚创建的应用下，导航到 “**End devices**” 选项卡并单击 “**+ Register end device**”：

![](/img/9359918e5bff4301.png)

您可以选择 “Select the end device in the LoRaWAN Device Repository”（并自动完成该过程），也可以手动添加（“Enter end device specifics manually”）：

![](/img/cbb773c9ffc92ddb.png)

- 输入 “**Frequency plan**”（例如，*Europe 863-870 MHz (SF9 for RX2 - recommended)*，具体取决于您的标签支持哪个频率）；
- “**LoRaWAN version**”（“*LoRaWAN Specification 1.0.4*”）；
- “**Regional Parameters version**”（“*RP002 Regional Parameters 1.0.4*”）。

找到包装内标签上印有的 “**JoinEUI**”、“**DevEUI**” 和 “**AppKey**”，然后继续填写预配信息：

![](/img/1440133c00145fad.png)

- 从标签输入 “**JoinEUI**”，并确认；
- 从标签输入 “**DevEUI**”；
- 从标签输入 “**AppKey**”；
- 为您的标签设置 ID/名称；
- 单击 “**Register end device**”。

### 启用解码器 {#enable-decoder}

:::info
如果跳过此步骤，TTS 门户将仅显示 “raw hex” 负载。
:::

为了让服务器以可读/可理解的格式显示标签的数据，它首先需要能够“解码”其接收到的负载。
您可以在新创建的标签选项下的 “[Payload formatters](https://www.thethingsindustries.com/docs/integrations/payload-formatters/)” 部分中输入解码器脚本：

![](/img/6e8e3cfbb626c1fd.png)

- 选择 “Custom Javascript formatter”；
- 将 [提供的脚本 **tg-lrx2-2.0-ul-dec.js**](./tg-lr-setup-guide.md#quickstart-guide) 的内容复制/粘贴到 “Formatter code” 字段中，并单击 “Save changes”。

### 给标签上电 {#power-on-the-tag}

请查看我们关于 [TG-LR 选项](./tg-lr-setup-guide.md) 的完整指南。

一开始，标签将处于“Shutdown”模式（休眠）。

要激活它，请查看我们的[快速入门指南](./tg-lr-setup-guide.md#quickstart-guide)，然后只需将磁铁靠在磁簧开关上约 1.5 秒，直到看到 LED 闪烁 2 次（之后移开磁铁）。

### 节点注册验证 {#node-registration-verification}

节点上电后，应立即开始尝试 [加入网络](https://www.thethingsnetwork.org/docs/lorawan/end-device-activation/)。

终端设备将发送“Join-request”数据包，并期望收到“Join-accept”作为回应。

在 RouterOS 中，你可以在“**IoT>LoRa>Traffic**”选项卡中看到该交互：

![](/img/ed9fe119970c72dd.png)

最后，您应能够根据 TTS 日志确认注册：

![](/img/765de8dd9d41e26a.png)
