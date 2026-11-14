---
sidebar_key: "cli-reference/interface/ethernet/switch/trunk"
sidebar_position: 25
title: "trunk"
sidebar_label: 'trunk'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/trunk
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/trunk {#interfaceethernetswitchtrunk}
**系统能力：** musicswitch
**类型：** 目录

Cloud Router Switch 中的 Trunking 提供具有硬件自动故障转移和负载均衡的静态链路聚合组。不支持 IEEE802.3ad 和 IEEE802.1ax 兼容的链路聚合控制协议。最多支持 8 个 Trunk 组，每个 Trunk 组最多 8 个 Trunk 成员端口。CRS 端口 Trunking 根据以下所有参数计算 transmit-hash：L2 src-dst MAC + L3 src-dst IP + L4 src-dst Port。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">Trunk 组的名称。</ArgTableRow>
<ArgTableRow arg="member-ports" typ="multi { array-id, port: enum
 }" mandatory="1">Trunk 组的成员端口。</ArgTableRow>
</ArgTable>
