---
title: "detect-internet"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/detect-internet
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/detect-internet 
**类型：** 设置目录

Detect Internet 的设置会为 `detect-interface-list` 中的每个接口赋予一个状态（请参阅 [`state`](/docs/cli-reference/interface/state)），该状态由其链路、经过该接口的路由，以及 `cloud.mikrotik.com` 是否通过该接口在 UDP 端口 30000 上响应决定，并将接口添加到此处设置的 LAN、WAN 和 internet 接口列表中。请参阅 [Detect Internet](/docs/diagnostics-monitoring-and-troubleshooting/detect-internet)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="detect-interface-list" typ="enum">Interface list whose interfaces Detect Internet watches. `none` turns Detect Internet off. Default: none.</ArgTableRow>
<ArgTableRow arg="lan-interface-list" typ="enum">Interface list that gets the interfaces in the `lan` state as dynamic members, with the comment `LAN detected`. Default: none.</ArgTableRow>
<ArgTableRow arg="wan-interface-list" typ="enum">Interface list that gets the interfaces in the `wan` state as dynamic members, with the comment `WAN detected`. Default: none.</ArgTableRow>
<ArgTableRow arg="internet-interface-list" typ="enum">Interface list that gets the interfaces in the `internet` state as dynamic members, with the comment `INTERNET detected`. Default: none.</ArgTableRow>
<ArgTableRow arg="request-interval" typ="time">Sets how often the router checks the cloud: it sends its UDP message to `cloud.mikrotik.com` at half of this interval, about every minute with `2m`. With the default, an `internet` interface falls back to `wan` after about 4 minutes without an answer. Range: 1m..1d. Default: 2m.</ArgTableRow>
</ArgTable>
