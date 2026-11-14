---
sidebar_key: "cli-reference/ip/ipsec/key/rsa/generate-key"
sidebar_position: 2
title: "generate-key"
sidebar_label: 'generate-key'
source: https://manual.mikrotik.com/docs/cli-reference/ip/ipsec/key/rsa/generate-key
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/key/rsa/generate-key {#ipipseckeyrsagenerate-key}
**类型：** 命令

生成私钥。接受两个参数：新生成密钥的名称以及密钥长度 1024、2048 和 4096。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">生成的密钥的名称。</ArgTableRow>
<ArgTableRow arg="key-size" typ="alt { key-size: enum (2048 | 4096 | 8192) { 2048:2048, 4096:4096, 8192:8192 }
 }">RSA 密钥长度（以位为单位）。</ArgTableRow>
</ArgTable>
