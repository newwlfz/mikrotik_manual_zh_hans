---
sidebar_key: "wireless/abgn/vlans-on-wireless"
sidebar_position: 6
title: "无线网络上的 VLAN"
sidebar_label: "无线网络上的 VLAN"
description: "本页介绍如何在 MikroTik RouterOS 无线接口上配置 VLAN，从而在不同 Virtual AP 与网络之间实现二层（Layer2）分段。文中包含使用 VLAN 接口隔离 Guest 与 Work AP 的配置示例、带 VLAN filtering 的网桥配置，以及安全配置文件（security profile）的设置。"
tags:
  - 'vlan'
  - 'bridge-vlan-filtering'
  - 'wireless'
source: https://manual.mikrotik.com/docs/wireless/abgn/vlans-on-wireless
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

VLAN 可以将设备隔离到不同的二层网段，同时仍然使用相同的物理层（Layer1）介质。在需要分离不同类型的设备或用户的场景中，这非常有用。该功能对于无线网络部署也非常有用，因为你可以隔离不同的虚拟 AP，并通过防火墙限制对特定服务或网络的访问。下面是一个示例：在同一设备上配置两个接入点，并将它们隔离到不同的 VLAN 中。当你拥有 **Guest AP** 和 **Work AP** 时，这种场景非常常见。

## 示例 {#example}

![](/img/24db0ec92d966c8b.webp)

[网桥 VLAN 过滤](../../bridging-and-switching/index.md#bridge-vlan-filtering) 在网桥内提供 VLAN 感知的二层转发和 VLAN 标签修改。

### R1 {#r1}

- 在以太网接口上添加必要的 VLAN 接口，使其成为 VLAN 干道端口。在 VLAN 接口上添加 IP 地址：

```ros
/interface/vlan
add interface=ether1 name=vlan111 vlan-id=111
add interface=ether1 name=vlan222 vlan-id=222

/ip/address
add address=192.168.1.1/24 interface=vlan111
add address=192.168.2.1/24 interface=vlan222
```

### R2 {#r2}

- 在 wlan1 接口下添加 VirtualAP，并为 wlan1 和 wlan2 创建无线安全配置文件：

```ros
/interface/wireless/security-profiles
add name=vlan111 authentication-types=wpa-psk,wpa2-psk mode=dynamic-keys wpa-pre-shared-key=secret111 wpa2-pre-shared-key=secret111
add name=vlan222 authentication-types=wpa-psk,wpa2-psk mode=dynamic-keys wpa-pre-shared-key=secret222 wpa2-pre-shared-key=secret222
/interface/wireless
set [ find default-name=wlan1 ] disabled=no mode=ap-bridge security-profile=vlan111 ssid=vlan111 vlan-id=111 vlan-mode=use-tag
add disabled=no master-interface=wlan1 name=wlan2 security-profile=vlan222 ssid=vlan222 vlan-id=222 vlan-mode=use-tag
```

:::info
将 wlan1、wlan2 的 vlan-mode 设置为 "use-tag" 很重要。
:::

- 创建一个网桥，并设置 *vlan-filtering=yes*；
- 添加必要的网桥端口；
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
某些设备具有内置交换芯片，可以以线速性能在以太网端口之间交换数据包。网桥 VLAN 过滤会禁用某些设备的[硬件卸载](../../bridging-and-switching/index.md#bridge-hardware-offloading)，这将阻止数据包被交换。这不会影响无线接口，因为通过无线接口的流量无论如何都无法卸载到交换芯片。
:::

:::tip
此设置中不要求使用 VLAN 过滤，但出于安全原因强烈建议启用。在没有 VLAN 过滤的情况下，某些场景中可能会转发未知的 VLAN ID。禁用 VLAN 过滤确实具有性能优势。
:::

### R3 {#r3}

- 在 wlan1 接口上添加 IP 地址；
- 创建与 R2 wlan1 兼容的无线安全配置文件：

```ros
/ip/address
add address=192.168.1.3/24 interface=wlan1

/interface/wireless
set [ find default-name=wlan1 ] disabled=no mode=station security-profile=vlan111 ssid=vlan111
```

### R4 {#r4}

- 在 wlan1 接口上添加 IP 地址；
- 创建与 R2 wlan2 兼容的无线安全配置文件：

```ros
/ip/address
add address=192.168.2.4/24 interface=wlan1

/interface/wireless
set [ find default-name=wlan1 ] disabled=no mode=station security-profile=vlan222 ssid=vlan222
```
