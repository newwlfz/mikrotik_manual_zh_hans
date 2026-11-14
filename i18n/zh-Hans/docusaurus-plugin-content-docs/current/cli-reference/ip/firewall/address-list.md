---
sidebar_key: "cli-reference/ip/firewall/address-list"
sidebar_position: 1
title: "address-list"
sidebar_label: 'address-list'
source: https://manual.mikrotik.com/docs/cli-reference/ip/firewall/address-list
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/firewall/address-list {#ipfirewalladdress-list}
**类型：** 目录

防火墙地址列表是由 IPv4 地址、前缀和范围组成的命名集合，filter、NAT、mangle 和 raw 规则通过 `src-address-list` 和 `dst-address-list` 与其匹配。条目可在此处添加，也可由 `add-src-to-address-list` 和 `add-dst-to-address-list` 规则动作添加，或从列表中的 DNS 名称添加。这些动作会将数据包传递给下一条规则。IPv6 地址放入 [`/ipv6/firewall/address-list`](../../ipv6/firewall/address-list.md)。参见 [地址列表](../../../firewall-and-quality-of-service/firewall/address-lists.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用：条目保留在列表中，但不匹配。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态：该条目具有超时，或者是以 `dynamic=yes` 添加、由带有时间或 `none-dynamic` 的防火墙规则添加、来自已解析的 DNS 名称或由其他功能（DNS、DHCP server）添加。动态条目不会保存到配置或导出中，重启会将其清除。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">地址列表的名称。新名称会创建列表。规则使用 `src-address-list` 和 `dst-address-list` 匹配该列表。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { address: ipRange
, dns-name: string
 }">一个 IP 地址、一个前缀、一个范围或一个 DNS 名称。带有主机位的前缀会存储为其网络地址（`203.0.113.77/24` 变为 `203.0.113.0/24`）。恰好为一个前缀的范围会存储为该前缀（`198.51.100.0-198.51.100.255` 变为 `198.51.100.0/24`）；其他范围仍保持为范围。不是有效地址的文本会作为 DNS 名称存储，且不会报错，因此诸如 `203.0.113.1-254` 这样的简短范围不会匹配任何内容；请完整写出范围。对于 DNS 名称，路由器会为应答中的每条 A 记录添加一个动态条目，并以该名称作为注释，并在记录过期时再次解析该名称。已在列表中的地址会被拒绝，并提示 `already have such entry`；重叠条目会被接受。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">经过此时间后，路由器会移除该条目。带有超时时间的条目是动态的（`D`）：它不会保存在配置或导出中，重启会清除它。最大值为 `35w3d13h13m56s`。没有超时时间时，条目会一直保留，直到您将其移除。</ArgTableRow>
<ArgTableRow arg="dynamic" typ="bool">使用 `yes` 时，条目是动态的（`D`）且没有超时时间：它不会保存在配置中，重启会清除它。默认值：no。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="creation-time" typ="date">条目创建的时间。静态条目在重启后保留此时间；导入的条目会获得导入时间。</ArgTableRow>
</ArgTable>
