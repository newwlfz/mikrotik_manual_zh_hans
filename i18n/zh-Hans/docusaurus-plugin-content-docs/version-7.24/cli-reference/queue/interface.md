---
title: "interface"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/queue/interface
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## queue/interface 
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="queue" typ="enum (no-queue) { no-queue:0 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum"></ArgTableRow>
<ArgTableRow arg="default-queue" typ="enum (no-queue) { no-queue:0 }"></ArgTableRow>
<ArgTableRow arg="active-queue" typ="enum (no-queue | queue-tree) { no-queue:0, queue-tree:0xfffffff9 }"></ArgTableRow>
</ArgTable>
