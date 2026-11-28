---
title: "forwarders"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns/forwarders
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dns/forwarders 
**类型：** 目录

用于静态 `FWD` 条目的上游服务器命名组：将 [`/ip/dns/static`](/docs/cli-reference/ip/dns/static) 中条目的 `forward-to` 设置为转发器名称。每个查询都会依次使用 `dns-servers` 和 `doh-servers` 中的下一个服务器（轮询）。不响应的服务器不会被跳过：分配给它的查询会在 `query-total-timeout` 后以 SERVFAIL 失败，因此仅列出可正常工作的服务器。示例请参阅 [DNS](/docs/network-management/dns)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The forwarder is disabled.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the forwarder, used as `forward-to` in static `FWD` entries.</ArgTableRow>
<ArgTableRow arg="dns-servers" typ="multi { address (flags=46D)
 }">DNS servers of the forwarder, as IP addresses or DNS names, for example `dns-servers=1.1.1.1,8.8.8.8`.</ArgTableRow>
<ArgTableRow arg="doh-servers" typ="multi { string
 }">DoH server URLs of the forwarder, for example `doh-servers=https://dns.google/dns-query`. The router looks up their host names through `servers` in `/ip/dns`.</ArgTableRow>
<ArgTableRow arg="verify-doh-cert" typ="bool">Whether the router verifies the certificates of the DoH servers against `/certificate` and the built-in trust store. A server with an untrusted certificate fails with `SSL: ssl: no trusted CA certificate found (6)` in the log. This default differs from `verify-doh-cert` in `/ip/dns`. Default: yes.</ArgTableRow>
</ArgTable>
