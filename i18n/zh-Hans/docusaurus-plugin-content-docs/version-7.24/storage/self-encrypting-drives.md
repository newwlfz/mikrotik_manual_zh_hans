---
sidebar_key: "storage/self-encrypting-drives"
sidebar_position: 10
title: "自加密硬盘（SED）"
sidebar_label: "自加密硬盘"
description: "本页介绍 MikroTik RouterOS''s 自加密硬盘（SED）支持，该功能需要 Storage 软件包。文中说明了 Opal 合规性，列出了通过标记（o/O）标示的受支持硬盘，并提供了为 SATA 设备设置或取消加密密码的命令。"
source: https://manual.mikrotik.com/docs/7.24/storage/self-encrypting-drives
captured_at: '2026-11-04T11:33:14+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

要使用 SED，驱动器必须符合 [Opal](https://en.wikipedia.org/wiki/Opal_Storage_Specification) 规范。购买驱动器之前，请查阅驱动器制造商的文档，以确认特定驱动器是否支持此功能。

RouterOS 会为受支持的驱动器添加 **o（支持但未激活）** 或 **O（支持且已激活）** 标志：

```ros
/disk/print
Flags: B - BLOCK-DEVICE; M, F - FORMATTING; o - TCG-OPAL-SELF-ENCRYPTION-SUPPORTED (inactive); O - TCG-OPAL-SELF-ENCRYPTION-SUPPORTED (active)
Columns: SLOT, MODEL, SERIAL, INTERFACE, SIZE, FREE, FS, RAID-MASTER
#     SLOT   MODEL                  SERIAL           INTERFACE                   SIZE             FREE  FS    RAID
0 BMo sata1  Samsung SSD 860 2.5in  S3Z9NX0N414510L  SATA 6.0 Gbps  1 000 204 886 016  983 351 111 680  ext4  none
1 BMo sata2  Samsung SSD 860        S5GENG0N307602J  SATA 6.0 Gbps  1 000 204 886 016  983 351 128 064  ext4  none
2 BMO sata3  Samsung SSD 860        S5GENG0N307604H  SATA 6.0 Gbps  1 000 204 886 016  983 351 128 064  ext4  none
3 BMO sata4  Samsung SSD 860 2.5in  S4CSNX0N838150B  SATA 6.0 Gbps  1 000 204 886 016  983 351 128 064  ext4  none
```

要设置 TCG-OPAL-SELF-ENCRYPTION：

```ros
/disk
/disk/set sata1 self-encryption-password=securepassword
```

要取消设置：

```ros
/disk
/disk/unset sata1 self-encryption-password
```

或

```ros
/disk
/disk/set sata1 !self-encryption-password

```
