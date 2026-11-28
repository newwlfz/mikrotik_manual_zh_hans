---
title: "HTTPS post 和 Azure 配置"
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/bluetooth/user-guides/https-post-and-azure-configuration
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 简介 {#introduction}

本文将演示如何配置 [Azure](https://azure.microsoft.com/en-us) 和 RouterOS，以使用 HTTPS 协议发布数据。在此场景中，RouterOS 将充当网关，并将 BLEtag 广播的数据发布到云端（Azure）。

在开始配置之前，你需要在 Azure 系统中创建一个账户。有关如何创建账户的更多信息，请参阅此 [链接](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=azurefreeaccount)。

Azure 提供许多不同的选项和服务，其中许多选项/服务都有价格表。有关价格的更多信息，请参阅以下 [链接](https://www.azure.cn/en-us/pricing/)。

### Azure 配置 {#azure-configuration}

设置订阅后（Azure Portal>All Services>Subscriptions），需要配置资源组、IoT hub、设备，并生成 SAS token。

#### 资源组 {#resource-group}

进入 All Services>Resource groups 并创建一个资源组。

![](/img/49ca1fcea673b94e.png)

详情请参阅以下[链接](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)中的更详细指南。

成功配置资源组后，需要创建 IoT Hub。

#### IoT Hub

导航到 All services>IoT Hub 并创建一个。

![](/img/488293d4d2aa6e3b.png)

将 IoT Hub 链接到之前创建的资源组。不要忘记检查/设置“Networking”（网络连接）和 Management（[订阅层级](https://learn.microsoft.com/en-us/azure/iot-hub/iot-hub-scaling)）选项卡。

更多信息请参阅[此处](https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub)。

#### 设备 {#devices}

导航到 IoT Hub>IoT Devices 并添加新设备：

![](/img/ff71dfe858dcad62.webp)

选择 `Authentication type=Symmetric Key` 并保存设置。

#### SAS Token

在示例中，我们将使用 [Visual Studio Code](https://code.visualstudio.com/) 程序生成 [SAS token](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview)。

下载该程序，并将其连接到你的 [IoT Hub](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit)。

完成后，先前配置的设备名称会显示在你的 IoT HUB 中，右键单击设备名称并按照以下屏幕截图所示生成 token：

![](/img/bfcfb4024079eae8.webp)

系统会要求你输入 token 的到期时间（以小时为单位），并按“enter”确认设置。

完成此步骤后，token 应生成在“OUTPUT”字段中：

![](/img/fca492d6f6a82ace.webp)

复制该 token，后续将在 HTTPS post 脚本中使用它。

至此，Azure 部分的配置已完成。

### RouterOS 配置 {#routeros-configuration}

本指南使用 [KNOT](https://mikrotik.com/product/knot) 作为网关，并使用专门为 KNOT 创建的脚本发布数据。在您的具体应用场景中，可以使用任何 RouterOS 设备发布所需的任何数据。

#### 使用脚本进行 HTTPS post {#https-post-with-a-script}

可以使用 [fetch 工具](/docs/system-information-and-utilities/fetch)实现 HTTPS post。为了将蓝牙标签（在本示例中为 TG-BT5-XX）中的数据发布到 Azure，我们将使用脚本。脚本示例如下所示。

以符号 `#` 开头的每一行都是说明性内容，用于描述该行下方将要配置的参数。请修改引号 `""` 内适用于您具体情况的参数。

```ros
################################ Configuration ################################
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

:if ($advCount > 0) do={

    :set $btOldestAdvertisementTimestamp $lastAdvTimestamp

}

:put ("[*] Found $advCount new advertisements \
    (processing time: $[([/system clock get time] - $btProcessingStart)])")

#################################### message #####################################
:local message \
    "{\
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
/tool fetch http-method=post output=user http-header-field="authorization:{sas_token}" http-data=$message url="https://{iot_hub_name}.azure-devices.net/devices/{device_id}/messages/events\?api-version=2020-03-13"

:put ("[*] Done")
```

需要注意 1 行脚本：

```ros
/tool fetch http-method=post output=user http-header-field="authorization:{sas_token}" http-data=$message url="https://{iot_hub_name}.azure-devices.net/devices/{device_id}/messages/events\?api-version=2020-03-13"
```

将 HTTP 标头中的 `{sas_token}` 更改为在 SAS Token 部分生成的令牌。

将 URL 中的 `{iot_hub_name}` 和 `{device_id}` 替换为在 Azure 门户中配置的 IoT Hub 名称和 Device ID。

脚本配置的其余部分取决于总体要求。脚本会说明配置了哪些具体参数用于发布。

导航到 System>Scripts，在其中添加新脚本，并粘贴上方显示的脚本（例如，将其命名为 script1）。

要运行该脚本，可以使用命令行：

```ros
/system script run script1
```

### 验证 {#verification}

在 Azure 门户中查看已接收/已发布的消息有多种方式。请查阅 Azure 教程，了解可用选项。

我们将使用 [Visual Studio Code](https://code.visualstudio.com/) 程序验证结果。

打开 IoT Hub 并开始监控端点（设备）：

![](/img/da7967098f77735b.webp)

可以在“OUTPUT”部分查看已发布的消息，如下面的屏幕截图所示。运行脚本并检查收到的消息：

![](/img/9f41852699b32df6.webp)
