---
sidebar_key: "cli-reference/system/backup/load"
sidebar_position: 2
title: "load"
sidebar_label: 'load'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/backup/load
captured_at: '2026-11-01T21:25:24+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/backup/load {#systembackupload}
**类型：** 命令

该命令从[备份文件](../../../getting-started/configuration-management/backup.md)加载配置。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="file">备份文件的文件名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">加密备份文件的密码。</ArgTableRow>
<ArgTableRow arg="force-v6-to-v7-configuration-upgrade" typ="bool">此设置会在加载配置后（如果备份包含 ROSv6 配置）强制运行配置转换为 v7。</ArgTableRow>
</ArgTable>
