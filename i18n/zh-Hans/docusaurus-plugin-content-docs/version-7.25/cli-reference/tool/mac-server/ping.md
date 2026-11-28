---
title: "ping"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-server/ping
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/mac-server/ping 
**类型：** 设置目录

MAC ping server 设置。启用 server 后，路由器会响应发送到其 MAC 地址的 ping（`/ping <MAC address>`）。示例请参阅 [MAC server](/docs/management-tools/mac-server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Whether the router answers MAC pings. It is also needed for the router's own MAC pings: with the server disabled, they fail with the status `unknown interface`. ARP ping does not depend on this setting. Default: yes.</ArgTableRow>
</ArgTable>
