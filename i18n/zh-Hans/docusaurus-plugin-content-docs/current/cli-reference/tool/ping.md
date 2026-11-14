---
sidebar_key: "cli-reference/tool/ping"
sidebar_position: 16
title: "ping"
sidebar_label: 'ping'
source: https://manual.mikrotik.com/docs/cli-reference/tool/ping
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/ping {#toolping}
**类型：** 命令

向主机发送 ICMP 回显请求（IPv4）或 ICMPv6 回显请求（IPv6），并显示每个应答及其往返时间、TTL 和状态，最后给出汇总。`/ping` 是 `/tool/ping` 的简写形式。使用 `arp-ping` 或 `nd-ping` 时，路由器改为发送 ARP 请求或 IPv6 邻居请求；当 `address` 为 MAC 地址时，发送 MAC ping。在脚本中，该命令返回应答的数量。完整文档请参见 [Ping](../../diagnostics-monitoring-and-troubleshooting/ping.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="address (flags=46v%Dm)">要 ping 的主机：IPv4 或 IPv6 地址、DNS 名称，或用于 MAC ping 的 MAC 地址。路由器使用自身的 DNS 设置解析名称。IPv6 链路本地地址和 MAC 地址以接口作为后缀，例如 `fe80::1%ether1` 或 `00:11:22:33:44:55%ether1`；不带后缀的 MAC ping 会从每个接口发出。参见 [地址标志](../index.md#address-flags)。</ArgTableRow>
<ArgTableRow arg="interval" typ="time">两次请求之间的时间，`00:00:00.010..00:00:05`（10 毫秒到 5 秒）。晚于该间隔到达的应答计为超时。默认值：1s。</ArgTableRow>
<ArgTableRow arg="size" typ="num">每个请求的字节大小，即包含 IP 头的整个 IP 数据包，IPv4 为 `28..65535`，IPv6 为 `48..65535`。在以太网链路上，`size=1500` 是满尺寸数据包。大于出接口 MTU 的请求会被分片，除非设置了 `do-not-fragment`。默认值：56。</ArgTableRow>
<ArgTableRow arg="ttl" typ="num">IPv4 请求的 TTL 和 IPv6 请求的跳数限制，`1..255`。默认值：IPv4 为 255，IPv6 为 64。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">设置在请求 IP 头中的差分服务代码点，`0..63`。例如，`dscp=46`（加速转发）对应的 ToS 字节为 `0xb8`。默认值：0。</ArgTableRow>
<ArgTableRow arg="do-not-fragment" typ="switch">在请求中设置“不分片”标志，使其不被分片。大于路径 MTU 的请求随后会失败：路径上链路较小的路由器会以状态 `fragmentation needed and DF set` 应答；大于出接口 MTU 或路由器已学到的路径 MTU 的请求会以 `packet too large and cannot be fragmented` 失败。可与 `size` 一起用于探测路径 MTU。</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip-src-address: ipAddr
, ip6-src-address: ip6Addr
 }">请求的源地址。当测试需要特定地址时使用，例如用 LAN 地址测试 IPsec 站点到站点隧道。默认值：路由的 `pref-src`，否则为出接口的地址。</ArgTableRow>
<ArgTableRow arg="arp-ping" typ="bool">发送 ARP 请求而不是 ICMP 回显请求，以到达直接相连的 IPv4 子网上丢弃 ICMP 的主机。需要 `interface`；没有该参数时命令会以 `interface needs to be specified for arp ping` 失败。`host` 显示应答主机的 MAC 地址。默认值：no。</ArgTableRow>
<ArgTableRow arg="count" typ="num">要发送的请求数量。不使用该参数时，ping 会一直运行，直到你用 Ctrl-C 停止。在脚本中，该命令返回应答的数量。默认值：无限。</ArgTableRow>
<ArgTableRow arg="nd-ping" typ="bool">使用 IPv6 邻居发现而不是 ICMPv6 回显：路由器发送邻居请求（NS），并将邻居通告（NA）计为应答。仅对链路本地 IPv6 地址有效；全局地址还需要 `interface`。默认值：no。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">请求发出的接口。当没有经过该接口到达目标的路由时，路由器将目标视为在该接口上直接相连，并为其发送 ARP 请求。`arp-ping`、对全局地址的 `nd-ping` 以及 IPv6 链路本地地址都需要该参数（或者将接口作为地址后缀给出）。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">ping 运行的 VRF。只接受 VRF；为策略路由而存在的路由表会被拒绝，并提示 `input does not match any value of vrf`。默认值：main。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="seq" typ="num">该行所对应应答的请求编号。对组播请求的应答共用一个编号。</ArgTableRow>
<ArgTableRow arg="host" typ="alt { ipv6-address: ip6Addr
, mac-address: macAddr
, ip-address: ipAddr
 }">应答来自的地址：主机，或路径上发送了 ICMP 错误的路由器（参见 `status`）。对于 ARP ping 和 MAC ping，为应答主机的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="size" typ="num">收到的数据包大小（字节）。对于来自路由器的 ICMP 错误，为该报文的大小。</ArgTableRow>
<ArgTableRow arg="ttl" typ="num">收到的数据包的 TTL（IPv4）或跳数限制（IPv6）。与发送方所用值之差大致反映了应答经过的路由器数量。</ArgTableRow>
<ArgTableRow arg="time" typ="time">往返时间：从发送请求到收到应答之间的时间。</ArgTableRow>
<ArgTableRow arg="status" typ="string">
IPv4 应答时为空，否则表示请求发生了什么：
- `timeout` - 在 `interval` 内没有收到应答。
- `net unreachable` - `host` 中的路由器没有到达目标网络的路由，或者该处的防火墙规则以默认的 `reject` 动作拒绝了该数据包。
- `host unreachable` - `host` 中的路由器报告无法到达该主机，或者该处的防火墙规则以 `icmp-host-unreachable` 拒绝了该数据包。
- `admin prohibited` - `host` 中的路由器上的防火墙规则拒绝了该数据包。
- `TTL exceeded` - 在 `host` 中的路由器上 TTL 耗尽，通常是由于路由环路。
- `fragmentation needed and DF set` - `host` 中的路由器有一条 MTU 更小的链路，且设置了 `do-not-fragment`。
- `packet too large and cannot be fragmented` - 请求大于出接口的 MTU 或已学到的路径 MTU，且设置了 `do-not-fragment`。
- `no route to host` - 路由器没有到达该地址的路由；对于 `nd-ping`，该地址不在直接相连的子网上。
- `echo reply` - IPv6 回显应答。
</ArgTableRow>
<ArgTableRow arg="sent" typ="num">已发送的请求数量。</ArgTableRow>
<ArgTableRow arg="received" typ="num">已收到的应答数量。</ArgTableRow>
<ArgTableRow arg="packet-loss" typ="num">无应答请求的占比，以百分比表示。</ArgTableRow>
<ArgTableRow arg="min-rtt" typ="time">本次运行中最短的往返时间。</ArgTableRow>
<ArgTableRow arg="avg-rtt" typ="time">本次运行中的平均往返时间。</ArgTableRow>
<ArgTableRow arg="max-rtt" typ="time">本次运行中最长的往返时间。</ArgTableRow>
</ArgTable>
