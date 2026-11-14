---
sidebar_key: "cli-reference/ip/firewall/address-list"
sidebar_position: 1
title: "address-list"
sidebar_label: "address-list"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/firewall/address-list
captured_at: '2026-11-01T21:28:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/firewall/address-list {#ipfirewalladdress-list}
**类型：** 目录

防火墙地址列表允许用户创建按共同名称分组的 IP 地址列表。随后，防火墙的 filter、mangle 和 NAT 功能可以使用这些地址列表来匹配数据包。

地址列表记录还可以通过 NAT、Mangle 和 Filter 功能中的 `action=add-src-to-address-list` 或 `action=add-dst-to-address-list` 项动态更新。

带有 `add-src-to-address-list` 或 `add-dst-to-address-list` 动作的防火墙规则以 passthrough 模式工作，这意味着匹配的数据包将被传递给后续防火墙规则。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="list" typ="enum" mandatory="1">IP 地址将被添加到的地址列表名称。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { address: ipRange
, dns-name: string
 }">要添加到地址列表的单个 IP 地址或 IP 范围，或 DNS 名称。例如，你可以输入 `192.168.0.0-192.168.1.255`，保存时它会自动将输入的条目修改为 192.168.0.0/23。IP-IP 范围仅支持 IPv4 地址。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">地址从地址列表中被移除之前的时间。如果未指定 timeout，则地址将永久存储在地址列表中；否则地址将存储在 RAM 中，并在系统重启后被移除。</ArgTableRow>
<ArgTableRow arg="dynamic" typ="bool">该条目是否为动态创建。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="creation-time" typ="date">创建该条目的时间。</ArgTableRow>
</ArgTable>
