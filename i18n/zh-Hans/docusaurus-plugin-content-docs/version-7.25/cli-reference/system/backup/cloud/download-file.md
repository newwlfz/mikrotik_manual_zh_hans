---
title: "download-file"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/backup/cloud/download-file
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/system/backup/cloud"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/backup/cloud/download-file 
**类型：** 命令

从云服务器下载备份：按列表中的编号下载本设备的备份（`number=0`），或使用 `secret-download-key` 下载任意备份。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="secret-download-key" typ="string">Key of the backup to download, shown as `secret-download-key` on the router that uploaded it. Use it to download the backup to another router.</ArgTableRow>
<ArgTableRow arg="action" typ="enum (download | download-and-apply)">
What to do with the backup:
- `download` - Save the backup file to the router's storage.
- `download-and-apply` - Save the backup file, restore the configuration from it with `password`, and reboot.
</ArgTableRow>
<ArgTableRow arg="dst-file" typ="string">Name of the saved file; `.backup` is added. Without it, the file is saved as `<name>.backup`.</ArgTableRow>
<ArgTableRow arg="password" typ="string">Password of the backup, for `action=download-and-apply`.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="string">Progress of the command: `working...` while it runs, `finished` when it is done, or the error message, for example from the cloud server.</ArgTableRow>
</ArgTable>
