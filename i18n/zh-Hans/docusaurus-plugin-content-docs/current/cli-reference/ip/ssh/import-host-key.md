---
sidebar_key: "cli-reference/ip/ssh/import-host-key"
sidebar_position: 2
title: "import-host-key"
sidebar_label: 'import-host-key'
source: https://manual.mikrotik.com/docs/cli-reference/ip/ssh/import-host-key
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ssh/import-host-key {#ipsshimport-host-key}
**类型：** 命令

从指定文件导入并替换 RSA/Ed25519 私钥

:::info
私钥支持 PEM 或 PKCS#8 格式。
:::

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="private-key-file" typ="file">PEM 或 PKCS#8 格式的 RSA/Ed25519 私钥文件的名称。</ArgTableRow>
<ArgTableRow arg="passphrase" typ="string">私钥密码短语。</ArgTableRow>
</ArgTable>
