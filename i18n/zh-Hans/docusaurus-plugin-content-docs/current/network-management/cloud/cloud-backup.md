---
sidebar_key: "network-management/cloud/cloud-backup"
sidebar_position: 2
title: "云备份"
sidebar_label: "云备份"
description: "在 MikroTik 云服务器上存储一个加密的 RouterOS 备份，替换或删除它，并使用其秘密下载密钥在同一台或其他路由器上下载或恢复它。"
tags:
  - 'backup'
  - 'cloud'
source: https://manual.mikrotik.com/docs/network-management/cloud/cloud-backup
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

云备份会把路由器配置的加密[备份](../../getting-started/configuration-management/backup.md)存储在 MikroTik 云服务器上。之后你可以将其下载到同一台路由器，或使用其密钥下载密钥下载到另一台路由器（例如替换设备）。每台设备都有一个备份槽位。

## 上传备份 {#upload-a-backup}

要一步创建当前配置的备份并上传：

```ros
[admin@MikroTik] > /system/backup/cloud/upload-file action=create-and-upload name=home-router password=Str0ng-Passw0rd
  status: finished
[admin@MikroTik] > /system/backup/cloud/print detail
0  name="home-router" size=31.5KiB ros-version="7.25" date=2026-09-24 10:11:16
   status="ok" secret-download-key="Xy3kP9qLm2Rt7vWz8Bn4Cd5"
```

路由器会使用 `password` 加密备份，该参数为必填。请保管好密码：恢复备份时需要用到它。`name` 只是云列表中的名称。

要上传之前保存的备份文件，请在保存时设置密码，使其加密。路由器会拒绝未加密的文件，并提示 `src file must be AES encrypted`。

```ros
/system/backup/save name=home-router password=Str0ng-Passw0rd
/system/backup/cloud/upload-file action=upload src-file=home-router.backup name=home-router
```

## 替换或删除备份 {#replace-or-delete-the-backup}

该槽位只能容纳一个备份，因此第二次上传会失败，并提示 `Server error: All slots used. Delete file to free up space.`。要覆盖已存储的备份，请在 `replace` 中指定其名称：

```ros
/system/backup/cloud/upload-file action=create-and-upload name=home-router password=Str0ng-Passw0rd replace=home-router
```

新备份会获得新的密钥下载密钥。

要删除备份并释放槽位：

```ros
/system/backup/cloud/remove-file number=0
```

## 下载或恢复备份 {#download-or-restore-the-backup}

要将此路由器的备份下载到其存储中：

```ros
/system/backup/cloud/download-file action=download number=0
```

路由器会将文件保存为 `<name>.backup`，或使用你在 `dst-file` 中指定的名称。要从中恢复配置，请使用 [`/system/backup/load`](../../getting-started/configuration-management/backup.md#restore-a-backup)。

要一步完成下载和恢复，请提供备份密码。路由器会恢复配置并重启：

```ros
/system/backup/cloud/download-file action=download-and-apply number=0 password=Str0ng-Passw0rd
```

在另一台路由器上（例如替换设备），使用原路由器的密钥下载密钥下载备份：

```ros
/system/backup/cloud/download-file action=download secret-download-key=Xy3kP9qLm2Rt7vWz8Bn4Cd5
```

任何拥有该密钥的人都可以下载备份文件，但没有密码就无法读取它。请妥善保管密钥，并使用强密码。备份中还包含制作备份时所用设备的 MAC 地址（参见[备份](../../getting-started/configuration-management/backup.md)）。

## 技术细节 {#technical-details}

- 路由器通过 TCP 端口 15252 连接到 `cloud2.mikrotik.com` 以进行云备份。
- `/system/backup/cloud` 中的每条命令都会连接服务器，`print` 也是如此，因此命令可能需要一段时间才能完成。命令运行时会显示 `status: working...`。
- `upload-file` 会在连接之前检查路由器上的文件：如果没有密码，`create-and-upload` 会失败并提示 `missing password`，而 `upload` 会拒绝未加密的文件，并提示 `src file must be AES encrypted`。
- `download-file` 在使用 `download-and-apply` 时也会保存文件，因此下载的备份在恢复后仍会保留在 `/file` 中。

有关所有命令和属性的信息，请参阅 CLI 参考中的 [`/system/backup/cloud`](../../cli-reference/system/backup/cloud/index.md)。
