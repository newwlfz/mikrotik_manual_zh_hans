---
sidebar_key: "firewall-and-quality-of-service/firewall/address-lists"
sidebar_position: 1
title: "地址列表"
sidebar_label: "地址列表"
description: "本页面介绍如何在 MikroTik RouterOS 中为防火墙规则创建和管理地址列表，包括添加静态条目以及基于连接尝试生成的动态条目，并通过超时来控制流量阻断的持续时间。"
tags:
  - 'address-lists'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/firewall/address-lists
captured_at: '2026-11-04T11:28:07+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

以下示例创建一个动态地址列表，其中包含正在连接路由器 23 端口（telnet）的主机，并在 5 分钟内丢弃来自它们的全部后续流量。此外，该地址列表还将包含一条 192.0.34.166/32（[www.example.com](http://www.example.com)）的静态地址列表条目：

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

从最后一条 print 命令的输出可以看出，地址列表中出现了两个新的动态条目（状态标记为 'D'）。具有这些 IP 地址的主机尝试与路由器建立 telnet 会话，随后被过滤规则丢弃。
