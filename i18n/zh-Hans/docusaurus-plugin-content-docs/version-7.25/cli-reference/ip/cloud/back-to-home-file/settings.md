---
title: "settings"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/back-to-home-file/settings
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/cloud/back-to-home-file/settings 
**Syscap：** cloud-vpn
**类型：** Settings Directory

File Share 服务的状态：其 DNS 名称、证书以及与中继服务器的连接。该服务随 [`/ip/cloud/back-to-home-file`](/docs/cli-reference/ip/cloud) 中的第一个共享启动，并在最后一个共享被移除时停止。相关说明请参阅 [File Share 的工作原理](/docs/network-management/cloud/file-share#how-file-share-works)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="prefer-relay-code" typ="string">Code of the relay region to prefer, from `relay-regions`, for example `EUR1`. When it is empty, the router picks a relay by its round-trip time (`relay-rtts`). Default: empty.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">`yes` while at least one share exists and the service runs. It changes to `no` when you remove the last share.</ArgTableRow>
<ArgTableRow arg="dns-name" typ="string">Name the shares are served under: `<serial>.routingthecloud.net`, with the serial number in lower case. When the router uses the relay, the name resolves to the relay.</ArgTableRow>
<ArgTableRow arg="status" typ="string">
State of the service, for example:
- `getting cert status: requesting SSL certificate`, `requesting validation`, `requesting authorization`, `requesting order finalization` - The router is getting the Let's Encrypt certificate.
- `running` - The service runs.
</ArgTableRow>
<ArgTableRow arg="relay-rtts" typ="multi { code: string
 }">Round-trip time to each relay region over IPv4 and IPv6, for example `EUR1 (ip4: 1.103ms, ip6: timeout)`.</ArgTableRow>
<ArgTableRow arg="relay-ipv4-status" typ="string">Connection to the relay over IPv4, for example `connected (region: EUR1 ip: <relay address> rtt: 1.103ms reachable: unknown )`.</ArgTableRow>
<ArgTableRow arg="relay-ipv6-status" typ="string">Connection to the relay over IPv6, for example `testing rtt` while the router measures the round-trip time.</ArgTableRow>
<ArgTableRow arg="relay-regions" typ="multi { code: string
 }">Relay regions the router can use, for example `EUR1` and `USA1`. Use a code from this list in `prefer-relay-code`.</ArgTableRow>
<ArgTableRow arg="relay-addresses" typ="multi { address: ipAddr
 }">IPv4 addresses of the relay servers, one per region.</ArgTableRow>
<ArgTableRow arg="relay-addresses-ipv6" typ="multi { address: ip6Addr
 }">IPv6 addresses of the relay servers, one per region.</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)">Certificate the shares use, `fileshare-<serial>.routingthecloud.net` in `/certificate`. `none` after `remove-certificate`.</ArgTableRow>
</ArgTable>
