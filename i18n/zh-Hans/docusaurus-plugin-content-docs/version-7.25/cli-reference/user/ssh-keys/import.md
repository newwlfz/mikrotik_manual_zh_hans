---
title: "import"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user/ssh-keys/import
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/user/ssh-keys"
pagination_next: "cli-reference/user/ssh-keys/private"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## user/ssh-keys/import 
**类型：** 命令

从路由器根目录中的文件导入公共 SSH 密钥，并将其分配给用户。接受的格式：OpenSSH 单行格式、PKCS#1 PEM（“BEGIN RSA PUBLIC KEY”）和 PKCS#8/SPKI PEM（“BEGIN PUBLIC KEY”）。完整指南请参阅 [User](/docs/authentication-authorization-accounting/user)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="public-key-file" typ="file">Name of the key file in the router's root directory.</ArgTableRow>
<ArgTableRow arg="user" typ="enum">System user to assign the key to.</ArgTableRow>
<ArgTableRow arg="info" typ="string">Free-text label for the key.</ArgTableRow>
</ArgTable>
