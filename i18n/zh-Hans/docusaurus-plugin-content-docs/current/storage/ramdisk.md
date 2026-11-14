---
sidebar_key: "storage/ramdisk"
sidebar_position: 8
title: "内存盘"
sidebar_label: "内存盘"
description: "ramdisk 是 RAM 中的块设备。使用前请先格式化，或将其用作 RAID 成员。它需要 rose-storage 软件包，并且每次重启后都是空的。"
tags:
  - 'storage'
  - 'ramdisk'
source: https://manual.mikrotik.com/docs/storage/ramdisk
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RAM 磁盘是位于 RAM 中的块设备。与磁盘一样，它需要先有文件系统才能存放文件，并且可以作为 RAID 的成员，或在任何需要设备的地方使用。[tmpfs](./tmpfs.md) 则是位于 RAM 中的文件夹：它无需格式化即可存放文件，但它不是设备，不能格式化，也不能作为 RAID 成员。

:::info
Ramdisk 需要 `rose-storage` 软件包（参见 [存储](./index.md)）。当该软件包在路由器上可用时，要安装它，请启用它并应用更改。应用更改会重启路由器：

```ros
/system/package/enable rose-storage
/system/package/apply-changes
```

有关软件包的更多信息，请参见[软件包](../getting-started/installation-and-upgrade/packages.md)。
:::

## 创建并格式化 RAM 磁盘 {#create-and-format-a-ramdisk}

添加一个 500 MB 的 RAM 磁盘：

```ros
/disk/add type=ramdisk ramdisk-size=500M
```

第一个 RAM 磁盘获得槽位名称 `ramdisk1`，后续的依次为 `ramdisk2`、`ramdisk3`，以此类推。大小会向上取整为 16 KiB 的倍数。添加 RAM 磁盘时，路由器不会预留 RAM。

使用前请先格式化 RAM 磁盘：

```ros
/disk/format ramdisk1 file-system=ext4
```

格式化后的 RAM 磁盘会挂载到其槽位名称下，因此文件会写入诸如 `ramdisk1/capture.pcap` 的路径。

:::warning
路由器重启或断电时，RAM 磁盘的内容会丢失。重启后，RAM 磁盘会重新出现，但为空且没有文件系统，因此使用前请再次格式化。
:::

## 在 RAID 中使用 RAM 磁盘 {#use-ramdisks-in-a-raid}

RAM 磁盘可以作为 RAID 成员，例如在没有磁盘的路由器上尝试 RAID 配置。要用两个 RAM 磁盘构建 RAID 1，请添加 RAID 并将两个 RAM 磁盘都分配给它：

```ros
/disk/add type=raid raid-type=1 raid-device-count=2 slot=raid1
/disk/set ramdisk1 raid-master=raid1 raid-role=0
/disk/set ramdisk2 raid-master=raid1 raid-role=1
```

随后 `/disk/print` 会显示 `raid1`，其型号为 `RAID1 mirrored`，状态为 `clean`，并且两个 RAM 磁盘作为 RAID 成员，成员状态为 `in_sync`。重启后，路由器会从空的 RAM 磁盘重新组装 RAID。有关 RAID 的更多信息，请参见 [RAID](./raid/index.md)。

## 移除 RAM 磁盘 {#remove-a-ramdisk}

请先移除使用 RAM 磁盘的 RAID，然后移除 RAM 磁盘：

```ros
/disk/remove raid1
/disk/remove ramdisk1
/disk/remove ramdisk2
```

有关所有参数，请参见 [`/disk`](../cli-reference/disk/index.md) CLI 参考。
