---
sidebar_key: "cli-reference/tool/traceroute"
sidebar_position: 24
title: "traceroute"
sidebar_label: 'traceroute'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/traceroute
captured_at: '2026-11-01T21:26:00+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traceroute {#tooltraceroute}
**类型：** 命令

跟踪到主机的路径：发送 TTL 逐渐增大的探测包，并列出做出应答的路由器，以及每一跳的丢包和往返统计信息。跟踪会每秒重复一次，直到你将其停止、完成 `count` 轮或 `duration` 结束。有关示例以及如何解读结果，请参阅 [跟踪路由](../../diagnostics-monitoring-and-troubleshooting/traceroute.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="address (flags=46viD)">目标的 IP 或 IPv6 地址，或 DNS 名称。名称由路由器的 DNS 解析器解析。请参阅[地址标志](../index.md#address-flags)。</ArgTableRow>
<ArgTableRow arg="port" typ="num">使用 `protocol=udp` 的探测包的目标 UDP 端口。每个探测包都使用同一端口。默认值：33434。</ArgTableRow>
<ArgTableRow arg="size" typ="num">每个探测包作为完整 IP 数据包的大小，以字节为单位，包括 IP 头。默认值：28，即不带负载的 IPv4 探测包。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">探测包 IP 头中设置的 DSCP 值。</ArgTableRow>
<ArgTableRow arg="do-not-fragment" typ="switch">在探测包的 IP 头中设置 Don't Fragment 标志。当 `size` 较大时，路径上链路较小的路由器会以 `fragmentation needed from <address>` 应答。</ArgTableRow>
<ArgTableRow arg="use-dns" typ="bool">显示各跳的主机名而不是其地址。名称通过路由器的 DNS 解析器以反向 DNS 查询进行查找；没有反向 DNS 记录的跳会保留其地址。默认值：no。</ArgTableRow>
<ArgTableRow arg="count" typ="num">要运行的轮数。未指定 `count` 时，跟踪会每秒重复一次，直到你将其停止。默认值：unlimited。</ArgTableRow>
<ArgTableRow arg="max-hops" typ="num">要尝试的最高 TTL：当目标不应答时，该轮会在经过这么多跳后结束。默认值：30。</ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (icmp | udp)">
探测包的类型。
- `icmp`（默认）- ICMP 回显请求。目标以回显应答进行应答。
- `udp` - 发往 `port` 的 UDP 数据报。目标以 ICMP 端口不可达消息进行应答。
</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ipv6-address: ip6Addr
, ip-address: ipAddr
 }">探测包的源地址。与源地址匹配的路由规则会应用于探测包。默认值：路由的 `pref-src`，否则为出接口的地址。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">每个探测包在发送下一个探测包之前等待其应答的时间。默认值：1s。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">探测包使用的路由表所属的 VRF。仅接受 VRF；为策略路由创建的路由表会被拒绝。默认值：main。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">发送探测包所使用的接口。当通过该接口没有覆盖目标的路由时，路由器会将目标视为直接连接在该接口上，并为其发送 ARP 请求。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="object { address: alt { name: string
, address: ip6Addr
 }
 }">为此跳做出应答的路由器的地址，或当 `use-dns=yes` 时为其主机名。当发往该跳的探测包均未得到应答时为空。</ArgTableRow>
<ArgTableRow arg="loss" typ="num">发往该跳的探测包中未得到应答的百分比。</ArgTableRow>
<ArgTableRow arg="sent" typ="num">发往该跳的探测包数量。</ArgTableRow>
<ArgTableRow arg="last" typ="num">来自该跳的最后一个应答的往返时间。当最后一个探测包未得到应答时，打印的表格会显示 `timeout`。</ArgTableRow>
<ArgTableRow arg="avg" typ="num">来自该跳的应答的平均往返时间。</ArgTableRow>
<ArgTableRow arg="best" typ="num">来自该跳的应答的最短往返时间。</ArgTableRow>
<ArgTableRow arg="worst" typ="num">来自该跳的应答的最长往返时间。</ArgTableRow>
<ArgTableRow arg="std-dev" typ="num">该跳往返时间的标准差：即各轮之间的变化程度。</ArgTableRow>
<ArgTableRow arg="status" typ="string">该跳以错误而不是 time exceeded 做出应答，例如 `network unreachable from 203.0.113.1`（无路由，或防火墙使用默认消息执行 `reject`）、`host unreachable from 203.0.113.1`、`packet filtered from 203.0.113.1`（防火墙以管理禁止为由拒绝探测包）或 `fragmentation needed from 203.0.113.6`（在 `do-not-fragment` 下，探测包大于下一链路的 MTU）。该轮会在这样的跳处结束。当该跳正常应答时为空。</ArgTableRow>
<ArgTableRow arg="error" typ="string"></ArgTableRow>
</ArgTable>
