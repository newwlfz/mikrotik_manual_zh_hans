---
title: "romon"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/romon
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## tool/romon 
**类型：** 设置目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Disable or enable the RoMON feature.</ArgTableRow>
<ArgTableRow arg="id" typ="macAddr">MAC address to use as the ID of this router.</ArgTableRow>
<ArgTableRow arg="secrets" typ="multi { array-id, name: string
 }">A list of global secrets used for RoMON message hashing.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="current-id" typ="macAddr">The RoMON ID currently in use, automatically selected from the port MAC address when `id` is not set.</ArgTableRow>
</ArgTable>
