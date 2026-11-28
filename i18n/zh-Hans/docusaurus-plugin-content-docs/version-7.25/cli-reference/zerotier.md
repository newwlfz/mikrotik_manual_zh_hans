---
title: "zerotier"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/zerotier
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## zerotier
**包：** zerotier
**类型：** 目录

[ZeroTier](/docs/virtual-private-networks/zerotier) 网络虚拟机管理程序是一个自包含的网络虚拟化引擎，用于实现以太网虚拟化层。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether an item is disabled.</ArgTableRow>
<ArgTableRow arg="R" typ="online">Whether the instance is online.</ArgTableRow>
<ArgTableRow arg="F" typ="tcp-fallback">Whether TCP fallback is active.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Instance name.</ArgTableRow>
<ArgTableRow arg="disabled" typ="bool">Whether an item is disabled.</ArgTableRow>
<ArgTableRow arg="port" typ="num">Port number the instance listens to.</ArgTableRow>
<ArgTableRow arg="identity" typ="string">Instance 40-bit unique address.</ArgTableRow>
<ArgTableRow arg="interfaces" typ="multi { array-id, interface: iface_enum
 }">List of interfaces used to discover ZeroTier peers with ARP and IP type connections.</ArgTableRow>
<ArgTableRow arg="route-distance" typ="num">Route distance for routes obtained from planet/moon servers.</ArgTableRow>
<ArgTableRow arg="backup-priorities" typ="multi { array-id, array-id, backup-priority: composite { interface: iface_enum
, priority: num
 }
 }">Backup interface priorities for failover.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="identity.public" typ="string">Public identity of the instance.</ArgTableRow>
<ArgTableRow arg="state" typ="string">Current state of the instance.</ArgTableRow>
<ArgTableRow arg="moons" typ="multi { array-id, moon: string
 }">List of moons the instance is connected to.</ArgTableRow>
</ArgTable>
