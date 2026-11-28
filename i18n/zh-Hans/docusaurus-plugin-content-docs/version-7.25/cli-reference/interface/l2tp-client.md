---
title: "l2tp-client"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/l2tp-client
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/l2tp-client 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether an item is disabled.</ArgTableRow>
<ArgTableRow arg="R" typ="running">Whether the interface is running.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Descriptive name of the interface.</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">Maximum Transmission Unit. Maximum packet size that the L2TP interface can send without packet fragmentation.</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">Maximum Receive Unit. Maximum packet size that the L2TP interface can receive without packet fragmentation.</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">Maximum packet size that can be received on the link. If a packet is bigger than tunnel MTU, it is split into multiple packets, allowing full-size IP or Ethernet packets to be sent over the tunnel.</ArgTableRow>
<ArgTableRow arg="connect-to" typ="address (flags=D46v)" mandatory="1">Remote address of the L2TP server. If the address is in the VRF table, VRF should be specified, for example, `192.168.88.1@vrf1` .</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">User name used for authentication.</ArgTableRow>
<ArgTableRow arg="password" typ="string">Password used for authentication.</ArgTableRow>
<ArgTableRow arg="profile" typ="enum">Specifies which PPP profile configuration is used when establishing the tunnel.</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">Keepalive timeout in seconds.</ArgTableRow>
<ArgTableRow arg="src-address" typ="ipAddr">Source address used for the L2TP connection.</ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="enum (no | yes | exclusively) { no:0, yes:1, exclusively:2 }">Whether to use DNS settings from the peer.</ArgTableRow>
<ArgTableRow arg="use-ipsec" typ="bool">
When this option is enabled, dynamic IPSec peer configuration and policy (transport mode) is added to encapsulate the L2TP connection into an IPSec tunnel.

同一 NAT 后面的多个 L2tp/ipsec 客户端无法在此模式下工作。要实现这种场景，请禁用 use-ipsec，并为客户端设置静态策略，启用 tunnel=yes 和 level=unique 设置。
</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string">IPsec 预共享密钥。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">是否允许 FastPath 处理。如果使用 IPsec，则必须禁用。</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool">是否将 L2TP 远程地址添加为默认路由。</ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num">启用 add-default-route 时，应用于自动创建的默认路由的 Distance 值。</ArgTableRow>
<ArgTableRow arg="dial-on-demand" typ="bool">仅在产生出站流量时连接到 L2TP 服务器。如果启用，则在连接尚未建立时添加一条网关地址来自 10.112.112.0/24 网络的路由。</ArgTableRow>
<ArgTableRow arg="allow" typ="ubit (pap, chap, mschap1, mschap2)">允许的身份验证方法。</ArgTableRow>
<ArgTableRow arg="random-source-port" typ="bool">是否对 L2TP 连接的源端口进行随机化。</ArgTableRow>
<ArgTableRow arg="l2tp-proto-version" typ="enum (l2tpv2 | l2tpv3-ip | l2tpv3-udp) { l2tpv2:0, l2tpv3-ip:1, l2tpv3-udp:2 }">要使用的 L2TP 协议版本。</ArgTableRow>
<ArgTableRow arg="l2tpv3-circuit-id" typ="string">L2TPv3 电路标识符。</ArgTableRow>
<ArgTableRow arg="l2tpv3-cookie-length" typ="enum (0 | 4-bytes | 8-bytes) { 0:0, 4-bytes:4, 8-bytes:8 }">L2TPv3 cookie 长度。</ArgTableRow>
<ArgTableRow arg="l2tpv3-digest-hash" typ="enum (none | md5 | sha1) { none:99, md5:0, sha1:1 }">L2TPv3 摘要哈希算法。</ArgTableRow>
</ArgTable>
