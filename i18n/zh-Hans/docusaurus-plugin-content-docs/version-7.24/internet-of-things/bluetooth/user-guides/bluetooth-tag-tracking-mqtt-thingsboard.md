---
title: "使用 MQTT 和 ThingsBoard 进行 Bluetooth 标签跟踪"
description: "本页介绍如何使用 MikroTik RouterOS、MQTT 和 ThingsBoard 实现 Bluetooth 标签跟踪，详细说明 KNOT 设备如何捕获 Bluetooth 广播数据包、将其处理为 MQTT 消息，并在 ThingsBoard 中可视化，以跟踪资产在多个区域之间的移动。"
tags:
  - 'bluetooth'
  - 'mqtt'
  - 'thingsboard'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/bluetooth/user-guides/bluetooth-tag-tracking-mqtt-thingsboard
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 中的 Bluetooth 接口实现使设备能够捕获通过 37、38 和 39 广播信道发送的 Bluetooth 广播数据包。详情请参阅[此处指南](/docs/internet-of-things/bluetooth)。

Bluetooth 标签，例如 [TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) 和 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out)，正是用于执行此操作。它们通过上述信道广播广播载荷。要了解载荷中存储的信息类型，请务必查看[链接](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-MikroTikPDUPayloadstructure)。可以使用 [MikroTik Beacon Manager](https://help.mikrotik.com/docs/display/UM/MikroTik+Beacon+Manager) app 配置标签，使其自动广播载荷，按指定间隔广播，和/或在检测到移动、倾斜或自由落体触发时广播。简单来说，标签会定期向周围所有 Bluetooth 扫描器（例如 [KNOT](https://mikrotik.com/product/knot)）“告知”（广播）自身信息。

当标签广播载荷，并且标签位于 KNOT 的 Bluetooth 工作范围内时，KNOT 将捕获该载荷，并在其“scanner” Bluetooth 接口部分显示。效果如下：

```ros
/iot/bluetooth/scanners/advertisements/print
Columns: DEVICE, PDU-TYPE, TIME, ADDRESS-TYPE, ADDRESS, RSSI, LENGTH, DATA
#  DEVICE  PDU-TYPE        TIME                  ADDRESS-TYPE  ADDRESS            RSSI    LENGTH  DATA                                        
0  bt1     adv-noconn-ind  2023-03-07 12:11:57  public        DC:2C:6E:0F:C0:3D  -51dBm      22  15ff4f09010079100000ffff0000cf188a6b2b000064
1  bt1     adv-noconn-ind  2023-03-07 12:11:58  public        2C:C8:1B:4B:BB:0A  -49dBm      22  15ff4f090100168dfefffffffeffa51ae1362200005e 
```

上面的示例显示，KNOT 在其工作范围内看到两个 Bluetooth 标签，MAC 地址分别为“DC:2C:6E:0F:C0:3D”和“2C:C8:1B:4B:BB:0A”，以及它们各自的载荷（“DATA”字段）和信号强度（“RSSI”字段）。

:::info
在本地测试 KNOT 可处理的载荷数量时，我们取得了以下结果 → 使用 300 个标签（出厂设置），分布在 KNOT 周围，并使用 Bluetooth 过滤器“keep-newest”（它会用最新收到的载荷覆盖每个唯一 MAC 地址此前收到的载荷，使 Bluetooth 列表始终按每个唯一标签的 MAC 地址显示 1 个载荷），30-40 秒后，所有 300 个 MAC 地址都出现在 KNOT 的范围内。此时需要记住，300 个标签同时在同一信道上广播会造成干扰（接收延迟）。当我们“清空”Bluetooth 载荷列表时，列表每秒增加 20 个新条目，约 ~15 秒后，列表中有 250-290 个载荷。再过约 ~15 秒后，列表显示了全部 300 个唯一标签载荷。**KNOT 实际能够处理的标签数量在很大程度上取决于环境，因此最好在现场进行测试。**
:::

借助 RouterOS [脚本](/docs/developer-guides/scripting)和[调度](/docs/system-information-and-utilities/scheduler)，可以让 KNOT 定期自动扫描载荷列表，如果在列表中找到特定载荷或特定标签的 MAC 地址，可以让 KNOT 根据上面示例中显示的打印信息构造 MQTT 消息，并通过 [MQTT](/docs/internet-of-things/mqtt)、[e-mail](/docs/system-information-and-utilities/e-mail) 或 [HTTP](/docs/system-information-and-utilities/fetch) post 发送到配置的服务器。本指南稍后将展示脚本示例。

如标题所示，目标是实现一个 **Bluetooth 标签跟踪解决方案**，思路非常简单。**当你有 2 个 KNOT**（KNOT-A 和 KNOT-B），它们通过 scheduler 运行相同脚本，**并且标签在它们的 Bluetooth 工作范围之间移动**时，**服务器上的数据将指示**是 **KNOT-A 还是 KNOT-B** **发送了**标签的**载荷**。这将帮助你判断标签的接近程度，即标签是在 KNOT-A 区域广播载荷，还是在 KNOT-B 区域广播载荷。

你需要一台服务器来存储并可视化数据。本指南将介绍一个名为 [ThingsBoard](https://thingsboard.io/) 的平台，以及如何使用 MQTT 协议与其通信。

ThingsBoard 提供云解决方案和多种本地安装选项（适用于不同操作系统）。由于我们增加了 [container](/docs/containers) 功能，因此也可以在 RouterOS 中运行该平台。为此，你需要一台至少有 2 GB 可用 RAM，或在低负载下有 1 GB 可用 RAM 的 RouterOS 设备，并且该设备支持扩展存储（例如额外的 USB 端口），同时采用 ARM64 或 AMD64 架构。可以考虑使用 [CHR](/docs/getting-started/routeros-licensing/chr) 设备，因为它可能是合适的选择。

### 设置要求 {#setup-requirements}

- 一台正在运行的 ThingsBoard 服务器。
- 2 台或更多 [KNOT](https://mikrotik.com/product/knot)，可通过以太网、Wi-Fi 或蜂窝连接访问服务器网络（所需设备数量取决于需要覆盖的区域大小）。
- 1 个或更多 Bluetooth [TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) 和/或 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out) 标签（取决于你需要跟踪的资产数量，每个资产 1 个标签）。

## 场景说明 {#scenario-explanation}

先看一个基本示例。我们有两台 KNOT（KNOT-A 和 KNOT-B）。我们在自己的环境中测试了 Bluetooth 范围，并确认两台 KNOT 都能在 70 米距离捕获标签。如果将 KNOT-A 和 KNOT-B 安装在相距 140 米的位置，它们的 Bluetooth 范围将不会重叠，或仅略有重叠。当标签进入 KNOT-A 范围时 → 被监控标签的 payload 将出现在 Bluetooth 扫描器列表中 → 脚本将按设定计划启动 → 包含报告的 MQTT 消息将发送到服务器 → 最后，服务器将显示标签位于 KNOT-A 区域。当标签进入 KNOT-B 范围时，会发生相同的过程，服务器将显示标签位于 KNOT-B 区域内。

实际 Bluetooth 工作距离可能因现场而异，因为许多不同因素都会影响它，例如 2.4 GHz 干扰或周围使用的材料。例如，在无遮挡且无干扰的视距环境中，KNOT 能够捕获标签广播 payload 的距离可达 180 米（KNOT — ~180 米 — TG-BT5-OUT）。但也要记住，距离越远，传输过程中丢失的数据包越多。在办公环境中，范围可能降至 30-100 米。

从逻辑上讲，如果 Bluetooth 工作范围重叠，并且标签位于重叠区域内（同时处于 KNOT-A 和 KNOT-B 的 Bluetooth 范围内），两台 KNOT 都会发送数据，服务器将显示该标签同时由两台设备报告。

**必然存在一些区域，两台或更多 KNOT 的 Bluetooth 范围会重叠，你可以利用这一点。** 基本上，你会获得这样的信息：标签当前位于特定 KNOT 区域之间 Bluetooth 范围的边缘。换句话说，当资产进入重叠区域时，服务器上会显示该资产位于两个 KNOT 工作范围之间的某处，这是有用的信息，**因为它能提供更高的精度**。

此外，**可以使用 [Tx power](https://help.mikrotik.com/docs/display/UM/MikroTik+Beacon+Manager+for+Android+devices#heading-TxPower) 参数降低 tag 的输出功率**。这意味着，即使 tag 的 payload 广播得太远，被其他本不应看到这些 payload 的 KNOT 在更远距离处接收到 → 你也可以降低 tag 的输出功率，从而缩短 KNOT 能够捕获它们的距离。这样，你可以“调整”接收“范围”，并避免“干扰”其他区域的信号。

我们准备的脚本还允许你设置过滤器（稍后会展示），使 KNOT 忽略 scanner 捕获的 payload，除非信号强度（RSSI）强于指定值。在上方“[简介](/docs/internet-of-things/bluetooth)”部分所示的 Bluetooth scanner 示例输出中，可以看到 KNOT 检测到一个 tag 的 RSSI 信号强度为 **-51 dBm**（MAC 地址为“**DC:2C:6E:0F:C0:3D**”的 tag），另一个 tag 的 RSSI 信号强度为 **-49 dBm**（MAC 地址为“**2C:C8:1B:4B:BB:0A**”的 tag）。因此，**如果**对脚本应用过滤器，**忽略**所有信号强度（**RSSI**）**弱于 -50 dBm** 的 payload，那么**KNOT 将只报告 tag“2C:C8:1B:4B:BB:0A”位于 Bluetooth 范围内**，因为其 RSSI 为 -49 dBm，而第二个 tag（RSSI 为 -51 dBm）将被忽略。本质上，这是第二种“调整”接收“范围”的方法。实际信号强度会因位置不同而变化（如前所述，受干扰和周围材料影响），因此需要在现场测试。

### 示例 #1 {#example-1}

其中一个用例如下图所示拓扑：

![](/img/8fc762841be8f171.webp)

:::note
对象和 Bluetooth 工作范围的比例仅作为示例展示，用于帮助直观理解和想象拓扑！
:::

我们有一个仓库区域，并且**有 3 个我们感兴趣的需要跟踪的资产**（托盘）。我们还**有 3 个区域**：区域 **A**，用于存放新到达的托盘；区域 **B**，资产被转移到这里接受检查；区域 **C**，资产在检查后移动到这里。要实现 Bluetooth 资产跟踪，只需每个区域安装 x1 KNOT，每个资产安装 x1 tag。

如果 TAG 1 和 TAG 2（托盘）到达“arrival”区域 A，KNOT A 将向服务器报告两个资产都在其 Bluetooth 范围内。如果 TAG 3 移动到区域 C，服务器将指示它位于 KNOT C 范围内。如果 TAG 1 和 TAG 2 向 B 区域移动，并停留在 A 和 B 区域之间的边缘，服务器将显示它们位于重叠区域（同时在 KNOT-A 和 KNOT-B 范围内）。如果 tag 移动到仓库中间，服务器将指示它们同时位于所有 3 个区域，即重叠区域。

#### 配置 {#configuration}

本示例将展示一个基础拓扑：使用两台 KNOT，只需要判断标签位于建筑的哪一侧（位于 zone A 还是 zone B）。

##### ThingsBoard 准备 {#thingsboard-preparation}

请查看[此处](/docs/internet-of-things/mqtt/mqtt-and-thingsboard-configuration)的指南，了解如何设置 ThingsBoard 和 RouterOS 以使用 MQTT 通信。

:::tip
为简化说明，本示例将展示 [access-token](/docs/internet-of-things/mqtt/mqtt-and-thingsboard-configuration#access-token-scenario-1) 场景，但也可以使用其他可用选项。对于生产环境，建议使用 SSL-MQTT，因为非 SSL-MQTT 的数据包很容易被捕获和检查。

要了解如何在通过 [container](/docs/containers) 运行的实例上实现 SSL-MQTT 通信，请查看[此处](/docs/containers/user-guides/container-thingsboard-mqtt-http-server)链接的指南（[Enabling HTTPS and SSL MQTT](/docs/containers/user-guides/container-thingsboard-mqtt-http-server#enabling-https-and-ssl-mqtt) 部分）。
:::

在 ThingsBoard GUI 中创建 2 台 KNOT，并将它们设置为“gateways”。

进入“Devices”部分，点击“+”按钮和“Add new device”：

![](/img/c96c5c3c49271e3d.webp)

命名设备并勾选“Is gateway”选项：

![](/img/68362bb2332cc62f.webp)

对每台 KNOT 执行此操作：

![](/img/332956b1a98eb64b.webp)

在刚创建的设备下，为每个 KNOT 设置唯一的访问令牌（唯一凭据），位置为“Manage credentials”选项卡：

![](/img/0dfde7520370c11b.webp)

##### RouterOS 配置 {#routeros-configuration}

###### 准备 {#preparation}

在继续之前，需要确认 Bluetooth 标签确实出现在 KNOT 的 Bluetooth 范围内，并且 KNOT 检测到它。为此，可以执行命令 `/iot/bluetooth/scanners/advertisements/print`：

```ros
/iot/bluetooth/scanners/advertisements/print
 # DEVICE     PDU-TYPE        TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA                                           
 0 bt1        adv-noconn-ind  2023-03-08 12:35:15 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f090100b0110100ffff00000019d68d2300005d   
 1 bt1        adv-noconn-ind  2023-03-08 12:35:16 public       DC:2C:6E:0F:C0:3D        -39dBm         22 15ff4f0901008f3cfcfffbfffaff301783c22c000064   
 2 bt1        adv-noconn-ind  2023-03-08 12:35:35 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f09010084d500000400ffff0319ea8d2300005d   
 3 bt1        adv-noconn-ind  2023-03-08 12:35:45 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f090100e607faffffff03000319f48d2300005d   
```

也可以使用 [Webfig](/docs/management-tools/webfig) 或 [Winbox](/docs/management-tools/winbox)，在 IoT>Bluetooth>Advertising reports 选项卡下进行检查。

列表可能比较混乱。由于扫描器会捕获周围的所有内容，列表中可能出现随机 payload。为减少列表内容，可以使用标签的 MAC 地址进行过滤：`/iot/bluetooth/scanners/advertisements/print where address=DC:2C:6E:0F:C0:3D`：

```ros
/iot/bluetooth/scanners/advertisements/print where address=DC:2C:6E:0F:C0:3D
 # DEVICE    PDU-TYPE        TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA                                           
 0 bt1       adv-noconn-ind  2023-03-08 12:41:06 public       DC:2C:6E:0F:C0:3D        -49dBm         22 15ff4f0901005ab20100fdfffdff4017e1c32c000064   
 1 bt1       adv-noconn-ind  2023-03-08 12:41:26 public       DC:2C:6E:0F:C0:3D        -40dBm         22 15ff4f090100349704000000fcff4017f5c32c000064   
 2 bt1       adv-noconn-ind  2023-03-08 12:41:36 public       DC:2C:6E:0F:C0:3D        -49dBm         22 15ff4f09010073fb0000000000003017ffc32c000064   
 3 bt1       adv-noconn-ind  2023-03-08 12:41:46 public       DC:2C:6E:0F:C0:3D        -43dBm         22 15ff4f090100b88cffffffffffff401709c42c000064   
```

要了解如何解析 payload，请参阅[此处](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-Scriptfordecoding)指南。

###### MQTT 代理 {#mqtt-broker}

在每台 KNOT 上设置一个 MQTT broker。

对于 KNOT A：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=1883 username=knot-A_access_token
```

Where:

- `name` 是希望为该 broker 指定的名称，该名称将在脚本中后续使用。
- `address` 是 broker/ThingsBoard 服务器的 IP 地址。
- `port` 是 broker 监听的 TCP 端口 → 对于非 SSL，通常是 TCP 1883。
- `username` 由 MQTT broker 决定，在本例中，它是在 ThingsBoard 管理门户中生成的“access token”。

对于 KNOT B → 执行相同步骤。只需将 `username` 更改为为 KNOT B 设备（网关）生成的相应 access token。

###### 脚本 {#script}

将下面显示的脚本导入每台 KNOT。为此，只需复制下面显示的“code”并粘贴到新的终端窗口中，然后按 <kbd>Enter</kbd>：

```ros
/system/script/add dont-require-permissions=no name=tracking owner=admin policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="# Requ\
    ired packages: iot\r\
    \n\r\
    \n################################ Configuration ##############################\
    ##\r\
    \n# Name of an existing MQTT broker that should be used for publishing\r\
    \n:local broker \"tb\"\r\
    \n\r\
    \n# MQTT topic where the message should be published\r\
    \n:local topic \"v1/gateway/telemetry\"\r\
    \n\r\
    \n# POSIX regex for filtering advertisement Bluetooth addresses. E.g. \"^BC:33:\
    AC\"\r\
    \n# would only include addresses which start with those 3 octets.\r\
    \n# To disable this filter, set it to \"\"\r\
    \n:local addressRegex \"\"\r\
    \n\r\
    \n# POSIX regex for filtering Bluetooth advertisements based on their data. Sam\
    e\r\
    \n# usage as with 'addressRegex'.\r\
    \n:local advertisingDataRegex \"\"\r\
    \n\r\
    \n# Signal strength filter. E.g. -40 would only include Bluetooth advertisement\
    s\r\
    \n# whose signal strength is stronger than -40dBm.\r\
    \n# To disable this filter, set it to \"\"\r\
    \n:local rssiThreshold \"\"\r\
    \n\r\
    \n#Name the KNOT. Identity of the unit that will be sending the message. This n\
    ame will be reported to the MQTT broker.\r\
    \n:local gwName \"KNOT_A\"\r\
    \n\r\
    \n################################## Bluetooth ################################\
    ##\r\
    \n:put (\"[*] Gathering Bluetooth info...\")\r\
    \n\r\
    \n:global makeRecord do={\r\
    \n    :local jsonStr \"{\\\"ts\\\":\$ts,\\\"values\\\":{\\\"reporter\\\":\\\"\$\
    gwName\\\",\\\"rssi\\\":\$rssi}}\"\r\
    \n    :return \$jsonStr\r\
    \n}   \r\
    \n\r\
    \n# array of record strings collected for each advertising MAC address\r\
    \n:global macRecords [:toarray \"\"]\r\
    \n\r\
    \n# process advertisements and update macRecords\r\
    \n:local advertisements [/iot/bluetooth/scanners/advertisements/print detail as\
    -value where \\\r\
    \naddress ~ \$addressRegex and \\\r\
    \ndata ~ \$advertisingDataRegex and \\\r\
    \nrssi > \$rssiThreshold]\r\
    \n\r\
    \n/iot/bluetooth/scanners/advertisements/clear\r\
    \n\r\
    \n:foreach adv in=\$advertisements do={\r\
    \n:local address (\$adv->\"address\")\r\
    \n:local rssi (\$adv->\"rssi\")\r\
    \n:local epoch (\$adv->\"epoch\")\r\
    \n                \r\
    \n:local recordStr [\$makeRecord ts=\$epoch gwName=\$gwName rssi=\$rssi]\r\
    \n\r\
    \n:if ([:len (\$macRecords->\$address)] > 0) do={\r\
    \n:local str (\$macRecords->\$address)\r\
    \n:local newStr \"\$str,\$recordStr\"\r\
    \n:set (\$macRecords->\$address) \$newStr} else={:set (\$macRecords->\$address)\
    \_\$recordStr}}\r\
    \n\r\
    \n# TODO: add some logic to decide when we want to send data\r\
    \n:local sendData true\r\
    \n\r\
    \n:if (\$sendData) do={\r\
    \n:local jsonStr \"{\"\r\
    \n\r\
    \n:foreach addr,advRec in=\$macRecords do={\r\
    \n:set jsonStr \"\$jsonStr\\\"\$addr\\\":[\$advRec],\"}\r\
    \n\r\
    \n:local payloadlength\r\
    \n:set payloadlength [:len (\$jsonStr)]\r\
    \n:local remcom\r\
    \n:set remcom [:pick \$jsonStr 0 (\$payloadlength-1)]\r\
    \n:set jsonStr \"\$remcom}\"\r\
    \n:local message\r\
    \n:set message \"\$jsonStr\"\r\
    \n:log info \"\$message\";\r\
    \n:put (\"[*] Message structured: \$message\")\r\
    \n:put (\"[*] Total message size: \$[:len \$message] bytes\")\r\
    \n:put (\"[*] Sending message to MQTT broker...\")\r\
    \n/iot/mqtt/publish broker=\"\$broker\" topic=\"\$topic\" message=\$message}"
```

该脚本应显示在“System>Scripts>Script List”选项卡下，名称为“tracking”，也可通过命令 `/system/script/print` 查看。

有一些脚本行需要特别注意。

需要在 broker name 配置行中输入已设置的 MQTT broker 名称：

>      :local broker "tb"

需要输入 MQTT broker 使用的正确 topic。详情请参阅 [ThingsBoard 文档](https://thingsboard.io/docs/reference/gateway-mqtt-api/)。默认情况下，topic 应为：

>      :local topic "v1/gateway/telemetry"

MAC 地址过滤选项位于脚本本身。可以输入 MAC 地址的全部 6 个八位字节（将过滤应用于 1 个特定标签），也可以使用几个八位字节过滤列表，例如 "^BC:33:AC"（应用过滤后，仅处理以 "BC:33:AC:..." 开头的 MAC 地址）：

>     :local addressRegex "DC:2C:6E:0F:C0:3D"

Payload content/data 行。它允许按特定 payload 内容过滤列表，例如 "[manufacturer data](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-MikroTikPDUPayloadstructure)"。例如，"15ff4f09" 将丢弃所有非 MikroTik 格式的 payload：

>     :local advertisingDataRegex "15ff4f09"

RSSI 信号强度过滤选项。“[场景说明](#scenario-explanation)”一节中提到了该过滤选项。该过滤器可忽略 RSSI 弱于配置值的任何 payload。例如，“-40”将仅包含信号强度强于 -40dBm 的 Bluetooth 广播：

>     :local rssiThreshold "-40"

KNOT 标识符行。对于每个不同的 KNOT，都需要修改该行。例如，将第一个 KNOT 命名为 → KNOT\_A，将第二个 KNOT 命名为 → KNOT\_B：

> :local gwName "KNOT\_A"

脚本的其余部分无需更改或修改。

运行脚本时，脚本如何工作？脚本会使用已应用的过滤器“检查”“Advertising reports”选项卡（payload 列表选项卡），并构造 JSON 消息。JSON 消息示例如下：

```
{
  "2C:C8:1B:4B:BB:0A": [
    {
      "ts": 1678967250600,
      "values": {
        "reporter": "KNOT_A",
        "rssi": -47
      }
    }
  ],
  "DC:2C:6E:0F:C0:3D": [
    {
      "ts": 1678967247850,
      "values": {
        "reporter": "KNOT_A",
        "rssi": -59
      }
    },
    {
      "ts": 1678967257849,
      "values": {
        "reporter": "KNOT_A",
        "rssi": -67
      }
    }
  ]
}
```

数据按照 [ThingsBoard 指南](https://thingsboard.io/docs/reference/gateway-mqtt-api/#telemetry-upload-api) 组织，其中 `2C:C8:1B:4B:BB:0A` 和 `DC:2C:6E:0F:C0:3D` 是出现在 KNOT 范围内的标签的 MAC 地址，`ts` 是标签广播的每个 payload 的 Unix 时间戳（以毫秒为单位），`reporter` 指示发送该消息的具体 KNOT，`rssi` 是标签广播的每个 payload 的信号强度（以 dBm 为单位）。

“搜索”payload 列表并构造 JSON 消息后，Bluetooth 接口 payload 列表会被“清理”（或“刷新”），随后将之前构造的 JSON 消息发送到 ThingsBoard MQTT broker。

要运行脚本，请使用以下命令：

```ros
/system/script/run tracking
```

###### 计划任务 {#scheduler}

为脚本应用计划任务，使 RouterOS 定期自行启动该脚本：

```ros
/system/scheduler/add name=bluetoothscheduler interval=30s on-event="/system/script/run tracking"
```

你可以设置较短和较长的间隔。如果要更频繁地发送数据，使数据“更新鲜” → 设置更短的时间间隔（10-15 秒）。如果要减少消息发送频率 → 可以设置更长的时间间隔（30min+）。

使用该脚本构建的 JSON 消息为每个接收到的 payload 分配一个 `ts` 值（时间戳）。这意味着**当脚本运行**时，例如**每分钟**运行一次，使用 1 个 tag，并且**该 tag 广播**每 10 秒 1 个 payload（即**每分钟 6 个 payload**）→ ThingsBoard 数据（GUI）将每分钟更新一次，并且每分钟会出现 6 条新记录（每条记录将指示其在上一条记录后 10 秒收到）。如果使用 1 个每 10 秒广播一个 payload 的 tag（即每 15 分钟 6\*15=90 个 payload），并且每 15 分钟发送一次消息 → ThingsBoard 数据（GUI）将每 15 分钟更新一次，但会出现 90 条记录。

#### ThingsBoard 数据可视化和结果验证 {#thingsboard-data-visualization-and-result-verification}

使用 `/system/script/run tracking` 或通过计划任务运行脚本并刷新 GUI 门户后，JSON 消息中找到的所有 MAC 地址（tag）都将在 ThingsBoard GUI 下创建为新设备：

![](/img/b85bc55bbf5af1aa.webp)

为帮助你可视化数据，可以使用内置 [widgets](https://thingsboard.io/docs/user-guide/ui/widget-library/) 或创建自己的组件。

从设备列表中选择标签的 MAC 地址，进入“Latest telemetry”部分，检查“reporter”参数，然后点击“Show on widget”按钮：

![](/img/abadead51b4a0341.webp)

选择要使用的组件，例如在“Cards”组下选择“Timeseries table”，然后点击“Add to dashboard”：

![](/img/412331282135c4b0.webp)

创建新的仪表板并按需命名。点击“Add”：

![](/img/7df5a5ffd9f28fff.webp)

对“Devices”选项卡下显示的其他标签执行相同步骤。在同一仪表板中为每个唯一标签创建新的组件。

将组件的“Timewindow”从默认使用的“Realtime-last minute”更改为“Realtime-current day”：

![](/img/5c1412587045330c.webp)

因此，如果两个标签都位于 **KNOT A** **range** 内，仪表板将显示：

![](/img/4d9e68c164725237.webp)

如果它们移动到 **KNOT B range**，将显示：

![](/img/a16fc000f709bea2.webp)

如果标签移动到 **overlapped area**，即同时位于两个范围内，则两个 reporter（KNOT\_A 和 KNOT\_B）应在几秒内相继显示，具体取决于调度器中使用的间隔：

![](/img/bbb25d4c9164e289.webp)

### 示例 #2 {#example-2}

在第二个示例中，将展示另一种拓扑：

![](/img/4b356536926ff91a.png)

我们有几个仓库、几辆公司配送车辆，以及 3 个需要跟踪的资产。我们的资产是承载货物的托盘，目标是了解：

- 资产（配备 tag）当前位于哪个具体仓库（配备 KNOT），以及它在特定仓库内停留了多长时间。
- 资产（配备 tag）是否在路上、在仓库之间运输，以及它在车辆（配备 KNOT）内停留了多长时间。
- **（可选）如果使用 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out) tag**，这段时间的温度是多少？也可以/改为监控可从广播的 [payload](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-Example) 中获取的其他参数，例如加速度。
- **（可选）** 获取 KNOT 的 GPS 位置。

要实现 Bluetooth 资产跟踪，只需在每个仓库安装 x1 KNOT，在每辆车安装 x1 KNOT，并在每个资产上安装 x1 tag。

可以看到 TAG 1 位于车辆内，而该车辆刚停在仓库附近。KNOT 1 和 KNOT 4 都会向服务器报告资产位于其范围内。这将表明资产已停放，但尚未开始运输。

可以看到 TAG 2 正在仓库之间运输，并且仅位于 KNOT 5 的 Bluetooth 范围内。在这种情况下，KNOT 5 将是唯一的报告者，服务器上显示的结果表示资产正在运输。

可以看到 TAG 3 位于仓库内。服务器将仅指示这一状态。

服务器上的数据将显示 KNOT 发送的每个报告的时间戳，据此可判断资产在特定设备的 Bluetooth 范围内停留了多长时间。

#### 配置 {#configuration-1}

在本示例中，将展示一个基础拓扑：2 个仓库、1 辆在两者之间行驶的车辆/卡车，以及 1 个资产/托盘/标签。

##### ThingsBoard 准备 {#thingsboard-preparation-1}

查看[此处](/docs/internet-of-things/mqtt/mqtt-and-thingsboard-configuration)的指南，了解如何设置 ThingsBoard 和 RouterOS 以使用 MQTT 通信。

:::tip
为简化说明，本示例将展示 [access-token](/docs/internet-of-things/mqtt/mqtt-and-thingsboard-configuration#access-token-scenario-1) 场景，但也可以使用其他可用选项。对于生产环境，建议使用 SSL-MQTT，因为非 SSL-MQTT 的数据包容易被捕获和检查。

要了解如何在通过 [container](/docs/containers) 运行的实例上实现 SSL-MQTT 通信，请查看[此处](/docs/containers/user-guides/container-thingsboard-mqtt-http-server)链接的指南（[Enabling HTTPS and SSL MQTT](/docs/containers/user-guides/container-thingsboard-mqtt-http-server#enabling-https-and-ssl-mqtt) 部分）。
:::

在 ThingsBoard GUI 中创建 3 个 KNOT，并将它们设为“gateways”。

进入“Devices”部分，点击“+”按钮和“Add new device”：

![](/img/c96c5c3c49271e3d.webp)

为设备命名，并勾选“Is gateway”选项：

![](/img/8b73d8a2454be8c6.webp)

对每台 KNOT 执行该操作：

![](/img/0915d2aa21abcaa2.webp)

在刚创建的设备下，于“Manage credentials”选项卡中为每台 KNOT 设置唯一的访问令牌（唯一凭据）：

![](/img/16bbaaab7d956481.webp)

##### RouterOS 配置 {#routeros-configuration-1}

###### 准备 {#preparation-1}

在继续之前，需要确认 Bluetooth 标签确实出现在 KNOT 的 Bluetooth 范围内，并且 KNOT 能检测到它。为此，可以执行命令 `/iot/bluetooth/scanners/advertisements/print`：

```ros
/iot/bluetooth/scanners/advertisements/print
 # DEVICE     PDU-TYPE        TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA                                           
 0 bt1        adv-noconn-ind  2023-03-08 12:35:15 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f090100b0110100ffff00000019d68d2300005d   
 1 bt1        adv-noconn-ind  2023-03-08 12:35:16 public       DC:2C:6E:0F:C0:3D        -39dBm         22 15ff4f0901008f3cfcfffbfffaff301783c22c000064   
 2 bt1        adv-noconn-ind  2023-03-08 12:35:35 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f09010084d500000400ffff0319ea8d2300005d   
 3 bt1        adv-noconn-ind  2023-03-08 12:35:45 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f090100e607faffffff03000319f48d2300005d   
```

也可以使用 [Webfig](/docs/management-tools/webfig) 或 [Winbox](/docs/management-tools/winbox)，在 IoT>Bluetooth>Advertising reports 选项卡下进行检查。

列表可能比较混乱。由于扫描器会捕获周围的所有内容，列表中可能出现随机载荷。为减少列表内容，可以使用标签的 MAC 地址进行过滤：`/iot/bluetooth/scanners/advertisements/print where address=DC:2C:6E:0F:C0:3D`：

```ros
/iot/bluetooth/scanners/advertisements/print where address=DC:2C:6E:0F:C0:3D
 # DEVICE    PDU-TYPE        TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA                                           
 0 bt1       adv-noconn-ind  2023-03-08 12:41:06 public       DC:2C:6E:0F:C0:3D        -49dBm         22 15ff4f0901005ab20100fdfffdff4017e1c32c000064   
 1 bt1       adv-noconn-ind  2023-03-08 12:41:26 public       DC:2C:6E:0F:C0:3D        -40dBm         22 15ff4f090100349704000000fcff4017f5c32c000064   
 2 bt1       adv-noconn-ind  2023-03-08 12:41:36 public       DC:2C:6E:0F:C0:3D        -49dBm         22 15ff4f09010073fb0000000000003017ffc32c000064   
 3 bt1       adv-noconn-ind  2023-03-08 12:41:46 public       DC:2C:6E:0F:C0:3D        -43dBm         22 15ff4f090100b88cffffffffffff401709c42c000064   
```

要了解如何解析有效载荷，请参阅指南[此处](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-Scriptfordecoding)。

###### MQTT 代理 {#mqtt-broker-1}

在每个 KNOT 上设置 MQTT broker。

对于 KNOT\_1：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=1883 username=knot-1_access_token
```

Where:

- `name` 是要为 broker 指定的名称，该名称将在脚本中后续使用。
- `address` 是 broker/ThingsBoard 服务器的 IP 地址。
- `port` 是 broker 监听的 TCP 端口 → 对于非 SSL，通常为 TCP 1883。
- `username` 由 MQTT broker 决定，在本例中，它是在 ThingsBoard 管理门户中生成的“access token”。

对于 KNOT\_2 和 KNOT\_3 → 执行相同步骤。只需将 `username` 更改为相应生成的 access token。

###### 脚本 {#script-1}

将下面显示的脚本导入每个 KNOT。为此，只需复制下面显示的“code”并粘贴到新的终端窗口中，然后按 <kbd>Enter</kbd>：

```ros
/system/script/add dont-require-permissions=no name=tracking owner=admin policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="# Required package\
    s: iot\r\
    \n\r\
    \n################################ Configuration ################################\r\
    \n# Name of an existing MQTT broker that should be used for publishing\r\
    \n:local broker \"tb\"\r\
    \n\r\
    \n# MQTT topic where the message should be published\r\
    \n:local topic \"v1/gateway/telemetry\"\r\
    \n\r\
    \n# POSIX regex for filtering advertisement Bluetooth addresses. E.g. \"^BC:33:AC\"\r\
    \n# would only include addresses which start with those 3 octets.\r\
    \n# To disable this filter, set it to \"\"\r\
    \n:local addressRegex \"\"\r\
    \n\r\
    \n# POSIX regex for filtering Bluetooth advertisements based on their data. Same\r\
    \n# usage as with 'addressRegex'.\r\
    \n:local advertisingDataRegex \"\"\r\
    \n\r\
    \n# Signal strength filter. E.g. -40 would only include Bluetooth advertisements\r\
    \n# whose signal strength is stronger than -40dBm.\r\
    \n# To disable this filter, set it to \"\"\r\
    \n:local rssiThreshold \"\"\r\
    \n\r\
    \n#Name the KNOT. Identity of the unit that will be sending the message. This name will be \
    reported to the MQTT broker.\r\
    \n:local gwName \"1\"\r\
    \n\r\
    \n################################## Bluetooth ##################################\r\
    \n:put (\"[*] Gathering Bluetooth info...\")\r\
    \n\r\
    \n:global makeRecord do={\r\
    \n    :local jsonStr \"{\\\"ts\\\":\$ts,\\\"values\\\":{\\\"KNOT_\$gwName\\\":\\\"\$gwName\
    \\\",\\\"rssi\\\":\$rssi}}\"\r\
    \n    :return \$jsonStr\r\
    \n}   \r\
    \n\r\
    \n# array of record strings collected for each advertising MAC address\r\
    \n:global macRecords [:toarray \"\"]\r\
    \n\r\
    \n# process advertisements and update macRecords\r\
    \n:local advertisements [/iot/bluetooth/scanners/advertisements/print detail as-value where\
    \_\\\r\
    \naddress ~ \$addressRegex and \\\r\
    \ndata ~ \$advertisingDataRegex and \\\r\
    \nrssi > \$rssiThreshold]\r\
    \n\r\
    \n/iot/bluetooth/scanners/advertisements/clear\r\
    \n\r\
    \n:foreach adv in=\$advertisements do={\r\
    \n:local address (\$adv->\"address\")\r\
    \n:local rssi (\$adv->\"rssi\")\r\
    \n:local epoch (\$adv->\"epoch\")\r\
    \n                \r\
    \n:local recordStr [\$makeRecord ts=\$epoch gwName=\$gwName rssi=\$rssi]\r\
    \n\r\
    \n:if ([:len (\$macRecords->\$address)] > 0) do={\r\
    \n:local str (\$macRecords->\$address)\r\
    \n:local newStr \"\$str,\$recordStr\"\r\
    \n:set (\$macRecords->\$address) \$newStr} else={:set (\$macRecords->\$address) \$recordStr\
    }}\r\
    \n\r\
    \n# TODO: add some logic to decide when we want to send data\r\
    \n:local sendData true\r\
    \n\r\
    \n:if (\$sendData) do={\r\
    \n:local jsonStr \"{\"\r\
    \n\r\
    \n:foreach addr,advRec in=\$macRecords do={\r\
    \n:set jsonStr \"\$jsonStr\\\"\$addr\\\":[\$advRec],\"}\r\
    \n\r\
    \n:local payloadlength\r\
    \n:set payloadlength [:len (\$jsonStr)]\r\
    \n:local remcom\r\
    \n:set remcom [:pick \$jsonStr 0 (\$payloadlength-1)]\r\
    \n:set jsonStr \"\$remcom}\"\r\
    \n:local message\r\
    \n:set message \"\$jsonStr\"\r\
    \n:log info \"\$message\";\r\
    \n:put (\"[*] Message structured: \$message\")\r\
    \n:put (\"[*] Total message size: \$[:len \$message] bytes\")\r\
    \n:put (\"[*] Sending message to MQTT broker...\")\r\
    \n/iot/mqtt/publish broker=\"\$broker\" topic=\"\$topic\" message=\$message}"
```

脚本应显示在“System>Scripts>Script List”选项卡中，名称为“tracking”，也可使用命令 `/system/script/print` 查看。

有几行脚本需要特别注意。

Broker 名称配置行，需要输入已设置的 MQTT broker 名称：

>      :local broker "tb"

需要输入 MQTT broker 使用的正确 topic。详情请参阅 [ThingsBoard documentation](https://thingsboard.io/docs/reference/gateway-mqtt-api/)，默认情况下 topic 应为：

>      :local topic "v1/gateway/telemetry"

脚本内部的 MAC 地址过滤选项。可以输入 MAC 地址的全部 6 个八位组（将过滤应用于 1 个特定标签），也可以使用几个八位组过滤列表，例如 "^BC:33:AC"（应用过滤后，仅处理以 "BC:33:AC:..." 开头的 MAC 地址）：

>     :local addressRegex "DC:2C:6E:0F:C0:3D"

有效内容/数据行。允许按特定有效内容过滤列表，例如“[manufacturer data](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-MikroTikPDUPayloadstructure)”。例如，“15ff4f09”将丢弃所有非 MikroTik 格式的有效内容：

>     :local advertisingDataRegex "15ff4f09"

RSSI 信号强度过滤选项。该过滤选项已在“[场景说明](#scenario-explanation)”部分中提及。该过滤器可忽略 RSSI 弱于配置值的任何有效内容。例如，“-40”将仅包含信号强度强于 -40dBm 的 Bluetooth 广播：

>     :local rssiThreshold "-40"

KNOT 标识符行。对于每个不同的 KNOT，都需要修改该行。例如，将第一个 KNOT 的 ID 设为“1”，第二个 KNOT 设为“2”，第三个 KNOT 设为“3”：

> :local gwName "1"

脚本的其余部分无需更改或修改

运行脚本时，脚本如何工作？脚本使用所应用的过滤器“检查”“Advertising reports”选项卡（有效内容列表选项卡），并构造 JSON 消息。JSON 消息示例如下：

```
{
  "2C:C8:1B:4B:BB:0A": [
    {
      "ts": 1680526087729,
      "values": {
        "KNOT_1": "1",
        "rssi": -47
      }
    }
  ],
  "DC:2C:6E:0F:C0:3D": [
    {
      "ts": 1680526065000,
      "values": {
        "KNOT_1": "1",
        "rssi": -49
      }
    },
    {
      "ts": 1680526075001,
      "values": {
        "KNOT_1": "1",
        "rssi": -50
      }
    }
  ]
}
```

数据按照 [ThingsBoard guide](https://thingsboard.io/docs/reference/gateway-mqtt-api/#telemetry-upload-api) 组织，其中 `2C:C8:1B:4B:BB:0A` 和 `DC:2C:6E:0F:C0:3D` 是出现在 KNOT 范围内的标签的 MAC 地址，`ts` 是标签广播的每个 payload 的 Unix 时间戳（以毫秒为单位），`KNOT_X` 表示发送该消息的具体 KNOT，`rssi` 是标签广播的每个 payload 的信号强度（以 dBm 为单位）。

在“搜索”payload 列表并组织 JSON 消息后，Bluetooth 接口的 payload 列表会被“清理”（或“刷新”），此前组织好的 JSON 消息会发送到 ThingsBoard MQTT broker。

要运行该脚本，请使用以下命令：

```ros
/system/script/run tracking
```

**包含温度数据的脚本（可选）**

如果希望向结构化消息中添加温度报告，请使用以下脚本：

```ros
/system/script/add dont-require-permissions=no name=tracking+temp owner=admin policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="# Required package\
    s: iot\r\
    \n\r\
    \n################################ Configuration ################################\r\
    \n# Name of an existing MQTT broker that should be used for publishing\r\
    \n:local broker \"tb\"\r\
    \n\r\
    \n# MQTT topic where the message should be published\r\
    \n:local topic \"v1/gateway/telemetry\"\r\
    \n\r\
    \n# POSIX regex for filtering advertisement Bluetooth addresses. E.g. \"^BC:33:AC\"\r\
    \n# would only include addresses which start with those 3 octets.\r\
    \n# To disable this filter, set it to \"\"\r\
    \n:local addressRegex \"\"\r\
    \n\r\
    \n# POSIX regex for filtering Bluetooth advertisements based on their data. Same\r\
    \n# usage as with 'addressRegex'.\r\
    \n:local advertisingDataRegex \"\"\r\
    \n\r\
    \n# Signal strength filter. E.g. -40 would only include Bluetooth advertisements\r\
    \n# whose signal strength is stronger than -40dBm.\r\
    \n# To disable this filter, set it to \"\"\r\
    \n:local rssiThreshold \"\"\r\
    \n\r\
    \n#Name the KNOT. Identity of the unit that will be sending the message. This name will be \
    reported to the MQTT broker.\r\
    \n:local gwName \"1\"\r\
    \n\r\
    \n################################## Bluetooth ##################################\r\
    \n:global invertU16 do={\r\
    \n    :local inverted 0\r\
    \n    :for idx from=0 to=15 step=1 do={\r\
    \n        :local mask (1 << \$idx)\r\
    \n        :if (\$1 & \$mask = 0) do={\r\
    \n            :set \$inverted (\$inverted | \$mask)\r\
    \n        }\r\
    \n    }\r\
    \n    return \$inverted\r\
    \n}\r\
    \n\r\
    \n:global le16ToHost do={\r\
    \n    :local lsb [:pick \$1 0 2]\r\
    \n    :local msb [:pick \$1 2 4]\r\
    \n\r\
    \n    :return [:tonum \"0x\$msb\$lsb\"]\r\
    \n}\r\
    \n:local from88 do={\r\
    \n    :global invertU16\r\
    \n    :global le16ToHost\r\
    \n    :local num [\$le16ToHost \$1]\r\
    \n\r\
    \n    # Handle negative numbers\r\
    \n    :if (\$num & 0x8000) do={\r\
    \n        :set num (-1 * ([\$invertU16 \$num] + 1))\r\
    \n    }\r\
    \n\r\
    \n    # Convert from 8.8. Scale by 1000 since floating point is not supported\r\
    \n    :return ((\$num * 125) / 32)\r\
    \n}\r\
    \n:put (\"[*] Gathering Bluetooth info...\")\r\
    \n\r\
    \n:global makeRecord do={\r\
    \n    :local jsonStr \"{\\\"ts\\\":\$ts,\\\"values\\\":{\\\"KNOT_\$gwName\\\":\\\"\$gwName\
    \\\",\\\"temp\\\":\$temp}}\"\r\
    \n    :return \$jsonStr\r\
    \n}   \r\
    \n\r\
    \n# array of record strings collected for each advertising MAC address\r\
    \n:global macRecords [:toarray \"\"]\r\
    \n\r\
    \n# process advertisements and update macRecords\r\
    \n:local advertisements [/iot/bluetooth/scanners/advertisements/print detail as-value where\
    \_\\\r\
    \naddress ~ \$addressRegex and \\\r\
    \ndata ~ \$advertisingDataRegex and \\\r\
    \nrssi > \$rssiThreshold]\r\
    \n\r\
    \n/iot/bluetooth/scanners/advertisements/clear\r\
    \n\r\
    \n:foreach adv in=\$advertisements do={\r\
    \n:local address (\$adv->\"address\")\r\
    \n:local ad (\$adv->\"data\")\r\
    \n:local rssi (\$adv->\"rssi\")\r\
    \n:local epoch (\$adv->\"epoch\")\r\
    \n:local temp [\$from88 [:pick \$ad 28 32]]\r\
    \n                \r\
    \n:local recordStr [\$makeRecord ts=\$epoch gwName=\$gwName temp=\$temp]\r\
    \n\r\
    \n:if ([:len (\$macRecords->\$address)] > 0) do={\r\
    \n:local str (\$macRecords->\$address)\r\
    \n:local newStr \"\$str,\$recordStr\"\r\
    \n:set (\$macRecords->\$address) \$newStr} else={:set (\$macRecords->\$address) \$recordStr\
    }}\r\
    \n\r\
    \n# TODO: add some logic to decide when we want to send data\r\
    \n:local sendData true\r\
    \n\r\
    \n:if (\$sendData) do={\r\
    \n:local jsonStr \"{\"\r\
    \n\r\
    \n:foreach addr,advRec in=\$macRecords do={\r\
    \n:set jsonStr \"\$jsonStr\\\"\$addr\\\":[\$advRec],\"}\r\
    \n\r\
    \n:local payloadlength\r\
    \n:set payloadlength [:len (\$jsonStr)]\r\
    \n:local remcom\r\
    \n:set remcom [:pick \$jsonStr 0 (\$payloadlength-1)]\r\
    \n:set jsonStr \"\$remcom}\"\r\
    \n:local message\r\
    \n:set message \"\$jsonStr\"\r\
    \n:log info \"\$message\";\r\
    \n:put (\"[*] Message structured: \$message\")\r\
    \n:put (\"[*] Total message size: \$[:len \$message] bytes\")\r\
    \n:put (\"[*] Sending message to MQTT broker...\")\r\
    \n/iot/mqtt/publish broker=\"\$broker\" topic=\"\$topic\" message=\$message}"
```

在这种情况下，JSON 消息如下所示：

```
{
  "2C:C8:1B:4B:BB:0A": [
    {
      "ts": 1680527467840,
      "values": {
        "KNOT_1": "1",
        "temp": 26460
      }
    }
  ],
  "DC:2C:6E:0F:C0:3D": [
    {
      "ts": 1680527464996,
      "values": {
        "KNOT_1": "1",
        "temp": 24750
      }
    },
    {
      "ts": 1680527474996,
      "values": {
        "KNOT_1": "1",
        "temp": 24750
      }
    }
  ]
}
```

:::note
由于不支持浮点数 → 小数点后的每次计算都会“向上取整”为整数。因此，脚本将计算**按 1000 缩放**（乘以 **1000**）的温度和加速度值。  
因此，如果看到温度为 **temp=24750**，实际温度为 **24.750 C**。要添加小数点，需要在服务器端对结果进行额外的“转换”，或在 RouterOS 侧使用额外脚本，这会增加设备的 CPU 使用率。
:::

###### 包含 GPS 数据的脚本（可选） {#script-that-includes-gps-data-optional}

如果您还希望包含 GPS 数据（来自 KNOT 的经度 and 纬度值），请使用下方脚本：

```ros
/system/script/add dont-require-permissions=no name=tracking+gps+temp owner=admin policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="# Required package\
    s: iot\r\
    \n\r\
    \n################################ Configuration ################################\r\
    \n# Name of an existing MQTT broker that should be used for publishing\r\
    \n:local broker \"tb\"\r\
    \n\r\
    \n# MQTT topic where the message should be published\r\
    \n:local topic \"v1/gateway/telemetry\"\r\
    \n:local gwtopic \"v1/devices/me/telemetry\"\r\
    \n\r\
    \n# POSIX regex for filtering advertisement Bluetooth addresses. E.g. \"^BC:33:AC\"\r\
    \n# would only include addresses which start with those 3 octets.\r\
    \n# To disable this filter, set it to \"\"\r\
    \n:local addressRegex \"\"\r\
    \n\r\
    \n# POSIX regex for filtering Bluetooth advertisements based on their data. Same\r\
    \n# usage as with 'addressRegex'.\r\
    \n:local advertisingDataRegex \"15ff\"\r\
    \n\r\
    \n# Signal strength filter. E.g. -40 would only include Bluetooth advertisements\r\
    \n# whose signal strength is stronger than -40dBm.\r\
    \n# To disable this filter, set it to \"\"\r\
    \n:local rssiThreshold \"\"\r\
    \n\r\
    \n#Name the KNOT. Identity of the unit that will be sending the message. This name will be \
    reported to the MQTT broker.\r\
    \n:local gwName \"2\"\r\
    \n\r\
    \n###########GPS#############\r\
    \n:global lat\r\
    \n:global lon\r\
    \n\r\
    \n/interface/ppp-client/set ppp-out1 disabled=yes\r\
    \n:log info (\"disabling WWAN to get GPS coordinates\")\r\
    \n\r\
    \n/interface/ppp-client/at-chat ppp-out1 input=\"AT+QGPSCFG=\\\"priority\\\",0\"\r\
    \n:log info (\"enabling priority for GPS\")\r\
    \n\r\
    \n###the time in the delay below is the time that the device will wait for to get the coord\
    inate fix\r\
    \n:delay 32000ms\r\
    \n:log info (\"reading GPS coordinates\")\r\
    \n/system/gps/monitor once do={\r\
    \n:set \$lat \$(\"latitude\")\r\
    \n:set \$lon \$(\"longitude\")\r\
    \n}\r\
    \n:if (\$lat != \"none\") do={\\\r\
    \n:log info (\"enabling priority back to WWAN\")\r\
    \n/interface/ppp-client/at-chat ppp-out1 input=\"AT+QGPSCFG=\\\"priority\\\",1\"\r\
    \n:log info (\"enabling WWAN\")\r\
    \n/interface/ppp-client/set ppp-out1 disabled=no\r\
    \n:delay 1000ms\r\
    \n###if dial on demand is enabled\r\
    \n/ping 1.1.1.1 count=1\r\
    \n\r\
    \n#the delay below waits for 5 seconds for the ppp connection to get established - this tim\
    e can differ based on the signal strength\r\
    \n:delay 5000ms\r\
    \n:log info (\"posting coordinates via mqtt\")\r\
    \n:local gpsmessage \\\r\
    \n    \"{\\\"latitude\\\":\$lat,\\\r\
    \n    \\\"longitude\\\":\$lon}\"\r\
    \n/iot/mqtt/publish broker=\$broker topic=\$gwtopic message=\$gpsmessage} else={\\\r\
    \n:log info (\"could not read GPS coordinates...enabling back WWAN\")\r\
    \n/interface/ppp-client/at-chat ppp-out1 input=\"AT+QGPSCFG=\\\"priority\\\",1\"\r\
    \n/interface/ppp-client/set ppp-out1 disabled=no\r\
    \n:delay 1000ms\r\
    \n###if dial on demand is enabled\r\
    \n/ping 1.1.1.1 count=1\r\
    \n:delay 5000ms\r\
    \n}\r\
    \n\r\
    \n##################################Bluetooth##################################\r\
    \n:global invertU16 do={\r\
    \n    :local inverted 0\r\
    \n    :for idx from=0 to=15 step=1 do={\r\
    \n        :local mask (1 << \$idx)\r\
    \n        :if (\$1 & \$mask = 0) do={\r\
    \n            :set \$inverted (\$inverted | \$mask)\r\
    \n        }\r\
    \n    }\r\
    \n    return \$inverted\r\
    \n}\r\
    \n\r\
    \n:global le16ToHost do={\r\
    \n    :local lsb [:pick \$1 0 2]\r\
    \n    :local msb [:pick \$1 2 4]\r\
    \n\r\
    \n    :return [:tonum \"0x\$msb\$lsb\"]\r\
    \n}\r\
    \n:local from88 do={\r\
    \n    :global invertU16\r\
    \n    :global le16ToHost\r\
    \n    :local num [\$le16ToHost \$1]\r\
    \n\r\
    \n    # Handle negative numbers\r\
    \n    :if (\$num & 0x8000) do={\r\
    \n        :set num (-1 * ([\$invertU16 \$num] + 1))\r\
    \n    }\r\
    \n\r\
    \n    # Convert from 8.8. Scale by 1000 since floating point is not supported\r\
    \n    :return ((\$num * 125) / 32)\r\
    \n}\r\
    \n:put (\"[*] Gathering Bluetooth info...\")\r\
    \n\r\
    \n:global makeRecord do={\r\
    \n    :local jsonStr \"{\\\"ts\\\":\$ts,\\\"values\\\":{\\\"KNOT_\$gwName\\\":\\\"\$gwName\
    \\\",\\\"temp\\\":\$temp}}\"\r\
    \n    :return \$jsonStr\r\
    \n}   \r\
    \n\r\
    \n# array of record strings collected for each advertising MAC address\r\
    \n:global macRecords [:toarray \"\"]\r\
    \n\r\
    \n# process advertisements and update macRecords\r\
    \n:local advertisements [/iot/bluetooth/scanners/advertisements/print detail as-value where\
    \_\\\r\
    \naddress ~ \$addressRegex and \\\r\
    \ndata ~ \$advertisingDataRegex and \\\r\
    \nrssi > \$rssiThreshold]\r\
    \n\r\
    \n/iot/bluetooth/scanners/advertisements/clear\r\
    \n\r\
    \n:foreach adv in=\$advertisements do={\r\
    \n:local address (\$adv->\"address\")\r\
    \n:local ad (\$adv->\"data\")\r\
    \n:local rssi (\$adv->\"rssi\")\r\
    \n:local epoch (\$adv->\"epoch\")\r\
    \n:local temp [\$from88 [:pick \$ad 28 32]]\r\
    \n                \r\
    \n:local recordStr [\$makeRecord ts=\$epoch gwName=\$gwName temp=\$temp]\r\
    \n\r\
    \n:if ([:len (\$macRecords->\$address)] > 0) do={\r\
    \n:local str (\$macRecords->\$address)\r\
    \n:local newStr \"\$str,\$recordStr\"\r\
    \n:set (\$macRecords->\$address) \$newStr} else={:set (\$macRecords->\$address) \$recordStr\
    }}\r\
    \n\r\
    \n# TODO: add some logic to decide when we want to send data\r\
    \n:local sendData true\r\
    \n\r\
    \n:if (\$sendData) do={\r\
    \n:local jsonStr \"{\"\r\
    \n\r\
    \n:foreach addr,advRec in=\$macRecords do={\r\
    \n:set jsonStr \"\$jsonStr\\\"\$addr\\\":[\$advRec],\"}\r\
    \n\r\
    \n:local payloadlength\r\
    \n:set payloadlength [:len (\$jsonStr)]\r\
    \n:local remcom\r\
    \n:set remcom [:pick \$jsonStr 0 (\$payloadlength-1)]\r\
    \n:set jsonStr \"\$remcom}\"\r\
    \n:local message\r\
    \n:set message \"\$jsonStr\"\r\
    \n:log info \"\$message\";\r\
    \n:put (\"[*] Message structured: \$message\")\r\
    \n:put (\"[*] Total message size: \$[:len \$message] bytes\")\r\
    \n:put (\"[*] Sending message to MQTT broker...\")\r\
    \n/iot/mqtt/publish broker=\"\$broker\" topic=\"\$topic\" message=\$message}"
```

此时需要记住 [BG77 modem behavior](https://help.mikrotik.com/docs/display/UM/WWAN+and+GNSS+priority+automatization) → BG77 蜂窝调制解调器（用于 KNOT）无法同时进行持续的蜂窝 CAT-M/NB-IoT 连接并获取 GPS 坐标。

运行脚本时：

- PPP 接口被禁用，并为 GPS 接收设置最高优先级（蜂窝 PPP 接口处于 down 状态时）32 秒（该时间可在脚本中修改）。
- （a）如果设备在配置的 32 秒内成功获取 GPS 纬度值（获取的值不等于“none”），脚本将使用捕获的纬度和经度值构造 JSON 消息，为 WWAN 设置最高优先级（将优先级从 GPS 更改为 WWAN），并重新启用 PPP 接口（用于访问互联网）。之后，脚本将通过第一次 MQTT publish 发送 GPS 数据 JSON 消息，并运行 Bluetooth 部分，在该部分构造 Bluetooth 数据 JSON 消息并通过第二次 MQTT publish 发送（共发送 x2 条 MQTT 消息 → GPS 数据 MQTT 消息和 Bluetooth 数据 MQTT 消息）。
- （b）如果设备在 32 秒间隔内未能获取 GPS 纬度值（获取的值等于“none”），脚本会为 WWAN 设置最高优先级（将优先级从 GPS 更改为 WWAN），重新启用 PPP 接口（用于访问互联网），并仅处理 Bluetooth 部分，在该部分构造 Bluetooth 数据 JSON 消息并通过 MQTT publish 发送（基本上，如果无法获取 GPS 数据，则发送 x1 条包含 Bluetooth 数据的 MQTT 消息）。

###### 计划任务 {#scheduler-1}

为脚本应用调度器，使 RouterOS 定期自行启动脚本：

```ros
/system/scheduler/add name=bluetoothscheduler interval=50s on-event="/system/script/run tracking"
```

可以设置较短和较长的间隔。如果希望更频繁地发送数据，使数据“更新” → 设置较短的时间间隔（10-15 秒）。如果希望减少消息数量、降低发送频率 → 可以设置较长的时间间隔（30min+）。

使用脚本构造的 JSON 消息为每个接收到的 payload 分配一个 `ts` 值（时间戳）。这意味着，**当脚本运行**时，例如**每分钟**运行一次，使用 1 个 tag，并且**该 tag 广播**每 10 秒 1 个 payload（即**每分钟 6 个 payload**）→ ThingsBoard 数据（GUI）将每分钟更新一次，并且每分钟会出现 6 条新记录（每条记录将指示其在上一条记录之后 10 秒被接收）。如果使用 1 个每 10 秒广播一个 payload 的 tag（即每 15 分钟 6\*15=90 个 payload）并每 15 分钟发送一次消息 → ThingsBoard 数据（GUI）将每 15 分钟更新一次，但会出现 90 条记录。

#### ThingsBoard 数据可视化和结果验证 {#thingsboard-data-visualization-and-result-verification-1}

使用 `/system/script/run tracking` 或通过调度器运行脚本并刷新 GUI 门户后 → JSON 消息中找到的所有 MAC 地址（标签）都将在 ThingsBoard GUI 下创建为新设备：

![](/img/b85bc55bbf5af1aa.webp)

为帮助可视化数据，可以使用内置 [widgets](https://thingsboard.io/docs/user-guide/ui/widget-library/) 或创建自己的 widget。

从设备列表中选择标签的 MAC 地址，进入“Latest telemetry”部分，选择希望监控的 KNOT ID，然后点击“Show on widget”按钮：

![](/img/2aba39a24468b22e.webp)

选择希望使用的 widget，例如“Charts”组下的“Timeseries Bar Chart”，然后点击“Add to dashboard”：

![](/img/0eadc5f212d7258e.webp)

创建新仪表板并按需要命名。点击“Add”：

![](/img/4af97b4887f17f88.webp)

将 widget 的“Timewindow”从“Realtime-last minute”（默认使用）更改为“Realtime-last 5 hours”，并禁用“data aggregation function”（选择“none”）：

![](/img/dd359217e9a9672c.webp)

为帮助更好地可视化结果，编辑 widget，然后编辑每个“KNOT\_X”参数/键。为每个键启用“Show points”复选框：

![](/img/a3b7272e4807b355.webp)

有关更多可用选项，请查看 ThingsBoard widget [指南](https://thingsboard.io/docs/user-guide/ui/chart-widget/#timeseries-bar-chart)。

最终结果如下所示：

![](/img/bc771871ad8da5bb.webp)

根据该仪表板，可以判断：

- 从约 11:00 到约 11:30，资产位于 KNOT\_1 蓝牙范围内（仓库 #1 内）。
- 从约 11:30 到约 11:35，资产被转移到停在仓库附近的车辆（KNOT\_2）上（标签同时位于两个 KNOT 的范围内）。
- 从约 11:35 到约 12:00，标签位于卡车（KNOT\_2）内，正在前往另一个仓库。
- 从约 12:00 到约 12:05，资产停在仓库 #2 外，同时位于 KNOT\_2 和 KNOT\_3 的范围内。
- 从约 12:05 到 12:30，资产存放在仓库 #2 内（KNOT\_3）。
- 从约 12:30 起，标签再次上路，位于卡车（KNOT\_2）内。

##### 温度可视化（可选） {#temperature-visualization-optional}

从设备列表中选择标签的 MAC 地址，进入“Latest telemetry”部分，勾选 `temp` 参数，然后点击“Show on widget”按钮：

![](/img/9bab51d0ecf1d3f3.webp)

选择要使用的 widget，例如“Charts”捆绑包下的“Timeseries Line Chart”。点击“Add to dashboard”，然后选择要添加该 widget 的仪表板。

结果如下所示：

![](/img/d3abc7e9e479239e.webp)

现在，你还有一个额外的图表，用于显示标签温度在不同时间间隔内的变化。

##### GPS 坐标可视化（可选） {#gps-coordinate-visualization-optional}

根据 [包含 GPS 数据的脚本](#script-that-includes-gps-data-optional) 部分中的脚本，该脚本会发送 x2 MQTT 消息。每条消息都会发送到不同的 MQTT 主题。GPS 坐标消息将发布到名为“v1/devices/me/telemetry”的主题，而蓝牙数据将发布到名为“v1/gateway/telemetry”的主题。坐标可在 ThingsBoard 设备列表中对应网关下查看：

![](/img/60ce4ad341008aa9.webp)

勾选“latitude”和“longitude”参数，点击“Show on widget button”，将“Current bundle”设置为“Maps”，然后选择“Route Map - OpenStreetMap”组件：

![](/img/75eb9bc9563359ff.webp)

最后，点击“Add to dashboard”按钮，并选择要在其中显示该组件的仪表板。

将 3 个组件添加到 1 个仪表板后（温度折线图、Bluetooth reporter 条形图和 GPS 坐标地图），你将得到类似以下结果：

![](/img/c81d00920bd300cf.webp)

- 你将获得一个显示温度变化的图表（标签周围的温度）。
- 你将获得一个图表，用于指示哪个特定 KNOT 发送了报告，从而告诉你标签当前位于哪个 KNOT 的蓝牙范围内。
- 你将获得一张地图，用于显示 KNOT 的 GPS 位置。
