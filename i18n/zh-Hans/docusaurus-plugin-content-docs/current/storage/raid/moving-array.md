---
sidebar_key: "storage/raid/moving-array"
sidebar_position: 2
title: "将 RAID 阵列迁移到其他设备"
sidebar_label: "将 RAID 阵列迁移到其他设备"
description: "本页说明如何将 RAID 5 阵列从旧设备迁移到新设备：先在新设备上创建 RAID，再从旧设备中弹出磁盘，并将其转移到新设备，RouterOS 会在新设备上自动识别并挂载该阵列。"
source: https://manual.mikrotik.com/docs/storage/raid/moving-array
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

可以将 RAID 阵列从一台设备迁移到另一台设备。

在本示例中，我们使用的是 RDS2216 上的 RAID 5 阵列，由 4 个成员组成。

首先，在“新”设备上创建一个成员数量相同的 RAID 阵列，并分配成员槽位：

```ros
# 新设备
/disk/add raid-device-count=4 raid-type=5 type=raid slot=raid5
```

```ros
# 新设备 - 为（当前为空的）插槽分配角色
/disk/set raid-master=raid5 raid-role=0 nvme1
/disk/set raid-master=raid5 raid-role=1 nvme2
/disk/set raid-master=raid5 raid-role=2 nvme3
/disk/set raid-master=raid5 raid-role=3 nvme4
```

在“旧”设备上，弹出要迁移到“新”设备的磁盘：

```ros
# 旧设备
/disk/eject nvme1
/disk/eject nvme2
/disk/eject nvme3
/disk/eject nvme4
```

从“旧”设备上取下磁盘，并将它们插入“新”设备中已分配的槽位。RouterOS 会自动检测 RAID 超级块并挂载该阵列，无需任何额外操作。
