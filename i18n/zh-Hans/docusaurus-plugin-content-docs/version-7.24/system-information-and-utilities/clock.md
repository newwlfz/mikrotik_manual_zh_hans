---
sidebar_key: "system-information-and-utilities/clock"
sidebar_position: 1
title: "时钟"
sidebar_label: "时钟"
description: "本页介绍 MikroTik RouterOS 时钟配置，详细说明时区设置，包括自动检测和手动调整、GMT 偏移、夏令时规则，以及有关内部时钟可靠性的警告。"
tags:
  - 'time-zone'
  - 'clock'
  - 'ntp'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/clock
captured_at: '2026-11-04T11:33:21+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 使用 TZ 数据库中的数据。该数据库中的大多数时区均已包含，并保持相同名称。由于路由器上的本地时间主要用于时间戳记录和依赖时间的配置，而不是用于历史日期计算，因此不包含过去年份的时区信息。目前仅包含从 2005 年开始的信息。

以下设置可在 `/system/clock` 控制台路径以及 WinBox 的“System > Clock”窗口中的“Time”选项卡中使用。

启动日期和时间为 **1970-01-02 00:00:00** [+|-]gmt-offset。

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **time** (*HH:MM:SS);* | 其中 *HH* - 小时 00..23，*MM* - 分钟 00..59，*SS* - 秒 00..59。 |
| **date** (*YYYY-MM-DD);* | 其中 *YYYY* - 年份，1970..2037，*MM* - 月份，01..12，*DD* - 日期，01..31：**date** 和 **time** 显示路由器上的当前本地时间。这些值可以使用 **set** 命令调整。但是，本地时间无法导出，并且不会与配置的其余部分一起存储。 |
| **time-zone-name** (*manual*，或时区名称；默认值：*manual*)； | 时区名称。与 RouterOS 中的大多数文本值一样，此值区分大小写。特殊值 *manual* 应用手动配置的 GMT 偏移，默认情况下为 *00:00*，且不启用夏令时。 |
| **time-zone-autodetect** (*yes* 或 *no*；默认值：yes)； | 从 v6.27 起可用的功能。如果启用，将自动设置时区。 |

:::warning
time-zone-autodetect 默认在新安装 RouterOS 时以及配置重置后启用。时区根据路由器的公共 IP 地址和我们的 Cloud 服务器数据库进行检测。从 RouterOS v6.43 起，设备将使用 cloud2.mikrotik.com 与 MikroTik 的 Cloud 服务器通信。较旧版本将使用 cloud.mikrotik.com 与 MikroTik 的 Cloud 服务器通信。

**重要：** 请注意，路由器的内部 CPU 时钟不是用于精确计时操作的可靠时间源，因为其频率可能会因电源管理、温度条件以及硬件差异而变化，即使是相同型号之间也是如此。这种变化是预期内的，不会影响路由器的正常性能。为了准确计时，建议使用基于网络的时间同步，例如 NTP（Network Time Protocol）。
:::

配置

### 活动时区信息 {#active-time-zone-information}

- **dst-active** (*yes* 或 *no*；只读属性)：当前时区的夏令时处于活动状态时，此属性的值为 *yes*。
- **gmt-offset** ([*+*|*-*]*HH:MM* - 以小时和分钟表示的偏移量；只读属性)：这是系统在应用基础时区偏移和当前生效的夏令时偏移后使用的当前 GMT 偏移值。

### 手动时区配置 {#manual-time-zone-configuration}

这些设置可在 `/system/clock/manual` 控制台路径以及 WinBox 的“System > Clock”窗口中的“Manual Time Zone”选项卡中使用。仅当 **time-zone-name**=*manual* 时，这些设置才会生效。只能手动配置一个夏令时时段。

- **time-zone**、**dst-delta** ([*+*|*-*]*HH:MM* - 以小时和分钟表示的时间偏移量，前导加号可选；默认值：*+00:00*)：当 DST 未生效时，使用 GMT 偏移 **time-zone**。当 DST 生效时，使用 GMT 偏移 **time-zone** + **dst-delta**。
- **dst-start**、**dst-end** (*YYYY-MM-DD HH:MM:SS* - 日期和时间，在 **set** 命令中可以省略日期或时间；默认值：*1970-01-01 00:00:00*)：DST 开始和结束时的本地时间。
