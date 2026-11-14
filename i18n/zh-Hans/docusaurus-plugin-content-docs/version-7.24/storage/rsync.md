---
sidebar_key: "storage/rsync"
sidebar_position: 9
title: "Rsync"
sidebar_label: "Rsync"
description: "RouterOS 中的 Rsync 允许使用 ipsec 加密在系统之间进行高效的文件同步，并支持可配置的本地/远程路径以及上传/下载模式。设置密码时会创建动态 IPsec 条目，确保通过 TCP/8291 和 UDP/500 进行安全传输。"
tags:
  - 'rsync'
  - 'ipsec'
  - 'file-sync'
source: https://manual.mikrotik.com/docs/7.24/storage/rsync
captured_at: '2026-11-04T11:33:15+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

`rsync`（Remote Sync）是 Unix 系统中使用的强大文件同步和文件传输程序。它可以在不同系统之间或同一系统内高效地传输和同步文件及目录。

如果修改了文件，则只传输文件中的更改，从而减少数据传输量。RouterOS 的 RSYNC 实现使用 ipsec 进行数据传输（如果设置了密码）。配置完成后，你将看到动态 ipsec 条目。

Rsync 设置可在 `file/sync` 菜单中找到。

:::warning

TCP/873 端口用于 rsync 控制连接（如果状态中未打开（*file sync print*），你将卡在 making control connection to *192.168.88.2*）

UDP/500 端口和协议 50（ipsec-esp）用于创建安全连接并开始传输（如果状态中未打开（*file sync print*），你将卡在 initializing transfer）

:::

## 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **local-path** | 文件/文件夹路径。用于 *Upload* 模式，设置要上传到设备的文件/文件夹路径 |
| **mode** | 设置是要下载/上传文件（同步方向） |
| **password** | 目标设备密码 |
| **remote-address** | 目标设备 IP |
| **remote-path** | 文件/文件夹路径。与 *download* 模式一起使用，设置目标设备上要下载的路径 |
| **user** | 目标设备用户名 |

## 配置示例 {#configuration-example}

基本配置非常简单。在主机设备上，你需要添加要同步到另一台设备的文件、IP、用户名/密码以及模式。

```ros
/file/sync
add local-path=/ipv6route.txt.rsc mode=upload remote-address=192.168.88.2 remote-path=RAID/

```

如果配置正确，你将在主机设备上看到：

```ros
0 192.168.88.2  upload  /ipv6route.txt.rsc  RAID/        in sync
```

在客户端设备上：

```ros
#   REMOTE-ADDRESS   MODE      LOCAL-PATH  REMOTE-PATH         STATUS 
0 D 192.168.88.1 download  RAID/       /ipv6route.txt.rsc  in sync
```

### IPSec 动态条目 {#ipsec-dynamic-entries}

当 rsync 配置了密码时，它会为安全传输创建动态 IPSec 条目：

```ros
#     PEER                     TUNNEL  SRC-ADDRESS       DST-ADDRESS       PROTOCOL  ACTION   LEVEL    PH2-COUNT
;;; file-sync-10.155.145.11
1  D  file-sync-10.155.145.11  no      10.155.145.17/32  10.155.145.11/32  tcp       encrypt  require          1

/ip/ipsec/peer> print
 0  D  name="file-sync-10.155.145.11" address=10.155.145.11/32 local-address=10.155.145.17 profile=default exchange-mode=main send-initial-contact=yes
/ip/ipsec/identity> print
 0 D  ;;; file-sync-10.155.145.11
      peer=file-sync-10.155.145.11 auth-method=pre-shared-key secret="secret" generate-policy=no
```
