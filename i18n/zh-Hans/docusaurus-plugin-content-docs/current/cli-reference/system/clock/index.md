---
sidebar_key: "cli-reference/system/clock"
title: "clock"
sidebar_label: 'clock'
source: https://manual.mikrotik.com/docs/cli-reference/system/clock
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/clock {#systemclock}
**类型：** 设置目录

系统时钟设置：本地日期和时间、时区选择以及自动时区检测。有关时间源、夏令时配置和故障排除的信息，请参阅 [时钟](../../../system-information-and-utilities/clock.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="time" typ="date">HH:MM:SS，其中 HH 表示小时 00..23，MM 表示分钟 00..59，SS 表示秒 00..59。设置或显示路由器上的当前本地时间。当在一条命令中同时设置 `date` 和 `time` 时，时间会按照更改前生效的 GMT 偏移量来解释。</ArgTableRow>
<ArgTableRow arg="date" typ="date">YYYY-MM-DD，其中 YYYY 表示年份，MM 表示月份 01..12，DD 表示日期 01..31。设置或显示路由器上的当前本地日期。日期不能设置为早于已安装 RouterOS 版本的构建日期，而晚于 2038-01-19 03:14:07 UTC 的日期会被忽略且不会报错。本地时间无法导出，也不会与配置的其余部分一起存储。</ArgTableRow>
<ArgTableRow arg="time-zone-autodetect" typ="bool">如果启用，MikroTik 云服务会在启动时根据路由器公共 IP 地址的位置查找时区，并将其应用到 `time-zone-name`，包括夏令时。再次启用该设置时也会运行检测，检测到的时区随后会在几秒内替换手动设置的时区。在检测开启时手动设置的 `time-zone-name` 会保留到下一次检测。默认值：yes。</ArgTableRow>
<ArgTableRow arg="time-zone-name" typ="enum">来自 IANA 时区数据库的时区名称，例如 `Europe/Riga`。区分大小写。该时区的夏令时规则会自动应用。特殊值 `manual` 会应用在 [`/system/clock/manual`](./manual.md) 中配置的 GMT 偏移量和夏令时时段。默认值：manual。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="gmt-offset" typ="timezone">系统当前使用的 GMT 偏移量值，已应用基础时区偏移量和当前生效的夏令时偏移量。`print` 将其显示为 `+03:00`；在脚本中，`get gmt-offset` 会返回以秒为单位的偏移量，例如 `10800`。</ArgTableRow>
<ArgTableRow arg="dst-active" typ="bool">当前时区的夏令时时段生效时为 `yes`。</ArgTableRow>
</ArgTable>
