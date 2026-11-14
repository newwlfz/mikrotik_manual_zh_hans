---
sidebar_key: "cli-reference/tool/traffic-generator/packet-template"
sidebar_position: 3
title: "packet-template"
sidebar_label: 'packet-template'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/packet-template
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/packet-template {#tooltraffic-generatorpacket-template}
**类型：** Directory
根据头部参数构建流的报文内容：MAC、VLAN、IPv4/IPv6、UDP 和 TCP 字段以及有效载荷。许多头部值在可以推导时会被假定；假定值为只读，并在编辑模板时重新推导。请参阅 [流量生成器](../../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">数据包模板的描述性名称。</ArgTableRow>
<ArgTableRow arg="header-stack" typ="multi { header: enum (mac | vlan | ip | udp | raw | ipv6 | tcp) { mac:1, vlan:2, ip:3, udp:4, raw:5, ipv6:6, tcp:7 }
 }">生成数据包中的头部序列：mac（Ethernet，14 字节）、vlan（802.1Q 标签，4 字节）、ip（IPv4，20 字节）、udp（UDP，8 字节）、raw（以十六进制字符串表示的任意字节）、ipv6（IPv6，40 字节）、tcp（TCP）。大多数头部类型可以出现多次；每个数据包最多可以有两个 IP 头部和一个 UDP 头部。序列限制遵循协议规则（例如，VLAN 头部只能跟在 mac 头部或其他 VLAN 头部之后）。</ArgTableRow>
<ArgTableRow arg="port" typ="enum">发送数据包所经由的端口名称（来自 port 菜单）。与 interface 互斥；port 也可以在 stream 中设置。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">发送数据包所经由的接口。与 port 互斥；便于快速测试，因为随后会动态创建 port 条目。</ArgTableRow>
<ArgTableRow arg="mac-src" typ="multi { array-id, array-id, mac-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }">Ethernet 头部的源 MAC 地址（可带掩码）。</ArgTableRow>
<ArgTableRow arg="mac-dst" typ="multi { array-id, array-id, mac-mask: composite { mac: macAddr
, mask: [ macAddr]
 }
 }">Ethernet 头部的目的 MAC 地址（可带掩码）。</ArgTableRow>
<ArgTableRow arg="mac-protocol" typ="multi { protocol: alt { protocol-name: enum ()
, protocol-number: num [ .. 65535]
 }
 }">Ethernet 帧的 EtherType，可按名称或协议号（0-65535）指定。</ArgTableRow>
<ArgTableRow arg="vlan-priority" typ="multi { priority: num [ .. 7]
 }">802.1Q 标签的 VLAN 优先级（0-7）。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="multi { id: num [ .. 4095]
 }">802.1Q 标签的 VLAN ID（0-4095）。</ArgTableRow>
<ArgTableRow arg="vlan-protocol" typ="multi { protocol: alt { protocol-name: enum ()
, protocol-number: num [ .. 65535]
 }
 }">VLAN 协议，可按名称或 EtherType 编号（0-65535）。</ArgTableRow>
<ArgTableRow arg="ip-dscp" typ="multi { dscp: num [ .. 255]
 }">IPv4 头部的 DS Field 值（0-255）（DS Field 包含 DSCP 和 ECN 值）。</ArgTableRow>
<ArgTableRow arg="ip-id" typ="multi { id: num [ .. 65535]
 }">IPv4 标识值（0-65535）。</ArgTableRow>
<ArgTableRow arg="ip-frag-off" typ="multi { frag-off: num [ .. 65535]
 }">IPv4 分片偏移量（0-65535）。</ArgTableRow>
<ArgTableRow arg="ip-ttl" typ="multi { ttl: num [ .. 255]
 }">IPv4 生存时间值（0-255）。</ArgTableRow>
<ArgTableRow arg="ip-src" typ="multi { array-id, array-id, ip-range: ipRange
 }">IPv4 头部的源 IPv4 地址，可带可选掩码。</ArgTableRow>
<ArgTableRow arg="ip-dst" typ="multi { array-id, array-id, ip-range: ipRange
 }">IPv4 头部的目的 IPv4 地址，可带可选掩码。</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="multi { protocol-name: enum ()
 }">IPv4 协议，例如 tcp、udp 或 icmp。</ArgTableRow>
<ArgTableRow arg="ip-gateway" typ="ipAddr">下一跳 IPv4 地址。当发送方与接收方为同一设备时，无法从 ip-dst 推导出下一跳；当设置了 ip-gateway 时，目的 MAC 由解析出的网关推断。</ArgTableRow>
<ArgTableRow arg="udp-src-port" typ="multi { array-id, array-id, port-range: range [ .. 65535]
 }">UDP 源端口或端口范围（0-65535）。</ArgTableRow>
<ArgTableRow arg="udp-dst-port" typ="multi { array-id, array-id, port-range: range [ .. 65535]
 }">UDP 目的端口或端口范围（0-65535）。</ArgTableRow>
<ArgTableRow arg="udp-checksum" typ="multi { array-id, checksum: num [ .. 65535]
 }">UDP 校验和值（0-65535）。</ArgTableRow>
<ArgTableRow arg="raw-header" typ="multi { raw-header: string
 }">以十六进制字符串表示的原始头部字节。</ArgTableRow>
<ArgTableRow arg="ipv6-src" typ="multi { array-id, array-id, ipv6-mask: ip6Prefix
 }">IPv6 头部的源 IPv6 地址，可带可选掩码。</ArgTableRow>
<ArgTableRow arg="ipv6-dst" typ="multi { array-id, array-id, ipv6-mask: ip6Prefix
 }">IPv6 头部的目的 IPv6 地址，可带可选掩码。</ArgTableRow>
<ArgTableRow arg="ipv6-next-header" typ="multi { protocol: enum ()
 }">IPv6 Next Header 协议。</ArgTableRow>
<ArgTableRow arg="ipv6-gateway" typ="ip6Addr">下一跳 IPv6 地址；目的 MAC 假定来自解析后的网关。</ArgTableRow>
<ArgTableRow arg="ipv6-traffic-class" typ="multi { traffic-class: num [ .. 255]
 }">IPv6 traffic class 值（0-255）。</ArgTableRow>
<ArgTableRow arg="ipv6-flow-label" typ="multi { flow-label: num [ .. 0xfffff]
 }">IPv6 flow label 值（0-1048575）。</ArgTableRow>
<ArgTableRow arg="ipv6-hop-limit" typ="multi { hop-limit: num [ .. 255]
 }">IPv6 hop limit 值（0-255）。</ArgTableRow>
<ArgTableRow arg="tcp-src-port" typ="multi { array-id, array-id, port-range: range [ .. 65535]
 }">TCP 源端口或端口范围（0-65535）。</ArgTableRow>
<ArgTableRow arg="tcp-dst-port" typ="multi { array-id, array-id, port-range: range [ .. 65535]
 }">TCP 目的端口或端口范围（0-65535）。</ArgTableRow>
<ArgTableRow arg="tcp-syn" typ="multi { array-id, array-id, syn-range: range
 }">TCP 序列号值，可以为范围。</ArgTableRow>
<ArgTableRow arg="tcp-ack" typ="multi { array-id, array-id, ack-range: range
 }">TCP 确认号值，可以是范围。</ArgTableRow>
<ArgTableRow arg="tcp-data-offset" typ="multi { data-offset: num [ .. 15]
 }">TCP 数据偏移（0-15，以 32 位字为单位）。</ArgTableRow>
<ArgTableRow arg="tcp-flags" typ="multi { flags: ubit (fin, syn, rst, psh, ack, urg, ece, cwr, ns, res0, res1, res2)
 }">要设置的 TCP 标志位：fin, syn, rst, psh, ack, urg, ece, cwr, ns, res0, res1, res2。</ArgTableRow>
<ArgTableRow arg="tcp-window-size" typ="multi { window-size: num [ .. 65535]
 }">TCP 窗口大小值（0-65535）。</ArgTableRow>
<ArgTableRow arg="tcp-urgent-pointer" typ="multi { urgent-pointer: num [ .. 65535]
 }">TCP 紧急指针值（0-65535）。</ArgTableRow>
<ArgTableRow arg="data" typ="enum (uninitialized | random | specific-byte | incrementing) { uninitialized:0, random:1, specific-byte:2, incrementing:3 }">数据包载荷（头部之后的部分）的填充方式：uninitialized（不置零；最快）、specific-byte（使用 data-byte 填充）、incrementing（字节 00 01 02 ...）、random（随机字节；最慢）。</ArgTableRow>
<ArgTableRow arg="data-byte" typ="num">当 data=specific-byte 时用于填充载荷的字节。</ArgTableRow>
<ArgTableRow arg="random-byte-offsets-and-masks" typ="multi { array-id, array-id, offset-and-mask: composite { offset: num [ .. 256]
, mask: num [ .. 255]
 }
 }">数据包中的字节偏移量，每个都带有一个位掩码，这些位置将被填入随机值。</ArgTableRow>
<ArgTableRow arg="random-ranges" typ="object { random-range: super { offset: num [ .. 256]
, [width] :enum (8 | 16 | 32) { 8:8, 16:16, 32:32 }
, [range] :range
 }
 }">位于给定字节偏移处的字段将被填入随机值：`width` 设置字段大小（8、16 或 32 位），`range` 设置取值范围。</ArgTableRow>
<ArgTableRow arg="special-footer" typ="bool">是否在生成的数据包后附加特殊尾部。</ArgTableRow>
<ArgTableRow arg="compute-checksum-from-offset" typ="num">计算 2 字节校验和的起始字节偏移量；例如 14 表示跳过以太网头。no-checksum 表示禁用校验和。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="assumed-port" typ="enum (none) { none:0xffffffff }">报文发送时所经过的假定端口；仅在设置了接口时推导得出。</ArgTableRow>
<ArgTableRow arg="assumed-interface" typ="iface_enum">报文发送时所经过的假定接口。</ArgTableRow>
<ArgTableRow arg="assumed-mac-src" typ="multi { mac: macAddr
 }">假定的源 MAC 地址（接口的 MAC 地址）。</ArgTableRow>
<ArgTableRow arg="assumed-mac-dst" typ="multi { mac: macAddr
 }">假定的目的 MAC 地址，由 ip-dst 推导得出，或通过解析 ip-gateway 推导得出。</ArgTableRow>
<ArgTableRow arg="assumed-mac-protocol" typ="multi { protocol: alt { protocol-name: enum ()
, protocol-number: num
 }
 }">假定的 EtherType，由头部栈推导得出（例如 ip）。</ArgTableRow>
<ArgTableRow arg="assumed-vlan-priority" typ="multi { priority: num
 }">假定的 802.1Q 标签 VLAN 优先级。</ArgTableRow>
<ArgTableRow arg="assumed-vlan-id" typ="multi { priority: num
 }">假定的 802.1Q 标签 VLAN ID。</ArgTableRow>
<ArgTableRow arg="assumed-vlan-protocol" typ="multi { protocol: alt { protocol-name: enum ()
, protocol-number: num
 }
 }">假定的 802.1Q 标签 VLAN 协议。</ArgTableRow>
<ArgTableRow arg="assumed-ip-dscp" typ="multi { dscp: num
 }">假定的 IPv4 DS 字段值。</ArgTableRow>
<ArgTableRow arg="assumed-ip-id" typ="multi { id: num
 }">假定的 IPv4 标识值。</ArgTableRow>
<ArgTableRow arg="assumed-ip-frag-off" typ="multi { frag-off: num
 }">假定的 IPv4 分片偏移。</ArgTableRow>
<ArgTableRow arg="assumed-ip-ttl" typ="multi { ttl: num
 }">假定的 IPv4 time-to-live 值（例如 64）。</ArgTableRow>
<ArgTableRow arg="assumed-ip-src" typ="multi { assumed-ip-src: ipAddr
 }">假定的源 IPv4 地址（接口的地址）。</ArgTableRow>
<ArgTableRow arg="assumed-ip-dst" typ="multi { assumed-ip-dst: ipAddr
 }">假定的目标 IPv4 地址。</ArgTableRow>
<ArgTableRow arg="assumed-ip-protocol" typ="multi { ip-protocol: enum ()
 }">假定的 IPv4 协议，由头部栈推导得出（例如 udp）。</ArgTableRow>
<ArgTableRow arg="assumed-udp-src-port" typ="multi { port: num
 }">假定的 UDP 源端口。</ArgTableRow>
<ArgTableRow arg="assumed-udp-dst-port" typ="multi { port: num
 }">假定的 UDP 目标端口。</ArgTableRow>
<ArgTableRow arg="assumed-udp-checksum" typ="multi { checksum: num
 }">假定的 UDP 校验和值。</ArgTableRow>
<ArgTableRow arg="assumed-raw-header" typ="multi { assumed-raw-header: string
 }">假定的原始头部字节，以十六进制字符串表示。</ArgTableRow>
<ArgTableRow arg="assumed-ipv6-src" typ="multi { ip: ip6Addr
 }">假定的源 IPv6 地址（接口的一个地址）。</ArgTableRow>
<ArgTableRow arg="assumed-ipv6-dst" typ="multi { ip: ip6Addr
 }">假定的目标 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="assumed-ipv6-next-header" typ="multi { ip-protocol: enum ()
 }">假定的 IPv6 下一报头协议。</ArgTableRow>
<ArgTableRow arg="assumed-ipv6-traffic-class" typ="multi { traffic-class: num
 }">假定的 IPv6 流量类别值。</ArgTableRow>
<ArgTableRow arg="assumed-ipv6-flow-label" typ="multi { flow-label: num
 }">假定的 IPv6 流标签值。</ArgTableRow>
<ArgTableRow arg="assumed-ipv6-hop-limit" typ="multi { hop-limit: num
 }">假定的 IPv6 跳数限制值。</ArgTableRow>
<ArgTableRow arg="assumed-tcp-src-port" typ="multi { port: num
 }">假定的 TCP 源端口。</ArgTableRow>
<ArgTableRow arg="assumed-tcp-dst-port" typ="multi { port: num
 }">假定的 TCP 目的端口。</ArgTableRow>
<ArgTableRow arg="assumed-tcp-syn" typ="multi { syn: num
 }">假定的 TCP 序列号。</ArgTableRow>
<ArgTableRow arg="assumed-tcp-ack" typ="multi { ack: num
 }">假定的 TCP 确认号。</ArgTableRow>
<ArgTableRow arg="assumed-tcp-data-offset" typ="multi { data-offset: num
 }">假定的 TCP 数据偏移量。</ArgTableRow>
<ArgTableRow arg="assumed-tcp-flags" typ="multi { flags: num
 }">假定的 TCP 标志。</ArgTableRow>
<ArgTableRow arg="assumed-tcp-window-size" typ="multi { window-size: num
 }">假定的 TCP 窗口大小。</ArgTableRow>
<ArgTableRow arg="assumed-tcp-urgent-pointer" typ="multi { urgent-pointer: num
 }">假定的 TCP 紧急指针值。</ArgTableRow>
</ArgTable>
