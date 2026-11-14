---
sidebar_key: "firewall-and-quality-of-service/kid-control"
sidebar_position: 5
title: "儿童上网管控"
sidebar_label: "儿童上网管控"
description: "Kid Control 是 RouterOS 的一项功能，它通过配置文件和防火墙规则为 LAN 设备设置每日互联网访问时间表、带宽限制以及针对特定设备的限制，从而实现对 LAN 设备的家长控制。"
tags:
  - 'kid-control'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/kid-control
captured_at: '2026-11-04T11:28:13+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/ip/kid-control`

"Kid control" 是一项家长控制功能，用于限制 LAN 设备的互联网连接。

## 属性说明 {#property-description}

在此菜单中，可以为每个孩子创建配置文件，并限制其互联网访问。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*) | 孩子的配置文件名称 |
| **mon,tue,wed,thu,fri,sat,sun** (*time*) | 一周中的每一天。允许互联网访问的时间段 |
| **disabled** (*yes \| no*) | 配置文件是否被禁用 |
| **rate-limit** (*string*) | 流的最大可用数据速率 |
| **tur-mon,tur-tue,tur-wed,tur-thu,tur-fri,tur-sat,tur-sun** (*time*) | 不限速时间。互联网访问不受限制的时间段 |

不限速参数比 rate-limit 参数具有更高的优先级。

## 设备 {#devices}

**子菜单：** `/ip/kid-control/device`

此子菜单包含有关已连接到互联网的多个设备（手机、平板电脑、游戏主机、电视等）的信息。设备通过从 ARP 表中获取的 MAC 地址来识别。相应的 IP 地址也从那里获取。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*) | 设备的名称 |
| **mac-address** (*string*) | 设备的 MAC 地址 |
| **user** (*string*) | 要将设备加入的配置文件 |
| **reset-counters** (*[id, name]*) | 重置 bytes-up 和 bytes-down 计数器。 |

## 应用示例 {#application-example}

在以下示例中，我们将限制 Peter 的手机的访问：

- 在周一、周三和周五禁用互联网访问
- 在以下时间允许不限量的互联网访问：
  - 周二
  - 周四 11:00-22:00
  - 周日 15:00-21:00
- 在周六 18:30-22:00 将 Peter 的手机的带宽限制为 3Mbps

```ros
[admin@MikroTik] > /ip/kid-control/add name=Peter mon="" tur-tue="00:00-24h" wed="" tur-thu="11:00-22:00" fri="" sat="18:30-22:00" tur-sun="15h-21h" rate-limit=3M
[admin@MikroTik] > /ip/kid-control/device/add name=Mobile-phone user=Peter mac-address=FF:FF:FF:ED:83:63
```

互联网访问限制是通过添加动态防火墙过滤规则或简单队列规则实现的。以下是防火墙过滤规则的示例：

```ros
[admin@MikroTik] > /ip/firewall/filter/print

1  D ;;; Mobile-phone, kid-control
      chain=forward action=reject src-address=192.168.88.254 

2  D ;;; Mobile-phone, kid-control
      chain=forward action=reject dst-address=192.168.88.254
```

动态创建的简单队列：

```ros
[admin@MikroTik] > /queue/simple/print
Flags: X - disabled, I - invalid, D - dynamic 

 1  D ;;; Mobile-phone, kid-control
      name="queue1" target=192.168.88.254/32 parent=none packet-marks="" priority=8/8 queue=default-small/default-small limit-at=3M/3M max-limit=3M/3M burst-limit=0/0 
      burst-threshold=0/0 burst-time=0s/0s bucket-size=0.1/0.1  
```

可以监控特定设备使用了多少数据：

```ros
[admin@MikroTik] > /ip/kid-control/device/print stats

Flags: X - disabled, D - dynamic, B - blocked, L - limited, I - inactive 
 #    NAME                                                                                                                 IDLE-TIME    RATE-DOWN   RATE-UP   BYTES-DOWN     BYTES-UP
 1 BI Mobile-phone                                                                                                               30s         0bps      0bps    3438.1KiB       8.9KiB
```

也可以为已创建的孩子**暂停**互联网访问；这将限制所有访问，直到使用 **恢复**，之后将继续按配置的设置运行：

```ros
[admin@MikroTik] > /ip/kid-control/pause Peter 
[admin@MikroTik] > /ip/kid-control/print
Flags: X - disabled, P - paused, B - blocked, L - rate-limited 
 #   NAME                                                                                                                    SUN      MON      TUE      WED      THU      FRI      SAT     
 0 PB Peter                                                                                                                 15h-21h                             11h-22h          18:30h-22h  
```
