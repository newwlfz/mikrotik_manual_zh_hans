---
sidebar_key: "bridging-and-switching/user-guides/basic-vlan-switching"
sidebar_position: 1
title: "基础 VLAN 交换"
sidebar_label: "基础 VLAN 交换"
description: "本页概述了 MikroTik RouterOS 上基本的 VLAN 交换配置，涵盖采用 Marvell Prestera 和 RTL8367/CRS 系列交换芯片的设备的设置方法，包括硬件卸载的 VLAN 过滤以及端口配置示例。"
tags:
  - 'vlan'
  - 'switch-chip'
  - 'bridging'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/basic-vlan-switching
captured_at: '2026-11-04T11:14:31+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

许多 MikroTik 设备带有支持硬件级 VLAN 交换的内置交换芯片。只要采用适当的配置方法，这就能在使用 VLAN 时实现线速性能。由于不同型号的配置方法各不相同，本指南重点介绍在采用正确配置的不同设备上，设置一个基本的 trunk/access 端口，并从 trunk 端口提供管理端口，以实现最佳性能并充分利用可用的硬件组件。

![Basic VLAN Switching](/img/13be983760d55ff0.webp)

## 配备 Marvell Prestera 交换芯片以及 RTL8367、88E6393X、88E6191X、88E6190、MT7621、MT7531 和 EN7523 交换芯片的 MikroTik 设备 {#mikrotik-devices-with-marvell-prestera-switch-and-rtl8367-88e6393x-88e6191x-88e6190-mt7621-mt7531-and-en7523-switch-chips}

---

```ros
/interface/bridge
add name=bridge1 frame-types=admit-only-vlan-tagged
/interface/bridge/port
add bridge=bridge1 interface=ether1 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=ether2 pvid=20 frame-types=admit-only-untagged-and-priority-tagged
add bridge=bridge1 interface=ether3 pvid=30 frame-types=admit-only-untagged-and-priority-tagged
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 vlan-ids=20
add bridge=bridge1 tagged=ether1 vlan-ids=30
add bridge=bridge1 tagged=ether1,bridge1 vlan-ids=99
/interface/vlan
add interface=bridge1 vlan-id=99 name=MGMT
/ip/address
add address=192.168.99.1/24 interface=MGMT
/interface/bridge
set bridge1 vlan-filtering=yes
```

更详细的示例可以在[这里](../index.md#bridge-vlan-filtering)找到。

:::info
从 RouterOS v7 开始，RTL8367、88E6393X、88E6191X、88E6190、MT7621、MT7531 和 EN7523 交换芯片可以使用硬件卸载的 VLAN 过滤。
:::

:::warning
将 `frame-types` 设置为 `admit-all` 或 `admit-only-untagged-and-priority-tagged` 的网桥端口会自动添加为 `pvid` VLAN 的未标记端口。
:::

## CRS1xx/CRS2xx 系列交换机 {#crs1xxcrs2xx-series-switches}

---

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
/interface/ethernet/switch/ingress-vlan-translation
add ports=ether2 customer-vid=0 new-customer-vid=20
add ports=ether3 customer-vid=0 new-customer-vid=30
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether1 vlan-id=20
add tagged-ports=ether1 vlan-id=30
add tagged-ports=ether1,switch1-cpu vlan-id=99
/interface/ethernet/switch/vlan
add ports=ether1,ether2 vlan-id=20
add ports=ether1,ether3 vlan-id=30
add ports=ether1,switch1-cpu vlan-id=99
/interface/vlan
add interface=bridge1 vlan-id=99 name=MGMT
/ip/address
add address=192.168.99.1/24 interface=MGMT
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether1,ether2,ether3
```

更详细的示例可以在[这里](./crs1xx-2xx-series-switches-examples.md#vlan)找到。

## 其他带有内置交换芯片的设备 {#other-devices-with-a-built-in-switch-chip}

---

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
/interface/ethernet/switch/vlan
add ports=ether1,ether2 switch=switch1 vlan-id=20
add ports=ether1,ether3 switch=switch1 vlan-id=30
add ports=ether1,switch1-cpu switch=switch1 vlan-id=99
/interface/vlan
add interface=bridge1 vlan-id=99 name=MGMT
/ip/address
add address=192.168.99.1/24 interface=MGMT
/interface/ethernet/switch/port
set ether1 vlan-mode=secure vlan-header=add-if-missing
set ether2 vlan-mode=secure vlan-header=always-strip default-vlan-id=20
set ether3 vlan-mode=secure vlan-header=always-strip default-vlan-id=30
set switch1-cpu vlan-header=leave-as-is vlan-mode=secure
```

更详细的示例可以在[这里](../switch-chip-features.md#setup-examples)找到。

:::info 适用范围
此配置适用于 RouterBOARD 系列设备（RB4xx、RB9xx、RB2011、RB3011、hAP、hEX、cAP 等）。

并非所有带有交换芯片的设备都支持硬件级 VLAN 交换。如果设备支持 `VLAN table`，则可以使用内置交换芯片。使用 `/interface/ethernet/switch/print` 或[兼容性表](../switch-chip-features.md)检查芯片的能力。
:::

:::warning 硬件限制与配置规则

* **多个交换芯片：** 在具有多个芯片的设备上（例如 RB2011、RB3011、RB1100），VLAN 流量仅在*同一*芯片上的端口之间进行硬件交换。跨不同芯片桥接端口意味着 VLAN 不会在硬件级别进行过滤。要绕过此限制，可以在芯片之间连接物理网线，或使用 Bridge VLAN Filtering（这会禁用硬件卸载）。
* **QCA8337 与 Atheros8327 芯片：** 必须保留默认的 `vlan-header=leave-as-is` 属性。交换芯片使用 `default-vlan-id` 属性（该属性只应应用于 access/hybrid 端口）将未标记的入口流量分配到 VLAN。
* **RSTP 冲突：** 默认情况下，网桥接口使用 `protocol-mode=rstp`。在某些设备上，这会禁用硬件卸载。请查看 [Bridge Hardware Offloading](../index.md#bridge-hardware-offloading) 部分了解支持的功能。
:::

## 其他没有内置交换芯片的设备 {#other-devices-without-a-built-in-switch-chip}

---

可以使用 CPU 进行 VLAN 过滤；有多种方法可以做到这一点，但强烈建议使用 bridge VLAN filtering。

```ros
/interface/bridge
add name=bridge1 frame-types=admit-only-vlan-tagged
/interface/bridge/port
add bridge=bridge1 interface=ether1 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=ether2 pvid=20 frame-types=admit-only-untagged-and-priority-tagged
add bridge=bridge1 interface=ether3 pvid=30 frame-types=admit-only-untagged-and-priority-tagged
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 vlan-ids=20
add bridge=bridge1 tagged=ether1 vlan-ids=30
add bridge=bridge1 tagged=ether1,bridge1 vlan-ids=99
/interface/vlan
add interface=bridge1 vlan-id=99 name=MGMT
/ip/address
add address=192.168.99.1/24 interface=MGMT
/interface/bridge
set bridge1 vlan-filtering=yes
```

更详细的示例可以在[这里](../index.md#bridge-vlan-filtering)找到。
