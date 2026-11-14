---
sidebar_key: "cli-reference/tool/speed-test"
sidebar_position: 23
title: "speed-test"
sidebar_label: 'speed-test'
source: https://manual.mikrotik.com/docs/cli-reference/tool/speed-test
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/speed-test {#toolspeed-test}
**类型：** 命令

在一次运行中测量到另一台 MikroTik 路由器的链路：ping 往返时间、抖动和丢包，然后通过远端路由器的带宽测试服务器（`/tool/bandwidth-server`）测量双向的 TCP 和 UDP 吞吐量。测试运行五个部分，每部分持续 `test-duration`，各部分之间暂停约一秒，并在吞吐量结果旁显示路由器的 CPU 负载。远端路由器需要启用服务器、一个位于具有 `test` 和 `winbox` 策略的组中的用户，以及允许 TCP 端口 2000 和服务器 UDP 端口的防火墙。需要 `bandwidth-test` device-mode 功能。有关示例，请参见 [速度测试](../../diagnostics-monitoring-and-troubleshooting/speed-test.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="address (flags=46viD)">远端路由器的 IPv4 或 IPv6 地址，该路由器运行带宽测试服务器。请使用要测量的路径上该路由器的地址，例如用其隧道地址来测试 VPN。</ArgTableRow>
<ArgTableRow arg="connection-count" typ="num">测试的 TCP 部分使用的 TCP 连接数，`1..255`。远端服务器的会话列表将其显示为 `tcp-connection-count`。默认值：20；如果运行测试的路由器 CPU 核心数超过 20，则为该核心数（例如 64 核路由器上为 64）。</ArgTableRow>
<ArgTableRow arg="test-duration" typ="time">测试的五个部分中每一部分的持续时间，至少 5 秒。路由器在各部分之间暂停约一秒，因此默认测试大约需要 55 秒。默认值：10s。</ArgTableRow>
<ArgTableRow arg="user" typ="string">远程路由器上的用户名。其所属组需要具有 `test` 和 `winbox` 策略，与默认的 `read` 和 `full` 组相同。没有 `user` 时，该命令不发送用户名，并且每条吞吐量行都会显示 `authentication failed`，除非服务器设置了 `authenticate=no`。用户的 `address` 设置不会限制带宽测试登录；服务器的 `allowed-addresses4` 和 `allowed-addresses6` 会限制哪些路由器可以连接。</ArgTableRow>
<ArgTableRow arg="password" typ="string">远端路由器上 `user` 的密码。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">
正在运行的测试部分：
- `ping` - 执行 Ping 以测量延迟、抖动和丢包。
- `tcp download` - 从远端路由器到本路由器的 TCP。
- `tcp upload` - 从本路由器到远端路由器的 TCP。
- `udp download` - 从远端路由器到本路由器的 UDP。
- `udp upload` - 从本路由器到远端路由器的 UDP。
- `done` - 测试已结束。
</ArgTableRow>
<ArgTableRow arg="time-remaining" typ="time">测试结束前的剩余时间。</ArgTableRow>
<ArgTableRow arg="ping-min-avg-max" typ="string">Ping 的最短、平均和最长往返时间。Ping 部分每秒发送 20 个 ICMP 回显请求。</ArgTableRow>
<ArgTableRow arg="jitter-min-avg-max" typ="string">各次 Ping 之间往返时间的变化：最小值、平均值和最大值。</ArgTableRow>
<ArgTableRow arg="loss" typ="string">丢失 Ping 的百分比，后跟丢失和发送的 Ping 数，例如 `0% (0/100)`。</ArgTableRow>
<ArgTableRow arg="tcp-download" typ="string">从远端路由器到本路由器的 TCP 吞吐量，并带有 `local-cpu-load`，即本路由器的 CPU 负载。当远端服务器拒绝该用户时显示 `authentication failed`。</ArgTableRow>
<ArgTableRow arg="tcp-upload" typ="string">从本路由器到远端路由器的 TCP 吞吐量，并带有 `local-cpu-load` 和 `remote-cpu-load`，即本路由器和远端路由器的 CPU 负载。当远端服务器拒绝该用户时显示 `authentication failed`。</ArgTableRow>
<ArgTableRow arg="udp-download" typ="string">从远端路由器到本路由器的 UDP 吞吐量，并带有 `local-cpu-load` 和 `remote-cpu-load`。当远端服务器拒绝该用户时显示 `authentication failed`。</ArgTableRow>
<ArgTableRow arg="udp-upload" typ="string">从本路由器到远端路由器的 UDP 吞吐量，并带有 `local-cpu-load` 和 `remote-cpu-load`。当远端服务器拒绝该用户时显示 `authentication failed`。</ArgTableRow>
</ArgTable>
