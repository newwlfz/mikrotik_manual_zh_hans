---
title: "文档更新 - 2026 年 6 月 8 日"
date: 2026-06-08
slug: /changelog-2026-06-08
source: https://manual.mikrotik.com/changelog/changelog-2026-06-08
captured_at: '2026-11-04T06:07:54+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## CLI 参考 {#cli-reference}

- **[IPv6 Address](/docs/cli-reference/ipv6/address)**：改进了 from-pool-policy 选项说明，格式更清晰，示例更好。重写了 auto-link-local 说明，更清楚地解释手动添加链路本地地址会覆盖自动生成的地址。
- **[IPv6 Mangle](/docs/cli-reference/ipv6/firewall/mangle)**：将 action 参数冗长的行内说明重新整理为针对每个 action 值的正确项目符号列表。改进了 dnpt 和 snpt 说明，分别明确为“目标 IPv6 网络前缀转换”和“源 IPv6 网络前缀转换”。
- **[IPv6 Neighbor Discovery](/docs/cli-reference/ipv6/nd)**：修正了 ra-lifetime 的 RFC 章节引用（6.2.3 → 6.2.1）。扩充了 advertise-dns 参数选项，为全部三个值（no、yes、self）提供了适当说明。改进了 ra-preference 说明，使其使用正确的参数名。
- **[IPv6 ND Prefix](/docs/cli-reference/ipv6/nd/prefix)**：在 dhcp6-pd-preferred 参数说明中添加了正确的 RFC 9762 链接。
- **[IPv6 ND Settings](/docs/cli-reference/ipv6/nd/settings)**：改进了菜单说明，并重写了 router-advertisement-ignored-options 说明以提高清晰度。
- **[IPv6 Neighbor](/docs/cli-reference/ipv6/neighbor)**：澄清了 stale 邻居状态说明（“将继续发送流量”而不是“发送流量”）。
- **[IPv6 Pool](/docs/cli-reference/ipv6/pool)**：更新了说明，以澄清该菜单处理的是 IPv6 前缀（而不是 IP 地址）。
- **[IPv6 Settings](/docs/cli-reference/ipv6/settings)**：修复了损坏的 Fast Path 链接，使其指向 Packet Flow 文档。简化了重启说明，删除了冗余措辞。
- **[IPv4 Firewall Filter](/docs/cli-reference/ip/firewall/filter)**：修复了 ICMP reject-with 参数——它之前引用 ICMPv6 错误类型（ICMP 类型 1），现在正确显示 IPv4 ICMP 类型 3 值及相应错误说明。添加了 tcp-reset 说明（发送设置了 RST 标志的 TCP 段）。扩充了 connection-nat-state，以记录用于端点无关 NAT 的 ein-snat 和 ein-dnat 值。
- **[IPv4 Firewall Mangle](/docs/cli-reference/ip/firewall/mangle)**：修复了 fasttrack-connection 说明（“显示 fasttrack 计数器” → “将连接标记为 FastTrack”）。修正了 new-priority 中“ets” → “Sets”的拼写错误。修复了 mark-routing 说明末尾的双句号。在所有防火墙表中，将 rst TCP 标志说明从“断开连接”一致更新为“重置连接”。
- **[IPv6 Firewall Filter](/docs/cli-reference/ipv6/firewall/filter)**：扩充了 reject-with 参数，详细说明每种 ICMPv6 错误类型及其对应的 ICMP 类型/代码值，并添加了指向 IANA ICMPv6 参数注册表的链接。
- **[Disk](/docs/cli-reference/disk)**：修复了自加密标志说明——从显示的标志名中删除了冗余的“tcg-opal-”前缀。
- **[IP Settings](/docs/cli-reference/ip/settings)**：为 accept-source-route 添加了安全警告，指出接受源路由数据包存在欺骗风险。将 rp-filter 选项重新整理为正确的项目符号列表，并澄清严格模式会导致非对称/VPN 路由问题。修复了损坏的 Fast Path 链接。

## 入门 {#getting-started}

- **[MikroTik Hardware Licensing](/docs/getting-started/routeros-licensing/mikrotik-hardware)**：新增了“自定义无线信道”一节，介绍适用于 Atheros 92xx 设备的 Advanced Channels 功能，涵盖扩展扫描列表、支持以 kHz 为粒度的精确频率自定义，以及非标准信道宽度。

## 桥接与交换 {#bridging--switching}

- **[SwOS](/docs/bridging-and-switching)**：为 CSS106、CSS610 和 GPEN21 交换机型号新增了 81 张 SwOS 截图，涵盖 VLAN 配置、统计信息、系统设置、ACL、链路状态、IGMP 等。
