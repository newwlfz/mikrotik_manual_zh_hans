---
sidebar_key: "cli-reference/ip/ssh/export-host-key"
sidebar_position: 1
title: "export-host-key"
sidebar_label: 'export-host-key'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ssh/export-host-key
captured_at: '2026-11-01T21:24:27+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ssh/export-host-key {#ipsshexport-host-key}
**类型：** 命令

将 RSA/Ed25519 公钥和私钥导出到文件。

:::info
主机密钥以 PKCS#8 格式导出。

导出 SSH 主机密钥需要 "sensitive" 用户策略。
:::

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="key-file-prefix" typ="string">生成文件的前缀：例如，对于 RSA 主机密钥，`my` 会生成 `my_rsa.pem`（私钥）和 `my_rsa_pub.pem`（公钥）；对于 Ed25519 主机密钥，则会生成 `my_ed25519.pem` 和 `my_ed25519_pub.pem`。两个文件均为 PKCS#8 PEM 格式。</ArgTableRow>
<ArgTableRow arg="passphrase" typ="string">私钥密码短语。</ArgTableRow>
</ArgTable>
