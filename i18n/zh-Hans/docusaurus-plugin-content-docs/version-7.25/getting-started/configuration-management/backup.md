---
title: "备份"
description: "RouterOS 备份功能支持保存和恢复路由器配置，包括 MAC 地址，并可选择加密或非加密存储。它支持将备份保存到文件，再加载回同一设备，同时提供有关版本兼容性和敏感数据处理的警告。"
tags:
  - 'backup'
  - 'system-configuration'
  - 'encryption'
source: https://manual.mikrotik.com/docs/7.25/getting-started/configuration-management/backup
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "getting-started/configuration-management"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 备份功能可将路由器配置保存为二进制格式文件，随后可在同一设备上重新应用。系统备份文件还包含设备的 MAC 地址，加载备份文件时会恢复这些地址。

应在相同版本的 RouterOS 上恢复备份。

如果路由器上安装了 The Dude 或 User-manager，系统备份不包含这些服务的配置。请使用提供的工具机制保存和导出这些服务的配置。

:::warning
系统备份包含有关设备及其配置的[敏感信息](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)；应始终考虑加密备份文件，并将备份文件保存在安全位置。
:::

## 保存备份 {#saving-a-backup}

备份文件通过运行 `/system/backup/save` 命令生成。参数说明请参阅 [CLI 参考](/docs/cli-reference/system/backup/save)。

生成的备份文件位于 [`/file`](/docs/cli-reference/file) 菜单中，可使用 FTP 或其他管理工具下载。

:::danger
在早于 v6.43 的 RouterOS 版本中，如果未提供密码，备份文件将使用当前用户的密码加密，除非使用 *dont-encrypt* 属性或当前用户的密码为空。
:::

## 加载备份 {#loading-a-backup}

通过运行 `/system/backup/load` 命令加载备份文件。参数说明请参阅 [CLI 参考](/docs/cli-reference/system/backup/load)。

## 示例 {#example}

要将路由器配置保存到带密码的文件 test：

```ros
[admin@MikroTik] > /system/backup/save name=test password=<YOUR_PASSWORD> 
Configuration backup saved 
```

要查看路由器上存储的文件：

```ros
[admin@MikroTik] > /file/print 
# NAME TYPE SIZE CREATION-TIME 
0 test.backup backup 12567 2018-09-08 21:07:50 
[admin@MikroTik] >
```

要加载已保存的备份文件 test：

```ros
[admin@MikroTik] > /system/backup/load name=test 
password: <YOUR_PASSWORD> 
Restore and reboot? [y/N]: y 
Restoring system configuration 
System configuration restored, rebooting now
```

## 云备份 {#cloud-backup}

你可以将设备的备份文件安全存储在 MikroTik 的 Cloud 服务器上。详情请参阅 [Cloud backup](/docs/network-management/cloud/cloud-backup)。
