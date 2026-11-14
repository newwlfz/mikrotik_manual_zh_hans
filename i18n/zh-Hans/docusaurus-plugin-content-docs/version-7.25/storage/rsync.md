---
sidebar_key: "storage/rsync"
sidebar_position: 9
title: "Rsync"
sidebar_label: "Rsync"
description: "RouterOS 中的 Rsync 允许系统之间进行高效的文件同步，可配置本地/远程路径以及上传/下载模式。设置密码后会创建动态 IPsec 条目，确保通过 TCP/873 和 UDP/500 进行安全传输。"
tags:
  - 'rsync'
  - 'ipsec'
  - 'file-sync'
source: https://manual.mikrotik.com/docs/7.25/storage/rsync
captured_at: '2026-11-04T11:21:40+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](./index.md) 软件包。
:::

`rsync`（Remote Sync）是一个功能强大的文件同步和文件传输程序。它可以在不同系统之间或同一系统内高效地传输和同步文件与目录。

如果修改了文件，只会传输更改的部分，从而减少数据传输量。RouterOS 的 rsync 实现在设置了密码时使用 IPsec 进行数据传输。配置完成后，你会看到动态 IPsec 条目（见下文）。

Rsync 同步条目可以在 `/file/sync` 菜单中找到，接收端路由器必须运行 rsync 守护进程，并在 `/file/rsync-daemon` 下启用。

:::warning

TCP/873 端口用于 rsync 控制连接（如果未开放，`/file/sync/print` 会卡在 `making control connection to <ip>`）。

UDP/500 端口和协议 50（ipsec-esp）用于建立安全连接并开始传输（如果未开放，`/file/sync/print` 会卡在 `initializing transfer`）。
:::

## 配置示例 {#configuration-example}

基本配置很简单：在主机设备上添加要同步到另一台设备的文件，指定远程设备的 IP 以及同步模式。远程设备必须启用 rsync 守护进程：

```ros
# 远程设备（接收传输）：
/file/rsync-daemon/set enabled=yes
```

```ros
# 主机设备（发起同步）：
/file/sync/add local-path=/ipv6route.txt.rsc mode=upload remote-address=192.168.88.2 remote-path=RAID/
```

如果配置正确，主机设备上的条目会显示 `in sync`：

```ros
0 192.168.88.2  upload  /ipv6route.txt.rsc  RAID/        in sync
```

在远程设备上：

```ros
#   REMOTE-ADDRESS   MODE      LOCAL-PATH  REMOTE-PATH         STATUS 
0 D 192.168.88.1 download  RAID/       /ipv6route.txt.rsc  in sync
```

### IPsec 动态条目 {#ipsec-dynamic-entries}

当 rsync 配置了密码时，它会创建动态 IPsec 条目以进行安全传输：

```ros
#     PEER                     TUNNEL  SRC-ADDRESS       DST-ADDRESS       PROTOCOL  ACTION   LEVEL    PH2-COUNT
;;; file-sync-10.155.145.11
1  D  file-sync-10.155.145.11  no      10.155.145.17/32  10.155.145.11/32  tcp       encrypt  require          1

/ip/ipsec/peer print
 0  D  name="file-sync-10.155.145.11" address=10.155.145.11/32 local-address=10.155.145.17 profile=default exchange-mode=main send-initial-contact=yes
/ip/ipsec/identity print
 0 D  ;;; file-sync-10.155.145.11
      peer=file-sync-10.155.145.11 auth-method=pre-shared-key secret="secret" generate-policy=no
```
