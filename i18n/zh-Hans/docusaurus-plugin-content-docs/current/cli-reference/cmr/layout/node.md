---
sidebar_key: "cli-reference/cmr/layout/node"
sidebar_position: 3
title: "node"
sidebar_label: 'node'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/layout/node
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/layout/node {#cmrlayoutnode}
**软件包：** cmr
**类型：** 目录

特定拓扑节点的配置。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">节点名称。</ArgTableRow>
<ArgTableRow arg="layout" typ="enum" mandatory="1">节点将显示在其中的布局名称。</ArgTableRow>
<ArgTableRow arg="device" typ="enum" unset="1">节点将在拓扑中表示的设备名称。与 `target-layout` 参数互斥。</ArgTableRow>
<ArgTableRow arg="target-layout" typ="enum" unset="1">节点将在拓扑中表示的布局名称。与 `device` 参数互斥。</ArgTableRow>
<ArgTableRow arg="x" typ="num" unset="1">节点在拓扑中的 X 坐标。默认 X 值在每次添加新节点时递增 200，以防止在未指定坐标时发生重叠。（默认值：**0+200*n**）</ArgTableRow>
<ArgTableRow arg="y" typ="num" unset="1">节点在拓扑中的 Y 坐标。（默认值：**0**）</ArgTableRow>
</ArgTable>
