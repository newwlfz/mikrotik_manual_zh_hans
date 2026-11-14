---
title: "文档更新 - 2026年6月17日"
date: 2026-06-17
slug: /changelog-2026-06-17
source: https://manual.mikrotik.com/changelog/changelog-2026-06-17
captured_at: '2026-11-04T06:08:00+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 17 日文档变更摘要。

## 认证与 AAA {#authentication--aaa}

- **[Certificates](/docs/authentication-authorization-accounting/certificates#crl)**：新增专门的 CRL（证书吊销列表）章节，说明 RouterOS 如何根据证书的 CRL 验证证书。说明如何启用 crl-use=yes 和 crl-download=yes，以及如何通过 URL 手动添加 CRL，或从证书的 CRL 分发点动态添加 CRL。包含 /certificate/crl 菜单的属性表（akid、cert、dynamic、expired、fingerprint、last-update、next-update、num、removed、signature、url）。

## 管理工具 {#management-tools}

- **[WebFig](/docs/management-tools/webfig)**：重写并更新了 WebFig 页面，措辞更清晰，并更换了新截图。HTTPS 设置步骤经过修订，改为使用终端实体证书和 www-ssl 服务；Terminal 章节已整理；**Design Skin** 章节已重构，对每项操作（隐藏菜单/子菜单/标签页、重命名、备注、只读、标志）进行了更清晰的描述，并增加了 numeric-interval（1..10）和 prefix（station$）字段限制的示例。
