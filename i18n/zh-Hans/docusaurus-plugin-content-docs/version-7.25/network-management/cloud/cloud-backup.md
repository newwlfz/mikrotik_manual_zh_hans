---
title: "云备份"
description: "在 MikroTik 云服务器上存储一份加密的 RouterOS 备份，可替换或删除该备份，并使用其私密下载密钥在同一路由器或其他路由器上下载或恢复该备份。"
tags:
  - 'backup'
  - 'cloud'
source: https://manual.mikrotik.com/docs/7.25/network-management/cloud/cloud-backup
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Cloud backup 会将路由器配置的加密 [backup](/docs/getting-started/configuration-management/backup) 存储在 MikroTik 云服务器上。之后可以将其下载到同一台路由器，或使用其私密下载密钥下载到另一台路由器，例如替换设备。每台设备有一个 backup 槽位。

## 上传 backup {#upload-a-backup}

要一步创建当前配置的 backup 并上传：

```ros
[admin@MikroTik] > /system/backup/cloud/upload-file action=create-and-upload name=home-router password=Str0ng-Passw0rd
  status: finished
[admin@MikroTik] > /system/backup/cloud/print detail
0  name="home-router" size=31.5KiB ros-version="7.25" date=2026-09-24 10:11:16
   status="ok" secret-download-key="Xy3kP9qLm2Rt7vWz8Bn4Cd5"
```

路由器会使用 `password` 加密 backup，该参数为必需。请妥善保管密码：恢复 backup 时需要用到它。`name` 仅是云列表中的名称。

要上传之前保存的 backup 文件，请使用密码保存该文件，使其加密。路由器会拒绝未加密的文件，并返回 `src file must be AES encrypted`。

```ros
/system/backup/save name=home-router password=Str0ng-Passw0rd
/system/backup/cloud/upload-file action=upload src-file=home-router.backup name=home-router
```

## 替换或删除 backup {#replace-or-delete-the-backup}

槽位只能保存一个 backup，因此第二次上传会失败，并返回 `Server error: All slots used. Delete file to free up space.` 要覆盖已存储的 backup，请在 `replace` 中指定其名称：

```ros
/system/backup/cloud/upload-file action=create-and-upload name=home-router password=Str0ng-Passw0rd replace=home-router
```

新的 backup 会获得新的私密下载密钥。

要删除备份并释放插槽：

```ros
/system/backup/cloud/remove-file number=0
```

## 下载或恢复备份 {#download-or-restore-the-backup}

要将此路由器的备份下载到其存储中：

```ros
/system/backup/cloud/download-file action=download number=0
```

路由器会将文件保存为 `<name>.backup`，或使用你在 `dst-file` 中指定的名称。要从该文件恢复配置，请使用 [`/system/backup/load`](/docs/getting-started/configuration-management/backup#loading-a-backup)。

要一步完成下载和恢复，请提供备份密码。路由器将恢复配置并重启：

```ros
/system/backup/cloud/download-file action=download-and-apply number=0 password=Str0ng-Passw0rd
```

在另一台路由器上，例如替换设备，使用原始路由器的密钥下载备份：

```ros
/system/backup/cloud/download-file action=download secret-download-key=Xy3kP9qLm2Rt7vWz8Bn4Cd5
```

任何拥有该密钥的人都可以下载备份文件，但没有密码则无法读取。请保密密钥并使用强密码。备份还包含生成该备份的设备的 MAC 地址（请参阅 [Backup](/docs/getting-started/configuration-management/backup)）。

## 技术细节 {#technical-details}

- 路由器通过 TCP 端口 15252 连接到 `cloud2.mikrotik.com`，以进行云端备份。
- `/system/backup/cloud` 中的每条命令都会连接到服务器，`print` 也是如此，因此命令可能需要一段时间才能完成。命令运行时，会显示 `status: working...`。
- `upload-file` 在连接前会先检查路由器上的文件：没有密码时，`create-and-upload` 会失败并显示 `missing password`；`upload` 会拒绝未加密的文件，并显示 `src file must be AES encrypted`。
- `download-file` 即使与 `download-and-apply` 一起使用也会保存文件，因此恢复后下载的备份仍保留在 `/file` 中。

有关所有命令和属性，请参阅 CLI 参考中的 [`/system/backup/cloud`](/docs/cli-reference/system/backup/cloud)。
