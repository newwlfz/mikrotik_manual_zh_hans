---
title: "refresh"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/bgp/session/refresh
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## routing/bgp/session/refresh 
**条件：** !smips
**类型：** Command

向指定 BGP 会话发送路由刷新。用于触发远端对等体重新发送所有路由。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="afi" typ="enum (ip | ipv6 | l2vpn | vpnv4)">Specifies for which address family to send route refresh.</ArgTableRow>
</ArgTable>
