---
sidebar_key: "cli-reference/ip/ssh/index"
sidebar_position: 3
title: "ssh"
sidebar_label: "ssh"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/ssh
captured_at: '2026-11-01T21:28:58+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ssh {#ipssh}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ciphers" typ="multi { array-id, cipher: enum (aes-gcm | aes-ctr | aes-cbc | 3des-cbc | null | auto)
 }">允许的加密算法列表</ArgTableRow>
<ArgTableRow arg="forwarding-enabled" typ="enum (no | local | remote | both)">控制允许的转发类型</ArgTableRow>
<ArgTableRow arg="password-authentication" typ="enum (yes | no | yes-if-no-key)"></ArgTableRow>
<ArgTableRow arg="publickey-authentication-options" typ="enum (none | touch-required | verify-required)"></ArgTableRow>
<ArgTableRow arg="strong-crypto" typ="bool">使用更强的加密、HMAC 算法，使用更大的 DH 素数并禁止较弱的算法</ArgTableRow>
<ArgTableRow arg="host-key-size" typ="enum (1024 | 1536 | 2048 | 4096 | 8192) { 1024:1024, 1536:1536, 2048:2048, 4096:4096, 8192:8192 }">重新生成主机密钥时的 RSA 密钥大小</ArgTableRow>
<ArgTableRow arg="host-key-type" typ="enum (rsa | ed25519) { rsa:0, ed25519:3 }"></ArgTableRow>
</ArgTable>
