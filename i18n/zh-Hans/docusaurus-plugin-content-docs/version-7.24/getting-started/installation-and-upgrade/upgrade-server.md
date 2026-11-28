---
title: "升级服务器"
description: "了解 RouterOS 如何连接到 MikroTik 升级服务器以检查和下载新版本，以及如何排查连接问题。"
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/upgrade-server
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "getting-started/installation-and-upgrade/netinstall"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

检查更新时，RouterOS 会联系 `upgrade.mikrotik.com`，以确定适用于设备 and 许可证级别的最新可用版本。如果无法访问服务器或 DNS 名称无法解析，升级检查将失败或返回过期信息。

## 升级检查的工作方式 {#how-the-upgrade-check-works}

RouterOS 软件包更新机制会执行以下步骤：

1. 设备向 `upgrade.mikrotik.com` 发送请求，其中包含当前 RouterOS 版本、架构和许可证级别。
2. 服务器会将此信息与你选择的发布链（Long term、Stable、Testing 或 Development）进行匹配，并返回最新的兼容版本。
3. 如果有更新版本可用，设备会直接从同一服务器下载相应的 `.npk` 软件包。

## 故障排除 {#troubleshooting}

如果设备未检测到可用升级，请验证它是否能够解析并访问升级服务器。

### 检查 DNS 解析 {#check-dns-resolution}

运行以下命令，验证设备是否能够解析服务器地址：

```ros
:put [:resolve upgrade.mikrotik.com]
```

结果应为 `159.148.147.251`。如果地址无法解析或解析为其他 IP，请检查 DNS 设置。详情请参阅 [DNS](/docs/network-management/dns) 文章。

### 检查服务器可达性 {#check-server-reachability}

确认 DNS 解析正常后，验证设备是否能够访问服务器：

```ros
/tool/ping address=159.148.147.251
```

如果 ping 失败，请检查防火墙规则、路由或上游连接。设备必须能够通过端口 443（HTTPS）访问服务器，才能下载软件包。
