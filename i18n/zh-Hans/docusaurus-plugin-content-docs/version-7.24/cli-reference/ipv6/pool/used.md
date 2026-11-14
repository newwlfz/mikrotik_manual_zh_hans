---
sidebar_key: "cli-reference/ipv6/pool/used"
sidebar_position: 1
title: "used"
sidebar_label: "used"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/pool/used
captured_at: '2026-11-01T21:29:10+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/pool/used {#ipv6poolused}
**类型：**目录

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="pool" typ="enum">为该前缀预留地址的地址池名称。</ArgTableRow>
<ArgTableRow arg="prefix" typ="ip6Prefix">从地址池中分配给客户端的 IPv6 前缀。</ArgTableRow>
<ArgTableRow arg="owner" typ="string">由什么预留了该前缀（"DHCP" 等）</ArgTableRow>
<ArgTableRow arg="info" typ="string">显示从客户端收到的 DUID 相关信息（十六进制值）。也可能包含十六进制的原始时间戳。</ArgTableRow>
</ArgTable>
