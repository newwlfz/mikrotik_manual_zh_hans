---
title: "socksify"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/socksify
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/ssh"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/socksify 
**类型：** 目录

通过上游 SOCKS5 服务器转发由防火墙 NAT 规则（`action=socksify`，通常位于 `dstnat` 链）重定向到该服务的流量。对记录属性的更改在禁用并重新启用该记录后生效。

完整文档请参阅 [Socksify](/docs/7.24/network-management/socks/socksify)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled (set by default)</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the socksify service record.</ArgTableRow>
<ArgTableRow arg="connection-timeout" typ="num">Time in seconds (0 to 3000) to wait for the SOCKS server and the destination during connection setup before aborting with an error. Set to 0 to disable the timeout. Default: `60`.</ArgTableRow>
<ArgTableRow arg="port" typ="num">Local TCP port the service listens on; the `socksify` NAT action redirects intercepted connections to this port. Default: `952`.</ArgTableRow>
<ArgTableRow arg="socks5-server" typ="ipAddr">IPv4 address of the upstream SOCKS5 server. IPv6 addresses are not accepted. Default: `0.0.0.0`.</ArgTableRow>
<ArgTableRow arg="socks5-port" typ="num">Listening port of the SOCKS5 server. Default: `1080`.</ArgTableRow>
<ArgTableRow arg="socks5-user" typ="string">Username for the upstream SOCKS5 server. Shown as plain text in `print detail` output. Default: empty.</ArgTableRow>
<ArgTableRow arg="socks5-password" typ="string">Password for the upstream SOCKS5 server. Shown as plain text in `print detail` output. Default: empty.</ArgTableRow>
</ArgTable>
