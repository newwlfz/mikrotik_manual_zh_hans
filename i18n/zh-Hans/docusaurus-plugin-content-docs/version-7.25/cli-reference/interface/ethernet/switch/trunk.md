---
title: "trunk"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/trunk
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/interface/ethernet/switch/unicast-fdb"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/trunk 
**Syscap：** musicswitch
**类型：** Directory

Cloud Router Switch 中的 Trunking 提供静态链路聚合组，并支持硬件自动故障切换和负载均衡。不支持与 IEEE802.3ad 和 IEEE802.1ax 兼容的 Link Aggregation Control Protocol。最多支持 8 个 Trunk 组，每个 Trunk 组最多支持 8 个 Trunk 成员端口。CRS Port Trunking 基于以下所有参数计算 transmit-hash：L2 src-dst MAC + L3 src-dst IP + L4 src-dst Port。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the Trunk group.</ArgTableRow>
<ArgTableRow arg="member-ports" typ="multi { array-id, port: enum
 }" mandatory="1">Member ports of the Trunk group.</ArgTableRow>
</ArgTable>
