---
title: "save"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/backup/save
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/backup/save 
**类型：** 命令

该命令将配置保存为二进制[备份文件](/docs/getting-started/configuration-management/backup)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="file">The filename for the backup file.</ArgTableRow>
<ArgTableRow arg="password" typ="string">Password for the encrypted backup file. Since RouterOS v6.43, without a provided password, the backup file is unencrypted.</ArgTableRow>
<ArgTableRow arg="dont-encrypt" typ="bool">Disable backup file encryption. Since RouterOS v6.43, without a provided password, the backup file is unencrypted.</ArgTableRow>
<ArgTableRow arg="encryption" typ="enum (aes-sha256 | rc4) { aes-sha256:0, rc4:1 }">The encryption algorithm to use for encrypting the backup file. `rc4` is not a secure encryption method and is only available for compatibility with older RouterOS versions.</ArgTableRow>
</ArgTable>
