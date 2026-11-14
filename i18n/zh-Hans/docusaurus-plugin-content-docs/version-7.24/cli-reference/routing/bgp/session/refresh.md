---
sidebar_key: "cli-reference/routing/bgp/session/refresh"
sidebar_position: 3
title: "refresh"
sidebar_label: "refresh"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/bgp/session/refresh
captured_at: '2026-11-01T21:29:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/session/refresh {#routingbgpsessionrefresh}
**条件：** !smips
**类型：** 命令

向指定的 BGP 会话发送路由刷新。用于触发从远端对等体重新发送所有路由。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="afi" typ="enum (ip | ipv6 | l2vpn | vpnv4)">指定要为其发送路由刷新的地址族。</ArgTableRow>
</ArgTable>
