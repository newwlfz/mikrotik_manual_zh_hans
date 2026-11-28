---
title: "LCD 触摸屏"
description: "本文档介绍 MikroTik RouterOS 上的 LCD 触摸屏功能，涵盖背光超时、配色方案和屏幕默认设置等配置选项。文中说明校准流程、屏幕截图捕获、接口监控设置，以及用于显示网络统计信息的基于页面的图表。"
tags:
  - 'lcd'
  - 'touchscreen'
  - 'configuration'
source: https://manual.mikrotik.com/docs/7.24/hardware/lcd-touchscreen
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

RouterBOARD 2011U 和 CCR 系列设备配备电阻式触摸屏，可快速访问设备统计信息和简单配置选项。触摸屏需要按压屏幕表面才能识别触摸；因此，轻扫以及快速或短暂轻触可能无法被识别（不同于手机上常见的电容式触摸屏）。如果用手指操作屏幕时遇到困难，也可以尝试使用触控笔或笔的另一端。

## 配置 {#configuration}

**子菜单：** `/lcd`

该子菜单提供 LCD 触摸屏的配置选项。

| 属性 | 说明 |
| :-- | :-- |
| **backlight-timeout** (*time interval: 5m..2h \| never*；默认：**30m**) | 指定 LCD 触摸屏背光关闭前的不活动时间。设置为“never”可使背光始终保持开启。 |
| **color-scheme** (*dark \| light*；默认：取决于 RouterBoard 型号) | 设置 LCD 显示屏的配色方案，在深色或浅色背景之间选择。 |
| **default-screen** (*informative-slideshow\|interface\|log\|main-menu\|stat-slideshow\|stats\|stats-all*；默认：**main-menu**) | 定义路由器启动后 LCD 上显示的默认屏幕。 |
| **enabled** (*yes \| no*；默认：**yes**) | 启用或禁用 LCD 触摸屏。禁用时，触摸屏停止工作，统计信息收集重置，LCD 程序关闭。 |
| **read-only-mode** (*yes \| no*；默认：**yes**) | 启用或禁用只读模式。启用时，允许更改配置的菜单会从 LCD 界面中隐藏。 |
| **time-interval** (*min \| hour \| daily \| weekly*；默认：**min**) | 设置 Stats 屏幕中显示的接口统计信息的时间间隔。 |
| **touch-screen** (*enabled \| disabled*，默认：**enabled**) | 启用或禁用触摸屏输入功能。 |

### 可用功能 {#available-functions}

LCD 触摸屏支持以下功能：

- **backlight** - 开启或关闭 LCD 背光。LCD 程序继续运行。
- **recalibrate** - 启动 LCD 触摸屏校准过程。
- **show** - 指定 LCD 上显示的屏幕。
- **take-screenshot** - 创建当前 LCD 显示屏幕的截图。

### LCD 触摸屏校准 {#lcd-touchscreen-calibration}

LCD 触摸屏在首次使用前需要校准。校准成功后，校准数据会存储在路由器上。如果不存在校准数据，校准过程会自动启动。

在校准或重新校准期间，必须触摸屏幕上显示的四个点。其中三个点用于计算校准变量，第四个点用于验证校准是否成功。如果校准失败，则不会保存校准变量。触摸第四个点后，将显示一条消息，指示校准结果。

### 获取 LCD 截图 {#take-lcd-screenshot}

take-screenshot 功能将当前 LCD 屏幕捕获为 BMP 图像，并使用指定文件名保存到 File List。未指定文件名的截图不会保存。如果指定名称的文件已存在，则会覆盖该文件。

Example:

```ros
[admin@MikroTik] /lcd/take-screenshot file-name=screen-1
Screenshot taken
[admin@MikroTik] >
```

## LCD 接口 {#lcd-interface}

**子菜单：** `/lcd/interface`

Interfaces 子菜单用于配置各个接口统计信息在 Stat Slideshow 中的显示方式。最多可向 LCD 添加 10 个额外的（非物理）接口用于监控。

| 属性 | 说明 |
| :-- | :-- |
| <strong>disabled</strong>（*yes | no*；默认：<strong>no</strong>） |
| <strong>max-speed</strong>（*integer | auto*；默认：） |
| <strong>timeout</strong>（<em>time interval: 1s..1m</em>；默认：<strong>10s</strong>） | 指定每个接口幻灯片在幻灯片放映期间的显示时长 |

- **display** - 在 Stats 屏幕中显示该接口。

### 所有接口图形屏幕 {#all-interface-graph-screen}

**子菜单：** `/lcd/interface/pages`

页面是一种屏幕，最多可包含 12 个接口条形图。该子菜单用于配置页面中显示的接口。所有接口图形屏幕最多可添加 5 个页面，每个页面最多可添加 12 个接口。要将接口添加到页面，必须先在 `/lcd/interface` 子菜单下添加该接口。

| 属性 | 说明 |
| :-- | :-- |
| **interfaces**（接口名称；默认：） | 屏幕上显示的接口。必须至少有 1 个接口。 |

## LCD 信息屏幕 {#lcd-informative-screens}

**子菜单：** `/lcd/screen`

Screens 菜单用于配置信息幻灯片中每张幻灯片的显示时长。

| 属性 | 说明 |
| :-- | :-- |
| <strong>disabled</strong>（*yes | no*；默认：<strong>no</strong>） |
| <strong>timeout</strong>（<em>time interval: 1s..1m</em>；默认：<strong>10s</strong>） | 每张信息幻灯片的显示时长 |

## LCD PIN 码 {#lcd-pin-code}

**子菜单：** `/lcd/pin`

![](/img/35909f17b70e255b.webp)

PIN 码用于保护 LCD 屏幕上的敏感菜单。当 Read-Only 模式被禁用，并且你尝试添加 IP 地址、重置或重启路由器时，会要求输入 PIN。默认 PIN 为 **1234**。

| 属性 | 说明 |
| :-- | :-- |
| <strong>pin-number</strong> (<em>number</em>; Default: <strong>1234</strong>) | PIN 保护码 |
| <strong>hide-pin-number</strong> (*yes | no*; Default: <strong>no</strong>) |  |

## LCD 屏幕/模式 {#lcd-screensmodes}

自 v6.0 起，LCD 具有菜单结构。菜单屏幕由用于导航菜单的按钮组成。如果内容无法完全显示在实际显示屏上，屏幕右侧会显示滚动条。如果有更多可用选项，可以向上或向下拖动屏幕以访问这些选项。每个菜单屏幕顶部都有一个“Back”按钮，用于跳转到上一屏幕。

### 启动 {#startup}

![](/img/b7e3dabc4313f282.webp)

如果路由器使用默认配置，即用户名为“admin”且没有密码，则 LCD 上会显示警告。该屏幕显示分配给接口的 IP 地址，可用于连接路由器。否则，启动后将显示 Main 菜单屏幕。

### 接口 {#interfaces}

Interfaces 菜单显示所有 Ethernet 和 Wireless 接口。带宽使用情况显示方式与 All interface graph 屏幕类似。在 Interfaces 屏幕中，可以选择特定接口进行查看。可用选项如下：

- Info（仅适用于物理接口）——显示接口信息的菜单。
- Registration Table（仅适用于无线）——显示无线接口的所有已注册客户端及其对应信号强度的菜单。
- Addresses——列出分配给接口的所有地址的菜单。
- Stats——用于跳转到“Stats”屏幕中所选接口的菜单。可以直接选择显示 Bandwidth 或 Packets。

|  |  |  |  |
| :-- | :-- | :-- | :-- |
| ![](/img/54a0dafdc25ce2fc.jpg)  信息 | ![](/img/24fbfa7cdb655cfe.jpg)  注册表 | ![](/img/56c1afa87b0aae11.jpg)  地址 | ![](/img/222dfe20247759b5.jpg)  统计信息选择 |

### 统计信息 {#stats}

Stats 屏幕显示单个接口的 RX 和 TX 图表。数值从右向左更新（从最新到最旧）。显示的 Info 包括：RX/TX 速率和数据包。

![](/img/baabdd8d0c21d2da.webp)

接口名称显示在右上角；如果名称过长，将被截断（末尾字符会被截去）。右上角显示数值的时间间隔。可用的时间值如下：

- **Min (Minute)**——显示最后一分钟的数值。单位 = 秒。竖线分隔前 30 秒。总数值：30 + 24。
- **Hour**——显示最近数小时的数值。单位 = 5 分钟。竖线分隔 1 小时。总数值：12 + 12 + 3。
- **Daily**——显示最近数天的数值。单位 = 小时。竖线分隔 1 天。总数值：12 + 12 + 3。
- **Weekly**——显示最近数周的数值。单位 = 天。竖线分隔 1 周。总数值：7 + 7 + 4。

## Motions

- 轻点 - 手指在触摸屏上轻触，不进行明显移动。
  - 如果轻点落在屏幕右上角（边长约为屏幕高度 1/4 的方形区域），将切换信息时间间隔：Min -> Hour -> Daily -> Weekly -> Min...
  - 否则，轻点会在图表信息之间循环：rate -> packets -> rate...
- 滑动/拖动 - 按住手指的同时向任意方向移动。拖动期间应高亮显示变化。
  - 向上 - 进入主菜单。
  - 向下 - 选择 All Interface 图表屏幕。
  - 向左 - 下一个接口。
  - 向右 - 上一个接口。

### 所有接口图形界面 {#all-interface-graph-screen-1}

![](/img/73afe769af809f81.webp)

All interface 图表屏幕显示所有接口的 RX/TX 带宽使用情况。最大值的计算方式如下：对于 Ethernet 接口，使用协商速率或设置的速率。对于无线接口，根据所用频段、channel-width 和 chain 数量并使用理论值计算。该屏幕的目的是查看单个接口的各项值之间的关联。

## Motions

- 滑动/拖动：
  - 向上 - 返回（Stats 屏幕）。
  - 向左 - 下一页。
  - 向右 - 上一页。

### 统计幻灯片 {#stat-slideshow}

Stat Slideshow 屏幕与“Stats”屏幕类似，但接口会在超时后切换。幻灯片设置存储在 RouterOS 子菜单 `/lcd/interface` 中。

### 信息幻灯片 {#informative-slideshow}

子菜单 `/lcd/screen` 中的 Informative Slideshow 屏幕会在包含各类系统信息的屏幕之间循环：

- 聚合流量。
- 聚合数据包。
- 资源。
- 系统。
- 健康状态。
- 日期和时间。

|  |  |  |
| :-- | :-- | :-- |
| ![](/img/556666c2b85fc33a.jpg)  系统  | ![](/img/a011c555fbd9b951.jpg)  资源  | ![](/img/6fc018ab15574df5.jpg)  健康状态  |

### Log

![](/img/e11d01a3e7b29812.webp)
The Log screen shows the 5 last log entries where log action=echo.

### 重启和重置配置 {#reboot-and-reset-configuration}

这些页面仅在 Read-Only 模式禁用时可用。要访问任意页面，必须输入 Pin 码。如果 Pin 验证成功，用户必须按下“Yes”按钮确认所需操作，或按下“No”按钮取消。
