---
sidebar_key: "cli-reference/user/group"
sidebar_position: 4
title: "group"
sidebar_label: 'group'
source: https://manual.mikrotik.com/docs/cli-reference/user/group
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/group {#usergroup}
**类型：**目录

用户组定义授予组成员的权限（策略）。内置组 `read`、`write` 和 `full` 无法删除。完整指南请参阅 [用户](../../authentication-authorization-accounting/user.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">组名称。</ArgTableRow>
<ArgTableRow arg="policy" typ="multi { array-id, array-id, policy: super { !
, policy: enum
 }
 }">
授予组成员的权限。在策略前加上 `!` 可撤销该策略。`add` 会撤销其未列出的所有策略，而未使用 `policy` 创建的新组会将所有策略取反（无权限）。`set` 仅更改其列出的策略：对具有 `api` 的组执行 `set policy=read,rest-api` 会保留 `api`；`policy=!api` 会撤销它。默认值：none.
- `local` - 在本地控制台登录。
- `telnet` - 通过 Telnet 登录。
- `ssh` - 通过 SSH 登录。
- `ftp` - 通过 FTP 登录；允许读取、写入和删除文件（与 `read` 和 `write` 一起使用）。
- `reboot` - 重启路由器。
- `read` - 对路由器配置的读取权限。
- `write` - 对配置的写入权限（用户管理除外）；不包含 `read`。
- `policy` - 用户管理权限（与 `write` 一起使用）；还允许查看其他用户创建的脚本变量（需要 `test`）以及设计 WebFig 皮肤（需要 `sensitive`）。
- `test` - 运行 ping、traceroute、bandwidth-test、wireless scan 和 snooper、fetch、email 及其他测试工具。
- `winbox` - 通过 WinBox 登录并使用 bandwidth-test 身份验证。
- `password` - 使用 `/password` 更改用户自己的密码。
- `web` - 通过 WebFig 登录。
- `sniff` - 使用数据包嗅探器、torch 和流量生成器。
- `sensitive` - 查看和更改敏感信息。
- `api` - 通过 API 访问路由器。
- `romon` - 连接到 RoMON 服务器。
- `rest-api` - 通过 REST API 访问路由器。
</ArgTableRow>
<ArgTableRow arg="skin" typ="enum">应用于通过 WebFig 登录的组成员的 WebFig 皮肤。默认值：default。</ArgTableRow>
</ArgTable>
