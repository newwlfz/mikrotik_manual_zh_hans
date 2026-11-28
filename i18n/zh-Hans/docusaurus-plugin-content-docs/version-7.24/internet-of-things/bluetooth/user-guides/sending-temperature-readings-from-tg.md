---
title: "将 TG-BT5-OUT 标签的温度读数发送到 ThingsBoard"
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/bluetooth/user-guides/sending-temperature-readings-from-tg
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "internet-of-things/gpio"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 简介 {#introduction}

我们的 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out) 蓝牙标签型号内置温度传感器。这意味着它可用于测量周围温度。

温度值会“写入”标签通过 Bluetooth advertising channels 广播的 advertising payload。根据你对标签的配置，标签可以定期广播 payload，或在检测到触发条件时广播，也可以同时采用两种方式。有关标签配置选项的更多信息，请参阅[链接章节](/docs/internet-of-things/bluetooth/mikrotik-beacon-manager)。

你可以使用我们的 [KNOT](https://mikrotik.com/product/knot) 型号，在 **IoT>Bluetooth>Advertising reports** 选项卡中查看或显示 payload：

![](/img/f27669ef09b2c2b0.webp)

payload 将显示在“Advertisement (hex)”字段中，格式为 **hexadecimal**。

当标签配置为 MikroTik 格式时，payload 的第 14 和第 15 个八位组表示广播时“感应”到的温度（环境温度，单位为摄氏度，采用 **signed 16-bit integer [twos complement] 8.8 fixed point format**）。

下面显示了 MikroTik 格式 payload 的示例：

| 15ff4f09010032a500000000ffff `5019` bd5954000061 |
| --- |

请注意，payload 中的所有多字节值均为小端序。因此，如果第 #14 和 #15 个八位字节表示温度为“**50 19**”→ 需要交换八位字节顺序，得到 0x**1950**。

正温度：

我们捕获到的温度为 0x**1950**（十六进制）→ **6480**（十进制）。要获得实际温度值，请将结果除以 256 → 6480/256=**25.31 C**。

负温度：

我们捕获到的温度为 0x**FE80**（十六进制）。请记住，**使用的是二进制补码格式** → **-384**（有符号 2 的补码的十进制值）。要获得实际温度值，请将结果除以 256 → -384/256=**-1.5 C**。

了解这些后，可以使用 RouterOS 脚本根据收到的 payload 构造消息，并将其发送到 MQTT/HTTP 服务器。建议由服务器负责将**十六进制**格式的数据转换为**十进制**格式。**但是！**如果愿意增加 RouterOS 设备的负载，可以使用 RouterOS 脚本将**十六进制**值转换为**十进制**格式（这会增加设备负载，并可能影响 RouterOS 性能 → 建议服务器上转换值，而不是在 RouterOS 上转换）。在本指南中，我们将通过向 [ThingsBoard](https://thingsboard.io/) 发送 MQTT post 来实现结果。

### ThingsBoard 服务器和 MQTT 配置 {#thingsboard-server-and-mqtt-configuration}

需要有一台正在运行的 ThingsBoard 服务器。可以通过以下[链接](https://thingsboard.io/docs/installation/)找到有关如何设置服务器的有用信息。可以将服务器本地安装到一台机器上，也可以使用他们的云解决方案。

服务器准备就绪后，需要对其进行配置，使其能够接收 MQTT 消息。请按照 [ThingsBoard configuration](/docs/internet-of-things/mqtt/mqtt-and-thingsboard-configuration) 链接设置“设备”。

### RouterOS 配置 {#routeros-configuration}

请参阅 [link over here](/docs/internet-of-things/mqtt/mqtt-and-thingsboard-configuration)，了解如何根据 ThingsBoard 服务器使用的设备凭据设置 MQTT broker。

设置 broker 后，确认 Bluetooth 标签正在广播信息，如上图所示，位于 **IoT>Bluetooth>Advertising reports** 选项卡下。

#### 脚本 {#script}

在 **System>Scripts>Add** 下粘贴以下脚本：

```ros
## Required packages: iot

################################ Configuration ################################
## Name of an existing MQTT broker that should be used for publishing
 :local broker "tb"

## MQTT topic where the message should be published
 :local topic "v1/devices/me/telemetry"

 # Interface whose MAC should be used as 'Locator ID'
:local locatorIface "ether1"

## POSIX regex for filtering advertisement Bluetooth addresses. E.g. "^BC:33:AC"
## would only include addresses which start with those 3 octets.
## To disable this filter, set it to ""
:local addressRegex "2C:C8:1B:4B:BB:0A"

## POSIX regex for filtering Bluetooth advertisements based on their data. Same
## usage as with 'addressRegex'.
:local advertisingDataRegex ""

## Signal strength filter. E.g. -40 would only include Bluetooth advertisements
## whose signal strength is stronger than -40dBm.
## To disable this filter, set it to ""
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
## Remove semicolons from MAC/Bluetooth addresses
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

#The line below will set temperature in hexadecimal format, like "0x1950"
    :local temp ([:pick $tempf 2 4].[:pick $tempf 0 2])

#The line below will set temperature in decimal format, like "25313". It is commented with "#", so if you wish to use it instead of the hexadecimal format value, comment the line above and uncomment the line below > remove "#" from the line below and add "#" to the line above.

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

在引号内更改你为 MQTT broker 选择的 **broker 名称**（在我们的示例中，将其命名为 **tb**）：

```
 :local broker "tb"
```

ThingsBoard 使用的默认主题如下（无需更改）：

```
 :local topic "v1/devices/me/telemetry"
```

修改要监控标签的 MAC 地址（在我们的示例中，MAC 地址为 **2C:C8:1B:4B:BB:0A**）：

```
:local addressRegex "2C:C8:1B:4B:BB:0A"
```

以下代码将取 payload 的第 14 和第 15 个八位字节，并将值从“ABCD”“重构”为“CDAB”（按照“**简介**”部分的示例，从“**5019**”变为“**1950**”）→ 基本上是以 **十六进制**格式构造温度消息：

```
    :local tempf [:pick ($adv->"data") 28 32]
    :local temp ([:pick $tempf 2 4].[:pick $tempf 0 2])
```

第二种选择是使用 RouterOS 将温度从 **十六进制**转换为 **十进制**格式（如果要保留十六进制格式，请忽略此步骤）。为此，可以“注释”前一行（添加 `#`，或将其完全删除），并“取消注释”下一行（删除 `#`），如下所示：

```
#  :local temp ([:pick $tempf 2 4].[:pick $tempf 0 2])
    :local temp [$from88 [:pick $ad 28 32]]
```

由于不支持浮点数 → 小数点后的每次计算都会“向上取整”为整数。因此，脚本将计算 **按 1000 缩放**（乘以 **1000**）的温度，结果温度将显示为“**25546**”（表示 25.546 C）。你可以添加额外的脚本来设置小数点（但请记住，额外操作会增加设备负载），也可以在服务器上完成此操作。

我们发布的 MQTT 消息的结构如下（无需修改）：

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

按照上述示例构造的消息将以 JSON 显示（我们真正需要关注的值只有“timestamp”→“ts”和“temperature”→“temp”，因此可以随意删除其他参数）。如果温度按 **十六进制**格式计算，消息如下所示：

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

如果温度按 **十进制**格式计算，消息如下所示：

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

#### 计划任务 {#scheduler}

为脚本应用 scheduler，使其按所需间隔运行。**请注意！** 如果已将 scheduler 设置为例如每 2 分钟运行一次脚本，则在这 2 分钟间隔内收到的每个 payload（由标签广播）都会被“结构化”为 MQTT 消息。大多数情况下，无需每 2-5 秒获取一次标签温度，因此你可以更改结构化的 MQTT 消息，使其仅发布最新温度读数；也可以将 **IoT>Bluetooth>Scanners** 设置中的 **Filter duplicates** 改为“**keep-newest**”（这样，Bluetooth 扫描器会覆盖来自每个标签 MAC 地址的每个新报告），脚本将只发布脚本运行时“扫描”到的 1 个 payload。

#### 结果 {#results}

你可以在为 ThingsBoard 创建的设备下的 **Latest telemetry** 部分验证结果（在我们的示例中，该“设备”名为 **KNOT**）：

![](/img/0e9796c6af1fc040.webp)

结果是 MQTT 发布成功！从上面的截图可以看到，**temp** 参数采用 **hexadecimal** 格式。

**但是！** 我们希望以 **decimal** 格式显示温度（**temp** 参数），并且希望数据更易于理解。

此外，如果我们已经以 **decimal** 格式发布温度，则希望设置小数点。

这时就需要使用 [Widgets](https://thingsboard.io/docs/reference/widgets/widget-library/)。

### ThingsBoard 组件 {#thingsboard-widgets}

收到 **Latest telemetry** 部分下的值后，可以将其显示在 [**Widget**](https://thingsboard.io/docs/reference/widgets/widget-library/) 上。

组件中使用的 Javascript 应能够将数据从十六进制格式转换为十进制格式。

选择要在组件中显示的值（在我们的示例中为 **temp**），然后点击“**Show on widget**”按钮：

![](/img/9a72513b07ecb866.webp)

可以在弹出的窗口中浏览组件：

![](/img/425bf9428fc12142.webp)

点击“**Add to dashboard**”按钮：

![](/img/41301e711031f806.webp)

选择要创建的新仪表板，或选择已预装或预制的现有仪表板。点击“**Add**”。

勾选“**Open dashboard**”后，你将重定向到仪表板菜单，也可以手动前往该菜单。

我们还添加了第二个表格，因此测试仪表板如下所示：

![](/img/2f1fe9db70477aaa.webp)

#### 如果我们以十六进制格式发布日期 {#in-case-we-post-the-date-in-hexadecimal-format}

两个表格都会以 **十六进制格式** 显示值“17f9”（原始值，即我们从 KNOT 发送的值 → 表格的 javascript 尚未将其转换为十进制值）。

由于标签 payload 中的值采用有符号 8.8 定点格式（请记住二进制补码格式），我们需要添加额外的 javascript 代码，将数据“转换”为十进制值。

进入“**Edit**”模式，然后点击“**Edit widget**”按钮：

![](/img/d660e0155664ce0e.webp)

点击“**edit**”按钮以编辑参数 **temp**：

![](/img/8c092989aafd5e24.webp)

在弹出窗口“**Data key configuration**”中，启用复选框“**Use data post-processing function**”，并输入如下所示的代码：

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

对第二个/第一个表执行相同步骤。

#### 如果以十进制格式发布日期 {#in-case-we-post-the-date-in-decimal-format}

你将看到如下结果：

![](/img/8bb9762b131302ce.webp)

执行与上述示例完全相同的步骤，但在此场景中，**将结果除以“1000”**：

![](/img/e0c5860cefccf0bf.webp)

保存并应用更改。

#### 验证 {#verification}

最终结果应如下所示：

![](/img/33deb05fef380365.webp)

现在，两个表都显示 **十进制温度**。
:::info
您还可以在将数据保存到 ThingsBoard 之前转换遥测数据。使用此方案时，每次打开仪表板时都不会再对数据进行后处理。

以下指南可用作转换数据的通用方法：[Transformation nodes](https://thingsboard.io/docs/user-guide/rule-engine-2-0/transformation-nodes/)。
:::
