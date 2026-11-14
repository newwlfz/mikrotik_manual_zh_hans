---
sidebar_key: "cli-reference/system/health/settings"
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/system/health/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/health/settings {#systemhealthsettings}
**条件：** !i386
**系统能力：** health and health-settings
**类型：** 设置目录

配置设备的风扇和温度监控行为。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="fan-full-speed-temp" typ="num">设置风扇转速提升至最大可能 RPM 时的温度值。风扇控制器从 CPU、PHY、switch 和 SFP 读取温度，并根据温度最高的组件调整风扇转速。范围：-273..65。默认值：65。</ArgTableRow>
<ArgTableRow arg="fan-target-temp" typ="num">设置最热组件的目标温度。风扇控制器会调整风扇行为，使温度保持在目标范围内。范围：-273..65。默认值：58。</ArgTableRow>
<ArgTableRow arg="fan-min-speed-percent" typ="num">设置风扇转速的最低百分比，使风扇转速不会低于此值。默认值因风扇控制器芯片而异；当前设备的默认值为 12。范围：0..100。</ArgTableRow>
<ArgTableRow arg="fan-control-interval" typ="time">设置从 CPU、PHY、switch 和 SFP 读取温度数据的间隔。此设置直接影响 CPU 使用率。范围：5..30 秒。默认值：30s。</ArgTableRow>
<ArgTableRow arg="fan-mode" typ="enum (manual | auto) { manual:0, auto:1 }">选择风扇控制模式。使用 `auto` 时，当主风扇发生故障，设备会自动切换到辅助风扇。使用 `manual` 时，可通过 `use-fan` 和 `use-fan2` 选择运行哪些风扇。</ArgTableRow>
<ArgTableRow arg="use-fan" typ="enum (auxiliary | main) { auxiliary:0, main:1 }">在手动风扇控制模式下选择要使用的风扇。</ArgTableRow>
<ArgTableRow arg="use-fan2" typ="enum (auxiliary | main) { auxiliary:0, main:1 }">在手动风扇控制模式下选择要使用的第二个风扇。</ArgTableRow>
<ArgTableRow arg="fan-switch" typ="enum (auto | on | off) { auto:0, on:1, off:2 }">设置风扇状态：`auto` 遵循自动温度控制，`on` 强制风扇运行，`off` 强制风扇停止。</ArgTableRow>
<ArgTableRow arg="fan-on-threshold" typ="num">设置风扇启动的温度。</ArgTableRow>
<ArgTableRow arg="cpu-overtemp-check" typ="bool">启用或禁用 CPU 过温监测。适用于 ARM 和 ARM64 设备。默认值：no。</ArgTableRow>
<ArgTableRow arg="cpu-overtemp-threshold" typ="num">设置触发过温保护前的最高温度。范围：0..105。默认值：105。</ArgTableRow>
<ArgTableRow arg="cpu-overtemp-startup-delay" typ="time">设置启动后启用过温监测前的延迟。默认值：1m。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="active-fan" typ="enum (auxiliary | main | none) { auxiliary:0, main:1, none:2 }">当前正在使用的风扇。</ArgTableRow>
<ArgTableRow arg="active-fan2" typ="enum (auxiliary | main | none) { auxiliary:0, main:1, none:2 }">当前正在使用的第二个风扇。</ArgTableRow>
</ArgTable>
