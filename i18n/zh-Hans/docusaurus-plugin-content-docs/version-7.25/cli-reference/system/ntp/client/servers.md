---
title: "servers"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/ntp/client/servers
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ntp/client/servers 
**类型：** 目录

客户端的 NTP 服务器。可在此处添加静态条目，或使用 [`/system/ntp/client`](/docs/cli-reference/system/ntp/client) 中的 `servers` 添加；从 DHCP 学到的条目（当 DHCP 客户端设置 `use-peer-ntp=yes` 时）为动态条目。请参阅 [NTP](/docs/system-information-and-utilities/ntp) 指南。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The entry is disabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Dynamic entry, learned from DHCP. Dynamic entries cannot be edited.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="address (flags=46D)" mandatory="1">IP address or domain name of the NTP server. IPv4 and IPv6 addresses can carry a `@vrf` suffix, and a link-local IPv6 address an `%interface` suffix. Domain names are resolved with `/ip/dns`; the result shows in `resolved-address`.</ArgTableRow>
<ArgTableRow arg="min-poll" typ="num">Shortest interval between queries to this server, as the power of 2 in seconds (6 means every 64 s). Must be lower than `max-poll`. Range: 3..17. Default: 6.</ArgTableRow>
<ArgTableRow arg="max-poll" typ="num">Longest interval between queries to this server, as the power of 2 in seconds (10 means every 1024 s). Range: 3..17. Default: 10.</ArgTableRow>
<ArgTableRow arg="iburst" typ="bool">When enabled, the client sends a burst of about a second interval queries right after the server is added, to get an initial estimate quickly. Default: yes.</ArgTableRow>
<ArgTableRow arg="auth-key" typ="enum (none) { none:0 }">Key from [`/system/ntp/key`](/docs/cli-reference/system/ntp/key) used to authenticate replies from this server. Replies that fail authentication are rejected (crypto NAK) and the client does not synchronize. Default: none.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="resolved-address" typ="address (flags=46)">IP address that the domain name in `address` resolved to.</ArgTableRow>
</ArgTable>
