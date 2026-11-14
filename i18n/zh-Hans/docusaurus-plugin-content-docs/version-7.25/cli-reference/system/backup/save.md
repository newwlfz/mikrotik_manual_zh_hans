---
sidebar_key: "cli-reference/system/backup/save"
sidebar_position: 3
title: "save"
sidebar_label: 'save'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/backup/save
captured_at: '2026-11-01T21:25:24+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/backup/save {#systembackupsave}
**类型：** 命令

命令会将配置保存为二进制[备份文件](../../../getting-started/configuration-management/backup.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="file">备份文件的文件名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">加密备份文件的密码。自 RouterOS v6.43 起，如果未提供密码，则备份文件不加密。</ArgTableRow>
<ArgTableRow arg="dont-encrypt" typ="bool">禁用备份文件加密。自 RouterOS v6.43 起，如果未提供密码，则备份文件不加密。</ArgTableRow>
<ArgTableRow arg="encryption" typ="enum (aes-sha256 | rc4) { aes-sha256:0, rc4:1 }">用于加密备份文件的加密算法。`rc4` 不是安全的加密方法，仅出于与旧版 RouterOS 兼容的目的提供。</ArgTableRow>
</ArgTable>
