---
title: "NFS"
description: "NFS 使用 NFS v4 在 RouterOS 中实现网络目录共享，需要 Storage 软件包。它使用端口 2049，并包含 nfs-address、nfs-share 和 nfs-sharing 等配置属性。示例配置展示了如何在主机设备上启用 NFS，以及如何从 Linux 客户端挂载 NFS 共享。"
tags:
  - 'nfs'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.24/storage/nfs
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

NFS 允许通过网络共享本地目录。RouterOS 当前仅支持 NFS v4-only 模式。

:::warning

NFS 使用端口 TCP/2049。如果该端口不可用，在 `disk print detail` 中将看到状态停留在 `nfs-state="mounting"`。
:::

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **nfs-address** | NFS 目标的 IP 地址（主机设备 IP） |
| **nfs-share** | 指定要挂载的文件夹（客户端参数） |
| **nfs-sharing** | 在主机设备上禁用/启用 NFS |

## 配置示例 {#configuration-example}

Host

```ros
/disk
set pcie1-nvme1 nfs-sharing=yes
```

Client

```ros
/disk
add type=nfs nfs-address=192.168.1.1
```

Linux 客户端

```bash
mkdir /mnt/files
mount -t nfs 192.168.1.1:/ /mnt/files
```
