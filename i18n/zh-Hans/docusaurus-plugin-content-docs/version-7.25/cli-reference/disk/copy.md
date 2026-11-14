---
sidebar_key: "cli-reference/disk/copy"
sidebar_position: 4
title: "copy"
sidebar_label: 'copy'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/copy
captured_at: '2026-11-01T21:22:09+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/copy {#diskcopy}
**条件：** !smips
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="src" typ="enum">源磁盘、分区或文件。</ArgTableRow>
<ArgTableRow arg="dst" typ="enum">目标磁盘、分区或文件。其大小必须至少与被复制的数据一样大。</ArgTableRow>
<ArgTableRow arg="src-offset" typ="num">源中开始复制的字节偏移量。默认值：0。</ArgTableRow>
<ArgTableRow arg="dst-offset" typ="num">目标中写入数据的字节偏移量。默认值：0。</ArgTableRow>
<ArgTableRow arg="size" typ="num">要复制的字节数。未指定时，将复制整个源。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">复制进度：`<bytes copied> / <total bytes> (<percent>%)`。</ArgTableRow>
</ArgTable>
