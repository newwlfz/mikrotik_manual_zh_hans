---
title: "无线 VLAN Trunk"
description: "本页说明如何在 MikroTik RouterOS 中使用网桥 VLAN 过滤配置无线 VLAN Trunking，以允许特定 VLAN 通过无线 PtP 链路选择性转发，同时阻止其他 VLAN。内容涵盖网桥设置、VLAN 表配置、接口访问控制以及硬件卸载 VLAN 处理。"
tags:
  - 'bridge-vlan-filtering'
  - 'vlan'
  - 'wireless'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/wireless-vlan-trunk
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

一项常见任务是通过 Wireless Point-to-Point（PtP）链路仅转发特定的 VLAN 集合。可以使用网桥 VLAN 过滤实现，应优先采用该方法，而不是其他方法（包括桥接 VLAN 接口）。假设我们需要通过 Wireless 链路转发 2 个不同的 VLAN，并丢弃所有其他 VLAN ID。VLAN 10 用于 Internet 流量，VLAN 99 用于管理流量。下面是网络拓扑：

![Wireless VLAN Trunk](/img/663b80723f6ff040.webp)

## 配置 {#configuration}

首先在 **AP** 和 **ST** 上创建新网桥，并将 **ether1** 和 **wlan1** 端口添加到该网桥：

```ros
/interface/bridge
add name=bridge protocol-mode=none
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=wlan1
```

:::info
如果需要，可以启用 RSTP，但通常 PtP 链路不需要 RSTP，因为不应出现环路。
:::

出于安全原因，应启用 ingress-filtering，因为你只预期接收带标签的流量。然后可以设置网桥过滤所有未带标签的流量。在 **AP** 和 **ST** 上执行以下操作：

```ros
/interface/bridge/port
set [find where interface=ether1 or interface=wlan1] frame-types=admit-only-vlan-tagged ingress-filtering=yes
```

设置网桥 VLAN 表。由于 VLAN99 将用作管理流量，因此需要允许该 VLAN ID 访问网桥接口，否则，当你尝试访问设备时，流量将被丢弃。VLAN10 不需要访问网桥，因为它仅用于转发到对端。要实现此功能，请在 **AP** 和 **ST** 的网桥 VLAN 表中添加以下条目：

```ros
/interface/bridge/vlan
add bridge=bridge tagged=ether1,wlan1 vlan-ids=10
add bridge=bridge tagged=ether1,wlan1,bridge vlan-ids=99
```

:::info 接口访问控制
可以按接口限制对设备的管理访问。如果希望阻止从特定接口（例如 `wlan1`）访问，只需从对应的网桥 VLAN 条目中移除该接口。
:::

:::warning 处理 Wireless 和硬件卸载 VLAN
对于同时支持硬件卸载 VLAN 过滤和 Wireless 的设备（例如 RB4011、LtAP），请谨慎操作。如果未明确允许某个 VLAN 访问 CPU，则从硬件卸载端口流向无线接口的数据包可能会被丢弃。

要允许特定 VLAN 访问 CPU：

* **添加网桥接口**作为该 VLAN 的成员（请参阅 VLAN99 示例）。
* **或者，在受影响的网桥端口上禁用 HW offloading**。
:::

所有设备（**R1**、**R2**、**AP** 和 **ST**）都需要创建 VLAN 接口，才能通过特定 VLAN ID 访问设备。对于 **AP** 和 **ST**，在网桥接口之上创建 VLAN 接口，并为其分配 IP 地址：

```ros
/interface/vlan
add interface=bridge name=MGMT vlan-id=99
/ip/address
add address=192.168.99.X/24 interface=MGMT
```

对于 **R1** 和 **R2**，执行相同操作，但需要创建 VLAN 接口所基于的接口可能会因你的配置而异：

```ros
/interface/vlan
add interface=ether1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.X/24 interface=MGMT
```

:::info
要允许转发更多 VLAN，只需在网桥 VLAN 表中指定更多 VLAN ID。你可以用逗号分隔指定多个 VLAN，甚至可以指定 VLAN 范围。
:::

### 在 **AP** 上设置无线链路 {#setup-the-wireless-link-on-ap}

```ros
/interface/wireless/security-profiles
add authentication-types=wpa2-psk mode=dynamic-keys name=wlan_sec wpa2-pre-shared-key=use_a_long_password_here
/interface/wireless
set wlan1 band=5ghz-a/n/ac channel-width=20/40/80mhz-Ceee disabled=no mode=bridge scan-list=5180 security-profile=wlan_sec ssid=ptp_test
```

### 在 **ST** 上设置无线链路 {#setup-the-wireless-link-on-st}

```ros
/interface/wireless/security-profiles
add authentication-types=wpa2-psk mode=dynamic-keys name=wlan_sec wpa2-pre-shared-key=use_a_long_password_here
/interface/wireless
set wlan1 band=5ghz-a/n/ac channel-width=20/40/80mhz-Ceee disabled=no mode=station-bridge scan-list=5180 security-profile=wlan_sec ssid=ptp_test
```

:::info
不同类型的设置有不同要求。对于 PtP 链路，通常使用 NV2 无线协议。详情请参阅 [NV2 Manual](/docs/7.24/wireless/abgn/nv2) 页面。
:::

链路设置完成后，可以在 **AP** 和 **ST** 上启用网桥 VLAN 过滤：

```ros
/interface/bridge
set bridge vlan-filtering=yes
```

:::danger
启用 VLAN 过滤前，请仔细检查网桥 VLAN 表。网桥 VLAN 表配置错误可能导致设备无法访问，并可能需要重置配置。
:::
