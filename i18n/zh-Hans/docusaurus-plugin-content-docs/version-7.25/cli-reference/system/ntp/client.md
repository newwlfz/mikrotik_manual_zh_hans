---
title: "client"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/ntp/client
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ntp/client 
**类型：** 设置目录

Network Time Protocol（NTP）客户端设置。客户端将一个或多个 NTP 服务器的时钟同步到路由器。静态服务器在 `servers` 或 [servers](/docs/cli-reference/system/ntp/client/servers) 列表中设置；当 DHCP 客户端的 `use-peer-ntp` 启用时，会动态添加服务器。请参阅 [NTP](/docs/system-information-and-utilities/ntp) 指南。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Enable the NTP client. When disabled, `status` is `stopped`. Default: no.</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (unicast | broadcast | multicast | manycast)">
How the client gets time from servers:
- `unicast` (default) - Query each configured server directly.
- `broadcast` - Listen for time broadcast by servers on the local network.
- `multicast` - Listen for time multicast by servers on the local network.
- `manycast` - Discover servers by sending manycast queries to the local network.
</ArgTableRow>
<ArgTableRow arg="servers" typ="multi { server-list: address (flags=46D)
 }">Space-separated list of NTP servers. Accepts IPv4 and IPv6 addresses (with `@vrf` or `%interface` suffixes where needed) and domain names, which are resolved with `/ip/dns`. Servers from this list also appear in the [servers](/docs/cli-reference/system/ntp/client/servers) list alongside dynamic entries.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">VRF used for communication with the servers. Default: main.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="freq-drift" typ="num">Estimated frequency drift of the local clock, in PPM. Reset with [`reset-freq-drift`](/docs/cli-reference/system/ntp/client/reset-freq-drift).</ArgTableRow>
<ArgTableRow arg="status" typ="enum (stopped | waiting | synchronized | using-local-clock)">
Current client state:
- `stopped` - The client is disabled.
- `waiting` - No server is usable yet (no answer, or all peers rejected).
- `synchronized` - The clock is synchronized to `synced-server`.
- `using-local-clock` - The local clock is used as the reference (requires `use-local-clock=yes` in [`/system/ntp/server`](/docs/cli-reference/system/ntp/server)).
</ArgTableRow>
<ArgTableRow arg="synced-server" typ="address (flags=46D)">Address of the server the clock is synchronized to. `127.127.1.0` when the local clock is the reference.</ArgTableRow>
<ArgTableRow arg="synced-stratum" typ="num">Stratum of the synchronized source. Primary servers are stratum 1; each synchronization step adds one.</ArgTableRow>
<ArgTableRow arg="system-offset" typ="num">Offset between the local clock and the NTP source; shown in milliseconds when read with `print`.</ArgTableRow>
</ArgTable>
