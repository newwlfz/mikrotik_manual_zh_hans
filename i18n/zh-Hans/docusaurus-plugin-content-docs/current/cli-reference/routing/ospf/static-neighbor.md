---
sidebar_key: "cli-reference/routing/ospf/static-neighbor"
sidebar_position: 7
title: "static-neighbor"
sidebar_label: 'static-neighbor'
source: https://manual.mikrotik.com/docs/cli-reference/routing/ospf/static-neighbor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/ospf/static-neighbor {#routingospfstatic-neighbor}
**类型：** 目录

OSPF 邻居的静态配置。非广播多路访问网络需要此配置。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="area" typ="enum" mandatory="1">邻居所属区域的名称。</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46i)" mandatory="1">单播 IP 地址以及可用于到达邻居 IP 的接口。例如，`address=1.2.3.4%ether1` 表示 IP 为 `1.2.3.4` 的邻居可通过 `ether1` 接口到达。</ArgTableRow>
<ArgTableRow arg="instance-id" typ="num"></ArgTableRow>
<ArgTableRow arg="poll-interval" typ="time">向处于 `down` 状态的邻居（即没有来自它们的流量）发送 hello 消息的频率。</ArgTableRow>
</ArgTable>
