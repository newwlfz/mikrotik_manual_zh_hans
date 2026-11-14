---
sidebar_key: "system-information-and-utilities/neighbor-discovery"
sidebar_position: 8
title: "邻居发现"
sidebar_label: "邻居发现"
description: "邻居发现使用 MNDP、CDP 和 LLDP 在二层网络上发现 MikroTik 及第三方设备：邻居列表、各协议设置、接口参与、LLDP TLV 以及 LLDP-MED 语音 VLAN 示例。"
tags:
  - 'neighbor-discovery'
  - 'lldp'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/neighbor-discovery
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

邻居发现协议允许你在二层广播域中查找兼容 MNDP（MikroTik Neighbor Discovery Protocol）、CDP（Cisco Discovery Protocol）或 LLDP（Link Layer Discovery Protocol）的设备。它们可用于绘制你的网络拓扑。

`/ip/neighbor` 列出所有发现的邻居，无论它们是由哪个协议通告的（`discovered-by` 值显示是哪个协议），并带有通用摘要字段。只读的 [`/ip/neighbor/lldp`](../cli-reference/ip/neighbor/lldp.md) 菜单仅显示由 LLDP 发现的条目以及 LLDP 专用字段，这些字段按 LLDP 标准命名。`/ip/neighbor` 的只读参数在其 [`/ip/neighbor`](../cli-reference/ip/neighbor/index.md) CLI 参考中描述：

```ros
[admin@MikroTik] > /ip/neighbor/print where identity="Router-A"
Columns: INTERFACE, ADDRESS4, ADDRESS6, MAC-ADDRESS
#  INTERFACE  ADDRESS4       ADDRESS6                   MAC-ADDRESS
0  ether2     192.168.88.24  fe80::de2c:6eff:fee7:106a  DC:2C:6E:E7:10:6B
   bridge
```

只要设备持续通告自身，邻居列表就保留条目。设备每 30 秒通告一次其存在（默认的 `discover-interval`）；当通告停止时，条目在超时老化后被删除。`lldpRemTable` SNMP 表包含与 `/ip/neighbor/lldp` 相同的 LLDP 发现条目；仅由 CDP 或 MNDP 发现的条目不属于 SNMP LLDP-MIB。

## 在 WinBox 中查看和配置发现 {#view-and-configure-discovery-in-winbox}

打开 **IP > Neighbors** 查看已发现的设备以及发现它们时所经过的接口。选择 **LLDP** 标签页可查看仅限 LLDP 的条目。要配置发现，请在右侧面板中选择 **Discovery Settings**：

1. 在 **Interface** 中选择接口列表。这对应于 `discover-interface-list`；请选择一个包含应参与发现的接口的列表。
2. 勾选所需的 **Protocol** 复选框，并检查 **Mode**，它控制发现是发送、接收还是两者兼有。选择 **OK** 保存设置。

![WinBox Discovery Settings dialog with interface list, protocol, and mode controls](/img/2c85b54d0d8cc634.webp)

截图展示的是一个已有配置。请为你的网络选择合适的接口列表，而不是照搬其中的选择。

## 选择参与发现的接口 {#choose-which-interfaces-participate}

发现设置在 [`/ip/neighbor/discovery-settings`](../cli-reference/ip/neighbor/discovery-settings.md) 菜单中配置：

```ros
/ip/neighbor/discovery-settings/print
```

发现功能运行在 `discover-interface-list` [接口列表](../cli-reference/interface/list/index.md)（默认为 `static`）中的接口上。列表中的接口既通告路由器（发送发现报文），也接受在其上监听到的邻居。从列表中移除某个接口会在两个方向上禁用该接口的发现功能：路由器不再在该接口上通告自身，并停止接受在其上监听到的邻居。将列表设置为 `none` 会完全关闭发现功能：通告停止（在其他设备上，本路由器的条目会老化消失——其 `age` 值持续增长，直到条目消失），并且本路由器自身的邻居列表会清空。若只想停止通告但保留查看邻居（例如在 WAN 上），请设置 `mode=rx-only`。

邻居发现可在各个从接口上独立工作。当主接口（bonding 或 bridge）被包含在发现接口列表中时，其所有从接口会自动参与。邻居列表同时显示主接口和通告到达的从接口（参见上例中的 `ether2` + `bridge` 条目）。若只允许在某些从接口上进行邻居发现，请仅在列表中包含这些从接口，并确保不包含主接口：

```ros
/interface/bonding add name=bond1 slaves=ether5,ether6
/interface/list add name=only-ether5
/interface/list/member add interface=ether5 list=only-ether5
/ip/neighbor/discovery-settings set discover-interface-list=only-ether5
```

## LLDP-MED 网络策略 VLAN 示例 {#lldp-med-network-policy-vlan-example}

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

有关桥接 VLAN 配置的更多详细信息，请参阅 [桥接 VLAN 过滤](../bridging-and-switching/index.md#bridge-vlan-filtering)。

## LLDP {#lldp}

根据 RouterOS 配置，可以在 LLDP 消息中发送不同的类型-长度-值（TLV）。这包括：

- 机箱 ID（MAC 地址）。
- 端口 ID（接口名称）。
- 生存时间。
- 系统名称（system identity）。
- 系统描述（平台 - MikroTik，软件版本 - RouterOS 版本，硬件名称 - RouterBoard 名称）。
- 管理地址（端口上配置的所有 IP 地址）。
- 系统能力（已启用的系统能力，例如 bridge 或 router）。
- 端口描述（如果发送接口是 bridge 或 bond 的一部分，则为“bridge/ether1”这样的组合接口名称，否则为与端口 ID 相同的接口名称）。
- IEEE 802.1 端口 VLAN ID。
- IEEE 802.1 端口和协议 VLAN ID。
- IEEE 802.1 VLAN 名称。
- IEEE 802.3 MAC/PHY 配置/状态。
- IEEE 802.3 通过 MDI 供电。
- IEEE 802.3 最大帧大小。
- LLDP-MED 媒体能力（MED 能力列表）。
- LLDP-MED 网络策略（为语音流量分配的 VLAN ID）。
- LLDP-MED 通过 MDI 扩展供电。
- LLDPDU 结束。

## 技术细节 {#technical-details}

- 设备每隔 `discover-interval`（默认 30 秒）通告一次；在接收端，如果未及时收到通告，则删除相应条目。CDP 和 LLDP 通告携带的 TTL 为 `(discover-interval * 4) + 1`。
- 通告内容和可选 TLV 由 [`/ip/neighbor/discovery-settings`](../cli-reference/ip/neighbor/discovery-settings.md) 参数控制，包括 PoE TLV（`lldp-poe-power`、`lldp-poe-in-power`）和 DCBX（`lldp-dcbx`）。
- `dying-gasp` 会在正常重启、关机或升级之前发送 TTL=0 的发现数据包，以便邻居立即删除相应条目。
- `add-dns-entries` 会根据 identity 为发现的邻居创建动态 DNS 条目；请参阅 [DNS](../network-management/dns.md)。

有关所有参数和只读值，请参阅 [`/ip/neighbor`](../cli-reference/ip/neighbor/index.md)、[`/ip/neighbor/discovery-settings`](../cli-reference/ip/neighbor/discovery-settings.md) 和 [`/ip/neighbor/lldp`](../cli-reference/ip/neighbor/lldp.md) CLI 参考页面。
