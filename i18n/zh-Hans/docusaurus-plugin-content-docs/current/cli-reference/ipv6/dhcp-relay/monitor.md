---
sidebar_key: "cli-reference/ipv6/dhcp-relay/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/dhcp-relay/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/dhcp-relay/monitor {#ipv6dhcp-relaymonitor}
**类型：** 命令

显示 DHCPv6 中继的计数器。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="requests" typ="num">中继转发到服务器的客户端消息数量。</ArgTableRow>
<ArgTableRow arg="responses" typ="num">中继投递给客户端的服务器回复数量。</ArgTableRow>
</ArgTable>
