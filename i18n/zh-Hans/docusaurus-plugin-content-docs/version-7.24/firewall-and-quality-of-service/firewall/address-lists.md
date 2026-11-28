---
title: "地址列表"
description: "本页介绍如何在 MikroTik RouterOS 中创建和管理用于防火墙规则的地址列表，包括添加静态条目以及基于连接尝试的动态条目，并通过超时控制流量阻断持续时间。"
tags:
  - 'address-lists'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/firewall/address-lists
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "firewall-and-quality-of-service/firewall"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

以下示例创建一个动态地址列表，其中包含连接到路由器端口 23（telnet）的用户，并在 5 分钟内丢弃来自这些用户的所有后续流量。此外，该地址列表还将包含一个静态地址列表条目 192.0.34.166/32（[www.example.com](http://www.example.com)）：

```ros
/ip/firewall/address-list/add list=drop_traffic address=192.0.34.166/32
```

```ros
/ip/firewall/address-list/print
Flags: X - disabled, D - dynamic
 #   LIST         ADDRESS
 0   drop_traffic 192.0.34.166
```

```ros
/ip/firewall/mangle/add action=add-src-to-address-list address-list=drop_traffic address-list-timeout=5m chain=prerouting dst-port=23 protocol=tcp
/ip/firewall/filter/add action=drop chain=input src-address-list=drop_traffic
```

```ros
/ip/firewall/address-list/print
Flags: X - disabled, D - dynamic
 #   LIST         ADDRESS
 0   drop_traffic 192.0.34.166
 1 D drop_traffic 1.1.1.1
 2 D drop_traffic 10.5.11.8
```

从最后一个 print 命令的输出可以看到，地址列表中出现了两个新的动态条目（标记为状态“D”）。具有这些 IP 地址的主机尝试初始化到路由器的 telnet 会话，随后被过滤规则丢弃。
