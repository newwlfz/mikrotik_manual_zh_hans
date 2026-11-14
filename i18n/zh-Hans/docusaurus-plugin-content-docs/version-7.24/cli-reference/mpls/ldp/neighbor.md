---
sidebar_key: "cli-reference/mpls/ldp/neighbor"
sidebar_position: 5
title: "neighbor"
sidebar_label: "neighbor"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/mpls/ldp/neighbor
captured_at: '2026-11-01T21:29:15+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/ldp/neighbor {#mplsldpneighbor}
**条件：** !smips
**类型：** 目录

已发现和静态配置的 LDP 邻居列表。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="O" typ="operational">指示对端是否处于运行状态。</ArgTableRow>
<ArgTableRow arg="C" typ="active-connect">指示已选择主动角色，并且路由器正在尝试建立会话。</ArgTableRow>
<ArgTableRow arg="W" typ="passive-wait">指示对端是否处于被动角色，并且当前正在等待会话初始化。</ArgTableRow>
<ArgTableRow arg="T" typ="throttled">指示会话是否处于节流状态。初始化失败后会话会被节流，最大节流时间为 120s。</ArgTableRow>
<ArgTableRow arg="t" typ="sending-targeted-hello">是否正在向邻居发送定向 hello。</ArgTableRow>
<ArgTableRow arg="v" typ="vpls">邻居是否用于 LDP 信令的 VPLS 隧道。</ArgTableRow>
<ArgTableRow arg="p" typ="passive">指示对端是否处于被动角色。</ArgTableRow>
<ArgTableRow arg="d" typ="on-demand">Downstream On Demand 标签分发。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="transport" typ="address (flags=46vi)" mandatory="1">远程传输地址。</ArgTableRow>
<ArgTableRow arg="send-targeted" typ="bool" unset="1">指定是否尝试发送定向 hello，用于定向（非直连）LDP 会话。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="peer" typ="object { peer-id: composite { id: ipAddr
, namespace: num
 }
 }">邻居的 LSR-ID 和标签空间。</ArgTableRow>
<ArgTableRow arg="local-transport" typ="address (flags=46)">选定的本地传输地址。</ArgTableRow>
<ArgTableRow arg="addresses" typ="multi { array-id, address: address (flags=46)
 }">邻居上发现的地址列表。</ArgTableRow>
<ArgTableRow arg="path-vector-limit" typ="num"></ArgTableRow>
<ArgTableRow arg="on-demand" typ="bool">Downstream On Demand 标签分发。</ArgTableRow>
<ArgTableRow arg="used-afi" typ="ubit (ip, ipv6)">使用的传输 AFI。</ArgTableRow>
</ArgTable>
