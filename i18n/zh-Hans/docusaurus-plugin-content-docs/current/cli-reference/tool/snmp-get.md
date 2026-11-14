---
sidebar_key: "cli-reference/tool/snmp-get"
sidebar_position: 21
title: "snmp-get"
sidebar_label: 'snmp-get'
source: https://manual.mikrotik.com/docs/cli-reference/tool/snmp-get
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/snmp-get {#toolsnmp-get}
**类型：** 命令

从 SNMP 代理检索一个 OID——例如测试路由器是否响应 SNMP 查询，如 [SNMP 指南](../../diagnostics-monitoring-and-troubleshooting/snmp.md) 中所述。使用 `/tool/snmp-walk` 一次检索整个子树。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="oid" typ="object { oid: string
 }">要读取的 OID，例如 `1.3.6.1.2.1.1.5.0`。</ArgTableRow>
<ArgTableRow arg="next" typ="bool">设置后，获取 MIB 树中紧随给定 OID 之后的 OID（执行 GETNEXT 而非 GET）。</ArgTableRow>
<ArgTableRow arg="address" typ="ipAddr">要查询的 SNMP 代理地址。</ArgTableRow>
<ArgTableRow arg="port" typ="num">代理的 UDP 端口。默认值：`161`。</ArgTableRow>
<ArgTableRow arg="tries" typ="num">放弃前的尝试次数。</ArgTableRow>
<ArgTableRow arg="try-timeout" typ="time">每次尝试的超时时间。</ArgTableRow>
<ArgTableRow arg="version" typ="enum (1 | 2c | 3)">SNMP 协议版本：`1`、`2c` 或 `3`。</ArgTableRow>
<ArgTableRow arg="community" typ="string">团体名。对于 v1/v2c，该名称就是密码；对于 v3，它是携带匹配安全级别的团体名。</ArgTableRow>
<ArgTableRow arg="security" typ="enum (none | authorized | private) { none:0, authorized:1, private:2 }">安全级别，与团体名匹配：`none`、`authorized` 或 `private`。</ArgTableRow>
<ArgTableRow arg="authentication-password" typ="string">SNMPv3 认证密码（至少 8 个字符）。</ArgTableRow>
<ArgTableRow arg="authentication-protocol" typ="enum (MD5 | SHA1 | SHA256 | SHA384 | SHA512)">SNMPv3 认证协议：`MD5`、`SHA1`、`SHA256`、`SHA384` 或 `SHA512`。</ArgTableRow>
<ArgTableRow arg="encryption-password" typ="string">SNMPv3 加密密码（至少 8 个字符）。</ArgTableRow>
<ArgTableRow arg="encryption-protocol" typ="enum (DES | AES)">SNMPv3 加密协议：`DES` 或 `AES`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="oid" typ="string">代理返回值的 OID。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (null | integer | counter | gauge | timeticks | unsigned-integer | octet-string | opaque | object-id | ip-address | counter-64bit | no-such-object | no-such-instance | end-of-mib-view)">代理返回的值类型。</ArgTableRow>
<ArgTableRow arg="value" typ="string">代理返回的值。</ArgTableRow>
</ArgTable>
