---
title: "tail"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/file/tail
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## file/tail 
**类型：** 命令

打印文件内容的最后几行。使用 `as-value` 时，这些行会作为字符串数组返回到 `lines` 中。详情请参阅 [Files](/docs/system-information-and-utilities/files#head-or-tail-a-file) 指南。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="n" typ="num" unset="1">Number of lines to output from the end of the file. Range: 1..1000. Default: 10.</ArgTableRow>
<ArgTableRow arg="numbered" typ="switch">Show line numbers in front of each line.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="lines" typ="object { line: string
 }">The output lines returned as an array of strings.</ArgTableRow>
</ArgTable>
