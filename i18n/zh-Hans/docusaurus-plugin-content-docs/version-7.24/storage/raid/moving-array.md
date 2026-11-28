---
title: "将 RAID 阵列迁移到其他设备"
description: "本页说明如何通过在新设备上创建 RAID、分配成员插槽、从旧设备弹出磁盘，最后将磁盘转移到新设备来将 RAID 5 阵列从旧设备迁移到新设备；迁移后 RouterOS 会自动挂载该 RAID。"
source: https://manual.mikrotik.com/docs/7.24/storage/raid/moving-array
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

可以将 RAID 阵列从一台设备迁移到另一台设备。

在本例中，我们在 RDS2216 上使用一个包含 4 个成员的 RAID 5 阵列。

首先，在“新”设备上创建 RAID 并分配成员插槽。

```ros
# New device
/disk/add raid-device-count=4 raid-type=5 type=raid slot=raid5
```

然后，将当前为空的插槽添加到新创建的 RAID 中

```ros
# New device
/disk/set raid-master=raid5 raid-role=0 nvme1
/disk/set raid-master=raid5 raid-role=1 nvme2
/disk/set raid-master=raid5 raid-role=2 nvme3
/disk/set raid-master=raid5 raid-role=3 nvme4
```

创建 RAID 并将插槽分配给 RAID 后，在“旧”设备上弹出要切换到“新”设备的磁盘

```ros
# Old device
/disk/eject nvme1
/disk/eject nvme2
/disk/eject nvme3
/disk/eject nvme4
```

最后，可以从“旧”设备上取下磁盘，并将其插入“新”设备中已分配的插槽。RouterOS 将自动检测 RAID superblock 并挂载阵列，无需任何额外输入。
