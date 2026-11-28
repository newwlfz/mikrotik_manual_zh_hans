---
title: "UPS"
description: "APC UPS 设备的 UPS 监控功能支持 serial/USB 连接，可通过休眠和安全重启实现断电时的正常处理。该功能监控电池状态、运行测试并记录电源变化，需要通过 ups.npk 软件包手动安装。"
tags:
  - 'ups'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/ups
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 概述 {#summary}

**子菜单：** `/system/ups`
**标准：**  `APC Smart Protocol`

UPS 监控功能适用于通过串行 RS232 或 USB 连接支持“智能”信号的 APC UPS 设备。UPS 监控服务不包含在默认软件包集中，因此需要手动下载并安装 ups.npk 软件包。该功能使网络管理员能够监控 UPS，并设置路由器在断电时“正常”处理，避免路由器损坏或数据损坏。该功能的基本目的是确保路由器在长时间断电后能够重新上线。为此，路由器将监控 UPS，并在市电中断且 UPS 电池剩余电量低于 10% 时将自身设置为休眠模式。随后，路由器将继续监控 UPS（处于休眠模式时），并在市电恢复时重新启动。如果 UPS 电池耗尽且路由器完全断电，则当“市电”恢复时，路由器将恢复完整运行。

MikroTik RouterOS 上的 UPS 监控功能支持：

- 电源和电池故障时的休眠与安全重启
- UPS 电池测试和运行时间校准测试
- 监控 UPS 支持的所有“智能”模式状态信息
- 记录电源变化

### 连接 UPS 设备 {#connecting-the-ups-unit}

串行 APC UPS（BackUPS Pro 或 SmartUPS）需要一根专用串行电缆（除非通过 USB 连接）。如果 UPS 未附带电缆，可以向 APC 订购，也可以自行制作。请使用以下示意图：

| 路由器侧（DB9f） | 信号 | 方向 | UPS 侧（DB9m） |
| --: | :-- | :-- | --: |
| 2 | 接收 | 输入 | 2 |
| 3 | 发送 | 输出 | 1 |
| 5 | 接地 |  | 4 |
| 7 | CTS | 输入 | 6 |

如果使用 RouterBOARD 设备，请确保将“RouterBOOT setup key”设置为 *Delete*，而不是默认的 *Any key*。这是为了避免 UPS 设备在 RouterBOARD 启动期间向串行端口发送数据时意外打开设置菜单。可以在启动期间的 RouterBOOT 选项中完成此操作，也可以通过 Winbox 中的 RouterBoard Settings 完成：

```
Select key which will enter setup on boot:
 * 1 - any key
   2 - <Delete> key only
your choice:

```

### 常规属性 {#general-properties}

| 属性 | 说明 |
| :-- | :-- |
| **alarm-setting** (*delayed \| immediate \| low-battery \| none*；默认：**immediate**) | UPS 声音警报设置：<ul><li>delayed - 警报延迟至发生 on-battery 事件时触发</li><li>immediate - 发生 on-battery 事件后立即警报</li><li>low-battery - 仅在电池电量低时警报</li><li>none - 不警报</li></ul> |
| **check-capabilities** (*yes \| no*；默认：**yes**) | 是否在读取信息前检查 UPS 功能。禁用该项可解决与某些 UPS 型号的兼容性问题。（适用于 RouterOS 版本 6，自 v6.17 起实现） |
| **min-runtime** (*time*；默认：**never**) | 剩余最短运行时间。发生“utility”故障后，路由器将监控 runtime-left 值。当该值达到 min-runtime 值时，路由器将进入休眠模式。<ul><li>never - 当发送“battery low”信号表示电池电量低于 10% 时，路由器将进入休眠模式</li><li>0s - 只要电池提供足够电压，路由器就会继续工作</li></ul> |
| **offline-time** (*time*；默认：**0s**) | 使用电池供电工作的时长。路由器等待该时长后进入休眠模式，直到 UPS 报告“utility”电源恢复 <ul><li>0s - 路由器根据 min-runtime 设置进入休眠模式。在这种情况下，路由器将等待 UPS 报告电池电量低于 10%</li></ul> |
| **port** (*string*；默认：) | 路由器的通信端口。 |

### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **load** (*percent*) | UPS 输出负载占额定满载功率的百分比，单位为瓦。该测量值的典型精度为最大 105% 的 ±3%。 |
| **manufacture-date** (*string*) | UPS 的生产日期，格式为“mm/dd/yy”（月、日、年）。 |
| **model** (*string*) | 少于 32 个 ASCII 字符的字符串，包含 UPS 型号名称（UPS 正面的文字）。 |
| **nominal-battery-voltage** (*integer*) | UPS 的标称电池电压额定值（这不是 UPS 的实际电池电压）。 |
| **offline-after** (*time*) | 路由器离线的时间。 |
| **serial** (*string*) | 至少 8 个字符的字符串，直接表示出厂时设置的 UPS 序列号。较新的 SmartUPS 型号使用 12 个字符的序列号。 |
| **version** (*string*) | UPS 版本由三个字段组成：SKU 编号、固件修订版本、国家代码。国家代码可以是以下值之一：<ul><li>I - 220/230/240 Vac</li><li>D - 115/120 Vac</li><li>A - 100 Vac</li><li>M - 208 Vac</li><li>J - 200 Vac</li></ul> |

:::info
**说明：** 要启用 UPS 监控，串口必须可用。
:::

#### 示例 {#example}

要为 port serial1 启用 UPS 监控：

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

### 运行时校准 {#runtime-calibration}

**命令：** `/system/ups/rtc/<id>`

rtc 命令使 UPS 开始运行时间校准，直到电池容量低于满电容量的 25%。该命令用于校准返回的运行时间值。

:::info
**Note:** 仅当电池容量为 100% 时才会开始测试。
:::

### 监控 {#monitoring}

**命令：** `/system/ups/monitor <id>`

| 属性 | 说明 |
| :-- | :-- |
| **battery-charge** () | UPS 剩余电池容量，以充满状态的百分比表示 |
| **battery-voltage** () | UPS 当前电池电压。该测量值的典型精度为最大值的 ±5%（取决于 UPS 的标称电池电压） |
| **frequency** () | 在线运行时，UPS 内部工作频率与市电同步，变化范围为标称 50 或 60 Hz 的 3 Hz 内。该测量值的典型精度为 63 Hz 满量程值的 ±1% |
| **line-voltage** () | 在线市电电压 |
| **load** () | UPS 输出负载，以额定满载瓦数的百分比表示。该测量值的典型精度为最大值 105% 的 ±3% |
| **low-battery** (*yes \| no*) | 仅在 UPS 报告该状态时显示 |
| **on-battery** (*yes \| no*) | UPS 电池是否正在供电 |
| **on-line** (*yes \| no*) | 是否由外部市电（电力公司）供电 |
| **output-voltage** () | UPS 输出电压 |
| **overloaded-output** (*yes \| no*) | 仅在 UPS 报告该状态时显示 |
| **replace-battery** (*yes \| no*) | 仅在 UPS 报告该状态时显示 |
| **runtime-calibration-running** (*yes \| no*) | 仅在 UPS 报告该状态时显示 |
| **runtime-left** (*time*) | UPS 预计剩余运行时间，单位为分钟。可以在 UPS 运行于在线、旁路或电池模式时查询 UPS。UPS 返回的剩余运行时间基于可用电池容量和输出负载 |
| **smart-boost-mode** (*yes \| no*) | 仅在 UPS 报告该状态时显示 |
| **smart-ssdd-mode** () | 仅在 UPS 报告该状态时显示 |
| **transfer-cause** (*string*) | 最近一次切换到电池供电运行的原因（仅在设备处于电池供电时显示） |

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
