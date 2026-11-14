---
sidebar_key: "cli-reference/iot/bluetooth/scanners/index"
sidebar_position: 2
title: "scanners"
sidebar_label: "scanners"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/iot/bluetooth/scanners
captured_at: '2026-11-01T21:28:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## iot/bluetooth/scanners {#iotbluetoothscanners}
**软件包：** iot
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="type" typ="enum (passive | active) { passive:0, active:1 }"></ArgTableRow>
<ArgTableRow arg="interval" typ="num"></ArgTableRow>
<ArgTableRow arg="window" typ="num"></ArgTableRow>
<ArgTableRow arg="own-address-type" typ="enum (public | random-static | rpa-fallback-to-public | rpa-fallback-to-random) { public:0, random-static:1, rpa-fallback-to-public:2, rpa-fallback-to-random:3 }">扫描请求中使用的地址类型</ArgTableRow>
<ArgTableRow arg="filter-policy" typ="enum (default | whitelist) { default:0, whitelist:1 }"></ArgTableRow>
<ArgTableRow arg="filter-duplicates" typ="enum (off | keep-oldest | keep-newest | keep-unique) { off:0, keep-oldest:1, keep-newest:2, keep-unique:3 }">丢弃来自同一广播者的重复广播</ArgTableRow>
<ArgTableRow arg="phy" typ="enum (1M | 2M | CODED) { 1M:0, 2M:1, CODED:2 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="device" typ="enum"></ArgTableRow>
</ArgTable>
