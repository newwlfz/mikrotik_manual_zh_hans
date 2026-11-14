---
sidebar_key: "cli-reference/interface/l2tp-client/index"
sidebar_position: 1
title: "l2tp-client"
sidebar_label: 'l2tp-client'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/l2tp-client
captured_at: '2026-11-01T21:22:45+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/l2tp-client {#interfacel2tp-client}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口的描述性名称。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。L2TP 接口在不进行数据包分片的情况下可以发送的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">最大接收单元。L2TP 接口在不进行数据包分片的情况下可以接收的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">链路上可以接收的最大数据包大小。如果数据包大于隧道 MTU，则会被拆分为多个数据包，从而允许通过隧道发送全尺寸 IP 或以太网数据包。</ArgTableRow>
<ArgTableRow arg="connect-to" typ="address (flags=D46v)" mandatory="1">L2TP 服务器的远程地址。如果该地址位于 VRF 表中，则应指定 VRF，例如 `192.168.88.1@vrf1`。</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">用于认证的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于认证的密码。</ArgTableRow>
<ArgTableRow arg="profile" typ="enum">指定在建立隧道时使用哪个 PPP 配置文件。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">保活超时时间，单位为秒。</ArgTableRow>
<ArgTableRow arg="src-address" typ="ipAddr">用于 L2TP 连接的源地址。</ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="enum (no | yes | exclusively) { no:0, yes:1, exclusively:2 }">是否使用对端的 DNS 设置。</ArgTableRow>
<ArgTableRow arg="use-ipsec" typ="bool">
启用此选项后，会添加动态 IPSec 对端配置和策略（传输模式），以将 L2TP 连接封装到 IPSec 隧道中。

同一 NAT 后面的多个 L2tp/ipsec 客户端在此模式下将无法工作。要实现这种场景，请禁用 use-ipsec，并为启用了 tunnel=yes、level=unique 设置的客户端设置静态策略。
</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string">IPsec 预共享密钥。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">是否允许 FastPath 处理。如果使用 IPsec，则必须禁用。</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool">是否将 L2TP 远程地址添加为默认路由。</ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num">启用 add-default-route 时应用于自动创建的默认路由的距离值。</ArgTableRow>
<ArgTableRow arg="dial-on-demand" typ="bool">仅在产生出站流量时才连接到 L2TP 服务器。如果启用，则在连接尚未建立时会添加一条网关地址来自 10.112.112.0/24 网络的路由。</ArgTableRow>
<ArgTableRow arg="allow" typ="ubit (pap, chap, mschap1, mschap2)">允许的认证方法。</ArgTableRow>
<ArgTableRow arg="random-source-port" typ="bool">是否为 L2TP 连接随机化源端口。</ArgTableRow>
<ArgTableRow arg="l2tp-proto-version" typ="enum (l2tpv2 | l2tpv3-ip | l2tpv3-udp) { l2tpv2:0, l2tpv3-ip:1, l2tpv3-udp:2 }">要使用的 L2TP 协议版本。</ArgTableRow>
<ArgTableRow arg="l2tpv3-circuit-id" typ="string">L2TPv3 电路标识符。</ArgTableRow>
<ArgTableRow arg="l2tpv3-cookie-length" typ="enum (0 | 4-bytes | 8-bytes) { 0:0, 4-bytes:4, 8-bytes:8 }">L2TPv3 cookie 长度。</ArgTableRow>
<ArgTableRow arg="l2tpv3-digest-hash" typ="enum (none | md5 | sha1) { none:99, md5:0, sha1:1 }">L2TPv3 摘要哈希算法。</ArgTableRow>
</ArgTable>
