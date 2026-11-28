---
title: "advanced"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/advanced
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/cloud"
pagination_next: "cli-reference/ip/cloud/back-to-home-file"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/cloud/advanced 
**类型：** 设置目录

高级 DDNS 设置。有关概述，请参阅 [DDNS](/docs/network-management/cloud#ddns)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="use-local-address" typ="bool">Whether the DNS name points to the router's local address instead of its public address. With `yes`, `dns-name` resolves to the address the router sends its requests from, for example a private address behind NAT, and `public-address` still shows the public address. Default: no.</ArgTableRow>
</ArgTable>
