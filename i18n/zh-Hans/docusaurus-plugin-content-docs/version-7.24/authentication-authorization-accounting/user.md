---
title: "用户"
description: "MikroTik RouterOS 用户管理页面详细介绍通过本地或 RADIUS 服务器进行用户身份验证、密码复杂性设置、定义访问权限的用户组策略，以及路由器用户数据库属性，包括登录地址、不活动操作和密码管理。"
tags:
  - 'user-management'
  - 'radius'
  - 'user-groups'
source: https://manual.mikrotik.com/docs/7.24/authentication-authorization-accounting/user
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "high-availability-solutions"
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

MikroTik RouterOS 路由器用户功能用于管理通过任一管理工具连接到路由器的用户。用户可使用本地数据库或指定的 RADIUS 服务器进行身份验证。每个用户都被分配到一个用户组，该用户组决定此用户的权限。组策略是各个策略项的组合。

如果使用 RADIUS 进行用户身份验证，则应预先配置 [RADIUS](/docs/authentication-authorization-accounting/radius) 客户端。

## 用户设置 {#user-settings}

settings 子菜单用于控制路由器用户的密码复杂度要求。

| 属性 | 描述 |
| :-- | :-- |
| **minimum-password-length**（*integer*；0..4294967295；默认：） | 指定用户密码的最小字符长度 |
| **minimum-categories**（*integer*；0..4；默认：） | 指定密码的复杂度要求，类别包括 <em>uppercase、lowercase、digit、symbol。</em><br/> |

## 用户组 {#user-groups}

路由器用户组提供了一种便捷方式，用于向不同用户类别分配不同的权限和访问权。

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*; Default: ) | 用户组的名称 |
| **policy** (*local \| telnet \| ssh \| ftp \| reboot \| read \| write \| policy \| test \| winbox \| password \| web \| sniff \| sensitive \| api \| rest-api \| romon*; Default: **none**) | 允许的策略列表：<br/> 登录策略：<br/><ul><li>local - 授予通过控制台本地登录权限的策略</li><li>telnet - 授予通过 telnet 远程登录权限的策略</li><li>ssh - 授予通过 secure shell 协议远程登录权限的策略</li><li>web - 授予通过 WebFig 远程登录权限的策略。</li><li>winbox - 授予通过 WinBox 远程登录权限和带宽测试身份验证的策略</li><li>password - 授予当前登录用户更改密码的权限（自己的密码） </li><li>api - 授予通过 API 访问路由器的权限。</li><li>rest-api - 授予通过 REST API 访问路由器的权限。</li><li>ftp - 授予通过 FTP 远程登录完整权限的策略。允许读取、写入、删除文件，以及在路由器之间传输文件。应与 read/write 策略一起使用。</li><li>romon - 授予连接到 RoMon 服务器权限的策略。</li></ul> 配置策略：<br/><ul><li>reboot - 允许重启路由器的策略</li><li>read - 授予读取路由器配置权限的策略。允许所有不更改路由器配置的控制台命令。不影响 FTP</li><li>write - 授予写入路由器配置权限的策略，用户管理除外。该策略不允许读取配置，因此请确保同时启用 read 策略</li><li>policy - 授予用户管理权限的策略。应与 write 策略一起使用。还允许查看其他用户创建的全局变量（还需要 'test' 策略）。允许设计 <a href="/docs/management-tools/webfig#skins" rel="nofollow">skins</a>（还需要 "sensitive" 策略）。</li><li>test - 授予运行 ping、traceroute、bandwidth-test、wireless scan、snooper、fetch、email 和其他测试命令权限的策略</li><li>sensitive - 授予更改 "hide sensitive" 选项的权限；如果禁用该策略，则不显示敏感信息。</li><li>sniff - 授予使用 packet sniffer 工具、torch 工具、traffic generator 的权限。</li></ul> |
| **skin** (*name*; Default: **default**) | 用于 WebFig 的 skin |

### 默认组 {#default-groups}

有三个无法删除的默认系统组：

```ros
[admin@MikroTik] > /user/group/print 
0 name="read" policy=local,telnet,ssh,reboot,read,test,winbox,password,web,sniff,sensitive,api,romon,rest-api,!ftp,!write,!policy skin=default 

1 name="write" policy=local,telnet,ssh,reboot,read,write,test,winbox,password,web,sniff,sensitive,api,romon,rest-api,!ftp,!policy skin=default 

2 name="full" policy=local,telnet,ssh,ftp,reboot,read,write,policy,test,winbox,password,web,sniff,sensitive,api,romon,rest-api skin=default 
```

请注意，即使 *read* 组也包含 *sensitive*、*reboot* 和其他重要策略，这意味着不应将该组授予不受信任的用户。对于真正受限的组，请创建自定义组并定义特定策略。所有组都有文件操作访问权限。策略项名称前的感叹号 '!' 表示 NOT。

## 路由器用户 {#router-users}

路由器用户数据库存储路由器管理人员的信息，例如用户名、密码、允许的访问地址和组。

### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/mask \| IPv6 prefix*；Default: ) | 允许用户登录的主机或网络地址 |
| **group** (*string*；Default: ) | 用户所属组的名称 |
| **inactivity-policy** (*lockscreen* \| *logout* \| *none*；Default: ***none***) | 指定无操作时的动作：logout（用户将被注销）或 lockscreen（会话将被锁定，需要输入密码才能继续）。仅适用于 CLI 会话。 |
| **inactivity-timeout** (*time*；Default: ***10min***) | 指定用户被注销或会话被锁定前的时间。最短超时为 1 分钟，最长超时为 24 小时。仅适用于 CLI 会话。 |
| **name** (*string*；Default: ) | 用户名。必须以字母或数字开头和结尾，但可以包含“\_”、“.”、“#”、“-”和“@”符号。用户名中禁止使用“\*”符号。 |
| **password** (*string*；Default: ) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用户密码。如果未指定，则留空（登录时按 <kbd>Enter</kbd>）。它符合标准 Unix 密码特性，可以包含字母、数字、“\*”和“\_”符号。 |
| **last-logged-in** (*time and date*；Default: **""**) | 只读字段。用户上次登录的时间和日期。 |

### Actions

针对现有路由器用户的操作。

| 操作 | 说明 |
| :-- | :-- |
| **password** | 更改用户密码的选项。 |
| **expire-password** | 使用户密码过期，下次登录时，路由器将提示更改密码。 |

### 说明 {#notes}

有一个具有完整访问权限的预定义用户：

```ros
[admin@MikroTik] /user> print
Flags: X - disabled
# NAME GROUP ADDRESS LAST-LOGGED-IN
0 ;;; system default user
admin full 0.0.0.0/0 2010-12-08 16:19:24

```

应始终至少有一个具有完整访问权限的用户。如果具有完整访问权限的用户是唯一一个，则无法将其删除。

## 监控活动用户 {#monitoring-active-users}

```ros
/user/active/print
```

 该命令显示当前活动用户及相应的统计信息。

### 属性 {#properties-2}

所有属性均为只读。

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/IPv6 address/MAC address*) | 用户访问路由器时使用的主机 IP/IPv6/MAC 地址。 |
| **group** (*string*) | 用户所属的组。 |
| **name** (*string*) | 用户名。 |
| **radius** (*true \| false*) | 用户是否由 RADIUS 服务器认证。 |
| **via** (*telnet \| ssh \| winbox \| api \| rest-api \| web \| ftp* ) | 用户的访问方式。 |
| **by-romon**(MAC address) | RoMON agent MAC 地址。 |
| **when** (*time*) | 用户登录的时间和日期。 |

### 请求注销 {#request-logout}

可以使用请求注销功能关闭活动会话。

```routeros
 /user/active/request-logout ACTIVE_USER_SESSION_NUMBER
```

## 远程 AAA {#remote-aaa}

路由器用户远程 AAA 支持通过 RADIUS 服务器对路由器用户进行认证和计费。仅当在本地用户数据库中找不到所需用户名时，才会查询 RADIUS 用户数据库。

### 属性 {#properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **accounting** (*yes \| no*；默认：**yes**) | 是否向 RADIUS 服务器发送登录、注销计费信息。带宽使用统计不属于 `/user` 计费的一部分 |
| **exclude-groups** (*list of group names*；默认：) | exclude-groups 由不允许 radius 认证用户使用的组组成。如果 radius 服务器提供此列表中指定的组，将改用 default-group。这用于防止权限提升：某个用户（没有 policy 权限）可以更改 radius 服务器列表，搭建自己的 radius 服务器，并 <br/>以 admin 身份登录。 |
| **default-group** (*string*；默认：**read**) | 通过 RADIUS 服务器认证的用户默认使用的用户组。 |
| **interim-update** (*time*；默认：**0s**) | Interim-Update 时间间隔 |
| **use-radius** (*yes \|no*；默认：**no**) | 启用通过 RADIUS 进行用户认证 |

:::info
如果使用 RADIUS，则需要在 RADIUS 服务器中启用 CHAP 支持，WinBox 才能工作。
:::

## SSH 密钥 {#ssh-keys}

 此菜单用于导入 SSH 认证使用的私钥和公钥。

:::warning
默认情况下，如果为用户添加了 SSH 密钥，则不允许该用户通过密码使用 SSH 登录。详情请参阅 [SSH](/docs/management-tools/ssh) 页面。
:::

### 公钥 {#public-keys}

此菜单用于导入（或添加）和列出已导入的公钥。使用 SSH 密钥登录路由器时，公钥用于确认另一台设备的身份。

:::info
支持 PEM、PKCS#8 或 OpenSSH 格式的 RSA、Ed25519 和 Ed25519-sk 密钥。
:::

| 属性 | 说明 |
| :-- | :-- |
| **user**（read-only*）* | 已分配 SSH 密钥的系统用户 |
| **info**（read-only*）* | 密钥信息 |
| **key-type**（read-only*）* | 密钥类型 |
| **bits**（read-only*）* | 密钥长度 |
| **fingerprint**（read-only*）* | SHA256（Base64）格式的密钥指纹 |

#### 导入公共 SSH 密钥 {#import-public-ssh-key}

导入公共 SSH 密钥时，必须指定密钥文件以及将分配 SSH 密钥的系统用户，也可以选择指定密钥所有者。

| 属性 | 说明 |
| :-- | :-- |
| **user**（*string*；Default: ） | 已分配 SSH 密钥的系统用户 |
| **key-owner**（*string*） | SSH 密钥所有者 |
| **public-key-file**（*string*） | 路由器根目录中包含公钥的文件名 |

#### 添加公共 SSH 密钥 {#add-public-ssh-key}

可以*添加*公共 SSH 密钥（粘贴 SSH 密钥字符串），必须提供密钥字符串以及将分配 SSH 密钥的系统用户。

:::note
只能以 OpenSSH 格式*添加*密钥
:::

| 属性 | 说明 |
| :-- | :-- |
| **user**（*string*；Default: ） | 已分配 SSH 密钥的系统用户 |
| **key**（*string*） | 公钥 |

### 私钥 {#private-keys}

该菜单用于导入并列出已导入的私钥。私钥用于在使用 SSH 密钥登录另一台设备时验证路由器身份。

导入私钥时，可以指定 key-owner。

:::info
支持 PEM 或 PKCS#8 格式的 RSA 和 Ed25519 密钥。
:::

| 属性 | 说明 |
| :-- | :-- |
| **user** (*string*；默认：) | SSH 密钥已分配给的系统用户 |
| **key-owner** (*string*) | SSH 密钥所有者 |
| **key-type** (read-only*)* | 密钥类型 |
| **bits** (read-only*)* | 密钥长度 |

#### 导入私有 SSH 密钥 {#import-private-ssh-key}

导入私有 SSH 密钥时，必须指定密钥文件和 SSH 密钥将分配给的系统用户，也可以提供密钥口令并指定密钥所有者。

| 属性 | 说明 |
| :-- | :-- |
| **user** (*string*；默认：) | SSH 密钥已分配给的系统用户 |
| **key-owner** (*string*) | SSH 密钥所有者 |
| **passphrase** *(string) [sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 密钥文件口令 |
| **private-key-file** (*string*) | 路由器根目录中包含私钥的文件名 |
