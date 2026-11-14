---
sidebar_key: "cli-reference/interface/vpls/index"
sidebar_position: 1
title: "vpls"
sidebar_label: "vpls"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/vpls
captured_at: '2026-11-01T21:27:43+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/vpls {#interfacevpls}
**条件：** !smips
**类型：** 目录

所有 VPLS 接口的列表。此菜单还会显示动态创建的基于 BGP 的 VPLS 接口。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="R" typ="running">running</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="B" typ="bgp-signaled">bgp-signaled</ArgTableRow>
<ArgTableRow arg="C" typ="cisco-bgp-signaled">cisco-bgp-signaled</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">第 3 层最大传输单元。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">接口的静态 MAC 地址。未设置时自动生成。</ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp)">地址解析协议。</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }">ARP 条目过期所需的时间。设置为 `auto` 以使用接口类型的默认值。</ArgTableRow>
<ArgTableRow arg="disable-running-check" typ="bool">指定是否检测接口的运行状态。如果设置为 `no`，接口将始终具有 `running` 标志。</ArgTableRow>
<ArgTableRow arg="peer" typ="address (flags=46v)" mandatory="1">远程对等体的 IP 地址（RFC 4762 第 3.1 节）。</ArgTableRow>
<ArgTableRow arg="vpls-id" typ="address (flags=R)" unset="1">用于标识 VPLS 隧道的唯一编号。编码为 2byte+4byte 或 4byte+2byte 数字（RFC 4762 第 3.2 节）。</ArgTableRow>
<ArgTableRow arg="cisco-static-id" typ="num" unset="1">Cisco 风格的 VPLS 隧道 ID（RFC 4447 FEC 类型 0x80）。</ArgTableRow>
<ArgTableRow arg="pw-type" typ="enum (tagged-ethernet | raw-ethernet | vpls)" unset="1">伪线类型（RFC 4447 第 5.2 节）。默认使用 `raw-ethernet`。</ArgTableRow>
<ArgTableRow arg="pw-l2mtu" typ="num" unset="1">向远程对等体通告的 L2MTU 值（RFC 4447 第 5.2 节）。</ArgTableRow>
<ArgTableRow arg="pw-control-word" typ="enum (default | enabled | disabled)" unset="1">启用或禁用 Control Word 的使用（RFC 4623 第 4 节）。常规 VPLS 隧道与 Cisco 风格 VPLS 隧道的默认值不同。Cisco 风格默认禁用 Control Word 的使用。请参阅 [控制字](../../../user-guides/routing-and-networking-protocols/mpls/vpls/control-word.md) 一文了解更多信息。</ArgTableRow>
<ArgTableRow arg="bridge" typ="iface_enum" unset="1">VPLS 接口所属的 [Bridge](../bridge/index.md)。</ArgTableRow>
<ArgTableRow arg="bridge-cost" typ="num" unset="1">网桥端口的开销。</ArgTableRow>
<ArgTableRow arg="bridge-horizon" typ="num" unset="1">设置为 `none` 时，不使用网桥的 `horizon`。</ArgTableRow>
<ArgTableRow arg="bridge-pvid" typ="num" unset="1">分配给动态桥接接口的端口 VLAN ID（pvid）。仅当 [bridge `vlan-filtering`](../bridge/index.md#vlan-filtering) 设置为 `yes` 时适用。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="bgp-vpls" typ="enum">用于创建动态 VPLS 接口的 [BGP VPLS](../../routing/bgp/vpls.md) 实例名称（RFC 4761 第 3.2 节）。</ArgTableRow>
<ArgTableRow arg="bgp-vpls-prfx" typ="string">用于创建动态 VPLS 接口的 [BGP VPLS](../../routing/bgp/vpls.md) 实例前缀（RFC 4761 第 3.2 节）。</ArgTableRow>
</ArgTable>
