---
sidebar_key: "cli-reference/ip/dhcp-server/index"
sidebar_position: 3
title: "dhcp-server"
sidebar_label: 'dhcp-server'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server
captured_at: '2026-11-01T21:23:51+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server {#ipdhcp-server}
**类型：** 目录

DHCP 服务器为客户端分配 IPv4 地址和网络设置。它从 IP 池中租出地址，发送 `/ip/dhcp-server/network` 中匹配条目的设置，还可以分发静态租约（`/ip/dhcp-server/lease`）。有关概述和配置示例，请参阅 [DHCP 服务器](../../../network-management/dhcp/server.md)。有关 DHCP 的工作原理，请参阅 [DHCP](../../../network-management/dhcp/index.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">DHCP 服务器是动态创建的。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">DHCP 服务器已禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">DHCP 服务器配置无效，例如其接口没有 IP 地址。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">DHCP 服务器的名称。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">DHCP 服务器监听的接口。该接口必须有 IP 地址，否则服务器无效。一个接口上只能运行一个用于直连客户端的服务器；同一接口上的多个服务器必须各自具有不同的 `relay` 地址。</ArgTableRow>
<ArgTableRow arg="relay" typ="ipAddr">
服务器根据请求的网关地址（`giaddr`）决定应答哪些请求：
- `0.0.0.0`（默认）- 仅应答来自直连客户端的请求，不应答中继请求。
- `255.255.255.255` - 应答来自任何 DHCP 中继的请求，但另一个服务器已设置该中继地址并应答的请求除外。
- IP 地址 - 仅应答由具有该地址的 DHCP 中继转发的请求，该地址是中继的 `local-address`。
</ArgTableRow>
<ArgTableRow arg="lease-time" typ="time">租约的持续时间。客户端在过半后续租，在达到 87.5% 后开始重新绑定。没有自己的 `lease-time` 的静态租约也使用此值。默认：30m。</ArgTableRow>
<ArgTableRow arg="address-pool" typ="enum (static-only)">用于分配动态地址的 IP 池。使用 `static-only` 时，服务器仅应答拥有静态租约的客户端。默认：static-only。</ArgTableRow>
<ArgTableRow arg="dynamic-lease-identifiers" typ="ubit (client-mac, client-id, opt-82)">服务器用于识别动态租约客户端的标识符：`client-mac`（硬件地址）、`client-id`（选项 61）和 `opt-82`（中继代理信息）。更改所选标识符的客户端会获得新租约。默认：client-mac,client-id。</ArgTableRow>
<ArgTableRow arg="bootp-support" typ="enum (none | static | dynamic)">
服务器如何应答 BOOTP 客户端：
- `none` - 不应答 BOOTP 请求。
- `static`（默认）- 仅向 BOOTP 客户端提供静态租约。
- `dynamic` - 向 BOOTP 客户端提供静态和动态租约。
</ArgTableRow>
<ArgTableRow arg="bootp-lease-time" typ="alt { enum: enum (lease-time | forever) { lease-time:0, forever:0xffffffff }
, time: time
 }">BOOTP 客户端的租约时间：`forever`（默认）表示永不过期的租约，`lease-time` 表示使用服务器的 `lease-time`，或使用一个时间值。</ArgTableRow>
<ArgTableRow arg="delay-threshold" typ="alt { enum: enum (none) { none:0 }
, time: time
 }">请求必须具有的 seconds-elapsed 字段（`secs`）最小值，达到该值才会被应答。客户端将此字段设置为自开始获取或续租地址以来经过的时间，因此阈值使服务器仅应答已尝试该时长的客户端，例如让另一台服务器先应答。使用 `none` 时，所有请求都会被应答。默认：none。</ArgTableRow>
<ArgTableRow arg="server-address" typ="ipAddr">服务器用作其标识的地址：回复从此地址发送，并将其作为服务器标识符（选项 54）携带。未设置时，使用服务器接口的地址。当接口有多个地址时设置此项。</ArgTableRow>
<ArgTableRow arg="add-arp" typ="bool">是否为每个已绑定租约的地址添加永久 ARP 表项，并在 `/ip/arp` 中通过 `H` 标志显示。当接口自身不解析 ARP 时使用它，例如 ARP 模式为 `reply-only` 时。默认值：no.</ArgTableRow>
<ArgTableRow arg="add-dns-entries" typ="bool">是否为每个已绑定租约的地址添加动态 DNS 条目（`/ip/dns/static`，类型 A）。条目名是客户端发送的主机名（选项 12）后跟 `add-dns-entries-suffix`，其 TTL 为租约时间。路由器的 DNS 解析器会应答这些名称。默认：no。</ArgTableRow>
<ArgTableRow arg="add-dns-entries-suffix" typ="string">在由 `add-dns-entries` 创建的 DNS 条目中追加到客户端主机名的域，例如 `laptop.lan`。仅在 `add-dns-entries=yes` 时使用。当网络没有 `domain` 时，服务器还会将此后缀作为域名（选项 15）发送。它不能为空。默认：lan。</ArgTableRow>
<ArgTableRow arg="authoritative" typ="enum (no | after-10sec-delay | after-2sec-delay | yes)">
服务器如何应答对其无法提供的地址的请求，以便此类客户端更早重新开始：
- `yes`（默认）- 使用 DHCPNAK 应答。
- `no` - 忽略针对此类地址的广播请求，例如来自重新绑定客户端的请求，以便另一台服务器可以应答它们。
- `after-2sec-delay`、`after-10sec-delay` - 对于广播请求，在请求的 `secs` 字段低于 2 或 10 秒时表现为 `no`，之后表现为 `yes`。要忽略低于阈值的所有请求，请使用 `delay-threshold`。

单播续租请求始终会被应答：当无法提供所请求的地址时，使用 DHCPNAK 应答；或者当该地址在地址池中空闲时，使用新租约应答。
</ArgTableRow>
<ArgTableRow arg="always-broadcast" typ="bool">即使客户端未设置广播标志，是否也广播回复。使用 `no` 时，回复遵循客户端的广播标志。默认：no。</ArgTableRow>
<ArgTableRow arg="use-radius" typ="enum (no | yes | accounting)">
是否使用 RADIUS 服务器（`/radius` 条目，`service=dhcp`）处理租约：
- `no`（默认）- 不使用 RADIUS。
- `yes` - 通过 RADIUS 授权租约并发送计费。服务器在等待 RADIUS 回复期间，租约具有 `authorizing` 状态，客户端不会获得地址。
- `accounting` - 仅将 RADIUS 用于计费。
</ArgTableRow>
<ArgTableRow arg="client-mac-limit" typ="enum (unlimited) { unlimited:0xffffffff }">具有相同 MAC 地址的客户端可以获得的租约最大数量。默认：unlimited。</ArgTableRow>
<ArgTableRow arg="conflict-detection" typ="bool">是否在提供地址前使用 ARP 和 ICMP 检查该地址。当另一台主机应答时，服务器记录警告，将该地址保留为具有 `conflict` 状态的租约直到租约时间结束，并提供另一个空闲地址。不检查静态租约的地址。默认：yes。</ArgTableRow>
<ArgTableRow arg="use-framed-as-classless" typ="bool">是否将从 RADIUS 收到的 Framed-Route 属性作为无类静态路由（选项 121）发送给客户端。当同时收到 Framed-Route 和 Classless-Static-Route 时，使用 Classless-Static-Route。默认：yes。</ArgTableRow>
<ArgTableRow arg="use-reconfigure" typ="bool">服务器是否支持 Reconfigure（FORCERENEW）消息。启用后，服务器会向请求该密钥的客户端提供重新配置密钥，例如使用 `allow-reconfigure=yes` 的 RouterOS DHCP 客户端，租约的 `send-reconfigure` 命令会使此类客户端续租。重新配置消息仅由该命令发送，服务器或网络设置更改时不会发送。未启用此设置时，客户端不会获得密钥，且 `send-reconfigure` 会被拒绝。默认：no。</ArgTableRow>
<ArgTableRow arg="lease-script" typ="alt { script: string
 }">
租约绑定、释放或过期时要运行的脚本。脚本接收以下变量：
- `leaseBound` - 租约绑定时为 `1`，释放或过期时为 `0`。
- `leaseServerName` - DHCP 服务器名称。
- `leaseActMAC` - 客户端的 MAC 地址。
- `leaseActIP` - 租约的 IP 地址。
- `lease-hostname` - 客户端发送的主机名。
- `lease-options` - 发送给客户端的选项数组，按选项代码索引。
- `lease-agent-circuit-id`、`lease-agent-remote-id` - 来自中继代理信息选项（选项 82）的 Circuit ID 和 Remote ID，当请求经过会添加该选项的中继时。
</ArgTableRow>
<ArgTableRow arg="insert-queue-before" typ="enum (first | bottom) { first:0, bottom:0xffffffff }">为具有 `rate-limit` 的租约创建的动态简单队列的放置位置：`first`（默认）放在 `/queue/simple` 的顶部，`bottom` 放在末尾，或放在指定队列之前。</ArgTableRow>
<ArgTableRow arg="parent-queue" typ="enum (none) { none:0 }">为具有 `rate-limit` 的租约创建的动态简单队列的父队列。默认：none。</ArgTableRow>
<ArgTableRow arg="dhcp-option-set" typ="enum (none)">要发送给此服务器客户端的选项集（`/ip/dhcp-server/option/sets`）。租约的选项优先于服务器的选项，服务器的选项优先于网络的选项。默认：none。</ArgTableRow>
<ArgTableRow arg="address-lists" typ="multi { array-id, address-list: string
 }">防火墙地址列表，每个已绑定租约的地址会作为动态条目添加到这些列表中。租约结束时条目会被移除。</ArgTableRow>
<ArgTableRow arg="allow-dual-stack-queue" typ="bool">同一客户端的租约和 DHCPv6 绑定是否共享一个动态简单队列，该队列随后同时包含 IPv4 和 IPv6 地址。客户端通过其 MAC 地址和 DUID 识别。DHCPv6 服务器也必须启用此设置。默认：yes。</ArgTableRow>
<ArgTableRow arg="support-broadband-tr101" typ="bool">按照 RFC 4679 和 The Broadband Forum TR-101 所述，向 RADIUS 服务器传递额外的 Option 82 子选项。</ArgTableRow>
<ArgTableRow arg="ipv6-only-preferred" typ="bool">是否向请求该选项的客户端发送 IPv6-Only Preferred 选项（选项 108，RFC 8925）。请求该选项的客户端随后不会获得 IPv4 地址：offer 中包含该选项但不包含地址，因此支持该选项的客户端仅使用 IPv6。该选项携带 0 秒的等待时间，RFC 8925 客户端会在再次尝试 IPv4 之前将其提高到至少 300 秒。默认：no。</ArgTableRow>
</ArgTable>
