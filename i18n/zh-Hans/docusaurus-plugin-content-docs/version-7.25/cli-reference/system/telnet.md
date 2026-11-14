---
sidebar_key: "cli-reference/system/telnet"
sidebar_position: 34
title: "telnet"
sidebar_label: 'telnet'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/telnet
captured_at: '2026-11-01T21:25:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/telnet {#systemtelnet}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { ip-address: ipAddr
, ipv6-address: composite { addr: ip6Addr
, interface: [ iface_enum]
 }
 }"></ArgTableRow>
<ArgTableRow arg="port" typ="num"></ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
</ArgTable>
