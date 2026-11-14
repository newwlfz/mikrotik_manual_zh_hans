---
sidebar_key: "system-information-and-utilities/neighbor-discovery"
sidebar_position: 8
title: "邻居发现"
sidebar_label: "邻居发现"
description: "邻居发现协议可在二层域中使用 MNDP、CDP 或 LLDP 检测设备，并显示已连接邻居的 IP/MAC 地址和接口。配置选项包括协议选择、发现间隔调整，以及用于共享 QoS 和 VLAN 的 LLDP TLV。"
tags:
  - 'neighbor-discovery'
  - 'lldp'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/neighbor-discovery
captured_at: '2026-11-04T11:22:07+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

邻居发现协议允许你在二层广播域中查找兼容 MNDP（MikroTik Neighbor Discovery Protocol）、CDP（Cisco Discovery Protocol）或 LLDP（Link Layer Discovery Protocol）的设备。它们可用于绘制你的网络拓扑。

所有只读的邻居参数均记录在 [`/ip/neighbor`](../cli-reference/ip/neighbor/index.md) CLI 参考中。

通过 LLDP 发现的邻居显示在 [`/ip/neighbor/lldp`](../cli-reference/ip/neighbor/lldp.md) 中单独的只读菜单里。

与汇总来自所有发现协议（MNDP、CDP 和 LLDP）的邻居的常规 `/ip/neighbor` 菜单不同，`/ip/neighbor/lldp` 仅显示通过 LLDP 发现的条目。

`lldpRemTable` SNMP 表仅报告通过 LLDP 发现的邻居。仅由 CDP 或 MNDP 发现的条目不会出现在 SNMP LLDP-MIB 中。

## 在 WinBox 中查看和配置发现 {#view-and-configure-discovery-in-winbox}

打开 **IP > Neighbors** 查看已发现的设备以及发现它们时所经过的接口。选择 **LLDP** 标签页可查看仅限 LLDP 的条目。要配置发现，请在右侧面板中选择 **Discovery Settings**：

1. 在 **Interface** 中选择接口列表。这对应于 `discover-interface-list`；请选择一个包含应参与发现的接口的列表。
2. 勾选所需的 **Protocol** 复选框，并检查 **Mode**，它控制发现是发送、接收还是两者兼有。选择 **OK** 保存设置。

![WinBox Discovery Settings dialog with interface list, protocol, and mode controls](/img/2c85b54d0d8cc634.webp)

截图展示的是一个已有配置。请为你的网络选择合适的接口列表，而不是照搬其中的选择。

发现设置在 [`/ip/neighbor/discovery-settings`](../cli-reference/ip/neighbor/discovery-settings.md) 菜单中配置。

你可以通过使用[接口列表](../cli-reference/interface/list/index.md)来更改某个接口是否参与邻居发现。如果该接口包含在发现接口列表中，它将发送有关系统的基本信息，并处理在二层网络中广播收到的发现数据包。将接口从接口列表中移除，将同时禁用该接口上的邻居发现，以及在该接口上发现本设备本身的可能性。

邻居发现作用于各个从接口。当主接口（例如 bonding 或 bridge）被包含在发现接口列表中时，其所有从接口都将自动参与邻居发现。若只希望在某些从接口上启用邻居发现，请将特定的从接口加入列表，并确保主接口未被包含。

```ros
/interface/bonding
add name=bond1 slaves=ether5,ether6
/interface/list
add name=only-ether5
/interface/list/member
add interface=ether5 list=only-ether5
/ip/neighbor/discovery-settings
set discover-interface-list=only-ether5
```

现在邻居列表会显示主接口，以及实际接收到发现消息的从接口：

```ros
[admin@R2] > ip neighbor print
 # INTERFACE ADDRESS                                           MAC-ADDRESS       IDENTITY   VERSION    BOARD         
 0 ether5    192.168.88.1                                      CC:2D:E0:11:22:33 R1         6.45.4 ... CCR1036-8G-2S+
    bond1    
```

### LLDP-MED 网络策略 VLAN 示例 {#lldp-med-network-policy-vlan-example}

此示例为串联了一台 PC 的 VoIP 电话配置交换机端口。电话通过 LLDP-MED Network Policy TLV 分配的带标签流量传输语音。PC 使用无标签流量，由桥接端口的 PVID 分配到另一个 VLAN。

在此设置中：

- **ether1** 是上游 trunk 端口，以带标签方式承载所有 VLAN 至路由器。
- **ether2** 是电话端口。VoIP 电话直接连接，PC 通过电话连接。
  - 语音流量使用 **VLAN 100**（带标签），通过 `lldp-med-net-policy-vlan` 通告。
  - 来自 PC 的数据流量使用 **VLAN 200**（在电话端口上无标签），由桥接端口的 `pvid` 分配。

创建桥接并添加端口：

```ros
/interface/bridge
add name=bridge1 frame-types=admit-only-vlan-tagged

/interface/bridge/port
add bridge=bridge1 interface=ether1 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=ether2 pvid=200
```

创建桥接 VLAN 表。trunk 端口以带标签方式承载两个 VLAN。电话端口以带标签方式承载语音 VLAN。PC 的数据 VLAN 由桥接端口的 `pvid` 分配，它会动态添加无标签成员关系——无需显式指定 `untagged=ether2`：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1,ether2 vlan-ids=100
add bridge=bridge1 tagged=ether1 vlan-ids=200
```

启用 LLDP-MED 并设置语音 VLAN。禁用 CDP 以避免干扰 LLDP-MED：

```ros
/ip/neighbor/discovery-settings
set lldp-med=yes lldp-med-net-policy-vlan=100 protocol=lldp,mndp
```

在桥接上启用 VLAN 过滤：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes
```

:::note
LLDP-MED Network Policy TLV 仅在发现到支持 LLDP-MED 设备的接口上发送。它不会在未发现支持 MED 邻居的接口上广播。
:::

:::info
有关桥接 VLAN 配置的更多详细信息，请参阅[桥接 VLAN 过滤](../bridging-and-switching/index.md#bridge-vlan-filtering)。
:::

## LLDP {#lldp}

根据 RouterOS 配置，可以在 LLDP 消息中发送不同的类型-长度-值（TLV）。这包括：

- Chassis ID（MAC 地址）。
- Port ID（接口名称）。
- Time To Live。
- System Name（系统标识）。
- System Description（平台 - MikroTik，软件版本 - RouterOS 版本，硬件名称 - RouterBoard 名称）。
- Management Address（端口上配置的所有 IP 地址）。
- System Capabilities（已启用的系统能力，例如 bridge 或 router）。
- Port Description（如果发送接口是 bridge 或 bond 的一部分，则为组合接口名称，如 "bridge/ether1"，否则与 Port ID 相同的接口名称）。
- IEEE 802.1 Port VLAN ID。
- IEEE 802.1 Port And Protocol VLAN ID。
- IEEE 802.1 VLAN Name。
- IEEE 802.3 MAC/PHY Configuration/Status。
- IEEE 802.3 Power Via MDI。
- IEEE 802.3 Maximum Frame Size。
- LLDP-MED Media Capabilities（MED 能力列表）。
- LLDP-MED Network Policy（为语音流量分配的 VLAN ID）。
- LLDP-MED Extended Power via MDI。
- End of LLDPDU。
