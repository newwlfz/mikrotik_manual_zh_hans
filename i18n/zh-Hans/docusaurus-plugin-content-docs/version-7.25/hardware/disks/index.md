---
sidebar_key: "hardware/disks/index"
sidebar_position: 1
title: "磁盘"
sidebar_label: "磁盘"
description: "RouterOS 如何检测、格式化和管理磁盘与分区：槽位名称、自动挂载、挂载点、分区、交换空间、由 RAM 支持的文件夹、文件系统检查和性能测试。"
tags:
  - 'disks'
  - 'storage'
  - 'filesystem'
source: https://manual.mikrotik.com/docs/7.25/hardware/disks
captured_at: '2026-11-04T11:17:09+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[*Disks CLI 参考*](../../cli-reference/disk/index.md)

RouterOS 会检测连接到路由器的存储驱动器（USB、SATA、NVMe 和 microSD 驱动器），并在启动时或插入后自动挂载它们。你可以使用路由器支持数量的驱动器，例如用于 User Manager 数据库、Web 代理缓存、容器存储或日志文件。

本页介绍驱动器本身：如何检测、格式化和管理驱动器。网络存储协议（iSCSI、NFS、SMB、NVMe over TCP）、RAID 和高级文件系统属于 [存储](../../storage/index.md) 包，并在 [存储](../../storage/index.md) 章节中介绍。

:::info
**Storage 包**增加了磁盘监控、RAID、rsync、iSCSI、NVMe over TCP、NFS、SMB 客户端以及 Btrfs 和 XFS 文件系统。详情请参见 [存储](../../storage/index.md) 章节。
:::

:::danger
在从 RouterOS 设备上物理移除磁盘之前，请始终使用 `/disk/eject`，否则数据可能丢失。
:::

## 磁盘检测方式 {#how-disks-are-detected}

`/disk` 菜单会列出所有受支持且处于工作状态的已连接存储设备，包括空的驱动器插槽。每个驱动器都会根据其连接接口获得一个插槽名称和一个编号，例如 `usb1`、`sata1` 或 `nvme1`。

```ros
[admin@MikroTik] > /disk/print proplist=slot,model,interface,size,fs where slot=nvme9
Flags: B - BLOCK-DEVICE
Columns: SLOT, MODEL, INTERFACE, SIZE, FS
#   SLOT   MODEL        INTERFACE                   SIZE  FS
0 B nvme9  TS1TUTE210T  PCIe 2x8 GT/s  1 024 209 543 168  -
```

print 输出中的关键标志：

- `B - BLOCK-DEVICE` 标记存储数据的设备，因此可以对其进行格式化和使用。没有此标志的设备（例如 PCIe 桥接器）仅描述磁盘布局。
- `E - EMPTY` 标记空插槽。
- `M - MOUNTED` 标记已挂载文件系统的磁盘或分区。

完整的标志列表在 [Disks CLI 参考](../../cli-reference/disk/index.md) 中描述。

具有受支持文件系统和分区表的驱动器会被自动挂载，并出现在 `/file` 中。要确认驱动器是否可用，请在连接后检查它是否出现在 `/file` 中。

## 格式化磁盘 {#format-a-disk}

对新驱动器要做的第一件事就是格式化它。要格式化磁盘，请选择文件系统并使用插槽名称运行 `/disk/format`。RouterOS 会请求确认，格式化驱动器并自动挂载它：

```ros
[admin@MikroTik] > /disk/format nvme9 file-system=ext4
nvme9: file-system: ext4
nvme9: mke2fs -t ext4 -L nvme9-fs /dev/nvme0n1
...
nvme9: Creating journal (262144 blocks): done
nvme9: Writing superblocks and filesystem accounting information: done
nvme9: format done
```

如果没有标签，RouterOS 会将文件系统标记为 `<slot>-fs`，因此 `nvme9` 的标签是 `nvme9-fs`。文件系统选项：

- `ext4`  -  大多数用例的默认选择。支持多个分区、日志记录，并且速度快。
- `fat32` 和 `exfat`  -  几乎任何设备都可读取，例如相机或 Android 手机。`fat32` 有 4 GB 文件大小限制。
- `btrfs` 和 `xfs`  -  需要 [存储](../../storage/index.md) 包的高级文件系统。请参见 [Btrfs](../../storage/btrfs/index.md)。
- `discard` 和 `discard-secure`  -  丢弃驱动器的所有块，不写入文件系统。
- `wipe` 和 `wipe-quick`  -  移除文件系统和所有数据。`wipe` 会覆盖数据，使其无法恢复；`wipe-quick` 仅移除文件系统。

格式化会销毁目标上的所有数据。对于文件系统仅部分填充的磁盘，请使用 `file-system=wipe-quick` 快速移除它。

格式化后，驱动器会自动挂载：

```ros
[admin@MikroTik] > /disk/print where slot=nvme9
Flags: B - BLOCK-DEVICE; M - MOUNTED
Columns: SLOT, MOUNT-POINT, MODEL, INTERFACE, SIZE, FS
#    SLOT   MOUNT-POINT  MODEL        INTERFACE                   SIZE  FS
0 BM nvme9  nvme9        TS1TUTE210T  PCIe 2x8 GT/s  1 024 209 543 168  ext4
```

```ros
[admin@MikroTik] > /file/print where name~"nvme9"
Columns: NAME, TYPE, LAST-MODIFIED
# NAME              TYPE       LAST-MODIFIED
0 nvme9             disk       2026-09-25 11:47:05
1 nvme9/lost+found  directory  2026-09-25 11:47:05
```

## 挂载点 {#mount-points}

已挂载的文件系统可通过其挂载点访问，挂载点也是在 `/file` 中以及其他功能引用文件时使用的路径前缀。默认情况下，挂载点是插槽名称，因此 `nvme1` 上的文件通过 `nvme1/...` 访问。

如果同一驱动器在多次启动之间可能位于不同插槽（例如在多盘位硬盘盒中），请使用 `mount-point-template` 为其指定稳定的挂载点。该模板可以组合以下变量：

- `[slot]`
- `[model]`
- `[serial]`
- `[fw-version]`
- `[fs-label]`
- `[fs-uuid]`
- `[fs]`

例如，按序列号挂载驱动器：

```ros
/disk/set nvme1 mount-point-template="[serial]"
```

变量可以组合使用，例如 `mount-point-template="[model]-[fs]"`。空模板会被拒绝。`/disk/settings` 中的 `default-mount-point-template` 设置会将模板应用于每个新磁盘和分区。

## 分区 {#partitions}

要将驱动器拆分为多个分区，请在不使用分区表的情况下格式化它，然后添加分区。RouterOS 将分区信息保存在 GUID 分区表（GPT）中。

```ros
/disk/format nvme9 file-system=ext4
/disk/add type=partition parent=nvme9 partition-size=4G
```

```ros
[admin@MikroTik] > /disk/print where slot~"nvme9"
Flags: B - BLOCK-DEVICE; g - GUID-PARTITION-TABLE, p - PARTITION
Columns: SLOT, MODEL, INTERFACE, SIZE, FS
#    SLOT         MODEL        INTERFACE                   SIZE  FS
0 Bg nvme9        TS1TUTE210T  PCIe 2x8 GT/s  1 024 209 543 168  -
1 Bp nvme9-part1  TS1TUTE210T                     4 000 000 000  -
```

每个分区都会获得自己的插槽名称，它由父级派生而来：`nvme9` 的第一个分区是 `nvme9-part1`。`g - GUID-PARTITION-TABLE` 标志标记父级，`p - PARTITION` 标记分区。

- 如果没有 `partition-size`，分区将使用驱动器上的所有剩余空间。
- 使用 `partition-offset` 设置分区的起始位置（以字节为单位）。
- 分区的使用方式与磁盘类似：格式化、挂载并在其自己的插槽名称下管理它。
- `/disk/format` 中的 `mbr-partition-table=yes` 会改为写入 MBR 分区表；仅当目标系统不接受 GPT 表时才使用它。

## 交换空间 {#swap-space}

:::info
交换空间需要 [container](../../containers/index.md) 包。
:::

交换空间保留给[容器](../../containers/index.md)，使它们能够以超过路由器物理内存的内存运行。交换空间可以是整个分区或一个文件。交换空间大小限制为路由器可用 RAM 的 10 倍。

交换分区将整个磁盘或分区专用于交换，性能优于交换文件：

```ros
/disk/set nvme9-part1 swap=yes
```

交换文件位于现有文件系统上，例如 [Btrfs](../../storage/btrfs/index.md) 磁盘上，并且只使用与其大小相同的空间：

```ros
/disk/add type=file file-path=nvme9-part1/swapfile file-size=512M swap=yes
```

交换文件会以 `S - SWAP-ENABLED` 标志出现在 `/disk` 中：

```ros
[admin@MikroTik] > /disk/print where slot~"nvme9"
Flags: B - BLOCK-DEVICE; M - MOUNTED, S - SWAP-ENABLED
       g - GUID-PARTITION-TABLE, p - PARTITION
Columns: SLOT, MOUNT-POINT, SIZE, FS, SWAP
#     SLOT                       MOUNT-POINT               SIZE  FS    SWAP
0 B g nvme9                                   1 024 209 543 168  -     no
1 BMp nvme9-part1                nvme9-part1      4 000 000 000  ext4  no
2  S  file-nvme9-part1-swapfile                     536 866 816  -     yes
```

## 基于 RAM 的文件夹 {#ram-backed-folder}

要将文件保存在 RAM 中，请添加一个 `tmpfs` 文件夹。路由器重启或断电时，其内容会被清空。

```ros
/disk/add type=tmpfs tmpfs-max-size=100M
```

该文件夹会作为磁盘条目出现在 `/file` 中，例如 `tmp1`。`tmpfs-max-size` 限制该文件夹可以使用的 RAM 量。在存储空间有限的设备上，或对于必须在重启时清除的数据，请使用基于 RAM 的文件夹。有关大小限制、共享以及重启后会发生什么，请参见 [临时文件系统（Tmpfs）](../../storage/tmpfs.md)。

## 挂载镜像 {#mount-images}

RouterOS 还可以直接挂载 `.iso` 和 `.squashfs` 镜像。要挂载镜像，请使用以下命令：

```ros
/disk/add type=file file-path=disk1/mycopy.iso
```

请确保将 `disk1/mycopy.iso` 改为镜像所在位置对应的正确路径。

## 磁盘日志 {#log-on-disk}

在配置磁盘日志记录时，请确保手动创建要存储日志文件的目录，因为在这种情况下，不存在的目录不会自动创建。

```ros
[admin@MikroTik] >  /system/logging/action/set disk disk-file-name=disk1/log
```

日志文件会出现在 `/file` 中你创建的目录下：

```ros
[admin@MikroTik] >  /file/print where name~"disk1/log"
 # NAME                                              TYPE                             SIZE CREATION-TIME
 0 disk1/log                                        directory                             2015-07-03 12:44:09
 1 disk1/log/syslog.0.txt                           .txt file                         160 2015-07-03 12:44:11
```

:::note
防火墙和 web-proxy 等日志主题往往会在系统 NAND 磁盘上保存大量或快速打印的日志，这会加速其磨损。在这种情况下，请使用附加存储或远程日志记录，或将数据保存在 RAM 文件夹中。
:::

## 磁盘上的 Web 代理缓存 {#web-proxy-cache-on-a-disk}

Web 代理将其缓存保存在磁盘上，通常是 USB 驱动器。在 `IP -> Proxy`（`/ip/proxy` 的 `cache-path` 设置）下设置缓存路径，Web 代理存储会自动在 `/file` 中创建。如果使用不存在的目录路径，额外的子目录也会自动创建：

```ros
[admin@MikroTik] >  /ip/proxy/set cache-path=usb1/cache-n-db/proxy/
```

```ros
[admin@MikroTik] >  /file/print
 # NAME                                              TYPE                             SIZE CREATION-TIME
 0 skins                                             directory                             2015-03-02 18:56:23
 1 sys-note.txt                                      .txt file                        23   2015-07-03 11:40:48
 2 usb1                                             disk                                  2015-07-03 11:35:05
 3 usb1/lost+found                                  directory                             2015-07-03 11:34:56
 4 usb1/cache-n-db                                  directory                             2015-07-03 11:41:54
 5 usb1/cache-n-db/proxy                            web-proxy store                       2015-07-03 11:42:09
```

缓存配置请参见 [Web 代理](../../network-management/proxy/web-proxy.md)。

## 检查和修复 {#check-and-repair}

`/disk/check` 和 `/disk/repair` 会对驱动器运行文件系统检查，相当于 `fsck`/`e2fsck`。它们适用于 ext4、Btrfs 和 XFS。仍在使用中的文件系统无法检查：

```ros
/disk/check nvme9-part1
Columns: OUTPUT
OUTPUT
could not unmount, stop using it first
```

当分区上的交换文件使其保持使用状态时也会发生这种情况  -  请在检查分区前移除交换项。先卸载文件系统：

```ros
/disk/set nvme9-part1 mount-filesystem=no
```

`check` 报告错误而不更改任何内容：

```ros
/disk/check nvme9-part1
Columns: OUTPUT
OUTPUT
e2fsck 1.46.5 (30-Dec-2021)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
nvme9-part1-fs: 12/244320 files (0.0% non-contiguous), 166617/976562 blocks
```

`repair` 修复它发现的错误：

```ros
/disk/repair nvme9-part1
Columns: OUTPUT
OUTPUT
e2fsck 1.46.5 (30-Dec-2021)
nvme9-part1-fs: clean, 12/244320 files, 166617/976562 blocks
```

## 测试磁盘性能 {#test-disk-performance}

`/disk/test` 测量驱动器的持续吞吐量和 IOPS。测试在后台运行，并为每个完成的块打印一行，另有一个 `TOT` 行汇总结果。

```ros
/disk/test disk=nvme9-part2 direction=read pattern=sequential type=device block-size=4K duration=20
Columns: SEQ, RATE, IOPS, BYTES, DISK, THREAD, TYPE, PATTERN, DIR, BSIZE, STATE
  ...  11.7Gbps  359 651  1404.9MiB  nvme9-part2  0  device  sequential  read  4096
  ...  11.8Gbps  360 192  1407.0MiB  nvme9-part2  0  device  sequential  read  4096
R TOT  11.8Gbps  360 676  26.1GiB    nvme9-part2  0  device  sequential  read  4096
```

- `direction=read` 保持驱动器内容不变，并可在已挂载的文件系统上运行。
- `direction=write` 会销毁目标上的所有数据；仅对准备擦除的驱动器运行写入测试。
- 为测试指定 `duration`，以便它自行停止；如果不指定，它会一直运行直到停止。
- 新测试会先准备一段时间  -  在开始产生数字之前，`state` 列会显示 `clear caches`。

:::danger
磁盘性能测试可能会缓慢降低磁盘健康状况。

写入操作将销毁运行该操作的驱动器上的所有数据。
:::

## 监控流量和计数器 {#monitor-traffic-and-counters}

`/disk/monitor-traffic` 显示驱动器的实时活动：I/O 操作、传输字节和速度，以总计和每秒的形式显示：

```ros
/disk/monitor-traffic nvme9-part2 once
                  slot:    nvme9-part2
              read-ops:        113 229
   read-ops-per-second:              0
            read-bytes: 29 668 814 848
             read-rate:           0bps
           read-merges:              0
             read-time:       48s149ms
             write-ops:              0
```

`/disk/reset-counters` 会将这些计数器重置为零，包括错误计数器。

## 弹出和扫描 {#eject-and-scan}

在移除驱动器之前，请先将其弹出，以免数据丢失：

```ros
/disk/eject nvme9
```

已弹出的驱动器会被卸载，其插槽会显示 `E - EMPTY` 标志，直到驱动器被移除。`/disk/scan` 会重新检测在未重启的情况下插入或移除的驱动器，并在重新连接后恢复驱动器。

`/disk/trim` 会丢弃已挂载文件系统的未使用块（相当于 `fstrim`），以免 SSD 写入性能下降。USB 驱动器不支持 trim，某些 NVMe 硬盘盒也不支持。

## S.M.A.R.T. 驱动器健康 {#smart-drive-health}

使用 S.M.A.R.T. 进行驱动器健康监控会读取支持该功能的驱动器的诊断信息，例如温度、使用情况和错误计数器。请参见 [S.M.A.R.T. 信息](./smart.md)。

## 相关内容 {#related}

- [存储](../../storage/index.md)  -  RAID、网络存储协议和高级文件系统。
- [容器](../../containers/index.md)  -  使用磁盘空间存储镜像和交换空间。
- [S.M.A.R.T. 信息](./smart.md)  -  驱动器健康监控。
- [Disks CLI 参考](../../cli-reference/disk/index.md)  -  `/disk` 的每个命令和参数。
