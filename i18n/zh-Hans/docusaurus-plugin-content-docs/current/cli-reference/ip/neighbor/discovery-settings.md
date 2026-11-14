---
sidebar_key: "cli-reference/ip/neighbor/discovery-settings"
sidebar_position: 1
title: "discovery-settings"
sidebar_label: 'discovery-settings'
source: https://manual.mikrotik.com/docs/cli-reference/ip/neighbor/discovery-settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/neighbor/discovery-settings {#ipneighbordiscovery-settings}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="discover-interface-list" typ="super { !
, discover-interface-list: enum
 }">将在其成员上运行发现协议的接口列表。默认值：static。</ArgTableRow>
<ArgTableRow arg="discover-interval" typ="time">发送邻居发现数据包的频率。还会使用公式 (discover-interval * 4) + 1 调整 CDP 和 LLDP 数据包的 TTL TLV 值。范围：5s..9h6m8s。默认值：30s。</ArgTableRow>
<ArgTableRow arg="lldp-med" typ="bool">是否通告 LLDP-MED Media Capabilities TLV。使用 lldp-med-net-policy-vlan 时必须启用。默认值：yes。</ArgTableRow>
<ArgTableRow arg="lldp-med-net-policy-vlan" typ="alt { constant: enum (disabled)
, vlan-id: num [ .. 4094]
 }">用于 LLDP-MED Network Policy TLV 的通告 VLAN ID。允许为支持 LLDP-MED 的设备（例如 VoIP 电话）分配 VLAN ID。该 TLV 仅添加到发现支持 LLDP-MED 的设备且已启用 lldp-med 的接口。其他 TLV 值（Application Type、VLAN Type、L2 Priority、DSCP Priority）是预定义的。应使用 protocol 设置排除 CDP，以避免 LLDP-MED 配置错误。默认值：disabled。</ArgTableRow>
<ArgTableRow arg="lldp-mac-phy-config" typ="bool">是否在 LLDP 中发送 MAC/PHY Configuration/Status TLV，以指示接口能力、双工状态、比特率和自动协商。仅适用于 Ethernet 接口。发送 LLDP-MED 时自动包含。默认值：no。</ArgTableRow>
<ArgTableRow arg="lldp-max-frame-size" typ="bool">是否在 LLDP 中发送 Maximum Frame Size TLV，以字节为单位指示接口的最大帧大小能力（l2mtu + 18）。仅适用于 Ethernet 接口。默认值：no。</ArgTableRow>
<ArgTableRow arg="lldp-vlan-info" typ="bool">是否在 LLDP 中发送与 VLAN 相关的 IEEE 802.1 Organizationally Specific TLV。启用后，会通告三个 TLV：Port VLAN ID（网桥端口 pvid）、Port And Protocol VLAN ID（不支持）和 VLAN Name（来自网桥 VLAN 表的最多 10 个活动 VLAN）。与 vlan-filtering 网桥上的接口相关。默认值：no。</ArgTableRow>
<ArgTableRow arg="lldp-poe-power" typ="bool" syscap="poe">是否在 LLDP 消息中传输 IEEE 802.3 Organizationally Specific Power Via MDI TLV。替代 PoE-out 端口的 poe-lldp-enabled 设置。仅与支持 PoE-Out 的 Ethernet 接口相关。默认值：yes。</ArgTableRow>
<ArgTableRow arg="lldp-poe-in-power" typ="bool" syscap="poe-in">是否在 LLDP 消息中传输 PoE 输入功率 TLV。</ArgTableRow>
<ArgTableRow arg="lldp-dcbx" typ="bool" syscap="crs_prestera">是否发送 Data Center Bridging Capabilities Exchange Protocol (DCBX) TLV，使用 LLDP 与相邻设备交流交换机的 QoS 设置和能力。仅适用于带有 Marvell Prestera 交换机的设备（例如 CRS3xx）。包括 ETS Configuration、Priority Assignment、Bandwidth Allocation 和 TSA 表。默认值：no。</ArgTableRow>
<ArgTableRow arg="protocol" typ="ubit (cdp, lldp, mndp)">要使用的发现协议列表。默认值：cdp,lldp,mndp。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (tx-and-rx | tx-only | rx-only)">邻居发现数据包的发送和接收模式。默认值：tx-and-rx。</ArgTableRow>
<ArgTableRow arg="dying-gasp" typ="bool">是否在正常重启、关机或升级前发送 TTL=0 的邻居发现数据包。断电或内核恐慌时不会发送。在接收端，TTL=0 的数据包会立即删除相应的邻居条目。默认值：no。</ArgTableRow>
<ArgTableRow arg="add-dns-entries" typ="bool">是否为发现的邻居创建动态 DNS 条目，并使用其身份作为域名。</ArgTableRow>
<ArgTableRow arg="add-dns-entries-suffix" typ="string">为每个邻居创建的动态 DNS 条目添加的后缀。</ArgTableRow>
</ArgTable>
