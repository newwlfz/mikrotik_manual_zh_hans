---
title: "identity"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/identity
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/ipsec/installed-sa"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/ipsec/identity 
**类型：** 目录

身份是特定于远程对等体的配置参数。身份的主要用途是处理身份验证并验证对等体的完整性。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dynamic">Whether the item was created dynamically.</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">Whether an item is disabled.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="peer" typ="enum" mandatory="1">Peer name.</ArgTableRow>
<ArgTableRow arg="auth-method" typ="enum (pre-shared-key | digital-signature | eap | eap-radius | pre-shared-key-xauth | rsa-key | rsa-signature-hybrid)">
Authentication method:
- digital-signature - authenticate using a pair of RSA certificates;
- eap - IKEv2 EAP authentication for the initiator (peer with a netmask of /32). Must be used together with eap-methods;
- eap-radius - IKEv2 EAP RADIUS passthrough authentication for the responder (RFC 3579). A server certificate in this case is required. If a server certificate is not specified then only clients supporting EAP-only (RFC 5998) will be able to connect. Note that the EAP method should be compatible with EAP-only;
- pre-shared-key - authenticate by a password (pre-shared secret) string shared between the peers (not recommended since an offline attack on the pre-shared key is possible);
- rsa-key - authenticate using an RSA key imported in the keys menu. Only supported in IKEv1;
- pre-shared-key-xauth - authenticate by a password (pre-shared secret) string shared between the peers + XAuth username and password. Only supported in IKEv1;
- rsa-signature-hybrid - responder certificate authentication with initiator XAuth. Only supported in IKEv1.
</ArgTableRow>
<ArgTableRow arg="eap-methods" typ="multi { array-id, method: enum (eap-tls | eap-ttls | eap-peap | eap-mschapv2)
 }">
All EAP methods require a whole certificate chain including intermediate and root CA certificates to be present in System/Certificates menu. Also, the username and password (if required by the authentication server) must be specified. Multiple EAP methods can be specified and are used in the specified order. 

支持的 EAP 方法：
- eap-mschapv2；
- eap-peap - 也称为 PEAPv0/EAP-MSCHAPv2；
- eap-tls - 需要通过 certificate 参数指定额外的客户端证书；
- eap-ttls。
</ArgTableRow>
<ArgTableRow arg="mode-config" typ="enum (none)">来自 mode-config 菜单的配置参数名称。设置该参数后，mode-config 启用。</ArgTableRow>
<ArgTableRow arg="notrack-chain" typ="string">将匹配 IPsec 策略的 IP/Firewall/Raw 规则添加到指定链。与 generate-policy 一起使用。</ArgTableRow>
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
在发起方，该参数控制发送给响应方的 ID_i。在响应方，该参数控制发送给发起方的 ID_r。在 IKEv2 中，响应方还期望从发起方收到的 ID_r 中使用该 ID。
- auto - 尝试自动使用正确的 ID：预共享密钥使用 IP，基于证书的连接使用 SAN（如果不存在则使用 DN）；
- address - 使用 IP 地址作为 ID；
- dn - ASN.1 X.500 Distinguished Name 的二进制 Distinguished Encoding Rules（DER）编码；
- fqdn - 完全限定域名；
- key-id - 使用指定的 key ID 作为身份；
- user fqdn - 指定完全限定用户名字符串，例如“user@domain.com”。
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
该参数控制期望从远端对等体收到的 ID 值。请注意，除 ignore 之外的所有类型都会使用收到的证书验证远端对等体的 ID。如果对端将证书名称作为其 ID 发送，则会针对证书进行检查，否则会针对 Subject Alt. Name 检查 ID。
- auto - 接受所有 ID；
- address - 使用 IP 地址作为 ID；
- dn - ASN.1 X.500 Distinguished Name 的二进制 Distinguished Encoding Rules（DER）编码；
- fqdn - 完全限定域名。仅在 IKEv2 中支持；
- user fqdn - 完全限定用户名字符串，例如“user@domain.com”。仅在 IKEv2 中支持；
- key-id - 身份的特定 key ID。仅在 IKEv2 中支持；
- ignore - 不使用证书验证收到的 ID（危险）。

\* 不支持通配符 key ID 匹配，例如 `remote-id="key-id:CN=*.domain.com"`
</ArgTableRow>
<ArgTableRow arg="match-by" typ="enum (remote-id | certificate)">
定义用于对对等体身份进行验证的逻辑。
- remote-id - 根据 remote-id 设置验证对等体的 ID。
- certificate 根据 remote-certificate 设置中指定的内容验证对等体的证书。
</ArgTableRow>
<ArgTableRow arg="key" typ="enum ()">来自 keys 菜单的私钥名称。适用于使用 RSA key 认证方法（auth-method=rsa-key）的情况。</ArgTableRow>
<ArgTableRow arg="remote-key" typ="enum ()">来自 keys 菜单的公钥名称。适用于使用 RSA key 认证方法（auth-method=rsa-key）的情况。</ArgTableRow>
<ArgTableRow arg="secret" typ="string">密钥字符串。如果以 '0x' 开头，则按十六进制值解析。适用于使用预共享密钥认证方法（`auth-method=pre-shared-key` 或 `auth-method=pre-shared-key-xauth`）的情况。</ArgTableRow>
<ArgTableRow arg="certificate" typ="multi { array-id, certificate: enum
 }">本地证书。适用于使用数字签名认证方法（`auth-method=digital-signature`）或 EAP（`auth-method=eap`）的情况。</ArgTableRow>
<ArgTableRow arg="remote-certificate" typ="enum (none) { none:-1 }">用于认证远端（验证数据包；无需私钥）的证书。如果未指定 remote-certificate，则使用从远端对等体收到的证书，并根据 certificate 菜单中的 CA 进行检查。必须在证书存储中导入正确的 CA。如果指定了 remote-certificate 和 match-by=certificate，则仅匹配特定客户端证书。适用于使用数字签名认证方法（`auth-method=digital-signature`）的情况。</ArgTableRow>
<ArgTableRow arg="username" typ="string">EAP 或 XAuth 用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">EAP 或 XAuth 密码。</ArgTableRow>
<ArgTableRow arg="generate-policy" typ="enum (no | port-override | port-strict)">
允许该对等体为不存在的策略建立 SA。此类策略会在 SA 的生命周期内动态创建。例如，自动策略允许创建 IPsec 保护的 L2TP 隧道，或任何在配置时不知道远端对等体 IP 地址的设置。
- no - 不生成策略；
- port-override - 生成策略并强制策略使用任意端口（旧行为）；
- port-strict - 使用对等体提议中的端口，这些端口应与对等体策略匹配。
</ArgTableRow>
<ArgTableRow arg="policy-template-group" typ="enum">用于生成策略的策略模板组。如果没有任何模板匹配，则不会建立 Phase 2 SA。</ArgTableRow>
</ArgTable>
