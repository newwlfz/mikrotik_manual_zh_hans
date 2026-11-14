---
sidebar_key: "cli-reference/tool/sniffer/packet"
sidebar_position: 3
title: "packet"
sidebar_label: 'packet'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/sniffer/packet
captured_at: '2026-11-01T21:25:59+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sniffer/packet {#toolsnifferpacket}
**类型：** 目录

上次运行 [`start`](./start.md) 捕获的数据包会保留在内存中，保留时间为嗅探器停止后 10 分钟，或直到下一次启动。`time` 以秒为单位计算从捕获开始经过的时间，并显示到微秒。参见[数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="time" typ="num">数据包相对于捕获开始的时间偏移，以秒为单位，精确到微秒。</ArgTableRow>
<ArgTableRow arg="num" typ="num">数据包序列号，第一个捕获的数据包从 0 开始。</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (rx | tx) { rx:0, tx:1 }">数据包相对于路由器的方向，`rx` 表示接收，`tx` 表示发送。</ArgTableRow>
<ArgTableRow arg="src-mac" typ="macAddr">帧的源 MAC 地址，仅对具有 MAC 地址的接口显示，例如 Ethernet、WiFi、EoIP、VXLAN 或 VLAN。</ArgTableRow>
<ArgTableRow arg="dst-mac" typ="macAddr">帧的目的 MAC 地址，仅对具有 MAC 地址的接口显示，例如 Ethernet、WiFi、EoIP、VXLAN 或 VLAN。</ArgTableRow>
<ArgTableRow arg="vlan" typ="object { vlan: composite { id: num
, prio: [ num]
 }
 }">帧的 VLAN 标签，显示为 `id:priority`。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">捕获数据包所在的接口。</ArgTableRow>
<ArgTableRow arg="src-address" typ="composite { address: alt { ip: ipAddr
, ipv6: ip6Addr
 }
, port: enum ()
 }">数据包的源 IP 地址和源端口，显示为 `address:port`。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="composite { address: alt { ip: ipAddr
, ipv6: ip6Addr
 }
, port: enum ()
 }">数据包的目的 IP 地址和目的端口，显示为 `address:port`。</ArgTableRow>
<ArgTableRow arg="protocol" typ="enum ()">帧的 MAC（L2）协议，例如 `ip`、`arp` 或 `ipv6`。</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="enum (ip) { ip:0 }">数据包的 IP 协议，例如 `icmp`、`tcp` 或 `udp`。</ArgTableRow>
<ArgTableRow arg="size" typ="num">帧总大小（以字节计），包括 L2 头。</ArgTableRow>
<ArgTableRow arg="cpu" typ="num">处理该数据包的 CPU 核心。</ArgTableRow>
<ArgTableRow arg="ip-packet-size" typ="num">IP 数据包的大小，以字节为单位。</ArgTableRow>
<ArgTableRow arg="ip-header-size" typ="num">IP 头的大小，以字节为单位。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">IP 头的 DSCP（区分服务代码点）字段。</ArgTableRow>
<ArgTableRow arg="ecn" typ="num">IP 头的 ECN（显式拥塞通知）字段。</ArgTableRow>
<ArgTableRow arg="identification" typ="num">IP 头的标识字段。</ArgTableRow>
<ArgTableRow arg="fragment-offset" typ="num">IP 头的分片偏移字段。</ArgTableRow>
<ArgTableRow arg="ttl" typ="num">IP 头的生存时间字段。</ArgTableRow>
<ArgTableRow arg="tcp-flags" typ="multi { array-id, flag: enum (fin | syn | rst | psh | ack | urg | ece | cwr) { fin:0, syn:1, rst:2, psh:3, ack:4, urg:5, ece:6, cwr:7 }
 }">数据包的 TCP 标志：`fin`、`syn`、`rst`、`psh`、`ack`、`urg`、`ece` 或 `cwr`。</ArgTableRow>
<ArgTableRow arg="data" typ="string">捕获数据包的内容，采用十六进制格式。</ArgTableRow>
</ArgTable>
