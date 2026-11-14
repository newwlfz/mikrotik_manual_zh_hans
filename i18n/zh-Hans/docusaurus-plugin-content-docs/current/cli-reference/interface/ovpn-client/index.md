---
sidebar_key: "cli-reference/interface/ovpn-client"
title: "ovpn-client"
sidebar_label: 'ovpn-client'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ovpn-client
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ovpn-client {#interfaceovpn-client}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
<ArgTableRow arg="H" typ="hw-crypto">硬件加密是否处于活动状态。</ArgTableRow>
<ArgTableRow arg="Ta" typ="tls-auth">TLS 身份验证（tls-auth）是否处于活动状态。</ArgTableRow>
<ArgTableRow arg="Tc" typ="tls-crypt">tls-crypt 身份验证是否处于活动状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口的描述性名称。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">OVPN 接口的 MAC 地址。如果未指定，则自动生成。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。OVPN 接口在不进行数据包分片的情况下可以发送的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="connect-to" typ="address (flags=D46v)" mandatory="1">OVPN 服务器的远程地址。</ArgTableRow>
<ArgTableRow arg="port" typ="num">要连接的端口。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (ip | ethernet) { ip:0, ethernet:1 }">Layer3 或 Layer2 隧道模式（也可为 tun、tap）。</ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (tcp | udp)">连接到远程端点时使用的传输协议。</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">用于身份验证的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于身份验证的密码。长度不得超过 1000 个字符。</ArgTableRow>
<ArgTableRow arg="profile" typ="enum">指定建立隧道时使用哪个 PPP 配置文件。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none) { none:0 }">证书存储中的客户端证书。</ArgTableRow>
<ArgTableRow arg="verify-server-certificate" typ="bool">根据 connect-to 参数检查服务器证书的 CN 或 SAN，并启用针对路由器证书存储的信任链验证。IP 或主机名必须存在于服务器证书中。</ArgTableRow>
<ArgTableRow arg="tls-version" typ="enum (any | only-1.2) { any:0, only-1.2:2 }">指定允许使用哪些 TLS 版本。</ArgTableRow>
<ArgTableRow arg="auth" typ="enum (sha1 | md5 | sha256 | sha384 | sha512 | null) { sha1:1, md5:2, sha256:8, sha384:32, sha512:16, null:4 }">允许的身份验证方法。</ArgTableRow>
<ArgTableRow arg="cipher" typ="enum (blowfish128 | aes128-cbc | aes192-cbc | aes256-cbc | aes128-gcm | aes192-gcm | aes256-gcm | null) { blowfish128:1, aes128-cbc:2, aes192-cbc:4, aes256-cbc:8, aes128-gcm:16, aes192-gcm:32, aes256-gcm:64, null:128 }">允许的加密算法。要使用 GCM 加密算法，请将 auth 设置为 null，因为 GCM 加密算法也会处理身份验证。</ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="enum (no | yes | exclusively) { no:0, yes:1, exclusively:2 }">是否将 OVPN 服务器提供的 DNS 服务器添加到 IP/DNS 配置中。</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool">是否将 OVPN 远程地址添加为默认路由。</ArgTableRow>
<ArgTableRow arg="route-nopull" typ="bool">如果启用，客户端不使用服务器推送的路由（包括 def1）。</ArgTableRow>
<ArgTableRow arg="disconnect-notify" typ="bool">在 UDP 模式下发送显式断开连接通知。</ArgTableRow>
</ArgTable>
