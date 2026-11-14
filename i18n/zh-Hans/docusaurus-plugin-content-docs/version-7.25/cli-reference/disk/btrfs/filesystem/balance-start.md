---
sidebar_key: "cli-reference/disk/btrfs/filesystem/balance-start"
sidebar_position: 3
title: "balance-start"
sidebar_label: 'balance-start'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/btrfs/filesystem/balance-start
captured_at: '2026-11-01T21:22:05+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/btrfs/filesystem/balance-start {#diskbtrfsfilesystembalance-start}
**条件：** !smips
**系统能力：** storage
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="data-profile" typ="enum (single | dup | raid0 | raid1 | raid1c3 | raid1c4 | raid10)">要将 `data` 块转换成的配置模式：`single` 将块存储一次（仅在单设备时合理），`dup` 在同一设备上存储两次，`raid*` 配置模式会将它们分布到多个设备上。在 [`add-device`](./add-device.md) 之后更改配置模式，可将单盘文件系统变为 Btrfs RAID，例如 `data-profile=raid1`。</ArgTableRow>
<ArgTableRow arg="metadata-profile" typ="enum (single | dup | raid0 | raid1 | raid1c3 | raid1c4 | raid10)">要将 `meta`（元数据）块转换成的配置模式。与数据相比，元数据较小，因此 `dup`（单设备时的默认值）或 `raid1` 是常见选择。</ArgTableRow>
<ArgTableRow arg="system-profile" typ="enum (single | dup | raid0 | raid1 | raid1c3 | raid1c4 | raid10)">要将 `system` 块转换成的配置模式；请保持与 `metadata-profile` 相同。</ArgTableRow>
<ArgTableRow arg="data-usage" typ="range">仅迁移填充率至多为此百分比的数据块，例如 `data-usage=50` 会跳过填充率超过一半的块。值越低，平衡越快，但越不完整。</ArgTableRow>
<ArgTableRow arg="metadata-usage" typ="range">仅迁移填充率至多为此百分比的元数据块。</ArgTableRow>
<ArgTableRow arg="system-usage" typ="range">仅迁移填充率至多为此百分比的系统块。</ArgTableRow>
</ArgTable>
