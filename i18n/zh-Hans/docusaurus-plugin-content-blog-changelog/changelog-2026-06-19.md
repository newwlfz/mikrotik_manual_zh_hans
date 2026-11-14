---
title: "文档更新 - 2026年6月19日"
date: 2026-06-19
slug: /changelog-2026-06-19
source: https://manual.mikrotik.com/changelog/changelog-2026-06-19
captured_at: '2026-11-04T06:08:03+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年6月19日文档变更摘要。

## 管理工具 {#management-tools}

- **[WebFig](/docs/management-tools/webfig#enable-https)**：围绕仅限局域网使用的场景重构了“启用 HTTPS”章节。现在该章节首先介绍自签名证书（当通过路由器的私有局域网 IP 访问路由器时，这是默认方式，因为公共 CA 无法为私有地址签发证书），并说明如何通过信任路由器的根 CA 来消除浏览器警告。Let's Encrypt/ACME 方式现在被明确定位为适用于通过真实公网域名访问的路由器的选项，并注明了私有 IP、名称匹配和分离 DNS 方面的注意事项，以及不开放 WAN 端口的 DNS-01 挑战。

## 身份验证与 AAA {#authentication--aaa}

- **[证书](/docs/authentication-authorization-accounting/certificates#acme-client)**：清理了 Let's Encrypt/ACME、CRL 和 Settings 章节。命令和参数引用（a 标志、crl-use、crl-download、/certificate/settings）现在格式化为内联代码，而不再是损坏的斜体/引号标记；IP Cloud DNS-01 那句话已通过指向 IP Cloud DDNS 页面的链接加以澄清，并且第一个 add-acme 示例使用了具体的域名。

## 入门 {#getting-started}

- **[首次配置](/docs/getting-started/first-time-configuration)**：新增了一个无线设置视频，现以规范的 &lt;video&gt; 播放器嵌入，视频片段来自 static/videos/。
