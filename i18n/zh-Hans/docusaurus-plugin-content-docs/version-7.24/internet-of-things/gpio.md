---
title: "GPIO"
description: "GPIO 允许在 MikroTik 路由器上配置数字和模拟输入/输出引脚，用于电压测量、干接点检测和继电器控制等任务。设置通过 CLI 在 /iot/gpio 下管理，其中包含用于模拟和数字引脚的子菜单，并支持电压偏移调整。"
tags:
  - 'gpio'
  - 'iot'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/gpio
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

***note**: 要访问 GPIO 设置，请确保事先安装 **iot** [软件包](/docs/getting-started/installation-and-upgrade/packages)。*

可通过以下[链接](https://en.wikipedia.org/wiki/General-purpose_input/output)了解有关 GPIO 的更多信息。

GPIO 代表 General-Purpose Input/Output。它是 routerboard 上的数字信号引脚，可用于发送或接收信号。它可应用于不同场景，例如：

1. 通过 ADC 输入测量电压。
2. 读取从其他设备接收到的 0 和 1 信号——“干接点”。
3. 通过向引脚发送逻辑 0 或 1 信号来控制连接的继电器。

:::info
[KNOT](https://help.mikrotik.com/docs/spaces/UM/pages/41680915/RB924i-2nD-BT5+BG77)、[KNOT Embedded LTE4](https://mikrotik.com/product/knot_embedded_lte4) 和 [RBM33G](https://help.mikrotik.com/docs/spaces/UM/pages/14222434/RBM33G) 支持 GPIO 功能。

- [可在此处查看 KNOT 引脚定义](https://help.mikrotik.com/docs/spaces/UM/pages/41680915/RB924i-2nD-BT5+BG77#RB924i2nDBT5%26BG77-GPIOpinout)。
- [可在此处查看 KNOT embedded LTE 4 引脚定义](https://help.mikrotik.com/docs/spaces/UM/pages/366477381/KNOT+Embedded+LTE4+EC25-EU+KNe#KNOTEmbeddedLTE4EC25EU%26KNe-GPIOpinout)。
- [可在此处查看 RBM33G 引脚定义](https://help.mikrotik.com/docs/spaces/UM/pages/14222434/RBM33G#RBM33G-GPIOpinout)。
:::

### RouterOS 配置 {#routeros-configuration}

**GPIO 设置仅可通过 CLI 使用。**

**子菜单：** `/iot/gpio`

GPIO 设置分为：

- 模拟（/iot/gpio/analog）
- 数字（/iot/gpio/digital）

:::warning
在示例中，使用 [KNOT](https://mikrotik.com/product/knot) 作为参考设备（具有 x2 模拟输入引脚、x2 数字输出引脚和 x1 数字输入引脚）。其他设备的引脚排列可能不同，但原理相同。
:::

#### 模拟引脚 {#analog-pin}

**子菜单：** `/iot/gpio/analog`

***note**：* 请在产品页面检查硬件是否支持模拟输入。

在“analog”设置中，可以测量模拟输入/ADC 输入引脚上的电压：

```ros
[admin@device] /iot/gpio/analog> print
 # NAME                                                                                     VALUE       OFFSET
 0 pin2                                                                                       0mV          0mV
 1 pin3                                                                                      32mV          0mV
```

“OFFSET”可用于手动补偿线缆上的电压降。“VALUE”按 `value = adc_input + offset` 测量，其中 adc\_input 是引脚上的电压。

下面显示 "OFFSET" 配置示例：

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

在“digital”部分，可以使用数字输出/输入引脚发送/接收逻辑 0 或 1 信号（输出引脚为“开漏”）：

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
[KNOT](https://mikrotik.com/product/knot) 的 pin4 和 pin6 的引脚 "DIRECTION" 无法更改。这两个引脚只能用作 "output" 引脚。
:::

当引脚方向设置为 "output" 时，可以配置 "OUTPUT" 值。更改 "OUTPUT" 值会向引脚发送信号。

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

"script" 字段用于配置脚本，当 "INPUT" 或 "OUTPUT" 值发生变化（从 0 变为 1 或从 1 变为 0）时将启动该脚本。

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

GPIO 实现的场景之一是使用数字输出引脚“控制其他继电器”。基本上，向连接到引脚的设备发送“0”或“1”信号。要自动化该过程，可以使用 [scheduler](/docs/system-information-and-utilities/scheduler)，它将在特定时间运行脚本。

例如，可以添加第一个 [script](/docs/developer-guides/scripting)（如下所示的单行内容），并将其命名为“output=0”：

```ros
/iot/gpio/digital set pin4 output=0
```

然后添加第二个脚本（如下所示的单行内容），并将其命名为“output=1”：

```ros
/iot/gpio/digital set pin4 output=1
```

拥有这两个脚本后，可以配置计划任务：

```ros
[admin@device] /system/scheduler> add name=run-30s interval=30s on-event="output=0"
```

上面显示的计划任务配置将每 30 秒运行名为“output=0”的脚本。

```ros
[admin@device] /system/scheduler> add name=run-45s interval=45s on-event="output=1"
```

上面显示的计划任务配置将每 45 秒运行名为“output=1”的脚本。

因此，设备将每 30 秒自动向第 4 个引脚（数字输出引脚）发送 output value=0 的信号，并每 45 秒发送 output value=1 的信号。

你可以根据需要更改计划时间（取决于具体要求）。

#### 监控输入信号 {#monitoring-input-signal}

另一种场景是使用数字输入引脚“监控输入信号”。你需要一个脚本，当 direction="input" 的引脚的“INPUT”值发生变化时（即 RouterOS 设备从连接到该引脚的另一台设备收到信号“0 或 1”时），发起电子邮件通知或 MQTT/HTTPS（fetch）发布。

*电子邮件通知脚本：*

```ros
/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name]" body="$[/iot/gpio/digital/get pin5 input]"
```

创建脚本后，将其应用/设置到“input”引脚：

```ros
[admin@device] /iot/gpio/digital> set pin5 script=script1 
[admin@device] /iot/gpio/digital> print                  
Flags: X - disabled 
 #   NAME                     DIRECTION OUTPUT INPUT SCRIPT                    
 0   pin5                     input     0      0     script1                   
 1   pin4                     output    0            script1                   
 2   pin6                     output    0     
```

在上面的示例中，电子邮件通知脚本名为“script1”。

因此，每当输入值发生变化（从 0 变为 1 或从 1 变为 0）时，脚本都会自动发起电子邮件通知，并在电子邮件正文中显示输入值。

不要忘记更改脚本行并配置电子邮件设置（[/tool/e-mail](/docs/system-information-and-utilities/e-mail)）：

```ros
/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name]"  body="$[/iot/gpio/digital/get pin5 input]"
```

配置你实际使用的电子邮件地址。你也可以根据需要更改邮件主题和正文。

*MQTT publish script：*

```ros
:local broker "name"
:local topic "topic"
:local message "\{\"inputVALUE\":$[/iot/gpio/digital/get pin5 input]}"  
/iot/mqtt/publish broker=$broker topic=$topic message=$message
```

该脚本的工作方式与“*e-mail notification*”脚本相同，只是当输入值发生变化时，脚本会启动 MQTT publish（而不是电子邮件通知），并以 JSON 格式发送引脚上接收到的输入值。

不要忘记预先设置 MQTT broker（*`/iot/mqtt/brokers/add` ..*）并修改几行脚本：

```ros
:local broker "name"
```

应相应更改 broker 的“name”（可以使用 CLI 命令 /*iot mqtt brokers print* 查看所有已创建的 broker 及其名称）。

```ros
:local topic "topic"
```

也应更改 topic。topic 本身在服务器端配置，因此请确保使用正确的 topic。

不要忘记将脚本应用/设置到 pin5（/iot/gpio/digital/set pin5 script=script\_name），如上方“email notification”示例所示。

如果使用机械开关向 GPIO 引脚发送信号，建议改用以下脚本（以防引脚收到信号时脚本被多次启动）：

```ros
:global gpioscriptrunning;  
if (!$gpioscriptrunning) do=\{:set $gpioscriptrunning true;  
:log info "script started - GPIO changed";  
:do \{if ([/iot/gpio/digital/get pin5 input] = "0") do=\{/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name]" body="pin5 received logical 0"} else \{/tool/e-mail/send to="config@mydomain.com" subject="$[/system/identity/get name]"  body="pin5 received logical 1"};  
:delay 1s;  
:set $gpioscriptrunning false} on-error=\{:set $gpioscriptrunning false;  
:log info "e-mail error, resetting script state..."}}
```

如果 GPIO 引脚状态在毫秒/微秒内变化多次，上述脚本可确保电子邮件通知不会发送多次。

#### 监控电压 {#monitoring-voltage}

最后是使用模拟引脚“监控电压”。你需要一个脚本，按计划读取/监控电压，然后通过电子邮件、MQTT 或 HTTPS（fetch）发送数据。

创建如下脚本。在本例中，我们将使用 MQTT 发布（但你也可以创建类似的脚本，使用 `/tool/e-mail ..` 来发送电子邮件通知）：

```ros
:local broker "name"
:local topic "topic"
:local message "\{\"voltage(mV)\":$[/iot/gpio/analog/get pin3 value]}"  
/iot/mqtt/publish broker=$broker topic=$topic message=$message
```

该脚本将读取/测量 pin3 上的电压，并将数据发布到 MQTT broker。

不要忘记先设置 MQTT broker（*`/iot/mqtt/brokers/add` ..*），并提前修改脚本中的几行内容：

```ros
:local broker "name"
```

broker 的“name”应相应更改（可以使用 CLI 命令 `/iot/mqtt/brokers/print` 查看所有已创建的 broker 及其名称）。

```ros
:local topic "topic"
```

主题也应更改。主题本身在服务器端配置，因此请确保使用正确的主题。

保存脚本并将其命名为例如“voltagepublish”。要自动化该过程，可以使用 [scheduler](/docs/system-information-and-utilities/scheduler)。

```ros
[admin@device] /system/scheduler> add name=run-45s interval=45s on-event="voltagepublish"
```

上面显示的计划配置将每 45 秒运行一次脚本。
