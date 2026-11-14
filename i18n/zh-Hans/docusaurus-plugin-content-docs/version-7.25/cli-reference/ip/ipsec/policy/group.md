---
sidebar_key: "cli-reference/ip/ipsec/policy/group"
sidebar_position: 1
title: "group"
sidebar_label: 'group'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/policy/group
captured_at: '2026-11-01T21:24:12+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/policy/group {#ipipsecpolicygroup}
**类型：** 目录

此菜单允许你创建策略模板所使用的额外策略组。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default">该项是否为默认项。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">组名称。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">此组中的策略所适用的接口。</ArgTableRow>
</ArgTable>
