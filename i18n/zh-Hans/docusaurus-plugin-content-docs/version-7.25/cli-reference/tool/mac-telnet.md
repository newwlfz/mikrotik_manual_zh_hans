---
title: "mac-telnet"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-telnet
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/mac-telnet 
**类型：** 命令

通过 MAC 地址打开与同一二层网段内设备的 MAC Telnet 会话。客户端会要求输入用户名和密码。当设备未响应或拒绝连接时，命令将返回提示符，且不显示错误消息。示例请参阅 [MAC server](/docs/management-tools/mac-server)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="host" typ="enum ()">MAC address of the device to connect to.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" unset="1">Interface to send the connection attempts out of. Without it, the client sends them out of every interface.</ArgTableRow>
</ArgTable>
