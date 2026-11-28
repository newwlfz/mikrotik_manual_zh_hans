---
title: "Kaa IoT 设置"
description: "本页介绍适用于 MikroTik RouterOS 的 Kaa IoT 设置，涵盖 MQTT 和 HTTP 协议支持、通过脚本进行系统资源监控，以及 Kaa IoT 门户配置步骤，包括应用和设备创建、端点令牌管理。文中还概述了 RouterOS 的先决条件，例如互联网访问，以及使用 MQTT 时可选安装 iot 软件包。"
tags:
  - 'mqtt'
  - 'http'
  - 'scripting'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/mqtt/kaa-iot-setup
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "internet-of-things/mqtt"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

[MQTT](/docs/internet-of-things/mqtt/kaa-iot-setup) 和 [HTTP](/docs/system-information-and-utilities/fetch) 是用于传输各类数据的最常用协议之一。两种协议都广泛应用于不同的 IoT 场景，并且均受 [RouterOS](/docs/getting-started/software-specifications) 支持。

你可能会问，是什么类型的数据？几乎可以是任何数据……RouterOS [脚本](/docs/developer-guides/scripting) 是一个非常强大的工具，可以借助 [调度](/docs/system-information-and-utilities/scheduler) 自动管理设备。

例如，可以使用命令 `/system/resource/print` 检查系统资源信息：

```ros
/system/resource/print
                   uptime: 4d1h37m55s
                  version: 7.14.3 (stable)
               build-time: 2024-04-17 12:47:58
         factory-software: 6.45.9
              free-memory: 926.0MiB
             total-memory: 1024.0MiB
                      cpu: ARM
                cpu-count: 4
            cpu-frequency: 533MHz
                 cpu-load: 0%
           free-hdd-space: 88.5MiB
          total-hdd-space: 128.0MiB
  write-sect-since-reboot: 1107
         write-sect-total: 1447413
               bad-blocks: 0%
        architecture-name: arm
               board-name: RB1100AHx4
                 platform: MikroTik
```

该命令会显示有用信息，例如 CPU 使用率、RAM 内存使用率、设备运行时间和固件版本。另一条命令可以输出 [GPS](/docs/mobile-networking/gps) 坐标（如果设备内置 GPS 芯片）等……

本质上，这意味着任何可以“打印”到 RouterOS [终端](/docs/management-tools/console) 的内容，都可以通过脚本结构化为 JSON 格式消息，并按配置的间隔发送。本指南稍后将展示一个更详细的示例。

换句话说，你可以将数据从 MikroTik 发送到你选择的任何 MQTT 或 HTTP 服务器。[Kaa IoT](https://www.kaaiot.com/) 就是这样的服务器之一。

[Why Kaa IoT?](https://www.kaaiot.com/advantages/platform)

## Kaa IoT 配置 {#kaa-iot-configuration}

请务必查看 [KAA: Connecting your first device](https://www.kaaiot.com/docs/tutorials/getting-started/connecting-your-first-device)。

登录门户后，请按 [playbook](https://www.kaaiot.com/docs/tutorials/getting-started/connecting-your-first-device) 中的步骤开始操作：

a) 在“**Home>Device management>Applications**”下，点击“**Add application**”按钮创建应用，为其命名，然后点击“**Create**”：

![](/img/bac400b8d4d8d195.webp)

b) 在“**Home>Device management>Devices**”下，点击“**Add device**”按钮创建设备，为其命名，然后点击“**Create**”：

![](/img/9497b03be79a6946.webp)

输入你自己的“Endpoint token”，或让系统自动生成一个。务必“save”该令牌，因为之后将无法再次访问它。

剩下的工作是使用 MQTT 或 HTTP 将路由器连接到服务器，发布一些数据，并自定义第一个仪表板，以便更直观地查看数据。

## RouterOS 配置 {#routeros-configuration}

首先，设备应能访问互联网。请查看 [First Time Configuration](/docs/getting-started/first-time-configuration) 指南。

互联网正常运行后，如果计划使用 [MQTT](/docs/internet-of-things/mqtt/kaa-iot-setup) 协议，请确保已安装 **iot** 软件包。可以从 [download page](https://mikrotik.com/download) 的“Extra packages”文件中下载适用于设备对应架构的软件包。解压“Extra packages”文件，并将 **iot** 软件包上传到“[Files](/docs/system-information-and-utilities/files)”（之后重启设备）。如果只计划使用 [HTTP posting](/docs/system-information-and-utilities/fetch)，则无需安装 iot 软件包。

继续之前，请访问 Kaa IoT 的 [MQTT](https://www.kaaiot.com/docs/device-connectivity/mqtt-device-api) 和 [HTTP](https://www.kaaiot.com/docs/device-connectivity/http-device-api) 设备 API 指南。

### 使用 HTTP 发布数据 {#using-http-to-post-the-data}

要发布基本 JSON 消息：

```bash
{"test":"data"}
```

只需运行以下命令：

```ros
/tool/fetch url="https://next.kaaiot.com/kpc/kp1/<app-version>/epmx/<token>/update/keys" http-method=post  http-header-field="Content-Type: application/json" http-data="{\"test\":\"data\"}" output=user mode=https
```

，其中应将 `<app-version>`（可在“**Home>Device management>Devices>Specific device**”选项卡下查看）和 `<token>`（在平台上创建设备后生成）更改为对应的值。

你应该能看到“**Home>Device management>Devices>Specific device>Overview**”选项卡下出现了新的“Metadata”值，或查看“**Home>Device management>Devices>Specific device>Data logs"**”选项卡下的日志。

要收集 `/system/resource/print` 信息并发布，可以使用脚本。将下面显示的脚本内容复制并粘贴到命令行中：

```ros
/system/script
add dont-require-permissions=no name=systeminfo owner=admin policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="#####################\
    ############### System ###################################\r\
    \n:put (\"[*] Gathering system info...\")\r\
    \n:local cpuLoad [/system/resource/get cpu-load];\r\
    \n:local freeMemory [/system/resource/get free-memory];\r\
    \n:local usedMemory ([/system/resource/get total-memory] - \$freeMemory);\r\
    \n:local rosVersion [/system/package/get value-name=version \\\r\
    \n[/system/package/find where name ~ \"^routeros\"]];\r\
    \n:local model [/system/routerboard/get value-name=model];\r\
    \n:local serialNumber [/system/routerboard/get value-name=serial-number];\r\
    \n:local upTime [/system/resource/get uptime];\r\
    \n\r\
    \n#################################### message #####################################\r\
    \n:local message \\\r\
    \n\"{\\\"model\\\":\\\"\$model\\\",\\\r\
    \n\\\"sn\\\":\\\"\$serialNumber\\\",\\\r\
    \n\\\"ros\\\":\\\"\$rosVersion\\\",\\\r\
    \n\\\"cpu\\\":\\\"\$cpuLoad\\\",\\\r\
    \n\\\"umem\\\":\\\"\$usedMemory\\\",\\\r\
    \n\\\"fmem\\\":\\\"\$freeMemory\\\",\\\r\
    \n\\\"uptime\\\":\\\"\$upTime\\\"}\"\r\
    \n\r\
    \n:log info \"\$message\";\r\
    \n:put (\"[*] Total message size: \$[:len \$message] bytes\")\r\
    \n:put (\"[*] Sending message...\")\r\
    \n/tool/fetch url=\"https://next.kaaiot.com/kpc/kp1/<app-version>/epmx/<token>/up\
    date/keys\" http-method=post  http-header-field=\"Content-Type: application/json\" http-data=\
    \"\$message\" output=user mode=https\r\
    \n:put (\"[*] Done\")"
```

更改 URL 中的 `<app-version>` 和 `<token>` 值。然后，使用以下命令运行脚本：

```ros
/system/script/run systeminfo
```

JSON 消息如下所示：

```bash
{
  "model": "RB924iR-2nD-BT5&BG77",
  "sn": "XXXXXXX",
  "ros": "7.99",
  "cpu": "7",
  "umem": "45113344",
  "fmem": "21995520",
  "uptime": "4d22:16:08"
}
```

### 使用 MQTT 发布数据 {#using-mqtt-to-post-the-data}

要使用单向 SSL MQTT 场景，请从“**Home>Device management>Credentials**”中获取根证书，方法是点击“**Get root certificate**”按钮。详情请参阅[此处](https://www.kaaiot.com/docs/tutorials/getting-started/authenticating-client-with-tls-certificate)。

将 ca.pem 证书文件上传到 RouterOS，并使用以下命令导入：

```ros
/certificate/import file-name=ca.pem passphrase=""
```

添加新的 MQTT broker：

```ros
/iot/mqtt/brokers
add address=mqtt.next.kaaiot.com name=kaaiot port=8883 ssl=yes
```

连接到 broker，并使用“print”命令检查连接是否持续进行（应显示“**connected=yes**”）：

```ros
/iot/mqtt/connect broker=kaaiot

/iot/mqtt/brokers/print
0 name="kaaiot" address="mqtt.next.kaaiot.com" port=8883 ssl=yes auto-connect=no keep-alive=60 parallel-scripts-limit=off connected=yes

```

要发布基本 JSON 消息：

```bash
{"test":"data"}
```

只需运行以下命令：

```ros
/iot/mqtt/publish broker=kaaiot message="{\"test\":\"data\"}" topic="kp1/<app-version>/epmx/<token>/update/keys/88"
```

，应在其中将 `<app-version>`（可在“**Home>Device management>Devices>Specific device**”选项卡下查看）和 `<token>`（在平台上创建设备后生成）更改为各自的值。

应能看到“**Home>Device management>Devices>Specific device>Overview**”选项卡下出现新的“Metadata”值，或查看“**Home>Device management>Devices>Specific device>Data logs**”选项卡下的日志。

要收集并发布 `/system/resource/print` 信息，可以使用脚本。将下方所示脚本内容复制并粘贴到命令行：

```ros
/system/script
add dont-require-permissions=no name=systeminfo owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="#####\
    ############################### System ###################################\r\
    \n:put (\"[*] Gathering system info...\")\r\
    \n:local cpuLoad [/system/resource/get cpu-load];\r\
    \n:local freeMemory [/system/resource/get free-memory];\r\
    \n:local usedMemory ([/system/resource/get total-memory] - \$freeMemory);\r\
    \n:local rosVersion [/system/package/get value-name=version \\\r\
    \n[/system/package/find where name ~ \"^routeros\"]];\r\
    \n:local model [/system/routerboard/get value-name=model];\r\
    \n:local serialNumber [/system/routerboard/get value-name=serial-number];\r\
    \n:local upTime [/system/resource/get uptime];\r\
    \n\r\
    \n#################################### message #####################################\r\
    \n:local message \\\r\
    \n\"{\\\"model\\\":\\\"\$model\\\",\\\r\
    \n\\\"sn\\\":\\\"\$serialNumber\\\",\\\r\
    \n\\\"ros\\\":\\\"\$rosVersion\\\",\\\r\
    \n\\\"cpu\\\":\\\"\$cpuLoad\\\",\\\r\
    \n\\\"umem\\\":\\\"\$usedMemory\\\",\\\r\
    \n\\\"fmem\\\":\\\"\$freeMemory\\\",\\\r\
    \n\\\"uptime\\\":\\\"\$upTime\\\"}\"\r\
    \n\r\
    \n:log info \"\$message\";\r\
    \n:put (\"[*] Total message size: \$[:len \$message] bytes\")\r\
    \n:put (\"[*] Sending message...\")\r\
    \n/iot/mqtt/publish broker=kaaiot message=\$message topic=\"kp1/<app-version>/epmx/<token>/update/keys/88\"\r\
    \n:put (\"[*] Done\")"
```

更改主题的 `<app-version>` 和 `<token>` 值。然后，使用以下命令运行脚本：

```ros
/system/script/run systeminfo
```

JSON 消息如下所示：

```bash
{
  "model": "RB924iR-2nD-BT5&BG77",
  "sn": "XXXXXXX",
  "ros": "7.99",
  "cpu": "7",
  "umem": "45113344",
  "fmem": "21995520",
  "uptime": "4d22:16:08"
}
```

## 使用仪表板可视化数据 {#data-visualization-using-dashboards}

要可视化此前发布的数据，请转到“**Home>Solutions>Your\_Solution>Dashboards>Your\_Dashboard**”，然后点击“**Add widget**”：

![](/img/b7fb7d39b26494dc.webp)

选择组件类型（本文将使用“**Device management**”），以及预置组件（本文将使用“**Endpoint metadata**”）。

编辑组件，并在“**Data source>Endpoint ID**”下选择“Endpoint ID”。在此，可以进一步自定义仪表板：

![](/img/cdb90037e971b282.webp)

因此，可以创建自己的脚本来收集对你重要的信息，然后应用 [scheduler](/docs/system-information-and-utilities/scheduler)，按你选择的间隔运行脚本。也许你希望从 [LTAP](https://mikrotik.com/product/ltap#fndtn-specifications) 收集 GPS 坐标，并使用“map”组件进行可视化？这完全取决于你！
