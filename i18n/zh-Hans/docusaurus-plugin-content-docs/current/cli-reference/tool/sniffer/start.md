---
sidebar_key: "cli-reference/tool/sniffer/start"
sidebar_position: 7
title: "start"
sidebar_label: 'start'
source: https://manual.mikrotik.com/docs/cli-reference/tool/sniffer/start
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer/start {#toolsnifferstart}
**类型：** 命令

使用 [`/tool/sniffer`](./index.md) 中的设置启动嗅探器。过滤参数是不带 `filter-` 前缀的 `filter-*` 设置（`interface`、`ip-address`、`port`、`ip-protocol`），以及用于 `filter-vlan` 的 `vlan-id`。使用过滤参数时，本次运行仅使用给定的过滤器；已保存的过滤器不适用，也不会改变。嗅探器运行期间，路由器会关闭 IPv4 fast path，并随之关闭 FastTrack。捕获的数据包在 [`stop`](./stop.md) 后会保留在内存中，供 [`packet`](./packet.md)、[`protocol`](./protocol.md)、[`host`](./host.md) 和 [`connection`](./connection.md) 使用，保留 10 分钟或直到下一次启动。参见 [数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="object { interface: iface_enum
 }">本次运行中要嗅探的接口。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">最多 16 个 MAC 地址，或带掩码的 MAC 地址；当帧的源 MAC 地址或目的 MAC 地址匹配时，该帧即匹配。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="src-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">最多 16 个源 MAC 地址，或带掩码的 MAC 地址。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="dst-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">最多 16 个目的 MAC 地址，或带掩码的 MAC 地址。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="mac-protocol" typ="object { mac-protocol-element: super { !
, protocol: alt { mac-protocol: enum ()
, protocol-number: num [ .. 65535]
 }
 }
 }">最多 16 个 MAC（L2）协议，可按名称或编号（0..65535）指定，例如 `ip`、`arp`、`ipv6` 或 `802.2`。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="object { ip-protocol-element: super { !
, ip-protocol: enum ()
 }
 }">最多 16 个 IP 或 IPv6 协议，可按名称或编号指定，例如 `icmp`、`tcp` 或 `udp`。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">最多 16 个 IPv4 地址或前缀；当数据包的源地址或目的地址匹配时，该数据包即匹配。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="src-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">最多 16 个源 IPv4 地址或前缀。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="dst-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">最多 16 个目的 IPv4 地址或前缀。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">最多 16 个 IPv6 前缀；当数据包的源地址或目的地址匹配时，该数据包即匹配。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="src-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">最多 16 个源 IPv6 前缀。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="dst-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">最多 16 个目的 IPv6 前缀。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="port" typ="object { port-element: super { !
, port: enum ()
 }
 }">最多 16 个端口，可按编号或名称（如 `ssh` 或 `telnet`）指定；当数据包的源端口或目的端口匹配时，该数据包即匹配。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="src-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">最多 16 个源端口，可按编号或名称指定。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">最多 16 个目的端口，可按编号或名称指定。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="object { vlan-element: super { !
, vlan: num [ .. 4095]
 }
 }">最多 16 个 VLAN ID（0..4095）。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (any | tx | rx) { any:0, tx:1, rx:2 }">
本次运行中要捕获的方向。
- `any`（默认）- 接收和发送的数据包。
- `rx` - 接收的数据包。它们在防火墙之前被捕获，因此被防火墙规则丢弃的数据包仍会被捕获。
- `tx` - 发送的数据包，在防火墙之后捕获。
</ArgTableRow>
<ArgTableRow arg="operator-between-entries" typ="enum (or | and) { or:0, and:1 }">
本次运行中，一个过滤器的各个条目如何组合。
- `or`（默认）- 当数据包匹配过滤器的任意一个条目时，该数据包即匹配该过滤器。
- `and` - 仅当数据包匹配过滤器的所有条目时，该数据包才匹配该过滤器。
</ArgTableRow>
<ArgTableRow arg="cpu" typ="object { cpu-element: super { !
, cpu: num
 }
 }">处理该数据包的 CPU 核心。在条目前面加上 `!` 可将其取反。</ArgTableRow>
<ArgTableRow arg="size" typ="object { size-element: super { !
, size-range: range [0 .. 65535]
 }
 }">数据包大小或以字节为单位的大小范围（0..65535），例如 `1000-1500`。在条目前面加上 `!` 可将其取反。</ArgTableRow>
</ArgTable>
