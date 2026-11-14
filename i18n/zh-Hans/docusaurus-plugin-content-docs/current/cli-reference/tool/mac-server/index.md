---
sidebar_key: "cli-reference/tool/mac-server"
title: "mac-server"
sidebar_label: 'mac-server'
source: https://manual.mikrotik.com/docs/cli-reference/tool/mac-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/mac-server {#toolmac-server}
**类型：** 设置目录

MAC Telnet 服务器设置。MAC 服务器允许同一 layer-2 网段上的设备通过其 MAC 地址访问路由器，而无需 IP 配置：MAC Telnet（此菜单）、MAC WinBox（[`/tool/mac-server/mac-winbox`](./mac-winbox.md)）和 MAC ping（[`/tool/mac-server/ping`](./ping.md)）。已打开的 MAC Telnet 会话列在 [`/tool/mac-server/sessions`](./sessions.md) 中。IP 防火墙不会阻止 MAC 访问；请使用 `allowed-interface-list` 限制它。示例请参阅 [MAC 服务器](../../../management-tools/mac-server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="allowed-interface-list" typ="enum">路由器接受 MAC Telnet 连接的接口列表。列表中的网桥也允许通过其端口到达的连接；仅将网桥端口加入列表则不允许。`none`，或没有成员的列表，会关闭 MAC Telnet。更改会立即应用于下一个连接；已打开的会话保持不变。默认配置设置为 `LAN`。默认值：all。</ArgTableRow>
</ArgTable>
