---
sidebar_key: "cli-reference/ip/ssh/known-hosts"
sidebar_position: 3
title: "known-hosts"
sidebar_label: 'known-hosts'
source: https://manual.mikrotik.com/docs/cli-reference/ip/ssh/known-hosts
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ssh/known-hosts {#ipsshknown-hosts}
**类型：** 目录

路由器 SSH 客户端所信任的远程 SSH 服务器的主机公钥。当你在交互式客户端的信任提示中回答 `y`，或使用 `add` 手动固定密钥时，会存储密钥。当在 [`/ip/ssh`](./index.md) 中启用 `known-hosts-validation` 时使用。完整指南请参见 [SSH](../../../management-tools/ssh.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="host" typ="ip6Addr">密钥所属 SSH 服务器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="key" typ="string">服务器的主机公钥，采用一个 OpenSSH 风格条目：`<type> <base64>`，例如 `ssh-rsa AAAAB3...`。粘贴其他服务器的密钥会按原样存储；密钥不匹配会导致后续连接失败，并提示 `host key not trusted`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="key-type" typ="enum (rsa | ed25519)">已固定主机密钥的密钥类型：`rsa` 或 `ed25519`。</ArgTableRow>
<ArgTableRow arg="fingerprint" typ="string">固定密钥的 SHA256 指纹。将其与该服务器的 `host-key-fingerprint` 进行比较，该值由该服务器上的 `/ip/ssh/print` 显示。</ArgTableRow>
</ArgTable>
