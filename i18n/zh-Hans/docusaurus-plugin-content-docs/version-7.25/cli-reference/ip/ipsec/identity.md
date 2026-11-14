---
sidebar_key: "cli-reference/ip/ipsec/identity"
sidebar_position: 2
title: "identity"
sidebar_label: 'identity'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/identity
captured_at: '2026-11-01T21:24:07+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/identity {#ipipsecidentity}
**类型：** 目录

身份是特定于远程对等体的配置参数。身份的主要目的是处理认证并验证对等体的完整性。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">该项是否为动态创建。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">该项是否已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="peer" typ="enum" mandatory="1">对端名称。</ArgTableRow>
<ArgTableRow arg="auth-method" typ="enum (pre-shared-key | digital-signature | eap | eap-radius | pre-shared-key-xauth | rsa-key | rsa-signature-hybrid)">
身份验证方法：
- digital-signature - 使用一对 RSA 证书进行身份验证；
- eap - 用于发起方（netmask 为 /32 的对端）的 IKEv2 EAP 身份验证。必须与 eap-methods 一起使用；
- eap-radius - 用于响应方的 IKEv2 EAP RADIUS 透传身份验证（RFC 3579）。这种情况下需要服务器证书。如果未指定服务器证书，则只有支持 EAP-only（RFC 5998）的客户端才能连接。请注意，EAP 方法应与 EAP-only 兼容；
- pre-shared-key - 使用对端之间共享的密码（预共享密钥）字符串进行身份验证（不建议使用，因为可能对预共享密钥进行离线攻击）；
- rsa-key - 使用在 keys 菜单中导入的 RSA 密钥进行身份验证。仅在 IKEv1 中支持；
- pre-shared-key-xauth - 使用对端之间共享的密码（预共享密钥）字符串 + XAuth 用户名和密码进行身份验证。仅在 IKEv1 中支持；
- rsa-signature-hybrid - 使用响应方证书身份验证和发起方 XAuth。仅在 IKEv1 中支持。
</ArgTableRow>
<ArgTableRow arg="eap-methods" typ="multi { array-id, method: enum (eap-tls | eap-ttls | eap-peap | eap-mschapv2)
 }">
所有 EAP 方法都要求 System/Certificates 菜单中存在完整的证书链，包括中间 CA 和根 CA 证书。此外，必须指定用户名和密码（如果身份验证服务器要求）。可以指定多个 EAP 方法，并按照指定的顺序使用。 

支持的 EAP 方法：
- eap-mschapv2;
- eap-peap - 也称为 PEAPv0/EAP-MSCHAPv2；
- eap-tls - 需要在 certificate 参数下指定额外的客户端证书；
- eap-ttls.
</ArgTableRow>
<ArgTableRow arg="mode-config" typ="enum (none)">来自 mode-config 菜单的配置参数名称。设置该参数后，mode-config 即启用。</ArgTableRow>
<ArgTableRow arg="notrack-chain" typ="string">将与 IPsec 策略匹配的 IP/Firewall/Raw 规则添加到指定链。与 generate-policy 一起使用。</ArgTableRow>
<ArgTableRow arg="my-id" typ="alt { string: composite { type: enum (fqdn | user-fqdn | key-id)
, data: string
 }
, address: composite { type: enum (address)
, data: alt { ipv6: ip6Addr
, ip: ipAddr
 }
 }
, other: enum (auto | dn)
 }">
在发起方上，这控制发送给响应方的 ID_i 内容。在响应方上，这控制发送给发起方的 ID_r 内容。在 IKEv2 中，响应方还期望从发起方收到的 ID_r 中包含此 ID。
- auto - 自动尝试使用正确的 ID：预共享密钥使用 IP，基于证书的连接使用 SAN（如果不存在则使用 DN）；
- address - 使用 IP 地址作为 ID；
- dn - ASN.1 X.500 Distinguished Name 的二进制 Distinguished Encoding Rules (DER) 编码；
- fqdn - 完全限定域名；
- key-id - 为身份使用指定的密钥 ID；
- user fqdn - 指定完全限定的用户名字符串，例如 "user@domain.com"。
</ArgTableRow>
<ArgTableRow arg="remote-id" typ="alt { string: composite { type: enum (fqdn | user-fqdn | key-id)
, data: string
 }
, address: composite { type: enum (address)
, data: alt { ipv6: ip6Addr
, ip: ipAddr
 }
 }
, auto: enum (auto | ignore | dn)
 }">
此参数控制期望从远程对端收到的 ID 值。请注意，除 ignore 外的所有类型都会使用收到的证书验证远程对端的 ID。如果对端发送证书名称作为其 ID，则会对照证书进行检查；否则，ID 会对照 Subject Alt. Name 进行检查。
- auto - 接受所有 ID；
- address - 使用 IP 地址作为 ID；
- dn - ASN.1 X.500 Distinguished Name 的二进制 Distinguished Encoding Rules (DER) 编码；
- fqdn - 完全限定域名。仅在 IKEv2 中支持；
- user fqdn - 完全限定的用户名字符串，例如 "user@domain.com"。仅在 IKEv2 中支持；
- key-id - 用于该身份的特定密钥 ID。仅在 IKEv2 中支持；
- ignore - 不使用证书验证收到的 ID（危险）。

\* 不支持通配符密钥 ID 匹配，例如 `remote-id="key-id:CN=*.domain.com"`
</ArgTableRow>
<ArgTableRow arg="match-by" typ="enum (remote-id | certificate)">
定义用于对端身份验证的逻辑。
- remote-id - 根据 remote-id 设置验证对端的 ID。
- certificate 会使用 remote-certificate 设置中指定的内容验证对端的证书。
</ArgTableRow>
<ArgTableRow arg="key" typ="enum ()">来自 keys 菜单的私钥名称。如果使用 RSA 密钥身份验证方法（auth-method=rsa-key），则适用。</ArgTableRow>
<ArgTableRow arg="remote-key" typ="enum ()">来自 keys 菜单的公钥名称。如果使用 RSA 密钥身份验证方法（auth-method=rsa-key），则适用。</ArgTableRow>
<ArgTableRow arg="secret" typ="string">密钥字符串。如果以 '0x' 开头，则会将其解析为十六进制值。如果使用预共享密钥身份验证方法（`auth-method=pre-shared-key` 或 `auth-method=pre-shared-key-xauth`），则适用。</ArgTableRow>
<ArgTableRow arg="certificate" typ="multi { array-id, certificate: enum
 }">本地证书。如果使用数字签名身份验证方法（`auth-method=digital-signature`）或 EAP（`auth-method=eap`），则适用。</ArgTableRow>
<ArgTableRow arg="remote-certificate" typ="enum (none) { none:-1 }">用于验证远程端的证书（验证数据包；不需要私钥）。如果未指定 remote-certificate，则使用从远程对端收到的证书，并在 certificate 菜单中对照 CA 进行检查。必须在证书存储中导入正确的 CA。如果指定了 remote-certificate 和 match-by=certificate，则只会匹配特定的客户端证书。如果使用数字签名身份验证方法（`auth-method=digital-signature`），则适用。</ArgTableRow>
<ArgTableRow arg="username" typ="string">EAP 或 XAuth 用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">EAP 或 XAuth 密码。</ArgTableRow>
<ArgTableRow arg="generate-policy" typ="enum (no | port-override | port-strict)">
允许此对端为不存在的策略建立 SA。此类策略会在 SA 的生命周期内动态创建。自动策略允许例如创建受 IPsec 保护的 L2TP 隧道，或任何其他在配置时远程对端 IP 地址未知的设置。
- no - 不生成策略；
- port-override - 生成策略并强制策略使用任意端口（旧行为）；
- port-strict - 使用对端提议中的端口，这些端口应与对端的策略匹配。
</ArgTableRow>
<ArgTableRow arg="policy-template-group" typ="enum">用于生成的策略的策略模板组。如果没有任何模板匹配，则不会建立 Phase 2 SA。</ArgTableRow>
</ArgTable>
