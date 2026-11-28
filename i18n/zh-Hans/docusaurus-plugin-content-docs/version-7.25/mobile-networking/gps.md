---
title: "GPS"
description: "本页介绍 MikroTik RouterOS 中的 GPS 配置和监控，涵盖通道选择、坐标格式、GPS 初始化字符串等属性，以及带 date-and-time、latitude/longitude、altitude、satellites 和 data age 等参数的监控命令。"
tags:
  - 'gps'
source: https://manual.mikrotik.com/docs/7.25/mobile-networking/gps
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "memory"
---

本节介绍 GPS 跟踪示例。可使用它将 RouterOS GPS 数据发送到 HTTP 端点、MQTT broker 和 IoT 平台。

<DocCardList />

### 概述 {#summary}

**软件包要求：** `gps`
**子菜单：** `/system/gps`
**标准：** `GPS, NMEA 0183, Simple Text Output Protocol`

全球定位系统（GPS）用于确定 GPS 接收器的精确位置。

### 配置属性 {#configuration-properties}

| Property | Description |
| :-- | :-- |
| **channel** (*integer [0..4294967295]*; Default: **0**) | 设备使用的端口通道 |
| **coordinate-format** (*dd \| dms \| ddmm*; Default: **dms**) | 使用的坐标格式：“Decimal Degrees”、“Degrees Minutes Seconds”或“NMEA format DDDMM.MM[MM]” |
| **enabled** (*yes \| no*; Default: **no**) | 是否启用 GPS |
| **gps-antenna-select** (*external \| internal*; Default: **internal**) | 取决于型号。如果设备安装了内置天线，则可以选择内置天线。 |
| **init-channel** (*integer [0..4294967295]*; Default: ) | 用于执行 init-string 的通道 |
| **init-string** (*string*; Default: ) | 用于 GPS 初始化的 AT init string |
| **port** (*string*; Default: ) | GPS 接收器所连接的 USB/Serial 端口名称 |
| **set-system-time** (*yes \| no*; Default: **no**) | 是否将路由器的日期和时间设置为从 GPS 接收到的日期和时间。 |

### 监控状态 {#monitoring-status}

**命令：** `/system/gps/monitor`

该命令用于监控从 GPS 接收器收到的数据。

**Parameters:**

:::warning
从 7.1rc3 固件版本开始，新增了一个名为“data-age”的参数（以秒为单位）。该参数显示设备收到最后一条 NMEA 消息后经过的时间。
:::

| 属性 | 说明 |
| :-- | :-- |
| **date-and-time** (*date*) | 从 GPS 收到的日期和时间 |
| **latitude** (*none \| string*) | DM（Degrees Minutes decimal）格式的纬度 |
| **longitude** (*none \| string*) | DM（Degrees Minutes decimal）格式的经度 |
| **altitude** (*none \| string*) | 基于 GPS 数据的海拔高度 |
| **speed** (*none \| string*) | GPS 设备的当前移动速度 |
| **destination-bearing** (*none \| string*) | 从当前位置指向已配置目标航点的方位角 |
| **true-bearing** (*none \| string*) | 相对于真北的当前航向 |
| **magnetic-bearing** (*none \| string*) | 相对于磁北的当前航向 |
| **valid** (*yes \| no*) |  |
| **satellites** (*integer*) | 设备可见的卫星数量。 |
| **fix-quality** (*integer*) | 信号质量 |
| **horizontal-dilution** (*decimal*) | 水平精度因子（HDOP）； |
| **data-age** (integer) | 设备收到最后一条 NMEA 消息后经过的时间 |

### 基本示例 {#basic-examples}

检查端口使用情况，因为同一时间只有一个实例可以使用串口：

```ros
[admin@MikroTik] /port/print
Flags: I - inactive 
 #   DEVICE NAME                     CHANNELS USED-BY                   BAUD-RATE
 0          serial0                         1 Serial Console            auto    
```

如果只有一个端口且该端口被控制台占用，请从控制台菜单中释放它：

```ros
[admin@MikroTik] > /system/console/print 
Flags: X - disabled, U - used, F - free
 #   PORT                                                                       TERM                                                                     
 0 U serial0                                                                    vt102 

[admin@MikroTik] > /system/console/disable 0   
```

针对设备调整端口设置（LtAP mini 保留“auto”）：

```ros
[admin@MikroTik] /port> set 0 baud-rate=4800 parity=odd
[admin@MikroTik] /port> print detail 
Flags: I - inactive 
 0   name="usb1" used-by="" channels=1 baud-rate=4800 data-bits=8 parity=odd stop-bits=1 flow-control=none
```

启用 GPS：

```ros
[admin@MikroTik] /system/gps> set enabled=yes port=usb1
[admin@MikroTik] /system/gps> print 
          enabled: yes
             port: usb1
          channel: 0
     init-channel: 0
      init-string:
  set-system-time: no
```

监控状态：

```ros
[admin@MikroTik] /system/gps> monitor  
        date-and-time: 2021-09-07 08:26:26
             latitude: 56.969689
            longitude: 24.162471
              altitude: 25.799999 m
                speed: 0.759320 km/h
  destination-bearing: none
         true-bearing: 185.500000 deg. True
     magnetic-bearing: 0.000000 deg. Mag
                valid: yes
           satellites: 6
          fix-quality: 1
  horizontal-dilution: 1.3
```

## **LtAP** 的端口和 GPS 设置 {#port-and-gps-settings-for-ltap}

```ros
/port/set serial1 baud-rate=115200
```

```ros
/system/gps/set port=serial1 channel=0 enabled=yes
```

我们还创建了一篇关于使用脚本和 Web 服务器进行实时 GPS 跟踪的详细文章：[GPS-tracking](/docs/7.24/mobile-networking/gps/gps-tracking-using-http-post)。

### 故障排除 {#troubleshooting}

请注意，有时要使 GPS 模块在 RouterOS 中被识别，需要在 `/port` 菜单中更改 baud-rate 设置。

[LtAP mini](https://mikrotik.com/product/ltap_mini) 内置低增益 GPS 天线，为获得更好的体验，建议使用额外的[外置天线](https://mikrotik.com/product/acgpsa)。

在 GPS 菜单中切换内置和外置天线：

```ros
[admin@MikroTik] > /system/gps/set gps-antenna-select=external
```

在某些支持 GPS 的调制解调器上，需要发送多个 init 命令以进行连续 GPS 监控。例如，对于 Huawei 卡，需要发送“AT^WPDST=1,AT^WPDGP”init 字符串以获得连续监控。
