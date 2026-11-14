---
sidebar_key: "cli-reference/tool/e-mail/send"
sidebar_position: 1
title: "send"
sidebar_label: 'send'
source: https://manual.mikrotik.com/docs/cli-reference/tool/e-mail/send
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/e-mail/send {#toole-mailsend}
**类型：** 命令

通过 [`/tool/e-mail`](./index.md) 中的 SMTP 服务器发送一封电子邮件。传给该命令的参数会覆盖此邮件的服务器设置。结果会显示在 `/tool/e-mail` 的 `last-status` 中。参见[电子邮件](../../../system-information-and-utilities/e-mail.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="server" typ="alt { ipv6: ip6Addr
, ip: ipAddr
, fqdn: string
 }">SMTP 服务器的 IP 地址、IPv6 地址或 FQDN。如果未指定，则使用服务器配置中的值。</ArgTableRow>
<ArgTableRow arg="port" typ="num">SMTP 服务器端口。如果未指定，则使用服务器配置中的值。</ArgTableRow>
<ArgTableRow arg="to" typ="multi { array-id, to: string
 }">目标电子邮件地址。允许填写多个地址，以逗号分隔；路由器会向所有这些地址发送同一封邮件。</ArgTableRow>
<ArgTableRow arg="cc" typ="multi { array-id, cc: string
 }">向列出的收件人发送副本。允许填写多个地址，以逗号分隔。</ArgTableRow>
<ArgTableRow arg="from" typ="string">将显示为发件人的名称或电子邮件地址。如果未指定，则使用服务器配置中的值；若该值也为空，则发件人为 `<>`，许多服务器会拒绝这种发件人。</ArgTableRow>
<ArgTableRow arg="subject" typ="string">邮件的主题。</ArgTableRow>
<ArgTableRow arg="body" typ="string">电子邮件的正文文本。`\n` 表示换行。</ArgTableRow>
<ArgTableRow arg="file" typ="multi { array-id, file: file
 }">要附加到邮件的文件名列表，以逗号分隔。每个文件都以 `application/octet-stream` 形式附加。不存在的文件会在发送前被拒绝（`input does not match any value of file`）。</ArgTableRow>
<ArgTableRow arg="user" typ="string">用于向 SMTP 服务器进行身份验证的用户名（AUTH PLAIN；未使用 TLS 时为未加密传输）。如果未指定，则使用服务器配置中的值。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于向 SMTP 服务器进行身份验证的密码。如果未指定，则使用服务器配置中的值。</ArgTableRow>
<ArgTableRow arg="tls" typ="enum (no | yes | starttls)">
TLS 加密模式。如果未指定，则使用服务器配置中的值：
- `no` - 不使用 TLS。即使服务器提供 STARTTLS，路由器也不会发送 STARTTLS。
- `yes` - 从连接一开始就使用 TLS（隐式 TLS，通常为端口 465）。
- `starttls` - 使用 STARTTLS 升级连接（通常为端口 587）。当服务器不提供 STARTTLS 时，发送会失败并报错 `TLS not supported by server`；不会回退到未加密的连接。
</ArgTableRow>
<ArgTableRow arg="certificate-verification" typ="enum (no | yes | yes-without-crl)">
TLS 证书验证。如果未指定，则使用服务器配置中的值：
- `no` - 路由器会加密连接，但不检查服务器的证书。
- `yes` - 对照本地证书存储验证证书链，包括服务器名称。内置信任存储默认涵盖电子邮件。
- `yes-without-crl` - 验证证书，但不执行 CRL 检查。
</ArgTableRow>
</ArgTable>
