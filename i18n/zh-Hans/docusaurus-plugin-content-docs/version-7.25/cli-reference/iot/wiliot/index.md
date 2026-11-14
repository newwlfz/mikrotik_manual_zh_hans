---
sidebar_key: "cli-reference/iot/wiliot/index"
sidebar_position: 5
title: "wiliot"
sidebar_label: 'wiliot'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/iot/wiliot
captured_at: '2026-11-01T21:23:43+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## iot/wiliot {#iotwiliot}
**软件包：** iot
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="spoof-gps" typ="bool"></ArgTableRow>
<ArgTableRow arg="lat" typ="num"></ArgTableRow>
<ArgTableRow arg="long" typ="num"></ArgTableRow>
<ArgTableRow arg="server" typ="enum (none)">使用的 MQTT 服务器</ArgTableRow>
<ArgTableRow arg="scanner" typ="enum (none)"></ArgTableRow>
<ArgTableRow arg="advertiser" typ="enum (none)"></ArgTableRow>
<ArgTableRow arg="wi-fi" typ="iface_enum { none }"></ArgTableRow>
<ArgTableRow arg="features" typ="ubit (gateway, bridge)">支持的 Wiliot 功能</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string"></ArgTableRow>
<ArgTableRow arg="gateway-id" typ="string"></ArgTableRow>
<ArgTableRow arg="type" typ="string"></ArgTableRow>
<ArgTableRow arg="owner" typ="string"></ArgTableRow>
</ArgTable>
