---
sidebar_key: "storage/sshfs"
sidebar_position: 12
title: "SSHFS"
sidebar_label: "SSHFS"
description: "SSHFS 允许将远程 SSH 服务器上的文件夹作为 RouterOS 中的本地磁盘挂载，使用 `/disk` 的 `sshfs` 类型。挂载通过远程地址、用户凭据和路径进行配置，并像其他网络文件系统一样显示在 `/file` 中。"
tags:
  - 'ssh'
  - 'storage'
  - 'sshfs'
source: https://manual.mikrotik.com/docs/7.25/storage/sshfs
captured_at: '2026-11-04T11:21:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

SSHFS（SSH 文件系统）通过 SSH 将远程文件夹挂载为路由器上的本地磁盘。它通过 `/disk/add type=sshfs` 进行配置，随后远程目录会像其他已挂载存储一样出现在 `/file` 下，因此可以在本地浏览和复制文件。

RouterOS 在 `/disk` 下跟踪每个 sshfs 条目，其 slot 由地址和路径自动生成，例如地址 `192.168.88.1` 和路径 `/srv/files` 对应 `sshfs-192-168-88-1--srv-files`，并以 `sshfs://<user>@<address>:<port>//<path>` 的形式暴露该挂载。

## 配置示例 {#configuration-example}

```ros
/disk/add type=sshfs sshfs-address=192.168.88.1 sshfs-port=22 sshfs-user=user sshfs-password=superSecret sshfs-path=/srv/files
```

添加条目后，路由器会在后台开始连接；在连接过程中（或远程端不可达期间），该条目会显示 `state=mounting`：

```ros
[admin@MikroTik] > /disk/print where type=sshfs
Columns: SLOT, FS, MOUNT-POINT, STATE
#   SLOT                                FS     MOUNT-POINT  STATE
0   sshfs-192-168-88-1--srv-files  sshfs  sshfs-192-168-88-1--srv-files   mounting
```

挂载完成后，远程文件夹会作为目录出现在 `/file` 下的挂载点中（`/file/print`）。

可以使用 `/disk/set` 调整该条目，例如更改端口：

```ros
/disk/set [find where type=sshfs] sshfs-port=2222
```

使用 `/disk/remove <slot>` 移除挂载。

身份验证使用远程 SSH 服务器的用户名/密码（`sshfs-user` / `sshfs-password`）。`sshfs-local-user` 在路由器上是只读的，表示该挂载所运行的本地 RouterOS 用户（例如 `admin`）。
