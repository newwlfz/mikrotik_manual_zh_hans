---
title: "mfc"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/igmp-proxy/mfc
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/igmp-proxy/mfc 
**类型：** 目录

组播转发缓存（MFC）状态。

RouterOS 支持 IGMP proxy 的静态组播转发规则。如果添加静态规则，该组的所有动态规则都将被忽略。这些规则仅在配置了 IGMP-proxy 接口后生效（应设置 upstream 和 downstream 接口），否则这些规则不会处于活动状态。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="A" typ="active">active</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="group" typ="ipAddr" mandatory="1">The multicast group address this rule applies to.</ArgTableRow>
<ArgTableRow arg="source" typ="ipAddr" mandatory="1">The multicast data originator address.</ArgTableRow>
<ArgTableRow arg="upstream-interface" typ="iface_enum" mandatory="1">The interface that is receiving stream data.</ArgTableRow>
<ArgTableRow arg="downstream-interfaces" typ="multi { interface: iface_enum
 }">The received stream will be sent out to the listed interfaces only.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="active-downstream-interfaces" typ="multi { interface: iface_enum
 }">The packet stream is going out of the router through this interface.</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">The total amount of received multicast traffic.</ArgTableRow>
<ArgTableRow arg="packets" typ="num">The total amount of received multicast packets.</ArgTableRow>
<ArgTableRow arg="wrong-packets" typ="num">The total amount of received multicast packets that arrived on a wrong interface, for example, a multicast stream that is received on a downstream interface instead of an upstream interface.</ArgTableRow>
</ArgTable>
