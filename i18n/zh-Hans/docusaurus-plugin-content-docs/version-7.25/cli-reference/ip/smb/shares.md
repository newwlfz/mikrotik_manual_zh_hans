---
sidebar_key: "cli-reference/ip/smb/shares"
sidebar_position: 1
title: "shares"
sidebar_label: 'shares'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/smb/shares
captured_at: '2026-11-01T21:24:28+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/smb/shares {#ipsmbshares}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">该条目是自动创建的。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">该共享已禁用，客户端无法访问。</ArgTableRow>
<ArgTableRow arg="*" typ="default">该条目是系统创建的默认条目。</ArgTableRow>
<ArgTableRow arg="r" typ="read-only">该共享仅允许客户端读取；写入访问会被拒绝。</ArgTableRow>
<ArgTableRow arg="c" typ="require-encryption">该共享仅接受加密连接。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">客户端连接的 SMB 共享名称。</ArgTableRow>
<ArgTableRow arg="directory" typ="file">该共享指向的路由器上的目录。未设置时，使用根目录中 `name` 的值。如果目录不存在，则会自动创建。</ArgTableRow>
<ArgTableRow arg="read-only" typ="bool">客户端是否只能读取该共享。也可以通过在 [`users`](./users.md) 中为每个用户设置 `read-only` 来限制访问。默认值：no.</ArgTableRow>
<ArgTableRow arg="require-encryption" typ="bool">是否仅允许加密连接访问该共享；建议 macOS 客户端使用。默认值：no。</ArgTableRow>
<ArgTableRow arg="valid-users" typ="multi { array-id, user: enum
 }">允许访问该共享的 SMB 用户列表。当列表为空时，所有用户都可以访问。</ArgTableRow>
<ArgTableRow arg="invalid-users" typ="multi { array-id, user: enum
 }">被明确拒绝访问该共享的 SMB 用户列表。</ArgTableRow>
</ArgTable>
