---
sidebar_key: "cli-reference/system/backup/cloud/remove-file"
sidebar_position: 2
title: "remove-file"
sidebar_label: 'remove-file'
source: https://manual.mikrotik.com/docs/cli-reference/system/backup/cloud/remove-file
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/backup/cloud/remove-file {#systembackupcloudremove-file}
**类型：** 命令

从云服务器上删除备份，并释放本设备的槽位。通过备份在列表中的编号来指定备份，例如 `remove-file number=0`。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">命令的进度：执行期间为 `working...`，完成时为 `finished`，或为错误信息，例如来自云服务器的错误信息。</ArgTableRow>
</ArgTable>
