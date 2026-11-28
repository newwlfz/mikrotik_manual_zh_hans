---
title: "MQTT 和 Azure 配置"
description: "将 MikroTik MQTT 数据发布到 Microsoft Azure IoT，涵盖 Azure 账户设置、设备凭据和 MQTT broker 配置。"
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/bluetooth/user-guides/mqtt-and-azure-configuration
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 简介 {#introduction}

可用于监控 MQTT 发布者发送的信息的云服务有很多，Microsoft [Azure](https://azure.microsoft.com/en-us) 就是其中之一。本文将演示如何配置 Azure 和 RouterOS，以使用 MQTT 协议发布数据。在此场景中，RouterOS 将充当网关，并将 BLEtag 广播的数据发布到云端（Azure）。Azure 将充当 MQTT broker 和 MQTT 订阅者（服务器，数据将在此发布/显示）。

在开始配置之前，你需要在 Azure 系统中创建一个账户。有关如何创建账户的更多信息，请参阅此[链接](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=azurefreeaccount)。

Azure 提供许多不同的选项和服务，其中许多选项/服务都有价格表。有关价格的更多信息，请参阅[链接](https://www.azure.cn/en-us/pricing/)。

### Azure 配置 {#azure-configuration}

设置订阅后（Azure Portal>All Services>Subscriptions），需要配置资源组、IoT hub、证书和设备。

#### 资源组 {#resource-group}

进入 All Services>Resource groups 并创建一个资源组。

![](/img/49ca1fcea673b94e.png)

将 IoT Hub 链接到之前创建的资源组。不要忘记检查/设置“Networking”（Network connectivity）和 Management（[订阅层级](https://learn.microsoft.com/en-us/azure/iot-hub/iot-hub-scaling)）选项卡。

详情请参阅[此处](https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub)。

#### IoT Hub

导航到 All services>IoT Hub 并创建一个。

![](/img/488293d4d2aa6e3b.png)

将 IoT Hub 链接到之前创建的资源组。不要忘记检查/设置“Networking”（Network connectivity）和 Management（a subscription tier）选项卡。

详情请参阅此处。

#### 证书 {#certificates}

在本例中，我们将重点介绍 [X.509 CA-signed](https://learn.microsoft.com/en-us/azure/iot-edge/how-to-authenticate-downstream-device?view=iotedge-2020-11#x509-ca-signed-authentication) 身份验证。

可以使用 [Microsoft-supplied scripts](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows)) 或 [open SSL](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows) 生成测试证书。

生成 RootCA 后，进入 IoT Hub>Certificates 并在其中添加证书：

![](/img/4e87fb5da7e31a84.webp)

成功添加 RootCA 后，需要 [prove possession](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows)（验证证书）。

如果使用脚本，[tutorial (step 3)](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-3---prove-possession) 中对此有详细说明和演示；如果使用 open ssl，请参阅 [tutorial (step 7)](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-7---demonstrate-proof-of-possession)。

证书验证成功后，需要创建 [device certificate](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-4---create-a-new-device)（如果使用 open ssl，请遵循此 [link](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-8---create-a-device-in-your-iot-hub)）。

#### 设备 {#devices}

进入 IoT Hub>IoT Devices 并添加新设备：

![](/img/da21843851a2de33.webp)

注意“Device ID”字段。Device ID 应与设备证书的“Common name”匹配。

选择 `Authentication type=X.509 CA Signed` 并保存设置。

现在可以生成最后一个必需的证书，即[设备证书](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-4---create-a-new-device)（如果使用 open ssl，请参阅此[链接](https://learn.microsoft.com/en-us/azure/iot-hub/tutorial-x509-test-certs?tabs=windows#step-8---create-a-device-in-your-iot-hub)）。

至此，Azure 侧的配置已完成。

### RouterOS 配置 {#routeros-configuration}

:::info
要配置 MQTT，请确保事先安装 **iot** 软件包。
:::
在示例中，我们使用 [KNOT](https://mikrotik.com/product/knot) 作为网关，并使用专门为该 KNOT 创建的脚本发布数据。在您的具体应用场景中，可以使用任何安装了 iot 软件包的 RouterOS 设备发布所需的任何数据。

#### 证书 {#certificates-1}

由于使用 SSL 连接，需要先前生成的设备证书及其私钥。还将使用 [Baltimore CyberTrust Root certificate](https://learn.microsoft.com/en-us/azure/security/fundamentals/azure-certificate-authority-details?tabs=root-and-subordinate-cas-list)。

进入“Files”菜单，并添加以下证书：*Baltimore CyberTrust Root certificate、此前生成的设备证书及其私钥*。

![](/img/436f4a58da3dbccc.webp)

进入 System>Certificates，并导入全部 3 个文件（通过“Import”按钮逐个导入）：

![](/img/7063592cc6f64e86.webp)

:::info
*请仔细检查“Common Name”是否与在 Azure 门户中为该设备配置的 Device ID 匹配。在本例中，Device ID 为“testor”，并与“Common Name”字段匹配。*
:::
确保两个证书均为受信任（T），并且私钥（K）已添加到设备证书中。

#### MQTT 代理 {#mqtt-broker}

进入 IoT>MQTT，并添加新的 broker（“+”按钮）：

![](/img/49a6543b8655b546.webp)

- 在“Name”字段中为该 broker 命名（例如，**Azure**）。
- 在“Address”字段中输入或粘贴 Azure 主机名地址（可在 IoT Hub>Overview 菜单中找到该主机名）：

![](/img/f1970f1b2c9d830e.webp)

- 在“Port”字段中配置该 broker 使用的端口，并通过 SSL 复选框启用 SSL（本例中 Azure 使用 **8883**，并且由于使用证书，因此需要**启用 SSL**）。
- “Username”字段应按以下方式配置：`{iothubhostname}/{device_id}/?api-version=2018-06-30`，其中 `{iothubhostname}` 是 IoT hub 的主机名，`{device_id}` 是在 Azure 门户中设置的 Device ID（与证书的“Common Name”相同，在本例中为“testor”）。
- 本场景中不需要填写“Password”字段（此配置取决于 broker 的设置，请跳过该字段）。
- “Client Id”应与 Device ID 相同（在本例中为 **testor**）。
- 由于使用 SSL，必须在“Certificate”字段中选择证书（选择设备证书）。

有关所需设置的详情，请参阅[此处](https://learn.microsoft.com/en-us/azure/iot-hub/iot-mqtt-connect-to-iot-hub#using-the-mqtt-protocol-directly-as-a-device)。

点击“Apply”和“OK”完成 broker 设置。

#### 使用脚本发布 MQTT {#mqtt-publish-with-a-script}

要将数据从 Bluetooth 标签（在本示例中为 TG-BT5-IN）发布到 Azure，我们将使用脚本。脚本示例如下所示。

每个以符号 `#` 开头的行都是说明性内容，用于描述该行下方将要配置的参数。请修改引号 `""` 内适用于你具体情况的参数。

```ros
## Required packages: iot

################################ Configuration ################################
## Name of an existing MQTT broker that should be used for publishing
:local broker "Azure"

## MQTT topic where the message should be published
:local topic "devices/testor/messages/events/"

## Interface whose MAC should be used as 'Locator ID'
:local locatorIface "ether1"

## POSIX regex for filtering advertisement Bluetooth addresses. E.g. "^BC:33:AC"
## would only include addresses which start with those 3 octets.
## To disable this filter, set it to ""
:local addressRegex ""

## POSIX regex for filtering Bluetooth advertisements based on their data. Same
## usage as with 'addressRegex'.
:local advertisingDataRegex ""

## Signal strength filter. E.g. -40 would only include Bluetooth advertisements
## whose signal strength is stronger than -40dBm.
## To disable this filter, set it to ""
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
## Health is a bit iffy since '/system health' does not have 'find' in ROS6
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

需要注意 2 行脚本：

```
:local broker "Azure"
```

在引号 `""` 内指定 broker 名称的行（在本示例中为 **Azure**）。

```
:local topic "devices/testor/messages/events/"
```

在引号 `""` 内指定正确主题的行。Azure 默认使用主题 `devices/{device_id}/messages/events/` 进行发布（如手册[此处](https://learn.microsoft.com/en-us/azure/iot-hub/iot-mqtt-connect-to-iot-hub#for-azure-iot-tools)所述）。不要忘记将 `{device_id}` 部分更改为你在 Azure 门户中配置的“Device ID”。

其余脚本配置取决于整体需求。脚本会说明具体配置了哪些参数用于发布。

导航到 System>Scripts，添加新脚本，并粘贴上方显示的脚本（例如命名为 script1）。

要运行该脚本，可以使用命令行：

```
/system script run script1
```

### 验证 {#verification}

在 Azure 门户中查看接收/发布的消息有多种方式。请查阅 Azure 教程，了解可用选项。

在本示例中，我们将使用 [Visual Studio Code program](https://code.visualstudio.com/) 验证结果。

下载该程序，并将其连接到你的 [IoT Hub](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit)。

添加 IoT Hub 后，即可开始监控端点：

![](/img/da76f9f1ace22e06.webp)

并且，你可以在“OUTPUT”部分查看已发布的消息，如下图所示：

![](/img/a5d4b0d6ff3c1a13.webp)
