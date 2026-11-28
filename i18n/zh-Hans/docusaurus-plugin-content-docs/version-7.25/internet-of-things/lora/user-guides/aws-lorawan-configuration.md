---
title: "AWS LoRaWAN 配置"
description: "本页指导用户在 MikroTik RouterOS 上配置 AWS LoRaWAN 集成，涵盖 AWS IoT Core 中的网关注册、证书生成和导入，以及用于 LNS 连接的服务器设置。"
tags:
  - 'aws'
  - 'iot'
  - 'lora'
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/lora/user-guides/aws-lorawan-configuration
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "internet-of-things/lora/user-guides"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
该场景从 RouterOS 版本 **7.14beta8** 开始可用。
:::

在进行设置之前，需要在 AWS 系统中创建账户。有关如何创建账户的更多信息，请参阅此 [link](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)。

登录后，进入门户中的 **Services>IoT Core** 部分。

## AWS - 注册网关 {#aws---registering-the-gateway}

第一步是注册 LoRaWAN 网关。

导航到 [Gateways](https://eu-central-1.console.aws.amazon.com/iot/home?region=eu-central-1#/wireless/gateways) 部分（位于 [LPWAN devices](https://eu-central-1.console.aws.amazon.com/iot/home?region=eu-central-1#/wireless/landing) 下）。

![](/img/ed4ee05927b02491.webp)

点击“**Add gateway**”按钮。

### Step 1 - 添加网关 {#step-1---add-gateway}

- 输入网关的 EUI。
- 选择设备的频段。
- 如果需要，配置可选字段。

![](/img/60a9686c5527b7cc.webp)

再次点击“**Add gateway**”完成该步骤。

在 RouterOS 设置中，可在 **IoT>LoRa>Devices** 选项卡下查看网关的 EUI 和频率计划：

![](/img/680040c219bd18d6.webp)

### 步骤 2 - 配置网关 {#step-2---configure-your-gateway}

- 生成网关证书（“**Create certificate**”按钮），并下载证书文件和私钥文件（“**Download certificate files**”按钮）。
- 复制 CUPS 和 LNS 端点，并下载服务器信任证书（“**Download server trust certificates**”按钮）。
- 添加建议的网关权限。

![](/img/821bda4083751dfe.webp)

点击“**Submit**”完成该步骤。

你将被重定向到新创建的网关应显示的页面。

## RouterOS - 连接网关 {#routeros---connecting-the-gateway}

### 上传和导入证书 {#uploading-and-importing-certificates}

:::info
默认情况下，**lora** 服务在[证书 **trust-store**](/docs/7.24/authentication-authorization-accounting/certificates) 中受信任，内置存储已包含所需的 AWS Root 证书。
如果希望手动操作，请按照以下步骤获取并安装 Root AWS 证书。

如果 **lora** 服务已在[证书 **trust-store**](/docs/7.24/authentication-authorization-accounting/certificates) 中启用，请跳过导入 AWS Root CA。
仍需要导入唯一的设备证书。
:::

在开始设置之前，需要下载 [Amazon Root CA](https://www.amazontrust.com/repository/)，并将其与网关证书文件及其密钥一起上传到 RouterOS 文件列表菜单：

![](/img/679d93cd6d29f923.webp)

文件上传后，逐一导入证书（在 **System>Certificates** 下）：

![](/img/7dac383ebfcf0a67.webp)

确保先上传网关证书，再上传其密钥，使网关证书同时具有 K-key 和 T-trusted 标志。最终应导入全部 3 个文件，如下所示：

![](/img/2c8c5590f53d016a.webp)

### 服务器配置 {#server-configuration}

#### LNS 场景 {#lns-scenario}

导航到 **IoT>LoRa>Servers** 选项卡并添加新服务器：

![](/img/582b6fdeddc052ca.webp)

- 命名服务器。
- 输入 LNS 端点地址（不包含 `wss://` 和 `:443`）。
- 选择 LNS 协议。
- 将端口更改为“443”。
- 启用 SSL 复选框。
- 选择网关证书。

确保在 **IoT>LoRa>Devices** 选项卡下应用新配置的服务器：

![](/img/5104a0a5720db60f.webp)

然后，**启用** LoRa 接口。

#### CUPS 场景 {#cups-scenario}

导航到 **IoT>LoRa>Servers** 选项卡并添加新服务器：

![](/img/771be9bf7ade270f.webp)

- 命名服务器。
- 输入 CUPS 端点地址（不包含 `https://` 和 `:443`）。
- 选择 CUPS 协议。
- 将端口更改为“443”。
- 启用 SSL 复选框。
- 选择网关证书。

确保在 **IoT>LoRa>Devices** 选项卡下应用新配置的服务器：

![](/img/5104a0a5720db60f.webp)

然后，**启用** LoRa 接口。

### 连接验证 {#connection-verification}

如果所有配置均正确，应在 AWS 门户中看到“connected”状态：

![](/img/d8cbfa6776b4b431.webp)
