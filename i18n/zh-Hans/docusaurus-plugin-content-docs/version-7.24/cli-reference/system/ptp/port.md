---
sidebar_key: "cli-reference/system/ptp/port"
sidebar_position: 2
title: "port"
sidebar_label: "port"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/ptp/port
captured_at: '2026-11-01T21:30:01+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ptp/port {#systemptpport}
**条件：** !smips
**系统能力：** ptp
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ptp" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="announce-interval" typ="num"></ArgTableRow>
<ArgTableRow arg="sync-interval" typ="num"></ArgTableRow>
<ArgTableRow arg="delay-interval" typ="num"></ArgTableRow>
<ArgTableRow arg="pdelay-interval" typ="num"></ArgTableRow>
</ArgTable>
