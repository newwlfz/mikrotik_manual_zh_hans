---
title: "map"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/map
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/qos/map 
**Syscap：** rbswitch 和 crs_prestera
**类型：** 目录

可信数据包的优先级到配置文件映射表。所有交换机芯片都有一个内置映射 - **default**。此外，某些型号允许用户定义自定义映射表，并通过 **qos-map** 属性将不同映射分配给各个交换机端口：

- 基于 **Marvell Prestera **98DX224S, 98DX226S**** 或 ****98DX3236**** 交换机芯片型号的设备仅支持一个映射 - default。
- 基于 **Marvell Prestera 98DX8xxx**、**98DX4xxx** 交换机芯片的设备，或 **98DX325x** 型号设备最多支持 12 个映射（默认映射 + 11 个用户定义映射）。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1">The user-defined name of the mapping table.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="hw-id" typ="num"></ArgTableRow>
</ArgTable>
