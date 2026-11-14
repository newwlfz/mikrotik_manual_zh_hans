---
sidebar_key: "cli-reference/interface/sstp-client"
title: "sstp-client"
sidebar_label: 'sstp-client'
source: https://manual.mikrotik.com/docs/cli-reference/interface/sstp-client
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/sstp-client {#interfacesstp-client}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该项是否被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
<ArgTableRow arg="H" typ="hw-crypto">硬件加密是否处于活动状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口的描述性名称。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">最大接收单元。</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，则会拆分为多个数据包，从而允许通过隧道发送全尺寸 IP 或 Ethernet 数据包。</ArgTableRow>
<ArgTableRow arg="connect-to" typ="address (flags=D46v)" mandatory="1">SSTP 服务器的远程地址。</ArgTableRow>
<ArgTableRow arg="port" typ="num">要连接的端口。</ArgTableRow>
<ArgTableRow arg="http-proxy" typ="alt { address: ipAddr
, ipv6-address: ip6Addr
, name: string
 }">代理地址。</ArgTableRow>
<ArgTableRow arg="proxy-port" typ="num">代理端口。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none) { none:0 }">证书存储中的客户端证书。</ArgTableRow>
<ArgTableRow arg="verify-server-certificate" typ="bool">根据路由器的证书存储验证服务器证书。</ArgTableRow>
<ArgTableRow arg="verify-server-address-from-certificate" typ="bool">根据证书验证服务器地址。</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">用于身份验证的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于身份验证的密码。</ArgTableRow>
<ArgTableRow arg="profile" typ="enum">指定建立隧道时使用哪个 PPP 配置文件。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">Keepalive 超时时间，单位为秒。</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool">是否将 SSTP 远程地址添加为默认路由。</ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num">启用 add-default-route 时，应用于自动创建的默认路由的距离值。</ArgTableRow>
<ArgTableRow arg="dial-on-demand" typ="bool">仅在生成出站流量时才连接。如果启用，则在连接尚未建立时，会添加一条网关地址来自 10.112.112.0/24 网络的路由。</ArgTableRow>
<ArgTableRow arg="authentication" typ="ubit (pap, chap, mschap1, mschap2)">允许的身份验证方法。默认允许所有方法。</ArgTableRow>
<ArgTableRow arg="pfs" typ="enum (no | yes | required) { no:0, yes:1, required:2 }">指定要使用哪种 TLS 身份验证。`yes` - TLS 使用 ECDHE-RSA 和 DHE-RSA。`required` - 仅使用 ECDHE。</ArgTableRow>
<ArgTableRow arg="tls-version" typ="enum (any | only-1.2) { any:0, only-1.2:2 }">指定允许使用哪个 TLS 版本。</ArgTableRow>
<ArgTableRow arg="ciphers" typ="ubit (aes256-sha, aes256-gcm-sha384)">允许的加密套件。</ArgTableRow>
<ArgTableRow arg="add-sni" typ="bool">将 TLS SNI 扩展添加到 Client Hello 数据包中。从 RouterOS 7.15 版本开始可用。</ArgTableRow>
</ArgTable>
