---
sidebar_key: "cli-reference/tool/bandwidth-test"
sidebar_position: 2
title: "bandwidth-test"
sidebar_label: 'bandwidth-test'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/bandwidth-test
captured_at: '2026-11-01T21:25:53+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/bandwidth-test {#toolbandwidth-test}
**类型：** 命令

针对另一台 RouterOS 设备的带宽测试服务器（[`/tool/bandwidth-server`](./bandwidth-server/index.md)）运行带宽测试，并每秒打印结果，直到 `duration` 结束或你停止它。该测试在一个或两个方向上发送 TCP 或 UDP 流量；服务器必须已启用，可通过 TCP 端口 2000 以及从其 `allocate-udp-ports-from` 开始的 UDP 端口访问，并且必须开启 `bandwidth-test` 设备模式（参见[设备模式](../../system-information-and-utilities/device-mode.md)）。服务器在 [`/tool/bandwidth-server/session`](./bandwidth-server/session.md) 中列出正在运行的测试。要在一次运行中测量延迟以及 TCP 和 UDP 的两个方向，请使用 [`/tool/speed-test`](./speed-test.md)。参见[带宽测试](../../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="address (flags=46viD)">服务器的 IPv4 或 IPv6 地址。链路本地 IPv6 地址需要指定接口，例如 `fe80::1%ether1`。</ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (udp | tcp) { udp:0, tcp:1 }">
要发送的流量：
- `udp`（默认）- 大小为 `local-udp-tx-size` 和 `remote-udp-tx-size` 字节的 UDP 数据包；接收方统计丢失的数据包。
- `tcp` - TCP 连接（`connection-count`）；TCP 会根据路径调整其速率。
</ArgTableRow>
<ArgTableRow arg="local-udp-tx-size" typ="range">客户端发送的 UDP 数据包大小，以整个 IP 数据包的字节数计：1500 会发送 1472 字节的 UDP 有效载荷。小于 52 的值在 IPv4 上会失败并显示 `failure: size too small`。范围 `28..64000`。默认值：1500。</ArgTableRow>
<ArgTableRow arg="remote-udp-tx-size" typ="range">服务器发送的 UDP 数据包大小，计数方式与 `local-udp-tx-size` 相同。默认值：1500。</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (receive | transmit | both) { receive:0x00000100, transmit:0x00000200, both:0x00000300 }">
哪一侧发送：
- `receive`（默认）- 服务器发送，客户端接收（`rx-*` 值）。
- `transmit` - 客户端发送，服务器接收（`tx-*` 值）。
- `both` - 两侧同时发送。
</ArgTableRow>
<ArgTableRow arg="connection-count" typ="num">测试使用的 TCP 连接数，或使用各自端口的 UDP 流数量。范围 `1..255`。默认值：20，或者在 CPU 核心数超过 20 的路由器上为 CPU 核心数。</ArgTableRow>
<ArgTableRow arg="local-tx-speed" typ="num">客户端发送的最大速率，单位为比特每秒（支持 `50M` 之类的后缀）。未设置时，客户端会尽可能快地发送：不限速的 UDP 测试在最初约一秒内会泛洪，之后发送量会超过接收方报告的数量，因此 `lost-packets` 会保持大于零。</ArgTableRow>
<ArgTableRow arg="remote-tx-speed" typ="num">服务器发送的最大速率，单位为比特每秒（支持 `50M` 之类的后缀）。未设置时，服务器会尽可能快地发送。</ArgTableRow>
<ArgTableRow arg="user" typ="string">服务器上的用户名。该用户所属组需要同时具有 `test` 和 `winbox` 策略（参见 [`/user/group`](../user/group.md)）。当服务器设置了 `authenticate=no` 时不需要。</ArgTableRow>
<ArgTableRow arg="password" typ="string">服务器上 `user` 的密码。</ArgTableRow>
<ArgTableRow arg="duration" typ="time">测试运行多长时间。未设置时，测试会一直运行，直到你停止它，例如使用 <kbd>Control</kbd>+<kbd>C</kbd>。</ArgTableRow>
<ArgTableRow arg="random-data" typ="bool">是否用随机的、不可压缩的数据填充有效载荷，以便压缩流量的链路不会显示出高于其实际承载能力的速率。这会增加双方的 CPU 时间。默认值：no。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (connecting | can not start test | can not connect | remote is busy | test unsupported | running | disconnected | authentication failed | done testing) { connecting:0, can not start test:1, can not connect:2, remote is busy:3, test unsupported:4, running:5, disconnected:6, authentication failed:7, done testing:8 }">
测试状态：
- `connecting` - 客户端正在连接到服务器。
- `running` - 测试正在运行。
- `done testing` - 测试在 `duration` 后结束。
- `authentication failed` - 服务器拒绝了用户名或密码，或者在服务器要求认证时未提供用户。
- `can not connect` - 服务器已禁用或不可达，客户端不在其 `allowed-addresses4`/`allowed-addresses6` 中，或者已达到 `max-sessions`。
- `disconnected` - 测试期间与服务器的连接结束，测试使用的连接数超过服务器的 `max-sessions` 时也会如此。

其他值表示服务器拒绝或无法启动测试。
</ArgTableRow>
<ArgTableRow arg="duration" typ="time">测试已运行多长时间。</ArgTableRow>
<ArgTableRow arg="tx-current" typ="num">客户端在最后一秒发送的速率。UDP 统计整个 IP 数据包（包括 IP 和 UDP 头部），TCP 仅统计 TCP 有效载荷。</ArgTableRow>
<ArgTableRow arg="tx-10-second-average" typ="num">客户端在过去 10 秒内发送的平均速率。</ArgTableRow>
<ArgTableRow arg="tx-total-average" typ="num">自测试开始以来客户端发送的平均速率。</ArgTableRow>
<ArgTableRow arg="rx-current" typ="num">客户端在最后一秒接收的速率。UDP 统计整个 IP 数据包（包括 IP 和 UDP 头部），TCP 仅统计 TCP 有效载荷。</ArgTableRow>
<ArgTableRow arg="rx-10-second-average" typ="num">客户端在过去 10 秒内接收的平均速率。</ArgTableRow>
<ArgTableRow arg="rx-total-average" typ="num">自测试开始以来客户端接收的平均速率。</ArgTableRow>
<ArgTableRow arg="lost-packets" typ="num">最后一秒内丢失的 UDP 数据包数量，不是自开始以来的总数。</ArgTableRow>
<ArgTableRow arg="random-data" typ="bool">测试是否使用随机数据（`random-data`）。</ArgTableRow>
<ArgTableRow arg="direction" typ="enum (receive | transmit | both) { receive:0x00000100, transmit:0x00000200, both:0x00000300 }">测试的方向（`direction`）。</ArgTableRow>
<ArgTableRow arg="tx-size" typ="range">客户端发送的 UDP 数据包大小，以整个 IP 数据包的字节数计。</ArgTableRow>
<ArgTableRow arg="rx-size" typ="range">客户端接收的 UDP 数据包大小，以整个 IP 数据包的字节数计。</ArgTableRow>
<ArgTableRow arg="connection-count" typ="num">测试使用的 TCP 连接数或 UDP 流数量。</ArgTableRow>
<ArgTableRow arg="local-cpu-load" typ="num">测试期间客户端的 CPU 负载，在最初几秒后显示。</ArgTableRow>
<ArgTableRow arg="remote-cpu-load" typ="num">测试期间服务器的 CPU 负载，在最初几秒后显示。</ArgTableRow>
<ArgTableRow arg="tcp-info" typ="multi { name: string
 }"></ArgTableRow>
</ArgTable>
