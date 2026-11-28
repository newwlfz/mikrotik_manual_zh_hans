---
title: "export-host-key"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ssh/export-host-key
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/ssh"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/ssh/export-host-key 
**类型：** 命令

将 RSA/Ed25519 公钥和私钥导出到文件。

:::info
主机密钥以 PKCS#8 格式导出。

导出 SSH 主机密钥需要“sensitive”用户策略。
:::

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="key-file-prefix" typ="string">Prefix for the generated files: for example `my` produces `my_rsa.pem` (private key) and `my_rsa_pub.pem` (public key) for an RSA host key, or `my_ed25519.pem` and `my_ed25519_pub.pem` for an Ed25519 one. Both files are in PKCS#8 PEM format.</ArgTableRow>
<ArgTableRow arg="passphrase" typ="string">Private key passphrase.</ArgTableRow>
</ArgTable>
