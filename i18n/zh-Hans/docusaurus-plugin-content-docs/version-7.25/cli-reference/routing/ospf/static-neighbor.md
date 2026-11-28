---
title: "static-neighbor"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/ospf/static-neighbor
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/routing/pimsm"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/ospf/static-neighbor 
**类型：** 目录

OSPF 邻居的静态配置。非广播多路访问网络必需。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">inactive</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="area" typ="enum" mandatory="1">Name of the area the neighbor belongs to.</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46i)" mandatory="1">The unicast IP address and an interface that can be used to reach the IP of the neighbor. For example, `address=1.2.3.4%ether1` indicates that a neighbor with IP `1.2.3.4` is reachable on the `ether1` interface.</ArgTableRow>
<ArgTableRow arg="instance-id" typ="num"></ArgTableRow>
<ArgTableRow arg="poll-interval" typ="time">How often to send hello messages to the neighbors that are in a `down` state (i.e., there is no traffic from them).</ArgTableRow>
</ArgTable>
