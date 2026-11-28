---
title: "server"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/ntp/server
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/system/package"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ntp/server 
**类型：** 设置目录

NTP 服务器设置。服务器响应网络中 NTP 客户端的时间查询；它提供路由器自身同步到的时间。请参阅 [NTP](/docs/system-information-and-utilities/ntp) 指南。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Enable the NTP server. Default: no.</ArgTableRow>
<ArgTableRow arg="broadcast" typ="bool">Periodically send the time to the addresses in `broadcast-addresses`. Default: no.</ArgTableRow>
<ArgTableRow arg="multicast" typ="bool">Distribute the time to the local network as multicast. Default: no.</ArgTableRow>
<ArgTableRow arg="manycast" typ="bool">Take part in manycast discovery, in which clients find servers through multicast queries. Default: no.</ArgTableRow>
<ArgTableRow arg="broadcast-addresses" typ="multi { broadcast-address: ipAddr
 }">Broadcast addresses to send the time to when `broadcast` is enabled.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">VRF the server operates in. Default: main.</ArgTableRow>
<ArgTableRow arg="use-local-clock" typ="bool">Use the router's local clock as a time reference when no better source is available; the daemon then serves and follows its own clock at `local-clock-stratum`. The client's `status` shows `using-local-clock` in this state. The router's clock without external synchronization drifts, so do not use this for precise timekeeping. Default: no.</ArgTableRow>
<ArgTableRow arg="local-clock-stratum" typ="num">Stratum announced for the local clock when `use-local-clock` is enabled. Default: 5.</ArgTableRow>
<ArgTableRow arg="auth-key" typ="enum (none) { none:0 }">Key from [`/system/ntp/key`](/docs/cli-reference/system/ntp/key) for symmetric-key authentication of the time exchange. Default: none (no authentication).</ArgTableRow>
</ArgTable>
