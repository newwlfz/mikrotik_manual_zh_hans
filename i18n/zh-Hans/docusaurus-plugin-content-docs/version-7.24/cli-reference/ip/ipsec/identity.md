---
sidebar_key: "cli-reference/ip/ipsec/identity"
sidebar_position: 2
title: "identity"
sidebar_label: "identity"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/ipsec/identity
captured_at: '2026-11-01T21:28:43+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/identity {#ipipsecidentity}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="peer" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="auth-method" typ="enum (pre-shared-key | digital-signature | eap | eap-radius | pre-shared-key-xauth | rsa-key | rsa-signature-hybrid)"></ArgTableRow>
<ArgTableRow arg="eap-methods" typ="multi { array-id, method: enum (eap-tls | eap-ttls | eap-peap | eap-mschapv2)
 }">EAP 方法</ArgTableRow>
<ArgTableRow arg="mode-config" typ="enum (none)"></ArgTableRow>
<ArgTableRow arg="notrack-chain" typ="string">为 dynamic 策略添加 dynamic raw notrack 规则</ArgTableRow>
<ArgTableRow arg="my-id" typ="alt { string: composite { type: enum (fqdn | user-fqdn | key-id)
, data: string
 }
, address: composite { type: enum (address)
, data: alt { ipv6: ip6Addr
, ip: ipAddr
 }
 }
, other: enum (auto | dn)
 }"></ArgTableRow>
<ArgTableRow arg="remote-id" typ="alt { string: composite { type: enum (fqdn | user-fqdn | key-id)
, data: string
 }
, address: composite { type: enum (address)
, data: alt { ipv6: ip6Addr
, ip: ipAddr
 }
 }
, auto: enum (auto | ignore | dn)
 }"></ArgTableRow>
<ArgTableRow arg="match-by" typ="enum (remote-id | certificate)">响应方的身份查找方法</ArgTableRow>
<ArgTableRow arg="key" typ="enum ()">用于 raw RSA 认证的密钥（仅 ike1）</ArgTableRow>
<ArgTableRow arg="remote-key" typ="enum ()">用于 raw RSA 认证的远程密钥（仅 ike1）</ArgTableRow>
<ArgTableRow arg="secret" typ="string">预共享密钥</ArgTableRow>
<ArgTableRow arg="certificate" typ="multi { array-id, certificate: enum
 }">本地证书</ArgTableRow>
<ArgTableRow arg="remote-certificate" typ="enum (none) { none:-1 }">当对端未发送证书时使用此证书</ArgTableRow>
<ArgTableRow arg="username" typ="string">EAP 或 XAuth 用户</ArgTableRow>
<ArgTableRow arg="password" typ="string">EAP 或 XAuth 密码</ArgTableRow>
<ArgTableRow arg="generate-policy" typ="enum (no | port-override | port-strict)"></ArgTableRow>
<ArgTableRow arg="policy-template-group" typ="enum"></ArgTableRow>
</ArgTable>
