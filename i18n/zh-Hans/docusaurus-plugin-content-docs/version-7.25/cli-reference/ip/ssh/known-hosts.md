---
title: "known-hosts"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ssh/known-hosts
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/ssh/known-hosts 
**类型：** 目录

路由器 SSH 客户端信任的远程 SSH 服务器的主机公钥。当你在交互式客户端的信任提示中回答 `y`，或使用 `add` 手动固定密钥时，会存储密钥。当 [`/ip/ssh`](/docs/cli-reference/ip/ssh) 中启用 `known-hosts-validation` 时使用。完整指南请参阅 [SSH](/docs/management-tools/ssh)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="host" typ="ip6Addr">IP address of the SSH server the key belongs to.</ArgTableRow>
<ArgTableRow arg="key" typ="string">Public host key of the server as one OpenSSH-style entry: `<type> <base64>`, for example `ssh-rsa AAAAB3...`. Pasting the key of a different server stores it as-is; a mismatched key causes later connections to fail with `host key not trusted`.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="key-type" typ="enum (rsa | ed25519)">Key type of the pinned host key: `rsa` or `ed25519`.</ArgTableRow>
<ArgTableRow arg="fingerprint" typ="string">SHA256 fingerprint of the pinned key. Compare it with the server's `host-key-fingerprint` shown by `/ip/ssh/print` on that server.</ArgTableRow>
</ArgTable>
