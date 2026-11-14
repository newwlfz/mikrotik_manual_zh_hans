---
sidebar_key: "cli-reference/ipv6/dhcp-server/option/sets"
sidebar_position: 1
title: "sets"
sidebar_label: 'sets'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/dhcp-server/option/sets
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-server/option/sets {#ipv6dhcp-serveroptionsets}
**类型：** 目录

可一起分配的 DHCPv6 服务器选项组。详情请参阅 [DHCPv6 服务器](../../../../network-management/dhcp/dhcpv6-server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">选项集的名称。</ArgTableRow>
<ArgTableRow arg="options" typ="multi { array-id, option: enum
 }" mandatory="1">集合中的选项（`/ipv6/dhcp-server/option`）。</ArgTableRow>
</ArgTable>
