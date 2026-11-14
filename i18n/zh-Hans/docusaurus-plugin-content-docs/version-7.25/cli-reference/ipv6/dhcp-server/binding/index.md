---
sidebar_key: "cli-reference/ipv6/dhcp-server/binding/index"
sidebar_position: 1
title: "binding"
sidebar_label: 'binding'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-server/binding
captured_at: '2026-11-01T21:24:36+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-server/binding {#ipv6dhcp-serverbinding}
**类型：** 目录

DHCPv6 服务器的绑定：分配给客户端的前缀和地址。动态绑定由服务器的池创建；静态绑定为客户端（通过其 DUID 和 IAID 标识）提供固定的前缀或地址。详情请参阅 [DHCPv6 服务器](../../../../network-management/dhcp/dhcpv6-server.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid">该绑定无效。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">该绑定已禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="radius">该绑定由 RADIUS 服务器分配。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该绑定是动态的。使用 `make-static` 将其转换为静态绑定。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { prefix: ip6Prefix
 }">分配给客户端的前缀或地址。</ArgTableRow>
<ArgTableRow arg="duid" typ="string" mandatory="1">客户端的 DUID，以十六进制表示，例如 `0x00030001dc2c6ee7106a`。它与 `iaid` 一起标识该绑定所响应的客户端请求。</ArgTableRow>
<ArgTableRow arg="iaid" typ="num" mandatory="1">客户端请求的身份关联标识符 (IAID)。它与 `duid` 一起标识该绑定。</ArgTableRow>
<ArgTableRow arg="ia-type" typ="enum (na | pd)">
绑定类型：
- `na` - 地址绑定 (IA_NA)。
- `pd` - 前缀委派绑定 (IA_PD)。
</ArgTableRow>
<ArgTableRow arg="server" typ="enum (all)">可提供此绑定的 DHCPv6 服务器名称，或使用 `all` 表示所有服务器。</ArgTableRow>
<ArgTableRow arg="life-time" typ="time">静态绑定的生存时间。动态绑定使用服务器的 `lease-time`。默认值：1w。</ArgTableRow>
<ArgTableRow arg="prefix-pool" typ="enum">绑定的前缀或地址来自的 IPv6 池。对于地址，池前缀长度为 128。</ArgTableRow>
<ArgTableRow arg="dhcp-option" typ="multi { array-id, option: alt { option: enum
, option-set: enum
 }
 }">要发送给此客户端的选项（`/ipv6/dhcp-server/option`）。</ArgTableRow>
<ArgTableRow arg="rate-limit" typ="string">客户端的带宽限制，格式与 DHCP 服务器租约的 `rate-limit` 相同。服务器会为绑定的前缀或地址创建动态简单队列。</ArgTableRow>
<ArgTableRow arg="allow-dual-stack-queue" typ="bool">此绑定与同一客户端的 DHCP 租约是否共享一个动态简单队列。默认值：yes。</ArgTableRow>
<ArgTableRow arg="address-lists" typ="multi { array-id, address-list: string
 }">要将绑定的前缀或地址加入的 IPv6 防火墙地址列表。覆盖服务器的 `address-lists` 设置。</ArgTableRow>
<ArgTableRow arg="insert-queue-before" typ="enum (first | bottom) { first:0, bottom:0xffffffff }">为此绑定创建的动态简单队列的放置位置：`first`（默认）、`bottom`，或指定名称的队列之前。</ArgTableRow>
<ArgTableRow arg="parent-queue" typ="enum (none) { none:0 }">为此绑定创建的动态简单队列的父级。默认值：none。</ArgTableRow>
<ArgTableRow arg="queue-type" typ="enum">为此绑定创建的动态简单队列的队列类型。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="active-server" typ="enum (none)">服务该绑定的 DHCPv6 服务器。</ArgTableRow>
<ArgTableRow arg="status" typ="enum (waiting | offered | bound)">
绑定状态：
- `waiting` - 未使用的静态绑定，或之前使用过的动态绑定。服务器会保留动态绑定 10 分钟，以便旧客户端可以重新获得它；之后该前缀可以分配给其他客户端。
- `offered` - 服务器已用 Advertise 响应 Solicit，但尚未收到 Request。客户端有 2 分钟时间来请求该绑定。
- `bound` - 客户端正在使用该绑定。
</ArgTableRow>
<ArgTableRow arg="expires-after" typ="time">距离绑定过期的时间。</ArgTableRow>
<ArgTableRow arg="last-seen" typ="alt { symbolic-names: enum (never | sometime) { never:0xffffffff, sometime:0xfffffffe }
, time: time
 }">自服务器上次收到客户端消息以来经过的时间，或 `never`。</ArgTableRow>
<ArgTableRow arg="client-address" typ="ip6Addr">客户端发送消息所用的 IPv6 地址，通常是其链路本地地址。到该绑定的路由将其用作网关。</ArgTableRow>
<ArgTableRow arg="reconfigure-key" typ="string">服务器提供给客户端用于验证 Reconfigure 消息的密钥（`use-reconfigure`）。</ArgTableRow>
<ArgTableRow arg="reconfigure-last-sent" typ="string">发送给客户端的最后一条 Reconfigure 消息的重放检测计数器。每发送一条 Reconfigure 消息，它都会增加。</ArgTableRow>
<ArgTableRow arg="reconfigure-status" typ="string"></ArgTableRow>
<ArgTableRow arg="fqdn" typ="string">客户端发送的 FQDN（选项 39）。</ArgTableRow>
</ArgTable>
