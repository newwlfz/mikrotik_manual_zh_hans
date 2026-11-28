---
title: "cloud"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/backup/cloud
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/backup/cloud 
**类型：** 目录

此设备的备份存储在 MikroTik 云服务器上。每台设备有一个槽位。此菜单中的每个命令（包括 `print`）都会连接到 `cloud2.mikrotik.com`。示例请参阅 [Cloud backup](/docs/network-management/cloud/cloud-backup)。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the backup, set with `name` in `upload-file`. `download-file` saves the backup as `<name>.backup` unless `dst-file` is given.</ArgTableRow>
<ArgTableRow arg="size" typ="num">Size of the encrypted backup file.</ArgTableRow>
<ArgTableRow arg="ros-version" typ="string">RouterOS version that created the backup.</ArgTableRow>
<ArgTableRow arg="date" typ="date">Time of the upload.</ArgTableRow>
<ArgTableRow arg="status" typ="string">State of the stored backup. `ok` when the backup can be downloaded.</ArgTableRow>
<ArgTableRow arg="secret-download-key" typ="string">Key that downloads this backup on any router, with `download-file secret-download-key=<key>`. Replacing the backup generates a new key. Anyone who has the key can download the file, but cannot read it without the backup password.</ArgTableRow>
</ArgTable>
