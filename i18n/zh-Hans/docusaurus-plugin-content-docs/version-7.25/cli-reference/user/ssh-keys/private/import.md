---
title: "import"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user/ssh-keys/private/import
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/user/ssh-keys/private"
pagination_next: "cli-reference/user-manager"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## user/ssh-keys/private/import 
**类型：** 命令

从路由器根目录中的文件导入私有 SSH 密钥。接受的格式：PKCS#1 PEM RSA（“BEGIN RSA PRIVATE KEY”）、PKCS#8（“BEGIN PRIVATE KEY”）和加密的 PKCS#8（“BEGIN ENCRYPTED PRIVATE KEY”，需要 `passphrase`）。OpenSSH 格式的私有密钥（“BEGIN OPENSSH PRIVATE KEY”）将被拒绝。完整指南请参阅 [User](/docs/authentication-authorization-accounting/user)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="private-key-file" typ="file">Name of the key file in the router's root directory.</ArgTableRow>
<ArgTableRow arg="user" typ="enum">System user that owns the key.</ArgTableRow>
<ArgTableRow arg="passphrase" typ="string">Passphrase of an encrypted key file.</ArgTableRow>
<ArgTableRow arg="info" typ="string">Free-text label for the key.</ArgTableRow>
</ArgTable>
