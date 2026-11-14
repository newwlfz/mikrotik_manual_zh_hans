---
sidebar_key: "cli-reference/ip/packing"
sidebar_position: 15
title: "packing"
sidebar_label: "packing"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/packing
captured_at: '2026-11-01T21:28:52+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/packing {#ippacking}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="packing" typ="enum (none | simple | compress-headers | compress-all) { none:0x00, simple:0x01, compress-headers:0x03, compress-all:0x07 }"></ArgTableRow>
<ArgTableRow arg="unpacking" typ="enum (none | simple | compress-headers | compress-all) { none:0x00, simple:0x01, compress-headers:0x03, compress-all:0x07 }"></ArgTableRow>
<ArgTableRow arg="aggregated-size" typ="num"></ArgTableRow>
</ArgTable>
