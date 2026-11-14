---
title: "文档更新 - 2026年7月2日"
date: 2026-07-02
slug: /changelog-2026-07-02
source: https://manual.mikrotik.com/changelog/changelog-2026-07-02
captured_at: '2026-11-04T06:08:07+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 2 日文档变更摘要。

## 认证与 AAA {#authentication--aaa}

- **[Certificates](/docs/authentication-authorization-accounting/certificates)**：新增了“手动 ACME 续期”一节，记录了 /certificate/acme-renew 命令并附带用法示例。同时明确了 PKCS12 导出使用 AES 加密，以及 PKCS12 导入同时支持 AES 和 3DES 解密。

## 系统 {#system}

- **[Wake on LAN](/docs/system-information-and-utilities/wake-on-lan)**：重构了页面 —— 属性表已替换为指向 CLI 参考的链接，措辞更加精炼，并新增了一张 Wake on LAN 工具的 WinBox 截图。interface 和 mac 参数现在在 CLI 参考中说明。

## 诊断与监控 {#diagnostics--monitoring}

- **[Ping](/docs/diagnostics-monitoring-and-troubleshooting/ping)**：新增了指向 CLI 参考的交叉链接，其中每个 ping 参数现在都有说明 —— address、interval、size、ttl、dscp、do-not-fragment、src-address、arp-ping、count、interface 和 vrf，以及所有只读结果字段，例如 packet-loss、min-rtt、avg-rtt 和 max-rtt。
