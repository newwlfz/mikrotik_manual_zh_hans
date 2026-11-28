---
title: "scheduler"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/scheduler
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/system/script"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/scheduler 
**类型：** 目录

Scheduler 条目会在指定日期和时间运行 RouterOS 命令或 `/system/script` 条目，按间隔重复运行，在系统启动期间运行，或在选定的工作日运行。有关示例以及下一次运行时间的计算方式，请参阅 [Scheduler](/docs/system-information-and-utilities/scheduler) 指南。`reset` 命令会清除 `on-event` 并将 `interval` 设置为 `0s`；它不会重置 `run-count`。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Disabled entry; it does not run until enabled.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">Name of the entry. Log messages from its runs refer to it as `scheduler:<name>`.</ArgTableRow>
<ArgTableRow arg="start-date" typ="date">Date of the first run, in the format `YYYY-MM-DD` (years 1970..2106). Default: the date when the entry is added.</ArgTableRow>
<ArgTableRow arg="start-time" typ="alt { startup: enum (startup) { startup:0xffffffff }
, time: date
 }">
Time of the first run:

- `HH:MM:SS` - 首次运行在 `start-date` 的该时间发生。
- `startup` - 在系统启动期间运行。使用 `interval=0s` 时，条目在每次启动时运行一次。使用非零 `interval` 时，首次运行发生在启动后一个间隔（或路由器运行时添加条目后一个间隔），而不是在启动时。

启动运行发生在接口启动之前，以及 DHCP 客户端获得地址之前。默认：添加条目的时间。
</ArgTableRow>
<ArgTableRow arg="days" typ="alt { day: enum (never | always) { never:0, always:127 }
, day: ubit (sun, mon, tue, wed, thu, fri, sat)
 }" unset="1">
条目运行的工作日：

- 未设置（默认）- 不考虑工作日。运行遵循 `start-time` 加 `interval`，连续跨午夜进行。
- `always` - 每天，采用按日调度：每天从 `start-time` 重新开始。
- `never` - 条目从不运行。
- `sun`、`mon`、`tue`、`wed`、`thu`、`fri`、`sat` - 仅在列出的日期运行（以逗号分隔）。每个匹配的日期从 `start-time` 开始，并按 `interval` 重复，直到该日结束。使用 `interval=0s` 时，条目在每个匹配的日期运行一次。

设置 `days` 时，不支持 `1d` 或更长的 `interval`；此时条目会显示注释 `multi-day intervals are not supported with active day scheduling`。
</ArgTableRow>
<ArgTableRow arg="interval" typ="time">运行之间的时间间隔。运行发生在 `start-date` 和 `start-time` 加上间隔的整数倍，因此过去的开始时间会对齐调度：`start-time=00:00:00 interval=1h` 在每个整点运行。`0s` 使条目在 `start-date` 和 `start-time` 运行一次（设置 `days` 时，在每个匹配的日期运行一次）。默认：0s。</ArgTableRow>
<ArgTableRow arg="on-event" typ="alt { script: string
 }">要运行的 RouterOS 命令，或 `/system/script` 条目的名称。按名称调用的脚本使用此条目的 `policy` 运行；当脚本自身的策略拥有此条目策略缺少的权限时，会以 `not enough permissions` 拒绝。默认：空。</ArgTableRow>
<ArgTableRow arg="policy" typ="multi { array-id, policy: enum
 }">命令运行时使用的策略。需要缺少策略的命令会在日志中失败并显示 `not enough permissions (9)`。请参阅 [script permissions](/docs/developer-guides/scripting#script-permissions)。默认：添加条目的用户的策略，限于 `ftp`、`reboot`、`read`、`write`、`policy`、`test`、`password`、`sniff`、`sensitive` 和 `romon`。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="owner" typ="string">The user who added the entry.</ArgTableRow>
<ArgTableRow arg="run-count" typ="num">Number of runs since the last startup. A reboot resets it to 0.</ArgTableRow>
<ArgTableRow arg="next-run" typ="date">Date and time of the next run. Empty when no run is pending: an entry with `interval=0s` after its run, a `startup` entry with `interval=0s`, or an entry with `days=never`.</ArgTableRow>
</ArgTable>
