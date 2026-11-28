---
title: "LED 指示灯"
description: "RouterOS 允许在受支持设备上自定义 LED 行为，用于指示无线强度、接口流量活动和其他状态。用户可以将单个 LED 配置为特定功能，例如无线信号强度、以太网活动或调制解调器信号，并需注意硬件限制。"
tags:
  - 'leds'
  - 'system-configuration'
source: https://manual.mikrotik.com/docs/7.24/hardware/leds
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

**子菜单：** `/system/leds`

RouterOS 允许用户按所需方式配置每个 LED 的活动。可以配置 LED 显示无线强度、在接口有流量活动时闪烁，以及许多其他选项。

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
并非所有单板都具备支持此功能所需的硬件能力。
:::

:::warning
RB Groove 使用五个 LED 显示无线强度，使用一个 LED 监控 Ethernet 活动。
:::

## 属性说明 {#property-description}

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 某项是否禁用 |
| **interface** (*string*；默认：) | 用于 LED 状态的接口名称。仅当 **type** 为接口特定类型时适用。 |
| **modem-signal-treshold** (*integer [-113..-51]*；默认：) | 当类型为 **modem-signal** 时适用 |
| **leds** (*list of leds*；默认：) | 用于状态报告的 LED 名称列表。例如，无线信号强度需要多个 LED。 |
| **type** (*align-down \| align-left \| align-right \| align-up \| ap-cap \| fan-fault \| flash-access \| interface-activity \| interface-receive \| interface-speed \| interface-speed-1G \| interface-speed-25G \| interface-speed-100G \| interface-status \| interface-transmit \| modem-signal \| modem-technology \| off \| on \| poe-fault \| poe-out \| wireless-signal-strength \| wireless-status*；默认：) | 状态类型：<ul><li>align-down - 当 w60g 设备需要向下对齐以获得最佳信号质量时点亮 LED</li><li>align-left - 当 w60g 设备需要向左对齐时点亮 LED</li><li>align-right - 当 w60g 设备需要向右对齐时点亮 LED</li><li>align-up - 当 w60g 设备需要向上对齐时点亮 LED</li><li>ap-cap - 使用 CAPsMAN 初始化 CAP 时闪烁，连接后常亮</li><li>fan-fault - 当设备控制的任一风扇停止工作时点亮 LED</li><li>flash-access - 访问 flash 时闪烁 LED</li><li>interface-activity - 接口有流量活动时闪烁 LED</li><li>interface-receive - 接口收到流量时闪烁 LED</li><li>interface-speed - 接口以 10Gbit 速率工作时点亮 LED</li><li>interface-speed-1G - 接口以 1Gbit 速率工作时点亮 LED</li><li>interface-speed-25G - 接口以 25Gbit 速率工作时点亮 LED</li><li>interface-speed-100G - 接口以 100Gbit 速率工作时点亮 LED</li><li>interface-status - 接口状态变化时点亮 LED</li><li>interface-transmit - 接口发送流量时闪烁 LED</li><li>modem-signal - 3G modem 有信号时闪烁 LED（USB 或 miniPCIe）</li><li>modem-technology - 按 modem 技术代际依次点亮 LED：GSM；3G；LTE；单个 LED 仅在 LTE 激活时点亮。</li><li>off - 关闭 LED</li><li>on - 打开 LED</li><li>poe-fault - 当 PoE out 预算接近支持的最大限制时点亮 LED</li><li>poe-out - 接口 PoE out 打开时点亮 LED</li><li>wireless-signal-strength - 点亮 LED 显示无线信号（需要多个 LED）</li><li>wireless-status - 无线状态变化时点亮 LED。</li></ul> |

## LED 设置 {#led-settings}

全局设置存储在 LED Settings 菜单中。

**子菜单：** `/system/leds/setting`

| 属性 | 说明 |
| :-- | :-- |
| **all-leds-off** (*after-1h \| after-1min \| immediate \| never*；默认：**never**) | 是否以及何时关闭路由器的所有 LED |

列出的设备支持关闭其 LED（LED 暗色模式）；但是，由于设备设计因素，某些 LED 仍无法关闭。

### **室内设备** {#indoor-devices}

| RouterBoard | LED 说明 |
| :-- | :-- |
| **CRS305-1G-4S+; CRS309-1G-8S+** | 关闭除 Ethernet LED 和 Power LED 之外的所有 LED |
| **RB5009UG+S+IN; RB5009UPr+S+** | 关闭所有 LED |
| **L009UiGS-RM; L009UiGS-2HaxD-IN** | 关闭 PWR、USR 和 Ether1 LED |
| **L41G-2axD; L41G-2axD&FG621-EA (hAP ax lite series)** | 关闭除 Ethernet LED 之外的所有 LED |
| **RB760iGS (hEX S)** | 关闭 Power LED 和 SFP LED |
| **E50UG** | 关闭除 Ethernet1 LED 之外的所有 LED |
| **RB924i-2nD-BT5&BG77; RB924iR-2nD-BT5&BG77 (KNOT series)** | 关闭所有 LED |
| **RB951Ui-2HnD** | 关闭除 Power LED 之外的所有 LED |
| **RB951Ui-2nD (hAP); RB952Ui-5ac2nD (hAP ac lite); RB952Ui-5ac2nD-TC (hAP ac lite TC)** | 关闭除 Power LED 之外的所有 LED |
| **RB962UiGS-5HacT2HnT (hAP ac)** | 关闭除 Port5 PoE LED 之外的所有 LED |
| **RBcAP2n; RBcAP2nD (cAP)** | 关闭所有 LED |
| **RBcAPGi-5acD2nD (cAP ac); RBcAPGi-5acD2nD-XL (cAP XL ac)** | 关闭所有 LED |
| **cAPGi-5HaxD2HaxD (cAP ax)** | 关闭除 Ethernet LED 之外的所有 LED |
| **RBD25G/RB25GR-5HPacQD2HPnD (Audience)** | 关闭除 Ethernet LED 之外的所有 LED |
| **RBD52G-5HacD2HnD-TC (hAP ac^2)** | 关闭所有 LED |
| **RBD53iG-5HacD2HnD (hAP ac^3)** | 关闭所有 LED |
| **RBD53G-5HacD2HnD-TC (Chateau series)** | 关闭所有 LED |
| **RBwsAP5Hac2nD (wsAP ac lite)** | 关闭所有 LED |
| **C52iG-5HaxD2HaxD-TC (hAP ax^2)** | 关闭除 Ethernet LED 之外的所有 LED |
| **C53UiG+5HPaxD2HPaxD (hAP ax^3)** | 关闭除 Ethernet LED 之外的所有 LED |
| **S53UG+5HaxD2HaxD-TC (Chateau ax series)** | 关闭除 Ethernet LED 之外的所有 LED |

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
| **RBLDFG-5acD (LDF 5 ac)** | 关闭除 Ethernet LED 之外的所有 LED |
| **RBLHG2nD (LHG 2); RBLHG2nD-XL (LHG XL 2)** | 关闭所有 LED |
| **RBLHG5nD (LHG 5); RBLHG5HPnD (LHG HP5); RBLHG5HPnD-XL (LHG XL HP5)** | 关闭所有 LED |
| **RBLHGG-5acD (LHG 5 ac); RBLHGG-5acD-XL (LHG XL 5 ac); RBLHGG-5HPacD2HPnD (LHG XL 52 ac); RBSXTsqG-5acD (SXTsq 5 ac)** | 关闭除 Ethernet LED 之外的所有 LED |
| **RBLHGG-60ad (Wireless Wire Dish)** | 关闭所有 LED |
| **LHGGM&EG18-EA (LHG LTE18 kit); ATLGM&EG18-EA (ATL LTE18 kit)** | 关闭所有 LED |
| **RBLtAP-2HnD (LtAP)** | 关闭除 Ethernet LED 之外的所有 LED |
| **RBSXTsq-60ad (SXTsq Lite60); RBCube-60ad (Cube Lite60)** | 关闭所有 LED |
| **RBwAPG-60ad (Wireless Wire)** | 关闭所有 LED |
| **RBwAPGR-5HacD2HnD (wAP ac)** | 关闭除 Ethernet LED 之外的所有 LED |

## 示例 {#examples}

### 基本示例 {#basic-example}

通过 CLI 命令控制 LED，用于脚本编写：

```ros
#add led entry with specific type "on" or "off" to leds menu
/system/leds/add leds=led1 type=off
#to control led
/system/leds/set [find where leds="led1"] type=on
or
/system/leds/set [find where leds="led1"] type=off

```

在 RB951 上启用 User ACT LED，以显示当前 CAP 状态

```ros
/system/leds
add leds=user-led type=ap-cap
```

### 调制解调器信号强度示例 {#modem-signal-strength-example}

调制解调器信号强度的完整范围为 [-113..-51]，modem-signal-threshold 将最弱信号限制提高到 -91，因此用于 LED 指示的信号范围为 [-91..-51]。该范围会根据为 modem-signal LED 触发器配置的 LED 数量划分为相等的部分。当信号高于 -91 时，第一个 LED 点亮；当信号达到 -51 时，最后一个 LED 点亮。

```ros
/system/leds
add interface=lte1 leds=led1,led2,led3,led4,led5 modem-signal-treshold=-91 type=modem-signal

```

### 调制解调器接入技术示例 {#modem-access-technology-example}

这些 LED 触发器示例按调制解调器技术代际顺序点亮 LED：GSM；3G；LTE。

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
