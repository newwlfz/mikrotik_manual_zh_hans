---
sidebar_key: "cli-reference/system/backup/save"
sidebar_position: 3
title: "save"
sidebar_label: 'save'
source: https://manual.mikrotik.com/docs/cli-reference/system/backup/save
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/backup/save {#systembackupsave}
**类型：** 命令

将整个路由器配置保存为二进制[备份文件](../../../getting-started/configuration-management/backup.md)。备份文件会出现在 `/file` 菜单中，并且可以从路由器复制出来。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="file">备份文件的名称。文件保存为 `<name>.backup`，并出现在 `/file` 菜单中。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于加密备份文件的密码。未提供密码时，备份以未加密方式保存。</ArgTableRow>
<ArgTableRow arg="dont-encrypt" typ="bool">即使已指定 `password`，也以未加密方式保存备份。默认值：no。</ArgTableRow>
<ArgTableRow arg="encryption" typ="enum (aes-sha256 | rc4) { aes-sha256:0, rc4:1 }">
指定 `password` 时使用的加密算法。
- `aes-sha256`（默认）- 使用 AES 和 SHA-256 加密。
- `rc4` - 旧式弱算法，为兼容较旧版本的 RouterOS 而保留。
</ArgTableRow>
</ArgTable>
