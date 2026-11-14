---
sidebar_key: "cli-reference/tool/mac-telnet"
sidebar_position: 13
title: "mac-telnet"
sidebar_label: 'mac-telnet'
source: https://manual.mikrotik.com/docs/cli-reference/tool/mac-telnet
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/mac-telnet {#toolmac-telnet}
**类型：** 命令

通过 MAC 地址，向同一二层网段上的设备打开一个 MAC Telnet 会话。客户端会提示输入用户名和密码。当设备无响应或拒绝连接时，该命令会直接返回到提示符，不显示任何错误信息。示例请参见 [MAC 服务器](../../management-tools/mac-server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="host" typ="enum ()">要连接的设备的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" unset="1">用于发出连接尝试的接口。若不指定，客户端会从每个接口发出连接尝试。</ArgTableRow>
</ArgTable>
