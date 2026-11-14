---
sidebar_key: "cli-reference/ipv6/nd/prefix/index"
sidebar_position: 2
title: "prefix"
sidebar_label: 'prefix'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/nd/prefix
captured_at: '2026-11-01T21:24:42+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/nd/prefix {#ipv6ndprefix}
**类型：** 目录

路由器通告（RA）消息中发送的前缀信息，用于无状态地址自动配置（[RFC 4862](https://tools.ietf.org/html/rfc4862)）。默认情况下，自动配置仅适用于主机，不适用于路由器。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="prefix" typ="alt { none: enum (none) { none:0 }
, prefix: ip6Prefix
 }">用于无状态地址自动配置的前缀。如果选择 "none" 选项，RouterOS 仅通告选项，不包含特定前缀。</ArgTableRow>
<ArgTableRow arg="6to4-interface" typ="iface_enum { none:0xffffffff }">如果设置，RouterOS 会将此前缀与接口的 IPv4 地址组合，以生成有效的 6to4 前缀。RouterOS 会将前 16 位替换为 2002，并将接下来的 32 位替换为接口配置的 IPv4 地址。它会按配置通告剩余的 80 位（包括 SLA ID）。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">运行无状态自动配置的接口。</ArgTableRow>
<ArgTableRow arg="on-link" typ="bool">设置后，表示 RouterOS 可将此前缀视为 on-link。未设置时，RA 消息不会对此前缀的 on-link 或 off-link 状态作出任何声明。即使此前缀中的某些地址保持 off-link，此前缀仍可能用于地址配置。</ArgTableRow>
<ArgTableRow arg="autonomous" typ="bool">设置后，表示 RouterOS 可将此前缀用于自主地址配置。否则，RouterOS 会忽略此前缀信息。</ArgTableRow>
<ArgTableRow arg="dhcp6-pd-preferred" typ="bool">表示客户端应根据 [RFC 9762](https://datatracker.ietf.org/doc/rfc9762/) 使用 DHCPv6 Prefix Delegation。</ArgTableRow>
<ArgTableRow arg="valid-lifetime" typ="alt { special: enum (infinity) { infinity:0xffffffff }
, value: time
, ticking: time
 }">数据包发送后地址保持有效的时间长度。有效生存期必须大于或等于首选生存期。[`Read more >>`](../../../../getting-started/networking-fundamentals/ipv6-neighbor-discovery.md#address-states)</ArgTableRow>
<ArgTableRow arg="preferred-lifetime" typ="alt { special: enum (infinity) { infinity:0xffffffff }
, value: time
, ticking: time
 }">数据包发送后，生成的地址变为弃用状态的时间。弃用地址仅用于现有连接，并在有效生存期到期之前仍可使用。[`Read more >>`](../../../../getting-started/networking-fundamentals/ipv6-neighbor-discovery.md#address-states)</ArgTableRow>
</ArgTable>
