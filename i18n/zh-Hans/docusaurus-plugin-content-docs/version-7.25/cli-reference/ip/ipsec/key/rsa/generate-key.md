---
title: "generate-key"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/key/rsa/generate-key
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/ipsec/key/rsa/generate-key 
**类型：** 命令

生成私钥。接受两个参数：新生成密钥的名称，以及密钥大小 1024、2048 和 4096。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name for the generated key.</ArgTableRow>
<ArgTableRow arg="key-size" typ="alt { key-size: enum (2048 | 4096 | 8192) { 2048:2048, 4096:4096, 8192:8192 }
 }">RSA key size in bits.</ArgTableRow>
</ArgTable>
