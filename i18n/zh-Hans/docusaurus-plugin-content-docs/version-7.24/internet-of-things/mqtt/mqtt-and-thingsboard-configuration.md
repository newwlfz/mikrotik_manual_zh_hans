---
title: "MQTT 和 ThingsBoard 配置"
description: "本页指导 MikroTik RouterOS 用户配置向 ThingsBoard 发布 MQTT 数据，涵盖设备设置、认证场景（access tokens、basic credentials、SSL/TLS）以及用于安全通信的证书管理。"
tags:
  - 'mqtt'
  - 'thingsboard'
  - 'ssl'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/mqtt/mqtt-and-thingsboard-configuration
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 简介 {#introduction}

可用于监控 MQTT 发布者发送信息的云服务有很多，[Thingsboard](https://thingsboard.io/) 就是其中之一。本文将演示如何配置 Thingsboard 和 RouterOS，以使用 MQTT 协议发布数据。在此场景中，RouterOS 将充当网关，并将 RouterBoard 的数据发布到 Thingsboard 服务器。Thingsboard 将充当 MQTT broker（用于接收数据的服务器）。

在开始配置之前，你需要执行以下任一操作：

- a) 在 Thingsboard 系统中创建账户。你可以通过此[链接](https://thingsboard.cloud/signup)完成。这样即可在有限/测试时间内免费使用 ThingsBoard 云解决方案。
- b) 按照[指南](https://thingsboard.io/docs/user-guide/install/installation-options/)搭建自己的服务器。社区版可免费安装和使用。

:::warning
请考虑使用 **SSL MQTT（TCP 端口 8883 和证书）**，而不是非 SSL MQTT（TCP 端口 1883）。如果使用非 SSL MQTT，客户端（MQTT 发布者）与服务器（MQTT broker）之间的通信很容易被嗅探或抓包，从而泄露身份验证数据（例如 client-id、用户名和密码）。
:::

### Thingsboard 配置 {#thingsboard-configuration}

:::info
本指南将介绍本地实例/服务器的安装配置，但相同原则也适用于云方案。
:::

通过浏览器访问登录页面并登录。进入“**Devices**”菜单。

点击添加按钮“+”和“Add new device”创建新设备：

![](/img/c5f98d9f4917b259.webp)

输入设备名称，然后点击“Add”：

![](/img/3c519af589b57557.webp)

默认情况下，新创建的设备选择访问令牌认证。

#### 访问令牌场景 {#access-token-scenario}

点击已创建的设备并进入“**Manage Credentials**”设置（位于“**Details**”部分），可以更改令牌：

![](/img/24761f96b4bfa335.webp)

该令牌将用作 MQTT 发布端的“username”（在 RouterOS 设置中）。

详情请参阅以下[链接](https://thingsboard.io/docs/reference/mqtt-api/)。

#### MQTT 基本场景 {#mqtt-basic-scenario}

可以在特定设备的“**Device Credentials**”部分更改凭证类型：

![](/img/37f2d21a3498da9f.webp)

MQTT Basic 场景允许指定用于 MQTT 身份验证的 Client ID、Username 和 Password。

详情请参阅以下[链接](https://thingsboard.io/docs/user-guide/basic-mqtt/)。

#### 单向 SSL 通信场景 {#one-way-ssl-communication-scenario}

:::warning
建议使用该场景！

**重要：** 此身份验证类型要求使用服务器证书进行 SSL 通信。必须生成服务器证书并将其上传到 ThingsBoard 实例。

要生成服务器证书，请参考[本指南](https://thingsboard.io/docs/user-guide/mqtt-over-ssl/) → 生成证书（例如，使用 OPENSSL 工具），将其安装/上传到正确的文件夹，并在 ThingsBoard 配置文件中启用 MQTT SSL。
:::

配置与上文所示的 **Access token** 和 **MQTT Basic scenarios** 相同。因此，任选其一即可。

在这种情况下，唯一的区别是设备与服务器之间的通信（只需在 RouterOS 设置中稍微更改 MQTT broker 配置，稍后将进行说明）。

**使用此场景时，通信将被加密（使用 SSL）**。

#### X.509（双向 SSL 通信）场景 {#x509-two-way-ssl-communication-scenario}

:::info
此身份验证类型要求使用服务器证书和客户端证书进行 SSL 通信。必须生成服务器证书并将其上传到 ThingsBoard 实例。

要生成服务器证书，请参考[本指南](https://thingsboard.io/docs/user-guide/mqtt-over-ssl/) → 生成证书（例如，使用 OPENSSL 工具），将其安装或上传到正确的文件夹，并在 ThingsBoard 配置文件中启用 MQTT SSL。

要生成客户端证书，请参考[本指南](https://thingsboard.io/docs/user-guide/certificates/)。
:::

可以在特定设备的“**Device Credentials**”部分更改凭据类型：

![](/img/c4806e3946f1968c.webp)

X.509 场景使用客户端证书进行身份验证。

生成证书后（例如，使用 OpenSSL），将 RSA 公钥复制到该字段中，然后点击“Save”按钮。

### RouterOS 配置 {#routeros-configuration}

***note**：要配置 MQTT，请确保事先安装 **iot** [软件包](/docs/getting-started/installation-and-upgrade/packages)。*

#### MQTT Broker

##### Access token 场景 {#access-token-scenario-1}

如下所示添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=1883 username=access_token
```

- 将 `address` 改为 ThingsBoard 服务器的实际 IP/域名地址。
- 将 `username` 改为你在 ThingsBoard 设置中使用的 access token。

##### MQTT Basic 场景 {#mqtt-basic-scenario-1}

如下所示添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x client-id=clientid password=password username=username
```

- 将 `address` 改为 ThingsBoard 服务器的实际 IP/域名地址；
- 将 `username`、`password` 和 `client-id` 改为你在 ThingsBoard 设置中使用的实际值。

##### 单向 SSL 通信场景 {#one-way-ssl-communication-scenario-1}

:::warning
推荐使用的场景！
:::

在此场景中，需要将服务器证书导入 RouterOS 系统。

将已安装到 ThingsBoard 的服务器证书拖放到路由器的“File List”菜单中：

![](/img/ad8d2ba814a621e2.webp)

导入服务器证书：

```ros
/certificate/import file-name=mqttserver.pem passphrase=""
```

使用 **SSL 单向通信** 和 **访问令牌场景** 时，按如下示例添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=8883 username=access_token ssl=yes
```

- 将 `address` 更改为 ThingsBoard 服务器的实际 IP/域名地址。
- 将 `username` 更改为你在 ThingsBoard 设置中使用的访问令牌。
- 确保使用 `port=8883`（服务器正在监听的 MQTT SSL 端口）。
- 确保启用 `ssl=yes`。

使用 **SSL 单向通信** 和 **MQTT Basic 场景** 时，按如下示例添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=8883 client-id=clientid password=password username=username ssl=yes
```

- 将 `address` 更改为 ThingsBoard 服务器的实际 IP/域名地址。
- 将 `username`、`password` 和 `client-id` 更改为你在 ThingsBoard 设置中使用的实际值。
- 确保使用 `port=8883`（服务器正在监听的 MQTT SSL 端口）。
- 确保启用 `ssl=yes`。

##### X.509（双向 SSL 通信）场景 {#x509-two-way-ssl-communication-scenario-1}

将证书拖放到路由器的“Files/File List”菜单 → *服务器证书、客户端证书及其私钥。*

逐个导入证书：

```ros
/certificate/import file-name=mqttserver.pem passphrase=""
/certificate/import file-name=cert.pem passphrase=""
/certificate/import file-name=key.pem passphrase=""
```

按下图所示添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=8883 certificate=cert.pem_0 ssl=yes
```

- 将 `address` 更改为 ThingsBoard 服务器的实际 IP/域名地址。
- 将所选的 `certificate` 更改为您已导入的实际客户端证书名称。
- 确保使用 `port=8883`（服务器正在监听的 MQTT SSL 端口）。
- 确保启用 `ssl=yes`。

#### MQTT 发布 {#mqtt-publish}

a) 使用静态值进行快速 MQTT 发布测试：

```ros
/iot/mqtt/publish broker="tb" topic="v1/devices/me/telemetry" message="{\"cpu\":\"7\"}"
```

b) 要将相关数据从 RouterOS 发布到 Thingsboard，可以参考下面显示的脚本。该脚本从 RouterOS 设备收集数据（型号名称、序列号、RouterOS 版本、当前 CPU、已用内存、可用内存和运行时间），并以 JSON 格式将消息（数据）发布到 broker：

```ros
# Required packages: iot
################################ Configuration ################################  
# Name of an existing MQTT broker that should be used for publishing  
:local broker "tb"
# MQTT topic where the message should be published  
:local topic "v1/devices/me/telemetry"
#################################### System ###################################  
:put ("[\*] Gathering system info...")  
:local cpuLoad [/system/resource/get cpu-load]  
:local freeMemory [/system/resource/get free-memory]  
:local usedMemory ([/system/resource/get total-memory] - $freeMemory)  
:local rosVersion [/system/package/get value-name=version \  
[/system/package/find where name ~ "^routeros"]]  
:local model [/system/routerboard/get value-name=model]  
:local serialNumber [/system/routerboard/get value-name=serial-number]  
:local upTime [/system/resource/get uptime]
#################################### MQTT #####################################  
:local message \  
"{\"model\":\"$model\",\  
\"sn\":\"$serialNumber\",\  
\"ros\":\"$rosVersion\",\  
\"cpu\":$cpuLoad,\  
\"umem\":$usedMemory,\  
\"fmem\":$freeMemory,\  
\"uptime\":\"$upTime\"}"
:log info "$message";  
:put ("[\*] Total message size: $[:len $message] bytes")  
:put ("[\*] Sending message to MQTT broker...")  
/iot/mqtt/publish broker=$broker topic=$topic message=$message  
:put ("[\*] Done")
```

应考虑 2 行脚本。

```ros
:local broker "tb"
```

line，在引号 "" 中指定 broker 名称。

```ros
:local topic "v1/devices/me/telemetry"
```

line，在引号 "" 中指定正确的 topic（查看 Thingsboard 的[文档](https://thingsboard.io/docs/reference/mqtt-api/)以确定需要使用的准确 topic）。

脚本配置的其余部分取决于整体需求。

将上述脚本复制并粘贴到记事本中，然后再次复制。导航到 System>Scripts 菜单，添加新脚本，并粘贴上面显示的脚本。例如，将其命名为 script1。

要运行该脚本，可以使用命令行：

```ros
/system/script/run script1
```

### 验证 {#verification}

可以在“Latest telemetry”部分下检查设备接收/发布的数据：

![](/img/d496ec481ae7566f.webp)
