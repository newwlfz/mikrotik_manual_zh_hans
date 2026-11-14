---
sidebar_key: "cli-reference/ip/socks/connections"
sidebar_position: 2
title: "connections"
sidebar_label: 'connections'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/socks/connections
captured_at: '2026-11-01T21:24:26+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/socks/connections {#ipsocksconnections}
**类型：** 目录

活动代理连接的只读列表。在代理连接打开期间，会存在一个条目。有关更多信息，请参阅 [SOCKS](../../../network-management/socks/index.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="composite { address: alt { addr-ipv4: ipAddr
, addr-ipv6: ip6Addr
 }
, port: num
 }">SOCKS 客户端的地址和端口。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="composite { address: alt { addr-ipv4: ipAddr
, addr-ipv6: ip6Addr
, addr-domain: string
 }
, port: num
 }">所请求的目标地址和端口。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (unknown | out | in) { unknown:0, out:1, in:2 }">
连接类型。
- `unknown` - 连接刚刚发起。
- `out` - 连接正在被中继到所请求的目标。
- `in` - 连接是传入的。
</ArgTableRow>
<ArgTableRow arg="tx" typ="num">在此连接上中继到目标的字节数。</ArgTableRow>
<ArgTableRow arg="rx" typ="num">在此连接上从目标接收的字节数。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="user" typ="enum">客户端进行身份验证所使用的 [`users`](./users.md) 中的用户名。当 `auth-method=none` 时为空。</ArgTableRow>
</ArgTable>
