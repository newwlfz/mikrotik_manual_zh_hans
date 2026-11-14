---
sidebar_key: "cli-reference/routing/gmp"
sidebar_position: 6
title: "gmp"
sidebar_label: 'gmp'
source: https://manual.mikrotik.com/docs/cli-reference/routing/gmp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/gmp {#routinggmp}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interfaces" typ="object { interface: iface_enum
 }">接口名称，支持多个接口和接口列表。</ArgTableRow>
<ArgTableRow arg="groups" typ="object { group: address (flags=46)
 }">接口要使用的多播组地址，支持多个组地址。</ArgTableRow>
<ArgTableRow arg="exclude" typ="switch">当设置了 `exclude` 时，接口期望拒绝来自已配置 `sources` 的多播数据。未使用此选项时，接口将为已配置的 `sources` 发出源特定加入。</ArgTableRow>
<ArgTableRow arg="sources" typ="object { source: address (flags=46)
 }" unset="1">接口使用的源地址列表，支持多个源地址。当 IGMPv3 或 MLDv2 协议处于活动状态时，此设置会生效。</ArgTableRow>
</ArgTable>
