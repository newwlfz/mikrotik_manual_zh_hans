---
sidebar_key: "cli-reference/user/index"
sidebar_position: 5
title: "user"
sidebar_label: 'user'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user
captured_at: '2026-11-01T21:26:05+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## 用户 {#user}

路由器管理用户账户。每个用户恰好属于一个 [group](./group.md)，该组授予用户拥有的权限（策略）。完整指南请参阅 [用户](../../authentication-authorization-accounting/user.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="E" typ="expired">密码已通过 [`/user/expire-password`](./expire-password.md) 过期。下次交互式登录时，系统会要求用户设置新密码；设置新密码会清除该标记。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">用户账户已禁用，无法登录。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">登录用户名。允许使用字母、数字以及字符 `_` `.` `#` `-` `@`；名称必须以字母或数字结尾，且不能以 `.` 或 `-` 开头。</ArgTableRow>
<ArgTableRow arg="group" typ="enum" mandatory="1">授予用户所拥有权限（策略）的用户组。</ArgTableRow>
<ArgTableRow arg="password" typ="string" mandatory="1">登录密码。接受任何字符，包括空格、符号和 UTF-8。显式空值（`password=""`）允许使用空密码登录。若设置了来自 [`/user/settings`](./settings.md) 的复杂度策略，则应用该策略。</ArgTableRow>
<ArgTableRow arg="inactivity-timeout" typ="time">空闲时间，超过该时间后 `inactivity-policy` 将应用于交互式控制台会话。范围 00:01:00 至 1d00:00:00。默认值：10m。</ArgTableRow>
<ArgTableRow arg="inactivity-policy" typ="enum (none | logout | lockscreen)">
当 `inactivity-timeout` 到期时采取的动作：
- `none`（默认）- 空闲会话保持运行。
- `logout` - 关闭空闲会话，并显示消息 "`<name>` was logged out due to inactivity"。
- `lockscreen` - 锁定会话（"Session is locked (Ctrl-D to Quit)"）并要求用户输入密码才能恢复；密码错误时打印 "Sorry, try again."。
</ArgTableRow>
<ArgTableRow arg="address" typ="object { address: alt { address: ipPrefix
, address: ip6Prefix
 }
 }">带掩码的 IP 地址或 IPv6 前缀。设置后，用户只能从匹配的源地址登录；来自其他地址的登录将被拒绝。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="last-logged-in" typ="date">用户上次登录的日期和时间。</ArgTableRow>
</ArgTable>
