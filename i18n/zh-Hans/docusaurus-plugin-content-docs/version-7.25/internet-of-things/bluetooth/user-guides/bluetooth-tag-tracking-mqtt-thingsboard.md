---
sidebar_key: "internet-of-things/bluetooth/user-guides/bluetooth-tag-tracking-mqtt-thingsboard"
sidebar_position: 1
title: "使用 MQTT 和 ThingsBoard 进行蓝牙标签追踪"
sidebar_label: "使用 MQTT 和 ThingsBoard 进行蓝牙标签追踪"
description: "本页介绍使用 MikroTik RouterOS 结合 MQTT 和 ThingsBoard 进行蓝牙标签跟踪，详细说明 KNOT 设备如何捕获蓝牙广播数据包、将其处理为 MQTT 消息，并在 ThingsBoard 中可视化，以跟踪资产在多个区域间的移动。"
tags:
  - 'bluetooth'
  - 'mqtt'
  - 'thingsboard'
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/user-guides/bluetooth-tag-tracking-mqtt-thingsboard
captured_at: '2026-11-04T11:22:30+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 中的 Bluetooth 接口实现允许设备捕获通过 37、38 和 39 广播信道广播的 Bluetooth 广播数据包。更多信息请参见[此处指南](../index.md)。

Bluetooth 标签，例如 [TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) 和 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out)，正是这样做的。它们通过上述信道广播广播负载。要了解负载中存储了哪些类型的信息，请务必查看[链接](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-MikroTikPDUPayloadstructure)。可以使用 [MikroTik Beacon Manager](https://help.mikrotik.com/docs/display/UM/MikroTik+Beacon+Manager) 应用配置这些标签，使其按间隔和/或在检测到移动、倾斜或自由落体触发时自动广播负载。简单来说，标签会定期向周围所有 Bluetooth 扫描器（例如 [KNOT](https://mikrotik.com/product/knot)）“告知”（广播）有关自身的信息。

当标签广播负载，并且标签位于 KNOT 的 Bluetooth 工作范围内时，KNOT 将捕获该负载，并在其 "scanner" Bluetooth 接口部分下显示。如下所示：

```ros
/iot/bluetooth/scanners/advertisements/print
Columns: DEVICE, PDU-TYPE, TIME, ADDRESS-TYPE, ADDRESS, RSSI, LENGTH, DATA
#  DEVICE  PDU-TYPE        TIME                  ADDRESS-TYPE  ADDRESS            RSSI    LENGTH  DATA                                        
0  bt1     adv-noconn-ind  2023-03-07 12:11:57  public        DC:2C:6E:0F:C0:3D  -51dBm      22  15ff4f09010079100000ffff0000cf188a6b2b000064
1  bt1     adv-noconn-ind  2023-03-07 12:11:58  public        2C:C8:1B:4B:BB:0A  -49dBm      22  15ff4f090100168dfefffffffeffa51ae1362200005e 
```

上面的示例表明，KNOT 在其工作范围内看到两个 Bluetooth 标签，MAC 地址分别为 "DC:2C:6E:0F:C0:3D" 和 "2C:C8:1B:4B:BB:0A"，以及它们各自的负载（"DATA" 字段）和信号强度（"RSSI" 字段）。

:::info
在本地测试 KNOT 能处理多少负载时，我们取得了以下结果 → 在 300 个标签（处于出厂设置）分散在 KNOT 周围，并使用 Bluetooth 过滤器 "keep-newest"（它会用最新负载覆盖每个唯一 MAC 地址之前收到的负载，因此 Bluetooth 列表在任何时候都会为每个唯一标签 MAC 地址显示 1 个负载）的情况下，所有 300 个 MAC 地址在 30-40 秒后出现在 KNOT 的范围内。这里需要记住，所有 300 个标签同时在同一信道上广播会造成干扰（接收延迟）。当我们“清空”Bluetooth 负载列表时，列表每秒新增 20 个条目，大约 ~15 秒后，列表中有 250-290 个负载。然后再过 ~15 秒，列表显示了所有 300 个唯一标签负载。**你的 KNOT 实际能够处理的标签数量在很大程度上取决于环境，因此最好在现场进行测试。**
:::

借助 RouterOS [脚本](../../../developer-guides/scripting/index.md) 和[调度](../../../system-information-and-utilities/scheduler.md)，我们可以让 KNOT 自动定期扫描负载列表；如果列表中找到了特定负载或特定标签的 MAC 地址，我们就可以让 KNOT 构造一条 MQTT 消息（根据上面示例中显示的打印信息），并通过 [MQTT](../../mqtt/index.md)、[电子邮件](../../../system-information-and-utilities/e-mail.md) 或 [HTTP](../../../system-information-and-utilities/fetch.md) POST 将其发送到已配置的服务器。脚本示例将在本指南后面展示。

正如标题所示，目标是实现一个 **Bluetooth 标签跟踪解决方案**，思路非常简单。**当你有 2 个 KNOT**（KNOT-A 和 KNOT-B），在调度器上运行相同的脚本，**并且标签在它们的 Bluetooth 工作范围之间移动时**，**服务器上的数据将指示**是 **KNOT-A 还是 KNOT-B** **发送了**该标签的**负载**。这将帮助你判断标签的远近，即标签是在 KNOT-A 区域还是 KNOT-B 区域广播负载。

你将需要一台用于存储和可视化数据的服务器。在本指南中，我们将展示一个名为 [ThingsBoard](https://thingsboard.io/) 的平台，以及如何使用 MQTT 协议与其通信。

ThingsBoard 有云解决方案和不同的本地安装选项（适用于不同操作系统）。由于我们添加了 [container](../../../containers/index.md) 功能，现在也可以在 RouterOS 内运行该平台。为此，你需要一台 RouterOS 设备，至少有 2 GB 可用 RAM，或者在最小负载下有 1 GB 可用 RAM，具备增加存储的选项（例如额外的 USB 端口），并且是 ARM64 或 AMD64 架构。可以考虑使用 [CHR](../../../getting-started/routeros-licensing/chr/index.md) 机器，它可能很合适。

### 设置要求 {#setup-requirements}

- 一台正在运行的 ThingsBoard 服务器。
- 2 台以上 [KNOT](https://mikrotik.com/product/knot)，可通过以太网、Wi-Fi 或蜂窝连接访问服务器网络（所需单元数量取决于需要覆盖的区域大小）。
- 1 个以上 Bluetooth [TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) 和/或 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out) 标签（取决于你需要跟踪多少资产——每个资产 1 个标签）。

## 场景说明 {#scenario-explanation}

让我们先看一个基本示例。我们有 2 个 KNOT（KNOT-A 和 KNOT-B）。我们在自己的环境中测试了 Bluetooth 范围，并确认两个 KNOT 都能在 70 米距离捕获标签。如果我们将 KNOT-A 和 KNOT-B 安装在相距 140 米的位置，它们的 Bluetooth 范围将不会重叠，或只会轻微重叠。当标签移动到 KNOT-A 范围内 → 被监控标签的负载将出现在 Bluetooth 扫描器列表中 → 脚本将按设定的计划启动 → 带有报告的 MQTT 消息将发送到服务器 → 最后，服务器将显示标签位于 KNOT-A 区域。当标签移动到 KNOT-B 范围内时，同样的事情会发生，服务器将显示标签位于 KNOT-B 区域内。

实际的 Bluetooth 工作距离会因现场而异，因为许多不同因素都会影响它，例如 2.4 GHz 干扰或所用周围材料。例如，在无干扰的视距条件下，KNOT 能够捕获标签广播负载的距离可达 180 米（KNOT — ~180 米 — TG-BT5-OUT）。但你也必须记住，距离越远，途中丢失的数据包就越多。在办公环境中，范围可能降至 30-100 米。

从逻辑上讲，如果 Bluetooth 工作范围重叠，并且标签位于重叠区域内（同时处于 KNOT-A 和 KNOT-B 的 Bluetooth 范围内），两个 KNOT 都会发送数据，服务器将显示标签同时被两个设备报告。

**当然，会出现两个或多个 KNOT 的 Bluetooth 范围重叠的区域，你可以利用这一点**。基本上，你将获得信息：标签当前位于特定 KNOT 区域之间 Bluetooth 范围的边缘。换句话说，当资产移动到重叠区域时，服务器上的信息会显示该资产位于两个 KNOT 工作范围之间的某个位置，这是有用的信息，**因为它提供了更高的精度**。

此外，**可以使用 [Tx power](https://help.mikrotik.com/docs/display/UM/MikroTik+Beacon+Manager+for+Android+devices#heading-TxPower) 参数降低标签的输出功率**。这意味着，即使标签的负载广播得太远，并被其他本不应看到这些负载的 KNOT 捕获（在更远距离）→ 你也可以降低标签的输出功率，这会缩短 KNOT 能够捕获它们的距离。这样，你就可以“调整”接收“范围”，并避免“干扰”其他区域的信号。

我们准备的脚本还允许你设置一个过滤器（稍后会展示），该过滤器会让 KNOT 忽略扫描器捕获的负载，除非信号强度（RSSI）强于指定值。在上面“[简介](../index.md)”部分下显示的 Bluetooth 扫描器示例打印中，我们可以看到 KNOT 看到其中一个标签的 **RSSI** 信号强度为 **-51 dBm**（MAC 地址为 "**DC:2C:6E:0F:C0:3D**" 的标签），另一个标签的 **RSSI** 信号强度为 **-49 dBm**（MAC 地址为 "**2C:C8:1B:4B:BB:0A**" 的标签）。因此，**如果我们**在脚本中应用过滤器，**忽略**所有接收到的信号强度（**RSSI**）**弱于 -50 dBm** 的负载，那么我们的 **KNOT 将报告只有标签 "2C:C8:1B:4B:BB:0A" 位于 Bluetooth 范围内**，因为它的 RSSI 为 -49 dBm，而第二个标签（RSSI 为 -51 dBm）将被忽略。本质上，这意味着第二种“调整”接收“范围”的方法。实际信号强度会因不同位置而异（如前所述，因为干扰和周围材料），因此需要在现场进行测试。

### 示例 #1 {#example-1}

下面拓扑图展示了其中一个用例：

![](/img/8fc762841be8f171.webp)

:::note
对象和 Bluetooth 工作范围的比例仅作为示例展示，以帮助直观理解和想象该拓扑！
:::

我们有一个仓库区域，**我们有 3 个资产**（托盘）需要跟踪。**我们**还**有 3 个区域**：区域 **A**，用于存放新到达的托盘；区域 **B**，我们的资产被转移到那里进行检查；区域 **C**，资产在检查后被移动到那里。要实现 Bluetooth 资产跟踪，只需每个区域安装 1 台 KNOT，每个资产安装 1 个标签。

如果 TAG 1 和 TAG 2（托盘）到达“到达”区域 A，KNOT A 将向服务器报告这两个资产都在其 Bluetooth 范围内。如果 TAG 3 被移动到区域 C，服务器将指示它位于 KNOT C 范围内。如果 TAG 1 和 TAG 2 向 B 区域移动，并停留在 A 和 B 区域之间的边缘，服务器将显示它们处于重叠区域（同时处于 KNOT-A 和 KNOT-B 范围内）。如果标签移动到仓库中间，服务器将指示它们同时在所有 3 个区域内，即重叠区域。

#### 配置 {#configuration}

在本示例中，我们将展示一个基本拓扑：使用两个 KNOT，我们只想知道标签位于建筑物的一部分还是另一部分（是位于区域 A 还是区域 B）。

##### ThingsBoard 准备 {#thingsboard-preparation}

查看[此处](../../mqtt/mqtt-and-thingsboard-configuration.md)的指南，了解如何设置 ThingsBoard 和 RouterOS 以使用 MQTT 通信。

:::tip
为简单起见，本示例将展示 [access-token](../../mqtt/mqtt-and-thingsboard-configuration.md#access-token-scenario-1) 场景，但你也可以使用其他可用选项。对于生产环境，建议使用 SSL-MQTT，因为 non-SSL-MQTT 很容易被数据包捕获和检查。

要了解如何在通过 [container](../../../containers/index.md) 运行的实例上实现 SSL-MQTT 通信，请查看[此处](../../../containers/user-guides/container-thingsboard-mqtt-http-server.md)链接的指南（[启用 HTTPS 和 SSL MQTT](../../../containers/user-guides/container-thingsboard-mqtt-http-server.md#enabling-https-and-ssl-mqtt) 部分）。
:::

在 ThingsBoard GUI 中创建 2 个 KNOT，并将它们设为“网关”。

转到“设备”部分，点击“+”按钮，然后点击“添加新设备”：

![](/img/c96c5c3c49271e3d.webp)

为设备命名并勾选“是网关”选项：

![](/img/68362bb2332cc62f.webp)

对你拥有的每个 KNOT 都执行此操作：

![](/img/332956b1a98eb64b.webp)

在你刚创建的设备下，在“管理凭据”选项卡中，为每个 KNOT 设置唯一的访问令牌（唯一凭据）：

![](/img/0dfde7520370c11b.webp)

##### RouterOS 配置 {#routeros-configuration}

###### 准备工作 {#preparation}

在继续之前，我们需要确认我们的 Bluetooth 标签确实出现在 KNOT 的 Bluetooth 范围内，并且 KNOT 能检测到它。为此，你可以执行命令 `/iot/bluetooth/scanners/advertisements/print`：

```ros
/iot/bluetooth/scanners/advertisements/print
 # DEVICE     PDU-TYPE        TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA                                           
 0 bt1        adv-noconn-ind  2023-03-08 12:35:15 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f090100b0110100ffff00000019d68d2300005d   
 1 bt1        adv-noconn-ind  2023-03-08 12:35:16 public       DC:2C:6E:0F:C0:3D        -39dBm         22 15ff4f0901008f3cfcfffbfffaff301783c22c000064   
 2 bt1        adv-noconn-ind  2023-03-08 12:35:35 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f09010084d500000400ffff0319ea8d2300005d   
 3 bt1        adv-noconn-ind  2023-03-08 12:35:45 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f090100e607faffffff03000319f48d2300005d   
```

或者你可以在 IoT>Bluetooth>Advertising reports 选项卡下使用 [Webfig](../../../management-tools/webfig.md) 或 [Winbox](../../../management-tools/winbox.md) 检查。

该列表可能很杂乱。由于扫描器会捕获周围的一切，随机负载可能会出现在列表中。为帮助减少列表内容，你可以使用标签的 MAC 地址 `/iot/bluetooth/scanners/advertisements/print where address=DC:2C:6E:0F:C0:3D` 对其进行过滤：

```ros
/iot/bluetooth/scanners/advertisements/print where address=DC:2C:6E:0F:C0:3D
 # DEVICE    PDU-TYPE        TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA                                           
 0 bt1       adv-noconn-ind  2023-03-08 12:41:06 public       DC:2C:6E:0F:C0:3D        -49dBm         22 15ff4f0901005ab20100fdfffdff4017e1c32c000064   
 1 bt1       adv-noconn-ind  2023-03-08 12:41:26 public       DC:2C:6E:0F:C0:3D        -40dBm         22 15ff4f090100349704000000fcff4017f5c32c000064   
 2 bt1       adv-noconn-ind  2023-03-08 12:41:36 public       DC:2C:6E:0F:C0:3D        -49dBm         22 15ff4f09010073fb0000000000003017ffc32c000064   
 3 bt1       adv-noconn-ind  2023-03-08 12:41:46 public       DC:2C:6E:0F:C0:3D        -43dBm         22 15ff4f090100b88cffffffffffff401709c42c000064   
```

要了解如何解析负载，请查看[此处](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-Scriptfordecoding)的指南。

###### MQTT 代理 {#mqtt-broker}

在每个 KNOT 上设置一个 MQTT broker。

对于 KNOT A：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=1883 username=knot-A_access_token
```

其中：

- `name` 是你希望给 broker 指定的名称，此名称将在后面的脚本中使用。
- `address` 是 broker/ThingsBoard 服务器的 IP 地址。
- `port` 是 broker 监听的 TCP 端口 → 对于非 SSL，通常为 TCP 1883。
- `username` 由 MQTT broker 决定，在我们的例子中，它是在 ThingsBoard 管理门户中生成的 "access token"。

对于 KNOT B → 执行相同步骤。只需将 `username` 更改为为 KNOT B 设备（网关）生成的相应访问令牌即可。

###### 脚本 {#script}

将下面显示的脚本导入每个 KNOT。为此，只需复制下面显示的“代码”，粘贴到新的终端窗口中，然后按 <kbd>Enter</kbd>：

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

该脚本应出现在“System>Scripts>Script List”选项卡下，名称为 "tracking"，或者可以使用命令 `/system/script/print` 查看。

有一些脚本行需要注意。

broker 名称配置行是你需要输入已设置的 MQTT broker 名称的地方：

>      :local broker "tb"

你需要输入 MQTT broker 使用的正确 topic。更多详细信息请查看 [ThingsBoard 文档](https://thingsboard.io/docs/reference/gateway-mqtt-api/)。默认情况下，topic 应为：

>      :local topic "v1/gateway/telemetry"

MAC 地址过滤选项位于脚本本身内部。你可以输入 MAC 地址的全部 6 个八位字节（将过滤器应用于 1 个特定标签），也可以使用少量/几个八位字节过滤列表，例如 "^BC:33:AC"（应用过滤器，以便只处理以 "BC:33:AC:..." 开头的 MAC 地址）：

>     :local addressRegex "DC:2C:6E:0F:C0:3D"

负载内容/数据行。它允许你按特定负载内容过滤列表，例如 "[制造商数据](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-MikroTikPDUPayloadstructure)"。例如，"15ff4f09" 将丢弃所有不是 MikroTik 格式负载的负载：

>     :local advertisingDataRegex "15ff4f09"

RSSI 信号强度过滤选项。此过滤选项已在“[场景说明](#scenario-explanation)”部分提到。该过滤器允许你忽略任何 RSSI 弱于配置值的负载。例如，"-40" 将只包括信号强度强于 -40dBm 的 Bluetooth 广播：

>     :local rssiThreshold "-40"

KNOT 标识符行。你需要为每个唯一 KNOT 更改它。例如，将你的第一个 KNOT 命名为 →  KNOT\_A，将第二个 KNOT 命名为 →  KNOT\_B：

> :local gwName "KNOT\_A"

脚本的其余部分无需更改/修改

运行脚本时它如何工作？脚本会使用应用的过滤器“检查”“Advertising reports”选项卡（负载列表选项卡），并构造一条 JSON 消息。JSON 消息示例如下：

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

数据按照 [ThingsBoard 指南](https://thingsboard.io/docs/reference/gateway-mqtt-api/#telemetry-upload-api) 进行结构化，其中 `2C:C8:1B:4B:BB:0A` 和 `DC:2C:6E:0F:C0:3D` 是出现在 KNOT 范围内的标签的 MAC 地址，`ts` 是标签广播的每个负载的 Unix 时间戳（以毫秒为单位），`reporter` 指示是哪个特定 KNOT 发送了消息，`rssi` 是标签广播的每个负载的信号强度（以 dBm 为单位）。

在“搜索”负载列表并构造 JSON 消息后，Bluetooth 接口负载列表会被“清空”（或“刷新”），并且先前构造的 JSON 消息会发送到 ThingsBoard MQTT broker。

要运行脚本，请使用命令：

```ros
/system/script/run tracking
```

###### 调度器 {#scheduler}

为脚本应用调度器，以便 RouterOS 定期自行启动脚本：

```ros
/system/scheduler/add name=bluetoothscheduler interval=30s on-event="/system/script/run tracking"
```

你可以设置更短或更长的间隔。如果你希望更频繁地发送数据，使数据更“新鲜” → 设置更短的时间间隔（10-15 秒）。如果你希望发送更少消息、频率更低 → 可以设置更长的时间间隔（30 分钟以上）。

使用脚本构造的 JSON 消息会为每个收到的负载分配一个 `ts` 值（时间戳）。这意味着，例如，**当脚本每分钟运行一次**，使用 1 个标签，并且**该标签每 10 秒广播** 1 个负载（即**每分钟 6 个负载**）→ ThingsBoard 数据（GUI）将每分钟更新一次，并且每分钟会出现 6 个新条目（每个条目将指示它是在前一个条目之后 10 秒收到的）。如果你每 15 分钟发送一次消息，使用 1 个每 10 秒广播一个负载的标签（即每 15 分钟 6\*15=90 个负载）→ ThingsBoard 数据（GUI）将每 15 分钟更新一次，但会出现 90 个条目。

#### ThingsBoard 数据可视化与结果验证 {#thingsboard-data-visualization-and-result-verification}

使用 `/system/script/run tracking` 或通过调度器运行脚本并刷新 GUI 门户后 → JSON 消息中找到的所有 MAC 地址（标签）都会在 ThingsBoard GUI 下创建为新设备：

![](/img/b85bc55bbf5af1aa.webp)

为了帮助你可视化数据，你可以使用内置的 [部件](https://thingsboard.io/docs/user-guide/ui/widget-library/) 或创建自己的部件。

从设备列表中选择标签的 MAC 地址，转到“最新遥测”部分，勾选 "reporter" 参数，然后点击“在部件上显示”按钮：

![](/img/abadead51b4a0341.webp)

选择你想使用的部件，例如在“卡片”包下的“时间序列表”，然后点击“添加到仪表板”：

![](/img/412331282135c4b0.webp)

创建一个新仪表板，并随意命名。点击“添加”：

![](/img/7df5a5ffd9f28fff.webp)

对出现在“设备”选项卡下的其他标签执行相同步骤。在同一仪表板下为每个唯一标签创建一个新部件。

将部件的“时间窗口”从“实时-最近一分钟”（默认使用）更改为“实时-当天”：

![](/img/5c1412587045330c.webp)

结果，如果两个标签都在 **KNOT A** **范围**内，仪表板将显示：

![](/img/4d9e68c164725237.webp)

如果它们移动到 **KNOT B 范围**，将显示：

![](/img/a16fc000f709bea2.webp)

如果标签移动到**重叠区域**，即两个范围内，两个报告者（KNOT\_A 和 KNOT\_B）应在几秒内先后出现，具体取决于调度器中使用的间隔：

![](/img/bbb25d4c9164e289.webp)

### 示例 #2 {#example-2}

在第二个示例中，我们将展示另一个拓扑：

![](/img/4b356536926ff91a.png)

我们有几个仓库、几辆公司送货车辆，以及 3 个我们感兴趣跟踪的资产。我们的资产是装载货物的托盘，我们的目标是了解：

- 资产（配备标签）当前位于哪个具体仓库（配备 KNOT），以及它在那个具体仓库内停留了多长时间。
- 资产（配备标签）是否在路上、在仓库之间运输，以及它在车辆（配备 KNOT）内停留了多长时间。
- **（可选）如果使用 [TG-BT5-OUT](https://mikrotik.com/product/tg_bt5_out) 标签**，在这整个过程中温度是多少？你也可以/改为监控可从广播[负载](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-Example)中获得的其他参数，例如加速度。
- **（可选）**找出 KNOT 的 GPS 位置。

要实现 Bluetooth 资产跟踪，只需每个仓库安装 1 台 KNOT，每辆车安装 1 台 KNOT，每个资产安装 1 个标签。

我们可以看到 TAG 1 在车辆内，而这辆车刚停在仓库附近。KNOT 1 和 KNOT 4 都会向服务器报告资产在它们的范围内。这会告诉你资产已停放，但尚未被运输。

我们可以看到 TAG 2 正在仓库之间运输，并且只位于 KNOT 5 的 Bluetooth 范围内。在这种情况下，KNOT 5 将是唯一的报告者，服务器上显示的结果将意味着资产正在被运输。

我们可以看到 TAG 3 在仓库内。服务器将仅指示这一点。

服务器上的数据将显示 KNOT 发送的每份报告的时间戳，这将告诉你资产在特定设备的 Bluetooth 范围内停留了多长时间。

#### 配置 {#configuration-1}

在本示例中，我们将展示一个基本拓扑：有 2 个仓库、1 辆在它们之间行驶的车辆/卡车，以及 1 个资产/托盘/标签。

##### ThingsBoard 准备 {#thingsboard-preparation-1}

查看[此处](../../mqtt/mqtt-and-thingsboard-configuration.md)的指南，了解如何设置 ThingsBoard 和 RouterOS 以使用 MQTT 通信。

:::tip
为简单起见，本示例将展示 [access-token](../../mqtt/mqtt-and-thingsboard-configuration.md#access-token-scenario-1) 场景，但你也可以使用其他可用选项。对于生产环境，建议使用 SSL-MQTT，因为 non-SSL-MQTT 很容易被数据包捕获和检查。

要了解如何在通过 [container](../../../containers/index.md) 运行的实例上实现 SSL-MQTT 通信，请查看[此处](../../../containers/user-guides/container-thingsboard-mqtt-http-server.md)链接的指南（[启用 HTTPS 和 SSL MQTT](../../../containers/user-guides/container-thingsboard-mqtt-http-server.md#enabling-https-and-ssl-mqtt) 部分）。
:::

在 ThingsBoard GUI 中创建 3 个 KNOT，并将它们设为“网关”。

转到“设备”部分，点击“+”按钮，然后点击“添加新设备”：

![](/img/c96c5c3c49271e3d.webp)

为设备命名并勾选“是网关”选项：

![](/img/8b73d8a2454be8c6.webp)

对你拥有的每个 KNOT 都执行此操作：

![](/img/0915d2aa21abcaa2.webp)

在你刚创建的设备下，在“管理凭据”选项卡中，为每个 KNOT 设置唯一的访问令牌（唯一凭据）：

![](/img/16bbaaab7d956481.webp)

##### RouterOS 配置 {#routeros-configuration-1}

###### 准备工作 {#preparation-1}

在继续之前，我们需要确认我们的 Bluetooth 标签确实出现在 KNOT 的 Bluetooth 范围内，并且 KNOT 能检测到它。为此，你可以执行命令 `/iot/bluetooth/scanners/advertisements/print`：

```ros
/iot/bluetooth/scanners/advertisements/print
 # DEVICE     PDU-TYPE        TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA                                           
 0 bt1        adv-noconn-ind  2023-03-08 12:35:15 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f090100b0110100ffff00000019d68d2300005d   
 1 bt1        adv-noconn-ind  2023-03-08 12:35:16 public       DC:2C:6E:0F:C0:3D        -39dBm         22 15ff4f0901008f3cfcfffbfffaff301783c22c000064   
 2 bt1        adv-noconn-ind  2023-03-08 12:35:35 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f09010084d500000400ffff0319ea8d2300005d   
 3 bt1        adv-noconn-ind  2023-03-08 12:35:45 public       2C:C8:1B:4B:BB:0A        -50dBm         22 15ff4f090100e607faffffff03000319f48d2300005d   
```

或者你可以在 IoT>Bluetooth>Advertising reports 选项卡下使用 [Webfig](../../../management-tools/webfig.md) 或 [Winbox](../../../management-tools/winbox.md) 检查。

该列表可能很杂乱。由于扫描器会捕获周围的一切，随机负载可能会出现在列表中。为帮助减少列表内容，你可以使用标签的 MAC 地址 `/iot/bluetooth/scanners/advertisements/print where address=DC:2C:6E:0F:C0:3D` 对其进行过滤：

```ros
/iot/bluetooth/scanners/advertisements/print where address=DC:2C:6E:0F:C0:3D
 # DEVICE    PDU-TYPE        TIME                 ADDRESS-TYPE ADDRESS                    RSSI     LENGTH DATA                                           
 0 bt1       adv-noconn-ind  2023-03-08 12:41:06 public       DC:2C:6E:0F:C0:3D        -49dBm         22 15ff4f0901005ab20100fdfffdff4017e1c32c000064   
 1 bt1       adv-noconn-ind  2023-03-08 12:41:26 public       DC:2C:6E:0F:C0:3D        -40dBm         22 15ff4f090100349704000000fcff4017f5c32c000064   
 2 bt1       adv-noconn-ind  2023-03-08 12:41:36 public       DC:2C:6E:0F:C0:3D        -49dBm         22 15ff4f09010073fb0000000000003017ffc32c000064   
 3 bt1       adv-noconn-ind  2023-03-08 12:41:46 public       DC:2C:6E:0F:C0:3D        -43dBm         22 15ff4f090100b88cffffffffffff401709c42c000064   
```

要了解如何解析负载，请查看[此处](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-Scriptfordecoding)的指南。

###### MQTT 代理 {#mqtt-broker-1}

在每个 KNOT 上设置一个 MQTT broker。

对于 KNOT\_1：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=1883 username=knot-1_access_token
```

其中：

- `name` 是你希望给 broker 指定的名称，此名称将在后面的脚本中使用。
- `address` 是 broker/ThingsBoard 服务器的 IP 地址。
- `port` 是 broker 监听的 TCP 端口 → 对于非 SSL，通常为 TCP 1883。
- `username` 由 MQTT broker 决定，在我们的例子中，它是在 ThingsBoard 管理门户中生成的 "access token"。

对于 KNOT\_2 和 KNOT\_3 → 执行相同步骤。只需将 `username` 更改为生成的相应访问令牌即可。

###### 脚本 {#script-1}

将下面显示的脚本导入每个 KNOT。为此，只需复制下面显示的“代码”，粘贴到新的终端窗口中，然后按 <kbd>Enter</kbd>：

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

该脚本应出现在“System>Scripts>Script List”选项卡下，名称为 "tracking"，或者可以使用命令 `/system/script/print` 查看。

有一些脚本行需要注意。

broker 名称配置行，你需要输入已设置的 MQTT broker 名称：

>      :local broker "tb"

你需要输入 MQTT broker 使用的正确 topic。更多详细信息请查看 [ThingsBoard 文档](https://thingsboard.io/docs/reference/gateway-mqtt-api/)。默认情况下，topic 应为：

>      :local topic "v1/gateway/telemetry"

MAC 地址过滤选项位于脚本本身内部。你可以输入 MAC 地址的全部 6 个八位字节（将过滤器应用于 1 个特定标签），也可以使用少量/几个八位字节过滤列表，例如 "^BC:33:AC"（应用过滤器，以便只处理以 "BC:33:AC:..." 开头的 MAC 地址）：

>     :local addressRegex "DC:2C:6E:0F:C0:3D"

负载内容/数据行。允许你按特定负载内容过滤列表，例如 "[制造商数据](https://help.mikrotik.com/docs/display/UM/MikroTik+Tag+advertisement+formats#heading-MikroTikPDUPayloadstructure)"。例如，"15ff4f09" 将丢弃所有不是 MikroTik 格式负载的负载：

>     :local advertisingDataRegex "15ff4f09"

RSSI 信号强度过滤选项。此过滤选项已在“[场景说明](#scenario-explanation)”部分提到。该过滤器允许你忽略任何 RSSI 弱于配置值的负载。例如，"-40" 将只包括信号强度强于 -40dBm 的 Bluetooth 广播：

>     :local rssiThreshold "-40"

KNOT 标识符行。你需要为每个唯一 KNOT 更改它。例如，将你的第一个 KNOT 的 ID 设为 "1"，第二个 KNOT 设为 "2"，第三个 KNOT 设为 "3"：

> :local gwName "1"

脚本的其余部分无需更改/修改

运行脚本时它如何工作？脚本会使用应用的过滤器“检查”“Advertising reports”选项卡（负载列表选项卡），并构造一条 JSON 消息。JSON 消息示例如下：

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

数据按照 [ThingsBoard 指南](https://thingsboard.io/docs/reference/gateway-mqtt-api/#telemetry-upload-api) 进行结构化，其中 `2C:C8:1B:4B:BB:0A` 和 `DC:2C:6E:0F:C0:3D` 是出现在 KNOT 范围内的标签的 MAC 地址，`ts` 是标签广播的每个负载的 Unix 时间戳（以毫秒为单位），`KNOT_X` 指示是哪个特定 KNOT 发送了消息，`rssi` 是标签广播的每个负载的信号强度（以 dBm 为单位）。

在“搜索”负载列表并构造 JSON 消息后，Bluetooth 接口负载列表会被“清空”（或“刷新”），并且先前构造的 JSON 消息会发送到 ThingsBoard MQTT broker。

要运行脚本，请使用命令：

```ros
/system/script/run tracking
```

**包含温度数据的脚本（可选）**

如果你希望向构造的消息中添加温度报告，请使用下面的脚本：

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

在这种情况下，JSON 消息将如下所示：

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
由于不支持浮点数 → 小数点后的每次计算都会被“向上舍入”为整数。这就是脚本会计算温度和加速度值并**按 1000 缩放**（乘以 **1000**）的原因。  
因此，如果你看到温度为 **temp=24750**，实际温度是 **24.750 C**。要添加小数点，你需要在服务器端进行额外的结果“转换”，或在 RouterOS 端进行额外脚本处理，这会增加设备的 CPU 使用率。
:::

###### 包含 GPS 数据的脚本（可选） {#script-that-includes-gps-data-optional}

如果你还希望包含 GPS 数据（来自 KNOT 的经度和纬度值），请使用下面显示的脚本：

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

这里需要注意 [BG77 调制解调器行为](https://help.mikrotik.com/docs/display/UM/WWAN+and+GNSS+priority+automatization) → KNOT 中使用的 BG77 蜂窝调制解调器无法同时用于保持蜂窝 CAT-M/NB-IoT 连接和获取 GPS 坐标。

当脚本运行时：

- PPP 接口被禁用，并在 32 秒内将最高优先级设置为 GPS 接收（此时蜂窝 PPP 接口处于关闭状态）（此时间可在脚本中更改）。
- （a）如果设备在配置的 32 秒内成功获取 GPS 纬度值（如果获取的值不等于 "none"），脚本将用捕获的纬度和经度值构造一条 JSON 消息，脚本会将最高优先级设置为 WWAN（将优先级从 GPS 改为 WWAN），并重新启用 PPP 接口（用于互联网访问）。之后，脚本将通过第一次 MQTT 发布发送一条 GPS 数据 JSON 消息，然后脚本将运行 Bluetooth 部分，在该部分中构造 Bluetooth 数据 JSON 消息并通过第二次 MQTT 发布发送（发送 2 条 MQTT 消息 → GPS 数据 MQTT 消息和 Bluetooth 数据 MQTT 消息）。
- （b）如果设备在 32 秒间隔内未能获取 GPS 纬度值（如果获取的值等于 "none"），脚本会将最高优先级设置为 WWAN（将优先级从 GPS 改为 WWAN），重新启用 PPP 接口（用于互联网访问），然后仅处理 Bluetooth 部分，在该部分中构造 Bluetooth 数据 JSON 消息并通过 MQTT 发布发送（基本上，如果无法获取 GPS 数据，则发送 1 条包含 Bluetooth 数据的 MQTT 消息）。

###### 调度器 {#scheduler-1}

为脚本应用调度器，以便 RouterOS 定期自行启动脚本：

```ros
/system/scheduler/add name=bluetoothscheduler interval=50s on-event="/system/script/run tracking"
```

你可以设置更短或更长的间隔。如果你希望更频繁地发送数据，使数据更“新鲜” → 设置更短的时间间隔（10-15 秒）。如果你希望发送更少消息、频率更低 → 可以设置更长的时间间隔（30 分钟以上）。

使用脚本构造的 JSON 消息会为每个收到的负载分配一个 `ts` 值（时间戳）。这意味着，例如，**当脚本每分钟运行一次**，使用 1 个标签，并且**该标签每 10 秒广播** 1 个负载（即**每分钟 6 个负载**）→ ThingsBoard 数据（GUI）将每分钟更新一次，并且每分钟会出现 6 个新条目（每个条目将指示它是在前一个条目之后 10 秒收到的）。如果你每 15 分钟发送一次消息，使用 1 个每 10 秒广播一个负载的标签（即每 15 分钟 6\*15=90 个负载）→ ThingsBoard 数据（GUI）将每 15 分钟更新一次，但会出现 90 个条目。

#### ThingsBoard 数据可视化与结果验证 {#thingsboard-data-visualization-and-result-verification-1}

使用 `/system/script/run tracking` 或通过调度器运行脚本并刷新 GUI 门户后 → JSON 消息中找到的所有 MAC 地址（标签）都会在 ThingsBoard GUI 下创建为新设备：

![](/img/b85bc55bbf5af1aa.webp)

为了帮助你可视化数据，你可以使用内置的 [部件](https://thingsboard.io/docs/user-guide/ui/widget-library/) 或创建自己的部件。

从设备列表中选择标签的 MAC 地址，转到“最新遥测”部分，选择你要监控的 KNOT ID，然后点击“在部件上显示”按钮：

![](/img/2aba39a24468b22e.webp)

选择你想使用的部件，例如在“图表”包下的“时间序列柱状图”，然后点击“添加到仪表板”：

![](/img/0eadc5f212d7258e.webp)

创建一个新仪表板，并随意命名。点击“添加”：

![](/img/4af97b4887f17f88.webp)

将部件的“时间窗口”从“实时-最近一分钟”（默认使用）更改为“实时-最近 5 小时”，并禁用“数据聚合函数”（选择“无”）：

![](/img/dd359217e9a9672c.webp)

为了帮助你更好地可视化结果，请编辑部件，然后编辑每个 "KNOT\_X" 参数/键。为每个键启用“显示点”复选框：

![](/img/a3b7272e4807b355.webp)

查看 ThingsBoard 部件[指南](https://thingsboard.io/docs/user-guide/ui/chart-widget/#timeseries-bar-chart)，了解你可用的更多选项。

最终结果将如下所示：

![](/img/bc771871ad8da5bb.webp)

从仪表板可以看出：

- 从 ~11:00 到 ~11:30，我们的资产在 KNOT\_1 的 Bluetooth 范围内（1 号仓库内）。
- 从 ~11:30 到 ~11:35，我们的资产被转移到停在仓库附近的车辆（KNOT\_2）上（标签同时处于两个 KNOT 的范围内）。
- 从 ~11:35 到 ~12:00，标签在卡车（KNOT\_2）内——正前往另一个仓库。
- 从 ~12:00 到 ~12:05，资产停在 2 号仓库外，并且同时处于 KNOT\_2 和 KNOT\_3 的范围内。
- 从 ~12:05 到 12:30，我们的资产存放在 2 号仓库（KNOT\_3）内。
- 从 ~12:30 起，标签再次上路，在卡车（KNOT\_2）内。

##### 温度可视化（可选） {#temperature-visualization-optional}

从设备列表中选择标签的 MAC 地址，转到“最新遥测”部分，勾选 `temp` 参数，然后点击“在部件上显示”按钮：

![](/img/9bab51d0ecf1d3f3.webp)

选择你想使用的部件，例如在“图表”包下的“时间序列折线图”。点击“添加到仪表板”，然后选择要添加该部件的仪表板。

结果将如下所示：

![](/img/d3abc7e9e479239e.webp)

现在你有一个额外的图表，显示标签温度在不同时间间隔内如何变化。

##### GPS 坐标可视化（可选） {#gps-coordinate-visualization-optional}

根据[包含 GPS 数据的脚本](#script-that-includes-gps-data-optional)部分中的脚本，脚本会发送 2 条 MQTT 消息。每条消息发送到不同的 MQTT topic。GPS 坐标消息将发布到名为 "v1/devices/me/telemetry" 的 topic，而 Bluetooth 数据将发布到名为 "v1/gateway/telemetry" 的 topic。你可以在 ThingsBoard 设备列表中的特定网关下查看坐标：

![](/img/60ce4ad341008aa9.webp)

勾选 "latitude" 和 "longitude" 两个参数，点击“在部件上显示”按钮，将“当前包”设置为“地图”，然后选择“路线图 - OpenStreetMap”部件：

![](/img/75eb9bc9563359ff.webp)

最后，点击“添加到仪表板”按钮，并选择要显示该部件的仪表板。

将 3 个部件添加到 1 个仪表板（温度折线图、Bluetooth 报告者柱状图和 GPS 坐标地图）后，你将得到类似下面的内容：

![](/img/c81d00920bd300cf.webp)

- 你将有一个显示温度变化（标签周围温度）的图表。
- 你将有一个图表，指示是哪个特定 KNOT 发送了报告，从而告诉你标签当前位于哪个 KNOT 的 Bluetooth 范围内。
- 你将有一张显示 KNOT GPS 位置的地图。
