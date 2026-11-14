---
sidebar_key: "mobile-networking/mikrotik-connectivity"
sidebar_position: 3
title: "MikroTik 连接性"
sidebar_label: "MikroTik 连接性"
description: "MikroTik Connectivity 推出 eSIM 解决方案，实现无缝设备连接，无需更换物理 SIM 卡，并提供通过 MikroTik 账户门户和 RouterOS CLI/WinBox 界面进行激活的步骤。"
tags:
  - 'esim'
  - 'connectivity'
source: https://manual.mikrotik.com/docs/7.24/mobile-networking/mikrotik-connectivity
captured_at: '2026-11-04T11:32:57+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

MikroTik Connectivity 是我们新的内置 eSIM 解决方案，可确保您的设备在任何地方保持连接，无需更换物理 SIM 卡或进行外部激活步骤。更多信息请访问 [https://mikrotik.com/connectivity](https://mikrotik.com/connectivity)

### 激活示例 {#activation-example}

1) 登录您的 MikroTik 账户，选择 "My devices"。

![](/img/e298464df4344576.png)

1) 输入您设备的序列号——系统将进行检测。选择区域，然后按 "Add to list"。

![](/img/7a833a6166f9b0dd.png)

1) 选择适合您需求的数据套餐和付款方式。然后将其添加到购物车。

![](/img/c7f14ae2aa5edac1.png)

1) 在购物车中继续付款。

![](/img/52d12f26caaa6a5c.png)

1) 付款完成后，返回 "My devices"，您将看到订阅现已处于 Active 状态。

![](/img/a266f451f8e08e2e.png)

:::info
MikroTik eSIM 配置文件已预加载，因此激活期间无需互联网连接。激活本身通常需要几分钟，但在某些情况下甚至可能需要几个小时。
:::

1) 在 RouterOS 中检查您的设备是否设置为使用 "esim"，以及正确的配置文件是否处于活动状态。  
  
CLI:

```
[admin@EG25-G&KNe] > /interface/lte/settings/print 
                 mode: auto    
         esim-channel: auto    
        firmware-path: firmware
  link-recovery-timer: 120     
             sim-slot: sim      
[admin@EG25-G&KNe] > /interface/lte/settings/set sim-slot=esim      
[admin@EG25-G&KNe] > /interface/lte/esim/print
Flags: A - ACTIVE
Columns: INTERFACE, NAME, SPN, ICCID
#   INTERFACE  NAME       SPN                      ICCID
0 A lte1       Profile 1  MikroTik  89358152000001049461
1   lte1       Profile 4  MikroTik  89358152000001349465
```

在 WinBox 中：

 转到 Interfaces > LTE > Modem 选择 esim SIM 卡槽：

![](/img/530500251b870002.png)

转到 Interfaces > LTE > eSIM 查看哪个是活动的 esim 配置文件：

![](/img/b8d00f0482c880d6.png)

如果您需要更改 Active 配置文件，请右键单击该配置文件并选择 "Activate"：

![](/img/7ec165b963f9f2b8.png)

#### [视频教程：我们的官方 YT 频道，MikroTips 系列](https://www.youtube.com/watch?v=2YxHL9A4Ys0) {#video-tutorial-our-official-yt-channel-mikrotips-series}

### 常见问题解答 {#faq}

<details>
<summary>分配给我设备的 IP 地址是公网 IP 地址吗？</summary>

不是，该 IP 地址是私有地址。您可以配置 BTH 来远程访问您的设备：[Back To Home（远程回家）](../network-management/cloud/back-to-home.md)

</details>

<details>
<summary>是否也支持 IPv6？</summary>

仅支持 IPv4。

</details>

<details>
<summary>我应该配置什么接入点名称（APN）？</summary>

您可以使用 "use-network-apn=yes" 选项，或将 APN 手动设置为 "[mikrotik.net](http://mikrotik.net "http://mikrotik.net/")"

</details>

<details>
<summary>为什么使用 MikroTik Connectivity 时，延迟比使用本地运营商的 SIM 卡更高？</summary>

MikroTik Connectivity 作为漫游服务运行。它通过一组可能位于其他国家的 PDN 网关路由数据。额外的距离和额外的网络跳数会增加往返时间，因此与使用本地运营商的服务相比，延迟会显得更高。

</details>

<details>
<summary>为什么使用 MikroTik Connectivity 时，下载/上传速度比使用本地运营商的 SIM 卡更低？</summary>

MikroTik Connectivity 作为漫游服务运行。它通过一组可能位于其他国家的 PDN 网关路由数据。额外的距离和额外的网络跳数会增加往返时间，因此延迟会增加。由于延迟更高，TCP 性能会直接受到影响。TCP 依靠确认来增大其拥塞窗口并提升吞吐量。当往返时间变长时，确认返回需要更多时间，拥塞窗口增长更慢，可达到的吞吐量会下降。

</details>

<details>
<summary>如何暂停、升级或取消我的 MikroTik Connectivity 订阅？</summary>

要管理您的 eSIM 订阅套餐，请登录您的 **mikrotik.com** 账户并导航到 **"My devices"** 部分。搜索您设备的序列号并单击它。

在那里，您有两种方式管理您的套餐：

* **通过 "Plan" 标签页：** 在这里您会找到 **"Unsubscribe"** 选项，或通过选择不同的数据套餐来升级。
* **通过 "Details" 标签页：** 转到 **"Status"** 字段，您可以在 **Active**、**Pause data transfer** 或 **Cancel subscription** 之间切换。

</details>
