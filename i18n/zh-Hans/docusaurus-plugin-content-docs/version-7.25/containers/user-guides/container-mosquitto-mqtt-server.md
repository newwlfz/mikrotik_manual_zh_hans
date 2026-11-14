---
sidebar_key: "containers/user-guides/container-mosquitto-mqtt-server"
sidebar_position: 6
title: "容器 - mosquitto MQTT 服务器"
sidebar_label: "容器 - mosquitto MQTT 服务器"
description: "本页介绍如何使用 MikroTik RouterOS 容器运行 eclipse-mosquitto MQTT 服务器以支持 IoT 应用，详细说明容器设置步骤，包括网络、环境变量和挂载，并附有 SSL 支持警告。"
tags:
  - 'mqtt'
  - 'container'
source: https://manual.mikrotik.com/docs/7.25/containers/user-guides/container-mosquitto-mqtt-server
captured_at: '2026-11-04T11:15:01+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

将容器功能引入 RouterOS 后，就可以在路由器内运行各种用于各类任务的服务器。这对于希望减少网络中设备数量的人尤其有用。与其在单独的设备/机器上运行服务器，何不直接在路由器内运行它呢？

在本指南中，我们将展示如何安装一个名为 [eclipse-mosquitto](https://mosquitto.org/) 的基本 MQTT 代理（换句话说，服务器）。MQTT 协议是非常流行的选择，尤其是在 IoT 拓扑中。它是一种开放的 OASIS 和 ISO 标准轻量级发布-订阅网络协议，用于在设备之间传输消息。典型拓扑由 MQTT 发布者（发送信息的设备）、MQTT 代理（存储数据的服务器）和 MQTT 订阅者（监听服务器上发布的数据的设备）组成。

RouterOS 支持 [MQTT 发布、订阅](../../internet-of-things/mqtt/index.md) 功能，而现在我们也可以运行 MQTT 代理。

我们将要使用的镜像可通过以下 hub.docker [链接](https://hub.docker.com/_/eclipse-mosquitto) 找到。

## 概述 {#summary}

在继续配置之前，请务必学习我们的[容器](../index.md)指南。请务必查看[免责声明](../index.md#disclaimer)和[要求](../index.md#requirements)部分，以了解所有风险以及您可能需要采取的必要步骤。

您可以通过以下[链接](https://hub.docker.com/_/eclipse-mosquitto/tags)查找支持的架构。

在本指南发布时，**eclipse-mosquitto** 镜像可用于 ARM32、ARM64 和 AMD64（CHR 和 x86）设备。在本示例中，我们将在 ARM32 架构设备 → [RB1100AHx4](https://mikrotik.com/product/rb1100ahx4) 上运行它。

:::warning

将展示一个**非常基础**且**快速**的配置。请务必查看 [mosquitto 文档](https://mosquitto.org/documentation/) 页面，了解有关可实施的其他选项和设置的更多信息。如果要将其用于生产环境，请**务必尽可能强化安全性**：

- [防火墙](../../cli-reference/ip/firewall/filter/index.md)，以便仅允许来自可信 IP 地址访问容器；
- 从 mosquitto 代理/服务器端提升安全性 → 使用强密码、非标准端口等；
- 使用 SSL MQTT。

:::
## 容器配置 {#container-configuration}

**子菜单：** `/container`

***注意**:* 需要 **container** 软件包。

### 容器模式 {#container-mode}

启用容器模式：

```ros
/system/device-mode/update container=yes
```

如果要在 X86 上使用容器，您需要通过按下重置按钮或冷重启来确认 device-mode。

### 网络 {#networking}

为容器添加 veth 接口：

```ros
/interface/veth/add name=veth2 address=172.19.0.2/24 gateway=172.19.0.1
```

为容器创建网桥，并将 veth 添加到其中：

```ros
/interface/bridge/add name=msqt
/ip/address/add address=172.19.0.1/24 interface=msqt
/interface/bridge/port/add bridge=msqt interface=veth2
```

如果需要 NAT，为测试目的转发非 SSL MQTT 的 TCP 1883 端口（其中 192.168.88.1 是设备的 LAN IP 地址）（可选）：

```ros
/ip/firewall/nat/add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=1883 protocol=tcp to-addresses=172.19.0.2 to-ports=1883
```

### 环境变量和挂载 {#environment-variables-and-mounts}

根据 eclipse-mosquitto 的 Docker Hub，为配置文件定义一个挂载。我们不仅会挂载配置文件，还会挂载整个文件夹，因为对于 SSL MQTT，我们还需要将证书上传到该文件夹中：

```ros
/container/mounts/add list=msqt_config src=/mosquitto_mounted dst=/mosquitto/config
```

### 获取镜像 {#getting-image}

为简化配置，我们将从外部镜像库获取镜像，但你也可以通过 [.tar](../index.md#option-b-import-image-from-pc) 文件导入它。

在本示例中，我们将使用设备自身的存储。RB1100AHx4 有 128 MB 磁盘空间，基本的 mosquitto 安装占用不应超过约 15 MB。

确保已相应设置“Registry URL”，限制 RAM 使用量（如有必要），并为镜像设置一个目录：

```ros
/container/config/set registry-url=https://registry-1.docker.io tmpdir=pull
```
### 拉取镜像 {#pull-image}

```ros
/container/add remote-image=library/eclipse-mosquitto:latest interface=veth2 root-dir=mosquitto mountlists=msqt_config logging=yes
```

运行该命令后，RouterOS 应开始“解压”包。检查 "File System" 中新建的文件夹，并使用 `/container/print` 命令监控容器状态。
### 设置 mosquitto 配置文件 {#setting-up-mosquitto-configuration-file}

要获取 **mosquitto.conf** 文件，我们需要使用 SFTP（基于 SSH 的文件传输）协议，因此请确保已启用 SSH [服务](../../system-information-and-utilities/services.md)。您也可以使用 FTP。

打开命令终端（Windows 用户以管理员身份打开“CMD”，Linux 用户打开“Linux Shell 或命令终端”），并导航到您要下载配置文件的目录。例如，导航到“桌面”上的“Container”文件夹：

```powershell
C:\WINDOWS\system32>cd C:\Users\Administrator\Desktop\Container

C:\Users\Administrator\Desktop\Container>
```

通过设备的 IP 地址发起 SFTP 连接：

```powershell
C:\Users\Administrator\Desktop\Container>sftp admin@192.168.88.1
The authenticity of host '192.168.88.1 (192.168.88.1)' can't be established.
RSA key fingerprint is SHA256:lfxxs+xMrXlvP7hiHi9ZAEZlPi6/c5US+r6J7ljhkaA.
Are you sure you want to continue connecting (yes/no/[fingerprint])?yes
Warning: Permanently added '192.168.88.1' (RSA) to the list of known hosts.
Connected to 192.168.88.1.
sftp>
```

转到 mosquitto 配置文件文件夹（使用 `dir` 或 `ls` 命令查看当前所在文件夹的内容，使用 `cd` 命令转到您选择的文件夹）。默认情况下，配置从“/mosquitto/config/mosquitto.conf”加载，因此请导航到该位置并使用 `get` 命令下载它：

```powershell
sftp> cd mosquitto/mosquitto/config
sftp> dir
mosquitto.conf
sftp> get mosquitto.conf
Fetching /mosquitto/mosquitto/config/mosquitto.conf to mosquitto.conf
/mosquitto/mosquitto/config/mosquitto.conf
```

通过您偏好的文本编辑器（记事本或任何其他编辑器）打开“**mosquitto.conf**”，并用下面显示的两行内容覆盖它：

:::warning

在本节中，我们将为测试目的配置一个基本的非 SSL MQTT 环境。除非您确定已实施所需的安全措施/限制，否则非 SSL MQTT 对于生产环境并不安全。

对于生产环境，在 MQTT 流量可能被捕获/嗅探的拓扑中，和/或在 MQTT 流量直接通过互联网（而非本地）路由的拓扑中，请使用 SSL MQTT。查看 [SSL MQTT 部分](./container-mosquitto-mqtt-server.md#ssl-mqtt) 了解更多信息。

:::

```text
listener 1883
allow_anonymous true
```

- 第一行 **listener 1883** 将使安装实例监听指定端口上的传入网络连接。
- 第二行 **allow\_anonymous true** 决定是否允许未提供用户名进行连接的客户端连接。

使用相同的 **mosquitto.conf** 名称覆盖该文件。

创建您自己的自定义配置文件后，将其上传到挂载的目录/文件夹“**mosquitto\_mounted**”。如果您尚未运行容器，则不会有“**mosquitto\_mounted**”文件夹，您可以手动创建它。如果您已运行过（`/container/start 0`），则应已自动创建：

```powershell
sftp> dir
mosquitto           mosquitto_mounted   pub                 pull                skins
```

在编辑后的 mosquitto.conf 文件所在目录中使用 SFTP，并用 `put` 将其放入挂载目录：

```powershell
C:\Users\Administrator\Desktop\Container>dir
 Directory of C:\Users\Administrator\Desktop\Container

02/03/2023  12:09 PM    <DIR>          .
02/03/2023  12:09 PM    <DIR>          ..
02/03/2023  12:09 PM            40,449 mosquitto.conf
               1 File(s)         40,449 bytes
               2 Dir(s)  76,166,430,720 bytes free

C:\Users\Administrator\Desktop\Container>sftp admin@192.168.88.1
Connected to 192.168.88.1.
sftp> dir
mosquitto           mosquitto_mounted   pub                 pull                skins
sftp> cd mosquitto_mounted
sftp> put mosquitto.conf
Uploading mosquitto.conf to /mosquitto_mounted/mosquitto.conf
mosquitto.conf                                                                        100%  162    40.5KB/s   00:00
```

重启容器：

```ros
[admin@MikroTik] > /container/stop 0
[admin@MikroTik] > /container/start 0
```

在再次启动容器之前，请确保等待容器停止（使用 `/container/print` 命令后应显示 `status=stopped`）。
### 启动容器 {#starting-the-container}

在使用 `/container/print` 确认 container 已添加且状态变为 `status=stopped` 后 → 即可启动它：

```ros
/container/start 0
```

如果已启用容器日志记录，您将在 [日志](../../diagnostics-monitoring-and-troubleshooting/log/index.md) 部分看到类似以下内容：

```text
 12:12:46 container,info,debug 1707214366: mosquitto version 2.0.18 starting
 12:12:46 container,info,debug 1707214366: Config loaded from /mosquitto/config/mosquitto.conf.
 12:12:46 container,info,debug 1707214366: Opening ipv4 listen socket on port 1883.
 12:12:46 container,info,debug 1707214366: Opening ipv6 listen socket on port 1883.
 12:12:46 container,info,debug 1707214366: mosquitto version 2.0.18 running
```

## MQTT 发布与订阅 {#mqtt-publish-and-subscribe}

**子菜单：** `/iot/mqtt`

***注意**：* 需要 **iot** 软件包。

添加 MQTT 代理：

```ros
/iot/mqtt/brokers/add name=mosquitto username=test address=172.19.0.2
```

订阅 MQTT 代理和所需主题：

```ros
/iot/mqtt/subscribe broker=mosquitto topic=test/topic
```

发布一条静态 MQTT 消息：

```ros
/iot/mqtt/publish broker="mosquitto" topic="test/topic" message="{\"test\":\"123\"}"
```

检查订阅以查看收到的消息：

```ros
/iot/mqtt/subscriptions/recv/print
 0 broker=mosquitto topic="test/topic" data="{"test":"123"}" 
   time=2023-07-12 10:01:40 
```

您还可以检查容器日志（如果已启用），以确认 mosquitto 正常运行：

```text
 12:47:28 container,info,debug 1675421248: New connection from 172.19.0.1:42240 on port 1883.
 12:47:28 container,info,debug 1675421248: New client connected from 172.19.0.1:42240 as MTD8580EC793C4 (p2, c1, k60, u'test').
 12:47:38 container,info,debug 1675421258: Client MTD8580EC793C4 disconnected.
```

## SSL MQTT {#ssl-mqtt}

在生产环境中使用 **非 SSL MQTT** **并不安全**。人们可以轻松地[捕获/嗅探](../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)代理与发布者之间的数据包交换，从而能够获取用户凭据和其他敏感信息。

为了提高安全性，请使用 SSL MQTT。

第一步是生成证书。在本示例中，我们将使用简单的 Root CA 场景（不要求设备/客户端证书）。

请使用官方的 [mosquitto-tls 用户指南](https://mosquitto.org/man/mosquitto-tls-7.html) 了解分步操作。

### 服务器配置 {#server-configuration}

您应已生成 ca.crt（证书颁发机构文件）、server.crt（服务器证书）和 server.key（服务器密钥）：

```powershell
C:\Users\Administrator\Desktop\Container>dir
 Directory of C:\Users\Administrator\Desktop\Container

07/12/2023  10:58 AM    <DIR>          .
07/12/2023  10:58 AM    <DIR>          ..
07/12/2023  10:56 AM             1,322 ca.crt
07/12/2023  10:56 AM             1,854 ca.key
07/12/2023  09:57 AM                35 mosquitto.conf
07/12/2023  10:58 AM             1,164 server.crt
07/12/2023  10:57 AM               960 server.csr
07/12/2023  10:56 AM             1,704 server.key
               6 File(s)          7,039 bytes
               2 Dir(s)  52,401,184,768 bytes free
```

通过您偏好的文本编辑器（记事本或任何其他编辑器）打开挂载的“**mosquitto.conf**”，并用下面显示的行覆盖它：

```text
tls_version tlsv1.2
port 8883
allow_anonymous true
cafile /mosquitto/config/ca.crt
keyfile /mosquitto/config/server.key
certfile /mosquitto/config/server.crt
```

- **tls\_version** 行设置最低 TLS 版本。
- **port 8883** 将使安装实例监听指定端口上的传入网络连接。
- **allow\_anonymous true** 决定是否允许未提供用户名进行连接的客户端连接。

:::warning

我们为测试目的使用基本的 SSL 配置。**allow\_anonymous true** 不是生产环境的安全设置。

:::

- **cafile /mosquitto/config/ca.crt** 行指定 CA 证书文件的路径。
- **keyfile /mosquitto/config/server.key** 行指定服务器密钥文件的路径。
- **certfile /mosquitto/config/server.crt** 行指定服务器证书文件的路径。

将证书文件和更新后的支持 SSL 的 mosquitto.conf 文件上传到挂载文件夹“**mosquitto\_mounted**”：

```powershell
C:\Users\Administrator\Desktop\Container>sftp admin@192.168.88.1
Connected to 192.168.88.1.
sftp> cd mosquitto_mounted
sftp> dir
mosquitto.conf
sftp> put ca.crt
Uploading ca.crt to /mosquitto_mounted/ca.crt
ca.crt                                                                                100% 1322   323.0KB/s   00:00
sftp> put server.crt
Uploading server.crt to /mosquitto_mounted/server.crt
server.crt                                                                            100% 1164   227.3KB/s   00:00
sftp> put server.key
Uploading server.key to /mosquitto_mounted/server.key
server.key                                                                            100% 1704   415.7KB/s   00:00
sftp> dir
ca.crt           mosquitto.conf   server.crt       server.key
sftp> put mosquitto.conf
Uploading mosquitto.conf to /mosquitto_mounted/mosquitto.conf
mosquitto.conf                                                                        100%  162    32.2KB/s   00:00
```

重启容器：

```ros
[admin@MikroTik] > /container/stop 0
[admin@MikroTik] > /container/start 0
```

使用日志确认代理监听 8883 端口：

```text
 11:20:41 container,info,debug 1689160841: mosquitto version 2.0.15 starting
 11:20:41 container,info,debug 1689160841: Config loaded from /mosquitto/config/mosquitto.conf.
 11:20:41 container,info,debug 1689160841: Opening ipv4 listen socket on port 8883.
 11:20:41 container,info,debug 1689160841: Opening ipv6 listen socket on port 8883.
 11:20:41 container,info,debug 1689160841: mosquitto version 2.0.15 running
 11:22:24 system,info,account user admin logged in from 10.5.217.34 via local
```

### 测试连接 {#testing-the-connection}

将 CA 证书（**ca.crt**）上传到 RouterOS 中设备的“文件列表”：

```ros
/file/print
Columns: NAME, TYPE, SIZE, CREATION-TIME
#  NAME                TYPE             SIZE  CREATION-TIME      
0  skins               directory              1970-01-01 03:00:02
1  pub                 directory              2023-01-04 11:05:04
2  disk7               disk                   2023-07-12 09:52:07
3  mosquitto           container store        2023-07-12 09:52:09
4  mosquitto_mounted   container store        2023-07-25 16:38:37
5  pull                directory              2023-07-12 09:52:09
6  ca.crt              .crt file        1322  2023-07-12 11:28:23
```

导入证书：

```ros
/certificate/import file-name=ca.crt passphrase=""
```

为 SSL 连接添加 MQTT 代理：

```ros
/iot/mqtt/brokers/add name=mosquittoSSL username=test address=172.19.0.2 port=8883 ssl=yes
```

订阅 MQTT 代理和所需主题：

```ros
/iot/mqtt/subscribe broker=mosquittoSSL topic=test/topic
```

发布一条静态 MQTT 消息：

```ros
/iot/mqtt/publish broker="mosquittoSSL" topic="test/topic" message="{\"test\":\"123\"}"
```

检查订阅以查看收到的消息：

```ros
/iot/mqtt/subscriptions/recv/print
 0 broker=mosquittoSSL topic="test/topic" data="{"test":"123"}" 
   time=2023-07-12 10:20:40 
```
