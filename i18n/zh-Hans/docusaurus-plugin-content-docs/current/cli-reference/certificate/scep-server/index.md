---
sidebar_key: "cli-reference/certificate/scep-server"
title: "scep-server"
sidebar_label: 'scep-server'
source: https://manual.mikrotik.com/docs/cli-reference/certificate/scep-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## certificate/scep-server {#certificatescep-server}
**类型：**目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ca-cert" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="next-ca-cert" typ="enum (none) { none:0 }"></ArgTableRow>
<ArgTableRow arg="path" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="days-valid" typ="num"></ArgTableRow>
<ArgTableRow arg="request-lifetime" typ="time"></ArgTableRow>
</ArgTable>
