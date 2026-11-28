---
title: "flow"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/openflow/flow
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/openflow"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## openflow/flow 
**包：** openflow
**类型：** 目录

此菜单列出已安装的流，这些流负责 OpenFlow 端口之间的数据包转发。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="switch" typ="enum">Controller name that installed the rule.</ArgTableRow>
<ArgTableRow arg="version" typ="num">OpenFlow protocol version of the switch that installed the flow.</ArgTableRow>
<ArgTableRow arg="match" typ="string">Match fields the flow entry matches against.</ArgTableRow>
<ArgTableRow arg="actions" typ="string">Actions applied to packets that match the flow entry.</ArgTableRow>
<ArgTableRow arg="info" typ="string">Additional flow entry information, such as priority, timeouts, and cookie.</ArgTableRow>
<ArgTableRow arg="table-id" typ="num">ID of the table where the rule is located.</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">Number of bytes matched by the rule.</ArgTableRow>
<ArgTableRow arg="packets" typ="num">Number of packets matched by the rule.</ArgTableRow>
<ArgTableRow arg="duration" typ="time">Time since the flow entry was installed.</ArgTableRow>
</ArgTable>
