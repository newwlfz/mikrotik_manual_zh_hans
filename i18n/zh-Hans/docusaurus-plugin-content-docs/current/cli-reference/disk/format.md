---
sidebar_key: "cli-reference/disk/format"
sidebar_position: 6
title: "format"
sidebar_label: 'format'
source: https://manual.mikrotik.com/docs/cli-reference/disk/format
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/format {#diskformat}
**条件：** !smips
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="file-system" typ="enum (fat32 | ext4 | btrfs | xfs | wipe | wipe-quick | exfat | discard | discard-secure)">
将磁盘格式化为何种文件系统。
- `ext4` - 使用 ext4 格式化；大多数用例的默认值。
- `fat32` - 使用 FAT32 格式化，几乎任何设备都可读取。
- `exfat` - 使用 exFAT 格式化，适用于存储卡和 USB 驱动器上的大文件。
- `btrfs` - 使用 Btrfs 格式化（数据校验和、快照、RAID）；需要 [存储](../../storage/index.md) 软件包。
- `xfs` - 使用 XFS 格式化；需要 [存储](../../storage/index.md) 软件包。
- `discard` - 丢弃磁盘的所有块（相当于 `blkdiscard`），不写入文件系统。
- `discard-secure` - 相同，但使用安全丢弃，同时擦除底层数据。
- `wipe` - 覆盖磁盘上的所有数据，使其无法恢复。
- `wipe-quick` - 移除文件系统而不覆盖数据；速度快，但数据可通过工具恢复。
</ArgTableRow>
<ArgTableRow arg="label" typ="string">文件系统标签。默认值：`<slot>-fs`。</ArgTableRow>
<ArgTableRow arg="mbr-partition-table" typ="bool">在格式化过程中向磁盘写入 MBR 分区表。若不写入，磁盘将没有分区表；之后使用 `add type=partition` 创建分区，这些分区存储在 GUID 分区表中。默认值：no。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="output" typ="string">格式化的进度：`mkfs` 命令行及其输出、进度百分比或字节计数器，以及最后的 `format done` 行。</ArgTableRow>
</ArgTable>
