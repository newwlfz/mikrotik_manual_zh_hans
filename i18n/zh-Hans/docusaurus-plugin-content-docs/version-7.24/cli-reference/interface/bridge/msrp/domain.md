---
sidebar_key: "cli-reference/interface/bridge/msrp/domain"
sidebar_position: 2
title: "domain"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/bridge/msrp/domain
captured_at: '2026-11-02T09:09:02+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/bridge/msrp/domain {#interfacebridgemsrpdomain}
**条件：** MSRP_ENABLE
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="bridge" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="id" typ="num" mandatory="1"></ArgTableRow>
<ArgTableRow arg="priority" typ="num"></ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num"></ArgTableRow>
</ArgTable>
