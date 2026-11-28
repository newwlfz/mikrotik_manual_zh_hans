---
title: "address-list"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/firewall/address-list
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/firewall/address-list
**类型：** 目录

IPv6 防火墙地址列表是一组命名的 IPv6 地址和前缀，IPv6 filter、NAT、mangle 和 raw 规则通过 `src-address-list` 和 `dst-address-list` 与其匹配。条目在此处添加，也可通过 `add-src-to-address-list` 和 `add-dst-to-address-list` 规则动作添加，还可从列表中的 DNS 名称添加。这些动作会将数据包传递给下一条规则。IPv6 列表与 [`/ip/firewall/address-list`](/docs/cli-reference/ip/firewall/address-list) 中的 IPv4 列表相互独立，即使列表名称相同也是如此。请参阅 [Address lists](/docs/firewall-and-quality-of-service/firewall/address-lists)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Disabled: the entry stays in the list but does not match.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Dynamic: the entry has a timeout or was added with `dynamic=yes`, by a firewall rule with a time or `none-dynamic`, from a resolved DNS name or by another feature (DNS, DHCP server). Dynamic entries are not saved in the configuration or in exports, and a reboot clears them.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="list" typ="enum" mandatory="1">Name of the address list. A new name creates the list. Rules match the list with `src-address-list` and `dst-address-list`.</ArgTableRow>
<ArgTableRow arg="address" typ="alt { address: ip6Prefix
, dns-name: string
 }">An IPv6 address, a prefix or a DNS name. A prefix with host bits is stored as its network, and an address without a prefix length is stored as a /128. Ranges are not accepted (`is not a valid dns name`). For a DNS name, the router adds one dynamic entry for each AAAA record in the answer, with the name as the comment, and resolves the name again when the record expires. An address that is already in the list is refused with `already have such entry`.</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">Time after which the router removes the entry. An entry with a timeout is dynamic (`D`): it is not saved in the configuration or in exports, and a reboot clears it. The maximum is `35w3d13h13m56s`. Without a timeout, the entry stays until you remove it.</ArgTableRow>
<ArgTableRow arg="dynamic" typ="bool">With `yes`, the entry is dynamic (`D`) and has no timeout: it is not saved in the configuration and a reboot clears it. Default: no.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="creation-time" typ="date">When the entry was created. A static entry keeps this time after a reboot; an imported entry gets the time of the import.</ArgTableRow>
</ArgTable>
