---
title: "bandwidth-test"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/bandwidth-test
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/bandwidth-test 
**类型：** 命令

对另一台 RouterOS 设备的带宽测试服务器运行带宽测试（[`/tool/bandwidth-server`](/docs/cli-reference/tool/bandwidth-server)），并每秒打印一次结果，直到 `duration` 结束或你停止测试。测试会在一个或两个方向上发送 TCP 或 UDP 流量；服务器必须已启用，可在 TCP 端口 2000 和其 `allocate-udp-ports-from` 指定的 UDP 端口上访问，并且必须启用 `bandwidth-test` 设备模式（请参阅 [Device mode](/docs/system-information-and-utilities/device-mode)）。服务器会在 [`/tool/bandwidth-server/session`](/docs/cli-reference/tool/bandwidth-server/session) 中列出正在运行的测试。要在一次运行中测量延迟以及 TCP 和 UDP 的两个方向，请使用 [`/tool/speed-test`](/docs/cli-reference/tool/speed-test)。详情请参阅 [Bandwidth test](/docs/diagnostics-monitoring-and-troubleshooting/bandwidth-test)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="address (flags=46viD)">IPv4 or IPv6 address of the server. A link-local IPv6 address needs the interface, for example `fe80::1%ether1`.</ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (udp | tcp) { udp:0, tcp:1 }">
Traffic to send:
- `udp` (default) - UDP packets of `local-udp-tx-size` and `remote-udp-tx-size` bytes; the receiver counts lost packets.
- `tcp` - TCP connections (`connection-count`); TCP adapts its rate to the path.
</ArgTableRow>
<ArgTableRow arg="local-udp-tx-size" typ="range">Size of the UDP packets the client sends, in bytes of the whole IP packet: 1500 sends a 1472-byte UDP payload. Values below 52 fail with `failure: size too small` over IPv4. Range `28..64000`. Default: 1500.</ArgTableRow>
<ArgTableRow arg="remote-udp-tx-size" typ="range">Size of the UDP packets the server sends, counted the same way as `local-udp-tx-size`. Default: 1500.</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (receive | transmit | both) { receive:0x00000100, transmit:0x00000200, both:0x00000300 }">
Which side sends:
- `receive` (default) - The server sends, the client receives (`rx-*` values).
- `transmit` - The client sends, the server receives (`tx-*` values).
- `both` - Both sides send at the same time.
</ArgTableRow>
<ArgTableRow arg="connection-count" typ="num">Number of TCP connections, or of UDP streams with their own ports, that the test uses. Range `1..255`. Default: 20, or the number of CPU cores on routers with more than 20 cores.</ArgTableRow>
<ArgTableRow arg="local-tx-speed" typ="num">Maximum rate the client sends at, in bits per second (suffixes such as `50M` work). Without it, the client sends as fast as it can: an unlimited UDP test floods for about the first second and then sends more than the receiver reports, so `lost-packets` stays above zero.</ArgTableRow>
<ArgTableRow arg="remote-tx-speed" typ="num">Maximum rate the server sends at, in bits per second (suffixes such as `50M` work). Without it, the server sends as fast as it can.</ArgTableRow>
<ArgTableRow arg="user" typ="string">User name on the server. The user's group needs both the `test` and `winbox` policies (see [`/user/group`](/docs/cli-reference/user/group)). Not needed when the server has `authenticate=no`.</ArgTableRow>
<ArgTableRow arg="password" typ="string">Password of `user` on the server.</ArgTableRow>
<ArgTableRow arg="duration" typ="time">How long the test runs. Without it, the test runs until you stop it, for example with <kbd>Control</kbd>+<kbd>C</kbd>.</ArgTableRow>
<ArgTableRow arg="random-data" typ="bool">Whether to fill the payload with random, incompressible data, so that links that compress traffic do not show a higher rate than they carry. It costs more CPU time on both sides. Default: no.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="enum (connecting | can not start test | can not connect | remote is busy | test unsupported | running | disconnected | authentication failed | done testing) { connecting:0, can not start test:1, can not connect:2, remote is busy:3, test unsupported:4, running:5, disconnected:6, authentication failed:7, done testing:8 }">
State of the test:
- `connecting` - The client is connecting to the server.
- `running` - The test runs.
- `done testing` - The test ended after `duration`.
- `authentication failed` - The server refused the user name or password, or no user was given while the server authenticates.
- `can not connect` - The server is disabled or not reachable, the client is not in its `allowed-addresses4`/`allowed-addresses6`, or `max-sessions` is reached.
- `disconnected` - The connection to the server ended during the test, also when the test uses more connections than the server's `max-sessions`.

其他值表示服务器拒绝测试或无法启动测试。
</ArgTableRow>
<ArgTableRow arg="duration" typ="time">测试已运行的时长。</ArgTableRow>
<ArgTableRow arg="tx-current" typ="num">客户端在最后一秒的发送速率。UDP 统计完整 IP 数据包（包括 IP 和 UDP 报头），TCP 仅统计 TCP 有效载荷。</ArgTableRow>
<ArgTableRow arg="tx-10-second-average" typ="num">客户端在过去 10 秒内的平均发送速率。</ArgTableRow>
<ArgTableRow arg="tx-total-average" typ="num">客户端自测试开始以来的平均发送速率。</ArgTableRow>
<ArgTableRow arg="rx-current" typ="num">客户端在最后一秒的接收速率。UDP 统计完整 IP 数据包（包括 IP 和 UDP 报头），TCP 仅统计 TCP 有效载荷。</ArgTableRow>
<ArgTableRow arg="rx-10-second-average" typ="num">客户端在过去 10 秒内的平均接收速率。</ArgTableRow>
<ArgTableRow arg="rx-total-average" typ="num">客户端自测试开始以来的平均接收速率。</ArgTableRow>
<ArgTableRow arg="lost-packets" typ="num">最后一秒丢失的 UDP 数据包数，不是自开始以来的总数。</ArgTableRow>
<ArgTableRow arg="random-data" typ="bool">测试是否使用随机数据（`random-data`）。</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (receive | transmit | both) { receive:0x00000100, transmit:0x00000200, both:0x00000300 }">测试方向（`direction`）。</ArgTableRow>
<ArgTableRow arg="tx-size" typ="range">客户端发送的 UDP 数据包大小，以完整 IP 数据包的字节数计。</ArgTableRow>
<ArgTableRow arg="rx-size" typ="range">客户端接收的 UDP 数据包大小，以完整 IP 数据包的字节数计。</ArgTableRow>
<ArgTableRow arg="connection-count" typ="num">测试使用的 TCP 连接数或 UDP 流数。</ArgTableRow>
<ArgTableRow arg="local-cpu-load" typ="num">测试期间客户端的 CPU 负载，在前几秒后显示。</ArgTableRow>
<ArgTableRow arg="remote-cpu-load" typ="num">测试期间服务器的 CPU 负载，在前几秒后显示。</ArgTableRow>
<ArgTableRow arg="tcp-info" typ="multi { name: string
 }"></ArgTableRow>
</ArgTable>
