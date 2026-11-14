---
sidebar_key: "internet-of-things/lora/user-guides/chirpstack"
sidebar_position: 2
title: "ChirpStack"
sidebar_label: "ChirpStack"
description: "本页面指导 MikroTik RouterOS 用户将 LoRaWAN 网关注册到 ChiprStack 开源服务器。"
tags:
  - 'lora'
  - 'iot'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/lora/user-guides/chirpstack
captured_at: '2026-11-04T11:31:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[ChirpStack](https://www.chirpstack.io/) 是一个开源 LoRaWAN 服务器，你可以在本地安装它。

服务器启动并运行后，登录 ChirpStack 管理门户。

## 网关注册 {#gateway-registration}

### 注册网关 {#registering-gateway}

导航到“Tenant>Gateways”部分，然后点击“Add gateway”：

![](/img/7518e720ffd3b40e.png)

为设备命名，并输入“Gateway ID”：

![](/img/c4a01c848dbbdd57.png)

在 RouterOS 中，**Gateway EUI** 值可在“**IoT>LoRa>Devices>Gateway ID**”下找到：

![](/img/95e95d931677b14b.webp)

### 连接网关 {#connecting-gateway}

网关可通过 **UDP** 或 **LNS** 连接。有关如何配置两者的更多详细信息，请参阅 ChirpStack 文档。

在 RouterOS 中，添加一个新服务器，指向 ChripStack 的 IP/域名。如果使用 UDP：

```ros
/iot lora servers
add address=10.x.x.x name=Chirpstack protocol=UDP
```

如果使用 LNS：

```ros
/iot lora servers
add address=10.x.x.x name=Chirpstack port=3001 protocol=LNS ssl=no
```

:::info
端口、地址和 SSL 选项可能因你设置 ChirpStack 本身的方式而异。
:::

确保接口已禁用（否则你将无法应用任何更改）：

```ros
/iot lora disable [find]
```

将服务器附加到接口：

```ros
/iot lora set servers=Chirpstack [find]
```

启用接口：

```ros
/iot lora enable [find]
```

### 网关注册验证 {#gateway-registration-verification}

在 RouterOS 中，你可以通过日志确认网关已连接：

```ros
/log print where topics ~"lora"
```

你应该会看到“forwarder is ready”消息：

```
 2026-06-15 14:31:09 lora,info [FWD] gateway-0 forwarder started
 2026-06-15 14:31:22 lora,info [FWD] gateway-0 forwarder is ready
 2026-06-15 14:31:41 lora,debug [FWD] gateway-0, Rx, Freq 868.100, CRC Error
 2026-06-15 14:32:10 lora,debug [FWD] gateway-0, Rx, Freq 867.100, CRC Error
```

在 ChirpStack 门户上，在“Gateway”仪表板（“Tenant>Gateway”部分）下检查状态：

![](/img/c59399315b1543e5.png)

## 节点注册 {#node-registration}

### 创建设备配置文件 {#create-device-profile}

添加新的[“Device Profile”](https://www.chirpstack.io/docs/chirpstack/use/device-profiles.html)：

![](/img/3ed00b288a70ab80.png)

根据你的节点/传感器支持的功能，配置“*Region*”、“*MAC version*”、“*Regional parameters revision*”、“*ADR algorithm*”和其他设置。
你也可以选择启用不同的类（例如 Class B）。

MikroTik **TG-LR** 标签的信息可在[此处](./tg-lr-setup-guide.md)找到。

添加“Payload codec”：

![](/img/eaa77004ac43d16e.png)

- 选择“JavaScript functions”；
- 将[提供的脚本 **tg-lrx2-2.0-ul-dec.js**](./tg-lr-setup-guide.md#quickstart-guide) 的内容复制/粘贴到“Codec functions”字段中，然后点击“Submit”。

### 创建应用 {#create-application}

添加新的[“Application”](https://www.chirpstack.io/docs/chirpstack/use/applications.html)：

![](/img/5763a995e012a6aa.png)

### 创建设备 {#create-device}

如果你使用的是 **TG-LR** MikroTik 标签，请在包装内的标签上找到印有的“**JoinEUI**”、“**DevEUI**”和“**AppKey**”。如果你使用的是其他厂商的传感器，请向制造商了解它们是什么。

在先前创建的“Application”下添加新的[“Device”](https://www.chirpstack.io/docs/chirpstack/use/devices.html)：

![](/img/f31d2be1260d1519.png)

输入“**Device EUI**”、“**Join EUI**”，选择先前创建的“Device profile”并点击“Submit”。

最后：

![](/img/bbb6f789355f7d47.png)

输入“**Application key**”并点击“Submit”。

### 给标签上电 {#power-on-the-tag}

请查看我们关于 [TG-LR 选项](./tg-lr-setup-guide.md) 的完整指南。

一开始，标签将处于“Shutdown”模式（休眠）。

要激活它，请查看我们的[快速入门指南](./tg-lr-setup-guide.md#quickstart-guide)，然后只需将磁铁靠在磁簧开关上约 1.5 秒，直到看到 LED 闪烁 2 次（之后移开磁铁）。

:::info
使用其他厂商的传感器时，请了解如何激活它。
:::

### 节点注册验证 {#node-registration-verification}

节点一旦上电，就应开始尝试加入网络。

终端设备将发送“Join-request”数据包，并期望收到“Join-accept”作为回应。

在 RouterOS 中，你可以在“**IoT>LoRa>Traffic**”选项卡中看到该交互：

![](/img/ed9fe119970c72dd.png)

在门户上，你应该能够根据“LoRaWAN frames”选项卡确认注册：

![](/img/c2c239739507bf4d.png)
