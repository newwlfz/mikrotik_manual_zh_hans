---
title: "bandwidth-server"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/bandwidth-server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/bandwidth-server 
**类型：** 设置目录

带宽测试服务器的设置，该服务器响应其他 RouterOS 设备通过 [`/tool/bandwidth-test`](/docs/cli-reference/tool/bandwidth-test) 和 [`/tool/speed-test`](/docs/cli-reference/tool/speed-test) 发起的测试。服务器监听 TCP 端口 2000（`/ip/service` 中的 `btest` 条目），并从 `allocate-udp-ports-from` 开始的 UDP 端口发送和接收测试数据。正在运行的测试列在 [`session`](/docs/cli-reference/tool/bandwidth-server/session) 中。仅当 `bandwidth-test` 设备模式开启时，该功能才可用（请参阅 [Device mode](/docs/system-information-and-utilities/device-mode)）。详情请参阅 [Bandwidth test](/docs/diagnostics-monitoring-and-troubleshooting/bandwidth-test)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Whether the server answers tests. Default: yes.</ArgTableRow>
<ArgTableRow arg="authenticate" typ="bool">Whether clients must log in with a user whose group has the `test` and `winbox` policies (see [`/user/group`](/docs/user/group)). With `no`, anyone who reaches TCP port 2000 can run tests that load the router and its links; do not turn it off on a router reachable from the internet. Default: yes.</ArgTableRow>
<ArgTableRow arg="allocate-udp-ports-from" typ="num">Beginning of UDP port range. The server and the client take the UDP ports for test data from this port upward, for example 2192 on the server and 2448 to 2467 for a client's 20 streams; firewalls must allow UDP to these ports in both directions. Range `1000..64000`. Default: 2000.</ArgTableRow>
<ArgTableRow arg="max-sessions" typ="num">Maximal simultaneous test count. Tests are counted, not their connections. When this many tests run, a new test gets `can not connect`. A single test cannot use more connections than this value either: with `max-sessions=1`, only a test with `connection-count=1` runs. Range `1..1000`. Default: 100.</ArgTableRow>
<ArgTableRow arg="allowed-addresses4" typ="object { address: ipPrefix
 }">IPv4 addresses or prefixes of the clients allowed to run tests. Empty allows every client. A client outside the list gets `can not connect`. Use this list to limit clients: a user's own `address` setting does not limit bandwidth test logins. Default: empty.</ArgTableRow>
<ArgTableRow arg="allowed-addresses6" typ="object { address: ip6Prefix
 }">IPv6 addresses or prefixes of the clients allowed to run tests, the same as `allowed-addresses4`. Default: empty.</ArgTableRow>
</ArgTable>
