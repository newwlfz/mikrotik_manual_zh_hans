---
title: "read"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/file/read
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## file/read
**类型：** 命令

读取文件内容的一个数据块，并以字符串形式返回到 `data` 中。适用于任意大小的文件，不同于 `contents` 属性，后者限制为略低于 60 KiB。请参阅 [Files](/docs/system-information-and-utilities/files#read-file-contents) 指南。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="file" typ="file">Name of the file to read.</ArgTableRow>
<ArgTableRow arg="chunk-size" typ="num">Chunk size to read from the file. Required. Range: 1..32768.</ArgTableRow>
<ArgTableRow arg="offset" typ="num">Offset where to start reading the file. A chunk that continues past the end of the file is shortened; an offset past the end fails.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="data" typ="string">The read data returned as a string.</ArgTableRow>
</ArgTable>
