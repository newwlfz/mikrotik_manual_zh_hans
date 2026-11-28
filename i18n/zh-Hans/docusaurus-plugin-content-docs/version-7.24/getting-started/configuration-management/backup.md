---
title: "备份"
description: "RouterOS 备份功能支持保存和恢复路由器配置，包括 MAC 地址，并可选择加密或非加密存储。它支持将备份保存到文件，再加载回同一设备，同时提供有关版本兼容性和敏感数据处理的警告。"
tags:
  - 'backup'
  - 'system-configuration'
  - 'encryption'
source: https://manual.mikrotik.com/docs/7.24/getting-started/configuration-management/backup
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "getting-started/configuration-management"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 备份功能可将路由器配置保存为二进制格式文件，随后可在同一设备上重新应用。系统备份文件还包含设备的 MAC 地址，加载备份文件时会恢复这些地址。

建议在同一版本的 RouterOS 上恢复备份。

:::danger
如果路由器上安装了 The Dude 或 User-manager，则系统备份不会包含这些服务的配置，因此需要额外注意保存这些服务的配置。如果要保存配置，请使用相应工具提供的机制保存/导出配置。

**警告：** 系统备份包含有关设备及其配置的敏感信息；应始终考虑加密备份文件，并将备份文件保存在安全位置。
:::

## 保存备份 {#saving-a-backup}

**子菜单：** `/system/backup/save`

| 属性 | 说明 |
| :-- | :-- |
| **dont-encrypt** (*yes \| no*；默认：**no**) | 禁用备份文件加密。请注意，自 RouterOS v6.43 起，如果未提供密码，备份文件将不加密。 |
| **encryption** (*aes-sha256 \| rc4*；默认：**aes-sha256**) | 用于加密备份文件的加密算法。请注意，`rc4` 不被视为安全的加密方法，仅为兼容旧版 RouterOS 而提供。 |
| **name** (*string*；默认：**[identity]-[date]-[time].backup**) | 备份文件的文件名。 |
| **password** (*string*；默认：) *[敏感参数](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 加密备份文件的密码。请注意，自 RouterOS v6.43 起，如果未提供密码，备份文件将不加密。 |

:::danger
在低于 v6.43 的 RouterOS 版本中，如果未提供密码，则备份文件将使用当前用户的密码加密，除非使用 *dont-encrypt* 属性或当前用户的密码为空。
:::

备份文件可在 `/file` 菜单下找到，可使用 FTP 或 Winbox 下载。

## 加载备份 {#loading-a-backup}

加载无密码备份：

```ros
[admin@MikroTik] > /system/backup/load name=auto-before-reset.backup password=""
```

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认：) | 备份文件的文件名。 |
| **password** (*string*；默认：) *[敏感](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 加密备份文件的密码。 |

## 示例 {#example}

要将路由器配置保存到文件 test 并设置密码：

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

自 RouterOS v6.44 起，可以将设备备份文件安全存储在 MikroTik's Cloud 服务器上。有关此功能的详情，请参阅 [IP/Cloud](/docs/network-management/cloud) 页面。
