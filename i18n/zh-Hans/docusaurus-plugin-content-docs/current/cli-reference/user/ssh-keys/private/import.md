---
sidebar_key: "cli-reference/user/ssh-keys/private/import"
sidebar_position: 1
title: "import"
sidebar_label: 'import'
source: https://manual.mikrotik.com/docs/cli-reference/user/ssh-keys/private/import
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/ssh-keys/private/import {#userssh-keysprivateimport}
**类型：** 命令

从路由器根目录下的文件中导入私钥 SSH 密钥。接受的格式：PKCS#1 PEM RSA（"BEGIN RSA PRIVATE KEY"）、PKCS#8（"BEGIN PRIVATE KEY"）以及加密的 PKCS#8（"BEGIN ENCRYPTED PRIVATE KEY"，需要 `passphrase`）。OpenSSH 格式的私钥（"BEGIN OPENSSH PRIVATE KEY"）会被拒绝。完整指南请参见 [用户](../../../../authentication-authorization-accounting/user.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="private-key-file" typ="file">路由器根目录中密钥文件的名称。</ArgTableRow>
<ArgTableRow arg="user" typ="enum">拥有该密钥的系统用户。</ArgTableRow>
<ArgTableRow arg="passphrase" typ="string">加密密钥文件的密码短语。</ArgTableRow>
<ArgTableRow arg="info" typ="string">密钥的自由文本标签。</ArgTableRow>
</ArgTable>
