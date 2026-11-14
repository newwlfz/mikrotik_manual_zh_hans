---
sidebar_key: "cli-reference/ip/kid-control/index"
sidebar_position: 2
title: "kid-control"
sidebar_label: "kid-control"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/kid-control
captured_at: '2026-11-01T21:28:48+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/kid-control {#ipkid-control}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="P" typ="paused">paused</ArgTableRow>
<ArgTableRow arg="B" typ="blocked">blocked</ArgTableRow>
<ArgTableRow arg="L" typ="rate-limited">rate-limited</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="sun" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="mon" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="tue" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="wed" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="thu" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="fri" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="sat" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="rate-limit" typ="string"></ArgTableRow>
<ArgTableRow arg="tur-sun" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }">周日不限速率的时间</ArgTableRow>
<ArgTableRow arg="tur-mon" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="tur-tue" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="tur-wed" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="tur-thu" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="tur-fri" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
<ArgTableRow arg="tur-sat" typ="multi { time: composite { start: time [0 .. 86400]
, end: time [0 .. 86400]
 }
 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="pause-left" typ="time"></ArgTableRow>
<ArgTableRow arg="pause-till" typ="date"></ArgTableRow>
</ArgTable>
