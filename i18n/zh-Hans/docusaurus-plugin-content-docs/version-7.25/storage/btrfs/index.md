---
sidebar_key: "storage/btrfs/index"
sidebar_position: 1
title: "index"
sidebar_label: 'index'
description: "Btrfs 是一种稳定的写时复制文件系统，具备位腐烂保护、子卷和快照等特性。它随 Storage 软件包提供，并支持 RAID 配置、子卷管理和快照传输。"
tags:
  - 'btrfs'
  - 'storage'
  - 'file-system'
source: https://manual.mikrotik.com/docs/7.25/storage/btrfs
captured_at: '2026-11-04T11:21:19+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](../index.md) 软件包。
:::

# Btrfs {#btrfs}

Btrfs 是一种功能丰富的写时复制文件系统。它是某些流行 Linux 发行版（例如 [Fedora](https://en.wikipedia.org/wiki/Fedora_Linux)）的默认文件系统，并被许多大型公司所使用。多年来，它已被证明比其他流行的文件系统更稳定、更灵活。最重要的特性包括：

- 位衰减防护（在 Btrfs-RAID 模式下使用时）。
- 子卷。
- 快照。
- 设备之间的快照传输。

## 快速开始：将磁盘格式化为 Btrfs {#quickstart-format-a-disk-as-btrfs}

将单个磁盘格式化为 Btrfs，并在默认挂载点下使用它：

```routeros
/disk/print
/disk/format <disk-name> file-system=btrfs
/disk/btrfs/filesystem/print
```

格式化完成后，该磁盘会在 `/disk/btrfs/filesystem/print` 下以新的 Btrfs 文件系统条目出现，默认标签为 `<disk-name>-fs`（可使用 `/disk/btrfs/filesystem/set <label> label=MyLabel` 更改标签）。该磁盘会像其他任何驱动器一样挂载，并可在 `/file` 中访问。在这里，你可以为文件系统设置标签、创建[子卷和快照](./snapshots.md)、将多个磁盘组合成 [Btrfs RAID](./raid.md)，或设置常规[维护](./maintenance.md)。

Btrfs 功能位于三个菜单下：

- [`/disk/btrfs/filesystem`](../../cli-reference/disk/btrfs/filesystem/index.md) - 每个已格式化的 Btrfs 文件系统对应一个条目：标签、设备成员关系（[`add-device`](../../cli-reference/disk/btrfs/filesystem/add-device.md)、[`remove-device`](../../cli-reference/disk/btrfs/filesystem/remove-device.md)、[`replace-device`](../../cli-reference/disk/btrfs/filesystem/replace-device.md)）、RAID 配置文件和维护任务（[`balance-start`](../../cli-reference/disk/btrfs/filesystem/balance-start.md)、[`scrub-start`](../../cli-reference/disk/btrfs/filesystem/scrub-start.md)、[`reset-counters`](../../cli-reference/disk/btrfs/filesystem/reset-counters.md)）。
- [`/disk/btrfs/subvolume`](../../cli-reference/disk/btrfs/subvolume.md) - 文件系统的子卷和快照。
- [`/disk/btrfs/transfer`](../../cli-reference/disk/btrfs/transfer.md) - 向其他设备发送快照以及从其他设备接收快照。

## 另请参阅 {#see-also}

- [Btrfs RAID](./raid.md) - RAID1 和 RAID10 配置、磁盘更换以及 BraidHealthCheck 脚本。
- [Btrfs 子卷和快照](./snapshots.md) - 创建子卷、创建快照、在设备之间传输快照。
- [Btrfs 维护](./maintenance.md) - 定期清理、平衡、自动快照轮换以及可用空间管理。
