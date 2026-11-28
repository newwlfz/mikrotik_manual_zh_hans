---
title: "Btrfs"
description: "Btrfs 是一种稳定的写时复制文件系统，具备位腐保护、子卷和快照等功能。它从 RouterOS v7.18beta2+ 起随 Storage 软件包提供，支持 RAID 配置、子卷管理和快照传输。"
tags:
  - 'btrfs'
  - 'storage'
  - 'file-system'
source: https://manual.mikrotik.com/docs/7.24/storage/btrfs
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
Btrfs 页面描述的功能从 RouterOS v7.18beta2 开始提供，并且需要 [Storage](/docs) 软件包。
:::

Btrfs 是一个功能丰富的写时复制文件系统，自 2007 年起就已存在。它是一些流行 Linux 发行版的默认文件系统，例如 [Fedora](https://en.wikipedia.org/wiki/Fedora_Linux)，并被许多大型公司用于其数据中心，例如 [Meta](https://en.wikipedia.org/wiki/Meta_Platforms)。多年来，它已被证明比其他流行文件系统更稳定、更灵活。最重要的功能包括：

- 位腐烂保护（在 Btrfs-RAID 模式下使用时）。
- 子卷。
- 快照。
- 传输。

## 快速入门：将磁盘格式化为 Btrfs {#quickstart-format-a-disk-as-btrfs}

将单个磁盘格式化为 Btrfs，并在默认挂载点下访问它：

```routeros
/disk/print
/disk/format <disk-name> file-system=btrfs
/disk/btrfs/filesystem/print
```

格式化后，磁盘会在 `/disk/btrfs/filesystem/print` 下显示为 Btrfs 文件系统条目。在此可以为其设置标签、配置子卷/快照，或将多个磁盘组合为 Btrfs RAID。

## 另请参阅 {#see-also}

- [Btrfs RAID](/docs/storage/raid) — RAID1 和 RAID10 配置、磁盘更换以及 BraidHealthCheck 脚本。
- [Btrfs 子卷和快照](/docs/storage/btrfs/snapshots) — 创建子卷、创建快照以及在设备之间传输快照。
- [Btrfs 维护](/docs/storage/btrfs/maintenance) — 定期清理、平衡、自动快照轮转以及可用空间管理。
