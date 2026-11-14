---
sidebar_key: "cli-reference/ipv6/firewall/address-list"
sidebar_position: 1
title: "address-list"
sidebar_label: "address-list"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/firewall/address-list
captured_at: '2026-11-01T21:29:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/firewall/address-list {#ipv6firewalladdress-list}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">要添加 IP 地址的地址列表名称。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { address: ip6Prefix
, dns-name: string
 }">要添加到地址列表的单个 IPv6 地址或前缀，或 DNS 名称。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">在该时间之后，地址将从地址列表中移除。如果未指定 timeout，地址将永久保存在地址列表中。</ArgTableRow>
<ArgTableRow arg="dynamic" typ="bool">条目是否为动态创建。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="creation-time" typ="date">创建该条目的时间。</ArgTableRow>
</ArgTable>
