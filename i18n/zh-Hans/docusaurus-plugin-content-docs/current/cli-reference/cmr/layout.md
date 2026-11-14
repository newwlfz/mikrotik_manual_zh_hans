---
sidebar_key: "cli-reference/cmr/layout"
title: "layout"
source: https://manual.mikrotik.com/docs/cli-reference/cmr/layout
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/layout {#cmrlayout}
**包：** cmr
**类型：** 目录

拓扑配置；拓扑本身只能在 GUI 中显示，无法在 CLI 中显示。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">布局/拓扑的名称。</ArgTableRow>
<ArgTableRow arg="scale" typ="num" unset="1">背景图片缩放百分比。默认值：100。</ArgTableRow>
<ArgTableRow arg="file" typ="string" unset="1">背景图片选择。</ArgTableRow>
</ArgTable>
