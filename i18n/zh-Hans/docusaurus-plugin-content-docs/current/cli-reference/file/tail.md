---
sidebar_key: "cli-reference/file/tail"
sidebar_position: 6
title: "tail"
sidebar_label: 'tail'
source: https://manual.mikrotik.com/docs/cli-reference/file/tail
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## file/tail {#filetail}
**类型：** 命令

打印文件内容的最后几行。使用 `as-value` 时，这些行会以字符串数组的形式在 `lines` 中返回。请参阅 [文件](../../system-information-and-utilities/files.md#head-or-tail-a-file) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="n" typ="num" unset="1">从文件末尾输出的行数。范围：1..1000。默认值：10。</ArgTableRow>
<ArgTableRow arg="numbered" typ="switch">在每一行前面显示行号。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="lines" typ="object { line: string
 }">以字符串数组形式返回的输出行。</ArgTableRow>
</ArgTable>
