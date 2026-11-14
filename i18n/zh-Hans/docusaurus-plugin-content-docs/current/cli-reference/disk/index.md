---
sidebar_key: "cli-reference/disk"
title: "disk"
sidebar_label: 'disk'
source: https://manual.mikrotik.com/docs/cli-reference/disk
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## disk {#disk}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该设备已禁用且未被使用。</ArgTableRow>
<ArgTableRow arg="A" typ="acquired">acquired</ArgTableRow>
<ArgTableRow arg="E" typ="empty">该插槽为空，没有磁盘。执行 `eject` 后，插槽会保持为空，直到用 `scan` 重新扫描磁盘或重新插拔磁盘。</ArgTableRow>
<ArgTableRow arg="B" typ="block-device">该设备是块设备，也就是说，它可以作为存储使用：可格式化或用于 RAID 阵列。没有此标志的设备仅描述磁盘布局。</ArgTableRow>
<ArgTableRow arg="M" typ="mounted">该设备已挂载，其文件会显示在 `/file` 中。</ArgTableRow>
<ArgTableRow arg="F" typ="formatting">该设备当前正在格式化。</ArgTableRow>
<ArgTableRow arg="S" typ="swap-enabled">该设备已启用交换空间（`swap=yes`）；该设备被用作交换空间，例如供容器使用。</ArgTableRow>
<ArgTableRow arg="f" typ="raid-member-failed">RAID 阵列的某个成员处于故障状态。</ArgTableRow>
<ArgTableRow arg="r" typ="raid-member">该设备是 RAID 阵列的成员。</ArgTableRow>
<ArgTableRow arg="c" typ="encrypted">该设备已加密，例如使用 `type=crypted`（dm-crypt）。</ArgTableRow>
<ArgTableRow arg="g" typ="guid-partition-table">该设备具有 GUID 分区表（GPT）。</ArgTableRow>
<ArgTableRow arg="p" typ="partition">该设备是磁盘的一个分区。</ArgTableRow>
<ArgTableRow arg="t" typ="nvme-tcp-export">该设备作为 NVMe-over-TCP 目标导出。</ArgTableRow>
<ArgTableRow arg="i" typ="iscsi-export">该设备作为 iSCSI 目标导出。</ArgTableRow>
<ArgTableRow arg="s" typ="smb-sharing">该设备通过内置 SMB 服务器共享。</ArgTableRow>
<ArgTableRow arg="n" typ="nfs-sharing">该设备通过 NFS 服务器共享。</ArgTableRow>
<ArgTableRow arg="m" typ="media-sharing">该设备通过 DLNA 媒体服务器共享。</ArgTableRow>
<ArgTableRow arg="L" typ="self-encrypted-and-locked">self-encrypted-and-locked</ArgTableRow>
<ArgTableRow arg="O" typ="self-encryption-enabled">该驱动器上的 TCG-Opal 自加密已启用。</ArgTableRow>
<ArgTableRow arg="o" typ="self-encryption-supported">该驱动器支持 TCG-Opal 自加密，但未启用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="type" typ="enum (raid | nvme-tcp | iscsi | nfs | smb | partition | tmpfs | ramdisk | crypted | sshfs | file | hardware)" mandatory="1">
项目类型：
- `hardware` - 连接到路由器的物理磁盘，例如位于 USB、SATA 或 NVMe 插槽中的磁盘。
- `partition` - 硬件磁盘上的分区（参见 `parent`）。
- `file` - 作为块设备挂载的文件（loop），例如 swap 文件或挂载的 `.iso` / `.squashfs` 镜像。
- `tmpfs` - RAM 中的文件夹，参见 [临时文件系统（Tmpfs）](../../storage/tmpfs.md)。
- `ramdisk` - 用作块设备的 RAM 部分，参见 [内存盘](../../storage/ramdisk.md)（storage 软件包）。
- `raid` - 由多个磁盘组成的 RAID 阵列，参见 [RAID](../../storage/raid/index.md)（storage 软件包）。
- `crypted` - dm-crypt 加密块设备，参见 [加密存储（dm-crypt）](../../storage/encrypted-storage.md)（storage 软件包）。
- `nvme-tcp` - 通过 NVMe over TCP 挂载的磁盘，参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)（storage 软件包）。
- `iscsi` - 作为磁盘挂载的 iSCSI 目标，参见 [iSCSI](../../storage/iscsi.md)（storage 软件包）。
- `nfs` - 作为磁盘挂载的 NFS 共享，参见 [NFS](../../storage/nfs.md)（storage 软件包）。
- `smb` - 作为磁盘挂载的 SMB 共享，参见 [SMB](../../storage/smb.md)（storage 软件包）。
- `sshfs` - 通过 SSH 挂载的远程文件夹。
</ArgTableRow>
<ArgTableRow arg="slot" typ="string">磁盘项目的名称，通常基于设备物理连接的位置，例如 `nvme1` 或 `usb1`。该名称会自动分配，也可以手动设置。其他命令和 `parent` 通过此名称引用该磁盘。</ArgTableRow>
<ArgTableRow arg="parent" typ="enum ()">项目的父设备。在 `type=partition` 项目上，它选择要在其上创建分区的硬件磁盘，例如 `add type=partition parent=nvme9 ...`；在 `type=crypted` 上，它是被加密的驱动器或分区。</ArgTableRow>
<ArgTableRow arg="mount-point-template" typ="string">
挂载点的模板，即文件系统在 `/file` 中显示所在的文件夹。以下变量会被替换：
- `[slot]`（默认）- 插槽名称。
- `[model]` - 设备型号。
- `[serial]` - 设备序列号。
- `[fw-version]` - 设备固件版本。
- `[fs-label]` - 文件系统标签。
- `[fs-uuid]` - 文件系统 UUID。
- `[fs]` - 文件系统类型。
变量可以组合使用，例如 `[model]-[fs]`。空模板会被拒绝，`unset mount-point-template` 会恢复默认值 `[slot]`。新添加磁盘的默认值由 [`settings`](./settings.md) 中的 `default-mount-point-template` 设置。参见 [磁盘](../../hardware/disks/index.md)。
</ArgTableRow>
<ArgTableRow arg="mount-filesystem" typ="bool">设备的文件系统是否已挂载，从而其文件可在 `/file` 中访问。`mount-filesystem=no` 会卸载文件系统，在执行 `/disk check` 或 `/disk repair` 之前必须这样做。默认值：yes。</ArgTableRow>
<ArgTableRow arg="mount-read-only" typ="bool">挂载的文件系统是否为只读。默认值：no。</ArgTableRow>
<ArgTableRow arg="compress" typ="bool">设备的文件系统是否以压缩方式挂载。仅 `btrfs` 文件系统支持；在其他文件系统上设置时，RouterOS 会报告 `compression only available for btrfs`。默认值：no。</ArgTableRow>
<ArgTableRow arg="partition-number" typ="num">父磁盘上分区的编号，例如 `partition-number=1` 表示第一个分区。</ArgTableRow>
<ArgTableRow arg="partition-offset" typ="num">分区在磁盘上的起始偏移量，以字节为单位。可用它调整分区的起始位置。</ArgTableRow>
<ArgTableRow arg="partition-size" typ="num">分区大小，以字节为单位。未设置时，分区占用磁盘上的剩余空间。参见 [磁盘](../../hardware/disks/index.md)。</ArgTableRow>
<ArgTableRow arg="raid-type" typ="enum (0 | 1 | 4 | 5 | 6 | linear) { 0:0, 1:1, 4:4, 5:5, 6:6 }" syscap="storage">
阵列的 RAID 级别：
- `0` - 条带化：数据均匀分布到所有磁盘，无容错能力，性能最佳。
- `1` - 镜像：相同数据写入所有磁盘，容错能力最佳。
- `4` - 带专用奇偶校验盘的块级条带化。
- `5` - 带分布式奇偶校验的块级条带化，可承受一块磁盘故障。
- `6` - 带双奇偶校验的块级条带化，可承受两块磁盘故障。
- `linear` - 磁盘合并为一个大磁盘，无冗余。
参见 [RAID](../../storage/raid/index.md)。
</ArgTableRow>
<ArgTableRow arg="raid-device-count" typ="num" syscap="storage">RAID 阵列中的设备（磁盘）数量，在创建阵列时设置。</ArgTableRow>
<ArgTableRow arg="raid-max-component-size" typ="num" syscap="storage">RAID 阵列中单个设备的最大大小。</ArgTableRow>
<ArgTableRow arg="raid-chunk-size" typ="enum (64K | 128K | 256K | 512K | 1M | 2M | 4M) { 64K:64, 128K:128, 256K:256, 512K:512, 1M:1024, 2M:2048, 4M:4096 }" syscap="storage">跨阵列磁盘写入的块（条带）大小，例如 `1M`。</ArgTableRow>
<ArgTableRow arg="raid-master" typ="enum (none)" syscap="storage">磁盘所属的 RAID 块设备。与成员磁盘上的 `raid-role` 一起设置，可将它们添加到用 `add type=raid ...` 创建的阵列。在 RAID 项目本身上为 `none`。</ArgTableRow>
<ArgTableRow arg="raid-role" typ="num" syscap="storage">磁盘在 RAID 阵列中的位置，用 `raid-master` 设置，从 0 开始，或使用 `spare` 将磁盘标记为热备盘。</ArgTableRow>
<ArgTableRow arg="raid-member-failed" typ="bool" syscap="storage">在 RAID 阵列中将驱动器标记为故障。用于需要替换未故障驱动器时。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-export" typ="bool" syscap="storage">设备是否导出为 NVMe-over-TCP 目标，以便其他设备可以挂载它。默认值：no。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-server-port" typ="num" syscap="storage">NVMe-over-TCP 服务器接受发起方连接的端口。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-server-nqn" typ="string" syscap="storage">导出设备的 NVMe Qualified Name (NQN)，发起方使用它进行连接。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-server-allow-host-name" typ="string" syscap="storage">允许连接到 NVMe-over-TCP 服务器的主机名，用于基于主机的访问控制。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-server-password" typ="string" syscap="storage">NVMe-over-TCP 服务器要求发起方提供的密码。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-address" typ="ipAddr" syscap="storage">在 `nvme-tcp` 客户端上，要挂载的 NVMe-over-TCP 目标（主机）的 IP 地址。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-nqn" typ="string" syscap="storage">在 `nvme-tcp` 客户端上，服务器上要挂载的目标的 NVMe Qualified Name (NQN)。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-host-name" typ="string" syscap="storage">`nvme-tcp` 发起方（客户端）用于标识自身的主机名；用于在服务器上进行标识和认证。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-password" typ="string" syscap="storage">用于向服务器认证 NVMe-over-TCP 连接的密码。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-port" typ="num" syscap="storage">NVMe-over-TCP 目标监听发起方连接的端口。默认值：4420。参见 [NVMe over TCP](../../storage/nvme-over-tcp.md)。</ArgTableRow>
<ArgTableRow arg="iscsi-export" typ="bool" syscap="storage">设备是否导出为 iSCSI 目标。默认值：no。参见 [iSCSI](../../storage/iscsi.md)。</ArgTableRow>
<ArgTableRow arg="iscsi-server-port" typ="num" syscap="storage">iSCSI 服务器监听的端口。参见 [iSCSI](../../storage/iscsi.md)。</ArgTableRow>
<ArgTableRow arg="iscsi-server-iqn" typ="string" syscap="storage">iSCSI 服务器的 iSCSI Qualified Name (IQN)，默认值为 `iqn.2000-02.com.mikrotik:<slot>`。参见 [iSCSI](../../storage/iscsi.md)。</ArgTableRow>
<ArgTableRow arg="iscsi-port" typ="num" syscap="storage">iSCSI 目标监听发起方连接的端口。默认值：3260。参见 [iSCSI](../../storage/iscsi.md)。</ArgTableRow>
<ArgTableRow arg="iscsi-address" typ="ipAddr" syscap="storage">在 `iscsi` 客户端上，要挂载的 iSCSI 目标（主机）的 IP 地址。参见 [iSCSI](../../storage/iscsi.md)。</ArgTableRow>
<ArgTableRow arg="iscsi-iqn" typ="string" syscap="storage">在 `iscsi` 客户端上，要挂载的目标的 iSCSI Qualified Name (IQN)。参见 [iSCSI](../../storage/iscsi.md)。</ArgTableRow>
<ArgTableRow arg="nfs-sharing" typ="bool" syscap="storage">设备是否通过 NFS 共享，以便网络客户端可以挂载它。默认值：no。参见 [NFS](../../storage/nfs.md)。</ArgTableRow>
<ArgTableRow arg="nfs-address" typ="ipAddr" syscap="storage">在 `nfs` 客户端上，要挂载的 NFS 服务器的 IP 地址。参见 [NFS](../../storage/nfs.md)。</ArgTableRow>
<ArgTableRow arg="nfs-share" typ="string" syscap="storage">在 `nfs` 客户端上，要在 NFS 服务器上挂载的文件夹。参见 [NFS](../../storage/nfs.md)。</ArgTableRow>
<ArgTableRow arg="smb-sharing" typ="bool">设备挂载后是否通过内置 SMB 服务器（`/ip/smb`）共享。当 [`settings`](./settings.md) 中的 `auto-smb-sharing=yes` 时，它会自动启用。默认值：no。</ArgTableRow>
<ArgTableRow arg="smb-server-user" typ="enum ()">此磁盘自动创建共享的 SMB 用户；新磁盘的默认值取自 [`settings`](./settings.md) 中的 `auto-smb-user`。</ArgTableRow>
<ArgTableRow arg="smb-server-password" typ="string">自动创建共享的 SMB 用户的密码。</ArgTableRow>
<ArgTableRow arg="smb-server-encryption" typ="bool">到此磁盘 SMB 共享的连接是否必须加密。</ArgTableRow>
<ArgTableRow arg="smb-address" typ="ipAddr">在 `smb` 客户端上，要挂载的 SMB 服务器的 IP 地址。参见 [SMB](../../storage/smb.md)。</ArgTableRow>
<ArgTableRow arg="smb-share" typ="string">在 `smb` 客户端上，要在服务器上挂载的共享名称。参见 [SMB](../../storage/smb.md)。</ArgTableRow>
<ArgTableRow arg="smb-user" typ="string">在 `smb` 客户端上，用于认证的 SMB 用户。参见 [SMB](../../storage/smb.md)。</ArgTableRow>
<ArgTableRow arg="smb-password" typ="string">在 `smb` 客户端上，SMB 用户的密码。</ArgTableRow>
<ArgTableRow arg="smb-encryption" typ="bool">在 `smb` 客户端上，到远程 SMB 共享的连接是否加密。</ArgTableRow>
<ArgTableRow arg="media-sharing" typ="bool">设备挂载后是否通过 DLNA 媒体服务器（`/ip/media`）共享。当 [`settings`](./settings.md) 中的 `auto-media-sharing=yes` 时，它会自动启用。默认值：no。</ArgTableRow>
<ArgTableRow arg="media-interface" typ="iface_enum { none }">DLNA 媒体服务器用于此磁盘共享的接口，与 `media-sharing=yes` 一起设置。</ArgTableRow>
<ArgTableRow arg="tmpfs-max-size" typ="num">`tmpfs` 文件夹的最大大小，使用十进制单位（`100M` 为 100 000 000 字节）。该文件夹仅为其中存储的文件占用 RAM。未设置大小（读取为 `0`）时，文件夹可增长到约一半 RAM。RouterOS 会累加所有 tmpfs 文件夹的最大大小，未设置 `tmpfs-max-size` 的文件夹按一半 RAM 计算；当总计超过路由器可提供的容量（`too much memory requested for tmpfs/ramdisk`）时，会拒绝新的大小。`print` 中的大小会向上取整到完整的 4 KiB 内存页。新值立即生效，对已挂载的文件夹也是如此。`tmpfs` 的内容在重启或断电后丢失。参见 [临时文件系统（Tmpfs）](../../storage/tmpfs.md)。默认值：未设置。</ArgTableRow>
<ArgTableRow arg="ramdisk-size" typ="num" syscap="storage">使用 `type=ramdisk` 创建的 RAM 块设备大小，向上取整到 16 KiB 的倍数。添加 ramdisk 时不会预留 RAM。重启或断电会清除它：ramdisk 仍然存在，但为空且没有文件系统，因此需要重新格式化。需要 `rose-storage` 软件包。参见 [内存盘](../../storage/ramdisk.md)。</ArgTableRow>
<ArgTableRow arg="crypted-backend" typ="enum (none)" syscap="storage">使用 `type=crypted` 加密的驱动器或分区。参见 [加密存储（dm-crypt）](../../storage/encrypted-storage.md)。</ArgTableRow>
<ArgTableRow arg="encryption-key" typ="string" syscap="storage">用于解密 `crypted` 设备的密钥。参见 [加密存储（dm-crypt）](../../storage/encrypted-storage.md)。</ArgTableRow>
<ArgTableRow arg="self-encryption-password" typ="string" syscap="storage">在受支持（SED）驱动器上启用 TCG-Opal 自加密的密码；取消设置会禁用自加密。参见 [自加密硬盘（SED）](../../storage/self-encrypting-drives.md)。</ArgTableRow>
<ArgTableRow arg="sshfs-address" typ="string">对于 `type=sshfs`，要挂载的 SSH 服务器的地址（IP 地址或主机名）。参见 [SSHFS](../../storage/sshfs.md)。</ArgTableRow>
<ArgTableRow arg="sshfs-port" typ="num">对于 `type=sshfs`，要连接的 SSH 服务器端口（默认值：22）。参见 [SSHFS](../../storage/sshfs.md)。</ArgTableRow>
<ArgTableRow arg="sshfs-user" typ="string">对于 `type=sshfs`，用于登录远程 SSH 服务器的用户。参见 [SSHFS](../../storage/sshfs.md)。</ArgTableRow>
<ArgTableRow arg="sshfs-password" typ="string">对于 `type=sshfs`，远程 SSH 用户的密码。参见 [SSHFS](../../storage/sshfs.md)。</ArgTableRow>
<ArgTableRow arg="sshfs-path" typ="string">对于 `type=sshfs`，远程 SSH 服务器上要挂载的路径。参见 [SSHFS](../../storage/sshfs.md)。</ArgTableRow>
<ArgTableRow arg="swap" typ="bool">将设备用作交换空间。交换空间仅由容器使用，其可用大小限制为设备 RAM 的 10 倍。它适用于整个磁盘或分区，或使用 `type=file` 的文件。参见 [磁盘](../../hardware/disks/index.md)。</ArgTableRow>
<ArgTableRow arg="file-path" typ="file">使用 `type=file` 作为块设备挂载的文件的路径和名称，例如交换文件（`swap=yes`）或挂载的 `.iso` / `.squashfs` 镜像。删除磁盘项目不会删除该文件。参见 [磁盘](../../hardware/disks/index.md)。</ArgTableRow>
<ArgTableRow arg="file-size" typ="num">创建 `type=file` 设备时文件的大小，例如 `file-size=1G`。</ArgTableRow>
<ArgTableRow arg="file-offset" typ="num">块设备在文件中开始的偏移量，例如 `file-offset=0`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="slot-default" typ="string">设备的默认插槽名称，在未设置自定义 `slot` 名称时显示。</ArgTableRow>
<ArgTableRow arg="fs-label" typ="string">文件系统的标签。格式化时会自动将其设置为 `<slot>-fs`，除非向 `/disk format` 提供了 `label`。</ArgTableRow>
<ArgTableRow arg="fs-uuid" typ="string">文件系统的 UUID，例如 `58470fe2-...`。</ArgTableRow>
<ArgTableRow arg="fs" typ="enum (fat32 | ext4 | btrfs | xfs | nfs | smb | wipe | wipe-quick | tmpfs | exfat | ntfs | sshfs | squashfs | iso | discard | discard-secure | -)">设备的文件系统：本地文件系统为 `ext4`、`btrfs`、`xfs`、`fat32`、`exfat` 和 `ntfs`，RAM 文件夹为 `tmpfs`，网络挂载为 `nfs`、`smb` 和 `sshfs`，挂载的镜像为 `iso` / `squashfs`。`-` 表示设备没有可识别的文件系统。值 `wipe`、`wipe-quick`、`discard` 和 `discard-secure` 对应于 `/disk format` 的文件系统。</ArgTableRow>
<ArgTableRow arg="model" typ="string">设备的型号名称，例如 `TS1TUTE210T`。</ArgTableRow>
<ArgTableRow arg="serial" typ="string">设备的序列号。</ArgTableRow>
<ArgTableRow arg="fw-version" typ="string">设备的固件版本。</ArgTableRow>
<ArgTableRow arg="size" typ="num">设备的总大小，以字节为单位。</ArgTableRow>
<ArgTableRow arg="free" typ="num">已挂载文件系统上的可用空间，以字节为单位。</ArgTableRow>
<ArgTableRow arg="total-inodes" typ="num">文件系统的 inode 总数。</ArgTableRow>
<ArgTableRow arg="free-inodes" typ="num">文件系统的可用 inode 数。</ArgTableRow>
<ArgTableRow arg="use" typ="num">文件系统的已用空间百分比，例如 `4%`。</ArgTableRow>
<ArgTableRow arg="mount-point" typ="string">文件系统的挂载点，即它在 `/file` 中显示所在的文件夹，由 `mount-point-template` 决定。</ArgTableRow>
<ArgTableRow arg="sector-size" typ="num">设备的扇区大小，例如 512 字节。</ArgTableRow>
<ArgTableRow arg="interface" typ="string">设备连接到的接口，例如 `PCIe 2x8 GT/s` 或 `USB 2.00 480Mbps`。</ArgTableRow>
<ArgTableRow arg="interface-speed" typ="num">设备连接到的接口速度，例如 `15.7Gbps`。</ArgTableRow>
<ArgTableRow arg="raid-member-state" typ="string" syscap="storage">磁盘作为其 RAID 阵列成员的状态，例如 `0:in_sync`；当磁盘不属于已组装阵列时，则改为显示在其上找到的 RAID 超级块详细信息。</ArgTableRow>
<ArgTableRow arg="state" typ="string">RAID 阵列的状态，例如 `clean`。</ArgTableRow>
<ArgTableRow arg="last-seen" typ="string">最后占用此插槽的磁盘的型号和序列号，在磁盘被弹出或移除后显示，例如 `TS1TUTE210T J398770033`。</ArgTableRow>
<ArgTableRow arg="raid-uuid" typ="string" syscap="storage">RAID 阵列的 UUID。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-server-secret" typ="string" syscap="storage">NVMe-over-TCP 服务器用于认证来自发起方连接的密钥。</ArgTableRow>
<ArgTableRow arg="nvme-tcp-secret" typ="string" syscap="storage">用于认证到 NVMe-over-TCP 服务器连接的密钥。</ArgTableRow>
<ArgTableRow arg="sshfs-local-user" typ="string">SSHFS 挂载运行所依据的本地 RouterOS 用户，例如 `admin`。只读。</ArgTableRow>
<ArgTableRow arg="io-ops" typ="num">设备上的 I/O 操作总数，如 [`monitor-traffic`](./monitor-traffic.md) 所示。</ArgTableRow>
<ArgTableRow arg="io-errors" typ="num">设备上的 I/O 错误总数。</ArgTableRow>
<ArgTableRow arg="read-ops" typ="num">读操作总数。</ArgTableRow>
<ArgTableRow arg="read-ops-per-second" typ="num">每秒读操作数。</ArgTableRow>
<ArgTableRow arg="read-bytes" typ="num">读取的总字节数。</ArgTableRow>
<ArgTableRow arg="read-rate" typ="num">读取速率，例如以字节/秒为单位。</ArgTableRow>
<ArgTableRow arg="read-merges" typ="num">合并的相邻读操作数。</ArgTableRow>
<ArgTableRow arg="read-time" typ="time">读操作花费的时间。</ArgTableRow>
<ArgTableRow arg="write-ops" typ="num">写操作总数。</ArgTableRow>
<ArgTableRow arg="write-ops-per-second" typ="num">每秒写操作数。</ArgTableRow>
<ArgTableRow arg="write-bytes" typ="num">写入的总字节数。</ArgTableRow>
<ArgTableRow arg="write-rate" typ="num">写入速率，例如以字节/秒为单位。</ArgTableRow>
<ArgTableRow arg="write-merges" typ="num">合并的相邻写操作数。</ArgTableRow>
<ArgTableRow arg="write-time" typ="time">写操作花费的时间。</ArgTableRow>
<ArgTableRow arg="in-flight-ops" typ="num">当前正在进行的 I/O 操作数。</ArgTableRow>
<ArgTableRow arg="active-time" typ="time">设备忙于处理请求的时间。</ArgTableRow>
<ArgTableRow arg="wait-time" typ="time">请求在队列中等待的时间。</ArgTableRow>
<ArgTableRow arg="discard-ops" typ="num">discard（trim）操作总数。</ArgTableRow>
<ArgTableRow arg="discard-bytes" typ="num">已 discard 的总字节数。</ArgTableRow>
<ArgTableRow arg="discard-merges" typ="num">合并的相邻 discard 操作数。</ArgTableRow>
<ArgTableRow arg="discard-time" typ="time">discard 操作花费的时间。</ArgTableRow>
<ArgTableRow arg="flush-ops" typ="num">flush 操作总数。</ArgTableRow>
<ArgTableRow arg="flush-time" typ="time">flush 操作花费的时间。</ArgTableRow>
<ArgTableRow arg="temperature" typ="num">驱动器温度（摄氏度），由 S.M.A.R.T. 报告（storage 软件包）。参见 [S.M.A.R.T. 信息](../../hardware/disks/smart.md) 指南和 [`smart-info`](./smart-info.md)。</ArgTableRow>
<ArgTableRow arg="temperatures" typ="multi { array-id, slot: num
 }">驱动器传感器的温度（摄氏度），每个传感器插槽一项。</ArgTableRow>
<ArgTableRow arg="critical-warning" typ="ubit (spare-space, temperature, reliability-degraded, read-only, volatile-backup-failed)">驱动器报告的严重警告位掩码：`spare-space`（可用备用空间低于 `available-spare-threshold`）、`temperature`（温度超出范围）、`reliability-degraded`、`read-only`（设备进入只读模式）和 `volatile-backup-failed`。</ArgTableRow>
<ArgTableRow arg="available-spare" typ="num">驱动器的剩余备用块百分比，例如 100%。低于 `available-spare-threshold` 时，驱动器会报告警告。</ArgTableRow>
<ArgTableRow arg="available-spare-threshold" typ="num">以百分比表示的阈值，低于该值时驱动器的可用备用空间会被报告为警告。</ArgTableRow>
<ArgTableRow arg="percentage-used" typ="num">根据已消耗的备用块数量估算的驱动器寿命已使用百分比。</ArgTableRow>
<ArgTableRow arg="host-read-bytes" typ="num">主机从驱动器读取的总字节数。</ArgTableRow>
<ArgTableRow arg="host-write-bytes" typ="num">主机写入驱动器的总字节数。</ArgTableRow>
<ArgTableRow arg="host-read-cmds" typ="num">主机发送给驱动器的读命令总数。</ArgTableRow>
<ArgTableRow arg="host-write-cmds" typ="num">主机发送给驱动器的写命令总数。</ArgTableRow>
<ArgTableRow arg="controller-busy-time" typ="time">驱动器控制器忙于处理命令的总时间。</ArgTableRow>
<ArgTableRow arg="power-cycles" typ="num">驱动器的通电次数。</ArgTableRow>
<ArgTableRow arg="power-on-time" typ="time">驱动器的总通电时间。</ArgTableRow>
<ArgTableRow arg="unsafe-shutdowns" typ="num">驱动器的非安全（意外）关机次数。</ArgTableRow>
<ArgTableRow arg="unrecovered-integrity-errors" typ="num">驱动器的未恢复介质和数据完整性错误数。</ArgTableRow>
<ArgTableRow arg="warning-temperature" typ="num">驱动器开始报告警告的温度（摄氏度）。</ArgTableRow>
<ArgTableRow arg="warning-temperature-time" typ="time">驱动器处于 `warning-temperature` 以上的时间。</ArgTableRow>
<ArgTableRow arg="critical-temperature" typ="num">驱动器报告严重状态的温度（摄氏度）。</ArgTableRow>
<ArgTableRow arg="critical-temperature-time" typ="time">驱动器处于 `critical-temperature` 以上的时间。</ArgTableRow>
</ArgTable>
