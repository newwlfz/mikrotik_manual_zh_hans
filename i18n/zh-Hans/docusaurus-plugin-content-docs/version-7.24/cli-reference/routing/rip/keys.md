---
sidebar_key: "cli-reference/routing/rip/keys"
sidebar_position: 4
title: "keys"
sidebar_label: "keys"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/rip/keys
captured_at: '2026-11-01T21:29:38+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/rip/keys {#routingripkeys}
**类型：** 目录

MD5 认证密钥链。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="chain" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="key-id" typ="num" mandatory="1">密钥标识符。此编号会包含在 MD5 认证的 RIP 消息中，并决定使用哪个密钥来检查特定消息的认证。</ArgTableRow>
<ArgTableRow arg="key" typ="string" mandatory="1">认证密钥。最大长度 16 个字符</ArgTableRow>
<ArgTableRow arg="valid-from" typ="date">密钥从该日期和时间起有效。</ArgTableRow>
<ArgTableRow arg="valid-till" typ="date">密钥有效期至该日期和时间。</ArgTableRow>
</ArgTable>
