---
sidebar_key: "cli-reference/routing/igmp-proxy/mfc"
sidebar_position: 2
title: "mfc"
sidebar_label: 'mfc'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/igmp-proxy/mfc
captured_at: '2026-11-01T21:25:11+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/igmp-proxy/mfc {#routingigmp-proxymfc}
**类型：** 目录

多播转发缓存 (MFC) 状态。

RouterOS 支持 IGMP proxy 的静态多播转发规则。如果添加了静态规则，则该组的所有动态规则都将被忽略。仅当配置了 IGMP-proxy 接口（应设置上游和下游接口）时，这些规则才会生效，否则这些规则将不会处于活动状态。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="A" typ="active">已启用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="group" typ="ipAddr" mandatory="1">此规则应用的多播组地址。</ArgTableRow>
<ArgTableRow arg="source" typ="ipAddr" mandatory="1">多播数据发起方地址。</ArgTableRow>
<ArgTableRow arg="upstream-interface" typ="iface_enum" mandatory="1">正在接收流数据的接口。</ArgTableRow>
<ArgTableRow arg="downstream-interfaces" typ="multi { interface: iface_enum
 }">接收到的流将仅发送到列出的接口。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="active-downstream-interfaces" typ="multi { interface: iface_enum
 }">数据包流通过此接口离开路由器。</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">接收到的多播流量总量。</ArgTableRow>
<ArgTableRow arg="packets" typ="num">接收到的多播数据包总量。</ArgTableRow>
<ArgTableRow arg="wrong-packets" typ="num">接收到的从错误接口到达的多播数据包总量，例如，多播流是在下游接口而不是上游接口上接收的。</ArgTableRow>
</ArgTable>
