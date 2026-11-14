---
sidebar_key: "cli-reference/interface/ethernet/switch/ingress-port-policer"
sidebar_position: 7
title: "ingress-port-policer"
sidebar_label: 'ingress-port-policer'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/ingress-port-policer
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/ingress-port-policer {#interfaceethernetswitchingress-port-policer}
**系统能力：** musicswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="port" typ="enum" mandatory="1">用于入口端口 policer 条目的物理端口或 trunk。</ArgTableRow>
<ArgTableRow arg="rate" typ="num" mandatory="1">最大数据速率限制。</ArgTableRow>
<ArgTableRow arg="burst" typ="num">在允许 burst 时能够传输的最大数据速率。</ArgTableRow>
<ArgTableRow arg="meter-unit" typ="enum (bit | packet) { bit:0, packet:1 }">流量入口端口 policer rate 的计量单位。</ArgTableRow>
<ArgTableRow arg="meter-len" typ="enum (layer-1 | layer-2 | layer-3) { layer-1:0, layer-2:1, layer-3:2 }">
设置用于计量的数据包字节长度的数据包分类。
- `layer-1` - 包括整个 layer-2 帧 + FCS + 包间间隔 + 前导码。
- `layer-2` - 包括 layer-2 帧 + FCS。
- `layer-3` - 仅包括 layer-3 + Ethernet 填充，不包括 layer-2 头和 FCS。
</ArgTableRow>
<ArgTableRow arg="yellow-action" typ="enum (drop | forward | remark) { drop:0, forward:1, remark:2 }">对超出流量执行的动作。</ArgTableRow>
<ArgTableRow arg="new-dei-for-yellow" typ="alt { spcial-dei: enum (remap) { remap:0xffffffff }
, dei: num [ .. 1]
 }">如果 yellow-action 为 remark，则为超出流量重标记的 DEI。</ArgTableRow>
<ArgTableRow arg="new-pcp-for-yellow" typ="alt { special-pcp: enum (remap) { remap:0xffffffff }
, pcp: num [ .. 7]
 }">如果 yellow-action 为 remark，则为超出流量重标记的 PCP。</ArgTableRow>
<ArgTableRow arg="new-dscp-for-yellow" typ="alt { special-dscp: enum (remap) { remap:0xffffffff }
, dscp: num [ .. 63]
 }">如果 yellow-action 为 remark，则为超出流量重标记的 DSCP。</ArgTableRow>
<ArgTableRow arg="packet-types" typ="ubit (arp-or-nd, tcp-control, broadcast, unregistered-multicast, registered-multicast, unknown-unicast, known-unicast)">该入口端口 policer 条目所适用的匹配数据包类型。</ArgTableRow>
</ArgTable>
