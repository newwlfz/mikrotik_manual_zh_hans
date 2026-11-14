---
sidebar_key: "system-information-and-utilities/ups"
sidebar_position: 17
title: "UPS"
sidebar_label: "UPS"
description: "适用于 APC UPS 设备的 UPS 监视功能支持 serial/USB 连接，可通过休眠和安全重启能力妥善处理断电。它会监视电池状态、运行测试、记录电源变化，并需要通过 ups.npk 软件包手动安装。"
tags:
  - 'ups'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/ups
captured_at: '2026-11-04T11:33:44+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

**子菜单：** `/system/ups`
**标准：**  `APC Smart Protocol`

UPS 监控功能适用于通过串行 RS232 或 USB 连接支持 "smart" 信令的 APC UPS 设备。UPS 监控服务不包含在默认软件包集合中，需要手动下载并安装 ups.npk 软件包。该功能使网络管理员能够监控 UPS，并将路由器设置为在停电时“平稳”处理，而不会损坏路由器。该功能的基本目的是确保路由器在长时间断电后能够重新上线。为此，路由器会监控 UPS，并在市电中断且 UPS 电池剩余电量低于 10% 时，将自身置于休眠模式。随后路由器（在休眠模式下）会继续监控 UPS，并在市电恢复时自行重启。如果 UPS 电池耗尽且路由器完全断电，那么当“市电”恢复时，路由器将重新恢复完整运行。

MikroTik RouterOS 上的 UPS 监控功能支持：

- 在电源和电池故障时休眠并安全重启
- UPS 电池测试和运行时间校准测试
- 监控 UPS 支持的所有 "smart" 模式状态信息
- 记录电源变化日志

### 连接 UPS 设备 {#connecting-the-ups-unit}

串行 APC UPS（BackUPS Pro 或 SmartUPS）需要专用的串行线缆（除非通过 USB 连接）。如果 UPS 未随附线缆，可以向 APC 订购，也可以“自制”。请使用以下接线图：

| 路由器侧（DB9f） | 信号 | 方向 | UPS 侧（DB9m） |
| --: | :-- | :-- | --: |
| 2 | 接收 | IN | 2 |
| 3 | 发送 | OUT | 1 |
| 5 | 接地 |  | 4 |
| 7 | CTS | IN | 6 |

如果使用 RouterBOARD 设备，请务必将 "RouterBOOT setup key" 设置为 *Delete*，而不是默认的 *Any key*。这样可以避免在 RouterBOARD 启动期间，UPS 设备向串口发送数据时意外打开设置菜单。可以在启动时通过 RouterBOOT 选项完成此设置，也可以通过 Winbox 中的 RouterBoard Settings 完成：

```
Select key which will enter setup on boot:
 * 1 - any key
   2 - <Delete> key only
your choice:

```

### 常规属性 {#general-properties}

| 属性 | 描述 |
| :-- | :-- |
| **alarm-setting** (*delayed \| immediate \| low-battery \| none*；默认：**immediate**) | UPS 声音报警设置：delayed - 报警延迟到 on-battery 事件时触发immediate - 在 on-battery 事件后立即报警low-battery - 仅在电池电量低时报警none - 不报警 |
| **check-capabilities** (*yes \| no*；默认：**yes**) | 是否在读取信息之前检查 UPS 能力。禁用此项可修复与某些 UPS 型号的兼容性问题。（适用于 RouterOS 版本 6，自 v6.17 起实现） |
| **min-runtime** (*time*；默认：**never**) | 最小剩余运行时间。在“市电”故障后，路由器会监控 runtime-left 值。当该值达到 min-runtime 值时，路由器将进入休眠模式。  never - 当收到表示电池电量低于 10% 的 "battery low" 信号时，路由器将进入休眠模式0s - 只要电池能提供足够的电压，路由器就会继续工作 |
| **offline-time** (*time*；默认：**0s**) | 使用电池供电的工作时长。路由器等待该时间后进入休眠模式，直到 UPS 报告“市电”恢复  0s - 路由器将根据 min-runtime 设置进入休眠模式。在这种情况下，路由器会一直等待，直到 UPS 报告电池电量低于 10% |
| **port** (*string*；默认：) | 路由器的通信端口。 |

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **load** (*percent*) | UPS 的输出负载，以额定满载（瓦特）的百分比表示。该测量的典型精度为最大 105% 的 ±3% |
| **manufacture-date** (*string*) | UPS 的生产日期，格式为 "mm/dd/yy"（月、日、年）。 |
| **model** (*string*) | 少于 32 个 ASCII 字符的字符串，由 UPS 型号名称组成（即 UPS 正面上的文字） |
| **nominal-battery-voltage** (*integer*) | UPS 的标称电池电压额定值（这不是 UPS 的实际电池电压） |
| **offline-after** (*time*) | 路由器何时离线 |
| **serial** (*string*) | 至少 8 个字符的字符串，直接表示出厂时设置的 UPS 序列号。较新的 SmartUPS 型号具有 12 个字符的序列号 |
| **version** (*string*) | UPS 版本由三个字段组成：SKU 编号、固件修订版本、国家代码。国家代码可能为以下之一：I - 220/230/240 VacD - 115/120 VacA - 100 VacM - 208 VacJ - 200 Vac |

:::info
**注意：** 要启用 UPS 监控，串口必须可用。
:::

#### 示例 {#example}

为 serial1 端口启用 UPS 监控：

```
[admin@MikroTik] /system/ups> add port=serial1 disabled=no
[admin@MikroTik] /system/ups> print
Flags: X - disabled, I - invalid
 0    name="ups" port=serial1 offline-time=5m min-runtime=5m
      alarm-setting=immediate model="SMART-UPS 1000" version="60.11.I"
      serial="QS0030311640" manufacture-date="07/18/00"
      nominal-battery-voltage=24V
[admin@MikroTik] /system/ups>

```

### 运行时间校准 {#runtime-calibration}

**命令：**  `/system/ups/rtc/<id>`

rtc 命令会让 UPS 开始运行时间校准，直到电池容量降至低于满容量的 25%。该命令会校准返回的运行时间值。

:::info
**注意：** 仅当电池容量为 100% 时才会开始测试。
:::

### 监控 {#monitoring}

**命令：**  `/system/ups/monitor <id>`

| 属性 | 描述 |
| :-- | :-- |
| **battery-charge** () | UPS 的剩余电池容量，以完全充满状态的百分比表示 |
| **battery-voltage** () | UPS 的当前电池电压。该测量的典型精度为最大值的 ±5%（取决于 UPS 的标称电池电压） |
| **frequency** () | 在线运行时，UPS 的内部工作频率与市电同步，偏差在标称 50 或 60 Hz 的 3 Hz 范围内。该测量的典型精度为满量程值 63 Hz 的 ±1% |
| **line-voltage** () | 在线市电电压 |
| **load** () | UPS 的输出负载，以额定满载（瓦特）的百分比表示。该测量的典型精度为最大 105% 的 ±3% |
| **low-battery** (*yes \| no*) | 仅在 UPS 报告此状态时显示 |
| **on-battery** (*yes \| no*) | UPS 电池是否正在供电 |
| **on-line** (*yes \| no*) | 电力是否由外部电网（电力公司）提供 |
| **output-voltage** () | UPS 的输出电压 |
| **overloaded-output** (*yes \| no*) | 仅在 UPS 报告此状态时显示 |
| **replace-battery** (*yes \| no*) | 仅在 UPS 报告此状态时显示 |
| **runtime-calibration-running** (*yes \| no*) | 仅在 UPS 报告此状态时显示 |
| **runtime-left** (*time*) | UPS 估计的剩余运行时间（分钟）。可以在 UPS 处于在线、旁路或电池供电模式时进行查询。UPS 的剩余运行时间回复基于可用电池容量和输出负载 |
| **smart-boost-mode** (*yes \| no*) | 仅在 UPS 报告此状态时显示 |
| **smart-ssdd-mode** () | 仅在 UPS 报告此状态时显示 |
| **transfer-cause** (*string*) | 最近一次切换到电池供电的原因（仅在设备使用电池供电时显示） |

#### 示例 {#example-1}

使用市电供电时：

```
[admin@MikroTik] /system/ups> monitor 0
          on-line: yes
       on-battery: no
      RTC-running: no
     runtime-left: 20m
   battery-charge: 100%
  battery-voltage: 27V
     line-voltage: 226V
   output-voltage: 226V
             load: 45%
      temperature: 39C
        frequency: 50Hz
  replace-battery: no
      smart-boost: no
       smart-trim: no
         overload: no
      low-battery: no

[admin@MikroTik] /system/ups>

```

使用电池供电时：

```
[admin@MikroTik] /system/ups> monitor 0
          on-line: no
       on-battery: yes
   transfer-cause: "Line voltage notch or spike"
      RTC-running: no
     runtime-left: 19m
    offline-after: 4m46s
   battery-charge: 94%
  battery-voltage: 24V
     line-voltage: 0V
   output-voltage: 228V
             load: 42%
      temperature: 39C
        frequency: 50Hz
  replace-battery: no
      smart-boost: no
       smart-trim: no
         overload: no
      low-battery: no

      [admin@MikroTik] /system/ups>

```
