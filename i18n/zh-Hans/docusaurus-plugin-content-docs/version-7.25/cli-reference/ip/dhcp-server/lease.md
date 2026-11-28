---
title: "lease"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/lease
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/lease 
**类型：** 目录

DHCP 服务器的租约。动态租约在客户端从地址池获取地址时创建；静态租约为特定客户端分配固定地址、地址池或其自身设置。详情请参阅 [DHCP Server](/docs/network-management/dhcp/server)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The lease is disabled.</ArgTableRow>
<ArgTableRow arg="R" typ="radius">The lease was assigned by a RADIUS server.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">The lease is dynamic: it was created when a client got an address from the pool. Use `make-static` to turn it into a static lease.</ArgTableRow>
<ArgTableRow arg="B" typ="blocked">The client is blocked (`block-access=yes`) and gets no reply from the server.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="alt { ip-address: ipAddr
, pool: enum
 }">IP address of a static lease, or the name of an IP pool to give the client an address from. With `0.0.0.0`, the address pool of the server is used.</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">MAC address of the client the static lease is for.</ArgTableRow>
<ArgTableRow arg="use-src-mac" typ="bool">Whether to identify the client by the source MAC address of its packets instead of the client hardware address field (`chaddr`) of the DHCP message.</ArgTableRow>
<ArgTableRow arg="client-id" typ="string">Client identifier (option 61) of the client the static lease is for, in the format shown in `active-client-id`, for example `1:4e:97:a1:4c:d1:38`.</ArgTableRow>
<ArgTableRow arg="rate-limit" typ="string">
Bandwidth limit for the client, as `rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time]]]]`. Rates are in bits per second, with an optional `k` or `M` suffix, and missing tx values are taken from the rx values. Only static leases can have a rate limit.

服务器会为租约地址创建一个名为 `dhcp-ds<hostname/MAC>` 的动态 simple queue，并将该限制作为 `limit-at` 和 `max-limit`。
</ArgTableRow>
<ArgTableRow arg="routes" typ="object { route: composite { dst-address: address (flags=4/)
, gateway: [ composite { gateway: address (flags=46ivL)
, distance: [ num [1 .. 255]]
 }]
 }
 }">租约绑定时服务器添加的路由，以 `dst-address/mask gateway distance` 条目表示，多个条目之间用逗号分隔，例如 `10.77.0.0/24 172.31.255.105 5`。</ArgTableRow>
<ArgTableRow arg="insert-queue-before" typ="enum (bottom | first) { bottom:0xffffffff, first:0 }">为此租约创建的动态 simple queue 的放置位置：`first`（默认）位于 `/queue/simple` 顶部，`bottom` 位于末尾，或位于指定队列之前。</ArgTableRow>
<ArgTableRow arg="parent-queue" typ="enum (none) { none:0 }">为此租约创建的动态 simple queue 的父队列。默认：none。</ArgTableRow>
<ArgTableRow arg="queue-type" typ="enum">为此租约创建的动态 simple queue 的队列类型。</ArgTableRow>
<ArgTableRow arg="address-lists" typ="multi { array-id, address-list: string
 }">租约绑定时，租约地址被加入的防火墙地址列表。</ArgTableRow>
<ArgTableRow arg="server" typ="enum (all) { all:0 }">租约所属的 DHCP 服务器。使用 `all` 时，静态租约在所有服务器上均有效。</ArgTableRow>
<ArgTableRow arg="block-access" typ="bool">是否阻止客户端：服务器不响应它，并且租约获得 `B` 标志。默认：否。</ArgTableRow>
<ArgTableRow arg="allow-dual-stack-queue" typ="bool">此租约与同一客户端的 DHCPv6 绑定是否共用一个动态 simple queue，该队列随后同时包含 IPv4 和 IPv6 地址。默认：是。</ArgTableRow>
<ArgTableRow arg="lease-time" typ="time">此客户端的租约时间。未设置或设置为 `0s` 时，使用服务器的 `lease-time`。</ArgTableRow>
<ArgTableRow arg="always-broadcast" typ="bool">即使此客户端未设置广播标志，是否仍向其广播响应。默认：否。</ArgTableRow>
<ArgTableRow arg="dhcp-option" typ="multi { array-id, option: enum
 }">发送给此客户端的选项（`/ip/dhcp-server/option`）。它们优先于服务器和网络的选项。</ArgTableRow>
<ArgTableRow arg="dhcp-option-set" typ="enum (none)">发送给此客户端的选项集（`/ip/dhcp-server/option/sets`）。它优先于服务器和网络的选项。</ArgTableRow>
<ArgTableRow arg="agent-circuit-id" typ="string">设置后，即使 MAC 地址或客户端 ID 不同，租约也会匹配中继代理信息（option 82）包含此 circuit ID 的请求。</ArgTableRow>
<ArgTableRow arg="agent-remote-id" typ="string">设置后，即使 MAC 地址或客户端 ID 不同，租约也会匹配中继代理信息（option 82）包含此 remote ID 的请求。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="enum (waiting | testing | declined | offered | bound | authorizing | conflict) { waiting:0, testing:1, declined:2, offered:3, bound:4, authorizing:5 }">
State of the lease:
- `waiting` - A static lease that is not in use.
- `testing` - The server is checking the address for conflicts (`conflict-detection`).
- `offered` - The server offered the address and waits for the client's request.
- `bound` - The client uses the address.
- `authorizing` - The server waits for the reply from the RADIUS server.
- `conflict` - Another host already uses the address. The lease keeps the address out of use for the lease time; `check-status` frees it when the other host no longer answers.
- `declined` - The client declined the address with a DHCPDECLINE message.
</ArgTableRow>
<ArgTableRow arg="expires-after" typ="time">Time until the lease expires.</ArgTableRow>
<ArgTableRow arg="last-seen" typ="alt { symbolic-names: enum (never | sometime) { never:0xffffffff, sometime:0xfffffffe }
, time: time
 }">Time since the server last received a request from the client, or `never`.</ArgTableRow>
<ArgTableRow arg="age" typ="time">Time since the lease was created.</ArgTableRow>
<ArgTableRow arg="active-address" typ="ipAddr">IP address the client uses.</ArgTableRow>
<ArgTableRow arg="active-mac-address" typ="macAddr">MAC address of the client that uses the lease.</ArgTableRow>
<ArgTableRow arg="active-client-id" typ="string">Client identifier (option 61) of the client that uses the lease.</ArgTableRow>
<ArgTableRow arg="active-server" typ="enum">DHCP server that serves the client.</ArgTableRow>
<ArgTableRow arg="active-agent-circuit-id" typ="string">Circuit ID from the relay agent information (option 82) of the client's request, in hex.</ArgTableRow>
<ArgTableRow arg="active-agent-remote-id" typ="string">Remote ID from the relay agent information (option 82) of the client's request, in hex.</ArgTableRow>
<ArgTableRow arg="active-agent-circuit-id-ascii" typ="string">Circuit ID from the relay agent information (option 82) of the client's request, as text.</ArgTableRow>
<ArgTableRow arg="active-agent-remote-id-ascii" typ="string">Remote ID from the relay agent information (option 82) of the client's request, as text.</ArgTableRow>
<ArgTableRow arg="host-name" typ="string">Host name the client sent (option 12).</ArgTableRow>
<ArgTableRow arg="class-id" typ="string">DHCP option 60 from last received DHCP request</ArgTableRow>
<ArgTableRow arg="src-mac-address" typ="macAddr">Source MAC address of the client's last request.</ArgTableRow>
<ArgTableRow arg="reconfigure-key" typ="string">Key the server gave the client, in its reply when the client bound, for authenticating Reconfigure messages (RFC 6704, HMAC-MD5). Requires `use-reconfigure` on the server.</ArgTableRow>
<ArgTableRow arg="reconfigure-last-sent" typ="string">Replay-detection counter of the last Reconfigure message sent to the client. It increases with every Reconfigure message.</ArgTableRow>
<ArgTableRow arg="reconfigure-status" typ="string"></ArgTableRow>
</ArgTable>
