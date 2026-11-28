---
title: "儿童控制"
description: "Kid Control 是 RouterOS 的一项功能，可通过配置文件和防火墙规则设置每日互联网访问计划、带宽限制和针对特定设备的限制，对 LAN 设备实施家长控制。"
tags:
  - 'kid-control'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/kid-control
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/ip/kid-control`

“Kid control”是一项家长控制功能，用于限制 LAN 设备的互联网连接。

## 属性说明 {#property-description}

在此菜单中，可以为每个孩子创建配置文件并限制互联网访问。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*) | Kid 配置文件的名称 |
| **mon,tue,wed,thu,fri,sat,sun** (*time*) | 一周中的每一天。允许访问互联网的时间段 |
| **disabled** (*yes \| no*) | 是否禁用该配置文件 |
| **rate-limit** (*string*) | 流的最大可用数据速率 |
| **tur-mon,tur-tue,tur-wed,tur-thu,tur-fri,tur-sat,tur-sun** (*time*) | 不限速时间。允许不限速访问互联网的时间段 |

时间不限速参数优先级高于 rate-limit 参数。

## 设备 {#devices}

**子菜单：** `/ip/kid-control/device`

此子菜单包含有关是否有多台设备连接到互联网的信息（手机、平板电脑、游戏机、电视等）。设备通过从 ARP 表中检索到的 MAC 地址进行识别。相应的 IP 地址也从该表中获取。

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*) | 设备名称 |
| **mac-address** (*string*) | 设备的 MAC 地址 |
| **user** (*string*) | 要将设备添加到的配置文件 |
| **reset-counters** (*[id, name]*) | 重置 bytes-up 和 bytes-down 计数器。 |

## 应用示例 {#application-example}

在以下示例中，将限制 Peter 的手机访问互联网：

- 在星期一、星期三和星期五禁用互联网访问
- 允许无限制访问互联网：
  - 星期二
  - 星期四 11:00-22:00
  - 星期日 15:00-21:00
- 在星期六 18:30-22:00 将 Peter 的手机带宽限制为 3Mbps

```ros
[admin@MikroTik] > /ip/kid-control/add name=Peter mon="" tur-tue="00:00-24h" wed="" tur-thu="11:00-22:00" fri="" sat="18:30-22:00" tur-sun="15h-21h" rate-limit=3M
[admin@MikroTik] > /ip/kid-control/device/add name=Mobile-phone user=Peter mac-address=FF:FF:FF:ED:83:63
```

互联网访问限制通过添加动态防火墙过滤规则或简单队列规则来实现。以下是防火墙过滤规则示例：

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

也可以**暂停**已创建儿童用户的互联网访问；这将限制所有访问，直到使用**恢复**为止，之后将按已配置的设置继续访问：

```ros
[admin@MikroTik] > /ip/kid-control/pause Peter 
[admin@MikroTik] > /ip/kid-control/print
Flags: X - disabled, P - paused, B - blocked, L - rate-limited 
 #   NAME                                                                                                                    SUN      MON      TUE      WED      THU      FRI      SAT     
 0 PB Peter                                                                                                                 15h-21h                             11h-22h          18:30h-22h  
```
