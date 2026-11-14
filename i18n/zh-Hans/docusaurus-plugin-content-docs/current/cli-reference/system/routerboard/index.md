---
sidebar_key: "cli-reference/system/routerboard"
title: "routerboard"
sidebar_label: 'routerboard'
source: https://manual.mikrotik.com/docs/cli-reference/system/routerboard
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/routerboard {#systemrouterboard}
**条件：** !i386
**类型：** 设置目录

此菜单允许您查看 RouterBOARD 设备的基本硬件和固件信息。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="routerboard" typ="bool">指示设备是否为 RouterBOARD 单元。</ArgTableRow>
<ArgTableRow arg="board-name" typ="string"></ArgTableRow>
<ArgTableRow arg="model" typ="string">RouterBOARD 型号编号。</ArgTableRow>
<ArgTableRow arg="revision" typ="string"></ArgTableRow>
<ArgTableRow arg="serial-number" typ="string">设备的唯一序列号。</ArgTableRow>
<ArgTableRow arg="firmware-type" typ="string">设备使用的引导加载程序固件类型。</ArgTableRow>
<ArgTableRow arg="minimum-firmware" typ="string">出厂时安装的固件版本。</ArgTableRow>
<ArgTableRow arg="current-firmware" typ="string">当前使用的 RouterBOOT 加载程序版本。不要将其与 RouterOS 操作系统版本混淆。</ArgTableRow>
<ArgTableRow arg="upgrade-firmware" typ="string">RouterOS 升级可能包含新的 RouterBOOT 版本文件，但必须手动应用。此行指示设备上是否已找到新的 RouterBOOT 文件。该文件可能包含在最近的 RouterOS 升级中，或作为 FWF 文件手动上传。无论哪种情况，此处都会显示可用的最新版本。</ArgTableRow>
</ArgTable>
