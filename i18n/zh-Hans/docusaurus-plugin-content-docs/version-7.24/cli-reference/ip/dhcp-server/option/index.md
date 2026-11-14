---
sidebar_key: "cli-reference/ip/dhcp-server/option/index"
sidebar_position: 1
title: "option"
sidebar_label: "option"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/dhcp-server/option
captured_at: '2026-11-01T21:28:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/option {#ipdhcp-serveroption}
**类型：** 目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (vendor-specific) { vendor-specific:43 }
 }" mandatory="1"></ArgTableRow>
<ArgTableRow arg="value" typ="string">0x - 精确的十六进制值，'' - 字符串或 IP 地址值</ArgTableRow>
<ArgTableRow arg="force" typ="bool">始终在回复中包含此选项</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="raw-value" typ="string"></ArgTableRow>
</ArgTable>
