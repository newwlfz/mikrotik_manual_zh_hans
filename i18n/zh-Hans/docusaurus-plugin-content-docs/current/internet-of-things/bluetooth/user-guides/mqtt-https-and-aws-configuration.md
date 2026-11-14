---
sidebar_key: "internet-of-things/bluetooth/user-guides/mqtt-https-and-aws-configuration"
sidebar_position: 6
title: "MQTT/HTTPS 和 AWS 配置"
sidebar_label: "MQTT/HTTPS 和 AWS 配置"
description: "通过基于 HTTPS 的 MQTT 将 MikroTik Bluetooth 标签数据转发到 Amazon AWS，涵盖 AWS 账户设置、证书和代理配置。"
source: https://manual.mikrotik.com/docs/internet-of-things/bluetooth/user-guides/mqtt-https-and-aws-configuration
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

可用于监控蓝牙标签广播信息的选项之一是云系统，例如 AWS（Amazon WEB Services）。本文将展示如何配置 AWS 和 RouterOS，以使用 MQTT 和 HTTPS 协议发布数据。在此场景中，RouterOS 将充当网关，并将 BLEtag 广播的数据发布到云（AWS）。在此场景中，AWS 将充当 MQTT broker 和 MQTT subscriber（用于发布/显示数据的服务器）。

在继续设置之前，您需要在 AWS 系统中创建账户。您可以访问此[链接](https://repost.aws/knowledge-center/create-and-activate-aws-account)了解有关如何操作的更多信息。

创建账户后，请确保支付卡在 **Your_Username>My account** 下通过验证，否则账户将无法激活。

转到 **Services>Internet of Things>IoT Core**。

在 **Test** 部分，您可以使用内置的 MQTT 测试客户端，以便测试发布和订阅主题。您有 **Subscribe to a topic** 和 **Publish to a topic** 选项卡，可用于检查这两个过程。MQTT 测试客户端部分还可以显示 HTTPS 发布内容。

### AWS IoT 配置 {#aws-iot-configuration}

:::info
本节所示的配置适用于 MQTT 发布/订阅场景，但您也可以使用相同的 AWS 设置测试 HTTPS 发布。
:::

#### 事项 {#things}

步骤 1：转到 **Manage>Things**。这是配置开始的菜单（Things 菜单表示设备或逻辑实体）。

**

![](/img/e4b443fbae06aae6.webp)

**

按 **Create>Create a single thing>**选择名称**>Next>Create certificate.**

步骤 2：下载“AmazonRootCA1.pem”证书（AWS 的根 CA）、“xxxx.cert.pem”证书（用于“thing”的证书）和“xxxx.private.key”密钥（私钥）——“xxxx”部分对于每个新创建的证书都是唯一的。

![](/img/7b7c0c910ab10e9d.webp)

步骤 3：您可以选择完成设置（通过选择 **Done**），或者设置策略（通过选择 **Attach a policy**）。您需要为创建的“thing”添加策略，但如果您使用新账户进行操作，可能没有任何可供选择的策略。不用担心，您可以稍后手动创建它们。

还有两个重要的菜单——**Secure>Certificates** 和 **Secure>Policies**。

#### 证书 {#certificates}

在 **Certificates** 菜单中，您可以创建证书、激活证书并将其附加到策略。配置“Things”时应该已经创建了证书。只需确保证书已“激活”。为此，选择该证书，点击“**Actions**”，然后点击“**Activate**”。

![](/img/0ca286e97be93851.webp)

#### 策略 {#policies}

![](/img/61c2acd5a1f96b13.webp)

步骤 1：创建新策略。点击“**Create**”并输入策略名称。在“**Create a policy**”选项卡中，您可以选择设置“操作”。在本示例中，我们将使用 4 个操作（`iot:Publish`、`iot:Receive`、`iot:Subscribe` 和 `iot:Connect`）。您可以访问此[链接](https://docs.aws.amazon.com/iot/latest/developerguide/example-iot-policies.html)了解有关策略及示例的更多信息。

步骤 2：转到“**Add statements**”部分。在“**Action**”字段中，选择 **iot:Publish** 和 **iot:Receive** 操作，并用逗号“,”分隔它们。在“**Resource ARN**”字段中，将文本“`replaceWithATopic`”替换为实际相关的主题（例如“`my/test/topic`”）。在“**Effect**”复选框中勾选“**Allow**”。

![](/img/a0cdd99f9c91876a.webp)

步骤 3：通过点击“**Add statement**”添加新语句。通过选择 **iot:Subscribe** 向语句添加操作，并将“**Resource ARN**”字段中的文本“`replaceWithATopicFilter`”替换为实际相关的主题（例如“`my/test/topic`”）。在“**Effect**”复选框中勾选“**Allow**”。

![](/img/5c54b0d50ae0f057.webp)

步骤 4：添加最后一条语句并设置 **iot:Connect** 操作。仅将“`replaceWithAClientId`”部分更改为合适的 client-id（例如“`test-client`”），并勾选“**Allow**”复选框。要完成设置，请点击“**Create**”。

步骤 5：您需要将证书附加到新创建的策略。为此，请转到 **Secure>Certificates**，选择该证书，点击“**Actions**”和“**Attach policy**”。

![](/img/b72f51a124767122.webp)

选择该策略并点击“**Attach**”。

![](/img/3585aca6bc3b85d9.webp)

至此，AWS 设置完成。

#### 端点地址（Broker 的地址） {#endpoint-address-brokers-address}

您可以在“**Settings**”部分（Settings>Device data endpoint）找到 **Endpoint** 地址。在 RouterOS 设置中，应将此地址配置为 broker 的 IP/FQDN 地址。

![](/img/c88cf0d50ff1a63b.webp)

### RouterOS 配置 {#routeros-configuration}

:::info
为了配置 MQTT，请确保事先已安装 **iot** 软件包。
:::
在我们的示例中，我们使用 [KNOT](https://mikrotik.com/product/knot) 作为网关，并使用一个（专为 KNOT 创建的）脚本来发布数据。在你的具体应用场景中，你可以使用任何 RouterOS 设备（已安装 iot 软件包）来发布你需要的任何数据。

#### 证书 {#certificates-1}

由于 AWS 使用 SSL 连接，我们需要之前下载的证书和密钥。

转到“Files”菜单，并将 *AmazonRootCA1.pem*、*xxxx.cert.pem.crt* 和 *xxxx.private.pem.crt* 添加到“File list”。

![](/img/3d82fd90f15721b1.webp)

转到 System>Certificates，并导入全部 3 个文件（通过 "Import" 按钮——逐个导入）：

![](/img/4cfb83ec34cf5d94.webp)

确保两个证书都受信任（T），并且“xxxx.certificate.pem.crt”带有私钥（K）。

#### MQTT 代理 {#mqtt-broker}

转到 IoT>MQTT 并添加新的 broker（“+”按钮）。

![](/img/35928a714e886639.webp)

在“Name”字段中为 broker 命名（例如 **AWS**）。

在“Address”字段中输入/粘贴 AWS 地址（您可以在 AWS 设置“**Settings>Device data endpoint**”中找到它——**Endpoint address**）。

在“Port”字段中配置 broker 使用的端口，并通过 SSL 复选框启用 SSL（在此情况下，AWS 使用 **8883**，并且由于我们使用证书，因此需要**启用 SSL**）。

“Username”和“Password”字段在此场景中不是必需的（取决于 broker 的配置——跳过这两个字段）。

在“Client Id”字段中设置 client-id（它是在 AWS 策略中配置的 ID——在本示例中为 **`test-client`**）。

由于使用了 SSL，必须在“Certificate”字段中选择证书（选择 ***xxxx.certificate.pem.crt***）。

单击 "Apply" 和 "OK" 完成 broker 设置。

#### 使用脚本进行 MQTT 发布 {#mqtt-publish-with-a-script}

为了将蓝牙标签（在本示例中为 TG-BT5-IN）的数据发布到 AWS，我们将使用脚本。脚本示例如下所示。

每一行以符号 `#` 开头的内容都是说明，它描述将在该行下方配置的参数。请修改引号 `\"\"` 内适用于你具体情况的参数。

```ros
## 所需软件包：iot

################################ Configuration ################################
## 用于发布的现有 MQTT broker 的名称
:local broker "AWS"

## 消息应发布到的 MQTT 主题
:local topic "my/test/topic"

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

应注意 2 行脚本。

```
:local broker "AWS"
```

行，您需要在引号 `""` 中指定 broker 的名称（在我们的示例中为 **AWS**）。

```
:local topic "my/test/topic"
```

行，您需要在引号 `""` 中指定正确的主题。主题在 AWS 策略中配置（在我们的示例中为 **my/test/topic**）。

脚本配置的其余部分取决于整体需求。脚本中说明了配置了哪些确切参数用于发布。

导航到 System>Scripts，在那里添加一个新脚本，并粘贴上方所示的脚本（例如将其命名为 script1）。

要运行脚本，您可以使用命令行：

```
/system script run script1
```

#### 使用脚本通过 HTTPS 发布 {#https-post-with-a-script}

另一种可用于将数据从网关发布到云的协议是 HTTPS。这可以通过 [fetch 工具](../../../system-information-and-utilities/fetch.md)实现。在 RouterOS 7.1beta6 版本之前，fetch 没有用于选择客户端证书进行身份验证的选项（这意味着不支持使用客户端证书进行 HTTPS 发布），而在 7.1beta6 中添加了一项新功能，可启用此设置/支持。使用 CURL 和 Python 的 HTTPS 发布示例（以及其他有用信息）显示在 [AWS HTTPS 手册](https://docs.aws.amazon.com/iot/latest/developerguide/http.html)中。

为了将蓝牙标签（在本示例中为 TG-BT5-IN）的数据发布到 AWS，我们将使用脚本。脚本示例如下所示。

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

#################################### MQTT #####################################
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
/tool fetch certificate=f79dda4ec5-certificate.pem.crt.txt_0 http-method=post output=user http-header-field="Content-Type:application/json" http-data=$message url="https://xxxxx.iot.us-east-2.amazonaws.com:8443/topics/my/test/topic"

:put ("[*] Done")
```

有 1 行脚本需要特别注意：

```
/tool fetch certificate=f79dda4ec5-certificate.pem.crt.txt_0 http-method=post output=user http-header-field="Content-Type:application/json" http-data=$message url="https://xxxxxx.iot.us-east-2.amazonaws.com:8443/topics/my/test/topic"
```

请根据您的具体情况更改证书名称和 URL：

`url="https://xxxx:8443/topics/yyyy"`，其中“xxxx”是 AWS 端点地址，“yyyy”是在 AWS 策略中配置的主题——步骤 2 和 3（在本示例中为 my/test/topic）。

脚本配置的其余部分取决于整体需求。脚本中说明了配置了哪些确切参数用于发布。

转到 System>Scripts，在其中添加新脚本，并粘贴上面显示的脚本（例如将其命名为 script2）。

要运行脚本，您可以使用命令行：

`/system script run script2`

### 验证 {#verification}

要验证 AWS 是否收到数据，请返回 AWS 门户。转到 **Test** 页面。使用 **Subscribe to a topic** 选项。在 **Topic filter** 字段中输入在 AWS 策略中配置的主题（在本示例中为 **my/test/topic**），然后按 **Subscribe**。在下方，您应该会看到 **Subscriptions** 部分，数据将显示在其中。运行脚本（在 RouterOS 中），您应该会在“**Subscriptions**”选项卡中看到收集的数据。

![](/img/6aa5a7ba0bbb2709.webp)

同一页面/选项卡也应显示通过 HTTPS 发布的数据包。
