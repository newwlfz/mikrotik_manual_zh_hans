---
sidebar_key: "hardware/leds"
sidebar_position: 4
title: "LED 指示灯"
sidebar_label: "LED 指示灯"
description: "RouterOS 允许在受支持的设备上自定义 LED 行为，用于无线信号强度、接口流量活动和其他状态指示。用户可以为特定功能配置单个 LED，例如无线信号强度、以太网活动或调制解调器信号，并会收到有关硬件限制的警告。"
tags:
  - 'leds'
  - 'system-configuration'
source: https://manual.mikrotik.com/docs/hardware/leds
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

**子菜单：** `/system/leds`

RouterOS 允许按照用户希望的方式配置每个 LED 的活动状态。可以将 LED 配置为显示无线信号强度、在接口流量活动时使 LED 闪烁，以及许多其他选项。

例如，Groove 上的默认 LED 配置

```ros
[admin@MikroTik] /system/leds> print 
Flags: X - disabled 
# TYPE INTERFACE LEDS 
0 wireless-signal-strength led1 
led2 
led3 
led4 
led5 
1 interface-activity ether1 user-led 

```

:::warning
并非所有板卡都具备支持此功能所需的硬件能力。

:::

:::warning
RB Groove 使用五个 LED 显示无线信号强度，并使用一个 LED 监控以太网活动。

:::

## 属性说明 {#property-description}

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes \| no*; 默认：**no**) | 项目是否被禁用 |
| **interface** (*string*；默认值：) | 用于 LED 状态的接口名称。仅在 **type** 为接口相关类型时适用。 |
| **modem-signal-treshold** (*integer [-113..-51]*；默认值：) | 当类型为 **modem-signal** 时适用 |
| **leds** (*list of leds*；默认值：) | 用于状态报告的 LED 名称列表。例如，无线信号强度需要不止一个 LED。 |
| **type** (*align-down \| align-left \| align-right \| align-up \| ap-cap \| fan-fault \| flash-access \| interface-activity \| interface-receive \| interface-speed \| interface-speed-1G \| interface-speed-25G \| interface-speed-100G \| interface-status \| interface-transmit \| modem-signal \| modem-technology \| off \| on \| poe-fault \| poe-out \| wireless-signal-strength \| wireless-status*；默认值：) | 状态类型：align-down - 如果 w60g 设备需要向下对准以获得最佳信号质量，则点亮 LED；align-left - 如果 w60g 设备需要向左对准，则点亮 LED；align-right - 如果 w60g 设备需要向右对准，则点亮 LED；align-up - 如果 w60g 设备需要向上对准，则点亮 LED；ap-cap - 在 CAP 通过 CAPsMAN 初始化时闪烁，连接后常亮；fan-fault - 当设备控制的任一风扇停止工作时点亮 LED；flash-access - 在闪存访问时使 LED 闪烁；interface-activity - 在接口（流量）活动时使 LED 闪烁；interface-receive - 在接口接收流量时使 LED 闪烁；interface-speed - 当接口以 10Gbit 速率工作时点亮 LED；interface-speed-1G - 当接口以 1Gbit 速率工作时点亮 LED；interface-speed-25G - 当接口以 25Gbit 速率工作时点亮 LED；interface-speed-100G - 当接口以 100Gbit 速率工作时点亮 LED；interface-status - 在接口状态变化时点亮 LED；interface-transmit - 在接口发送流量时使 LED 闪烁；modem-signal - 根据 3G 调制解调器信号（USB 或 miniPCIe）使 LED 闪烁；modem-technology - 按照调制解调器技术代际顺序点亮 LED：GSM；3G；LTE；仅当 LTE 处于活动状态时，单个 LED 才会点亮；off - 关闭 LED；on - 点亮 LED；poe-fault - 当 PoE 输出预算接近支持的最大限制时点亮 LED；poe-out - 当接口 PoE 输出开启时点亮 LED；wireless-signal-strength - 点亮用于显示无线信号的 LED（需要不止一个 LED）；wireless-status - 在无线状态变化时点亮 LED。 |

## LED 设置 {#led-settings}

全局设置存储在 LED 设置菜单中。

**子菜单：** `/system/leds/setting`

| 属性 | 说明 |
| :-- | :-- |
| **all-leds-off** (*after-1h \| after-1min \| immediate \| never*；默认值：**never**) | 路由器的所有 LED 是否可以以及何时可以关闭 |

列出的设备支持关闭其 LED（LED 暗色模式）；但是，由于设备设计因素，某些 LED 仍无法关闭。

### **室内设备** {#indoor-devices}

| RouterBoard | LED 说明 |
| :-- | :-- |
| **CRS305-1G-4S+; CRS309-1G-8S+** | 关闭所有 LED，但以太网 LED 和电源 LED 除外 |
| **RB5009UG+S+IN; RB5009UPr+S+** | 关闭所有 LED |
| **L009UiGS-RM; L009UiGS-2HaxD-IN** | 关闭 PWR、USR 和 Ether1 LED |
| **L41G-2axD; L41G-2axD&FG621-EA (hAP ax lite 系列)** | 关闭所有 LED，但以太网 LED 除外 |
| **RB760iGS (hEX S)** | 关闭电源 LED 和 SFP LED |
| **E50UG** | 关闭所有 LED，但 Ethernet1 LED 除外 |
| **RB924i-2nD-BT5&BG77; RB924iR-2nD-BT5&BG77 (KNOT 系列)** | 关闭所有 LED |
| **RB951Ui-2HnD** | 关闭所有 LED，但电源 LED 除外 |
| **RB951Ui-2nD (hAP); RB952Ui-5ac2nD (hAP ac lite); RB952Ui-5ac2nD-TC (hAP ac lite TC)** | 关闭所有 LED，但电源 LED 除外 |
| **RB962UiGS-5HacT2HnT (hAP ac)** | 关闭所有 LED，但 Port5 PoE LED 除外 |
| **RBcAP2n; RBcAP2nD (cAP)** | 关闭所有 LED |
| **RBcAPGi-5acD2nD (cAP ac); RBcAPGi-5acD2nD-XL (cAP XL ac)** | 关闭所有 LED |
| **cAPGi-5HaxD2HaxD (cAP ax)** | 关闭所有 LED，但以太网 LED 除外 |
| **RBD25G/RB25GR-5HPacQD2HPnD (Audience)** | 关闭所有 LED，但以太网 LED 除外 |
| **RBD52G-5HacD2HnD-TC (hAP ac^2)** | 关闭所有 LED |
| **RBD53iG-5HacD2HnD (hAP ac^3)** | 关闭所有 LED |
| **RBD53G-5HacD2HnD-TC (Chateau 系列)** | 关闭所有 LED |
| **RBwsAP5Hac2nD (wsAP ac lite)** | 关闭所有 LED |
| **C52iG-5HaxD2HaxD-TC (hAP ax^2)** | 关闭所有 LED，但以太网 LED 除外 |
| **C53UiG+5HPaxD2HPaxD (hAP ax^3)** | 关闭所有 LED，但以太网 LED 除外 |
| **S53UG+5HaxD2HaxD-TC (Chateau ax 系列)** | 关闭所有 LED，但以太网 LED 除外 |

### **无线系统** {#wireless-systems}

| RouterBoard | LED 说明 |
| :-- | :-- |
| **CME22-2n-BG77 (CME Gateway)** | 关闭所有 LED |
| **CubeG-5ac60ay (Cube 60Pro ac); CubeG-5ac60ay-SA (CubeSA 60Pro ac)** | 关闭所有 LED |
| **CubeG-5ac60ad (Cube 60G ac)** | 关闭所有 LED |
| **RB912R-2nD-LTm (ltAP mini / ltAP mini LTE kit)** | 关闭所有 LED |
| **RB912UAG-6HPnD (BaseBox 6)** | 关闭所有 LED |
| **RBD23UGS-5HPacD2HnD (NetMetal ac^2)** | 关闭所有 LED |
| **L11UG-5HaxD; L11UG-5HaxD-NB (NetBox 5 ax)** | 关闭所有 LED |
| **L22UGS-5HaxD2HaxD-15S (mANTBox ax 15s)** | 关闭所有 LED |
| **L23UGSR-5HaxD2HaxD; L23UGSR-5HaxD2HaxD-NM (NetMetal ax)** | 关闭所有 LED |
| **RBLDF-2nD (LDF 2); RBLDF-5nD (LDF 5); RBLHGR** | 关闭所有 LED |
| **RBLDFG-5acD (LDF 5 ac)** | 关闭所有 LED，但以太网 LED 除外 |
| **RBLHG2nD (LHG 2); RBLHG2nD-XL (LHG XL 2)** | 关闭所有 LED |
| **RBLHG5nD (LHG 5); RBLHG5HPnD (LHG HP5); RBLHG5HPnD-XL (LHG XL HP5)** | 关闭所有 LED |
| **RBLHGG-5acD (LHG 5 ac); RBLHGG-5acD-XL (LHG XL 5 ac); RBLHGG-5HPacD2HPnD (LHG XL 52 ac); RBSXTsqG-5acD (SXTsq 5 ac)** | 关闭所有 LED，但以太网 LED 除外 |
| **RBLHGG-60ad (Wireless Wire Dish)** | 关闭所有 LED |
| **LHGGM&EG18-EA (LHG LTE18 kit); ATLGM&EG18-EA (ATL LTE18 kit)** | 关闭所有 LED |
| **RBLtAP-2HnD (LtAP)** | 关闭所有 LED，但以太网 LED 除外 |
| **RBSXTsq-60ad (SXTsq Lite60); RBCube-60ad (Cube Lite60)** | 关闭所有 LED |
| **RBwAPG-60ad (Wireless Wire)** | 关闭所有 LED |
| **RBwAPGR-5HacD2HnD (wAP ac)** | 关闭所有 LED，但以太网 LED 除外 |

## 示例 {#examples}

### 基本示例 {#basic-example}

用于脚本编写的 LED 控制 CLI 命令：

```ros
#将具有特定类型 "on" 或 "off" 的 led 条目添加到 leds 菜单
/system/leds/add leds=led1 type=off
#用于控制 led
/system/leds/set [find where leds="led1"] type=on
or
/system/leds/set [find where leds="led1"] type=off

```

在 RB951 上启用 User ACT LED 以显示当前 CAP 状态

```ros
/system/leds
add leds=user-led type=ap-cap
```

### Modem 信号强度示例 {#modem-signal-strength-example}

modem-signal 信号强度的整个范围为 [-113..-51]，而 modem-signal-threshold 将最弱信号限制提高到 -91，因此用于 LED 指示的信号范围为 [-91..-51]。该范围会根据为 modem-signal LED 触发器配置的 LED 数量等分。当信号高于 -91 时第一个 LED 点亮，当信号达到 -51 时最后一个 LED 点亮。

```ros
/system/leds
add interface=lte1 leds=led1,led2,led3,led4,led5 modem-signal-treshold=-91 type=modem-signal

```

### Modem 接入技术示例 {#modem-access-technology-example}

这些 LED 触发器示例按照调制解调器技术代际顺序点亮 LED：GSM；3G；LTE。

- 1 个 LED：当 LTE 处于活动状态时，led1 点亮。

```ros
/system/leds/add interface=lte1 leds=led1 type=modem-technology
```

- 2 个 LED：led1 - 3G；led2 - LTE；

```ros
/system/leds
add interface=lte1 leds=led1,led2 type=modem-technology

```

- 3 个 LED：led1 - GSM；led2 - 3G；led3 - LTE

```ros
/system/leds/add interface=lte1 leds=led1,led2,led3 type=modem-technology
```
