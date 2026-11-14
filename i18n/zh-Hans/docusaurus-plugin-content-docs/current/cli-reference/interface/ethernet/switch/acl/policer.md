---
sidebar_key: "cli-reference/interface/ethernet/switch/acl/policer"
sidebar_position: 1
title: "policer"
sidebar_label: 'policer'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/acl/policer
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/acl/policer {#interfaceethernetswitchaclpolicer}
**系统能力：** musicswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">ACL 中使用的 Policer 名称。</ArgTableRow>
<ArgTableRow arg="yellow-rate" typ="num" mandatory="1">黄色丢弃优先级数据包的最大数据速率限制。</ArgTableRow>
<ArgTableRow arg="yellow-burst" typ="num">对于黄色丢弃优先级数据包，在允许突发期间可传输的最大数据速率。</ArgTableRow>
<ArgTableRow arg="red-rate" typ="num">红色丢弃优先级数据包的最大数据速率限制。</ArgTableRow>
<ArgTableRow arg="red-burst" typ="num">对于红色丢弃优先级数据包，在允许突发期间可传输的最大数据速率。</ArgTableRow>
<ArgTableRow arg="meter-unit" typ="enum (bit | packet) { bit:0, packet:1 }">ACL 流量速率的计量单位。</ArgTableRow>
<ArgTableRow arg="meter-len" typ="enum (layer-1 | layer-2 | layer-3) { layer-1:0, layer-2:1, layer-3:2 }">
设置计量所用数据包字节长度的数据包分类。
- `layer-1` - 包括整个 layer-2 帧 + FCS + 数据包间间隔 + 前导码。
- `layer-2` - 包括 layer-2 帧 + FCS。
- `layer-3` - 仅包括 layer-3 + ethernet 填充，不包括 layer-2 头和 FCS。
</ArgTableRow>
<ArgTableRow arg="color-awareness" typ="bool">
`yes` - 使 policer 考虑预先着色的丢弃优先级。
`no` - 忽略丢弃优先级。
</ArgTableRow>
<ArgTableRow arg="bucket-coupling" typ="bool"></ArgTableRow>
<ArgTableRow arg="yellow-action" typ="enum (drop | forward | remark) { drop:0, forward:1, remark:2 }">对具有黄色丢弃优先级的超额流量执行的操作。</ArgTableRow>
<ArgTableRow arg="new-dei-for-yellow" typ="alt { spcial-dei: enum (remap) { remap:0xffffffff }
, dei: num [ .. 1]
 }">黄色丢弃优先级数据包的新 DEI。</ArgTableRow>
<ArgTableRow arg="new-pcp-for-yellow" typ="alt { special-pcp: enum (remap) { remap:0xffffffff }
, pcp: num [ .. 7]
 }">黄色丢弃优先级数据包的新 PCP。</ArgTableRow>
<ArgTableRow arg="new-dscp-for-yellow" typ="alt { special-dscp: enum (remap) { remap:0xffffffff }
, dscp: num [ .. 63]
 }">黄色丢弃优先级数据包的新 DSCP。</ArgTableRow>
<ArgTableRow arg="red-action" typ="enum (drop | forward | remark) { drop:0, forward:1, remark:2 }">对具有红色丢弃优先级的超额流量执行的操作。</ArgTableRow>
<ArgTableRow arg="new-dei-for-red" typ="alt { spcial-dei: enum (remap) { remap:0xffffffff }
, dei: num [ .. 1]
 }">红色丢弃优先级数据包的新 DEI。</ArgTableRow>
<ArgTableRow arg="new-pcp-for-red" typ="alt { special-pcp: enum (remap) { remap:0xffffffff }
, pcp: num [ .. 7]
 }">红色丢弃优先级数据包的新 PCP。</ArgTableRow>
<ArgTableRow arg="new-dscp-for-red" typ="alt { special-dscp: enum (remap) { remap:0xffffffff }
, dscp: num [ .. 63]
 }">红色丢弃优先级数据包的新 DSCP。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="green-counter" typ="num"></ArgTableRow>
<ArgTableRow arg="yellow-counter" typ="num"></ArgTableRow>
<ArgTableRow arg="red-counter" typ="num"></ArgTableRow>
</ArgTable>
