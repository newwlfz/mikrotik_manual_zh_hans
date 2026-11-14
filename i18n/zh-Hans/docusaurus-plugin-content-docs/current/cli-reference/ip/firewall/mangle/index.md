---
sidebar_key: "cli-reference/ip/firewall/mangle"
title: "mangle"
sidebar_label: 'mangle'
source: https://manual.mikrotik.com/docs/cli-reference/ip/firewall/mangle
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/firewall/mangle {#ipfirewallmangle}
**类型：** 目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="all" typ="switch"></ArgTableRow>
<ArgTableRow arg="static" typ="switch"></ArgTableRow>
<ArgTableRow arg="dynamic" typ="switch"></ArgTableRow>
<ArgTableRow arg="chain" typ="enum" mandatory="1">指定规则将添加到哪个链。如果输入与已定义链的名称不匹配，则会创建一个新链。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (accept | jump | return | log | passthrough | add-src-to-address-list | add-dst-to-address-list | sniff-tzsp | sniff-pc | drop | mark-packet | mark-connection | change-mss | change-dscp | strip-ipv4-options | change-ttl | mark-routing | set-priority | clear-df | fasttrack-connection | route) { accept:0, jump:1, return:2, log:3, passthrough:4, add-src-to-address-list:5, add-dst-to-address-list:6, sniff-tzsp:7, sniff-pc:8, drop:10, mark-packet:30, mark-connection:31, change-mss:32, change-dscp:33, strip-ipv4-options:34, change-ttl:35, mark-routing:36, set-priority:37, clear-df:39, fasttrack-connection:40, route:41 }">
如果数据包被规则匹配，则要执行的动作：
- `accept` - 接受数据包。数据包不会传递给下一条防火墙规则。
- `add-dst-to-address-list` - 将目标地址添加到由 `address-list` 参数指定的地址列表。
- `add-src-to-address-list` - 将源地址添加到由 `address-list` 参数指定的地址列表。
- `jump` - 跳转到由 `jump-target` 参数值指定的用户定义链。
- `log` - 向系统日志添加一条包含以下数据的消息：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。数据包匹配后，会传递给列表中的下一条规则，类似于 `passthrough`。
- `passthrough` - 如果数据包被规则匹配，则增加计数器并转到下一条规则（对统计有用）。
- `return` - 将控制权返回到发生跳转的链。
- `sniff-tzsp` - 将数据包发送到远程 TZSP 兼容系统（例如 Wireshark）。使用 `sniff-target` 和 `sniff-target-port` 参数设置远程目标（Wireshark 建议使用端口 37008）。数据包匹配后，会传递给列表中的下一条规则，类似于 `passthrough`。
- `sniff-pc` - 将数据包发送到远程 RouterOS CALEA 服务器。数据包匹配后，会传递给列表中的下一条规则，类似于 `passthrough`。
- `drop` - 静默丢弃数据包。
- `mark-packet` - 使用指定的 `new-packet-mark` 标记数据包。
- `mark-connection` - 使用指定的 `new-connection-mark` 标记连接。
- `change-mss` - 将数据包的最大分段大小（MSS）字段值更改为由 `new-mss` 参数指定的值。
- `change-dscp` - 更改由 `new-dscp` 参数指定的差分服务代码点（DSCP）字段值。
- `change-ttl` - 将数据包的生存时间（TTL）字段值更改为由 `new-ttl` 参数指定的值。
- `mark-routing` - 在数据包上放置由 `new-routing-mark` 参数指定的标记。此类标记仅用于策略路由目的。对于由 FastTrack 处理的数据包，不要应用除 `main` 以外的任何其他路由标记，因为 FastTrack 只能在主路由表中工作。
- `set-priority` - 设置数据包的优先级。
- `clear-df` - 清除 Don't Fragment（不分片）标志。
- `fasttrack-connection` - 标记连接以供 FastTrack 使用。数据包匹配后，会传递给列表中的下一条规则，类似于 `passthrough`。
- `route` - 通过忽略正常路由决策，强制将数据包发送到由 'route-dst' 参数指定的网关 IP（仅限 prerouting 链）。
- `strip-ipv4-options` - 从 IP 头部剥离 IPv4 选项字段。该动作实际上并不会移除 IPv4 选项，而是将所有选项字节替换为 NOP。后续使用 `ipv4-options=any` 的匹配器仍会匹配该数据包。
</ArgTableRow>
<ArgTableRow arg="jump-target" typ="enum ()">要跳转到的目标链名称。仅当 `action=jump` 时适用。</ArgTableRow>
<ArgTableRow arg="new-packet-mark" typ="enum ()">设置新的数据包标记值。</ArgTableRow>
<ArgTableRow arg="new-connection-mark" typ="enum ()">设置新的连接标记值。</ArgTableRow>
<ArgTableRow arg="new-routing-mark" typ="enum ()">设置新的 `routing-mark` 值。在 RouterOS v7 中，路由标记必须事先创建为新的 [路由表](../../../../user-guides/routing-and-networking-protocols/policy-routing.md)</ArgTableRow>
<ArgTableRow arg="new-mss" typ="alt { mss-action: enum (clamp-to-pmtu) { clamp-to-pmtu:65535 }
, mss-value: num [40 .. 65534]
 }">为数据包设置新的 MSS。**重要：** Clamp-to-pmtu 功能会设置 IP 头部中的 DF 位，以动态发现路径的 PMTU。主机会在该路径上发送所有设置了 DF 位的数据报，直到收到代码含义为“需要分片且设置了 DF”的 ICMP Destination Unreachable 消息。收到此类消息后，源主机会降低其对该路径的假定 PMTU。</ArgTableRow>
<ArgTableRow arg="new-dscp" typ="enum (from-priority-to-high-3-bits | from-priority) { from-priority-to-high-3-bits:254, from-priority:255 }">设置新的 DSCP 值。</ArgTableRow>
<ArgTableRow arg="new-priority" typ="alt { new-priority: enum (from-dscp | from-ingress | from-dscp-high-3-bits) { from-dscp:65536, from-ingress:65537, from-dscp-high-3-bits:65538 }
, new-priority: num [0 .. 63]
 }">设置数据包的新优先级。这可以是 VLAN、WMM、DSCP 或 MPLS EXP 优先级 [阅读更多](../../../../bridging-and-switching/user-guides/wmm-and-vlan-priority.md)。此属性也可用于设置内部优先级。</ArgTableRow>
<ArgTableRow arg="new-ttl" typ="super { mode: enum (set | increment | decrement) { set:0, increment:1, decrement:2 }
, [value] :num [0 .. 255]
 }">设置新的 TTL 值。</ArgTableRow>
<ArgTableRow arg="passthrough" typ="bool">是否允许数据包传递到下一条规则。</ArgTableRow>
<ArgTableRow arg="tcp-flags" typ="super { !,
, flags: multi { array-id, array-id, flag: super { !
, flag: enum (fin | syn | rst | psh | ack | urg | ece | cwr) { fin:0, syn:1, rst:2, psh:3, ack:4, urg:5, ece:6, cwr:7 }
 }
 }
 }">
匹配指定的 TCP 标志：
- `ack` - 确认数据。
- `cwr` - 拥塞窗口已减小。
- `ece` - ECN-echo 标志（显式拥塞通知）。
- `fin` - 关闭连接。
- `psh` - 推送功能。
- `rst` - 重置连接。
- `syn` - 新建连接。
- `urg` - 紧急数据。
</ArgTableRow>
<ArgTableRow arg="p2p" typ="super { !
, p2p: enum (fasttrack | gnutella | direct-connect | edonkey | bit-torrent | blubster | soulseek | winmx | warez | all-p2p) { fasttrack:0x01, gnutella:0x02, direct-connect:0x03, edonkey:0x04, bit-torrent:0x05, blubster:0x06, soulseek:0x07, winmx:0x08, warez:0x09, all-p2p:0xFF }
 }">匹配某些未加密的 P2P 协议。已弃用，因为大多数流量都已加密，需要深度包检测才能识别。仅限 IPv4。</ArgTableRow>
<ArgTableRow arg="connection-state" typ="super { !
, state: ubit (invalid, established, related, new, untracked)
 }">
解释特定数据包的连接跟踪分析数据：
- `established` - 属于现有连接的数据包。
- `invalid` - 在连接跟踪中没有确定状态的数据包（通常是严重乱序的数据包、序号/确认号错误的数据包，或路由器资源过度使用的情况）。invalid 数据包不会参与 NAT（因为只有 connection-state=new 数据包会参与），并且在路由时仍会包含原始源 IP 地址。你应该在防火墙 filter 的 forward 和 input 链中丢弃所有 `connection-state=invalid` 数据包。
- `new` - 数据包已开始新连接，或者以其他方式关联到尚未在两个方向上看到数据包的连接。
- `related` - 与现有连接相关但不属于该连接的数据包，例如 ICMP 错误，或开启 FTP 数据连接的数据包。
- `untracked` - 在防火墙 RAW 表中被设置为绕过连接跟踪的数据包。
</ArgTableRow>
<ArgTableRow arg="connection-nat-state" typ="super { !
, state: ubit (srcnat, dstnat)
 }">
匹配源 NAT、目标 NAT 或两者兼有的连接。`connection-state=related` 连接的 connection-nat-state 由第一个数据包的方向决定；如果连接跟踪需要使用 dst-nat 将该连接传递到与主连接相同的主机，那么即使完全没有 dst-nat 规则，它也会处于 connection-nat-state=dstnat。
`ein-snat` 和 `ein-dnat` 是使用端点无关 NAT 时的源 NAT 和目标 NAT 连接。
</ArgTableRow>
<ArgTableRow arg="sniff-target" typ="ipAddr">要将嗅探到的数据包发送到的 IP 地址。</ArgTableRow>
<ArgTableRow arg="sniff-target-port" typ="num">要将嗅探到的数据包发送到的端口。</ArgTableRow>
<ArgTableRow arg="sniff-id" typ="num">嗅探会话的 ID。</ArgTableRow>
<ArgTableRow arg="route-dst" typ="ipAddr">指定 `route` 动作的路由目标。</ArgTableRow>
<ArgTableRow arg="tls-host" typ="super { !
, tls-host: string
 }">基于 TLS SNI 主机名匹配 HTTPS 流量。接受用于通配符匹配的 GLOB 语法。如果 TLS 握手帧被分片为多个 TCP 段，匹配器将无法匹配主机名。</ArgTableRow>
<ArgTableRow arg="connection-limit" typ="super { !
, limit: num
, [netmask] ,num
 }">在达到给定值后，按地址或地址块匹配连接。应将其与 `connection-state=new` 和/或 `tcp-flags=syn` 一起使用，因为该匹配器非常消耗资源。</ArgTableRow>
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
 }">匹配源地址等于指定 IP 或落在指定 IP 范围内的数据包。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, range: ipRange
 }">匹配目标地址等于指定 IP 或落在指定 IP 范围内的数据包。</ArgTableRow>
<ArgTableRow arg="fragment" typ="super { fragment: bool
 }">匹配分片数据包。第一个（起始）分片不计入。如果启用了连接跟踪，则不会有分片，因为系统会自动重组每个数据包。仅限 IPv4。</ArgTableRow>
<ArgTableRow arg="psd" typ="super { weight-threshold: num
, [delay-threshold] ,time
, [low-port-weight] ,num
, [high-port-weight] ,num
 }">
尝试检测 TCP 和 UDP 扫描。参数采用以下格式：`WeightThreshold, DelayThreshold, LowPortWeight, HighPortWeight`。
- `WeightThreshold` - 来自同一主机、具有不同目标端口的最近 TCP/UDP 数据包被视为端口扫描序列的总权重。
- `DelayThreshold` - 来自同一主机、具有不同目标端口的数据包被视为可能端口扫描子序列的延迟。
- `LowPortWeight` - 具有特权目标端口（&lt;1024）的数据包的权重。
- `HighPortWeight` - 具有非特权目标端口的数据包的权重。仅限 IPv4。
</ArgTableRow>
<ArgTableRow arg="ipv4-options" typ="super { options: enum (strict-source-routing | loose-source-routing | no-source-routing | record-route | no-record-route | timestamp | no-timestamp | router-alert | no-router-alert | any | none) { strict-source-routing:0x1, loose-source-routing:0x2, no-source-routing:0x4, record-route:0x8, no-record-route:0x10, timestamp:0x20, no-timestamp:0x40, router-alert:0x80, no-router-alert:0x100, any:0x200, none:0x400 }
 }">
匹配 IPv4 头部选项。
- `any` - 匹配带有至少一个 IPv4 选项的数据包。
- `loose-source-routing` - 匹配带有松散源路由选项的数据包。
- `no-record-route` - 匹配不带记录路由选项的数据包。
- `no-router-alert` - 匹配不带路由器告警选项的数据包。
- `no-source-routing` - 匹配不带源路由选项的数据包。
- `no-timestamp` - 匹配不带时间戳选项的数据包。
- `record-route` - 匹配带有记录路由选项的数据包。
- `router-alert` - 匹配带有路由器告警选项的数据包。
- `strict-source-routing` - 匹配带有严格源路由选项的数据包。
- `timestamp` - 匹配带有时间戳的数据包。仅限 IPv4。
</ArgTableRow>
<ArgTableRow arg="src-address-type" typ="super { !
, type: ubit (unicast, local, broadcast, multicast, blackhole)
 }">
匹配源地址类型：
- `unicast` - 用于点对点传输的 IP 地址。
- `local` - 该地址分配给路由器的某个接口。
- `broadcast` - 数据包发送到子网中的所有设备。
- `multicast` - 数据包转发到定义的一组设备。
</ArgTableRow>
<ArgTableRow arg="dst-address-type" typ="super { !
, type: ubit (unicast, local, broadcast, multicast, blackhole)
 }">
匹配目标地址类型：
- `unicast` - 用于点对点传输的 IP 地址。
- `local` - 目标地址分配给路由器的某个接口。
- `broadcast` - 数据包发送到子网中的所有设备。
- `multicast` - 数据包转发到定义的一组设备。
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
- `auth` - 匹配已认证的 HotSpot 客户端数据包。
- `from-client` - 匹配来自 HotSpot 客户端的数据包。
- `http` - 匹配发送到 HotSpot 服务器的 HTTP 请求。
- `local-dst` - 匹配发往 HotSpot 服务器的数据包。
- `to-client` - 匹配发送到 HotSpot 客户端的数据包。仅限 IPv4。
</ArgTableRow>
<ArgTableRow arg="address-list" typ="enum ()">要使用的地址列表名称。当动作为 `add-dst-to-address-list` 或 `add-src-to-address-list` 时适用。</ArgTableRow>
<ArgTableRow arg="address-list-timeout" typ="alt { address-list-timeout: enum (none-dynamic | none-static) { none-dynamic:0, none-static:0xffffffff }
, address-list-timeout: time [ .. 21474836]
 }">
在 `add-src-to-address-list` 或 `add-dst-to-address-list` 动作添加地址后，该地址在 `address-list` 中保留多长时间。指定时间时，规则会添加一个动态条目（`D`），路由器会在时间结束后将其移除；规则每次新的匹配都会将时间重置为其完整值。最大值为 `35w3d13h13m56s`。如果地址已经是列表中的静态条目，则保持静态。
- `none-dynamic` (`0s`) - 添加一个不带超时的动态条目。它不会保存到配置中，重启后会清除。
- `none-static` - 添加一个静态条目。它会保存到配置和导出中，并且在重启后仍会保留，直到你将其移除。
</ArgTableRow>
<ArgTableRow arg="ttl" typ="super { mode: enum (equal | not-equal | less-than | greater-than) { equal:0, not-equal:1, less-than:2, greater-than:3 }
, [value] :num [0 .. 255]
 }">匹配数据包的 TTL 值。仅限 IPv4。</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能使用特定连接标记进行标记的数据包。如果设置了 `no-mark`，则规则将匹配任何未标记的连接。</ArgTableRow>
<ArgTableRow arg="connection-type" typ="super { !
, type: enum (ftp | pptp | h323 | sip | irc | quake3 | tftp) { ftp:0, pptp:1, h323:2, sip:3, irc:4, quake3:5, tftp:6 }
 }">基于连接跟踪 helper 的信息，匹配来自相关连接的数据包。必须在 `/ip/firewall/service-port` 下启用相关的连接 helper。</ArgTableRow>
<ArgTableRow arg="connection-bytes" typ="super { from: num
, [to] -num
 }">仅当通过特定连接传输了给定数量的字节时，才匹配数据包。0 表示无限，例如 `connection-bytes=2000000-0` 表示如果通过相关连接传输了超过 2MB，则规则匹配。</ArgTableRow>
<ArgTableRow arg="connection-rate" typ="super { !
, from: num
, [to] -num
 }">允许根据连接的当前速度捕获流量。</ArgTableRow>
<ArgTableRow arg="routing-mark" typ="super { !
, mark: enum ()
 }">匹配由 mangle 功能使用特定路由标记进行标记的数据包。</ArgTableRow>
<ArgTableRow arg="in-interface" typ="super { !
, interface: iface_enum
 }">数据包进入路由器时所经过的接口。</ArgTableRow>
<ArgTableRow arg="out-interface" typ="super { !
, interface: iface_enum
 }">数据包离开路由器时所经过的接口。</ArgTableRow>
<ArgTableRow arg="in-interface-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `in-interface` 相同。</ArgTableRow>
<ArgTableRow arg="out-interface-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `out-interface` 相同。</ArgTableRow>
<ArgTableRow arg="in-bridge-port" typ="super { !
, interface: iface_enum
 }">当入接口是网桥时，数据包进入路由器所经过的实际接口。仅在网桥设置中启用了 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="out-bridge-port" typ="super { !
, interface: iface_enum
 }">当出接口是网桥时，数据包离开路由器所经过的实际接口。仅在网桥设置中启用了 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="in-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `in-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="out-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `out-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="packet-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能使用特定数据包标记进行标记的数据包。如果设置了 `no-mark`，则规则将匹配任何未标记的数据包。</ArgTableRow>
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
 }">匹配入站数据包的优先级。优先级可能来自 VLAN、WMM、DSCP 或 MPLS EXP 位。</ArgTableRow>
<ArgTableRow arg="priority" typ="super { !
, priority: num [0 .. 63]
 }">匹配设置新优先级之后的数据包优先级。优先级可能来自 VLAN、WMM、DSCP、MPLS EXP 位，或来自使用 set-priority 动作设置的优先级。</ArgTableRow>
<ArgTableRow arg="dscp" typ="super { !
, dscp: num [0 .. 63]
 }">匹配 DSCP IP 头字段。</ArgTableRow>
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
匹配数据包，直到达到限制速率（数据包速率或位速率）。带有此匹配器的规则会一直匹配，直到达到该限制。参数采用以下格式：`rate[/time],burst:mode`。
- `rate` - 每个时间间隔内要匹配的数据包或位计数。
- `time` - 指定不能超过数据包或位速率的时间间隔（可选，如果未指定则使用 1s）。
- `burst` - 要匹配的初始数据包或位数量：该数量每 10ms 重新充填，因此 burst 至少应为每秒速率的 1/100。
-  `mode` - 数据包或位模式。
</ArgTableRow>
<ArgTableRow arg="dst-limit" typ="super { count: num
, [time] [ /time]
, [burst] ,num
, [mode] ,enum (dst-address | dst-address-and-port | src-address | src-and-dst-addresses | addresses-and-dst-port) { dst-address:1, dst-address-and-port:3, src-address:4, src-and-dst-addresses:5, addresses-and-dst-port:7 }
, [expire] [ /time]
 }">
匹配数据包，直到超过给定速率。速率定义为每个时间间隔的数据包数。与 `limit` 匹配器不同，每个流都有自己的限制。流由 mode 参数定义。参数采用以下格式：`rate[/time],burst,mode[/expire]`。
- `rate` - 每个流每个时间间隔要匹配的数据包计数。
- `time` - 指定每个流的数据包计数速率不能超过的时间间隔（可选，如果未指定则使用 1s）。
- `burst` - 每个流要匹配的初始数据包数量：每次 time/rate 增加 1，直到达到该数量。
- `mode` - 指定哪些唯一字段定义流（src-address、dst-address、src-and-dst-address、dst-address-and-port、addresses-and-dst-port）。
- `expire` - 指定无数据包的流在多久之后允许被删除的时间间隔（可选）。
</ArgTableRow>
<ArgTableRow arg="time" typ="super { !
, start: time [0 .. 86400]
, [end] -time [0 .. 86400]
, [day] ,ubit (sun, mon, tue, wed, thu, fri, sat)
 }">根据数据包的到达时间和日期创建过滤器；对于本地生成的数据包，则根据离开时间和日期创建。匹配器会考虑路由器上配置的时间和时区。</ArgTableRow>
<ArgTableRow arg="random" typ="super { percent: num [1 .. 99]
 }">以给定概率随机匹配数据包。</ArgTableRow>
<ArgTableRow arg="nth" typ="super { !
, every: num [1 .. ]
, [packet] [ ,num [1 .. ]]
 }">匹配每第 n 个数据包：`nth=2,1` 将匹配每 2 个数据包中的第 1 个，因此会匹配规则所处理全部流量的 50%。</ArgTableRow>
<ArgTableRow arg="tcp-mss" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">匹配 IP 数据包的 TCP MSS 值。</ArgTableRow>
<ArgTableRow arg="per-connection-classifier" typ="super { !
, values-to-hash: enum (src-address | dst-address | both-addresses | src-port | src-address-and-port | dst-port | dst-address-and-port | both-ports | both-addresses-and-ports) { src-address:1, dst-address:2, both-addresses:3, src-port:4, src-address-and-port:5, dst-port:8, dst-address-and-port:10, both-ports:12, both-addresses-and-ports:15 }
, [denominator] :num [1 .. ]
, [remainder] /num [0 .. ]
 }">PCC 匹配器允许将流量划分为相等的流，并能够将具有特定选项集的数据包保留在同一个特定流中。</ArgTableRow>
<ArgTableRow arg="packet-size" typ="super { !
, min: num [ .. 65535]
, [max] -num [ .. 65535]
 }">匹配指定大小或大小范围（以字节为单位）的数据包。</ArgTableRow>
<ArgTableRow arg="log" typ="bool">向系统日志添加一条包含以下数据的消息：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。即使动作不是 `log`，也允许记录数据包，这对于调试防火墙很有用。</ArgTableRow>
<ArgTableRow arg="log-prefix" typ="string">在每条日志消息的开头添加指定文本。仅在配置了 `action=log` 或 `log=yes` 时适用。</ArgTableRow>
<ArgTableRow arg="ipsec-policy" typ="super { direction: enum (in | out) { in:0, out:1 }
, [policy] ,enum (none | ipsec) { none:0, ipsec:1 }
 }">
匹配 IPsec 使用的策略。值采用以下格式：`direction, policy`。
- `in` - 在 PREROUTING、INPUT 和 FORWARD 链中有效。
- `out` - 在 POSTROUTING、OUTPUT 和 FORWARD 链中有效。
- `ipsec` - 如果数据包经过 IPsec 处理，则匹配。
- `none` - 匹配不经过 IPsec 处理的数据包。
</ArgTableRow>
</ArgTable>
