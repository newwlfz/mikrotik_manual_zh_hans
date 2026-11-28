---
title: "磁盘"
description: "本页介绍 MikroTik RouterOS 中的磁盘管理，涵盖存储设备检测、格式化、交换空间和 S.M.A.R.T. 监控。它说明如何添加外部驱动器、管理挂载点、使用多种文件系统格式化磁盘以及使用 RAID 功能。它还强调安全弹出磁盘以防止数据丢失。"
tags:
  - 'disks'
  - 'storage'
  - 'filesystem'
source: https://manual.mikrotik.com/docs/7.24/hardware/disks
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 RouterOS 上的物理磁盘处理，包括磁盘检测、格式化、swap 和 S.M.A.R.T.。有关网络存储协议（iSCSI、NFS、SMB、NVMe over TCP）、RAID、文件系统（Btrfs）以及由 ROSE 软件包添加的其他功能，请参阅 [Storage](/docs/storage) 部分。

## 摘要 {#summary}

**子菜单：** `/disk`

此菜单列出所有已连接的存储设备，前提是这些设备受支持且工作正常。这对于带有 SD/CF/USB/SATA/NVMe 插槽的 RouterBOARD 设备，以及带有额外专用存储驱动器的 x86 系统尤其有用，因为内置存储空间很小。当需要在路由器上使用大型 User Manager 数据库、代理缓存或 SMB 共享时，外接驱动器非常方便。

你可以添加任意数量的外接或辅助驱动器，并为上述每项功能选择任意数量的驱动器。例如，User Manager 可以使用三个磁盘设备，其中一个作为活动数据库，其余作为备份。随后可以添加第四个磁盘，将活动数据复制到该磁盘，卸载它，拔下它，并将其移到另一台服务器以继续使用实际数据库。这使迁移和备份变得简单。

磁盘名称基于其物理连接位置。

:::info
**[Storage](/docs/storage)** 软件包增加了磁盘监控、高级文件系统、RAID、rsync、iSCSI、NVMe over TCP、NFS 和 SMB 客户端。详情请参阅 [Storage](/docs/storage) 部分。
:::

:::danger
**在从 RouterOS 设备中物理移除任何磁盘之前，务必使用 `/disk/eject`，以防止数据丢失！**
:::

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **eject**| 使用分配给所选驱动器的“slot”安全地卸载（弹出）该驱动器。执行该命令后，可从主机设备上移除该驱动器。 |
| **format** | 用于启动磁盘格式化过程的命令。包含其自身的附加属性，例如“file-system”和“label”。<ul><li>选择要格式化的磁盘（slot）</li><li><em>file-system</em>（'exfat'、'ext4'、'fat32'、'xfs'、'btrfs'、'discard'、'discard-secure'、'wipe'）- 应用一种可用的文件系统类型；也可用于丢弃存储块（等同于 blkdiscard）或安全擦除（覆盖）数据。</li><li>mbr-partition-table - 创建 mbr 分区表</li></ul> |
| **trim** | 丢弃未使用的数据块以提升性能（等同于 fstrim）。某些 NVMe 机箱可能不支持磁盘修剪。 |
| **reset-counters** | 重置磁盘（slot）统计信息 |
| **monitor-traffic** | 检查实时磁盘性能和健康状态统计信息 |
| **test** | 允许对所选设备执行性能测试（从 RouterOS 7.16 起可用） <br/><ul><li><em>disk - </em>用于测试的一个或多个设备</li><li><em>direction </em>-（'read'、'write'） </li><li>duration -（int） </li><li>pattern -（'random'、'sequential'）</li><li>thread-count -（int）</li><li>block-size - 用于测试的块大小</li><li>type -（'device'、'filesystem'）</li></ul> |
| **mount-read-only** | 设置为 *yes* 时，将已挂载磁盘设置为只读模式。 |
| **mount-point-template** | 设置文件系统的挂载点。可以基于磁盘将挂载点设置为以下参数： <br/><ul><li>[slot] <em>（default）</em> - 将挂载点设置为 slot 名称。</li><li>[model] - 将挂载点设置为设备型号名称。</li><li>[serial] - 将挂载点设置为设备序列号</li><li>[fw-version] - 将挂载点设置为设备固件版本。</li><li>[fs-label] - 将挂载点设置为设备文件系统标签。</li><li>[fs-uuid] - 将挂载点设置为设备的 UUID</li><li>[fs] - 将挂载点设置为设备文件系统</li></ul><code>/disk/set nvme1 mount-point-template="[model]"</code> 此外，可以组合多个变量以创建单个挂载点： <br/><code>/disk/set nvme1 mount-point-template="[model]-[fs]"</code><br/> |

## Flags

| 属性 | 说明 |
| :-- | :-- |
| **X - disabled** | 已禁用设备 |
| **E - empty** | 空 slot |
| **B - BLOCK-DEVICE** | “B - BLOCK-DEVICE”标志表示该设备使用块进行输入/输出操作。在 RouterOS 中，这一区别很重要，因为它有助于判断设备是作为数据存储介质运行，还是仅提供磁盘布局结构信息。当考虑设备后接扩展器时，这一区别尤为重要。如果设备标有字母“B”，表示其可用作存储或内存。相反，没有“B”标记的设备主要用于识别磁盘结构。 <br/> 这使你可以快速识别是否存在 PCIe 或 SAS 扩展器，并检测第一个扩展器中是否存在驱动器。此外，还可以估算每个设备所连接链路的速度。 <br/> 不过，“B”标志最显著的作用是能够立即指示设备是否可以格式化或用于 RAID。 |
| **M - mounted** | 已挂载分区 |
| **F - formatting** | 设备当前正在格式化 |
| **p - partition** | 设备具有分区 |
| **f - raid-member-failed** | 这些选项与 [ROSE](/docs/storage) 软件包一起使用。 |
| **r - raid-member** |  |
| **c - encrypted** |  |
| **g - guid-partition-table** |  |
| **t - nvme-tcp-export** |  |
| **i - iscsi-export** |  |
| **s - smb-sharing** |  |
| **n - nfs-sharing** |  |
| **O - tcg-opal-self-encryption-enabled** |  |
| **o - tcg-opal-self-encryption-supported** |  |

## 设置 {#settings}

| 属性 | 说明 |
| :-- | :-- |
| **auto-smb-sharing** (yes \| no; Default: ) | 在“/disk”中添加新磁盘/分区项目时启用动态 SMB 共享 |
| **auto-smb-user** (list of strings; Default: ) | 在“/disk”中添加新磁盘/分区项目时，smb-sharing/smb-user 设置的默认值 |
| **auto-media-sharing** (yes \| no; Default: ) | 在“/disk”中添加新磁盘/分区项目时动态启用 DLNA |
| **auto-media-interface** (list of strings; Default: ) | 在“/disk”中添加新磁盘/分区项目时，用于 `/ip/media` 动态实例的接口 |
| **default-mount-point-template** (string, Default: ) | 为“/disk”中添加的每个项目设置默认挂载点模板 |

:::note

### 说明当设置 `auto-smb-sharing=yes` 且 `/ip/smb/share enabled=auto` 时，插入存储设备后会自动启用 SMB 服务器 {#notes}
:::

## 示例 {#examples}

### 格式化已连接的存储设备 - 简单 {#formatting-attached-storage-unit---simple}

1. 磁盘已连接，并且已由系统自动挂载。

```ros
[admin@MikroTik] > disk print
Flags: B - BLOCK-DEVICE; M, F - FORMATTING
Columns: SLOT, MODEL, SERIAL, INTERFACE, SIZE, FREE, FS
#    SLOT  MODEL           SERIAL            INTERFACE                  SIZE           FREE  FS
0 BM usb1  USB Flash Disk  FBA0911260071572  USB 2.00 480Mbps  2 004 877 312  1 921 835 008  ext4
```

```ros
[admin@MikroTik] > /file/print
 # NAME                        TYPE          SIZE CREATION-TIME
 0 skins                       directory          1970-01-01 03:00:01
 1 pub                         directory          1970-02-04 21:31:40
 2 usb1                        disk               2022-03-07 14:05:16
```

1. 使用任一受支持的文件系统（ext4、fat32、exfat、xfs、btrfs）格式化磁盘。

```ros
[admin@MikroTik] > /disk/format usb1 file-system=ext4 mbr-partition-table=no
  formatted: 100%
```

1. 完成！驱动器已格式化，格式化过程完成后应会自动挂载。

### 格式化已连接的存储设备 - 详细 {#formatting-attached-storage-unit---detailed}

在继续进行手动格式化之前，请确保存储设备已正确连接到 RouterOS 设备。如果存储包含受支持的文件系统和分区表，系统将自动尝试挂载该存储。挂载后，设备会在插入后不久显示在 `/file` 菜单中。

如果存储未被自动检测或挂载，请执行以下步骤：

1. 通过检查磁盘菜单，确认路由器识别到已连接的存储：

```ros
[admin@MikroTik] > disk print
Flags: B - BLOCK-DEVICE; M, F - FORMATTING
Columns: SLOT, MODEL, SERIAL, INTERFACE, SIZE, FREE, FS
#    SLOT  MODEL           SERIAL            INTERFACE                  SIZE           FREE  FS
0 BM usb1  USB Flash Disk  FBA0911260071572  USB 2.00 480Mbps  2 004 877 312  1 921 835 008  ext4
```

此输出确认系统检测到存储驱动器，并显示其当前文件系统类型。

1. 通过检查文件菜单确认磁盘已挂载：

```ros
[admin@MikroTik] > /file/print
 # NAME     TYPE    SIZE CREATION-TIME
 0 usb1     disk         2022-03-07 14:05:16
 1 skins    directory    1970-01-01 03:00:01
 2 pub      directory    1970-02-04 21:31:40
```

1. 要格式化驱动器，请使用磁盘插槽名称或 ID 以及首选文件系统（ext4、fat32、exfat、xfs 或 btrfs）。还可以为设备分配标签，并指定是否创建 MBR 分区表：

```ros
[admin@MikroTik] > /disk/format usb1 file-system=ext4 label=usb-flash mbr-partition-table=yes
  formatted: 100%
```

:::note
**Note:** 格式化过程会显示进度百分比指示器。较大的存储驱动器可能需要更长时间才能完成。请等待过程结束后再移除设备。
:::

### 创建多个磁盘分区 {#creating-multiple-disk-partitions}

要创建多个 GPT 分区，请先格式化驱动器而不创建分区表，然后手动添加分区：

```ros
[admin@MikroTik] > /disk/format usb1 file-system=ext4 label=usb-flash mbr-partition-table=no
  formatted: 100%
```

```ros
[admin@MikroTik] > /disk/add type=partition parent=usb1 partition-size=200M
[admin@MikroTik] > /disk/add type=partition parent=usb1 partition-size=500M
[admin@MikroTik] > /disk/add type=partition parent=usb1 slot=usb1-last-partition
```

:::info
**Notes:**

- 插槽名称（分区或磁盘）会自动分配，但可以使用 `slot` 参数手动指定。
- 未指定分区大小时，剩余可用空间将用于最后一个分区。
- 要调整分区的起始位置，请使用 `partition-offset` 参数。
:::

### Web-Proxy 缓存配置示例 {#web-proxy-cache-configuration-example}

在 IP -> Proxy 菜单中输入代理缓存路径，Web 代理存储将自动在文件菜单中创建。如果使用不存在的目录路径，也会自动创建额外的子目录。

```ros
[admin@MikroTik] >  /ip/proxy/set cache-path=usb1/cache-n-db/proxy/

...

[admin@MikroTik] >  /file/print
 # NAME                                              TYPE                             SIZE CREATION-TIME       
 0 skins                                             directory                             2015-03-02 18:56:23
 1 sys-note.txt                                      .txt file                        23   2015-07-03 11:40:48
 2 usb1                                             disk                                  2015-07-03 11:35:05
 3 usb1/lost+found                                  directory                             2015-07-03 11:34:56
 4 usb1/cache-n-db                                  directory                             2015-07-03 11:41:54
  5 usb1/cache-n-db/proxy                            web-proxy store                       2015-07-03 11:42:09
```

### 磁盘日志记录配置示例 {#log-on-disk-configuration-example}

配置磁盘日志记录时，请确保手动创建用于存储日志文件的目录，因为在这种情况下不会自动创建不存在的目录。

```ros
[admin@MikroTik] >  /system/logging/action/set disk disk-file-name=disk1/log

...

[admin@MikroTik] >  /file/print where name~"disk1/log"
 # NAME                                              TYPE                             SIZE CREATION-TIME       
 0 disk1/log                                        directory                             2015-07-03 12:44:09
 1 disk1/log/syslog.0.txt                           .txt file                         160 2015-07-03 12:44:11
```

:::note
**注意：** 诸如 firewall、web-proxy 以及某些其他日志主题，如果倾向于在系统 NAND 磁盘上保存大量日志或快速打印日志，可能会加快磁盘磨损，因此在这种情况下建议使用外接存储或远程日志记录，或将数据保存在 RAM 文件夹中
:::

### 为文件夹分配 RAM {#allocate-ram-to-folder}

可以添加链接到 RAM 的文件夹。文件夹将在重启或断电时被清空。  
RAM 将填充至 tmpfs-max-size，如果未提供该变量，则最多填充至可用 RAM 的 1/2。

```ros
[admin@MikroTik] >  /disk/add type=tmpfs tmpfs-max-size=100M
[admin@MikroTik] > file print 
Columns: NAME, TYPE, SIZE, CREATION-TIME
#  NAME            TYPE       SIZE             CREATION-TIME       
0  tmp1             disk     100 003 840        2022-12-12 11:01:48
```

### 测试磁盘性能 {#test-disk-performance}

:::danger
磁盘性能测试可能会逐渐降低磁盘健康状况

在写入测试中，磁盘上的所有文件和文件系统都将被销毁
:::

从 7.16 开始，可运行磁盘性能测试。磁盘必须已禁用，或没有可挂载的文件系统（未格式化）。  
检查可用磁盘，如果某个磁盘已挂载，请禁用它。

```ros
[admin@MikroTik] > /disk/print
Flags: B - BLOCK-DEVICE; M - MOUNTED
Columns: SLOT, MODEL, SERIAL, INTERFACE, SIZE, FREE, FS
#    SLOT  MODEL             SERIAL         INTERFACE                    SIZE            FREE  FS
0 BM usb1  JMicron External  DD56419883891  USB 3.10 5000Mbps  64 023 257 088  62 692 188 160  ext4

[admin@MikroTik] > disk disable usb1

[admin@MikroTik] > disk test disk=usb1 pattern=sequential  type=device thread-count=4 block-size=4K direction=write
Columns: SEQ, RATE, IOPS, DISK, TYPE, PATTERN, DIR, BSIZE, THREADS
SEQ  RATE          IOPS  DISK  TYPE    PATTERN     DIR    BSIZE  THREADS
0    1622.5Mbps  49 516  usb2  device  sequential  write   4096        4
1    26.2Mbps       800  usb2  device  sequential  write   4096        4
2    33.0Mbps     1 008  usb2  device  sequential  write   4096        4
3    11.7Mbps       360  usb2  device  sequential  write   4096        4
4    28.5Mbps       872  usb2  device  sequential  write   4096        4
5    34.6Mbps     1 056  usb2  device  sequential  write   4096        4
6    33.8Mbps     1 032  usb2  device  sequential  write   4096        4
TOT  255.7Mbps    7 806  usb2  device  sequential  write   4096        4

```

### 交换空间 {#swap-space}

可以为 RouterOS 设备添加交换空间。当在 RouterOS 上使用 [containers](/docs/containers) 时，这很有用，可运行需要比 RouterOS 设备实际 RAM 更多内存的容器。可以将磁盘（或分区）用作交换空间，也可以将文件用作交换空间。

#### 交换分区 {#swap-partition}

交换分区要求已将磁盘（或分区）连接到 RouterOS 设备。整个磁盘（或分区）都将用作交换空间，不能用于其他用途。请确保为交换分区使用高速磁盘。使用交换分区的性能优于使用交换文件。   |

要将磁盘（或分区）用作交换分区，可以使用以下命令：

```routeros
/disk/set disk1 swap=yes   
```

请确保将 `disk1` 更改为正确的磁盘名称！

#### 交换文件 {#swap-file}

交换文件要求磁盘已格式化为文件系统，例如 [Btrfs](/docs/storage/btrfs)。与交换分区选项相比，整块磁盘（或分区）不会用作交换空间，磁盘（或分区）上只会占用交换文件大小的空间。使用交换文件的性能低于使用交换分区。

要在现有文件系统上创建交换文件，可以使用以下命令：

```routeros
/disk/add type=file file-path=disk1/swapfile file-size=1G swap=yes
```

确保将 `disk1` 更改为磁盘挂载所在的正确路径。

### 挂载镜像 {#mount-images}

RouterOS 也可以直接挂载 **.iso** 和 **.squashfs** 镜像。要挂载镜像，请使用以下命令：

```routeros
/disk/add type=file file-path=disk1/mycopy.iso 
```

确保将 `disk1/mycopy.iso` 更改为镜像所在的正确路径。
