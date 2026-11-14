---
sidebar_key: "cli-reference/disk/check"
sidebar_position: 3
title: "check"
sidebar_label: 'check'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/check
captured_at: '2026-11-01T21:22:09+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/check {#diskcheck}
**条件：** !smips
**系统能力：** storage
**类型：** 命令

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="output" typ="string">检查工具的输出：对于 ext4，`e2fsck` 会通过，并输出包含文件和块使用情况的摘要行。</ArgTableRow>
</ArgTable>
