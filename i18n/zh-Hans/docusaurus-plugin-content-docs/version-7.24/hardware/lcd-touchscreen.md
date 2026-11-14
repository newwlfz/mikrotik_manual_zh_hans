---
sidebar_key: "hardware/lcd-touchscreen"
sidebar_position: 3
title: "LCD 触摸屏"
sidebar_label: "LCD 触摸屏"
description: "本页面介绍了 MikroTik RouterOS 上的 LCD 触摸屏功能，涵盖背光超时、配色方案和屏幕默认值等配置选项。它还说明了校准流程、屏幕截图捕获、接口监控设置，以及用于网络统计的基于页面的图表显示。"
tags:
  - 'lcd'
  - 'touchscreen'
  - 'configuration'
source: https://manual.mikrotik.com/docs/7.24/hardware/lcd-touchscreen
captured_at: '2026-11-04T11:29:30+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

RouterBOARD 2011U 和 CCR 系列设备配备电阻式触摸屏，可快速访问设备统计信息和简单配置选项。触摸屏需要按压表面才能识别触摸；因此，轻扫和快速或短暂的点击可能不会被识别（这与手机上常见的电容式触摸屏不同）。如果您用手指操作屏幕有困难，也可以尝试使用触控笔或笔的另一端。

## 配置 {#configuration}

**子菜单：** `/lcd`

此子菜单提供 LCD 触摸屏的配置选项。

| 属性 | 描述 |
| :-- | :-- |
| **backlight-timeout** (*时间间隔：5m..2h \| never*；默认：**30m**) | 指定 LCD 触摸屏背光关闭前的无操作时长。设置为 "never" 可使背光始终开启。 |
| **color-scheme** (*dark \| light*；默认：取决于 RouterBoard 型号) | 设置 LCD 显示屏的配色方案，在深色或浅色背景之间选择。 |
| **default-screen** (*informative-slideshow\|interface\|log\|main-menu\|stat-slideshow\|stats\|stats-all*；默认：**main-menu**) | 定义路由器启动后 LCD 上显示的默认屏幕。 |
| **enabled** (*yes \| no*；默认：**yes**) | 启用或禁用 LCD 触摸屏。禁用后，触摸屏停止工作，统计信息收集会重置，LCD 程序关闭。 |
| **read-only-mode** (*yes \| no*；默认：**yes**) | 启用或禁用只读模式。启用后，允许更改配置的菜单会从 LCD 界面中隐藏。 |
| **time-interval** (*min \| hour \| daily \| weekly*；默认：**min**) | 设置 Stats 屏幕中显示的接口统计信息所使用的时间间隔。 |
| **touch-screen** (*enabled \| disabled*，默认：**enabled**) | 启用或禁用触摸屏输入功能。 |

### 可用功能 {#available-functions}

LCD 触摸屏支持以下功能：

- **backlight** - 打开或关闭 LCD 背光。LCD 程序会继续运行。
- **recalibrate** - 启动 LCD 触摸屏校准过程。
- **show** - 指定 LCD 上显示的屏幕。
- **take-screenshot** - 截取当前显示的 LCD 屏幕截图。

### LCD 触摸屏校准 {#lcd-touchscreen-calibration}

LCD 触摸屏在首次使用前需要校准。校准成功后，校准数据会保存在路由器上。如果不存在校准数据，校准过程会自动启动。

在校准或重新校准期间，您必须触摸屏幕上显示的四个点。其中三个点用于计算校准变量，第四个点用于验证校准是否成功。如果校准失败，校准变量不会被保存。触摸第四个点后，会显示一条消息说明校准结果。

### 截取 LCD 截图 {#take-lcd-screenshot}

take-screenshot 功能会将当前 LCD 屏幕捕获为 BMP 图像，并使用指定的文件名保存到 File List 中。没有文件名的截图不会被保存。如果已存在指定名称的文件，它将被覆盖。

示例：

```ros
[admin@MikroTik] /lcd/take-screenshot file-name=screen-1
Screenshot taken
[admin@MikroTik] >
```

## LCD 接口 {#lcd-interface}

**子菜单：** `/lcd/interface`

Interfaces 子菜单用于配置各个接口统计信息在 Stat Slideshow 中的显示方式。最多可以向 LCD 添加 10 个额外的（非物理）接口用于监控。

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes | no*；默认：**no**) | 定义该项在 Informative Slideshow 中是被忽略还是被使用 |
| **max-speed** (*integer | auto*；默认：) | 设置用于在 All Interface 图表和 Interface 屏幕中计算带宽使用率的最大接口速率。"auto" 值只能分配给物理接口。 |
| **timeout** (*时间间隔：1s..1m*；默认：**10s**) | 指定幻灯片播放期间每个接口页面的显示时长 |

- **display** - 在 Stats 屏幕中显示该接口。

### All Interface 图表屏幕 {#all-interface-graph-screen}

**子菜单：** `/lcd/interface/pages`

页面是一个最多可包含 12 个接口条形图的屏幕。该子菜单允许配置页面中显示哪些接口。All Interface Graph 屏幕最多可添加 5 个页面，每页最多 12 个接口。要将接口添加到页面，必须先在 `/lcd/interface` 子菜单下添加该接口。

| 属性 | 描述 |
| :-- | :-- |
| **interfaces** (接口名称；默认：) | 屏幕上显示的接口。必须至少有 1 个接口。 |

## LCD 信息屏幕 {#lcd-informative-screens}

**子菜单：** `/lcd/screen`

Screens 菜单允许您为 Informative Slideshow 中的每张幻灯片配置显示时长。

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes | no*；默认：**no**) | 定义该项在 Informative Slideshow 中是被忽略还是被使用 |
| **timeout** (*时间间隔：1s..1m*；默认：**10s**) | 每张信息幻灯片的显示时长 |

## LCD PIN 码 {#lcd-pin-code}

**子菜单：** `/lcd/pin`

![](/img/35909f17b70e255b.webp)

PIN 码用于保护 LCD 屏幕上的敏感菜单。当只读模式被禁用，而您尝试添加 IP 地址、重置或重启路由器时，会要求输入 PIN 码。默认 PIN 码为 **1234**。

| 属性 | 描述 |
| :-- | :-- |
| **pin-number** (*number*；默认：**1234**) | PIN 保护码 |
| **hide-pin-number** (*yes | no*；默认：**no**) | 是在 LCD 屏幕上显示输入的数字，还是用星号将其隐藏 |

## LCD 屏幕/模式 {#lcd-screensmodes}

自 v6.0 起，LCD 具有菜单结构。菜单屏幕由用于导航菜单的按钮组成。如果内容无法完全显示在实际屏幕上，屏幕右侧会显示滚动条。如果还有更多可用选项，可以向上或向下拖动屏幕来访问它们。每个菜单屏幕顶部都有一个 "Back" 按钮，可跳转到上一个屏幕。

### 启动 {#startup}

![](/img/b7e3dabc4313f282.webp)

如果路由器使用默认配置——用户名为 "admin" 且没有密码，则 LCD 上会出现警告。此屏幕显示分配给各接口的 IP 地址，可用于连接路由器。否则，启动后会显示主菜单屏幕。

### 接口 {#interfaces}

Interfaces 菜单显示所有以太网和无线接口。带宽使用情况的显示方式与 All interface 图表屏幕类似。在 Interfaces 屏幕上，您可以选择要查看的特定接口。可用选项如下：

- Info（仅限物理接口）- 显示接口相关信息的菜单。
- Registration Table（仅限无线接口）- 显示该无线接口所有已注册客户端及其各自信号强度的菜单。
- Addresses - 列出分配给该接口的所有地址的菜单。
- Stats - 允许您跳转到 "Stats" 屏幕中所选接口的菜单。您可以直接选择显示 Bandwidth 或 Packets。

|  |  |  |  |
| :-- | :-- | :-- | :-- |
| ![](/img/54a0dafdc25ce2fc.jpg)  Info  | ![](/img/24fbfa7cdb655cfe.jpg)  Registration Table  | ![](/img/56c1afa87b0aae11.jpg)  Addresses  | ![](/img/222dfe20247759b5.jpg)  Stats 选择  |

### 统计 {#stats}

Stats 屏幕显示 RX 和 TX 的单接口图表。数值从右向左更新（从最新到最旧）。显示的信息包括：RX/TX 速率和数据包。

![](/img/baabdd8d0c21d2da.webp)

接口名称显示在右上角；如果名称过长，它会被截断（末尾的字符被截掉）。右上角显示这些数值对应的时间间隔。可用的时间值如下：

- **Min（分钟）** - 显示最近一分钟的数值。单位 = 秒。垂直线分隔前 30 秒。总数值：30 + 24。
- **Hour** - 显示最近数小时的数值。单位 = 5 分钟。垂直线分隔 1 小时。总数值：12 + 12 + 3。
- **Daily** - 显示最近数天的数值。单位 = 小时。垂直线分隔 1 天。总数值：12 + 12 + 3。
- **Weekly** - 显示最近数周的数值。单位 = 天。垂直线分隔 1 周。总数值：7 + 7 + 4。

## 手势 {#motions}

- 点击 - 手指触碰触摸屏且移动幅度不大。
  - 如果点击落在屏幕右上角（高度为屏幕 1/4 的方形区域），信息时间间隔会切换：Min -> Hour -> Daily -> Weekly -> Min...
  - 否则，点击会在图表信息之间循环切换：rate -> packets -> rate...
- 滑动/拖动 - 按住手指的同时向任意方向移动。拖动过程中更改项应会高亮显示。
  - 上 - 进入主菜单。
  - 下 - 选择 All Interface 图表屏幕。
  - 左 - 下一个接口。
  - 右 - 上一个接口。

### All Interface 图表屏幕 {#all-interface-graph-screen-1}

![](/img/73afe769af809f81.webp)

All interface 图表屏幕显示所有接口的 RX/TX 带宽使用情况。最大值的计算方式如下——对于以太网接口，为协商速率或设定速率。对于无线接口，则根据所用频段、信道宽度和链数，使用理论值计算。此屏幕的目的是查看单个接口上各数值之间的相互关系。

## 手势 {#motions-1}

- 滑动/拖动：
  - 上 - 返回（到 Stats 屏幕）。
  - 左 - 下一页。
  - 右 - 上一页。

### 统计幻灯片 {#stat-slideshow}

Stat Slideshow 屏幕与 "Stats" 屏幕类似，但接口会在超时后切换。幻灯片播放的设置存储在 RouterOS 子菜单 `/lcd/interface` 中

### 信息幻灯片 {#informative-slideshow}

子菜单 `/lcd/screen` 中的 Informative Slideshow 屏幕会循环显示各种系统信息：

- 总流量。
- 总数据包。
- 资源。
- 系统。
- 健康。
- 日期和时间。

|  |  |  |
| :-- | :-- | :-- |
| ![](/img/556666c2b85fc33a.jpg)  系统  | ![](/img/a011c555fbd9b951.jpg)  资源  | ![](/img/6fc018ab15574df5.jpg)  健康  |

### 日志 {#log}

![](/img/e11d01a3e7b29812.webp)
Log 屏幕显示 log action=echo 的最近 5 条日志记录。

### 重启和重置配置 {#reboot-and-reset-configuration}

这些屏幕仅在只读模式被禁用时可用。要访问其中任何一个屏幕，都必须输入 PIN 码。如果 PIN 认证成功，用户必须按 "Yes" 按钮确认所需操作，或按 "No" 取消。
