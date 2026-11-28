---
title: "与 MikroTik 云服务的通信"
description: "RouterOS 与 MikroTik 服务器建立的每个连接：启动该连接的菜单、服务器、是否默认运行，以及如何关闭它。"
tags:
  - 'cloud'
  - 'backup'
source: https://manual.mikrotik.com/docs/7.25/network-management/cloud/communication-mikrotik-cloud-servers
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 仅针对下表中的服务连接 MikroTik 服务器。默认情况下，路由器启动时向云服务器请求时间和时区，Cloud Hosted Router（CHR）会检查其许可证。其他功能仅在启用或运行命令后才会运行。

| 菜单 | 服务器 | 默认启用 | 如何关闭 |
| :-- | :-- | :-- | :-- |
| `/system/clock` `time-zone-autodetect` | `cloud2.mikrotik.com` | 是 | `/system/clock/set time-zone-autodetect=no`（请参阅 [Clock](/docs/system-information-and-utilities/clock)） |
| `/ip/cloud` `update-time` | `cloud2.mikrotik.com` | 是 | `/ip/cloud/set update-time=no`（请参阅 [Time update](/docs/network-management/cloud#time-update)） |
| `/ip/cloud` `ddns-enabled` | `cloud2.mikrotik.com` | 否 | `/ip/cloud/set ddns-enabled=auto`，并关闭 Back To Home（远程回家）（请参阅 [DDNS](/docs/network-management/cloud#ddns)） |
| `/ip/cloud` `back-to-home-vpn` | `cloud2.mikrotik.com` 和 relay 服务器 | 否 | `/ip/cloud/set back-to-home-vpn=revoked-and-disabled`（请参阅 [Back To Home](/docs/network-management/cloud/back-to-home)） |
| `/ip/cloud/back-to-home-file` | `cloud2.mikrotik.com` 和 relay 服务器 | 否 | 删除所有文件共享（请参阅 [File Share](/docs/network-management/cloud/file-share)） |
| `/system/backup/cloud` | `cloud2.mikrotik.com` | 否 | 仅针对 `print`、`upload-file`、`download-file` 和 `remove-file` 命令运行（请参阅 [Cloud backup](/docs/network-management/cloud/cloud-backup)） |
| `/system/license` | `licence.mikrotik.com` | 仅在 CHR 上启用 | 无法在 CHR 上关闭（请参阅 [CHR licensing](/docs/getting-started/routeros-licensing/chr/chr-licensing)） |
| `/interface/lte` `firmware-upgrade` | `upgrade.mikrotik.com` | 否 | 仅针对 `firmware-upgrade` 命令运行（请参阅 [LTE firmware upgrade](/docs/mobile-networking/lte-5g#modem-firmware-upgrade-command)） |
| `/interface/detect-internet` | `cloud.mikrotik.com` | 否 | `/interface/detect-internet/set detect-interface-list=none`（请参阅 [Detect Internet](/docs/diagnostics-monitoring-and-troubleshooting/detect-internet)） |
| `/system/package/update` | `upgrade.mikrotik.com` | 否 | 仅针对 `check-for-updates` 命令和软件包下载运行（请参阅 [Packages](/docs/getting-started/installation-and-upgrade/packages)） |
| `/system/swos` `upgrade` | `upgrade.mikrotik.com` | 否 | 仅针对 `upgrade` 命令运行（请参阅 [SwOS upgrade](/docs/bridging-and-switching/marvell-prestera-switch-chip-features#configuring-swos-using-routeros)） |

## 技术细节 {#technical-details}

路由器使用以下端口：

- `cloud2.mikrotik.com`：用于 DDNS 的 UDP 端口 15252 和用于 cloud backup 的 TCP 端口 15252。该名称解析为多个地址，当服务器无响应时，路由器会尝试另一个地址。
- `cloud.mikrotik.com`：用于 Detect Internet 的 UDP 端口 30000。
