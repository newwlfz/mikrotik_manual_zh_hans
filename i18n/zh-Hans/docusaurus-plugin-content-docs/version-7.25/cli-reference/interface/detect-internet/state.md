---
title: "state"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/detect-internet/state
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/interface/detect-internet"
pagination_next: "cli-reference/interface/dot1x"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/detect-internet/state 
**类型：** 目录

Detect Internet 监控的每个接口的只读状态（`detect-interface-list` 的接口，见 [`/interface/detect-internet`](/docs/cli-reference/interface/detect-internet)）。请参阅 [Detect Internet](/docs/diagnostics-monitoring-and-troubleshooting/detect-internet)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="iface_enum">The watched interface.</ArgTableRow>
<ArgTableRow arg="state" typ="enum (no-link | unknown | lan | wan | internet | slave) { no-link:0, unknown:1, lan:2, wan:3, internet:4, slave:5 }">
State of the interface:
- `no-link` - The interface has no link.
- `unknown` - The router is checking the interface, for about 6 seconds.
- `lan` - The start state of layer 2 interfaces, and the state after a link change. An interface that stays `lan` for an hour is locked until its next link change.
- `wan` - The router's active route to 8.8.8.8 goes through the interface. Layer 3 tunnels become `wan` when their link comes up. A `wan` interface goes back to `lan` only after a link change.
- `internet` - A `wan` interface through which the router reaches `cloud.mikrotik.com` on UDP port 30000.
- `slave` - The interface is a port of a bridge or another interface.
</ArgTableRow>
<ArgTableRow arg="state-change-time" typ="date">When the interface got its current state.</ArgTableRow>
<ArgTableRow arg="cloud-rtt" typ="time">Round-trip time of the last cloud check through the interface. Empty when the interface is not `internet`.</ArgTableRow>
</ArgTable>
