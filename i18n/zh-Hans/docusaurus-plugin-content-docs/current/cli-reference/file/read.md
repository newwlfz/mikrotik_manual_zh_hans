---
sidebar_key: "cli-reference/file/read"
sidebar_position: 3
title: "read"
sidebar_label: 'read'
source: https://manual.mikrotik.com/docs/cli-reference/file/read
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## file/read {#fileread}
**类型：** 命令

读取文件内容的一个块，并将其作为字符串返回到 `data` 中。适用于任意大小的文件，不同于 `contents` 属性，后者限制为略低于 60 KiB。请参阅 [文件](../../system-information-and-utilities/files.md#read-file-contents) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="file" typ="file">要读取的文件名称。</ArgTableRow>
<ArgTableRow arg="chunk-size" typ="num">要从文件读取的块大小。必填。范围：1..32768。</ArgTableRow>
<ArgTableRow arg="offset" typ="num">开始读取文件的偏移量。若读取的块超出文件末尾，则该块会被截短；若偏移量超出末尾，则会失败。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="data" typ="string">以字符串形式返回的读取数据。</ArgTableRow>
</ArgTable>
