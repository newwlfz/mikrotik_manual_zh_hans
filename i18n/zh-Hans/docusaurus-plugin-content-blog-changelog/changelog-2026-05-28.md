---
title: "文档更新 - 2026年5月28日"
date: 2026-05-28
slug: /changelog-2026-05-28
source: https://manual.mikrotik.com/changelog/changelog-2026-05-28
captured_at: '2026-11-04T06:07:47+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年5月28日文档变更摘要。

## 入门 {#getting-started}

- **[入门](/docs/getting-started)**：在落地页新增了 Quickstart 区块，列出访问新路由器管理界面的四个步骤（浏览器访问 192.168.88.1、WinBox 或 MikroTik 移动应用）。并说明管理员密码现在印在路由器上的贴纸上，不再是空密码。First Time Configuration 现已置顶于该章节。

## 存储 {#storage}

- **[存储](/docs/storage)**：存储现在是独立的顶级文档章节。此前分散在 Extended Features 下的内容被重组为单独的页面：iSCSI、NFS、NVMe over TCP、SMB（服务端和客户端）、RAID、加密存储、rsync、ramdisk、tmpfs、自加密硬盘和 DLNA。旧 URL 通过重定向保留，因此现有链接仍可继续使用。
- **[Btrfs](/docs/storage/btrfs)**：860 行的 Btrfs 单篇长文已拆分为四个专题页面：[概述](/docs/storage/btrfs)（简介、特性、快速开始）、[RAID](/docs/storage/btrfs/raid)（RAID1、RAID10、设备更换、健康检查脚本）、[快照](/docs/storage/btrfs/snapshots)（子卷、快照、传输）和[维护](/docs/storage/btrfs/maintenance)（定期 scrubbing、balance、快照轮换、可用空间管理）。

## 容器 {#containers}

- **[容器](/docs/containers)**：容器现在是顶级章节（此前嵌套在 Extended Features 下）。各应用的示例指南——FreeRADIUS、HAProxy、Home Assistant、Matrix Synapse、Mosquitto、Postgres、Thingsboard——已归入新的 Examples 子章节，顶级菜单仅保留 Apps、VETH 和 Examples。

## 硬件 {#hardware}

- **[S.M.A.R.T.](/docs/hardware/disks/smart)**：S.M.A.R.T. 磁盘健康监控文档已从 Storage 移至 Hardware/Disks，与其他磁盘相关内容放在一起。
