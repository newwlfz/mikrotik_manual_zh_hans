---
title: "Ramdisk"
description: "RAMdisk 支持将 RAM 用作存储的块设备，支持 RAID 配置，并且需要 Storage 软件包。重启或断电后，RAMdisk 中的内容会被清除。可通过 ramdisk-size 属性配置其大小。"
tags:
  - 'storage'
  - 'ramdisk'
source: https://manual.mikrotik.com/docs/7.24/storage/ramdisk
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

RAMdisk 允许将部分 RAM 用作附加设备（块设备）。与 tmpfs 相比，这允许将 RAM 用作 RAID 的一部分，或用于任何需要设备而非文件夹的配置。

:::warning

RAMdisk 会在重启或断电时被清除。
:::

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **ramdisk-size** | 要创建的块设备大小 |

## 配置示例 {#configuration-example}

```ros
/disk/add type=ramdisk ramdisk-size=500M
```

使用前格式化 ramdisk：

```routeros
/disk/format ramdisk1
```
