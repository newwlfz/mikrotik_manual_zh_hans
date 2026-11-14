---
sidebar_key: "internet-of-things/mqtt"
title: "MQTT"
sidebar_label: "MQTT"
description: "本页介绍 MikroTik RouterOS 中的 MQTT 集成，涵盖面向 Kaa 和 ThingsBoard 等 IoT 平台的发布者/订阅者工作流程。其中讲解了 MQTT 协议基础、RouterOS 作为 MQTT broker/client 的能力，并提供了针对 AWS/Azure 云平台的配置示例。"
tags:
  - 'mqtt'
  - 'iot'
  - 'publish-subscribe'
source: https://manual.mikrotik.com/docs/internet-of-things/mqtt
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 MQTT 集成示例。可通过这些示例把 RouterOS 的 MQTT 发布与订阅工作流接入 Kaa IoT、ThingsBoard 等物联网平台。

<DocCardList />

MQTT 是一种开放、遵循 OASIS 和 ISO 标准的轻量级发布-订阅网络协议，用于在设备之间传输消息。典型的 MQTT 通信拓扑包括：

- MQTT 发布者 → 向服务器发送信息的设备。
- MQTT broker → 存储数据的服务器。
- MQTT 订阅者 → 读取/监视服务器上已发布数据的设备。

RouterOS 可以充当 MQTT 发布者和订阅者（从 **7.11beta2** 开始）。你也可以通过 [container](../../containers/index.md) 功能运行 MQTT broker/服务器。有关 Mosquitto MQTT broker 的配置，请访问[此链接](../../containers/user-guides/container-mosquitto-mqtt-server.md)。

以下是可以找到的 MQTT 发布场景应用示例：

a) [使用 AWS 云平台的 MQTT/HTTPS 示例](https://help.mikrotik.com/docs/pages/viewpage.action?pageId=63045633)

b) [使用 Azure 云平台的 MQTT 示例](https://help.mikrotik.com/docs/display/UM/MQTT+and+Azure+configuration)

c) [MQTT 与 ThingsBoard 配置](./mqtt-and-thingsboard-configuration.md)

请注意，AWS 和 Azure 示例（脚本）演示的是发布蓝牙标签数据。目前只有 [KNOT](https://mikrotik.com/product/knot) 内置蓝牙芯片。

## 配置 {#configuration}

**子菜单：** `/iot/mqtt`

***注意**：* 需要 **iot** 软件包。

IoT 软件包从 RouterOS 6.48.3 版本开始提供。你可以从我们的[下载页面](https://mikrotik.com/download)获取它——位于“Extra packages”下。

| 属性 | 描述 |
| :-- | :-- |
| **brokers** | 已配置的 MQTT broker 列表。 |
| **connect** | 用于指定要连接哪个 broker 的命令。 |
| **disconnect** | 用于指定要断开哪个 broker 的命令。 |
| **publish** | 用于定义需要发布的 MQTT 消息的命令。 |
| **subscribe** | 用于定义要订阅的 MQTT 主题的命令。 |
| **subscriptions** | 已订阅主题和已接收消息的列表。 |
| **unsubscribe** | 用于指定要取消订阅哪个主题的命令。 |

### Brokers {#brokers}

**子菜单：** `/iot/mqtt/brokers`

要添加新的 MQTT broker（或 MQTT 服务器），请运行以下命令：

```ros
/iot/mqtt/brokers/add
```

可配置属性如下所示：

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP\|hostname*; Default: ) | 代理服务器的 IP 地址或主机名。 |
| **auto-connect** (*yes \| no*; Default: **no**) | 启用后，当与 MQTT 代理服务器的连接断开/中断时，RouterOS 将不断尝试重新建立连接。 |
| **certificate** (*string*; Default: ) | [证书存储中的证书](../../authentication-authorization-accounting/certificates.md)，将用于 SSL 连接。 |
| **client-id** (*string*; Default: ) | 用于连接的唯一 ID。代理服务器使用此 ID 来识别客户端。 |
| **keep-alive** (*integer:30..64800*; Default: **60**) | 定义时间（以秒为单位）的参数，超过该时间后，客户端应向 MQTT 代理服务器“ping”以表明自己“存活”，从而确保连接保持进行。此值应根据 MQTT 代理服务器设置进行设置。 |
| **name** (*string*; Default: ) | 代理服务器的描述性名称。 |
| **parallel-scripts-limit**(*integer:3..1000;* Default: off) | 定义此代理服务器的 [on-message](#subscriptions) 功能允许同时运行多少个脚本的参数。在持续发布大量消息的情况下，可用于降低 CPU 使用率。 |
| **password** (*string*; Default: ) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 代理服务器的密码（如果代理服务器要求）。 |
| **port** (*integer:*0..4294967295**; Default: **1883**) | 代理服务器使用的网络端口。 |
| **ssl** (*yes \| no*; Default: **no**) | Secure Socket Layer 配置。 |
| **username** (*string*; Default: ) | 代理服务器的用户名（如果代理服务器要求）。 |
| **will-message** (*string*; Default: ) | 配置 Last Will and Testament (LWT) 消息，该消息将在连接期间发送到代理服务器。此消息将存储在代理服务器上。除非 RouterOS 意外断开与代理服务器的连接（未发送正确的“DISCONNECT”数据包），否则该消息不会（由代理服务器）发布。 |
| **will-qos**(*integer*; Default: ) | 配置 LWT 消息的 QoS 值。 |
| **will-retain**(yes \| no; Default: ) | 配置是保留 LWT 消息还是不保留。 |
| **will-topic**(*string*; Default: ) | 配置 LWT 主题，**will-message** 应发布到该主题。 |

添加 broker 的示例：

```ros
/iot/mqtt/brokers/add name="broker" address="192.168.88.33" port=1883 ssl=no client-id="test-client" auto-connect=no keep-alive=60
```

结果：

```ros
/iot/mqtt/brokers/print
 0 name="broker" address="192.168.88.33" port=1883 ssl=no client-id="test-client" auto-connect=no keep-alive=60 connected=no 
```

### Connect {#connect}

**子菜单：** `/iot/mqtt/connect`

要连接到预先配置的 MQTT broker，请执行以下命令：

```ros
/iot/mqtt/connect broker="broker"
```

如果连接成功，“**connected**”参数应变为“**yes**”：

```ros
/iot/mqtt/brokers/print
 0 name="broker" address="192.168.88.33" port=1883 ssl=no client-id="test-client" auto-connect=no keep-alive=60 connected=yes
```

### Disconnect {#disconnect}

**子菜单：** `/iot/mqtt/disconnect`

要断开与 MQTT broker 的连接，请执行以下命令：

```ros
/iot/mqtt/disconnect broker="broker"
```

要确认 broker 已断开连接，请执行下面的命令，它应显示“**connected=no**”：

```ros
/iot/mqtt/brokers/print            
 0 name="broker" address="192.168.88.33" port=1883 ssl=no client-id="test-client" auto-connect=no keep-alive=60 connected=no 
```

### Publish {#publish}

**子菜单：** `/iot/mqtt/publish`

Publish 菜单用于向 MQTT broker 发送 MQTT 消息。

| 属性 | 描述 |
| :-- | :-- |
| **broker** (*string*; Default: ) | 选择要将消息发布到哪个 broker。 |
| **disconnect-after** (*yes \| no*; Default: **no**) | 该参数确保在发布消息发送后，与 broker 的连接会被自动断开。 |
| **force** (*yes \| no*; Default: **yes**) | 如果设置为“yes”，当尚未与 broker 建立连接（“**connected=no**”）而尝试发布消息时，RouterOS 会先尝试与指定的 broker 建立 MQTT 连接，然后再发布消息。如果设置为“no”，除非事先已建立连接（“**connected=yes**”），否则 RouterOS 将无法发送该消息。 |
| **message** (*string*; Default: ) | 你希望发布到 broker 的消息。 |
| **qos** (*integer:*0..2**; Default: **0**) | 由 broker 定义的服务质量参数。qos=0 → 消息最多被接收一次（消息发出后即不再管，发后即忘）；qos=1 → 消息至少被接收一次（消息会持续发送，直到发布者从 broker 收到确认数据包 <code>PUBACK</code>）；qos=2 → 消息恰好被接收一次（消息会被发送，并通过四次数据包交互确保只投递一次）； |
| **retain** (*yes \| no*; Default: **no**) | 是保留消息，还是在无人订阅该主题时将其丢弃。此参数由 broker 定义。保留的消息会保存在 broker 上，并由 broker 自动发送给新的订阅者。 |
| **topic** (*string*; Default: ) | 由 broker 定义的主题。 |

发布消息的示例：

```ros
/iot/mqtt/publish message="test-message" broker="broker" topic="my/test/topic"
```

### Subscribe {#subscribe}

**子菜单：** `/iot/mqtt/subscribe`

:::info
请记住，如果你与 broker 已有正在进行的连接（连接处于“**connected=yes**”状态），并且你通过该 broker 订阅主题，那么你必须重新建立连接！
:::

此菜单用于订阅 broker 上的 MQTT 主题。

| 属性 | 描述 |
| :-- | :-- |
| **broker** (*string*; Default: ) | 选择要订阅的 broker。 |
| **force** (*yes \| no*; Default: **yes**) | 如果设置为“yes”，当尚未与 broker 建立连接（“**connected=no**”）而尝试订阅时，RouterOS 会先尝试与指定的 broker 建立 MQTT 连接，然后再订阅该主题。如果设置为“no”，除非事先已建立连接（“**connected=yes**”），否则 RouterOS 将无法订阅该主题。 |
| **qos** (*integer:*0..2**; Default: **0**) | 由 broker 定义的服务质量参数。 |
| **topic** (*string*; Default: ) | 要订阅的主题，由 broker 定义。 |

#### 订阅示例 {#an-example-of-a-subscription}

```ros
/iot/mqtt/subscribe broker="broker" topic="my/test/topic"
```

也支持通配符（单层“**+**”和多层“**#**”）订阅（RouterOS **不允许向通配符主题发布**，**但允许订阅**它们）：

```ros
/iot/mqtt/subscribe broker="broker" topic="my/test/#"
/iot/mqtt/subscribe broker="broker" topic="my/test/+"
```

这意味着，如果你订阅 `topic="my/test/#"`，你将能收到发布到任何以通配符符号“#”之前的模式开头的主题的消息（例如 `"my/test/topic"`、`"my/test/topic/something"`）。

另外，如果你订阅 `topic="my/test/+"`，你将能收到发布在该主题 +1 层级上的消息（例如 `"my/test/topic"`、`"my/test/something"`）。

### Subscriptions {#subscriptions}

**子菜单：** `/iot/mqtt/subscriptions`

本节用于管理已添加的订阅（即之前通过 [Subscribe](./index.md#subscribe) 部分添加的订阅）。

它的属性与 [Subscribe](./index.md#subscribe) 部分相同。

:::info
从 **v7.12beta9** 开始，此菜单允许你为订阅添加“**on-message**”设置。
:::

| 属性 | 描述 |
| :-- | :-- |
| **on-message** (*string*; Default: ) | 配置一个[脚本](../../developer-guides/scripting/index.md)，每当订阅的主题中收到新消息时，该脚本就会被自动启动/运行。 |

要查看已订阅的主题，请执行以下命令：

```ros
/iot/mqtt/subscriptions/print
0 broker=broker topic="my/test/topic" qos=0
```

按上文 **Publish** 部分的说明发布一条测试消息后：

```ros
/iot/mqtt/publish message="test-message" broker="broker" topic="my/test/topic"
```

你应该能在以下位置查看收到的消息：

```ros
/iot/mqtt/subscriptions/recv/print
 0 broker=broker topic="my/test/topic" data="test-message" time=2023-05-22 16:57:00 
```

:::info
已接收消息列表最多保留 1024 条，超过后较旧的条目会被新条目覆盖。
:::

要清除已存储的消息，请执行以下命令：

```ros
/iot/mqtt/subscriptions/recv/clear
```

要在订阅的主题中出现任何新消息时运行[脚本](../../developer-guides/scripting/index.md)（例如一个基本的“log”脚本），可以使用 `on-message` 功能：

```ros
/iot/mqtt/subscriptions/set on-message={:log info "Got data {$msgData} from topic {$msgTopic}"} broker=broker 0
```

脚本可以使用 **$msgData** 和 **$msgTopic** 变量。**$msgData** 表示已发布的 MQTT 消息，**$msgTopic** 表示该消息发布到的 MQTT 主题。这两个变量都会在出现新消息时自动生成。

:::note

- **$msgData** 和 **$msgTopic** 变量在用于“**System>Script**”部分创建的脚本时不会起作用，也就是说，它们在通过 "/iot/mqtt/subscriptions/set **on-message=\{`/system/script/run` x}**" 添加的脚本内部不会起作用。这两个变量只有在“**on-message=\{}**”所编写的脚本内部使用时才有效，例如“**on-message=\{:log info "Got data \{$msgData} from topic \{$msgTopic}"}**”。
- [global](../../developer-guides/scripting/index.md#scopes) 变量的使用也是如此。如果有通过其他脚本“生成”的全局变量（即出现在 System>Script>Environment 部分下的变量），它们在“on-message”脚本内部不会生效。

:::

在向订阅的主题发布一条新的 MQTT 消息后，应出现一条新的日志条目：

```ros
/log/print
10:19:15 script,info Got data {test-message} from topic {my/test/topic}
```

第二个示例展示了如何在出现特定消息（消息中的关键字）时运行脚本。要在 MQTT 消息具有特定内容或关键字时才运行脚本，我们可以使用 **if** [条件语句](../../developer-guides/scripting/index.md#conditional-statement)：

```ros
/iot/mqtt/subscriptions/set 0 on-message={:if ($msgData~"\\{\"test\":\"123\"\\}") do={:log info "Got data {$msgData} from topic {$msgTopic}"}}
```

或者：

```ros
/iot/mqtt/subscriptions/set 0 on-message={:if ($msgData~"test") do={:log info "Got data {$msgData} from topic {$msgTopic}"}}
```

因此，每收到一条 MQTT 消息，脚本都会检查 if 条件是否为真。如果为真（即 **$msgData** 包含 JSON 字符串 **\{"test":"123"}**，或 **$msgData** 包含字符串“**test**”），就会生成日志条目。否则什么也不会发生。

也就是说，只有当你发布如下所示的消息时，脚本才会运行：

```ros
/iot/mqtt/publish broker=broker topic="my/test/topic" message="{\"test\":\"123\"}"
```

当你收到的消息所属的主题同时匹配多个配置了 `on-message` 的订阅时，只会运行 **x1** 个 `on-message` 脚本。RouterOS 会按照以下逻辑/优先级来选择运行哪个 `on-message` 脚本：

1. 如果订阅配置的主题完全匹配 → 第一优先级。
2. 如果主题名称不是完全匹配（使用了通配符）→ 第二优先级是单层通配符主题。
3. 如果主题不属于单层通配符类别 → 第三优先级是根据主题层级匹配的多层通配符主题。

示例：

```ros
/iot/mqtt/subscriptions/print
 0 broker=broker topic="some/sort/of/topic" qos=0 on-message="/system/script/run script1" 

 1 broker=broker topic="some/#" qos=0 on-message="/system/script/run script2" 

 2 broker=broker topic="some/sort/of/+" qos=0 on-message="/system/script/run script3"  

 3 broker=broker topic="some/thing/#" qos=0 on-message="/system/script/run script4"   
```

当你把数据发布到 `some/sort/of/topic` 时，将启动 script1，因为该主题完全匹配。

当你把数据发布到 `some/sort/of/thing` 时，将启动 script3 → 因为它属于单层通配符主题名称。

当你把数据发布到 `some/name` 时，将启动 script2 → 因为它属于多层通配符主题名称。

当你把数据发布到 `some/thing/else` 时，将启动 script 4 → 因为它属于多层通配符主题名称（尽管它同时也匹配 `some/#` 通配符，但它距离 `some/thing/#` 条目更近一层）。

### Unsubscribe {#unsubscribe}

**子菜单：** `/iot/mqtt/unsubscribe`

| 属性 | 描述 |
| :-- | :-- |
| **broker** (*string*; Default: ) | 选择要取消订阅的 broker。 |
| **topic** (*string*; Default: ) | 选择要取消订阅的主题，由 broker 定义。 |

下面展示了从 broker 和主题取消订阅的示例：

```ros
/iot/mqtt/unsubscribe broker="broker" topic="my/test/topic"
```

## 使用脚本发布 RouterOS 统计信息 {#publishing-routeros-statistics-using-scripts}

你还可以使用[脚本](../../developer-guides/scripting/index.md)来组织包含 RouterOS 统计信息的 MQTT 消息。然后，可以应用[调度器](../../system-information-and-utilities/scheduler.md)在你需要的时候运行该脚本。

例如，你可以运行类似 [mqttpublish.rsc](pathname:///assets/200573055_mqttpublish.rsc) 的脚本（将下面所示 RouterOS 代码的内容复制到新的终端中，然后按 <kbd>Enter</kbd>）：

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

该脚本从 RouterOS 收集数据（型号名称、序列号、RouterOS 版本、当前 CPU、已用内存、空闲内存和运行时间），并以 JSON 格式把消息（数据）发布到 broker：

```ros
/system/script/run mqttpublish
[*] Gathering system info...
[*] Total message size: 125 bytes
[*] Sending message to MQTT broker...

[*] Done
```

你可以订阅该主题来查看结果：

```ros
/iot/mqtt/subscriptions/recv/print
 0 broker=broker topic="my/test/topic" data="{"model":"RB924i-2nD-BT5&BG77","sn":"E9C80EAEXXXX","ros":"7.9","cpu":13,"umem":47476736,
     "fmem":19632128,"uptime":"02:21:18"}" 
   time=2023-05-22 17:03:52 
```

别忘了根据你的设置修改脚本中的“Configuration”部分（主题和 broker）。
