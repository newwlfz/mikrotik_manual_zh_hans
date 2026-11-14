---
sidebar_key: "storage/ramdisk"
sidebar_position: 8
title: "内存盘"
sidebar_label: "内存盘"
description: "RAMdisk 允许将 RAM 用作存储块设备，支持 RAID 配置，并且需要 Storage 软件包。它会在重启或断电时被清除，可通过 ramdisk-size 属性配置大小。"
tags:
  - 'storage'
  - 'ramdisk'
source: https://manual.mikrotik.com/docs/7.24/storage/ramdisk
captured_at: '2026-11-04T11:33:10+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

RAMdisk 允许将部分 RAM 用作附加设备（块设备）。与 tmpfs 相比，这允许将 RAM 用作 RAID 的一部分，或用于任何其他需要设备（而非文件夹）的配置。

:::warning

RAMdisk 在重启或断电时会被清除。

:::

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **ramdisk-size** | 要创建的块设备大小 |

## 配置示例 {#configuration-example}

```ros
/disk/add type=ramdisk ramdisk-size=500M
```

使用前请先格式化 ramdisk：

```routeros
/disk/format ramdisk1
```
