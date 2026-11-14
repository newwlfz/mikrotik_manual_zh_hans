---
sidebar_key: "cli-reference/disk/format"
sidebar_position: 6
title: "format"
sidebar_label: "format"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/disk/format
captured_at: '2026-11-01T21:26:45+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/format {#diskformat}
**条件：** !smips
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="file-system" typ="enum (fat32 | ext4 | btrfs | xfs | wipe | wipe-quick | exfat | discard | discard-secure)"></ArgTableRow>
<ArgTableRow arg="label" typ="string"></ArgTableRow>
<ArgTableRow arg="mbr-partition-table" typ="bool"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="output" typ="string"></ArgTableRow>
</ArgTable>
