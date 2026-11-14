---
sidebar_key: "cli-reference/user/active"
sidebar_position: 2
title: "active"
sidebar_label: "active"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/user/active
captured_at: '2026-11-01T21:30:35+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/active {#useractive}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="R" typ="radius">radius</ArgTableRow>
<ArgTableRow arg="M" typ="by-romon">by-romon</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="when" typ="date"></ArgTableRow>
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="address" typ="alt { ip: ipAddr
, ip6: ip6Addr
, address: macAddr
 }"></ArgTableRow>
<ArgTableRow arg="by-romon" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="via" typ="enum (unknown | winbox | console | telnet | ftp | web | ssh | mac-telnet | bandwidth-test | api | romon | rest-api) { unknown:0, winbox:1, console:2, telnet:3, ftp:4, web:5, ssh:6, mac-telnet:7, bandwidth-test:8, api:9, romon:10, rest-api:13 }"></ArgTableRow>
<ArgTableRow arg="group" typ="enum"></ArgTableRow>
</ArgTable>
