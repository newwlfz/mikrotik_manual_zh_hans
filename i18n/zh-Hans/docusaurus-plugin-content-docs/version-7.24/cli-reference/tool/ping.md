---
sidebar_key: "cli-reference/tool/ping"
sidebar_position: 15
title: "ping"
sidebar_label: "ping"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/ping
captured_at: '2026-11-01T21:30:19+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/ping {#toolping}
**类型：** 命令

完整文档请参阅 [Ping](../../diagnostics-monitoring-and-troubleshooting/ping.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="address (flags=46v%Dm)">目标主机的 IP 地址或 DNS 名称。请参阅 [address flags](../index.md#address-flags)</ArgTableRow>
<ArgTableRow arg="interval" typ="time">ICMP echo 请求之间的时间间隔</ArgTableRow>
<ArgTableRow arg="size" typ="num">ICMP 数据负载的大小，以字节为单位</ArgTableRow>
<ArgTableRow arg="ttl" typ="num">ICMP 数据包的 Time to Live 值</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">在 IP 头部中设置的 DSCP 值，用于 QoS 标记</ArgTableRow>
<ArgTableRow arg="do-not-fragment" typ="switch">在 IP 头部中设置 Don't Fragment 标志</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip-src-address: ipAddr
, ip6-src-address: ip6Addr
 }">用于 ICMP echo 请求的源 IP 地址</ArgTableRow>
<ArgTableRow arg="arp-ping" typ="bool">使用 ARP 请求代替 ICMP echo 来发现主机</ArgTableRow>
<ArgTableRow arg="count" typ="num">要发送的 ICMP echo 请求数量</ArgTableRow>
<ArgTableRow arg="nd-ping" typ="bool"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">发送 ping 所使用的接口</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">用于路由 ping 请求的 VRF 表</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="seq" typ="num">ping 响应的序列号</ArgTableRow>
<ArgTableRow arg="host" typ="alt { ipv6-address: ip6Addr
, mac-address: macAddr
, ip-address: ipAddr
 }">响应主机的 IP 或 MAC 地址</ArgTableRow>
<ArgTableRow arg="size" typ="num">接收到的 ICMP 数据包的大小，以字节为单位</ArgTableRow>
<ArgTableRow arg="ttl" typ="num">从接收到的数据包中获取的 Time to Live 值</ArgTableRow>
<ArgTableRow arg="time" typ="time">ping 探测的往返时间</ArgTableRow>
<ArgTableRow arg="status" typ="string">ping 响应的状态</ArgTableRow>
<ArgTableRow arg="sent" typ="num">已发送的 ICMP echo 请求总数</ArgTableRow>
<ArgTableRow arg="received" typ="num">已接收的 ICMP echo 应答总数</ArgTableRow>
<ArgTableRow arg="packet-loss" typ="num">丢包百分比</ArgTableRow>
<ArgTableRow arg="min-rtt" typ="time">测得的最小往返时间</ArgTableRow>
<ArgTableRow arg="avg-rtt" typ="time">测得的平均往返时间</ArgTableRow>
<ArgTableRow arg="max-rtt" typ="time">测得的最大往返时间</ArgTableRow>
</ArgTable>
