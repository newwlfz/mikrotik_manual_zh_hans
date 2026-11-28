---
title: "Wi-Fi 6 / 7 (802.11ax/be)"
description: "本页介绍 RouterOS 中的 WiFi 配置菜单，涵盖受密码保护和 OWE transition mode 接入点的基本设置。文中说明配置配置文件和安全设置，并提供重置配置的示例。"
tags:
  - 'wifi'
  - 'configuration-profiles'
  - 'access-lists'
source: https://manual.mikrotik.com/docs/7.24/wireless/wifi
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 MikroTik **Wi-Fi 6 / 6E / 7（802.11ax/be）** 设备，所有设备均通过共享的 **`/interface/wifi`** 菜单配置。设备所需的驱动软件包取决于其无线芯片组和标准。同一菜单也适用于运行 **`wifi-qcom-ac`** 软件包的 **Wi-Fi 5（802.11ac）** 设备。

:::tip[本设备是否适用本节？]
运行以下任一驱动软件包的所有设备均使用此菜单（以及本手册）：

| 软件包 | 设备 | 示例 |
| :-- | :-- | :-- |
| `wifi-qcom` | Wi-Fi 6 / 6E（Qualcomm） | wAP ax，cAP ax，hAP ax³ |
| `wifi-qcom-be` | Wi-Fi 7（Qualcomm） | hAP be3 media |
| `wifi-mediatek` | Wi-Fi 6 / 7（MediaTek） | hAP ax S，hAP be lite |
| `wifi-qcom-ac` | Wi-Fi 5 / 802.11ac（Qualcomm） | 请参阅 [Wi-Fi 5（802.11ac）](/docs/wireless/wifi-ac) |

标准通常编码在型号名称中：**ax** 表示 Wi-Fi 6，**be** 表示 Wi-Fi 7。对于 `wifi-qcom-ac` 设备，请参阅 [Wi-Fi 5（802.11ac）](/docs/wireless/wifi-ac)，确认你的设备应使用此菜单还是旧版 `/interface/wireless` 菜单。

如果你的设备使用旧版 `/interface/wireless` 菜单，请参阅 [802.11 a/b/g/n](/docs/wireless/abgn)。
:::

:::note
在 7.13 之前的 RouterOS 版本中，此菜单属于名为 `wifiwave2` 的独立软件包。
:::

## 入门 {#getting-started}

首次使用其中一种设备？请先阅读面向任务的指南，然后使用本页下方的属性参考查看各项设置：

- [Configuring a standalone access point](/docs/wireless/wifi/configuring-standalone-access-point)
- [Configuring a repeater](/docs/wireless/wifi/configuring-repeater)
- [Configuring outdoor CPE-to-AP links](/docs/wireless/wifi/configuring-outdoor-cpe-to-ap-links)
- [Interworking (802.11u / Hotspot 2.0) for WiFi6](/docs/wireless/wifi/interworking-for-wifi6)
- [Centralized management with WiFi CAPsMAN](/docs/wireless/capsman)

## WiFi 术语 {#wifi-terminology}

在继续之前，先熟悉理解此菜单操作所需的重要术语。本文后续部分将使用这些术语。

- **Profile** - 指在一个 WiFi 子菜单下创建的配置预设：**aaa**、**channel**、**security**、**datapath** 或 **interworking**。
- **Configuration** **profile** - 在 `/interface/wifi/configuration` 下定义的配置预设，它可以引用各种 profile。
- **Station** - 无线客户端。

## 基本配置 {#basic-configuration}

### 基本密码保护 AP {#basic-password-protected-ap}

```ros
/interface/wifi
set wifi1 disabled=no configuration.country=Latvia configuration.ssid=MikroTik security.authentication-types=wpa2-psk,wpa3-psk security.passphrase=8-63_characters
```

### 使用 OWE 过渡模式的开放 AP {#open-ap-with-owe-transition-mode}

机会性无线加密（OWE）允许创建无需知道密码即可连接的无线网络，同时仍提供流量加密和管理帧保护的优势。它是对普通开放接入点的改进。

但是，由于网络不能同时加密和未加密，因此需要 2 个独立的接口配置，以便为不支持 OWE 的旧设备提供连接，并为支持 OWE 的设备提供 OWE 的优势。

这种配置称为 OWE 过渡模式。

```ros
/interface/wifi
add master-interface=wifi1 name=wifi1_owe configuration.ssid=MikroTik_OWE security.authentication-types=owe security.owe-transition-interface=wifi1 configuration.hide-ssid=yes
set wifi1 configuration.country=Latvia configuration.ssid=MikroTik security.authentication-types="" security.owe-transition-interface=wifi1_owe
enable wifi1,wifi1_owe
```

采用这种设置时，AP 将广播两个 SSID → 可见的 `MikroTik` SSID 应具有“未加密”访问（适用于不支持 OWE 的旧设备），隐藏的 SSID `MikroTik_OWE` 应具有“OWE”安全性（不受密码保护，但已加密）。客户端设备不会在客户端的 WiFi 列表中看到隐藏的 `MikroTik_OWE` SSID，但可见 `MikroTik` SSID 的信标数据包会通过“OWE Transition mode”参数（在信标数据包中）通告到隐藏 `MikroTik_OWE` 网络的链路。因此，客户端设备应通过 `owe-transition-interface` 设置优先连接到“OWE”网络。

支持 OWE 的客户端设备会优先选择 OWE 接口。如果在注册表中看不到任何与常规开放 AP 关联的设备，可以考虑从过渡模式设置转为运行单个 OWE 加密接口：

```ros
/interface/wifi
set wifi1 configuration.country=Latvia configuration.ssid=MikroTik_OWE security.authentication-types=owe
```

:::info
802.11r（快速漫游）不适用于 OWE 网络。
:::

### 重置配置 {#resetting-configuration}

可以使用 'reset' 命令重置 WiFi 接口配置。

```ros
/interface/wifi/reset wifi1
```

可以使用 'reset-mac-address' 命令将物理接口的 MAC 地址重置为默认值。

```ros
/interface/wifi/reset-mac-address wifi1
```

## 配置配置文件 {#configuration-profiles}

WiFi 的新增功能之一是配置配置文件。你可以创建各种预设，并按需分配给接口。WiFi 的配置设置根据本页面末尾的参数分组归入 **profiles**：**aaa**、**channel**、**configuration**、**datapath**、**interworking** 和 **security**，然后可以分配给接口。**Configuration** **profiles** 也可以包含其他配置文件，以及来自其他类别的单独参数。

这种可选的灵活性旨在让每个用户都能以最适合自己的方式组织配置，但也意味着每个参数在配置的不同部分中可能分配有不同的值。

以下优先级决定使用哪个值：

1. 接口设置中的值。
2. 分配给接口的配置文件中的值。
3. 分配给接口的配置配置文件中的值。
4. 分配给配置配置文件的配置文件中的值（而该配置配置文件又分配给接口）。

如果你在任何时候不确定接口将使用哪个参数值，可以执行 `/interface/wifi/print detail`。`print` 命令将显示接口将具有的所有值，包括继承的值。

要仅查看直接在接口上配置的值，而不显示继承的值，请使用 `/interface/wifi/print config`。

有关配置配置文件用法的示例，请参阅以下内容（双频家庭 AP 示例）：

```ros
# Creating a security profile, which will be common for both interfaces
/interface/wifi/security
add name=common-auth authentication-types=wpa2-psk,wpa3-psk passphrase="diceware makes good passwords" wps=disable
# Creating a common configuration profile and linking the security profile to it
/interface/wifi/configuration
add name=common-conf ssid=MikroTik country=Latvia security=common-auth
# Creating separate channel configurations for each band
/interface/wifi/channel
add name=ch-2ghz frequency=2412,2432,2472 width=20mhz
add name=ch-5ghz frequency=5180,5260,5500 width=20/40/80mhz
# Assigning to each interface the common profile as well as band-specific channel profile, in case of "no supported channels" message on interfaces, make sure that correct (channel) configuration is applied to each.
set wifi1 channel=ch-5ghz configuration=common-conf disabled=no
set wifi2 channel=ch-2ghz configuration=common-conf disabled=no

#"print detail" will show all values that the interface will use, including inherited ones
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
#using "print detail config" will show only the values that were directly configured on the interface
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
`print detail` 和 `print detail config` 也可用于 `/interface/wifi/configuration`，其工作方式与 `/interface/wifi/` 菜单中相同。
:::

## Network

`/interface/wifi/network` 菜单将 SSID、安全、数据路径和无线设置捆绑到一个配置实体中。网络适用于与其 `labels` 匹配的 WiFi 接口。如果未指定 `labels`，则网络的配置将应用于所有接口。

有关网络配置用法的示例，请参阅以下内容：

```ros
# Creating a network preset with SSID, security and datapath settings, which gets applied to all available interfaces
/interface/wifi/network
add ssid=MikroTik mode=ap security.authentication-types=wpa2-psk,wpa3-psk security.passphrase="strong_password" datapath.bridge=bridge1 disabled=no

# Create a network radio preset, which gets applied to the whole radio.
/interface/wifi/network/radio
add configuration.country=Latvia
```

启用 Multi-Link Operation（MLO）的示例：

```ros
/interface/wifi/network
add datapath.bridge=bridge1 disabled=no mlo=yes mode=ap security.authentication-types=wpa3-psk ssid="MikroTik" security.passphrase="strong_password"
```

| 属性 | 说明 |
| :-- | :-- |
| **mlo**（*no* \| *yes；默认：**yes***） | 为 Wi-Fi 7 启用 Multi-Link Operation。 |
| **labels**（*以英文逗号分隔的字符串*） | 在匹配任意所提供标签的无线电上启用网络配置。 |
| **ssid**（*字符串*） | 无线网络名称（ESSID）。 |
| **mode**（*ap* \| *station* \| *station-bridge* \| *station-pseudobridge*；默认：**ap***） | 接口工作模式。 |
| **disabled**（*no* \| *yes；默认：**no***） | 网络是否禁用。 |

所有安全、认证和加密参数（passphrase、WPA3/SAE、EAP 等）使用 [Security Properties](#security-properties) 中所述的相同属性。Datapath 参数（网桥、VLAN、客户端隔离、流量处理）遵循 [Datapath Properties](#datapath-properties)。

### 网络无线电属性 {#network-radio-properties}

`/interface/wifi/network/radio` 下的按无线电设置：

| 属性 | 说明 |
| :-- | :-- |
| **labels**（*对象*） | 将无线电配置匹配到具有指定标签的物理无线电。 |
| **extra-labels**（*多字符串*） | 用于匹配的附加标签，扩展主 `labels` 字段。 |
| **disabled**（*no* \| *yes；默认：**no***） | 无线电条目是否禁用。 |

无线电参数（国家、频段、频率、宽度、链路、功率等）使用 [Channel Properties](#channel-properties) 和 [Configuration Properties](#configuration-properties) 中所述的相同属性。

## 访问列表 {#access-list}

访问列表提供多种过滤和管理无线连接的方式。

RouterOS 会检查每个新连接，查看其参数是否与任何访问列表规则中指定的参数匹配。

规则按其在列表中的出现顺序检查。每个连接仅应用首个匹配规则中指定的管理操作。

已被访问列表规则接受的连接将定期检查，以确认其是否仍符合允许的 **time、days** 和 **signal-range**。如果不符合，连接将被终止。

:::warning
编写拒绝客户端的访问列表规则时请谨慎。客户端设备被 AP 反复拒绝后，可能会开始避开该 AP。如果未先为接口配置 pvid 值，则无法通过访问列表为 wifi-qcom-ac 接口的客户端设置 VLAN ID。
:::

访问列表有两类参数：[过滤](#access-list)和[操作](#access-list)。过滤属性仅用于匹配应应用访问列表规则的客户端。操作参数可以更改该特定客户端的连接参数，并可能使用访问列表规则中指定的参数覆盖其默认连接参数。

### MAC 地址认证 {#mac-address-authentication}

MAC 地址认证通过 **query-radius** 操作实现，是一种使用 RADIUS 服务器实现客户端 MAC 地址集中白名单的方式。

当客户端设备尝试关联到配置为执行 MAC 地址认证的 AP 时，AP 会向 RADIUS 服务器发送 access-request 消息，并将设备 MAC 地址作为用户名，密码为空。如果 RADIUS 服务器对此类请求回复 access-accept，AP 将继续执行接口配置的常规认证过程（口令或 EAP 认证）。

### 访问规则示例 {#access-rule-examples}

仅在工作时间接受附近设备连接到访客网络：

```ros
/interface/wifi/access-list/print detail
Flags: X - disabled 
 0   signal-range=-60..0 allow-signal-out-of-range=5m ssid-regexp="MikroTik Guest" time=7h-19h days=mon,tue,wed,thu,fri action=accept

 1   ssid-regexp="MikroTik Guest" action=reject 
```

拒绝来自本地管理的（“匿名”/“随机化”）MAC 地址的连接：

```ros
/interface/wifi/access-list/print detail
Flags: X - disabled
 0   mac-address=02:00:00:00:00:00 mac-address-mask=02:00:00:00:00:00 action=reject
```

为特定客户端分配不同的口令很有用，如果你需要向某个客户端提供无线访问，但不想共享无线密码，也不想创建单独的 SSID。当匹配的客户端连接到该网络时，访问列表将使该客户端使用不同的密码，而不是接口配置中定义的密码。只需确保该特定客户端不会先被更通用的访问列表规则匹配。

或者拒绝所有未知 MAC 地址，可将其作为最终规则添加到访问列表末尾。如果只想允许特定客户端接入网络，请务必在 access-list 末尾添加拒绝规则，因为默认没有隐式拒绝规则。

```ros
/interface/wifi/access-list
add action=accept disabled=no mac-address=22:F9:70:E5:D2:8E interface=wifi1 passphrase=StrongPassword
```

## 频率扫描 {#frequency-scan}

`/interface/wifi/frequency-scan wifi1` 命令提供有关可用信道上 RF 状况的信息，可通过运行 frequency-scan 命令获取。该信息用于估算频谱使用情况，有助于找到不太拥挤的频率。

![](/img/b57fb1af479c697c.png)

:::info
运行频率扫描会断开所有已连接的客户端，或者当接口处于 station 模式时，会断开与 AP 的连接。
:::

## Scan 命令 {#scan-command}

`/interface/wifi/scan` 命令会扫描接入点，并输出检测到的所有 AP 的信息。它不会显示每个信道的频率使用情况，但会显示所有正在发送的接入点。可以使用“connect”按钮发起与特定 AP 的连接。

scan 命令采用与 frequency-scan 命令相同的所有参数。
![](/img/296804ab8faca3df.png)

## Sniffer

sniffer 命令会在无线接口上启用 monitor 模式。这会将接口转变为接收所有 WiFi 传输的被动接收器。  
该命令会持续输出有关接收到的数据包的信息，并可将其本地保存为 pcap 文件，或使用 TZSP 协议进行流式传输。

sniffer 将在所选接口配置的信道上运行。

![](/img/0ecc1c29a0286bab.png)

## 频谱扫描 {#spectral-scan}

spectral scan 可以扫描 wifi 接口支持的频率，并直接在控制台中绘制这些频率。

:::info
频谱扫描仅受 wifi-qcom 驱动支持；wifi-qcom-ac 驱动不支持。
:::

```ros
/interface/wifi/spectral-scan <wifiinterface name> range=
```

![](/img/cb53652d1a12ce6b.png)

该命令持续监控频谱数据。该命令使用与 `spectral-history` 相同的数据源，并共享许多参数。

要使用频谱扫描，必须使用 `range=` 属性。

每行显示一个频谱图桶 —— 频率、幅度（dBm）、峰值和一个字符图形条。图形条使用 ':' 字符显示功率值，使用 '.' 字符显示平均峰值保持。

`data` - min/max/avg，默认使用 average 作为数据。大多数场景应使用平均值，但在某些情况下，“min”可用于检查是否存在持续输出信号的频率。Max 表示扫描间隔期间检测到的最强信号，类似于峰值。  
`duration` - 在指定时间后终止命令。默认为无限期；  
`freeze-frame-interval` - 更新命令输出的时间间隔  
`interval` - 更新主要数据值的间隔，不更新峰值  
`peak-mode` - avg/max/disabled - 峰值反映 peak-hold-duration 期间的最强信号。默认使用“avg”。它是“peak-hold-duration”期间最大值的平均值。如果使用“max”，则显示最高值，直到下一次“peak-hold-duration”更新。  
`peak-hold-duration` - 更改 peak-mode 使用的峰值保持时长，默认为 5 秒。  
`range` - 扫描指定范围，必需；  
`resolution` - 频谱扫描的频率步长  
`show-interference` - yes/no

可能的干扰分类类型：

- 微波炉（`MWO`）。
- 连续波（`CW`）。
- WLAN（宽带）（`WIFI`）。
- 2.4 无绳电话（`CORDLESS24`）。
- 5 无绳电话（`CORDLESS5`）。
- 蓝牙（`BLUETOOTH`）。
- 跳频扩频（`FHSS`）。

## 频谱历史 {#spectral-history}

```ros
/interface/wifi/spectral-history <wifi interface name> range=
```

![](/img/407c01ab7a981996.png)

绘制频谱图。落在不同范围内的功率值会以不同颜色的字符打印，前景色和背景色相同，因此可以复制并粘贴此命令的终端输出。

`data` - min/max/avg，默认使用平均值作为数据。大多数场景应使用平均值，但在某些情况下，“min”可用于检查是否存在具有恒定信号输出的频率。Max 将显示检测到的最强信号，而不是平均信号。  
`interv` - 更新数据值的间隔；  
`interval` - 打印频谱图行的间隔；  
`duration` - 在指定时间后终止命令。默认为无限期；  
`range` - 扫描特定范围，必需；  
`resolution` - 频率步长；  
`show-interference` - yes/no

可能的干扰分类类型：

- 微波炉（`O`）。
- 连续波（`C`）。
- WLAN（宽带）（`W`）。
- 无绳电话 2.4（`T`）。
- 无绳电话 5（`T`）。
- 蓝牙（`BB`）。
- 跳频扩频（`F`）。

## WPS

### WPS 客户端 {#wps-client}

wps-client 命令用于从启用 WPS 的 AP 获取认证信息。

```ros
/interface/wifi/wps-client/wifi1
```

### WPS 服务器 {#wps-server}

通过运行以下命令，可使 AP 在 2 分钟内接受客户端设备的 WPS 认证。

```ros
/interface/wifi/wps-push-button wifi1
```

## Radios

可以通过运行 `/interface/wifi/radio/print detail` 命令获取每个 radio 的能力信息。查看接口支持的频段和可选信道时，该命令很有用。应用到接口的国家配置文件会影响结果。

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

虽然 Radio 信息会提供支持的信道宽度信息，但也可以从产品页面推断该信息。为此，需要检查以下参数：**number of chains**、**max data rate**。了解这些参数后，需要查看调制与编码方案（MCS）表，例如：[https://mcsindex.com/](https://mcsindex.com/)。

以 hAP ax <sup>2</sup> 为例，可以看到 number of chains 为 2，max data rate 在 MCS 表中为 1200 - 1201。在 MCS 表中，需要查找 2 spatial streams - chains 对应的条目以及相应的数据速率，本例显示最大支持的信道宽度为 80MHz。

## 注册表 {#registration-table}

`/interface/wifi/registration-table/` 显示已连接无线客户端的列表及其详细信息。

![](/img/0a33a5fa049e4b23.png)

### De-authentication

可以通过从 registration table 中删除无线对端来手动取消其认证（强制重新关联）。

```ros
/interface/wifi/registration-table/remove [find where mac-address=02:01:02:03:04:05]
```

## WiFi CAPsMAN

用于新 WiFi 菜单的 CAPsMAN（Controlled Access Point system Manager）可让你从中央控制器向多台 MikroTik WiFi AP 应用无线设置。请参阅专页：[WiFi CAPsMAN](/docs/wireless/capsman)。

## 高级示例 {#advanced-examples}

[Enterprise wireless security with User Manager v5](/docs/wireless/user-guides/enterprise-wireless-security-user)

## 替换“wireless”软件包 {#replacing-wireless-package}

部分 MikroTik Wi-Fi 5 AP 的接口由“wireless”菜单管理，可以将“wireless”软件包替换为“wifi-qcom-ac”软件包，使接口改为兼容“wifi”菜单。

为此，需要先卸载“wireless”软件包，然后安装“wifi-qcom-**ac**”。

:::info
请注意，“wifi-qcom-ac”驱动占用的资源更多。使用新软件包时，可用 RAM 会减少，请牢记这一点。
:::

### Compatibility

wifi-qcom-**ac** 软件包包含适用于 IPQ4018/4019 和 QCA9984 射频的替代驱动，使其兼容 WiFi 配置菜单。有关可能的 wifi-qcom-ac/wifi-qcom/wireless 软件包组合，请参阅 [此处](/docs) 的软件包类型章节。

通常，该软件包兼容采用 ARM CPU 的 802.11ac 产品。它不兼容任何采用 MIPS CPU 的 802.11ac 产品。

| 兼容性 | 设备 |
| :-- | :-- |
| 兼容 | Audience，Audience LTE kit，Chateau（D53 的所有变体），hAP ac<sup>2</sup>，hAP ac<sup>3</sup>，cAP ac，cAP XL ac，LDF 5 ac，LHG XL 5 ac，LHG XL 52 ac，NetMetal ac<sup>2</sup>，mANTBox 52 15s，wAP ac（RBwAPG-5HacD2HnD），SXTsq 5 ac |
| 不兼容 | RB4011iGS+5HacQ2HnD-IN（不支持 2.4GHz 接口），Cube 60Pro ac（不支持 60GHz 接口），wAP ac（RBwAPG-5HacT2HnD）和**所有其他采用 MIPSBE CPU 的设备** |

### Benefits

- WPA3 身份验证和 OWE（机会性无线加密）。
- 802.11w 标准管理帧保护。
- 802.11r/k/v。
- MU-MIMO 和波束成形。
- IPQ4019 接口在 2.4GHz 频段的最大数据速率为 400Mb/s。

:::info
这些优势同时适用于 wifi-qcom 和 wifi-qcom-ac 软件包。
:::

### 缺失的功能 {#lost-features}

使用与“wifi”管理接口兼容的驱动程序运行 802.11ac 产品时，会失去以下重要功能：

- Nstreme 和 Nv2 无线协议。
- 无线设置中的 VLAN 配置（可在网桥设置中配置每接口 VLAN）。
- 与“wireless”软件包中实现的 station-bridging 兼容。Station-bridge 仅在同一类型的驱动程序之间工作。WiFi 到 WiFi，以及 [Wireless](/docs) 到 Wireless。

## 属性参考 {#property-reference}

### AAA 属性 {#aaa-properties}

此类别中的属性用于配置接入点与 AAA（RADIUS）服务器的交互。

下表中的某些参数采用 *format-string* 作为值。在 *format-string* 中，某些字符按以下方式解释：

| 字符 | 解释 |
| :-- | :-- |
| a | 组成客户端设备 MAC 地址的十六进制字符，小写 |
| A | 组成客户端设备 MAC 地址的十六进制字符，大写 |
| i | 组成 AP 接口 MAC 地址的十六进制字符，小写 |
| I（大写 'i'） | 组成 AP 接口 MAC 地址的十六进制字符，大写 |
| N | AP 接口的完整名称（例如“wifi1”） |
| S | 完整的 SSID |

所有其他字符均按原样使用，不进行任何解释。有关示例，请参阅默认值。

| 属性 | 描述 |
| :-- | :-- |
| **called-format** (*format-string*；*默认值：**II-II-II-II-II-II:S***) | AP 向 RADIUS 服务器发送的消息中 Called-Station-Id RADIUS 属性值的格式。 |
| **calling-format** (*format-string*；*默认值：**AA:AA:AA:AA:AA:AA***) | AP 向 RADIUS 服务器发送的消息中 Calling-Station-Id RADIUS 属性值的格式。 |
| **interim-update** (*time interval*；默认值：****5m****) | 向 RADIUS 服务器发送流量计费中间更新的间隔。 |
| **mac-caching** (*time interval*；*默认值：**disabled***) | 启用 MAC 地址认证时缓存 RADIUS 服务器回复的时长。这可解决因 RADIUS 服务器回复延迟相对较高而导致客户端设备认证超时的问题。 |
| **name** (*string*；*默认值：**no***) | AAA 配置文件的唯一名称。 |
| **nas-identifier** (*string*) | AP 向 RADIUS 服务器发送的消息中 NAS-Identifier 属性的值。默认为设备的主机名（/system/identity）。 |
| **password-format** (*format-string*) | 执行 MAC 地址认证时，AP 向 RADIUS 服务器发送的消息中用于计算 User-Password 属性值的格式。<br/> 默认值：""（空字符串）。 |
| **username-format** (*format-string*；*默认值：**AA:AA:AA:AA:AA:AA***) | 执行 MAC 地址认证时，AP 向 RADIUS 服务器发送的消息中 User-Name 属性值的格式。 |

### 信道属性 {#channel-properties}

此类别中的属性用于指定所需的无线电信道。

| 属性 | 说明 |
| :-- | :-- |
| **band** (*2ghz-g* \| *2ghz-n* \| *2ghz-ax*\| *2ghz-be* \| *5ghz-a* \| *5ghz-ac* \| *5ghz-an* \| *5ghz-ax* \| *5ghz-be*\| *6ghz-ax* \| *6ghz-be*) | AP 将使用的频段和无线标准。默认使用支持的最新标准。<strong>请注意，频段支持受无线设备能力限制。</strong><br/> |
| **deprioritize-unii-3-4** (*no* \| *yes*) | 是否降低控制频率为 5720 或 5825-5885 MHz 的信道优先级。部分客户端设备不支持这些信道，因此不希望自动选择它们。在 ETSI 监管域中默认为 'yes'，其他地区默认为 'no'。 <br/> |
| **frequency** (*list of numbers or number ranges*) | 对于 AP 模式下的接口，指定选择控制信道中心频率时要考虑的频段（以 MHz 为单位）。 <br/> 对于 station 模式下的接口，指定扫描 AP 的频段。 <br/> 留空（默认）时，将考虑无线设备支持且适用监管配置允许的所有频段。 <br/> 该参数可以包含 1 个或多个以英文逗号分隔的十进制数值，也可以选择使用 RangeBeginning-RangeEnd:RangeStep 语法表示的数值范围 <br/> 有效的 channel.frequency 值示例： <br/><ul><li>2412</li><li>2412,2432,2472</li><li>5180-5240:20,5500-5580:20</li></ul> |
| **preamble-puncturing** (*no \| yes; Default: **no***) | <br/> 在此接口上启用针对 DFS/雷达的打孔支持（仅 802.11be）。 <br/> 启用后，当检测到雷达信号时，接入点可以仅禁用（“打孔”）80/160 MHz 宽信道中受影响的 20 MHz 部分，而不是切换整个信道。 <br/> 对于 80 MHz 信道，可以打孔一个 20 MHz 子信道。对于 160 MHz 信道，可以打孔一个 20 MHz 子信道或一个 40 MHz 块。 <br/><br/> 当前打孔状态可在该接口的 <code>/interface/wifi/monitor</code> 输出中查看，被打孔的子信道用字母 <code>o</code> 标记。 <br/> |
| **reselect-interval** (*time interval; Default: **disabled***) | 指定接口运行“重新扫描信道可用性”并选择最合适信道的间隔。指定间隔后，系统将以动态和随机方式选择该间隔。这有助于避免多个 AP 同时扫描网络、选择同一信道并同时优先使用该信道的情况。reselect-interval 使用后台扫描。 <br/> 重新选择过程将考虑信道中的网络数量、信道利用率以及与相邻信道中网络的重叠情况，选择最合适的信道。它可与已定义的频段列表一起使用，也可在未设置 <code>frequency</code> 时使用所有支持的频段。 <br/> 示例： <br/><ul><li>01:00..01:30 → 将信道重新扫描设置为每 1 小时加最多 30 分钟的随机时间运行一次。第一次可能在“1 小时 15 分钟”后运行重新扫描，之后可能是“1 小时 1 秒”，再之后可能是“1 小时 29 分 59 秒”……随机情况下，重新扫描会在每 1 小时至 1 小时 30 分钟之间发生。</li></ul> |
| **reselect-time** (*time interval; Default: **disabled***) | 指定接口运行“重新扫描信道可用性”并选择最合适信道的时钟时间。指定时钟时间后，系统将以动态和随机方式选择该时间。这有助于避免多个 AP 同时扫描网络、选择同一信道并同时优先使用该信道的情况。reselect-time 使用后台扫描。 <br/> 重新选择过程将考虑信道中的网络数量、信道利用率以及与相邻信道中网络的重叠情况，选择最合适的信道。它可与已定义的频段列表一起使用，也可在未设置 <code>frequency</code> 时使用所有支持的频段。 <br/> 示例： <br/><ul><li>01:00..01:30 → 将信道重新扫描设置为每晚在系统时钟时间 01:00 AM 至 01:30 AM 之间随机运行一次。</li><li>14:00..14:30 → 将信道重新扫描设置为每天（中午之后）在系统时钟时间 14:00:00 至 14:30:00（或 2 PM 至 2:30 PM）之间随机运行一次。</li></ul> |
| **secondary-frequency** (*list of integers* \| *Default: **disabled***) | 对于分离的 80+80MHz 信道，指定辅助 80MHz 段允许的中心频率。 <br/> 对于 320MHz 信道，指定允许的 320MHz 信道中心频率。 <br/> 未设置（默认）时，不限制信道选择。 <br/> 例如 <br/> 'width=20/40/80+80mhz frequency=5180' 将允许信道 42 与任何其他支持的 80MHz 信道组合。'width=20/40/80+80mhz frequency=5180 secondary-frequency=5530' 将只允许组合信道 42 和 106。 <br/> 'width=20/40/80/160/320mhz frequency=6115' 将允许使用信道 31 或 63。 <br/> 'width=20/40/80/160/320mhz frequency=6115 secondary-frequency=6265' 仅允许使用信道 63。 <br/> 有关有效 <a href="https://en.wikipedia.org/wiki/List_of_WLAN_channels#5_GHz_(802.11a/h/n/ac/ax/be)" target="_blank" rel="noopener noreferrer">5GHz</a> 和 <a href="https://en.wikipedia.org/wiki/List_of_WLAN_channels#6_GHz_(802.11ax_and_802.11be)" target="_blank" rel="noopener noreferrer">6GHz</a> 信道列表，请参阅此处。 |
| **skip-dfs-channels**  (*10min-cac* \| *all* \| *disabled; Default: **disabled***) | 是否避免使用需要进行信道可用性检查（侦听雷达信号）的信道。 <br/><ul><li><em>10min-cac</em> - 接口将避免使用需要进行 10 分钟 CAC 的信道</li><li><em>all </em>- 接口将避免使用所有需要进行 CAC 的信道</li><li><em>disabled</em> - 接口可以选择任何支持的信道，无论 CAC 要求如何</li></ul> |
| **width** ( *20mhz* \| *20/40mhz* \| *20/40mhz-Ce* \| *20/40mhz-eC* \| *20/40/80mhz* \| *20/40/80+80mhz* \| *20/40/80/160mhz*\| *20/40/80/160/320mhz*) | 无线信道宽度。默认使用无线硬件支持的最宽信道。 |

### 配置属性 {#configuration-properties}

本节包含与接口及相关无线设备运行有关的属性。

| 属性 | 说明 |
| :-- | :-- |
| **antenna-gain** (*integer 0..30*) | 覆盖默认天线增益。每个无线设备的 <em>master</em> 接口会为使用该无线设备的每个接口设置天线增益。 <br/> 该设置不能将天线增益设置为低于无线设备的最小天线增益。无默认值。 <br/> |
| **beacon-interval** (*time interval 100ms..1s; default: **100ms***) | AP 的信标帧间隔。 <br/><br/>🛈 <strong>重要：</strong>802.11 标准以 <em>时间单位</em> 定义信标间隔（1 TU = 1.024 ms）。实际信标间隔为每配置 1 ms 对应 1 TU。 <br/><br/>⚠️ <strong>警告：</strong>在同一无线设备上运行的每个 AP（即 master AP 及其所有“虚拟”/“slave” AP）必须使用相同的信标间隔。 <br/> |
| **chains** (*list of integer 0..7* ) | 用于接收信号的[无线链路](https://en.wikipedia.org/wiki/RF_chain)。默认使用相应无线硬件可用的所有链路。 |
| **country** (*name of a country; default: **Latvia***) | 确定对接口应用哪个监管域限制。 <br/><br/>⚠️ <strong>警告：</strong>正确设置该值对于遵守当地法规并确保与其他设备的互操作性非常重要。 <br/><br/>在受控环境中，或如果你所在地区拥有特殊使用许可，可以选择 <code>country=Superchannel</code>（使用该国家配置时，路由器的 Tx 输出功率不受软件限制，除非手动配置较低的 <code>tx-power</code>，否则路由器将以硬件芯片允许的最大功率输出）。不适用于 <strong>wifi-qcom-ac</strong> 驱动。 |
| **distance** () | 最大链路距离，单位为公里，远距离室外链路需要设置该值。该值应反映到距离设备最远的 AP 或 station 的距离。未配置时允许使用 2 km 链路。 <br/><br/>⚠️ <strong>警告：</strong>wifi-qcom-ac 软件包不使用 <code>distance</code>。将 <code>distance</code> 设置为高于实际需要的值可能会对吞吐量和延迟产生不利影响。 <br/> |
| **dtim-period** (*integer 1..255; default: **1***) | DTIM 是信标帧的一部分，用于通知省电（休眠）station 有传入的组播和广播流量。 <br/> 该设置配置当有处于省电模式的客户端设备连接到 AP 时，发送组播或广播流量的周期。以信标间隔的倍数表示（例如，使用默认值 <code>dtim-period=1</code> 和 <code>beacon-interval=100ms</code> 时，每 1 x 100 ms = 100 ms 发送一次）。 <br/> 较高的值使客户端设备能够节省更多电量，但会增加网络延迟。较低的值使客户端更频繁地唤醒，从而消耗更多电量。 |
| **hide-ssid** (*no \| yes; default: **no***) | <ul><li><em>yes</em> - AP 不在信标帧中包含其 SSID，并且不回复 SSID 为广播的探测请求。</li><li><em>no</em> - AP 在信标帧中包含其 SSID，并回复 SSID 为广播的探测请求。</li></ul> |
| **hw-protection-mode** (*cts-to-self* \| none \| *rts-cts)* | 为减少帧冲突，可以使用： <br/><ul><li><em>cts-to-self</em> - 接口在发送 MPDU 前向自身地址发送 CTS 帧（通知附近设备避免相互冲突）；</li><li><em>none </em> - 接口不使用任何硬件保护机制；</li><li><em>rts-cts -</em> 接口在每个 MPDU 前发送 RTS 帧（RTS 后接收方发送 CTS，随后进行通信——RTS 和 CTS 帧都可以阻止其他设备发送）；</li></ul> 默认（未设置）：接口在重传的 MPDU 前发送 RTS 帧。 |
| **installation** (*indoor*\|*outdoor*; *default*: **indoor**) | 安装在室外的设备将避免使用仅限室内使用的无线信道。 |
| **manager** (*capsman* \|*capsman-or-local* \| *local*; default: **local**) | capsman - 接口仅作为 CAP 运行；此选项<strong>不应</strong>通过 provisioning 规则传递给 CAP <br/> capsman-or-local - 接口通过 CAPsMAN 获取配置，或者当 <code>/interface/wifi/cap</code> 未启用时使用自身配置。 <br/> local - 接口不会联系 CAPsMAN 获取配置。 |
| **max-clients** (*integer 1..1000; default: **1000**)* | 关联客户端的最大数量。 |
| **mode** (*ap* \| *station*) | 接口工作模式 <br/><ul><li><em>ap</em>（默认）- 接口作为接入点运行</li><li><em>station</em> - 接口作为客户端设备运行，扫描通告所配置 SSID 的接入点</li><li>station-bridge - 接口作为客户端设备运行，并启用对 4 地址帧格式的支持，使该接口可用作网桥端口</li><li>station-pseudobridge - 接口跟踪传出 IP 连接，并执行类似 IP 伪装的 MAC 地址转换</li></ul><br/>🛈 <strong>重要：</strong>“wifi”station-bridge 模式与运行旧版“wireless”软件包的 AP 不兼容，反之亦然。 <br/><br/> |
| **multicast-enhance** (*enabled*\| *disabled; default: **disabled***) | 启用 multicast-enhance 功能后，AP 会将每个组播地址的 IP 或 IPv6 数据包转换为发送给每个已连接 station 的多个单播地址帧。这可以提高链路吞吐量和可靠性，因为与组播帧不同，单播帧会由 station 确认，并使用更高的数据速率发送。 |
| **qos-classifier** (*dscp-high-3-bits*\| *priority; default: **priority***) | 指定遵循哪套 WMM 规则。AP 和客户端根据分配给数据包的优先级进行分类（依据 WMM 规范）→ 1,2 - background；0,3 - best effort；4,5 - video；6,7 - voice。“更好”的访问类别获得介质访问的概率更高（例如，语音帧在介质变为“空闲”后的“退避”时间更短，从而更可能比“较差”类别的帧更早发送）。 <br/><ul><li>dscp-high-3-bits - 接口将使用等于 IP DSCP 字段最高 3 位值的 WMM 优先级发送数据包</li><li>priority - 接口将使用由 IP 防火墙或网桥过滤器设置的 WMM 优先级发送数据包<br/></li></ul><br/>🛈 <strong>重要：</strong>802.11ac 无线芯片组不支持 dscp-high-3-bits 分类器模式。对于 802.11ac 接口，请参阅 <a href="/docs/bridging-and-switching/user-guides/wmm-and-vlan-priority#set-vlan-or-wmm-priority-from-dscp">从 DSCP 设置优先级</a>。 <br/><br/> |
| **ssid** *(string; default: **no**)* | 无线网络名称，即 (E)SSID。 |
| **station-roaming** *(no \| yes; Default: **no**)* | 运行在 station 或 station-bridge 模式的 Wifi 接口将定期扫描可漫游到的候选 AP。到 AP 的信号越弱，扫描越频繁。如果找到信号更好的 AP，station 将漫游到该 AP。支持 FT，并且当 `steering.wnm` 启用时，station 将响应 BSS Transition Request。 |
| **tx-chains** (*list of integer 0..7*) | 用于发送信号的[无线链路](https://en.wikipedia.org/wiki/RF_chain)。默认使用相应无线硬件可用的所有链路。 |
| **tx-power** (*integer 0..40*) | 接口发射功率限制，单位为 dBm。不能用于设置高于监管配置所施加限制的功率。默认未设置。 |

### Datapath 属性 {#datapath-properties}

与无线客户端设备之间转发数据包相关的参数。

| 属性 | 说明 |
| :-- | :-- |
| **bridge** (*bridge interface*) | 要将接口作为网桥端口添加到的网桥接口。虚拟（“slave”）接口默认会添加到与对应 master 接口相同的网桥（如果有）。master 接口默认不会添加到任何网桥。 |
| **bridge-cost** (*integer; default: **10***) | 添加为网桥端口时要使用的网桥端口开销。 |
| **bridge-horizon** (*none* \| *integer; default: **none**)* | 添加为网桥端口时要使用的网桥 horizon。 |
| **client-isolation** (*no* \| *yes; default: **no***) | 确定连接到此接口的客户端设备是否（默认）与其他设备隔离。可以通过 access list 规则按客户端覆盖此策略，因此 AP 可以同时包含隔离和非隔离客户端。来自隔离客户端的流量不会转发给其他客户端，来自非隔离客户端的单播流量也不会转发给隔离客户端。 |
| **interface-list** (*interface list; default: **no***) | 要将接口添加为成员的接口列表。 |
| **traffic-processing** (*on-cap \| on-capsman \| on-capsman-secure*) | 🛈 <strong>重要：</strong>此设置仅从 <strong>7.21beta2</strong> 版本开始可用。 <br/><ul><li><code>on-cap</code> 将使 CAP 自身负责处理所有 WiFi 流量（与任何独立 AP 相同）；</li><li><code>on-capsman</code> 将使 CAP 的 WiFi 流量转发到通往 CAPSMAN 的伪隧道，并由 CAPsMAN 负责处理 CAP 的流量；</li><li><code>on-capsman-secure</code> 将使 CAP 的 WiFi 流量转发到通往 CAPSMAN 的加密伪隧道，并由 CAPsMAN 负责处理 CAP 的流量。</li></ul><br/> 🛈 <strong>重要：</strong>使用 <code>traffic-processing=on-capsman</code> 设置时，请注意，由于 CAP 的所有 WiFi 流量现在都由 CAPsMAN 处理（被推送到 CAPsMAN），因此将增加 CAPSMAN 的资源消耗（CPU 和 RAM 使用率）。 <br/><br/> |
| **vlan-id** (none \| integer 1..4095; default: **none**) | 分配给连接到此接口的客户端设备的默认 VLAN ID（仅与 AP 模式下的接口相关）。为客户端分配 VLAN ID 后，来自该客户端的流量会自动打上该 ID 的标签，并且仅将带有该 ID 标签的数据包转发给该客户端。 <br/><br/> ⚠️ <strong>警告：</strong>802.11ac 芯片组不支持此类 VLAN 标记，但可以在网桥设置中将其<a href="/docs/bridging-and-switching#vlan-example-trunk-and-access-ports">配置</a>为 VLAN access 端口。 <br/> |

### 安全属性 {#security-properties}

与认证相关的参数。

| 属性 | 说明 |
| :-- | :-- |
| **authentication-types** (*list of wpa-psk, wpa2-psk, wpa2-psk-sha2, wpa-eap, wpa2-eap, wpa3-psk, owe, wpa3-eap, wpa3-eap-192*) | 要在接口上启用的认证类型。<br/> 默认值为空列表（不认证，开放网络）。<br/> 配置 passphrase 会将 <em>wpa2-psk</em> 认证方法添加到默认列表（接口为 AP 时），或同时将 <em>wpa-psk</em> 和 <em>wpa2-psk</em> 添加到默认列表（接口为 station 时）。<br/> 配置 <em>eap-username</em> 和 <em>eap-password</em> 会将 <em>wpa-eap 和 wpa2-eap</em> 认证方法添加到默认列表。 |
| **beacon-protection** (*disabled*\| *enabled*) | 是否启用信标完整性保护。支持情况取决于 'beacon-protection' 无线能力。<br/> 802.11be 接口默认启用。 |
| **connect-group** ( *string*) | 同一 connect group 内的 AP 不允许多个具有相同 MAC 地址的客户端设备连接。这是为了防止恶意授权用户截获发往其他用户的流量（“MacStealer”攻击），或通过伪造受害者 MAC 地址发起拒绝服务攻击。<br/> 对具有重复 MAC 地址的新连接的处理方式取决于相关 AP 接口的 connect-priority。<br/> 默认情况下，所有 AP 都被分配相同的 connect-group。 |
| **connect-priority** (accept-priority/hold-priority (*integers*)) | 当客户端设备的 MAC 地址与另一 AP 上某个活动连接的 MAC 地址相同时，这些参数决定如何处理该连接。<br/>如果（AP2 的 accept-priority）&lt;（AP1 的 hold-priority），连接到 AP2 会导致客户端从 AP1 断开。<br/> 如果（AP2 的 accept-priority）=（AP1 的 hold-priority），只有当无法再通过 AP1 访问该 MAC 地址时，才允许连接到 AP2。<br/> 如果（AP2 的 accept-priority）&gt;（AP1 的 hold-priority），将不接受连接到 AP2。<br/><br/> 如果省略，hold-priority 与 accept-priority 相同。默认情况下，执行用户认证的 AP 比开放 AP 具有更高优先级（整数值更小）。 |
| **dh-groups** (*list of 19, 20, 21*) | 要在 SAE（WPA3）认证中使用的[椭圆曲线密码学组](http://www.iana.org/assignments/ipsec-registry/ipsec-registry.xhtml#ipsec-registry-10)标识符。 |
| **disable-pmkid** (*no* \| *yes; default: **no***) | 对于 AP 模式下的接口，禁止在 EAPOL 帧中包含 PMKID。禁用 PMKID 可能导致与使用 PMKID 的客户端设备出现兼容性问题。<ul><li><em>yes</em> - 不在 EAPOL 帧中包含 PMKID。</li><li><em>no</em> - 在 EAPOL 帧中包含 PMKID。</li></ul> |
| **eap-accounting** (*no* \| *yes; default: **no***) | 向 RADIUS 服务器发送经过 EAP 认证的对端的计费信息。<br/><br/>⚠️ <strong>警告：</strong>与 EAP 相关的属性仅适用于 station 模式下的接口。AP 会将 EAP 认证委托（透传）给 RADIUS 服务器。<br/> |
| **eap-anonymous-identity** (*string; default: **none***) | 用于 EAP 外层认证的匿名身份（可选）。 |
| **eap-certificate-mode** (*dont-verify-certificate* \| *no-certificates* \| *verify-certificate* \| *verify-certificate-with-crl; default: **dont-verify-certificate***) | 处理 RADIUS 服务器 TLS 证书的策略。<br/><ul><li>verify-certificate - 要求服务器具有有效证书。检查该证书是否由受信任的证书颁发机构签名。</li><li>dont-verify-certificate - 不对证书执行任何检查。</li><li>no-certificates - 尝试通过执行匿名 Diffie-Hellman 密钥交换建立 TLS 隧道。当 RADIUS 服务器完全没有证书时使用。</li><li>verify-certificate-with-crl - 与 <em>verify-certificate</em> 相同，但还会通过检查 Certificate Revocation List 来验证证书是否有效。</li></ul> |
| **eap-methods** (*list of* *peap, tls, ttls*) | 认证时考虑的 EAP 方法。默认使用所有受支持的方法。 |
| **eap-password** (*string; default: **none***) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 当所选 EAP 方法需要密码时使用的密码。 |
| **eap-tls-certificate** (*certificate; *default: **none***)* | 当所选 EAP 认证方法需要证书时，要使用的设备证书存储中的证书名称或 id。 |
| **eap-username** (*string; *default: **none***)* | 当所选 EAP 方法需要用户名时使用的用户名。<br/><br/>⚠️ <strong>注意：</strong>配置加密密码套件时要小心。<br/> 所有客户端设备必须支持 AP 用于连接的组加密密码套件，并且某些客户端设备（尤其是 Intel® 8260）如果单播密码套件列表包含其不支持的项，也会无法连接。<br/> |
| **encryption** (*list of  ccmp, ccmp-256, gcmp, gcmp-256, tkip; default: **ccmp***) | 用于加密单播流量的受支持密码套件列表。<br/> 默认为 <em>ccmp</em>。<br/><br/>⚠️ <strong>警告：</strong>要使客户端设备能够在 2 个 AP 之间成功漫游，这些 AP 需要由同一个 RouterOS 实例管理。有关如何集中管理多个 AP 的信息，请参阅 <a href="/docs/wireless/wifi/capsman">CAPsMAN</a><br/> |
| **ft** (*no \| yes: default: **no***) | 是否启用 802.11r 快速 BSS 转换（漫游）。 |
| **ft-mobility-domain** (*integer 0..65535; default: **44484 (0xADC4)***) | 快速 BSS 转换移动域 ID。 |
| **ft-nas-identifier** (string of *2..96 hex characters*) | 快速 BSS 转换 PMK-R0 密钥持有者标识符。默认值：接口的 MAC 地址。 |
| **ft-over-ds** (*no* \| *yes; *default: **no****) | 是否通过 DS（分布式系统）启用快速 BSS 转换。 |
| **ft-preserve-vlanid** (*no* \| *yes* ) | <ul><li>no - 当客户端通过 802.11r 快速 BSS 转换连接到此 AP 时，会根据接入和/或接口设置为其分配 VLAN ID</li><li>yes（默认） - 当客户端通过 802.11r 快速 BSS 转换连接到此 AP 时，它会保留初次认证时分配的 VLAN ID</li></ul> 当依赖 RADIUS 服务器为用户分配 VLAN ID 时，默认行为很重要，因为 RADIUS 服务器仅用于初次认证。 |
| **ft-r0-key-lifetime** (*time interval 1s..6w3d12h15m; Default: **600000s (~7 days)***) | 快速 BSS 转换 PMK-R0 加密密钥的生命周期。 |
| **ft-reassociation-deadline** (*time interval 0..70s; default: **20s***) | 快速 BSS 转换重新关联截止时间。 |
| **group-encryption** (*ccmp* \| *ccmp-256* \| *gcmp* \| *gcmp-256* \| *tkip; default: **ccmp***) | 用于加密组播流量的密码套件。 |
| **group-key-update** (*time interval; default: **24 hours***) | 组临时密钥（用于加密广播流量的密钥）的更新间隔。 |
| **management-encryption** (*cmac* \| *cmac-256* \| *gmac* \| *gmac-256; default: **cmac***) | 用于加密受保护管理帧的密码套件。 |
| **management-protection** (*allowed* \| *disabled* \| *required*) | 是否使用 802.11w 管理帧保护。<strong>与标准 wireless 软件包中的管理帧保护不兼容</strong>。<br/> 默认值取决于所选认证类型的值。WPA2 允许使用管理保护，WPA3 要求使用管理保护。 |
| **multi-passphrase-group** (*string*) | 要使用的 `/interface/wifi/security/multi-passphrase/` 组名称。安全配置下只能定义一个组。 |
| **owe-transition-interface** (*interface* \| *auto*) | 在 OWE 转换模式下运行时，要将其 MAC 地址和 SSID 通告为匹配 AP 的接口名称。<br/> 将该值设置为 'auto' 会使 RouterOS 尝试自动匹配同一 radio 上的开放 AP 和 OWE AP。<br/> 设置提供 OWE 但也兼容不支持该标准的旧设备的开放 AP 时必需。请参阅<a href="#basic-configuration">上面的配置示例</a>。 |
| **passphrase** (*string of up to 63 characters*) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于 PSK 认证类型的 passphrase。默认为空字符串 - ""。<br/> WPA-PSK 和 WPA2-PSK 认证要求至少 8 个字符，而 WPA3-PSK 没有最小 passphrase 长度要求。 |
| **sae-anti-clogging-threshold** (*disabled* \| *integer; default: **5***) | 由于 SAE（WPA3）关联会消耗大量 CPU 资源，用虚假认证请求压垮 AP 是一种可行的拒绝服务攻击。<br/> 该参数通过指定进行中的 SAE 认证阈值来缓解此类攻击；达到阈值后，AP 将开始要求客户端设备在其认证请求中包含与其 MAC 地址绑定的 cookie。随后 AP 只处理包含有效 cookie 的认证请求。 |
| **sae-max-failure-rate** (*disabled* \| *integer; default: **40***) | 每分钟失败的 SAE（WPA3）关联速率；达到该速率时，AP 将停止处理新的关联请求。 |
| **sae-pwe** (*both* \| *hash-to-element* \| *hunting-and-pecking; default: **both***) | 支持用于派生 SAE 密码元素的方法。 |
| **wps** (*disabled* \| *push-button; default: **push-button***) | <ul><li><em>push-button</em> - 调用 'wps-push-button' 命令后，AP 将在 2 分钟内接受 WPS 认证。物理 WPS 按钮功能尚未实现。</li><li><em>disabled </em>- AP 将不接受 WPS 认证</li></ul> |

### 安全 multi-passphrase 属性 {#security-multi-passphrase-properties}

`/interface/wifi/security/multi-passphrase`

`multi-passphrase` 允许使用 PPSK - 私有预共享密钥。
可以通过创建 access list 条目并设置 `multi-passphrase-group` 名称来使用它，也可以将该组分配给接口使用的安全配置。

支持的 passphrase 总限制为 10000。该限制由所有接口共享。当接口关联了 multi-passphrase 组时，启用后它将开始缓存指定组中的所有 passphrase。缓存期间认证会较慢。缓存完成后，使用 multi-passphrase 组不会带来可感知的额外延迟。

如果使用 access-list 应用 `multi-passphrase-group`，缓存将在首次匹配该组时开始，并持续到找到 passphrase 匹配项为止。

如果单个组下有数千个可能的 passphrase 条目，缓存可能需要几分钟才能完成，具体取决于设备配置和型号。

:::info
WPA3-PSK 认证类型不支持 multi-passphrase。
:::

| 属性 | 说明 |
| :-- | :-- |
| **group** (*string*) | 将组分配给安全配置文件或访问列表后，将启用该组下定义的所有口令的使用 |
| **passphrase** (*string of up to 63 characters*) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于 PSK 身份验证类型的口令。多个用户可以使用同一口令。<br/> 与 WPA3-PSK 不兼容。 |
| **vlan-id** (*integer 0..4095; Default: **none***) | 将分配给使用该口令的客户端的 vlan-id <br/><br/> ⚠️ <strong>注意：</strong> 仅受 wifi-qcom 接口支持。如果 wifi-qcom-ac AP 的某个客户端使用带关联 vlan-id 的口令，该客户端将无法加入。 |
| **expires** (*date and time*；“YYYY-MM-DD HH:SS”) | 此条目中指定口令的到期日期和时间，不影响整个组。到达该日期后，使用该口令的现有客户端将被断开连接，新客户端将无法使用该口令连接。如果未设置，该口令可无限期使用。 |
| **isolation** (*yes* \| *no*；Default: **no**) | 确定使用该口令的客户端设备是否与 AP 上的其他客户端隔离。来自隔离客户端的流量不会转发给其他客户端，来自非隔离客户端的单播流量也不会转发给隔离客户端。 |
| **disabled** (*yes* \| *no*；Default: **no**) |  |

### Steering 属性 {#steering-properties}

:::info
从 7.21 开始支持主动发送 802.11v BSS transition management request 功能。
:::

此类别中的属性用于管理向客户端设备通告潜在漫游候选对象的机制。

| 属性 | 说明 |
| :-- | :-- |
| **2g-probe-delay**(*no* \| *yes*；Default: *no*) | 如果 <br/><ol><li>该属性在 2.4GHz AP 上设置为 <em>yes </em>，并且</li><li>该 AP 位于包含至少一个 5GHz AP 的 steering neighbor group 中，则</li></ol> 2.4GHz AP 将在 60 秒间隔内，对来自每个客户端的前 3 个信噪比 &gt; 35 dB 的 probe request 不予响应。<br/> |
| **neighbor-group** (*string*) | 发送 neighbor report 和 BSS transition management request 时，AP 会将其 neighbor group 中的所有其他 AP 列为潜在漫游候选对象。<br/> 默认情况下，会为具有相同 SSID 和身份验证设置的一组 AP 创建动态 neighbor group。工作在 5GHz 频段的 AP 会被标记为优于工作在 2.4GHz 频段的 AP。<br/> 如果使用 EAP，则不会创建动态 neighbor group；需要手动定义。<br/><br/> |
| **rrm** (*no* \| *yes; Default: **yes***) | 启用发送 802.11k neighbor report。<br/> 当设备想要“探索/映射”其周围环境时，客户端可以向 AP 请求“neighbor report”（客户端设备可以存储该报告，并可用它立即或稍后进行漫游）。 |
| **transition-threshold** (*integer; Default: **-80***) | 设置用于发送主动 802.11v BSS transition management request 的 RSSI 阈值。如果客户端设备在 `transition-threshold-time` 期间持续“低于”配置的阈值，则会被标记为“transition candidate”。 |
| **transition-threshold-time** (*time interval; Default: **10***) | 定义客户端设备可以“低于”配置的 `transition-threshold` 值多长时间，才会被标记为“transition candidate”，单位为秒。 |
| **transition-request-period** (*time interval; Default: **30***) | 定义 AP 向作为“transition candidate”的客户端设备发送主动 802.11v BSS transition management request 的时间间隔，单位为秒。<br/> 例如，使用默认值（30s）时，将每 30 秒向客户端发送一次请求，总请求次数为 <code>transition-request-count</code>。 |
| **transition-request-count** (*count, unlimited; Default: **3***) | 定义应向标记为“transition candidate”的客户端发送多少条主动 802.11v BSS transition management request。客户端获得“transition candidate”状态后会立即发送一条请求（“-1” count），其余“count”将按 <code>transition-request-period</code> 发送。<br/> 例如，使用默认值（3）时，客户端获得“transition candidate”状态后发送第 1 条请求；第 2 条请求在 <code>transition-request-period</code> 秒后发送，第 3 条（最后一条）再经过一个 <code>transition-request-period</code> 后发送。<br/> 如果要无次数限制地发送请求，请设置为 <code>unlimited</code>。 |
| **transition-time** (*time interval, immediate \| unlimited; Default: **unlimited***) | 定义客户端设备在强制解除身份验证之前，可以作为“transition candidate”保持多长时间。它可以是 <code>time interval</code>，单位为秒（当设备成为“transition candidate”后开始计时，到期后解除客户端身份验证），可以是 <code>immediate</code>（客户端成为“transition candidate”后立即解除其身份验证），也可以是 <code>unlimited</code>（从不强制客户端断开，并按 <code>transition-request-period</code> 秒的间隔继续发送 <code>transition-request-count</code> 数量的 transition request）。<br/><br/>🛈 <strong>重要：</strong> 请注意，使用 <code>transition-time=immediate</code> 时，<code>transition-request-period</code> 和 <code>transition-request-count</code> 将不起作用，因为客户端会在 <code>transition-threshold-time</code> 后立即被解除身份验证。<br/><br/> |
| **wnm** (*no* \| *yes; Default: **yes***) | 启用发送被动 802.11v BSS transition management request。<br/> 客户端可以请求包含“neighbor list”的“roaming suggestion”数据包，以帮助设备切换 AP。客户端设备可以接受建议并立即漫游，也可以忽略建议并保持当前连接。 |

:::info
请理解，**客户端可以忽略 BSS transition management request**。BSS transition request 只是建议客户端寻找信号更好的其他 AP。收到 transition request 后，是否切换 AP 或是否保持连接到当前 AP，完全由客户端决定。
:::

:::info
**被动 802.11v BSS transition management request 行为：**

被动 802.11v BSS transition management packet 会根据客户端自身请求发送给客户端。客户端设备“请求”AP 提供带有“neighbor list”的“roaming suggestion”，AP 则以包含“neighbor list”的 transition request 进行响应。
:::

:::info
**主动 802.11v BSS transition management request 行为：**

主动 802.11v request 会在不等待客户端请求的情况下发送给客户端。即使客户端没有请求，也会发送该请求。

如果客户端信号低于 `transition-threshold`（默认值：-80 dBm）的时间超过 `transition-threshold-time`（默认值：10 s），则客户端会被标记为“transition candidate”。如果客户端信号高于 `transition-threshold`，则客户端的“transition candidate”状态会被移除。

如果客户端是“transition candidate”，它将开始接收**主动 802.11v BSS transition management request** 数据包（这些数据包“建议”移动到附近的其他 AP）。第一个此类数据包会在客户端状态变为“transition candidate”后立即发送，后续数据包会按 `transition-request-period`（默认值：30 s）发送。总共会发送 `transition-request-count`（默认值：3）个 transition request，之后 AP 将停止建议切换（除非配置了 `transition-request-count=unlimited`，这会使 AP 持续发送请求，每 `transition-request-period` 发送一条）。`transition-request-count` 数量用完后，客户端只有在自行请求时，或取消标记并再次标记为“transition candidate”后，才会收到下一条 transition request。

`transition-time` 中的值定义客户端设备在强制断开连接之前可以作为“transition candidate”保持多长时间。可能的 `transition-time` 值包括：**unlimited**（继续使用 `transition-request-period` 发送 `transition-request-count` 数量的 transition request，并且从不强制解除客户端身份验证）、以秒为单位的 **configurable time**（继续使用 `transition-request-period` 间隔和 `transition-request-count` 数量发送 transition request，并在配置的 `transition-time` 到期后断开客户端连接），以及 **immediate**（当客户端成为“transition candidate”时向其发送 transition request，并立即断开连接）。
:::

### 其他属性 {#miscellaneous-properties}

| 属性 | 说明 |
| :-- | :-- |
| **arp** (*disabled* \| *enabled* \| *local-proxy-arp*  \| *proxy-arp* \| *reply-only; default: **enabled**)* | 地址解析协议模式：<ul><li><em>disabled</em> - 接口将不使用 ARP</li><li><em>enabled</em> - 接口将使用 ARP</li><li><em>local-proxy-arp</em> - 路由器在接口上执行代理 ARP，并将回复发送到同一接口</li><li><em>proxy-arp</em> - 路由器在接口上执行代理 ARP，并将回复发送到其他接口</li><li><em>reply-only</em> - 接口仅回复来自匹配的 IP 地址/MAC 地址组合的请求，这些组合作为静态条目输入 <a href="/docs/network-management/arp"> ARP</a> 表。ARP 表中不会自动存储动态条目。因此，要使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout** (*time interval* \| *'auto'; default: **30s***) | 确定动态添加的 ARP 表条目自上次从相应 IP 地址收到数据包以来被视为有效的时间。值 *auto* 等于 *`/ip/settings`* 中 *arp-timeout* 的值，默认为 30s。 |
| **disable-running-check** *(no* \| *yes; default: **no***) | <ul><li><em>yes</em> - 只要接口未禁用，接口的 <em>r</em><em>unning </em>属性就为 true</li><li><em>no</em> - 接口的 <em>running</em> 属性仅在已与另一设备建立链路时为 true</li></ul> |
| **disabled** *(no \| yes; default: **yes**)* |  |
| **mac-address** (*MAC*) | 接口使用的 MAC 地址（BSSID）。<br/> 硬件接口默认使用关联 radio 接口的 MAC 地址。<br/> 虚拟接口的默认 MAC 地址通过以下方式生成：<br/><ol><li>获取关联主接口的 MAC 地址</li><li>将第一个八位组的次低有效位设置为 1，生成<a href="https://en.wikipedia.org/wiki/MAC_address#Ranges_of_group_and_locally_administered_addresses" rel="nofollow">本地管理的 MAC 地址</a></li><li>如有必要，递增地址的最后一个八位组，以确保其不与设备上另一接口的地址重叠</li></ol> |
| **mtu** *(integer [32..2290]; Default: **1500**)* | 第 3 层最大传输单元。 |
| **mld-interface** (*interface; default: **none***) | 指定关联的 MLD（Multi-Link Device）接口。当两个或更多 wifi 接口被分配相同的 MLD 接口时（例如 *mld-interface=mld1*），它们将作为一个逻辑 AP MLD 协同运行，启用 Multi-Link Operation（MLO）。MLD 接口是逻辑数据转发点——流量在 MLD 接口层处理，而不是在各个关联的 WiFi 接口上处理。所有关联的 WiFi 接口必须共享相同的 SSID，所有参与的 radio 必须属于同一设备。MLO 需要兼容的 Wi-Fi 7（802.11be）硬件。 |
| **mld-name** (*string*) | 将此接口指定为 MLD 接口的唯一标识符。手动创建 MLD 接口时，必须唯一且显式设置。 |
| **l2mtu** *(integer [32..2290]; Default: **2290**)* | 第 2 层最大传输单元。 |
| **master-interface** (*interface; default: **none***) | 每个无线 radio 上可以同时运行多个接口配置。<br/> 其中只有一个配置决定 radio 的状态（是否启用、使用的频率等）。此“主”接口通过对应的 <em>radio-mac.</em> <em>绑定</em>到 radio。<br/> 要在 radio 上创建其他（“虚拟”）接口配置，需要将它们<em>绑定</em>到对应的主接口。 |
| **name** (*string*) | 接口名称。默认为 *wifiN*，其中 *N* 是尚未用于接口命名的最小整数。 |

### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **bound** (*boolean*) (B) | 对于当前可供 WiFi manager 使用的 <em>master</em> 接口为 True。<br/> 对于虚拟接口（链接到 master 接口的配置），当接口本身和其 master 接口均未禁用，且 <em>master</em> 接口具有 bound 标志时为 True。 |
| **cap** (string) | 如果此路由器是 CAPsMAN，且接口不属于设备本身，而是属于由 CAPsMAN 控制的 CAP 设备，则显示该 CAP 设备的信息。 |
| **default-name** (*string*) | 接口的默认名称。 |
| **inactive** (*boolean*) (I) | 对于 AP 模式下的接口，当其已选择工作信道时为 False（即配置已成功应用）。<br/> 对于 station 模式下的接口，当其已连接到 AP 时为 False（即配置已成功应用，且已找到设置匹配的 AP）。<br/> 其他情况下为 True。 |
| **master** (*boolean*) (M) | 对于路由器本身的物理接口，或作为 CAPsMAN 运行时检测到的 CAP，为 True。<br/> 对于虚拟接口为 False。 |
| **radio-mac** (*MAC*) | 关联 radio 的 MAC 地址。 |
| **running** (*boolean*) (R) | 当接口已与另一设备建立链路时为 True。<br/> 如果 <em>disable-running-check</em> 设置为“yes”，则只要接口未禁用即为 True。 |

### 访问列表 {#access-list-1}

过滤参数：

| 参数 | 说明 |
| :-- | :-- |
| **interface** (*interface* \| *interface-list* \| *any; default: **any***) | 当连接发生在指定接口或属于指定列表的接口上时匹配。 |
| **mac-address** (*MAC address; default: **none***) | 当客户端设备具有指定的 MAC 地址时匹配。 |
| **mac-address-mask** (*MAC address*) | 修改 <strong>mac-address</strong> 参数，使其在对客户端 MAC 地址和给定地址掩码执行按位 AND 运算的结果相等时匹配。<br/> 默认值：FF:FF:FF:FF:FF:FF（即客户端的 MAC 地址必须与 <strong>mac-address</strong> 的值完全匹配） |
| **signal-range** (*min..max*) | 当从客户端设备接收到的信号强度在给定范围内时匹配。允许的值：'-120..120' |
| **ssid-regexp** (*regex*) | 当给定正则表达式与 SSID 匹配时匹配。 |
| **time** (*start-end,days*) | 在指定的一天中的时间和（可选）一周中的几天内匹配。允许的值：0s-1d |
| **multi-passphrase-group** (*string*) | 将使用的 `/interface/wifi/security/multi-passphrase/` 组名称。一个 access list 条目下只能设置一个组。 |

操作参数：

| 参数 | 说明 |
| :-- | :-- |
| **allow-signal-out-of-range** *(time period \| always; default: **0s**)* | 已连接对端的信号强度允许超出 <strong>signal-range</strong> 参数要求范围的时长，超过该时长后将断开连接。<br/> 如果值设置为“always”，则仅在关联期间检查对端信号强度。 |
| **action** (*accept* \| *reject* \| *query-radius; default: **accept***) | 是否授权连接<br/><ul><li><em>accept</em> - 允许连接</li><li><em>reject</em> - 不允许连接</li><li><em>query-radius</em> - 如果客户端 MAC 地址的 MAC 地址认证成功，则允许连接</li></ul> |
| **client-isolation** (*no* \| *yes; default: **none***) | 是否将客户端与连接到同一 AP 的其他客户端[隔离](/docs/wireless#datapath-properties)。 |
| **passphrase** (*string; *default: **none***) [sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 使用给定值覆盖默认 passphrase。 |
| **radius-accounting** (*no* \| *yes; *default: **none***)* | 使用给定值覆盖默认 RADIUS accounting 策略。 |
| **vlan-id** (*none* \| *integer 1..4095; *default: **none***)* | 为匹配的客户端分配给定的 [VLAN ID](/docs/wireless#datapath-properties)。 |

### 频率扫描 {#frequency-scan-1}

可通过运行 frequency-scan 命令获取可用信道上的 RF 状况信息。  
命令参数：

| 参数 | 说明 |
| :-- | :-- |
| **duration**（*time interval；*default：**none***） | 退出前执行扫描的时长。适用于非交互式使用。 |
| **freeze-frame-interval**（*time interval；default：**1s***） | 更新命令输出的时间间隔。 |
| **frequency**（*list of frequencies/ranges*） | 执行扫描的频率。有关更多详情，请参阅上文的 [channel.frequency parameter syntax](#channel-properties)。默认扫描所有支持的频率。 |
| **number**（*string*；*default*：**none**） | 用于执行扫描的接口名称或内部 id。必填。 |
| **rounds**（*integer*；*default*：**none**） | 退出前遍历可扫描频率列表的次数。适用于非交互式使用。 |
| **save-file**（*string*；*default*：**none**） | 用于保存输出的文件名。 |

输出参数：

| 参数 | 说明 |
| :-- | :-- |
| **channel**（*integer*） | 所扫描信道的频率（单位：MHz）。 |
| **networks**（*integer*） | 在该信道上检测到的接入点数量。 |
| **load**（*integer*） | 扫描期间该信道繁忙时间的百分比。 |
| **nf**（integer） | 该信道的噪声底噪（单位：dBm）。 |
| **max-signal**（*integer*） | 在该信道中检测到的 AP 的最大信号强度（单位：dBm）。 |
| **min-signal**（*integer*） | 在该信道中检测到的 AP 的最小信号强度（单位：dBm）。 |
| **primary**（*boolean*）（P） | 该信道被 AP 用作主（控制）信道。 |
| **secondary**（*boolean*）（S） | 该信道被 AP 用作辅助（扩展）信道。 |

### Flat-snoop

`/interface/wifi/flat-snoop` 是用于勘察 AP 和站点的工具。它监控频率使用情况，并显示哪些设备占用每个频率。与 scan 相比，它提供有关附近 AP 的更详细信息，并按站点/AP 数量提供频率使用情况的概览。
输出参数：

| 参数 | 说明 |
| :-- | :-- |
| **duration**（*time interval*；*default*：**none**） | 退出前执行扫描的时长。适用于非交互式使用。 |
| **filter-type**（*bss \| frequency \| stas*） | bss - 活动 AP 及其参数的列表。<br/> frequency - 每个扫描频率的站点和 AP 数量列表 <br/> stas - 每个扫描频率上站点的详细列表 <br/> 如果未指定 filter-type，将返回所有类型。 |
| **freeze-frame-interval**（*time interval；default：**1s***） | 更新命令输出的时间间隔。 |

### Scan 命令 {#scan-command-1}

`/interface/wifi/scan` 命令将扫描接入点，并打印有关其检测到的所有 AP 的信息。
scan 命令采用与 frequency-scan 命令相同的所有参数。
输出参数：

| 参数 | 说明 |
| :-- | :-- |
| **active**（*boolean*）（A） | 表示在过去 30 秒内已收到来自该 AP 的信标。 |
| **address**（*MAC*） | AP 的 MAC 地址（BSSID）。 |
| **channel**（*string*） | AP 使用的控制信道频率、其支持的无线标准以及控制/扩展信道布局。 |
| **security**（*string*） | AP 支持的身份验证方法。 |
| **signal**（*integer*） | AP 信标的信号强度（单位：dBm）。 |
| **ssid**（*string*） | AP 的扩展服务集标识符。 |
| **sta-count**（*integer*） | 与该 AP 关联的客户端设备数量。仅当 AP 在其信标中包含此信息时可用。 |

### Sniffer

命令参数：

| 参数 | 说明 |
| :-- | :-- |
| **duration**（*time interval*；**default: **none***） | 经过指定时间后自动中断 sniffer。 |
| **filter**（*string*） | 指定应用于捕获帧的过滤表达式字符串。仅显示、保存或流式传输与过滤表达式匹配的帧。<br/>其工作方式类似于 libpcap 中的过滤字符串。<br/>过滤器可以匹配<br/><ul><li>地址字段（addr1、addr2、addr3）</li><li>无线帧类型和子类型，包括 'beacon' 等快捷方式（type == 0 && subtype == 8）</li><li>标志（to-ds、from-ds、retry、power、protected）</li></ul>字符串可以包含以下运算符：<br/><ul><li>==（完全匹配）</li><li>!=（不等于）</li><li>&&（逻辑 AND）</li><li> &#124;&#124;（逻辑 OR）</li><li>()（用于对过滤表达式分组）</li></ul> |
| <strong>number</strong>（<em>interface</em>）<br/> | 用于嗅探的接口。 |
| **pcap-file**（*string*） | 将捕获的帧保存到指定名称的文件。无默认值（默认情况下，捕获的帧不会保存到文件）。 |
| **pcap-size-limit**（*integer*；*default*: **none**） | 本地存储捕获帧时的文件大小限制（以字节为单位）。达到该限制后，不再向捕获文件添加新帧。 |
| **stream-address**（*IP address*；*default*: **none**） | 通过 TZSP 协议将捕获的数据包流式传输到指定地址。无默认值（默认情况下，捕获的数据包不会流式传输到任何位置）。 |
| **stream-rate**（*integer*） | 限制通过 TZSP 流式传输捕获帧的速率（以每秒数据包数计）。 |

### WPS

`/interface/wifi/wps-client/wifi` 
命令参数：

| 参数 | 说明 |
| :-- | :-- |
| **duration**（*time interval*） | 如果未找到 AP，命令超时的时长。默认无限制。 |
| **interval**（*time interval; default: **1s***） | 更新命令输出的时间间隔。默认：1s。 |
| **mac-address**（*MAC*；*default*: **none**） | 仅尝试连接具有指定 MAC（BSSID）的 AP。 |
| **number**（*string; default: **none***） | 尝试建立连接时使用的接口名称或内部 id。 |
| **ssid**（*string; default: **none***） | 仅尝试连接具有指定 SSID 的 AP。 |

### Radios

可通过运行 `/interface/wifi/radio/print detail` 命令获取每个 radio 的能力信息。

| 属性 | 说明 |
| :-- | :-- |
| **2g-channels**（*list of integers*） | 2.4GHz 频段支持的频率。 |
| **5g-channels**（*list of integers*） | 5GHz 频段支持的频率。 |
| **6g-channels**（*list of integers*） | 6GHz 频段支持的频率。 |
| **bands**（*list of strings*） | 支持的频段、无线标准和信道宽度。 |
| **ciphers**（*list of strings*） | 支持的加密密码套件。 |
| **countries**（*list of strings*） | 接口支持的监管域。 |
| **hw-caps**（*list of strings*） | 其他支持的功能（例如 sniffer、qos-classifier-dscp）。 |
| **hw-type**（*string*） | Radio 硬件型号。 |
| **max-interfaces**（*integer*） | 逻辑接口的最大数量。 |
| **max-peers**（*integer*） | 关联对等端（已连接的站点）的最大数量。 |
| **max-station-interfaces**（*integer*） | station 模式下逻辑接口的最大数量。 |
| **max-vlans**（*integer*） | 不同 per-user VLAN 的最大数量。 |
| **min-antenna-gain**（*integer*） | 接口允许的最小天线增益。 |
| **ml-group**（*MAC address*） | 具有共同 ML（multi-link）组的 radio 可以配置为利用 multi-link operation。 |
| **phy-id**（*string*） | 唯一标识符。 |
| **radio-mac**（*MAC*） | Radio 接口的 MAC 地址。可用于将 radio 与接口配置匹配。 |
| **rx-chains**（*list of integers*） | 可用于接收无线电信号的 radio chain ID。 |
| **tx-chains**（*list of integers*） | 可用于发送无线电信号的 radio chain ID。 |

### 注册表 {#registration-table-1}

注册表包含有关关联无线设备的只读信息。

| 参数 | 说明 |
| :-- | :-- |
| **authorized** (*boolean*) (A) | 对端已成功通过身份验证时为 True。 |
| **auth-type** (*string*) | 用于特定客户端的身份验证类型。 |
| **band** (*string*) | 特定路由器与 AP 通信所在的频段。 |
| **bytes** (*list of integers*) | 发送到对端以及从对端接收的数据包中的字节数。 |
| **interface** (*string*) | 用于与对端关联的接口名称。 |
| **last-activity**(time) | 接口最后一次数据发送或接收活动的时间 |
| **mac-address** (*MAC*) | 对端的 MAC 地址。 |
| **packets** (*list of integers*) | 发送到对端以及从对端接收的数据包数量。 |
| **tx-bits-per-second** (*integer*) | 每秒向对端发送数据的速率。 |
| **rx-bits-per-second** (*integer*) | 每秒从对端接收数据的速率。 |
| **rx-rate** *(string*) | 从对端接收传输的比特率。 |
| **signal** (*integer*) | 从对端接收的信号强度（以 dBm 为单位）。 |
| **ssid** *(string*) | 客户端连接的 SSID。 |
| **tx-rate** (*string*) | 向对端发送时使用的比特率。 |
| **uptime** (*time interval*) | 自关联以来的时间。 |
| **vlan-id** (*integer*) | AP 或 RADIUS 为特定对端流量分配的 VLAN。 |
