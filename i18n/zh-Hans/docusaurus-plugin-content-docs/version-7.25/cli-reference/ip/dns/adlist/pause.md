---
title: "pause"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/dns/adlist/pause
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/dns/adlist"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/dns/adlist/pause 
**类型：** 命令

在指定时间内停止所有 adlist 的拦截，例如 `/ip/dns/adlist/pause duration=10m`。时间到期后，拦截会自动恢复。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="duration" typ="time">How long to stop blocking. `duration=0` ends an active pause.</ArgTableRow>
</ArgTable>
