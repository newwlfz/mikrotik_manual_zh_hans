---
sidebar_key: "cli-reference/ip/dhcp-server/lease/index"
sidebar_position: 2
title: "lease"
sidebar_label: 'lease'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/lease
captured_at: '2026-11-01T21:23:53+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/lease {#ipdhcp-serverlease}
**类型：** 目录

DHCP 服务器的租约。动态租约在客户端从地址池获取地址时创建；静态租约可为特定客户端提供固定地址、地址池或其自身设置。详情请参阅 [DHCP 服务器](../../../../network-management/dhcp/server.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该租约已被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="radius">该租约由 RADIUS 服务器分配。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该租约是动态的：它是在客户端从地址池获取地址时创建的。使用 `make-static` 将其转换为静态租约。</ArgTableRow>
<ArgTableRow arg="B" typ="blocked">客户端已被阻止（`block-access=yes`），不会收到服务器的回复。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { ip-address: ipAddr
, pool: enum
 }">静态租约的 IP 地址，或用于向客户端分配地址的 IP 地址池名称。使用 `0.0.0.0` 时，将使用服务器的地址池。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">该静态租约所针对客户端的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="use-src-mac" typ="bool">是否通过客户端数据包的源 MAC 地址而不是 DHCP 消息的客户端硬件地址字段（`chaddr`）来识别客户端。</ArgTableRow>
<ArgTableRow arg="client-id" typ="string">该静态租约所针对客户端的客户端标识符（选项 61），格式如 `active-client-id` 所示，例如 `1:4e:97:a1:4c:d1:38`。</ArgTableRow>
<ArgTableRow arg="rate-limit" typ="string">
客户端的带宽限制，格式为 `rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time]]]]`。速率单位为比特每秒，可选 `k` 或 `M` 后缀，缺失的 tx 值取自 rx 值。只有静态租约可以设置速率限制。

服务器会为租约地址创建一个名为 `dhcp-ds<hostname/MAC>` 的动态简单队列，并将此限制作为 `limit-at` 和 `max-limit`。
</ArgTableRow>
<ArgTableRow arg="routes" typ="object { route: composite { dst-address: address (flags=4/)
, gateway: [ composite { gateway: address (flags=46ivL)
, distance: [ num [1 .. 255]]
 }]
 }
 }">租约绑定期间服务器添加的路由，格式为以逗号分隔的 `dst-address/mask gateway distance` 条目，例如 `10.77.0.0/24 172.31.255.105 5`。</ArgTableRow>
<ArgTableRow arg="insert-queue-before" typ="enum (bottom | first) { bottom:0xffffffff, first:0 }">此租约创建的动态简单队列的放置位置：`first`（默认）放在 `/queue/simple` 顶部，`bottom` 放在末尾，或放在指定名称的队列之前。</ArgTableRow>
<ArgTableRow arg="parent-queue" typ="enum (none) { none:0 }">此租约创建的动态简单队列的父队列。默认值：none。</ArgTableRow>
<ArgTableRow arg="queue-type" typ="enum">此租约创建的动态简单队列的队列类型。</ArgTableRow>
<ArgTableRow arg="address-lists" typ="multi { array-id, address-list: string
 }">租约绑定期间，将租约地址添加到的防火墙地址列表。</ArgTableRow>
<ArgTableRow arg="server" typ="enum (all) { all:0 }">租约所属的 DHCP 服务器。使用 `all` 时，该静态租约在所有服务器上有效。</ArgTableRow>
<ArgTableRow arg="block-access" typ="bool">是否阻止客户端：服务器不响应客户端，租约获得 `B` 标志。默认值：no。</ArgTableRow>
<ArgTableRow arg="allow-dual-stack-queue" typ="bool">此租约与同一客户端的 DHCPv6 绑定是否共用一个动态简单队列，该队列随后同时包含 IPv4 和 IPv6 地址。默认值：yes。</ArgTableRow>
<ArgTableRow arg="lease-time" typ="time">此客户端的租约时间。未设置或设置为 `0s` 时，使用服务器的 `lease-time`。</ArgTableRow>
<ArgTableRow arg="always-broadcast" typ="bool">是否即使客户端未设置广播标志，也向其广播回复。默认值：no。</ArgTableRow>
<ArgTableRow arg="dhcp-option" typ="multi { array-id, option: enum
 }">要发送给此客户端的选项（`/ip/dhcp-server/option`）。它们优先于服务器和网络的选项。</ArgTableRow>
<ArgTableRow arg="dhcp-option-set" typ="enum (none)">要发送给此客户端的选项集（`/ip/dhcp-server/option/sets`）。它优先于服务器和网络的选项。</ArgTableRow>
<ArgTableRow arg="agent-circuit-id" typ="string">设置后，即使 MAC 地址或客户端 ID 不同，租约也会匹配其内中继代理信息包含此电路 ID 的请求。</ArgTableRow>
<ArgTableRow arg="agent-remote-id" typ="string">设置后，即使 MAC 地址或客户端 ID 不同，租约也会匹配其内中继代理信息包含此远程 ID 的请求。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (waiting | testing | declined | offered | bound | authorizing | conflict) { waiting:0, testing:1, declined:2, offered:3, bound:4, authorizing:5 }">
租约状态：
- `waiting` - 未使用的静态租约。
- `testing` - 服务器正在检查地址冲突（`conflict-detection`）。
- `offered` - 服务器已提供地址，并等待客户端的请求。
- `bound` - 客户端正在使用该地址。
- `authorizing` - 服务器正在等待 RADIUS 服务器的回复。
- `conflict` - 另一台主机已在使用该地址。租约会在租约时间内保留该地址不使用；当另一台主机不再响应时，`check-status` 会释放它。
- `declined` - 客户端通过 DHCPDECLINE 消息拒绝了该地址。
</ArgTableRow>
<ArgTableRow arg="expires-after" typ="time">租约到期前的时间。</ArgTableRow>
<ArgTableRow arg="last-seen" typ="alt { symbolic-names: enum (never | sometime) { never:0xffffffff, sometime:0xfffffffe }
, time: time
 }">自服务器上次收到客户端请求以来经过的时间，或 `never`。</ArgTableRow>
<ArgTableRow arg="age" typ="time">自租约创建以来经过的时间。</ArgTableRow>
<ArgTableRow arg="active-address" typ="ipAddr">客户端使用的 IP 地址。</ArgTableRow>
<ArgTableRow arg="active-mac-address" typ="macAddr">使用该租约的客户端的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="active-client-id" typ="string">使用该租约的客户端的客户端标识符（选项 61）。</ArgTableRow>
<ArgTableRow arg="active-server" typ="enum">为该客户端提供服务的 DHCP 服务器。</ArgTableRow>
<ArgTableRow arg="active-agent-circuit-id" typ="string">客户端请求的中继代理信息（选项 82）中的电路 ID，十六进制表示。</ArgTableRow>
<ArgTableRow arg="active-agent-remote-id" typ="string">客户端请求的中继代理信息（选项 82）中的远程 ID，十六进制表示。</ArgTableRow>
<ArgTableRow arg="active-agent-circuit-id-ascii" typ="string">客户端请求的中继代理信息（选项 82）中的电路 ID，文本形式。</ArgTableRow>
<ArgTableRow arg="active-agent-remote-id-ascii" typ="string">客户端请求的中继代理信息（选项 82）中的远程 ID，文本形式。</ArgTableRow>
<ArgTableRow arg="host-name" typ="string">客户端发送的主机名（选项 12）。</ArgTableRow>
<ArgTableRow arg="class-id" typ="string">上次收到的 DHCP 请求中的 DHCP 选项 60。</ArgTableRow>
<ArgTableRow arg="src-mac-address" typ="macAddr">客户端上次请求的源 MAC 地址。</ArgTableRow>
<ArgTableRow arg="reconfigure-key" typ="string">服务器在客户端绑定时的回复中提供给客户端的密钥，用于验证 Reconfigure 消息（RFC 6704、HMAC-MD5）。需要在服务器上启用 `use-reconfigure`。</ArgTableRow>
<ArgTableRow arg="reconfigure-last-sent" typ="string">发送给客户端的最后一条 Reconfigure 消息的重放检测计数器。每发送一条 Reconfigure 消息，它都会增加。</ArgTableRow>
<ArgTableRow arg="reconfigure-status" typ="string"></ArgTableRow>
</ArgTable>
