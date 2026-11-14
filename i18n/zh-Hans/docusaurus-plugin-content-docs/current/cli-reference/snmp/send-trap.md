---
sidebar_key: "cli-reference/snmp/send-trap"
sidebar_position: 2
title: "send-trap"
sidebar_label: 'send-trap'
source: https://manual.mikrotik.com/docs/cli-reference/snmp/send-trap
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## snmp/send-trap {#snmpsend-trap}
**类型：** 命令

`send-trap` 命令会立即向已配置的 trap 目标发送一个 SNMP trap，这对于测试 trap 是否能到达采集器非常有用。该 trap 使用 SNMP 服务的 `trap-target`、`trap-community` 和 `trap-version` 设置（当 `trap-version=1` 时，它是经典的 v1 企业 trap；否则，它会在 MikroTik trap OID `1.3.6.1.4.1.14988.1.1.9.0.1` 下携带 OID 和值）。有关 trap 配置，请参阅 [SNMP 指南](../../diagnostics-monitoring-and-troubleshooting/snmp.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="oid" typ="string">trap 所报告对象的 OID。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (integer | string | nullobj | obj-id | ip-address | counter32 | timeticks | unsigned) { integer:0x02, string:0x04, nullobj:0x05, obj-id:0x06, ip-address:0x40, counter32:0x41, timeticks:0x43, unsigned:0x47 }">
值的 SNMP 类型。可接受的取值：
- `integer` - 有符号整数。
- `string` - 八位字节串。
- `nullobj` - 一个 NULL 值。
- `obj-id` - 对象标识符。
- `ip-address` - 一个 IP 地址。
- `counter32` - 一个 32 位计数器。
- `timeticks` - 以百分之一秒为单位的时间。
- `unsigned` - 无符号整数。
</ArgTableRow>
<ArgTableRow arg="value" typ="string">要发送的值，采用所选 `type` 所要求的格式。</ArgTableRow>
</ArgTable>
