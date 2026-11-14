---
sidebar_key: "cli-reference/tool/mac-server/ping"
sidebar_position: 2
title: "ping"
sidebar_label: 'ping'
source: https://manual.mikrotik.com/docs/cli-reference/tool/mac-server/ping
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/mac-server/ping {#toolmac-serverping}
**类型：**设置目录

MAC ping 服务器设置。启用服务器后，路由器会应答发送到其 MAC 地址的 ping（`/ping <MAC address>`）。有关示例，请参见 [MAC 服务器](../../../management-tools/mac-server.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">路由器是否应答 MAC ping。路由器自身的 MAC ping 也需要它：服务器禁用时，这些 ping 会失败并显示状态 `unknown interface`。ARP ping 不依赖此设置。默认值：是。</ArgTableRow>
</ArgTable>
