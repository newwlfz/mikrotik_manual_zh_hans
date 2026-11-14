---
sidebar_key: "internet-of-things/gpio/index"
sidebar_position: 2
title: "GPIO"
sidebar_label: "GPIO"
description: "GPIO 允许在 MikroTik 路由器上配置数字和模拟输入/输出引脚，用于电压测量、干接点检测和继电器控制等任务。设置通过 CLI 在 /iot/gpio 下管理，带有用于模拟和数字引脚的子菜单，包括电压偏移调整。"
tags:
  - 'gpio'
  - 'iot'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/gpio
captured_at: '2026-11-04T11:31:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

***注意**：为了访问 GPIO 设置，请确保事先安装了 **iot** [软件包](../../getting-started/installation-and-upgrade/packages.md)。*

你可以通过以下[链接](https://en.wikipedia.org/wiki/General-purpose_input/output)找到有关 GPIO 的更多信息。

GPIO 代表通用输入/输出（General-Purpose Input/Output）。它是路由器板上的一个/多个数字信号引脚，允许你发送/接收信号。它在不同场景中很有用，例如：

1. 通过 ADC 输入测量电压。
2. 读取从其他设备接收的 0 和 1 信号——“干接点”。
3. 通过向引脚发送逻辑 0 或 1 信号来控制已连接的继电器。

:::info
[KNOT](https://help.mikrotik.com/docs/spaces/UM/pages/41680915/RB924i-2nD-BT5+BG77)、[KNOT Embedded LTE4](https://mikrotik.com/product/knot_embedded_lte4) 和 [RBM33G](https://help.mikrotik.com/docs/spaces/UM/pages/14222434/RBM33G) 支持 GPIO 功能。

- [KNOT 引脚定义可在此处找到](https://help.mikrotik.com/docs/spaces/UM/pages/41680915/RB924i-2nD-BT5+BG77#RB924i2nDBT5%26BG77-GPIOpinout)。
- [KNOT Embedded LTE4 引脚定义，见此处。](https://help.mikrotik.com/docs/spaces/UM/pages/366477381/KNOT+Embedded+LTE4+EC25-EU+KNe#KNOTEmbeddedLTE4EC25EU%26KNe-GPIOpinout)
- [RBM33G 引脚定义，见此处](https://help.mikrotik.com/docs/spaces/UM/pages/14222434/RBM33G#RBM33G-GPIOpinout)。

:::

### RouterOS 配置 {#routeros-configuration}

**GPIO 设置仅可通过 CLI 使用。**

**子菜单：** `/iot/gpio`

GPIO 设置分为：

- 模拟 (/iot/gpio/analog)
- 数字 (/iot/gpio/digital)

:::warning
在我们的示例中，我们使用 [KNOT](https://mikrotik.com/product/knot) 作为参考设备（具有 2 个模拟输入引脚、2 个数字输出引脚和 1 个数字输入引脚）。其他设备可能具有不同的引脚定义，但适用相同的原理。
:::

#### 模拟引脚 {#analog-pin}

**子菜单：** `/iot/gpio/analog`

***注意**：* 请查看产品页面，确认你的硬件是否支持模拟输入。

在 "analog" 设置中，你可以测量模拟输入/ADC 输入引脚上的电压：

```ros
[admin@device] /iot/gpio/analog> print
 # NAME                                                                                     VALUE       OFFSET
 0 pin2                                                                                       0mV          0mV
 1 pin3                                                                                      32mV          0mV
```

"OFFSET" 可用于手动补偿导线上的电压降。"VALUE" 通过 `value = adc_input + offset` 测量，其中 adc\_input 是引脚上的电压。

"OFFSET" 配置示例如下：

```ros
[admin@device] /iot/gpio/analog> set pin2 offset  

Offset ::= [-]Num[mV]
  Num ::= -2147483648..2147483647    (integer number)

[admin@device] /iot/gpio/analog> set pin2 offset 2   
[admin@device] /iot/gpio/analog> print            
 # NAME                                                                                           VALUE       OFFSET
 0 pin2                                                                                             2mV          2mV
 1 pin3                                                                                             0mV          0mV 
```

#### 数字引脚 {#digital-pin}

**子菜单：** `/iot/gpio/digital`

在 "digital" 部分，你可以使用数字输出/输入引脚发送/接收逻辑 0 或 1 信号（输出引脚为 "开漏"）：

```ros
[admin@device] /iot/gpio/digital> print             
Flags: X - disabled 
 #   NAME                                        DIRECTION OUTPUT INPUT SCRIPT                                   
 0   pin5                                        input     0      0    
 1   pin4                                        output    0     
 2   pin6                                        output    0     
```

引脚的 "DIRECTION" 可以是 "input"（可接收信号的引脚）或 "output"（可发送信号的引脚）。

:::info
[KNOT](https://mikrotik.com/product/knot) 的 pin4 和 pin6 引脚的 "DIRECTION" 无法更改。这两个引脚只能用作 "output" 引脚。
:::

当引脚的方向设置为 "output" 时，你可以配置 "OUTPUT" 值。更改 "OUTPUT" 值会将信号发送到引脚。

```ros
[admin@device] /iot/gpio/digital> set pin4 output=

Output ::= 0 | 1

[admin@device] /iot/gpio/digital> set pin4 output=1        
[admin@device] /iot/gpio/digital> print            
Flags: X - disabled 
 #   NAME                                        DIRECTION OUTPUT INPUT SCRIPT                                      
 0   pin5                                        input     0      0    
 1   pin4                                        output    1     
 2   pin6                                        output    0     
```

"script" 字段允许你配置一个脚本，每当 "INPUT" 或 "OUTPUT" 值发生变化（从 0 到 1 或从 1 到 0）时就会启动该脚本。

```ros
[admin@device] /iot/gpio/digital> set pin4 script=script1
[admin@device] /iot/gpio/digital> set pin5 script="/system .."   
[admin@device] /iot/gpio/digital> print                       
Flags: X - disabled 
 #   NAME                                        DIRECTION OUTPUT INPUT SCRIPT                                      
 0   pin5                                        input     0      0     /system ..                                  
 1   pin4                                        output    1            script1                                     
 2   pin6                                        output    0     
```

### 不同场景 {#different-scenarios}

#### 控制继电器 {#controlling-relays}

GPIO 实现的一种场景是使用数字输出引脚“控制其他继电器”。基本上，就是向连接到该引脚的单元发送 "0" 或 "1" 信号。要自动化此过程，你可以使用[调度器](../../system-information-and-utilities/scheduler.md)，它将在特定时间运行脚本。

例如，你可以添加第一个[脚本](../../developer-guides/scripting/index.md)（如下所示的一行）并将其命名为 "output=0"：

```ros
/iot/gpio/digital set pin4 output=0
```

然后添加第二个脚本（如下所示的一行）并将其命名为 "output=1"：

```ros
/iot/gpio/digital set pin4 output=1
```

创建这两个脚本后，你可以配置一个调度：

```ros
[admin@device] /system/scheduler> add name=run-30s interval=30s on-event="output=0"
```

上面显示的调度配置将每隔 30 秒运行名为 "output=0" 的脚本。

```ros
[admin@device] /system/scheduler> add name=run-45s interval=45s on-event="output=1"
```

上面显示的调度配置将每隔 45 秒运行名为 "output=1" 的脚本。

因此，设备将每隔 30 秒自动向第 4 个引脚（数字输出引脚）发送 output value=0 的信号，并每隔 45 秒发送 output value=1 的信号。

你可以根据需要自行更改调度时间。

#### 监控输入信号 {#monitoring-input-signal}

另一种场景是使用数字输入引脚“监控输入信号”。你需要一个脚本，当方向为 direction="input" 的引脚的 "INPUT" 值发生变化时（即每当 RouterOS 设备从连接到该引脚的另一台设备收到信号 "0 或 1" 时），该脚本将启动电子邮件通知或 MQTT/HTTPS (fetch) 发布。

*电子邮件通知脚本：*

```ros
/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name]" body="$[/iot/gpio/digital/get pin5 input]"
```

创建脚本后，将其应用/设置到 "input" 引脚：

```ros
[admin@device] /iot/gpio/digital> set pin5 script=script1 
[admin@device] /iot/gpio/digital> print                  
Flags: X - disabled 
 #   NAME                     DIRECTION OUTPUT INPUT SCRIPT                    
 0   pin5                     input     0      0     script1                   
 1   pin4                     output    0            script1                   
 2   pin6                     output    0     
```

在上面的示例中，电子邮件通知脚本名为 "script1"。

因此，每当输入值发生变化（从 0 到 1 或从 1 到 0）时，脚本会自动启动电子邮件通知，并在邮件正文中显示输入值。

不要忘记更改脚本行，并相应地配置电子邮件设置（[/tool/e-mail](../../system-information-and-utilities/e-mail.md)）：

```ros
/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name]"  body="$[/iot/gpio/digital/get pin5 input]"
```

配置你实际使用的电子邮件地址。你也可以根据需要更改邮件主题和正文。

*MQTT 发布脚本：*

```ros
:local broker "name"
:local topic "topic"
:local message "\{\"inputVALUE\":$[/iot/gpio/digital/get pin5 input]}"  
/iot/mqtt/publish broker=$broker topic=$topic message=$message
```

此脚本的工作方式与“*电子邮件通知*”脚本相同，只是当输入值变化时，脚本会启动 MQTT 发布（而不是电子邮件通知），并以 JSON 格式发送在引脚上接收到的输入值。

不要忘记事先设置 MQTT broker (*`/iot/mqtt/brokers/add` ..*) 并修改几行脚本：

```ros
:local broker "name"
```

broker 的 "name" 应相应地更改（你可以使用 CLI 命令 /*iot mqtt brokers print* 查看所有已创建的 broker 及其名称）。

```ros
:local topic "topic"
```

topic 也应更改。topic 本身是在服务器端配置的，因此请确保使用正确的 topic。

不要忘记将脚本应用/设置到 pin5（/iot/gpio/digital/set pin5 script=script\_name），如上面的 "电子邮件通知" 示例所示。

如果使用机械开关向 GPIO 引脚发送信号，建议改用以下脚本（以防在引脚上接收到信号时脚本被多次启动）：

```ros
:global gpioscriptrunning;  
if (!$gpioscriptrunning) do=\{:set $gpioscriptrunning true;  
:log info "script started - GPIO changed";  
:do \{if ([/iot/gpio/digital/get pin5 input] = "0") do=\{/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name]" body="pin5 received logical 0"} else \{/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name]"  body="pin5 received logical 1"};  
:delay 1s;  
:set $gpioscriptrunning false} on-error=\{:set $gpioscriptrunning false;  
:log info "e-mail error, resetting script state..."}}
```

如果 GPIO 引脚状态在毫秒/微秒内变化多次——上面的脚本将确保电子邮件通知不会发送多次。

#### 监控电压 {#monitoring-voltage}

最后但同样重要的是使用模拟引脚“监控电压”。你需要一个脚本，按计划读取/监控电压，然后通过电子邮件、MQTT 或 HTTPS (fetch) 发送数据。

创建如下所示的脚本。在此示例中，我们将使用 MQTT 发布（但你可以创建类似的脚本，使用 "/tool/e-mail .." 来发送电子邮件通知）：

```ros
:local broker "name"
:local topic "topic"
:local message "\{\"voltage(mV)\":$[/iot/gpio/analog/get pin3 value]}"  
/iot/mqtt/publish broker=$broker topic=$topic message=$message
```

该脚本将读取/测量 pin3 上的电压，并将数据发布到 MQTT broker。

不要忘记事先设置 MQTT broker (*`/iot/mqtt/brokers/add` ..*) 并修改几行脚本：

```ros
:local broker "name"
```

broker 的 "name" 应相应地更改（你可以使用 CLI 命令 `/iot/mqtt/brokers/print` 查看所有已创建的 broker 及其名称）。

```ros
:local topic "topic"
```

topic 也应更改。topic 本身是在服务器端配置的，因此请确保使用正确的 topic。

保存脚本并将其命名为例如 "voltagepublish"。要自动化此过程，你可以使用[调度器](../../system-information-and-utilities/scheduler.md)。

```ros
[admin@device] /system/scheduler> add name=run-45s interval=45s on-event="voltagepublish"
```

上面显示的调度配置将每隔 45 秒运行该脚本。
