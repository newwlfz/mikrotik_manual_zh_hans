---
sidebar_key: "cli-reference/ip/firewall/nat"
title: "nat"
sidebar_label: 'nat'
source: https://manual.mikrotik.com/docs/cli-reference/ip/firewall/nat
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/firewall/nat {#ipfirewallnat}
**类型：** 目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="all" typ="switch"></ArgTableRow>
<ArgTableRow arg="static" typ="switch"></ArgTableRow>
<ArgTableRow arg="dynamic" typ="switch"></ArgTableRow>
<ArgTableRow arg="chain" typ="enum" mandatory="1">指定规则将添加到哪个链。如果输入与已定义链的名称不匹配，则会创建一个新链。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (accept | jump | return | log | passthrough | add-src-to-address-list | add-dst-to-address-list | src-nat | masquerade | dst-nat | redirect | same | netmap | endpoint-independent-nat | socksify) { accept:0, jump:1, return:2, log:3, passthrough:4, add-src-to-address-list:5, add-dst-to-address-list:6, src-nat:20, masquerade:21, dst-nat:22, redirect:23, same:24, netmap:25, endpoint-independent-nat:26, socksify:27 }">
如果数据包被规则匹配，则要执行的动作：
- `accept` - 接受数据包。数据包不会传递给下一条防火墙规则。
- `add-dst-to-address-list` - 将目标地址添加到由 `address-list` 参数指定的地址列表。
- `add-src-to-address-list` - 将源地址添加到由 `address-list` 参数指定的地址列表。
- `jump` - 跳转到由 `jump-target` 参数值指定的用户定义链。
- `log` - 向系统日志添加一条包含以下数据的消息：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。数据包匹配后，会传递给列表中的下一条规则，类似于 `passthrough`。
- `passthrough` - 如果数据包被规则匹配，则增加计数器并转到下一条规则（对统计有用）。
- `return` - 将控制权返回到发生跳转的链。
- `src-nat` - 用 `to-addresses` 和 `to-ports` 参数指定的值替换 IP 数据包的源地址。
- `masquerade` - 用 `to-ports` 参数指定的端口替换 IP 数据包的源端口，并用路由设施确定的 IP 替换 IP 数据包的源地址。
- `dst-nat` - 用 `to-addresses` 和 `to-ports` 参数指定的值替换 IP 数据包的目标地址和/或端口。
- `redirect` - 用 `to-ports` 参数指定的端口替换 IP 数据包的目标端口，并将目标地址替换为虚拟或物理入接口（接收数据包的接口）的地址。
- `same` - 为特定客户端在来自所提供范围的每个连接中提供相同的源/目标 IP 地址。这最常用于期望同一客户端的多个连接使用相同客户端地址的服务。
- `netmap` - 创建一组 IP 地址到另一组 IP 地址的静态 1:1 映射。常用于将公网 IP 地址分配给专用网络中的主机。
- `endpoint-independent-nat` - 使用端点无关映射和过滤。仅适用于 UDP 协议。
- `socksify` - 通过 SOCKS 代理服务器路由防火墙规则指定的流量。需要 `socks5-server` 和 `socks5-port` 参数，或 `socksify-service` 参数。[相关 socksify 信息](../../../../network-management/socks/socksify.md)
</ArgTableRow>
<ArgTableRow arg="jump-target" typ="enum ()">要跳转到的目标链名称。仅当 `action=jump` 时适用。</ArgTableRow>
<ArgTableRow arg="to-addresses" typ="super { min: ipRange
 }">用指定地址替换原始地址。当动作为 `dst-nat`、`netmap`、`same`、`src-nat` 时适用。</ArgTableRow>
<ArgTableRow arg="to-ports" typ="super { min: num [0 .. 65535]
, [max] -num [0 .. 65535]
 }">用指定端口替换原始端口。当动作为 `dst-nat`、`redirect`、`masquerade`、`netmap`、`same`、`src-nat` 时适用。</ArgTableRow>
<ArgTableRow arg="same-not-by-dst" typ="bool">指定在选择新源 IP 地址时是否考虑目标 IP 地址。仅当 `action=same` 时适用。</ArgTableRow>
<ArgTableRow arg="randomise-ports" typ="bool">随机化端口转换。</ArgTableRow>
<ArgTableRow arg="socksify-service" typ="enum">SOCKS 服务名称。</ArgTableRow>
<ArgTableRow arg="socks5-server" typ="ipAddr">SOCKS5 服务器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="socks5-port" typ="num">SOCKS5 服务器的端口。</ArgTableRow>
<ArgTableRow arg="connection-limit" typ="super { !
, limit: num
, [netmask] ,num
 }">在达到给定值后按地址或地址块匹配连接。应将其与 `connection-state=new` 和/或 `tcp-flags=syn` 一起使用，因为该匹配器非常消耗资源。</ArgTableRow>
<ArgTableRow arg="layer7-protocol" typ="super { !
, protocol: enum
 }">在 layer7 协议菜单中定义的 Layer7 过滤器名称。</ArgTableRow>
<ArgTableRow arg="realm" typ="super { !
, realm: num
 }">匹配路由 realm。仅 IPv4。</ArgTableRow>
<ArgTableRow arg="protocol" typ="super { !
, protocol: enum ()
 }">匹配由协议名称或编号指定的特定 IP 协议。</ArgTableRow>
<ArgTableRow arg="src-address" typ="super { !
, range: ipRange
 }">匹配源等于指定 IP 或落入指定 IP 范围的数据包。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, range: ipRange
 }">匹配目标等于指定 IP 或落入指定 IP 范围的数据包。</ArgTableRow>
<ArgTableRow arg="fragment" typ="super { fragment: bool
 }">匹配分片数据包。第一个（起始）分片不计入。如果启用了连接跟踪，则不会出现分片，因为系统会自动重组每个数据包。仅 IPv4。</ArgTableRow>
<ArgTableRow arg="psd" typ="super { weight-threshold: num
, [delay-threshold] ,time
, [low-port-weight] ,num
, [high-port-weight] ,num
 }">
尝试检测 TCP 和 UDP 扫描。参数采用以下格式：`WeightThreshold, DelayThreshold, LowPortWeight, HighPortWeight`。
- `WeightThreshold` - 来自同一主机、具有不同目标端口的最新 TCP/UDP 数据包被视为端口扫描序列的总权重。
- `DelayThreshold` - 来自同一主机、具有不同目标端口的数据包被视为可能的端口扫描子序列的延迟。
- `LowPortWeight` - 具有特权目标端口（&lt;1024）的数据包的权重。
- `HighPortWeight` - 具有非特权目标端口的数据包的权重。仅 IPv4。
</ArgTableRow>
<ArgTableRow arg="ipv4-options" typ="super { options: enum (strict-source-routing | loose-source-routing | no-source-routing | record-route | no-record-route | timestamp | no-timestamp | router-alert | no-router-alert | any | none) { strict-source-routing:0x1, loose-source-routing:0x2, no-source-routing:0x4, record-route:0x8, no-record-route:0x10, timestamp:0x20, no-timestamp:0x40, router-alert:0x80, no-router-alert:0x100, any:0x200, none:0x400 }
 }">
匹配 IPv4 报头选项。
- `any` - 匹配至少带有一个 IPv4 选项的数据包。
- `loose-source-routing` - 匹配带有宽松源路由选项的数据包。
- `no-record-route` - 匹配不带记录路由选项的数据包。
- `no-router-alert` - 匹配不带路由器告警选项的数据包。
- `no-source-routing` - 匹配不带源路由选项的数据包。
- `no-timestamp` - 匹配不带时间戳选项的数据包。
- `record-route` - 匹配带有记录路由选项的数据包。
- `router-alert` - 匹配带有路由器告警选项的数据包。
- `strict-source-routing` - 匹配带有严格源路由选项的数据包。
- `timestamp` - 匹配带有时间戳的数据包。仅 IPv4。
</ArgTableRow>
<ArgTableRow arg="src-address-type" typ="super { !
, type: ubit (unicast, local, broadcast, multicast, blackhole)
 }">
匹配源地址类型：
- `unicast` - 用于点对点传输的 IP 地址。
- `local` - 该地址分配给路由器的某个接口。
- `broadcast` - 数据包发送到子网中的所有设备。
- `multicast` - 数据包转发到定义的设备组。
</ArgTableRow>
<ArgTableRow arg="dst-address-type" typ="super { !
, type: ubit (unicast, local, broadcast, multicast, blackhole)
 }">
匹配目标地址类型：
- `unicast` - 用于点对点传输的 IP 地址。
- `local` - 目标地址分配给路由器的某个接口。
- `broadcast` - 数据包发送到子网中的所有设备。
- `multicast` - 数据包转发到定义的设备组。
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
- `auth` - 匹配已认证 HotSpot 客户端的数据包。
- `from-client` - 匹配来自 HotSpot 客户端的数据包。
- `http` - 匹配发送到 HotSpot 服务器的 HTTP 请求。
- `local-dst` - 匹配发往 HotSpot 服务器的数据包。
- `to-client` - 匹配发送到 HotSpot 客户端的数据包。仅 IPv4。
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
 }">匹配数据包 TTL 值。仅 IPv4。</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能用特定连接标记标记的数据包。如果设置了 `no-mark`，该规则将匹配任何未标记的连接。</ArgTableRow>
<ArgTableRow arg="connection-type" typ="super { !
, type: enum (ftp | pptp | h323 | sip | irc | quake3 | tftp) { ftp:0, pptp:1, h323:2, sip:3, irc:4, quake3:5, tftp:6 }
 }">根据连接跟踪 helper 提供的信息，匹配来自相关连接的数据包。必须在 `/ip/firewall/service-port` 下启用相关的连接 helper。</ArgTableRow>
<ArgTableRow arg="connection-bytes" typ="super { from: num
, [to] -num
 }">仅当通过特定连接传输了给定数量的字节时才匹配数据包。0 表示无限，例如 `connection-bytes=2000000-0` 表示如果通过相关连接传输了超过 2MB，则规则匹配。</ArgTableRow>
<ArgTableRow arg="connection-rate" typ="super { !
, from: num
, [to] -num
 }">允许根据连接的当前速度捕获流量。</ArgTableRow>
<ArgTableRow arg="routing-mark" typ="super { !
, mark: enum ()
 }">匹配由 mangle 功能用特定路由标记标记的数据包。</ArgTableRow>
<ArgTableRow arg="in-interface" typ="super { !
, interface: iface_enum
 }">数据包进入路由器时所经过的接口。</ArgTableRow>
<ArgTableRow arg="out-interface" typ="super { !
, interface: iface_enum
 }">数据包离开路由器时所经过的接口。</ArgTableRow>
<ArgTableRow arg="in-interface-list" typ="super { !
, interface-list: enum
 }">在接口列表中定义的接口集合。工作方式与 `in-interface` 相同。</ArgTableRow>
<ArgTableRow arg="out-interface-list" typ="super { !
, interface-list: enum
 }">在接口列表中定义的接口集合。工作方式与 `out-interface` 相同。</ArgTableRow>
<ArgTableRow arg="in-bridge-port" typ="super { !
, interface: iface_enum
 }">如果入接口是网桥，则为数据包进入路由器时实际经过的接口。仅当在网桥设置中启用了 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="out-bridge-port" typ="super { !
, interface: iface_enum
 }">如果出接口是网桥，则为数据包离开路由器时实际经过的接口。仅当在网桥设置中启用了 `use-ip-firewall` 时有效。</ArgTableRow>
<ArgTableRow arg="in-bridge-port-list" typ="super { !
, interface-list: enum
 }">在接口列表中定义的接口集合。工作方式与 `in-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="out-bridge-port-list" typ="super { !
, interface-list: enum
 }">在接口列表中定义的接口集合。工作方式与 `out-bridge-port` 相同。</ArgTableRow>
<ArgTableRow arg="packet-mark" typ="super { !
, mark: enum
 }">匹配由 mangle 功能用特定数据包标记标记的数据包。如果设置了 `no-mark`，该规则将匹配任何未标记的数据包。</ArgTableRow>
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
 }">如果任何（源或目标）端口匹配指定的端口或端口范围列表，则匹配。仅当 `protocol` 为 TCP 或 UDP 时适用。</ArgTableRow>
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
 }">匹配设置新优先级后的数据包优先级。优先级可来自 VLAN、WMM、DSCP、MPLS EXP 位，或来自通过 set-priority 动作设置的优先级。</ArgTableRow>
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
匹配不超过限制速率（数据包速率或比特速率）的数据包。带有此匹配器的规则会一直匹配，直到达到该限制。参数采用以下格式：`rate[/time],burst:mode`。
- `rate` - 每个时间间隔要匹配的数据包数或比特数。
- `time` - 指定不能超过数据包速率或比特速率的时间间隔（可选，未指定时将使用 1s）。
- `burst` - 要匹配的初始数据包数或比特数：该数值每 10ms 重新补充，因此 burst 应至少为每秒速率的 1/100。
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
- `time` - 指定每个流的数据包计数速率不能超过的时间间隔（可选，未指定时将使用 1s）。
- `burst` - 每个流要匹配的初始数据包数：该数值每隔 time/rate 增加一，直到达到该数值。
- `mode` - 指定哪些唯一字段定义流（src-address、dst-address、src-and-dst-address、dst-address-and-port、addresses-and-dst-port）。
- `expire` - 指定无数据包的流在多长时间后允许被删除（可选）。
</ArgTableRow>
<ArgTableRow arg="time" typ="super { !
, start: time [0 .. 86400]
, [end] -time [0 .. 86400]
, [day] ,ubit (sun, mon, tue, wed, thu, fri, sat)
 }">根据数据包的到达时间和日期创建过滤器；对于本地生成的数据包，则根据离开时间和日期创建。该匹配器会考虑路由器上配置的时间和时区。</ArgTableRow>
<ArgTableRow arg="random" typ="super { percent: num [1 .. 99]
 }">按给定概率随机匹配数据包。</ArgTableRow>
<ArgTableRow arg="nth" typ="super { !
, every: num [1 .. ]
, [packet] [ ,num [1 .. ]]
 }">匹配每第 n 个数据包：`nth=2,1` 将匹配每 2 个数据包中的第 1 个，因此匹配该规则的所有流量中的 50%。</ArgTableRow>
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
<ArgTableRow arg="log" typ="bool">向系统日志添加一条包含以下数据的消息：in-interface、out-interface、src-mac、protocol、src-ip:port-&gt;dst-ip:port 以及数据包长度。即使动作不是 `log` 也允许记录数据包日志，这对于调试防火墙很有用。</ArgTableRow>
<ArgTableRow arg="log-prefix" typ="string">在每条日志消息开头添加指定文本。当配置了 `action=log` 或 `log=yes` 时适用。</ArgTableRow>
<ArgTableRow arg="ipsec-policy" typ="super { direction: enum (in | out) { in:0, out:1 }
, [policy] ,enum (none | ipsec) { none:0, ipsec:1 }
 }">
匹配 IPsec 使用的策略。值采用以下格式：`direction, policy`。
- `in` - 在 PREROUTING、INPUT 和 FORWARD 链中有效。
- `out` - 在 POSTROUTING、OUTPUT 和 FORWARD 链中有效。
- `ipsec` - 如果数据包需要经过 IPsec 处理，则匹配。
- `none` - 匹配不需要经过 IPsec 处理的数据包。
</ArgTableRow>
</ArgTable>
