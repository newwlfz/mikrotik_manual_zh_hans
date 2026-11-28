---
title: "config"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dhcp-server/config
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ip/dhcp-server/lease"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dhcp-server/config 
**类型：** 设置目录

所有 DHCP 服务器共享的设置：租约保存频率以及 RADIUS 计费。详情请参阅 [DHCP Server](/docs/network-management/dhcp/server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="store-leases-disk" typ="alt { symbolic-names: enum (immediately | never) { immediately:0, never:0xffffffff }
, time-interval: time
 }">How often leases are saved to disk: a time interval, `immediately`, or `never`. Saving less often reduces writes to the flash storage. Default: 5m.</ArgTableRow>
<ArgTableRow arg="accounting" typ="bool">Whether to send RADIUS accounting for the leases of servers that use RADIUS (`use-radius`). Default: yes.</ArgTableRow>
<ArgTableRow arg="interim-update" typ="time">Interval of RADIUS interim accounting updates. Default: 0s.</ArgTableRow>
<ArgTableRow arg="radius-password" typ="alt { user: enum (empty | same-as-user)
, password: string
 }">Password sent in RADIUS Access-Request messages: `empty`, `same-as-user` (the user name, which is the MAC address of the client), or a fixed password. Default: empty.</ArgTableRow>
</ArgTable>
