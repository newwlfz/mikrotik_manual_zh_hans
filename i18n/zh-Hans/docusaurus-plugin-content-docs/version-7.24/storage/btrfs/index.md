---
sidebar_key: "storage/btrfs/index"
sidebar_position: 1
title: "Btrfs"
sidebar_label: "Btrfs"
description: "Btrfs 是一种稳定的写时复制文件系统，具有 bitrot 防护、子卷和快照等特性。它在 RouterOS v7.18beta2+ 中通过 Storage 软件包提供，并支持 RAID 配置、子卷管理和快照传输。"
tags:
  - 'btrfs'
  - 'storage'
  - 'file-system'
source: https://manual.mikrotik.com/docs/7.24/storage/btrfs
captured_at: '2026-11-04T11:32:56+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
Btrfs 页面上描述的功能从 RouterOS v7.18beta2 开始可用，并且需要 [存储](../index.md) 软件包。
:::

Btrfs 是一种功能丰富的写时复制文件系统，自 2007 年就已存在。它是一些流行 Linux 发行版（如 [Fedora](https://en.wikipedia.org/wiki/Fedora_Linux)）的默认文件系统，并被许多大型公司（如 [Meta](https://en.wikipedia.org/wiki/Meta_Platforms)）在其数据中心中使用。多年来，它已证明自身稳定且比其他流行文件系统更灵活。最重要的特性包括：

- 位衰减保护（在 Btrfs-RAID 模式下使用时）。
- 子卷。
- 快照。
- 传输。

## 快速开始：将磁盘格式化为 Btrfs {#quickstart-format-a-disk-as-btrfs}

将单个磁盘格式化为 Btrfs，并在默认挂载点下访问它：

```routeros
/disk/print
/disk/format <disk-name> file-system=btrfs
/disk/btrfs/filesystem/print
```

格式化后，该磁盘会以 Btrfs 文件系统条目的形式出现在 `/disk/btrfs/filesystem/print` 下。从这里你可以为其添加标签、配置子卷/快照，或将多个磁盘组合成 Btrfs RAID。

## 另请参阅 {#see-also}

- [Btrfs RAID](./raid.md) — RAID1 和 RAID10 配置、磁盘更换以及 BraidHealthCheck 脚本。
- [Btrfs 子卷和快照](./snapshots.md) — 创建子卷、拍摄快照、在设备之间传输快照。
- [Btrfs 维护](./maintenance.md) — 定期清理、均衡、自动快照轮换以及可用空间管理。
