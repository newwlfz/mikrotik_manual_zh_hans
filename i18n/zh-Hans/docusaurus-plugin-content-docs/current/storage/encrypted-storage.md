---
sidebar_key: "storage/encrypted-storage"
sidebar_position: 3
title: "加密存储（dm-crypt）"
sidebar_label: "加密存储"
description: "加密存储（dm-crypt）可为 RouterOS 中的块设备启用透明磁盘加密，并通过 type=crypted 和加密密钥进行配置。示例展示了在 USB 驱动器上或在 RAID1 阵列之上创建加密文件系统。"
tags:
  - 'dm-crypt'
  - 'encryption'
  - 'storage'
source: https://manual.mikrotik.com/docs/storage/encrypted-storage
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

RouterOS 支持使用 `dm-crypt` 进行透明的块设备加密。添加一个 `type=crypted` 的磁盘项，并将 `crypted-backend` 指向要加密的驱动器或分区；解密通过 `encryption-key` 完成。

## 示例 {#examples}

### 简单的加密文件系统 {#simple-crypted-file-system}

创建加密文件系统：

```ros
/disk/add crypted-backend=usb1 encryption-key=<secret_key> slot=crypted-usb1 type=crypted
```

创建完成后，格式化文件系统即可使用：

```ros
/disk/format crypted-usb1 file-system=ext4
```

### 带完整性检查的加密 RAID1 阵列 {#crypted-raid1-array-with-integrity-check}

创建 RAID1 阵列并在其上放置加密文件系统：

```routeros
/disk/add raid-device-count=2 raid-type=1 slot=raid1 type=raid
/disk/set nvme3 raid-master=raid1 raid-role=0
/disk/set nvme4 raid-master=raid1 raid-role=1
/disk/add crypted-backend=raid1 encryption-key=<secret_key> slot=crypted-raid1 type=crypted
```

将加密设备格式化为 Btrfs：

```routeros
/disk/format crypted-raid1 file-system=btrfs
```
