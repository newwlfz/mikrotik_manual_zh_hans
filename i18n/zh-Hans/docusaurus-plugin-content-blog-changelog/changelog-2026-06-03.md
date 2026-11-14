---
title: "文档更新 - 2026年6月3日"
date: 2026-06-03
slug: /changelog-2026-06-03
source: https://manual.mikrotik.com/changelog/changelog-2026-06-03
captured_at: '2026-11-04T06:07:50+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 3 日所做的文档变更摘要。

## 身份验证与 AAA {#authentication--aaa}

- **[证书](/docs/authentication-authorization-accounting/certificates)**：更新了 ACME 示例，使得在省略 directory-url 时，Let's Encrypt 证书生成会使用默认的目录 URL。
- **[证书](/docs/authentication-authorization-accounting/certificates)**：新增了 wiliot 和 logging，作为 trust-store 与 builtin-trust-store 证书设置支持的值。

## 开发者指南 {#developer-guides}

- **[REST API](/docs/developer-guides/rest-api)**：澄清了通过 www 和 www-ssl 服务进行 HTTP 与 HTTPS 访问的方式，并添加了指向 IP Service 和 Certificate 文档的链接。

## 移动网络 {#mobile-networking}

- **[LTE/5G](/docs/mobile-networking/lte-5g)**：新增了离线 FOTA/DFOTA 调制解调器固件升级指南，包括适用于本地文件和 HTTP URL 的固件文件示例、调制解调器兼容性表格以及安全警告。

## 网络管理 {#network-management}

- **[DNS](/docs/network-management/dns)**：新增了关于使用内置证书颁发机构存储以及在 ARM64、x86 和 CHR 设备上进行 HTTP/2 协商的 DNS over HTTPS 说明。
