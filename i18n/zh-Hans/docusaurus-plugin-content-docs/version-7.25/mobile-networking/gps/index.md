---
sidebar_key: "mobile-networking/gps/index"
sidebar_position: 4
title: "GPS"
sidebar_label: "GPS"
description: "本页介绍 MikroTik RouterOS 中的 GPS 配置与监控，涵盖信道选择、坐标格式、GPS 初始化字符串等属性，以及带有 date-and-time、latitude/longitude、altitude、satellites 和 data age 等参数的监控命令。"
tags:
  - 'gps'
source: https://manual.mikrotik.com/docs/7.25/mobile-networking/gps
captured_at: '2026-11-04T11:20:06+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 GPS 跟踪示例。你可以使用这些示例将 RouterOS GPS 数据发送到 HTTP 端点、MQTT 代理和 IoT 平台。

<DocCardList />

### 概述 {#summary}

**软件包要求：** `gps`
**子菜单：** `/system/gps`
**标准：** `GPS, NMEA 0183, Simple Text Output Protocol`

全球定位系统（GPS）用于确定 GPS 接收器的精确位置。

### 配置属性 {#configuration-properties}

| 属性 | 说明 |
| :-- | :-- |
| **channel** (*integer [0..4294967295]*; 默认：**0**) | 设备使用的端口通道 |
| **coordinate-format** (*dd \| dms \| ddmm*; 默认：**dms**) | 要使用的坐标格式：“十进制度”、“度分秒”或“NMEA 格式 DDDMM.MM[MM]” |
| **enabled** (*yes \| no*; 默认：**no**) | 是否启用 GPS |
| **gps-antenna-select** (*external \| internal*; 默认：**internal**) | 取决于型号。如果设备安装了内置天线，则可以选择内置天线。 |
| **init-channel** (*integer [0..4294967295]*; 默认：) | 执行 init-string 的通道 |
| **init-string** (*string*; 默认：) | 用于 GPS 初始化的 AT 初始化字符串 |
| **port** (*string*; 默认：) | GPS 接收器所连接的 USB/串口名称 |
| **set-system-time** (*yes \| no*; 默认：**no**) | 是否将路由器的日期和时间设置为从 GPS 接收到的日期和时间。 |

### 监控状态 {#monitoring-status}

**命令：** `/system/gps/monitor`

此命令用于监控从 GPS 接收器接收到的数据。

**参数：**

:::warning
从 7.1rc3 固件版本开始，新增了一个名为 "data-age" 的参数（以秒为单位）。此参数显示自设备收到最后一条 NMEA 消息以来经过的时间。
:::

| 属性 | 说明 |
| :-- | :-- |
| **date-and-time** (*date*) | 从 GPS 接收到的日期和时间 |
| **latitude** (*none \| string*) | DM（度分十进制）格式的纬度 |
| **longitude** (*none \| string*) | DM（度分十进制）格式的经度 |
| **altitude** (*none \| string*) | 基于 GPS 数据的高度 |
| **speed** (*none \| string*) | GPS 单元当前的移动速度 |
| **destination-bearing** (*none \| string*) | 从当前位置指向已配置目标航点的方位角 |
| **true-bearing** (*none \| string*) | 相对于真北的当前航向 |
| **magnetic-bearing** (*none \| string*) | 相对于磁北的当前航向 |
| **valid** (*yes \| no*) |  |
| **satellites** (*integer*) | 设备可见的卫星数量。 |
| **fix-quality** (*integer*) | 信号质量 |
| **horizontal-dilution** (*decimal*) | 水平精度因子（HDOP）； |
| **data-age** (integer) | 自设备收到最后一条 NMEA 消息以来经过的时间 |

### 基础示例 {#basic-examples}

检查端口使用情况，因为同一时间只能有一个实例使用串口：

```ros
[admin@MikroTik] /port/print
Flags: I - inactive 
 #   DEVICE NAME                     CHANNELS USED-BY                   BAUD-RATE
 0          serial0                         1 Serial Console            auto    
```

如果只有一个端口并且它被控制台使用，请从控制台菜单中释放它：

```ros
[admin@MikroTik] > /system/console/print 
Flags: X - disabled, U - used, F - free
 #   PORT                                                                       TERM                                                                     
 0 U serial0                                                                    vt102 

[admin@MikroTik] > /system/console/disable 0   
```

根据你的设备调整端口设置（LtAP mini 保留 "auto"）：

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

我们还撰写了一篇深入文章，介绍如何使用脚本和 Web 服务器进行实时 GPS 跟踪：[GPS-tracking](./gps-tracking-using-http-post.md)。

### 故障排除 {#troubleshooting}

请注意，有时为了让 GPS 模块在 RouterOS 中被识别，你需要更改 `/port` 菜单中的波特率设置。

[LtAP mini](https://mikrotik.com/product/ltap_mini) 内置低增益 GPS 天线；为了获得更好的体验，我们建议使用额外的[外置天线](https://mikrotik.com/product/acgpsa)。

在 GPS 菜单下切换内置天线和外置天线：

```ros
[admin@MikroTik] > /system/gps/set gps-antenna-select=external
```

在某些支持 GPS 的调制解调器上，你需要发送多个初始化命令以实现持续的 GPS 监控；例如，对于华为卡，你需要发送 "AT^WPDST=1,AT^WPDGP" 初始化字符串才能获得持续监控。
