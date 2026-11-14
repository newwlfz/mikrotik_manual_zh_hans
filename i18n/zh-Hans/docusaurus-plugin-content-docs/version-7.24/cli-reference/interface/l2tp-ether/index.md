---
sidebar_key: "cli-reference/interface/l2tp-ether/index"
sidebar_position: 1
title: "l2tp-ether"
sidebar_label: "l2tp-ether"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/l2tp-ether
captured_at: '2026-11-01T21:27:21+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/l2tp-ether {#interfacel2tp-ether}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="R" typ="running">running</ArgTableRow>
<ArgTableRow arg="u" typ="unmanaged">unmanaged</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="mtu" typ="num"></ArgTableRow>
<ArgTableRow arg="connect-to" typ="address (flags=D46v)">远端服务器地址，或为空（零）地址以接受入站连接</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="use-ipsec" typ="bool">对被动（入站）连接被忽略（入站连接请使用 l2tp-server 设置）</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string">对被动（入站）连接被忽略（入站连接请使用 l2tp-server 设置）</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool"></ArgTableRow>
<ArgTableRow arg="l2tp-proto-version" typ="enum (l2tpv3-ip | l2tpv3-udp) { l2tpv3-ip:1, l2tpv3-udp:2 }">L2TPv3 封装模式（IP 或 UDP）</ArgTableRow>
<ArgTableRow arg="circuit-id" typ="string">L2TPv3 远端标识符（虚拟电路 ID）</ArgTableRow>
<ArgTableRow arg="cookie-length" typ="enum (0 | 4-bytes | 8-bytes) { 0:0, 4-bytes:4, 8-bytes:8 }">对被动（入站）连接被忽略（入站连接请使用 l2tp-server 设置）</ArgTableRow>
<ArgTableRow arg="digest-hash" typ="enum (none | md5 | sha1) { none:99, md5:0, sha1:1 }">对被动（入站）连接被忽略（入站连接请使用 l2tp-server 设置）</ArgTableRow>
<ArgTableRow arg="use-l2-specific-sublayer" typ="bool">启用 L2TPv3 以太网伪线的二层默认子层</ArgTableRow>
<ArgTableRow arg="local-address" typ="alt { local-ipv4-address: ipAddr
, local-ipv6-address: ip6Addr
 }">本地 IPv4 或 IPv6 地址（非托管 L2TP 连接）</ArgTableRow>
<ArgTableRow arg="local-tunnel-id" typ="num">本地隧道 ID（非托管 L2TP 连接）</ArgTableRow>
<ArgTableRow arg="local-session-id" typ="num">本地会话 ID（非托管 L2TP 连接）</ArgTableRow>
<ArgTableRow arg="remote-tunnel-id" typ="num">远端隧道 ID（非托管 L2TP 连接）</ArgTableRow>
<ArgTableRow arg="remote-session-id" typ="num">远端会话 ID（非托管 L2TP 连接）</ArgTableRow>
<ArgTableRow arg="peer-cookie" typ="string">接收报文的 cookie 十六进制值（8 或 16 个字符，或为空）（非托管 L2TP 连接）</ArgTableRow>
<ArgTableRow arg="send-cookie" typ="string">发送报文的 cookie 十六进制值（8 或 16 个字符，或为空）（非托管 L2TP 连接）</ArgTableRow>
<ArgTableRow arg="unmanaged-mode" typ="bool">启用/禁用非托管（静态）隧道模式</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-mtu" typ="num"></ArgTableRow>
</ArgTable>
