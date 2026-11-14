---
sidebar_key: "cli-reference/system/ntp/client"
title: "client"
sidebar_label: 'client'
source: https://manual.mikrotik.com/docs/cli-reference/system/ntp/client
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ntp/client {#systemntpclient}
**类型：** 设置目录

网络时间协议（NTP）客户端设置。客户端会将路由器时钟与一个或多个 NTP 服务器同步。静态服务器在 `servers` 中或 [servers](./servers.md) 列表中设置；当 DHCP 客户端的 `use-peer-ntp` 启用时，它会动态添加服务器。请参阅 [NTP](../../../../system-information-and-utilities/ntp.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">启用 NTP 客户端。禁用时，`status` 为 `stopped`。默认值：no。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (unicast | broadcast | multicast | manycast)">
客户端从服务器获取时间的方式：
- `unicast`（默认）- 直接查询每个已配置的服务器。
- `broadcast` - 监听本地网络中服务器广播的时间。
- `multicast` - 监听本地网络中服务器组播的时间。
- `manycast` - 通过向本地网络发送 manycast 查询来发现服务器。
</ArgTableRow>
<ArgTableRow arg="servers" typ="multi { server-list: address (flags=46D)
 }">以空格分隔的 NTP 服务器列表。接受 IPv4 和 IPv6 地址（在需要时可带有 `@vrf` 或 `%interface` 后缀）以及域名，域名通过 `/ip/dns` 解析。此列表中的服务器也会与动态条目一起显示在 [servers](./servers.md) 列表中。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">用于与服务器通信的 VRF。默认值：main。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="freq-drift" typ="num">本地时钟的估计频率漂移，单位为 PPM。可通过 [`reset-freq-drift`](./reset-freq-drift.md) 重置。</ArgTableRow>
<ArgTableRow arg="status" typ="enum (stopped | waiting | synchronized | using-local-clock)">
当前客户端状态：
- `stopped` - 客户端已禁用。
- `waiting` - 尚无可用服务器（无应答，或所有对等体均被拒绝）。
- `synchronized` - 时钟已同步到 `synced-server`。
- `using-local-clock` - 使用本地时钟作为参考（需要在 [`/system/ntp/server`](../server.md) 中设置 `use-local-clock=yes`）。
</ArgTableRow>
<ArgTableRow arg="synced-server" typ="address (flags=46D)">时钟所同步到的服务器地址。当本地时钟作为参考时，为 `127.127.1.0`。</ArgTableRow>
<ArgTableRow arg="synced-stratum" typ="num">已同步来源的层级。主服务器为 stratum 1；每经过一次同步层级加一。</ArgTableRow>
<ArgTableRow arg="system-offset" typ="num">本地时钟与 NTP 来源之间的偏移量；使用 `print` 读取时以毫秒显示。</ArgTableRow>
</ArgTable>
