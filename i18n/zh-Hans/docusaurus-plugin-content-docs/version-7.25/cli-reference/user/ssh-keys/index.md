---
sidebar_key: "cli-reference/user/ssh-keys/index"
sidebar_position: 2
title: "ssh-keys"
sidebar_label: 'ssh-keys'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user/ssh-keys
captured_at: '2026-11-01T21:26:12+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## user/ssh-keys {#userssh-keys}
**类型：** 目录

分配给用户的 SSH 公钥；这些密钥用于认证这些用户的传入 SSH 登录。当用户至少分配了一个密钥时，SSH 服务器会拒绝该用户的密码认证，并且仅提供公钥认证。完整指南请参阅 [用户](../../../authentication-authorization-accounting/user.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="user" typ="enum">该密钥分配到的系统用户。</ArgTableRow>
<ArgTableRow arg="info" typ="string">密钥的自由文本标签。使用 `key` 添加密钥时，粘贴的 OpenSSH 密钥字符串中的末尾注释会成为该密钥的 `info`，并覆盖此参数。</ArgTableRow>
<ArgTableRow arg="key" typ="string">公钥字符串，仅在添加新密钥时设置。仅接受 OpenSSH 单行格式；PEM 块会被拒绝。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="key-type" typ="enum (rsa | ed25519 | ed25519-sk)">密钥类型：`rsa`、`ed25519` 或 `ed25519-sk`。</ArgTableRow>
<ArgTableRow arg="bits" typ="num">密钥长度（以位为单位）。</ArgTableRow>
<ArgTableRow arg="fingerprint" typ="string">密钥的 SHA256 指纹（base64 格式，例如 `SHA256:...`）。</ArgTableRow>
</ArgTable>
