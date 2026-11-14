---
sidebar_key: "cli-reference/ip/ipsec/proposal"
sidebar_position: 9
title: "proposal"
sidebar_label: 'proposal'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/proposal
captured_at: '2026-11-01T21:24:13+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/proposal {#ipipsecproposal}
**类型：** 目录

IKE 守护进程为某些策略建立 SA 而发送的提议信息。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否已禁用。</ArgTableRow>
<ArgTableRow arg="*" typ="default">项目是否为默认项。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">提议名称。</ArgTableRow>
<ArgTableRow arg="auth-algorithms" typ="ubit (sha512, sha256, sha1, md5, null)">允许的身份验证算法。MD5 使用 128 位密钥，SHA1 使用 160 位密钥。</ArgTableRow>
<ArgTableRow arg="enc-algorithms" typ="ubit (chacha20poly1305, aes-256-cbc, aes-256-ctr, aes-256-gcm, camellia-256, aes-192-cbc, aes-192-ctr, aes-192-gcm, camellia-192, aes-128-cbc, aes-128-ctr, aes-128-gcm, camellia-128, 3des, blowfish, twofish, des, null)">允许的加密算法。</ArgTableRow>
<ArgTableRow arg="lifetime" typ="time">阶段 2 生命周期。</ArgTableRow>
<ArgTableRow arg="pfs-group" typ="enum (none | ecp256 | ecp384 | ecp521 | modp6144 | modp4096 | modp3072 | modp2048 | modp1536 | modp1024 | modp768) { none:0 }">完美前向保密组。</ArgTableRow>
</ArgTable>
