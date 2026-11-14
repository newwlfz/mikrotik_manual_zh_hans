---
sidebar_key: "bridging-and-switching/user-guides/wireless-vlan-trunk"
sidebar_position: 8
title: "无线 VLAN 中继"
sidebar_label: "无线 VLAN 中继"
description: "本页说明如何在 MikroTik RouterOS 上使用 bridge VLAN filtering 配置 Wireless VLAN Trunking，从而允许在无线 PtP 链路上选择性地转发特定 VLAN，同时阻止其他 VLAN。内容涵盖 bridge 设置、VLAN 表配置、接口访问控制以及硬件卸载的 VLAN 处理。"
tags:
  - 'bridge-vlan-filtering'
  - 'vlan'
  - 'wireless'
source: https://manual.mikrotik.com/docs/bridging-and-switching/user-guides/wireless-vlan-trunk
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

一项非常常见的任务是通过无线点对点（PtP）链路仅转发特定的一组 VLAN。这可以通过 bridge VLAN filtering 实现，并且应当使用它，而不要使用任何其他方法（包括桥接 VLAN 接口）。假设我们需要通过无线链路转发 2 个不同的 VLAN，其他所有 VLAN ID 都应被丢弃。VLAN 10 将用于我们的互联网流量，而 VLAN 99 将用于我们的管理流量。下面是网络拓扑：

![Wireless VLAN Trunk](/img/663b80723f6ff040.webp)

## 配置 {#configuration}

首先在 **AP** 和 **ST** 上创建一个新的 bridge，并向其中添加 **ether1** 和 **wlan1** 端口：

```ros
/interface/bridge
add name=bridge protocol-mode=none
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=wlan1
```

:::info
如有需要，你可以启用 RSTP，但通常 PtP 链路并不需要 RSTP，因为不应存在任何可能形成环路的情况。
:::

出于安全考虑，你应当启用 ingress-filtering，因为你只期望接收带标签的流量。然后你可以将 bridge 设置为过滤掉所有未打标签的流量。在 **AP** 和 **ST** 上执行以下操作：

```ros
/interface/bridge/port
set [find where interface=ether1 or interface=wlan1] frame-types=admit-only-vlan-tagged ingress-filtering=yes
```

设置 bridge VLAN 表。由于 VLAN99 将用于我们的管理流量，因此我们需要允许该 VLAN ID 访问 bridge 接口，否则一旦你尝试访问设备，流量就会被丢弃。VLAN10 不需要访问 bridge，因为它只用于转发到另一端。要实现这样的功能，请在 **AP** 和 **ST** 上的 bridge VLAN 表中添加以下条目：

```ros
/interface/bridge/vlan
add bridge=bridge tagged=ether1,wlan1 vlan-ids=10
add bridge=bridge tagged=ether1,wlan1,bridge vlan-ids=99
```

:::info 接口访问控制
你可以按接口限制对设备的管理访问。如果你希望阻止从某个特定接口（例如 `wlan1`）进行访问，只需从相应的 bridge VLAN 条目中移除该接口即可。
:::

:::warning 处理无线与硬件卸载 VLAN
对于同时支持硬件卸载 VLAN filtering 和无线功能的设备（例如 RB4011、LtAP），需要谨慎操作。如果未显式允许该 VLAN 的 CPU 访问，从硬件卸载端口流向无线接口的数据包可能会被丢弃。

要允许特定 VLAN 的 CPU 访问：

* **将 bridge 接口**添加为该 VLAN 的成员（参见 VLAN99 示例）。
* **或者，在受影响的 bridge 端口上禁用硬件卸载**。
:::

所有设备（**R1**、**R2**、**AP** 和 **ST**）都需要创建一个 VLAN 接口，以便能够通过特定的 VLAN ID 访问设备。对于 **AP** 和 **ST**，在 bridge 接口之上创建 VLAN 接口并为其分配 IP 地址：

```ros
/interface/vlan
add interface=bridge name=MGMT vlan-id=99
/ip/address
add address=192.168.99.X/24 interface=MGMT
```

对于 **R1** 和 **R2**，做同样的操作，但需要在其上创建 VLAN 接口的接口可能会因你的具体设置而不同：

```ros
/interface/vlan
add interface=ether1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.X/24 interface=MGMT
```

:::info
要允许转发更多 VLAN，你只需在 bridge VLAN 表中指定更多 VLAN ID，可以用逗号分隔指定多个 VLAN，甚至可以使用 VLAN 范围。
:::

### 在 **AP** 上配置无线链路 {#setup-the-wireless-link-on-ap}

```ros
/interface/wireless/security-profiles
add authentication-types=wpa2-psk mode=dynamic-keys name=wlan_sec wpa2-pre-shared-key=use_a_long_password_here
/interface/wireless
set wlan1 band=5ghz-a/n/ac channel-width=20/40/80mhz-Ceee disabled=no mode=bridge scan-list=5180 security-profile=wlan_sec ssid=ptp_test
```

### 在 **ST** 上配置无线链路 {#setup-the-wireless-link-on-st}

```ros
/interface/wireless/security-profiles
add authentication-types=wpa2-psk mode=dynamic-keys name=wlan_sec wpa2-pre-shared-key=use_a_long_password_here
/interface/wireless
set wlan1 band=5ghz-a/n/ac channel-width=20/40/80mhz-Ceee disabled=no mode=station-bridge scan-list=5180 security-profile=wlan_sec ssid=ptp_test
```

:::info
每种类型的设置都有不同的要求。对于 PtP 链路，通常使用 NV2 无线协议。你可以在  [NV2 手册](../../wireless/abgn/nv2.md)  页面阅读有关 NV2 的更多信息。
:::

链路建立完成后，你可以在 **AP** 和 **ST** 上启用 bridge VLAN filtering：

```ros
/interface/bridge
set bridge vlan-filtering=yes
```

:::danger
在启用 VLAN filtering 之前，请仔细检查 bridge VLAN 表。bridge VLAN 表配置错误可能导致设备无法访问，并且可能需要重置配置。
:::
