---
title: "The Things Stack"
description: "本页指导 MikroTik RouterOS 用户将 LoRaWAN 网关注册到 The Things Stack，涵盖 UDP 和 LNS/CUPS 协议。文中说明如何查找 Gateway EUI 值、配置服务器设置、生成身份验证密钥，以及导入根证书，以便与 TTN 服务器进行安全通信。"
tags:
  - 'lora'
  - 'iot'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/lora/user-guides/the-things-stack
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

[The Things Stack](https://console.cloud.thethings.network/) 是 The Things network 的新版本。

![](/img/85a06075ddcb3e2a.webp)

选择你的区域，并使用 The Things network 账户或其他凭据登录。

## 注册网关 {#registering-gateway}

登录后，导航到“Go to gateways”：

![](/img/ce4dbbbc1730e36b.webp)

点击“**+ Register gateway**”按钮注册网关：

![](/img/aeaf84f3b36a7b46.webp)

从这里开始，网关可以通过两种方式连接到服务器：

- 使用 UDP 协议；

- 使用 LNS/CUPS 协议。

### UDP 场景 {#udp-scenario}

:::warning
[LNS/CUPS](/docs/internet-of-things/lora/user-guides/the-things-stack#lns-and-cups-scenario) 安全性高得多，建议改用它！
:::
UDP 是服务器和网关之间通信的旧式方法。

#### UDP 协议网关注册 {#udp-protocol-gateway-registration}

填写空白字段。输入 **Gateway EUI**。确保选择正确的频率计划。不要启用“**Require authenticated connection**”选项（该选项用于 LNS 和 CUPS）！

![](/img/4fdda867b0f2455a.webp)

在 RouterOS 中，可以在“**IoT>LoRa>Devices>Gateway ID**”下找到 **Gateway EUI** 值：

![](/img/95e95d931677b14b.webp)

有关更多信息，请查看其[文档页面](https://www.thethingsindustries.com/docs/getting-started/)。

#### UDP 协议 RouterOS 配置 {#udp-protocol-routeros-configuration}

检查 LoRa 设备（在 RouterOS 中）是否选择了正确的 TTN 服务器，并确认服务器设置使用“UDP”协议：

![](/img/e387d9dababfe19a.webp)

### LNS 和 CUPS 场景 {#lns-and-cups-scenario}

[**LNS/CUPS**](https://www.thethingsindustries.com/docs/hardware/gateways/concepts/lora-basics-station/) 是现代协议。它们通过使用 TCP（TLS）提供更高的安全性，其中每个数据包都会加密，并引入基于证书的网关身份验证（以及其他新功能）。

#### LNS 和 CUPS 协议网关注册 {#lns-and-cups-protocol-gateway-registration}

填写空白字段。输入 **Gateway EUI**。确保选择正确的频率计划。启用“**Require authenticated connection**”以及后续选项：（用于 LNS 的）“**Generate API key for LNS**”和（用于 CUPS 的）“**Generate API key for CUPS**”：

![](/img/f4e048050dad02c9.webp)

在 RouterOS 中，可以在“**IoT>LoRa>Devices>Gateway ID**”下找到 **Gateway EUI** 值：

![](/img/95e95d931677b14b.webp)

点击“**Register gateway**”按钮后，系统应提示下载密钥。下载这些密钥。

要查看 LNS 和 CUPS 密钥，请检查下载的文件。LNS 密钥还应显示在“**LoRa Basics Station LNS authentication Key**”字段下：

![](/img/6b481c2675756635.webp)

详情请参阅其[文档页面](https://www.thethingsindustries.com/docs/getting-started/)。

#### LNS 协议 RouterOS 设置 {#lns-protocol-routeros-settings}

确保选择了正确的 TTN 服务器，配置了正确的端口（TTN 期望 LNS 使用 8887），选择了 LNS 协议，输入了 LNS 密钥（来自“**LoRa Basics Station LNS authentication Key**”字段），并启用了“**SSL**”复选框：

![](/img/06acb23a58d3d095.webp)

如果使用默认设置，网关的内部 [**builtin-trust-store**](/docs/authentication-authorization-accounting/certificates#settings) 应针对 **lora** 服务启用，并且应已预装所需的 Root CA。**你可以跳到下一步**。

**可选**，如果已禁用 [**builtin-trust-store**](/docs/authentication-authorization-accounting/certificates#settings)，并且希望手动上传证书，请下载并导入[根证书](https://www.thethingsindustries.com/docs/reference/root-certificates/)。

下载证书文件后，将其拖放到 RouterOS 文件菜单中，并导入证书列表：

![](/img/bbb71910231fbee8.webp)

这会使证书列表受信任：

![](/img/6d8106139a7b15ce.webp)

#### CUPS 协议 RouterOS 设置 {#cups-protocol-routeros-settings}

确保选择了正确的 TTN 服务器，配置了正确的端口（TTN 期望 CUPS 使用 443），选择了 CUPS 协议，输入了 CUPS 密钥（在网关注册步骤中从下载的 cups.key 文件获取），并启用了“**SSL**”复选框：

![](/img/c3d21b3f77dbf8e1.webp)

如果使用默认设置，网关内部 [**builtin-trust-store**](/docs/authentication-authorization-accounting/certificates#settings) 应针对 **lora** 服务启用，并且应已预装所需的 Root CA。**可以跳到下一步**。

**可选**，如果已禁用 [**builtin-trust-store**](/docs/authentication-authorization-accounting/certificates#settings) 并且要手动上传证书，请下载并导入 [Root Certificates](https://www.thethingsindustries.com/docs/reference/root-certificates/)。

下载证书文件后，将其拖放到 RouterOS 文件菜单中，并导入证书列表：

![](/img/bbb71910231fbee8.webp)

这会使证书列表变为受信任状态：

![](/img/6d8106139a7b15ce.webp)

### 网关注册验证 {#gateway-registration-verification}

如果所有配置均正确，在 RouterOS 中启用 LoRa 接口后（“**IoT>LoRa>Devices>Enable**”）：

![](/img/c78b6928ce331176.webp)

应看到网关连接“Live data”更新：

![](/img/414378ecf0a2f937.webp)

## 注册节点 {#registering-the-node}

本节介绍如何将 MikroTik 的 **TG-LR** 标签（[**TG-LR82**](https://mikrotik.com/product/tg_lr82) 或 [**TG-LR92**](https://mikrotik.com/product/tg_lr92)）添加到门户。

相同原则也适用于其他厂商的节点、传感器或标签。

### 创建应用 {#create-application}

在 TTS 门户中，进入“**Applications**”选项卡，点击“**add application**”：

![](/img/205f51eca2e54255.png)

输入所需的 ID，命名，添加描述，然后创建（“**Create application**”）：

![](/img/29afd2dd097c71e0.png)

### 注册终端设备 {#register-end-device}

在刚创建的应用下，进入“**End devices**”选项卡，点击“**+ Register end device**”：

![](/img/9359918e5bff4301.png)

可以在“Select the end device in the LoRaWAN Device Repository”中选择终端设备（并自动执行该过程），也可以手动添加（“Enter end device specifics manually”）：

![](/img/cbb773c9ffc92ddb.png)

- 输入“**Frequency plan**”（例如，*Europe 863-870 MHz (SF9 for RX2 - recommended)*，具体取决于标签支持的频率）；
- “**LoRaWAN version**”（“*LoRaWAN Specification 1.0.4*”）；
- “**Regional Parameters version**”（“*RP002 Regional Parameters 1.0.4*”）。

在包装内的标签上找到“**JoinEUI**”“**DevEUI**”和“**AppKey**”，然后继续填写预配置信息的步骤：

![](/img/1440133c00145fad.png)

- 输入标签上的“**JoinEUI**”，并进行“Confirm”；
- 输入标签上的“**DevEUI**”；
- 输入标签上的“**AppKey**”；
- 为标签指定 ID/名称；
- 点击“**Register end device**”。

### 启用解码器 {#enable-decoder}

:::info
如果跳过此步骤，TTS portal 将仅显示“raw hex”载荷。
:::

要使服务器以可读/可理解的格式显示标签数据，服务器首先需要能够“解码”接收到的载荷。
可以在新建标签选项下的“[Payload formatters](https://www.thethingsindustries.com/docs/integrations/payload-formatters/)”部分输入解码器脚本：

![](/img/6e8e3cfbb626c1fd.png)

- 选择“Custom Javascript formatter”；
- 将[提供的脚本 **tg-lrx2-2.0-ul-dec.js**](/hardware/tg-lr-setup-guide#quickstart-guide)的内容复制/粘贴到“Formatter code”字段中，并“Save changes”。

### 给标签上电 {#power-on-the-tag}

请参阅有关 [TG-LR options](/hardware/tg-lr-setup-guide) 的完整指南。

初始状态下，标签处于“Shutdown”模式（休眠）。

要激活标签，请参阅 [Quickstart Guide](/hardware/tg-lr-setup-guide#quickstart-guide)，将磁铁靠近 reed switch 约 ~1.5 秒，直到看到 x2 LED 闪烁（随后移开磁铁）。

### 验证节点注册 {#node-registration-verification}

节点上电后，应立即开始尝试[加入网络](https://www.thethingsnetwork.org/docs/lorawan/end-device-activation/)。

终端设备将发送“Join-request”数据包，并期待收到“Join-accept”作为响应。

在 RouterOS 中，可以在“**IoT>LoRa>Traffic**”选项卡中查看该交换过程：

![](/img/ed9fe119970c72dd.png)

最后，应能根据 TTS 日志确认注册：

![](/img/765de8dd9d41e26a.png)
