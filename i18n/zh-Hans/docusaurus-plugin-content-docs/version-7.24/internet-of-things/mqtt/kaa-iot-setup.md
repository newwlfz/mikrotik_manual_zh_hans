---
sidebar_key: "internet-of-things/mqtt/kaa-iot-setup"
sidebar_position: 1
title: "Kaa IoT 设置"
sidebar_label: "Kaa IoT 设置"
description: "本页面介绍面向 MikroTik RouterOS 的 Kaa IoT 设置，涵盖 MQTT 和 HTTP 协议支持、通过脚本进行系统资源监控，以及 Kaa IoT 门户配置步骤，包括创建应用/设备和管理端点令牌。页面还概述了 RouterOS 的前提条件，例如互联网访问，以及为使用 MQTT 而可选安装 iot 软件包。"
tags:
  - 'mqtt'
  - 'http'
  - 'scripting'
source: https://manual.mikrotik.com/docs/7.24/internet-of-things/mqtt/kaa-iot-setup
captured_at: '2026-11-04T11:31:51+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[MQTT](./index.md) 和 [HTTP](../../system-information-and-utilities/fetch.md) 是用于传输各类数据的最流行协议之一。这两种协议在不同 IoT 部署中都被大量使用，并且它们都受 [RouterOS](../../getting-started/software-specifications/index.md) 支持。

您可能会问，是什么类型的数据？几乎任何数据……RouterOS [脚本](../../developer-guides/scripting/index.md) 是一个非常强大的工具，可以借助[调度](../../system-information-and-utilities/scheduler.md)帮助您自动化设备。

例如，您可以借助命令 `/system/resource/print` 检查系统的资源信息：

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

该命令会显示有用的信息，例如 CPU 使用率、RAM 内存使用率、设备运行时间及其固件版本。另一个命令会输出 [GPS](../../mobile-networking/gps/index.md) 坐标（如果设备内置 GPS 芯片）等等……

本质上，这意味着任何能够“打印输出”到 RouterOS [终端](../../management-tools/console.md)的内容，都可以通过脚本组织成 JSON 格式消息，并按配置的间隔发送出去。我们将在本指南后面展示一个更详细的示例。

换句话说，您可以将 MikroTik 中的数据发送到您选择的任何 MQTT 或 HTTP 服务器。[Kaa IoT](https://www.kaaiot.com/) 就是这样一个服务器。

[为什么选择 Kaa IoT？](https://www.kaaiot.com/advantages/platform)

## Kaa IoT 配置 {#kaa-iot-configuration}

请务必查看 [KAA：连接您的第一台设备](https://www.kaaiot.com/docs/tutorials/getting-started/connecting-your-first-device)。

登录门户后，首先请按照[操作手册](https://www.kaaiot.com/docs/tutorials/getting-started/connecting-your-first-device)中的步骤操作：

a) 在 "**Home>Device management>Applications**" 下，点击 "**Add application**" 按钮创建应用，为其命名，然后点击 "**Create**"：

![](/img/bac400b8d4d8d195.webp)

b) 在 "**Home>Device management>Devices**" 下，点击 "**Add device**" 按钮创建设备，为其命名，然后点击 "**Create**"：

![](/img/9497b03be79a6946.webp)

输入您自己的 "Endpoint token"，或让系统自动生成一个。请务必“保存”它（因为之后您将无法再次访问它）。

剩下要做的就是使用 MQTT 或 HTTP 将我们的路由器连接到服务器，发布一些数据，并自定义我们的第一个仪表板，以便更轻松地将其可视化。

## RouterOS 配置 {#routeros-configuration}

首先，设备应具备互联网访问能力。请查看我们的[首次配置](../../getting-started/first-time-configuration.md)指南。

互联网正常运行后，如果您计划使用 [MQTT](./index.md) 协议，请确保已安装 **iot** 软件包。您可以从我们的[下载页面](https://mikrotik.com/download)下载它，位于 "Extra packages" 文件中（对应您设备的架构）。解压 "Extra packages" 文件，并将 **iot** 软件包上传到 "[文件](../../system-information-and-utilities/files.md)"（之后重启设备）。如果您只计划使用 [HTTP 发送](../../system-information-and-utilities/fetch.md)，则无需安装 iot 软件包。

在继续之前，请参阅 Kaa IoT 的 [MQTT](https://www.kaaiot.com/docs/device-connectivity/mqtt-device-api) 和 [HTTP](https://www.kaaiot.com/docs/device-connectivity/http-device-api) 设备 API 指南。

### 使用 HTTP 发送数据 {#using-http-to-post-the-data}

要发布一条基本 JSON 消息：

```bash
{"test":"data"}
```

只需运行以下命令：

```ros
/tool/fetch url="https://next.kaaiot.com/kpc/kp1/<app-version>/epmx/<token>/update/keys" http-method=post  http-header-field="Content-Type: application/json" http-data="{\"test\":\"data\"}" output=user mode=https
```

其中应将 `<app-version>`（可在 "**Home>Device management>Devices>Specific device**" 选项卡下查看）和 `<token>`（您在平台上创建设备后生成的）替换为各自的值。

您应该能看到在 "**Home>Device management>Devices>Specific device>Overview**" 选项卡下出现了新的 "Metadata" 值，或在 "**Home>Device management>Devices>Specific device>Data logs"** 选项卡下查看日志。

要收集 `/system/resource/print` 信息并发布它，我们可以使用脚本。将下面所示脚本的内容复制并粘贴到命令行中：

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

更改 URL 中的 `<app-version>` 和 `<token>` 值。然后使用以下命令运行脚本：

```ros
/system/script/run systeminfo
```

JSON 消息将如下所示：

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

### 使用 MQTT 发送数据 {#using-mqtt-to-post-the-data}

为了使用单向 SSL MQTT 场景，请通过点击 "**Get root certificate**" 按钮，从 "**Home>Device management>Credentials**" 获取根证书。更多信息可在[此处](https://www.kaaiot.com/docs/tutorials/getting-started/authenticating-client-with-tls-certificate)找到。

将 ca.pem 证书文件上传到 RouterOS，并使用以下命令导入：

```ros
/certificate/import file-name=ca.pem passphrase=""
```

添加新的 MQTT 代理：

```ros
/iot/mqtt/brokers
add address=mqtt.next.kaaiot.com name=kaaiot port=8883 ssl=yes
```

连接到该代理，并借助 "print" 命令检查连接是否持续（应存在 "**connected=yes**"）：

```ros
/iot/mqtt/connect broker=kaaiot

/iot/mqtt/brokers/print
0 name="kaaiot" address="mqtt.next.kaaiot.com" port=8883 ssl=yes auto-connect=no keep-alive=60 parallel-scripts-limit=off connected=yes

```

要发布一条基本 JSON 消息：

```bash
{"test":"data"}
```

只需运行以下命令：

```ros
/iot/mqtt/publish broker=kaaiot message="{\"test\":\"data\"}" topic="kp1/<app-version>/epmx/<token>/update/keys/88"
```

其中应将 `<app-version>`（可在 "**Home>Device management>Devices>Specific device**" 选项卡下查看）和 `<token>`（您在平台上创建设备后生成的）替换为各自的值。

您应该能看到在 "**Home>Device management>Devices>Specific device>Overview**" 选项卡下出现了新的 "Metadata" 值，或在 "**Home>Device management>Devices>Specific device>Data logs**" 选项卡下查看日志。

要收集 `/system/resource/print` 信息并发布它，我们可以使用脚本。将下面所示脚本的内容复制并粘贴到命令行中：

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

更改主题中的 `<app-version>` 和 `<token>` 值。然后使用以下命令运行脚本：

```ros
/system/script/run systeminfo
```

JSON 消息将如下所示：

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

要可视化先前发布的数据，请转到 "**Home>Solutions>Your\_Solution>Dashboards>Your\_Dashboard**"，然后点击 "**Add widget**"：

![](/img/b7fb7d39b26494dc.webp)

选择小组件类型（我们将使用 "**Device management**"），以及预置小组件（我们将使用 "**Endpoint metadata**"）。

"**Edit**" 该小组件，并在 "**Data source>Endpoint ID**" 下选择您的 "Endpoint ID"。从这里，您可以进一步自定义仪表板：

![](/img/cdb90037e971b282.webp)

因此，您可以创建自己的脚本，改为收集对您重要的信息，然后只需应用[调度器](../../system-information-and-utilities/scheduler.md)以您选择的间隔运行该脚本。也许您想从 [LTAP](https://mikrotik.com/product/ltap#fndtn-specifications) 收集 GPS 坐标，并使用 "map" 小组件将其可视化？这一切完全由您决定！
