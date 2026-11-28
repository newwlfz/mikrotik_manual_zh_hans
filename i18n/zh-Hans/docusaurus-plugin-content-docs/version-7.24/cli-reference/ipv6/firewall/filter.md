---
title: "filter"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/firewall/filter
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/firewall/filter 
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="chain" typ="enum" mandatory="1">Specifies to which chain the rule will be added. If the input does not match the name of an already defined chain, a new chain will be created.</ArgTableRow>
<ArgTableRow arg="action" typ="enum (accept | jump | return | log | passthrough | add-src-to-address-list | add-dst-to-address-list | drop | reject | fasttrack-connection) { accept:0, jump:1, return:2, log:3, passthrough:4, add-src-to-address-list:5, add-dst-to-address-list:6, drop:10, reject:11, fasttrack-connection:45 }">Action to take if a packet is matched by the rule: `accept` - accept the packet. A packet is not passed to the next firewall rule.  `add-dst-to-address-list` - add the destination address to the address list specified by the `address-list` parameter.  `add-src-to-address-list` - add the source address to the address list specified by the `address-list` parameter.  `drop` - drop the packet.  `fasttrack-connection` - fasttrack the connection.  `jump` - jump to the user-defined chain specified by the value of the `jump-target` parameter.  `log` - add a message to the system log containing the following data: in-interface, out-interface, src-mac, protocol, src-ip:port->dst-ip:port, and length of the packet. After a packet is matched it is passed to the next rule in the list, similar to `passthrough`.  `passthrough` - if a packet is matched by the rule, increase the counter and go to the next rule (useful for statistics).  `reject` - reject the packet and send an ICMP response.  `return` - passes control back to the chain from where the jump took place.</ArgTableRow>
<ArgTableRow arg="jump-target" typ="enum ()">Name of the target chain to jump to. Applicable only if `action=jump`.</ArgTableRow>
<ArgTableRow arg="reject-with" typ="enum (icmp-no-route | icmp-admin-prohibited | icmp-not-neighbour | icmp-address-unreachable | icmp-port-unreachable | tcp-reset | icmp-err-src-routing-header | icmp-headers-too-long) { icmp-no-route:0, icmp-admin-prohibited:1, icmp-not-neighbour:2, icmp-address-unreachable:3, icmp-port-unreachable:4, tcp-reset:6, icmp-err-src-routing-header:7, icmp-headers-too-long:8 }">
Specifies the [ICMP error](https://www.iana.org/assignments/icmpv6-parameters/icmpv6-parameters.xhtml#icmpv6-parameters-codes-2) to be sent back if the packet is rejected. Applicable if `action=reject`.

- `icmp-no-route` - 发送 ICMP 地址无路由消息。ICMP type 1，code 0
- `icmp-admin-prohibited` - 发送 ICMP 地址禁止消息。ICMP type 1，code 1
- `icmp-not-neighbour` - 发送 ICMP 地址非成员消息。ICMP type 1，code 2
- `icmp-address-unreachable` - 发送 ICMP 地址不可达消息。ICMP type 1，code 3
- `icmp-port-unreachable` - 发送 ICMP 端口不可达消息。ICMP type 1，code 4
- `tcp-reset` - 发送用于重置 TCP 连接的 ICMP 消息。ICMP type 1，code 6
- `icmp-err-src-routing-header` - 发送 ICMP 源路由头错误消息。ICMP type 1，code 7
- `icmp-headers-too-long` - 发送 ICMP 报头过长消息。ICMP type 1，code 8
</ArgTableRow>
<ArgTableRow arg="connection-nat-state" typ="super { !
, state: ubit (srcnat, dstnat)
 }">匹配经过源地址转换、目的地址转换或两者兼有的连接。</ArgTableRow>
<ArgTableRow arg="tls-host" typ="super { !
, tls-host: string
 }">根据 TLS SNI 主机名匹配 HTTPS 流量。接受 GLOB 语法进行通配符匹配。如果 TLS 握手帧被分片为多个 TCP 段，则该匹配器无法匹配主机名。</ArgTableRow>
<ArgTableRow arg="connection-state" typ="super { !
, state: ubit (invalid, established, related, new, untracked)
 }">解释特定数据包连接跟踪分析数据：`established` - 属于现有连接的数据包。`invalid` - 在连接跟踪中没有确定状态的数据包（通常是严重乱序的数据包、序列号或确认号错误的数据包，或路由器资源过度使用的情况）。无效数据包不会参与 NAT，并且在路由时仍将包含原始源 IP 地址。应在防火墙过滤器 forward 和 input 链中丢弃所有 `connection-state=invalid` 数据包。`new` - 数据包已开始新连接，或以其他方式与尚未在双向都出现过数据包的连接相关联。`related` - 与现有连接相关但不属于该连接的数据包，例如 ICMP 错误或开始 FTP 数据连接的数据包。`untracked` - 已在防火墙 RAW 表中设置为绕过连接跟踪的数据包。</ArgTableRow>
<ArgTableRow arg="connection-limit" typ="super { !
, limit: num
, [prefix-len] ,num [0 .. 128]
 }">在达到给定值后，按地址或地址块匹配连接。应将其与 `connection-state=new` 和/或 `tcp-flags=syn` 一起使用，因为该匹配器非常消耗资源。</ArgTableRow>
<ArgTableRow arg="protocol" typ="super { !
, protocol: enum (icmpv6) { icmpv6:58 }
 }">按协议名称或编号匹配指定的 IP 协议。</ArgTableRow>
<ArgTableRow arg="src-address" typ="super { !
, address: ip6Prefix
 }">匹配源地址等于指定 IP 或位于指定 IP 范围内的数据包。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, address: ip6Prefix
 }">匹配目的地址等于指定 IP 或位于指定 IP 范围内的数据包。</ArgTableRow>
<ArgTableRow arg="src-address-list" typ="super { !
, address-list: enum
 }">将数据包的源地址与用户定义的地址列表进行匹配。仅支持一个列表。</ArgTableRow>
<ArgTableRow arg="dst-address-list" typ="super { !
, address-list: enum
 }">将数据包的目的地址与用户定义的地址列表进行匹配。仅支持一个列表。</ArgTableRow>
<ArgTableRow arg="address-list" typ="enum ()">要使用的地址列表名称。适用于 `add-dst-to-address-list` 或 `add-src-to-address-list` 动作。</ArgTableRow>
<ArgTableRow arg="address-list-timeout" typ="alt { address-list-timeout: enum (none-dynamic | none-static) { none-dynamic:0, none-static:0xffffffff }
, address-list-timeout: time [ .. 21474836]
 }">地址从 `address-list` 参数指定的地址列表中移除前的时间间隔。与 `add-dst-to-address-list` 或 `add-src-to-address-list` 动作配合使用。`none-dynamic`（`00:00:00`）会将地址保留在地址列表中直到重启。`none-static` 会将地址永久保留在地址列表中，并包含在配置导出/备份中。</ArgTableRow>
<ArgTableRow arg="src-address-type" typ="super { !
, type: ubit (unicast, local, anycast, multicast, unreachable)
 }">匹配源地址类型：`unicast` - 用于点对点传输的 IP 地址。`local` - 该地址分配给路由器的某个接口。`anycast` - 发送到组中最近节点的数据包。`multicast` - 转发到指定设备组的数据包。`unreachable` - 该地址不可达。</ArgTableRow>
<ArgTableRow arg="dst-address-type" typ="super { !
, type: ubit (unicast, local, anycast, multicast, unreachable)
 }">匹配目的地址类型：`unicast` - 用于点对点传输的 IP 地址。`local` - 目的地址分配给路由器的某个接口。`anycast` - 发送到组中最近节点的数据包。`multicast` - 转发到指定设备组的数据包。`unreachable` - 该地址不可达。</ArgTableRow>
<ArgTableRow arg="headers" typ="super { !
, type: ubit (hop, dst, route, frag, ah, esp, none, proto)
, [mode] [ :enum (exact | contains) { exact:0, contains:1 }]
 }">匹配 IPv6 下一报头。可通过 `mode` 参数控制两种报头匹配类型：`contains` - 软匹配，至少匹配所选报头。`exact` - 匹配所选报头的精确集合。</ArgTableRow>
<ArgTableRow arg="tcp-flags" typ="super { !,
, flags: multi { array-id, array-id, flag: super { !
, flag: enum (fin | syn | rst | psh | ack | urg | ece | cwr) { fin:0, syn:1, rst:2, psh:3, ack:4, urg:5, ece:6, cwr:7 }
 }
 }
 }">匹配指定的 TCP 标志：`ack` - 确认数据。`cwr` - 拥塞窗口减小。`ece` - ECN-echo 标志（显式拥塞通知）。`fin` - 关闭连接。`psh` - 推送功能。`rst` - 重置连接。`syn` - 新连接。`urg` - 紧急数据。</ArgTableRow>
<ArgTableRow arg="hop-limit" typ="super { mode: enum (equal | not-equal | less-than | greater-than) { equal:0, not-equal:1, less-than:2, greater-than:3 }
, [value] :num [0 .. 255]
 }">匹配 IPv6 报头中的 hop limit 字段。</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能标记了特定连接标记的数据包。如果设置了 `no-mark`，则规则将匹配任何未标记的连接。</ArgTableRow>
<ArgTableRow arg="connection-type" typ="super { !
, type: enum (ftp | pptp | h323 | sip | irc | quake3 | tftp) { ftp:0, pptp:1, h323:2, sip:3, irc:4, quake3:5, tftp:6 }
 }">根据相关连接的连接跟踪辅助信息匹配来自这些连接的数据包。必须在 `/ip/firewall/service-port` 下启用相应的连接辅助功能。</ArgTableRow>
<ArgTableRow arg="connection-bytes" typ="super { from: num
, [to] -num
 }">仅当特定连接中已传输指定字节数时才匹配数据包。0 表示无穷大，例如 `connection-bytes=2000000-0` 表示如果相关连接中已传输超过 2MB，则规则匹配。</ArgTableRow>
<ArgTableRow arg="connection-rate" typ="super { !
, from: num
, [to] -num
 }">允许根据连接的当前速度捕获流量。</ArgTableRow>
<ArgTableRow arg="routing-mark" typ="super { !
, mark: enum ()
 }">匹配由 mangle 功能标记了特定路由标记的数据包。</ArgTableRow>
<ArgTableRow arg="in-interface" typ="super { !
, interface: iface_enum
 }">数据包进入路由器的接口。</ArgTableRow>
<ArgTableRow arg="out-interface" typ="super { !
, interface: iface_enum
 }">数据包离开路由器的接口。</ArgTableRow>
<ArgTableRow arg="in-interface-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `in-interface` 相同。</ArgTableRow>
<ArgTableRow arg="out-interface-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `out-interface` 相同。</ArgTableRow>
<ArgTableRow arg="in-bridge-port" typ="super { !
, interface: iface_enum
 }">如果入接口是网桥，则为数据包进入路由器的实际接口。仅在网桥设置中启用 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="out-bridge-port" typ="super { !
, interface: iface_enum
 }">如果出接口是网桥，则为数据包离开路由器的实际接口。仅在网桥设置中启用 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="in-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `in-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="out-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `out-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="packet-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能标记了特定数据包标记的数据包。如果设置了 `no-mark`，则规则将匹配任何未标记的数据包。</ArgTableRow>
<ArgTableRow arg="src-port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">源端口和源端口范围列表。仅在协议为 TCP 或 UDP 时适用。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">目的端口号或端口号范围列表。</ArgTableRow>
<ArgTableRow arg="port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">如果任意端口（源端口或目的端口）匹配指定的端口或端口范围列表，则匹配。仅在 `protocol` 为 TCP 或 UDP 时适用。</ArgTableRow>
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
 }">匹配入站数据包的优先级。优先级可来自 VLAN、WMM、DSCP 或 MPLS EXP 位。</ArgTableRow>
<ArgTableRow arg="priority" typ="super { !
, priority: num [0 .. 63]
 }">匹配设置新优先级后的数据包优先级。优先级可来自 VLAN、WMM、DSCP、MPLS EXP 位，或来自使用 set-priority 动作设置的优先级。</ArgTableRow>
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
匹配速率受限的数据包（数据包速率或比特速率）。带有该匹配器的规则将匹配，直到达到此限制。参数采用以下格式：`rate[/time],burst:mode`。

- `rate` - 每个时间间隔要匹配的数据包或比特数。
- `time` - 指定不能超过数据包或比特速率的时间间隔（可选，未指定时使用 1s）。
- `burst` - 要匹配的初始数据包或比特数：该数值每 10ms 补充一次，因此 burst 至少应为每秒速率的 1/100。
- `mode` - 数据包或比特模式。
</ArgTableRow>
<ArgTableRow arg="dst-limit" typ="super { count: num
, [time] [ /time]
, [burst] ,num
, [mode] ,enum (dst-address | dst-address-and-port | src-address | src-and-dst-addresses | addresses-and-dst-port) { dst-address:1, dst-address-and-port:3, src-address:4, src-and-dst-addresses:5, addresses-and-dst-port:7 }
, [expire] [ /time]
 }">
匹配数据包，直到超过给定速率。速率定义为每个时间间隔的数据包数。与 `limit` 匹配器不同，每个流都有自己的限制。流由 mode 参数定义。参数采用以下格式：`rate[/time],burst,mode[/expire]`。

- `rate` - 每个流每个时间间隔要匹配的数据包数。
- `time` - 指定每个流的数据包速率不能超过的时间间隔（可选，未指定时使用 1s）。
- `burst` - 每个流要匹配的初始数据包数：该数值每 time/rate 补充一个，最多补充到该数值。
- `mode` - 指定哪些唯一字段定义流（src-address、dst-address、src-and-dst-address、dst-address-and-port、addresses-and-dst-port）。
- `expire` - 指定无数据包的流可被删除的时间间隔（可选）。
</ArgTableRow>
<ArgTableRow arg="time" typ="super { !
, start: time [0 .. 86400]
, [end] -time [0 .. 86400]
, [day] ,ubit (sun, mon, tue, wed, thu, fri, sat)
 }">根据数据包的到达时间和日期创建过滤器；对于本地生成的数据包，则根据离开时间和日期创建过滤器。该匹配器会考虑路由器上配置的时间和时区。</ArgTableRow>
<ArgTableRow arg="random" typ="super { percent: num [1 .. 99]
 }">按给定概率随机匹配数据包。</ArgTableRow>
<ArgTableRow arg="nth" typ="super { !
, every: num [1 .. ]
, [packet] [ ,num [1 .. ]]
 }">每 n 个数据包匹配一次：`nth=2,1` 将匹配每 2 个数据包中的第 1 个，因此规则匹配所有流量的 50%。</ArgTableRow>
<ArgTableRow arg="tcp-mss" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">匹配 IP 数据包的 TCP MSS 值。</ArgTableRow>
<ArgTableRow arg="per-connection-classifier" typ="super { !
, values-to-hash: enum (src-address | dst-address | both-addresses | src-port | src-address-and-port | dst-port | dst-address-and-port | both-ports | both-addresses-and-ports) { src-address:1, dst-address:2, both-addresses:3, src-port:4, src-address-and-port:5, dst-port:8, dst-address-and-port:10, both-ports:12, both-addresses-and-ports:15 }
, [denominator] :num [1 .. ]
, [remainder] /num [0 .. ]
 }">PCC 匹配器允许将流量划分为相等的流，并能够将具有特定选项集的数据包保持在同一个流中。</ArgTableRow>
<ArgTableRow arg="packet-size" typ="super { !
, min: num [ .. 65535]
, [max] -num [ .. 65535]
 }">匹配指定大小或字节大小范围内的数据包。</ArgTableRow>
<ArgTableRow arg="log" typ="bool">向系统日志添加一条消息，包含以下数据：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。即使动作不是 `log`，也允许记录数据包，适用于调试防火墙。</ArgTableRow>
<ArgTableRow arg="log-prefix" typ="string">在每条日志消息的开头添加指定文本。适用于配置了 `action=log` 或 `log=yes` 的情况。</ArgTableRow>
<ArgTableRow arg="ipsec-policy" typ="super { direction: enum (in | out) { in:0, out:1 }
, [policy] ,enum (none | ipsec) { none:0, ipsec:1 }
 }">
匹配 IPsec 使用的策略。值采用以下格式：`direction, policy`。

- `in` - 在 PREROUTING、INPUT 和 FORWARD 链中有效。
- `out` - 在 POSTROUTING、OUTPUT 和 FORWARD 链中有效。
- `ipsec` - 如果数据包受 IPsec 处理，则匹配。
- `none` - 匹配不受 IPsec 处理的数据包。
</ArgTableRow>
</ArgTable>
