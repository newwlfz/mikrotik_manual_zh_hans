---
title: "address-list"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/firewall/address-list
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/ip/firewall/calea"
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/firewall/address-list 
**类型：** 目录

防火墙地址列表允许用户创建按通用名称分组的 IP 地址列表。随后，防火墙 filter、mangle 和 NAT 功能可以使用这些地址列表来匹配数据包。

地址列表记录也可以通过 NAT、Mangle 和 Filter 功能中的 `action=add-src-to-address-list` 或 `action=add-dst-to-address-list` 项动态更新。

使用 `add-src-to-address-list` 或 `add-dst-to-address-list` 动作的防火墙规则以 passthrough 模式工作，这意味着匹配的数据包将传递给下一条防火墙规则。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="list" typ="enum" mandatory="1">Name of the address list where the IP address will be added.</ArgTableRow>
<ArgTableRow arg="address" typ="alt { address: ipRange
, dns-name: string
 }">A single IP address or range of IPs to add to the address list, or a DNS name. You can input, for example, `192.168.0.0-192.168.1.255` and it will auto-modify the typed entry to 192.168.0.0/23 on saving. IP-IP ranges are supported only for IPv4 addresses.</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">Time after which the address will be removed from the address list. If the timeout is not specified, the address will be stored in the address list permanently otherwise the address will be stored in RAM and will be removed after a system's reboot.</ArgTableRow>
<ArgTableRow arg="dynamic" typ="bool">Whether the entry is dynamically created.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="creation-time" typ="date">The time when the entry was created.</ArgTableRow>
</ArgTable>
