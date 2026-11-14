---
title: "文档更新 - 2026年7月1日"
date: 2026-07-01
slug: /changelog-2026-07-01
source: https://manual.mikrotik.com/changelog/changelog-2026-07-01
captured_at: '2026-11-04T06:08:05+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 1 日所做的文档变更摘要。

## 诊断与监控 {#diagnostics--monitoring}

- **[Netwatch](/docs/diagnostics-monitoring-and-troubleshooting/netwatch)**：probe-type 列表（Simple、ICMP、TCP-conn、HTTP-GET、HTTPS-GET、DNS）现在已加粗以提高可读性，并修正了若干拼写和措辞问题。CLI 参考中的每个 ICMP、TCP-conn 和 HTTP/S-GET 参数现在都直接链接到本页上对应的 probe-type 部分。

## 网络管理 {#network-management}

- **[Socksify](/docs/network-management/socks/socksify)**：添加了指向 CLI 参考的交叉链接，并记录了所有 Socksify 参数的说明和默认值——connection-timeout（60s）、port（952）、socks5-server（0.0.0.0，仅 IPv4）、socks5-port（1080）、socks5-user 和 socks5-password。现在注明 X 标志默认已设置。

## CLI 参考 {#cli-reference}

- **[/app](/docs/cli-reference/app)**：为容器应用标志（X、R、c、s）以及所有参数添加了说明，包括 container-command-lines、auto-update、use-https、network、network-pvid、network-outgoing-access、firewall-redirects、yaml 和 required-mounts。
- **[/beep](/docs/cli-reference/beep) 和 [/blink](/docs/cli-reference/blink)**：添加了命令说明和参数详细信息——beep 的频率（Hz）和长度，blink 的持续时间。注明 beep 仅在带有蜂鸣器的设备上受支持。
