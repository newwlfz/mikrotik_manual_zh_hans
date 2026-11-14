---
sidebar_key: "system-information-and-utilities/files"
sidebar_position: 5
title: "文件"
sidebar_label: "文件"
description: "File 菜单用于管理路由器上的用户文件：创建、编辑、复制和删除文件及目录，读取文件内容，以及查看已上传 RouterOS 软件包的详细信息。"
tags:
  - 'file-management'
  - 'routeros-features'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/files
captured_at: '2026-11-04T11:21:58+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

`/file` 菜单显示路由器存储上的所有用户文件，例如上传的软件包、备份、脚本和导出文件。你可以创建文件和目录、编辑文件内容，以及复制或删除条目。对于上传的 RouterOS `.npk` 软件包，该菜单还会显示特定于软件包的信息，例如架构、版本和构建时间：

```ros
[admin@MikroTik] > /file/print detail
0  name=my-dir type=directory last-modified=2026-09-25 12:13:27
 
1  name=routeros-7.24.2-arm64.npk type=package size=13.3MiB
   last-modified=2026-09-25 12:13:01 package-name="system"
   package-version="7.24.2" package-build-time=2026-09-03 09:57:14
   package-architecture="arm64"
 
2  name=skins type=directory last-modified=1970-01-01 03:00:05
 
3  name=my-dir/test.txt type=.txt file size=5 last-modified=2026-09-25 12:13:27
   contents=hello
```

通过 [文件共享](../network-management/cloud/file-share.md)（Back To Home（远程回家））共享的文件和目录会带有 `S`（共享）标志，并显示包含共享链接的 `url` 属性。路由器之间的文件同步在 `/file/sync` 菜单中配置，请参阅 [Rsync](../storage/rsync.md)。

## 在 WinBox 中管理文件 {#manage-files-in-winbox}

在左侧菜单中打开 **Files**。**File** 选项卡会列出文件名、类型、大小和修改时间：

1. 选择 **New**，然后选择 **Text File** 或 **Directory**，以创建条目。
2. 在右侧面板中选择 **Upload...**，将文件从计算机复制到路由器。要将路由器上的文件保存到计算机，请选择其所在行，然后选择 **Download...**。**Remove** 会从路由器中删除所选条目。
3. 上传大文件之前，请检查窗口底部的存储使用情况。

![WinBox Files list with file actions and storage usage](/img/f8c5e1dff7ba33c6.webp)

上传文件会将其存储在路由器上；它不会自动导入配置脚本或恢复备份。如果你打算应用该文件，请遵循相关的配置流程。

## 存储详细信息 {#storage-details}

如果设备的文件列表中存在名为 **flash** 的目录，请将所有需要在重启或断电后保留的文件存储在其中：`flash` 之外的所有内容都保存在 RAM 磁盘中，并会在重启时丢失。这不包括 `.npk` 升级文件，升级过程会在 RAM 磁盘内容被丢弃之前应用这些文件。

在带有 NAND 闪存的多核设备上（例如 CCR 系列路由器和 RB4011），RouterOS 使用回写缓存：文件更改会缓冲在 RAM 中，稍后写入闪存介质，这最多可能延迟 40 秒。这会降低 CPU 使用率和闪存磨损。但是，如果在该时间窗口内突然断电，**可能会留下空文件或零长度文件**，因为更改尚未写入闪存。

在某些设备上，RouterOS 会压缩存储的文件以占用更少的磁盘空间。`/file` 显示原始文件大小，但 `/system/resource` 中的 [`free-hdd-space`](../cli-reference/system/resource/index.md#free-hdd-space) 是根据压缩后的大小计算的，因此它可能显示比预期更多的可用空间。

## 文件操作 {#file-operations}

### 创建文件或目录 {#create-a-file-or-directory}

使用 [`/file/add`](../cli-reference/file/index.md) 命令，并指定 `type=file` 或 `type=directory`：

```ros
[admin@MikroTik] > /file/add name=my-file.txt type=file
[admin@MikroTik] > /file/add name=my-dir type=directory
```

### 读取文件内容 {#read-file-contents}

`get` 仅对大小略低于 60 KiB 的文件返回 `contents` 属性；对于更大的文件，它不返回任何内容。要读取更大的文件，请使用 [`/file/read`](../cli-reference/file/read.md) 命令，该命令会以字符串形式返回文件的一个块：

```ros
[admin@MikroTik] > :put [/file/get text.txt contents]
123456

[admin@MikroTik] > /file/read file=text.txt offset=2 chunk-size=3
  data: 345
```

### 对文件使用 head 或 tail {#head-or-tail-a-file}

使用 [`/file/head`](../cli-reference/file/head.md) 和 [`/file/tail`](../cli-reference/file/tail.md) 打印文件的前 `n` 行或后 `n` 行（默认 10 行）：

```ros
[admin@MikroTik] > /file/head test.txt n=3 numbered
 1: 1
 2: 2
 3: 3
```

### 复制文件或目录 {#copy-a-file-or-directory}

使用 [`/file/copy`](../cli-reference/file/copy.md) 命令。目录会连同其所有内容一起递归复制：

```ros
[admin@MikroTik] > /file/add name=test1.txt type=file
[admin@MikroTik] > /file/add name=dir1 type=directory
[admin@MikroTik] > /file/copy test1.txt name=dir1/test1copy.txt
[admin@MikroTik] > /file/copy dir1 name=dir2
[admin@MikroTik] > /file/print
Columns: NAME, TYPE, SIZE, LAST-MODIFIED
# NAME                TYPE       SIZE  LAST-MODIFIED
0 dir2                directory        2026-09-25 12:12:20
1 dir1                directory        2026-09-25 12:12:20
2 test1.txt           .txt file     0  2026-09-25 12:12:20
3 skins               directory        1970-01-01 03:00:05
4 dir1/test1copy.txt  .txt file     0  2026-09-25 12:12:20
5 dir2/test1copy.txt  .txt file     0  2026-09-25 12:12:20
```

所有参数都记录在 [`/file`](../cli-reference/file/index.md) CLI 参考中。
