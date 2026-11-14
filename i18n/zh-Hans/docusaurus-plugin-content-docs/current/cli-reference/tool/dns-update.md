---
sidebar_key: "cli-reference/tool/dns-update"
sidebar_position: 5
title: "dns-update"
sidebar_label: 'dns-update'
source: https://manual.mikrotik.com/docs/cli-reference/tool/dns-update
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/dns-update {#tooldns-update}
**类型：** 命令

向区域的权威 DNS 服务器发送一次动态 DNS 更新（RFC 2136），使用 TSIG hmac-md5 密钥签名，并把该区域中的一个名称指向一个 IPv4 地址。该更新会替换该名称的 A 记录。当服务器接受更新时，该命令不会输出任何内容。参见 [DNS 更新](../../diagnostics-monitoring-and-troubleshooting/dynamic-dns.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="dns-server" typ="ipAddr">`zone` 的权威 DNS 服务器的 IPv4 地址。更新会发送到其 TCP 端口 53。</ArgTableRow>
<ArgTableRow arg="zone" typ="string">包含该名称的 DNS 区域，例如 `example.com`。</ArgTableRow>
<ArgTableRow arg="name" typ="string">要更新的名称，相对于 `zone`：`name=office` 与 `zone=example.com` 会更新 `office.example.com`。完整名称会被再次附加到区域后面，而带末尾点的名称会失败并返回 `failure: bad name`。</ArgTableRow>
<ArgTableRow arg="address" typ="multi { addr: ipAddr
 }">该名称的 A 记录的 IPv4 地址。必需。只接受一个地址（`failure: only one address allowed`），IPv6 地址会被拒绝。</ArgTableRow>
<ArgTableRow arg="key-name" typ="string">TSIG 密钥的名称，与 DNS 服务器上配置的一致。未提供 `key-name` 和 `key` 时，更新会以未签名方式发送。</ArgTableRow>
<ArgTableRow arg="key" typ="string">TSIG 密钥的机密值（base64 格式），与 DNS 服务器上配置的一致。算法为 hmac-md5。请将值放在引号中，因为 base64 值可能以 `=` 结尾。</ArgTableRow>
<ArgTableRow arg="ttl" typ="num">记录的生存时间，单位为秒。对于会变化的地址，请使用较短的值，例如 `300`。默认值：86400。</ArgTableRow>
</ArgTable>
