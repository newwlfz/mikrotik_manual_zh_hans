---
title: "配置独立接入点"
description: "本指南介绍如何使用 MikroTik RouterOS 的 wifi-qcom 包配置独立接入点（AP），详细说明 2.4/5 GHz 网络、天线选择和网桥配置的设置步骤，并提醒在没有 CAPsMAN 管理的情况下漫游存在限制。"
tags:
  - 'wifi'
  - 'access-point'
  - 'ssid'
source: https://manual.mikrotik.com/docs/7.24/wireless/wifi/configuring-standalone-access-point
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**软件包：** `wifi-qcom`

:::info
本指南适用于运行 `wifi-qcom` 软件包/驱动程序的 802.11 AX 设备。
:::

Wi-Fi 设备可以承担不同角色。几乎每个家庭都有的最常见设备称为 Wi-Fi 路由器。典型 Wi-Fi 路由器通常有一个 WAN 端口（用于连接 ISP）、多个 LAN 端口（用于连接本地 PC、有线打印机等）和一个 WLAN 网络（Wi-Fi 网络）。路由器也称为“网关”和“防火墙”，因为它们充当本地网络客户端访问互联网的“入口”（这些设备将 LAN 连接的客户端“隐藏”在其后方并加以保护）。

:::info
路由器是一种防火墙/网关设备，连接 ISP 线缆，启用[防火墙保护](/docs/firewall-and-quality-of-service/firewall)和 [DHCP-server](/docs/network-management/dhcp#dhcp-server) 功能（为通过无线和有线方式连接的 LAN 客户端提供 IP 地址）。
:::

Wi-Fi 设备的另一种角色称为“接入点”，简称“AP”。这些设备通常通过以太网连接（连接到路由器的 LAN 端口）接入主“路由器/网关/防火墙”；它们不启用防火墙保护，也不启用 DHCP-server 功能（不提供 IP 地址）。AP 的所有 Wi-Fi 和 LAN 接口/端口都桥接在一起，因此 AP 从路由器连接中“获取”IP 地址，并将其“传递”给连接到 AP 的客户端（充当“layer2”网桥/交换机）。

:::info
接入点是“网桥”设备，通过以太网线缆连接到路由器；它们不受[防火墙保护](/docs/firewall-and-quality-of-service/firewall)，并且禁用 [DHCP-server](/docs/network-management/dhcp#dhcp-server) 功能（它们将来自路由器的 DHCP 请求“桥接”到 AP 的客户端）。
:::

换句话说，**Wi-Fi 路由器**就是**具有附加功能的 AP**。

AP（广播 Wi-Fi 网络的设备）运行在 2.4 和/或 5 GHz 频段。5 GHz 网络可提供更高的吞吐量，但覆盖范围较小。2.4 GHz 网络可确保更好的覆盖，但吞吐量较低。

室内 AP 通常配备全向天线（可在 AP 周围以“甜甜圈”形状广播信号，覆盖 360°）。对于室内和短距离室外安装，这是理想的天线选择。使用带全向天线的普通家用 AP，在“理想”的无干扰视距环境中，距离可达 ±100 米；在建筑物内部，距离会大幅缩短。混凝土、管道、金属、水……以及各种其他材料都会影响室内 WiFi。有些物体会吸收信号，有些会反射信号，有些会使信号衍射，还有些会散射信号。

因此，仅靠单个 AP/路由器并不总能覆盖所需范围，需要安装额外的 AP。如果家中存在 Wi-Fi 信号较差或完全没有信号的区域，可以考虑在问题区域附近安装新的 AP。

:::warning
**本指南适用于**“基本”或所谓的**“独立”AP 配置**。如果你使用第三方厂商的 Wi-Fi 路由器（非 MikroTik），或者你使用的是旧款 Wi-Fi 5（AC）MikroTik 路由器，或者你之前的配置中完全没有 Wi-Fi AP，可以使用本指南。

**对于由 `wifi-qcom` 软件包/驱动 AP 组成的配置，请使用 [CAPSMAN 管理](/docs/wireless/wifi/capsman)**，因为它支持 802.11 r/k/v 漫游标准，可使客户端切换更加平滑。
:::

:::note
**非 802.11 r/k/v 漫游！**

在“独立”AP 配置中，如果只是从路由器设置中复制 SSID 名称，并将 AP 配置为广播相同的 SSID 名称 → 漫游将完全取决于客户端。

漫游是指客户端设备在使用相同 WiFi 名称的不同 AP 之间切换。有一些标准可以帮助“加速”和“平滑”切换过程（例如 802.11 r/k/v），但不幸的是，在此配置中无法使用这些标准（因为没有“管理”设备），因此“是否漫游”完全由客户端决定。不同厂商实现了不同算法，用于决定客户端设备何时以及如何切换。

请记住这一点！某些设备的算法较好（决策能力较强），可以正常漫游，而另一些设备可能会一直连接到信号较差（距离最远）的 AP。
:::

我们的 MikroTik Wi-Fi 设备大多（如果不是全部）在出厂时预配置为[“路由器”角色](/docs/getting-started/first-time-configuration)。本指南将介绍如何将它们转换为独立 AP 角色设备（二层网桥 AP）。

## 接入点设置 {#access-point-setup}

:::warning
由于我们将更改 Wi-Fi 和端口相关配置，建议通过以太网端口/线缆并使用 MAC 地址连接到设备设置。你可以使用 [Winbox](/docs/management-tools/winbox) 的“Neighbors”选项卡，双击列表中设备的 MAC 地址。这样，在更改接口相关设置时，之后不会失去访问权限。
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

- `configuration.mode=ap` → 将接口配置为“接入点”模式。
- `configuration.country=Latvia` → 选择你所在的实际国家，以免违反任何法规（所在国家的“法律”）。不同国家配置文件在不同频率范围内允许的输出功率不同。
- `ssid=router.ssid.2` → 配置 AP 需要广播的无线网络名称（SSID）。它可以与主路由器使用的网络名称相同，也可以是不同名称。为便于测试，建议使用“唯一”名称，以便区分网络。要实现“客户端漫游”，请使用路由器设置中完全相同的 WiFi 名称。
- `security.authentication-types=wpa2-psk` → 选择要使用的身份验证类型。要实现“客户端漫游”，请使用路由器设置中完全相同的身份验证类型。
- `passphrase=router.password` → 设置 AP 的 WiFi 网络密码。要实现“客户端漫游”，请使用路由器设置中完全相同的密码。

### 5 GHz 接口配置 {#5-ghz-interface-configuration}

```ros
/interface/wifi
set [ find default-name=wifi1 ] configuration.mode=ap configuration.country=Latvia .ssid=router.ssid.5 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
```

- `configuration.mode=ap` → 将接口配置为“接入点”模式。
- `configuration.country=Latvia` → 选择你所在的实际国家，以免违反任何法规（所在国家的“法律”）。不同国家配置文件在不同频率范围内允许的输出功率不同。
- `ssid=router.ssid.5` → 配置 AP 需要广播的无线网络名称（SSID）。它可以与主路由器使用的网络名称相同，也可以是不同名称。为便于测试，建议使用“唯一”名称，以便区分网络。要实现“客户端漫游”，请使用路由器设置中完全相同的 WiFi 名称。
- `security.authentication-types=wpa2-psk` → 选择要使用的身份验证类型。要实现“客户端漫游”，请使用路由器设置中完全相同的身份验证类型。
- `passphrase=router.password` → 设置 AP 的 WiFi 网络密码。要实现“客户端漫游”，请使用路由器设置中完全相同的密码。

#### **增大 5 GHz 覆盖范围** {#increasing-5-ghz-range}

当地主管部门对 Wi-Fi 设备的输出功率进行监管。不同国家的不同频率范围可能允许不同的功率。可以使用以下命令检查适用于你的国家配置文件的限制：

```ros
/interface/wifi/radio/reg-info country=Latvia 0      
  ranges: 2402-2482/20dBm/40MHz   
          5170-5250/23dBm/160MHz/indoor    
          5250-5330/23dBm/160MHz/indoor/dfs
          5490-5730/30dBm/160MHz/dfs     
          5735-5875/14dBm/80MHz 
```

根据表格可以看到，使用“Latvia”国家配置文件时，可获得的最大功率为信道 `5490-5730` 上的 `30 dBm`。

此表中显示的“dBm”表示“允许的 EIRP”（EIRP=Tx 功率 + 天线增益）。为不违反任何法规和“法律”，设备天线增益越高，Tx 功率设置得越低（如果设备使用内置天线，此过程将**自动**完成），以匹配允许的“EIRP”值。

另请注意，最高 "EIRP" 的信道可能是 "DFS" 信道（这意味着如果在该信道上检测到雷达，广播将停止）。请牢记这一点！

根据这些信息，通过表格可以看出，应避免使用 `5735-5875` 范围，因为它只允许 `14 dBm`。

信道允许的 "EIRP" 越高 = 可用的输出功率越大 = 信号越强 = 可达到的距离越远。

:::info
请注意，有一个名为 `Superchannel` 的国家配置文件。在该配置文件中，不会对输出功率应用软件限制。此模式仅应在受控环境中使用，或者如果你所在地区有使用它的特别许可。你可以将其与在设置中直接“降低” Tx 功率值结合使用，以获得“自定义”功率输出。
:::

要设置信道或范围，请运行以下命令：

```ros
/interface/wifi
set [ find default-name=wifi1 ] channel.frequency=5490-5730
```

### 可选步骤 - 添加虚拟接口 {#optional-step---adding-virtual-interface}

如果要创建额外的网络（额外的 SSID 名称），可以在另一个接口之上创建 `virtual` 接口：

```ros
/interface/wifi
add configuration.mode=ap .ssid=guest.ssid.2 disabled=no master-interface=wifi2 name=wifi3 security.authentication-types=wpa2-psk .passphrase=guest.password
```

- `configuration.mode=ap` → 确保它作为“接入点”接口运行。
- `ssid=guest.ssid.2` → 配置 AP 需要广播的无线网络名称（SSID）。要实现“客户端漫游”，请使用路由器设置中完全相同的 WiFi 名称。
- `master-interface=wifi2` → 指定“虚拟”接口基于哪个接口创建（指定在哪个接口之上创建它）。
- `name=wifi3` → 命名虚拟接口。
- `security.authentication-types=wpa2-psk` → 选择要使用的认证类型。要实现“客户端漫游”，请使用路由器设置中完全相同的认证类型。
- `passphrase=guest.password` → 设置 AP 的 WiFi 网络密码。要实现“客户端漫游”，请使用路由器设置中完全相同的密码。

:::info
虚拟接口将使用与 `master` 接口完全相同的频段信道。该接口的 Wi-Fi 频段信道无法更改。
:::

### 网桥和列表 {#bridging-and-listing}

[Bridge all ports](/docs/bridging-and-switching#example-1):

```ros
/interface/bridge
add auto-mac=no comment=defconf name=bridge
/interface/bridge/port
add interface=all bridge=bridge 
```

并确保该网桥被列为“LAN”接口（`/interface list member add comment=defconf interface=bridge list=LAN`），以便防火墙规则不会阻止对 AP 管理的访问：

```ros
/interface/list/member
add comment=defconf interface=bridge list=LAN
```

当然，前提是你已在主路由器上添加了正确的防火墙和访问限制。否则，请进行限制。

### DHCP

```ros
/ip/dhcp-client
add interface=bridge
```

在网桥接口上应用 [DHCP-client](/docs/network-management/dhcp#configuration-examples)，以便 AP 本身及其所有连接的客户端从主路由器获取 IP 地址。

禁用 [DHCP-server](/docs/network-management/dhcp#dhcp-server) 功能。

### Address

如果你的路由器网络使用相同子网，请移除/禁用默认配置中分配给网桥的 [IP Address](/docs/getting-started/networking-fundamentals#address-configuration)，以免与网关 IP“冲突”。
