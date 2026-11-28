---
title: "check-for-updates"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/package/update/check-for-updates
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/package/update/check-for-updates 
**类型：** 命令

检查 MikroTik 下载服务器，确认所选发布通道中是否有更新的 RouterOS 版本。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="fetch-changelog" typ="switch">Whether to fetch the changelog along with the update check.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="changelog" typ="string">Changelog text for the latest available version.</ArgTableRow>
</ArgTable>
