---
title: "tftp"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/tftp
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/tftp 
**类型：** 目录

TFTP 服务器的访问规则。只要至少存在一条规则，服务器就会运行（`/ip/service` 中 UDP 端口 69 上的动态 `tftpd` 条目）。每个请求都会按顺序与规则进行匹配，第一条匹配客户端地址和请求文件名的规则将决定结果；没有任何规则匹配的请求会被拒绝，并返回 `permission denied!`。请参阅 [TFTP](/docs/system-information-and-utilities/tftp)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The rule is disabled and is not used.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="ip-addresses" typ="object { ip-addresses: alt { ip6: ip6Prefix
, ip: ipRange
 }
 }">Client addresses the rule applies to: IPv4 addresses, ranges or prefixes, or IPv6 prefixes. Empty (default) means any client.</ArgTableRow>
<ArgTableRow arg="req-filename" typ="string">Requested file name as a regular expression; empty (default) matches any name. Case-sensitive. A value that does not start with `^` must match the whole name (`phone\.cfg` matches only `phone.cfg`, `.*\.cfg` every `.cfg` name); the anchors are added around the whole value, so write alternatives in a group, `(aaa|bbb)\.bin`. A value that starts with `^` is used as written. The name is the one the client requests, not the path on the router. In a rule that serves a folder or the requested name, a pattern such as `.*`, or an empty value, also matches names that lead out of the folder: use a pattern such as `[^/.][^/]*` that allows no slash and no leading dot.</ArgTableRow>
<ArgTableRow arg="real-filename" typ="string">What the rule serves. Empty (default) serves the requested name itself; a file serves that file for every matching request; a folder is put in front of the requested name (`real-filename=tftp` answers a request for `phone.cfg` or `/phone.cfg` with `tftp/phone.cfg`). Uploads are written to the same place. The value is used literally: references such as `\1` to parts of `req-filename` are not supported.</ArgTableRow>
<ArgTableRow arg="allow" typ="bool">`yes` serves matching requests, `no` refuses them with `permission denied!`. Default: yes.</ArgTableRow>
<ArgTableRow arg="read-only" typ="bool">With `yes`, an upload fails with `illegal operation`. Set `no` to accept uploads. Default: yes.</ArgTableRow>
<ArgTableRow arg="allow-rollover" typ="bool">Allow transfers of more than 65535 blocks: after block 65535 the router continues with block 0, which the client must support. Without it, such a transfer fails at the limit with `illegal operation`. Default: no.</ArgTableRow>
<ArgTableRow arg="allow-overwrite" typ="bool">With `read-only=no`, allow an upload to replace an existing file. Without it, the upload fails with `file exists`. Default: no.</ArgTableRow>
<ArgTableRow arg="reading-window-size" typ="alt { window-size: enum (none | pipelining) { none:0 }
 }">
- `none` (default) - Send each block of a download after the previous one is acknowledged.
- `pipelining` - Send several blocks of a download before waiting for acknowledgements, which speeds up downloads.
</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="hits" typ="num">Number of requests the rule answered.</ArgTableRow>
</ArgTable>
