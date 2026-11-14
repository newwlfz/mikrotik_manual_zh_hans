---
sidebar_key: "cli-reference/disk/btrfs/filesystem/replace-device"
sidebar_position: 6
title: "replace-device"
sidebar_label: 'replace-device'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/btrfs/filesystem/replace-device
captured_at: '2026-11-01T21:22:06+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/btrfs/filesystem/replace-device {#diskbtrfsfilesystemreplace-device}
**条件：** !smips
**系统能力：** storage
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="device-to-remove" typ="enum">Btrfs 文件系统中要替换的设备的磁盘槽位。</ArgTableRow>
<ArgTableRow arg="device-to-remove-id" typ="num">要替换的设备的数字 ID；当设备从系统中缺失（`I - MISSING-DEVS` 标志）时，请使用此项代替 `device-to-remove`，因为此时槽位已不再可用。</ArgTableRow>
<ArgTableRow arg="device-to-add" typ="enum">接管被移除设备数据的新设备的磁盘槽位。</ArgTableRow>
</ArgTable>
