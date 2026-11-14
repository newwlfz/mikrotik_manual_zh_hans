---
sidebar_key: "storage/smb"
sidebar_position: 11
title: "SMB"
sidebar_label: "SMB"
description: "RouterOS 包含内置 SMB 服务器，可通过 SMB/CIFS 协议进行文件共享，支持 SMB2.1、3.0 和 3.1.1。用户可以通过 `/ip/smb`、`/ip/smb/shares` 和 `/ip/smb/users` 配置服务器设置、共享和用户权限。Storage 软件包还增加了 SMB 客户端，用于将远程共享挂载为磁盘。"
tags:
  - 'smb'
source: https://manual.mikrotik.com/docs/7.25/storage/smb
captured_at: '2026-11-04T11:21:42+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 内置 **SMB 服务器**，可将路由器上的文件夹共享给网络客户端。此外，[Storage 软件包](./index.md) 还增加了 **SMB 客户端**，允许 RouterOS 将远程 SMB 共享挂载为磁盘。

## SMB 服务器 {#smb-server}

**子菜单：** `/ip/smb` **所需软件包：** `system`

SMB 服务器为路由器上配置的文件夹提供文件共享访问，允许网络客户端通过 SMB/CIFS 协议浏览、读取、写入和管理路由器存储介质上的文件。这使路由器能够充当简单的网络附加存储（NAS）设备，用于在局域网内共享文件、备份数据或路由器配置备份文件。

:::warning
RouterOS 仅支持 SMB2.1、SMB3.0 和 SMB3.1.1。由于存在安全漏洞，不支持 SMB1。

SMIPS 设备不支持 SMB。
:::

添加第一个共享后，服务器会自动启动（`enabled=auto` 为默认值；相关设置请参见 [`/ip/smb`](../cli-reference/ip/smb/index.md)），也可以将其限制为特定接口并重命名。

### 共享 {#shares}

**子菜单：** `/ip/smb/shares`

[`/ip/smb/shares`](../cli-reference/ip/smb/shares.md) 配置可通过 SMB 访问的共享名称和目录。如果配置中提供的目录不存在，将自动创建。可以通过 `valid-users` / `invalid-users` 按共享限制访问，通过 `require-encryption` 强制加密（建议 macOS 客户端使用），并通过 `read-only` 设置只读访问。

### 用户 {#users}

**子菜单：** `/ip/smb/users`

[`/ip/smb/users`](../cli-reference/ip/smb/users.md) 设置可访问路由器 SMB 共享的用户。每个用户都有一个名称、一个密码，以及一个适用于所有共享的 `read-only` 限制（默认值：是）。系统会自动创建一个默认的 `guest` 用户，且默认处于禁用状态。

### 示例 {#example}

要通过 SMB 服务使 RouterOS 文件夹可用，请按照以下步骤操作：

- 创建用户。

```ros
/ip/smb/users/add read-only=no name=mtuser password=mtpasswd
```

- 添加共享文件夹。

```ros
/ip/smb/shares/add directory=backup name=backup
```

- 启用 SMB 服务：

```ros
#此步骤是可选的，因为默认值为 "enabled=auto"
/ip/smb/set enabled=yes
```

现在检查结果：

- 检查常规服务设置。

```ros
/ip/smb/print
      enabled: yes
        status: enabled
        domain: MSHOME
       comment: MikrotikSMB
    interfaces: all
```

- SMB 用户设置

```ros
/ip/smb/users/print
Flags: X - DISABLED; * - DEFAULT; r - READ-ONLY
Columns: NAME, PASSWORD
#     NAME    PASSWORD
0 X*r guest          
1     mtuser  mtpasswd
```

- 最后是 SMB 共享设置。

```ros
/ip/smb/shares/print
Flags: X - DISABLED; * - DEFAULT
Columns: NAME, DIRECTORY, REQUIRE-ENCRYPTION
#    NAME    DIRECTORY  REQUIRE-ENCRYPTION
;;; default share
0 X* pub     /pub       no               
1    backup  backup     no
```

现在，可以进行其他配置更改，例如禁用默认用户和共享等。

## SMB 客户端 {#smb-client}

**子菜单：** `/disk` **所需软件包：** [Storage 软件包](./index.md)

Storage 软件包增加了一个 SMB 客户端，可将远程 SMB 共享挂载为路由器上的本地磁盘。该软件包目前支持 SMB2.1、SMB3.0 和 SMB3.1.1 方言（由于安全漏洞，不支持 SMB1）。

### 配置示例 {#configuration-example}

```ros
/disk/add smb-address=10.155.145.11 smb-share=share1 smb-user=user smb-password=password type=smb
```

随后，挂载的共享会作为磁盘出现在 `/file` 中，并可像任何其他磁盘一样进行管理。
