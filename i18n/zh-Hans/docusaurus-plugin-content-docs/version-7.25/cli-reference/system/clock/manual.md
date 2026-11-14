---
sidebar_key: "cli-reference/system/clock/manual"
sidebar_position: 1
title: "manual"
sidebar_label: 'manual'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/clock/manual
captured_at: '2026-11-01T21:25:28+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/clock/manual {#systemclockmanual}
**类型：** 设置目录

手动 GMT 偏移量和夏令时设置，在 [`/system/clock`](./index.md) 中的 `time-zone-name` 为 `manual` 时生效。参见 [时钟](../../../system-information-and-utilities/clock.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="time-zone" typ="timezone">夏令时未生效时的 GMT 偏移量。仅在 `time-zone-name` 为 `manual` 时生效。默认值：+00:00。</ArgTableRow>
<ArgTableRow arg="dst-delta" typ="timezone">夏令时生效时加到 `time-zone` 上的偏移量。接受负值，用于冬季时间即为夏令时时段所在的时区。默认值：+00:00。</ArgTableRow>
<ArgTableRow arg="dst-start" typ="date">夏令时时段开始的本地日期和时间。夏令时从 `dst-start` 到 `dst-end` 完全按配置生效：该时段是单一的日期区间，不会在后续年份重复。如果 `dst-start` 晚于 `dst-end`，则夏令时永不生效。格式：YYYY-MM-DD HH:MM:SS。省略的日期或时间部分会被重置，日期重置为 1970-01-01，时间重置为 00:00:00（例如 `dst-start=05:00:00` 会得到 `1970-01-01 05:00:00`），因此请始终给出两部分。默认值：1970-01-01 00:00:00。</ArgTableRow>
<ArgTableRow arg="dst-end" typ="date">夏令时时段结束的本地日期和时间。有关该时段的应用方式，请参见 `dst-start`。格式：YYYY-MM-DD HH:MM:SS。省略的日期或时间部分会被重置，日期重置为 1970-01-01，时间重置为 00:00:00，因此请始终给出两部分。默认值：1970-01-01 00:00:00。</ArgTableRow>
</ArgTable>
