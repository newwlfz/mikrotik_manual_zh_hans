---
sidebar_key: "getting-started/installation-and-upgrade/upgrade-server"
sidebar_position: 3
title: "升级服务器"
sidebar_label: "升级服务器"
description: "了解 RouterOS 如何连接到 MikroTik 升级服务器以检查并下载新版本，以及如何排查连接问题。"
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/upgrade-server
captured_at: '2026-11-07T17:11:03.548Z'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

检查更新时，RouterOS 会联系 `upgrade.mikrotik.com`，以确定适用于你的设备和许可证级别的最新可用版本。如果无法访问服务器或 DNS 名称无法解析，则升级检查会失败或返回过时的信息。

## 升级检查的工作方式 {#how-the-upgrade-check-works}

RouterOS 软件包更新机制会执行以下步骤：

1. 设备向 `upgrade.mikrotik.com` 发送请求，其中包含当前 RouterOS 版本、架构和许可证级别。
2. 服务器将此信息与你所选择的发布链（Long term、Stable、Testing 或 Development）进行匹配，并返回最新的兼容版本。
3. 如果有更新的版本可用，设备会直接从同一服务器下载相应的 `.npk` 软件包。

## 故障排除 {#troubleshooting}

如果设备未检测到可用的升级，请确认它能够解析并访问升级服务器。

### 检查 DNS 解析 {#check-dns-resolution}

运行以下命令以确认设备能够解析服务器地址：

```ros
:put [:resolve upgrade.mikrotik.com]
```

结果应为 `159.148.147.251`。如果该地址无法解析或解析为其他 IP，请检查你的 DNS 设置。更多信息请参阅 [DNS](../../network-management/dns.md) 文章。

### 检查服务器可达性 {#check-server-reachability}

确认 DNS 解析正常后，请验证设备能够访问服务器：

```ros
/tool/ping address=159.148.147.251
```

如果 ping 失败，请检查你的防火墙规则、路由或上游连接。设备必须能够通过 443 端口（HTTPS）访问服务器才能下载软件包。
