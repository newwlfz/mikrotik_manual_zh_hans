---
sidebar_key: "authentication-authorization-accounting/user"
sidebar_position: 7
title: "用户"
sidebar_label: "用户"
description: "MikroTik RouterOS 用户管理页面详细介绍了通过本地或 RADIUS 服务器进行用户身份验证、密码复杂性设置、定义访问权限的用户组策略，以及路由器用户数据库属性（包括登录地址、不活动操作和密码管理）。"
tags:
  - 'user-management'
  - 'radius'
  - 'user-groups'
source: https://manual.mikrotik.com/docs/7.24/authentication-authorization-accounting/user
captured_at: '2026-11-04T11:27:00+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

MikroTik RouterOS 路由器用户功能管理从任何管理工具连接到路由器的用户。用户通过本地数据库或指定的 RADIUS 服务器进行身份验证。每个用户都分配到一个用户组，该用户组表示此用户的权限。组策略是各个策略项的组合。

如果用户身份验证通过 RADIUS 执行，则应事先配置 [RADIUS](./radius.md) 客户端。

## 用户设置 {#user-settings}

settings 子菜单允许控制路由器用户的密码复杂性要求。

| 属性 | 描述 |
| :-- | :-- |
| **minimum-password-length** (*integer*; 0..4294967295; 默认值：) | 指定用户密码的最小字符长度 |
| **minimum-categories** (*integer*; 0..4; 默认值：) | 指定密码的复杂性要求，其中类别为*大写字母、小写字母、数字、符号。*  |

## 用户组 {#user-groups}

路由器用户组提供了一种便捷方式，可为不同用户类别分配不同的权限和访问权限。

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*; 默认值：) | 用户组的名称 |
| **policy** (*local \| telnet \| ssh \| ftp \| reboot \| read \| write \| policy \| test \| winbox \| password \| web \| sniff \| sensitive \| api \| rest-api \| romon*; 默认值：**none**) | 允许的策略列表： 登录策略： local - 授予通过控制台本地登录权限的策略；telnet - 授予通过 telnet 远程登录权限的策略；ssh - 授予通过 Secure Shell 协议远程登录权限的策略；web - 授予通过 WebFig 远程登录权限的策略；winbox - 授予通过 WinBox 和带宽测试身份验证远程登录权限的策略；password - 授予更改当前登录用户密码（自己的密码）权限的策略；api - 授予通过 API 访问路由器权限；rest-api - 授予通过 REST API 访问路由器权限；ftp - 授予通过 FTP 远程登录完整权限的策略。允许读取/写入/擦除文件，以及从路由器传输文件或向路由器传输文件。应与 read/write 策略一起使用；romon - 授予连接到 RoMon 服务器权限的策略。配置策略： reboot - 允许重启路由器的策略；read - 授予对路由器配置读取访问权限的策略。允许所有不更改路由器配置的控制台命令。不影响 FTP；write - 授予对路由器配置写入访问权限的策略，但用户管理除外。此策略不允许读取配置，因此请确保同时启用 read 策略；policy - 授予用户管理权限的策略。应与 write 策略一起使用。还允许查看其他用户创建的全局变量（还需要 'test' 策略）。允许设计皮肤（还需要 "sensitive" 策略）；test - 授予运行 ping、traceroute、bandwidth-test、无线扫描、snooper、fetch、email 和其他测试命令权限的策略；sensitive - 授予更改 "hide sensitive" 选项的权限，如果禁用此策略，则不显示敏感信息；sniff - 授予使用数据包嗅探工具、torch 工具、流量生成器权限的策略。 |
| **skin** (*name*; 默认值：**default**) | 用于 WebFig 的皮肤 |

### 默认组 {#default-groups}

有三个无法删除的默认系统组：

```ros
[admin@MikroTik] > /user/group/print 
0 name="read" policy=local,telnet,ssh,reboot,read,test,winbox,password,web,sniff,sensitive,api,romon,rest-api,!ftp,!write,!policy skin=default 

1 name="write" policy=local,telnet,ssh,reboot,read,write,test,winbox,password,web,sniff,sensitive,api,romon,rest-api,!ftp,!policy skin=default 

2 name="full" policy=local,telnet,ssh,ftp,reboot,read,write,policy,test,winbox,password,web,sniff,sensitive,api,romon,rest-api skin=default 
```

请注意，即使是 "*read*" 组也包含 *sensitive*、*reboot,* 和其他重要策略，这意味着不应将此组授予不受信任的用户。对于真正受限的组，请创建自定义组并定义特定策略。所有组都可以访问文件操作。策略项名称前面的感叹号 '!' 表示 NOT。

## 路由器用户 {#router-users}

路由器用户数据库存储有关路由器管理人员的信息，例如用户名、密码、允许的访问地址和组。

### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/mask \| IPv6 prefix*; 默认值：) | 允许用户登录的主机或网络地址 |
| **group** (*string*; 默认值：) | 用户所属组的名称 |
| **inactivity-policy** (*lockscreen* \| *logout* \| *none*; 默认值：***none***) | 指定无活动操作 - logout（用户将被注销）或 lockscreen（会话将被锁定，需要输入密码才能继续）。仅适用于 CLI 会话。 |
| **inactivity-timeout** (*time*; 默认值：***10min***) | 指定用户被注销或会话被锁定之前的时间。最小超时 - 1 分钟，最大超时 - 24 小时。仅适用于 CLI 会话。 |
| **name** (*string*; 默认值：) | 用户名。必须以字母数字字符开头和结尾，但可以包含 "\_"、"."、"#"、"-" 和 "@" 符号。但是，用户名中禁止使用 "\*" 符号。 |
| **password** (*string*; 默认值：) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用户密码。如果未指定，则留空（登录时按 <kbd>Enter</kbd>）。它符合 Unix 密码的标准特性，可以包含字母、数字、"\*" 和 "\_" 符号。 |
| **last-logged-in** (*time and date*; 默认值：**""**) | 只读字段。用户上次登录的时间和日期。 |

### 操作 {#actions}

现有路由器用户的操作。

| 操作 | 说明 |
| :-- | :-- |
| **password** | 更改用户密码的选项。 |
| **expire-password** | 使用户密码过期，下次登录时，路由器将提示更改密码。 |

### 备注 {#notes}

有一个具有完全访问权限的预定义用户：

```ros
[admin@MikroTik] /user> print
Flags: X - disabled
# NAME GROUP ADDRESS LAST-LOGGED-IN
0 ;;; system default user
admin full 0.0.0.0/0 2010-12-08 16:19:24

```

始终应至少有一个具有完全访问权限的用户。如果具有完全访问权限的用户是唯一一个，则无法将其删除。

## 监控活动用户 {#monitoring-active-users}

```ros
/user/active/print
```

 该命令显示当前活动用户及其各自的统计信息。

### 属性 {#properties-2}

所有属性均为只读。

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/IPv6 address/MAC address*) | 用户访问路由器时所使用的主机 IP/IPv6/MAC 地址。 |
| **group** (*string*) | 用户所属的组。 |
| **name** (*string*) | 用户名。 |
| **radius** (*true \| false*) | 用户是否由 RADIUS 服务器进行身份验证。 |
| **via** (*telnet \| ssh \| winbox \| api \| rest-api \| web \| ftp* ) | 用户的访问方式 |
| **by-romon**(MAC 地址) | RoMON 代理 MAC 地址 |
| **when** (*time*) | 用户登录的时间和日期。 |

### 请求注销 {#request-logout}

可以使用 request logout 功能关闭活动会话。

```routeros
 /user/active/request-logout ACTIVE_USER_SESSION_NUMBER
```

## 远程 AAA {#remote-aaa}

路由器用户远程 AAA 可通过 RADIUS 服务器启用路由器用户身份验证和计费。仅当在本地用户数据库中找不到所需用户名时，才会查询 RADIUS 用户数据库。

### 属性 {#properties-3}

| 属性 | 描述 |
| :-- | :-- |
| **accounting** (*yes \| no*; 默认值：**yes**) | 是否应向 RADIUS 服务器发送登录、注销的计费信息。带宽使用统计不属于 `/user` 计费的一部分 |
| **exclude-groups** (*list of group names*; 默认值：) | exclude-groups 由不允许用于通过 radius 身份验证的用户的组组成。如果 radius 服务器提供的组在此列表中指定，则将改用 default-group。这是为了防止权限提升，即一个用户（没有 policy 权限）可以更改 radius 服务器列表、设置自己的 radius 服务器并以 admin 身份登录。 |
| **default-group** (*string*; 默认值：**read**) | 通过 RADIUS 服务器身份验证的用户默认使用的用户组。 |
| **interim-update** (*time*; 默认：**0s**) | Interim-Update 时间间隔 |
| **use-radius** (*yes \|no*; 默认值：**no**) | 启用通过 RADIUS 的用户身份验证 |

:::info
如果使用 RADIUS，则需要在 RADIUS 服务器中启用 CHAP 支持，WinBox 才能正常工作。
:::

## SSH 密钥 {#ssh-keys}

 此菜单允许导入用于 SSH 身份验证的私钥和公钥。

:::warning
默认情况下，如果为用户添加了 SSH 密钥，则不允许该用户通过密码进行 SSH 登录。有关详细信息，请参阅 [SSH](../management-tools/ssh.md) 页面。
:::

### 公钥 {#public-keys}

此菜单用于导入（或添加）并列出已导入的公钥。当使用 SSH 密钥登录路由器时，公钥用于验证另一台设备的身份。

:::info
支持 PEM、PKCS#8 或 OpenSSH 格式的 RSA、Ed25519 和 Ed25519-sk 密钥。
:::

| 属性 | 说明 |
| :-- | :-- |
| **user** (只读*)* | 已为其分配 SSH 密钥的系统用户 |
| **info** (只读*)* | 密钥信息 |
| **key-type** (只读*)* | 密钥类型 |
| **bits** (只读*)* | 密钥长度 |
| **fingerprint** (只读*)* | SHA256 (Base64) 格式的密钥指纹 |

#### 导入 SSH 公钥 {#import-public-ssh-key}

导入 SSH 公钥时，必须指定密钥文件、将为其分配 SSH 密钥的系统用户；可选地，可以指定密钥所有者。

| 属性 | 说明 |
| :-- | :-- |
| **user** (*string*; 默认值：) | 已为其分配 SSH 密钥的系统用户 |
| **key-owner** (*string*) | SSH 密钥所有者 |
| **public-key-file** (*string*) | 路由器根目录中包含公钥的文件名 |

#### 添加 SSH 公钥 {#add-public-ssh-key}

可以*添加* SSH 公钥（粘贴 SSH 密钥字符串），必须提供密钥字符串以及将为其分配 SSH 密钥的系统用户。

:::note
只能*添加* OpenSSH 格式的密钥
:::

| 属性 | 说明 |
| :-- | :-- |
| **user** (*string*; 默认值：) | 已为其分配 SSH 密钥的系统用户 |
| **key** (*string*) | 公钥 |

### 私钥 {#private-keys}

此菜单用于导入并列出已导入的私钥。当使用 SSH 密钥登录另一台设备时，私钥用于验证路由器的身份。

导入私钥时，可以指定 key-owner。

:::info
支持 PEM 或 PKCS#8 格式的 RSA 和 Ed25519 密钥。
:::

| 属性 | 说明 |
| :-- | :-- |
| **user** (*string*; 默认值：) | 已为其分配 SSH 密钥的系统用户 |
| **key-owner** (*string*) | SSH 密钥所有者 |
| **key-type** (只读*)* | 密钥类型 |
| **bits** (只读*)* | 密钥长度 |

#### 导入 SSH 私钥 {#import-private-ssh-key}

导入 SSH 私钥时，必须指定密钥文件、将为其分配 SSH 密钥的系统用户；可选地，可以提供密钥口令并指定密钥所有者。

| 属性 | 说明 |
| :-- | :-- |
| **user** (*string*; 默认值：) | 已为其分配 SSH 密钥的系统用户 |
| **key-owner** (*string*) | SSH 密钥所有者 |
| **passphrase** *(string) [sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 密钥文件口令 |
| **private-key-file** (*string*) | 路由器根目录中包含私钥的文件名 |
