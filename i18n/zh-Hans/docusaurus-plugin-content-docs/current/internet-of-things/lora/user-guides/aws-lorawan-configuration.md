---
sidebar_key: "internet-of-things/lora/user-guides/aws-lorawan-configuration"
sidebar_position: 1
title: "AWS LoRaWAN 配置"
sidebar_label: "AWS LoRaWAN 配置"
description: "本页引导用户在 MikroTik RouterOS 上配置 AWS LoRaWAN 集成，涵盖在 AWS IoT Core 中注册网关、证书生成和导入，以及用于 LNS 连接的服务器设置。"
tags:
  - 'aws'
  - 'iot'
  - 'lora'
source: https://manual.mikrotik.com/docs/internet-of-things/lora/user-guides/aws-lorawan-configuration
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
本场景从 RouterOS 版本 **7.14beta8** 开始可用。
:::

在继续设置之前，您需要在 AWS 系统中创建账户。您可以访问此[链接](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)了解有关如何操作的更多信息。

登录后，前往门户中的 **Services>IoT Core** 部分。

## AWS - 注册网关 {#aws---registering-the-gateway}

第一步是注册 LoRaWAN 网关。

前往 [Gateways](https://eu-central-1.console.aws.amazon.com/iot/home?region=eu-central-1#/wireless/gateways) 部分（位于 [LPWAN devices](https://eu-central-1.console.aws.amazon.com/iot/home?region=eu-central-1#/wireless/landing) 下）。

![](/img/ed4ee05927b02491.webp)

点击 "**Add gateway**" 按钮。

### 步骤 1 - 添加网关 {#step-1---add-gateway}

- 输入网关的 EUI。
- 选择设备的频段。
- 如有需要，配置可选字段。

![](/img/60a9686c5527b7cc.webp)

再次点击 "**Add gateway**" 完成该步骤。

在 RouterOS 设置中，可以在 **IoT>LoRa>Devices** 选项卡下查看网关的 EUI 和频率计划：

![](/img/680040c219bd18d6.webp)

### 步骤 2 - 配置网关 {#step-2---configure-your-gateway}

- 生成网关证书（"**Create certificate**" 按钮），并下载证书文件和私钥文件（"**Download certificate files**" 按钮）。
- 复制 CUPS 和 LNS 端点，并下载服务器信任证书（"**Download server trust certificates**" 按钮）。
- 添加建议的网关权限。

![](/img/821bda4083751dfe.webp)

点击 "**Submit**" 完成该步骤。

你将被重定向到新创建的网关应出现的页面。

## RouterOS - 连接网关 {#routeros---connecting-the-gateway}

### 上传并导入证书 {#uploading-and-importing-certificates}

:::info
默认情况下，**lora** 服务在[证书 **trust-store**](../../../authentication-authorization-accounting/certificates.md)中是受信任的，并且内置存储中已经包含所需的 AWS Root 证书。
如果你想手动操作，以下步骤展示了如何获取并安装 Root AWS 证书。

如果[证书 **trust-store**](../../../authentication-authorization-accounting/certificates.md)中启用了 **lora** 服务，请跳过导入 AWS Root CA。
你仍然需要导入唯一的设备证书。
:::

在继续设置之前，你需要下载 [Amazon Root CA](https://www.amazontrust.com/repository/)，并将其与网关证书文件及其密钥一起上传到 RouterOS 的文件列表菜单中：

![](/img/679d93cd6d29f923.webp)

文件上传后，逐个导入证书（位于 **System>Certificates** 下）：

![](/img/7dac383ebfcf0a67.webp)

请确保先上传网关证书，再上传其密钥（这样网关证书才会同时带有 K-key 和 T-trusted 标志）。最终，你应该已导入全部 3 个文件，如下所示：

![](/img/2c8c5590f53d016a.webp)

### 服务器配置 {#server-configuration}

#### LNS 场景 {#lns-scenario}

前往 **IoT>LoRa>Servers** 选项卡并添加新服务器：

![](/img/582b6fdeddc052ca.webp)

- 为服务器命名。
- 输入 LNS 端点地址（不含 `wss://` 和 `:443`）。
- 选择 LNS 协议。
- 将端口更改为 "443"。
- 启用 SSL 复选框。
- 选择网关证书。

确保在 **IoT>LoRa>Devices** 选项卡下应用新配置的服务器：

![](/img/5104a0a5720db60f.webp)

然后，**启用** LoRa 接口。

#### CUPS 场景 {#cups-scenario}

前往 **IoT>LoRa>Servers** 选项卡并添加新服务器：

![](/img/771be9bf7ade270f.webp)

- 为服务器命名。
- 输入 CUPS 端点地址（不含 `https://` 和 `:443`）。
- 选择 CUPS 协议。
- 将端口更改为 "443"。
- 启用 SSL 复选框。
- 选择网关证书。

确保在 **IoT>LoRa>Devices** 选项卡下应用新配置的服务器：

![](/img/5104a0a5720db60f.webp)

然后，**启用** LoRa 接口。

### 连接验证 {#connection-verification}

如果一切配置正确，你应该会在 AWS 门户上看到 "connected" 状态：

![](/img/d8cbfa6776b4b431.webp)
