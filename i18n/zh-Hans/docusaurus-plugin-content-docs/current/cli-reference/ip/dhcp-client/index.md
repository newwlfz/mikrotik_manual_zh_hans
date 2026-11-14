---
sidebar_key: "cli-reference/ip/dhcp-client"
title: "dhcp-client"
sidebar_label: 'dhcp-client'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-client
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-client {#ipdhcp-client}
**类型：** 目录

DHCP 客户端从 DHCP 服务器获取接口的 IPv4 地址和网络设置。有关概述和配置示例，请参阅 [DHCP 客户端](../../../network-management/dhcp/client.md)。有关 DHCP 的工作原理，请参阅 [DHCP](../../../network-management/dhcp/index.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">DHCP 客户端已禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">DHCP 客户端配置无效。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">DHCP 客户端是动态创建的。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">DHCP 客户端的名称。如果未设置，RouterOS 会生成一个名称，例如 `client1`。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">DHCP 客户端运行的接口。收到的 IP 地址会作为动态地址添加到此接口。</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="enum (no | yes | special-classless)">
要从 DHCP 服务器接收并添加到路由表的路由。
- `yes`（默认） - 当服务器发送无类静态路由（选项 121）时添加该路由，否则通过收到的网关（选项 3）添加默认路由。存在选项 121 时，将忽略选项 3 中的网关。
- `special-classless` - 同时添加无类静态路由和通过收到的网关的默认路由。
- `no` - 不添加路由。
</ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num">客户端添加的路由的距离。默认值：1。</ArgTableRow>
<ArgTableRow arg="default-route-tables" typ="object { table: alt { table-distance: composite { table: alt { table-default: enum (default) { default:0xffffffff }
, table: enum
 }
, distance: num [1 .. 255]
 }
, table: alt { table-default: enum (default) { default:0xffffffff }
, table: enum
 }
 }
 }">要将路由添加到的路由表，使用 `table` 或 `table:distance` 条目指定。此处给定的距离会覆盖该表的 `default-route-distance`。`default` 是主路由表；当客户端接口属于某个 VRF 时，则是该 VRF 的路由表。默认值：default。</ArgTableRow>
<ArgTableRow arg="check-gateway" typ="enum (none | arp | ping | bfd)">在客户端添加的路由上设置的网关检查（`none`、`arp`、`ping` 或 `bfd`），因此只有当其网关响应时才会使用该路由。请参阅[网关可达性](../../../user-guides/routing-and-networking-protocols/routing-decision.md)。默认值：none。</ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="bool">是否使用从 DHCP 服务器收到的 DNS 服务器。它们会被添加到 DNS 解析器的动态服务器（`/ip/dns`）。默认值：yes。</ArgTableRow>
<ArgTableRow arg="use-peer-ntp" typ="bool">是否使用从 DHCP 服务器收到的 NTP 服务器。它们会作为动态条目添加到 NTP 客户端服务器（`/system/ntp/client/servers`）。默认值：yes。</ArgTableRow>
<ArgTableRow arg="allow-reconfigure" typ="bool">是否接受来自 DHCP 服务器的 Reconfigure（FORCERENEW）消息。启用后，客户端在绑定时请求 reconfigure 密钥，服务器会在其回复中发送该密钥。该密钥用于验证服务器的 Reconfigure 消息（RFC 6704、HMAC-MD5）。收到 Reconfigure 消息时，客户端会立即续租。服务器只能向在启用此设置的情况下完成绑定的客户端发送 Reconfigure 消息。默认值：no。</ArgTableRow>
<ArgTableRow arg="vlan-priority" typ="num">客户端发送的数据包的 VLAN 头中设置的优先级代码点（PCP，0-7）。仅当客户端运行在 VLAN 接口上时适用。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">客户端发送的数据包的 IP 头中设置的 DSCP 值（0-63）。未设置时，数据包以 DSCP 0 发送。</ArgTableRow>
<ArgTableRow arg="use-broadcast" typ="enum (always | never | both)">
客户端是否在 DHCPDISCOVER 和 DHCPREQUEST 消息中设置广播标志，以要求服务器广播其回复。续租请求以单播发送，并且从不设置该标志。
- `both`（默认） - 在获取地址的前 15 秒内设置该标志，之后不再设置。
- `always` - 始终设置该标志。
- `never` - 从不设置该标志。
</ArgTableRow>
<ArgTableRow arg="dhcp-options" typ="multi { array-id, option: enum
 }">客户端发送到 DHCP 服务器的选项，按名称从 `/ip/dhcp-client/option` 中选择。预定义的 `clientid` 和 `clientid_duid` 选项都使用代码 61：`clientid` 通过其接口的 MAC 地址标识客户端，`clientid_duid` 通过路由器的 DUID（RFC 4361）标识客户端，该 DUID 与 DHCPv6 客户端使用的 DUID 相同。默认值：hostname,clientid。</ArgTableRow>
<ArgTableRow arg="script" typ="alt { script: string
 }">
当客户端获得租约以及丢失或释放租约时要运行的脚本。该脚本会接收以下变量：
- `bound` - 获得租约时为 `1`，丢失或释放租约时为 `0`。
- `server-address` - DHCP 服务器的 IP 地址。
- `lease-address` - 租约中的 IP 地址。
- `interface` - 客户端接口的名称。
- `gateway-address` - 从服务器收到的网关。
- `vendor-specific` - 从服务器收到的 vendor-specific 信息选项（选项 43）的值。
- `lease-options` - 从服务器收到的选项数组，以选项代码为索引。二进制选项的值为十六进制字符串。
</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="custom-source-mac-address" typ="macAddr">DHCP 客户端使用的自定义源 MAC 地址。</ArgTableRow>
<ArgTableRow arg="custom-hostname-suffix" typ="string">追加到发送给 DHCP 服务器的主机名后的后缀。</ArgTableRow>
<ArgTableRow arg="status" typ="enum (stopped | searching... | requesting... | bound | renewing... | rebinding... | error) { stopped:0, searching...:1, requesting...:2, bound:3, renewing...:4, rebinding...:5, error:6 }">
客户端当前状态：
- `searching...` - 发送 DHCPDISCOVER 消息并等待 offer。
- `requesting...` - 请求已提供的地址。
- `bound` - 客户端拥有租约。
- `renewing...` - 从租约时间过半时开始，向发放租约的服务器续租。
- `rebinding...` - 服务器未回应续租。从租约时间的 87.5% 开始，向任意服务器请求租约。
- `stopped` - 客户端已禁用。
- `error` - 客户端无法运行。
</ArgTableRow>
<ArgTableRow arg="address" typ="composite { address: ipAddr
, netmask: num [ .. 32]
 }">从 DHCP 服务器收到的 IP 地址和前缀长度。</ArgTableRow>
<ArgTableRow arg="netmask" typ="ipAddr">从 DHCP 服务器收到的子网掩码。</ArgTableRow>
<ArgTableRow arg="gateway" typ="ipAddr">从 DHCP 服务器收到的网关（选项 3）。</ArgTableRow>
<ArgTableRow arg="dhcp-server" typ="ipAddr">发放该租约的 DHCP 服务器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="primary-dns" typ="ipAddr">从 DHCP 服务器收到的第一个 DNS 服务器。</ArgTableRow>
<ArgTableRow arg="secondary-dns" typ="ipAddr">从 DHCP 服务器收到的第二个 DNS 服务器。</ArgTableRow>
<ArgTableRow arg="primary-ntp" typ="ipAddr">从 DHCP 服务器收到的第一个 NTP 服务器。</ArgTableRow>
<ArgTableRow arg="secondary-ntp" typ="ipAddr">从 DHCP 服务器收到的第二个 NTP 服务器。</ArgTableRow>
<ArgTableRow arg="cmr-address" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="caps-managers" typ="multi { ip: ipAddr
 }">从 DHCP 服务器收到的 CAPsMAN 地址（选项 138）。</ArgTableRow>
<ArgTableRow arg="reconfigure-key" typ="string">从 DHCP 服务器收到的密钥，用于验证其 Reconfigure 消息（RFC 6704、HMAC-MD5）。仅在启用 `allow-reconfigure` 时设置。</ArgTableRow>
<ArgTableRow arg="reconfigure-last-counter" typ="string">从 DHCP 服务器接受的最后一条 Reconfigure 消息的重放检测计数器。客户端绑定时从 0 开始，并随每条 Reconfigure 消息递增。</ArgTableRow>
<ArgTableRow arg="expires-after" typ="time">租约到期前的时间。</ArgTableRow>
</ArgTable>
