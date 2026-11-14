---
sidebar_key: "cli-reference/app/network"
sidebar_position: 2
title: "network"
sidebar_label: 'network'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/app/network
captured_at: '2026-11-01T21:21:41+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## app/network {#appnetwork}
**系统能力：** app
**软件包：** container
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="e" typ="external"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="allow-outgoing-access" typ="bool"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="network" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="ip" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="status" typ="string"></ArgTableRow>
<ArgTableRow arg="used-ips" typ="multi { array-id, array-id, ip-and-name: composite { ip: ipAddr
, name: string
 }
 }"></ArgTableRow>
<ArgTableRow arg="bridge-interface" typ="iface_enum { none }"></ArgTableRow>
<ArgTableRow arg="cmds" typ="multi { cmd: string
 }"></ArgTableRow>
</ArgTable>
