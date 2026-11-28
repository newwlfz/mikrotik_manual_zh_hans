---
title: "基本 VLAN 交换"
description: "本页概述 MikroTik RouterOS 上的基本 VLAN 交换配置，涵盖采用 Marvell Prestera 和 RTL8367/CRS 系列交换芯片的设备设置，包括硬件卸载 VLAN 过滤和端口配置示例。"
tags:
  - 'vlan'
  - 'switch-chip'
  - 'bridging'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/basic-vlan-switching
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "bridging-and-switching/user-guides"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

许多 MikroTik 设备内置支持硬件级 VLAN 交换的交换芯片。采用适当的配置方法时，使用 VLAN 可实现线速性能。由于不同型号的配置方法有所不同，本指南介绍如何在不同设备上配置基本 trunk/access 端口，并从 trunk 端口设置管理端口，通过正确配置获得最佳性能并充分利用可用的硬件组件。

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

更多详细示例请参阅[此处](/docs/7.24/bridging-and-switching#bridge-vlan-filtering)。

:::info
从 RouterOS v7 开始，RTL8367、88E6393X、88E6191X、88E6190、MT7621、MT7531 和 EN7523 交换芯片可以使用硬件卸载的 VLAN 过滤。
:::

:::warning
`frame-types` 设置为 `admit-all` 或 `admit-only-untagged-and-priority-tagged` 的网桥端口将作为 `pvid` VLAN 的未标记端口自动添加。
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

更多详细示例请参阅[此处](/docs/7.24/bridging-and-switching#bridge-vlan-filtering)。

## 其他内置交换芯片的设备 {#other-devices-with-a-built-in-switch-chip}

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

更多详细示例请参阅[此处](/docs/7.24/bridging-and-switching#bridge-vlan-filtering)。

:::info 适用范围与范围
此配置适用于 RouterBOARD 系列设备（RB4xx、RB9xx、RB2011、RB3011、hAP、hEX、cAP 等）。

并非所有带交换芯片的设备都支持硬件级 VLAN 交换。如果设备支持 `VLAN table`，则可以使用内置交换芯片。使用 `/interface/ethernet/switch/print` 或[兼容性表](/docs/7.24/bridging-and-switching/switch-chip-features)检查芯片能力。
:::

:::warning 硬件限制与配置规则

* **多个交换芯片：** 在具有多个芯片的设备上（例如 RB2011、RB3011、RB1100），VLAN 流量仅在*同一*芯片上的端口之间进行硬件交换。跨不同芯片桥接端口意味着 VLAN 不会在硬件层面被过滤。要绕过此限制，可以在芯片之间连接物理线缆，或使用 Bridge VLAN Filtering（这会禁用硬件卸载）。
* **QCA8337 和 Atheros8327 芯片：** 必须保留默认属性 `vlan-header=leave-as-is`。交换芯片使用 `default-vlan-id` 属性（该属性只应应用于 access/hybrid 端口）将未标记 ingress 流量分配到 VLAN。
* **RSTP 冲突：** 默认情况下，网桥接口使用 `protocol-mode=rstp`。在某些设备上，这会禁用硬件卸载。请查看 [Bridge Hardware Offloading](/docs/7.24/bridging-and-switching#bridge-hardware-offloading) 部分以了解支持的功能。
:::

## 其他没有内置交换芯片的设备 {#other-devices-without-a-built-in-switch-chip}

---

可以使用 CPU 进行 VLAN 过滤；有多种方法可以实现，但强烈建议使用网桥 VLAN 过滤。

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

更多详细示例请参阅[此处](/docs/7.24/bridging-and-switching#bridge-vlan-filtering)。
