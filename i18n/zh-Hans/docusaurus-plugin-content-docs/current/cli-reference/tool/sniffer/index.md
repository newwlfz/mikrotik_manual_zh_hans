---
sidebar_key: "cli-reference/tool/sniffer"
title: "sniffer"
sidebar_label: 'sniffer'
source: https://manual.mikrotik.com/docs/cli-reference/tool/sniffer
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer {#toolsniffer}
**类型：** 设置目录

数据包嗅探器的设置：捕获哪些数据包（`filter-*` 设置）、将它们保存在哪里（内存和文件），以及是否将它们流式传输到 TZSP 接收方。[`start`](./start.md) 和 [`quick`](./quick.md) 在未提供过滤参数时使用已保存的过滤器。提供过滤参数时，它们仅在该次运行中使用给定的过滤器；已保存的过滤器不适用，也不会改变。请参阅[数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="only-headers" typ="bool">仅存储并保存数据包头，不保存有效载荷。数据包列表仍显示原始数据包大小。默认：否。</ArgTableRow>
<ArgTableRow arg="memory-limit" typ="num">捕获数据包所用内存，单位为 KiB（10..4294967295）。无法容纳的内容按 `memory-scroll` 的规定处理。默认：100KiB。</ArgTableRow>
<ArgTableRow arg="memory-scroll" typ="bool">达到 `memory-limit` 时发生的情况：`yes` 会用新数据包替换最旧的数据包，因此内存中保存最新数据包；`no` 会保留最先的数据包，不再存储更多数据包。默认：是。</ArgTableRow>
<ArgTableRow arg="file-name" typ="file">嗅探器运行期间将捕获的数据包写入的文件，格式为 pcapng。每次启动都会覆盖该文件。其他磁盘上的路径（例如 `usb1/capture.pcap`）会将文件写入该位置。为空（默认）时仅将数据包保留在内存中；之后可使用 [`save`](./save.md) 将其写入文件。</ArgTableRow>
<ArgTableRow arg="file-limit" typ="num">`file-name` 的大小限制，单位为 KiB（10..4294967295）。当文件达到该限制时，嗅探器停止写入该文件，但继续运行。默认：1000KiB。</ArgTableRow>
<ArgTableRow arg="streaming-enabled" typ="bool">将每个捕获的数据包通过 UDP 以 TZSP（版本 1、Ethernet 封装、整个帧）发送到 `streaming-server`，例如发送到 Wireshark。默认：否。</ArgTableRow>
<ArgTableRow arg="streaming-server" typ="composite { ip: ipAddr
, port: [ enum ()]
 }">TZSP 流的接收方：一个地址，或 `address:port`。未指定端口时，使用 37008。默认：0.0.0.0:37008。</ArgTableRow>
<ArgTableRow arg="max-packet-size" typ="num">最大数据包大小，单位为字节（2048..65536）。默认：2048。</ArgTableRow>
<ArgTableRow arg="filter-stream" typ="bool">为 `yes` 时，嗅探器不会捕获其流式传输到 `streaming-server` 的数据包，也不会捕获发往 `streaming-server` 地址及来自该地址的 ICMP 数据包，即使在流式传输关闭时也是如此。当嗅探朝向流接收方的接口时，请设置为 `yes`：为 `no` 时，流数据包会被捕获并再次流式传输，形成循环。默认：否。</ArgTableRow>
<ArgTableRow arg="filter-interface" typ="object { interface: iface_enum
 }">要嗅探的接口。为空（默认）时嗅探所有接口；此时经过网桥往返于路由器的数据包会在网桥上显示一次，并在网桥端口上再显示一次。</ArgTableRow>
<ArgTableRow arg="filter-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">最多 16 个 MAC 地址，或带掩码的 MAC 地址；当帧的源 MAC 地址或目的 MAC 地址匹配时，该帧即匹配。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-src-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">最多 16 个源 MAC 地址，或带掩码的 MAC 地址。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-dst-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">最多 16 个目的 MAC 地址，或带掩码的 MAC 地址。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-mac-protocol" typ="object { mac-protocol-element: super { !
, protocol: alt { mac-protocol: enum ()
, protocol-number: num [ .. 65535]
 }
 }
 }">最多 16 个 MAC（L2）协议，可通过 EtherType 编号（0..65535）或名称指定：`802.2` (0x0004), `arp` (0x0806), `capsman` (0x88BB), `dot1x` (0x888E), `homeplug-av` (0x88E1), `ip` (0x0800), `ipv6` (0x86DD), `ipx` (0x8137), `lacp` (0x8809), `lldp` (0x88CC), `loop-protect` (0x9003), `macsec` (0x88E5), `mpls-multicast` (0x8848), `mpls-unicast` (0x8847), `mvrp` (0x88F5), `packing-compr`, `packing-simple`, `pppoe` (0x8864), `pppoe-discovery` (0x8863), `rarp` (0x8035), `romon` (0x88BF), `service-vlan` (0x88A8), `vlan` (0x8100)。带 VLAN 标签的帧匹配的是标签内部的协议，而不是 `vlan`；使用 `filter-vlan` 选择 VLAN。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">最多 16 个 IPv4 地址或前缀；当数据包的源地址或目的地址匹配时，该数据包即匹配。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-src-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">最多 16 个源 IPv4 地址或前缀。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-dst-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">最多 16 个目的 IPv4 地址或前缀。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">最多 16 个 IPv6 前缀；当数据包的源地址或目的地址匹配时，该数据包即匹配。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-src-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">最多 16 个源 IPv6 前缀。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-dst-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">最多 16 个目的 IPv6 前缀。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-ip-protocol" typ="object { ip-protocol-element: super { !
, ip-protocol: enum ()
 }
 }">最多 16 个 IP 或 IPv6 协议，可通过编号或名称指定：`dccp`, `ddp`, `egp`, `encap`, `etherip`, `ggp`, `gre`, `hmp`, `icmp`, `icmpv6`, `idpr-cmtp`, `igmp`, `ipencap`, `ipip`, `ipsec-ah`, `ipsec-esp`, `ipv6-encap`, `ipv6-frag`, `ipv6-nonxt`, `ipv6-opts`, `ipv6-route`, `iso-tp4`, `l2tp`, `ospf`, `pim`, `pup`, `rdp`, `rspf`, `rsvp`, `sctp`, `st`, `tcp`, `udp`, `udp-lite`, `vmtp`, `vrrp`, `xns-idp`, `xtp`。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">最多 16 个端口，可通过编号或名称指定，例如 `ssh`、`dns`、`bootps`（67）或 `bootpc`（68）；当数据包的源端口或目的端口匹配时，该数据包即匹配。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-src-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">最多 16 个源端口，可通过编号或名称指定。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-dst-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">最多 16 个目的端口，可通过编号或名称指定。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-vlan" typ="object { cpu-element: super { !
, vlan: num [ .. 4095]
 }
 }">最多 16 个 VLAN ID（0..4095）。它匹配承载这些标签的接口（例如 trunk 端口）上的带标签帧；IP 和 MAC 过滤器匹配标签内部的数据包。在 VLAN 接口本身上，数据包不带标签，因此不会匹配。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-cpu" typ="object { cpu-element: super { !
, cpu: num
 }
 }">处理该数据包的 CPU 核心。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-size" typ="object { size-element: super { !
, size-range: range [0 .. 65535]
 }
 }">数据包大小或大小范围，单位为字节（0..65535），例如 `1000-1500`。在条目前面加上 `!` 可将其取反。为空（默认）表示不进行过滤。</ArgTableRow>
<ArgTableRow arg="filter-direction" typ="enum (any | tx | rx) { any:0, tx:1, rx:2 }">
要捕获的方向。
- `any`（默认）- 接收和发送的数据包。
- `rx` - 接收的数据包。它们在防火墙之前被捕获，因此被防火墙规则丢弃的数据包仍会被捕获。
- `tx` - 发送的数据包，在防火墙之后捕获。
</ArgTableRow>
<ArgTableRow arg="filter-operator-between-entries" typ="enum (or | and) { or:0, and:1 }">
一个过滤器的各个条目如何组合。不同过滤器始终组合：数据包必须匹配所有已设置的过滤器。
- `or`（默认）- 当数据包匹配过滤器中的任意一个条目时，该数据包即匹配该过滤器。
- `and` - 仅当数据包匹配过滤器中的所有条目（例如 `filter-ip-address=192.168.88.10/32,192.168.88.1/32` 中的两个地址）时，该数据包才匹配该过滤器。
</ArgTableRow>
<ArgTableRow arg="quick-rows" typ="num">当未指定 [`quick`](./quick.md) 的 `rows` 参数时，显示的报文数量。默认值：20。</ArgTableRow>
<ArgTableRow arg="quick-show-frame" typ="bool">当未指定 [`quick`](./quick.md) 的 `show-frame` 参数时，是否显示帧内容。默认值：no。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="running" typ="bool">嗅探器运行时为 `yes`。</ArgTableRow>
</ArgTable>
