---
title: "存储"
description: "本页介绍 RouterOS 存储功能，包括磁盘加密、RAID 配置、Btrfs/XFS 文件系统、iSCSI 和 NFS 等网络协议、通过 DLNA 进行媒体共享、使用 rsync 进行文件同步，以及 ROSE 软件包针对多平台企业级存储管理提供的增强功能。"
tags:
  - 'storage'
  - 'filesystems'
  - 'smb'
source: https://manual.mikrotik.com/docs/7.24/storage
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍 RouterOS 存储功能：磁盘级选项（加密、RAID、Btrfs 等文件系统）、网络存储协议（iSCSI、NFS、SMB、NVMe over TCP）、媒体共享（DLNA）和文件同步（rsync）。

<DocCardList />

:::info

虽然支持普通驱动器，但为提高可靠性，建议使用具有 Power Loss Protection（PLP）的驱动器。
:::

**ROSE (RouterOS Enterprise)** 软件包为 RouterOS 增加数据中心功能——支持磁盘监控、使用 BTRFS 和 XFS 文件系统进行改进的格式化、RAID、rsync、iSCSI、NVMe over TCP、NFS 和 SMB 客户端。该功能目前支持 **arm、arm64、x86** 和 **tile** 平台。

内置 SMB **服务器**和 DLNA 媒体服务器属于基础系统的一部分，不需要 ROSE 软件包——请参阅 [SMB](/docs/smb) 和 [DLNA Media Server](/docs/storage/dlna) 页面。
