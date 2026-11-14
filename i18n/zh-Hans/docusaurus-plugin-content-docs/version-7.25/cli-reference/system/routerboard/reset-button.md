---
sidebar_key: "cli-reference/system/routerboard/reset-button"
sidebar_position: 2
title: "reset-button"
sidebar_label: 'reset-button'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/routerboard/reset-button
captured_at: '2026-11-01T21:25:54+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/routerboard/reset-button {#systemrouterboardreset-button}
**条件：** !i386
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">启用或禁用该按钮。</ArgTableRow>
<ArgTableRow arg="hold-time" typ="composite { min: time [0 .. 60]
, max: time [0 .. 60]
 }">仅当按钮被按住的时长处于指定范围内时，才触发按钮动作。</ArgTableRow>
<ArgTableRow arg="on-event" typ="alt { script: string
 }">按下按钮时要运行的脚本名称。您必须在 [Script](../../../developer-guides/scripting/index.md) 菜单中创建并命名该脚本。重置操作以 `read,write,reboot,ftp,romon,test` 权限执行。</ArgTableRow>
</ArgTable>
