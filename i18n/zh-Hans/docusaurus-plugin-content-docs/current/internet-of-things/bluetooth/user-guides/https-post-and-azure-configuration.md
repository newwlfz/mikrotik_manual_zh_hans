---
sidebar_key: "internet-of-things/bluetooth/user-guides/https-post-and-azure-configuration"
sidebar_position: 3
title: "HTTPS post 与 Azure 配置"
sidebar_label: "HTTPS post 与 Azure 配置"
source: https://manual.mikrotik.com/docs/internet-of-things/bluetooth/user-guides/https-post-and-azure-configuration
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

本文将演示如何配置 [Azure](https://azure.microsoft.com/en-us) 和 RouterOS，以使用 HTTPS 协议发布数据。在此场景中，RouterOS 将充当网关，并把 BLEtag 广播的数据发布到云端（Azure）。

在继续设置之前，你需要在 Azure 系统中创建一个账户。你可以通过这个[链接](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=azurefreeaccount)找到有关如何操作的更多信息。

Azure 提供许多不同的选项和服务，其中许多选项/服务都有价目表。你可以通过这个[链接](https://www.azure.cn/en-us/pricing/)找到有关定价的更多信息。

### Azure 配置 {#azure-configuration}

完成订阅设置后（Azure Portal>All Services>Subscriptions），你需要配置资源组、IoT Hub、设备，并生成 SAS 令牌。

#### 资源组 {#resource-group}

转到 All Services>Resource groups 并创建一个。

![](/img/49ca1fcea673b94e.png)

你可以通过这个[链接](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)找到更详细的指南。

成功配置资源组后，你需要创建一个 IoT Hub。

#### IoT Hub {#iot-hub}

导航到 All services>IoT Hub 并创建一个。

![](/img/488293d4d2aa6e3b.png)

将你的 IoT Hub 关联到之前创建的资源组。不要忘记检查/设置 "Networking"（网络连接）和 Management（[订阅层级](https://learn.microsoft.com/en-us/azure/iot-hub/iot-hub-scaling)）选项卡。

你可以通过[此处](https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub)找到更多信息。

#### 设备 {#devices}

导航到你的 IoT Hub>IoT Devices 并添加一个新设备：

![](/img/ff71dfe858dcad62.webp)

选择 `Authentication type=Symmetric Key` 并保存设置。

#### SAS 令牌 {#sas-token}

在我们的示例中，我们将使用 [Visual Studio Code](https://code.visualstudio.com/) 程序来生成 [SAS 令牌](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview)。

只需下载该程序并将其连接到你的 [IoT Hub](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit)。

完成后，当之前配置的设备名称出现在你的 IoT HUB 中时，右键单击该设备名称，并按下方截图所示生成令牌：

![](/img/bfcfb4024079eae8.webp)

系统会要求你输入令牌的过期时间（以小时为单位），并按 "enter" 确认设置。

完成此步骤后，令牌应生成在 "OUTPUT" 字段中：

![](/img/fca492d6f6a82ace.webp)

复制该令牌，因为稍后将在我们的 HTTPS 发布脚本中使用它。

至此，Azure 部分的配置就完成了。

### RouterOS 配置 {#routeros-configuration}

在本指南中，我们使用 [KNOT](https://mikrotik.com/product/knot) 作为网关，并使用一个（专为 KNOT 创建的）脚本发布数据。在你的具体应用场景中，你可以使用任何 RouterOS 设备来发布你需要的任何数据。

#### 使用脚本通过 HTTPS 发布 {#https-post-with-a-script}

HTTPS 发布可以使用 [fetch 工具](../../../system-information-and-utilities/fetch.md)来实现。为了把来自 Bluetooth 标签（在我们的示例中为 TG-BT5-XX）的数据发布到 Azure，我们将使用该脚本。脚本示例如下所示。

每一行以符号 `#` 开头的内容都是说明，它描述将在该行下方配置的参数。请修改引号 `\"\"` 内适用于你具体情况的参数。

```ros
################################ Configuration ################################
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

有 1 行脚本需要特别注意：

```ros
/tool fetch http-method=post output=user http-header-field="authorization:{sas_token}" http-data=$message url="https://{iot_hub_name}.azure-devices.net/devices/{device_id}/messages/events\?api-version=2020-03-13"
```

将 HTTP 头中的 `{sas_token}` 更改为在 SAS 令牌部分生成的令牌。

将 URL 中的 `{iot_hub_name}` 和 `{device_id}` 更改为在 Azure 门户中配置的实际 IoT Hub 名称和 Device ID。

脚本配置的其余部分取决于整体需求。脚本中说明了配置了哪些确切参数用于发布。

导航到 System>Scripts，在那里添加一个新脚本，并粘贴上方所示的脚本（例如将其命名为 script1）。

要运行脚本，您可以使用命令行：

```ros
/system script run script1
```

### 验证 {#verification}

在 Azure 门户上查看接收/发布的消息有很多不同的方法。请查看 Azure 教程了解你可用的选项。

我们将使用 [Visual Studio Code](https://code.visualstudio.com/) 程序来验证结果。

打开你的 IoT Hub 并开始监控终结点（设备）：

![](/img/da7967098f77735b.webp)

你可以按下图所示在 "OUTPUT" 部分查看已发布的消息。只需运行脚本并检查接收到的消息：

![](/img/9f41852699b32df6.webp)
