---
sidebar_key: "cli-reference/tool/sniffer/quick"
sidebar_position: 5
title: "quick"
sidebar_label: 'quick'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/quick
captured_at: '2026-11-01T21:26:02+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer/quick {#toolsnifferquick}
**类型：** 命令

实时显示匹配的数据包，直到您使用 <kbd>Q</kbd> 停止它，或直到 `duration` 中指定的时间结束。过滤参数是 [`/tool/sniffer`](./index.md) 的 `filter-*` 设置去掉 `filter-` 前缀后的形式，以及用于 `filter-vlan` 的 `vlan-id`。不带过滤参数时，将应用已保存的过滤器；带过滤参数时，仅应用给定的过滤器，并且已保存的设置不会改变。当嗅探器运行时，`quick` 无法运行（`already running`）。`proplist` 用于选择列，例如 `proplist=interface,time,dir,src-address,dst-address,protocol,size`。请参阅[数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="rows" typ="num">输出中显示的数据包最大数量。默认值：`quick-rows` 设置（20）。</ArgTableRow>
<ArgTableRow arg="show-frame" typ="bool">是否在输出中显示原始帧内容。默认值：`quick-show-frame` 设置（no）。</ArgTableRow>
<ArgTableRow arg="interface" typ="object { interface: iface_enum
 }">要捕获流量的接口或接口列表。当桥接接口和桥接端口都包含在内时，桥接数据包会在桥上显示一次，并在桥接端口上显示一次。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">过滤：仅捕获具有匹配 MAC 地址或带掩码 MAC 地址的帧。</ArgTableRow>
<ArgTableRow arg="src-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">过滤：仅捕获具有匹配源 MAC 地址或带掩码 MAC 地址的帧。</ArgTableRow>
<ArgTableRow arg="dst-mac-address" typ="object { mac-address-element: super { !
, mac-address-with-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }
 }">过滤：仅捕获具有匹配目标 MAC 地址或带掩码 MAC 地址的帧。</ArgTableRow>
<ArgTableRow arg="mac-protocol" typ="object { mac-protocol-element: super { !
, protocol: alt { mac-protocol: enum ()
, protocol-number: num [ .. 65535]
 }
 }
 }">过滤：仅捕获具有匹配 MAC（L2）协议的帧。</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="object { ip-protocol-element: super { !
, ip-protocol: enum ()
 }
 }">过滤：仅捕获具有匹配 IP 协议的数据包。</ArgTableRow>
<ArgTableRow arg="ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">过滤：仅捕获具有匹配 IP 地址或子网的数据包。</ArgTableRow>
<ArgTableRow arg="src-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">过滤：仅捕获具有匹配源 IP 地址或子网的数据包。</ArgTableRow>
<ArgTableRow arg="dst-ip-address" typ="object { ip-address-element: super { !
, ip-address-with-mask: composite { ip: ipAddr
, mask: [ num [ .. 32]]
 }
 }
 }">过滤：仅捕获具有匹配目标 IP 地址或子网的数据包。</ArgTableRow>
<ArgTableRow arg="ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">过滤：仅捕获具有匹配 IPv6 地址或前缀的数据包。</ArgTableRow>
<ArgTableRow arg="src-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">过滤：仅捕获具有匹配源 IPv6 地址或前缀的数据包。</ArgTableRow>
<ArgTableRow arg="dst-ipv6-address" typ="object { ipv6-address-element: super { !
, ipv6-prefix: ip6Prefix
 }
 }">过滤：仅捕获具有匹配目标 IPv6 地址或前缀的数据包。</ArgTableRow>
<ArgTableRow arg="port" typ="object { port-element: super { !
, port: enum ()
 }
 }">过滤：仅捕获具有匹配源端口或目标端口的数据包。</ArgTableRow>
<ArgTableRow arg="src-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">过滤：仅捕获具有匹配源端口的数据包。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="object { port-element: super { !
, port: enum ()
 }
 }">过滤：仅捕获具有匹配目标端口的数据包。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="object { vlan-element: super { !
, vlan: num [ .. 4095]
 }
 }">过滤：仅捕获具有匹配 VLAN ID 的帧。</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (any | tx | rx) { any:0, tx:1, rx:2 }">
过滤：要捕获的方向。
- `any`（默认） - 接收和发送的数据包。
- `rx` - 接收的数据包。它们在防火墙之前被捕获，因此被防火墙规则丢弃的数据包仍会被捕获。
- `tx` - 发送的数据包，在防火墙之后捕获。
</ArgTableRow>
<ArgTableRow arg="operator-between-entries" typ="enum (or | and) { or:0, and:1 }">
一个过滤器的条目如何组合。
- `or`（默认） - 当数据包匹配过滤器的任一条目时，该数据包就匹配该过滤器。
- `and` - 只有当数据包匹配过滤器的所有条目时，该数据包才匹配该过滤器。
</ArgTableRow>
<ArgTableRow arg="cpu" typ="object { cpu-element: super { !
, cpu: num
 }
 }">过滤：仅捕获由指定 CPU 核心处理的数据包。</ArgTableRow>
<ArgTableRow arg="size" typ="object { size-element: super { !
, size-range: range [0 .. 65535]
 }
 }">过滤：仅捕获大小或大小范围（以字节为单位）匹配的数据包。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">捕获该数据包的接口。</ArgTableRow>
<ArgTableRow arg="time" typ="num">数据包相对于捕获开始时间的时间偏移，以秒为单位，精度为微秒。</ArgTableRow>
<ArgTableRow arg="num" typ="num">数据包序列号，第一个捕获的数据包从 0 开始。</ArgTableRow>
<ArgTableRow arg="dir" typ="enum (<- | ->) { <-:0, ->:1 }">数据包方向，`<-` 表示接收，`->` 表示发送。</ArgTableRow>
<ArgTableRow arg="src-mac" typ="macAddr">帧的源 MAC 地址，仅对具有 MAC 地址的接口显示，例如 Ethernet、WiFi、EoIP、VXLAN 或 VLAN。</ArgTableRow>
<ArgTableRow arg="dst-mac" typ="macAddr">帧的目标 MAC 地址，仅对具有 MAC 地址的接口显示，例如 Ethernet、WiFi、EoIP、VXLAN 或 VLAN。</ArgTableRow>
<ArgTableRow arg="vlan" typ="composite { id: num [ .. 4095]
, priority: num [ .. 7]
 }">帧的 VLAN 标签，显示为 `id:priority`。</ArgTableRow>
<ArgTableRow arg="src-address" typ="composite { address: alt { ip: ipAddr
, ipv6: ip6Addr
, descr: string
 }
, port: enum ()
 }">数据包的源 IP 地址和源端口，显示为 `address:port`。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="composite { address: alt { ip: ipAddr
, ipv6: ip6Addr
 }
, port: enum ()
 }">数据包的目标 IP 地址和目标端口，显示为 `address:port`。</ArgTableRow>
<ArgTableRow arg="protocol" typ="composite { mac-protocol: enum ()
, ip-protocol: enum (ip) { ip:0 }
 }">帧的 MAC（L2）协议及其 IP 协议，例如 `ip:icmp`。</ArgTableRow>
<ArgTableRow arg="size" typ="num">帧的总大小（以字节为单位），包括 L2 头。</ArgTableRow>
<ArgTableRow arg="cpu" typ="num">处理该数据包的 CPU 核心。</ArgTableRow>
<ArgTableRow arg="fp" typ="bool">数据包是否在快速路径中处理。</ArgTableRow>
<ArgTableRow arg="raw" typ="string">十六进制格式的原始帧内容，在启用 `show-frame` 参数时显示。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">IP 头的 DSCP（差异化服务代码点）字段。</ArgTableRow>
<ArgTableRow arg="ecn" typ="num">IP 头的 ECN（显式拥塞通知）字段。</ArgTableRow>
<ArgTableRow arg="fragment-offset" typ="num">IP 头的分片偏移字段。</ArgTableRow>
<ArgTableRow arg="identification" typ="num">IP 头的标识字段。</ArgTableRow>
<ArgTableRow arg="ip-header-size" typ="num">IP 头的大小（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="ip-packet-size" typ="num">IP 数据包的大小（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="tcp-flags" typ="super { tcp-flags: multi { array-id, flag: enum (fin | syn | rst | psh | ack | urg | ece | cwr) { fin:0, syn:1, rst:2, psh:3, ack:4, urg:5, ece:6, cwr:7 }
 }
 }">数据包的 TCP 标志：`fin`、`syn`、`rst`、`psh`、`ack`、`urg`、`ece` 或 `cwr`。</ArgTableRow>
<ArgTableRow arg="ttl" typ="num">IP 头的生存时间字段。</ArgTableRow>
</ArgTable>
