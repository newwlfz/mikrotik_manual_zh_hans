---
title: "配置室外 CPE 到 AP 的链路"
description: "使用 MikroTik RouterOS 的 `wifi-qcom` 软件包配置室外 CPE 到 AP Wi-Fi 链路的指南，涵盖频率选择、国家法规、AP 模式设置、安全以及远距离连接的距离因素。"
tags:
  - 'wifi'
  - 'ap-configuration'
source: https://manual.mikrotik.com/docs/7.24/wireless/wifi/configuring-outdoor-cpe-to-ap-links
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**软件包：** `wifi-qcom`

众所周知，室内接入点的 Wi-Fi 覆盖范围有限。这主要受当地法规影响，法规会限制设备的输出功率（取决于使用的频率信道）。典型的室内 Wi-Fi 连接建立在 AP（接入点）和客户端（站点）设备（智能手机、笔记本电脑等）之间。

室内 AP 通常配备全向天线（可在 AP 周围以“甜甜圈”形状广播信号），其天线增益相对较低。对于室内和短距离室外安装，这是理想的天线。使用带全向天线的普通家用 AP，在“理想”无干扰视距环境下，距离可达 ±100 米；在建筑物内部，距离会大幅缩短。

但是！如果提高 AP 的天线增益，并将信号以较小角度“定向”到特定目标（而不是以 360° 广播信号），就可以实现更远距离的连接（前提是站点设备位于定向角度内）。这正是室外远距离 AP 和 CPE 发挥作用的地方。它们可以建立数公里距离的 Wi-Fi 连接。

远距离连接要求一台设备运行在“AP”模式，另一台客户端设备运行在“station”模式。多个站点可以连接到单个 AP。

:::info
本指南适用于运行 `wifi-qcom` 软件包/驱动程序的 802.11 AX 设备。
:::

## AP 设置 {#ap-setup}

### 频率选择 {#frequency-selection}

如引言所述，当地主管部门会监管 Wi-Fi 设备的输出功率。不同国家的不同频段可能允许不同的功率。可以使用以下命令检查适用于你所在国家配置的限制：

```ros
/interface/wifi/radio/reg-info country=Latvia 0           
  ranges: 2402-2482/20dBm/40MHz            
          5170-5250/23dBm/160MHz/indoor    
          5250-5330/23dBm/160MHz/indoor/dfs
          5490-5730/30dBm/160MHz/dfs       
          5735-5875/14dBm/80MHz 
```

根据该表可以看出，使用“Latvia”国家配置时，在 `5490-5730` 信道上可获得的最大功率为 `30 dBm`。

此表中显示的“dBm”表示“允许的 EIRP”（EIRP = Tx power + antenna gain）。为不违反任何法规和“法律”，设备天线增益越高，设置的 Tx power 越低（如果设备使用内置天线，此过程会**自动**完成），以匹配允许的“EIRP”值。

另请注意，EIRP 最高的信道可能是“DFS”信道（这意味着如果在信道上检测到雷达，广播将停止）。这一点需要牢记！

根据这些信息，从表中可以看出，应避免使用 `5735-5875` 范围，因为它只允许 `14 dBm`。

信道允许的“EIRP”越高 = 可用输出功率越大 = 信号越强 = 可获得的距离越远。

:::note
请注意，有一个名为“Superchannel”的国家配置。在此配置中，不会对输出功率应用软件限制。此模式仅应在受控环境中使用，或者在你所在地区获得特殊许可后使用。可以将其与在设置中直接“降低”Tx power 值结合使用，以获得“自定义”功率输出。
:::

此外，就频率而言，请记住信道宽度越小，干扰越少，可获得的距离越远。也就是说，对于更远的距离，使用 20 MHz。

### WiFi 接口配置 {#wifi-interface-configuration}

要配置 AP 模式，请运行以下命令：

```ros
/interface/wifi
set [ find default-name=wifi1 ] channel.frequency=5500 configuration.country=Latvia .mode=ap .ssid=input_your_SSID_here security.authentication-types=wpa2-psk .passphrase=input_your_password_here channel.width=20mhz
```

- `channel.frequency` → 选择 AP 运行的频率信道。如果要使用“自动”信道选择，可以跳过此项。
- `configuration.country` → 应用国家配置，使设备遵循发射功率法规。
- `.mode=ap` → 将 WiFi 接口设置为以“接入点”模式运行。
- `.ssid=input_your_SSID_here` → 配置 AP 将广播的 SSID 名称。
- `security.authentication-types=wpa2-psk` → 指定要支持的认证类型。
- `.passphrase=input_your_password_here` → 设置 SSID 的密码。

:::warning
如果链路长度超过 2 km，还必须额外配置“distance”参数。该设置不适用于 `wifi-qcom-ac` 驱动。
:::

- `configuration.distance=distance_in_km` → 设置最大链路距离，单位为千米。该值应反映到距离设备最远的 AP 或 station 的距离。未配置时允许使用 2 km 链路。
- `channel.width=20mhz` → 设置信道宽度。信道宽度越小，传输距离越长（干扰越少）。

### 其他需要考虑的设置 {#other-settings-to-consider}

#### 场景 #1 {#scenario-1}

如果拓扑中已有 DHCP-server 负责为网络提供 IP 地址，并且希望在该网络后安装 AP：

![](/img/fbef14d774a94c76.webp)

1. 确保 AP 已添加[网桥接口](/docs/bridging-and-switching#example)，并且所有以太网和 WiFi 端口[均属于该网桥](/docs/bridging-and-switching#example-1)。
2. 在该网桥上设置 [DHCP-client](/docs/network-management/dhcp#dhcp-client)，或者改为静态添加 [IP 地址](/docs/getting-started/networking-fundamentals#address-configuration)和[默认路由](/docs/user-guides/routing-and-networking-protocols/routing-decision#default-route)。
3. 根据需要更改[接口列表成员](/docs/system-information-and-utilities/interface-lists)角色。

#### 场景 #2 {#scenario-2}

如果希望 AP 本身充当站点的 DHCP-server：

![](/img/9114f213f2546935.webp)

1. 将以太网端口配置为 uplink/WAN 端口，即为以太网接口设置 [DHCP-client](/docs/network-management/dhcp#dhcp-client)或[静态 IP](/docs/getting-started/networking-fundamentals#address-configuration)，设置默认[路由](/docs/user-guides/routing-and-networking-protocols/routing-decision)，并在[接口列表](/docs/system-information-and-utilities/interface-lists)设置中将该端口归类为“WAN”端口。
2. 在 WiFi 接口之上（或在 WiFi 端口所属的网桥之上）设置 [DHCP-server](/docs/network-management/dhcp#dhcp-server)，并向该接口添加相应的 [IP 地址](/docs/getting-started/networking-fundamentals#address-configuration)。

## 站点设置 {#station-setup}

### WiFi 接口配置 {#wifi-interface-configuration-1}

要配置 station 模式，运行以下命令：

```ros
/interface/wifi
set [ find default-name=wifi1 ] channel.frequency=5500 configuration.country=Latvia .mode=station .ssid=input_your_SSID_here security.authentication-types=wpa2-psk .passphrase=input_your_password_here
```

- `channel.frequency` → 选择 AP 使用的频率信道。如果要使用“自动”信道选择，可以跳过此项。
- `configuration.country` → 应用国家配置文件，使设备遵循发射功率法规。
- `.mode=station` → 将 WiFi 接口设置为以“station”模式运行。
- `.ssid=input_your_SSID_here` → 输入 AP 正在广播的 SSID 名称。
- `security.authentication-types=wpa2-psk` → 指定要支持的身份验证类型。
- `.passphrase=input_your_password_here` → 设置 AP 所需的密码。

:::warning
如果链路长度超过 2 km，还必须另外配置 `distance` 参数。该参数不适用于 `wifi-qcom-ac` 驱动。
:::

- `configuration.distance=distance_in_km` → 设置最大链路距离，单位为千米。该值应反映到距离设备最远的 AP 或 station 的距离。未配置该值时，允许使用 2 km 链路。

### 其他需要考虑的设置 {#other-settings-to-consider-1}

#### 场景 #1 {#scenario-1-1}

在该场景中，station 的 WiFi 接口被归类为“WAN”接口，使 station 的客户端可以隐藏在 [NAT](/docs/firewall-and-quality-of-service/firewall/nat) 后面。这是大多数 CPE 设备应用的出厂配置。

此类拓扑示例：

![](/img/f962c200f2e841f3.webp)

这种设置要求 CPE 具备：

1. 在 [interface list members](/docs/system-information-and-utilities/interface-lists) 菜单中，将 WiFi 接口归类为“WAN”端口。
2. 在“other/ethernet”接口上运行 [DHCP-server](/docs/network-management/dhcp#dhcp-server)（建议确保 AP 的 DHCP server 和 station 的 DHCP server 网络不使用同一子网，否则可能导致三层或路由问题）。
3. 在 WiFi 接口上应用 [DHCP-client](/docs/network-management/dhcp#dhcp-client) 或 [static IP](/docs/getting-started/networking-fundamentals#address-configuration)，并配置 [default route](/docs/user-guides/routing-and-networking-protocols/routing-decision)。
4. 在 WiFi 设置中配置 [`mode=station`](/docs/wireless/user-guides/wireless-station-modes#mode-station)。

#### 场景 #2 {#scenario-2-1}

可以将 station 的端口桥接起来，使 CPE 自身和所有 CPE 客户端都从 AP 获取 DHCP 地址。

此类拓扑示例：

![](/img/3ede6b8ead1ad35b.webp)

此类设置要求 CPE 具备以下条件：

1. 所有端口（WiFi 和 Ethernet）都添加到同一个[网桥接口](/docs/bridging-and-switching#example)中。
2. 该网桥在[接口列表成员](/docs/system-information-and-utilities/interface-lists)菜单中被归类为“LAN”接口。
3. [DHCP-server](/docs/network-management/dhcp#dhcp-server) 已禁用。
4. 对网桥接口应用 [DHCP-client](/docs/network-management/dhcp#dhcp-client) 或[静态 IP](/docs/getting-started/networking-fundamentals#address-configuration)。
5. 在 WiFi 设置中配置 [`mode=station-bridge`](/docs/wireless/user-guides/wireless-station-modes#mode-station-bridge)：

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

还可以通过 CPE 使用“scan”命令检查其是否正确识别 AP：

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
