---
title: "MQTT/HTTPS 和 AWS 配置"
description: "使用基于 HTTPS 的 MQTT 将 MikroTik Bluetooth tag 数据转发到 Amazon AWS，涵盖 AWS 账户设置、证书和 broker 配置。"
source: https://manual.mikrotik.com/docs/7.25/internet-of-things/bluetooth/user-guides/mqtt-https-and-aws-configuration
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 简介 {#introduction}

监控 Bluetooth 标签广播信息的可选方案之一是使用云系统，例如 AWS（Amazon WEB Services）。本文将介绍如何配置 AWS 和 RouterOS，以使用 MQTT 和 HTTPS 协议发布数据。在此场景中，RouterOS 将充当网关，并将 BLEtag 广播的数据发布到云端（AWS）。AWS 将充当 MQTT broker 和 MQTT 订阅者（用于接收和显示数据的服务器）。

在进行设置之前，需要在 AWS 系统中创建账户。有关如何创建账户的更多信息，请参阅此 [link](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)。

创建账户后，请确认付款卡已在 **Your_Username>My account** 下通过验证，否则账户将不会激活。

进入 **Services>Internet of Things>IoT Core**。

在 **Test** 部分，可以使用内置 MQTT 测试客户端测试发布和订阅主题。通过 **Subscribe to a topic** 和 **Publish to a topic** 选项卡，可以检查这两个过程。MQTT 测试客户端部分也可以显示 HTTPS 发布内容。

### AWS IoT 配置 {#aws-iot-configuration}

:::info
本节所示配置适用于 MQTT 发布/订阅场景，但你也可以使用相同的 AWS 设置测试 HTTPS 发布。
:::

#### Things

步骤 1：导航到 **Manage>Things**。此菜单是配置的起点（Things 菜单表示设备或逻辑实体）。

**

![](/img/e4b443fbae06aae6.webp)

**

按 **Create>Create a single thing>**选择名称**>Next>Create certificate。**

步骤 2：下载 "AmazonRootCA1.pem" 证书（AWS 的 Root CA）、"xxxx.cert.pem" 证书（“thing”的证书）和 "xxxx.private.key" 密钥（私钥）——“xxxx”部分对于每个新创建的证书都是唯一的。

![](/img/7b7c0c910ab10e9d.webp)

步骤 3：可以选择通过 **Done** 完成设置，或通过 **Attach a policy** 设置策略。需要向创建的“thing”添加策略，但如果使用的是新账户，可能没有可供选择的策略。不用担心，可以稍后手动创建它们。

还有两个重要菜单：**Secure>Certificates** 和 **Secure>Policies**。

#### 证书 {#certificates}

在 **Certificates** 菜单中，可以创建证书、激活证书并将其附加到策略。“Things”配置应已创建证书。只需确保证书处于“activated”状态。为此，选择证书，点击“**Actions**”，然后点击“**Activate**”。

![](/img/0ca286e97be93851.webp)

#### Policies

![](/img/61c2acd5a1f96b13.webp)

步骤 1：创建新策略。点击“**Create**”并输入策略名称。在“**Create a policy**”选项卡中，可以设置“actions”。本示例将使用 4 个 action（`iot:Publish`、`iot:Receive`、`iot:Subscribe` 和 `iot:Connect`）。可以通过以下[链接](https://docs.aws.amazon.com/iot/latest/developerguide/example-iot-policies.html)查找有关策略及示例的更多信息。

第 2 步：导航到“**Add statements**”部分。在“**Action**”字段中，选择 **iot:Publish** 和 **iot:Receive** 操作，并用英文逗号“,”分隔。在“**Resource ARN**”字段中，将文本“`replaceWithATopic`”替换为实际相关的主题（例如“`my/test/topic`”）。在“**Effect**”复选框中勾选“**Allow**”。

![](/img/a0cdd99f9c91876a.webp)

第 3 步：点击“**Add statement**”添加一条新语句。选择 **iot:Subscribe** 为该语句添加操作，并将“**Resource ARN**”字段中的文本“`replaceWithATopicFilter`”替换为实际相关的主题（例如“`my/test/topic`”）。在“**Effect**”复选框中勾选“**Allow**”。

![](/img/5c54b0d50ae0f057.webp)

第 4 步：添加最后一条语句并设置 **iot:Connect** 操作。仅将“`replaceWithAClientId`”部分替换为合适的客户端 ID（例如“`test-client`”），并勾选“**Allow**”复选框。要完成设置，请点击“**Create**”。

第 5 步：需要将证书附加到新创建的策略。为此，请转到 **Secure>Certificates**，选择证书，点击“**Actions**”和“**Attach policy**”。

![](/img/b72f51a124767122.webp)

选择策略并点击“**Attach**”。

![](/img/3585aca6bc3b85d9.webp)

至此，AWS 设置已完成。

#### Endpoint Address（Broker 的地址） {#endpoint-address-brokers-address}

可以在“**Settings**”部分（Settings>Device data endpoint）找到 **Endpoint** 地址。该地址应在 RouterOS 设置中配置为 broker 的 IP/FQDN 地址。

![](/img/c88cf0d50ff1a63b.webp)

### RouterOS 配置 {#routeros-configuration}

:::info
配置 MQTT 前，请确保已安装 **iot** 软件包。
:::
在示例中，我们使用 [KNOT](https://mikrotik.com/product/knot) 作为网关，并使用专门为该 KNOT 创建的脚本发布数据。在具体应用场景中，可以使用任意已安装 iot 软件包的 RouterOS 设备发布所需的任意数据。

#### 证书 {#certificates-1}

由于 AWS 使用 SSL 连接，因此需要事先下载的证书和密钥。

进入“Files”菜单，并将 *AmazonRootCA1.pem*、*xxxx.cert.pem.crt* 和 *xxxx.private.pem.crt* 添加到“File list”。

![](/img/3d82fd90f15721b1.webp)

进入 System>Certificates，导入全部 3 个文件（通过“Import”按钮逐个导入）：

![](/img/4cfb83ec34cf5d94.webp)

确保两个证书均为受信任（T），并且“xxxx.certificate.pem.crt”带有私钥（K）。

#### MQTT Broker

进入 IoT>MQTT，点击“+”按钮添加新的 broker。

![](/img/35928a714e886639.webp)

在“Name”字段中命名 broker（例如，**AWS**）。

在“Address”字段中输入或粘贴 AWS 地址（可在 AWS 设置的“**Settings>Device data endpoint**” - **Endpoint address** 中找到）。

在“Port”字段中配置 broker 使用的端口，并通过 SSL 复选框启用 SSL（本例中的 AWS 使用 **8883**，由于使用证书，因此需要**启用 SSL**）。

此场景中不需要填写“Username”和“Password”字段（取决于 broker 的配置，跳过这两个字段）。

在“Client Id”字段中设置 client-id（这是在 AWS 策略中配置的 ID，本示例中为 **`test-client`**）。

由于使用 SSL，必须在“Certificate”字段中选择证书（选择 ***xxxx.certificate.pem.crt***）。

点击“Apply”和“OK”完成 broker 设置。

#### 使用脚本发布 MQTT {#mqtt-publish-with-a-script}

要将数据从 Bluetooth tag（在本示例中为 TG-BT5-IN）发布到 AWS，需要使用脚本。脚本示例如下所示。

每一行以符号 `#` 开头的内容都是说明性内容，用于描述该行下方将要配置的参数。请根据实际情况修改引号 `""` 内的参数。

```ros
## Required packages: iot

################################ Configuration ################################
## Name of an existing MQTT broker that should be used for publishing
:local broker "AWS"

## MQTT topic where the message should be published
:local topic "my/test/topic"

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

应考虑 2 行脚本。

```
:local broker "AWS"
```

在引号 `""` 内指定 broker 名称的行（在本示例中为 **AWS**）。

```
:local topic "my/test/topic"
```

在引号 `""` 内指定正确 topic 的行。topic 在 AWS 策略中配置（在本示例中为 **my/test/topic**）。

其余脚本配置取决于整体需求。该脚本说明了配置发布的具体参数。

导航到 System>Scripts，添加新脚本，并粘贴上方显示的脚本（例如命名为 script1）。

要运行该脚本，可以使用命令行：

```
/system script run script1
```

#### 使用脚本进行 HTTPS post {#https-post-with-a-script}

另一种可用于将数据从网关发布到云的协议是 HTTPS。可以使用 [fetch 工具](/docs/7.24/system-information-and-utilities/fetch)实现。在 7.1beta6 之前的 RouterOS 版本中，fetch 没有用于身份验证时选择客户端证书的选项（这意味着不支持使用客户端证书进行 HTTPS 发布）；在 7.1beta6 中新增了一项功能，支持此设置。使用 CURL 和 Python 进行 HTTPS 发布的示例以及其他有用信息，请参阅 [AWS HTTPS 手册](https://docs.aws.amazon.com/iot/latest/developerguide/http.html)。

为了将 Bluetooth 标签（在本例中为 TG-BT5-IN）的数据发布到 AWS，我们将使用该脚本。脚本示例如下所示。

每一行以符号 `#` 开头的内容都是说明性内容，用于描述该行下方将要配置的参数。请根据实际情况修改引号 `""` 内的参数。

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

需要注意 1 行脚本：

```
/tool fetch certificate=f79dda4ec5-certificate.pem.crt.txt_0 http-method=post output=user http-header-field="Content-Type:application/json" http-data=$message url="https://xxxxxx.iot.us-east-2.amazonaws.com:8443/topics/my/test/topic"
```

请根据实际情况相应地修改证书名称和 URL：

`url="https://xxxx:8443/topics/yyyy"`，其中“xxxx”是 AWS endpoint 地址，“yyyy”是在 AWS 策略中配置的 topic——步骤 2 和步骤 3（在本示例中为 my/test/topic）。

其余脚本配置取决于整体需求。该脚本说明了配置发布的具体参数。

导航到 System>Scripts，在其中添加新脚本，并粘贴上面显示的脚本（例如，将其命名为 script2）。

要运行该脚本，可以使用命令行：

`/system script run script2`

### 验证 {#verification}

要验证 AWS 是否接收到数据，请返回 AWS 门户。导航到 **Test** 页面。使用 **Subscribe to a topic** 选项。在 **Topic filter** 字段中输入在 AWS 策略中配置的 topic（在本示例中为 **my/test/topic**），然后按 **Subscribe**。在下方应看到 **Subscriptions** 部分，数据将在此显示。在 RouterOS 中运行脚本，应能在“**Subscriptions**”选项卡中看到收集到的数据。

![](/img/6aa5a7ba0bbb2709.webp)

同一页面/选项卡也应显示 HTTPS posted 数据包。
