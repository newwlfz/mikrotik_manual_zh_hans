---
sidebar_key: "cli-reference/system/backup/cloud/download-file"
sidebar_position: 1
title: "download-file"
sidebar_label: 'download-file'
source: https://manual.mikrotik.com/docs/cli-reference/system/backup/cloud/download-file
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/backup/cloud/download-file {#systembackupclouddownload-file}
**类型：** 命令

从云服务器下载备份：本设备在列表中的备份（通过其编号 `number=0`），或通过 `secret-download-key` 下载任意备份。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="secret-download-key" typ="string">要下载的备份密钥，在上传该备份的路由器上显示为 `secret-download-key`。可用它把该备份下载到另一台路由器。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (download | download-and-apply)">
对备份执行的操作：
- `download` - 将备份文件保存到路由器的存储中。
- `download-and-apply` - 保存备份文件，使用 `password` 从该文件恢复配置，然后重启。
</ArgTableRow>
<ArgTableRow arg="dst-file" typ="string">保存的文件名；会自动添加 `.backup`。不指定时，文件保存为 `<name>.backup`。</ArgTableRow>
<ArgTableRow arg="password" typ="string">备份的密码，用于 `action=download-and-apply`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">命令的进度：执行期间为 `working...`，完成时为 `finished`，或为错误信息，例如来自云服务器的错误信息。</ArgTableRow>
</ArgTable>
