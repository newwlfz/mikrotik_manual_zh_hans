---
title: "nd"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/nd
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/nd 
**类型：** 目录

配置 IPv6 邻居发现（ND）协议。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">invalid</ArgTableRow>
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum { all:0 }">
Interface on which to run neighbor discovery.
-all - run ND on all running interfaces.
</ArgTableRow>
<ArgTableRow arg="ra-interval" typ="super { min: time [3 .. 1250]
, [max] -time [4 .. 1800]
 }">Minimum and maximum interval allowed between unsolicited multicast router advertisements from the interface.</ArgTableRow>
<ArgTableRow arg="ra-delay" typ="time">Minimum time between multicast router advertisements from the interface.</ArgTableRow>
<ArgTableRow arg="mtu" typ="alt { special: enum (unspecified) { unspecified:0 }
, value: num
 }">
The MTU option in router advertisements ensures that all nodes on a link use the same MTU value when the link MTU is not well known.
- **unspecified** - do not send the MTU option.
</ArgTableRow>
<ArgTableRow arg="reachable-time" typ="alt { special: enum (unspecified) { unspecified:0 }
, value: time [ .. 3600]
 }">Time that RouterOS assumes a neighbor is reachable after receiving a reachability confirmation. Used by Neighbor Unreachability Detection (see Section 7.3 of [RFC 4861](https://tools.ietf.org/html/rfc4861)).</ArgTableRow>
<ArgTableRow arg="retransmit-interval" typ="alt { special: enum (unspecified) { unspecified:0 }
, value: time
 }">Time between retransmitted Neighbor Solicitation messages. Used by address resolution and Neighbor Unreachability Detection (see Sections 7.2 and 7.3 of [RFC 4861](https://tools.ietf.org/html/rfc4861)).</ArgTableRow>
<ArgTableRow arg="ra-lifetime" typ="alt { special: enum (none) { none:0 }
, value: time [ .. 9000]
 }">Set the RA lifetime. A lifetime of 0 indicates that this router is not a default router. See Section 6.2.1 of [RFC 4861](https://tools.ietf.org/html/rfc4861).</ArgTableRow>
<ArgTableRow arg="ra-preference" typ="enum (low | medium | high)">Specify the router preference communicated to IPv6 hosts in router advertisements. The `ra-preference` value helps hosts select a default router to reach a remote destination.</ArgTableRow>
<ArgTableRow arg="hop-limit" typ="alt { special: enum (unspecified) { unspecified:0 }
, value: num [ .. 255]
 }">Default value placed in the Hop Count field of the IPv6 header for outgoing unicast packets.</ArgTableRow>
<ArgTableRow arg="advertise-mac-address" typ="bool">When set, include the outgoing interface's link-layer address in router advertisements.</ArgTableRow>
<ArgTableRow arg="advertise-dns" typ="enum (no | yes | self)">
Redistribute DNS server information using RADVD.

- `no` - 不通告 DNS 服务器。
- `yes` - 通告路由器上安装的 DNS 服务器。
- `self` - 通告接口链路本地地址作为 DNS 服务提供方。
</ArgTableRow>
<ArgTableRow arg="managed-address-configuration" typ="bool">指示主机是否应使用有状态自动配置（DHCPv6）获取地址。请参阅 [RFC 3315](https://tools.ietf.org/html/rfc3315)。</ArgTableRow>
<ArgTableRow arg="other-configuration" typ="bool">指示主机是否应使用有状态自动配置获取除地址以外的其他信息。请参阅 [RFC 3315](https://tools.ietf.org/html/rfc3315)。</ArgTableRow>
<ArgTableRow arg="dns" typ="multi { address: address (flags=6)
 }">指定一个或多个 IPv6 地址，主机将接收这些地址用于 DNS 服务器配置。</ArgTableRow>
<ArgTableRow arg="pref64" typ="object { pref64: ip6Prefix
 }">指定一个或多个位于 /32、/40、/48、/56、/64 或 /96 子网内的 IPv6 前缀，主机将其作为 NAT64 前缀接收。</ArgTableRow>
</ArgTable>
