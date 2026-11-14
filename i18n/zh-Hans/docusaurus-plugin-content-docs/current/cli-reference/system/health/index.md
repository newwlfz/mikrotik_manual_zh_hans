---
sidebar_key: "cli-reference/system/health"
title: "health"
sidebar_label: 'health'
source: https://manual.mikrotik.com/docs/cli-reference/system/health
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/health {#systemhealth}
**条件：** i386
**类型：** 设置目录

基于 x86（i386）的设备上的硬件健康监控。使用 `/system/health/print` 读取传感器值。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="state-after-reboot" typ="enum (disabled | enabled)">启用或禁用重启后的硬件健康监控。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="core" typ="num">CPU 核心电压。</ArgTableRow>
<ArgTableRow arg="3.3v" typ="num">3.3 V 供电线路电压。</ArgTableRow>
<ArgTableRow arg="5v" typ="num">5 V 供电线路电压。</ArgTableRow>
<ArgTableRow arg="12v" typ="num">12 V 供电线路电压。</ArgTableRow>
<ArgTableRow arg="lm87-temp" typ="num">由 LM87 传感器测得的温度。</ArgTableRow>
<ArgTableRow arg="cpu-temp" typ="num">CPU 温度。</ArgTableRow>
<ArgTableRow arg="board-temp" typ="num">主板温度。</ArgTableRow>
<ArgTableRow arg="voltage1" typ="num">传感器 1 测得的电压。</ArgTableRow>
<ArgTableRow arg="voltage2" typ="num">传感器 2 测得的电压。</ArgTableRow>
<ArgTableRow arg="voltage3" typ="num">传感器 3 测得的电压。</ArgTableRow>
<ArgTableRow arg="voltage4" typ="num">传感器 4 测得的电压。</ArgTableRow>
<ArgTableRow arg="voltage5" typ="num">传感器 5 测得的电压。</ArgTableRow>
<ArgTableRow arg="voltage6" typ="num">传感器 6 测得的电压。</ArgTableRow>
<ArgTableRow arg="voltage7" typ="num">传感器 7 测得的电压。</ArgTableRow>
<ArgTableRow arg="voltage8" typ="num">传感器 8 测得的电压。</ArgTableRow>
<ArgTableRow arg="voltage9" typ="num">传感器 9 测量的电压。</ArgTableRow>
<ArgTableRow arg="voltage10" typ="num">传感器 10 测量的电压。</ArgTableRow>
<ArgTableRow arg="temp1" typ="num">传感器 1 测量的温度。</ArgTableRow>
<ArgTableRow arg="temp2" typ="num">传感器 2 测量的温度。</ArgTableRow>
<ArgTableRow arg="temp3" typ="num">传感器 3 测量的温度。</ArgTableRow>
<ArgTableRow arg="fan1" typ="num">风扇 1 的转速，单位为 RPM。</ArgTableRow>
<ArgTableRow arg="fan2" typ="num">风扇 2 的转速，单位为 RPM。</ArgTableRow>
<ArgTableRow arg="fan3" typ="num">风扇 3 的转速，单位为 RPM。</ArgTableRow>
<ArgTableRow arg="state" typ="enum (disabled | enabled)">健康监控状态。</ArgTableRow>
</ArgTable>

## system/health {#systemhealth-1}
**条件：** !i386
**系统能力：** health
**类型：** 目录

非 x86 设备上的硬件健康监控。使用 `/system/health/print` 列出每个受监控参数的名称、当前值和类型。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">被监控参数的名称，例如 `voltage`、`cpu-temperature` 或 `fan1-speed`。</ArgTableRow>
<ArgTableRow arg="value" typ="alt { valuet: num
, valuer: num
, valuev: num
, valuea: num
, valuew: num
, valueb: enum (ok | fail | not-present | idle | no-input) { ok:0, fail:1, not-present:2, idle:3, no-input:4 }
, values: string
 }">参数的当前值。该值及其单位取决于参数 `type`。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (C | RPM | V | A | W |  | )">测量值的类型：`C` 为摄氏度，`RPM` 为风扇转速，`V` 为电压，`A` 为电流，`W` 为功耗。</ArgTableRow>
</ArgTable>
