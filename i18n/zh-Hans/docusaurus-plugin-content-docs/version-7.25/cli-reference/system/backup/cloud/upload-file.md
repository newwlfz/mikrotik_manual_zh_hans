---
title: "upload-file"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/backup/cloud/upload-file
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/backup/cloud/upload-file 
**类型：** 命令

将 AES 加密的备份上传到云服务器上此设备的槽位。当槽位已被使用时，上传会失败，并返回 `Server error: All slots used. Delete file to free up space.`，除非 `replace` 指定了要替换的已存储备份。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="action" typ="enum (upload | create-and-upload)">
What to upload:
- `create-and-upload` - Create a backup of the current configuration, encrypt it with `password` and upload it.
- `upload` - Upload the backup file given in `src-file`.
</ArgTableRow>
<ArgTableRow arg="name" typ="string">Name of the backup in the cloud list. It does not have to match a file name.</ArgTableRow>
<ArgTableRow arg="replace" typ="enum">Name of the stored backup to overwrite. The new backup gets a new `secret-download-key`.</ArgTableRow>
<ArgTableRow arg="src-file" typ="file">Backup file to upload with `action=upload`. The file must be saved with a password (`/system/backup/save password=...`), otherwise the command fails with `src file must be AES encrypted`.</ArgTableRow>
<ArgTableRow arg="password" typ="string">Password that encrypts the backup with `action=create-and-upload`. Required for that action; you need it to restore the backup.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="string">Progress of the command: `working...` while it runs, `finished` when it is done, or the error message, for example from the cloud server.</ArgTableRow>
</ArgTable>
