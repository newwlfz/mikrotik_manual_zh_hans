---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/map/index"
sidebar_position: 1
title: "map"
sidebar_label: 'map'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/map
captured_at: '2026-11-01T21:22:38+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/map {#interfaceethernetswitchqosmap}
**系统能力：** rbswitch and crs_prestera
**类型：** 目录

用于受信任数据包的优先级到配置文件映射表。所有交换芯片都有一个内置映射表 - **default**。此外，某些型号允许用户定义自定义映射表，并通过 **qos-map** 属性为不同交换机端口分配不同映射表：

- 基于 **Marvell Prestera **98DX224S、98DX226S**** 或 ****98DX3236**** 交换芯片型号的设备仅支持一个映射表 - default。
- 基于 **Marvell Prestera 98DX8xxx**、**98DX4xxx** 交换芯片或 **98DX325x** 型号设备的设备最多支持 12 个映射表（默认 + 11 个用户定义）。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">映射表的用户定义名称。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hw-id" typ="num"></ArgTableRow>
</ArgTable>
