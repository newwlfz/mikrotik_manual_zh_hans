---
title: "加密存储（dm-crypt）"
description: "加密存储（dm-crypt）使用 `dm_crypt` 为块设备提供透明磁盘加密，并支持槽位名称、加密密钥和后端驱动器等属性。示例展示如何在 USB 或 RAID1 阵列上创建加密文件系统，并包含格式化说明。"
tags:
  - 'dm-crypt'
  - 'encryption'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.24/storage/encrypted-storage
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

与 `type=crypted` 一起使用的驱动器或设备，用于创建 `dm_crypt` 加密存储。`dm-crypt` 是一个透明磁盘加密子系统，用于为块设备提供加密。

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **slot** *(string;* Default: ) | 文件系统名称 |
| **encryption-key** *(string;* Default: ) | 用于解密的密钥 |
| **crypted-backend** *(string;* Default: ) | 要加密的驱动器或分区 |

## 示例 {#examples}

### 简单加密文件系统 {#simple-crypted-file-system}

要创建加密文件系统：

```ros
/disk
add crypted-backend=usb1 encryption-key=<secret_key> slot=crypted-usb1 type=crypted
```

创建后，格式化文件系统即可使用。

```ros
/disk/format crypted-usb1 file-system=ext4 
```

### 带完整性检查的加密 RAID1 阵列 {#crypted-raid1-array-with-integrity-check}

创建 RAID1 阵列，并在其上创建加密文件系统：

```routeros
/disk
add raid-device-count=2 raid-type=1 slot=raid1 type=raid
set nvme3 raid-master=raid1 raid-role=0
set nvme4 raid-master=raid1 raid-role=1
add crypted-backend=raid1 encryption-key=<secret_key> slot=crypted-raid1 type=crypted  crypt-mode=encryption-and-integrity

```

将加密文件系统格式化为 Btrfs：

```routeros
/disk
 format crypted-raid1 file-system=btrfs  
```
