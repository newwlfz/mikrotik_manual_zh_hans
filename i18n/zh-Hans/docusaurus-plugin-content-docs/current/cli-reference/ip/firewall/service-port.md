---
sidebar_key: "cli-reference/ip/firewall/service-port"
sidebar_position: 9
title: "service-port"
sidebar_label: 'service-port'
source: https://manual.mikrotik.com/docs/cli-reference/ip/firewall/service-port
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/firewall/service-port {#ipfirewallservice-port}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ports" typ="multi { port: num [0 .. 65535]
 }">服务使用的端口号。</ArgTableRow>
<ArgTableRow arg="sip-direct-media" typ="bool">是否启用 SIP 直连媒体。</ArgTableRow>
<ArgTableRow arg="sip-timeout" typ="time">SIP 超时值。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">服务名称。</ArgTableRow>
</ArgTable>
