---
title: "firmware-upgrade"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ppp-client/firmware-upgrade
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ppp-client/firmware-upgrade 
**类型：** 命令

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="upgrade" typ="bool">perform the upgrade or just check</ArgTableRow>
<ArgTableRow arg="firmware-file" typ="file">path or url for the upgrade image</ArgTableRow>
<ArgTableRow arg="update-channel" typ="enum (stable | testing)">firmware update channel</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="installed" typ="string"></ArgTableRow>
<ArgTableRow arg="latest" typ="string"></ArgTableRow>
<ArgTableRow arg="status" typ="string"></ArgTableRow>
<ArgTableRow arg="note" typ="string"></ArgTableRow>
</ArgTable>
