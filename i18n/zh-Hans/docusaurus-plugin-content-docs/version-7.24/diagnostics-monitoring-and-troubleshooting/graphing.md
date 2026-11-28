---
title: "绘图"
description: "Graphing 是 RouterOS 中用于通过可视化图表监控 CPU、内存、磁盘使用率以及接口和队列流量随时间变化的工具，可通过 Web 浏览器或菜单访问。配置选项包括数据收集频率、存储设置以及特定 IP 范围的访问权限。"
tags:
  - 'graphing'
  - 'monitoring'
  - 'resource-usage'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/graphing
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Graphing 是一种用于监控各种 RouterOS 参数随时间变化并将收集到的数据绘制成图表的工具。  
观看有关此功能的[视频](https://youtu.be/FTQEnDZVHNc)。

:::danger
建议不要在内置内存较小的设备上将图表存储在磁盘上。
:::

Graphing 工具可以显示以下图表：

- 资源使用情况（CPU、内存和磁盘使用率）。
- 通过接口传递的流量。
- 通过 simple queue 传递的流量。

Graphing 由两部分组成：第一部分收集信息，另一部分在 Web 页面上显示数据。要访问图表，请在 Web 浏览器中输入 http://[Router\_IP\_address]/graphs/ 并选择要显示的图表。

或者，在 WebFig 界面右上角查找菜单 **≡**（三横线符号），以便找到“graphs”：

![](/img/502e6bf58d409e15.png)

内存图表示例：

![](/img/42a3d6819ca0c861.webp)

## 配置 {#configuration}

### 常规 {#general}

配置在 `/tool/graphing` 菜单下完成。默认禁用 graphing。可以在相应的子菜单中为接口、资源和简单队列配置 graphing。

**子菜单：** `/tool/graphing`

| Property | Description |
| :-- | :-- |
| **store-every** (*24hours \| 5min \| hour*; Default: **5min**) | 将收集到的数据写入系统驱动器的频率。 |
| **page-refresh** (*integer \| never*; Default: **300**) | 图形页面的刷新频率 |

### 接口图表 {#interface-graphing}

该子菜单用于配置 interface graphing 收集哪些接口的带宽使用数据。

**子菜单：** `/tool/graphing/interface`

| Property | Description |
| :-- | :-- |
| **allow-address** (*IP/IPv6 prefix*; Default: **0.0.0.0/0**) | 允许访问 graphing 信息的 IP 地址范围 |
| **comment** (*string*; Default: ) | 当前条目的描述 |
| **disabled** (*yes \| no*; Default: **no**) | 定义是否使用该条目 |
| **interface** (*all \| interface name*; Default: **all**) | 定义要监控的接口。**all** 表示监控路由器上的所有接口。 |
| **store-on-disk** (*yes \| no*; Default: **yes**) | 定义是否将收集到的信息存储在系统驱动器上。 |

### 队列图表 {#queue-graphing}

该子菜单用于配置哪些 simple queue 图表将收集带宽使用数据。

**子菜单：** `/tool/graphing/queue`

| 属性 | 说明 |
| :-- | :-- |
| **allow-address** (*IP/IPv6 prefix*；默认：**0.0.0.0/0**) | 允许访问图表信息的 IP 地址范围 |
| **allow-target** (*yes \| no*；默认：**yes**) | 是否允许从队列的 target-address 访问图表 |
| **comment** (*string*；默认：) | 当前条目的说明 |
| **disabled** (*yes \| no*；默认：**no**) | 定义是否使用该条目 |
| **simple-queue** (*all \| queue name*；默认：**all**) | 定义要监控的队列。**all** 表示监控路由器上的所有队列。 |
| **store-on-disk** (*yes \| no*；默认：**yes**) | 定义是否将收集到的信息存储在系统磁盘上。 |

:::warning
如果 simple queue 的 target-address 设置为 0.0.0.0/0，则即使 allow address 设置为特定地址，所有人也将能够访问队列图表。这是因为默认情况下，队列图表也可从目标地址访问。
:::

### 资源图表 {#resource-graphing}

该子菜单用于启用系统资源图表。图表收集以下数据：

- CPU 使用率
- 内存使用率
- 磁盘使用率

**子菜单：** `/tool/graphing/resource`

| 属性 | 描述 |
| :-- | :-- |
| **allow-address** (*IP/IPv6 prefix*；默认：**0.0.0.0/0**) | 允许访问 graphing 信息的 IP 地址范围 |
| **comment** (*string*；默认：) | 当前条目的描述 |
| **disabled** (*yes \| no*；默认：**no**) | 定义是否使用该条目 |
| **store-on-disk** (*yes \| no*；默认：**yes**) | 定义是否将收集的信息存储在系统驱动器上 |

## WinBox 中的 graphing {#graphing-in-winbox}

WinBox 允许查看与网页上相同的已收集信息。打开 **Tools->Graphing** 窗口。双击要查看图表的条目。

下图显示了 WinBox 中的内存使用图表：

![](/img/6dd203c558cbdb32.webp)
