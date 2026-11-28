---
title: "与 MikroTik 云服务的通信"
description: "本页详细介绍 MikroTik RouterOS 与云服务器和 Mikrotik 服务的连接，列出每种连接类型的子菜单、域名、默认状态以及禁用通信的方法。"
tags:
  - 'cloud'
  - 'backup'
source: https://manual.mikrotik.com/docs/7.24/network-management/cloud/communication-mikrotik-cloud-servers
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

此表列出了从 RouterOS 到 MikroTik 服务器可能发生的所有连接的信息，以及禁用此类连接的说明。

| 子菜单 | 域名 | 默认启用/活动 | 确保通信已禁用/不活动 |
| :-- | :-- | :-- | :-- |
| **system clock time-zone-autodetect** | cloud2.mikrotik.com | 是 | `/system/clock/set` time-zone-autodetect=no（[请参阅 Clock 文档](/docs/system-information-and-utilities/clock)） |
| **system backup cloud** | cloud2.mikrotik.com | 否 | 通信仅由 upload-file、download-file、remove-file 命令触发。（[请参阅 Backup](/docs/network-management/cloud/communication-mikrotik-cloud-servers#cloud-backup)） |
| **ip cloud update-time** | cloud2.mikrotik.com | 是 | `/ip/cloud/set` update-time=no（[请参阅 Update Time](/docs/network-management/cloud/communication-mikrotik-cloud-servers#update-time)） |
| **ip cloud ddns-enabled** | cloud2.mikrotik.com | 否 | `/ip/cloud/set` ddns-enabled=auto（[请参阅 DDNS](/docs/network-management/cloud/communication-mikrotik-cloud-servers#ddns)） |
| **ip cloud back-to-home-vpn** | cloud2.mikrotik.com | 否 | `/ip/cloud/set` back-to-home-vpn=revoked-and-disabled（[请参阅 BTH VPN](/docs/network-management/cloud/back-to-home#ip-cloud)） |
| **ip cloud back-to-home-file** | cloud2.mikrotik.com | 否 | 通信仅通过在“ip cloud back-to-home-file”中启用或禁用文件共享触发。（[请参阅 File Share](/docs/network-management/cloud/file-share)） |
| **system license** | licence.mikrotik.com | 是（仅与 [CHR](/docs/getting-started/routeros-licensing/chr) 相关） | 对于 CHR，无法通过 RouterOS 中的特定命令或设置禁用与许可证服务器的通信。（[请参阅 CHR License](/docs/getting-started/routeros-licensing/chr/chr-licensing)） |
| **interface lte firmware-upgrade** | upgrade.mikrotik.com | 否 | 通信仅由 firmware-upgrade 命令触发。（[请参阅 LTE Firmware Upgrade](/docs/mobile-networking/lte-5g#modem-firmware-upgrade-command)） |
| **interface detect-internet** | cloud.mikrotik.com | 否 | `/interface/detect-internet/set` detect-interface-list=none（[请参阅 Detect Internet](/docs/diagnostics-monitoring-and-troubleshooting/detect-internet)） |
| **system package update** | upgrade.mikrotik.com | 否 | 通信仅由 check-for-updates 命令以及从升级服务器下载软件包触发。（[请参阅 Package Updates](/docs/getting-started/installation-and-upgrade/packages)） |
| **system swos upgrade** | upgrade.mikrotik.com | 否 | 通信仅由 upgrade 命令触发。（[请参阅 SWOS Upgrade](/docs/bridging-and-switching/marvell-prestera-switch-chip-features#configuring-swos-using-routeros)） |
