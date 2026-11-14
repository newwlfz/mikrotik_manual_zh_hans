---
sidebar_key: "wireless/wifi/configuring-repeater"
sidebar_position: 3
title: "配置无线中继器"
sidebar_label: "配置无线中继器"
description: "本指南介绍如何使用 MikroTik RouterOS 的 wifi-qcom 软件包配置无线中继器，详细说明双频接口（2.4 GHz 和 5 GHz）的设置步骤、SSID 管理、安全设置，以及漫游行为和距离限制等故障排查注意事项。"
tags:
  - 'wifi'
  - 'repeater'
  - 'station-mode'
source: https://manual.mikrotik.com/docs/7.25/wireless/wifi/configuring-repeater
captured_at: '2026-11-04T11:24:25+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**软件包：** `wifi-qcom`

:::info
本指南适用于运行 `wifi-qcom` 软件包/驱动程序的 802.11 AX 设备。
:::

Wi-Fi 范围有限。AP（广播 Wi-Fi 网络的设备）运行在 2.4 和/或 5 GHz 频率上。5 GHz 网络可提供更好的吞吐量，但覆盖范围较小。2.4 GHz 网络可确保更好的覆盖，但吞吐量较低。

室内 AP 通常配备全向天线（可在 AP 周围以“甜甜圈”形状 360° 广播信号）。对于室内和短距离室外安装，它是理想的天线选择。使用带有全向天线的简单家用 AP，在“理想”的无干扰视距环境中，您可实现最远 ±100 米的距离；在建筑物内部，该距离会进一步大幅缩短。混凝土、管道、金属、水……以及各种其他不同材料都会影响室内 Wi-Fi。有些物体会吸收信号，有些会反射，有些会衍射，有些会散射信号。

考虑到这一点，使用单个 AP/路由器并不总能覆盖所需范围，因此需要安装额外的 AP。

为获得最佳吞吐量，每个 AP 都应通过以太网线缆连接到主网络。但是！由于各种原因……很可能是为了美观，并不总是能够将线缆从 AP 布放到主路由器。

这时“**中继器**”或“**扩展器**”就能派上用场。

扩展器/中继器的工作是作为“客户端”或“station”与主路由器建立 Wi-Fi 连接，将此连接用作上行链路连接，同时广播扩展器自身的 Wi-Fi 网络。

:::info
**吞吐量！**

当设备用作扩展器时，您从中获得的吞吐量至少会减半。

一半资源被分配用于保持与路由器的持续连接，而另一半则留给重传。这会使总空口时间加倍。

另外！由于您将扩展器安装在距离主路由器较远的位置……随着距离增加，Wi-Fi 吞吐量会进一步降低。
:::

:::info
**漫游！**

如果您从路由器设置中复制 SSID 名称，并将扩展器配置为广播相同的 SSID 名称 → 漫游将完全取决于客户端。

漫游是指您的客户端设备在使用相同 Wi-Fi 名称的不同 AP 之间切换。有些标准可以帮助“加速”和“平滑”切换（如 802.11 r/k/v），但遗憾的是，在此设置中无法使用它们，因此，“漫游”或“不漫游”的决定完全由客户端决定。不同厂商实现了不同的算法，来决定您的客户端设备应如何以及何时切换。

请记住这一点！一些具有良好算法（决策）的设备会正确漫游，而其他设备可能会粘在信号较差的、最远的 AP 上。
:::

## 中继器设置 {#repeater-setup}

:::info
**使用哪个频率？**

双频路由器和接入点从一开始就应该有两个 Wi-Fi 接口 → wifi1 和 wifi2，分别代表特定频率，即 5 GHz 和 2.4 GHz。对于中继器设置，需要将其中一个接口转换为 **station** 接口（它将作为另一个网络的客户端），而另一个接口应设置为 **ap** 模式（这将允许设备广播自己的网络）。

如果我们将 2.4 GHz 用作 **station** 接口，这会增加我们可以安装中继器的距离，但也会降低从中获得的吞吐量。如果我们将 5 GHz 用作 **station** 接口，我们会缩小覆盖范围，但提高吞吐量。
:::

:::warning
由于我们将更改 Wi-Fi 和端口相关配置，建议使用 MAC 地址通过以太网端口/线缆连接到设备设置。您可以使用 [Winbox](../../management-tools/winbox.md) 的“Neighbors”选项卡，并双击列表中的设备 MAC 地址。这样，您以后在更改接口相关设置时就不会失去访问权限。
:::

在我们的示例中，我们希望将 wifi2（2.4 GHz）用作“station”接口，同时让 wifi1（5 GHz）广播中继器自己的 SSID（并且还可能通过 2.4 GHz 重新广播路由器的 SSID）：

![](/img/bc62e140b589d78a.webp)

整体配置：

```ros
/interface/wifi
set [ find default-name=wifi2 ] configuration.mode=station-bridge configuration.country=Latvia .ssid=router.ssid.2 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
set [ find default-name=wifi1 ] configuration.mode=ap configuration.country=Latvia .ssid=router.ssid.5 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
add configuration.mode=ap .ssid=router.ssid.2 disabled=no master-interface=wifi2 name=wifi3 security.authentication-types=wpa2-psk .passphrase=router.password
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
set [ find default-name=wifi2 ] configuration.mode=station-bridge .ssid=router.ssid.2 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
```

- `configuration.mode=station-bridge` → 选择 [station 模式](../user-guides/wireless-station-modes.md)。

:::info
**使用哪种 station 模式？**

对于 **MikroTik Wi-Fi 6 AX**（使用 `wifi-qcom` 软件包/驱动程序的路由器）到 **MikroTik Wi-Fi 6 AX**（使用 `wifi-qcom` 软件包/驱动程序的中继器/station）连接，请使用 **`station-bridge`** 模式。

对于 **第三方厂商** 或 **MikroTik 传统 WiFi 5 AC 及以下**（路由器）到 **Wi-Fi 6 AX**（中继器）连接，请使用 **`station-pseudobridge`** 模式。

`station-pseudobridge` 做类似“网络地址转换”的事情，但针对的是 MAC 地址。使用此模式时，如果您有多台设备连接到中继器并且它们都访问互联网，路由器会看到所有这些尝试都来自单个 MAC 地址。基本上，所有客户端设备都会隐藏在一个 MAC 地址后面，这可能会导致网络问题。不建议使用此模式，但在这种情况下，没有其他选择。

此外，在传统 MikroTik 设备上使用 `station-pseudobridge` 时，请确保传统设备已使用命令 `/interface/bridge/set protocol-mode=none` 在其桥接端口上禁用 [RSTP](../../bridging-and-switching/user-guides/spanning-tree-protocol.md)。否则，RSTP 可能会导致 DHCP-client 功能出现问题，以及通过桥接端口传递 IP 地址时出现问题。
:::

- `configuration.country=Latvia` → 选择您实际所在的国家/地区，以免违反任何法规（您所在国家的“法律”）。不同的国家/地区配置文件针对不同频率范围允许不同的输出功率。
- `ssid=router.ssid.2` → 这是路由器广播的 2.4 GHz SSID 网络名称（中继器应连接到此网络）。
- `security.authentication-types=wpa2-psk` → 选择主路由器使用的认证类型。
- `passphrase=router.password` → 配置主路由器网络的密码。这是您路由器设置中配置的密码。

### 5 GHz 接口配置 {#5-ghz-interface-configuration}

```ros
/interface/wifi
set [ find default-name=wifi1 ] configuration.mode=ap configuration.country=Latvia .ssid=router.ssid.5 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
```

- `configuration.mode=ap` → 将接口配置为在“接入点”模式下工作。
- `configuration.country=Latvia` → 选择您实际所在的国家/地区，以免违反任何法规（您所在国家的“法律”）。不同的国家/地区配置文件针对不同频率范围允许不同的输出功率。
- `ssid=router.ssid.5` → 配置中继器需要重新广播的无线网络名称（SSID）。它可以与主路由器使用的网络名称相同，也可以是不同的名称。为进行测试，最好使用“唯一”的名称，以便区分网络。要发生“客户端漫游”，请使用路由器设置中完全相同的 Wi-Fi 名称。
- `security.authentication-types=wpa2-psk` → 选择要使用的认证类型。要发生“客户端漫游”，请使用路由器设置中完全相同的认证类型。
- `passphrase=router.password` → 设置中继器 Wi-Fi 网络的密码。要发生“客户端漫游”，请使用路由器设置中完全相同的密码。

### 可选步骤 - 添加虚拟接口 {#optional-step---adding-virtual-interface}

如果您希望扩展器使用两个频率重新广播无线网络（例如，`wifi2` 保留给 `mode=station-bridge`，而您只剩下 `wifi1` 用于 `mode=ap`），请在 `station` 接口之上创建一个虚拟接口：

```ros
/interface/wifi
add configuration.mode=ap .ssid=router.ssid.2 disabled=no master-interface=wifi2 name=wifi3 security.authentication-types=wpa2-psk .passphrase=router.password
```

- `configuration.mode=ap` → 确保它将充当“接入点”接口。
- `ssid=router.ssid.2` → 配置中继器需要重新广播的无线网络名称（SSID）。要发生“客户端漫游”，请使用路由器设置中完全相同的 Wi-Fi 名称。
- `master-interface=wifi2` → 指定“虚拟”接口所“基于”的接口（指定在哪个接口之上创建它）。选择用作 `station` 接口的接口。
- `name=wifi3` → 命名虚拟接口。
- `security.authentication-types=wpa2-psk` → 选择要使用的认证类型。要发生“客户端漫游”，请使用路由器设置中完全相同的认证类型。
- `passphrase=router.password` → 设置中继器 Wi-Fi 网络的密码。要发生“客户端漫游”，请使用路由器设置中完全相同的密码。

:::info
虚拟接口将使用与 `station` 接口连接路由器所使用的完全相同的频率信道。此接口的 Wi-Fi 频率信道无法更改。
:::

### 桥接和列表 {#bridging-and-listing}

[桥接所有端口](../../bridging-and-switching/index.md#example-1)（以太网、Wi-Fi 和虚拟 Wi-Fi 接口）：

```ros
/interface/bridge
add auto-mac=no comment=defconf name=bridge
/interface/bridge/port
add interface=all bridge=bridge 
```

并确保桥接接口被列为“LAN”接口（`/interface list member add comment=defconf interface=bridge list=LAN`），以便防火墙规则不会阻止对扩展器管理的访问：

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

在桥接接口之上应用 [DHCP 客户端](../../network-management/dhcp/client.md#configuration-examples)，以便中继器本身及其所有连接的客户端从主路由器获取 IP 地址。

禁用 [DHCP 服务器](../../network-management/dhcp/server.md) 功能。

### 地址 {#address}

移除/禁用默认配置桥接接口分配的 [IP 地址](../../getting-started/networking-fundamentals/index.md#address-configuration)，以防您的路由器网络使用相同子网，从而避免与网关 IP“冲突”。
