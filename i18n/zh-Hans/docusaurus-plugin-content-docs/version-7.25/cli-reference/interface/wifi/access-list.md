---
sidebar_key: "cli-reference/interface/wifi/access-list"
sidebar_position: 2
title: "access-list"
sidebar_label: 'access-list'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/wifi/access-list
captured_at: '2026-11-01T21:23:06+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/wifi/access-list {#interfacewifiaccess-list}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="mac-address" typ="macAddr" unset="1"></ArgTableRow>
<ArgTableRow arg="mac-address-mask" typ="macAddr" unset="1"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum { any:0 }" unset="1"></ArgTableRow>
<ArgTableRow arg="signal-range" typ="composite { min: num [-120 .. 120]
, max: num [-120 .. 120]
 }" unset="1"></ArgTableRow>
<ArgTableRow arg="allow-signal-out-of-range" typ="alt { signal-out-of-range-always: enum (always) { always:0 }
, signal-out-of-range-time: time
 }" unset="1"></ArgTableRow>
<ArgTableRow arg="ssid-regexp" typ="string" unset="1"></ArgTableRow>
<ArgTableRow arg="time" typ="super { start: time [0 .. 86400]
, [end] -time [0 .. 86400]
 }" unset="1"></ArgTableRow>
<ArgTableRow arg="days" typ="ubit (sun, mon, tue, wed, thu, fri, sat)" unset="1"></ArgTableRow>
<ArgTableRow arg="action" typ="enum (accept | reject | query-radius)" unset="1"></ArgTableRow>
<ArgTableRow arg="passphrase" typ="string" unset="1"></ArgTableRow>
<ArgTableRow arg="multi-passphrase-group" typ="enum" unset="1"></ArgTableRow>
<ArgTableRow arg="radius-accounting" typ="bool" unset="1"></ArgTableRow>
<ArgTableRow arg="client-isolation" typ="bool" unset="1"></ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num" unset="1"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="last-logged-in" typ="date" unset="1"></ArgTableRow>
<ArgTableRow arg="last-logged-out" typ="date" unset="1"></ArgTableRow>
<ArgTableRow arg="match-count" typ="num" unset="1"></ArgTableRow>
</ArgTable>
