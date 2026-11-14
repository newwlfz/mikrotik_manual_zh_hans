---
sidebar_key: "cli-reference/ipv6/dhcp-server"
title: "dhcp-server"
sidebar_label: 'dhcp-server'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/dhcp-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-server {#ipv6dhcp-server}
**类型：** 目录

DHCPv6 服务器向客户端委派 IPv6 前缀（DHCPv6-PD）并分配 IPv6 地址。前缀和地址来自 IPv6 地址池或静态绑定（`/ipv6/dhcp-server/binding`）。有关概述和配置示例，请参阅 [DHCPv6 服务器](../../../network-management/dhcp/dhcpv6-server.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">DHCPv6 服务器是动态创建的。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">DHCPv6 服务器已禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">DHCPv6 服务器配置无效。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">DHCPv6 服务器的名称。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">DHCPv6 服务器监听的接口。</ArgTableRow>
<ArgTableRow arg="prefix-pool" typ="alt { prefix-pool-static: enum (static-only) { static-only:0xffffffff }
, prefix-pool-name: enum
 }">动态前缀绑定从中获取前缀的 IPv6 地址池。使用 `static-only` 时，只下发静态绑定。默认值：static-only。</ArgTableRow>
<ArgTableRow arg="address-pool" typ="alt { address-pool-static: enum (static-only) { static-only:0xffffffff }
, address-pool-name: enum
 }">动态地址绑定从中获取地址的 IPv6 地址池。地址池前缀长度必须为 128。使用 `static-only` 时，只下发静态绑定。默认值：static-only。</ArgTableRow>
<ArgTableRow arg="lease-time" typ="time">新建和续租绑定的生存期。系统会告知客户端在生存期过半后执行 renew，在达到 80% 后执行 rebind，首选生存期为其 90%。默认值：3d。</ArgTableRow>
<ArgTableRow arg="rapid-commit" typ="bool">是否对请求 Rapid Commit 的 Solicit 直接以 Reply 应答（两消息交换）。使用 `no` 时，服务器始终先以 Advertise 应答。默认值：yes。</ArgTableRow>
<ArgTableRow arg="use-radius" typ="enum (no | yes | accounting)">是否对绑定使用 RADIUS 服务器：`no`（默认）、`yes` 表示用于认证和计费，或 `accounting` 表示仅用于计费。</ArgTableRow>
<ArgTableRow arg="preference" typ="num">在 Advertise 消息中发送的 Preference 值。客户端优先选择该值最高的服务器。默认值：255。</ArgTableRow>
<ArgTableRow arg="binding-script" typ="alt { script: string
 }">
在绑定被建立时和结束时运行的脚本。它会为每个绑定单独运行，并接收这些变量：
- `bindingBound` - 绑定已建立时为 `1`，否则为 `0`。
- `bindingServerName` - DHCPv6 服务器的名称。
- `bindingDUID` - 客户端的 DUID。
- `bindingAddress` - 客户端发送时所使用的 IPv6 地址，通常是其链路本地地址。
- `bindingPrefix` - 委派的前缀，或地址绑定所分配的地址。
</ArgTableRow>
<ArgTableRow arg="dns-none" typ="bool">不要将 DNS 服务器添加到响应中</ArgTableRow>
<ArgTableRow arg="dhcp-option" typ="multi { array-id, option: alt { option: enum
, option-set: enum
 }
 }">要发送给客户端的选项（`/ipv6/dhcp-server/option`），例如 DNS 服务器（选项 23）。</ArgTableRow>
<ArgTableRow arg="insert-queue-before" typ="enum (first | bottom) { first:0, bottom:0xffffffff }">对于带 `rate-limit` 的绑定所创建的动态简单队列，将其放置在何处：`first`（默认）位于 `/queue/simple` 顶部，`bottom` 位于末尾，或位于指定队列之前。</ArgTableRow>
<ArgTableRow arg="parent-queue" typ="enum (none) { none:0 }">对于带 `rate-limit` 的绑定所创建的动态简单队列的父级。默认值：none。</ArgTableRow>
<ArgTableRow arg="route-distance" typ="num">服务器为每个委派前缀和已分配地址添加的路由的距离，这些路由经由客户端的链路本地地址。默认值：1。</ArgTableRow>
<ArgTableRow arg="allow-dual-stack-queue" typ="bool">同一客户端的绑定和 DHCP 租约是否共用一个动态简单队列，该队列随后同时包含 IPv6 和 IPv4 地址。客户端通过其 MAC 地址和 DUID 识别。DHCP 服务器也必须启用此设置。默认值：yes。</ArgTableRow>
<ArgTableRow arg="use-reconfigure" typ="bool">是否发送 Reconfigure 消息。启用后，接受这些消息的客户端会获得一个 reconfigure key，服务器会自行发送 Reconfigure 消息：当 `address-pool`、`lease-time` 或 `dhcp-option` 变化时发送给其所有绑定，当绑定的设置变化时发送给该绑定，以便客户端续租；当服务器或该绑定的服务器被移除时，发送 rebind 请求。绑定上的 `send-reconfigure` 命令会手动发送一条。默认值：no。</ArgTableRow>
<ArgTableRow arg="address-lists" typ="multi { array-id, address-list: string
 }">每个绑定的前缀或地址会被添加到的 IPv6 防火墙地址列表。绑定上的 `address-lists` 设置会覆盖此项。</ArgTableRow>
<ArgTableRow arg="add-dns-entries" typ="bool">是否为每个地址绑定添加动态 DNS 条目（类型 AAAA）。条目名称为客户端发送的 FQDN（选项 39）后跟 `add-dns-entries-suffix`，其 TTL 为租约时间。前缀绑定不会获得条目。默认值：no。</ArgTableRow>
<ArgTableRow arg="add-dns-entries-suffix" typ="string">在由 `add-dns-entries` 创建的 DNS 条目中追加到客户端名称后的域名，例如 `laptop.lan`。默认值：lan。</ArgTableRow>
<ArgTableRow arg="ignore-ia-na-bindings" typ="bool">是否忽略地址请求（IA_NA），并表现得如同客户端消息中不包含这些请求，从而只下发前缀。若不启用此项，没有地址池的服务器即使没有可用地址，仍会应答每个地址请求，这可能会让同时请求地址和前缀的客户端不断重试。默认值：no。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="duid" typ="string">服务器的 DUID。路由器为其 DHCPv6 客户端使用相同的 DUID。</ArgTableRow>
</ArgTable>
