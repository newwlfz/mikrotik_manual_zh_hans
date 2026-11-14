---
sidebar_key: "cli-reference/task/add"
sidebar_position: 1
title: "add"
sidebar_label: 'add'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/task/add
captured_at: '2026-11-01T21:25:49+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## task/add {#taskadd}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="source" typ="string">应在后台执行的命令</ArgTableRow>
<ArgTableRow arg="switch-to" typ="switch">立即切换到后台视图</ArgTableRow>
<ArgTableRow arg="append" typ="switch">将输出追加到文件</ArgTableRow>
<ArgTableRow arg="file-name" typ="file">输出的默认文件名</ArgTableRow>
<ArgTableRow arg="save-interval" typ="time">设置文件名后的自动保存间隔</ArgTableRow>
<ArgTableRow arg="max-lines" typ="num">最大缓冲区行数</ArgTableRow>
<ArgTableRow arg="save-timestamp" typ="switch">为保存的文件添加时间戳</ArgTableRow>
<ArgTableRow arg="no-header-paging" typ="switch">不将标题分页到输出</ArgTableRow>
<ArgTableRow arg="max-size" typ="num">最大保存文件大小</ArgTableRow>
</ArgTable>
