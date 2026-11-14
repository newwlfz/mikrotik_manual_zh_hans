---
sidebar_key: "storage/nfs"
sidebar_position: 5
title: "NFS"
sidebar_label: "NFS"
description: "NFS 通过 NFS v4 在 RouterOS 中启用网络目录共享，需要 Storage 软件包。它使用 TCP/2049 端口，并通过 /disk 的 nfs-sharing、nfs-address 和 nfs-share 参数进行配置。"
tags:
  - 'nfs'
  - 'storage'
source: https://manual.mikrotik.com/docs/storage/nfs
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

NFS 允许通过网络共享本地目录。RouterOS 目前仅支持 NFS v4 模式。

:::warning

NFS 使用 TCP/2049 端口。如果该端口不可用，在 `/disk print detail` 中你会看到状态一直停留在 `nfs-state="mounting"`。
:::

## 配置示例 {#configuration-example}

主机：为已挂载的磁盘启用 NFS 共享。

```ros
/disk/set pcie1-nvme1 nfs-sharing=yes
```

客户端：添加一个 `type=nfs` 的设备来挂载该共享。

```ros
/disk/add type=nfs nfs-address=192.168.1.1
```

Linux 客户端：

```bash
mkdir /mnt/files
mount -t nfs 192.168.1.1:/ /mnt/files
```
