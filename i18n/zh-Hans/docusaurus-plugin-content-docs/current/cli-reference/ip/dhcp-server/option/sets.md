---
sidebar_key: "cli-reference/ip/dhcp-server/option/sets"
sidebar_position: 1
title: "sets"
sidebar_label: 'sets'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-server/option/sets
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-server/option/sets {#ipdhcp-serveroptionsets}
**类型：** 目录

DHCP 服务器选项组可通过 `dhcp-option-set` 一起分配给网络、服务器、租约或匹配器。详情请参阅 [DHCP 服务器](../../../../network-management/dhcp/server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">选项集的名称。</ArgTableRow>
<ArgTableRow arg="options" typ="multi { array-id, option: enum
 }" mandatory="1">集合中的选项（`/ip/dhcp-server/option`）。</ArgTableRow>
</ArgTable>
