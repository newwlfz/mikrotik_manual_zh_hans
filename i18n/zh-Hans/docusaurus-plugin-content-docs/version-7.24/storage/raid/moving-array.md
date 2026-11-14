---
sidebar_key: "storage/raid/moving-array"
sidebar_position: 2
title: "将 RAID 阵列迁移到其他设备"
sidebar_label: "将 RAID 阵列迁移到其他设备"
description: "本页介绍如何将 RAID 5 阵列从旧设备迁移到新设备：在新设备上创建 RAID、分配成员磁盘槽位、从旧设备中弹出磁盘，最后将磁盘转移到新设备，RouterOS 会在新设备上自动挂载该 RAID。"
source: https://manual.mikrotik.com/docs/7.24/storage/raid/moving-array
captured_at: '2026-11-04T11:33:10+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

可以将 RAID 阵列从一台设备迁移到另一台设备。

在本示例中，我们使用的是 RDS2216 上的 RAID 5 阵列，由 4 个成员组成。

首先，在“新”设备上创建一个 RAID 并分配成员插槽。

```ros
# 新设备
/disk/add raid-device-count=4 raid-type=5 type=raid slot=raid5
```

然后，将当前为空的插槽添加到新建的 RAID 中

```ros
# 新设备
/disk/set raid-master=raid5 raid-role=0 nvme1
/disk/set raid-master=raid5 raid-role=1 nvme2
/disk/set raid-master=raid5 raid-role=2 nvme3
/disk/set raid-master=raid5 raid-role=3 nvme4
```

在 RAID 创建完成并将插槽分配给 RAID 之后，在“旧”设备上弹出要迁移到“新”设备的磁盘

```ros
# 旧设备
/disk/eject nvme1
/disk/eject nvme2
/disk/eject nvme3
/disk/eject nvme4
```

最后，你可以从“旧”设备中取出磁盘，并将它们插入“新”设备中已分配的插槽。RouterOS 会自动检测 RAID 超级块并挂载该阵列，无需任何额外操作。
