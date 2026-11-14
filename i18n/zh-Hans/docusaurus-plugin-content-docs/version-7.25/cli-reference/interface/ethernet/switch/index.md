---
sidebar_key: "cli-reference/interface/ethernet/switch/index"
sidebar_position: 7
title: "switch"
sidebar_label: 'switch'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch
captured_at: '2026-11-01T21:22:34+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch {#interfaceethernetswitch}
**条件：** !smips
**系统能力：** musicswitch
**类型：** 设置目录

CRS1xx 和 2xx 系列交换机的全局参数。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">交换机的名称。</ArgTableRow>
<ArgTableRow arg="bridge-type" typ="enum (customer-vid-used-as-lookup-vid | service-vid-used-as-lookup-vid) { customer-vid-used-as-lookup-vid:0, service-vid-used-as-lookup-vid:1 }">定义哪个 VLAN 标签用作 Lookup-VID。Lookup-VID 用作所有基于 VLAN 的查找的 VLAN 键。</ArgTableRow>
<ArgTableRow arg="drop-if-no-vlan-assignment-on-ports" typ="multi { array-id }">如果未应用基于 MAC、基于协议的 VLAN 分配或入向 VLAN 转换，则丢弃帧的端口。</ArgTableRow>
<ArgTableRow arg="drop-if-invalid-or-src-port-not-member-of-vlan-on-ports" typ="multi { array-id, port: enum
 }">丢弃无效帧以及其他端口 VLAN ID 帧的端口。</ArgTableRow>
<ArgTableRow arg="unknown-vlan-lookup-mode" typ="enum (ivl | svl)">
具有无效 VLAN 的数据包的查找和学习模式。
 - `ivl` - 使用独立 VLAN 学习，
 - `svl` - 使用共享 VLAN 学习。
</ArgTableRow>
<ArgTableRow arg="forward-unknown-vlan" typ="bool">是否允许转发不属于 VLAN 表的 VLAN。</ArgTableRow>
<ArgTableRow arg="use-svid-in-one2one-vlan-lookup" typ="bool">是否使用服务 VLAN ID 进行 1:1 VLAN 交换查找。</ArgTableRow>
<ArgTableRow arg="use-cvid-in-one2one-vlan-lookup" typ="bool">是否使用客户 VLAN ID 进行 1:1 VLAN 交换查找。</ArgTableRow>
<ArgTableRow arg="mac-level-isolation" typ="bool">全局启用或禁用 MAC 级别隔离。一旦启用，交换机将从单播转发表中检查源和目标 MAC 地址条目及其 `isolation-profile`。默认情况下，交换机会学习 MAC 地址并将其放入 `promiscuous` 隔离配置文件。创建静态单播条目时可以使用其他隔离配置文件。如果源或目标 MAC 地址位于 `promiscuous` 隔离配置文件中，则转发数据包。如果源和目标 MAC 地址都位于相同的 `community1` 或 `community2` 隔离配置文件中，则转发数据包。当源和目标 MAC 地址隔离配置文件为 `isolated` 时，或者当源和目标 MAC 地址隔离配置文件来自不同社区（例如源 MAC 地址为 `community1`，目标 MAC 地址为 `community2`）时，数据包将被丢弃。当 MAC 级别隔离全局禁用时，隔离会被绕过。</ArgTableRow>
<ArgTableRow arg="multicast-lookup-mode" typ="enum (dst-mac-and-vid-always | dst-ip-and-vid-for-ipv4) { dst-mac-and-vid-always:0, dst-ip-and-vid-for-ipv4:1 }">
IPv4 组播桥接的查找模式。
- `dst-mac-and-vid-always` - 对于所有数据包类型，查找键是目标 MAC 和 VLAN ID。
- `dst-ip-and-vid-for-ipv4` - 对于 IPv4 数据包，查找键是目标 IP 和 VLAN ID。
</ArgTableRow>
<ArgTableRow arg="override-existing-when-ufdb-full" typ="bool">当 UFDB 已满时，启用或禁用覆盖具有最低老化值的现有条目。</ArgTableRow>
<ArgTableRow arg="unicast-fdb-timeout" typ="time">单播 FDB 条目的超时时间。</ArgTableRow>
<ArgTableRow arg="ingress-mirror0" typ="composite { port-or-trunk: alt { port: enum (none) { none:0xffffffff }
, trunk: enum
 }
, packet-format: [ enum (unmodified | analyzer-configured) { unmodified:0, analyzer-configured:1 }]
 }">
第一个入向镜像分析器端口或 trunk 及镜像格式。
 - `analyzer-configured` - 数据包与发往目标的数据包相同，VLAN 格式根据分析器端口的 VLAN 配置进行修改。
 - `unmodified` - 流量按原始传入数据包格式进行镜像，不对其做任何更改，但边缘端口中的服务 VLAN 标签会被剥离。
</ArgTableRow>
<ArgTableRow arg="ingress-mirror1" typ="composite { port-or-trunk: alt { port: enum (none) { none:0xffffffff }
, trunk: enum
 }
, packet-format: [ enum (unmodified | analyzer-configured) { unmodified:0, analyzer-configured:1 }]
 }">
第二个入向镜像分析器端口或 trunk 及镜像格式。
 - `analyzer-configured` - 数据包与发往目标的数据包相同，VLAN 格式根据分析器端口的 VLAN 配置进行修改。
 - `unmodified` - 流量按原始传入数据包格式进行镜像，不对其做任何更改，但边缘端口中的服务 VLAN 标签会被剥离。
</ArgTableRow>
<ArgTableRow arg="ingress-mirror-ratio" typ="enum (1/1 | 1/2 | 1/4 | 1/8 | 1/16 | 1/32 | 1/64 | 1/128 | 1/256 | 1/512 | 1/1024 | 1/2048 | 1/4096 | 1/8192 | 1/16384 | 1/32768)">入向镜像数据包占所有数据包的比例。</ArgTableRow>
<ArgTableRow arg="egress-mirror0" typ="composite { port-or-trunk: alt { port: enum (none) { none:0xffffffff }
, trunk: enum
 }
, packet-format: [ enum (modified | analyzer-configured | original) { modified:0, analyzer-configured:1, original:2 }]
 }">
第一个出向镜像分析器端口或 trunk 及镜像格式。
 - `analyzer-configured` - 数据包与发往目标的数据包相同，VLAN 格式根据分析器端口的 VLAN 配置进行修改。
 - `modified` - 数据包与发往目标的数据包相同，VLAN 格式根据出向端口的 VLAN 配置进行修改。
 - `original` - 流量按原始传入数据包格式进行镜像，不对其做任何更改，但边缘端口中的服务 VLAN 标签会被剥离。
</ArgTableRow>
<ArgTableRow arg="egress-mirror1" typ="composite { port-or-trunk: alt { port: enum (none) { none:0xffffffff }
, trunk: enum
 }
, packet-format: [ enum (modified | analyzer-configured | original) { modified:0, analyzer-configured:1, original:2 }]
 }">
第二个出向镜像分析器端口或 trunk 及镜像格式。
 - `analyzer-configured` - 数据包与发往目标的数据包相同，VLAN 格式根据分析器端口的 VLAN 配置进行修改。
 - `modified` - 数据包与发往目标的数据包相同，VLAN 格式根据出向端口的 VLAN 配置进行修改。
 - `original` - 流量按原始传入数据包格式进行镜像，不对其做任何更改，但边缘端口中的服务 VLAN 标签会被剥离。
</ArgTableRow>
<ArgTableRow arg="egress-mirror-ratio" typ="enum (1/1 | 1/2 | 1/4 | 1/8 | 1/16 | 1/32 | 1/64 | 1/128 | 1/256 | 1/512 | 1/1024 | 1/2048 | 1/4096 | 1/8192 | 1/16384 | 1/32768)">出向镜像数据包占所有数据包的比例。</ArgTableRow>
<ArgTableRow arg="fdb-uses" typ="enum (mirror0 | mirror1) { mirror0:0, mirror1:1 }">用于基于 FDB 的镜像的分析器端口。</ArgTableRow>
<ArgTableRow arg="vlan-uses" typ="enum (mirror0 | mirror1) { mirror0:0, mirror1:1 }">用于基于 VLAN 的镜像的分析器端口。</ArgTableRow>
<ArgTableRow arg="mirror-egress-if-ingress-mirrored" typ="bool">当数据包同时应用入向和出向镜像时，如果此设置被禁用，则仅对该数据包执行入向镜像。如果启用，则应用两种镜像类型。</ArgTableRow>
<ArgTableRow arg="mirror-tx-on-mirror-port" typ="bool"></ArgTableRow>
<ArgTableRow arg="mirrored-packet-qos-priority" typ="num">镜像数据包中重标记的优先级。</ArgTableRow>
<ArgTableRow arg="mirrored-packet-drop-precedence" typ="enum (green | yellow | red | drop)">镜像数据包中重标记的丢弃优先级。此 QoS 属性用于镜像数据包的入队或丢弃。</ArgTableRow>
<ArgTableRow arg="bypass-vlan-ingress-filter-for" typ="ubit (eapol, ripv1, dhcpv4, dhcpv6, igmp, mld, arp, nd, pppoe-discovery)">从入向 VLAN 过滤中排除的协议。如果这些协议具有无效 VLAN，则不会被丢弃。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1）。</ArgTableRow>
<ArgTableRow arg="bypass-ingress-port-policing-for" typ="ubit (eapol, ripv1, dhcpv4, dhcpv6, igmp, mld, arp, nd, pppoe-discovery)">从入向端口监管中排除的协议。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1）。</ArgTableRow>
<ArgTableRow arg="bypass-l2-security-check-filter-for" typ="ubit (eapol, ripv1, dhcpv4, dhcpv6, igmp, mld, arp, nd, pppoe-discovery)">从策略规则安全检查中排除的协议。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="type" typ="enum (QCA-8513L | QCA-8519 | QCA-8511) { QCA-8513L:9, QCA-8519:11, QCA-8511:12 }"></ArgTableRow>
</ArgTable>

## interface/ethernet/switch {#interfaceethernetswitch-1}
**系统能力：** rbswitch
**类型：** 目录

具有 Marwell Prestera 芯片的交换机的全局参数。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="mirror-source" typ="iface_enum { none:0 }" syscap="switch-mirror1">选择单个镜像源端口。入向和出向流量将被发送到 `mirror-target` 端口。请注意，`mirror-target` 端口必须属于同一交换机。</ArgTableRow>
<ArgTableRow arg="mirror-target" typ="iface_enum { none:0, cpu:0xffffffff }" syscap="switch-mirror-prestera">选择单个镜像目标端口。来自 [`mirror-egress`](./port/index.md#mirror-egress)、[`mirror-ingress`](./port/index.md#mirror-ingress) 和 [`mirror`](./rule/index.md#mirror) 的镜像数据包将被发送到所选端口。</ArgTableRow>
<ArgTableRow arg="mirror-egress-target" typ="enum (none) { none:0 }" syscap="switch-mv88e6xxx">选择单个镜像出向目标端口。来自 `mirror-egress`（参见端口菜单中的属性）的镜像数据包将被发送到所选端口。</ArgTableRow>
<ArgTableRow arg="rspan" typ="bool" syscap="switch-mirror-prestera">在 `mirror-target` 上启用远程交换机端口分析器（RSPAN）功能。标记为入向或出向镜像的流量通过指定的远程分析器 VLAN 传输 - `rspan-egress-vlan-id` 和 `rspan-ingress-vlan-id`。</ArgTableRow>
<ArgTableRow arg="rspan-ingress-vlan-id" typ="num" syscap="switch-mirror-prestera">选择标记的入向流量的 VLAN ID。仅在启用 `rspan` 时适用。</ArgTableRow>
<ArgTableRow arg="rspan-egress-vlan-id" typ="num" syscap="switch-mirror-prestera">选择标记的出向流量的 VLAN ID。仅在启用 `rspan` 时适用。</ArgTableRow>
<ArgTableRow arg="switch-all-ports" typ="bool">仅在 RB450G/RB435G/RB850Gx2 设备上更改 ether1 交换机组。`yes` - ether1 属于交换机，并支持所有高级功能，包括扩展统计信息。`no` - ether1 不属于交换机，实际上使其成为独立以太网端口，提高吞吐量但移除交换能力。</ArgTableRow>
<ArgTableRow arg="cpu-flow-control" typ="bool" syscap="switch-mv88e6xxx">禁用或启用 CPU 流控功能。交换机芯片通过在链路容量超出时发送 Pause 帧来确保 CPU 端口不会拥塞。如果没有此功能，对路由或管理至关重要的数据包可能会被丢弃。</ArgTableRow>
<ArgTableRow arg="l3-hw-offloading" typ="bool" syscap="crs_prestera">三层硬件卸载。允许将路由功能卸载到交换机芯片以实现线速。</ArgTableRow>
<ArgTableRow arg="qos-hw-offloading" typ="bool" syscap="crs_prestera">服务质量（QoS）硬件卸载。允许为给定交换机芯片启用 QoS（如果支持 QoS）。关闭此设置不会完全恢复到之前的功能。建议在禁用后重启设备。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="type" typ="enum (ADMtek | IC-Plus-175C | IC-Plus-178C | IC-Plus-175D | Atheros-8316 | Atheros-7240 | Atheros-8227 | Atheros-8327 | Atheros-8236 | QCA-8513L | Atheros-8327N | QCA-8519 | QCA-8511 | QCA-8337 | MediaTek-MT7621 | Realtek-RTL8367 | Marvell-98DX3236 | Marvell-98DX8216 | Marvell-98DX8208 | Marvell-98DX8332 | Marvell-98DX8212 | Marvell-98DX3257 | IPQ-PPE | Marvell-98DX8525 | Marvell-98PX1012 | Marvell-98DX4310 | Marvell-98DX224S | Marvell-98DX226S | Marvell-88E6393X | Marvell-98DX3255 | Marvell-88E6191X | Marvell-98DX2528 | Marvell-98CX8410 | Marvell-88E6341 | MediaTek-MT7531 | Marvell-88E6190 | Marvell-98DX7335 | Marvell-98DX3510 | Marvell-98DX3550 | MediaTek-MT7531AE | Marvell-98DX1508M | IPQ-9570 | Marvell-98DX3530 | Marvell-98DX4550 | QCA-8386 | EN7523 | Marvell-98DX2521 | Marvell-98DX2556 | Marvell-98DX2588 | Marvell-98DX7335M) { ADMtek:0, IC-Plus-175C:1, IC-Plus-178C:2, IC-Plus-175D:3, Atheros-8316:4, Atheros-7240:5, Atheros-8227:6, Atheros-8327:7, Atheros-8236:8, QCA-8513L:9, Atheros-8327N:10, QCA-8519:11, QCA-8511:12, QCA-8337:13, MediaTek-MT7621:14, Realtek-RTL8367:15, Marvell-98DX3236:16, Marvell-98DX8216:17, Marvell-98DX8208:18, Marvell-98DX8332:19, Marvell-98DX8212:20, Marvell-98DX3257:21, IPQ-PPE:22, Marvell-98DX8525:23, Marvell-98PX1012:24, Marvell-98DX4310:25, Marvell-98DX224S:26, Marvell-98DX226S:27, Marvell-88E6393X:28, Marvell-98DX3255:29, Marvell-88E6191X:30, Marvell-98DX2528:31, Marvell-98CX8410:32, Marvell-88E6341:33, MediaTek-MT7531:34, Marvell-88E6190:35, Marvell-98DX7335:36, Marvell-98DX3510:37, Marvell-98DX3550:38, MediaTek-MT7531AE:39, Marvell-98DX1508M:40, IPQ-9570:41, Marvell-98DX3530:42, Marvell-98DX4550:43, QCA-8386:44, EN7523:45, Marvell-98DX2521:46, Marvell-98DX2556:47, Marvell-98DX2588:48, Marvell-98DX7335M:49 }"></ArgTableRow>
<ArgTableRow arg="driver-rx-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-rx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-tx-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-tx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-bytes" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-too-short" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-too-long" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-broadcast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-pause" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-multicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-fcs-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-align-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-fragment" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-overflow" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-control" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-unknown-op" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-length-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-code-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-carrier-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-jabber" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-drop" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-ip-header-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-tcp-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-udp-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-bytes" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-too-short" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-too-long" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-broadcast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-pause" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-multicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-underrun" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-excessive-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-multiple-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-single-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-excessive-deferred" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-deferred" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-late-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-total-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-pause-honored" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-jabber" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-fcs-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-control" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-fragment" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-carrier-sense-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom0-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom0-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom1-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom1-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="policy-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="custom-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="current-learned" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="not-learned" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-unicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-unicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-error-events" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-codewords" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-corrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-uncorrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-symbol-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-rx-block" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-block-corrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-block-uncorrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue0-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue0-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue1-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue1-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue2-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue2-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue3-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue3-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue4-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue4-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue5-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue5-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue6-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue6-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue7-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue7-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue0-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue0-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue1-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue1-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue2-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue2-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue3-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue3-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue4-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue4-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue5-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue5-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue6-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue6-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue7-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue7-byte" typ="multi { counter: num
 }"></ArgTableRow>
</ArgTable>
