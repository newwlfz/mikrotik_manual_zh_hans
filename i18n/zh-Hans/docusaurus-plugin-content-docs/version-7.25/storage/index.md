---
sidebar_key: "storage/index"
sidebar_position: 14
title: "存储"
sidebar_label: "存储"
description: "本页介绍 RouterOS 存储功能，包括磁盘加密、RAID 配置、Btrfs/XFS 文件系统、iSCSI 和 NFS 等网络协议、通过 DLNA 共享媒体、使用 rsync 同步文件，以及提供企业级存储管理的 Storage 软件包。"
tags:
  - 'storage'
  - 'filesystems'
  - 'smb'
source: https://manual.mikrotik.com/docs/7.25/storage
captured_at: '2026-11-04T11:21:21+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 RouterOS 的存储功能：磁盘级选项（加密、RAID、Btrfs 等文件系统）、网络存储协议（iSCSI、NFS、SMB、NVMe over TCP）、媒体共享（DLNA）以及文件同步（rsync）。

<DocCardList />

:::info

虽然支持普通硬盘，但为保证可靠性，我们建议使用具有断电保护（PLP）功能的硬盘。

:::

**Storage 软件包**（在 `/system/package/print` 中显示为 `rose-storage`）为 RouterOS 增加了数据中心功能——通过 S.M.A.R.T. 进行磁盘监控、Btrfs 和 XFS 文件系统、RAID、rsync、iSCSI、NVMe over TCP、NFS 以及 SMB 客户端。目前支持 **arm、arm64、x86** 和 **tile** 平台。

内置的 SMB **服务器**和 DLNA 媒体服务器属于基础系统的一部分，不需要 Storage 软件包——请参阅 [SMB](./smb.md) 和 [DLNA 媒体服务器](./dlna.md) 页面。
