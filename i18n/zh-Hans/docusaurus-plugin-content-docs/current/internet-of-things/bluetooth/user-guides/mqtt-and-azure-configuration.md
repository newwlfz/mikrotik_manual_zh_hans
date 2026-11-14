---
sidebar_key: "internet-of-things/bluetooth/user-guides/mqtt-and-azure-configuration"
sidebar_position: 5
title: "MQTT 和 Azure 配置"
sidebar_label: "MQTT 和 Azure 配置"
description: "将 MikroTik MQTT 数据发布到 Microsoft Azure IoT，涵盖 Azure 账户设置、设备凭据和 MQTT broker 配置。"
source: https://manual.mikrotik.com/docs/internet-of-things/bluetooth/user-guides/mqtt-and-azure-configuration
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

你可以用来监控 MQTT 发布者所发送信息的众多云服务之一，是 Microsoft [Azure](https://azure.microsoft.com/en-us)。本文将演示如何同时配置 Azure 和 RouterOS，以使用 MQTT 协议发布数据。在此场景中，RouterOS 将充当网关，并把 BLEtag 广播的数据发布到云（Azure）。在此场景中，Azure 将充当 MQTT broker 和 MQTT 订阅者（用于发布/显示数据的服务器）。

在继续设置之前，你需要在 Azure 系统中创建一个账户。你可以通过这个[链接](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=azurefreeaccount)找到有关如何操作的更多信息。

Azure 提供许多不同的选项和服务，其中许多选项/服务都有价目表。你可以通过这个[链接](https://www.azure.cn/en-us/pricing/)找到有关定价的更多信息。

### Azure 配置 {#azure-configuration}

完成订阅设置后（Azure Portal>All Services>Subscriptions），你将需要配置资源组、IoT Hub、证书和设备。

#### 资源组 {#resource-group}

转到 All Services>Resource groups 并创建一个。

![](/img/49ca1fcea673b94e.png)

将你的 IoT Hub 关联到之前创建的资源组。不要忘记检查/设置 "Networking"（网络连接）和 Management（[订阅层级](https://learn.microsoft.com/en-us/azure/iot-hub/iot-hub-scaling)）选项卡。

你可以通过[此处](https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub)找到更多信息。

#### IoT Hub {#iot-hub}

导航到 All services>IoT Hub 并创建一个。

![](/img/488293d4d2aa6e3b.png)

将你的 IoT Hub 链接到之前创建的资源组。不要忘记检查/设置 "Networking"（网络连接）和 Management（订阅层级）标签页。

你可以在这里了解更多信息。

#### 证书 {#certificates}

在本示例中，我们将重点介绍 [X.509 CA-signed](https://learn.microsoft.com/en-us/azure/iot-edge/how-to-authenticate-downstream-device?view=iotedge-2020-11#x509-ca-signed-authentication) 身份验证。

你可以使用 [Microsoft 提供的脚本](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows))或 [open SSL](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows) 生成测试证书。

生成 RootCA 后，转到 IoT Hub>Certificates 并在那里添加证书：

![](/img/4e87fb5da7e31a84.webp)

成功添加 RootCA 后，你需要[证明所有权](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows)（验证它）。

如果你使用脚本，[教程（步骤 3）](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-3---prove-possession)中有详细描述和展示；如果你使用 open ssl，则请参阅[教程（步骤 7）](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-7---demonstrate-proof-of-possession)。

证书成功验证后，你需要创建[设备证书](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-4---create-a-new-device)（如果你使用 open ssl，请遵循此[链接](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-8---create-a-device-in-your-iot-hub)）。

#### 设备 {#devices}

导航到你的 IoT Hub>IoT Devices 并添加一个新设备：

![](/img/da21843851a2de33.webp)

请注意 "Device ID" 字段。Device ID 应与设备证书的 "Common name" 匹配。

选择 `Authentication type=X.509 CA Signed` 并保存设置。

现在你可以生成所需最后一项证书——[设备证书](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-4---create-a-new-device)（如果你使用 open ssl，请遵循此[链接](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-8---create-a-device-in-your-iot-hub)）。

至此，Azure 部分的配置就完成了。

### RouterOS 配置 {#routeros-configuration}

:::info
为了配置 MQTT，请确保事先已安装 **iot** 软件包。
:::
在我们的示例中，我们使用 [KNOT](https://mikrotik.com/product/knot) 作为网关，并使用一个（专为 KNOT 创建的）脚本来发布数据。在你的具体应用场景中，你可以使用任何 RouterOS 设备（已安装 iot 软件包）来发布你需要的任何数据。

#### 证书 {#certificates-1}

由于我们使用 SSL 连接，因此需要之前生成的设备证书及其私钥。我们还将使用 [Baltimore CyberTrust Root 证书](https://learn.microsoft.com/en-us/azure/security/fundamentals/azure-certificate-authority-details?tabs=root-and-subordinate-cas-list)。

转到 "Files" 菜单，并在那里添加以下证书——*Baltimore CyberTrust Root 证书、之前生成的设备证书及其私钥*。

![](/img/436f4a58da3dbccc.webp)

转到 System>Certificates，并导入全部 3 个文件（通过 "Import" 按钮——逐个导入）：

![](/img/7063592cc6f64e86.webp)

:::info
*请再次确认 "Common Name" 与 Azure 门户中为该设备配置的 Device ID 相匹配。在我们的示例中，Device ID 为 "testor"，并且与 "Common Name" 字段匹配。*
:::
确保两个证书均已受信任（T），并且私钥（K）已添加到设备证书中。

#### MQTT 代理 {#mqtt-broker}

转到 IoT>MQTT 并添加新的 broker（"+" 按钮）：

![](/img/49a6543b8655b546.webp)

- 在 "Name" 字段中为 broker 命名（例如，**Azure**）。
- 在 "Address" 字段中输入/粘贴 Azure 主机名地址（你可以在 IoT Hub>Overview 菜单中找到该主机名）：

![](/img/f1970f1b2c9d830e.webp)

- 在 "Port" 字段中配置 broker 使用的端口，并通过 SSL 复选框启用 SSL（在本例中，Azure 使用 **8883**，并且由于我们使用证书，因此需要**启用 SSL**）。
- "Username" 字段应按以下方式配置——`{iothubhostname}/{device_id}/?api-version=2018-06-30`，其中 `{iothubhostname}` 是你的 IoT Hub 的主机名，`{device_id}` 是在 Azure 门户中设置的 Device ID（与证书的 "Common Name" 相同，在我们的示例中为 "testor"）。
- 此场景中不需要 "Password" 字段（此配置取决于 broker 的设置——跳过此字段）。
- "Client Id" 应与设备的 ID 相同（在我们的示例中为 **testor**）。
- 由于使用了 SSL，必须在 "Certificate" 字段中选择证书（选择设备证书）。

你可以通过[此处](https://learn.microsoft.com/en-us/azure/iot-hub/iot-mqtt-connect-to-iot-hub#using-the-mqtt-protocol-directly-as-a-device)了解有关所需设置的更多信息。

单击 "Apply" 和 "OK" 完成 broker 设置。

#### 使用脚本进行 MQTT 发布 {#mqtt-publish-with-a-script}

为了将蓝牙标签（在我们的示例中为 TG-BT5-IN）中的数据发布到 Azure，我们将使用脚本。脚本示例如下所示。

每一行以符号 `#` 开头的文本都是说明性内容，它描述将在该行下方配置的参数。请修改引号 `""` 内适用于你具体情况的参数。

```ros
## 所需软件包：iot

################################ Configuration ################################
## 用于发布的现有 MQTT broker 的名称
:local broker "Azure"

## 消息应发布到的 MQTT 主题
:local topic "devices/testor/messages/events/"

## 应将其 MAC 用作 'Locator ID' 的接口
:local locatorIface "ether1"

## 用于过滤蓝牙广播地址的 POSIX 正则表达式。例如 "^BC:33:AC"
## 将只包含以这 3 个八位组开头的地址。
## 要禁用此过滤器，请将其设置为 ""
:local addressRegex ""

## 用于根据蓝牙广播数据过滤蓝牙广播的 POSIX 正则表达式。与
## 使用 'addressRegex' 时的用法相同。
:local advertisingDataRegex ""

## 信号强度过滤器。例如，-40 将只包括蓝牙广播
## 其信号强度强于 -40dBm。
## 要禁用此过滤器，请将其设置为 ""
:local rssiThreshold "-40"

#################################### System ###################################
:put ("[*] Gathering system info...")
:local ifaceMac [/interface get [/interface find name=$locatorIface] mac-address]
:local cpuLoad [/system resource get cpu-load]
:local freeMemory [/system resource get free-memory]
:local usedMemory ([/system resource get total-memory] - $freeMemory)
:local rosVersion [/system package get value-name=version \
    [/system package find where name ~ "^routeros"]]
:local model [/system routerboard get value-name=model]
:local serialNumber [/system routerboard get value-name=serial-number]
## 由于 ROS6 中的 '/system health' 没有 'find'，健康状态有点不太可靠
:local health [/system health print as-value]
:local supplyVoltage 0
:local boardTemp 0
:foreach entry in=$health do={
    :if ($entry->"name" = "voltage") do={:set $supplyVoltage ($entry->"value")}
    :if ($entry->"name" = "board-temperature1") do={:set $boardTemp ($entry->"value")}
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
    :local obj "\
        {\
            \"id\":\"$[$minimizeMac address=$address]\",\
            \"ts\":$ts,\
            \"rssi\":$rssi,\
            \"ed\":{\
                \"ad\":\"$ad\"\
            }\
        }"
    :set $advCount ($advCount + 1)
    :set $lastAdvTimestamp $ts
    # Ensure that the last object is not terminated by a comma
    :set $advJson "$advJson$advSeparator$obj"
    :if ($advSeparator = "") do={
        :set $advSeparator ","
    }
}

:set $btOldestAdvertisementTimestamp $lastAdvTimestamp
:put ("[*] Found $advCount new advertisements \
    (processing time: $[([/system clock get time] - $btProcessingStart)])")

#################################### MQTT #####################################
:local message \
    "{\
        \"clientId\":\"$[/iot mqtt brokers get value-name=client-id \
            [/iot mqtt brokers find name=$broker]]\",\
        \"t\":0,\
        \"v\":1,\
        \"OldestAdvertisementTimestamp\":$btOldestAdvertisementTimestamp,\
        \"locs\":[{\
            \"id\":\"$[$minimizeMac address=$ifaceMac]\",\
            \"tags\":[$advJson],\
            \"ed\":{\
                \"model\":\"$model\",\
                \"sn\":\"$serialNumber\",\
                \"ros\":\"$rosVersion\",\
                \"cpu\":$cpuLoad,\
                \"umem\":$usedMemory,\
                \"fmem\":$freeMemory,\
                \"psu\":$supplyVoltage,\
                \"temp\":$boardTemp\
            }\
        }]\
    }"
:log info "$message";
:put ("[*] Total message size: $[:len $message] bytes")
:put ("[*] Sending message to MQTT broker...")
/iot mqtt publish broker=$broker topic=$topic message=$message
:put ("[*] Done")
```

应考虑 2 行脚本：

```
:local broker "Azure"
```

这一行，你应在引号 `""` 内指定 broker 的名称（在我们的示例中为 **Azure**）。

```
:local topic "devices/testor/messages/events/"
```

这一行，你应在引号 `""` 内指定正确的 topic。Azure 默认使用 topic `devices/{device_id}/messages/events/` 进行发布（如[此处](https://learn.microsoft.com/en-us/azure/iot-hub/iot-mqtt-connect-to-iot-hub#for-azure-iot-tools)的手册所述）。不要忘记将 `{device_id}` 部分更改为你在 Azure 门户中配置的 "Device ID"。

脚本配置的其余部分取决于整体需求。脚本中说明了配置了哪些确切参数用于发布。

导航到 System>Scripts，在那里添加一个新脚本，并粘贴上方所示的脚本（例如将其命名为 script1）。

要运行脚本，您可以使用命令行：

```
/system script run script1
```

### 验证 {#verification}

在 Azure 门户上查看接收/发布的消息有很多不同的方法。请查看 Azure 教程了解你可用的选项。

在我们的示例中，我们将使用 [Visual Studio Code 程序](https://code.visualstudio.com/)验证结果。

下载该程序并将其连接到你的 [IoT Hub](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit)。

添加 IoT Hub 后，你就可以开始监控端点：

![](/img/da76f9f1ace22e06.webp)

并且你可以在 "OUTPUT" 部分查看已发布的消息，如下图所示：

![](/img/a5d4b0d6ff3c1a13.webp)
