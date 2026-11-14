---
sidebar_key: "cli-reference/ip/dhcp-server/matcher"
sidebar_position: 4
title: "matcher"
sidebar_label: "matcher"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/dhcp-server/matcher
captured_at: '2026-11-01T21:28:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/matcher {#ipdhcp-servermatcher}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="server" typ="enum (all)" mandatory="1">全局或单个服务器</ArgTableRow>
<ArgTableRow arg="address-pool" typ="enum (static-only)">用于此条目的地址池</ArgTableRow>
<ArgTableRow arg="option-set" typ="enum (none)"></ArgTableRow>
<ArgTableRow arg="code" typ="alt { number: num [1 .. 254]
, option: enum (vendor-specific) { vendor-specific:43 }
 }" mandatory="1"></ArgTableRow>
<ArgTableRow arg="value" typ="string" mandatory="1">要匹配的选项内容，为字符串或带 0x 前缀的十六进制</ArgTableRow>
<ArgTableRow arg="matching-type" typ="enum (exact | substring)" mandatory="1"></ArgTableRow>
</ArgTable>
