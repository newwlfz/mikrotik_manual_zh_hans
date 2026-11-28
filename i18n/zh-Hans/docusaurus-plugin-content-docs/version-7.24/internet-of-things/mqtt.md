---
title: "MQTT"
description: "本页介绍 MikroTik RouterOS 中的 MQTT 集成，涵盖面向 Kaa 和 ThingsBoard 等 IoT 平台的发布者/订阅者工作流。文中说明 MQTT 协议基础、RouterOS 作为 MQTT broker/客户端的能力，并提供 AWS/Azure 云平台的配置示例。"
tags:
  - 'mqtt'
  - 'iot'
  - 'publish-subscribe'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/mqtt
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 MQTT 集成示例。可使用这些示例将 RouterOS MQTT 发布和订阅工作流连接到 Kaa IoT 和 ThingsBoard 等 IoT 平台。

<DocCardList />

MQTT 是开放的 OASIS 和 ISO 标准轻量级发布/订阅网络协议，用于在设备之间传输消息。典型的 MQTT 通信拓扑包括：

- MQTT 发布者 → 向服务器发送信息的设备。
- MQTT 代理 → 存储数据的服务器。
- MQTT 订阅者 → 读取/监控服务器上已发布数据的设备。

RouterOS 可以充当 MQTT 发布者和订阅者（从 **7.11beta2** 开始）。也可以通过 [container](/docs/containers) 功能运行 MQTT 代理/服务器。有关 Mosquitto MQTT 代理配置，请访问[此处链接](/docs/containers/user-guides/container-mosquitto-mqtt-server)。

可在下方找到 MQTT 发布场景的应用示例：

a) [MQTT/HTTPS example with AWS cloud platform](https://help.mikrotik.com/docs/pages/viewpage.action?pageId=63045633)

b) [MQTT example with Azure cloud platform](https://help.mikrotik.com/docs/display/UM/MQTT+and+Azure+configuration)

c) [MQTT and ThingsBoard configuration](/docs/internet-of-things/mqtt/mqtt-and-thingsboard-configuration)

请注意，AWS 和 Azure 示例（脚本）展示的是发布 Bluetooth 标签数据。目前，只有 [KNOT](https://mikrotik.com/product/knot) 内置 Bluetooth 芯片。

## 配置 {#configuration}

**子菜单：** `/iot/mqtt`

***note**:* 需要 **iot** 软件包。

IoT 软件包从 RouterOS 6.48.3 开始提供。可以从[下载页面](https://mikrotik.com/download)的“Extra packages”下获取。

| 属性 | 说明 |
| :-- | :-- |
| **brokers** | 已配置的 MQTT broker 列表。 |
| **connect** | 指定要连接的 broker 的命令。 |
| **disconnect** | 指定要断开连接的 broker 的命令。 |
| **publish** | 定义需要发布的 MQTT 消息的命令。 |
| **subscribe** | 定义要订阅的 MQTT 主题的命令。 |
| **subscriptions** | 已订阅主题和已接收消息的列表。 |
| **unsubscribe** | 指定要取消订阅的主题的命令。 |

### Brokers

**子菜单：** `/iot/mqtt/brokers`

要添加新的 MQTT broker（或 MQTT 服务器），请运行以下命令：

```ros
/iot/mqtt/brokers/add
```

可配置属性如下所示：

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP\|hostname*；默认值： ) | broker 的 IP 地址或主机名。 |
| **auto-connect** (*yes \| no*；默认值：**no**) | 启用后，当与 MQTT broker 的连接中断或断开时，RouterOS 会不断尝试重新建立连接。 |
| **certificate** (*string*；默认值： ) | 用于 SSL 连接的证书。 |
| **client-id** (*string*；默认值： ) | 用于连接的唯一 ID。broker 使用该 ID 识别客户端。 |
| **keep-alive** (*integer:30..64800*；默认值：**60**) | 该参数定义客户端应向 MQTT broker “ping”以表明其“存活”的时间（以秒为单位），从而确保连接持续保持。该值应根据 MQTT broker 设置进行配置。 |
| **name** (*string*；默认值： ) | broker 的描述性名称。 |
| **parallel-scripts-limit**(*integer:3..1000;* 默认值：off) | 该参数定义该 broker 的 [on-message](#subscriptions) 功能允许同时运行的脚本数量。当持续发布大量消息时，可用于降低 CPU 占用。 |
| **password** (*string*；默认值： ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | broker 的密码（如果 broker 要求）。 |
| **port** (*integer:*0..4294967295**；默认值：**1883**) | broker 使用的网络端口。 |
| **ssl** (*yes \| no*；默认值：**no**) | Secure Socket Layer 配置。 |
| **username** (*string*；默认值： ) | broker 的用户名（如果 broker 要求）。 |
| **will-message** (*string*；默认值： ) | 配置 Last Will and Testament（LWT）消息，该消息将在连接期间发送到 broker。该消息会存储在 broker 上。除非 RouterOS 意外断开与 broker 的连接（未发送正确的“DISCONNECT”数据包），否则 broker 不会发布该消息。 |
| **will-qos**(*integer*；默认值： ) | 配置 LWT 消息的 QoS 值。 |
| **will-retain**(yes \| no；默认值： ) | 配置 LWT 消息是否保留。 |
| **will-topic**(*string*；默认值： ) | 配置 LWT 主题，**will-message** 将发布到该主题。 |

添加 broker 的示例：

```ros
/iot/mqtt/brokers/add name="broker" address="192.168.88.33" port=1883 ssl=no client-id="test-client" auto-connect=no keep-alive=60
```

结果如下：

```ros
/iot/mqtt/brokers/print
 0 name="broker" address="192.168.88.33" port=1883 ssl=no client-id="test-client" auto-connect=no keep-alive=60 connected=no 
```

### 连接 {#connect}

**子菜单：** `/iot/mqtt/connect`

要连接到预先配置的 MQTT broker，请执行命令：

```ros
/iot/mqtt/connect broker="broker"
```

如果连接成功，“**connected**”参数应变为“**yes**”：

```ros
/iot/mqtt/brokers/print
 0 name="broker" address="192.168.88.33" port=1883 ssl=no client-id="test-client" auto-connect=no keep-alive=60 connected=yes
```

### Disconnect

**子菜单：** `/iot/mqtt/disconnect`

要断开与 MQTT broker 的连接，请执行命令：

```ros
/iot/mqtt/disconnect broker="broker"
```

要确认 broker 已断开连接，请执行以下命令，输出应显示“**connected=no**”：

```ros
/iot/mqtt/brokers/print            
 0 name="broker" address="192.168.88.33" port=1883 ssl=no client-id="test-client" auto-connect=no keep-alive=60 connected=no 
```

### 发布 {#publish}

**子菜单：** `/iot/mqtt/publish`

Publish 菜单用于向 MQTT broker 发送 MQTT 消息。

| Property | Description |
| :-- | :-- |
| **broker** (*string*; Default: ) | 选择要发布消息的 broker。 |
| **disconnect-after** (*yes \| no*; Default: **no**) | 该参数确保在消息发送后自动断开与 broker 的连接。 |
| **force** (*yes \| no*; Default: **yes**) | 如果设置为“yes”，当与 broker 的连接尚未建立（“**connected=no**”）且尝试发布消息时，RouterOS 会先尝试与指定 broker 建立 MQTT 连接，然后发布消息。如果设置为“no”，除非事先已建立连接（“**connected=yes**”），否则 RouterOS 无法发送消息。 |
| **message** (*string*; Default: ) | 要发布到 broker 的消息。 |
| **qos** (*integer:*0..2**; Default: **0**) | 由 broker 定义的服务质量参数。<br/><ul><li>qos=0 → 消息最多接收一次（消息发送后不再确认，即 fire and forget）；</li><li>qos=1 → 消息至少接收一次（消息会持续发送，直到发布者收到 broker 发来的确认数据包 <code>PUBACK</code>）；</li><li>qos=2 → 消息恰好接收一次（消息发送后会进行 4 次数据包交换，以确保仅送达一次）；</li></ul> |
| **retain** (*yes \| no*; Default: **no**) | 是否保留消息，或在无人订阅该主题时丢弃消息。该参数由 broker 定义。<br/> 保留的消息会保存在 broker 上，并由 broker 自动发送给新的订阅者。 |
| **topic** (*string*; Default: ) | 由 broker 定义的主题。 |

发布消息的示例：

```ros
/iot/mqtt/publish message="test-message" broker="broker" topic="my/test/topic"
```

### 订阅 {#subscribe}

**子菜单：** `/iot/mqtt/subscribe`

:::info
请记住，如果与 broker 的连接仍在进行中（连接处于“**connected=yes**”状态），并且通过该 broker 订阅主题，则必须重新建立连接！
:::

此菜单用于从 broker 订阅 MQTT 主题。

| 属性 | 说明 |
| :-- | :-- |
| **broker** (*string*; Default: ) | 选择要订阅的 broker。 |
| **force** (*yes \| no*; Default: **yes**) | 如果设置为“yes”，当与 broker 的连接尚未建立（“**connected=no**”）且尝试订阅时，RouterOS 将先尝试与指定 broker 建立 MQTT 连接，然后订阅主题。如果设置为“no”，除非事先已建立连接（“**connected=yes**”），否则 RouterOS 将无法订阅主题。 |
| **qos** (*integer:*0..2**; Default: **0**) | 服务质量参数，由 broker 定义。 |
| **topic** (*string*; Default: ) | 要订阅的主题，由 broker 定义。 |

#### 订阅示例 {#an-example-of-a-subscription}

```ros
/iot/mqtt/subscribe broker="broker" topic="my/test/topic"
```

也支持通配符（单级“**+**”和多级“**#**”）订阅（RouterOS **不允许向**通配符主题**发布消息**，但**允许订阅**这些主题）：

```ros
/iot/mqtt/subscribe broker="broker" topic="my/test/#"
/iot/mqtt/subscribe broker="broker" topic="my/test/+"
```

这意味着，如果订阅 `topic="my/test/#"`，则可以接收发布到任何以通配符符号“#”之前模式开头的主题的消息（例如，`"my/test/topic"`、`"my/test/topic/something"`）。

并且，如果订阅 `topic="my/test/+"`，则可以接收发布到 +1 级主题的消息（例如，`"my/test/topic"`、`"my/test/something"`）。

### 订阅 {#subscriptions}

**子菜单：** `/iot/mqtt/subscriptions`

本节用于管理已添加的订阅（此前通过 [Subscribe](/docs/internet-of-things/mqtt#subscribe) 部分添加）。

它与 [Subscribe](/docs/internet-of-things/mqtt#subscribe) 部分具有相同的属性。

:::info
从 **v7.12beta9** 开始，此菜单允许你为订阅添加“**on-message**”设置。
:::

| 属性 | 说明 |
| :-- | :-- |
| **on-message**（*string*；默认值：） | 配置一个 [脚本](/docs/developer-guides/scripting)，当订阅主题收到新消息时，该脚本将自动启动或运行。 |

要检查已订阅的主题，请执行命令：

```ros
/iot/mqtt/subscriptions/print
0 broker=broker topic="my/test/topic" qos=0
```

按照上文 **Publish** 部分所示发布测试消息后：

```ros
/iot/mqtt/publish message="test-message" broker="broker" topic="my/test/topic"
```

你应能在以下位置检查收到的消息：

```ros
/iot/mqtt/subscriptions/recv/print
 0 broker=broker topic="my/test/topic" data="test-message" time=2023-05-22 16:57:00 
```

:::info
接收到的消息列表限制为 1024 条，超过后，旧条目将被新条目覆盖。
:::

要清除已存储的消息，请执行命令：

```ros
/iot/mqtt/subscriptions/recv/clear
```

要在订阅主题中出现任何新消息时运行[脚本](/docs/developer-guides/scripting)（例如基本的“log”脚本），可以使用 `on-message` 功能：

```ros
/iot/mqtt/subscriptions/set on-message={:log info "Got data {$msgData} from topic {$msgTopic}"} broker=broker 0
```

脚本可以使用 **$msgData** 和 **$msgTopic** 变量。**$msgData** 定义已发布的 MQTT 消息，**$msgTopic** 定义消息发布到的 MQTT 主题。当出现新消息时，这两个变量会自动生成。

:::note

- **$msgData** 和 **$msgTopic** 变量在“**System>Script**”部分创建的脚本中不起作用，也就是说，它们在“/iot/mqtt/subscriptions/set **on-message=\{`/system/script/run` x}**”中添加的脚本内不起作用。这两个变量仅在写入“**on-message=\{}**”的脚本内使用时有效，例如“**on-message=\{:log info "Got data \{$msgData} from topic \{$msgTopic}"}**”。
- [global](/docs/developer-guides/scripting#scopes) 变量的使用也是如此。如果全局变量是通过其他脚本“生成”的（出现在 System>Script>Environment 部分下的变量），它们将无法在“on-message”脚本中使用。
:::

向订阅主题发布新的 MQTT 消息后，应出现一条新的日志条目：

```ros
/log/print
10:19:15 script,info Got data {test-message} from topic {my/test/topic}
```

第二个示例展示如何在出现特定消息（消息中的关键字）时运行脚本。要实现仅在 MQTT 消息包含特定内容或关键字时运行脚本的场景，可以使用 **if** [条件语句](/docs/developer-guides/scripting#conditional-statement)：

```ros
/iot/mqtt/subscriptions/set 0 on-message={:if ($msgData~"\\{\"test\":\"123\"\\}") do={:log info "Got data {$msgData} from topic {$msgTopic}"}}
```

Or:

```ros
/iot/mqtt/subscriptions/set 0 on-message={:if ($msgData~"test") do={:log info "Got data {$msgData} from topic {$msgTopic}"}}
```

因此，在每次收到 MQTT 消息时，脚本都会检查 if 条件是否为真。如果为真（如果 **$msgData** 包含 JSON 字符串 **\{"test":"123"}** 或 **$msgData** 包含字符串“**test**”），将生成日志条目。否则，不会发生任何操作。

这意味着，只有在发布如下消息时才会运行脚本：

```ros
/iot/mqtt/publish broker=broker topic="my/test/topic" message="{\"test\":\"123\"}"
```

当你收到来自某个主题的消息，而该主题符合多个配置了 `on-message` 的订阅时，只会运行 **x1** 个 `on-message` 脚本。RouterOS 将按以下逻辑/优先级选择要运行的 `on-message` 脚本：

1. 如果为订阅配置的主题完全匹配 → 第一优先级。
2. 如果主题名称不是完全匹配（使用了通配符）→ 第二优先级适用于单层通配符主题。
3. 如果主题不属于单层通配符类别 → 第三优先级适用于基于主题层级的多层通配符主题。

示例：

```ros
/iot/mqtt/subscriptions/print
 0 broker=broker topic="some/sort/of/topic" qos=0 on-message="/system/script/run script1" 

 1 broker=broker topic="some/#" qos=0 on-message="/system/script/run script2" 

 2 broker=broker topic="some/sort/of/+" qos=0 on-message="/system/script/run script3"  

 3 broker=broker topic="some/thing/#" qos=0 on-message="/system/script/run script4"   
```

当向 `some/sort/of/topic` 发布数据时，将启动 script1，因为该主题完全匹配。

当向 `some/sort/of/thing` 发布数据时，将启动 script3 → 因为它符合单层 1v1 通配符主题名称。

当向 `some/name` 发布数据时，将启动 script2 → 因为它符合多层通配符主题名称。

当向 `some/thing/else` 发布数据时，将启动 script 4 → 因为它符合多层通配符主题名称（即使它也匹配 `some/#` 通配符，但它距离 `some/thing/#` 条目更近一个层级）。

### 取消订阅 {#unsubscribe}

**子菜单：** `/iot/mqtt/unsubscribe`

| 属性 | 说明 |
| :-- | :-- |
| **broker** (*string*；默认值：) | 选择要取消订阅的 broker。 |
| **topic** (*string*；默认值：) | 选择由 broker 定义的要取消订阅的 topic。 |

下面显示从 broker 和 topic 取消订阅的示例：

```ros
/iot/mqtt/unsubscribe broker="broker" topic="my/test/topic"
```

## 使用脚本发布 RouterOS 统计信息 {#publishing-routeros-statistics-using-scripts}

你还可以使用 [脚本](/docs/developer-guides/scripting) 组织包含 RouterOS 统计信息的 MQTT 消息。然后，可以应用 [调度器](/docs/system-information-and-utilities/scheduler) 在需要时运行脚本。

例如，可以运行类似 [mqttpublish.rsc](pathname:///assets/200573055_mqttpublish.rsc) 的脚本（将下面显示的 RouterOS 代码内容复制到新终端中，然后按 <kbd>Enter</kbd>）：

```ros
/system/script/add dont-require-permissions=no name=mqttpublish owner=admin policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="#\
    \_Required packages: iot\r\
    \n\r\
    \n################################ Configuration #########################\
    #######\r\
    \n# Name of an existing MQTT broker that should be used for publishing\r\
    \n:local broker \"broker\"\r\
    \n\r\
    \n# MQTT topic where the message should be published\r\
    \n:local topic \"my/test/topic\"\r\
    \n\r\
    \n#################################### System ############################\
    #######\r\
    \n:put (\"[*] Gathering system info...\")\r\
    \n:local cpuLoad [/system/resource/get cpu-load]\r\
    \n:local freeMemory [/system/resource/get free-memory]\r\
    \n:local usedMemory ([/system/resource/get total-memory] - \$freeMemory)\r\
    \n:local rosVersion [/system/package/get value-name=version \\\r\
    \n\A0 \A0 [/system/package/find where name ~ \"^routeros\"]]\r\
    \n:local model [/system/routerboard/get value-name=model]\r\
    \n:local serialNumber [/system/routerboard/get value-name=serial-number]\r\
    \n:local upTime [/system/resource/get uptime]\r\
    \n\r\
    \n#################################### MQTT ##############################\
    #######\r\
    \n:local message \\\r\
    \n\A0 \A0 \"{\\\"model\\\":\\\"\$model\\\",\\\r\
    \n\A0 \A0 \A0 \A0 \A0 \A0 \A0 \A0 \\\"sn\\\":\\\"\$serialNumber\\\",\\\r\
    \n\A0 \A0 \A0 \A0 \A0 \A0 \A0 \A0 \\\"ros\\\":\\\"\$rosVersion\\\",\\\r\
    \n\A0 \A0 \A0 \A0 \A0 \A0 \A0 \A0 \\\"cpu\\\":\$cpuLoad,\\\r\
    \n\A0 \A0 \A0 \A0 \A0 \A0 \A0 \A0 \\\"umem\\\":\$usedMemory,\\\r\
    \n\A0 \A0 \A0 \A0 \A0 \A0 \A0 \A0 \\\"fmem\\\":\$freeMemory,\\\r\
    \n\A0 \A0 \A0 \A0 \A0 \A0 \A0 \A0 \\\"uptime\\\":\\\"\$upTime\\\"}\"\r\
    \n\r\
    \n:log info \"\$message\";\r\
    \n:put (\"[*] Total message size: \$[:len \$message] bytes\")\r\
    \n:put (\"[*] Sending message to MQTT broker...\")\r\
    \n/iot/mqtt/publish broker=\$broker topic=\$topic message=\$message\r\
    \n:put (\"[*] Done\")"
```

该脚本从 RouterOS 收集数据（型号名称、序列号、RouterOS 版本、当前 CPU、已用内存、空闲内存和运行时间），并以 JSON 格式将消息（数据）发布到 broker：

```ros
/system/script/run mqttpublish
[*] Gathering system info...
[*] Total message size: 125 bytes
[*] Sending message to MQTT broker...

[*] Done
```

可以订阅该主题以查看结果：

```ros
/iot/mqtt/subscriptions/recv/print
 0 broker=broker topic="my/test/topic" data="{"model":"RB924i-2nD-BT5&BG77","sn":"E9C80EAEXXXX","ros":"7.9","cpu":13,"umem":47476736,
     "fmem":19632128,"uptime":"02:21:18"}" 
   time=2023-05-22 17:03:52 
```

请勿忘记根据你的设置修改脚本中的“Configuration”部分（主题和 broker）。
