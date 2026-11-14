---
sidebar_key: "cli-reference/interface/l2tp-ether"
title: "l2tp-ether"
sidebar_label: 'l2tp-ether'
source: https://manual.mikrotik.com/docs/cli-reference/interface/l2tp-ether
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/l2tp-ether {#interfacel2tp-ether}
**类型：** 目录

二层隧道协议版本 3（L2TPv3）。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否处于 disabled 状态。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">接口是否为动态创建。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否处于 running 状态。</ArgTableRow>
<ArgTableRow arg="u" typ="unmanaged">接口是否处于 unmanaged 状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num"></ArgTableRow>
<ArgTableRow arg="connect-to" typ="address (flags=D46v)">远程服务器地址。对于入站连接，设置为 0.0.0.0。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">L2TP 接口的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="use-ipsec" typ="bool">对于被动（入站）连接会被忽略。对于入站连接，请使用 l2tp-server 设置。</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string">对于被动（入站）连接会被忽略。对于入站连接，请使用 l2tp-server 设置。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">是否允许 FastPath 处理。</ArgTableRow>
<ArgTableRow arg="l2tp-proto-version" typ="enum (l2tpv3-ip | l2tpv3-udp) { l2tpv3-ip:1, l2tpv3-udp:2 }">L2TPv3 封装模式（IP 或 UDP）。</ArgTableRow>
<ArgTableRow arg="circuit-id" typ="string">L2TPv3 远端标识符（虚拟电路 ID）。</ArgTableRow>
<ArgTableRow arg="cookie-length" typ="enum (0 | 4-bytes | 8-bytes) { 0:0, 4-bytes:4, 8-bytes:8 }">对于被动（入站）连接会被忽略。对于入站连接，请使用 l2tp-server 设置。</ArgTableRow>
<ArgTableRow arg="digest-hash" typ="enum (none | md5 | sha1) { none:99, md5:0, sha1:1 }">对于被动（入站）连接会被忽略。对于入站连接，请使用 l2tp-server 设置。</ArgTableRow>
<ArgTableRow arg="use-l2-specific-sublayer" typ="bool">启用 L2TPv3 以太网伪线二层默认子层。</ArgTableRow>
<ArgTableRow arg="local-address" typ="alt { local-ipv4-address: ipAddr
, local-ipv6-address: ip6Addr
 }">用于 unmanaged L2TP 连接的本地 IPv4 或 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="local-tunnel-id" typ="num">用于 unmanaged L2TP 连接的本地隧道 ID。</ArgTableRow>
<ArgTableRow arg="local-session-id" typ="num">用于 unmanaged L2TP 连接的本地会话 ID。</ArgTableRow>
<ArgTableRow arg="remote-tunnel-id" typ="num">用于 unmanaged L2TP 连接的远端隧道 ID。</ArgTableRow>
<ArgTableRow arg="remote-session-id" typ="num">用于 unmanaged L2TP 连接的远端会话 ID。</ArgTableRow>
<ArgTableRow arg="peer-cookie" typ="string">用于 unmanaged L2TP 连接的接收数据包 Cookie 十六进制值（8 或 16 个字符，或为空）。</ArgTableRow>
<ArgTableRow arg="send-cookie" typ="string">用于 unmanaged L2TP 连接的发送数据包 Cookie 十六进制值（8 或 16 个字符，或为空）。</ArgTableRow>
<ArgTableRow arg="unmanaged-mode" typ="bool">启用或禁用 unmanaged（静态）隧道模式。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-mtu" typ="num">隧道的实际最大传输单元。</ArgTableRow>
</ArgTable>
