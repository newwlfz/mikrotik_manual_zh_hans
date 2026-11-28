---
title: "import-host-key"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ssh/import-host-key
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/ssh/import-host-key 
**类型：** 命令

从指定文件导入并替换私有 RSA/Ed25519 密钥

:::info
私有密钥支持 PEM 或 PKCS#8 格式。
:::

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="private-key-file" typ="file">Name of the private RSA/Ed25519 key file in PEM or PKCS#8 format.</ArgTableRow>
<ArgTableRow arg="passphrase" typ="string">Private key passphrase.</ArgTableRow>
</ArgTable>
