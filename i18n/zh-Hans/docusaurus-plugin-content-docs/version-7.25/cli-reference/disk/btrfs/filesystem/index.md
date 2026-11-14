---
sidebar_key: "cli-reference/disk/btrfs/filesystem/index"
sidebar_position: 4
title: "filesystem"
sidebar_label: 'filesystem'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/btrfs/filesystem
captured_at: '2026-11-01T21:22:04+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk/btrfs/filesystem {#diskbtrfsfilesystem}
**条件：** !smips
**系统能力：** storage
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="missing-devs">文件系统的一个或多个设备缺失，因此文件系统处于降级状态。</ArgTableRow>
<ArgTableRow arg="b" typ="balancing">文件系统正在执行 balance 操作。</ArgTableRow>
<ArgTableRow arg="r" typ="replacing">文件系统正在执行设备 replace 操作。</ArgTableRow>
<ArgTableRow arg="s" typ="scrubbing">文件系统正在执行 scrub 操作。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="label" typ="string">Btrfs 文件系统的标签，用于在 btrfs 菜单中寻址该文件系统，例如 `btrfsdisk`。</ArgTableRow>
<ArgTableRow arg="default-subvolume" typ="enum">在 `/file` 中作为文件系统根文件夹呈现的子卷。`<FS_ROOT>`（默认）是 Btrfs 文件系统本身的根。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="uuid" typ="string">Btrfs 文件系统的 UUID。</ArgTableRow>
<ArgTableRow arg="total-devs" typ="num">文件系统中的设备数量。</ArgTableRow>
<ArgTableRow arg="dev-ids" typ="multi { array-id, devid: num
 }">文件系统中设备的数字设备 ID；当设备缺失时，[`replace-device`](./replace-device.md) 需要这些 ID。</ArgTableRow>
<ArgTableRow arg="devs" typ="multi { array-id, dev: enum
 }">文件系统中设备的磁盘槽位，例如 `nvme8,nvme9`。</ArgTableRow>
<ArgTableRow arg="spaces" typ="multi { array-id, space: string
 }">文件系统的空间分配，按设备和存储配置文件（`data`、`system`、`meta`、`global-reserve`）划分，例如 `data,raid1:1.07GB nvme8:1.07GB nvme9:1.07GB, used:1%`。</ArgTableRow>
<ArgTableRow arg="balance-status" typ="string">balance 操作的状态，例如 `done`，或错误消息，例如 `BTRFS_IOC_BALANCE_V2 failed: ...`。</ArgTableRow>
<ArgTableRow arg="replace-status" typ="string">replace 或设备移除操作的状态，例如 `done`，或错误消息，例如 `BTRFS_IOC_DEV_REPLACE failed: File exists` 或 `BTRFS_IOC_RM_DEV_V2 failed: Resource temporarily unavailable`。</ArgTableRow>
<ArgTableRow arg="scrub-status" typ="string">scrub 操作的状态，例如 `done`。</ArgTableRow>
<ArgTableRow arg="write-errors" typ="multi { snapshot: num
 }">写入错误计数器，文件系统中每个设备一个值。使用 [`reset-counters`](./reset-counters.md) 重置。</ArgTableRow>
<ArgTableRow arg="read-errors" typ="multi { snapshot: num
 }">读取错误计数器，每个设备一个值。</ArgTableRow>
<ArgTableRow arg="flush-errors" typ="multi { snapshot: num
 }">刷新错误计数器，每个设备一个值。</ArgTableRow>
<ArgTableRow arg="corruption-errors" typ="multi { snapshot: num
 }">数据损坏错误计数器，每个设备一个值。</ArgTableRow>
<ArgTableRow arg="generation-errors" typ="multi { snapshot: num
 }">generation 不匹配错误计数器，每个设备一个值。</ArgTableRow>
</ArgTable>
