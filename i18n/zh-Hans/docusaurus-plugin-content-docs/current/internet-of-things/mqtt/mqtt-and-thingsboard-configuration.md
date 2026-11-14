---
sidebar_key: "internet-of-things/mqtt/mqtt-and-thingsboard-configuration"
sidebar_position: 2
title: "MQTT 与 ThingsBoard 配置"
sidebar_label: "MQTT 与 ThingsBoard 配置"
description: "本页指导 MikroTik RouterOS 用户配置向 ThingsBoard 发布 MQTT 数据，涵盖设备设置、身份验证场景（访问令牌、基本凭据、SSL/TLS）以及用于安全通信的证书管理。"
tags:
  - 'mqtt'
  - 'thingsboard'
  - 'ssl'
source: https://manual.mikrotik.com/docs/internet-of-things/mqtt/mqtt-and-thingsboard-configuration
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

你可以用来监控 MQTT 发布者发送的信息的众多云服务之一是 [Thingsboard](https://thingsboard.io/)。本文将演示如何配置 Thingsboard 和 RouterOS，以使用 MQTT 协议发布数据。在此场景中，RouterOS 将充当网关，并将数据从 RouterBoard 发布到 Thingsboard 服务器。在此场景中，Thingsboard 将充当 MQTT broker（接收数据的服务器）。

在继续设置之前，你需要先执行以下任一操作：

- a) 在 Thingsboard 系统中创建账号。你可以通过此[链接](https://thingsboard.cloud/signup)完成。这将允许你在有限/测试时间段内免费使用 ThingsBoard 云解决方案。
- b) 按照[指南](https://thingsboard.io/docs/user-guide/install/installation-options/)搭建你自己的服务器。有一个社区版可以免费安装和使用。

:::warning
请考虑使用 **SSL MQTT（TCP 端口 8883 和证书）**，而不是非 SSL MQTT（TCP 端口 1883）。如果你使用非 SSL MQTT，客户端（MQTT 发布者）与服务器（MQTT broker）之间的通信很容易被嗅探/抓包，这会危及身份验证数据（例如 client-id、用户名和密码）。
:::

### Thingsboard 配置 {#thingsboard-configuration}

:::info
在本指南中，我们将展示本地实例/服务器安装配置，但相同的原则也适用于云选项。
:::

通过浏览器访问登录页面并登录。转到 "**Devices**" 菜单。

通过点击添加按钮 "+" 和 "Add new device" 来创建新设备：

![](/img/c5f98d9f4917b259.webp)

输入设备名称，然后点击 "Add"：

![](/img/3c519af589b57557.webp)

默认情况下，新创建的设备会选择访问令牌身份验证。

#### 访问令牌场景 {#access-token-scenario}

你可以点击已创建的设备，并进入 "**Manage Credentials**" 设置（在 "**Details**" 部分中）来更改令牌：

![](/img/24761f96b4bfa335.webp)

此令牌将用作 MQTT 发布者的 "username"（在 RouterOS 设置中）。

你可以通过此[链接](https://thingsboard.io/docs/reference/mqtt-api/)了解更多信息。

#### MQTT Basic 场景 {#mqtt-basic-scenario}

你可以为特定设备在 "**Device Credentials**" 部分中更改凭据类型：

![](/img/37f2d21a3498da9f.webp)

MQTT Basic 场景允许你指定用于 MQTT 身份验证的 Client ID、Username 和 Password。

你可以通过此[链接](https://thingsboard.io/docs/user-guide/basic-mqtt/)了解更多信息。

#### 单向 SSL 通信场景 {#one-way-ssl-communication-scenario}

:::warning
推荐使用此场景！

**重要：** 此类身份验证要求你使用服务器证书进行 SSL 通信。必须生成服务器证书并将其上传到 ThingsBoard 实例。

要生成服务器证书，请参考[此指南](https://thingsboard.io/docs/user-guide/mqtt-over-ssl/) → 生成证书（例如，使用 OPENSSL 工具），将其安装/上传到正确的文件夹，并在 ThingsBoard 配置文件中启用 MQTT SSL。
:::

配置将与上面显示的 **访问令牌** 和 **MQTT Basic 场景** 相同。因此，任选其一即可。

在这种情况下，唯一区别是设备与服务器之间的通信（你只需稍作更改 RouterOS 设置中的 MQTT broker 配置，稍后会展示）。

**使用此场景时，通信将被加密（使用 SSL）**。

#### X.509（双向 SSL 通信）场景 {#x509-two-way-ssl-communication-scenario}

:::info
此类身份验证要求你使用服务器证书和客户端证书进行 SSL 通信。必须生成服务器证书并将其上传到 ThingsBoard 实例。

要生成服务器证书，请参考[此指南](https://thingsboard.io/docs/user-guide/mqtt-over-ssl/) → 生成证书（例如，使用 OPENSSL 工具），将其安装/上传到正确的文件夹，并在 ThingsBoard 配置文件中启用 MQTT SSL。

要生成客户端证书，请参考[此指南](https://thingsboard.io/docs/user-guide/certificates/)。
:::

你可以为特定设备在 "**Device Credentials**" 部分中更改凭据类型：

![](/img/c4806e3946f1968c.webp)

X.509 场景使用客户端证书进行身份验证。

证书生成后（例如，使用 OpenSSL），将 RSA 公钥复制到该字段中，然后点击 "Save" 按钮。

### RouterOS 配置 {#routeros-configuration}

***注意**：为了配置 MQTT，请确保事先已安装 **iot** [软件包](../../getting-started/installation-and-upgrade/packages.md)。*

#### MQTT 代理 {#mqtt-broker}

##### 访问令牌场景 {#access-token-scenario-1}

如下所示添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=1883 username=access_token
```

- 将 `address` 更改为你的 ThingsBoard 服务器的实际 IP/域名地址。
- 将 `username` 更改为你在 ThingsBoard 设置中使用的访问令牌。

##### MQTT Basic 场景 {#mqtt-basic-scenario-1}

如下所示添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x client-id=clientid password=password username=username
```

- 将 `address` 更改为你的 ThingsBoard 服务器的实际 IP/域名地址；
- 将 `username`、`password` 和 `client-id` 更改为你在 ThingsBoard 设置中使用的实际值。

##### 单向 SSL 通信场景 {#one-way-ssl-communication-scenario-1}

:::warning
推荐使用此场景！
:::

在此场景中，RouterOS 需要将服务器证书导入其系统。

将已安装到 ThingsBoard 中的服务器证书拖放到路由器的 "File List" 菜单中：

![](/img/ad8d2ba814a621e2.webp)

导入服务器证书：

```ros
/certificate/import file-name=mqttserver.pem passphrase=""
```

使用 **SSL 单向通信** 和 **访问令牌场景** 时，如下所示添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=8883 username=access_token ssl=yes
```

- 将 `address` 更改为你的 ThingsBoard 服务器的实际 IP/域名地址。
- 将 `username` 更改为你在 ThingsBoard 设置中使用的访问令牌。
- 确保使用 `port=8883`（服务器监听的 MQTT SSL 端口）。
- 确保启用 `ssl=yes`。

使用 **SSL 单向通信** 和 **MQTT Basic 场景** 时，如下所示添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=8883 client-id=clientid password=password username=username ssl=yes
```

- 将 `address` 更改为你的 ThingsBoard 服务器的实际 IP/域名地址。
- 将 `username`、`password` 和 `client-id` 更改为你在 ThingsBoard 设置中使用的实际值。
- 确保使用 `port=8883`（服务器监听的 MQTT SSL 端口）。
- 确保启用 `ssl=yes`。

##### X.509（双向 SSL 通信）场景 {#x509-two-way-ssl-communication-scenario-1}

将证书拖放到路由器的 "Files/File List" 菜单中 →  *服务器证书、客户端证书及其私钥。*

逐个导入证书：

```ros
/certificate/import file-name=mqttserver.pem passphrase=""
/certificate/import file-name=cert.pem passphrase=""
/certificate/import file-name=key.pem passphrase=""
```

如下所示添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=8883 certificate=cert.pem_0 ssl=yes
```

- 将 `address` 更改为你的 ThingsBoard 服务器的实际 IP/域名地址。
- 将所选的 `certificate` 更改为你已导入的实际客户端证书名称。
- 确保使用 `port=8883`（服务器监听的 MQTT SSL 端口）。
- 确保启用 `ssl=yes`。

#### MQTT 发布 {#mqtt-publish}

a) 使用静态值进行快速 MQTT 发布测试：

```ros
/iot/mqtt/publish broker="tb" topic="v1/devices/me/telemetry" message="{\"cpu\":\"7\"}"
```

b) 为了将 RouterOS 中的相关数据发布到 Thingsboard，你可以参考下面所示的脚本。该脚本从 RouterOS 设备收集数据（型号名称、序列号、RouterOS 版本、当前 CPU、已用内存、空闲内存和运行时间），并以 JSON 格式将消息（数据）发布到 broker：

```ros
# 所需软件包：iot
################################ Configuration ################################  
# 用于发布的现有 MQTT broker 的名称
:local broker "tb"
# 消息应发布到的 MQTT 主题
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

应注意 2 行脚本。

```ros
:local broker "tb"
```

行，你应在引号 "" 内指定 broker 的名称。

```ros
:local topic "v1/devices/me/telemetry"
```

行，你应在引号 "" 内指定正确的 topic（请查看 Thingsboard 的[文档](https://thingsboard.io/docs/reference/mqtt-api/)，了解需要使用的确切 topic）。

脚本其余配置取决于整体需求。

将上面的脚本复制并粘贴到记事本中，然后再次复制。导航到 System>Scripts 菜单，在其中添加新脚本，并粘贴上面显示的脚本。例如，将其命名为 script1。

要运行脚本，您可以使用命令行：

```ros
/system/script/run script1
```

### 验证 {#verification}

你可以在 "Latest telemetry" 部分下检查设备接收/发布的数据：

![](/img/d496ec481ae7566f.webp)
