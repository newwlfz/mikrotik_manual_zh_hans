---
sidebar_key: "cli-reference/tool/mac-server/mac-winbox"
sidebar_position: 1
title: "mac-winbox"
sidebar_label: 'mac-winbox'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/mac-server/mac-winbox
captured_at: '2026-11-01T21:25:55+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/mac-server/mac-winbox {#toolmac-servermac-winbox}
**类型：** 设置目录

MAC WinBox 服务器设置：指定 WinBox 可以通过哪些接口使用 MAC 地址连接到路由器。MAC Telnet 在 [`/tool/mac-server`](./index.md) 中有自己的设置。有关示例，请参阅 [MAC 服务器](../../../management-tools/mac-server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="allowed-interface-list" typ="enum">路由器接受 MAC WinBox 连接的接口列表，其设置方式与 [`/tool/mac-server`](./index.md) 中的 MAC Telnet 相同：应把网桥加入列表，而不是它的端口。`none` 会关闭 MAC WinBox。默认配置设置为 `LAN`。默认值：all。</ArgTableRow>
</ArgTable>
