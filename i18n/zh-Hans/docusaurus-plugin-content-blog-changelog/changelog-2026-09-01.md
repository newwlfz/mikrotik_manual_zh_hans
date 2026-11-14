---
title: "文档更新 - 2026年9月1日"
date: 2026-09-01
slug: /changelog-2026-09-01
source: https://manual.mikrotik.com/changelog/changelog-2026-09-01
captured_at: '2026-11-04T06:08:40+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 9 月 1 日文档变更摘要。

## 系统 {#system}

- **[Clock](/docs/system-information-and-utilities/clock)**、**[Device Mode](/docs/system-information-and-utilities/device-mode)**、**[E-mail](/docs/system-information-and-utilities/e-mail)**、**[Fetch](/docs/system-information-and-utilities/fetch)**、**[Files](/docs/system-information-and-utilities/files)**、**[Identity](/docs/system-information-and-utilities/identity)**、**[IP Packing](/docs/system-information-and-utilities/ip-packing)** 和 **[Neighbor Discovery](/docs/system-information-and-utilities/neighbor-discovery)**：修复了语法问题，并将 CLI 参数说明移至 CLI Reference。
- **Interface Lists**：删除了旧的 System 页面，并将其内容移至 [CLI Reference](/docs/cli-reference/interface/list)，同时更新了手册中的所有交叉链接。

## 管理工具 {#management-tools}

- **[TR-069](/docs/management-tools/tr-069)**：修复了语法和样式问题，并将 CLI 参数移至 CLI Reference。

## 入门 {#getting-started}

- **[Upgrade](/docs/getting-started/installation-and-upgrade/upgrade)**：记录了安全软件包下载方式以及更新所使用的 IP 版本。
- **[x86 Licensing](/docs/getting-started/routeros-licensing/x86)**：说明 demo 许可证仅限单个接口。

## 容器 {#containers}

- **[Container Apps](/docs/containers/apps)**：扩展了 app YAML 参考，新增了字段（auto-update、icon、url-path、user、entrypoint、healthcheck、secrets、configs、shm_size、stop_grace_period），并澄清了 ports 语法。
