---
sidebar_key: "cli-reference/ip/traffic-flow/target"
sidebar_position: 3
title: "target"
sidebar_label: 'target'
source: https://manual.mikrotik.com/docs/cli-reference/ip/traffic-flow/target
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/traffic-flow/target {#iptraffic-flowtarget}
**类型：** 目录
导出目标：通过 UDP 接收 traffic-flow 数据的收集器主机（例如 NetFlow 分析器主机）。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }">导出数据包的源地址。0.0.0.0 表示自动检测：路由器使用出接口的源地址</ArgTableRow>
<ArgTableRow arg="dst-address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }" mandatory="1">接收流数据的主机的 IP 地址</ArgTableRow>
<ArgTableRow arg="port" typ="num">发送流数据的目标 UDP 端口。默认值：2055</ArgTableRow>
<ArgTableRow arg="version" typ="enum (1 | 5 | 9 | ipfix) { 1:1, 5:5, 9:9, ipfix:10 }">导出数据包的 NetFlow 格式：`1`、`5`、`9` 或 `ipfix`</ArgTableRow>
<ArgTableRow arg="v9-template-refresh" typ="num">重新发送 FlowSet 模板之前所经过的导出数据包数量（仅适用于 version 9 和 IPFIX）。默认值：20</ArgTableRow>
<ArgTableRow arg="v9-template-timeout" typ="time">如果到此时仍未发送 FlowSet 模板，则在该间隔后发送（仅适用于 version 9 和 IPFIX）</ArgTableRow>
</ArgTable>
