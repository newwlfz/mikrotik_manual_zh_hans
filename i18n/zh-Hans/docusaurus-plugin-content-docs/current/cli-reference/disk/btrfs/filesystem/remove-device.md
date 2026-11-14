---
sidebar_key: "cli-reference/disk/btrfs/filesystem/remove-device"
sidebar_position: 4
title: "remove-device"
sidebar_label: 'remove-device'
source: https://manual.mikrotik.com/docs/cli-reference/disk/btrfs/filesystem/remove-device
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/btrfs/filesystem/remove-device {#diskbtrfsfilesystemremove-device}
**条件：** !smips
**系统能力：** storage
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="device" typ="enum">要从文件系统中移除的设备的磁盘槽位，例如 `nvme9`。设备上的数据会先迁移到其余设备；如果使用更少的设备无法保持当前配置文件，则移除失败（例如当设备数量降到两个以下时，无法保持 `data,raid1`）。</ArgTableRow>
<ArgTableRow arg="device-id" typ="num">要移除的设备的数字 ID（参见 [`filesystem`](./index.md) 中的 `dev-ids`）；当设备缺失且不再有任何槽位时需要。</ArgTableRow>
</ArgTable>
