---
sidebar_key: "cli-reference/system/backup/load"
sidebar_position: 2
title: "load"
sidebar_label: 'load'
source: https://manual.mikrotik.com/docs/cli-reference/system/backup/load
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/backup/load {#systembackupload}
**类型：** 命令

从[备份文件](../../../getting-started/configuration-management/backup.md)加载使用 `/system/backup/save` 保存的配置，然后在确认后重启路由器。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="file">备份文件的名称，与传给 `save` 的名称相同（不带 `.backup` 扩展名）。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于解密备份文件的密码。省略时，RouterOS 会提示输入。对于未加密的备份，任意密码均可。</ArgTableRow>
<ArgTableRow arg="force-v6-to-v7-configuration-upgrade" typ="bool">是否加载在 RouterOS v6 上创建的备份并将其配置转换为 v7。该标志对在 v7 上创建的备份无效。</ArgTableRow>
</ArgTable>
