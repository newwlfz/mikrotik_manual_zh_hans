---
sidebar_key: "mobile-networking/gps/gps-tracking-using-mqtt-and-thingsboard"
sidebar_position: 2
title: "使用 MQTT 和 ThingsBoard 进行 GPS 跟踪"
sidebar_label: "使用 MQTT 和 ThingsBoard 进行 GPS 跟踪"
description: "本页面介绍如何在 MikroTik RouterOS 上使用 MQTT 和 ThingsBoard 配置 GPS 跟踪，详细说明了支持 GPS 的设备向服务器发送位置数据的设置步骤。内容涵盖代理配置、设备凭据生成，以及 SSL 和非 SSL 两种环境下的 MQTT 发布命令。"
tags:
  - 'mqtt'
  - 'thingsboard'
  - 'gps'
source: https://manual.mikrotik.com/docs/7.25/mobile-networking/gps/gps-tracking-using-mqtt-and-thingsboard
captured_at: '2026-11-04T11:22:30+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

许多 RouterOS 设备支持 [GPS](./index.md)。它允许 RouterOS 确定其 GPS 接收器的精确位置。GPS 坐标将指示当前位置的纬度值和经度值（以及其他参数）。

假设你有一台 [LTAP](https://mikrotik.com/product/ltap)（或任何其他支持 GPS 的 RouterOS 设备），并且希望跟踪它的位置。你希望路由器将这些数据发送到服务器，数据将在那里存储并集成到地图中，因为这样更方便监控。在本指南中，我们将展示如何做到这一点。本场景将使用 MQTT 协议与一个名为 [ThingsBoard](https://thingsboard.io/) 的平台通信。

ThingsBoard 提供云解决方案以及不同的本地安装选项（可在不同操作系统上安装）。

由于我们添加了 [container](../../containers/index.md) 功能，现在也可以在 RouterOS 内运行该平台。这意味着，你可以完全在 RouterOS 设备上构建此场景 → 即你希望跟踪的、支持 GPS 的设备（例如，配备 [LTAP](https://mikrotik.com/product/ltap) 的汽车 → 充当 **MQTT 发布者** 的 RouterOS 设备），以及运行在更强大的 RouterOS 设备内的 ThingsBoard 服务器（例如，[CHR](../../getting-started/routeros-licensing/chr/index.md) 机器 → 充当 **MQTT 代理** 的 RouterOS 设备）。

如果你选择这条路线（container 路线），请务必仔细选择你计划用作“服务器”的设备，因为此实现可能会占用大量 RAM（建议使用至少具有 **2 GB** **RAM** 的设备，或具有 **1 GB RAM** **且负载极低** 的设备，并且架构为 **ARM64** 或 **AMD64**）。

## 配置 {#configuration}

在本指南中，我们将演示如何配置 GPS 接收器（MQTT 发布者）以及如何设置 ThingsBoard。

如果你想使用 container 功能来运行 ThingsBoard 实例（MQTT 代理），请查看[此处](../../containers/user-guides/container-thingsboard-mqtt-http-server.md)的指南。有关 ThingsBoard 和 MQTT 配置的通用指南可在[此处](../../internet-of-things/mqtt/mqtt-and-thingsboard-configuration.md)找到。请务必查看这两份指南，因为它们包含额外的有用信息。

继续之前，请确保 ThingsBoard 已启动并运行，并且你可以访问其 WEB 管理门户。确认 MQTT 端口已开放和/或已正确进行端口转发。

### ThingsBoard 准备工作 {#thingsboard-preparation}

:::info
为简单起见，本示例将展示 [access-token](../../internet-of-things/mqtt/mqtt-and-thingsboard-configuration.md#access-token-scenario-1) 和[通过 access-token 的单向 SSL 通信](../../internet-of-things/mqtt/mqtt-and-thingsboard-configuration.md#one-way-ssl-communication-scenario)场景，但你也可以使用其他可用选项。
:::

转到“**设备**”菜单，并通过“**添加新设备**”按钮添加新设备 → 为其命名并创建（例如 LTAP）：

![](/img/062635ec753a108d.webp)

单击你刚刚添加的设备，转到“**详细信息**”部分，并在“**管理凭据/设备凭据**”设置下生成访问令牌：

![](/img/cb33058054456e88.webp)

### MQTT 代理配置 {#mqtt-broker-configuration}

如果是本地测试，或代理可通过 VPN 访问，你可以使用非 SSL MQTT：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=1883 username=access_token
```

其中：

- `name` 是你希望给代理指定的名称，该名称稍后将在脚本中使用。
- `address` 是代理的 IP 地址。
- `port` 是代理监听的 TCP 端口 → 对于非 SSL，通常是 TCP 1883。
- `username` 由 MQTT 代理决定，在我们的情况下，它是在 ThingsBoard 管理门户中生成的“访问令牌”。

如果是公共访问（当你希望通过代理的公网 IP 地址访问它时），**我们建议使用 SSL MQTT**：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=8883 username=access_token ssl=yes
```

其中：

- `name` 是你希望给代理指定的名称，该名称稍后将在脚本中使用。
- `address` 是代理的 IP 地址。
- `port` 是代理监听的 TCP 端口 → 对于 SSL，通常是 TCP 8883。
- `username` 由 MQTT 代理决定，在我们的情况下，它是在 ThingsBoard 管理门户中生成的“访问令牌”。
- `ssl` 启用 SSL MQTT 通信。

### MQTT 发布 {#mqtt-publish}

你可以使用以下命令通过静态消息测试 MQTT 发布：

```ros
/iot/mqtt/publish broker="tb" topic="v1/devices/me/telemetry" message="{\"test\":\"123\"}"
```

要发布 GPS 坐标，请导入下面显示的脚本：

```ros
/system/script/add dont-require-permissions=no name=mqttgps owner=admin policy="ftp,re\
    boot,read,write,policy,test,password,sniff,sensitive,romon" \
    source="    ###Configuration###\r\
    \n    #Enter pre-configured broker's name within \"\":\r\
    \n    :local broker \"tb\"\r\
    \n    #Enter the topic name within \"\", per the broker's config\
    uration:\r\
    \n    :local topic \"v1/devices/me/telemetry\"\r\
    \n\r\
    \n    ###Variables####\r\
    \n    :global lat\r\
    \n    :global lon\r\
    \n    :global alt1\r\
    \n    :global alt2\r\
    \n\r\
    \n    ###GPS####\r\
    \n    :put (\"[*] Capturing GPS coordinates...\")\r\
    \n    /system/gps/monitor once do={\r\
    \n    :set \$lat \$(\"latitude\");\r\
    \n    :set \$lon \$(\"longitude\");\r\
    \n    :set \$alt1 \$(\"altitude\")}\r\
    \n    ###remove \"meters\" from the value because JSON format wi\
    ll not understand it###\r\
    \n    :set \$alt2 [:pick \$alt1 0 [find \$alt1 \" m\"]]\r\
    \n\r\
    \n    :local message \\\r\
    \n    \"{\\\"latitude\\\":\$lat,\\\r\
    \n    \\\"longitude\\\":\$lon,\\\r\
    \n    \\\"altitude\\\":\$alt2}\"\r\
    \n\r\
    \n    ###MQTT###\r\
    \n    :if (\$lat != \"none\") do={\\\r\
    \n    :put (\"[*] Sending message to MQTT broker...\");\r\
    \n    /iot/mqtt/publish broker=\$broker topic=\$topic message=\$\
    message} else={:put (\"[*] Latitude=none, not posting anything!\
    \");:log info \"Latitude=none, not posting anything!\"}"
```

简而言之，该脚本会捕获 GPS 信息，具体来说是纬度、经度和海拔值。然后它会用这些值构造一条 JSON 消息。如果脚本启动时 latitude 值不等于 "none"（即等于任何实际数值）→ 它会通过 MQTT 将 JSON 消息发送到名为“**tb**”的代理。如果无法捕获 GPS 数据 → "latitude" 会被识别为 "none" → 脚本只会记录无法捕获任何内容，不会执行其他操作。

这是一个非常基础的示例。你可以根据自己的需求修改脚本，添加自己的 "if"（例如在没有 GPS 信号时发送电子邮件通知）以及其他参数（任何其他 RouterOS 捕获的值，比如其固件版本）。

使用以下命令运行脚本：

```ros
/system/script/run mqttgps 
[*] Capturing GPS coordinates...
        date-and-time: 2023-02-01 10:39:37
             latitude: 56.969862
            longitude: 24.162425
             altitude: 31.799999 m
                speed: 1.000080 km/h
  destination-bearing: none
         true-bearing: 153.089996 deg. True
     magnetic-bearing: 0.000000 deg. Mag
                valid: yes
           satellites: 6
          fix-quality: 1
  horizontal-dilution: 1.42
             data-age: 0s
[*] Sending message to MQTT broker...
```

要自动化该过程，请添加一个 [scheduler](../../system-information-and-utilities/scheduler.md)（例如每 30 秒运行一次脚本）：

```ros
/system/scheduler/add name=mqttgpsscheduler interval=30s on-event="/system/script/run mqttgps"
```

## 结果验证 {#result-verification}

转到你所创建设备下的“最新遥测”部分，并确认数据已发布：

![](/img/0a8a6c973a9c90b9.webp)

## 使用地图进行数据可视化 {#data-visualization-using-maps}

ThingsBoard 允许你使用 [Widgets](https://thingsboard.io/docs/user-guide/ui/widget-library/) 创建美观的仪表板。在我们的场景中，我们希望跟踪 LTAP 的 GPS 坐标，因此需要一个地图小组件。

选择 latitude 和 longitude 值，然后单击“**在小组件上显示**”按钮：

![](/img/37aa7ead6b186573.webp)

找到“**Maps**”包，然后单击“**添加到仪表板**”：

![](/img/6baa63ad7eaf37e5.webp)

选择一个现有仪表板，或创建一个新仪表板并随意命名：

![](/img/d095d56ffccb51fd.webp)

通过 scheduler 或手动运行脚本，并检查结果：

![](/img/ccc0acdea12f403a.webp)

现在，我们可以将其安装在一个移动目标上并跟踪其位置：

![](/img/2225362d4a81fbe9.webp)
