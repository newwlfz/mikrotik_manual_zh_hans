---
title: "remove-file"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/backup/cloud/remove-file
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/backup/cloud/remove-file 
**类型：** 命令

删除云服务器上的备份，并释放该设备的槽位。通过备份在列表中的编号指定备份，例如 `remove-file number=0`。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="string">Progress of the command: `working...` while it runs, `finished` when it is done, or the error message, for example from the cloud server.</ArgTableRow>
</ArgTable>
