---
sidebar_key: "cli-reference/disk/btrfs/filesystem/add-device"
sidebar_position: 1
title: "add-device"
sidebar_label: 'add-device'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/btrfs/filesystem/add-device
captured_at: '2026-11-01T21:22:06+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/btrfs/filesystem/add-device {#diskbtrfsfilesystemadd-device}
**条件：** !smips
**系统能力：** storage
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="device" typ="enum">要添加到 Btrfs 文件系统的磁盘槽位，例如 `nvme9`。添加设备后，使用所需的配置文件运行 [`balance-start`](./balance-start.md)（例如 `data-profile=raid1`），才能真正将其用于存储冗余；否则该设备只会列在 `devs` 下。</ArgTableRow>
</ArgTable>
