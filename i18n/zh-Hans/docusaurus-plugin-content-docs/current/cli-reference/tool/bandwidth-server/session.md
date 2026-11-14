---
sidebar_key: "cli-reference/tool/bandwidth-server/session"
sidebar_position: 1
title: "session"
sidebar_label: 'session'
source: https://manual.mikrotik.com/docs/cli-reference/tool/bandwidth-server/session
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/bandwidth-server/session {#toolbandwidth-serversession}
**类型：** 目录

此路由器带宽测试服务器（[`/tool/bandwidth-server`](./index.md)）上正在运行的测试，从服务器的角度来看：`send` 表示服务器发送。测试结束后，会话就会消失。参见[带宽测试](../../../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="client" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }">客户端地址。IPv4 客户端显示为 IPv4 映射的 IPv6 地址，例如 `::ffff:192.0.2.1`。</ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (udp | tcp) { udp:0, tcp:1 }">测试使用的协议，`udp` 或 `tcp`。</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (receive | send | both) { receive:0x00000100, send:0x00000200, both:0x00000300 }">
从服务器的角度来看，哪一侧发送：
- `receive` - 客户端发送，服务器接收（客户端的 `transmit`）。
- `send` - 服务器发送（客户端的 `receive`）。
- `both` - 双方都发送。
</ArgTableRow>
<ArgTableRow arg="user" typ="string">客户端登录时使用的用户；当服务器设置了 `authenticate=no` 且客户端未提供用户时为空。</ArgTableRow>
<ArgTableRow arg="random-data" typ="bool">测试是否使用随机数据。</ArgTableRow>
<ArgTableRow arg="tx-current" typ="num">服务器在上一秒内的发送速率。</ArgTableRow>
<ArgTableRow arg="tx-10-second-average" typ="num">服务器在过去 10 秒内的平均发送速率。</ArgTableRow>
<ArgTableRow arg="tx-total-average" typ="num">自测试开始以来服务器的平均发送速率。</ArgTableRow>
<ArgTableRow arg="rx-current" typ="num">服务器在上一秒内的接收速率。</ArgTableRow>
<ArgTableRow arg="rx-10-second-average" typ="num">服务器在过去 10 秒内的平均接收速率。</ArgTableRow>
<ArgTableRow arg="rx-total-average" typ="num">自测试开始以来服务器的平均接收速率。</ArgTableRow>
<ArgTableRow arg="lost-packets" typ="num">服务器在上一秒内发现丢失的 UDP 数据包。</ArgTableRow>
<ArgTableRow arg="tx-size" typ="range">服务器发送的 UDP 数据包大小，以整个 IP 数据包的字节数表示。</ArgTableRow>
<ArgTableRow arg="rx-size" typ="range">服务器接收的 UDP 数据包大小，以整个 IP 数据包的字节数表示。</ArgTableRow>
<ArgTableRow arg="tcp-connection-count" typ="num">测试的连接数（客户端的 `connection-count`）；UDP 测试也会显示。</ArgTableRow>
<ArgTableRow arg="local-tx-speed" typ="num">客户端为其自身发送设置的速度限制（`local-tx-speed`）。</ArgTableRow>
<ArgTableRow arg="remote-tx-speed" typ="num">客户端为服务器发送设置的速度限制（`remote-tx-speed`）。</ArgTableRow>
</ArgTable>
