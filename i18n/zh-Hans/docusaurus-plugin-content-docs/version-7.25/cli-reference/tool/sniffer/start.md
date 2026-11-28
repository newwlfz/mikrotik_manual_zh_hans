---
title: "start"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/start
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/sniffer/start 
**类型：** 命令

使用 [`/tool/sniffer`](/docs/cli-reference/tool/sniffer) 中的设置启动抓包工具。过滤参数是去掉 `filter-` 前缀的 `filter-*` 设置（`interface`、`ip-address`、`port`、`ip-protocol`），以及对应 `filter-vlan` 的 `vlan-id`。使用过滤参数时，本次运行仅使用指定的过滤条件；已保存的过滤条件不会应用，也不会更改。抓包工具运行期间，路由器会关闭 IPv4 fast path，并同时关闭 FastTrack。捕获的数据包在 [`stop`](/docs/cli-reference/tool/sniffer/stop) 后仍保留在内存中，供 [`packet`](/docs/cli-reference/tool/sniffer/packet)、[`protocol`](/docs/cli-reference/tool/sniffer/protocol)、[`host`](/docs/cli-reference/tool/sniffer/host) 和 [`connection`](/docs/cli-reference/tool/sniffer/connection) 使用，保留时间为 10 分钟或直到下一次启动。请参阅 [Packet sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="object { interface: iface_enum
 }">Interfaces to sniff in this run.</ArgTableRow>
<ArgTableRow arg="mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">Up to 16 MAC addresses, or MAC addresses with a mask; a frame matches when its source or destination MAC address matches. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="src-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">Up to 16 source MAC addresses, or MAC addresses with a mask. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="dst-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">Up to 16 destination MAC addresses, or MAC addresses with a mask. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="mac-protocol" typ="object { mac-protocol-element: super { !
, protocol: alt { mac-protocol: enum ()
, protocol-number: num [ .. 65535]
 }
 }
 }">Up to 16 MAC (L2) protocols, by name or number (0..65535), for example `ip`, `arp`, `ipv6` or `802.2`. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="object { ip-protocol-element: super { !
, ip-protocol: enum ()
 }
 }">Up to 16 IP or IPv6 protocols, by name or number, for example `icmp`, `tcp` or `udp`. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">Up to 16 IPv4 addresses or prefixes; a packet matches when its source or destination address matches. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="src-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">Up to 16 source IPv4 addresses or prefixes. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="dst-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">Up to 16 destination IPv4 addresses or prefixes. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">Up to 16 IPv6 prefixes; a packet matches when its source or destination address matches. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="src-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">Up to 16 source IPv6 prefixes. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="dst-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">Up to 16 destination IPv6 prefixes. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="port" typ="object { port-element: super { !
, port: enum ()
 }
 }">Up to 16 ports, by number or by name such as `ssh` or `telnet`; a packet matches when its source or destination port matches. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="src-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">Up to 16 source ports, by number or name. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="dst-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">Up to 16 destination ports, by number or name. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="object { vlan-element: super { !
, vlan: num [ .. 4095]
 }
 }">Up to 16 VLAN IDs (0..4095). Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (any | tx | rx) { any:0, tx:1, rx:2 }">
Directions to capture in this run.
- `any` (default) - Received and sent packets.
- `rx` - Received packets. They are captured before the firewall, so packets that a firewall rule drops are still captured.
- `tx` - Sent packets, captured after the firewall.
</ArgTableRow>
<ArgTableRow arg="operator-between-entries" typ="enum (or | and) { or:0, and:1 }">
How the entries of one filter are combined in this run.
- `or` (default) - A packet matches a filter when it matches any of the filter's entries.
- `and` - A packet matches a filter only when it matches all of the filter's entries.
</ArgTableRow>
<ArgTableRow arg="cpu" typ="object { cpu-element: super { !
, cpu: num
 }
 }">CPU cores that processed the packet. Prefix an entry with `!` to negate it.</ArgTableRow>
<ArgTableRow arg="size" typ="object { size-element: super { !
, size-range: range [0 .. 65535]
 }
 }">Packet sizes or size ranges in bytes (0..65535), for example `1000-1500`. Prefix an entry with `!` to negate it.</ArgTableRow>
</ArgTable>
