---
sidebar_key: "cli-reference/ip/ipsec/profile"
sidebar_position: 8
title: "profile"
sidebar_label: 'profile'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/profile
captured_at: '2026-11-01T21:24:12+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/profile {#ipipsecprofile}
**类型：** 目录

配置文件定义了一组用于 Phase 1 期间 IKE 协商的参数。这些参数可与其他对等体配置共享。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">该项是否为默认项。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">配置文件名称。</ArgTableRow>
<ArgTableRow arg="hash-algorithm" typ="enum (md5 | sha1 | sha256 | sha384 | sha512)">哈希算法。</ArgTableRow>
<ArgTableRow arg="prf-algorithm" typ="enum (auto | sha1 | sha256 | sha384 | sha512)">PRF 算法（仅 IKEv2）。</ArgTableRow>
<ArgTableRow arg="enc-algorithm" typ="ubit (aes-256, aes-192, aes-128, 3des, des)">加密算法。</ArgTableRow>
<ArgTableRow arg="dh-group" typ="ubit (x25519, ecp256, ecp384, ecp521, modp6144, modp4096, modp3072, modp2048, modp1536, modp1024, modp768)">Diffie-Hellman 组。</ArgTableRow>
<ArgTableRow arg="lifetime" typ="time">Phase 1 lifetime（仅 IKEv1）。</ArgTableRow>
<ArgTableRow arg="lifebytes" typ="num">Phase 1 lifetime（以字节为单位，仅 IKEv1）。它仅作为管理值添加到提议中。用于远端对等体需要特定 lifebytes 值才能建立 Phase 1 的情况。</ArgTableRow>
<ArgTableRow arg="proposal-check" typ="enum (obey | strict | claim | exact) { obey:1, strict:2, claim:3, exact:4 }">
Phase 2 lifetime 检查逻辑：
- `claim` - 取提议的 lifetime 和配置的 lifetime 中较短者，并就此通知发起方。
- `exact` - 要求 lifetime 相同。
- `obey` - 接受发起方发送的任何内容。
- `strict` - 如果提议的 lifetime 长于默认值，则拒绝该提议，否则接受提议的 lifetime。
</ArgTableRow>
<ArgTableRow arg="nat-traversal" typ="bool">使用 Linux NAT-T 机制解决 IPsec 对等体之间因 NAT 路由器而出现的 IPsec 不兼容问题。此功能只能与 ESP 协议配合使用（按设计不支持 AH，因为 AH 会对完整数据包（包括 IP 头部）进行签名，而 NAT 会更改 IP 头部，从而使 AH 签名无效）。该方法将 IPsec ESP 流量封装到 UDP 流中，以克服一些导致 ESP 与 NAT 不兼容的小问题。</ArgTableRow>
<ArgTableRow arg="ppk" typ="enum (no | psk | qkd | psk-ike-initial)">后量子预共享密钥（仅 IKEv2）。</ArgTableRow>
<ArgTableRow arg="dpd-interval" typ="alt { special: enum (disable-dpd) { disable-dpd:0 }
, num: time [ .. 3600]
 }">对等体失效检测间隔。</ArgTableRow>
<ArgTableRow arg="dpd-maximum-failures" typ="num">在对等体被视为失效之前允许的最大 DPD 失败次数（仅 IKEv1）。</ArgTableRow>
</ArgTable>
