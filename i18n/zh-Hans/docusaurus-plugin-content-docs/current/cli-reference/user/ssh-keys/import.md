---
sidebar_key: "cli-reference/user/ssh-keys/import"
sidebar_position: 1
title: "import"
sidebar_label: 'import'
source: https://manual.mikrotik.com/docs/cli-reference/user/ssh-keys/import
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/ssh-keys/import {#userssh-keysimport}
**类型：** 命令

从路由器根目录中的文件导入 SSH 公钥，并将其分配给用户。接受的格式：OpenSSH 单行格式、PKCS#1 PEM（"BEGIN RSA PUBLIC KEY"）和 PKCS#8/SPKI PEM（"BEGIN PUBLIC KEY"）。完整指南请参阅 [用户](../../../authentication-authorization-accounting/user.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="public-key-file" typ="file">路由器根目录中密钥文件的名称。</ArgTableRow>
<ArgTableRow arg="user" typ="enum">要分配密钥的系统用户。</ArgTableRow>
<ArgTableRow arg="info" typ="string">密钥的自由文本标签。</ArgTableRow>
</ArgTable>
