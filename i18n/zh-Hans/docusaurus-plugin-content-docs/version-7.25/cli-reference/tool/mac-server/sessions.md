---
sidebar_key: "cli-reference/tool/mac-server/sessions"
sidebar_position: 3
title: "sessions"
sidebar_label: 'sessions'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-server/sessions
captured_at: '2026-11-01T21:25:56+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/mac-server/sessions {#toolmac-serversessions}
**类型：** 目录

打开到该路由器的 MAC Telnet 会话。MAC WinBox 连接不会列出。有关示例，请参阅 [MAC 服务器](../../../management-tools/mac-server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">会话到达的接口。</ArgTableRow>
<ArgTableRow arg="src-address" typ="macAddr">客户端的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">会话已打开的时长。</ArgTableRow>
</ArgTable>
