---
title: "private"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user/ssh-keys/private
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## user/ssh-keys/private 
**类型：** 目录

用于在到其它设备的出站 SSH 连接中标识路由器的私有 SSH 密钥，例如通过 [`/system/ssh`](/docs/cli-reference/system/ssh) 或 [`/tool/fetch`](/docs/cli-reference/tool/fetch)。所有属性均为只读；密钥通过 [`/user/ssh-keys/private/import`](/docs/cli-reference/user/ssh-keys/import) 添加。完整指南请参阅 [User](/docs/authentication-authorization-accounting/user)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="user" typ="enum">System user that owns the key.</ArgTableRow>
<ArgTableRow arg="key-type" typ="enum (rsa | ed25519)">Type of the key: `rsa` or `ed25519`.</ArgTableRow>
<ArgTableRow arg="bits" typ="num">Key length in bits.</ArgTableRow>
<ArgTableRow arg="info" typ="string">Free-text label for the key.</ArgTableRow>
</ArgTable>
