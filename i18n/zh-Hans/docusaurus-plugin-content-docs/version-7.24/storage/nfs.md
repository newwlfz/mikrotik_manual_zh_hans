---
sidebar_key: "storage/nfs"
sidebar_position: 5
title: "NFS"
sidebar_label: "NFS"
description: "NFS 使 RouterOS 能够使用 NFS v4 进行网络目录共享，需要 Storage 软件包。它使用端口 2049，并包含 nfs-address、nfs-share 和 nfs-sharing 等配置属性。示例配置展示了在主机设备上启用 NFS，以及从 Linux 客户端挂载 NFS 共享。"
tags:
  - 'nfs'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.24/storage/nfs
captured_at: '2026-11-04T11:33:03+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

NFS 允许通过网络共享本地目录。RouterOS 目前仅支持 NFS v4 模式。

:::warning

NFS 使用 TCP/2049 端口。如果该端口不可用，在 `disk print detail` 中你会看到状态一直停留在 `nfs-state="mounting"`。

:::

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **nfs-address** | NFS 目标的 IP 地址。（主机设备 IP） |
| **nfs-share** | 指定要挂载的文件夹（客户端参数） |
| **nfs-sharing** | 在主机设备上禁用/启用 NFS |

## 配置示例 {#configuration-example}

主机

```ros
/disk
set pcie1-nvme1 nfs-sharing=yes
```

客户端

```ros
/disk
add type=nfs nfs-address=192.168.1.1
```

Linux 客户端

```bash
mkdir /mnt/files
mount -t nfs 192.168.1.1:/ /mnt/files
```
