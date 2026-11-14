---
sidebar_key: "cli-reference/ip/dhcp-relay/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dhcp-relay/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dhcp-relay/monitor {#ipdhcp-relaymonitor}
**类型：** 命令

显示 DHCP 中继的计数器。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="requests" typ="num">中继转发给服务器的客户端请求数量。</ArgTableRow>
<ArgTableRow arg="responses" typ="num">中继递送给客户端的服务器回复数量。</ArgTableRow>
</ArgTable>
