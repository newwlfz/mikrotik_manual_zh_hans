---
sidebar_key: "cli-reference/interface/dot1x/server/index"
sidebar_position: 2
title: "server"
sidebar_label: "server"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/dot1x/server
captured_at: '2026-11-01T21:27:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/dot1x/server {#interfacedot1xserver}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="accounting" typ="bool"></ArgTableRow>
<ArgTableRow arg="interim-update" typ="time"></ArgTableRow>
<ArgTableRow arg="auth-types" typ="ubit (dot1x, mac-auth)"></ArgTableRow>
<ArgTableRow arg="mac-auth-mode" typ="enum (mac-as-username | mac-as-username-and-password)"></ArgTableRow>
<ArgTableRow arg="radius-mac-format" typ="enum (XX:XX:XX:XX:XX:XX | XX-XX-XX-XX-XX-XX | XXXXXXXXXXXX | xx:xx:xx:xx:xx:xx | xx-xx-xx-xx-xx-xx | xxxxxxxxxxxx) { XX:XX:XX:XX:XX:XX:0, XX-XX-XX-XX-XX-XX:3, XXXXXXXXXXXX:5, xx:xx:xx:xx:xx:xx:7, xx-xx-xx-xx-xx-xx:10, xxxxxxxxxxxx:12 }"></ArgTableRow>
<ArgTableRow arg="reauth-timeout" typ="time" deprecated="1"></ArgTableRow>
<ArgTableRow arg="reauth-period" typ="time"></ArgTableRow>
<ArgTableRow arg="auth-timeout" typ="time"></ArgTableRow>
<ArgTableRow arg="retrans-timeout" typ="time"></ArgTableRow>
<ArgTableRow arg="reject-vlan-id" typ="num"></ArgTableRow>
<ArgTableRow arg="guest-vlan-id" typ="num"></ArgTableRow>
<ArgTableRow arg="server-fail-vlan-id" typ="num"></ArgTableRow>
</ArgTable>
