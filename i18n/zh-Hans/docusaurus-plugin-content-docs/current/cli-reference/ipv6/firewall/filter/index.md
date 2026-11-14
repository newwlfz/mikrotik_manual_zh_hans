---
sidebar_key: "cli-reference/ipv6/firewall/filter"
title: "filter"
sidebar_label: 'filter'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/firewall/filter
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/firewall/filter {#ipv6firewallfilter}
**类型：** 目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="chain" typ="enum" mandatory="1">指定规则将添加到哪个链。如果输入与已定义链的名称不匹配，将创建新链。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (accept | jump | return | log | passthrough | add-src-to-address-list | add-dst-to-address-list | drop | reject | fasttrack-connection) { accept:0, jump:1, return:2, log:3, passthrough:4, add-src-to-address-list:5, add-dst-to-address-list:6, drop:10, reject:11, fasttrack-connection:45 }">如果数据包匹配该规则，则执行的动作：`accept` - 接受数据包。数据包不会传递给下一条防火墙规则。  `add-dst-to-address-list` - 将目标地址添加到由 `address-list` 参数指定的地址列表。  `add-src-to-address-list` - 将源地址添加到由 `address-list` 参数指定的地址列表。  `drop` - 丢弃数据包。  `fasttrack-connection` - 对连接进行 fasttrack。  `jump` - 跳转到由 `jump-target` 参数值指定的用户定义链。  `log` - 向系统日志添加一条消息，其中包含以下数据：in-interface、out-interface、src-mac、protocol、src-ip:port->dst-ip:port 以及数据包长度。数据包匹配后，会传递给列表中的下一条规则，类似于 `passthrough`。  `passthrough` - 如果数据包匹配该规则，则增加计数器并转到下一条规则（用于统计很有用）。  `reject` - 拒绝数据包并发送 ICMP 响应。  `return` - 将控制权返回到发生跳转的链。</ArgTableRow>
<ArgTableRow arg="jump-target" typ="enum ()">要跳转到的目标链名称。仅当 `action=jump` 时适用。</ArgTableRow>
<ArgTableRow arg="reject-with" typ="enum (icmp-no-route | icmp-admin-prohibited | icmp-not-neighbour | icmp-address-unreachable | icmp-port-unreachable | tcp-reset | icmp-err-src-routing-header | icmp-headers-too-long) { icmp-no-route:0, icmp-admin-prohibited:1, icmp-not-neighbour:2, icmp-address-unreachable:3, icmp-port-unreachable:4, tcp-reset:6, icmp-err-src-routing-header:7, icmp-headers-too-long:8 }">
指定在数据包被拒绝时要发回的 [ICMP 错误](https://www.iana.org/assignments/icmpv6-parameters/icmpv6-parameters.xhtml#icmpv6-parameters-codes-2)。适用于 `action=reject`。

- `icmp-no-route` - 发送 ICMP 地址无路由消息。ICMP 类型 1，代码 0
- `icmp-admin-prohibited` - 发送 ICMP 地址被禁止消息。ICMP 类型 1，代码 1
- `icmp-not-neighbour` - 发送 ICMP 地址非成员消息。ICMP 类型 1，代码 2
- `icmp-address-unreachable` - 发送 ICMP 地址不可达消息。ICMP 类型 1，代码 3
- `icmp-port-unreachable` - 发送 ICMP 端口不可达消息。ICMP 类型 1，代码 4
- `tcp-reset` - 发送重置 TCP 连接的 ICMP 消息。ICMP 类型 1，代码 6
- `icmp-err-src-routing-header` - 发送源路由报头中的 ICMP 错误消息。ICMP 类型 1，代码 7
- `icmp-headers-too-long` - 发送 ICMP 报头过长消息。ICMP 类型 1，代码 8
</ArgTableRow>
<ArgTableRow arg="connection-nat-state" typ="super { !
, state: ubit (srcnat, dstnat)
 }">匹配经过源 NAT、目标 NAT 或两者都经过的连接。</ArgTableRow>
<ArgTableRow arg="tls-host" typ="super { !
, tls-host: string
 }">基于 TLS SNI 主机名匹配 HTTPS 流量。接受 GLOB 语法进行通配符匹配。如果 TLS 握手帧被分片到多个 TCP 段中，匹配器将无法匹配主机名。</ArgTableRow>
<ArgTableRow arg="connection-state" typ="super { !
, state: ubit (invalid, established, related, new, untracked)
 }">解释特定数据包的连接跟踪分析数据：`established` - 属于现有连接的数据包。  `invalid` - 在连接跟踪中没有确定状态的数据包（通常是严重乱序的数据包、序列号/确认号错误的数据包，或路由器资源过度使用的情况）。无效数据包不会参与 NAT，并且在路由时仍包含原始源 IP 地址。应丢弃防火墙 filter 的 forward 和 input 链中所有 `connection-state=invalid` 数据包。  `new` - 该数据包已开始新连接，或者以其他方式关联到尚未在两个方向上都看到数据包的连接。  `related` - 与现有连接相关但不属于该连接的数据包，例如 ICMP 错误或开始 FTP 数据连接的数据包。  `untracked` - 在防火墙 RAW 表中被设置为绕过连接跟踪的数据包。</ArgTableRow>
<ArgTableRow arg="connection-limit" typ="super { !
, limit: num
, [prefix-len] ,num [0 .. 128]
 }">在达到给定值后，按地址或地址块匹配连接数。应将此匹配器与 `connection-state=new` 和/或 `tcp-flags=syn` 一起使用，因为该匹配器非常消耗资源。</ArgTableRow>
<ArgTableRow arg="protocol" typ="super { !
, protocol: enum (icmpv6) { icmpv6:58 }
 }">匹配由协议名称或编号指定的特定 IP 协议。</ArgTableRow>
<ArgTableRow arg="src-address" typ="super { !
, address: ip6Prefix
 }">匹配源等于指定 IP 或属于指定 IP 范围的数据包。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, address: ip6Prefix
 }">匹配目标等于指定 IP 或属于指定 IP 范围的数据包。</ArgTableRow>
<ArgTableRow arg="src-address-list" typ="super { !
, address-list: enum
 }">将数据包的源地址与用户定义的地址列表进行匹配。仅支持一个列表。</ArgTableRow>
<ArgTableRow arg="dst-address-list" typ="super { !
, address-list: enum
 }">将数据包的目标地址与用户定义的地址列表进行匹配。仅支持一个列表。</ArgTableRow>
<ArgTableRow arg="address-list" typ="enum ()">要使用的地址列表名称。如果动作为 `add-dst-to-address-list` 或 `add-src-to-address-list`，则适用。</ArgTableRow>
<ArgTableRow arg="address-list-timeout" typ="alt { address-list-timeout: enum (none-dynamic | none-static) { none-dynamic:0, none-static:0xffffffff }
, address-list-timeout: time [ .. 21474836]
 }">
在 `add-src-to-address-list` 或 `add-dst-to-address-list` 动作添加地址后，该地址在 `address-list` 中保留多长时间。指定时间时，规则会添加一个动态条目（`D`），路由器会在时间结束后将其移除；规则每次新的匹配都会将时间重置为其完整值。最大值为 `35w3d13h13m56s`。如果地址已经是列表中的静态条目，则保持静态。
- `none-dynamic` (`0s`) - 添加一个不带超时的动态条目。它不会保存到配置中，重启后会清除。
- `none-static` - 添加一个静态条目。它会保存到配置和导出中，并且在重启后仍会保留，直到你将其移除。
</ArgTableRow>
<ArgTableRow arg="src-address-type" typ="super { !
, type: ubit (unicast, local, anycast, multicast, unreachable)
 }">匹配源地址类型：`unicast` - 用于点对点传输的 IP 地址。  `local` - 该地址分配给路由器的某个接口。  `anycast` - 发送到组中最近节点的数据包。  `multicast` - 数据包转发到已定义的设备组。  `unreachable` - 地址不可达。</ArgTableRow>
<ArgTableRow arg="dst-address-type" typ="super { !
, type: ubit (unicast, local, anycast, multicast, unreachable)
 }">匹配目标地址类型：`unicast` - 用于点对点传输的 IP 地址。  `local` - 目标地址分配给路由器的某个接口。  `anycast` - 发送到组中最近节点的数据包。  `multicast` - 数据包转发到已定义的设备组。  `unreachable` - 地址不可达。</ArgTableRow>
<ArgTableRow arg="headers" typ="super { !
, type: ubit (hop, dst, route, frag, ah, esp, none, proto)
, [mode] [ :enum (exact | contains) { exact:0, contains:1 }]
 }">匹配 IPv6 next-header。可通过 `mode` 参数控制两种报头匹配类型：`contains` - 软匹配，至少匹配选定的报头。  `exact` - 匹配选定报头的精确集合。</ArgTableRow>
<ArgTableRow arg="tcp-flags" typ="super { !,
, flags: multi { array-id, array-id, flag: super { !
, flag: enum (fin | syn | rst | psh | ack | urg | ece | cwr) { fin:0, syn:1, rst:2, psh:3, ack:4, urg:5, ece:6, cwr:7 }
 }
 }
 }">匹配指定的 TCP 标志：`ack` - 确认数据。  `cwr` - 拥塞窗口已减小。  `ece` - ECN-echo 标志（显式拥塞通知）。  `fin` - 关闭连接。  `psh` - 推送功能。  `rst` - 重置连接。  `syn` - 新连接。  `urg` - 紧急数据。</ArgTableRow>
<ArgTableRow arg="hop-limit" typ="super { mode: enum (equal | not-equal | less-than | greater-than) { equal:0, not-equal:1, less-than:2, greater-than:3 }
, [value] :num [0 .. 255]
 }">匹配 IPv6 报头中的跳数限制字段。</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能使用特定连接标记标记的数据包。如果设置了 `no-mark`，该规则将匹配任何未标记的连接。</ArgTableRow>
<ArgTableRow arg="connection-type" typ="super { !
, type: enum (ftp | pptp | h323 | sip | irc | quake3 | tftp) { ftp:0, pptp:1, h323:2, sip:3, irc:4, quake3:5, tftp:6 }
 }">根据连接跟踪 helper 的信息匹配来自相关连接的数据包。必须在 `/ip/firewall/service-port` 下启用相关的连接 helper。</ArgTableRow>
<ArgTableRow arg="connection-bytes" typ="super { from: num
, [to] -num
 }">仅当通过特定连接传输了给定数量的字节时才匹配数据包。0 表示无限，例如 `connection-bytes=2000000-0` 表示如果通过相关连接传输了超过 2MB，则规则匹配。</ArgTableRow>
<ArgTableRow arg="connection-rate" typ="super { !
, from: num
, [to] -num
 }">允许根据连接的当前速度捕获流量。</ArgTableRow>
<ArgTableRow arg="routing-mark" typ="super { !
, mark: enum ()
 }">匹配由 mangle 功能使用特定路由标记标记的数据包。</ArgTableRow>
<ArgTableRow arg="in-interface" typ="super { !
, interface: iface_enum
 }">数据包进入路由器时所经过的接口。</ArgTableRow>
<ArgTableRow arg="out-interface" typ="super { !
, interface: iface_enum
 }">数据包离开路由器时所经过的接口。</ArgTableRow>
<ArgTableRow arg="in-interface-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。作用与 `in-interface` 相同。</ArgTableRow>
<ArgTableRow arg="out-interface-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。作用与 `out-interface` 相同。</ArgTableRow>
<ArgTableRow arg="in-bridge-port" typ="super { !
, interface: iface_enum
 }">如果入接口是网桥，则为数据包进入路由器时实际经过的接口。仅当在网桥设置中启用 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="out-bridge-port" typ="super { !
, interface: iface_enum
 }">如果出接口是网桥，则为数据包离开路由器时实际经过的接口。仅当在网桥设置中启用 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="in-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。作用与 `in-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="out-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。作用与 `out-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="packet-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能使用特定数据包标记标记的数据包。如果设置了 `no-mark`，该规则将匹配任何未标记的数据包。</ArgTableRow>
<ArgTableRow arg="src-port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">源端口和源端口范围的列表。仅当协议为 TCP 或 UDP 时适用。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">目标端口号或端口号范围的列表。</ArgTableRow>
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
 }">匹配入站数据包的优先级。优先级可能来自 VLAN、WMM、DSCP 或 MPLS EXP 位。</ArgTableRow>
<ArgTableRow arg="priority" typ="super { !
, priority: num [0 .. 63]
 }">在设置新优先级后匹配数据包的优先级。优先级可能来自 VLAN、WMM、DSCP、MPLS EXP 位，或来自通过 set-priority 动作设置的优先级。</ArgTableRow>
<ArgTableRow arg="dscp" typ="super { !
, dscp: num [0 .. 63]
 }">匹配 DSCP IP 报头字段。</ArgTableRow>
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
匹配达到限制速率（数据包速率或比特速率）之前的数据包。具有此匹配器的规则会一直匹配，直到达到该限制。参数按以下格式书写：`rate[/time],burst:mode`。
- `rate` - 每个时间间隔要匹配的数据包数或比特数。
- `time` - 指定不能超过数据包或比特速率的时间间隔（可选，未指定时使用 1s）。
- `burst` - 初始要匹配的数据包数或比特数：该数字每 10ms 重新填充，因此 burst 至少应为每秒速率值的 1/100。
- `mode` - 数据包或比特模式。
</ArgTableRow>
<ArgTableRow arg="dst-limit" typ="super { count: num
, [time] [ /time]
, [burst] ,num
, [mode] ,enum (dst-address | dst-address-and-port | src-address | src-and-dst-addresses | addresses-and-dst-port) { dst-address:1, dst-address-and-port:3, src-address:4, src-and-dst-addresses:5, addresses-and-dst-port:7 }
, [expire] [ /time]
 }">
匹配达到给定速率之前的数据包。速率定义为每个时间间隔的数据包数。与 `limit` 匹配器不同，每个流都有自己的限制。流由 mode 参数定义。参数按以下格式书写：`rate[/time],burst,mode[/expire]`。
- `rate` - 每个流在每个时间间隔要匹配的数据包数。
- `time` - 指定不能超过每个流的数据包计数速率的时间间隔（可选，未指定时使用 1s）。
- `burst` - 每个流初始要匹配的数据包数：该数字每 time/rate 重新增加一，直到达到此数字。
- `mode` - 指定哪些唯一字段定义流（src-address、dst-address、src-and-dst-address、dst-address-and-port、addresses-and-dst-port）。
- `expire` - 指定在无数据包的流可以被删除之前的时间间隔（可选）。
</ArgTableRow>
<ArgTableRow arg="time" typ="super { !
, start: time [0 .. 86400]
, [end] -time [0 .. 86400]
, [day] ,ubit (sun, mon, tue, wed, thu, fri, sat)
 }">根据数据包的到达时间和日期（对于本地生成的数据包，则为离开时间和日期）创建过滤器。该匹配器会考虑路由器上配置的时间和时区。</ArgTableRow>
<ArgTableRow arg="random" typ="super { percent: num [1 .. 99]
 }">按给定概率随机匹配数据包。</ArgTableRow>
<ArgTableRow arg="nth" typ="super { !
, every: num [1 .. ]
, [packet] [ ,num [1 .. ]]
 }">匹配每第 n 个数据包：`nth=2,1` 将匹配每 2 个数据包中的第 1 个，因此会匹配该规则匹配到的所有流量的 50%。</ArgTableRow>
<ArgTableRow arg="tcp-mss" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">匹配 IP 数据包的 TCP MSS 值。</ArgTableRow>
<ArgTableRow arg="per-connection-classifier" typ="super { !
, values-to-hash: enum (src-address | dst-address | both-addresses | src-port | src-address-and-port | dst-port | dst-address-and-port | both-ports | both-addresses-and-ports) { src-address:1, dst-address:2, both-addresses:3, src-port:4, src-address-and-port:5, dst-port:8, dst-address-and-port:10, both-ports:12, both-addresses-and-ports:15 }
, [denominator] :num [1 .. ]
, [remainder] /num [0 .. ]
 }">PCC 匹配器允许将流量划分为均等的流，并能够将具有特定选项集合的数据包保留在某个特定流中。</ArgTableRow>
<ArgTableRow arg="packet-size" typ="super { !
, min: num [ .. 65535]
, [max] -num [ .. 65535]
 }">匹配指定大小或大小范围（以字节为单位）的数据包。</ArgTableRow>
<ArgTableRow arg="log" typ="bool">向系统日志添加一条消息，其中包含以下数据：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。即使动作不是 `log` 也允许记录数据包，这对调试防火墙很有用。</ArgTableRow>
<ArgTableRow arg="log-prefix" typ="string">在每条日志消息的开头添加指定文本。如果配置了 `action=log` 或 `log=yes`，则适用。</ArgTableRow>
<ArgTableRow arg="ipsec-policy" typ="super { direction: enum (in | out) { in:0, out:1 }
, [policy] ,enum (none | ipsec) { none:0, ipsec:1 }
 }">
匹配 IPsec 使用的策略。值按以下格式书写：`direction, policy`。
- `in` - 在 PREROUTING、INPUT 和 FORWARD 链中有效。
- `out` - 在 POSTROUTING、OUTPUT 和 FORWARD 链中有效。
- `ipsec` - 如果数据包经过 IPsec 处理，则匹配。
- `none` - 匹配不经过 IPsec 处理的数据包。
</ArgTableRow>
</ArgTable>
