---
title: "aaa"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user/aaa
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/user"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## user/aaa 
**类型：** 设置目录

管理登录的 AAA 设置：针对 RADIUS 服务器进行身份验证，并对管理会话进行 RADIUS 计费。完整指南请参阅 [User](/docs/authentication-authorization-accounting/user)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="use-radius" typ="bool">Authenticate management logins against a RADIUS server; a [`/radius`](/docs/cli-reference/radius) entry with `service=login` must exist. The local user database is consulted first — RADIUS is used only for user names not found locally. A `Mikrotik-Group` attribute in the Access-Accept selects the local group. Password authentication over RADIUS for SSH logins uses MS-CHAPv2. Default: no.</ArgTableRow>
<ArgTableRow arg="accounting" typ="bool">Send RADIUS accounting Start and Stop messages when a management session logs in and out. Management-session accounting carries no bandwidth counters. Default: yes.</ArgTableRow>
<ArgTableRow arg="interim-update" typ="time">Interval between Interim-Update accounting messages for active sessions. Default: 0s.</ArgTableRow>
<ArgTableRow arg="default-group" typ="enum">Group assigned to RADIUS-authenticated users when the server sends no group, or when the sent group is listed in `exclude-groups`. Default: read.</ArgTableRow>
<ArgTableRow arg="exclude-groups" typ="multi { group: enum
 }">Groups never accepted from the RADIUS server. If the server sends one of them, the user receives `default-group` instead; this protects against a rogue RADIUS server granting full rights. Default: none.</ArgTableRow>
</ArgTable>
