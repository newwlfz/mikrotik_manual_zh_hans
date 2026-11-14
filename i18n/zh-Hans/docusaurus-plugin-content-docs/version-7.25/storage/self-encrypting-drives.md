---
sidebar_key: "storage/self-encrypting-drives"
sidebar_position: 10
title: "自加密硬盘（SED）"
sidebar_label: "自加密硬盘"
description: "RouterOS 通过 TCG-Opal 标准支持自加密硬盘（SED），需要 Storage 软件包。受支持的硬盘会在 /disk/print 中显示 o（未激活）/ O（已激活）标志，并且可以通过 self-encryption-password 启用加密。"
source: https://manual.mikrotik.com/docs/7.25/storage/self-encrypting-drives
captured_at: '2026-11-04T11:21:45+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

要使用 SED，驱动器必须符合 [Opal](https://en.wikipedia.org/wiki/Opal_Storage_Specification) 规范。购买驱动器之前，请查阅驱动器制造商的文档，确认特定驱动器是否支持此功能。

在使用 USB 桥接的方案中不支持 SED；磁盘必须直接连接（SATA 或 NVMe）。

RouterOS 会用 **o（支持 TCG-OPAL，加密未激活）** 或 **O（支持 TCG-OPAL 且加密已激活）** 标志标记受支持的驱动器：

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

要在驱动器上启用自加密，请设置 `self-encryption-password`：

```ros
/disk/set sata1 self-encryption-password=securepassword
```

设置后，驱动器在断电时会自行锁定，并且每次连接时都需要密码；RouterOS 会自动提供该密码（标志会变为 `O`）。

要禁用自加密，请取消设置密码：

```ros
/disk/unset sata1 self-encryption-password
```

或：

```ros
/disk/set sata1 !self-encryption-password
```
