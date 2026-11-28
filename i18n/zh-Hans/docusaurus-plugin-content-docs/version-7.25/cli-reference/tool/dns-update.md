---
title: "dns-update"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/dns-update
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/tool/e-mail"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/dns-update 
**类型：** 命令

发送一条使用 TSIG hmac-md5 密钥签名的动态 DNS 更新（RFC 2136）到某个区域的权威 DNS 服务器，并将该区域中的名称指向 IPv4 地址。该更新会替换该名称的 A 记录。服务器接受更新时，命令不输出任何内容。详情请参阅 [DNS update](/docs/diagnostics-monitoring-and-troubleshooting/dynamic-dns)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="dns-server" typ="ipAddr">IPv4 address of the DNS server that is authoritative for `zone`. The update goes to its TCP port 53.</ArgTableRow>
<ArgTableRow arg="zone" typ="string">DNS zone that holds the name, for example `example.com`.</ArgTableRow>
<ArgTableRow arg="name" typ="string">Name to update, relative to `zone`: `name=office` with `zone=example.com` updates `office.example.com`. A full name is added to the zone again, and a name with a trailing dot fails with `failure: bad name`.</ArgTableRow>
<ArgTableRow arg="address" typ="multi { addr: ipAddr
 }">IPv4 address for the A record of the name. Required. Only one address is accepted (`failure: only one address allowed`), and IPv6 addresses are refused.</ArgTableRow>
<ArgTableRow arg="key-name" typ="string">Name of the TSIG key, as configured on the DNS server. Without `key-name` and `key`, the update is sent unsigned.</ArgTableRow>
<ArgTableRow arg="key" typ="string">Secret of the TSIG key in base64, as configured on the DNS server. The algorithm is hmac-md5. Put the value in quotes, because a base64 value can end in `=`.</ArgTableRow>
<ArgTableRow arg="ttl" typ="num">Time to live of the record, in seconds. For an address that changes, use a short value such as `300`. Default: 86400.</ArgTableRow>
</ArgTable>
