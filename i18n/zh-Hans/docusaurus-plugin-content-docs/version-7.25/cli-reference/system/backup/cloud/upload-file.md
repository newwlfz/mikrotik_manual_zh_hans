---
sidebar_key: "cli-reference/system/backup/cloud/upload-file"
sidebar_position: 3
title: "upload-file"
sidebar_label: 'upload-file'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/backup/cloud/upload-file
captured_at: '2026-11-01T21:25:24+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/backup/cloud/upload-file {#systembackupcloudupload-file}
**类型：** 命令

将 AES 加密的备份上传到本设备在云服务器上的槽位。当该槽位已被使用时，除非 `replace` 指定了已存储的备份，否则上传会失败并显示 `Server error: All slots used. Delete file to free up space.`。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="action" typ="enum (upload | create-and-upload)">
要上传的内容：
- `create-and-upload` - 创建当前配置的备份，使用 `password` 加密并上传。
- `upload` - 上传 `src-file` 中指定的备份文件。
</ArgTableRow>
<ArgTableRow arg="name" typ="string">云列表中的备份名称。它不必与文件名一致。</ArgTableRow>
<ArgTableRow arg="replace" typ="enum">要覆盖的已存储备份的名称。新备份会获得新的 `secret-download-key`。</ArgTableRow>
<ArgTableRow arg="src-file" typ="file">要使用 `action=upload` 上传的备份文件。该文件必须使用密码保存（`/system/backup/save password=...`），否则命令会失败并显示 `src file must be AES encrypted`。</ArgTableRow>
<ArgTableRow arg="password" typ="string">`action=create-and-upload` 时用于加密备份的密码。该操作需要此密码；恢复备份时也需要它。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">命令的进度：执行期间为 `working...`，完成时为 `finished`，或为错误信息，例如来自云服务器的错误信息。</ArgTableRow>
</ArgTable>
