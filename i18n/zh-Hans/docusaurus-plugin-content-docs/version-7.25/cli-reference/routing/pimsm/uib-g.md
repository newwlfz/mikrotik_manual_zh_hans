---
title: "uib-g"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/pimsm/uib-g
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/pimsm/uib-g 
**条件：** !smips
**类型：** 目录

上游信息库菜单显示任意源组播（\*,G）和指定源组播（S,G）组及其状态。这些菜单仅包含只读条目。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="R" typ="rp-local">The router itself is the Rendezvous Point (RP) for this group.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="instance" typ="enum">Name of the PIM instance the multicast group is created on.</ArgTableRow>
<ArgTableRow arg="group" typ="address (flags=46i)">The multicast group address.</ArgTableRow>
<ArgTableRow arg="rp" typ="address (flags=46i)">The address of the Rendezvous Point for this group.</ArgTableRow>
<ArgTableRow arg="rpf" typ="address (flags=46i)">The Reverse Path Forwarding (RPF) indicates the router address and outgoing interface that a Join message for that group is directed to.</ArgTableRow>
</ArgTable>
