---
sidebar_key: "containers/user-guides/container-thingsboard-mqtt-http-server"
sidebar_position: 8
title: "容器 - ThingsBoard MQTT/HTTP 服务器"
sidebar_label: "容器 - ThingsBoard MQTT/HTTP 服务器"
description: "本页介绍 MikroTik RouterOS 中的容器功能，使用户能够直接在路由器上运行诸如 ThingsBoard MQTT/HTTP IoT 平台之类的服务器。它说明了如何配置容器模式、网络接口（veth 和 bridge）、出站流量的 NAT 规则以及存储要求。本指南强调了 RAM/磁盘空间方面的注意事项，并提供了使用 ThingsBoard 部署的示例，搭配"
tags:
  - 'container'
  - 'thingsboard'
  - 'mqtt'
source: https://manual.mikrotik.com/docs/containers/user-guides/container-thingsboard-mqtt-http-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

将容器功能引入 RouterOS 后，就可以在路由器内运行各种用于各类任务的服务器。这对于希望减少网络中设备数量的人尤其有用。与其在单独的设备/机器上运行服务器，何不直接在路由器内运行它呢？

许多用户需要一个能够收集数据、存储数据并以易于理解的方式显示数据的服务器。这时，像 [ThingsBoard](https://thingsboard.io/) 这样的平台就可以派上用场。

它主要定位为 IoT 平台，你可以在[链接](https://thingsboard.io/iot-use-cases/)中找到他们演示的各种用例。

从 RouterOS 用户的角度来看，最吸引人的部分是它可以被用作 MQTT 服务器（MQTT broker）或 HTTP 服务器，这意味着你可以使用 [MQTT publish](../../internet-of-things/mqtt/index.md) 或 [HTTP POST](../../system-information-and-utilities/fetch.md) 来发布数据。你可以通过[此处](https://thingsboard.io/docs/reference/mqtt-api/)的链接找到 ThingsBoard MQTT API 指南，并通过[此处](https://thingsboard.io/docs/reference/http-api/)的链接找到 HTTP API。

简而言之，你可以利用[脚本](../../developer-guides/scripting/index.md)收集 RouterOS 统计信息（如 uptime、GPS 坐标、数据包统计，以及几乎任何你打印到终端中的其他内容），然后将这些信息存储到变量中，并用这些变量构造一条 JSON 消息。然后你可以通过[调度器](../../system-information-and-utilities/scheduler.md)（它会在你需要时运行此脚本）使用 MQTT 或 HTTP post 将此消息发送到 ThingsBoard。你可以在[本指南](../../internet-of-things/mqtt/mqtt-and-thingsboard-configuration.md)中找到实现此功能的基础脚本示例。

ThingsBoard 会借助[小部件](https://thingsboard.io/docs/user-guide/ui/widget-library/)存储并显示数据，你可以使用这些部件来帮助设置仪表板，以图表、表格、地图和其他方式可视化数据。

例如，下面提到有 2 种可用的 ThingsBoard 实例选项，它们各自使用不同的数据库：

- [thingsboard/tb-postgres](https://hub.docker.com/r/thingsboard/tb-postgres/)
- [thingsboard/tb-cassandra](https://hub.docker.com/r/thingsboard/tb-cassandra/)

你可以在 ThingsBoard/docker 文档中找到更多信息。

在我们的示例中，我们将展示 **tb-postgres**——一个用于测试目的的、带有 PostgreSQL 数据库的单个 ThingsBoard 实例。

本指南将展示 "in-memory" 队列类型的服务，但对于生产环境，请考虑使用其他服务类型。你可以在[此处](https://thingsboard.io/docs/user-guide/install/docker/)找到更多信息。

## 概述 {#summary}

**子菜单：** `/container`

***注意**:* **container** 包是必需的。

低于 v7.8 的 RouterOS 版本将无法运行此场景。

在继续配置之前，请务必阅读我们的 [容器](../index.md) 指南。请务必查看[免责声明](../index.md#disclaimer)和[要求](../index.md#requirements)部分，以了解所有风险以及你可能需要执行的必要步骤。

在此示例中，我们将在 [云托管路由器，CHR](../../getting-started/routeros-licensing/chr/index.md) 上运行它。

在本指南发布时，**thingsboard/tb-postgres** 镜像**仅**适用于 linux/**arm64** 和 linux/**amd64** 操作系统/架构。这意味着你无法在采用 arm32 位架构的 RouterOS 设备上运行此场景。

有几个参数需要注意：

- 你需要明白它是一个**服务器**，因此你需要为存储在那里的数据和镜像本身预留额外空间。在我们的测试中，8 GB 磁盘空间已经足够，但是！对于实际应用，你可能需要考虑增加更多空间，尤其是当你计划运行更多容器时。只需记住 → 留有储备可能更好。
- 与磁盘空间一样，RAM 内存也很重要。根据 ThingsBoard 文档，在使用带有 PostgreSQL 数据库的单个 ThingsBoard 实例时，建议至少分配 1GB 的 RAM，并使用最小负载（每秒几条消息）。建议使用 2-4GB RAM。换句话说，如果你想在 RouterBoard 设备上运行它，请理解，在 RAM 少于 1 GB 的设备上可能无法实现。这就是为什么 → 要考虑使用具有更多可用 RAM 内存的设备。

请转到[提示和技巧](../index.md#tips-and-tricks)部分，了解如何限制 RAM。

## 配置 {#configuration}

### 容器模式 {#container-mode}

启用容器模式：

```ros
/system/device-mode/update container=yes
```

如果要在 X86 上使用 container，你需要通过按下复位按钮或冷重启来确认 device-mode。

### 网络 {#networking}

为容器添加 veth 接口

```ros
/interface/veth/add name=veth1 address=172.18.0.2/24 gateway=172.18.0.1
```

为容器创建网桥，为其分配 IP 网络，并将 veth 添加到网桥

```ros
/interface/bridge/add name=dockertb
/ip/address/add address=172.18.0.1/24 interface=dockertb
/interface/bridge/port/add bridge=dockertb interface=veth1
```

为出站流量设置 NAT

```ros
/ip/firewall/nat/add chain=srcnat action=masquerade src-address=172.18.0.0/24
```

转发 TCP 9090 以用于 HTTP 管理（根据 ThingsBoard 文档，这是默认 HTTP 端口）

:::warning

我们建议仅在本地测试或通过 VPN 访问时使用 HTTP 访问（当你确定本地网络安全时）。

当你希望从互联网（从公共网络/WAN）访问容器 WEB 管理界面时，请改为考虑使用 **HTTPS**。

:::

```ros
/ip/firewall/nat/add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=9090 protocol=tcp to-addresses=172.18.0.2 to-ports=9090
```

在上方 DNAT（dst-nat）规则中显示的 `dst-address` 字段里，我们使用设备的本地 IP 地址。首先，**使用本地 IP**（本地访问）**来** **完成所有设置** **并** **确认一切正常**。

:::info

在完成本指南中展示的其余步骤并验证 ThingsBoard 管理门户可在本地正常工作后 →  **进一步保护设置**：

- (a) 确保所有默认 ThingsBoard 用户凭据都已更改/删除，并已实施强密码（参考 ThingsBoard 文档）；
- (b) **启用** **HTTPS**（步骤将在本指南后面说明）；
- (c) 最好将 HTTPS 端口更改为非标准端口（参考 ThingsBoard 文档）。

只有当你提高了安全性，并且只有到那时 → 你才可以考虑启用来自 WAN 的远程访问（在上方示例中，在 `dst-address` 字段中使用你的公网 IP 地址，而不是本地 IP）。此外，为了进一步提高安全性，请使用 `src-address` 或 `src-address-list` 参数，你可以在其中输入受信任的公网源 IP 地址（已知/受信任地址的列表，例如属于你的分支机构、你也希望从那里访问服务器的地址）。请理解，只有你需要对安全性负责。如果你留了一扇门开着，就可能有人利用它。在设置此类场景时，你需要具备网络知识并了解风险。
:::

转发 TCP 1883 以用于非 SSL MQTT（根据 ThingsBoard 文档，这是默认 MQTT 端口）

:::warning
我们建议仅在本地测试或通过 VPN 访问时使用非 SSL MQTT（TCP 1883）通信（当你确定本地网络安全时）。
>
在实际应用中，当涉及从互联网（从公共网络）访问时，请考虑使用 **SSL MQTT（TCP 端口 8883）**，而不是非 SSL MQTT（TCP 端口 1883）。如果使用非 SSL MQTT，客户端（MQTT publisher）与服务器（MQTT broker）之间的通信很容易被嗅探/抓包，从而泄露认证数据（如 client-ids、用户名和密码）。
:::

```ros
/ip/firewall/nat/add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=1883 protocol=tcp to-addresses=172.18.0.2 to-ports=1883
```

与 HTTP 访问一样，在上方 DNAT（dst-nat）规则中显示的 `dst-address` 字段里，我们使用设备的本地 IP 地址。首先，**使用本地 IP**（本地访问）**来** **完成所有设置** **并** **确认一切正常**。

:::info
在完成本指南中展示的其余步骤并验证 ThingsBoard 非 SSL MQTT 通信可在本地正常工作后 →  **进一步保护设置**：
>
- (a) 考虑从 ThingsBoard 安装中移除模板设备；
- (b) **启用 SSL MQTT**（步骤将在本指南后面说明）；
- (c) 最好将 MQTT 端口更改为非标准端口（参考 ThingsBoard 文档）。
>
启用 SSL MQTT 后，你可以考虑从 WAN 开放 TCP 8883（这是默认 SSL MQTT 端口）（在 `dst-address` 字段中使用你的公网 IP 地址而不是本地 IP，并将 `dst-port` 和 `to-ports` 从 1883 改为 8883）。此外，为了进一步提高安全性，请使用 `src-address` 或 `src-address-list` 参数，你可以在其中设置受信任的公网 IP 地址列表。这样，只有已配置的受信任 IP 才能与 ThingsBoard broker 建立 MQTT 连接。
:::

### 环境变量和挂载 {#environment-variables-and-mounts}

请查看 [docker-thingsboard](https://hub.docker.com/r/thingsboard/tb-postgres) 文档，了解需要添加的确切挂载和变量。

#### 环境变量 {#environment-variables}

```ros
/container/envs/add list=tb_envs key=TB_QUEUE_TYPE value="in-memory"
```

#### 挂载 {#mounts}

```ros
/container/mounts/add list=mytb-data src=tb/mytb-data dst=/data
/container/mounts/add list=mytb-logs src=tb/mytb-logs dst=/var/log/thingsboard
```

### 获取镜像 {#getting-image}

为简化配置，我们将从外部镜像库获取镜像，但你也可以通过 [.tar](../index.md#option-b-import-image-from-pc) 文件导入它。

确保已相应设置 "Registry URL"，限制 RAM 使用量（如有必要），并为镜像设置目录。

```ros
/container/config/set registry-url=https://registry-1.docker.io tmpdir=pull ram-high=2048.0MiB
```

拉取镜像：

```ros
/container/add remote-image=thingsboard/tb-postgres:latest interface=veth1 root-dir=ThingsBoard mountlists=mytb-data,mytb-logs envlists=tb_envs logging=yes
```

运行该命令后，RouterOS 应开始“解压”软件包。检查“File System”中新建的文件夹，并使用命令 `/container/print` 监控容器状态。

### 启动容器 {#starting-the-container}

在使用 `/container/print` 确认容器已添加且状态变为 `status=stopped` 后，即可启动它：

```ros
/container/start 0
```

等待几分钟，让容器完全加载。

## 验证 {#verification}

### 管理访问 {#management-access}

容器启动并安装完成后，使用任意浏览器访问 → [http://192.168.88.1:9090](http://192.168.88.1:9090)（其中 IP 地址是 DNAT 规则中使用的地址）：

![](/img/12a1fc50b164a5ac.webp)

默认凭据为（用户名/密码）：

- **系统管理员**：sysadmin@thingsboard.org / sysadmin
- **租户管理员**：tenant@thingsboard.org / tenant

登录提示应能确认服务器正在运行。

### MQTT 测试 {#mqtt-test}

使用 **tenant** 登录并创建一个新设备。转到 "**Devices**" 菜单，点击 "**+**"（Add Device）按钮，然后选择 "**Add new device**" 选项：

![](/img/a0ac782ef9f067db.webp)

 随心命名，然后点击 "**Add**"：

![](/img/2b65a6517ea2dacf.webp)

点击你刚创建的设备并选择 "**Manage credentials**" 设置，以检查你的设备访问令牌（复制生成的访问令牌或输入你自己的 →  "YOUR\_TOKEN"）：

![](/img/467d0a4699b4dba5.webp)

完成这些步骤后，转到 RouterOS 设置（回到 CHR 设置），并创建一个新的 [MQTT broker](../../internet-of-things/mqtt/index.md)（**确保已安装 IoT 包**，否则你将没有此菜单）：

```ros
/iot/mqtt/brokers/add name=tb address=172.18.0.2 port=1883 username=YOUR_TOKEN
```

以 JSON 格式发布一条静态测试 MQTT 消息：

```ros
/iot/mqtt/publish broker="tb" topic="v1/devices/me/telemetry" message="{\"test\":\"123\"}"
```

确认消息已发布：

![](/img/d80bd832e0a7483f.webp)

## 启用 HTTPS 和 SSL MQTT {#enabling-https-and-ssl-mqtt}

默认情况下，使用 HTTP 和 MQTT 协议。如前面“网络”部分所述，使用非 SSL HTTP 和非 SSL MQTT 并不是很安全（除非它们在受到严格保护、具有配置良好的防火墙/受限访问的网络中使用），并且**我们建议启用 HTTPS**和**SSL MQTT**。

请查看 ThingsBoard 文档以获取更多信息 → [HTTP over SSL](https://thingsboard.io/docs/user-guide/ssl/http-over-ssl/) 和 [MQTT over SSL](https://thingsboard.io/docs/user-guide/mqtt-over-ssl/) 指南。

首先，没有证书就没有 SSL，因此需要生成（或购买）一个证书。

简而言之，本节将演示如何为 HTTPS 和 SSL MQTT 生成自签名证书。然后，你需要将它们上传到 ThingsBoard 安装中的正确文件夹，并相应地修改 ThingsBoard 配置文件。

在本指南中，我们将使用 RouterOS 生成这两个[证书](../../authentication-authorization-accounting/certificates.md)（但你也可以使用 OpenSSL 或你想要的任何其他工具）。

### 创建证书 {#create-certificates}

为 HTTPS 创建证书：

```ros
/certificate/add name=TBhttps common-name=172.18.0.2
/certificate/sign TBhttps
```

为 MQTT 创建证书：

```ros
/certificate/add name=TBmqtt common-name=172.18.0.2
/certificate/sign TBmqtt
```

使用 `/certificate/print` 命令确认它们已添加：

```ros
[admin@MikroTik] > /certificate/print
Flags: K - PRIVATE-KEY; A - AUTHORITY; T - TRUSTED
Columns: NAME, COMMON-NAME, FINGERPRINT
#     NAME     COMMON-NAME  FINGERPRINT                                                     
0 KAT TBhttps  172.18.0.2   863f4547c74ce3ec70c3e82172502711517b52bbc055d18c24ba4aafec46152c
1 KAT TBmqtt   172.18.0.2   ebf3ff5d03ed4cc73546e058da9bc414cdaf24ce45da29b203348045fbbd21ae
```

使用 PKCS12 格式导出证书，并为它们设置密码/口令：

```ros
/certificate/export-certificate file-name=keystore export-passphrase=thingsboard_cert_password type=pkcs12 numbers=0
/certificate/export-certificate file-name=mqttserver export-passphrase=thingsboard_mqttcert_password type=pkcs12 numbers=1
```

使用你自己的 `export-passphrase` 并记住它。

上述命令的输出将创建证书文件 **keystore.p12** 和 **mqttserver.p12**，你可以从 "[File List](../../system-information-and-utilities/files.md)" 菜单下载它们：

```ros
[admin@MikroTik] > /file/print 
Columns: NAME, TYPE, SIZE, CREATION-TIME
 #  NAME                 TYPE             SIZE       CREATION-TIME       
 0  tb/mytb-data         container store             2023-01-19 13:43:16
 1  container-log.0.txt  .txt file        2240.5KiB  2023-01-27 15:37:41
 2  skins                directory                   2023-01-18 15:12:22
 3  tb/mytb-logs         container store             2023-01-27 12:24:30
 4  pull                 directory                   2023-01-19 13:41:01
 5  pub                  directory                   2023-01-18 16:15:29
 6  tb                   directory                   2023-01-23 15:46:39
 7  tb/data              container store             2023-01-18 16:50:08
 8  tb/logs              container store             2023-01-18 16:50:08
 9  mqttserver.p12       .p12 file        2438       2023-01-27 15:36:26
10  keystore.p12         .p12 file        2448       2023-01-27 15:08:07
11  ThingsBoard          container store             2023-01-19 13:40:50
```

将这两个文件从路由器下载到你 PC 上的任意目录。例如，我们将它们下载到了 `C:\Users\Admin\Desktop\ThingsBoard` 文件夹中。

### 下载 ThingsBoard 的配置文件 {#download-the-thingsboards-configuration-file}

打开命令终端（Windows 用户以管理员身份打开 "CMD"，Linux 用户打开 "Linux Shell or Command Terminal"），并导航到证书所在的目录：

```powershell
C:\Windows\System32>cd c:\Users\Admin\Desktop\ThingsBoard
C:\Users\Admin\Desktop\ThingsBoard>dir
Directory of C:\Users\Admin\Desktop\ThingsBoard

27.01.2023  15:36    <DIR>          .
27.01.2023  15:36    <DIR>          ..
27.01.2023  15:09             2 448 keystore.p12
27.01.2023  15:36             2 434 mqttserver.p12
               2 File(s)          4 882 bytes
               2 Dir(s)  51 380 154 368 bytes free
```

在此目录中，你需要通过 SFTP 连接到路由器的 IP（SFTP 允许你使用 SSH 协议传输文件，因此你需要事先确保已启用 [SSH 服务](../../system-information-and-utilities/services.md)）：

```powershell
c:\Users\Admin\Desktop\ThingsBoard>sftp admin@192.168.88.1
The authenticity of host '192.168.88.1 (192.168.88.1)' can't be established.
RSA key fingerprint is SHA256:/WmmZErqWL51SOlS4EaGvSQ0i4HPnSIHCEjnc8AmP2c.
Are you sure you want to continue connecting (yes/no/[fingerprint])?yes
admin@192.168.88.1's password:
Connected to 192.168.88.1.
sftp>
```

在容器运行时，转到 ThingsBoard 配置文件文件夹（使用 `dir` 或 `ls` 命令查看当前文件夹内容，使用 `cd` 命令转到我们选择的文件夹）。默认情况下，它应该是包含 "**thingsboard.yml**" 配置文件的文件夹。在我们的示例中，我们可以在以下位置找到它：

```powershell
sftp> cd ThingsBoard/usr/share/thingsboard/conf

sftp> dir

banner.txt          i18n                logback.xml         templates           thingsboard.conf    thingsboard.yml     
```

使用 `get` 命令下载 "**thingsboard.yml**" 配置。这会将默认 ThingsBoard 配置文件下载到你的机器（到你启动 SFTP 时的目录）：

```powershell
sftp> get thingsboard.yml
Fetching /ThingsBoard/usr/share/thingsboard/conf/thingsboard.yml to thingsboard.yml
/ThingsBoard/usr/share/thingsboard/conf/thingsboard.yml                               100%   67KB   2.0MB/s   00:00
sftp> quit

c:\Users\Admin\Desktop\ThingsBoard>dir
 Directory of c:\Users\Admin\Desktop\ThingsBoard

30.01.2023  10:59    <DIR>          .
30.01.2023  10:59    <DIR>          ..
27.01.2023  15:09             2 448 keystore.p12
27.01.2023  15:36             2 434 mqttserver.p12
30.01.2023  10:59            68 846 thingsboard.yml
               3 File(s)         73 728 bytes
               2 Dir(s)  50 901 626 880 bytes free
```

### 修改 ThingsBoard 的设置 {#alter-the-thingsboards-settings}

使用你偏好的文本编辑器（notepad 或任何其他编辑器）打开 "**thingsboard.yml**"，并修改几行。你可以备份此文件，并以不同名称保存，以便在配置错误时拥有默认设置的副本。

#### HTTPS 相关设置 {#https-related-settings}

1. 启用 SSL →  将 "SSL\_ENABLED:**false**" 改为 "SSL\_ENABLED:**true**"。
2. 更改凭据类型 → 从 "SSL\_CREDENTIALS\_TYPE:**PEM**" 改为 "SSL\_CREDENTIALS\_TYPE:**KEYSTORE**"。
3. 更改路径 → 从 "SSL\_KEY\_STORE:**classpath:keystore/keystore.p12**" 改为 "SSL\_KEY\_STORE:**keystore.p12**"（可选）。
4. 禁用 key alias 设置 → 将其注释掉 → 只需在 `key_alias: "${SSL_KEY_ALIAS:tomcat}"` 行前放置 "**#**" 符号。
5. 输入你在 RouterOS 中使用的自己的证书密码 → 将 "SSL\_KEY\_STORE\_PASSWORD:**thingsboard**" 改为 "SSL\_KEY\_STORE\_PASSWORD:**thingsboard\_cert\_password**"，并将 "SSL\_KEY\_PASSWORD:**thingsboard**" 改为 "SSL\_KEY\_PASSWORD:**thingsboard\_cert\_password**"。

```js
  ssl:
    # Enable/disable SSL support
    enabled: "${SSL_ENABLED:true}"
    # Server SSL credentials
    credentials:
      # Server credentials type (PEM - pem certificate file; KEYSTORE - java keystore)
      type: "${SSL_CREDENTIALS_TYPE:KEYSTORE}"
      # Keystore server credentials
      keystore:
        # Type of the key store (JKS or PKCS12)
        type: "${SSL_KEY_STORE_TYPE:PKCS12}"
        # Path to the key store that holds the SSL certificate
        store_file: "${SSL_KEY_STORE:keystore.p12}"
        # Password used to access the key store
        store_password: "${SSL_KEY_STORE_PASSWORD:thingsboard_cert_password}"
        # Key alias
        #key_alias: "${SSL_KEY_ALIAS:tomcat}"
        # Password used to access the key
        key_password: "${SSL_KEY_PASSWORD:thingsboard_cert_password}"
```

#### MQTT 相关设置 {#mqtt-related-settings}

1. 启用 SSL →  将 "MQTT\_SSL\_ENABLED:**false**" 改为 "MQTT\_SSL\_ENABLED:**true**"；
2. 更改凭据类型 → 从 "MQTT\_SSL\_CREDENTIALS\_TYPE:**PEM**" 改为 "MQTT\_SSL\_CREDENTIALS\_TYPE:**KEYSTORE**"；
3. 更改密钥类型 → 从 "MQTT\_SSL\_KEY\_STORE\_TYPE:**JKS**" 改为 "MQTT\_SSL\_KEY\_STORE\_TYPE:**PKCS12**"；
4. 更改路径（扩展名）→ 从 "MQTT\_SSL\_KEY\_STORE:mqttserver**.jks**" 改为 "MQTT\_SSL\_KEY\_STORE:mqttserver**.p12**"。
5. 禁用 key alias 设置 → 将其注释掉 → 只需在 `key_alias: "${MQTT_SSL_KEY_ALIAS:}"` 行前放置 "**#**" 符号；
6. 输入你在 RouterOS 中使用的自己的证书密码 → 将 "MQTT\_SSL\_KEY\_STORE\_PASSWORD:**server\_ks\_password**" 改为 "MQTT\_SSL\_KEY\_STORE\_PASSWORD:**thingsboard\_mqttcert\_password**"，并将 "MQTT\_SSL\_KEY\_PASSWORD:**server\_key\_password**" 改为 "MQTT\_SSL\_KEY\_PASSWORD:**thingsboard\_mqttcert\_password**"。

```js
    ssl:
      # Enable/disable SSL support
      enabled: "${MQTT_SSL_ENABLED:true}"
      # Server SSL credentials
      credentials:
        # Server credentials type (PEM - pem certificate file; KEYSTORE - java keystore)
        type: "${MQTT_SSL_CREDENTIALS_TYPE:KEYSTORE}"
        # Keystore server credentials
        keystore:
          # Type of the key store (JKS or PKCS12)
          type: "${MQTT_SSL_KEY_STORE_TYPE:PKCS12}"
          # Path to the key store that holds the SSL certificate
          store_file: "${MQTT_SSL_KEY_STORE:mqttserver.p12}"
          # Password used to access the key store
          store_password: "${MQTT_SSL_KEY_STORE_PASSWORD:thingsboard_mqttcert_password}"
          # Optional alias of the private key; If not set, the platform will load the first private key from the keystore;
          #key_alias: "${MQTT_SSL_KEY_ALIAS:}"
          # Optional password to access the private key. If not set, the platform will attempt to load the private keys that are not protected with the password;
          key_password: "${MQTT_SSL_KEY_PASSWORD:thingsboard_mqttcert_password}"
```

:::info
将其余设置保留为默认值。除非你知道自己在做什么，否则不要删除/更改上方示例中未显示的行。
:::

将更改应用到 "**thingsboard.yml**" 文件（编辑后重新保存）。

### 上传修改后的 ThingsBoard 配置文件 {#upload-altered-thingsboard-configuration-file}

剩下的就是用修改后的文件覆盖当前配置文件，并上传两个证书。

再次确保你的终端指向正确的文件夹（其中有 3 个文件 → 两个证书和修改后的 "thingsboard.yml" 文件），然后从那里通过 SFTP 进入容器的配置文件目录：

```powershell
c:\Users\Admin\Desktop\ThingsBoard>dir
 Directory of c:\Users\Admin\Desktop\ThingsBoard

30.01.2023  10:59    <DIR>          .
30.01.2023  10:59    <DIR>          ..
27.01.2023  15:09             2 448 keystore.p12
27.01.2023  15:36             2 434 mqttserver.p12
30.01.2023  10:59            68 846 thingsboard.yml
               3 File(s)         73 728 bytes
               2 Dir(s)  50 901 626 880 bytes free
c:\Users\Admin\Desktop\ThingsBoard>sftp admin@192.168.88.1
admin@192.168.88.1's password:
Connected to 192.168.88.1.
sftp> cd ThingsBoard/usr/share/thingsboard/conf
sftp> dir
banner.txt          i18n                logback.xml         templates           thingsboard.conf    thingsboard.yml     
```

使用 `put` 命令上传这些文件：

```powershell
sftp> put thingsboard.yml
Uploading thingsboard.yml to /ThingsBoard/usr/share/thingsboard/conf/thingsboard.yml
thingsboard.yml                                                                       100%   67KB   2.2MB/s   00:00
sftp> put keystore.p12
Uploading keystore.p12 to /ThingsBoard/usr/share/thingsboard/conf/keystore.p12
keystore.p12                                                                          100% 2448     1.2MB/s   00:00
sftp> put mqttserver.p12
Uploading mqttserver.p12 to /ThingsBoard/usr/share/thingsboard/conf/mqttserver.p12
mqttserver.p12                                                                        100% 2434   608.5KB/s   00:00
sftp> dir
banner.txt          i18n                keystore.p12        logback.xml         mqttserver.p12      templates           
thingsboard.conf    thingsboard.yml
```

重启容器：

```ros
[admin@MikroTik] > /container/stop 0
[admin@MikroTik] > /container/start 0
```

在再次启动容器之前，务必等待容器停止（使用 `/container/print` 命令后应显示 `status=stopped`）。

### 确认 HTTPS 访问 {#confirm-https-access}

现在，你应该能够访问 [https://your\_IP:9090](https://192.168.88.1)（其中 IP 地址是 DNAT 规则中使用的地址）：

![](/img/c12800e16c69a30a.webp)

:::info
由于我们使用的是并非由受信任机构签发的自签名证书，可能会出现指示连接不安全的错误，但你可以通过浏览器查看证书（确认就是该证书），接受风险并继续。
:::

### 确认 SSL MQTT 连接 {#confirm-ssl-mqtt-connection}

:::info
**不要忘记修改**“网络”部分所示的**端口转发规则**，将 **`dst-port`** 和 **`to-ports`** 从 1883（标准非 SSL MQTT 端口）**改为 8883**（**SSL MQTT 端口**）。
:::

在此示例中，我们将测试[单向 SSL 通信访问令牌场景](../../internet-of-things/mqtt/mqtt-and-thingsboard-configuration.md#one-way-ssl-communication-scenario)。

#### 使用运行容器的设备进行测试 {#testing-with-the-device-that-is-running-the-container}

:::info
MQTT 证书应该已经安装到设备的系统中（因为生成它的正是该设备）。
:::

添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=tbssl address=172.18.0.2 port=8883 username=YOUR_TOKEN ssl=yes
```

以 JSON 格式发布一条静态测试 MQTT 消息：

```ros
/iot/mqtt/publish broker="tbssl" topic="v1/devices/me/telemetry" message="{\"test\":\"123\"}"
```

确认 MQTT broker 已收到它：

![](/img/950e2b020d062eb0.webp)

#### 使用另一台设备进行测试 {#testing-with-another-device}

当你有两台 RouterOS 设备时，一台运行容器（在我们的示例中，它也是生成证书的同一台设备），另一台是你希望从中测试 MQTT 连接的设备（比如 [LTAP](https://mikrotik.com/product/ltap) 或任何其他已安装 IoT 包的 RouterOS 设备）→ 你需要将证书导入第二台设备。

将导出的证书（**mqttserver.p12**）拖放到设备的 "File List" 中：

```ros
[admin@LTAP] > /file/print
Columns: NAME, TYPE, SIZE, CREATION-TIME
#  NAME            TYPE       SIZE  CREATION-TIME       
0  mqttserver.p12  .p12 file  2438  2023-01-30 13:28:11
1  flash           disk             2021-07-06 14:51:53
2  flash/pub       directory        2021-07-06 14:51:53
3  flash/skins     directory        1970-01-01 02:00:07
[admin@LTAP] > 
```

导入证书：

```ros
[admin@LTAP] > /certificate/import file-name=mqttserver.p12 passphrase=thingsboard_mqttcert_password
```

添加 MQTT broker，其中地址是 ThingsBoard 容器路由器上 TCP 8883 端口转发规则中使用的 IP 地址 `dst-address`：

```ros
/iot/mqtt/brokers/add name=tbssl address=192.168.88.1 port=8883 username=YOUR_TOKEN ssl=yes
```

以 JSON 格式发布一条静态测试 MQTT 消息：

```ros
/iot/mqtt/publish broker="tbssl" topic="v1/devices/me/telemetry" message="{\"test\":\"123\"}"
```

并确认 broker 已收到它 → 在 ThingsBoard 上的 "Latest Telemetry" 部分下。
