---
title: "dhcp-server"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server 
**类型：** 目录

DHCP 服务器向客户端分配 IPv4 地址和网络设置。它从 IP 地址池租用地址，发送 `/ip/dhcp-server/network` 中匹配条目的设置，还可以分发静态租约（`/ip/dhcp-server/lease`）。有关概览和配置示例，请参阅 [DHCP Server](/docs/network-management/dhcp/server)。有关 DHCP 的工作原理，请参阅 [DHCP](/docs/network-management/dhcp)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dynamic">The DHCP server was created dynamically.</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">The DHCP server is disabled.</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">The DHCP server configuration is invalid, for example because its interface has no IP address.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the DHCP server.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">Interface the DHCP server listens on. The interface must have an IP address, otherwise the server is invalid. Only one server for directly connected clients can run on an interface; more servers on the same interface must each have a different `relay` address.</ArgTableRow>
<ArgTableRow arg="relay" typ="ipAddr">
Which requests the server answers, by the gateway address (`giaddr`) of the request:
- `0.0.0.0` (default) - Only requests from directly connected clients, no relayed requests.
- `255.255.255.255` - Requests from any DHCP relay, except those answered by another server that has this relay's address set.
- An IP address - Only requests relayed by the DHCP relay with this address, which is the relay's `local-address`.
</ArgTableRow>
<ArgTableRow arg="lease-time" typ="time">How long a lease lasts. Clients renew the lease after half of this time and start rebinding after 87.5% of it. Static leases without their own `lease-time` also use this value. Default: 30m.</ArgTableRow>
<ArgTableRow arg="address-pool" typ="enum (static-only)">IP pool to give out dynamic addresses from. With `static-only`, the server only answers clients that have a static lease. Default: static-only.</ArgTableRow>
<ArgTableRow arg="dynamic-lease-identifiers" typ="ubit (client-mac, client-id, opt-82)">Identifiers the server uses to recognize a client for dynamic leases: `client-mac` (the hardware address), `client-id` (option 61) and `opt-82` (relay agent information). A client that changes a selected identifier gets a new lease. Default: client-mac,client-id.</ArgTableRow>
<ArgTableRow arg="bootp-support" typ="enum (none | static | dynamic)">
How the server answers BOOTP clients:
- `none` - Do not answer BOOTP requests.
- `static` (default) - Offer only static leases to BOOTP clients.
- `dynamic` - Offer static and dynamic leases to BOOTP clients.
</ArgTableRow>
<ArgTableRow arg="bootp-lease-time" typ="alt { enum: enum (lease-time | forever) { lease-time:0, forever:0xffffffff }
, time: time
 }">Lease time for BOOTP clients: `forever` (default) for leases that never expire, `lease-time` to use the `lease-time` of the server, or a time value.</ArgTableRow>
<ArgTableRow arg="delay-threshold" typ="alt { enum: enum (none) { none:0 }
, time: time
 }">Minimum value of the seconds-elapsed field (`secs`) a request must have to be answered. The client sets this field to the time since it started getting or renewing an address, so a threshold makes the server answer only clients that have been trying for that long, for example to let another server answer first. With `none`, all requests are answered. Default: none.</ArgTableRow>
<ArgTableRow arg="server-address" typ="ipAddr">Address the server uses as its identity: replies are sent from this address and carry it as the server identifier (option 54). When not set, the address of the server interface is used. Set it when the interface has several addresses.</ArgTableRow>
<ArgTableRow arg="add-arp" typ="bool">Whether to add a permanent ARP entry for the address of each bound lease, shown with the `H` flag in `/ip/arp`. Use it when the interface does not resolve ARP itself, for example with ARP mode `reply-only`. Default: no.</ArgTableRow>
<ArgTableRow arg="add-dns-entries" typ="bool">Whether to add a dynamic DNS entry (`/ip/dns/static`, type A) for the address of each bound lease. The entry name is the host name the client sends (option 12) followed by `add-dns-entries-suffix`, and its TTL is the lease time. The router's DNS resolver answers these names. Default: no.</ArgTableRow>
<ArgTableRow arg="add-dns-entries-suffix" typ="string">Domain appended to the client host name in the DNS entries created by `add-dns-entries`, for example `laptop.lan`. Used only with `add-dns-entries=yes`. When the network has no `domain`, the server also sends this suffix as the domain name (option 15). It cannot be empty. Default: lan.</ArgTableRow>
<ArgTableRow arg="authoritative" typ="enum (no | after-10sec-delay | after-2sec-delay | yes)">
How the server answers requests for addresses it cannot give, so that such clients start over sooner:
- `yes` (default) - Answer with DHCPNAK.
- `no` - Ignore broadcast requests for such addresses, for example from a rebinding client, so another server can answer them.
- `after-2sec-delay`, `after-10sec-delay` - For broadcast requests, behave as `no` while the `secs` field of the request is below 2 or 10 seconds, and as `yes` after that. To ignore all requests below a threshold, use `delay-threshold`.

单播续租请求始终会得到响应：当请求的地址无法分配时返回 DHCPNAK，当该地址在地址池中空闲时返回新租约。
</ArgTableRow>
<ArgTableRow arg="always-broadcast" typ="bool">是否即使客户端未设置广播标志也广播回复。使用 `no` 时，回复遵循客户端的广播标志。默认：no。</ArgTableRow>
<ArgTableRow arg="use-radius" typ="enum (no | yes | accounting)">
是否使用 RADIUS 服务器（带有 `service=dhcp` 的 `/radius` 条目）处理租约：
- `no`（默认）- 不使用 RADIUS。
- `yes` - 通过 RADIUS 授权租约并发送计费。服务器等待 RADIUS 回复期间，租约处于 `authorizing` 状态，客户端不会获得地址。
- `accounting` - 仅使用 RADIUS 进行计费。
</ArgTableRow>
<ArgTableRow arg="client-mac-limit" typ="enum (unlimited) { unlimited:0xffffffff }">具有相同 MAC 地址的客户端可获得的租约最大数量。默认：unlimited。</ArgTableRow>
<ArgTableRow arg="conflict-detection" typ="bool">是否在提供地址前使用 ARP 和 ICMP 检查该地址。当其他主机响应时，服务器记录警告，在租约时间内将该地址保留为处于 `conflict` 状态的租约，并提供另一个空闲地址。静态租约的地址不会被检查。默认：yes。</ArgTableRow>
<ArgTableRow arg="use-framed-as-classless" typ="bool">是否将从 RADIUS 收到的 Framed-Route 属性作为无类别静态路由（option 121）发送给客户端。当同时收到 Framed-Route 和 Classless-Static-Route 时，使用 Classless-Static-Route。默认：yes。</ArgTableRow>
<ArgTableRow arg="use-reconfigure" typ="bool">服务器是否支持 Reconfigure（FORCERENEW）消息。启用后，服务器会向请求 reconfigure key 的客户端提供该密钥，例如带有 `allow-reconfigure=yes` 的 RouterOS DHCP 客户端，租约的 `send-reconfigure` 命令会使此类客户端续租。Reconfigure 消息仅由该命令发送，不会在服务器或网络设置更改时发送。未启用此设置时，客户端不会获得密钥，且 `send-reconfigure` 会被拒绝。默认：no。</ArgTableRow>
<ArgTableRow arg="lease-script" typ="alt { script: string
 }">
租约绑定时，以及租约释放或到期时运行的脚本。该脚本接收以下变量：
- `leaseBound` - 租约绑定时为 `1`，释放或到期时为 `0`。
- `leaseServerName` - DHCP 服务器名称。
- `leaseActMAC` - 客户端的 MAC 地址。
- `leaseActIP` - 租约的 IP 地址。
- `lease-hostname` - 客户端发送的主机名。
- `lease-options` - 发送给客户端的选项数组，以选项代码为索引。
- `lease-agent-circuit-id`、`lease-agent-remote-id` - 当请求通过添加中继代理信息选项（option 82）的中继到达时，来自该选项的 Circuit ID 和 remote ID。
</ArgTableRow>
<ArgTableRow arg="insert-queue-before" typ="enum (first | bottom) { first:0, bottom:0xffffffff }">为带有 `rate-limit` 的租约创建的动态简单队列的放置位置：`first`（默认）位于 `/queue/simple` 顶部，`bottom` 位于末尾，或位于指定队列之前。</ArgTableRow>
<ArgTableRow arg="parent-queue" typ="enum (none) { none:0 }">为带有 `rate-limit` 的租约创建的动态简单队列的父队列。默认：none。</ArgTableRow>
<ArgTableRow arg="dhcp-option-set" typ="enum (none)">发送给此服务器客户端的选项集（`/ip/dhcp-server/option/sets`）。租约的选项优先于服务器的选项，服务器的选项优先于网络的选项。默认：none。</ArgTableRow>
<ArgTableRow arg="address-lists" typ="multi { array-id, address-list: string
 }">每个已绑定租约的地址会作为动态条目添加到这些防火墙地址列表中。租约结束时，该条目会被移除。</ArgTableRow>
<ArgTableRow arg="allow-dual-stack-queue" typ="bool">同一客户端的租约和 DHCPv6 绑定是否共享一个动态简单队列，该队列随后同时包含 IPv4 和 IPv6 地址。客户端通过其 MAC 地址和 DUID 识别。DHCPv6 服务器也必须启用此设置。默认：yes。</ArgTableRow>
<ArgTableRow arg="support-broadband-tr101" typ="bool">按照 RFC 4679 和 The Broadband Forum TR-101 的描述，将额外的 Option 82 Suboptions 传递给 RADIUS 服务器</ArgTableRow>
<ArgTableRow arg="ipv6-only-preferred" typ="bool">是否向请求该选项的客户端发送 IPv6-Only Preferred 选项（option 108，RFC 8925）。请求该选项的客户端不会获得 IPv4 地址：offer 包含该选项但不包含地址，因此支持该选项的客户端仅使用 IPv6。该选项携带 0 秒的等待时间，RFC 8925 客户端会将其提高到至少 300 秒，然后再次尝试 IPv4。默认：no。</ArgTableRow>
</ArgTable>
