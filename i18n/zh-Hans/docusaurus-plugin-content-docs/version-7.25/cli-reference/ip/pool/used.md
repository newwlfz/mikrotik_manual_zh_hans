---
sidebar_key: "cli-reference/ip/pool/used"
sidebar_position: 1
title: "used"
sidebar_label: 'used'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/pool/used
captured_at: '2026-11-01T21:24:19+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/pool/used {#ippoolused}
**类型：** 目录

菜单列出 IP 池中所有已使用的 IP 地址。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="pool" typ="enum">IP 池的名称。</ArgTableRow>
<ArgTableRow arg="address" typ="ipAddr">从池中分配给客户端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="owner" typ="string">获取此 IP 地址的服务名称。</ArgTableRow>
<ArgTableRow arg="info" typ="string">附加信息，例如，对于 DHCP——来自租约菜单的 MAC 地址；对于 PPP——PPP 类型客户端的连接用户名。</ArgTableRow>
</ArgTable>
