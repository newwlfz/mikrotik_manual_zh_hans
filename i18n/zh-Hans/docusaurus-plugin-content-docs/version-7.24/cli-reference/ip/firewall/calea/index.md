---
sidebar_key: "cli-reference/ip/firewall/calea/index"
sidebar_position: 1
title: "calea"
sidebar_label: "calea"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/firewall/calea
captured_at: '2026-11-01T21:28:32+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/firewall/calea {#ipfirewallcalea}
**类型：** 目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="filter" typ="alt { all: enum (all) { all:0 }
, static: enum (static | dynamic)
, chain: enum (prerouting | input | forward | output | postrouting) { prerouting:1, input:2, forward:3, output:4, postrouting:5 }
 }">calea 规则的过滤配置。</ArgTableRow>
<ArgTableRow arg="chain" typ="enum (prerouting | input | forward | output | postrouting) { prerouting:1, input:2, forward:3, output:4, postrouting:5 }" mandatory="1">指定规则将添加到哪个链。如果输入与已定义链的名称不匹配，则会创建一个新链。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (sniff | sniff-pc) { sniff:7, sniff-pc:8 }">
当数据包与该规则匹配时要执行的操作：
- `sniff` - 嗅探该数据包。
- `sniff-pc` - 嗅探该数据包并将其发送到指定的 Packet Capturer 目标。
</ArgTableRow>
<ArgTableRow arg="sniff-target" typ="ipAddr">将嗅探到的数据包发送到的 IP 地址。</ArgTableRow>
<ArgTableRow arg="sniff-target-port" typ="num">将嗅探到的数据包发送到的端口。</ArgTableRow>
<ArgTableRow arg="sniff-id" typ="num">嗅探会话的 ID。</ArgTableRow>
<ArgTableRow arg="tls-host" typ="super { !
, tls-host: string
 }">基于 TLS SNI 主机名匹配 HTTPS 流量。接受 GLOB 语法进行通配符匹配。如果 TLS 握手帧被分片为多个 TCP 段，匹配器将无法匹配主机名。</ArgTableRow>
<ArgTableRow arg="connection-limit" typ="super { !
, limit: num
, [netmask] ,num
 }">达到给定值后按地址或地址块匹配连接。应将其与 `connection-state=new` 和/或 `tcp-flags=syn` 一起使用，因为该匹配器非常消耗资源。</ArgTableRow>
<ArgTableRow arg="layer7-protocol" typ="super { !
, protocol: enum
 }">在 layer7 protocol 菜单中定义的 Layer7 过滤器名称。</ArgTableRow>
<ArgTableRow arg="realm" typ="super { !
, realm: num
 }">匹配路由 realm。仅限 IPv4。</ArgTableRow>
<ArgTableRow arg="protocol" typ="super { !
, protocol: enum ()
 }">匹配由协议名称或编号指定的特定 IP 协议。</ArgTableRow>
<ArgTableRow arg="src-address" typ="super { !
, range: ipRange
 }">匹配源等于指定 IP 或落在指定 IP 范围内的数据包。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, range: ipRange
 }">匹配目标等于指定 IP 或落在指定 IP 范围内的数据包。</ArgTableRow>
<ArgTableRow arg="fragment" typ="super { fragment: bool
 }">匹配分片数据包。第一个（起始）分片不计入。如果启用了连接跟踪，则不会有分片，因为系统会自动组装每个数据包。仅限 IPv4。</ArgTableRow>
<ArgTableRow arg="psd" typ="super { weight-threshold: num
, [delay-threshold] ,time
, [low-port-weight] ,num
, [high-port-weight] ,num
 }">
尝试检测 TCP 和 UDP 扫描。参数采用以下格式：`WeightThreshold, DelayThreshold, LowPortWeight, HighPortWeight`。
- `WeightThreshold` - 来自同一主机、具有不同目标端口的最新 TCP/UDP 数据包的总权重，达到该值即被视为端口扫描序列。
- `DelayThreshold` - 来自同一主机、具有不同目标端口的数据包被视为可能端口扫描子序列的延迟。
- `LowPortWeight` - 具有特权目标端口（&lt;1024）的数据包的权重。
- `HighPortWeight` - 具有非特权目标端口的数据包的权重。仅限 IPv4。
</ArgTableRow>
<ArgTableRow arg="ipv4-options" typ="super { options: enum (strict-source-routing | loose-source-routing | no-source-routing | record-route | no-record-route | timestamp | no-timestamp | router-alert | no-router-alert | any | none) { strict-source-routing:0x1, loose-source-routing:0x2, no-source-routing:0x4, record-route:0x8, no-record-route:0x10, timestamp:0x20, no-timestamp:0x40, router-alert:0x80, no-router-alert:0x100, any:0x200, none:0x400 }
 }">
匹配 IPv4 首部选项。
- `any` - 匹配至少包含一个 IPv4 选项的数据包。
- `loose-source-routing` - 匹配带有松散源路由选项的数据包。
- `no-record-route` - 匹配不带记录路由选项的数据包。
- `no-router-alert` - 匹配不带路由器警报选项的数据包。
- `no-source-routing` - 匹配不带源路由选项的数据包。
- `no-timestamp` - 匹配不带时间戳选项的数据包。
- `record-route` - 匹配带有记录路由选项的数据包。
- `router-alert` - 匹配带有路由器警报选项的数据包。
- `strict-source-routing` - 匹配带有严格源路由选项的数据包。
- `timestamp` - 匹配带有时间戳的数据包。仅限 IPv4。
</ArgTableRow>
<ArgTableRow arg="src-address-type" typ="super { !
, type: ubit (unicast, local, broadcast, multicast, blackhole)
 }">
匹配源地址类型：
- `unicast` - 用于点对点传输的 IP 地址。
- `local` - 该地址分配给路由器的某个接口。
- `broadcast` - 数据包被发送到子网中的所有设备。
- `multicast` - 数据包被转发到定义的设备组。
</ArgTableRow>
<ArgTableRow arg="dst-address-type" typ="super { !
, type: ubit (unicast, local, broadcast, multicast, blackhole)
 }">
匹配目标地址类型：
- `unicast` - 用于点对点传输的 IP 地址。
- `local` - 目标地址分配给路由器的某个接口。
- `broadcast` - 数据包被发送到子网中的所有设备。
- `multicast` - 数据包被转发到定义的设备组。
</ArgTableRow>
<ArgTableRow arg="src-address-list" typ="super { !
, address-list: enum
 }">将数据包的源地址与用户定义的地址列表进行匹配。仅支持一个列表。</ArgTableRow>
<ArgTableRow arg="dst-address-list" typ="super { !
, address-list: enum
 }">将数据包的目标地址与用户定义的地址列表进行匹配。仅支持一个列表。</ArgTableRow>
<ArgTableRow arg="hotspot" typ="multi { array-id, array-id, flag: super { !
, flag: enum (from-client | auth | local-dst | to-client | http) { from-client:0, auth:1, local-dst:2, to-client:3, http:4 }
 }
 }">
将来自 HotSpot 客户端的数据包与各种 HotSpot 匹配器进行匹配。
- `auth` - 匹配经过认证的 HotSpot 客户端数据包。
- `from-client` - 匹配来自 HotSpot 客户端的数据包。
- `http` - 匹配发送到 HotSpot 服务器的 HTTP 请求。
- `local-dst` - 匹配发往 HotSpot 服务器的数据包。
- `to-client` - 匹配发送到 HotSpot 客户端的数据包。仅限 IPv4。
</ArgTableRow>
<ArgTableRow arg="address-list" typ="enum ()">要使用的地址列表名称。当动作为 `add-dst-to-address-list` 或 `add-src-to-address-list` 时适用。</ArgTableRow>
<ArgTableRow arg="address-list-timeout" typ="alt { address-list-timeout: enum (none-dynamic | none-static) { none-dynamic:0, none-static:0xffffffff }
, address-list-timeout: time [ .. 21474836]
 }">
经过该时间间隔后，地址将从 `address-list` 参数指定的地址列表中移除。与 `add-dst-to-address-list` 或 `add-src-to-address-list` 动作一起使用。
- `none-dynamic` (`00:00:00`) 会将地址保留在地址列表中直到重启。
- `none-static` 会将地址永久保留在地址列表中，并会包含在配置导出/备份中。
</ArgTableRow>
<ArgTableRow arg="ttl" typ="super { mode: enum (equal | not-equal | less-than | greater-than) { equal:0, not-equal:1, less-than:2, greater-than:3 }
, [value] :num [0 .. 255]
 }">匹配数据包的 TTL 值。仅限 IPv4。</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 设施使用特定连接标记标记的数据包。如果设置了 `no-mark`，该规则将匹配任何未标记的连接。</ArgTableRow>
<ArgTableRow arg="connection-type" typ="super { !
, type: enum (ftp | pptp | h323 | sip | irc | quake3 | tftp) { ftp:0, pptp:1, h323:2, sip:3, irc:4, quake3:5, tftp:6 }
 }">根据连接跟踪 helper 的信息匹配来自相关连接的数据包。必须在 `/ip/firewall/service-port` 下启用相关的连接 helper。</ArgTableRow>
<ArgTableRow arg="connection-bytes" typ="super { from: num
, [to] -num
 }">仅当通过特定连接传输了给定数量的字节时才匹配数据包。0 表示无限，例如 `connection-bytes=2000000-0` 表示如果通过相关连接传输了超过 2MB 的数据，则规则匹配。</ArgTableRow>
<ArgTableRow arg="connection-rate" typ="super { !
, from: num
, [to] -num
 }">允许基于连接的当前速度捕获流量。</ArgTableRow>
<ArgTableRow arg="routing-mark" typ="super { !
, mark: enum ()
 }">匹配由 mangle 设施使用特定路由标记标记的数据包。</ArgTableRow>
<ArgTableRow arg="in-interface" typ="super { !
, interface: iface_enum
 }">数据包进入路由器时所使用的接口。</ArgTableRow>
<ArgTableRow arg="out-interface" typ="super { !
, interface: iface_enum
 }">数据包离开路由器时所使用的接口。</ArgTableRow>
<ArgTableRow arg="in-interface-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。作用与 `in-interface` 相同。</ArgTableRow>
<ArgTableRow arg="out-interface-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。作用与 `out-interface` 相同。</ArgTableRow>
<ArgTableRow arg="in-bridge-port" typ="super { !
, interface: iface_enum
 }">如果传入接口是网桥，则为数据包进入路由器时实际使用的接口。仅在桥接设置中启用了 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="out-bridge-port" typ="super { !
, interface: iface_enum
 }">如果传出接口是网桥，则为数据包离开路由器时实际使用的接口。仅在桥接设置中启用了 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="in-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。作用与 `in-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="out-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。作用与 `out-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="packet-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 设施使用特定数据包标记标记的数据包。如果设置了 `no-mark`，该规则将匹配任何未标记的数据包。</ArgTableRow>
<ArgTableRow arg="src-port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">源端口和源端口范围列表。仅当协议为 TCP 或 UDP 时适用。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">目标端口号或端口号范围列表。</ArgTableRow>
<ArgTableRow arg="port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">如果任一（源或目标）端口匹配指定的端口或端口范围列表，则匹配。仅当 `protocol` 为 TCP 或 UDP 时适用。</ArgTableRow>
<ArgTableRow arg="icmp-options" typ="super { !
, type: num [0 .. 255]
, [code] [ :range [ .. 255]]
 }">匹配 ICMP type:code 字段。</ArgTableRow>
<ArgTableRow arg="src-mac-address" typ="super { !
, address: macAddr
 }">匹配数据包的源 MAC 地址。</ArgTableRow>
<ArgTableRow arg="content" typ="super { !
, content: string
 }">匹配包含指定文本的数据包。</ArgTableRow>
<ArgTableRow arg="ingress-priority" typ="super { !
, ingress-priority: num [0 .. 63]
 }">匹配入口数据包的优先级。优先级可能来自 VLAN、WMM、DSCP 或 MPLS EXP 位。</ArgTableRow>
<ArgTableRow arg="priority" typ="super { !
, priority: num [0 .. 63]
 }">匹配设置新优先级后数据包的优先级。优先级可能来自 VLAN、WMM、DSCP、MPLS EXP 位，或来自使用 set-priority 动作设置的优先级。</ArgTableRow>
<ArgTableRow arg="dscp" typ="super { !
, dscp: num [0 .. 63]
 }">匹配 DSCP IP 首部字段。</ArgTableRow>
<ArgTableRow arg="tos" typ="super { !
, tos: num [0 .. 255]
, [mask] [ /num [0 .. 255]]
 }"></ArgTableRow>
<ArgTableRow arg="limit" typ="super { !
, count: num [1 .. 32000000000]
, [time] [ /time [1 .. ]]
, [burst] ,num [ .. 2000000000]
, [mode] [ :enum (packet | bit) { packet:0, bit:1 }]
 }">
匹配数据包，直到达到有限速率（数据包速率或比特速率）。带有此匹配器的规则将一直匹配，直到达到该限制。参数采用以下格式：`rate[/time],burst:mode`。
- `rate` - 每个时间间隔要匹配的数据包数或比特数。
- `time` - 指定不能超过数据包或比特速率的时间间隔（可选，如果未指定则使用 1s）。
- `burst` - 要匹配的初始数据包数或比特数：该数字每 10ms 补充一次，因此 burst 应至少为每秒速率的 1/100。
-  `mode` - 数据包或比特模式。
</ArgTableRow>
<ArgTableRow arg="dst-limit" typ="super { count: num
, [time] [ /time]
, [burst] ,num
, [mode] ,enum (dst-address | dst-address-and-port | src-address | src-and-dst-addresses | addresses-and-dst-port) { dst-address:1, dst-address-and-port:3, src-address:4, src-and-dst-addresses:5, addresses-and-dst-port:7 }
, [expire] [ /time]
 }">
匹配数据包，直到超过给定速率。速率定义为每个时间间隔的数据包数。与 `limit` 匹配器不同，每个流都有自己的限制。流由 mode 参数定义。参数采用以下格式：`rate[/time],burst,mode[/expire]`。
- `rate` - 每个流每个时间间隔要匹配的数据包数。
- `time` - 指定每个流的数据包计数速率不能超过的时间间隔（可选，如果未指定则使用 1s）。
- `burst` - 每个流要匹配的初始数据包数：该数字每 time/rate 增加一，直到达到此数字。
- `mode` - 指定哪些唯一字段定义流（src-address、dst-address、src-and-dst-address、dst-address-and-port、addresses-and-dst-port）。
- `expire` - 指定无数据包的流在多长时间后允许被删除（可选）。
</ArgTableRow>
<ArgTableRow arg="time" typ="super { !
, start: time [0 .. 86400]
, [end] -time [0 .. 86400]
, [day] ,ubit (sun, mon, tue, wed, thu, fri, sat)
 }">根据数据包的到达时间和日期创建过滤器；对于本地生成的数据包，则根据离开时间和日期创建。该匹配器会考虑路由器上配置的时间和时区。</ArgTableRow>
<ArgTableRow arg="random" typ="super { percent: num [1 .. 99]
 }">以给定概率随机匹配数据包。</ArgTableRow>
<ArgTableRow arg="nth" typ="super { !
, every: num [1 .. ]
, [packet] [ ,num [1 .. ]]
 }">匹配每第 n 个数据包：`nth=2,1` 将匹配每 2 个数据包中的第一个，因此会匹配规则所匹配全部流量的 50%。</ArgTableRow>
<ArgTableRow arg="tcp-mss" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">匹配 IP 数据包的 TCP MSS 值。</ArgTableRow>
<ArgTableRow arg="per-connection-classifier" typ="super { !
, values-to-hash: enum (src-address | dst-address | both-addresses | src-port | src-address-and-port | dst-port | dst-address-and-port | both-ports | both-addresses-and-ports) { src-address:1, dst-address:2, both-addresses:3, src-port:4, src-address-and-port:5, dst-port:8, dst-address-and-port:10, both-ports:12, both-addresses-and-ports:15 }
, [denominator] :num [1 .. ]
, [remainder] /num [0 .. ]
 }">PCC 匹配器允许将流量划分为相等的流，并能够将具有特定选项集的数据包保留在某个特定流中。</ArgTableRow>
<ArgTableRow arg="packet-size" typ="super { !
, min: num [ .. 65535]
, [max] -num [ .. 65535]
 }">匹配指定大小或大小范围（以字节为单位）的数据包。</ArgTableRow>
<ArgTableRow arg="log" typ="bool">向系统日志添加一条消息，其中包含以下数据：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。即使动作不是 `log`，也允许记录数据包，这对于调试防火墙很有用。</ArgTableRow>
<ArgTableRow arg="log-prefix" typ="string">在每条日志消息的开头添加指定文本。当配置了 `action=log` 或 `log=yes` 时适用。</ArgTableRow>
<ArgTableRow arg="ipsec-policy" typ="super { direction: enum (in | out) { in:0, out:1 }
, [policy] ,enum (none | ipsec) { none:0, ipsec:1 }
 }">
匹配 IPsec 使用的策略。值采用以下格式：`direction, policy`。
- `in` - 在 PREROUTING、INPUT 和 FORWARD 链中有效。
- `out` - 在 POSTROUTING、OUTPUT 和 FORWARD 链中有效。
- `ipsec` - 如果数据包需要经过 IPsec 处理，则匹配。
- `none` - 匹配不经过 IPsec 处理的数据包。
</ArgTableRow>
</ArgTable>
