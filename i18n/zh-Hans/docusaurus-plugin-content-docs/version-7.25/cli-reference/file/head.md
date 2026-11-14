---
sidebar_key: "cli-reference/file/head"
sidebar_position: 2
title: "head"
sidebar_label: 'head'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/file/head
captured_at: '2026-11-01T21:22:18+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## file/head {#filehead}
**类型：** 命令

打印文件内容的前几行。使用 `as-value` 时，这些行会以字符串数组的形式返回到 `lines` 中。请参阅 [文件](../../system-information-and-utilities/files.md#head-or-tail-a-file) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="n" typ="num" unset="1">要从文件开头输出的行数。范围：1..1000。默认值：10。</ArgTableRow>
<ArgTableRow arg="numbered" typ="switch">在每行前面显示行号。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="lines" typ="object { line: string
 }">以字符串数组形式返回的输出行。</ArgTableRow>
</ArgTable>
