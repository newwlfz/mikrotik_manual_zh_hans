---
sidebar_key: "cli-reference/user/index"
sidebar_position: 5
title: "user"
sidebar_label: "user"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/user
captured_at: '2026-11-01T21:30:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## 用户 {#user}

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="E" typ="expired">已过期</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="group" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="password" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="inactivity-timeout" typ="time">超过该时间段后应用无活动策略</ArgTableRow>
<ArgTableRow arg="inactivity-policy" typ="enum (none | logout | lockscreen)">指定无活动超时后执行的操作</ArgTableRow>
<ArgTableRow arg="address" typ="object { address: alt { address: ipPrefix
, address: ip6Prefix
 }
 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="last-logged-in" typ="date"></ArgTableRow>
</ArgTable>
