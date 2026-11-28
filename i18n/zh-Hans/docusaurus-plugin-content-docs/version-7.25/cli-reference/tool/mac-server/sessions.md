---
title: "sessions"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-server/sessions
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/mac-server/sessions 
**类型：** 目录

打开到该路由器的 MAC Telnet 会话。MAC WinBox 连接不会列出。示例请参阅 [MAC server](/docs/management-tools/mac-server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum">Interface the session arrived on.</ArgTableRow>
<ArgTableRow arg="src-address" typ="macAddr">MAC address of the client.</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">How long the session has been open.</ArgTableRow>
</ArgTable>
