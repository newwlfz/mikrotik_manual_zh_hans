---
title: "scan"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/pppoe-client/scan
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/interface/pppoe-server"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/pppoe-client/scan 
**类型：** 命令

PPPoE Scanner 可扫描第 2 层广播域中所有活动的 PPPoE 服务器。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum">Interface to scan for PPPoE servers on.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="service" typ="string">Service name configured on the server.</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">MAC address of the detected server.</ArgTableRow>
<ArgTableRow arg="ac-name" typ="string">Name of the Access Concentrator.</ArgTableRow>
</ArgTable>
