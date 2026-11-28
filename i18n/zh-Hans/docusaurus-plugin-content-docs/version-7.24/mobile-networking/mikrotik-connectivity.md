---
title: "MikroTik 连接性"
description: "MikroTik Connectivity 引入了 eSIM 解决方案，无需更换物理 SIM 卡即可实现设备无缝连接，并支持通过 MikroTik 账户门户和 RouterOS CLI/WinBox 接口执行激活步骤。"
tags:
  - 'esim'
  - 'connectivity'
source: https://manual.mikrotik.com/docs/7.24/mobile-networking/mikrotik-connectivity
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 摘要 {#summary}

MikroTik Connectivity 是内置的新 eSIM 解决方案，可确保设备在任何位置保持连接，无需更换物理 SIM 卡或执行外部激活步骤。详情请访问 [https://mikrotik.com/connectivity](https://mikrotik.com/connectivity)

### 激活示例 {#activation-example}

1) 登录 MikroTik 账户，选择“My devices”。

![](/img/e298464df4344576.png)

1) 输入设备的 Serial Number，系统将自动检测。选择区域，然后按“Add to list”。

![](/img/7a833a6166f9b0dd.png)

1) 选择适合需求的数据套餐和付款方式，然后将其加入购物车。

![](/img/c7f14ae2aa5edac1.png)

1) 在购物车中完成付款。

![](/img/52d12f26caaa6a5c.png)

1) 付款完成后返回“My devices”，将看到订阅现已处于 Active 状态。

![](/img/a266f451f8e08e2e.png)

:::info
MikroTik eSIM 配置文件已预加载，因此激活期间无需连接互联网。激活过程通常需要几分钟，但在某些情况下可能需要数小时。
:::

1) 在 RouterOS 中检查设备是否设置为使用“esim”，并确认已激活正确的配置文件。  
  
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

 进入 Interfaces > LTE > Modem，选择 esim SIM 插槽：

![](/img/530500251b870002.png)

进入 Interfaces > LTE > eSIM，检查哪个 esim 配置文件处于激活状态：

![](/img/b8d00f0482c880d6.png)

如果需要更改 Active profile，右键单击该配置文件并选择“Activate”：

![](/img/7ec165b963f9f2b8.png)

#### [Video Tutorial: Our official YT channel, MikroTips series](https://www.youtube.com/watch?v=2YxHL9A4Ys0)

### FAQ

<details>
<summary>Is the IP address assigned to my device a public IP address?</summary>

否，IP 地址为私有地址。你可以配置 BTH 以远程访问设备：[Back To Home（远程回家）](/docs/network-management/cloud/back-to-home)

</details>

<details>
<summary>Is IPv6 also supported?</summary>

仅支持 IPv4。

</details>

<details>
<summary>What Access Point Name (APN) should I configure?</summary>

可以使用 `"use-network-apn=yes"` 选项，或手动将 APN 设置为 `"[mikrotik.net](http://mikrotik.net "http://mikrotik.net/")"`。

</details>

<details>
<summary>Why is the latency higher when using MikroTik Connectivity compared to using my local operator’s SIM?</summary>

MikroTik Connectivity 作为漫游服务运行。它通过一组 PDN 网关路由数据，这些网关可能位于其他国家。额外的距离和增加的网络跳数会延长往返时间，因此延迟看起来比使用本地运营商服务时更高。

</details>

<details>
<summary>Why is the download/upload speed lower when using MikroTik Connectivity compared to using my local operator’s SIM?</summary>

MikroTik Connectivity 作为漫游服务运行。它通过一组 PDN 网关路由数据，这些网关可能位于其他国家。额外的距离和增加的网络跳数会延长往返时间，因此延迟增加。由于延迟较高，TCP 性能会受到直接影响。TCP 依赖确认来增加拥塞窗口并提升吞吐量。当往返时间变长时，确认返回需要更多时间，拥塞窗口增长更慢，可实现的吞吐量下降。

</details>

<details>
<summary>How do I pause, upgrade, or cancel my MikroTik Connectivity subscription?</summary>

要管理 eSIM 订阅套餐，请登录 **mikrotik.com** 账户并进入 **“My devices”** 部分。搜索设备序列号并点击它。

在此处，可以通过两种方式管理套餐：

* **通过 “Plan” 选项卡：** 在此可以找到 **“Unsubscribe”** 选项，或通过选择其他数据套餐进行升级。
* **通过 “Details” 选项卡：** 进入 **“Status”** 字段，可在 **Active**、**Pause data transfer** 或 **Cancel subscription** 之间切换。

</details>
