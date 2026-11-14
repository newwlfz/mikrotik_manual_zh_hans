---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/graphing"
sidebar_position: 11
title: "图表"
sidebar_label: "图表"
description: "Graphing 是 RouterOS 的一个工具，用于通过可通过 Web 浏览器或菜单访问的可视化图表，随时间监控 CPU、内存、磁盘使用率以及接口/队列流量。配置选项包括数据收集频率、存储设置以及针对特定 IP 范围的访问权限。"
tags:
  - 'graphing'
  - 'monitoring'
  - 'resource-usage'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/graphing
captured_at: '2026-11-04T11:28:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

图形功能是一个用于随时间监控各种 RouterOS 参数并将收集到的数据放入图形的工具。  
观看我们[关于此功能的视频](https://youtu.be/FTQEnDZVHNc)。

:::danger
对于内置内存较小的设备，我们建议不要将图形存储在磁盘上。
:::

图形工具可以显示以下各项的图形：

- 资源使用情况（CPU、内存和磁盘使用情况）。
- 通过接口的流量。
- 通过简单队列的流量。

图形功能由两部分组成——第一部分收集信息，另一部分在 Web 页面上显示数据。要访问图形，请在 Web 浏览器中输入 http://[Router\_IP\_address]/graphs/ 并选择要显示的图形。

或者，在 WebFig 界面右上角查找 **≡** 菜单（三横线符号），通过它可以找到“graphs”：

![](/img/502e6bf58d409e15.png)

内存图形示例：

![](/img/42a3d6819ca0c861.webp)

## 配置 {#configuration}

### 常规 {#general}

配置在 `/tool/graphing` 菜单下完成。默认情况下，图形功能处于禁用状态。您可以在各自对应的子菜单中为接口、资源和简单队列配置图形功能。

**子菜单：** `/tool/graphing`

| 属性 | 描述 |
| :-- | :-- |
| **store-every** (*24hours \| 5min \| hour*; 默认：**5min**) | 将收集到的数据写入系统驱动器的频率。 |
| **page-refresh** (*integer \| never*; 默认：**300**) | 图形页面刷新的频率 |

### 接口图形 {#interface-graphing}

该子菜单用于配置图形功能要收集哪个接口的带宽使用数据。

**子菜单：** `/tool/graphing/interface`

| 属性 | 描述 |
| :-- | :-- |
| **allow-address** (*IP/IPv6 prefix*; 默认：**0.0.0.0/0**) | 允许访问图形信息的 IP 地址范围 |
| **comment** (*string*; 默认：) | 当前条目的描述 |
| **disabled** (*yes \| no*; 默认：**no**) | 定义是否使用该项 |
| **interface** (*all \| interface name*; 默认：**all**) | 定义将监控哪个接口。**all** 表示将监控路由器上的所有接口。 |
| **store-on-disk** (*yes \| no*; 默认：**yes**) | 定义是否将收集到的信息存储在系统驱动器上。 |

### 队列图形 {#queue-graphing}

该子菜单用于配置图形功能要收集哪个简单队列的带宽使用数据。

**子菜单：** `/tool/graphing/queue`

| 属性 | 描述 |
| :-- | :-- |
| **allow-address** (*IP/IPv6 prefix*; 默认：**0.0.0.0/0**) | 允许访问图形信息的 IP 地址范围 |
| **allow-target** (*yes \| no*; 默认：**yes**) | 是否允许从队列的 target-address 访问图形 |
| **comment** (*string*; 默认：) | 当前条目的描述 |
| **disabled** (*yes \| no*; 默认：**no**) | 定义是否使用该项 |
| **simple-queue** (*all \| queue name*; 默认：**all**) | 定义将监控哪些队列。**all** 表示将监控路由器上的所有队列。 |
| **store-on-disk** (*yes \| no*; 默认：**yes**) | 定义是否将收集到的信息存储在系统驱动器上。 |

:::warning
如果简单队列的 target-address 设置为 0.0.0.0/0，那么即使 allow address 设置为特定地址，所有人也都能访问队列图形。发生这种情况是因为默认情况下，队列图形也可从目标地址访问。
:::

### 资源图形 {#resource-graphing}

该子菜单允许启用系统资源图形功能。图形功能收集以下数据：

- CPU 使用情况
- 内存使用情况
- 磁盘使用情况

**子菜单：** `/tool/graphing/resource`

| 属性 | 描述 |
| :-- | :-- |
| **allow-address** (*IP/IPv6 prefix*; 默认：**0.0.0.0/0**) | 允许访问图形信息的 IP 地址范围 |
| **comment** (*string*; 默认：) | 当前条目的描述 |
| **disabled** (*yes \| no*; 默认：**no**) | 定义是否使用该项 |
| **store-on-disk** (*yes \| no*; 默认：**yes**) | 定义是否将收集到的信息存储在系统驱动器上 |

## 在 WinBox 中查看图形 {#graphing-in-winbox}

Winbox 允许查看与网页上相同的已收集信息。打开 **Tools->Graphing** 窗口。双击您要查看图形的条目。

下图显示了 WinBox 的内存使用情况图形：

![](/img/6dd203c558cbdb32.webp)
