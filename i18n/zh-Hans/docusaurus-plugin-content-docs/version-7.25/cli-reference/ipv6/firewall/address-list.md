---
sidebar_key: "cli-reference/ipv6/firewall/address-list"
sidebar_position: 1
title: "address-list"
sidebar_label: 'address-list'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/firewall/address-list
captured_at: '2026-11-01T21:24:38+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/firewall/address-list {#ipv6firewalladdress-list}
**类型：** 目录

IPv6 防火墙地址列表是一组命名的 IPv6 地址和前缀，IPv6 filter、NAT、mangle 和 raw 规则通过 `src-address-list` 和 `dst-address-list` 与之匹配。条目在此处添加，也可由 `add-src-to-address-list` 和 `add-dst-to-address-list` 规则动作添加，以及从列表中的 DNS 名称添加。这些动作会把数据包传递给下一条规则。IPv6 列表与 [`/ip/firewall/address-list`](../../ip/firewall/address-list.md) 中的 IPv4 列表相互独立，即使两个列表同名也是如此。参见 [地址列表](../../../firewall-and-quality-of-service/firewall/address-lists.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用：条目保留在列表中，但不匹配。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态：该条目具有超时，或者是以 `dynamic=yes` 添加、由带有时间或 `none-dynamic` 的防火墙规则添加、来自已解析的 DNS 名称或由其他功能（DNS、DHCP server）添加。动态条目不会保存到配置或导出中，重启会将其清除。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">地址列表的名称。使用新名称会创建该列表。规则通过 `src-address-list` 和 `dst-address-list` 匹配该列表。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { address: ip6Prefix
, dns-name: string
 }">IPv6 地址、前缀或 DNS 名称。带有主机位的前缀会以其网络地址存储，不带前缀长度的地址会以 /128 存储。不接受范围（`is not a valid dns name`）。对于 DNS 名称，路由器会为应答中的每条 AAAA 记录添加一个动态条目，并以该名称作为注释，并在记录过期时重新解析该名称。如果地址已在列表中，则会以 `already have such entry` 拒绝。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">路由器在此时间之后删除该条目。带超时的条目是动态的（`D`）：它不会保存在配置或导出中，重启后会被清除。最大值为 `35w3d13h13m56s`。没有超时时，条目会一直保留，直到你将其删除。</ArgTableRow>
<ArgTableRow arg="dynamic" typ="bool">设为 `yes` 时，条目是动态的（`D`）且没有超时：它不会保存在配置中，重启后会被清除。默认值：no。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="creation-time" typ="date">条目创建的时间。静态条目在重启后保留此时间；导入的条目会获得导入时间。</ArgTableRow>
</ArgTable>
