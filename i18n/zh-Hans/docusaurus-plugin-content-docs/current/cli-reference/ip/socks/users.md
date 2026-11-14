---
sidebar_key: "cli-reference/ip/socks/users"
sidebar_position: 3
title: "users"
sidebar_label: 'users'
source: https://manual.mikrotik.com/docs/cli-reference/ip/socks/users
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/socks/users {#ipsocksusers}
**类型：** 目录

SOCKS5 用户名/密码认证用户，当 [`/ip/socks`](./index.md) 设置了 `auth-method=password` 时使用。新建用户默认处于启用状态。更多信息请参阅 [SOCKS](../../../network-management/socks/index.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用。该用户无法通过认证。新建用户默认处于启用状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">用于 SOCKS5 认证的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string" mandatory="1">用于 SOCKS5 认证的密码。不会显示在 `print` 输出中。</ArgTableRow>
<ArgTableRow arg="only-one" typ="bool"></ArgTableRow>
<ArgTableRow arg="rate-limit" typ="string">应用于该用户代理连接的速率限制，单位为比特每秒，例如 `64000`。</ArgTableRow>
</ArgTable>
