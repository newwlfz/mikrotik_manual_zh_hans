---
title: "ChirpStack"
description: "本页指导 MikroTik RouterOS 用户使用 ChiprStack 开源服务器注册 LoRaWAN 网关。"
tags:
  - 'lora'
  - 'iot'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/lora/user-guides/chirpstack
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

[ChirpStack](https://www.chirpstack.io/) 是一个开源 LoRaWAN 服务器，你可以在本地安装。

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

网关可以通过 **UDP** 或 **LNS** 连接。有关如何配置两者的更多详情，请参阅 ChirpStack 文档。

在 RouterOS 中，添加一台新服务器，指向 ChripStack 的 IP/域名。如果使用 UDP：

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
端口、地址和 SSL 选项可能因 ChirpStack 自身的设置方式而异。
:::

确保接口已禁用（否则将无法应用任何更改）：

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

在 RouterOS 中，可以通过日志确认网关已连接：

```ros
/log print where topics ~"lora"
```

应看到“forwarder is ready”消息：

```
 2026-06-15 14:31:09 lora,info [FWD] gateway-0 forwarder started
 2026-06-15 14:31:22 lora,info [FWD] gateway-0 forwarder is ready
 2026-06-15 14:31:41 lora,debug [FWD] gateway-0, Rx, Freq 868.100, CRC Error
 2026-06-15 14:32:10 lora,debug [FWD] gateway-0, Rx, Freq 867.100, CRC Error
```

在 ChirpStack 门户中，检查“Gateway”仪表板下的状态（“Tenant>Gateway”部分）：

![](/img/c59399315b1543e5.png)

## 节点注册 {#node-registration}

### 创建设备配置文件 {#create-device-profile}

添加新的 [“Device Profile”](https://www.chirpstack.io/docs/chirpstack/use/device-profiles.html)：

![](/img/3ed00b288a70ab80.png)

根据节点或传感器支持的功能，配置“*Region*”、“*MAC version*”、“*Regional parameters revision*”、“*ADR algorithm*”和其他设置。
可以选择启用不同类别（如 Class B）。

MikroTik **TG-LR** 标签的信息可在[此处](/hardware/tg-lr-setup-guide)找到。

添加“Payload codec”：

![](/img/eaa77004ac43d16e.png)

- 选择“JavaScript functions”；
- 将 [提供的脚本 **tg-lrx2-2.0-ul-dec.js**](/hardware/tg-lr-setup-guide#quickstart-guide) 的内容复制/粘贴到“Codec functions”字段中，然后点击“Submit”。

### 创建应用 {#create-application}

添加新的 [“Application”](https://www.chirpstack.io/docs/chirpstack/use/applications.html)：

![](/img/5763a995e012a6aa.png)

### 创建设备 {#create-device}

如果使用 **TG-LR** MikroTik 标签，请在包装内的标签上查找“**JoinEUI**”“**DevEUI**”和“**AppKey**”。如果使用其他厂商的传感器，请通过制造商获取这些信息。

在之前创建的“Application”下添加新的 [“Device”](https://www.chirpstack.io/docs/chirpstack/use/devices.html)：

![](/img/f31d2be1260d1519.png)

输入“**Device EUI**”“**Join EUI**”，选择之前创建的“Device profile”，然后点击“Submit”。

Lastly:

![](/img/bbb6f789355f7d47.png)

输入“**Application key**”和“Submit”。

### 为标签上电 {#power-on-the-tag}

请查看有关 [TG-LR options](/hardware/tg-lr-setup-guide) 的完整指南。

一开始，标签处于“Shutdown”模式（休眠）。

要激活它，请查看 [Quickstart Guide](/hardware/tg-lr-setup-guide#quickstart-guide)，并将磁铁靠近干簧开关约 ~1.5 秒，直到看到 x2 LED 闪烁（随后移开磁铁）。

:::info
使用其他厂商的传感器时，请了解如何激活它。
:::

### 节点注册验证 {#node-registration-verification}

节点上电后，应立即开始尝试加入网络。

终端设备将发送 “Join-request” 数据包，并期望收到 “Join-accept” 作为响应。

在 RouterOS 中，可以在 “**IoT>LoRa>Traffic**” 选项卡中查看该交互过程：

![](/img/ed9fe119970c72dd.png)

在门户中，应能在 “LoRaWAN frames” 选项卡中确认注册：

![](/img/c2c239739507bf4d.png)
