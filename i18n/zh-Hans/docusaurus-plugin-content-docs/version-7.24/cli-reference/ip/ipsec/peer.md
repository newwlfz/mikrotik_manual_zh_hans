---
sidebar_key: "cli-reference/ip/ipsec/peer"
sidebar_position: 6
title: "peer"
sidebar_label: "peer"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/ipsec/peer
captured_at: '2026-11-01T21:28:46+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/peer {#ipipsecpeer}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="R" typ="responder">responder</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="address" typ="alt { prefix6: ip6Prefix
, prefix4: ipPrefix
, dns: string
 }"></ArgTableRow>
<ArgTableRow arg="local-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }"></ArgTableRow>
<ArgTableRow arg="passive" typ="bool">被动对等体不会发起连接</ArgTableRow>
<ArgTableRow arg="port" typ="num">对等体端口</ArgTableRow>
<ArgTableRow arg="profile" typ="enum"></ArgTableRow>
<ArgTableRow arg="exchange-mode" typ="enum (main | aggressive | ike2)"></ArgTableRow>
<ArgTableRow arg="send-initial-contact" typ="bool"></ArgTableRow>
<ArgTableRow arg="ppk-secret" typ="string">带 "static-ppk-secret" ID 的静态 PPK 密钥，当此对等体不存在一次性密钥/psk 时使用，请确保该密钥具有 256 位熵</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="current-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }"></ArgTableRow>
</ArgTable>
