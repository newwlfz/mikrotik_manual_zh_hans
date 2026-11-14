---
sidebar_key: "cli-reference/ip/dns/adlist/pause"
sidebar_position: 1
title: "pause"
sidebar_label: 'pause'
source: https://manual.mikrotik.com/docs/cli-reference/ip/dns/adlist/pause
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/dns/adlist/pause {#ipdnsadlistpause}
**类型：** 命令

在指定时间内停止所有 adlist 的拦截，例如 `/ip/dns/adlist/pause duration=10m`。时间结束后拦截会自动恢复。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="duration" typ="time">停止拦截的持续时间。`duration=0` 会结束当前暂停。</ArgTableRow>
</ArgTable>
