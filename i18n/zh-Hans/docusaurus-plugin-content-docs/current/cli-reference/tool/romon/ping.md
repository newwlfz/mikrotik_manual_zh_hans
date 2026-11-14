---
sidebar_key: "cli-reference/tool/romon/ping"
sidebar_position: 2
title: "ping"
sidebar_label: 'ping'
source: https://manual.mikrotik.com/docs/cli-reference/tool/romon/ping
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/romon/ping {#toolromonping}
**类型：** 命令

通过 [RoMON](../../../management-tools/romon.md) 覆盖网络，按路由器的 RoMON ID 对其执行 ping，无需任何 IP 连通性。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="id" typ="macAddr">要 ping 的路由器的 RoMON ID（MAC 地址）</ArgTableRow>
<ArgTableRow arg="size" typ="num">ping 数据包负载大小（默认值：**32**）</ArgTableRow>
<ArgTableRow arg="interval" typ="time">ping 间隔（默认值：**1s**）</ArgTableRow>
<ArgTableRow arg="count" typ="num">要发送的 ping 次数（默认值：**100**）</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="seq" typ="num">Ping 序列号</ArgTableRow>
<ArgTableRow arg="host" typ="macAddr">作出应答的路由器的 RoMON ID（MAC 地址）</ArgTableRow>
<ArgTableRow arg="time" typ="time">应答的往返时间</ArgTableRow>
<ArgTableRow arg="size" typ="num">应答大小</ArgTableRow>
<ArgTableRow arg="status" typ="string">失败原因（例如 `timeout`）；成功时为空</ArgTableRow>
<ArgTableRow arg="sent" typ="num">已发送的 ping 数量</ArgTableRow>
<ArgTableRow arg="received" typ="num">收到的回复数量</ArgTableRow>
<ArgTableRow arg="packet-loss" typ="num">丢失 ping 的百分比</ArgTableRow>
<ArgTableRow arg="min-rtt" typ="time">最小往返时间</ArgTableRow>
<ArgTableRow arg="avg-rtt" typ="time">平均往返时间</ArgTableRow>
<ArgTableRow arg="max-rtt" typ="time">最大往返时间</ArgTableRow>
</ArgTable>
