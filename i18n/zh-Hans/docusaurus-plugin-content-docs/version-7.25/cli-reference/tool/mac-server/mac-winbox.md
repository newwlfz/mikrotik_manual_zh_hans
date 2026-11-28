---
title: "mac-winbox"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-server/mac-winbox
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/tool/mac-server"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/mac-server/mac-winbox 
**类型：** 设置目录

MAC WinBox server 设置：指定 WinBox 可以通过路由器的 MAC 地址连接到哪些接口。MAC Telnet 在 [`/tool/mac-server`](/docs/cli-reference/tool/mac-server) 中有单独设置。示例请参阅 [MAC server](/docs/management-tools/mac-server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="allowed-interface-list" typ="enum">Interface list on which the router accepts MAC WinBox connections, set the same way as for MAC Telnet in [`/tool/mac-server`](/docs/cli-reference/tool/mac-server): put the bridge in the list, not its ports. `none` turns MAC WinBox off. The default configuration sets `LAN`. Default: all.</ArgTableRow>
</ArgTable>
