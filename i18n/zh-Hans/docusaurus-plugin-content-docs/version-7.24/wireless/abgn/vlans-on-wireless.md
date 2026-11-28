---
title: "无线上的 VLAN"
description: "本页介绍如何在 MikroTik RouterOS 无线接口上配置 VLAN，以在不同 Virtual AP 和网络之间实现 Layer2 分段。内容包括使用 VLAN 接口隔离 Guest 和 Work AP 的设置示例、启用 VLAN filtering 的网桥配置，以及 security profile 设置。"
tags:
  - 'vlan'
  - 'bridge-vlan-filtering'
  - 'wireless'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/vlans-on-wireless
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

VLAN 可以将设备隔离到不同的 Layer2 网段，同时仍使用相同的 Layer1 介质。这在需要分离不同类型设备或用户的场景中非常有用。该功能对 Wireless 场景也非常有用，因为你可以隔离不同的 Virtual AP，并通过 Firewall 限制对特定服务或网络的访问。下面是一个示例，在同一设备上配置两个 Access Point，并将它们隔离到不同的 VLAN 中。当你有 **Guest AP** 和 **Work AP** 时，这种场景非常常见。

## 示例 {#example}

![](/img/24db0ec92d966c8b.webp)

[Bridge VLAN Filtering](/docs/bridging-and-switching#bridge-vlan-filtering) 在网桥内提供 VLAN 感知的 Layer2 转发和 VLAN 标签修改。

### R1

- 在 ethernet 接口上添加所需的 VLAN 接口，使其成为 VLAN trunk 端口。在 VLAN 接口上添加 IP 地址：

```ros
/interface/vlan
add interface=ether1 name=vlan111 vlan-id=111
add interface=ether1 name=vlan222 vlan-id=222

/ip/address
add address=192.168.1.1/24 interface=vlan111
add address=192.168.2.1/24 interface=vlan222
```

### R2

- 在 wlan1 接口下添加 VirtualAP，并为 wlan1 和 wlan2 创建 wireless security-profile：

```ros
/interface/wireless/security-profiles
add name=vlan111 authentication-types=wpa-psk,wpa2-psk mode=dynamic-keys wpa-pre-shared-key=secret111 wpa2-pre-shared-key=secret111
add name=vlan222 authentication-types=wpa-psk,wpa2-psk mode=dynamic-keys wpa-pre-shared-key=secret222 wpa2-pre-shared-key=secret222
/interface/wireless
set [ find default-name=wlan1 ] disabled=no mode=ap-bridge security-profile=vlan111 ssid=vlan111 vlan-id=111 vlan-mode=use-tag
add disabled=no master-interface=wlan1 name=wlan2 security-profile=vlan222 ssid=vlan222 vlan-id=222 vlan-mode=use-tag
```

:::info
必须将 wlan1、wlan2 的 vlan-mode 设置为“use-tag”。
:::

- 创建 *vlan-filtering=yes* 的网桥；
- 添加所需的网桥端口；
- 在 *interface bridge vlan* 部分下添加 *tagged* 接口，并设置正确的 *vlan-ids*：

```ros
/interface/bridge
add fast-forward=no name=bridge1 vlan-filtering=yes

/interface/bridge/port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=wlan1
add bridge=bridge1 interface=wlan2
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2,wlan1 vlan-ids=111
add bridge=bridge1 tagged=ether2,wlan2 vlan-ids=222
```

:::warning
部分设备内置交换芯片，可以在 Ethernet 端口之间以线速性能交换数据包。Bridge VLAN filtering 会在某些设备上禁用[硬件卸载](/docs/bridging-and-switching#bridge-hardware-offloading)，从而阻止数据包被交换。这不会影响 Wireless 接口，因为通过它们的流量无论如何都无法卸载到交换芯片。
:::

:::tip
此配置中并非必须启用 VLAN filtering，但出于安全原因强烈建议启用。未启用 VLAN filtering 时，在某些场景下可能会转发未知的 VLAN ID。禁用 VLAN filtering 确实会带来性能优势。
:::

### R3

- 在 wlan1 接口上添加 IP 地址；
- 创建与 R2 wlan1 兼容的 wireless security-profile：

```ros
/ip/address
add address=192.168.1.3/24 interface=wlan1

/interface/wireless
set [ find default-name=wlan1 ] disabled=no mode=station security-profile=vlan111 ssid=vlan111
```

### R4

- 在 wlan1 接口上添加 IP 地址；
- 创建与 R2 wlan2 兼容的无线 security-profile：

```ros
/ip/address
add address=192.168.2.4/24 interface=wlan1

/interface/wireless
set [ find default-name=wlan1 ] disabled=no mode=station security-profile=vlan222 ssid=vlan222
```
