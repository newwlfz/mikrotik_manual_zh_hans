---
sidebar_key: "cli-reference/system/scheduler"
sidebar_position: 26
title: "scheduler"
sidebar_label: 'scheduler'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/scheduler
captured_at: '2026-11-01T21:25:44+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/scheduler {#systemscheduler}
**类型：** 目录

调度器条目在设定的日期和时间运行 RouterOS 命令或 `/system/script` 条目，也可以按间隔重复运行、在启动期间运行，或在选定的工作日运行。有关示例以及下次运行时间的计算方式，请参阅 [调度器](../../system-information-and-utilities/scheduler.md) 指南。`reset` 命令会清除 `on-event` 并将 `interval` 设置为 `0s`；它不会重置 `run-count`。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用的条目；在启用前不会运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">条目名称。其运行产生的日志消息会以 `scheduler:<name>` 指代它。</ArgTableRow>
<ArgTableRow arg="start-date" typ="date">首次运行的日期，格式为 `YYYY-MM-DD`（年份 1970..2106）。默认值：添加条目时的日期。</ArgTableRow>
<ArgTableRow arg="start-time" typ="alt { startup: enum (startup) { startup:0xffffffff }
, time: date
 }">
首次运行的时间：

- `HH:MM:SS` - 首次运行会在 `start-date` 的此时间发生。
- `startup` - 在系统启动期间运行。当 `interval=0s` 时，条目在每次启动时运行一次。当 `interval` 非零时，首次运行发生在启动后一个间隔（或在路由器运行期间添加条目后一个间隔），而不是在启动本身时。

启动运行发生在接口启用之前，也发生在 DHCP 客户端获得地址之前。默认值：添加条目时的时间。
</ArgTableRow>
<ArgTableRow arg="days" typ="alt { day: enum (never | always) { never:0, always:127 }
, day: ubit (sun, mon, tue, wed, thu, fri, sat)
 }" unset="1">
条目运行的星期几：

- 未设置（默认）- 不考虑星期几。运行按 `start-time` 加 `interval` 连续跨越午夜。
- `always` - 每天，按日调度：每天重新从 `start-time` 开始。
- `never` - 该条目从不运行。
- `sun`、`mon`、`tue`、`wed`、`thu`、`fri`、`sat` - 仅在列出的日期运行（以逗号分隔）。每个匹配的日期从 `start-time` 开始，并按 `interval` 重复，直到当天结束。当 `interval=0s` 时，条目在每个匹配的日期运行一次。

当设置了 `days` 时，不支持 `1d` 或更长的 `interval`；此时条目会显示提示 `multi-day intervals are not supported with active day scheduling`。
</ArgTableRow>
<ArgTableRow arg="interval" typ="time">运行之间的时间间隔。运行发生在 `start-date` 和 `start-time` 加上间隔的整数倍时，因此过去的开始时间会对齐调度：`start-time=00:00:00 interval=1h` 会在每个整点运行。`0s` 会让条目在 `start-date` 和 `start-time` 运行一次（设置了 `days` 时，在每个匹配的日期运行一次）。默认值：0s。</ArgTableRow>
<ArgTableRow arg="on-event" typ="alt { script: string
 }">要运行的 RouterOS 命令，或 `/system/script` 条目的名称。按名称调用的脚本会使用此条目的 `policy` 运行；当脚本自身的策略具有此条目的策略所缺少的权限时，会以 `not enough permissions` 拒绝运行。默认值：空。</ArgTableRow>
<ArgTableRow arg="policy" typ="multi { array-id, policy: enum
 }">命令运行所使用的策略。需要某个缺失策略的命令会在日志中失败，并显示 `not enough permissions (9)`。请参阅 [脚本权限](../../developer-guides/scripting/index.md#script-permissions)。默认值：添加条目的用户的策略，限于 `ftp`、`reboot`、`read`、`write`、`policy`、`test`、`password`、`sniff`、`sensitive` 和 `romon`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="owner" typ="string">添加该条目的用户。</ArgTableRow>
<ArgTableRow arg="run-count" typ="num">自上次启动以来的运行次数。重启会将其重置为 0。</ArgTableRow>
<ArgTableRow arg="next-run" typ="date">下次运行的日期和时间。当没有待运行的运行时为空：运行结束后的 `interval=0s` 条目、`interval=0s` 的 `startup` 条目，或 `days=never` 的条目。</ArgTableRow>
</ArgTable>
