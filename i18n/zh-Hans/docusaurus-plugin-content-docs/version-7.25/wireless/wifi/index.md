---
sidebar_key: "wireless/wifi/index"
sidebar_position: 6
title: "Wi-Fi 6 / 7（802.11ax/be）"
sidebar_label: "Wi-Fi 6 / 7"
description: "本页介绍 RouterOS 中的 WiFi 配置菜单，涵盖受密码保护和 OWE 过渡模式接入点的基本设置。其中说明了配置配置文件、安全设置，并包含重置配置的示例。"
tags:
  - 'wifi'
  - 'configuration-profiles'
  - 'access-lists'
source: https://manual.mikrotik.com/docs/7.25/wireless/wifi
captured_at: '2026-11-04T11:25:13+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 MikroTik **Wi-Fi 6 / 6E / 7 (802.11ax/be)** 设备，这些设备均通过共享的 **`/interface/wifi`** 菜单进行配置。设备需要哪个驱动程序包取决于其无线芯片组和标准。同一菜单也涵盖运行 **`wifi-qcom-ac`** 包的 **Wi-Fi 5 (802.11ac)** 设备。

:::tip[这一节是否适用于我的设备？]
凡运行下列任一驱动包的设备，都使用本菜单（以及本手册）：

| 包 | 设备 | 示例 |
| :-- | :-- | :-- |
| `wifi-qcom` | Wi-Fi 6 / 6E (Qualcomm) | wAP ax, cAP ax, hAP ax³ |
| `wifi-qcom-be` | Wi-Fi 7 (Qualcomm) | hAP be3 media |
| `wifi-mediatek` | Wi-Fi 6 / 7 (MediaTek) | hAP ax S, hAP be lite |
| `wifi-qcom-ac` | Wi-Fi 5 / 802.11ac (Qualcomm) | 参见 [Wi-Fi 5 (802.11ac)](../wifi-ac/index.md) |

标准通常已体现在型号名称中——Wi-Fi 6 为 **ax**，Wi-Fi 7 为 **be**。对于 `wifi-qcom-ac` 设备，请参见 [Wi-Fi 5 (802.11ac)](../wifi-ac/index.md)，以确认你的设备应使用本菜单还是旧版 `/interface/wireless` 菜单。

如果你的设备改用旧版 `/interface/wireless` 菜单，请参见 [802.11 a/b/g/n](../abgn/index.md)。
:::

:::note
在 7.13 之前的 RouterOS 版本中，此菜单是一个名为 `wifiwave2` 的独立包的一部分。
:::

## 快速开始 {#getting-started}

刚接触这类设备？请先从面向任务的指南开始，然后使用本页后面的属性参考了解各项设置：

- [配置独立接入点](./configuring-standalone-access-point.md)
- [配置中继器](./configuring-repeater.md)
- [配置室外 CPE 到 AP 链路](./configuring-outdoor-cpe-to-ap-links.md)
- [WiFi6 的 Interworking（802.11u / Hotspot 2.0）](./interworking-for-wifi6.md)
- [使用 WiFi CAPsMAN 进行集中管理](./capsman.md)

## WiFi 术语 {#wifi-terminology}

在继续之前，先来熟悉一些对理解该菜单运作方式很重要的术语。这些术语将在整篇文章中使用。

- **配置文件（Profile）**——指在以下某个 WiFi 子菜单下创建的配置预设：**aaa**、**channel**、**security**、**datapath** 或 **interworking**。
- **配置配置文件（Configuration profile）**——在 `/interface/wifi/configuration` 下定义的配置预设，它可以引用各种配置文件。
- **站点（Station）**——无线客户端。

## 基本配置 {#basic-configuration}

完整配置兼容设备的最简单方式是通过 `/interface/wifi/network` 菜单，它把 SSID、安全、数据路径和射频设置捆绑到单个配置实体中。或者，也可以按下文示例所示按接口应用设置。

### 网络 {#network}

Network 会应用于匹配其 `labels` 的 WiFi 接口。如果未指定 `labels`，则该 network 的配置会应用到所有接口。

关于 network 配置用法的示例，请参见以下内容：

```ros
# 创建包含 SSID、安全和 datapath 设置的网络预设，该预设会应用到所有可用接口
/interface/wifi/network
add ssid=MikroTik mode=ap security.authentication-types=wpa2-psk,wpa3-psk security.passphrase="strong_password" datapath.bridge=bridge1 disabled=no

# 创建网络 radio 预设，该预设会应用到整个 radio。
/interface/wifi/network/radio
add configuration.country=Latvia
```

启用多链路操作（MLO）的示例：

```ros
/interface/wifi/network
add datapath.bridge=bridge1 disabled=no mlo=yes mode=ap security.authentication-types=wpa3-psk ssid="MikroTik" security.passphrase="strong_password"
```

| 属性 | 说明 |
| :-- | :-- |
| **mlo** (*no* \| *yes; default: **yes***) | 为 Wi-Fi 7 启用多链路操作。 |
| **labels** (*comma-separated strings*) | 在与所提供任一标签匹配的 radio 上启用该 network 配置。 |
| **ssid** (*string*) | 无线网络名称（ESSID）。 |
| **mode** (*ap* \| *station* \| *station-bridge* \| *station-pseudobridge*; default: **ap***) | 接口运行模式。 |
| **disabled** (*no* \| *yes; default: **no***) | 该 network 是否被禁用。 |

所有安全、认证和加密参数（passphrase、WPA3/SAE、EAP 等）共用[安全属性](#security-properties)中描述的相同属性。Datapath 参数（bridge、VLAN、客户端隔离、流量处理）遵循 [Datapath 属性](#datapath-properties)。

#### Network radio 属性 {#network-radio-properties}

`/interface/wifi/network/radio` 下按 radio 划分的设置：

| 属性 | 说明 |
| :-- | :-- |
| **labels** (*object*) | 将 radio 配置与具有给定标签的物理 radio 匹配。 |
| **extra-labels** (*multi string*) | 用于匹配的额外标签，用于扩展主 `labels` 字段。 |
| **disabled** (*no* \| *yes; default: **no***) | 该 radio 条目是否被禁用。 |

Radio 参数（country、band、frequency、width、chains、power 等）使用[信道属性](#channel-properties)和[配置属性](#configuration-properties)中描述的相同属性。

### 基本的受密码保护的 AP {#basic-password-protected-ap}

按接口直接设置适用于所有设备，并且在 `/interface/wifi/network` 菜单不可用或需要按接口覆盖时仍完全受支持。

```ros
/interface/wifi
set wifi1 disabled=no configuration.country=Latvia configuration.ssid=MikroTik security.authentication-types=wpa2-psk,wpa3-psk security.passphrase=8-63_characters
```

### 带 OWE 过渡模式的开放 AP {#open-ap-with-owe-transition-mode}

机会性无线加密（OWE）允许创建无需知道密码即可连接、但仍具备流量加密和管理帧保护优点的无线网络。它是对常规开放接入点的改进。

然而，由于一个网络不能同时既加密又不加密，因此需要 2 个独立的接口配置，才能既为不支持 OWE 的旧设备提供连接，又为支持 OWE 的设备提供 OWE 的优势。

这种配置称为 OWE 过渡模式。

```ros
/interface/wifi
add master-interface=wifi1 name=wifi1_owe configuration.ssid=MikroTik_OWE security.authentication-types=owe security.owe-transition-interface=wifi1 configuration.hide-ssid=yes
set wifi1 configuration.country=Latvia configuration.ssid=MikroTik security.authentication-types="" security.owe-transition-interface=wifi1_owe
enable wifi1,wifi1_owe
```

使用这样的设置，AP 将广播两个 SSID → 可见的 `MikroTik` SSID，它应提供"未加密"接入（面向不支持 OWE 的旧设备），以及隐藏的 SSID `MikroTik_OWE`，它应使用"OWE"安全（无密码保护，但已加密）。客户端设备不会（在客户端的 WiFi 列表中）看到隐藏的 `MikroTik_OWE` SSID，但可见 `MikroTik` SSID 的信标包会在信标包中使用"OWE Transition mode"参数，改为通告指向隐藏 `MikroTik_OWE` 网络的链接。因此，客户端设备应会优先通过 `owe-transition-interface` 设置连接到"OWE"网络。

支持 OWE 的客户端设备会优先选择 OWE 接口。如果你在注册表中看不到任何关联到常规开放 AP 的设备，那么可以考虑从过渡模式设置改为单一的 OWE 加密接口：

```ros
/interface/wifi
set wifi1 configuration.country=Latvia configuration.ssid=MikroTik_OWE security.authentication-types=owe
```

:::info
802.11r（快速漫游）无法在 OWE 网络上工作。
:::

### 重置配置 {#resetting-configuration}

WiFi 接口配置可以通过 'reset' 命令重置。

```ros
/interface/wifi/reset wifi1
```

物理接口的 MAC 地址可以通过 'reset-mac-address' 命令重置为默认值。

```ros
/interface/wifi/reset-mac-address wifi1
```

## 配置配置文件 {#configuration-profiles}

WiFi 的新增功能之一是配置配置文件。你可以创建各种预设，并按需分配给接口。WiFi 的配置设置按照本页末尾的参数分节分组到**配置文件**中——**aaa**、**channel**、**configuration**、**datapath**、**interworking** 和 **security**，然后可以分配给接口。**配置配置文件**可以包含其他配置文件，也可以包含来自其他类别的单独参数。

这种可选的灵活性旨在让每位用户都能按最适合自己的方式组织配置，但这也意味着同一个参数在配置的不同部分可能被赋予不同的值。

以下优先级决定了最终使用哪个值：

1. 接口设置中的值。
2. 分配给接口的配置文件中的值。
3. 分配给接口的配置配置文件中的值。
4. 分配给配置配置文件的配置文件（该配置配置文件又分配给接口）中的值。

如果在任何时候不确定接口会使用哪个参数值，可以执行 "/interface/wifi/print detail"。print 命令会显示接口将具有的所有值，包括继承来的值。

若只想查看直接在接口上配置的值，而不显示继承来的值，请使用 "/interface/wifi/print config"。

关于配置配置文件用法的示例，请参见以下内容（双频家用 AP 示例）：

```ros
# 创建安全配置文件，两个接口将共用该配置
/interface/wifi/security
add name=common-auth authentication-types=wpa2-psk,wpa3-psk passphrase="diceware makes good passwords" wps=disable
# 创建通用配置模板，并将安全配置文件关联到它
/interface/wifi/configuration
add name=common-conf ssid=MikroTik country=Latvia security=common-auth
# 为每个频段分别创建信道配置
/interface/wifi/channel
add name=ch-2ghz frequency=2412,2432,2472 width=20mhz
add name=ch-5ghz frequency=5180,5260,5500 width=20/40/80mhz
# 为每个接口分配通用模板以及特定频段的信道模板；如果接口上出现 "no supported channels" 消息，请确保为每个接口应用了正确的（信道）配置。
set wifi1 channel=ch-5ghz configuration=common-conf disabled=no
set wifi2 channel=ch-2ghz configuration=common-conf disabled=no

#"print detail" 将显示接口将使用的所有值，包括继承的值
[admin@c52i] > /interface/wifi/print detail 
Flags: M - master; D - dynamic; B - bound; X - disabled, I - inactive, R - running 
 0 M B  default-name="wifi1" name="wifi1" l2mtu=1560 mac-address=18:FD:74:AF:F4:28 arp-timeout=auto radio-mac=18:FD:74:AF:F4:28 configuration=common-conf 
        configuration.mode=ap .ssid="MikroTik" .country=Latvia 
        security.authentication-types=wpa2-psk,wpa3-psk .passphrase="diceware makes good passwords" .wps=disable 
        channel=ch-5ghz 
        channel.frequency=5180,5260,5500 .width=20/40/80mhz 

 1 M B  default-name="wifi2" name="wifi2" l2mtu=1560 mac-address=18:FD:74:AF:F4:29 arp-timeout=auto radio-mac=18:FD:74:AF:F4:29 configuration=common-conf 
        configuration.mode=ap .ssid="MikroTik" .country=Latvia 
        security.authentication-types=wpa2-psk,wpa3-psk .passphrase="diceware makes good passwords" .wps=disable 
        channel=ch-2ghz 
        channel.frequency=2412,2432,2472 .width=20mhz 
#使用 "print detail config" 只显示直接在接口上配置的值
[admin@c52i] > /interface/wifi/print detail config  
Flags: M - master; D - dynamic; B - bound; X - disabled, I - inactive, R - running 
 0 M B  default-name="wifi1" name="wifi1" l2mtu=1560 mac-address=18:FD:74:AF:F4:28 arp-timeout=auto radio-mac=18:FD:74:AF:F4:28 configuration=common-conf 
        configuration.mode=ap 
        channel=ch-5ghz 

 1 M B  default-name="wifi2" name="wifi2" l2mtu=1560 mac-address=18:FD:74:AF:F4:29 arp-timeout=auto radio-mac=18:FD:74:AF:F4:29 configuration=common-conf 
        configuration.mode=ap 
        channel=ch-2ghz 
```

:::info
`print detail` 和 `print detail config` 也可以用于 `/interface/wifi/configuration`，其工作方式与在 `/interface/wifi/` 菜单中相同。
:::

## 访问列表 {#access-list}

访问列表提供了多种过滤和管理无线连接的方式。

RouterOS 会检查每个新连接，看其参数是否匹配任一访问列表规则中指定的参数。

规则按其在列表中出现的顺序进行检查。每个连接只应用第一条匹配规则中指定的管理动作。

被访问列表规则接受的连接会被定期检查，以确认它们是否仍处于允许的 **time、days** 和 **signal-range** 范围内。如果不满足，连接将被终止。

:::warning
编写拒绝客户端的访问列表规则时要小心。客户端设备在被 AP 反复拒绝后，可能会开始避开它。对于 wifi-qcom-ac 接口的客户端，如果不先为接口配置 pvid 值，访问列表就无法为其设置 VLAN ID。
:::

访问列表有两类参数——[过滤](#access-list-1)参数和[动作](#access-list-1)参数。过滤属性仅用于匹配应应用该访问列表规则的客户端。动作参数可以更改该特定客户端的连接参数，并可能用访问列表规则中指定的值覆盖其默认连接参数。

### MAC 地址认证 {#mac-address-authentication}

MAC 地址认证通过 **query-radius** 动作实现，是一种使用 RADIUS 服务器实现客户端 MAC 地址集中白名单的方式。

当客户端设备尝试关联到配置为执行 MAC 地址认证的 AP 时，AP 会向 RADIUS 服务器发送一条 access-request 消息，以设备的 MAC 地址作为用户名并提供空密码。如果 RADIUS 服务器对此类请求回复 access-accept，AP 就会继续执行接口所配置的常规认证流程（passphrase 或 EAP 认证）。

### 访问规则示例 {#access-rule-examples}

仅在工作时间接受附近设备连接到访客网络：

```ros
/interface/wifi/access-list/print detail
Flags: X - disabled 
 0   signal-range=-60..0 allow-signal-out-of-range=5m ssid-regexp="MikroTik Guest" time=7h-19h days=mon,tue,wed,thu,fri action=accept

 1   ssid-regexp="MikroTik Guest" action=reject 
```

拒绝来自本地管理（"匿名"/"随机化"）MAC 地址的连接：

```ros
/interface/wifi/access-list/print detail
Flags: X - disabled
 0   mac-address=02:00:00:00:00:00 mac-address-mask=02:00:00:00:00:00 action=reject
```

为特定客户端分配不同的 passphrase 可能很有用，例如你需要为某个客户端提供无线接入，但不想共享无线密码，或不想创建单独的 SSID。当匹配的客户端连接到此网络时，访问列表会让该客户端使用不同的密码，而不是接口配置中定义的密码。只需确保该特定客户端不会被更通用的访问列表规则先行匹配即可。

或者拒绝所有未知 MAC 地址——可以作为最终规则添加到访问列表末尾。——如果你只想允许特定客户端接入网络，请务必也在 access-list 末尾添加一条 reject 规则，因为默认情况下并不存在隐式拒绝规则。

```ros
/interface/wifi/access-list
add action=accept disabled=no mac-address=22:F9:70:E5:D2:8E interface=wifi1 passphrase=StrongPassword
```

## 频率扫描 {#frequency-scan}

`/interface/wifi/frequency-scan wifi1` 命令提供可用信道上射频状况的信息，这些信息可通过运行 frequency-scan 命令获得。它用于估算频谱使用情况，有助于找到不那么拥挤的频率。

![](/img/b57fb1af479c697c.png)

:::info
运行频率扫描会断开所有已连接的客户端；如果接口处于 station 模式，则会断开与 AP 的连接。
:::

## scan 命令 {#scan-command}

`/interface/wifi/scan` 命令会扫描接入点，并打印其检测到的所有 AP 的信息。它不会显示每个信道的频率使用情况，但会显示所有正在发送信号的接入点。你可以使用 "connect" 按钮发起与特定 AP 的连接。

scan 命令接受与 frequency-scan 命令相同的所有参数。
![](/img/296804ab8faca3df.png)

## 嗅探器 {#sniffer}

sniffer 命令会在无线接口上启用监视模式。这会把接口变成所有 WiFi 传输的被动接收器。  
该命令会持续打印收到的数据包信息，并可将它们本地保存为 pcap 文件，或使用 TZSP 协议进行流式传输。

sniffer 会在所选接口配置的任一信道上工作。

![](/img/0ecc1c29a0286bab.png)

## 频谱扫描 {#spectral-scan}

频谱扫描可以扫描你的 wifi 接口所支持的频率，并直接在控制台中绘制出来。

:::info
频谱扫描仅受 wifi-qcom 驱动支持；wifi-qcom-ac 驱动不支持。
:::

```ros
/interface/wifi/spectral-scan <wifiinterface name> range=
```

![](/img/cb53652d1a12ce6b.png)

该命令会持续监视频谱数据。此命令使用与 `spectral-history` 相同的数据源，并共用许多参数。

要使用频谱扫描，必须使用 `range=` 属性。

每一行显示一个频谱图分桶——频率、幅度（dBm）、峰值，以及一个字符图形条。图形条用 ':' 字符表示功率值，用 '.' 字符表示平均峰值保持。

`data` - min/max/avg，默认使用平均值作为数据。大多数场景下应使用平均值，但在某些情况下 "min" 可用于检查是否存在持续输出恒定信号的频率。Max 表示在扫描间隔内检测到的最强信号，与峰值类似。  
`duration` - 在指定时间后终止命令。默认值为无限期；  
`freeze-frame-interval` - 更新命令输出的时间间隔  
`interval` - 更新主要数据值（而非峰值）的间隔  
`peak-mode` - avg/max/disabled - 峰值反映 peak-hold-duration 期间的最强信号。默认使用 "avg"。它是 "peak-hold-duration" 期间最大值的平均值。如果使用 "max"，则会显示最高值，直到下一次 "peak-hold-duration" 更新。  
`peak-hold-duration` - 更改 peak-mode 使用的峰值保持时长，默认 5 秒。  
`range` - 扫描指定范围，必填；  
`resolution` - 频谱扫描的频率步进  
`show-interference` - yes/no

可分类的干扰类型：

- 微波炉（`MWO`）。
- 连续波（`CW`）。
- WLAN（宽带）（`WIFI`）。
- 无绳电话 2.4（`CORDLESS24`）。
- 无绳电话 5（`CORDLESS5`）。
- 蓝牙（`BLUETOOTH`）。
- 跳频扩频（`FHSS`）。

## 频谱历史 {#spectral-history}

```ros
/interface/wifi/spectral-history <wifi interface name> range=
```

![](/img/407c01ab7a981996.png)

绘制频谱图。落在不同区间的功率值会以不同颜色、但前景色与背景色相同的字符打印，因此可以复制并粘贴该命令的终端输出。

`data` - min/max/avg，默认使用平均值作为数据。大多数场景下应使用平均值，但在某些情况下 "min" 可用于检查是否存在持续输出恒定信号的频率。Max 将显示检测到的最强信号，而非平均信号。  
`interv` - 更新数据值的间隔；  
`interval` - 打印频谱图行的间隔；  
`duration` - 在指定时间后终止命令。默认值为无限期；  
`range` - 扫描指定范围，必填；  
`resolution` - 频率步进；  
`show-interference` - yes/no

可分类的干扰类型：

- 微波炉（`O`）。
- 连续波（`C`）。
- WLAN（宽带）（`W`）。
- 无绳电话 2.4（`T`）。
- 无绳电话 5（`T`）。
- 蓝牙（`BB`）。
- 跳频扩频（`F`）。

## WPS {#wps}

### WPS 客户端 {#wps-client}

wps-client 命令可用于从启用了 WPS 的 AP 获取认证信息。

```ros
/interface/wifi/wps-client/wifi1
```

### WPS 服务器 {#wps-server}

运行以下命令，可使 AP 在 2 分钟内接受客户端设备的 WPS 认证。

```ros
/interface/wifi/wps-push-button wifi1
```

## 射频 {#radios}

运行 `/interface/wifi/radio/print detail` 命令可以获取每个 radio 的能力信息。它有助于查看接口支持哪些频段以及可以选用哪些信道。应用于接口的国家配置文件会影响结果。

```ros
/interface/wifi/radio/print detail 
Flags: L - local 
 0 L radio-mac=48:A9:8A:0B:F7:4A phy-id=0 tx-chains=0,1 rx-chains=0,1 
     bands=5ghz-a:20mhz,5ghz-n:20mhz,20/40mhz,5ghz-ac:20mhz,20/40mhz,20/40/80mhz,5ghz-ax:20mhz,
      20/40mhz,20/40/80mhz 
     ciphers=tkip,ccmp,gcmp,ccmp-256,gcmp-256,cmac,gmac,cmac-256,gmac-256 countries=all 
     5g-channels=5180,5200,5220,5240,5260,5280,5300,5320,5500,5520,5540,5560,5580,5600,5620,5640,5660,
            5680,5700,5720,5745,5765,5785,5805,5825 
     max-vlans=128 max-interfaces=16 max-station-interfaces=3 max-peers=120 hw-type="QCA6018" 
     hw-caps=sniffer interface=wifi1 current-country=Latvia 
     current-channels=5180/a,5180/n,5180/n/Ce,5180/ac,5180/ac/Ce,5180/ac/Ceee,5180/ax,5180/ax/Ce,
                 5180/ax/Ceee,5200/a,5200/n,5200/n/eC,5200/ac,5200/ac/eC,5200/ac/eCee,5200/ax...
                 ...5680/n/eC,5680/ac,5680/ac/eC,5680/ax,5680/ax/eC,5700/a,5700/n,5700/ac,5700/ax 
     current-gopclasses=115,116,128,117,118,119,120,121,122,123 current-max-reg-power=30 
```

Radio 信息能告诉我们所支持的信道宽度，但也可以从产品页面推断出这一信息。为此，你需要查看以下参数：**链数量**、**最大数据速率**。了解这些参数后，你需要查看调制与编码方案（MCS）表，例如这里：[https://mcsindex.com/](https://mcsindex.com/)。

以 hAP ax <sup>2</sup> 为例，可以看到链数量为 2，最大数据速率在 MCS 表中为 1200 - 1201。在 MCS 表中我们需要找到 2 条空间流（链）的条目及相应的数据速率，本例中这表明 80MHz 是支持的最大信道宽度。

## 注册表 {#registration-table}

`/interface/wifi/registration-table/` 显示已连接的无线客户端列表及其详细信息。

![](/img/0a33a5fa049e4b23.png)

### 去认证 {#de-authentication}

可以通过将无线对端从注册表中移除，手动对其去认证（强制重新关联）。

```ros
/interface/wifi/registration-table/remove [find where mac-address=02:01:02:03:04:05]
```

## WiFi CAPsMAN {#wifi-capsman}

新 WiFi 菜单的 CAPsMAN（受控接入点系统管理器，Controlled Access Point system Manager）让你可以从中央控制器把无线设置应用到众多 MikroTik WiFi AP。参见专门页面：[WiFi CAPsMAN](./capsman.md)。

## 高级示例 {#advanced-examples}

[使用 User Manager v5 的企业级无线安全](../user-guides/enterprise-wireless-security-user.md)

## 替换 'wireless' 包 {#replacing-wireless-package}

一些 MikroTik Wi-Fi 5 AP 出厂时其接口由 'wireless' 菜单管理，它们可以用 'wifi-qcom-ac' 包替换 'wireless' 包，从而让接口改由 'wifi' 菜单管理。

为此，需要先卸载 'wireless' 包，然后安装 'wifi-qcom-**ac**'。

:::info
请注意，"wifi-qcom-ac" 驱动对资源的要求高得多。使用新包时可用 RAM 会更少，这一点需要留意。
:::

### 兼容性 {#compatibility}

wifi-qcom-**ac** 包为 IPQ4018/4019 和 QCA9984 radio 提供了替代驱动，使其与 WiFi 配置菜单兼容。关于可能的 wifi-qcom-ac/wifi-qcom/wireless 包组合，请参见[此处](../index.md)的包类型部分。

一般来说，该包与采用 ARM CPU 的 802.11ac 产品兼容。它**不**兼容我们任何采用 MIPS CPU 的 802.11ac 产品。

| 兼容性 | 设备 |
| :-- | :-- |
| 兼容 | Audience, Audience LTE kit, Chateau（D53 的所有变体）, hAP ac<sup>2</sup>, hAP ac<sup>3</sup>, cAP ac, cAP XL ac, LDF 5 ac, LHG XL 5 ac, LHG XL 52 ac, NetMetal ac<sup>2</sup>, mANTBox 52 15s, wAP ac (RBwAPG-5HacD2HnD), SXTsq 5 ac |
| 不兼容 | RB4011iGS+5HacQ2HnD-IN（不支持 2.4GHz 接口）, Cube 60Pro ac（不支持 60GHz 接口）, wAP ac (RBwAPG-5HacT2HnD) 以及**所有其他采用 MIPSBE CPU 的设备** |

### 优势 {#benefits}

- WPA3 认证和 OWE（机会性无线加密）。
- 802.11w 标准管理帧保护。
- 802.11r/k/v。
- MU-MIMO 和波束成形。
- IPQ4019 接口在 2.4GHz 频段的最大数据速率为 400Mb/s。

:::info
这些优势同时适用于 wifi-qcom 和 wifi-qcom-ac 包。
:::

### 失去的功能 {#lost-features}

在 802.11ac 产品上运行兼容 'wifi' 管理接口的驱动时，会失去以下显著功能：

- Nstreme 和 Nv2 无线协议。
- 无线设置中的 VLAN 配置（按接口的 VLAN 可在 bridge 设置中配置）。
- 与 'wireless' 包中所实现的 station-bridging 的兼容性。Station-bridge 只能在同一类型的驱动之间工作。WiFi 到 WiFi，以及 [无线](../index.md) 到 Wireless。

## 属性参考 {#property-reference}

### AAA 属性 {#aaa-properties}

此类别中的属性用于配置接入点与 AAA（RADIUS）服务器的交互。

下表中的某些参数以 *format-string* 作为其值。在 *format-string* 中，某些字符按以下方式解释：

| 字符 | 解释 |
| :-- | :-- |
| a | 构成客户端设备 MAC 地址的十六进制字符，小写 |
| A | 构成客户端设备 MAC 地址的十六进制字符，大写 |
| i | 构成 AP 接口 MAC 地址的十六进制字符，小写 |
| I（大写 'i'） | 构成 AP 接口 MAC 地址的十六进制字符，大写 |
| N | AP 接口的完整名称（例如 'wifi1'） |
| S | 完整的 SSID |

所有其他字符均按原样使用，不做任何解释。示例请参见默认值。

| 属性 | 描述 |
| :-- | :-- |
| **called-format** (*format-string*; *Default: **II-II-II-II-II-II:S**)* | AP 发往 RADIUS 服务器的报文中，Called-Station-Id RADIUS 属性值的格式。 |
| **calling-format** (*format-string*; *Default: **AA:AA:AA:AA:AA:AA**)* | AP 发往 RADIUS 服务器的报文中，Calling-Station-Id RADIUS 属性值的格式。 |
| **interim-update** (*time interval; Default: ****5m****)* | 向 RADIUS 服务器发送流量计费临时更新的间隔。 |
| **mac-caching** (*time interval;* *Default: **disabled**)* | 启用 MAC 地址认证时，缓存 RADIUS 服务器回复的时长。这可以解决因 RADIUS 服务器回复延迟相对较高而导致客户端设备认证超时的问题。 |
| **name** (*string*; *Default: **no**)* | AAA 配置文件的唯一名称。 |
| **nas-identifier** (*string*) | AP 发往 RADIUS 服务器的消息中 NAS-Identifier 属性的值。默认为设备的主机名（/system/identity）。 |
| **password-format** (*format-string*) | 执行 MAC 地址认证时，用于计算 AP 发往 RADIUS 服务器的消息中 User-Password 属性值的格式。 <br/> 默认值：""（空字符串）。 |
| **username-format** (*format-string*; *Default: **AA:AA:AA:AA:AA:AA**)* | 执行 MAC 地址认证时，AP 发往 RADIUS 服务器报文中 User-Name 属性值的格式。 |

### 信道属性 {#channel-properties}

此类别中的属性指定所需的无线信道。

| 属性 | 描述 |
| :-- | :-- |
| **band** (*2ghz-g* \| *2ghz-n* \| *2ghz-ax*\| *2ghz-be* \| *5ghz-a* \| *5ghz-ac* \| *5ghz-an* \| *5ghz-ax* \| *5ghz-be*\| *6ghz-ax* \| *6ghz-be*) | AP 将使用的频段和无线标准。默认为支持的最新标准。<strong>请注意，频段支持受无线射频能力限制。</strong><br/> |
| **deprioritize-unii-3-4** (*no* \| *yes*) | 是否将控制频率为 5720 或 5825-5885 MHz 的信道分配较低优先级。某些客户端设备不支持这些信道，因此不希望自动选择它们。在 ETSI 监管域中默认为“yes”，其他地区默认为“no”。 <br/> |
| **frequency** (*list of numbers or number ranges*) | 对于处于 AP 模式的接口，指定在选择控制信道中心频率时要考虑的频率（单位 MHz）。 <br/> 对于处于 station 模式的接口，指定用于扫描 AP 的频率。 <br/> 保持未设置（默认）以考虑无线射频支持且适用监管配置文件允许的所有频率。 <br/> 该参数可包含 1 个或多个以逗号分隔的十进制数值，或可选地包含使用语法 RangeBeginning-RangeEnd:RangeStep 表示的数字范围 <br/> 有效的 channel.frequency 值示例： <br/><ul><li>2412</li><li>2412,2432,2472</li><li>5180-5240:20,5500-5580:20</li></ul> |
| **preamble-puncturing** (*no \| yes; Default: **no***) |  在此接口上为 DFS/雷达启用打孔（puncturing）支持（仅 802.11be）。设置后，当检测到雷达信号时，接入点可以只禁用（"打孔"）宽 80/160 MHz 信道中受影响的 20 MHz 部分，而不是切换整个信道。对于 80 MHz 信道，可以打孔单个 20 MHz 子信道。对于 160 MHz 信道，可以打孔一个 20 MHz 子信道或一个 40 MHz 块。  当前打孔状态可在该接口的 `/interface/wifi/monitor` 输出中查看，其中被打孔的子信道用字母 `o` 标记。  |
| **reselect-interval** (*time interval; Default: **disabled***) | 指定接口应运行"重新扫描信道可用性"并选择最合适信道的间隔。指定该间隔将允许系统动态且随机地选择此间隔。这有助于避免多个 AP 同时扫描网络、选择同一信道并同时偏好使用它的情况。reselect-interval 使用后台扫描。重新选择过程会综合考虑信道中的网络数量、信道使用情况以及与相邻信道中网络的重叠，从而选择最合适的信道。它可用于已定义了频率列表的情况，也可在未设置 `frequency` 时使用所有受支持的频率。示例：01:00..01:30 → 会将信道重新扫描设置为每 1 小时 + 最多 30 分钟随机时间运行一次。第一次可能在"1 小时 15 分钟"后运行，之后可能是"1 小时 1 秒"，再之后可能是"1 小时 29 分 59 秒"……随机地，重新扫描会在每 1 小时到 1 小时 30 分钟之间发生。 |
| **reselect-time** (*time interval; Default: **disabled***) | 指定接口应运行"重新扫描信道可用性"并选择最合适信道的时钟时间。指定该时钟时间将允许系统动态且随机地选择此时间。这有助于避免多个 AP 同时扫描网络、选择同一信道并同时偏好使用它的情况。reselect-time 使用后台扫描。重新选择过程会综合考虑信道中的网络数量、信道使用情况以及与相邻信道中网络的重叠，从而选择最合适的信道。它可用于已定义了频率列表的情况，也可在未设置 `frequency` 时使用所有受支持的频率。示例：01:00..01:30 → 会将信道重新扫描设置为每晚一次，在系统时钟时间 01:00 AM 到 01:30 AM 之间随机运行。14:00..14:30 → 会将信道重新扫描设置为每天（午后）一次，在系统时钟时间 14:00:00 到 14:30:00（即下午 2 点到 2 点半）之间随机运行。 |
| **secondary-frequency** (*list of integers* \| *Default: **disabled***) | 对于 80+80MHz 分离信道，指定辅助 80MHz 段允许的中心频率。对于 320MHz 信道，指定允许的 320MHz 信道中心。未设置（默认）时不限制信道选择。例如 'width=20/40/80+80mhz frequency=5180' 允许将信道 42 与任何其他受支持的 80MHz 信道组合。'width=20/40/80+80mhz frequency=5180 secondary-frequency=5530' 仅允许组合信道 42 和 106。'width=20/40/80/160/320mhz frequency=6115' 允许使用信道 31 或 63。'width=20/40/80/160/320mhz frequency=6115 secondary-frequency=6265' 仅允许使用信道 63。有效的 [5GHz](https://en.wikipedia.org/wiki/List_of_WLAN_channels#5_GHz_(802.11a/h/n/ac/ax/be)) 和 [6GHz](https://en.wikipedia.org/wiki/List_of_WLAN_channels#6_GHz_(802.11ax_and_802.11be)) 信道列表见此处。 |
| **skip-dfs-channels**  (*10min-cac* \| *all* \| *disabled; Default: **disabled***) | 是否避免使用需要执行信道可用性检查（侦听雷达信号是否存在）的信道。10min-cac - 接口将避免使用需要 10 分钟 CAC 的信道；all - 接口将避免使用所有需要 CAC 的信道；disabled - 接口可以选择任何受支持的信道，无论 CAC 要求如何 |
| **width** ( *20mhz* \| *20/40mhz* \| *20/40mhz-Ce* \| *20/40mhz-eC* \| *20/40/80mhz* \| *20/40/80+80mhz* \| *20/40/80/160mhz*\| *20/40/80/160/320mhz*) | 无线信道宽度。默认为无线射频硬件支持的最宽信道。 |

### 配置属性 {#configuration-properties}

本节包含与接口及相关 radio 运行有关的属性。

| 属性 | 描述 |
| :-- | :-- |
| **antenna-gain** (*integer 0..30*) | 覆盖默认天线增益。每个无线射频的 <em>master</em> 接口为使用同一无线射频的每个接口设置天线增益。 <br/> 此设置不能将天线增益覆盖为低于无线射频的最小天线增益。无默认值。 <br/> |
| **beacon-interval** (*time interval 100ms..1s; default: **100ms***) | AP 信标帧之间的间隔。🛈 **重要：** 802.11 标准以*时间单位*（1 TU = 1.024 ms）定义信标间隔。每配置 1 ms，实际信标间隔即为 1 TU。⚠️ **警告：** 在同一 radio 上运行的所有 AP（即 master AP 及其所有"虚拟"/"从属"AP）必须使用相同的信标间隔。  |
| **chains** (*list of integer 0..7* ) | 用于接收信号的[射频链](https://en.wikipedia.org/wiki/RF_chain)。默认为对应无线射频硬件可用的所有链。 |
| **country** (*name of a country; default: **Latvia***) | 决定接口应用哪些监管域限制。⚠️ **警告：** 正确设置此值以符合当地法规并确保与其他设备的互操作性非常重要。  在受控环境中，或如果你所在地区有特殊许可，可以选择 `country=Superchannel`（使用此国家配置文件时，路由器的发射输出功率不受软件限制，路由器会输出其硬件芯片允许的最大功率，除非通过手动 `tx-power` 将其调低）。对 **wifi-qcom-ac** 驱动无效。 |
| **distance** () | 最大链路距离（公里），需要为远距离室外链路设置。该值应反映距离设备最远的 AP 或 station 的距离。未配置该值时允许使用 2 km 链路。⚠️ **警告：** wifi-qcom-ac 包不使用 `distance`。将 `distance` 设置为高于实际需要的值可能对吞吐量和延迟产生不利影响。  |
| **dtim-period** (*integer 1..255; default: **1***) | DTIM 是信标帧的一部分，用于通知节能（休眠）station 有即将到来的组播和广播流量。该设置配置当 AP 上连接有处于节能模式的客户端设备时，发送组播或广播流量的周期。以信标间隔的倍数表示（例如使用默认值 `dtim-period=1` 和 `beacon-interval=100ms` 时，每 1 x 100 ms = 100 ms 发送一次）。较高的值让客户端设备节省更多能量，但会增加网络延迟。较低的值让客户端更频繁地唤醒，消耗更多能量。 |
| **hide-ssid** (*no \| yes; default: **no***) | yes - AP 不在信标帧中包含其 SSID，也不回复具有广播 SSID 的探测请求。no - AP 在信标帧中包含其 SSID，并回复具有广播 SSID 的探测请求。 |
| **hw-protection-mode** (*cts-to-self* \| none \| *rts-cts)* | 为减少帧冲突，可以使用： <br/><ul><li><em>cts-to-self</em> - 接口在发送 MPDU 之前向自己的地址发送 CTS 帧（以通知附近设备推迟相互通信）；</li><li><em>none </em> - 接口不使用任何硬件保护机制；</li><li><em>rts-cts -</em> 接口在每个 MPDU 之前发送 RTS 帧（RTS 之后是来自接收方的 CTS，通信在此之后进行——RTS 和 CTS 帧都可推迟其他设备）；</li></ul> 默认（未设置）：接口在重传的 MPDU 之前发送 RTS 帧。 |
| **installation** (*indoor*\|*outdoor*; *default*: **indoor**) | 安装在室外的设备将避免使用仅限室内的无线信道。 |
| **manager** (*capsman* \|*capsman-or-local* \| *local*; default: **local**) | capsman - 接口仅作为 CAP 工作；此选项**不应**通过 provisioning 规则传递给 CAP  capsman-or-local - 接口将通过 CAPsMAN 获取配置，如果未启用 `/interface/wifi/cap`，则使用自身配置。  local - 接口不会联系 CAPsMAN 获取配置。 |
| **max-clients** (*integer 1..1000; default: **1000**)* | 关联客户端的最大数量。 |
| **mode** (*ap* \| *station*) | 接口操作模式 <br/><ul><li><em>ap</em>（默认）- 接口作为接入点运行</li><li><em>station</em> - 接口充当客户端设备，扫描通告已配置 SSID 的接入点</li><li>station-bridge - 接口充当客户端设备并启用对 4 地址帧格式的支持，以便该接口可用作桥接端口</li><li>station-pseudobridge - 接口跟踪出站 IP 连接，并执行 MAC 地址转换，其方式类似于 IP 伪装的工作方式</li></ul><br/>🛈 <strong>重要：</strong> 'wifi' station-bridge 模式与运行较旧 'wireless' 软件包的 AP 不兼容，反之亦然。 <br/><br/> |
| **multicast-enhance** (*enabled*\| *disabled; default: **disabled***) | 启用 multicast-enhance 功能后，AP 会把每个组播地址的 IP 或 IPv6 数据包转换为面向每个已连接 station 的多个单播地址帧。这可以提升链路吞吐量和可靠性，因为与组播帧不同，单播帧会被 station 确认并以更高的数据速率发送。 |
| **qos-classifier** (*dscp-high-3-bits*\| *priority; default: **priority***) | 指定遵循哪套 WMM 规则集。AP 和客户端根据分配给数据包的优先级（按 WMM 规范）进行分类 → 1,2 - 背景；0,3 - 尽力而为；4,5 - 视频；6,7 - 语音。"更好"的接入类别获得信道访问权的概率更高（例如语音帧在信道变为"空闲"后的"退避"时间更短，从而更可能比"较差"类别的帧更早发送）。dscp-high-3-bits - 接口将使用等于 IP DSCP 字段最高 3 位值的 WMM 优先级发送数据包；priority - 接口将使用由 IP firewall 或 bridge filter 设置的 WMM 优先级发送数据包。🛈  **重要：** 802.11ac 无线芯片组不支持 dscp-high-3-bits 分类器模式。对于 802.11ac 接口，请参见 [DSCP from priority](https://en.wikipedia.org/wiki/RF_chain)。     |
| **ssid** *(string; default: **no**)* | 无线网络的名称，即 (E)SSID。 |
| **station-roaming** *(no \| yes; Default: **no**)* | 运行在 station 或 station-bridge 模式的 Wifi 接口会定期扫描可漫游的候选 AP。到 AP 的信号越弱，扫描越频繁。如果发现信号更好的 AP，station 会漫游到它。支持 FT，并且如果启用了 `steering.wnm`，station 会响应 BSS Transition Request。 |
| **tx-chains** (*list of integer 0..7*) | 用于发送信号的[射频链](https://en.wikipedia.org/wiki/RF_chain)。默认为对应无线射频硬件可用的所有链。 |
| **tx-power** (*integer 0..40*) | 接口发射功率（单位 dBm）的限制。不能用于将功率设置为高于监管配置文件规定的限制。默认未设置。 |

### Datapath 属性 {#datapath-properties}

与向无线客户端设备转发数据包及从其接收数据包有关的参数。

| 属性 | 描述 |
| :-- | :-- |
| **bridge** (*bridge interface*) | 要将接口作为桥接端口添加到的桥接接口。虚拟（“从属”）接口默认会添加到与对应主接口相同的桥接（如果有）。主接口默认不会添加到任何桥接。 |
| **bridge-cost** (*integer; default: **10***) | 作为 bridge 端口添加时使用的 bridge 端口开销。 |
| **bridge-horizon** (*none* \| *integer; default: **none**)* | 作为 bridge 端口添加时使用的 bridge horizon。 |
| **client-isolation** (*no* \| *yes; default: **no***) | 决定连接到此接口的客户端设备是否（默认）与其他客户端隔离。该策略可以通过访问列表规则按客户端覆盖，因此一个 AP 可以同时有隔离和非隔离的客户端。来自隔离客户端的流量不会被转发给其他客户端，来自非隔离客户端的单播流量也不会被转发给隔离客户端。 |
| **interface-list** (*interface list; default: **no***) | 要将接口作为成员添加到的列表。 |
| **traffic-processing** (*on-cap \| on-capsman \| on-capsman-secure*) | 🛈  **重要：** 此设置仅从 **7.21beta2** 版本开始可用。  <code>on-cap</code>，会让 CAP 自身负责处理所有 WiFi 流量（与任何独立 AP 相同）；<code>on-capsman</code>，会让 CAP 的 WiFi 流量被转发到通往 CAPsMAN 的伪隧道，由 CAPsMAN 负责 CAP 的流量处理；<code>on-capsman-secure</code>，会让 CAP 的 WiFi 流量被转发到通往 CAPsMAN 的加密伪隧道，由 CAPsMAN 负责 CAP 的流量处理。 🛈  **重要：** 使用 `traffic-processing=on-capsman` 设置时请注意，由于 CAP 的所有 WiFi 流量现在都由 CAPsMAN 处理（被推入 CAPsMAN），会增加 CAPsMAN 的资源消耗（CPU 和 RAM 使用）。     |
| **vlan-id** (none \| integer 1..4095; default: **none**) | 分配给连接到此接口的客户端设备的默认 VLAN ID（仅与 AP 模式下的接口相关）。当为客户端分配了 VLAN ID 时，来自该客户端的流量会自动打上该 ID 标记，并且只有带此 ID 标记的数据包才会被转发给该客户端。  ⚠️ **警告：** 802.11ac 芯片组不支持这种类型的 VLAN 标记，但可以在 bridge 设置中将它们[配置](../../bridging-and-switching/index.md#vlan-example-trunk-and-access-ports)为 VLAN 接入端口。  |

### 安全属性 {#security-properties}

与认证有关的参数。

| 属性 | 描述 |
| :-- | :-- |
| **authentication-types** （*wpa-psk、wpa2-psk、wpa2-psk-sha2、wpa-eap、wpa2-eap、wpa3-psk、owe、wpa3-eap、wpa3-eap-192 的列表*） | 要在接口上启用的认证类型。 <br/> 默认值为空列表（不进行认证，开放网络）。 <br/> 配置 passphrase 会将 <em>wpa2-psk</em> 认证方法添加到默认列表（如果接口是 AP），或将 <em>wpa-psk</em> 和 <em>wpa2-psk</em> 两者都添加（如果接口是 station）。 <br/> 配置 <em>eap-username</em> 和 <em>eap-password</em> 会将 <em>wpa-eap 和 wpa2-eap</em> 认证方法添加到默认列表。 |
| **beacon-protection** （*disabled*\| *enabled*） | 是否启用 beacon 完整性保护。支持情况取决于 'beacon-protection' 无线电能力。 <br/> 对 802.11be 接口默认启用。 |
| **connect-group** （*字符串*） | 同一 connect-group 内的 AP 不允许超过 1 个具有相同 MAC 地址的客户端设备。这是为了防止恶意授权用户拦截发往其他用户的流量（'MacStealer' 攻击），或通过伪造受害者的 MAC 地址来执行拒绝服务攻击。 <br/> 对具有重复 MAC 地址的新连接的处理取决于所涉及 AP 接口的 connect-priority。 <br/> 默认情况下，所有 AP 都被分配到同一个 connect-group。 |
| **connect-priority** （accept-priority/hold-priority（*整数*）） | 这些参数决定当客户端设备的 MAC 地址与另一个 AP 的另一个活动连接的 MAC 地址相同时，如何处理该连接。 <br/>如果 (AP2 的 accept-priority) &lt; (AP1 的 hold-priority)，则连接到 AP2 会导致客户端从 AP1 被断开。<br/> 如果 (AP2 的 accept-priority) = (AP1 的 hold-priority)，则仅当无法再通过 AP1 访问该 MAC 地址时，才允许连接到 AP2。<br/> 如果 (AP2 的 accept-priority) &gt; (AP1 的 hold-priority)，则不会接受连接到 AP2。 <br/><br/> 如果省略，hold-priority 与 accept-priority 相同。默认情况下，执行用户认证的 AP 比开放 AP 具有更高优先级（更低的整数值）。 |
| **dh-groups** （*19、20、21 的列表*） | 用于 SAE（WPA3）认证的[椭圆曲线密码学群](http://www.iana.org/assignments/ipsec-registry/ipsec-registry.xhtml#ipsec-registry-10)标识符。 |
| **disable-pmkid** （*no* \| *yes；默认：**no***） | 对于处于 AP 模式的接口，禁止在 EAPOL 帧中包含 PMKID。禁用 PMKID 可能导致使用它的客户端设备出现兼容性问题。<ul><li><em>yes</em> - 不要在 EAPOL 帧中包含 PMKID。</li><li><em>no</em> - 在 EAPOL 帧中包含 PMKID。</li></ul> |
| **eap-accounting** （*no* \| *yes；默认：**no***） | 向 RADIUS 服务器发送通过 EAP 认证的对等端的计费信息。 <br/><br/>⚠️ <strong>警告：</strong> 与 EAP 相关的属性仅与处于 station 模式的接口相关。AP 会将 EAP 认证委托（透传）给 RADIUS 服务器。 <br/> |
| **eap-anonymous-identity** （*字符串；默认：**none***） | 用于 EAP 外部认证的可选匿名身份。 |
| **eap-certificate-mode** （*dont-verify-certificate* \| *no-certificates* \| *verify-certificate* \| *verify-certificate-with-crl*；默认：**dont-verify-certificate***） | 处理 RADIUS 服务器 TLS 证书的策略。 <br/><ul><li>verify-certificate - 要求服务器具有有效证书。检查该证书是否由受信任的证书颁发机构签名。</li><li>dont-verify-certificate - 不对证书执行任何检查。</li><li>no-certificates - 尝试通过执行匿名 Diffie-Hellman 密钥交换来建立 TLS 隧道。在 RADIUS 服务器完全没有证书时使用。</li><li>verify-certificate-with-crl - 与 <em>verify-certificate</em> 相同，但还会通过检查证书吊销列表来验证证书是否有效。</li></ul> |
| **eap-methods** （*列表* *peap、tls、ttls*） | 认证时要考虑的 EAP 方法。默认为所有支持的方法。 |
| **eap-password** （*字符串；默认：**none***） *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 当所选 EAP 方法需要密码时使用的密码。 |
| **eap-tls-certificate** （*证书；默认：**none***） | 当所选 EAP 认证方法需要证书时，要使用的设备证书存储中的证书名称或 id。 |
| **eap-username** （*字符串；默认：**none***） | 当所选 EAP 方法需要用户名时使用的用户名。 <br/><br/>⚠️ <strong>注意：</strong> 配置加密密码时请务必小心。 <br/> 所有客户端设备都必须支持 AP 用于连接的组加密密码，并且某些客户端设备（尤其是 Intel® 8260）如果单播密码列表中包含它们不支持的任何密码，也会无法连接。 <br/> |
| **encryption** （*ccmp、ccmp-256、gcmp、gcmp-256、tkip 的列表；默认：**ccmp***） | 用于加密单播流量所支持的密码列表。 <br/> 默认为 <em>ccmp</em>。 <br/><br/>⚠️ <strong>警告：</strong> 为了让客户端设备在两个 AP 之间成功漫游，这些 AP 需要由同一个 RouterOS 实例管理。有关如何集中管理多个 AP 的信息，请参阅 [CAPsMAN](./capsman.md)<br/> |
| **ft** （*no \| yes：默认：**no***） | 是否启用 802.11r 快速 BSS 转换（漫游）。 |
| **ft-mobility-domain** （*0..65535 的整数；默认：**44484 (0xADC4)***） | 快速 BSS 转换移动域 ID。 |
| **ft-nas-identifier** （由 *2..96 个十六进制字符*组成的字符串） | 快速 BSS 转换 PMK-R0 密钥持有者标识符。默认：接口的 MAC 地址。 |
| **ft-over-ds** （*no* \| *yes*；默认：**no***） | 是否启用通过 DS（分布式系统）的快速 BSS 转换。 |
| **ft-preserve-vlanid** （*no* \| *yes* ） | <ul><li>no - 当客户端通过 802.11r 快速 BSS 转换连接到此 AP 时，会根据访问和/或接口设置为其分配 VLAN ID</li><li>yes（默认） - 当客户端通过 802.11r 快速 BSS 转换连接到此 AP 时，它会保留在初始认证期间分配给它的 VLAN ID</li></ul> 当依赖 RADIUS 服务器为用户分配 VLAN ID 时，默认行为至关重要，因为 RADIUS 服务器仅用于初始认证。 <br/> 不受 <strong>wifi-qcom-ac</strong> 驱动程序支持。 |
| **ft-r0-key-lifetime** （*时间间隔 1s..6w3d12h15m；默认：**600000s (~7 days)***） | 快速 BSS 转换 PMK-R0 加密密钥的生命周期。 |
| **ft-reassociation-deadline** （*时间间隔 0..70s；默认：**20s***） | 快速 BSS 转换重新关联截止时间。 |
| **group-encryption** （*ccmp* \| *ccmp-256* \| *gcmp* \| *gcmp-256* \| *tkip*；默认：**ccmp***） | 用于加密组播流量的密码。 |
| **group-key-update** （*时间间隔；默认：**24 hours***） | 组临时密钥（用于加密广播流量的密钥）的更新间隔。 |
| **management-encryption** （*cmac* \| *cmac-256* \| *gmac* \| *gmac-256*；默认：**cmac***） | 用于加密受保护管理帧的密码。 |
| **management-protection** （*allowed* \| *disabled* \| *required*） | 是否使用 802.11w 管理帧保护。<strong>与 standard wireless package 中的管理帧保护不兼容</strong>。 <br/> 默认值取决于所选认证类型的值。WPA2 允许使用管理保护，WPA3 则要求使用。 |
| **multi-passphrase-group** （*字符串*） | 将要使用的 `/interface/wifi/security/multi-passphrase/` 组名称。在 security profile 下只能定义一个组。 |
| **owe-transition-interface** （*接口* \| *auto*） | 在 OWE 过渡模式下运行时，要将其 MAC 地址和 SSID 通告为匹配 AP 的接口名称。 <br/> 将值设置为 'auto' 将使 RouterOS 尝试自动匹配同一无线电上的开放 AP 和 OWE AP。 <br/> 在设置提供 OWE、但也要与不支持该标准的旧设备配合使用的开放 AP 时需要此项。请参阅<a href="#basic-configuration">上面的配置示例</a>。 |
| **passphrase** （*最多 63 个字符的字符串*） *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于 PSK 认证类型的 passphrase。默认为空字符串 - ""。 <br/> WPA-PSK 和 WPA2-PSK 认证要求至少 8 个字符，而 WPA3-PSK 没有最小 passphrase 长度要求。 |
| **sae-anti-clogging-threshold** （*disabled* \| *整数；默认：**5***） | 由于 SAE（WPA3）关联会消耗大量 CPU 资源，用虚假认证请求淹没 AP 会构成一种可行的拒绝服务攻击。 <br/> 此参数提供了一种缓解此类攻击的方法：指定正在进行中的 SAE 认证阈值，达到该阈值后，AP 将开始要求客户端设备在其认证请求中包含绑定到其 MAC 地址的 cookie。之后，它将仅处理包含有效 cookie 的认证请求。 |
| **sae-max-failure-rate** （*disabled* \| *整数；默认：**40***） | 每分钟失败的 SAE（WPA3）关联速率，达到该速率后，AP 将停止处理新的关联请求。 |
| **sae-pwe** （*both* \| *hash-to-element* \| *hunting-and-pecking；默认：**both***） | 用于派生 SAE 密码元素所支持的方法。 |
| **wps** （*disabled* \| *push-button；默认：**push-button***） | <ul><li><em>push-button</em> - 在调用 'wps-push-button' 命令后，AP 将在 2 分钟内接受 WPS 认证。物理 WPS 按钮功能尚未实现。</li><li><em>disabled </em> - AP 将不接受 WPS 认证</li></ul> |

### 安全 multi-passphrase 属性 {#security-multi-passphrase-properties}

`/interface/wifi/security/multi-passphrase`

`multi-passphrase` 允许使用 PPSK——私有预共享密钥。
可以通过创建访问列表条目并设置 `multi-passphrase-group` 名称来使用，也可以将组分配给接口所使用的安全配置文件。

支持的 passphrase 总上限为 10000。该上限在所有接口之间共享。当接口关联了 multi-passphrase 组时，启用后它会开始缓存指定组中的所有 passphrase。缓存进行期间，认证会变慢。缓存完成后，使用 multi-passphrase 组就不会再带来可感知的额外延迟。

如果使用访问列表来应用 `multi-passphrase-group`，缓存将在首次匹配到该组时开始，并持续到找到匹配的 passphrase 为止。

如果单个组下可能有成千上万个 passphrase 条目，则缓存可能需要几分钟才能完成，具体取决于设备配置和型号。

:::info
multi-passphrase 不支持 WPA3-PSK 认证类型。
:::

| 属性 | 描述 |
| :-- | :-- |
| **group** (*string*) | 将组分配给安全配置文件或访问列表后，即可使用该组下定义的所有密码短语 |
| **passphrase** (*string of up to 63 characters*) *[敏感](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于 PSK 认证类型的密码短语。多个用户可以使用同一个密码短语。 <br/> 与 WPA3-PSK 不兼容。 |
| **vlan-id** (*integer 0..4095; Default: **none***) | 将分配给使用此 passphrase 的客户端的 vlan-id   ⚠️ **注意：** 仅在 wifi-qcom 接口上受支持。如果 wifi-qcom-ac AP 有客户端使用带有关联 vlan-id 的 passphrase，该客户端将无法加入。 |
| **expires** (*date and time*; "YYYY-MM-DD HH:SS") | 此条目中指定的密码短语的过期日期和时间，不影响整个组。一旦到达该日期，使用此密码短语的现有客户端将被断开连接，新客户端将无法使用该密码短语连接。如果未设置，则该密码短语可以无限期使用。 |
| **isolation** (*yes* \| *no*; Default: **no**) | 决定使用此 passphrase 的客户端设备是否与 AP 上的其他客户端隔离。来自隔离客户端的流量不会被转发给其他客户端，来自非隔离客户端的单播流量也不会被转发给隔离客户端。 |
| **disabled**（*yes* \| *no*；默认：**no**） |  |

### Steering 属性 {#steering-properties}

:::info
非请求式 802.11v BSS 转换管理请求功能从 7.21 起受支持。
:::

此类别中的属性管理向客户端设备通告潜在漫游候选的机制。

| 属性 | 描述 |
| :-- | :-- |
| **2g-probe-delay**(*no* \| *yes*; Default: *no*) | 如果在 2.4GHz AP 上将此属性设置为 yes，且该 AP 与至少一个 5GHz AP 位于同一个 steering neighbor 组中，则该 2.4GHz AP 将在 60 秒间隔内，不响应来自每个客户端的、信噪比大于 35 dB 的前 3 个探测请求。  |
| **neighbor-group** (*string*) | 在发送邻居报告和 BSS 转换管理请求时，AP 会将其邻居组内的所有其他 AP 列为潜在的漫游候选。 <br/> 默认情况下，会为每组具有相同 SSID 和认证设置的 AP 创建动态邻居组。工作在 5GHz 频段的 AP 会被指示为优先于工作在 2.4GHz 频段的 AP。 <br/> 如果使用 EAP，则不会创建动态邻居组；需要手动定义。 <br/><br/> |
| **rrm** (*no* \| *yes; Default: **yes***) | 启用 802.11k 邻居报告的发送。  当设备想要"探索/描绘"其周围环境时，客户端可以向 AP 请求"邻居报告"（客户端设备可以存储该报告，并立即或在稍后使用它进行漫游）。 |
| **transition-threshold** (*integer; Default: **-80***) | 设置发送非请求式 802.11v BSS 转换管理请求的 RSSI 阈值。如果客户端设备在 `transition-threshold-time` 期间一直处于配置阈值"以下"，它就会被标记为"转换候选"。 |
| **transition-threshold-time** (*time interval; Default: **10***) | 定义客户端设备可以处于配置的 `transition-threshold` 值"以下"多长时间（秒），才会被标记为"转换候选"。 |
| **transition-request-period** (*time interval; Default: **30***) | 定义以秒为单位的间隔，如果客户端设备是"转换候选"，AP 将按此间隔向其发送非请求式 802.11v BSS 转换管理请求。  例如使用默认值（30s），将每 30 秒向客户端发送一次请求，总共发送 `transition-request-count` 次。 |
| **transition-request-count** (*count, unlimited; Default: **3***) | 定义应向被标记为"转换候选"的客户端发送多少次非请求式 802.11v BSS 转换管理请求。客户端获得"转换候选"状态后（"-1"次计数）会立即发送一次请求，其余"count"次将每隔 `transition-request-period` 发送一次。  例如使用默认值（3），当客户端获得"转换候选"状态时发送第 1 次请求；第 2 次请求在 `transition-request-period` 秒后发送，第 3 次（最后一次）在又一个 `transition-request-period` 后发送。  如果你想不限次数地发送请求，请设置为 `unlimited`。 |
| **transition-time** (*time interval, immediate \| unlimited; Default: **unlimited***) | 定义客户端设备在被迫去认证之前可以作为"转换候选"多长时间。它可以是秒为单位的 `time interval`（在设备成为"转换候选"后开始计时，时间到后对客户端去认证），可以是 `immediate`（客户端成为"转换候选"后立即去认证），也可以是 `unlimited`（从不强制客户端断开，并继续每隔 `transition-request-period` 秒发送 `transition-request-count` 次转换请求）。🛈  **重要：** 注意，使用 `transition-time=immediate` 时，`transition-request-period` 和 `transition-request-count` 将变得无用，因为客户端会在 `transition-threshold-time` 之后立即被去认证。     |
| **wnm** (*no* \| *yes; Default: **yes***) | 启用请求式 802.11v BSS 转换管理请求的发送。  客户端可以请求包含"邻居列表"的"漫游建议"数据包，以帮助设备切换 AP。客户端设备可以接受建议并立即漫游，也可以忽略建议并保持当前连接。 |

:::info
请理解**客户端可以忽略 BSS 转换管理请求**。BSS 转换请求只是"建议"客户端去寻找其他信号更好的 AP。收到转换请求后，是否切换 AP 或保持与当前 AP 的连接，完全由客户端决定。
:::

:::info
**请求式 802.11v BSS 转换管理请求的行为：**

请求式 802.11v BSS 转换管理数据包是根据客户端自身的请求发送给它的。客户端设备"请求" AP 提供"漫游建议"（带有"邻居列表"），AP 则以转换请求（包含"邻居列表"）作为响应。
:::

:::info
**非请求式 802.11v BSS 转换管理请求的行为：**

非请求式 802.11v 请求无需等待客户端请求即可发送给客户端。即使客户端没有请求，也会发送该请求。

如果客户端信号低于 `transition-threshold`（默认值：-80 dBm）的时间超过 `transition-threshold-time`（默认值：10 s），则客户端被标记为"转换候选"。如果客户端信号高于 `transition-threshold`，则客户端的"转换候选"状态被移除。

如果客户端是"转换候选"，它将开始收到**非请求式 802.11v BSS 转换管理请求**数据包（"建议"其移动到附近其他 AP 的数据包）。第一个此类数据包会在客户端状态变为"转换候选"后立即发送，后续数据包每隔 `transition-request-period`（默认值：30 s）发送。总共会发送 `transition-request-count`（默认值：3）个转换请求，之后 AP 将停止建议转换（除非配置了 `transition-request-count=unlimited`，这会让 AP 不停地发送请求，每个 `transition-request-period` 一个）。`transition-request-count` 次数用完后，客户端将在自己请求之后，或在其被取消标记并再次被标记为"转换候选"之后，收到下一个转换请求。

`transition-time` 中的值定义了客户端设备在被强制断开之前可以保持"转换候选"状态多长时间。可能的 `transition-time` 值：**unlimited**（继续按 `transition-request-period` 间隔发送 `transition-request-count` 数量的转换请求，且从不强制对客户端去认证）、**可配置时间**（秒，继续按 `transition-request-period` 间隔发送 `transition-request-count` 数量的转换请求，然后在配置的 `transition-time` 用完后断开客户端），以及 **immediate**（当客户端成为"转换候选"时向其发送转换请求，并立即断开它）。
:::

### 其他属性 {#miscellaneous-properties}

| 属性 | 描述 |
| :-- | :-- |
| **arp** (*disabled* \| *enabled* \| *local-proxy-arp*  \| *proxy-arp* \| *reply-only; default: **enabled**)* | 地址解析协议模式：disabled - 接口不使用 ARP；enabled - 接口使用 ARP；local-proxy-arp - 路由器在接口上执行代理 ARP，并向同一接口发送回复；proxy-arp - 路由器在接口上执行代理 ARP，并向其他接口发送回复；reply-only - 接口只回复源自 ARP 表中静态条目所匹配的 IP 地址/MAC 地址组合的请求。ARP 表中不会自动存储动态条目。因此，为使通信成功，必须已存在有效的静态条目。 |
| **arp-timeout** (*time interval* \| *'auto'; default: **30s***) | 决定动态添加的 ARP 表条目在从相应 IP 地址收到最后一个数据包后被视为有效的时长。值 *auto* 等于*`/ip/settings`* 中 *arp-timeout* 的值，默认为 30s。 |
| **disable-running-check** *(no* \| *yes; default: **no***) | yes - 只要接口未被禁用，其 running 属性就为 true；no - 只有当接口已与另一设备建立链路时，其 running 属性才为 true |
| **disabled**（*no* \| *yes*；默认：**yes**） |  |
| **mac-address** (*MAC*) | 用于接口的 MAC 地址（BSSID）。 <br/> 硬件接口默认使用关联无线接口的 MAC 地址。 <br/> 虚拟接口的默认 MAC 地址通过以下方式生成 <br/><ol><li>取关联主接口的 MAC 地址</li><li>将第一个字节的次最低有效位设置为 1，从而得到<a href="https://en.wikipedia.org/wiki/MAC_address#Ranges_of_group_and_locally_administered_addresses" rel="nofollow">本地管理 MAC 地址</a></li><li>如有需要，递增地址的最后一个字节，以确保它不与设备上另一个接口的地址重叠</li></ol> |
| **mtu** *(integer [32..2290]; Default: **1500**)* | 第 3 层最大传输单元。 |
| **mld-interface** (*interface; default: **none***) | 指定关联的 MLD（多链路设备）接口。当两个或更多 wifi 接口被分配相同的 MLD 接口（例如 *mld-interface=mld1*）时，它们会作为单个逻辑 AP MLD 协同工作，从而启用多链路操作（MLO）。MLD 接口是逻辑数据转发点——流量在 MLD 接口层面处理，而不是在各个关联的 WiFi 接口上处理。所有关联的 WiFi 接口必须共享相同的 SSID，并且所有参与的 radio 必须属于同一设备。MLO 需要兼容的 Wi-Fi 7（802.11be）硬件。 |
| **mld-name** (*string*) | 一个唯一标识符，用于将此接口指定为 MLD 接口。手动创建 MLD 接口时，必须唯一且明确设置。 |
| **l2mtu** *(integer [32..2290]; Default: **2290**)* | 第 2 层最大传输单元。 |
| **master-interface** (*interface; default: **none***) | 每个无线 radio 上可以同时运行多种接口配置。  其中只有一个决定 radio 的状态（是否启用、使用哪个频率等）。这个"master"接口*绑定*到具有相应 *radio-mac* 的 radio。  要在某个 radio 上创建额外的（"虚拟"）接口配置，需要将它们*绑定*到相应的 master 接口。 |
| **name** (*string*) | 接口的名称。默认为 *wifiN*，其中 *N* 是尚未用于接口命名的最小整数。 |

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **bound** (*boolean*) (B) | 对于当前可供 WiFi 管理器使用的 *master* 接口为 true。  对于虚拟接口（连接到 master 接口的配置），当接口本身及其 master 接口均未被禁用，且 *master* 接口具有 bound 标志时为 true。 |
| **cap** (string) | 如果此路由器是 CAPsMAN，且接口不属于设备本身而是属于 CAPsMAN 控制的 CAP 设备，则显示有关该 CAP 设备的信息。 |
| **default-name** (*string*) | 接口的默认名称。 |
| **inactive** (*boolean*) (I) | 对于 AP 模式下的接口，当其已选定工作信道（即配置已成功应用）时为 false。  对于 station 模式下的接口，当其已连接到 AP（即配置已成功应用，并找到了匹配设置的 AP）时为 false。  其他情况为 true。 |
| **master** (*boolean*) (M) | 对于路由器本身的物理接口，或在作为 CAPsMAN 运行时检测到的 CAP 为 true。  对于虚拟接口为 false。 |
| **radio-mac** (*MAC*) | 关联 radio 的 MAC 地址。 |
| **running** (*boolean*) (R) | 当接口已与另一设备建立链路时为 true。  如果 *disable-running-check* 设为 'yes'，则只要接口未被禁用就为 true。 |

### 访问列表 {#access-list-1}

过滤参数：

| 参数 | 说明 |
| :-- | :-- |
| **interface** (*interface* \| *interface-list* \| *any; default: **any***) | 如果连接发生在指定接口或属于指定列表的接口上则匹配。 |
| **mac-address** (*MAC address; default: **none***) | 如果客户端设备具有指定的 MAC 地址则匹配。 |
| **mac-address-mask** (*MAC address*) | 修改 **mac-address** 参数，使其在等于对客户端 MAC 地址与给定地址掩码执行按位 AND 运算的结果时匹配。  默认：FF:FF:FF:FF:FF:FF（即客户端的 MAC 地址必须与 **mac-address** 的值完全一致） |
| **signal-range** (*min..max*) | 如果从客户端设备接收到的信号强度在给定范围内，则匹配。允许的值：'-120..120' |
| **ssid-regexp** (*regex*) | 如果给定的正则表达式与 SSID 匹配，则匹配。 |
| **time** (*start-end,days*) | 在指定的每日时间和（可选的）星期几期间匹配。允许的值：0s-1d |
| **multi-passphrase-group** (*string*) | 将要使用的 `/interface/wifi/security/multi-passphrase/` 组的名称。一个访问列表条目下只能设置一个组。 |

动作参数：

| 参数 | 说明 |
| :-- | :-- |
| **allow-signal-out-of-range** *(time period \| always; default: **0s**)* | 已连接对端的信号强度被允许超出 **signal-range** 参数所要求范围的时间长度，之后它将被断开。  如果值设为 'always'，则只在关联时检查对端信号强度。 |
| **action** (*accept* \| *reject* \| *query-radius; default: **accept***) | 是否授权连接：accept - 允许连接；reject - 不允许连接；query-radius -  如果对客户端 MAC 地址的 MAC 地址认证成功，则允许连接 |
| **client-isolation** (*no* \| *yes; default: **none***) | 是否将客户端与连接到同一 AP 的其他客户端[隔离](./index.md#datapath-properties)。 |
| **passphrase** (*string; *default: **none***) [sensitive](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用给定值覆盖默认 passphrase。 |
| **radius-accounting** (*no* \| *yes; *default: **none***)* | 用给定值覆盖默认 RADIUS 计费策略。 |
| **vlan-id** (*none* \| *integer 1..4095; *default: **none***)* | 为匹配的客户端分配给定的 [VLAN ID](./index.md#datapath-properties)。 |

### 频率扫描 {#frequency-scan-1}

运行 frequency-scan 命令可以获得可用信道上射频状况的信息。
命令参数：

| 参数 | 说明 |
| :-- | :-- |
| **duration** (*time interval; *default: **none***)* | 执行扫描多长时间后退出。对非交互式使用很有用。 |
| **freeze-frame-interval** (*time interval; default: **1s**)* | 更新命令输出的时间间隔。 |
| **frequency** (*list of frequencies/ranges)* | 要执行扫描的频率。详情参见上文的 [channel.frequency 参数语法](#channel-properties)。默认为所有受支持的频率。 |
| **number** (*string*; *default*: **none**) | 用于执行扫描的接口名称或内部 id。必填。 |
| **rounds** (*integer*; *default*: **none**) | 退出前遍历可扫描频率列表的次数。对非交互式使用很有用。 |
| **save-file** (*string*; *default*: **none**) | 用于保存输出的文件名。 |

输出参数：

| 参数 | 说明 |
| :-- | :-- |
| **channel** (*integer*) | 所扫描信道的频率（MHz）。 |
| **networks** (*integer*) | 该信道上检测到的接入点数量。 |
| **load** (*integer*) | 扫描期间该信道处于忙状态的百分比。 |
| **nf** (integer) | 该信道的噪声底（dBm）。 |
| **max-signal** (*integer*) | 该信道中检测到的 AP 的最大信号强度（dBm）。 |
| **min-signal** (*integer*) | 该信道中检测到的 AP 的最小信号强度（dBm）。 |
| **primary** (*boolean*) (P) | 该信道正被某个 AP 用作主（控制）信道。 |
| **secondary** (*boolean*) (S) | 该信道正被某个 AP 用作辅助（扩展）信道。 |

### Flat-snoop {#flat-snoop}

`/interface/wifi/flat-snoop` 是一个用于勘测 AP 和 station 的工具。它监视频率使用情况，并显示哪些设备占用各个频率。它比 scan 提供更详细的附近 AP 信息，并可按 station/AP 数量轻松概览频率使用情况。
输出参数：

| 参数 | 描述 |
| :-- | :-- |
| **duration** (*time interval*; *默认*: **none**) | 在执行扫描多长时间后退出。适用于非交互式使用。 |
| **filter-type** (*bss \| frequency \| stas*) | bss - 活动 AP 及其参数的列表。 <br/> frequency - 每个扫描频率的 station 和 AP 数量列表 <br/> stas - 每个扫描频率上 station 的详细列表 <br/> 如果未指定 filter-type，将返回所有类型。 |
| **freeze-frame-interval** (*time interval; default: **1s**)* | 更新命令输出的时间间隔。 |

### scan 命令 {#scan-command-1}

`/interface/wifi/scan` 命令会扫描接入点，并打印其检测到的所有 AP 的信息。
scan 命令接受与 frequency-scan 命令相同的所有参数。
输出参数：

| 参数 | 说明 |
| :-- | :-- |
| **active** (*boolean*) (A) | 这表示在过去 30 秒内收到了来自该 AP 的信标。 |
| **address** (*MAC*) | AP 的 MAC 地址（BSSID）。 |
| **channel** (*string*) | AP 使用的控制信道频率、其支持的无线标准以及控制/扩展信道布局。 |
| **security** (*string*) | AP 支持的认证方法。 |
| **signal** (*integer*) | AP 信标的信号强度（dBm）。 |
| **ssid** (*string*) | AP 的扩展服务集标识符。 |
| **sta-count** (*integer*) | 与该 AP 关联的客户端设备数量。仅当 AP 在其信标中包含此信息时才可用。 |

### 嗅探器 {#sniffer-1}

命令参数：

| 参数 | 描述 |
| :-- | :-- |
| **duration** (*time interval*; **default: **none***)* | 在指定时间过后自动中断 sniffer。 |
| **filter** (*string*) | 一个字符串，指定要应用于捕获帧的过滤器。只有与过滤表达式匹配的帧才会被显示、保存或流式传输。 <br/> 例如，其工作方式类似于 libpcap 中的过滤字符串。 <br/> 过滤器可以匹配 <br/><ul><li>地址字段（addr1、addr2、addr3）</li><li>无线帧类型和子类型，包括 'beacon'（type == 0 &amp;&amp; subtype == 8）等简写</li><li>标志位（to-ds、from-ds、retry、power、protected）</li></ul> 字符串可以包含以下运算符： <br/><ul><li>==（精确匹配）</li><li>!=（不等于）</li><li>&amp;&amp;（逻辑与）</li><li> &#124;&#124;（逻辑或）</li><li>()（用于对过滤表达式进行分组）</li></ul> |
| <strong>number</strong> (<em>interface</em>) <br/> | 用于嗅探的接口。 |
| **pcap-file** (*string*) | 将捕获的帧保存到具有给定名称的文件中。没有默认值（默认情况下捕获的帧不会保存到文件）。 |
| **pcap-size-limit** (*integer*; *默认*: **none**) | 在本地存储捕获帧时的文件大小限制（以字节为单位）。达到此限制后，不会再向捕获文件添加新帧。 |
| **stream-address** (*IP address*; *default*: **none**) | 通过 TZSP 协议将捕获的数据包流式传输到给定地址。没有默认值（默认情况下捕获的数据包不会流式传输到任何地方）。 |
| **stream-rate** (*integer*) | 限制通过 TZSP 流式传输捕获帧的速率（以每秒数据包数为单位）。 |

### WPS {#wps-1}

`/interface/wifi/wps-client/wifi`
命令参数：

| 参数 | 说明 |
| :-- | :-- |
| **duration** (*time interval*) | 如果未找到 AP，命令超时前的时间长度。默认无限制。 |
| **interval** (*time interval; default: **1s***) | 更新命令输出的时间间隔。默认：1s。 |
| **mac-address** (*MAC*; *default*: **none**) | 仅尝试连接到具有指定 MAC（BSSID）的 AP。 |
| **number** (*string; default: **none***) | 用于尝试连接的接口名称或内部 id。 |
| **ssid** (*string; default: **none***) | 仅尝试连接到具有指定 SSID 的 AP。 |

### 射频 {#radios-1}

运行 `/interface/wifi/radio/print detail` 命令可以获取每个 radio 的能力信息。

| 属性 | 说明 |
| :-- | :-- |
| **2g-channels** (*list of integers*) | 2.4GHz 频段支持的频率。 |
| **5g-channels** (*list of integers*) | 5GHz 频段支持的频率。 |
| **6g-channels** (*list of integers*) | 6GHz 频段支持的频率。 |
| **bands** (*list of strings*) | 支持的频段、无线标准和信道宽度。 |
| **ciphers** (*list of strings*) | 支持的加密算法。 |
| **countries** (*list of strings*) | 接口支持的监管域。 |
| **hw-caps** (*list of strings*) | 额外支持的功能（例如 sniffer、qos-classifier-dscp）。 |
| **hw-type** (*string*) | Radio 硬件型号编号。 |
| **max-interfaces** (*integer*) | 最大逻辑接口数。 |
| **max-peers** (*integer*) | 最大关联对端数（已连接 station）。 |
| **max-station-interfaces** (*integer*) | station 模式下的最大逻辑接口数。 |
| **max-vlans** (*integer*) | 最大不同按用户 VLAN 数。 |
| **min-antenna-gain** (*integer*) | 接口允许的最小天线增益。 |
| **ml-group** (*MAC address*) | 具有共同 ML（多链路）组的 radio 可配置为利用多链路操作。 |
| **phy-id** (*string*) | 一个唯一标识符。 |
| **radio-mac** (*MAC*) | radio 接口的 MAC 地址。可用于将 radio 与接口配置匹配。 |
| **rx-chains** (*list of integers*) | 可用于接收无线电信号的射频链 ID。 |
| **tx-chains** (*list of integers*) | 可用于发送无线电信号的射频链 ID。 |

### 注册表 {#registration-table-1}

注册表包含有关已关联无线设备的只读信息。

| 参数 | 说明 |
| :-- | :-- |
| **authorized** (*boolean*) (A) | 当对端已成功通过认证时为 true。 |
| **auth-type** (*string*) | 该特定客户端使用的认证类型。 |
| **band** (*string*) | 该特定路由器与 AP 通信所用的频段。 |
| **bytes** (*list of integers*) | 发送给对端和从对端接收的数据包字节数。 |
| **interface** (*string*) | 用于与对端关联的接口名称。 |
| **last-activity**(time) | 接口最近一次数据收发活动 |
| **mac-address** (*MAC*) | 对端的 MAC 地址。 |
| **packets** (*list of integers*) | 发送给对端和从对端接收的数据包数量。 |
| **tx-bits-per-second** (*integer*) | 每秒向对端发送数据的速率。 |
| **rx-bits-per-second** (*integer*) | 每秒从对端接收数据的速率。 |
| **rx-rate** *(string*) | 从对端接收传输的比特率。 |
| **signal** (*integer*) | 从对端接收的信号强度（dBm）。 |
| **ssid** *(string*) | 客户端所连接到的 SSID。 |
| **tx-rate** (*string*) | 用于向对端发送的比特率。 |
| **uptime** (*time interval*) | 自关联以来的时间。 |
| **vlan-id** (*integer*) | 由 AP 或 RADIUS 为该特定对端流量分配的 VLAN。 |
