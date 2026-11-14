---
sidebar_key: "cli-reference/ip/dhcp-server/alert/index"
sidebar_position: 1
title: "alert"
sidebar_label: "alert"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/dhcp-server/alert
captured_at: '2026-11-01T21:28:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/alert {#ipdhcp-serveralert}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="valid-server" typ="multi { mac-address: macAddr
 }"></ArgTableRow>
<ArgTableRow arg="on-alert" typ="alt { script: string
 }"></ArgTableRow>
<ArgTableRow arg="alert-timeout" typ="alt { symbolic-names: enum (none) { none:0 }
, time-interval: time
 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="unknown-server" typ="multi { mac-address: macAddr
 }"></ArgTableRow>
</ArgTable>
