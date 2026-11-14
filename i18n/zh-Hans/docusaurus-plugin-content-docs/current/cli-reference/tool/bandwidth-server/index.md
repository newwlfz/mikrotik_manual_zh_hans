---
sidebar_key: "cli-reference/tool/bandwidth-server"
title: "bandwidth-server"
sidebar_label: 'bandwidth-server'
source: https://manual.mikrotik.com/docs/cli-reference/tool/bandwidth-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/bandwidth-server {#toolbandwidth-server}
**类型：** 设置目录

带宽测试服务器的设置，用于响应其他 RouterOS 设备通过 [`/tool/bandwidth-test`](../bandwidth-test.md) 和 [`/tool/speed-test`](../speed-test.md) 发起的测试。服务器监听 TCP 端口 2000（`/ip/service` 中的 `btest` 条目），并在从 `allocate-udp-ports-from` 起始的 UDP 端口上收发测试数据。正在运行的测试列在 [`session`](./session.md) 中。仅当 `bandwidth-test` 设备模式开启时才能工作（参见 [设备模式](../../../system-information-and-utilities/device-mode.md)）。参见 [带宽测试](../../../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">服务器是否响应测试。默认值：yes。</ArgTableRow>
<ArgTableRow arg="authenticate" typ="bool">客户端是否必须使用其所属组具有 `test` 和 `winbox` 策略的用户登录（参见 [`/user/group`](../../user/group.md)）。当设置为 `no` 时，任何能访问 TCP 端口 2000 的人都可以运行会给路由器和其链路带来负载的测试；对于可从互联网访问的路由器，不要关闭此选项。默认值：yes。</ArgTableRow>
<ArgTableRow arg="allocate-udp-ports-from" typ="num">UDP 端口范围的起始值。服务器和客户端从该端口向上取用于测试数据的 UDP 端口，例如服务器上的 2192，以及客户端 20 个流的 2448 到 2467；防火墙必须在两个方向上允许 UDP 流量到达这些端口。范围 `1000..64000`。默认值：2000。</ArgTableRow>
<ArgTableRow arg="max-sessions" typ="num">同时运行的测试数量上限。计数的是测试数，而不是其连接数。当已运行这么多测试时，新测试会收到 `can not connect`。单个测试使用的连接数也不能超过此值：当 `max-sessions=1` 时，只有 `connection-count=1` 的测试才能运行。范围 `1..1000`。默认值：100。</ArgTableRow>
<ArgTableRow arg="allowed-addresses4" typ="object { address: ipPrefix
 }">允许运行测试的客户端的 IPv4 地址或前缀。留空则允许所有客户端。列表之外的客户端会收到 `can not connect`。使用此列表来限制客户端：用户自身的 `address` 设置不会限制带宽测试登录。默认值：空。</ArgTableRow>
<ArgTableRow arg="allowed-addresses6" typ="object { address: ip6Prefix
 }">允许运行测试的客户端的 IPv6 地址或前缀，与 `allowed-addresses4` 相同。默认值：空。</ArgTableRow>
</ArgTable>
