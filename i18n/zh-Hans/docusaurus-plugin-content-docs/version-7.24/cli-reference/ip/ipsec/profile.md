---
sidebar_key: "cli-reference/ip/ipsec/profile"
sidebar_position: 8
title: "profile"
sidebar_label: "profile"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/ipsec/profile
captured_at: '2026-11-01T21:28:46+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/profile {#ipipsecprofile}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="hash-algorithm" typ="enum (md5 | sha1 | sha256 | sha384 | sha512)"></ArgTableRow>
<ArgTableRow arg="prf-algorithm" typ="enum (auto | sha1 | sha256 | sha384 | sha512)">仅 IKEv2</ArgTableRow>
<ArgTableRow arg="enc-algorithm" typ="ubit (aes-256, aes-192, aes-128, 3des, des)"></ArgTableRow>
<ArgTableRow arg="dh-group" typ="ubit (x25519, ecp256, ecp384, ecp521, modp6144, modp4096, modp3072, modp2048, modp1536, modp1024, modp768)"></ArgTableRow>
<ArgTableRow arg="lifetime" typ="time">仅 IKEv1</ArgTableRow>
<ArgTableRow arg="lifebytes" typ="num">仅 IKEv1</ArgTableRow>
<ArgTableRow arg="proposal-check" typ="enum (obey | strict | claim | exact) { obey:1, strict:2, claim:3, exact:4 }">生命周期检查逻辑（仅 IKEv1）</ArgTableRow>
<ArgTableRow arg="nat-traversal" typ="bool">仅 IKEv1</ArgTableRow>
<ArgTableRow arg="ppk" typ="enum (no | psk | qkd | psk-ike-initial)">后量子预共享密钥（仅 IKEv2）</ArgTableRow>
<ArgTableRow arg="dpd-interval" typ="alt { special: enum (disable-dpd) { disable-dpd:0 }
, num: time [ .. 3600]
 }"></ArgTableRow>
<ArgTableRow arg="dpd-maximum-failures" typ="num">仅 IKEv1</ArgTableRow>
</ArgTable>
