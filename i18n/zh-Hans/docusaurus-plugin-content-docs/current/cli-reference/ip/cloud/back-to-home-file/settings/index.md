---
sidebar_key: "cli-reference/ip/cloud/back-to-home-file/settings"
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/ip/cloud/back-to-home-file/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/cloud/back-to-home-file/settings {#ipcloudback-to-home-filesettings}
**系统能力：** cloud-vpn
**类型：** 设置目录

File Share 服务的状态：其 DNS 名称、证书以及与中继服务器的连接。该服务在 [`/ip/cloud/back-to-home-file`](../index.md) 中创建第一个共享时启动，并在最后一个共享被移除时停止。有关说明，请参阅 [File Share 的工作原理](../../../../../network-management/cloud/file-share.md#how-file-share-works)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="prefer-relay-code" typ="string">要优先使用的中继区域代码，取自 `relay-regions`，例如 `EUR1`。为空时，路由器会根据往返时间（`relay-rtts`）选择中继。默认值：空。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">当至少存在一个共享且服务运行时为 `yes`。移除最后一个共享后变为 `no`。</ArgTableRow>
<ArgTableRow arg="dns-name" typ="string">共享提供服务所使用的名称：`<serial>.routingthecloud.net`，其中序列号为小写。当路由器使用中继时，该名称会解析到中继。</ArgTableRow>
<ArgTableRow arg="status" typ="string">
服务状态，例如：
- `getting cert status: requesting SSL certificate`、`requesting validation`、`requesting authorization`、`requesting order finalization` - 路由器正在获取 Let's Encrypt 证书。
- `running` - 服务正在运行。
</ArgTableRow>
<ArgTableRow arg="relay-rtts" typ="multi { code: string
 }">通过 IPv4 和 IPv6 到每个中继区域的往返时间，例如 `EUR1 (ip4: 1.103ms, ip6: timeout)`。</ArgTableRow>
<ArgTableRow arg="relay-ipv4-status" typ="string">通过 IPv4 与中继的连接，例如 `connected (region: EUR1 ip: <relay address> rtt: 1.103ms reachable: unknown )`。</ArgTableRow>
<ArgTableRow arg="relay-ipv6-status" typ="string">通过 IPv6 与中继的连接，例如路由器测量往返时间时的 `testing rtt`。</ArgTableRow>
<ArgTableRow arg="relay-regions" typ="multi { code: string
 }">路由器可以使用的中继区域，例如 `EUR1` 和 `USA1`。在 `prefer-relay-code` 中使用此列表中的代码。</ArgTableRow>
<ArgTableRow arg="relay-addresses" typ="multi { address: ipAddr
 }">中继服务器的 IPv4 地址，每个区域一个。</ArgTableRow>
<ArgTableRow arg="relay-addresses-ipv6" typ="multi { address: ip6Addr
 }">中继服务器的 IPv6 地址，每个区域一个。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)">共享使用的证书，位于 `/certificate` 中的 `fileshare-<serial>.routingthecloud.net`。执行 `remove-certificate` 后为 `none`。</ArgTableRow>
</ArgTable>
