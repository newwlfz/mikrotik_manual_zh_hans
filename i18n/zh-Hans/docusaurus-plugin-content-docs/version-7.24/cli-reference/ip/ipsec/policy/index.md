---
sidebar_key: "cli-reference/ip/ipsec/policy/index"
sidebar_position: 2
title: "policy"
sidebar_label: "policy"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/ipsec/policy
captured_at: '2026-11-01T21:28:48+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/policy {#ipipsecpolicy}
**类型：**目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="T" typ="template">template</ArgTableRow>
<ArgTableRow arg="B" typ="backup">backup</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="A" typ="active">已启用</ArgTableRow>
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="peer" typ="multi { array-id, peer: enum
 }">自动激活对等体建立连接，与 shunt 策略一起使用</ArgTableRow>
<ArgTableRow arg="tunnel" typ="bool"></ArgTableRow>
<ArgTableRow arg="group" typ="enum ()"></ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { prefix6: ip6Prefix
, prefix4: ipPrefix
 }"></ArgTableRow>
<ArgTableRow arg="src-port" typ="num"></ArgTableRow>
<ArgTableRow arg="dst-address" typ="alt { prefix6: ip6Prefix
, prefix4: ipPrefix
 }"></ArgTableRow>
<ArgTableRow arg="dst-port" typ="num"></ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (all) { all:255 }"></ArgTableRow>
<ArgTableRow arg="action" typ="enum (encrypt | discard | none) { encrypt:2, discard:0, none:1 }"></ArgTableRow>
<ArgTableRow arg="level" typ="enum (require | use | unique) { require:2, use:1, unique:3 }"></ArgTableRow>
<ArgTableRow arg="ipsec-protocols" typ="enum (ah | esp) { ah:1, esp:2 }">使用哪种 IPsec 协议</ArgTableRow>
<ArgTableRow arg="sa-src-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">端点地址</ArgTableRow>
<ArgTableRow arg="sa-dst-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">端点地址</ArgTableRow>
<ArgTableRow arg="proposal" typ="enum"></ArgTableRow>
<ArgTableRow arg="template" typ="bool"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="ph2-count" typ="num"></ArgTableRow>
<ArgTableRow arg="ph2-state" typ="enum (spawning | starting | ready-to-send | getspi-sent | getspi-done | msg1-sent | ready-to-establish | commiting | adding-sa | established | expired | no-phase2) { spawning:0, starting:1, ready-to-send:2, getspi-sent:3, getspi-done:4, msg1-sent:5, ready-to-establish:6, commiting:7, adding-sa:8, established:9, expired:10, no-phase2:11 }"></ArgTableRow>
</ArgTable>
