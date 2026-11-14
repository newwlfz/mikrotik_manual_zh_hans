---
sidebar_key: "cli-reference/interface/sstp-server/server"
sidebar_position: 2
title: "server"
sidebar_label: 'server'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/sstp-server/server
captured_at: '2026-11-01T21:23:02+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/sstp-server/server {#interfacesstp-serverserver}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">启用或禁用 SSTP 服务器。</ArgTableRow>
<ArgTableRow arg="port" typ="num">SSTP 服务器的监听端口。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">最大接收单元。</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">可在链路上接收的最大数据包大小。如果数据包大于隧道 MTU，则会拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或 Ethernet 数据包。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">Keepalive 超时时间（秒）。</ArgTableRow>
<ArgTableRow arg="default-profile" typ="enum">指定建立隧道时使用哪个 PPP 配置文件配置。</ArgTableRow>
<ArgTableRow arg="authentication" typ="ubit (pap, chap, mschap1, mschap2)">允许的认证方法。默认情况下允许所有方法。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none) { none:0 }">证书存储中的服务器证书。</ArgTableRow>
<ArgTableRow arg="verify-client-certificate" typ="bool">根据路由器的证书存储验证客户端证书。</ArgTableRow>
<ArgTableRow arg="pfs" typ="enum (no | yes | required) { no:0, yes:1, required:2 }">指定要使用哪种 TLS 认证。`yes` - TLS 使用 ECDHE-RSA 和 DHE-RSA。`required` - 仅使用 ECDHE。</ArgTableRow>
<ArgTableRow arg="tls-version" typ="enum (any | only-1.2) { any:0, only-1.2:2 }">指定允许使用哪个 TLS 版本。</ArgTableRow>
<ArgTableRow arg="ciphers" typ="ubit (aes256-sha, aes256-gcm-sha384)">允许的加密套件。</ArgTableRow>
</ArgTable>
