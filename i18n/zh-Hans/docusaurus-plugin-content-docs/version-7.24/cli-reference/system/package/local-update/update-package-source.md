---
title: "update-package-source"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/package/local-update/update-package-source
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/package/local-update/update-package-source 
**类型：** 目录

此列表定义从中获取软件包的服务器。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }" mandatory="1">IP address of the local package server.</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">Username for accessing the local package server.</ArgTableRow>
<ArgTableRow arg="password" typ="string" mandatory="1">Password for accessing the local package server.</ArgTableRow>
</ArgTable>
