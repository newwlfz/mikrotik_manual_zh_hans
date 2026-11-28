---
title: "mac-server"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/mac-server 
**类型：** 设置目录

MAC Telnet 服务器设置。MAC 服务器使同一二层网段中的设备无需 IP 配置即可通过路由器的 MAC 地址访问路由器：MAC Telnet（此菜单）、MAC WinBox（[`/tool/mac-server/mac-winbox`](/docs/cli-reference/tool/mac-server/mac-winbox)）和 MAC ping（[`/tool/mac-server/ping`](/docs/cli-reference/tool/ping)）。打开的 MAC Telnet 会话列在 [`/tool/mac-server/sessions`](/docs/cli-reference/tool/mac-server/sessions) 中。IP 防火墙不会阻止 MAC 访问；请使用 `allowed-interface-list` 对其进行限制。示例请参阅 [MAC server](/docs/management-tools/mac-server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="allowed-interface-list" typ="enum">Interface list on which the router accepts MAC Telnet connections. A bridge in the list also allows connections that arrive through its ports; a bridge port alone in the list does not. `none`, or a list without members, turns MAC Telnet off. A change applies to the next connection at once; open sessions stay. The default configuration sets `LAN`. Default: all.</ArgTableRow>
</ArgTable>
