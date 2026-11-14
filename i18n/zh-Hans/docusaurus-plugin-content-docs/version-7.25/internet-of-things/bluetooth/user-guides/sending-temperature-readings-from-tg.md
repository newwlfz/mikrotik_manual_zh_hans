---
sidebar_key: "internet-of-things/bluetooth/user-guides/sending-temperature-readings-from-tg"
sidebar_position: 7
title: "发送 TG-BT5-OUT 标签的温度读数到 ThingsBoard"
sidebar_label: "发送 TG-BT5-OUT 标签的温度读数到 ThingsBoard"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/user-guides/sending-temperature-readings-from-tg
captured_at: '2026-11-04T11:18:56+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

我们的 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out) 蓝牙标签型号内置了温度传感器。这意味着它可以用于测量周围温度。

温度值会被“写入”标签将要通过蓝牙广播信道广播的广播负载中。根据你配置标签的方式，标签可以定期广播负载，和/或在检测到触发时广播。你可以在[链接的章节](../mikrotik-beacon-manager/index.md)中找到有关标签配置选项的更多信息。

你可以使用我们的 [KNOT](https://mikrotik.com/product/knot) 型号在 **IoT>Bluetooth>Advertising reports** 选项卡下查看/显示这些负载：

![](/img/f27669ef09b2c2b0.webp)

负载将显示在“Advertisement (hex)”字段中，并且将采用**十六进制**格式。

当标签配置为 MikroTik 格式时，负载的第 14 和第 15 个八位组表示温度（以摄氏度为单位的环境温度，采用**有符号 16 位整数 [二进制补码] 8.8 定点格式**），该温度是在广播时刻“感测”到的。

下面展示了 MikroTik 格式的负载示例：

| 15ff4f09010032a500000000ffff `5019` bd5954000061 |
| --- |

请注意，负载中的所有多字节值都采用小端序。因此，如果第 #14 和第 #15 个八位组表示的温度为“**50 19**” → 你需要交换八位组的位置，变为 0x**1950**。

正温度：

我们捕获到的温度为 0x**1950**（十六进制）→ **6480**（十进制）。要得到实际温度值，请将结果除以 256 → 6480/256=**25.31 C**。

负温度：

我们捕获到的温度为 0x**FE80**（十六进制）。请记住使用的是**二进制补码格式** → **-384**（有符号二进制补码的十进制值）。要得到实际温度值，请将结果除以 256 → -384/256=**-1.5 C**。

借助这些知识，我们可以利用 RouterOS 脚本将接收到的负载组织成一条消息，并将其发送到 MQTT/HTTP 服务器。建议由服务器负责将数据从**十六进制**格式转换为**十进制**格式。**但是！** 如果你愿意给 RouterOS 设备增加负载，你可以使用 RouterOS 脚本执行**十六进制**值到**十进制**格式的转换（这会增加设备负载并可能影响 RouterOS 性能 → 我们建议在服务器上转换值，而不是在 RouterOS 上）。在本指南中，我们将通过向 [ThingsBoard](https://thingsboard.io/) 发送 MQTT 消息来实现结果。

### ThingsBoard 服务器与 MQTT 配置 {#thingsboard-server-and-mqtt-configuration}

你需要有一个正在运行的 ThingsBoard 服务器。你可以通过访问[链接](https://thingsboard.io/docs/installation/)找到有关如何设置服务器的有用信息。你可以将服务器本地安装到一台机器上，或使用他们的云解决方案。

服务器准备好后，你需要对其进行配置，使其能够接收 MQTT 消息。请按照 [ThingsBoard 配置](../../mqtt/mqtt-and-thingsboard-configuration.md)链接来设置你的“设备”。

### RouterOS 配置 {#routeros-configuration}

请查看[这里的链接](../../mqtt/mqtt-and-thingsboard-configuration.md)，了解如何根据 ThingsBoard 服务器使用的设备凭据设置你的 MQTT broker。

设置好 broker 后，确认蓝牙标签正在广播信息，如上图在 **IoT>Bluetooth>Advertising reports** 选项卡下所示。

#### 脚本 {#script}

将下面的脚本粘贴进去（在 **System>Scripts>Add** 下）：

```ros
## 所需软件包：iot

################################ Configuration ################################
## 用于发布的现有 MQTT broker 的名称
 :local broker "tb"

## 消息应发布到的 MQTT 主题
 :local topic "v1/devices/me/telemetry"

 # Interface whose MAC should be used as 'Locator ID'
:local locatorIface "ether1"

## 用于过滤蓝牙广播地址的 POSIX 正则表达式。例如 "^BC:33:AC"
## 将只包含以这 3 个八位组开头的地址。
## 要禁用此过滤器，请将其设置为 ""
:local addressRegex "2C:C8:1B:4B:BB:0A"

## 用于根据蓝牙广播数据过滤蓝牙广播的 POSIX 正则表达式。与
## 使用 'addressRegex' 时的用法相同。
:local advertisingDataRegex ""

## 信号强度过滤器。例如，-40 将只包括蓝牙广播
## 其信号强度强于 -40dBm。
## 要禁用此过滤器，请将其设置为 ""
:local rssiThreshold ""

####The lines below are used for the data conversion from hex to dec###

    :global invertU16 do={
        :local inverted 0
        :for idx from=0 to=15 step=1 do={
            :local mask (1 &lt;&lt; $idx)
            :if ($1 & $mask = 0) do={
                :set $inverted ($inverted | $mask)
            }
        }
        return $inverted
    }

    :global le16ToHost do={
        :local lsb [:pick $1 0 2]
        :local msb [:pick $1 2 4]

        :return [:tonum "0x$msb$lsb"]
    }
    :local from88 do={
        :global invertU16
        :global le16ToHost
        :local num [$le16ToHost $1]

        # Handle negative numbers
        :if ($num & 0x8000) do={
            :set num (-1 * ([$invertU16 $num] + 1))
        }

        # Convert from 8.8. Scale by 1000 since floating point is not supported
        :return (($num * 125) / 32)
    }

################################## Bluetooth ##################################
:put ("[*] Gathering Bluetooth info...")
:global btOldestAdvertisementTimestamp
:if ([:typeof $btOldestAdvertisementTimestamp] = "nothing") do={
    # First time this script has been run since booting, need to initialize
    # persistent variables
    :set $btOldestAdvertisementTimestamp 0
}
:local btProcessingStart [/system clock get time]
:local advertisements [/iot bluetooth scanners advertisements print detail \
    as-value where \
        epoch > $btOldestAdvertisementTimestamp and \
        address ~ $addressRegex and \
        data ~ $advertisingDataRegex and \
        rssi > $rssiThreshold
]
:local advJson ""
:local advCount 0
:local advSeparator ""
:local lastAdvTimestamp 0
## 从 MAC/蓝牙地址中移除分号
:local minimizeMac do={
    :local minimized
    :local lastIdx ([:len $address] - 1)
    :for idx from=0 to=$lastIdx step=1 do={
        :local char [:pick $address $idx]
        :if ($char != ":") do={
            :set $minimized "$minimized$char"
        }
    }
    :return $minimized
}

:foreach adv in=$advertisements do={
    :local address ($adv->"address")
    :local ts ($adv->"epoch")
    :local rssi ($adv->"rssi")
    :local ad ($adv->"data")
    :local tempf [:pick ($adv->"data") 28 32]

#下面一行将以十六进制格式设置温度，例如 "0x1950"
    :local temp ([:pick $tempf 2 4].[:pick $tempf 0 2])

#下面一行将以十进制格式设置温度，例如 "25313"。它用 "#" 注释掉了，因此如果你希望使用它而不是十六进制格式值，请注释上面一行，并取消注释下面一行 > 从下面一行移除 "#"，并向上面一行添加 "#"。

##    :local temp [$from88 [:pick $ad 28 32]]

    :local obj "{\
        \
           \"ts\":$ts,\
           \"values\":{\
            \"id\":\"$[$minimizeMac address=$address]\",\
            \"rssi\":\"$rssi\",\
            \"temp\":\"$temp\",\
            \"ad\":\"$ad\"\
            }\
        }"
    :set $advCount ($advCount + 1)
    :set $lastAdvTimestamp $ts
    # Ensure that the last object is not terminated by a comma
    :set $advJson "$advJson$advSeparator$obj"
    :if ($advSeparator = "") do={
        :set $advSeparator ","}
}

:if ($advCount > 0) do={

    :set $btOldestAdvertisementTimestamp $lastAdvTimestamp

}

:put ("[*] Found $advCount new advertisements \
    (processing time: $[([/system clock get time] - $btProcessingStart)])")

#################################### MQTT #####################################
:local message \
    "[$advJson]"
:log info "$message";
:put ("[*] Total message size: $[:len $message] bytes")
:put ("[*] Sending message to MQTT broker...")
/iot mqtt publish broker=$broker topic=$topic message=$message
:put ("[*] Done")
```

**更改你为 MQTT broker 选择的 broker 名称**，位于引号内（在我们的示例中，我们将其称为 **tb**）：

```
 :local broker "tb"
```

ThingsBoard 使用的默认主题是（你无需更改它）：

```
 :local topic "v1/devices/me/telemetry"
```

**更改你希望监控的标签的 MAC 地址**（在我们的示例中，MAC 地址为 **2C:C8:1B:4B:BB:0A**）：

```
:local addressRegex "2C:C8:1B:4B:BB:0A"
```

下面的行将获取负载的第 14 和第 15 个八位组，并将值从“ABCD”“重新组织”为“CDAB”（根据我们在**简介**部分的示例，从“**5019**”变为“**1950**”）→ 基本上就是用**十六进制**格式的温度来组织消息：

```
    :local tempf [:pick ($adv->"data") 28 32]
    :local temp ([:pick $tempf 2 4].[:pick $tempf 0 2])
```

你的第二个选择是使用 RouterOS 将温度从**十六进制**格式转换为**十进制**格式（如果你想保留十六进制格式——忽略此步骤）。这可以通过对上一行进行“注释”（添加 `#`）（或将其完全删除），并对下一行进行“取消注释”（移除 `#`）来实现，如下所示：

```
#  :local temp ([:pick $tempf 2 4].[:pick $tempf 0 2])
    :local temp [$from88 [:pick $ad 28 32]]
```

由于不支持浮点数 → 小数点后的每次计算都会被“向上舍入”为整数。这就是脚本会计算**按 1000 缩放**（乘以 **1000**）的温度的原因，结果温度看起来会像“**25546**”（这意味着 25.546 C）。你可以添加额外的脚本设置小数点（但请记住，额外的操作会增加设备负载），你也可以在服务器本身上执行此操作。

我们要发布的 MQTT 消息在以下部分中组织（你无需更改它）：

```
    :local obj "{\
        \
           \"ts\":$ts,\
           \"values\":{\
            \"id\":\"$[$minimizeMac address=$address]\",\
            \"rssi\":\"$rssi\",\
            \"temp\":\"$temp\",\
            \"ad\":\"$ad\"\
            }\
        }"
```

按上述示例组织的消息将以 JSON 显示（我们唯一关注的实际值是 "timestamp"→ "ts" 和 "temperature"→ "temp"，因此请随意删除其他参数）。如果温度以**十六进制**格式计算，消息将如下所示：

```
[
  {
    "ts": 1661333913375,
    "values": {
      "id": "2CC81B4BBB0A",
      "rssi": "-43",
      "temp": "1939",
      "ad": "15ff4f0901002de0ffff010000003919877c54000061"
    }
  }
]
```

如果温度以**十进制**格式计算，则如下所示：

```
[
  {
    "ts": 1661333913375,
    "values": {
      "id": "2CC81B4BBB0A",
      "rssi": "-43",
      "temp": "25222",
      "ad": "15ff4f0901002de0ffff010000003919877c54000061"
    }
  }
]
```

保存脚本并运行它：

```ros
[admin@MikroTik] > system script run name_of_the_script
[*] Gathering system info...
[*] Gathering Bluetooth info...
[*] Found 1 new advertisements (processing time: 00:00:00)
[*] Total message size: 134 bytes
[*] Sending message to MQTT broker...

[*] Done
[admin@MikroTik] > 
```

#### 调度器 {#scheduler}

为脚本应用调度器，以所需间隔运行它。**请注意！** 如果你已将调度器设置为运行脚本，例如每 2 分钟一次，这意味着在 2 分钟间隔内收到的每个负载（由标签广播）都会被“组织”成 MQTT 消息。你很可能不需要每 2-5 秒就知道标签的温度，因此你可以更改要组织的 MQTT 消息，使其仅发布最新的温度读数，或者只需将 **IoT>Bluetooth>Scanners** 设置中的 **Filter duplicates** 改为“**keep-newest**”（这样，蓝牙扫描器将覆盖来自每个单独标签 MAC 地址的每个新报告），脚本将只发布运行脚本时“扫描”到的 1 个负载。

#### 结果 {#results}

你将能够在为 ThingsBoard 创建的设备下的 **Latest telemetry** 部分验证结果（在我们的示例中，我们将“设备”称为 **KNOT**）：

![](/img/0e9796c6af1fc040.webp)

结果是成功的 MQTT 发布！从上面的截图可以看出，**temp** 参数采用**十六进制**格式。

**但是！** 我们希望以**十进制**格式显示温度（**temp** 参数），并且我们还希望以更易于理解的方式显示数据。

而且，如果我们以**十进制**格式发布了温度，我们还希望设置小数点。

这时 [小组件](https://thingsboard.io/docs/reference/widgets/widget-library/) 就派上用场了。

### ThingsBoard 小组件 {#thingsboard-widgets}

在 **Latest telemetry** 部分收到值后，你可以在 [**小组件**](https://thingsboard.io/docs/reference/widgets/widget-library/) 上显示它。

小组件中使用的 Javascript 应能够将数据从十六进制格式转换为十进制格式。

在小组件中选择你希望显示的值（在我们的示例中为 **temp**），然后单击“**Show on widget**”按钮：

![](/img/9a72513b07ecb866.webp)

你将能够在弹出的窗口中浏览这些小组件：

![](/img/425bf9428fc12142.webp)

单击“**Add to dashboard**”按钮：

![](/img/41301e711031f806.webp)

选择要创建的新仪表板，或选择你已预安装/预先制作的现有仪表板。单击“**Add**”。

勾选“**Open dashboard**”复选框后，你将重定向到仪表板菜单，或者你也可以手动前往那里。

我们还添加了第二个表格，结果我们的测试仪表板如下所示：

![](/img/2f1fe9db70477aaa.webp)

#### 如果我们以十六进制格式发布数据 {#in-case-we-post-the-date-in-hexadecimal-format}

两个表格都会以**十六进制格式**显示值，如“17f9”（即我们从 KNOT 发送的原始值 → 表格的 javascript 尚未将其转换为十进制值）。

由于我们标签负载中的值采用有符号 8.8 定点格式（请记住二进制补码格式），我们将需要添加额外的 javascript 代码来将数据“转换”为十进制值。

进入“**Edit**”模式，然后单击“**Edit widget**”按钮：

![](/img/d660e0155664ce0e.webp)

单击“**edit**”按钮以编辑参数 **temp**：

![](/img/8c092989aafd5e24.webp)

在弹出的“**Data key configuration**”窗口中，启用“**Use data post-processing function**”复选框，并输入下面显示的代码：

![](/img/d4991082836ee6e1.webp)

代码：

```
function f(p){

this.p = p;

}

f.prototype.calculate = function(mes){

let intValue = parseInt(mes, 16);

let sign = 1;

if(intValue & 0x8000) {

intValue = (~intValue + 1) & 0xFFFF;

sign = -1;

}

intValue = sign * intValue / Math.pow(2, this.p);

return intValue;

}

let res = new f(8);

return (res.calculate(value));
```

保存并应用更改。

对第二个/第一个表格执行相同步骤。

#### 如果我们以十进制格式发布数据 {#in-case-we-post-the-date-in-decimal-format}

你将看到如下结果：

![](/img/8bb9762b131302ce.webp)

执行与上面示例完全相同的步骤，但在此场景中，**将结果除以“1000”**：

![](/img/e0c5860cefccf0bf.webp)

保存并应用更改。

#### 验证 {#verification}

最终结果应如下所示：

![](/img/33deb05fef380365.webp)

现在两个表格都显示**十进制温度**。
:::info
你也可以在将遥测数据保存到 ThingsBoard 之前对其进行转换。使用此方案时，每次打开仪表板都不会对数据进行后处理。

以下指南可作为转换数据的通用方法：[转换节点](https://thingsboard.io/docs/user-guide/rule-engine-2-0/transformation-nodes/)。
:::
