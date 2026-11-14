---
sidebar_key: "wireless/w60g/index"
sidebar_position: 6
title: "W60G"
sidebar_label: "W60G"
description: "本页说明 MikroTik RouterOS W60G 无线接口配置，涵盖 60GHz 点对点/点对多点链路的设置、ARP/MAC 设置、加密以及带详细统计监控的站点管理。"
tags:
  - 'w60g'
  - 'wireless'
  - 'arp'
source: https://manual.mikrotik.com/docs/7.25/wireless/w60g
captured_at: '2026-11-04T11:24:07+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 60 GHz 无线示例和指南。使用这些内容来配置 W60G 点对点与点对多点链路、故障转移以及与距离相关的设置。

<DocCardList />

### 概述 {#summary}

**软件包：** `system`,`wireless`

802.11ad 实现能够在无线网络上提供千兆以太网速度。

通过透明的 AES 加密无线 60GHz 链路扩展千兆网络，避免常见的有线或无线网络问题。

### 常规接口属性 {#general-interface-properties}

**子菜单：** `/interface/w60g`

:::warning
Wireless Wire kit 设备以预配置、已连接的成对形式提供。手动配置是可选的
:::

| 属性 | 描述 |
| :-- | :-- |
| **arp**（*disabled \| enabled \| proxy-arp \| reply-only*；默认值：**enabled**） | [`Read more >>`](../../getting-started/networking-fundamentals/index.md#arp-and-tying-it-all-together) |
| **arp-timeout** (*auto \| integer*; Default: **auto**) | ARP 超时是指在没有从 IP 收到数据包后，ARP 记录在 ARP 表中保留多长时间。值 **auto** 等于 `/ip/settings` 中 **arp-timeout** 的值，默认为 30s |
| **comment** (*string*; Default: ) | 接口的简短描述 |
| **disabled** (*yes \| no*; Default: **yes**) | 接口是否被禁用 |
| **frequency** (*58320 \| 60480 \| 62640 \| 64800 \| 66000 \| auto*; Default: **auto**) | 通信中使用的频率（仅在 bridge 设备上有效） |
| **isolate-stations** (*yes \| no*; Default: **yes**) | 不允许已连接的客户端之间通信（自 RouterOS 6.41 起） |
| **l2mtu** (*integer [0..7882]*; Default: **1600**) | 二层最大传输单元 |
| **mac-address** (*MAC*; Default: ) | 无线接口的 MAC 地址 |
| **mdmg-fix** (*yes \| no*; Default: **no**) | 仅适用于 wAP60Gx3 设备的实验性功能，在某些情况下可提供更好的点对多点稳定性 |
| **mode** (*ap-bridge \| bridge \| sniff \| station-bridge*; Default: **bridge**) | 运行模式 |
| **mtu** (*integer [32..8192]*; Default: **1500**) | 三层最大传输单元 |
| **name** (*string*; Default: **wlan60-1**) | 接口名称 |
| **password** (*string*; Default: **随机生成**) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于 AES 加密的密码 |
| **put-stations-in-bridge** (; Default: ) | 将新建的 station 设备接口放入此 bridge |
| **region** (*asia \| australia \| canada \| china \| eu \| japan \| no-region-set \| usa*; Default: **no-region-set**) | 用于限制频率使用的参数 |
| **scan-list** (*58320,60480,62640,64800,66000*; Default: **58320,60480,62640,64800**) | 扫描列表，用于限制 station 模式下的频率连接 |
| **ssid** (*string (0..32 chars)*; Default: **[身份](../../system-information-and-utilities/identity.md) 的值**) | SSID（服务集标识符）是标识无线网络的名称 |
| **tx-sector** (*integer [0..63] \| auto*; Default: **auto**) | 禁用波束成形并锁定到选定的辐射方向图 |

**子菜单：** `/interface/w60g/print/stats`

提供有关波束成形发生情况以及一些调试信息的更详细信息：

```ros
/interface w60g print stats name: wlan60-1 
beamforming-event: 310 
tx-io-msdu: 0 
tx-sw-msdu: 154 663
tx-fw-msdu: 102 
tx-ppdu: 220 147 
tx-ppdu-from-q: 40 327 
tx-mpdu-new: 154 663 
tx-mpdu-total: 184 759 
tx-mpdu-retry: 30 096 
rx-ppdu: 166 636 
rx-mpdu-crc-err: 4 817 
rx-mpdu-crc-ok: 285 649
```

Station 接口属性：

:::warning
ap-bridge 设备需要 License level 4  [(单击了解更多信息)](../../getting-started/routeros-licensing/x86/index.md#routeros-license-key-levels)  才能支持多个已连接客户端
:::

已连接的客户端会被视为独立接口；成功连接后，会创建一个新的 station 接口。

更新后默认配置仍然有效——新建的 station 接口会被移动到默认网桥。

**子菜单：** `/interface/w60g/station`

| 属性 | 描述 |
| :-- | :-- |
| **parent** (*string*; Default: **wlan60-\***) | 父接口名称 |
| **put-in-bridge** (*none \| parent \| bridge-name*; Default: **parent**) | 将 station 设备接口添加到指定网桥 |
| **remote-address** (*MAC*; Default: **与 bridge 接口 MAC 匹配**) | station 要连接的 bridge 接口的 MAC 地址 |

### 扫描 {#scan}

**子菜单：** `/interface/w60g/scan`

```ros
/interface w60g scan wlan60-1
```

Scan 命令会搜索并显示 W60G 接口所支持频率范围内的可用 AP。

使用 scan 命令时，接口运行会被禁用（扫描操作期间无线链路会断开）

目前无法进行后台扫描。

### 监控 {#monitor}

**子菜单：** `/interface/w60g/monitor`

```ros
/interface w60g monitor wlan60-1 
connected: yes frequency: 58320 
remote-address: 04:D6:AA:AA:AA:AA 
mcs: 8 
phy-rate: 2.3Gbps 
signal: 80 rssi: -68 
tx-sector: 28 
tx-sector-info: center 
distance: 160.9m
```

Monitor 显示活动连接的当前状态。距离测量工具可提供非常精确的距离测量。"tx-sector-info"（测试阶段功能）会提供当前所用波束成形方向图的信息，并显示指向中心的方向——理论上的最高功率输出点。

### 对齐 {#align}

**子菜单：** `/interface/w60g/align`

```ros
/interface w60g align wlan60-1 
connected: yes 
frequency: 58320 
remote-address: 04:D6:AA:AA:AA:AB 
tx-mcs: 6 
tx-phy-rate: 1540.0Mbps 
signal: 70 
rssi: -62 
10s-average-rssi: -63.1 
tx-sector: 62 
tx-sector-info: left 19 degrees, up 26.6 degrees 
rx-sector: 96 
distance: 220.88m 
tx-packet-error-rate: 5%
```

在 align 模式下，两个设备之间的帧交换更频繁，信号质量信息的显示也更频繁。使用 "rssi"、"10s-average-rssi" 和 "tx-sector-info" 值可更精确地对准链路。当设备进入 align 模式时——链路会中断几秒钟。

### 嗅探 {#sniff}

Sniff 模式允许捕获附近的 802.11ad 帧。要使用 sniff 模式，需要使用相同频率，并将接口运行模式设置为 sniff：

```ros
/interface w60g set wlan60-1 mode=sniff
```

现在可以在 [Tools/Packet Sniffer](../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) 中使用此接口进行数据包捕获。Sniffer 模式不能与常规接口工作模式一起使用。

### 点对多点设置示例 {#point-to-multi-point-setup-example}

所有 MikroTik 设备都可以互连。目前有四种不同版本的 wAP60G 设备可用：

- Wireless Wire kit
- wAP 60G
- SXTsq60 Lite60
- wAP 60G AP

以及

- Wireless Wire Dish

在硬件方面，wAP 设备是相同的，但存在一些软件限制：

**wAP 60G AP** 设计用于 PtMP（点对多点）设置中的接入点用途，但也可以用作 PtP（点对点）或作为 Station 设备。它已配备 level4 许可证，可支持多个已连接客户端。有关更多信息，请参阅 [RouterOS 许可证密钥级别](../../getting-started/routeros-licensing/x86/index.md#routeros-license-key-levels)。

**Wireless Wire kit**、**Wireless Wire Dish**、**SXTsq Lite60** 和 **wAP60G** 设备附带 level3 许可证。由于其辐射方向图较窄，Wireless Wire Dish 应仅用作客户端设备。

需要升级许可证才能解锁接入点模式下同时连接多个客户端，但设备可以作为常规 Station 设备连接到接入点。

:::warning
配置前，请确保设备运行最新的软件版本：[如何升级](../../getting-started/installation-and-upgrade/upgrade.md)
:::

透明无线链路的最小配置是：SSID 匹配、模式正确（bridge || station-bridge），以及将无线和以太网接口放入同一网桥。

在当前示例中，我们将介绍一个使用场景：**wAP60G AP** 用作接入点，**wAP60G** 和 **Wireless Wire kit** 设备用作 Station 设备，组成一个 4 单元网络。

:::warning
建议更改默认 IP 地址，以避免设备连接问题
:::

**wAP60G AP** 设备预配置为 WISP Bridge [默认配置](../../getting-started/configuration-management/default-configurations.md)。

无线和以太网接口之间的 SSID 和网桥已配置。建议设置无线密码并更改 SSID。如果设备已被重置，还可以设置正确的模式并启用接口。

完成上述所有步骤的一行命令：

```ros
/interface w60g set wlan60-1 password="put_your_safe_password_here" ssid="put_your_new_ssid_here" disabled=no mode=ap-bridge
```

**Wireless Wire 和 wAP60G** 设备预配置为 PTP Bridge 默认配置。

Wireless Wire 设备已具有随机生成的匹配 SSID 和无线密码。

Bridge 设备（Bridge 或支持一个已连接客户端的接入点设备）需要将无线模式更改为 station-bridge。

可用于将设备设置为客户端模式的一行命令：

```ros
/interface w60g set wlan60-1 password="put_your_safe_password_here" ssid="put_your_new_ssid_here" disabled=no mode=station-bridge
```

如果从空配置开始配置（重置且不保留默认配置）：

需要创建一个包含无线和以太网接口的新网桥，并添加一个便于访问的 IP 地址。

```ros
{ /interface bridge 
add name=bridge1 
/interface bridge port 
add bridge=bridge1 interface=ether1 
add bridge=bridge1 interface=wlan60-1 
/ip address add address=192.168.88.1/24 interface=bridge1 
}
```

对于接入点，添加以下行以确保所有已连接的 station 都将放入同一网桥。

```ros
/interface w60g set wlan60-1 put-stations-in-bridge=bridge1
```

成功连接后，每个客户端设备都会在接入点设备的以下位置出现一个新条目：

```ros
/interface w60g station print
```

```ros
Flags: X - disabled, R - running 

0 name="wlan60-station-1" parent=wlan60-1 remote-address=AA:AA:AA:AA:AA:AA mtu=1500 mac-address=AA:AA:AA:AA:AA:AB arp=enabled arp-timeout=auto put-in-bridge=parent 

1 name="wlan60-station-2" parent=wlan60-1 remote-address=AA:AA:AA:AA:AB:AA mtu=1500 mac-address=AA:AA:AA:AA:AA:AC arp=enabled arp-timeout=auto put-in-bridge=parent 

2 name="wlan60-station-3" parent=wlan60-1 remote-address=AA:AA:AA:AA:AC:AA mtu=1500 mac-address=AA:AA:AA:AA:AA:AD arp=enabled arp-timeout=auto put-in-bridge=parent 

3 name="wlan60-station-4" parent=wlan60-1 remote-address=AA:AA:AA:AA:AD:AA mtu=1500 mac-address=AA:AA:AA:AA:AA:AE arp=enabled arp-timeout=auto put-in-bridge=parent 
```

可以为每个客户端应用单独设置（队列、VLAN、防火墙规则等），从而提供更大的配置灵活性。

要限制同一网桥中的客户端之间的通信，可以在接入点设备上使用 isolate-stations 选项：

```ros
/interface w60g set wlan60-1 isolate-stations=yes
```

### 点对点 GUI 配置示例 {#point-to-point-gui-configuration-example}

[点对点 GUI 配置示例](./ptp-gui-example.md)

### 故障排除与建议 {#troubleshooting-and-recommendations}

MikroTik 60GHz 解决方案的功能包括支持 ATPC（自适应发射功率控制）

##### 物理特性 {#physical-properties}

802.11ad 标准所用无线频率的大气衰减非常高。部署链路前应考虑到这一点。

Wireless Wire kit 已在最远 200 米的距离下进行测试。

Wireless Wire dish 套件已在最远 2500 米的距离下测试。为获得稳定性和全速可用性，建议该套件用于最远 1500 米的距离。

wAP60G 设备配备 60° 相控阵波束成形天线，可在短距离内帮助信号绕过障碍物，但在更远距离下保持视距仍然至关重要。

LHG60G 设备的单个辐射方向图小于 1 度（水平和垂直方向均是）。所有方向图组合后在水平和垂直平面上可提供接近 3 度的覆盖。每种情况下的最佳方向图通过波束成形算法计算。波束宽度和方向取决于所使用的预定义校准扇区。

##### 设备射频特性 {#device-rf-characteristics}

60 GHz 设备

| **设备** | **单天线方向图宽度及完整跨度（度）** | **EIRP** | **发射功率** | **中心扇区\*** |
| :-- | :-- | :-- | :-- | :-- |
| wAP 60G | 单方向图 15-20 度，水平面总跨度 60 度，垂直面总跨度 30 度 | < 40 dBm |  | 27,28,35,36 |
| wAP 60G AP | 单方向图 15-20 度，水平面总跨度 60 度，垂直面总跨度 30 度 | < 40 dBm |  | 27,28,35,36 |
| Wireless Wire | 单方向图 15-20 度，水平面总跨度 60 度，垂直面总跨度 30 度 | < 40 dBm |  | 27,28,35,36 |
| wAP 60Gx3 AP | 单方向图 15-20 度，水平面总跨度 180 度，垂直面总跨度 30 度 | < 40 dBm |  | 27,28,35,36 |
| SXTsq Lite 60 | 单方向图 15-20 度，水平面总跨度 60 度，垂直面总跨度 30 度 | < 40 dBm |  | 27,28,35,36 |
| Cube Lite 60 | 单方向图 4-8 度，水平面总跨度 12 度，垂直面总跨度 12 度 | < 40 dBm | < 10 dBm | 27,28,35,36 |
| Cube 60G ac | 单方向图 4-8 度，水平面总跨度 12 度，垂直面总跨度 12 度 | < 40 dBm | < 10 dBm | 27,28,35,36 |
| Cube 60Pro ac | 单方向图 4-8 度，水平面总跨度 11 度，垂直面总跨度 11 度 | < 40 dBm | < 10 dBm | 27,28,35,36 |
| CubeSA 60Pro ac | 单方向图 15 度，水平面总跨度 60 度，垂直面总跨度 30 度 | < 40 dBm | < 10 dBm | 27,28,35,36 |
| LHG Lite 60 | 单方向图 < 1 度，水平面总跨度 3 度，垂直面总跨度 3 度 | < 55 dBm | < 10 dBm | 27,28,35,36 |
| LHG 60G | 单方向图 {`< 1`} 度，水平面总跨度 3 度，垂直面总跨度 3 度 | {`< 55`} dBm | {`< 10`} dBm | 27,28,35,36 |
| Wireless Wire Dish | 单方向图 {`< 1`} 度，水平面总跨度 3 度，垂直面总跨度 3 度 | {`< 55`} dBm | {`< 10`} dBm | 27,28,35,36 |
| Wireless Wire nRAY | 单方向图 {`< 1`} 度，水平面总跨度 3 度，垂直面总跨度 3 度 | {`< 55`} dBm 或在使用 EU 区域时为 {`<40`} dBm | {`< 10`} dBm | 31 |

**\*中心扇区是波束成形阵列的校准中心**

##### 区域 {#regions}

MikroTik 802.11ad 设备支持频率范围：57240 MHz - 67080 MHz；如果使用 "region" 参数，则可以限制频率和信道的使用。

| **区域** | **下限频率** | **上限频率** | **可用信道** |
| :-- | :-- | :-- | :-- |
| 美国 | 57.24 GHz | 70.20 GHz | 1, 2, 3, 4, 5, 6 |
| 加拿大 | 57.24 GHz | 63.72 GHz | 1, 2, 3 |
| 亚洲 | 57.24 GHz | 63.72 GHz | 1, 2, 3 |
| 欧盟 | 57.24 GHz | 65.88 GHz | 1, 2, 3, 4 |
| 日本 | 57.24 GHz | 65.88 GHz | 1, 2, 3, 4 |
| 澳大利亚 | 57.24 GHz | 65.88 GHz | 1, 2, 3, 4 |
| 中国 | 59.40 GHz | 63.72 GHz | 2, 3 |

##### 连接问题 {#connection-issues}

为了使设备连接，它们必须处于直接可见（视距）范围内，客户端设备上的 "scan-list" 需要包含 AP 设备所使用的 "frequency"。LHG60 设备需要非常精确的对准，以便在更远距离下获得最佳性能。

##### 用于监控的 SNMP OID {#snmp-oids-for-monitoring}

从 RouterOS>=6.42rc6 开始，增加了对 W60G 接口监控的 SNMP 支持。
对于主接口：

```
1.3.6.1.4.1.14988.1.1.1.8.1.2.1  integer  Mode
1.3.6.1.4.1.14988.1.1.1.8.1.3.1  string   SSID
1.3.6.1.4.1.14988.1.1.1.8.1.4.1  integer  Connected status
1.3.6.1.4.1.14988.1.1.1.8.1.5.1  string   Remote MAC
1.3.6.1.4.1.14988.1.1.1.8.1.6.1  integer  Frequency
1.3.6.1.4.1.14988.1.1.1.8.1.7.1  integer  MCS
1.3.6.1.4.1.14988.1.1.1.8.1.8.1  integer  Signal quality
1.3.6.1.4.1.14988.1.1.1.8.1.9.1  integer  tx-sector
1.3.6.1.4.1.14988.1.1.1.8.1.11.1 string   Sector info
1.3.6.1.4.1.14988.1.1.1.8.1.12.1 integer  RSSI
1.3.6.1.4.1.14988.1.1.1.8.1.13.1 gauge32  PHY rate
```

Station 接口将在另一个表下编号：

```
1.3.6.1.4.1.14988.1.1.1.9.1.2.(interfaceID) = integer Connected status
1.3.6.1.4.1.14988.1.1.1.9.1.3.(interfaceID) = Hex-STRING mac-address
1.3.6.1.4.1.14988.1.1.1.9.1.4.(interfaceID) = INTEGER: MCS 
1.3.6.1.4.1.14988.1.1.1.9.1.5.(interfaceID) = INTEGER: Signal Quality Index
1.3.6.1.4.1.14988.1.1.1.9.1.6.(interfaceID) = INTEGER: tx-sector
1.3.6.1.4.1.14988.1.1.1.9.1.8.(interfaceID) = Gauge32: data-rate [Mbps]
1.3.6.1.4.1.14988.1.1.1.9.1.9.(interfaceID) = INTEGER: RSSI
1.3.6.1.4.1.14988.1.1.1.9.1.10.(interfaceID) = INTEGER: distance [cm]
```

InterfaceID 从 3 开始，每连接一个 station 就增加 +1。有关 SNMP 功能和 MIB 文件的更多信息，请参阅 [SNMP 手册](../../diagnostics-monitoring-and-troubleshooting/snmp.md)

##### Wireless Wire 套件的配置重置 {#configuration-reset-for-wireless-wire-kits}

Reset 按钮的功能与其他设备相同，详见 [此处](../../getting-started/configuration-management/routeros-configuration-reset.md)

**启动时按住按钮 5 秒（USR LED 灯开始闪烁）** - 重置为受密码保护的状态。

**启动时按住按钮 10 秒（USR LED 闪烁后变为常亮）** - 完全移除配置。

:::warning
完全移除配置后，只能建立 [mac-telnet](../../management-tools/mac-server.md) 连接
:::
