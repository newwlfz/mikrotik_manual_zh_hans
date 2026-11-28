---
title: "自加密硬盘（SED）"
description: "本页介绍 MikroTik RouterOS 对 Self-Encrypting Drive（SED）的支持，该功能需要 Storage 软件包。文中说明 Opal 合规性，显示带标志（o/O）的受支持硬盘，并提供用于为 SATA 设备设置或取消加密密码的命令。"
source: https://manual.mikrotik.com/docs/7.24/storage/self-encrypting-drives
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

要使用 SED，硬盘必须符合 [Opal](https://en.wikipedia.org/wiki/Opal_Storage_Specification) 标准。购买硬盘前，请查阅硬盘制造商文档，确认特定硬盘是否支持该功能。

RouterOS 会为支持的硬盘添加 **o (supported inactive)** 或 **O (supported active)** 标志：

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

or

```ros
/disk
/disk/set sata1 !self-encryption-password

```
