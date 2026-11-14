---
sidebar_key: "wireless/wifi/configuring-outdoor-cpe-to-ap-links"
sidebar_position: 3
title: "配置室外 CPE 到 AP 链路"
sidebar_label: "配置室外 CPE 到 AP 链路"
description: "使用 MikroTik RouterOS 的 `wifi-qcom` 软件包配置室外 CPE 到 AP Wi-Fi 链路的指南，涵盖频率选择、国家法规、AP 模式设置、安全性以及长距离连接的距离考量。"
tags:
  - 'wifi'
  - 'ap-configuration'
source: https://manual.mikrotik.com/docs/wireless/wifi/configuring-outdoor-cpe-to-ap-links
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**软件包：** `wifi-qcom`

众所周知，室内接入点的 Wi-Fi 覆盖范围是有限的。它主要受当地法规影响，这些法规会限制设备的输出功率（具体取决于使用哪个频率信道）。典型的室内 Wi-Fi 连接建立在 AP（接入点）与客户端（station）设备（智能手机、笔记本电脑等）之间。

室内 AP 通常配备全向天线（可将信号以“甜甜圈”形状广播到 AP 周围），其天线增益相对较低。对于室内和短距离室外安装，这是非常合适的天线。使用带有全向天线的简单家用 AP，在“理想”的无干扰视距环境中，你可以达到最远约 ±100 米的距离；而在建筑物内部，这一距离会大幅缩短。

但是！如果你提高 AP 的天线增益，并将信号以更小的角度“定向”到特定目的地（而不是以 360° 广播信号），就可以实现距离长得多的连接（前提是 station 设备位于定向角度内）。这正是室外远距离 AP 和 CPE 的用武之地。它们允许建立跨越数公里距离的 Wi-Fi 连接。

远距离连接需要一台运行在“AP”模式的设备，以及一台运行在“station”模式的客户端设备。多个 station 可以连接到单个 AP。

:::info
本指南适用于运行 `wifi-qcom` 软件包/驱动程序的 802.11 AX 设备。
:::

## AP 设置 {#ap-setup}

### 频率选择 {#frequency-selection}

如引言所述，当地主管部门会监管 Wi-Fi 设备的输出功率。不同国家/地区的不同频率范围可能具有不同的允许功率。你可以使用以下命令检查适用于你所在国家配置文件的限制：

```ros
/interface/wifi/radio/reg-info country=Latvia 0           
  ranges: 2402-2482/20dBm/40MHz            
          5170-5250/23dBm/160MHz/indoor    
          5250-5330/23dBm/160MHz/indoor/dfs
          5490-5730/30dBm/160MHz/dfs       
          5735-5875/14dBm/80MHz 
```

根据该表，我们可以看到（使用“Latvia”国家配置文件时）在信道 `5490-5730` 上可获得的最大功率为 `30 dBm`。

此表中显示的“dBm”表示“允许的 EIRP”（EIRP=发射功率 + 天线增益）。为了不违反任何法规和“法律”，设备的天线增益越高，设置的发射功率就越低（如果设备具有内置天线，这将**自动**发生），以匹配允许的“EIRP”值。

另请注意，最高“EIRP”的信道可能是“DFS”信道（意味着如果在该信道上检测到雷达，广播就会停止）。这一点需要牢记！

根据这些信息和该表，我们可以看到明智的做法是避免使用 `5735-5875` 范围，因为它只允许 `14 dBm`。

信道上允许的“EIRP”越高 = 可用输出功率越大 = 信号越强 = 可获得的距离越远。

:::note
请注意，有一个名为“Superchannel”的国家配置文件。在此配置文件中，没有对输出功率应用软件限制。此模式只应在受控环境中使用，或者如果你所在地区有特殊许可可以使用它。你可以将其与直接在设置中“降低”发射功率值相结合，以获得“自定义”功率输出。
:::

此外，从频率方面来说，请记住信道宽度越小，干扰越少，可获得的距离越远。也就是说，对于更长距离，请使用 20 MHz。

### WiFi 接口配置 {#wifi-interface-configuration}

要配置 AP 模式，请运行以下命令：

```ros
/interface/wifi
set [ find default-name=wifi1 ] channel.frequency=5500 configuration.country=Latvia .mode=ap .ssid=input_your_SSID_here security.authentication-types=wpa2-psk .passphrase=input_your_password_here channel.width=20mhz
```

- `channel.frequency` → 选择运行 AP 的频率信道。如果你想使用“自动”信道选择，可以跳过此项。
- `configuration.country` → 应用国家配置文件，使设备遵守输出功率法规。
- `.mode=ap` → 将 WiFi 接口设置为在“接入点”模式下运行。
- `.ssid=input_your_SSID_here` → 配置 AP 将要广播的 SSID 名称。
- `security.authentication-types=wpa2-psk` → 指定要支持的身份验证类型。
- `.passphrase=input_your_password_here` → 设置该 SSID 的密码。

:::warning
如果你的链路长度超过 2km，还必须额外配置“distance”参数。此设置对 `wifi-qcom-ac` 驱动程序无效。
:::

- `configuration.distance=distance_in_km` → 设置最大链路距离，单位为千米。该值应反映距离设备最远的 AP 或 station 的距离。未配置该值时允许使用 2 km 链路。
- `channel.width=20mhz` → 设置信道宽度。信道宽度越小，距离越远（干扰越少）。

### 其他需要考虑的设置 {#other-settings-to-consider}

#### 场景 #1 {#scenario-1}

如果你拓扑中已有负责向网络提供 IP 地址的 DHCP 服务器，并且你想将 AP 安装在其后方：

![](/img/fbef14d774a94c76.webp)

1. 确保 AP 已添加[桥接接口](../../bridging-and-switching/index.md#example)，并且所有以太网和 WiFi 端口[都属于该接口](../../bridging-and-switching/index.md#example-1)。
2. 在该桥接接口上设置 [DHCP 客户端](../../network-management/dhcp/client.md)，或者改为静态添加 [IP 地址](../../getting-started/networking-fundamentals/index.md#address-configuration)和[默认路由](../../user-guides/routing-and-networking-protocols/routing-decision.md#default-route)。
3. 如有需要，更改接口列表成员角色。

#### 场景 #2 {#scenario-2}

如果你希望让 AP 本身充当 station 的 DHCP 服务器：

![](/img/9114f213f2546935.webp)

1. 将以太网端口配置为上联/WAN 端口，即为以太网接口设置 [DHCP 客户端](../../network-management/dhcp/client.md)或[静态 IP](../../getting-started/networking-fundamentals/index.md#address-configuration)，设置默认[路由](../../user-guides/routing-and-networking-protocols/routing-decision.md)，并在接口列表设置中将该端口归类为“WAN”端口。
2. 在 WiFi 接口之上（或在该 WiFi 端口所属的桥接接口之上）设置 [DHCP 服务器](../../cli-reference/interface/list/index.md)，并为该接口添加相应的  [IP 地址](../../network-management/dhcp/server.md)。

## Station 设置 {#station-setup}

### WiFi 接口配置 {#wifi-interface-configuration-1}

要配置 station 模式，请运行以下命令：

```ros
/interface/wifi
set [ find default-name=wifi1 ] channel.frequency=5500 configuration.country=Latvia .mode=station .ssid=input_your_SSID_here security.authentication-types=wpa2-psk .passphrase=input_your_password_here
```

- `channel.frequency` → 选择 AP 使用的频率信道。如果你想使用“自动”信道选择，可以跳过此项。
- `configuration.country` → 应用国家配置文件，使设备遵守输出功率法规。
- `.mode=station` → 将 WiFi 接口设置为在“station”模式下运行。
- `.ssid=input_your_SSID_here` → 输入 AP 正在广播的 SSID 名称。
- `security.authentication-types=wpa2-psk` → 指定要支持的身份验证类型。
- `.passphrase=input_your_password_here` → 设置 AP 所期望的密码。

:::warning
如果你的链路长度超过 2km，还必须额外配置“distance”参数。此参数对 `wifi-qcom-ac` 驱动程序无效。
:::

- `configuration.distance=distance_in_km` → 设置最大链路距离，单位为千米。该值应反映距离设备最远的 AP 或 station 的距离。未配置该值时允许使用 2 km 链路。

### 其他需要考虑的设置 {#other-settings-to-consider-1}

#### 场景 #1 {#scenario-1-1}

此场景中，station 的 WiFi 接口被归类为“WAN”接口，这使 station 的客户端可以隐藏在 [NAT](../../firewall-and-quality-of-service/firewall/nat.md) 之后。这是应用于大多数 CPE 设备的出厂配置。

此类拓扑的示例：

![](/img/f962c200f2e841f3.webp)

此类设置要求 CPE 具备以下条件：

1. WiFi 接口在接口列表成员菜单中被归类为“WAN”端口。
2. 在“其他/以太网”接口上运行 [DHCP 服务器](../../cli-reference/interface/list/member.md)（建议确保 AP 的 DHCP 服务器和 Station 的 DHCP 服务器网络不使用相同子网，因为这可能导致三层/路由问题）。
3. 为 WiFi 接口应用 [DHCP 客户端](../../network-management/dhcp/server.md)或[静态 IP](../../network-management/dhcp/client.md)，并配置[默认路由](../../getting-started/networking-fundamentals/index.md#address-configuration)。
4. 在 WiFi 设置中配置 [`mode=station`](../../user-guides/routing-and-networking-protocols/routing-decision.md)。

#### 场景 #2 {#scenario-2-1}

此场景中，你可以桥接 station 的端口，使 CPE 本身以及所有 CPE 客户端都从 AP 获取 DHCP 地址。

此类拓扑的示例：

![](/img/3ede6b8ead1ad35b.webp)

此类设置要求 CPE 具备以下条件：

1. 所有端口（WiFi 和以太网）都加入同一个[桥接接口](../../bridging-and-switching/index.md#example)。
2. 该桥接接口在接口列表成员菜单中被归类为“LAN”接口。
3. 禁用 [DHCP 服务器](../../cli-reference/interface/list/member.md)。
4. 为桥接接口应用 [DHCP 客户端](../../network-management/dhcp/server.md)或[静态 IP](../../network-management/dhcp/client.md)。
5. 在 WiFi 设置中配置 [`mode=station-bridge`](../../getting-started/networking-fundamentals/index.md#address-configuration)：

```ros
/interface/wifi
set [ find default-name=wifi1 ] configuration.mode=station-bridge
```

## 验证 {#verification}

连接成功后，AP 和 Station 都应在“Registration”表中显示一个新条目：

```ros
/interface/wifi/registration-table/print
Flags: A - AUTHORIZED
Columns: INTERFACE, SSID, MAC-ADDRESS, UPTIME, LAST-ACTIVITY, SIGNAL, AUTH-TYPE, BAND
#   INTERFACE  SSID        MAC-ADDRESS        UPTIME    LAST-ACTIVITY  SIGNAL  AUTH-TYPE  BAND   
0 A wifi1      input_SSID  XX:YY:ZZ:AA:30:6E  6h24m21s  0ms            -72     wpa2-psk   5ghz-ax
```

你还可以通过 CPE 使用“scan”命令检查它是否正确发现/识别 AP：

```ros
/interface/wifi/scan [find where name=wifi1]
Flags: A - ACTIVE
Columns: ADDRESS, SSID, CHANNEL, SECURITY, SIGNAL, STA-COUNT
  ADDRESS            SSID               CHANNEL           SECURITY                              SIGNAL  STA-COUNT
A XX:YY:ZZ:AA:F4:28  SSID_Y             5620/ax           WPA2-PSK/WPA3-PSK                     -60             0
A XX:YY:ZZ:BB:0B:DA  SSID_X             5745/ax/Ce        WPA3-PSK                              -68             0
A XX:YY:ZZ:CC:0B:DA  input_SSID         5745/ax/Ce        WPA2-PSK                              -68             0
A XX:YY:ZZ:DD:0B:DA                     5745/ax/Ce        WPA2-PSK                              -68             0
```
