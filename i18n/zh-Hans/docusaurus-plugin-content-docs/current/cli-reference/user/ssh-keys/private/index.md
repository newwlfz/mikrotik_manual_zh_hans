---
sidebar_key: "cli-reference/user/ssh-keys/private"
title: "private"
sidebar_label: 'private'
source: https://manual.mikrotik.com/docs/cli-reference/user/ssh-keys/private
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/ssh-keys/private {#userssh-keysprivate}
**类型：** 目录

SSH 私钥用于在到其他设备的出站 SSH 连接中标识路由器，例如通过 [`/system/ssh`](../../../system/ssh.md) 或 [`/tool/fetch`](../../../tool/fetch.md)。所有属性均为只读；密钥通过 [`/user/ssh-keys/private/import`](./import.md) 添加。完整指南请参阅 [用户](../../../../authentication-authorization-accounting/user.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="user" typ="enum">拥有该密钥的系统用户。</ArgTableRow>
<ArgTableRow arg="key-type" typ="enum (rsa | ed25519)">密钥类型：`rsa` 或 `ed25519`。</ArgTableRow>
<ArgTableRow arg="bits" typ="num">密钥长度（位）。</ArgTableRow>
<ArgTableRow arg="info" typ="string">该密钥的自由文本标签。</ArgTableRow>
</ArgTable>
