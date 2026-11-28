---
title: "manual"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/clock/manual
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/system/clock"
pagination_next: "cli-reference/system/console"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/clock/manual 
**类型：** 设置目录

手动 GMT 偏移和夏令时设置，在 [`/system/clock`](/docs/cli-reference/system/clock) 中的 `time-zone-name` 为 `manual` 时应用。请参阅 [Clock](/docs/system-information-and-utilities/clock) 指南。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="time-zone" typ="timezone">GMT offset while daylight saving time is not active. Has an effect only when `time-zone-name` is `manual`. Default: +00:00.</ArgTableRow>
<ArgTableRow arg="dst-delta" typ="timezone">Offset added to `time-zone` while daylight saving time is active. Negative values are accepted, for time zones where the winter time is the daylight saving period. Default: +00:00.</ArgTableRow>
<ArgTableRow arg="dst-start" typ="date">Local date and time when the daylight saving period starts. Daylight saving time is active from `dst-start` until `dst-end` exactly as configured: the period is a single date range and does not repeat in the following years. If `dst-start` is later than `dst-end`, daylight saving time is never active. Format: YYYY-MM-DD HH:MM:SS. An omitted date or time part is reset, the date to 1970-01-01 or the time to 00:00:00 (for example `dst-start=05:00:00` gives `1970-01-01 05:00:00`), so always give both parts. Default: 1970-01-01 00:00:00.</ArgTableRow>
<ArgTableRow arg="dst-end" typ="date">Local date and time when the daylight saving period ends. See `dst-start` for how the period is applied. Format: YYYY-MM-DD HH:MM:SS. An omitted date or time part is reset, the date to 1970-01-01 or the time to 00:00:00, so always give both parts. Default: 1970-01-01 00:00:00.</ArgTableRow>
</ArgTable>
