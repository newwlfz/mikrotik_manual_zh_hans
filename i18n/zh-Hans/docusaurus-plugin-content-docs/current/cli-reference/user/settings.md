---
sidebar_key: "cli-reference/user/settings"
sidebar_position: 5
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/user/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/settings {#usersettings}
**类型：** 设置目录

在 [`/user`](./index.md) 中添加用户或使用 `/password` 更改密码时，会强制执行密码复杂度策略。完整指南请参见 [用户](../../authentication-authorization-accounting/user.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="minimum-password-length" typ="num">可接受的最短密码长度，以字符为单位。较短的密码会被拒绝，提示为 "password is too short - must be at least N characters"。范围 0 到 4294967295。默认值：0。</ArgTableRow>
<ArgTableRow arg="minimum-categories" typ="num">密码必须使用的字符类别数量，共四类：数字、小写字母、大写字母和符号。较弱的密码会被拒绝，提示为 "password is too weak - it must contain characters from at least N categories (digits, lower and upper case letters, symbols)"。范围 0 到 4。默认值：0。</ArgTableRow>
</ArgTable>
