---
title: "文档更新 - 2026年5月26日"
date: 2026-05-26
slug: /changelog-2026-05-26
source: https://manual.mikrotik.com/changelog/changelog-2026-05-26
captured_at: '2026-11-04T06:07:46+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 5 月 26 日文档变更摘要。

## 无线 {#wireless}

- **[WiFi](/docs/wireless/wifi)：Wi-Fi 7 MLO 参数已加入文档** — 新增的 mld-interface 和 mld-name 参数可在 Wi-Fi 7 (802.11be) 硬件上启用多链路操作（Multi-Link Operation）。CAPsMAN 配置新增 multi-link-mode 和 supported-hw-caps。supported-bands 扩展支持 6ghz-ax、6ghz-be、2ghz-be。
- **[IS-IS](/docs/user-guides/routing-and-networking-protocols/unicast/is-is) 文档已更新** — 对 IS-IS 路由协议页面进行了全文更正、补充和语法改进。

## 认证与 AAA {#authentication--aaa}

- **[RADIUS](/docs/authentication-authorization-accounting/radius)：RadSec 行为已澄清** — RADIUS 服务器必须使用 radsec 作为共享密钥；启用 RadSec 后，RouterOS 会同时覆盖共享密钥和端口（改为 TCP 2083），无论手动设置如何。

## 网络管理 {#network-management}

- **[SOCKS](/docs/network-management/socks)：用户认证已写入文档** — /socks/users 菜单现已完整记录（此前为“Work in Progress”）。涵盖启用基于密码的认证（auth-method=password）以及管理凭据。
- **[VRF](/docs/user-guides/routing-and-networking-protocols/vrf) 文档已更新** — VRF 页面经过大幅修订，结构更完善并补充了交叉引用链接。

## IP 服务 {#ip-services}

- **[DNS](/docs/network-management/dhcp)：新增参数已写入文档** — 在 DHCP 和 IPv6 邻居发现页面中新增了 add-dns-entries 和 add-dns-entries-suffix。

## 移动网络 {#mobile-networking}

- **[LTE](/docs/mobile-networking/lte-5g)：两个参数已写入文档** — esim-channel（用于 eSIM 的自动/AT 控制通道）和 link-recovery-timer（LTE 接口未运行时，重新配置前等待的秒数）。已移除未发布功能的占位条目。

## 入门 {#getting-started}

- **[入门](/docs/getting-started) 章节已重组** — 移动了图片、修复了失效链接，并在整个入门章节中添加了交叉引用。

## CLI 参考 {#cli-reference}

- **新增 IPv4/IPv6 地址与邻居参数** — [/ip/address](/docs/cli-reference/ip/address)、[/ipv6/address](/docs/cli-reference/ipv6/address)、[/ipv6/nd](/docs/cli-reference/ipv6/nd) 以及 /ipv6/pool 现在在 CLI 参考中都有完整的参数说明。
- **路由文章：已添加 CLI 交叉引用链接** — 所有路由文档页面现在都链接到相应的 CLI 参考条目。
