---
title: "使用 MQTT 和 ThingsBoard 进行 GPS 跟踪"
description: "本页介绍如何在 MikroTik RouterOS 中使用 MQTT 和 ThingsBoard 配置 GPS 跟踪，详细说明支持 GPS 的设备向服务器发送位置数据的设置步骤。内容涵盖 broker 配置、设备凭据生成，以及 SSL 和非 SSL 配置下的 MQTT 发布命令。"
tags:
  - 'mqtt'
  - 'thingsboard'
  - 'gps'
source: https://manual.mikrotik.com/docs/7.25/mobile-networking/gps/gps-tracking-using-mqtt-and-thingsboard
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

许多 RouterOS 设备支持 [GPS](/docs/7.24/mobile-networking/gps/gps-tracking-using-mqtt-and-thingsboard)。它允许 RouterOS 确定其 GPS 接收器的精确位置。GPS 坐标将指示当前位置的纬度和经度值（以及其他参数）。

假设你有 [LTAP](https://mikrotik.com/product/ltap)（或任何其他支持 GPS 的 RouterOS 设备），并且希望跟踪其位置。你希望路由器将这些数据发送到服务器，数据将存储在那里并集成到地图中，因为这样更便于监控。本指南将介绍如何实现该场景。该场景将使用 MQTT 协议与名为 [ThingsBoard](https://thingsboard.io/) 的平台通信。

ThingsBoard 提供云解决方案以及不同的本地安装选项（适用于不同操作系统）。

自从我们添加了 [container](/docs/7.24/containers) 功能后，也可以在 RouterOS 中运行该平台。这意味着，你可以完全基于 RouterOS 设备构建该场景：支持 GPS 且希望跟踪的 RouterOS 设备（例如配备 [LTAP](https://mikrotik.com/product/ltap) 的车辆，即充当 **MQTT publishers** 的 RouterOS 设备），以及运行在更强大的 RouterOS 设备中的 ThingsBoard 服务器（例如 [CHR](/docs/7.24/getting-started/routeros-licensing/chr) 机器，即充当 **MQTT broker** 的 RouterOS 设备）。

如果要选择这种方案（container 方案），请仔细挑选计划用作“服务器”的设备，因为该实现可能占用大量 RAM（建议使用至少具有 **2 GB** **RAM** 的设备，或具有 **1 GB RAM** 且**负载极低**的设备，并且设备架构为 **ARM64** 或 **AMD64**）。

## 配置 {#configuration}

本指南将演示如何配置 GPS 接收器（MQTT 发布者）以及如何设置 ThingsBoard。

如果要使用容器功能运行 ThingsBoard 实例（MQTT broker），请参阅指南[此处](/docs/7.24/containers/user-guides/container-thingsboard-mqtt-http-server)。有关 ThingsBoard 和 MQTT 配置的一般指南，请参阅指南[此处](/docs/7.24/internet-of-things/mqtt/mqtt-and-thingsboard-configuration)。请务必阅读这两份指南，其中包含更多有用信息。

在继续之前，请确保 ThingsBoard 已启动并运行，并且可以访问其 WEB 管理门户。确认 MQTT 端口已打开和/或已正确端口转发。

### ThingsBoard 准备 {#thingsboard-preparation}

:::info
为简化说明，本示例将展示 [access-token](/docs/7.24/internet-of-things/mqtt/mqtt-and-thingsboard-configuration#access-token-scenario-1) 和 [one-way SSL communication via access-token](/docs/7.24/internet-of-things/mqtt/mqtt-and-thingsboard-configuration#one-way-ssl-communication-scenario) 场景，但也可以使用其他可用选项。
:::

导航到“**Devices**”菜单，通过“**Add new device**”按钮添加新设备 → 命名并创建它（例如 LTAP）：

![](/img/062635ec753a108d.webp)

点击刚添加的设备，进入“**Details**”部分，并在“**Manage credentials/Device Credentials**”设置下生成访问令牌：

![](/img/cb33058054456e88.webp)

### MQTT broker 配置 {#mqtt-broker-configuration}

如果是本地测试，或者可以通过 VPN 访问 broker，则可以使用非 SSL MQTT：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=1883 username=access_token
```

Where:

- `name` 是要为 broker 指定的名称，该名称将在脚本中后续使用。
- `address` 是 broker 的 IP 地址。
- `port` 是 broker 监听的 TCP 端口 → 对于非 SSL，通常为 TCP 1883。
- `username` 由 MQTT broker 决定，在本例中，它是在 ThingsBoard 管理门户中生成的“access token”。

如果是公开访问（即希望通过 broker 的公网 IP 地址访问它），**建议我们使用 SSL MQTT**：

```ros
/iot/mqtt/brokers/add name=tb address=x.x.x.x port=8883 username=access_token ssl=yes
```

Where:

- `name` 是要为 broker 指定的名称，该名称将在脚本中后续使用。
- `address` 是 broker 的 IP 地址。
- `port` 是 broker 监听的 TCP 端口 → 对于 SSL，通常为 TCP 8883。
- `username` 由 MQTT broker 决定，在本例中，它是在 ThingsBoard 管理门户中生成的“access token”。
- `ssl` 启用 SSL MQTT 通信。

### MQTT 发布 {#mqtt-publish}

可以使用以下命令，通过静态消息测试 MQTT publish：

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

简而言之，该脚本捕获 GPS 信息，具体为纬度、经度和海拔值。然后，它根据这些值构造一条 JSON 消息。如果脚本启动时纬度值不等于“none”（等于任何实际数值）→ 它会通过 MQTT 将 JSON 消息发送到名为“**tb**”的 broker。如果无法捕获 GPS 数据 → “latitude”被识别为“none” → 脚本仅记录未捕获到任何数据，不执行其他操作。

这是一个非常基础的示例。可根据需求修改脚本，并添加自己的“if”（例如在没有 GPS 信号时发送电子邮件通知）和其他参数（任何其他 RouterOS 捕获值，例如其固件版本）。

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

要使该过程自动化，请添加 [scheduler](/docs/7.24/system-information-and-utilities/scheduler)（例如每 30 秒运行一次脚本）：

```ros
/system/scheduler/add name=mqttgpsscheduler interval=30s on-event="/system/script/run mqttgps"
```

## 结果验证 {#result-verification}

转到已创建设备下的“Latest telemetry”部分，确认数据已发布：

![](/img/0a8a6c973a9c90b9.webp)

## 使用地图可视化数据 {#data-visualization-using-maps}

ThingsBoard 允许使用 [Widgets](https://thingsboard.io/docs/user-guide/ui/widget-library/) 创建视觉上吸引人的仪表板。在本例中，我们希望跟踪 LTAP GPS 坐标，因此需要使用地图组件。

选择纬度和经度值，然后点击“**Show on widget**”按钮：

![](/img/37aa7ead6b186573.webp)

找到“**Maps**”捆绑包，然后点击“**Add to dashboard**”：

![](/img/6baa63ad7eaf37e5.webp)

选择现有仪表板或创建新仪表板，并按需要命名：

![](/img/d095d56ffccb51fd.webp)

通过 scheduler 运行脚本，或手动运行脚本，然后检查结果：

![](/img/ccc0acdea12f403a.webp)

现在，可以将其安装在移动目标上并跟踪其位置：

![](/img/2225362d4a81fbe9.webp)
