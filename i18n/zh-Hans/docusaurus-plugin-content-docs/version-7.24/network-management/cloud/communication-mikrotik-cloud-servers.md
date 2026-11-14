---
sidebar_key: "network-management/cloud/communication-mikrotik-cloud-servers"
sidebar_position: 2
title: "与 MikroTik 云服务通信"
sidebar_label: "与 MikroTik 云服务通信"
description: "本页详细说明 MikroTik RouterOS 与云服务器及 Mikrotik 服务的连接，列出每种连接类型的子菜单、域名、默认状态以及禁用通信的方法。"
tags:
  - 'cloud'
  - 'backup'
source: https://manual.mikrotik.com/docs/7.24/network-management/cloud/communication-mikrotik-cloud-servers
captured_at: '2026-11-04T11:32:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本表列出了 RouterOS 可能向 MikroTik 服务器发起的所有连接信息，以及如何禁用此类连接的说明。

| 子菜单 | 域名 | 默认启用/活动 | 确保通信被禁用/非活动 |
| :-- | :-- | :-- | :-- |
| **system clock time-zone-autodetect** | cloud2.mikrotik.com | yes | `/system/clock/set` time-zone-autodetect=no（[参见时钟文档](../../system-information-and-utilities/clock.md)） |
| **system backup cloud** | cloud2.mikrotik.com | no | 通信仅由 upload-file、download-file、remove-file 命令触发。（[参见备份](./index.md#cloud-backup)） |
| **ip cloud update-time** | cloud2.mikrotik.com | yes | `/ip/cloud/set` update-time=no（[参见更新时间](./index.md#update-time)） |
| **ip cloud ddns-enabled** | cloud2.mikrotik.com | no | `/ip/cloud/set` ddns-enabled=auto（[参见 DDNS](./index.md#ddns)） |
| **ip cloud back-to-home-vpn** | cloud2.mikrotik.com | no | `/ip/cloud/set` back-to-home-vpn=revoked-and-disabled（[参见 BTH VPN](./back-to-home.md#ip-cloud)） |
| **ip cloud back-to-home-file** | cloud2.mikrotik.com | no | 通信仅由在 "ip cloud back-to-home-file" 中启用或禁用文件共享触发。（[参见文件共享](./file-share.md)） |
| **system license** | licence.mikrotik.com | 是（仅对 [CHRs](../../getting-started/routeros-licensing/chr/index.md) 相关） | 对于 CHRs 而言，无法使用 RouterOS 中的特定命令或设置来禁用与许可证服务器的通信。（[参见 CHR 许可证](../../getting-started/routeros-licensing/chr/chr-licensing.md)） |
| **interface lte firmware-upgrade** | upgrade.mikrotik.com | no | 通信仅由 firmware-upgrade 命令触发。（[参见 LTE 固件升级](../../mobile-networking/lte-5g.md#modem-firmware-upgrade-command)） |
| **interface detect-internet** | cloud.mikrotik.com | no | `/interface/detect-internet/set` detect-interface-list=none（[参见检测 Internet](../../diagnostics-monitoring-and-troubleshooting/detect-internet.md)） |
| **system package update** | upgrade.mikrotik.com | no | 通信仅由 check-for-updates 命令以及从升级服务器下载软件包来发起。（[参见软件包更新](../../getting-started/installation-and-upgrade/packages.md)） |
| **system swos upgrade** | upgrade.mikrotik.com | no | 通信仅由 upgrade 命令触发。（[参见 SWOS 升级](../../bridging-and-switching/marvell-prestera-switch-chip-features.md#configuring-swos-using-routeros)） |
