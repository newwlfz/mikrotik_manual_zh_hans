---
sidebar_key: "cli-reference/interface/wifi/dashboard/show-clients"
sidebar_position: 2
title: "show-clients"
sidebar_label: 'show-clients'
source: https://manual.mikrotik.com/docs/cli-reference/interface/wifi/dashboard/show-clients
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/wifi/dashboard/show-clients {#interfacewifidashboardshow-clients}
**类型：** 命令

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="A" typ="active"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="multi { array-id, interface: iface_enum
 }" unset="1"></ArgTableRow>
<ArgTableRow arg="address" typ="macAddr" unset="1"></ArgTableRow>
<ArgTableRow arg="bssid" typ="macAddr" unset="1"></ArgTableRow>
<ArgTableRow arg="time" typ="time" unset="1"></ArgTableRow>
<ArgTableRow arg="time-start" typ="date" unset="1"></ArgTableRow>
<ArgTableRow arg="time-end" typ="date" unset="1"></ArgTableRow>
<ArgTableRow arg="event" typ="enum (connected | disconnected | failed)" unset="1"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="dhcp-address" typ="address"></ArgTableRow>
<ArgTableRow arg="dhcp-hostname" typ="string"></ArgTableRow>
<ArgTableRow arg="last-ap" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="conn" typ="num"></ArgTableRow>
<ArgTableRow arg="disconn" typ="num"></ArgTableRow>
<ArgTableRow arg="fail" typ="num"></ArgTableRow>
</ArgTable>
