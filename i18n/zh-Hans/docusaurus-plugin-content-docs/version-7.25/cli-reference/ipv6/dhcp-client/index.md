---
sidebar_key: "cli-reference/ipv6/dhcp-client/index"
sidebar_position: 1
title: "dhcp-client"
sidebar_label: 'dhcp-client'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/dhcp-client
captured_at: '2026-11-01T21:24:30+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-client {#ipv6dhcp-client}
**类型：** 目录

DHCPv6 客户端会向 DHCPv6 服务器请求 IPv6 地址、委派前缀（DHCPv6-PD）或其他设置。有关概述和配置示例，请参阅 [DHCPv6 客户端](../../../network-management/dhcp/dhcpv6-client.md)。有关 DHCPv6 与 IPv4 的 DHCP 有何不同，请参阅 [DHCP](../../../network-management/dhcp/index.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">该 DHCPv6 客户端是动态创建的。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">该 DHCPv6 客户端已禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">该 DHCPv6 客户端配置无效。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">客户端运行的接口。收到的地址会作为动态 /128 地址添加到该接口。</ArgTableRow>
<ArgTableRow arg="request" typ="ubit (info, address, prefix)" mandatory="1">
客户端向服务器请求的内容。一个客户端可以请求以下多项：
- `address` - IPv6 地址 (IA_NA)，会作为动态 /128 地址添加到客户端接口。
- `prefix` - 委派前缀 (IA_PD)，会添加到 `pool-name` 中设置的 IPv6 池。
- `info` - 仅其他设置，不包含地址或前缀 (Information-request)。此时客户端状态为 `idle`。
</ArgTableRow>
<ArgTableRow arg="accept-prefix-without-address" typ="bool">当同时请求地址和前缀时：是否接受包含前缀但不包含地址的回复。使用 `no` 时，客户端会持续请求，直到服务器同时提供两者。默认值：yes。</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool">是否通过 DHCPv6 服务器添加默认路由 (`::/0`)，或者如果回复经过中继，则通过中继添加。DHCPv6 本身不提供默认网关。默认值：no。</ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num">客户端添加的默认路由的距离。默认值：1。</ArgTableRow>
<ArgTableRow arg="default-route-tables" typ="object { table: alt { table-distance: composite { table: alt { table-default: enum (default) { default:0xffffffff }
, table: enum
 }
, distance: num [1 .. 255]
 }
, table: alt { table-default: enum (default) { default:0xffffffff }
, table: enum
 }
 }
 }">要添加默认路由的路由表，以 `table` 或 `table:distance` 条目表示。`default` 是主路由表；当客户端接口属于某个 VRF 时，则是该 VRF 的路由表。默认值：default。</ArgTableRow>
<ArgTableRow arg="check-gateway" typ="enum (none | arp | ping | bfd)">在客户端添加的默认路由上设置的网关检查 (`none`、`arp`、`ping` 或 `bfd`)，因此仅当其网关响应时才会使用该路由。默认值：none。</ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="bool">是否接受 DHCPv6 服务器通告的 DNS 服务器。默认值：yes。</ArgTableRow>
<ArgTableRow arg="use-interface-duid" typ="bool">是否使用根据客户端接口的 MAC 地址生成的 DUID，而不是路由器的其他 DHCPv6 客户端及其 DHCPv6 服务器所使用的路由器 DUID。默认值：no。</ArgTableRow>
<ArgTableRow arg="custom-duid" typ="string">要发送的 DUID，代替生成的 DUID，以十六进制表示，例如 `0x0003000102aabbccddee`。覆盖 `use-interface-duid`。</ArgTableRow>
<ArgTableRow arg="validate-server-duid" typ="bool">是否检查 DHCPv6 服务器发送的 DUID 格式是否正确。使用 `no` 时，会接受格式不正确的服务器 DUID，但仍会检查其最小长度。默认值：yes。</ArgTableRow>
<ArgTableRow arg="rapid-commit" typ="bool">是否使用 Rapid Commit 选项请求两消息交换 (Solicit 和 Reply)。如果服务器不使用该选项，或使用 `no`，则使用四消息交换 (Solicit、Advertise、Request、Reply)。默认值：yes。</ArgTableRow>
<ArgTableRow arg="allow-reconfigure" typ="bool">是否接受来自 DHCPv6 服务器的 Reconfigure 消息。启用后，客户端会在其 Solicit 中表明这一点，接收重新配置密钥，并在服务器发送 Reconfigure 消息时立即续租。RouterOS DHCPv6 服务器会在其设置更改时，以及通过绑定的 `send-reconfigure` 命令发送 Reconfigure 消息。默认值：no。</ArgTableRow>
<ArgTableRow arg="dhcp-options" typ="multi { array-id, option: enum
 }">客户端发送的选项，按名称从 `/ipv6/dhcp-client/option` 中选择。预定义的 `fqdn` 选项会将路由器标识作为客户端的 FQDN 发送 (选项 39)。默认值：fqdn。</ArgTableRow>
<ArgTableRow arg="pool-name" typ="string">客户端根据收到的前缀创建动态 IPv6 池的名称；可以从该池向其他接口分配地址。池的生存时间跟随前缀，并在每次续租时延长。仅在请求前缀时应用。</ArgTableRow>
<ArgTableRow arg="pool-prefix-length" typ="num">池分配的前缀长度，例如 `64`。它必须等于或长于收到的前缀。未设置时，长度会自动选择，例如收到 /56 时选择 64。仅在请求前缀时应用。</ArgTableRow>
<ArgTableRow arg="prefix-hint" typ="ip6Prefix">向服务器建议的前缀或前缀长度，例如 `::/60` 表示请求一个 /60。服务器不必遵循该建议。`::/0` 表示不发送提示。默认值：::/0。</ArgTableRow>
<ArgTableRow arg="prefix-address-lists" typ="multi { array-id, prefix-address-list: string
 }">将收到的前缀作为动态条目添加到的 IPv6 防火墙地址列表。仅在请求前缀时应用。</ArgTableRow>
<ArgTableRow arg="script" typ="alt { script: string
 }">
当客户端获取、续租或丢失地址或前缀时要运行的脚本。它会分别针对前缀和地址运行，并接收以下变量：
- `pd-valid` - 获取到前缀时为 `1`，丢失前缀时为 `0`；当本次运行针对地址时为空。
- `pd-prefix` - 前缀及其长度。
- `na-valid` - 获取到地址时为 `1`，丢失地址时为 `0`；当本次运行针对前缀时为空。
- `na-address` - 地址。
- `options` - 从服务器收到的选项数组，按选项代码索引。
</ArgTableRow>
<ArgTableRow arg="custom-iapd-id" typ="num">用于前缀请求 (IA_PD) 的身份关联标识符 (IAID)，代替从客户端接口派生的标识符。</ArgTableRow>
<ArgTableRow arg="custom-iana-id" typ="num">用于地址请求 (IA_NA) 的身份关联标识符 (IAID)，代替从客户端接口派生的标识符。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (stopped | searching... | requesting... | bound | renewing... | rebinding... | stopping... | declining... | error | idle | requesting-info... | confirming...)">
客户端当前状态：
- `searching...` - 发送 Solicit 消息并等待服务器。
- `requesting...` - 请求提供的地址或前缀。
- `bound` - 客户端已获得其地址或前缀。
- `renewing...` - 向提供该地址或前缀的服务器续租。
- `rebinding...` - 服务器未应答续租；向任意服务器询问。
- `requesting-info...` - 等待 Information-request 的回复 (`request=info`)。
- `idle` - Information-request 已得到应答 (`request=info`)。
- `confirming...` - 向服务器确认该地址或前缀对此链路仍然有效。
- `declining...` - 拒绝某个地址。
- `stopping...` - 发送 Release 消息。
- `stopped` - 客户端已禁用。
- `error` - 客户端无法运行。
</ArgTableRow>
<ArgTableRow arg="duid" typ="string">客户端发送的 DUID。</ArgTableRow>
<ArgTableRow arg="dhcp-server-v6" typ="ip6Addr">服务器回复的来源地址，通常是 DHCPv6 服务器的链路本地地址。</ArgTableRow>
<ArgTableRow arg="prefix" typ="composite { prefix: ip6Prefix
, expires-after: time
 }">收到的前缀及其到期剩余时间。</ArgTableRow>
<ArgTableRow arg="address" typ="composite { address: ip6Addr
, expires-after: time
 }">收到的地址及其到期剩余时间。</ArgTableRow>
<ArgTableRow arg="reconfigure-key" typ="string">从 DHCPv6 服务器收到的密钥，用于验证其 Reconfigure 消息。仅在启用 `allow-reconfigure` 时设置。</ArgTableRow>
<ArgTableRow arg="reconfigure-last-counter" typ="string">从 DHCPv6 服务器接受的上一条 Reconfigure 消息的重放检测计数器。每收到一条 Reconfigure 消息都会增加。</ArgTableRow>
</ArgTable>
