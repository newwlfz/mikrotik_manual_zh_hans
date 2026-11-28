---
title: "e-mail"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/e-mail
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/e-mail 
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="server" typ="alt { ipv6: ip6Addr
, ip: ipAddr
, fqdn: string
 }"></ArgTableRow>
<ArgTableRow arg="port" typ="num"></ArgTableRow>
<ArgTableRow arg="tls" typ="enum (no | yes | starttls)"></ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
<ArgTableRow arg="from" typ="string"></ArgTableRow>
<ArgTableRow arg="user" typ="string"></ArgTableRow>
<ArgTableRow arg="password" typ="string"></ArgTableRow>
<ArgTableRow arg="certificate-verification" typ="enum (no | yes | yes-without-crl)">TLS certificate validation</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="last-status" typ="enum (none | resolving-dns | in-progress | failed | succeeded)"></ArgTableRow>
<ArgTableRow arg="last-address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }"></ArgTableRow>
</ArgTable>
