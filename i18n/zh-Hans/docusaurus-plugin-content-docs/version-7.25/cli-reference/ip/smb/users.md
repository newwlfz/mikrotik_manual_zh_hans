---
sidebar_key: "cli-reference/ip/smb/users"
sidebar_position: 2
title: "users"
sidebar_label: 'users'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/smb/users
captured_at: '2026-11-01T21:24:25+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/smb/users {#ipsmbusers}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">该条目会自动创建。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">该用户已被禁用，无法登录。</ArgTableRow>
<ArgTableRow arg="*" typ="default">该条目是由系统创建的默认条目。</ArgTableRow>
<ArgTableRow arg="r" typ="read-only">该用户对共享具有 read-only 访问权限。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">SMB 服务用户的登录名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">SMB 用户的密码。</ArgTableRow>
<ArgTableRow arg="read-only" typ="bool">用户是否对共享具有 read-only 访问权限。默认值：yes。</ArgTableRow>
</ArgTable>
