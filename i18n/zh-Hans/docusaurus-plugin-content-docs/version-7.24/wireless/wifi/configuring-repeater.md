---
title: "配置无线中继器"
description: "本指南介绍如何使用 MikroTik RouterOS 的 wifi-qcom 包配置无线中继器，详细说明双频接口（2.4 GHz 和 5 GHz）的设置步骤、SSID 管理、安全设置，以及漫游行为和距离限制等故障排除注意事项。"
tags:
  - 'wifi'
  - 'repeater'
  - 'station-mode'
source: https://manual.mikrotik.com/docs/7.24/wireless/wifi/configuring-repeater
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

WiFi 覆盖范围有限。AP（广播 Wi-Fi 网络的设备）运行在 2.4 GHz 和/或 5 GHz 频段。5 GHz 网络可提供更高的吞吐量，但覆盖范围较小。2.4 GHz 网络可确保更好的覆盖，但吞吐量较低。

室内 AP 通常配备全向天线（可在 AP 周围以“甜甜圈”形状广播信号，360°）。对于室内和短距离室外安装，这是理想的天线选择。使用带全向天线的普通家用 AP，在“理想”的无干扰视距环境中，可实现最远 ±100 米的距离；在建筑物内部，该距离会大幅缩短。混凝土、管道、金属、水……以及各种其他材料都会影响室内 WiFi。有些物体会吸收信号，有些会反射信号，有些会衍射信号，还有些会散射信号。

考虑到这一点，单个 AP/路由器并不总能覆盖所需范围，需要安装额外的 AP。

为获得最佳吞吐量，每个 AP 都应通过以太网线缆连接到主网络。然而，由于各种原因（很可能是美观原因），并不总能将线缆从 AP 布设到主路由器。

此时，“**中继器**”或“**扩展器**”可以提供帮助。

扩展器/中继器的作用是作为“客户端”或“站点”与主路由器建立 Wi-Fi 连接，将该连接用作上行链路，同时广播扩展器自身的 WiFi 网络。

:::info
**Throughput!**

当设备用作扩展器时，你获得的吞吐量至少会降低一半。

一半资源用于保持与路由器的持续连接，另一半则用于重传。这会使整体空口时间翻倍。

另外！由于你将扩展器安装在距离主路由器较远的位置……距离越远，WiFi 吞吐量会进一步降低。
:::

:::info
**Roaming!**

如果你从路由器设置中复制 SSID 名称，并将扩展器配置为广播相同的 SSID 名称 → 漫游将完全取决于客户端。

漫游是指客户端设备在多个使用相同 WiFi 名称的 AP 之间切换。有一些标准可以帮助“加速”和“平滑”切换过程（如 802.11 r/k/v），但不幸的是，它们无法在此配置中使用，因此“漫游”或“不漫游”的决定完全由客户端决定。不同厂商实现了不同算法，用于决定客户端设备应如何以及何时切换。

请记住这一点！某些设备具备良好的算法（决策机制），可以正常漫游，而另一些设备可能会一直连接到信号较差、距离最远的 AP。
:::

## Repeater 设置 {#repeater-setup}

:::info
**使用哪个频段？**

双频路由器和接入点从一开始就应该有两个 Wi-Fi 接口 → wifi1 和 wifi2，分别代表 5 GHz 和 2.4 GHz 频段。对于 repeater 设置，需要将其中一个接口转换为 **station** 接口（作为另一个网络的客户端），另一个接口应设置为 **ap** 模式（允许设备广播自己的网络）。

如果将 2.4 GHz 用作 **station** 接口，可以增加 repeater 的安装距离，但也会降低可获得的吞吐量。如果将 5 GHz 用作 **station** 接口，则会缩小覆盖范围，但提高吞吐量。
:::

:::warning
由于我们将更改 Wi-Fi 和端口相关配置，建议通过以太网端口/线缆并使用 MAC 地址连接到设备设置。你可以使用 [Winbox](/docs/management-tools/winbox) 的“Neighbors”选项卡，并双击列表中设备的 MAC 地址。这样，在更改接口相关设置时，你之后不会失去访问权限。
:::

在我们的示例中，我们希望使用 wifi2（2.4 GHz）作为“station”接口，同时让 wifi1（5 GHz）广播 repeater 自己的 SSID（也可能通过 2.4 GHz 重新广播路由器的 SSID）：

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

- `configuration.mode=station-bridge` → 选择 [station 模式](/docs/wireless/user-guides/wireless-station-modes)。

:::info
**应使用哪种 station 模式？**

对于 **MikroTik Wi-Fi 6 AX**（使用 `wifi-qcom` 软件包/驱动程序的路由器）到 **MikroTik Wi-Fi 6 AX**（使用 `wifi-qcom` 软件包/驱动程序的中继器/station）的连接，使用 **`station-bridge`** 模式。

对于 **3rd-party-vendor** 或 **MikroTik legacy WiFi 5 AC and below**（路由器）到 **Wi-Fi 6 AX**（中继器）的连接，使用 **`station-pseudobridge`** 模式。

`station-pseudobridge` 执行的操作类似于“网络地址转换”，但针对的是 MAC 地址。使用该模式时，如果有多个设备连接到中继器并访问互联网，路由器会将所有这些访问视为来自单个 MAC 地址。基本上，所有客户端设备都会隐藏在一个 MAC 地址后面，这可能会导致网络问题。不建议使用该模式，但在这种情况下，没有其他选项。

此外，在旧款 MikroTik 设备上使用 `station-pseudobridge` 时，请确保旧款设备已使用命令 `/interface/bridge/set protocol-mode=none` 在其网桥端口上禁用 [RSTP](/docs/bridging-and-switching/user-guides/spanning-tree-protocol)。否则，RSTP 可能导致 DHCP-client 功能问题以及通过网桥端口传递 IP 地址的问题。
:::

- `configuration.country=Latvia` → 选择你所在的实际国家，以免违反任何法规（你所在国家的“法律”）。不同的国家配置文件在不同频率范围内允许的输出功率不同。
- `ssid=router.ssid.2` → 这是路由器广播的 2.4 GHz SSID 网络名称（中继器应连接到该网络）。
- `security.authentication-types=wpa2-psk` → 选择主路由器使用的身份验证类型。
- `passphrase=router.password` → 配置主路由器网络的密码。它是在路由器设置中配置的密码。

### 5 GHz 接口配置 {#5-ghz-interface-configuration}

```ros
/interface/wifi
set [ find default-name=wifi1 ] configuration.mode=ap configuration.country=Latvia .ssid=router.ssid.5 disabled=no security.authentication-types=wpa2-psk .passphrase=router.password
```

- `configuration.mode=ap` → 将接口配置为工作在“接入点”模式。
- `configuration.country=Latvia` → 选择你所在的实际国家，以免违反任何法规（你所在国家的“法律”）。不同的国家配置文件在不同频率范围内允许的输出功率不同。
- `ssid=router.ssid.5` → 配置中继器需要重新广播的无线网络名称（SSID）。它可以与主路由器使用的网络名称相同，也可以是不同名称。为便于测试，最好使用“唯一”名称，以便区分网络。要实现“客户端漫游”，请使用路由器设置中完全相同的 WiFi 名称。
- `security.authentication-types=wpa2-psk` → 选择要使用的身份验证类型。要实现“客户端漫游”，请使用路由器设置中完全相同的身份验证类型。
- `passphrase=router.password` → 设置中继器 WiFi 网络的密码。要实现“客户端漫游”，请使用路由器设置中完全相同的密码。

### 可选步骤 - 添加虚拟接口 {#optional-step---adding-virtual-interface}

如果你希望扩展器使用两个频率重新广播无线网络（例如，`wifi2` 保留用于 `mode=station-bridge`，而只剩下 `wifi1` 用于 `mode=ap`），请在 `station` 接口之上创建一个虚拟接口：

```ros
/interface/wifi
add configuration.mode=ap .ssid=router.ssid.2 disabled=no master-interface=wifi2 name=wifi3 security.authentication-types=wpa2-psk .passphrase=router.password
```

- `configuration.mode=ap` → 确保它充当“接入点”接口。
- `ssid=router.ssid.2` → 配置中继器需要重新广播的无线网络名称（SSID）。要实现“客户端漫游”，请使用路由器设置中完全相同的 WiFi 名称。
- `master-interface=wifi2` → 指定“虚拟”接口基于哪个接口创建（指定在哪个接口之上创建）。选择用作 `station` 接口。
- `name=wifi3` → 命名虚拟接口。
- `security.authentication-types=wpa2-psk` → 选择要使用的身份验证类型。要实现“客户端漫游”，请使用路由器设置中完全相同的身份验证类型。
- `passphrase=router.password` → 设置中继器 WiFi 网络的密码。要实现“客户端漫游”，请使用路由器设置中完全相同的密码。

:::info
虚拟接口将使用与 `station` 接口连接路由器时完全相同的频段信道。该接口的 Wi-Fi 频段信道无法更改。
:::

### 网桥和列表 {#bridging-and-listing}

[桥接所有端口](/docs/bridging-and-switching#example-1)（Ethernet、Wi-Fi 和虚拟 Wi-Fi 接口）：

```ros
/interface/bridge
add auto-mac=no comment=defconf name=bridge
/interface/bridge/port
add interface=all bridge=bridge 
```

并确保该网桥被列为“LAN”接口（`/interface list member add comment=defconf interface=bridge list=LAN`），以便防火墙规则不会阻止访问扩展器的管理功能：

```ros
/interface/list/member
add comment=defconf interface=bridge list=LAN
```

当然，这前提是主路由器上已添加正确的防火墙和访问限制。否则，请自行限制。

### DHCP

```ros
/ip/dhcp-client
add interface=bridge
```

在网桥接口上应用 [DHCP-client](/docs/network-management/dhcp#configuration-examples)，使中继器本身及其所有连接的客户端从主路由器获取 IP 地址。

禁用 [DHCP-server](/docs/network-management/dhcp#dhcp-server) 功能。

### Address

如果路由器网络使用相同子网，请移除/禁用默认配置网桥分配的 [IP Address](/docs/getting-started/networking-fundamentals#address-configuration)，以免与网关 IP“冲突”。
