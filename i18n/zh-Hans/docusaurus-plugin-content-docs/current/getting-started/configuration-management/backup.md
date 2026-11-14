---
sidebar_key: "getting-started/configuration-management/backup"
sidebar_position: 1
title: "备份"
sidebar_label: "备份"
description: "将 RouterOS 配置保存到二进制文件，对其进行加密，并在之后于同一设备上恢复。"
tags:
  - 'backup'
  - 'system-configuration'
  - 'encryption'
source: https://manual.mikrotik.com/docs/getting-started/configuration-management/backup
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

系统备份会将整个路由器配置保存到单个二进制文件中。在进行有风险的更改之前保存备份，例如在升级前或进行一批防火墙修改前，并在配置损坏时恢复它。对于可能中断连接的更改，或你计划撤销的更改，[安全模式](./index.md#safe-mode)和[撤销/重做](./index.md#configuration-undo-and-redo)是更轻量的替代方案。

备份只有在创建它的设备上才能可靠恢复。备份包含设备的 MAC 地址，因此在另一台设备上恢复可能会导致接口配置错误。要在设备之间复制配置，请改用 [export 和 import](./index.md#configuration-export)。

:::warning
备份包含敏感参数，例如密码和密钥；请参阅[包含敏感参数的菜单列表](./list-of-menus-with-sensitive-parameters.md)。未设置密码保存的备份会以可读形式存储配置。请加密备份并将其保存在安全的地方。
:::

## 保存备份 {#save-a-backup}

将配置保存到备份文件：

```ros
[admin@MikroTik] > /system/backup/save name=config-before-update password=StrongPass
Configuration backup saved
```

该命令会在 [`/file`](../../cli-reference/file/index.md) 菜单中创建文件 `config-before-update.backup`：

```ros
[admin@MikroTik] > /file/print where name~"config-before-update"
Columns: NAME, TYPE, SIZE, LAST-MODIFIED
# NAME                         TYPE    SIZE     LAST-MODIFIED      
0 config-before-update.backup  backup  35.8KiB  2026-10-16 07:15:38
```

将副本存储在路由器之外，例如使用 [WinBox 或 FTP](../../system-information-and-utilities/files.md) 下载该文件。要定期创建备份，请添加一个运行 save 命令的 scheduler 条目；请参阅 [scheduler 示例](../../system-information-and-utilities/scheduler.md)。

提供 `password` 以加密备份文件。如果没有密码，备份将以未加密形式存储。`encryption` 选择算法：默认使用 `aes-sha256`，或使用 `rc4` 以兼容较旧的 RouterOS 版本。即使提供了密码，`dont-encrypt=yes` 也会以未加密形式存储备份。

## 恢复备份 {#restore-a-backup}

使用与 `save` 时相同的备份名称，不带 `.backup` 扩展名。加载备份文件并确认重启：

```ros
[admin@MikroTik] > /system/backup/load name=config-before-update password=StrongPass
Restore and reboot? [y/N]: y
Restoring system configuration
System configuration restored, rebooting now
```

路由器会以恢复后的配置重启。回答 `n` 可取消恢复。省略 `password` 时，RouterOS 会询问密码；对于未加密的备份，任意密码均可使用。

:::note
请在创建备份所用的同一 RouterOS 版本上恢复备份。要加载在 RouterOS v6 上创建的备份，请添加 `force-v6-to-v7-configuration-upgrade=yes`。
:::

## 备份不包含的内容 {#what-the-backup-does-not-contain}

系统备份不包含 [The Dude](../../management-tools/dude.md) 或 [用户管理器](../../authentication-authorization-accounting/user-manager.md#database) 的数据库。两者都在设备上单独存储各自的数据，因此请使用它们各自的备份机制来保存这些数据库。

## 云备份 {#cloud-backup}

将备份的加密副本存储在 MikroTik 云服务器上，稍后将其下载到同一设备或替换设备。请参阅 [云备份](../../network-management/cloud/cloud-backup.md)。

## 故障排除 {#troubleshoot}

- 恢复会失败并显示 `failure: bad password`。密码与使用 `save` 时所使用的密码不匹配；错误密码会在恢复期间、确认之后报告。
- 运行 `load` 时未提供 `password` 参数的脚本会失败并显示 `missing value(s) of argument(s) password`。请将密码作为参数传入；脚本中无法使用交互式提示。
