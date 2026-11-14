---
title: "文档更新 - 2026年8月11日"
date: 2026-08-11
slug: /changelog-2026-08-11
source: https://manual.mikrotik.com/changelog/changelog-2026-08-11
captured_at: '2026-11-04T06:08:26+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年8月11日所做的文档变更摘要。

## VPN {#vpn}

- **[GRE/EoIP](/docs/virtual-private-networks/eoip)**、**[OpenVPN](/docs/virtual-private-networks/openvpn)**、**[L2TP](/docs/virtual-private-networks/l2tp)**、**[ZeroTier](/docs/virtual-private-networks/zerotier)**、**[WireGuard](/docs/virtual-private-networks/wireguard)**、**[IPsec](/docs/virtual-private-networks/ipsec)**、**[SSTP](/docs/virtual-private-networks/sstp)**、**[PPTP](/docs/virtual-private-networks/pptp)**、**[PPPoE](/docs/virtual-private-networks/pppoe)**、**[6to4](/docs/virtual-private-networks/6to4)** 和 **[IPIP](/docs/virtual-private-networks/ipip)**：已将 CLI 参数表移入 CLI Reference，并改写了相关说明文字（同时将 IPsec 页面从 .mdx 转换为 .md）。

## 高可用性解决方案 {#high-availability-solutions}

- **[Bonding](/docs/high-availability-solutions/bonding)**、**[VRRP](/docs/high-availability-solutions/vrrp)** 和 **[MLAG](/docs/high-availability-solutions/multi-chassis-link-aggregation-group)**：已将 CLI 参数移入 CLI Reference。

## 桥接与交换 {#bridging--switching}

- **[服务质量](/docs/bridging-and-switching/quality-of-service)**：已将交换机 QoS 参数移入 CLI Reference。

## 网络管理 {#network-management}

- **[ARP](/docs/cli-reference/ip/arp)**：删除了重复的 ARP 文章，并将其参数说明合并到 CLI Reference 中。
- **[DNS](/docs/network-management/dns)**：澄清了 DNS-over-HTTPS（DoH）服务的兼容性——已将 Control D 加入兼容列表，并改写了“不兼容”列表的措辞，以反映这些服务仅在 ARM64、x86 和 CHR 设备上可用。

## 容器 {#containers}

- **[Container Mosquitto MQTT Server](/docs/containers/user-guides/container-mosquitto-mqtt-server)**：修复了一个失效链接。

## 系统 {#system}

- **[设备模式](/docs/system-information-and-utilities/device-mode)**：修复了一个失效链接。
