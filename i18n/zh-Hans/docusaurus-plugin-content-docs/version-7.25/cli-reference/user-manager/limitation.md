---
title: "limitation"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user-manager/limitation
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## user-manager/limitation 
**包：** userman-5
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="download-limit" typ="num"></ArgTableRow>
<ArgTableRow arg="upload-limit" typ="num"></ArgTableRow>
<ArgTableRow arg="transfer-limit" typ="num"></ArgTableRow>
<ArgTableRow arg="uptime-limit" typ="time"></ArgTableRow>
<ArgTableRow arg="reset-counters-start-time" typ="date"></ArgTableRow>
<ArgTableRow arg="reset-counters-interval" typ="alt { constant: enum (disabled | hourly | daily | weekly | monthly)
, reset-counters-interval: time
 }"></ArgTableRow>
<ArgTableRow arg="rate-limit-rx" typ="num"></ArgTableRow>
<ArgTableRow arg="rate-limit-tx" typ="num"></ArgTableRow>
<ArgTableRow arg="rate-limit-burst-rx" typ="num"></ArgTableRow>
<ArgTableRow arg="rate-limit-burst-tx" typ="num"></ArgTableRow>
<ArgTableRow arg="rate-limit-burst-threshold-rx" typ="num"></ArgTableRow>
<ArgTableRow arg="rate-limit-burst-threshold-tx" typ="num"></ArgTableRow>
<ArgTableRow arg="rate-limit-burst-time-rx" typ="time"></ArgTableRow>
<ArgTableRow arg="rate-limit-burst-time-tx" typ="time"></ArgTableRow>
<ArgTableRow arg="rate-limit-min-rx" typ="num"></ArgTableRow>
<ArgTableRow arg="rate-limit-min-tx" typ="num"></ArgTableRow>
<ArgTableRow arg="rate-limit-priority" typ="num"></ArgTableRow>
</ArgTable>
