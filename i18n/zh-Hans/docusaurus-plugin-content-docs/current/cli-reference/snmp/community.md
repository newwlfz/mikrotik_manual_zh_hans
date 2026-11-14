---
sidebar_key: "cli-reference/snmp/community"
sidebar_position: 1
title: "community"
sidebar_label: 'community'
source: https://manual.mikrotik.com/docs/cli-reference/snmp/community
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## snmp/community {#snmpcommunity}
**类型：** 目录

`/snmp/community` 菜单用于定义 SNMP 团体：每个团体可以读取或写入什么内容、可以从哪些地址访问，以及在何种安全级别下访问。团体名称在 SNMPv1 和 v2c 中用作密码，在 SNMPv3 中用作安全名称。与任何团体都不匹配的请求（名称错误或源地址错误）完全不会收到回复。有关代理设置，请参阅 [`/snmp`](./index.md) 参考文档；有关示例，请参阅 [SNMP 指南](../../diagnostics-monitoring-and-troubleshooting/snmp.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">默认 community。路由器在创建时自带一个 community `public`，可从任意地址读取，直到你更改或删除它。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">已禁用的 community。已禁用的 community 不应答请求；新建的 community 为启用状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">community 的名称。对于 SNMPv1 和 v2c，它随每个数据包以明文传输，起到密码的作用；对于 SNMPv3，它是安全名。默认值：`public`。</ArgTableRow>
<ArgTableRow arg="addresses" typ="object { address: alt { ipv6: ip6Prefix
, ip: ipPrefix
 }
 }">允许使用此 community 的源地址或前缀。来自其他任何地址的请求都得不到应答。默认值：`::/0`（任意地址）。</ArgTableRow>
<ArgTableRow arg="security" typ="enum (none | authorized | private) { none:0, authorized:1, private:2 }">
此 community 要求的安全级别。
- `none`（默认）- 不进行身份验证也不加密（noAuthNoPriv）；仅凭 community 名称即可获得访问权限。
- `authorized` - 要求 SNMPv3 身份验证（authNoPriv）；v1 和 v2c 请求不会得到应答。
- `private` - 要求 SNMPv3 身份验证和加密（authPriv）；v1 和 v2c 请求不会得到应答。
</ArgTableRow>
<ArgTableRow arg="read-access" typ="bool">请求是否可以读取 MIB 值。默认值：yes。</ArgTableRow>
<ArgTableRow arg="write-access" typ="bool">请求是否可以更改路由器：设置系统标识、运行脚本和重启。具有写权限的 community 是很强的凭据，因此请让其名称难以猜测，并让 `addresses` 保持较窄的范围。默认值：no。</ArgTableRow>
<ArgTableRow arg="denied-oids" typ="multi { array-id, oid: string
 }">此 community 无法读取的 OID 或子树。对列入黑名单的 OID 直接执行 GET 会返回 no-such-object，walk 会跳过被阻止的子树，因此监控工具的轮询不会失败。多个 OID 可以逗号分隔列表的形式给出。该设置按 community 分别生效。默认值：empty（agent 实现的所有内容均可读）。</ArgTableRow>
<ArgTableRow arg="authentication-protocol" typ="enum (MD5 | SHA1 | SHA256 | SHA384 | SHA512) { MD5:0, SHA1:1, SHA256:2, SHA384:3, SHA512:4 }">
当 `security=authorized` 或 `private` 时，SNMPv3 使用的认证协议；community 的所有客户端都必须使用该协议。
- `MD5`（默认值）
- `SHA1`
- `SHA256`
- `SHA384`
- `SHA512`
</ArgTableRow>
<ArgTableRow arg="encryption-protocol" typ="enum (DES | AES)">
当 `security=private` 时，SNMPv3 使用的加密协议。
- `DES`（默认值）
- `AES` - AES-128，定义于 RFC 3826。
</ArgTableRow>
<ArgTableRow arg="authentication-password" typ="string">SNMPv3 认证密码，至少 8 个字符。属于敏感信息；请参阅[包含敏感参数的菜单列表](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)。</ArgTableRow>
<ArgTableRow arg="encryption-password" typ="string">SNMPv3 加密密码，至少 8 个字符。属于敏感信息；请参阅[包含敏感参数的菜单列表](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)。</ArgTableRow>
</ArgTable>
