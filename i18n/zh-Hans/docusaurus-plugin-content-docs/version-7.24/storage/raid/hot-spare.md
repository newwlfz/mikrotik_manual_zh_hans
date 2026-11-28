---
title: "设置热备磁盘"
description: "本页介绍如何在 RouterOS 中为 RAID 阵列配置热备盘，通过将备用磁盘分配给 RAID 配置，在磁盘故障时启用自动重建。"
tags:
  - 'raid'
  - 'storage'
  - 'backup'
source: https://manual.mikrotik.com/docs/7.24/storage/raid/hot-spare
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "storage/raid"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

可以为 RAID 阵列指定热备盘。发生磁盘故障时，会立即在指定的备用盘上开始重建。

添加具有所需磁盘数量的 RAID 阵列：

```ros
/disk/add raid-device-count=4 raid-type=5 type=raid slot=raid5
```

随后，将磁盘和备用盘添加到 RAID。在此示例中，将添加 NVMe5 作为备用盘。

```ros
/disk/set raid-master=raid5 raid-role=0 nvme1
/disk/set raid-master=raid5 raid-role=1 nvme2
/disk/set raid-master=raid5 raid-role=2 nvme3
/disk/set raid-master=raid5 raid-role=3 nvme4

/disk/set raid-master=raid5 raid-role=spare nvme5
```
