---
sidebar_key: "cli-reference/tool/sms/index"
sidebar_position: 2
title: "sms"
sidebar_label: "sms"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/sms
captured_at: '2026-11-01T21:30:20+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/sms {#toolsms}
**条件：** !smips
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="receive-enabled" typ="bool"></ArgTableRow>
<ArgTableRow arg="port" typ="alt { serial: enum
, interface: iface_enum { none }
 }"></ArgTableRow>
<ArgTableRow arg="channel" typ="num"></ArgTableRow>
<ArgTableRow arg="secret" typ="string"></ArgTableRow>
<ArgTableRow arg="allowed-number" typ="multi { array-id, number: string
 }"></ArgTableRow>
<ArgTableRow arg="sim-pin" typ="string"></ArgTableRow>
<ArgTableRow arg="sms-storage" typ="enum (modem | sim)">用于读取、写入、发送和接收操作的存储器（ETSI TS 127 005 中的 `<mem1>`、`<mem2>` 和 `<mem3>`），将用于后续 +CPMS 命令（仅在使用 AT 命令时设置生效）</ArgTableRow>
<ArgTableRow arg="polling" typ="bool">每 5s 轮询新 SMS。建议仅在接收新 SMS 出现问题时才启用轮询，否则不建议启用。</ArgTableRow>
<ArgTableRow arg="remove-sent-sms-after-send" typ="bool">在调制解调器自动存储已发送的 SMS 时有用</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (off | running)"></ArgTableRow>
<ArgTableRow arg="last-ussd" typ="string"></ArgTableRow>
</ArgTable>
