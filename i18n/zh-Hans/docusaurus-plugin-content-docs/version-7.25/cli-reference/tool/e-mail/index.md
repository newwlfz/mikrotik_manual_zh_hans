---
sidebar_key: "cli-reference/tool/e-mail/index"
sidebar_position: 1
title: "e-mail"
sidebar_label: 'e-mail'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/e-mail
captured_at: '2026-11-01T21:25:52+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/e-mail {#toole-mail}
**类型：** 设置目录

路由器用来发送电子邮件的 SMTP 服务器设置：服务器和端口、TLS 模式、证书验证、发件人和登录信息。除非命令覆盖这些设置，否则 `/tool/e-mail/send` 会对每封邮件使用它们。参见 [电子邮件](../../../system-information-and-utilities/e-mail.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="server" typ="alt { ipv6: ip6Addr
, ip: ipAddr
, fqdn: string
 }">SMTP 服务器 IP 地址、IPv6 地址或 FQDN。使用名称时，`last-address` 显示路由器连接到的地址。默认值：0.0.0.0。</ArgTableRow>
<ArgTableRow arg="port" typ="num">SMTP 服务器端口。默认值：25。</ArgTableRow>
<ArgTableRow arg="tls" typ="enum (no | yes | starttls)">
TLS 加密模式：
- `no`（默认）- 不使用 TLS。即使服务器提供 STARTTLS，路由器也不会发送 STARTTLS。
- `yes` - 从连接开始就使用 TLS（隐式 TLS，通常为端口 465）。
- `starttls` - 使用 STARTTLS 升级连接（通常为端口 587）。当服务器不提供 STARTTLS 时，发送会失败并显示 `TLS not supported by server`；不会回退到未加密连接。
</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">服务在其上创建出站连接的 VRF。默认值：main。</ArgTableRow>
<ArgTableRow arg="from" typ="string">将显示为发件人的名称或电子邮件地址。当它为空时，路由器会使用空发件人（`<>`）发送邮件，许多服务器会拒绝这种邮件。默认值：&lt;&gt;。</ArgTableRow>
<ArgTableRow arg="user" typ="string">用于向 SMTP 服务器进行身份验证的用户名。路由器使用 AUTH PLAIN 登录；在没有 TLS 的情况下，用户名和密码会以未加密方式通过网络传输。默认值：""。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于向 SMTP 服务器进行身份验证的密码。默认值：""。</ArgTableRow>
<ArgTableRow arg="certificate-verification" typ="enum (no | yes | yes-without-crl)">
TLS 证书验证：
- `no`（默认）- 路由器会加密连接，但不检查服务器的证书。
- `yes` - 根据本地证书存储验证证书链，包括服务器名称。内置信任存储默认涵盖电子邮件。
- `yes-without-crl` - 验证证书但不执行 CRL 检查。
</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="last-status" typ="enum (none | resolving-dns | in-progress | failed | succeeded)">上次电子邮件发送尝试的状态：结束时为 `succeeded` 或 `failed`。</ArgTableRow>
<ArgTableRow arg="last-address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }">上次使用的 SMTP 服务器的 IP 地址。</ArgTableRow>
</ArgTable>
