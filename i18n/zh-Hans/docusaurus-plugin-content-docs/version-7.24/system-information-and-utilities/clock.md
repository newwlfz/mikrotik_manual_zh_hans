---
title: "时钟"
description: "本页介绍 MikroTik RouterOS 时钟配置，详细说明时区设置，包括自动检测和手动调整、GMT 偏移、夏令时规则，以及有关内部时钟可靠性的警告。"
tags:
  - 'time-zone'
  - 'clock'
  - 'ntp'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/clock
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "system-information-and-utilities"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 使用 TZ 数据库中的数据。该数据库中的大多数时区均已包含，且名称相同。由于路由器上的本地时间主要用于时间戳和时间相关配置，而不用于历史日期计算，因此不包含过去年份的时区信息。目前，仅包含从 2005 年开始的信息。

以下设置可在 `/system/clock` 控制台路径以及“System > Clock”WinBox 窗口的“Time”选项卡中使用。

启动日期和时间为 **1970-01-02 00:00:00** [+|-]gmt-offset。

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **time** (*HH:MM:SS);* | 其中 *HH* 为小时，范围 00..23；*MM* 为分钟，范围 00..59；*SS* 为秒，范围 00..59。 |
| **date** (*YYYY-MM-DD);* | 其中 *YYYY* 为年份，范围 1970..2037；*MM* 为月份，范围 01..12；*DD* 为日期，范围 01..31：**date** 和 **time** 显示路由器当前的本地时间。这些值可以使用 **set** 命令调整。但本地时间无法导出，也不会随其余配置一起存储。 |
| **time-zone-name** (*manual*，或时区名称；默认值：*manual*); | 时区名称。与 RouterOS 中的大多数文本值一样，该值区分大小写。特殊值 *manual* 表示应用手动配置的 GMT 偏移，默认值为 *00:00*，且不使用夏令时。 |
| **time-zone-autodetect** (*yes* 或 *no*；默认：yes); | 该功能从 v6.27 起可用。启用后，将自动设置时区。 |

:::warning
新安装的 RouterOS 以及配置重置后，默认启用 Time-zone-autodetect。时区根据路由器的公网 IP 地址和我们的 Cloud 服务器数据库进行检测。从 RouterOS v6.43 起，设备将使用 cloud2.mikrotik.com 与 MikroTik 的 Cloud 服务器通信。较旧版本将使用 cloud.mikrotik.com 与 MikroTik 的 Cloud 服务器通信。

**重要事项：** 请注意，路由器内部 CPU 时钟不是精确计时操作的可靠时间源，其频率可能因电源管理、散热条件和硬件差异而变化，即使型号相同也是如此。这种变化属于正常现象，不会影响路由器正常工作。为获得准确计时，建议使用基于网络的时间同步，例如 NTP（Network Time Protocol）。
:::

Configuration

### 当前时区信息 {#active-time-zone-information}

- **dst-active** (*yes* 或 *no*；只读属性)：当前时区启用夏令时时，该属性的值为 *yes*。
- **gmt-offset** ([*+*|*-*]*HH:MM* - 以小时和分钟表示的偏移量；只读属性)：系统在应用基础时区偏移和当前生效的夏令时偏移后使用的 GMT 偏移当前值。

### 手动配置时区 {#manual-time-zone-configuration}

这些设置可在 `/system/clock/manual` 控制台路径以及 "System > Clock" WinBox 窗口的 "Manual Time Zone" 选项卡中使用。仅当 **time-zone-name**=*manual* 时，这些设置才会生效。只能手动配置一个夏令时周期。

- **time-zone**、**dst-delta** ([*+*|*-*]*HH:MM* - 以小时和分钟表示的时间偏移，前导加号可省略；默认值：*+00:00*)：夏令时未启用时，使用 GMT 偏移 **time-zone**。夏令时启用时，使用 GMT 偏移 **time-zone** + **dst-delta**。
- **dst-start**、**dst-end** (*YYYY-MM-DD HH:MM:SS* - 日期和时间，在 **set** 命令中可以省略日期或时间；默认值：*1970-01-01 00:00:00*)：夏令时开始和结束时的本地时间。
