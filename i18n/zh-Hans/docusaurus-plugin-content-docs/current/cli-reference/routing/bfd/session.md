---
sidebar_key: "cli-reference/routing/bfd/session"
sidebar_position: 3
title: "session"
sidebar_label: 'session'
source: https://manual.mikrotik.com/docs/cli-reference/routing/bfd/session
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bfd/session {#routingbfdsession}
**类型：**目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="U" typ="up">up</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="multihop" typ="bool"></ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
<ArgTableRow arg="remote-address" typ="address (flags=46i)"></ArgTableRow>
<ArgTableRow arg="local-address" typ="address (flags=46i)"></ArgTableRow>
<ArgTableRow arg="state" typ="enum (admin-down | down | init | up)"></ArgTableRow>
<ArgTableRow arg="state-changes" typ="num"></ArgTableRow>
<ArgTableRow arg="uptime" typ="time"></ArgTableRow>
<ArgTableRow arg="desired-tx-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="actual-tx-interval" typ="time">设备当前发送 BFD 控制报文的实时频率。</ArgTableRow>
<ArgTableRow arg="required-min-rx" typ="time"></ArgTableRow>
<ArgTableRow arg="remote-min-rx" typ="time"></ArgTableRow>
<ArgTableRow arg="remote-min-tx" typ="time"></ArgTableRow>
<ArgTableRow arg="multiplier" typ="num"></ArgTableRow>
<ArgTableRow arg="hold-time" typ="time"></ArgTableRow>
<ArgTableRow arg="packets-rx" typ="num"></ArgTableRow>
<ArgTableRow arg="packets-tx" typ="num"></ArgTableRow>
</ArgTable>
