---
sidebar_key: "network-management/cloud/communication-mikrotik-cloud-servers"
sidebar_position: 3
title: "与 MikroTik 云服务通信"
sidebar_label: "与 MikroTik 云服务通信"
description: "RouterOS 与 MikroTik 服务器建立的每个连接：启动它的菜单、服务器、是否默认运行，以及如何将其关闭。"
tags:
  - 'cloud'
  - 'backup'
source: https://manual.mikrotik.com/docs/network-management/cloud/communication-mikrotik-cloud-servers
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 仅会为下表中列出的服务连接到 MikroTik 服务器。默认情况下，路由器在启动时会向云服务器请求时间和时区，而 Cloud Hosted Router (CHR) 会检查其许可证。其他所有服务只有在您启用它或运行相应命令后才会运行。

| 菜单 | 服务器 | 默认开启 | 如何关闭 |
| :-- | :-- | :-- | :-- |
| `/system/clock` `time-zone-autodetect` | `cloud2.mikrotik.com` | yes | `/system/clock/set time-zone-autodetect=no`（参见[时钟](../../system-information-and-utilities/clock.md)） |
| `/ip/cloud` `update-time` | `cloud2.mikrotik.com` | yes | `/ip/cloud/set update-time=no`（参见[时间更新](./index.md#time-update)） |
| `/ip/cloud` `ddns-enabled` | `cloud2.mikrotik.com` | no | `/ip/cloud/set ddns-enabled=auto`，并关闭 Back To Home（远程回家）（参见 [DDNS](./index.md#ddns)） |
| `/ip/cloud` `back-to-home-vpn` | `cloud2.mikrotik.com` 和中继服务器 | no | `/ip/cloud/set back-to-home-vpn=revoked-and-disabled`（参见 [Back To Home](./back-to-home.md)） |
| `/ip/cloud/back-to-home-file` | `cloud2.mikrotik.com` 和中继服务器 | no | 移除所有文件共享（参见[文件共享](./file-share.md)） |
| `/system/backup/cloud` | `cloud2.mikrotik.com` | no | 仅针对 `print`、`upload-file`、`download-file` 和 `remove-file` 命令运行（参见[云备份](./cloud-backup.md)） |
| `/system/license` | `licence.mikrotik.com` | 仅在 CHR 上 | 在 CHR 上无法关闭（参见 [CHR 许可](../../getting-started/routeros-licensing/chr/chr-licensing.md)） |
| `/interface/lte` `firmware-upgrade` | `upgrade.mikrotik.com` | no | 仅针对 `firmware-upgrade` 命令运行（参见 [LTE 固件升级](../../mobile-networking/lte-5g.md#modem-firmware-upgrade-command)） |
| `/interface/detect-internet` | `cloud.mikrotik.com` | no | `/interface/detect-internet/set detect-interface-list=none`（参见[检测 Internet](../../diagnostics-monitoring-and-troubleshooting/detect-internet.md)） |
| `/system/package/update` | `upgrade.mikrotik.com` | no | 仅针对 `check-for-updates` 命令和软件包下载运行（参见[软件包](../../getting-started/installation-and-upgrade/packages.md)） |
| `/system/swos` `upgrade` | `upgrade.mikrotik.com` | no | 仅针对 `upgrade` 命令运行（参见 [SwOS 升级](../../bridging-and-switching/marvell-prestera-switch-chip-features.md#configuring-swos-using-routeros)） |

## 技术细节 {#technical-details}

路由器会使用以下端口：

- `cloud2.mikrotik.com`：DDNS 使用 UDP 端口 15252，云备份使用 TCP 端口 15252。该名称会解析为多个地址，当某台服务器不响应时，路由器会尝试另一个地址。
- `cloud.mikrotik.com`：检测 Internet 使用 UDP 端口 30000。
