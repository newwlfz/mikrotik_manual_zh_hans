---
sidebar_key: "cli-reference/routing/bgp/session/resend"
sidebar_position: 4
title: "resend"
sidebar_label: 'resend'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/bgp/session/resend
captured_at: '2026-11-01T21:25:05+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/session/resend {#routingbgpsessionresend}
**条件：** !smips
**类型：** 命令

向指定的 BGP 会话重新发送前缀。该命令接受两个参数：

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="afi" typ="enum (ip | ipv6 | l2vpn | vpnv4)">指定要为其重新发送前缀的地址族。</ArgTableRow>
</ArgTable>
