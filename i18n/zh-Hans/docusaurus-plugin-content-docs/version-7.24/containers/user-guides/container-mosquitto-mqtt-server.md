---
title: "Container - mosquitto MQTT 服务器"
description: "本页介绍如何使用 MikroTik RouterOS 容器运行 eclipse-mosquitto MQTT 服务器，以用于 IoT 应用，并详细说明容器设置步骤，包括网络、环境变量和挂载，同时提供 SSL 支持相关警告。"
tags:
  - 'mqtt'
  - 'container'
source: https://manual.mikrotik.com/docs/7.24/containers/user-guides/container-mosquitto-mqtt-server
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

RouterOS 引入容器功能后，可以在路由器内部运行各种用于不同任务的服务器。对于希望减少网络中设备数量的用户，这一点尤其有用。与其在单独的设备或机器上运行服务器，不如将其运行在路由器内部？

本指南将介绍如何安装一个名为 [eclipse-mosquitto](https://mosquitto.org/) 的基础 MQTT broker（即服务器）。MQTT 协议非常流行，尤其适用于 IoT 拓扑。它是一种开放的 OASIS 和 ISO 标准轻量级发布-订阅网络协议，用于在设备之间传输消息。典型拓扑由 MQTT 发布者（发送信息的设备）、MQTT broker（存储数据的服务器）和 MQTT 订阅者（监听服务器上发布的数据的设备）组成。

RouterOS 支持 [MQTT publish, subscribe](/docs/internet-of-things/mqtt) 功能，现在也可以运行 MQTT broker。

可通过 hub.docker 的[链接](https://hub.docker.com/_/eclipse-mosquitto)找到将要使用的镜像。

## 摘要 {#summary}

在继续配置之前，请务必阅读 [container](/docs/containers) 指南。请务必查看 [disclaimer](/docs/containers#disclaimer) 和 [requirements](/docs/containers#requirements) 部分，以了解所有风险以及可能需要执行的必要步骤。

可以通过以下 [link](https://hub.docker.com/_/eclipse-mosquitto/tags) 查看支持的架构。

在本指南发布时，**eclipse-mosquitto** 镜像可用于 ARM32、ARM64 和 AMD64（CHR 和 x86）设备。在本示例中，我们将在 ARM32 架构设备 → [RB1100AHx4](https://mikrotik.com/product/rb1100ahx4) 上运行它。

:::warning

下面将介绍**非常基础**且**快速**的配置。请务必查看 [mosquitto documentation](https://mosquitto.org/documentation/) 页面，了解可以实施的其他选项和设置。如果要将其用于生产环境，请**务必尽可能加强安全性**：

- [Firewall](/docs/firewall-and-quality-of-service/firewall)，使对容器的访问仅允许来自受信任的 IP 地址；
- 从 mosquitto broker/server 端增强安全性 → 使用强密码、非标准端口等；
- 使用 SSL MQTT。
:::

## 容器配置 {#container-configuration}

**子菜单：** `/container`

***note**：* 需要 **container** 软件包。

### 容器模式 {#container-mode}

启用容器模式：

```ros
/system/device-mode/update container=yes
```

如果在 X86 上使用容器，需要通过按下 reset 按钮或冷重启来确认 device-mode。

### 网络 {#networking}

为容器添加 veth 接口：

```ros
/interface/veth/add name=veth2 address=172.19.0.2/24 gateway=172.19.0.1
```

为容器创建网桥，并将 veth 添加到该网桥：

```ros
/interface/bridge/add name=msqt
/ip/address/add address=172.19.0.1/24 interface=msqt
/interface/bridge/port/add bridge=msqt interface=veth2
```

如果需要 NAT，为测试目的转发非 SSL MQTT 的 TCP 1883（其中 192.168.88.1 是设备的 LAN IP 地址）（可选）：

```ros
/ip/firewall/nat/add action=dst-nat chain=dstnat dst-address=192.168.88.1 dst-port=1883 protocol=tcp to-addresses=172.19.0.2 to-ports=1883
```

### 环境变量和挂载 {#environment-variables-and-mounts}

根据 eclipse-mosquitto docker hub，为配置文件定义挂载。我们不仅挂载配置文件，还挂载整个文件夹，因为对于 SSL MQTT，还需要将证书上传到该文件夹中：

```ros
/container/mounts/add list=msqt_config src=/mosquitto_mounted dst=/mosquitto/config
```

### 获取镜像 {#getting-image}

为简化配置，将从外部库获取镜像，也可以通过 [.tar](/docs/containers#option-b-import-image-from-pc) 文件导入。

本示例使用设备自身存储。RB1100AHx4 有 128 MB 磁盘空间，基础 mosquitto 安装占用空间不应超过约 15 MB。

确保已相应设置“Registry URL”，限制 RAM 使用量（如有必要），并为镜像设置目录：

```ros
/container/config/set registry-url=https://registry-1.docker.io tmpdir=pull
```

### 拉取镜像 {#pull-image}

```ros
/container/add remote-image=library/eclipse-mosquitto:latest interface=veth2 root-dir=mosquitto mountlists=msqt_config logging=yes
```

运行命令后，RouterOS 应开始“提取”软件包。检查“File System”中是否有新创建的文件夹，并使用命令 `/container/print` 监控容器状态。

### 设置 mosquitto 配置文件 {#setting-up-mosquitto-configuration-file}

要获取 **mosquitto.conf** 文件，需要使用 SFTP 协议（通过 SSH 传输文件），因此请确保 SSH [service](/docs/system-information-and-utilities/services) 已启用。也可以使用 FTP。

打开命令终端（Windows 用户以管理员身份打开“CMD”，Linux 用户打开“Linux Shell or Command Terminal”），并导航到要下载配置文件的目录。例如，导航到“Desktop”上的“Container”文件夹：

```powershell
C:\WINDOWS\system32>cd C:\Users\Administrator\Desktop\Container

C:\Users\Administrator\Desktop\Container>
```

启动到设备 IP 地址的 SFTP：

```powershell
C:\Users\Administrator\Desktop\Container>sftp admin@192.168.88.1
The authenticity of host '192.168.88.1 (192.168.88.1)' can't be established.
RSA key fingerprint is SHA256:lfxxs+xMrXlvP7hiHi9ZAEZlPi6/c5US+r6J7ljhkaA.
Are you sure you want to continue connecting (yes/no/[fingerprint])?yes
Warning: Permanently added '192.168.88.1' (RSA) to the list of known hosts.
Connected to 192.168.88.1.
sftp>
```

进入 mosquitto 配置文件文件夹（使用 `dir` 或 `ls` 命令查看当前文件夹的内容，并使用 `cd` 命令进入所需文件夹）。默认情况下，配置从“/mosquitto/config/mosquitto.conf”加载，因此请导航到该位置，并使用 `get` 命令下载它：

```powershell
sftp> cd mosquitto/mosquitto/config
sftp> dir
mosquitto.conf
sftp> get mosquitto.conf
Fetching /mosquitto/mosquitto/config/mosquitto.conf to mosquitto.conf
/mosquitto/mosquitto/config/mosquitto.conf
```

使用首选文本编辑器（notepad 或其他编辑器）打开“**mosquitto.conf**”，并用下面显示的两行内容覆盖它：

:::warning

本节将配置一个基本的非 SSL MQTT 设置，仅用于测试。除非确定已落实所需的安全措施/限制，否则非 SSL MQTT 不适用于生产环境。

对于生产环境、MQTT 流量可能被捕获/嗅探的拓扑，以及 MQTT 流量直接经互联网（非本地）路由的拓扑，请使用 SSL MQTT。详情请参阅 [SSL MQTT 部分](/docs/containers/user-guides/container-mosquitto-mqtt-server#ssl-mqtt)。
:::

```text
listener 1883
allow_anonymous true
```

- 第一行 **listener 1883** 将使安装程序监听指定端口上的传入网络连接。
- 第二行 **allow\_anonymous true** 决定是否为未提供用户名的客户端授予连接权限。

使用相同的 **mosquitto.conf** 名称覆盖该文件。

创建自定义配置文件后，将其上传到挂载目录/文件夹“**mosquitto\_mounted**”。如果尚未运行容器，则不会有“**mosquitto\_mounted**”文件夹，可以手动创建。如果已运行容器（`/container/start 0`），则该文件夹应已自动创建：

```powershell
sftp> dir
mosquitto           mosquitto_mounted   pub                 pull                skins
```

从已编辑的 `mosquitto.conf` 文件所在目录使用 SFTP，并通过 `put` 将其上传到已挂载目录：

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

在确认容器已添加，并且使用 `/container/print` 后状态已变为 `status=stopped` 之后，可以启动它：

```ros
/container/start 0
```

如果已启用容器日志，则会在 [日志](/docs/diagnostics-monitoring-and-troubleshooting/log) 部分看到类似以下内容：

```text
 12:12:46 container,info,debug 1707214366: mosquitto version 2.0.18 starting
 12:12:46 container,info,debug 1707214366: Config loaded from /mosquitto/config/mosquitto.conf.
 12:12:46 container,info,debug 1707214366: Opening ipv4 listen socket on port 1883.
 12:12:46 container,info,debug 1707214366: Opening ipv6 listen socket on port 1883.
 12:12:46 container,info,debug 1707214366: mosquitto version 2.0.18 running
```

## MQTT 发布和订阅 {#mqtt-publish-and-subscribe}

**子菜单：** `/iot/mqtt`

***note**:* 需要 **iot** 软件包。

添加 MQTT broker：

```ros
/iot/mqtt/brokers/add name=mosquitto username=test address=172.19.0.2
```

订阅 MQTT broker 和所需主题：

```ros
/iot/mqtt/subscribe broker=mosquitto topic=test/topic
```

发布静态 MQTT 消息：

```ros
/iot/mqtt/publish broker="mosquitto" topic="test/topic" message="{\"test\":\"123\"}"
```

检查订阅中是否收到消息：

```ros
/iot/mqtt/subscriptions/recv/print
 0 broker=mosquitto topic="test/topic" data="{"test":"123"}" 
   time=2023-07-12 10:01:40 
```

还可以检查容器日志（如果已启用），以确认 mosquitto 正在运行：

```text
 12:47:28 container,info,debug 1675421248: New connection from 172.19.0.1:42240 on port 1883.
 12:47:28 container,info,debug 1675421248: New client connected from 172.19.0.1:42240 as MTD8580EC793C4 (p2, c1, k60, u'test').
 12:47:38 container,info,debug 1675421258: Client MTD8580EC793C4 disconnected.
```

## SSL MQTT

在生产环境中使用 **非 SSL MQTT****不安全**。可以轻松[捕获/嗅探](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer) broker 和发布者之间的数据包交换，从而获取用户凭据和其他敏感信息。

为提高安全性，请使用 SSL MQTT。

第一步是生成证书。本示例使用简单的 Root CA 场景（不要求设备/客户端证书）。

请使用官方的 [mosquitto-tls 用户指南](https://mosquitto.org/man/mosquitto-tls-7.html) 获取分步操作说明。

### 服务器配置 {#server-configuration}

你应已生成 ca.crt（Certificate Authority 文件）、server.crt（服务器证书）和 server.key（服务器密钥）：

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

使用你偏好的文本编辑器（notepad 或其他编辑器）打开挂载的“**mosquitto.conf**”，并用下面显示的行覆盖其内容：

```text
tls_version tlsv1.2
port 8883
allow_anonymous true
cafile /mosquitto/config/ca.crt
keyfile /mosquitto/config/server.key
certfile /mosquitto/config/server.crt
```

- **tls\_version** 行设置最低 TLS 版本。
- **port 8883** 使安装程序在指定端口监听传入的网络连接。
- **allow\_anonymous true** 确定是否允许未提供用户名的客户端连接。

:::warning

我们使用基本 SSL 配置进行测试。**allow\_anonymous true** 不适用于生产环境，并非安全设置。
:::

- **cafile /mosquitto/config/ca.crt** 行指定 CA 证书文件的路径。
- **keyfile /mosquitto/config/server.key** 行指定服务器密钥文件的路径。
- **certfile /mosquitto/config/server.crt** 行指定服务器证书文件的路径。

将证书文件和更新后的支持 SSL 的 mosquitto.conf 文件上传到挂载文件夹“**mosquitto\_mounted**”中：

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

使用日志确认 broker 正在监听端口 8883：

```text
 11:20:41 container,info,debug 1689160841: mosquitto version 2.0.15 starting
 11:20:41 container,info,debug 1689160841: Config loaded from /mosquitto/config/mosquitto.conf.
 11:20:41 container,info,debug 1689160841: Opening ipv4 listen socket on port 8883.
 11:20:41 container,info,debug 1689160841: Opening ipv6 listen socket on port 8883.
 11:20:41 container,info,debug 1689160841: mosquitto version 2.0.15 running
 11:22:24 system,info,account user admin logged in from 10.5.217.34 via local
```

### 测试连接 {#testing-the-connection}

将 CA 证书（**ca.crt**）上传到 RouterOS 设备的“File List”中：

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

添加用于 SSL 连接的 MQTT broker：

```ros
/iot/mqtt/brokers/add name=mosquittoSSL username=test address=172.19.0.2 port=8883 ssl=yes
```

订阅 MQTT broker 和所需主题：

```ros
/iot/mqtt/subscribe broker=mosquittoSSL topic=test/topic
```

发布静态 MQTT 消息：

```ros
/iot/mqtt/publish broker="mosquittoSSL" topic="test/topic" message="{\"test\":\"123\"}"
```

检查订阅中是否收到消息：

```ros
/iot/mqtt/subscriptions/recv/print
 0 broker=mosquittoSSL topic="test/topic" data="{"test":"123"}" 
   time=2023-07-12 10:20:40 
```
