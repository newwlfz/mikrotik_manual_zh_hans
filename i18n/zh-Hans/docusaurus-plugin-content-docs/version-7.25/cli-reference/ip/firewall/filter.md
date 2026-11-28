---
title: "filter"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/firewall/filter
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/firewall/filter 
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="all" typ="switch"></ArgTableRow>
<ArgTableRow arg="static" typ="switch"></ArgTableRow>
<ArgTableRow arg="dynamic" typ="switch"></ArgTableRow>
<ArgTableRow arg="chain" typ="enum" mandatory="1">Specifies to which chain the rule will be added. If the input does not match the name of an already defined chain, a new chain will be created.</ArgTableRow>
<ArgTableRow arg="action" typ="enum (accept | jump | return | log | passthrough | add-src-to-address-list | add-dst-to-address-list | drop | reject | tarpit | fasttrack-connection) { accept:0, jump:1, return:2, log:3, passthrough:4, add-src-to-address-list:5, add-dst-to-address-list:6, drop:10, reject:11, tarpit:12, fasttrack-connection:40 }">
Action to take if a packet is matched by the rule:

- `accept` - 接受数据包。数据包不会传递给下一条防火墙规则。
- `add-dst-to-address-list` - 将目标地址添加到由 `address-list` 参数指定的地址列表中。
- `add-src-to-address-list` - 将源地址添加到由 `address-list` 参数指定的地址列表中。
- `jump` - 跳转到由 `jump-target` 参数值指定的用户自定义链。
- `log` - 向系统日志添加一条消息，包含以下数据：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。数据包匹配后，会传递给列表中的下一条规则，类似于 `passthrough`。
- `passthrough` - 如果数据包被规则匹配，则增加计数器并转到下一条规则（用于统计）。
- `return` - 将控制权交回发生跳转的链。
- `drop` - 丢弃数据包。
- `reject` - 拒绝数据包并发送 ICMP 响应。
- `tarpit` - 捕获并保持连接打开。
- `fasttrack-connection` - 对连接启用 fasttrack。
</ArgTableRow>
<ArgTableRow arg="jump-target" typ="enum ()">要跳转到的目标链名称。仅适用于 `action=jump`。</ArgTableRow>
<ArgTableRow arg="reject-with" typ="enum (icmp-network-unreachable | icmp-host-unreachable | icmp-protocol-unreachable | icmp-port-unreachable | icmp-net-prohibited | icmp-host-prohibited | tcp-reset | icmp-admin-prohibited) { icmp-network-unreachable:0, icmp-host-unreachable:1, icmp-protocol-unreachable:2, icmp-port-unreachable:3, icmp-net-prohibited:5, icmp-host-prohibited:6, tcp-reset:7, icmp-admin-prohibited:8 }">
指定数据包被拒绝时发回的 [ICMP 错误](https://www.iana.org/assignments/icmp-parameters/icmp-parameters.xhtml)。适用于 `action=reject`。

- `icmp-network-unreachable` - 发送 ICMP 端口不可达消息。ICMP type 3，code 0
- `icmp-host-unreachable` - 发送 ICMP 端口不可达消息。ICMP type 3，code 1
- `icmp-protocol-unreachable` - 发送 ICMP 端口不可达消息。ICMP type 3，code 2
- `icmp-port-unreachable` - 发送 ICMP 端口不可达消息。ICMP type 3，code 3
- `icmp-net-prohibited` - 发送 ICMP 地址禁止消息。ICMP type 3，code 9
- `icmp-host-prohibited` - 发送 ICMP 地址禁止消息。ICMP type 3，code 10
- `tcp-reset` - 发送设置了 RST 标志的 TCP 段。
- `icmp-admin-prohibited` - 发送 ICMP 地址禁止消息。ICMP type 3，code 13
</ArgTableRow>
<ArgTableRow arg="hw-offload" typ="bool" syscap="crs_prestera">启用或禁用 [FastTrack 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading#offloading-fasttrack-connections)。仅在[支持 FastTrack 卸载的交换机](/docs/bridging-and-switching/l3-hardware-offloading)上且设置了 `action=fasttrack-connection` 时受支持。</ArgTableRow>
<ArgTableRow arg="tcp-flags" typ="super { !,
, flags: multi { array-id, array-id, flag: super { !
, flag: enum (fin | syn | rst | psh | ack | urg | ece | cwr) { fin:0, syn:1, rst:2, psh:3, ack:4, urg:5, ece:6, cwr:7 }
 }
 }
 }">
匹配指定的 TCP 标志：

- `ack` - 确认数据。
- `cwr` - 拥塞窗口减小。
- `ece` - ECN-echo 标志（显式拥塞通知）。
- `fin` - 关闭连接。
- `psh` - push 功能。
- `rst` - 重置连接。
- `syn` - 新连接。
- `urg` - 紧急数据。
</ArgTableRow>
<ArgTableRow arg="p2p" typ="super { !
, p2p: enum (fasttrack | gnutella | direct-connect | edonkey | bit-torrent | blubster | soulseek | winmx | warez | all-p2p) { fasttrack:0x01, gnutella:0x02, direct-connect:0x03, edonkey:0x04, bit-torrent:0x05, blubster:0x06, soulseek:0x07, winmx:0x08, warez:0x09, all-p2p:0xFF }
 }">匹配部分未加密的 P2P 协议。由于目前大多数流量均已加密且需要深度数据包检测才能识别，该参数已弃用。仅支持 IPv4。</ArgTableRow>
<ArgTableRow arg="connection-state" typ="super { !
, state: ubit (invalid, established, related, new, untracked)
 }">
解释特定数据包连接跟踪分析数据：

- `established` - 属于现有连接的数据包。
- `invalid` - 在连接跟踪中没有确定状态的数据包（通常是严重乱序的数据包、序列号或确认号错误的数据包，或路由器资源使用过度的情况）。无效数据包不会参与 NAT（因为只有 `connection-state=new` 的数据包会参与），并且在路由时仍将包含原始源 IP 地址。应在防火墙过滤器 forward 和 input 链中丢弃所有 `connection-state=invalid` 数据包。
- `new` - 数据包已开始一个新连接，或以其他方式与一个尚未在两个方向上都有数据包的连接相关联。
- `related` - 与现有连接相关但不属于该连接的数据包，例如 ICMP 错误或开始 FTP 数据连接的数据包。
- `untracked` - 已在防火墙 RAW 表中设置为绕过连接跟踪的数据包。
</ArgTableRow>
<ArgTableRow arg="connection-nat-state" typ="super { !
, state: ubit (srcnat, dstnat, ein-snat, ein-dnat)
 }">
匹配经过源地址转换、目标地址转换或两者都进行的数据包连接。`connection-state=related` 连接的 connection-nat-state 由第一个数据包的方向决定，如果连接跟踪需要使用 dst-nat 将该连接传送到与主连接相同的主机，则即使根本没有 dst-nat 规则，它也会处于 connection-nat-state=dstnat。
使用 endpoint-independent NAT 时，`ein-snat` 和 `ein-dnat` 分别是经过源地址转换和目标地址转换的连接。
</ArgTableRow>
<ArgTableRow arg="tls-host" typ="super { !
, tls-host: string
 }">根据 TLS SNI 主机名匹配 HTTPS 流量。接受 GLOB 语法进行通配符匹配。如果 TLS 握手帧被拆分为多个 TCP 段，匹配器将无法匹配该主机名。</ArgTableRow>
<ArgTableRow arg="connection-limit" typ="super { !
, limit: num
, [netmask] ,num
 }">在达到给定值后，按地址或地址块匹配连接。应将其与 `connection-state=new` 和/或 `tcp-flags=syn` 一起使用，因为该匹配器非常消耗资源。</ArgTableRow>
<ArgTableRow arg="layer7-protocol" typ="super { !
, protocol: enum
 }">在 layer7 protocol 菜单中定义的 Layer7 过滤器名称。</ArgTableRow>
<ArgTableRow arg="realm" typ="super { !
, realm: num
 }">匹配路由 realm。仅支持 IPv4。</ArgTableRow>
<ArgTableRow arg="protocol" typ="super { !
, protocol: enum ()
 }">按协议名称或编号匹配指定的 IP 协议。</ArgTableRow>
<ArgTableRow arg="src-address" typ="super { !
, range: ipRange
 }">匹配源地址等于指定 IP 或位于指定 IP 范围内的数据包。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, range: ipRange
 }">匹配目标地址等于指定 IP 或位于指定 IP 范围内的数据包。</ArgTableRow>
<ArgTableRow arg="fragment" typ="super { fragment: bool
 }">匹配分片数据包。第一个（起始）分片不计入。如果启用了连接跟踪，则不会有分片，因为系统会自动重组每个数据包。仅支持 IPv4。</ArgTableRow>
<ArgTableRow arg="psd" typ="super { weight-threshold: num
, [delay-threshold] ,time
, [low-port-weight] ,num
, [high-port-weight] ,num
 }">
尝试检测 TCP 和 UDP 扫描。参数采用以下格式：`WeightThreshold, DelayThreshold, LowPortWeight, HighPortWeight`。
- `WeightThreshold` - 来自同一主机、具有不同目标端口的最新 TCP/UDP 数据包的总权重，达到该值即视为端口扫描序列。
- `DelayThreshold` - 来自同一主机、具有不同目标端口的数据包之间的延迟，达到该值即视为可能的端口扫描子序列。
- `LowPortWeight` - 目标端口为特权端口（&lt;1024）的数据包权重。
- `HighPortWeight` - 目标端口为非特权端口的数据包权重。仅支持 IPv4。
</ArgTableRow>
<ArgTableRow arg="ipv4-options" typ="super { options: enum (strict-source-routing | loose-source-routing | no-source-routing | record-route | no-record-route | timestamp | no-timestamp | router-alert | no-router-alert | any | none) { strict-source-routing:0x1, loose-source-routing:0x2, no-source-routing:0x4, record-route:0x8, no-record-route:0x10, timestamp:0x20, no-timestamp:0x40, router-alert:0x80, no-router-alert:0x100, any:0x200, none:0x400 }
 }">
匹配 IPv4 报头选项。
- `any` - 匹配至少包含一个 IPv4 选项的数据包。
- `loose-source-routing` - 匹配包含松散源路由选项的数据包。
- `no-record-route` - 匹配没有记录路由选项的数据包。
- `no-router-alert` - 匹配没有路由器告警选项的数据包。
- `no-source-routing` - 匹配没有源路由选项的数据包。
- `no-timestamp` - 匹配没有时间戳选项的数据包。
- `record-route` - 匹配包含记录路由选项的数据包。
- `router-alert` - 匹配包含路由器告警选项的数据包。
- `strict-source-routing` - 匹配包含严格源路由选项的数据包。
- `timestamp` - 匹配带有时间戳的数据包。仅支持 IPv4。
</ArgTableRow>
<ArgTableRow arg="src-address-type" typ="super { !
, type: ubit (unicast, local, broadcast, multicast, blackhole)
 }">
匹配源地址类型：
- `unicast` - 用于点对点传输的 IP 地址。
- `local` - 该地址分配给路由器的某个接口。
- `broadcast` - 数据包发送到子网中的所有设备。
- `multicast` - 数据包转发到一组指定的设备。
</ArgTableRow>
<ArgTableRow arg="dst-address-type" typ="super { !
, type: ubit (unicast, local, broadcast, multicast, blackhole)
 }">
匹配目标地址类型：
- `unicast` - 用于点对点传输的 IP 地址。
- `local` - 目标地址分配给路由器的某个接口。
- `broadcast` - 数据包发送到子网中的所有设备。
- `multicast` - 数据包转发到一组指定的设备。
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
根据各种 HotSpot 匹配器匹配从 HotSpot 客户端收到的数据包。
- `auth` - 匹配已认证的 HotSpot 客户端数据包。
- `from-client` - 匹配来自 HotSpot 客户端的数据包。
- `http` - 匹配发送到 HotSpot 服务器的 HTTP 请求。
- `local-dst` - 匹配目标为 HotSpot 服务器的数据包。
- `to-client` - 匹配发送到 HotSpot 客户端的数据包。仅支持 IPv4。
</ArgTableRow>
<ArgTableRow arg="address-list" typ="enum ()">要使用的地址列表名称。适用于 `add-dst-to-address-list` 或 `add-src-to-address-list` 动作。</ArgTableRow>
<ArgTableRow arg="address-list-timeout" typ="alt { address-list-timeout: enum (none-dynamic | none-static) { none-dynamic:0, none-static:0xffffffff }
, address-list-timeout: time [ .. 21474836]
 }">
在 `add-src-to-address-list` 或 `add-dst-to-address-list` 动作添加地址后，该地址在 `address-list` 中保留的时间。使用时间值时，规则会添加动态条目（`D`），路由器会在时间结束时删除该条目；每次规则重新匹配都会将时间重置为完整值。最大值为 `35w3d13h13m56s`。如果地址已是列表中的静态条目，则保持静态。
- `none-dynamic`（`0s`） - 添加不带超时时间的动态条目。该条目不会保存在配置中，重启后会被清除。
- `none-static` - 添加静态条目。该条目会保存在配置和导出中，并在重启后保留，直到你将其删除。
</ArgTableRow>
<ArgTableRow arg="ttl" typ="super { mode: enum (equal | not-equal | less-than | greater-than) { equal:0, not-equal:1, less-than:2, greater-than:3 }
, [value] :num [0 .. 255]
 }">匹配数据包的 TTL 值。仅支持 IPv4。</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能标记了指定连接标记的数据包。如果设置了 `no-mark`，规则将匹配任何未标记的连接。</ArgTableRow>
<ArgTableRow arg="connection-type" typ="super { !
, type: enum (ftp | pptp | h323 | sip | irc | quake3 | tftp) { ftp:0, pptp:1, h323:2, sip:3, irc:4, quake3:5, tftp:6 }
 }">根据连接跟踪辅助器的信息，匹配来自相关连接的数据包。相应的连接辅助器必须在 `/ip/firewall/service-port` 下启用。</ArgTableRow>
<ArgTableRow arg="connection-bytes" typ="super { from: num
, [to] -num
 }">仅当指定字节数已通过该连接传输时才匹配数据包。0 表示无穷大，例如 `connection-bytes=2000000-0` 表示如果相关连接已传输超过 2MB，则规则匹配。</ArgTableRow>
<ArgTableRow arg="connection-rate" typ="super { !
, from: num
, [to] -num
 }">允许根据连接的当前速度捕获流量。</ArgTableRow>
<ArgTableRow arg="routing-mark" typ="super { !
, mark: enum ()
 }">匹配由 mangle 功能标记了指定路由标记的数据包。</ArgTableRow>
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
 }">当进入接口是网桥时，数据包进入路由器的实际接口。仅在网桥设置中启用 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="out-bridge-port" typ="super { !
, interface: iface_enum
 }">当离开接口是网桥时，数据包离开路由器的实际接口。仅在网桥设置中启用 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="in-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `in-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="out-bridge-port-list" typ="super { !
, interface-list: enum
 }">接口列表中定义的接口集合。工作方式与 `out-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="packet-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能标记了指定数据包标记的数据包。如果设置了 `no-mark`，规则将匹配任何未标记的数据包。</ArgTableRow>
<ArgTableRow arg="src-port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">源端口和源端口范围列表。仅在协议为 TCP 或 UDP 时适用。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">目标端口号或端口号范围列表。</ArgTableRow>
<ArgTableRow arg="port" typ="super { !
, port: multi { range: range [ .. 65535]
 }
 }">如果任意端口（源端口或目标端口）匹配指定的端口或端口范围列表，则匹配。仅在 `protocol` 为 TCP 或 UDP 时适用。</ArgTableRow>
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
 }">匹配设置新优先级后的数据包优先级。优先级可能来自 VLAN、WMM、DSCP、MPLS EXP 位，或来自使用 set-priority 动作设置的优先级。</ArgTableRow>
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
匹配速率受限以内的数据包（数据包速率或比特速率）。带有该匹配器的规则将匹配，直到达到此限制。参数采用以下格式：`rate[/time],burst:mode`。
- `rate` - 每个时间间隔要匹配的数据包数或比特数。
- `time` - 指定不能超过数据包速率或比特速率的时间间隔（可选，未指定时使用 1s）。
- `burst` - 要匹配的初始数据包数或比特数：该数值每 10ms 补充一次，因此 burst 至少应为每秒速率的 1/100。
- `mode` - 数据包模式或比特模式。
</ArgTableRow>
<ArgTableRow arg="dst-limit" typ="super { count: num
, [time] [ /time]
, [burst] ,num
, [mode] ,enum (dst-address | dst-address-and-port | src-address | src-and-dst-addresses | addresses-and-dst-port) { dst-address:1, dst-address-and-port:3, src-address:4, src-and-dst-addresses:5, addresses-and-dst-port:7 }
, [expire] [ /time]
 }">
匹配数据包，直到超过给定速率。速率定义为每个时间间隔的数据包数。与 `limit` 匹配器不同，每个流都有自己的限制。流由 mode 参数定义。参数采用以下格式：`rate[/time],burst,mode[/expire]`。
- `rate` - 每个时间间隔每个流要匹配的数据包数。
- `time` - 指定每个流不能超过数据包计数速率的时间间隔（可选，未指定时使用 1s）。
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
 }">每 n 个数据包匹配一次：`nth=2,1` 将匹配每 2 个数据包中的第 1 个，因此规则会匹配所有流量的 50%。</ArgTableRow>
<ArgTableRow arg="tcp-mss" typ="super { !
, min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">匹配 IP 数据包的 TCP MSS 值。</ArgTableRow>
<ArgTableRow arg="per-connection-classifier" typ="super { !
, values-to-hash: enum (src-address | dst-address | both-addresses | src-port | src-address-and-port | dst-port | dst-address-and-port | both-ports | both-addresses-and-ports) { src-address:1, dst-address:2, both-addresses:3, src-port:4, src-address-and-port:5, dst-port:8, dst-address-and-port:10, both-ports:12, both-addresses-and-ports:15 }
, [denominator] :num [1 .. ]
, [remainder] /num [0 .. ]
 }">PCC 匹配器允许将流量划分为多个相等的流，并可将具有特定选项组合的数据包保持在同一个流中。</ArgTableRow>
<ArgTableRow arg="packet-size" typ="super { !
, min: num [ .. 65535]
, [max] -num [ .. 65535]
 }">匹配指定大小或大小范围（以字节为单位）的数据包。</ArgTableRow>
<ArgTableRow arg="log" typ="bool">向系统日志添加一条消息，包含以下数据：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。即使动作不是 `log`，也允许记录数据包，适用于调试防火墙。</ArgTableRow>
<ArgTableRow arg="log-prefix" typ="string">在每条日志消息的开头添加指定文本。适用于配置了 `action=log` 或 `log=yes` 的情况。</ArgTableRow>
<ArgTableRow arg="ipsec-policy" typ="super { direction: enum (in | out) { in:0, out:1 }
, [policy] ,enum (none | ipsec) { none:0, ipsec:1 }
 }">
匹配 IPsec 使用的策略。值采用以下格式：`direction, policy`。
- `in` - 在 PREROUTING、INPUT 和 FORWARD 链中有效。
- `out` - 在 POSTROUTING、OUTPUT 和 FORWARD 链中有效。
- `ipsec` - 如果数据包需要进行 IPsec 处理，则匹配。
- `none` - 匹配不需要进行 IPsec 处理的数据包。
</ArgTableRow>
</ArgTable>
