---
sidebar_key: "cli-reference/user/active"
sidebar_position: 2
title: "active"
sidebar_label: 'active'
source: https://manual.mikrotik.com/docs/cli-reference/user/active
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/active {#useractive}
**类型：** 目录

当前已登录的管理会话。所有属性均为只读。使用 `/user/active/remove` 终止会话。完整指南请参阅 [用户](../../authentication-authorization-accounting/user.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="R" typ="radius">通过 RADIUS 认证的用户（请参阅 [`/user/aaa`](./aaa.md)）。</ArgTableRow>
<ArgTableRow arg="M" typ="by-romon">会话通过 RoMON 建立；`by-romon` 保存 RoMON 代理的 MAC 地址。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="when" typ="date">会话登录的日期和时间。</ArgTableRow>
<ArgTableRow arg="name" typ="string">登录用户的名称，取自 [`/user`](./index.md)。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { ip: ipAddr
, ip6: ip6Addr
, address: macAddr
 }">会话的源地址：IP、IPv6 或 MAC 地址。</ArgTableRow>
<ArgTableRow arg="by-romon" typ="macAddr">会话所经由的 RoMON 代理的 MAC 地址；仅对 RoMON 会话设置（标志 `M`）。</ArgTableRow>
<ArgTableRow arg="via" typ="enum (unknown | winbox | console | telnet | ftp | web | ssh | mac-telnet | bandwidth-test | api | romon | rest-api) { unknown:0, winbox:1, console:2, telnet:3, ftp:4, web:5, ssh:6, mac-telnet:7, bandwidth-test:8, api:9, romon:10, rest-api:13 }">会话连接所使用的管理服务：`unknown`、`winbox`、`console`、`telnet`、`ftp`、`web`、`ssh`、`mac-telnet`、`bandwidth-test`、`api`、`romon` 或 `rest-api`。</ArgTableRow>
<ArgTableRow arg="group" typ="enum">登录用户所属的组，该组授予会话的权限。</ArgTableRow>
</ArgTable>
