---
title: "users"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/socks/users
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/socks/users 
**类型：** 目录

用于 SOCKS5 用户名/密码认证的用户，当 [`/ip/socks`](/docs/cli-reference/ip/socks) 使用 `auth-method=password` 时使用。新用户创建后默认启用。详情请参阅 [SOCKS](/docs/network-management/socks)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled. The user cannot authenticate. New users are created enabled.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Username for SOCKS5 authentication.</ArgTableRow>
<ArgTableRow arg="password" typ="string" mandatory="1">Password for SOCKS5 authentication. Not shown in `print` output.</ArgTableRow>
<ArgTableRow arg="only-one" typ="bool"></ArgTableRow>
<ArgTableRow arg="rate-limit" typ="string">Rate limit applied to the user's proxied connections, in bits per second, for example `64000`.</ArgTableRow>
</ArgTable>
