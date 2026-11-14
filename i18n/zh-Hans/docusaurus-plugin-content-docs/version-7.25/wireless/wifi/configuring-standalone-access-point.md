---
sidebar_key: "wireless/wifi/configuring-standalone-access-point"
sidebar_position: 4
title: "配置独立接入点"
sidebar_label: "配置独立接入点"
description: "本指南提供有关使用 MikroTik RouterOS 的 wifi-qcom 软件包配置独立接入点（AP）的说明，详细介绍了 2.4/5 GHz 网络的设置步骤、天线选择以及桥接配置，同时提醒在没有 CAPsMAN 管理的情况下漫游存在限制。"
tags:
  - 'wifi'
  - 'access-point'
  - 'ssid'
source: https://manual.mikrotik.com/docs/7.25/wireless/wifi/configuring-standalone-access-point
captured_at: '2026-11-04T11:24:19+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**软件包：** `wifi-qcom`

:::info
本指南适用于运行 `wifi-qcom` 软件包/驱动程序的 802.11 AX 设备。
:::

Wi-Fi 设备可以扮演不同的角色。几乎所有家庭都有的最常见设备称为 Wi-Fi 路由器。典型的 Wi-Fi 路由器通常具有 WAN 端口（用于 ISP 连接）、LAN 端口（用于本地 PC、有线打印机等）和一个 WLAN 网络（Wi-Fi 网络）。路由器也被称为“网关”和“防火墙”，因为它们充当本地网络客户端进入 Internet 的“门户”（这些设备会将连接到 LAN 的客户端“隐藏”在其后面并保护它们）。

:::info
路由器是防火墙/网关设备，其连接了 ISP 线缆，受[防火墙保护](../../firewall-and-quality-of-service/firewall/index.md)并启用了 [DHCP 服务器](../../network-management/dhcp/server.md) 功能（该功能会向通过无线和有线方式连接的 LAN 客户端提供 IP 地址）。
:::

Wi-Fi 设备的另一种角色称为“接入点”，简称“AP”。这些设备通常通过以太网连接（连接到路由器的 LAN 端口）连接到主“路由器/网关/防火墙”；它们不受防火墙保护，也未启用 DHCP-server 功能（它们不提供 IP 地址）。AP 会将其所有 Wi-Fi 和 LAN 接口/端口桥接，因此，AP 会从路由器连接中“获取”IP 地址，并将其“传递”给连接到 AP 的客户端（充当“二层”桥接/交换机）。

:::info
接入点是“桥接”设备，使用以太网线连接到路由器；它们不受[防火墙保护](../../firewall-and-quality-of-service/firewall/index.md)，并且已禁用 [DHCP 服务器](../../network-management/dhcp/server.md) 功能（它们会把来自路由器的 DHCP 请求“桥接”到 AP 的客户端）。
:::

换言之，**Wi-Fi 路由器** **就是** **具备附加功能的 AP**。

AP（广播 Wi-Fi 网络的设备）运行在 2.4 和/或 5 GHz 频率上。5 GHz 网络可提供更好的吞吐量，但覆盖范围较小。2.4 GHz 网络可确保更好的覆盖范围，但吞吐量较低。

室内 AP 通常配备全向天线（可在 AP 周围以“甜甜圈”形状 360° 广播信号）。对于室内和短距离室外安装，它是理想的天线选择。使用带有全向天线的简单家用 AP，在“理想”的无干扰视距环境中，您可实现最远 ±100 米的距离；在建筑物内部，该距离会进一步大幅缩短。混凝土、管道、金属、水……以及各种其他不同材料都会影响室内 Wi-Fi。有些物体会吸收信号，有些会反射，有些会衍射，有些会散射信号。

考虑到这一点，使用单个 AP/路由器并不总是能够覆盖所需范围，可能需要安装额外的 AP；这意味着，如果你家中有 Wi-Fi 信号较差或不存在的问题区域，请考虑在更靠近该问题区域的位置安装新的 AP。

:::warning
**本指南适用于**“基础”或所谓的 **“独立” AP 设置**。如果你使用的是第三方厂商 Wi-Fi 路由器（非 MikroTik）、旧版 Wi-Fi 5 (AC) MikroTik 路由器，或者你之前的设置中完全没有 Wi-Fi AP，则可以使用本指南。

**对于由 `wifi-qcom` 软件包/驱动 AP 组成的设置，请使用 [CAPSMAN 管理](./capsman.md)**，因为它支持 802.11 r/k/v 漫游标准，可让客户端切换更平滑。
:::

:::note
**非 802.11 r/k/v 漫游！**

在“独立”AP 设置中，如果你只是从路由器设置中复制 SSID 名称，并将 AP 配置为广播相同的 SSID 名称 → 漫游将完全取决于客户端。

漫游是指客户端设备在使用相同 WiFi 名称的不同 AP 之间切换。有些标准可以帮助“加速”和“平滑”切换（例如 802.11 r/k/v），但遗憾的是，在此设置中无法使用它们（因为不存在“管理”设备），因此，“是否漫游”完全由客户端决定。不同厂商实现了不同的算法来决定客户端设备应如何以及何时切换。

请牢记这一点！一些具有良好算法（决策能力）的设备会正确漫游，而其他设备可能会一直连接到信号较差（距离最远）的 AP。
:::

我们的大多数（如果不是全部）MikroTik Wi-Fi 设备都预配置为[“路由器”角色](../../getting-started/first-time-configuration.md)。本指南将展示如何将它们转换为独立 AP 角色设备（二层桥接 AP）。

## 接入点设置 {#access-point-setup}

:::warning
由于我们将更改 Wi-Fi 和端口相关配置，建议使用 MAC 地址通过以太网端口/网线连接到设备设置。你可以使用 [Winbox](../../management-tools/winbox.md) 的“Neighbors”选项卡，并双击列表中的设备 MAC 地址。这样，在之后更改接口相关设置时，你就不会失去访问权限。
:::

整体配置：

```ros
/interface/wifi
set [ find default-name=wifi2 ] configuration.mode=ap configuration.country=Latvia .ssid=router.ssid.2 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
set [ find default-name=wifi1 ] configuration.mode=ap configuration.country=Latvia .ssid=router.ssid.5 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
add configuration.mode=ap .ssid=guest.ssid.2 disabled=no master-interface=wifi2 name=wifi3 security.authentication-types=wpa2-psk .passphrase=guest.password
/interface/list
add comment=defconf name=WAN
add comment=defconf name=LAN
/interface/bridge
add auto-mac=no comment=defconf name=bridge
/interface/bridge/port
add interface=all bridge=bridge 
/interface/list/member
add comment=defconf interface=bridge list=LAN
/ip/dhcp-client
add interface=bridge
```

### 2.4 GHz 接口配置 {#24-ghz-interface-configuration}

```ros
/interface/wifi
set [ find default-name=wifi2 ] configuration.mode=ap configuration.country=Latvia .ssid=router.ssid.2 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
```

- `configuration.mode=ap` → 将接口配置为在“接入点”模式下工作。
- `configuration.country=Latvia` → 选择你实际所在的国家/地区，以免违反任何法规（你所在国家的“法律”）。不同的国家/地区配置文件针对不同频率范围允许不同的输出功率。
- `ssid=router.ssid.2` → 配置 AP 需要广播的无线网络名称（SSID）。它可以与主路由器使用的网络名称相同，也可以是不同的名称。测试时，最好使用“唯一”名称，以便区分网络。要实现“客户端漫游”，请使用路由器设置中完全相同的 WiFi 名称。
- `security.authentication-types=wpa2-psk` → 选择要使用的认证类型。要实现“客户端漫游”，请使用路由器设置中完全相同的认证类型。
- `passphrase=router.password` → 设置 AP 的 WiFi 网络密码。要实现“客户端漫游”，请使用路由器设置中完全相同的密码。

### 5 GHz 接口配置 {#5-ghz-interface-configuration}

```ros
/interface/wifi
set [ find default-name=wifi1 ] configuration.mode=ap configuration.country=Latvia .ssid=router.ssid.5 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
```

- `configuration.mode=ap` → 将接口配置为在“接入点”模式下工作。
- `configuration.country=Latvia` → 选择你实际所在的国家/地区，以免违反任何法规（你所在国家的“法律”）。不同的国家/地区配置文件针对不同频率范围允许不同的输出功率。
- `ssid=router.ssid.5` → 配置 AP 需要广播的无线网络名称（SSID）。它可以与主路由器使用的网络名称相同，也可以是不同的名称。测试时，最好使用“唯一”名称，以便区分网络。要实现“客户端漫游”，请使用路由器设置中完全相同的 WiFi 名称。
- `security.authentication-types=wpa2-psk` → 选择要使用的认证类型。要实现“客户端漫游”，请使用路由器设置中完全相同的认证类型。
- `passphrase=router.password` → 设置 AP 的 WiFi 网络密码。要实现“客户端漫游”，请使用路由器设置中完全相同的密码。

#### **增大 5 GHz 覆盖范围** {#increasing-5-ghz-range}

地方主管部门会管制 Wi-Fi 设备的输出功率。不同国家/地区的不同频率范围可能允许不同的功率。你可以使用以下命令检查你的国家/地区配置文件适用哪些限制：

```ros
/interface/wifi/radio/reg-info country=Latvia 0      
  ranges: 2402-2482/20dBm/40MHz   
          5170-5250/23dBm/160MHz/indoor    
          5250-5330/23dBm/160MHz/indoor/dfs
          5490-5730/30dBm/160MHz/dfs     
          5735-5875/14dBm/80MHz 
```

根据该表，我们可以看到（使用“Latvia”国家配置文件时）在信道 `5490-5730` 上可获得的最大功率为 `30 dBm`。

此表中显示的“dBm”表示“允许的 EIRP”（EIRP=Tx power + 天线增益）。为了不违反任何法规和“法律”，设备的天线增益越高，设置的 Tx power 就越低（如果设备具有内置天线，这将**自动**发生），以匹配允许的“EIRP”值。

另请注意，最高“EIRP”的信道可能是“DFS”信道（意味着如果在该信道上检测到雷达，广播就会停止）。这一点需要牢记！

根据这些信息和该表，我们可以看到明智的做法是避免使用 `5735-5875` 范围，因为它只允许 `14 dBm`。

信道允许的“EIRP”越大 = 可用输出功率越大 = 信号越强 = 可达到的距离越远。

:::info
请注意，有一个名为 `Superchannel` 的国家/地区配置文件。在此配置文件中，输出功率不受任何软件限制。此模式只应在受控环境中使用，或者在你拥有所在地区使用许可时使用。你可以将其与直接在设置中“降低”Tx power 值结合使用，以获得“自定义”输出功率。
:::

要设置信道或范围，请运行以下命令：

```ros
/interface/wifi
set [ find default-name=wifi1 ] channel.frequency=5490-5730
```

### 可选步骤 - 添加虚拟接口 {#optional-step---adding-virtual-interface}

如果你想创建额外网络（额外 SSID 名称），可以在另一个接口之上创建 `virtual` 接口：

```ros
/interface/wifi
add configuration.mode=ap .ssid=guest.ssid.2 disabled=no master-interface=wifi2 name=wifi3 security.authentication-types=wpa2-psk .passphrase=guest.password
```

- `configuration.mode=ap` → 确保它将作为“接入点”接口工作。
- `ssid=guest.ssid.2` → 配置 AP 需要广播的无线网络名称（SSID）。要实现“客户端漫游”，请使用路由器设置中完全相同的 WiFi 名称。
- `master-interface=wifi2` → 指定将“虚拟”接口“基于”哪个接口（指定在哪个接口之上创建它）。
- `name=wifi3` → 为虚拟接口命名。
- `security.authentication-types=wpa2-psk` → 选择要使用的认证类型。要实现“客户端漫游”，请使用路由器设置中完全相同的认证类型。
- `passphrase=guest.password` → 设置 AP 的 WiFi 网络密码。要实现“客户端漫游”，请使用路由器设置中完全相同的密码。

:::info
虚拟接口将使用与 `master` 接口完全相同的频率信道。此接口的 Wi-Fi 频率信道无法更改。
:::

### 桥接和列表 {#bridging-and-listing}

[桥接所有端口](../../bridging-and-switching/index.md#example-1)：

```ros
/interface/bridge
add auto-mac=no comment=defconf name=bridge
/interface/bridge/port
add interface=all bridge=bridge 
```

并确保桥接接口被列为“LAN”接口（`/interface list member add comment=defconf interface=bridge list=LAN`），以便防火墙规则不会阻止对 AP 管理界面的访问：

```ros
/interface/list/member
add comment=defconf interface=bridge list=LAN
```

当然，前提是您在主路由器上添加了适当的防火墙和访问限制。否则，请对其进行限制。

### DHCP {#dhcp}

```ros
/ip/dhcp-client
add interface=bridge
```

在桥接接口之上应用 [DHCP 客户端](../../network-management/dhcp/client.md#configuration-examples)，以便 AP 本身及其所有连接的客户端都从主路由器获取 IP 地址。

禁用 [DHCP 服务器](../../network-management/dhcp/server.md) 功能。

### 地址 {#address}

如果路由器网络使用相同子网，请移除/禁用默认配置中由桥接分配的 [IP 地址](../../getting-started/networking-fundamentals/index.md#address-configuration)，以免与网关 IP 发生“冲突”。
