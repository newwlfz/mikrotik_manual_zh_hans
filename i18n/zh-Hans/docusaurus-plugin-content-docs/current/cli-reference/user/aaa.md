---
sidebar_key: "cli-reference/user/aaa"
sidebar_position: 1
title: "aaa"
sidebar_label: 'aaa'
source: https://manual.mikrotik.com/docs/cli-reference/user/aaa
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/aaa {#useraaa}
**类型：** 设置目录

用于管理登录的 AAA 设置：针对 RADIUS 服务器进行身份验证，以及对管理会话进行 RADIUS 计费。完整指南请参见 [用户](../../authentication-authorization-accounting/user.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="use-radius" typ="bool">使用 RADIUS 服务器对管理登录进行身份验证；必须存在一个带有 `service=login` 的 [`/radius`](../radius/index.md) 条目。首先查询本地用户数据库——RADIUS 仅用于本地未找到的用户名。Access-Accept 中的 `Mikrotik-Group` 属性选择本地组。通过 RADIUS 进行 SSH 登录的密码身份验证使用 MS-CHAPv2。默认值：no.</ArgTableRow>
<ArgTableRow arg="accounting" typ="bool">当管理会话登录和注销时，发送 RADIUS 计费 Start 和 Stop 消息。管理会话计费不包含带宽计数器。默认值：yes。</ArgTableRow>
<ArgTableRow arg="interim-update" typ="time">活动会话的 Interim-Update 计费消息之间的间隔。默认值：0s。</ArgTableRow>
<ArgTableRow arg="default-group" typ="enum">当服务器未发送组，或发送的组列在 `exclude-groups` 中时，分配给通过 RADIUS 身份验证的用户的组。默认值：read。</ArgTableRow>
<ArgTableRow arg="exclude-groups" typ="multi { group: enum
 }">从不接受来自 RADIUS 服务器的组。如果服务器发送其中任意一个，用户将改为获得 `default-group`；这可防止恶意 RADIUS 服务器授予完全权限。默认值：none。</ArgTableRow>
</ArgTable>
