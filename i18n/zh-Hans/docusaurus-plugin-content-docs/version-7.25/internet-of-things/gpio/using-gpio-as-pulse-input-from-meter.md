---
title: "将 GPIO 用作来自计量设备的脉冲输入"
description: "使用 MikroTik 设备的 GPIO 作为脉冲输入，读取水表、电表或其他仪表，并通过 RouterOS 脚本统计脉冲数。"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/gpio/using-gpio-as-pulse-input-from-meter
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "internet-of-things/gpio"
pagination_next: "internet-of-things/lora"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

一些水表、电表或其他仪表具有脉冲输出。仪表规格说明中会描述多少个脉冲代表一个整数计量单位。例如，编写本手册时使用的电表生成 1000 个脉冲代表 1kWh，因此每个脉冲为 1Wh。可以使用 KNOT 的数字 GPIO 输入（pin5）读取这些脉冲，并统计电表后方的能耗。为此，需要创建一个简单的 MOSFET 电路，并按下图连接所有部件：

![](/img/bede935d660039e3.png)

下一步是编写一个 RouterOS 脚本，在每次收到脉冲时执行：

```bash
/iot gpio digital
set pin5 script=":global scriptRunning; :global pulse;\
:if (\$scriptRunning!=true) do={\
:set \$scriptRunning true;\
:set \$pulse (\$pulse+1);\
:log info message=(\"GPIO pulse No. \".\$pulse);\
:delay 1s;\
:set \$scriptRunning false;\
}"
```

配置 GPIO 后，上述脚本将在每次脉冲时创建一条日志条目：

```bash
15:32:22 script,info GPIO pulse No. 1 
15:38:01 script,info GPIO pulse No. 2 
15:43:38 script,info GPIO pulse No. 3 
15:49:15 script,info GPIO pulse No. 4 
15:54:51 script,info GPIO pulse No. 5 
16:00:27 script,info GPIO pulse No. 6 
16:06:02 script,info GPIO pulse No. 7 
16:11:37 script,info GPIO pulse No. 8 
16:17:12 script,info GPIO pulse No. 9 
16:22:48 script,info GPIO pulse No. 10 
```
