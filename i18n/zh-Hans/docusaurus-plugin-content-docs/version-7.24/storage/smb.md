---
sidebar_key: "storage/smb"
sidebar_position: 11
title: "SMB"
sidebar_label: "SMB"
description: "RouterOS 包含内置 SMB 服务器，用于通过 SMB/CIFS 协议进行文件共享，支持 SMB2.1、3.0 和 3.1.1，并针对 SMB1 和 SMIPS 设备提供安全警告。用户可通过 `/ip/smb`、`/ip/smb/shares` 和 `/ip/` 配置共享、设置用户权限并管理访问权限。"
tags:
  - 'smb'
source: https://manual.mikrotik.com/docs/7.24/storage/smb
captured_at: '2026-11-04T11:33:17+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 内置 **SMB 服务器**，可将路由器上的文件夹共享给网络客户端。此外，[ROSE 软件包](./index.md)还提供了 **SMB 客户端**，允许 RouterOS 将远程 SMB 共享挂载为磁盘。

## SMB 服务器 {#smb-server}

**子菜单：** `/ip/smb` **所需软件包：** `system`

SMB 服务器为路由器上配置的文件夹提供文件共享访问，允许网络客户端通过 SMB/CIFS 协议浏览、读取、写入和管理路由器存储介质上的文件。这使路由器能够充当简单的网络附加存储（NAS）设备，用于在局域网内共享文件、备份数据或路由器配置备份文件。

:::warning
RouterOS 仅支持 SMB2.1、SMB3.0 和 SMB3.1.1。由于安全漏洞，不支持 SMB1。

**注意：** SMIPS 设备不支持 SMB。
:::

### 服务器设置 {#server-settings}

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认值：**MikrotikSMB**) | 为服务器设置注释 |
| **domain** (*string*; 默认值：**MSHOME**) | Windows 工作组的名称 |
| **enabled** (*yes \| no \| auto* 默认值：**auto**) | 默认值为 'auto'。这意味着当在 `/ip/smb/share` 下配置了第一个未禁用的 SMB 共享时，SMB 服务器将自动启用 |
| **interface** (*string*; 默认值：**all**) | 运行 SMB 服务的接口列表。all - SMB 将在所有接口上可用。 |

:::warning
从 7.14 版本开始，'allow-guest' 选项已被位于 `/ip/smb/users` 中的默认访客用户取代。现在可以在此部分禁用或启用该默认访客用户。
:::

### 共享设置 {#share-settings}

**子菜单：** `/ip/smb/shares`

允许配置 SMB 可访问的共享名称和目录。

如果配置中提供的目录不存在，将自动创建。

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认值：**default share**) | 为共享设置注释 |
| **disabled** (*yes \| no*; 默认值：**no**) | 如果禁用，该共享将无法访问。 |
| **valid-users**（*字符串*列表；\| 默认值：） | 指定允许访问 Samba 共享的用户。如果留空，所有用户都可以访问该共享。一旦在此定义了用户，则只有这些用户才能访问该共享 |
| **invalid-users**（*字符串*列表；\| 默认值：） | 用于指定被明确拒绝访问 Samba 共享的用户。 |
| **require-encryption** (*yes*\| *no*; 默认值：***no***) | 强制对特定 Samba 共享的所有连接使用加密。建议将其更改为 "Yes"，以确保与 macOS 客户端更好的稳定性。 |
| **name** (*string*; 默认值：) | SMB 共享的名称 |
| **directory** (*string*; 默认值：) | 分配给 SMB 共享的路由器上的目录。如果留空，将使用根文件夹中的 *name* 参数值。 |

### 用户设置 {#user-setup}

**子菜单：** `/ip/smb/users`

设置可访问路由器 SMB 共享的用户。

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认值：) | 为用户设置描述 |
| **disabled** (*yes \| no*; 默认值：**no**) | 定义用户是启用还是禁用 |
| **name** (*string*; 默认值：) | SMB 服务用户的登录名 |
| **password** (*string*; 默认值：) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | SMB 用户连接 SMB 服务的密码 |
| **read-only** (*yes \| no*; 默认值：**yes**) | 设置用户访问共享时仅具有只读权限还是完全访问权限。 |

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

**子菜单：** `/disk` **所需软件包：** [存储](./index.md)

ROSE 软件包添加了一个 SMB 客户端，可将远程 SMB 共享挂载为路由器上的本地磁盘。ROS 软件包目前支持 SMB2.1、SMB3.0 和 SMB3.1.1 方言（由于安全漏洞，不支持 SMB1）。

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **smb-address** | SMB 服务器的 IP 地址 |
| **smb-password***[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | SMB 密码 |
| **smb-share** | 要连接的共享名称 |
| **smb-user** | SMB 用户 |

### 配置示例 {#configuration-example}

客户端

```ros
add smb-address=10.155.145.11 smb-share=share1 smb-user=user smb-password=password type=smb
```
