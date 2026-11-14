---
sidebar_key: "cli-reference/mpls/mangle/index"
sidebar_position: 1
title: "mangle"
sidebar_label: 'mangle'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/mpls/mangle
captured_at: '2026-11-01T21:24:53+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/mangle {#mplsmangle}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="chain" typ="ubit (forward, output)" unset="1"></ArgTableRow>
<ArgTableRow arg="exp" typ="ubit (0, 1, 2, 3, 4, 5, 6, 7)" unset="1"></ArgTableRow>
<ArgTableRow arg="set-exp" typ="enum (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) { 0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7 }" unset="1"></ArgTableRow>
<ArgTableRow arg="set-mark" typ="enum" unset="1"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="packets" typ="num"></ArgTableRow>
</ArgTable>
