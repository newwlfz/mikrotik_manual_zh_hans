---
sidebar_key: "cli-reference/interface/ovpn-server/server/index"
sidebar_position: 2
title: "server"
sidebar_label: 'server'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ovpn-server/server
captured_at: '2026-11-01T21:22:54+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ovpn-server/server {#interfaceovpn-serverserver}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive">服务器是否处于非活动状态。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">项目是否已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">服务器的名称。</ArgTableRow>
<ArgTableRow arg="port" typ="num">运行服务器的端口。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (ip | ethernet) { ip:0, ethernet:1 }">三层或二层隧道模式（也可称为 tun、tap）。</ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (tcp | udp)">与远程端点连接时使用的传输协议。</ArgTableRow>
<ArgTableRow arg="netmask" typ="num">应用于客户端的子网掩码。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">服务器自动生成的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。OVPN 接口在不进行数据包分片的情况下可以发送的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">定义时间段（以秒为单位），在该时间之后，路由器开始每秒发送 keepalive 数据包。如果在 keepalive-timeout 的两倍时间内未收到任何流量和 keepalive 响应，则无响应的客户端将被断开连接。</ArgTableRow>
<ArgTableRow arg="default-profile" typ="enum">指定建立隧道时使用的 PPP 配置文件。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum">OVPN 服务器使用的、来自证书存储的证书。</ArgTableRow>
<ArgTableRow arg="require-client-certificate" typ="bool">如果设置为 yes，服务器会检查客户端证书是否属于同一证书链。</ArgTableRow>
<ArgTableRow arg="tls-version" typ="enum (any | only-1.2) { any:0, only-1.2:2 }">指定允许哪些 TLS 版本。</ArgTableRow>
<ArgTableRow arg="auth" typ="ubit (sha1, md5, sha256, sha384, sha512, null)">服务器接受的认证方法。</ArgTableRow>
<ArgTableRow arg="cipher" typ="ubit (blowfish128, aes128-cbc, aes192-cbc, aes256-cbc, aes128-gcm, aes192-gcm, aes256-gcm, null)">允许的加密算法。</ArgTableRow>
<ArgTableRow arg="reneg-sec" typ="num">加密密钥重新协商间隔（秒）。0 表示禁用重新协商。</ArgTableRow>
<ArgTableRow arg="redirect-gateway" typ="ubit (disabled, def1, ipv6)">指定 OVPN 客户端必须向路由表添加哪些路由。`def1` - 使用 0.0.0.0/1 和 128.0.0.0/1 覆盖默认网关，而不是 0.0.0.0/0。`disabled` - 不推送 redirect-gateway 标志。`ipv6` - 通过添加 2000::/4 和 3000::/4 路由，将 IPv6 路由重定向到隧道中。</ArgTableRow>
<ArgTableRow arg="push-routes" typ="string">要推送到客户端的路由。最大输入限制为 1400 个字符或 37 条路由。7.21 版本新增了 IPv6 支持。</ArgTableRow>
<ArgTableRow arg="push-routes-ipv6" typ="string">要推送到客户端的 IPv6 路由。</ArgTableRow>
<ArgTableRow arg="enable-tun-ipv6" typ="bool">是否为该 OVPN 服务器启用 IPv6 隧道。</ArgTableRow>
<ArgTableRow arg="tun-server-ipv6" typ="ip6Addr">服务器端生成 OVPN 接口时使用的 IPv6 前缀地址。</ArgTableRow>
<ArgTableRow arg="ipv6-prefix-len" typ="num">用于隧道 IPv6 地址的前缀长度。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">用于监听连接尝试的 VRF。</ArgTableRow>
<ArgTableRow arg="user-auth-method" typ="enum (pap | mschap2) { pap:16, mschap2:2 }">默认使用 PAP 认证。设置为 mschap2 以使用 CHAP 质询认证。</ArgTableRow>
</ArgTable>
