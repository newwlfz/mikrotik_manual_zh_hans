---
sidebar_key: "cli-reference/system/keymat-provider/index"
sidebar_position: 1
title: "keymat-provider"
sidebar_label: "keymat-provider"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/keymat-provider
captured_at: '2026-11-01T21:29:51+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/keymat-provider {#systemkeymat-provider}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (qkd | hkdf)"></ArgTableRow>
<ArgTableRow arg="key-size" typ="num">以位为单位</ArgTableRow>
<ArgTableRow arg="qkd-address" typ="string">KME 设备地址</ArgTableRow>
<ArgTableRow arg="qkd-kme-id" typ="string">应与收到的 TLS 证书中的 KME ID 匹配</ArgTableRow>
<ArgTableRow arg="qkd-certificate" typ="enum (none)">这也会指定你的 SAE ID</ArgTableRow>
<ArgTableRow arg="qkd-peer-sae-id" typ="string">对端（主设备或从设备）SAE ID</ArgTableRow>
<ArgTableRow arg="qkd-cache-size" typ="num">要保留在缓存中的未使用密钥数量</ArgTableRow>
<ArgTableRow arg="hkdf-secret" typ="string"></ArgTableRow>
<ArgTableRow arg="hkdf-hash" typ="enum (sha256 | sha512)"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="qkd-cache-state" typ="num">当前缓存中未使用密钥的数量</ArgTableRow>
<ArgTableRow arg="qkd-total-keys-received" typ="num">已接收密钥的总数</ArgTableRow>
</ArgTable>
