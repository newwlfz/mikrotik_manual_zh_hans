---
sidebar_key: "cli-reference/ip/dns/index"
sidebar_position: 4
title: "dns"
sidebar_label: 'dns'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns
captured_at: '2026-11-01T21:23:55+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dns {#ipdns}
**类型：** 设置目录

DNS 解析器和缓存的设置。路由器将它们用于自身的查找，并且在 `allow-remote-requests=yes` 时，应答来自客户端的 DNS 查询。此菜单中的更改会立即生效；在那一刻到达的查询可能会得不到应答，客户端会重新发送它。缓存会保留。有关概述和示例，请参阅 [DNS](../../../network-management/dns.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="servers" typ="multi { servers: address (flags=46v)
 }">上游 DNS 服务器，IPv4 或 IPv6 地址，可选带 `@<vrf>` 以访问另一个 VRF 中的服务器。路由器按列出的顺序先尝试这些服务器，再尝试 `dynamic-servers`。它会等待 `query-server-timeout` 以获得应答，然后尝试下一个服务器。当某个服务器应答后，路由器会在后续查询中继续使用它。</ArgTableRow>
<ArgTableRow arg="use-doh-server" typ="string">DNS over HTTPS (DoH) 服务器的 URL，例如 `https://cloudflare-dns.com/dns-query`。设置后，路由器会通过一条复用的 HTTPS 连接（TCP 端口 443）把所有查询发送到该服务器，而 `servers` 和 `dynamic-servers` 仅用于查找 DoH 服务器的主机名（通过 UDP 端口 53 进行 A 和 AAAA 查询）；为该主机名配置静态条目也可以。路由器不会回退到普通 DNS：当 DoH 服务器不应答时，客户端会在 `query-total-timeout` 后收到 SERVFAIL，日志会显示 `dns,error DoH server connection error: ...`，例如 `Connection refused` 或 `timeout connecting`。静态 `FWD` 条目仍会通过普通 DNS 使用它们自己的服务器。只能设置一个 DoH 服务器。ARM64 和 x86 设备（包括 CHR）使用 HTTP/2；其他架构使用 HTTP/1.1，因此要求 HTTP/2 的 DoH 服务（例如 Quad9）仅在 ARM64 和 x86 上可用。默认值：空。</ArgTableRow>
<ArgTableRow arg="verify-doh-cert" typ="bool">路由器是否使用 `/certificate` 和内置信任存储来验证 DoH 服务器的证书。默认值：否。</ArgTableRow>
<ArgTableRow arg="doh-max-server-connections" typ="num">到 DoH 服务器的最大 HTTPS 连接数。默认值：5。</ArgTableRow>
<ArgTableRow arg="doh-max-concurrent-queries" typ="num">同时进行的 DoH 查询最大数量。默认值：50。</ArgTableRow>
<ArgTableRow arg="doh-timeout" typ="time">路由器等待 DoH 服务器应答的时间。默认值：5s。</ArgTableRow>
<ArgTableRow arg="allow-remote-requests" typ="bool">路由器是否在其地址的 UDP 和 TCP 端口 53 上应答来自其他设备的 DNS 查询。设为 `no` 时，只有路由器自身使用解析器。默认防火墙会丢弃来自 WAN 侧的连接；仅允许来自你自己网络的端口 53，这样路由器就不会应答来自互联网的查询。默认值：否。</ArgTableRow>
<ArgTableRow arg="max-udp-packet-size" typ="num">UDP 上 DNS 消息的最大大小，单位为字节。默认值：4096。</ArgTableRow>
<ArgTableRow arg="query-server-timeout" typ="time">路由器在尝试下一个上游服务器之前，等待某个上游服务器应答的时间。默认值：2s。</ArgTableRow>
<ArgTableRow arg="query-total-timeout" typ="time">路由器尝试解析一个查询的总时长。如果在此时间内没有服务器应答，客户端会收到 SERVFAIL 应答。请结合 `query-server-timeout` 和服务器数量进行设置。默认值：10s。</ArgTableRow>
<ArgTableRow arg="max-concurrent-queries" typ="num">可同时等待上游应答的最大查询数。达到该限制时，路由器会丢弃新查询，包括它本可从缓存中应答的查询，直到某个等待中的查询完成。默认值：100。</ArgTableRow>
<ArgTableRow arg="max-concurrent-tcp-sessions" typ="num">同时来自客户端的 TCP 连接最大数量。默认值：20。</ArgTableRow>
<ArgTableRow arg="cache-size" typ="num">DNS 缓存的大小，单位为 KiB。Adlist 条目也会保存在缓存中。默认值：2048。</ArgTableRow>
<ArgTableRow arg="cache-max-ttl" typ="time">路由器将上游应答保留在缓存中的最长时间。来自上游服务器的更长 TTL 会被缩短为此值，客户端会获得剩余时间。静态条目保留自己的 `ttl`。默认值：1w。</ArgTableRow>
<ArgTableRow arg="address-list-extra-time" typ="time">在路由器删除由带 `address-list` 的静态条目创建的动态地址列表条目之前，加到应答 TTL 上的时间。默认值：0s。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">当 `allow-remote-requests=yes` 时，解析器为客户端提供应答所在的 VRF。其他 VRF 中的客户端不会得到应答；路由器自身的查询仍可正常工作。不带 VRF 后缀的上游服务器通过主路由表访问；要访问另一个 VRF 中的服务器，请在 `servers` 中将其写为 `address@vrf`，例如 `servers=10.0.0.1@vrf1,1.1.1.1`。默认值：main.</ArgTableRow>
<ArgTableRow arg="mdns-repeat-ifaces" typ="multi { iface_enum
 }">路由器在其间重复多播 DNS (mDNS) 的接口。路由器会在每个列出的接口上接收 IPv4 mDNS 数据包（UDP 端口 5353 发往 224.0.0.251），并从其在其他列出接口上的自身地址再次发送这些数据包，以便不同网络中的设备能够相互发现。IPv6 mDNS (ff02::fb) 不会被重复。路由器会自行处理这些数据包，因此它们会经过防火墙的 input 链：input 规则不得在这些接口上丢弃 UDP 端口 5353（默认防火墙会在 `LAN` 接口上接受它）。请使用承载多播的接口，例如 Ethernet、VLAN、bridge 或 EoIP 接口；WireGuard 等三层隧道不承载多播。默认值：空（不重复）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="dynamic-servers" typ="multi { dynamic-servers: address (flags=46v)
 }">从其他服务学习到的 DNS 服务器，例如通过 `use-peer-dns=yes` 从 DHCP 客户端学习到的服务器。路由器会在 `servers` 之后尝试它们。</ArgTableRow>
<ArgTableRow arg="cache-used" typ="num">`cache-size` 中已使用的部分，单位为 KiB。</ArgTableRow>
</ArgTable>
