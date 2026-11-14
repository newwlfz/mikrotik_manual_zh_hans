---
sidebar_key: "storage/tmpfs"
sidebar_position: 13
title: "临时文件系统（Tmpfs）"
sidebar_label: "临时文件系统"
description: "tmpfs 是 RAM 中用于存放临时文件（例如数据包捕获文件和下载文件）的文件夹。其大小有上限，且其内容在重启后会丢失。"
tags:
  - 'storage'
  - 'tmpfs'
source: https://manual.mikrotik.com/docs/storage/tmpfs
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

tmpfs 是 RAM 中的一个文件夹。RouterOS 将其显示为一块磁盘，例如 `tmp1`，文件可以像放入其他任何磁盘一样放入其中。请将其用于只需要保留一段时间、不应磨损或占满闪存的文件：数据包捕获文件、脚本下载并导入的文件，以及其他临时文件。Tmpfs 是基础 RouterOS 软件包的一部分，可在所有具有 `/disk` 菜单的设备上使用，而 SMIPS 设备没有该菜单。

:::warning
路由器重启或断电时，tmpfs 的内容会丢失。请将要保留的文件复制到闪存、USB 磁盘或计算机上。
:::

## 创建 RAM 文件夹 {#create-a-ram-folder}

添加一个最多可容纳 100 MB 的文件夹：

```ros
/disk/add type=tmpfs tmpfs-max-size=100M
```

```ros
[admin@MikroTik] > /disk/print
Flags: M - MOUNTED
Columns: SLOT, MOUNT-POINT, MODEL, INTERFACE, SIZE, FREE, USE, FS
#   SLOT  MOUNT-POINT  MODEL  INTERFACE         SIZE         FREE  USE  FS
0 M tmp1  tmp1         tmpfs  ram        100 003 840  100 003 840  0%   tmpfs
```

第一个文件夹获得的槽位名称为 `tmp1`，下一个为 `tmp2`。槽位名称是文件路径的开头，例如 `tmp1/capture.pcap`，其他命令通过它来引用该文件夹。

大小使用十进制单位：`100M` 即 100 000 000 字节。`/disk/print` 中的大小会向上取整为完整的 4 KiB 内存页，因此该文件夹显示为 100 003 840。`tmpfs-max-size` 是该文件夹可以增长到的最大值；RAM 仅由存储在其中的文件使用。

## 检查该文件夹共享了什么 {#check-what-the-folder-shares}

在默认配置启用了自动磁盘共享的路由器上，新的 tmpfs 一经创建就会被共享。请先检查路由器的设置：

```ros
/disk/settings/print
```

例如，hAP ax² 的默认配置设置了 `auto-smb-sharing=yes`、`auto-media-sharing=yes` 和 `auto-media-interface=bridge`。随后该文件夹会获得一个供只读 `guest` 用户使用的 SMB 共享（该用户无需密码），并在 `bridge` 上获得一个 DLNA 媒体服务器。当 `/ip/smb` 设置为 `enabled=auto` 时，该共享还会启动 SMB 服务器。SMB 服务器监听所有接口（`interfaces=all`），只有防火墙限制谁能访问它；默认防火墙允许 LAN 访问。除非在 `/ip/smb/users` 中禁用了 `guest` 用户，否则任何能访问 SMB 服务器的人都可以以 `guest` 身份读取该文件夹中的文件，包括数据包捕获文件。

当自动共享开启时，请在关闭共享的情况下创建文件夹。该设置在重启后仍会保留：

```ros
/disk/add type=tmpfs tmpfs-max-size=100M smb-sharing=no media-sharing=no
```

`/disk/print` 中的标志 `s`（SMB 共享）和 `m`（媒体共享）显示哪些文件夹被共享。此处 `tmp1` 是在自动共享开启时创建的，而 `tmp2` 是用上一条命令创建的：

```ros
[admin@MikroTik] > /disk/print
Flags: M - MOUNTED; s - SMB-SHARING; m - MEDIA-SHARING
Columns: SLOT, MOUNT-POINT, MODEL, INTERFACE, SIZE, FREE, USE, FS
#     SLOT  MOUNT-POINT  MODEL  INTERFACE         SIZE         FREE  USE  FS
0 Msm tmp1  tmp1         tmpfs  ram        100 003 840  100 003 840  0%   tmpfs
1 M   tmp2  tmp2         tmpfs  ram        100 003 840  100 003 840  0%   tmpfs
```

文件夹的 SMB 共享是 `/ip/smb/shares` 中的一个动态条目：

```ros
[admin@MikroTik] > /ip/smb/shares/print
Flags: D - DYNAMIC; X - DISABLED; * - DEFAULT
Columns: NAME, DIRECTORY, REQUIRE-ENCRYPTION, VALID-USERS
#     NAME  DIRECTORY  REQUIRE-ENCRYPTION  VALID-USERS
0  X* pub   /pub       no
1 D   tmp1  /tmp1      no                  guest
```

停止共享一个已经共享的文件夹：

```ros
/disk/set tmp1 smb-sharing=no media-sharing=no
```

停止自动共享新的磁盘和文件夹：

```ros
/disk/settings/set auto-smb-sharing=no auto-media-sharing=no
```

要有意地使用你自己的用户共享文件，请参阅 [SMB](./smb.md) 和 [DLNA 媒体服务器](./dlna.md)。

## 将数据包捕获文件保存在 RAM 中 {#keep-packet-captures-in-ram}

数据包捕获文件可能增长得很快。请将其写入 tmpfs 而不是闪存，并将 `file-limit`（单位为 KiB）保持在文件夹大小以下：`50000KiB` 约为 51 MB，可以放入 100 MB 的文件夹中。

```ros
/tool/sniffer/set file-name=tmp1/capture.pcap file-limit=50000KiB \
    filter-interface=ether1
/tool/sniffer/start
```

当捕获到所需的数据包后，停止捕获：

```ros
/tool/sniffer/stop
```

在路由器重启之前，使用 WinBox 或 WebFig 中的 Files 菜单（参见 [在 WinBox 中管理文件](../system-information-and-utilities/files.md#manage-files-in-winbox)）或从你的计算机使用 `scp` 下载 `tmp1/capture.pcap`：

```bash
scp admin@192.168.88.1:tmp1/capture.pcap .
```

有关过滤器和实时流式传输，请参阅 [数据包嗅探器](../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

## 检查文件夹的已用空间 {#check-how-full-the-folder-is}

`/disk/print` 的 `FREE` 和 `USE` 列显示该文件夹已使用了多少空间。它们会在写入后几秒钟更新。列出该文件夹中的文件：

```ros
[admin@MikroTik] > /file/print where name~"^tmp1"
Columns: NAME, TYPE, SIZE, LAST-MODIFIED
# NAME               TYPE        SIZE     LAST-MODIFIED
0 tmp1               disk                 2026-10-01 08:35:03
1 tmp1/capture.pcap  .pcap file  19.8KiB  2026-10-01 08:35:08
```

当文件夹已满时，对其的写入会失败。例如，`/tool/fetch` 会以 `failure: cannot download: file too large, no space left on disk` 停止，并且不会保留部分文件。

## 更改大小或删除文件夹 {#change-the-size-or-delete-the-folder}

新的大小会立即生效，对已挂载的文件夹也是如此：

```ros
/disk/set tmp1 tmpfs-max-size=200M
```

删除该文件夹及其中的所有文件。RouterOS 不会要求确认：

```ros
/disk/remove tmp1
```

## 技术细节 {#technical-details}

### 大小限制 {#size-limit}

如果没有 `tmpfs-max-size`（其读取值为 `0`），该文件夹可以增长到路由器 RAM 的大约一半，例如在具有 1 GB RAM 的路由器上为 464 MB。RouterOS 会将所有 tmpfs 文件夹的最大大小相加，没有 `tmpfs-max-size` 的文件夹按 RAM 的一半计算，当总量超过路由器所能提供的值时，会拒绝新的大小：

```text
failure: too much memory requested for tmpfs/ramdisk
```

### 内存使用 {#memory-use}

空的 tmpfs 不保留任何 RAM。其中的文件会使用 RAM，并降低 `/system/resource` 中的 `free-memory`。填满 RAM 的文件可能导致路由器内存耗尽，因此请将 `tmpfs-max-size` 保持在远低于可用内存的水平。

### 重启之后 {#after-a-reboot}

`/disk` 条目及其设置会保留在配置中。重启后，RouterOS 会在相同的槽位名称下重新挂载该文件夹，且内容为空。该文件夹的自动 SMB 和 DLNA 共享会随之恢复，而设置为 `smb-sharing=no` 和 `media-sharing=no` 的文件夹则保持不共享。

### 不是块设备 {#not-a-block-device}

tmpfs 是文件系统，不是块设备，因此无法格式化：

```text
failure: cannot format nfs/smb/tmpfs/sshfs file systems
```

如需用作块设备的 RAM，例如作为 RAID 成员，请使用 [内存盘](./ramdisk.md)。

有关参数，请参阅 [`/disk` CLI 参考](../cli-reference/disk/index.md)。
