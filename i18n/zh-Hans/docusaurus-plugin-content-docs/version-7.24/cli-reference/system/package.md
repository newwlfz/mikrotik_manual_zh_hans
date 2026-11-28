---
title: "package"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/package
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/package 
**类型：** 目录

此菜单中执行的命令仅在路由器重启后生效。在此之前，可以自由安排或撤销已设置的操作。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="A" typ="available"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the package.</ArgTableRow>
<ArgTableRow arg="version" typ="string">Version of the package.</ArgTableRow>
<ArgTableRow arg="build-time" typ="date">Date and time the package was built.</ArgTableRow>
<ArgTableRow arg="scheduled" typ="enum ( | scheduled for uninstall | scheduled for disable | scheduled for enable | Use `apply-changes` to proceed with install) { :0, scheduled for uninstall:1, scheduled for disable:2, scheduled for enable:3, Use `apply-changes` to proceed with install:4 }">Scheduled action for the package after the next reboot.</ArgTableRow>
<ArgTableRow arg="bundle" typ="enum">The bundle package this package belongs to.</ArgTableRow>
<ArgTableRow arg="size" typ="num">Size of the package in bytes.</ArgTableRow>
</ArgTable>
