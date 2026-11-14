---
sidebar_key: "storage/raid/hot-spare"
sidebar_position: 1
title: "设置热备盘"
sidebar_label: "设置热备盘"
description: "本页介绍如何在 RouterOS 中为 RAID 阵列配置热备磁盘，通过为 RAID 配置分配备用磁盘，实现磁盘故障时的自动重建。"
tags:
  - 'raid'
  - 'storage'
  - 'backup'
source: https://manual.mikrotik.com/docs/storage/raid/hot-spare
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

可以为 RAID 阵列分配一块热备磁盘。如果发生磁盘故障，重建会立即在已分配的备用磁盘上开始。备用磁盘是阵列的成员，并在其上配置了 `raid-role=spare`。

添加具有所需磁盘数量的 RAID 阵列：

```ros
/disk/add raid-device-count=4 raid-type=5 type=raid slot=raid5
```

然后添加磁盘以及备用磁盘到 RAID。在本例中，我们将添加 `nvme5` 作为备用磁盘：

```ros
/disk/set raid-master=raid5 raid-role=0 nvme1
/disk/set raid-master=raid5 raid-role=1 nvme2
/disk/set raid-master=raid5 raid-role=2 nvme3
/disk/set raid-master=raid5 raid-role=3 nvme4

/disk/set raid-master=raid5 raid-role=spare nvme5
```
