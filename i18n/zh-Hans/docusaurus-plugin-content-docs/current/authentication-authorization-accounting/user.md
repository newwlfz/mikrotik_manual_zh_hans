---
sidebar_key: "authentication-authorization-accounting/user"
sidebar_position: 7
title: "用户"
sidebar_label: "用户"
description: "RouterOS 用户管理：本地用户数据库、用户组与策略、密码复杂度与过期时间、会话空闲处理、SSH 密钥认证，以及用于管理登录的 RADIUS 认证与计费。"
tags:
  - 'user-management'
  - 'radius'
  - 'user-groups'
source: https://manual.mikrotik.com/docs/authentication-authorization-accounting/user
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

`/user` 中的路由器用户功能用于管理通过管理工具访问路由器的账户：WinBox、WebFig、SSH 或 Telnet 控制台、API 以及 REST API。RouterOS 依据本地用户数据库或 RADIUS 服务器对用户进行身份验证。每个用户只属于一个用户组，组的策略定义了该用户可以在路由器上执行哪些操作。有关加固建议（为每位管理员分配账户、密钥登录、服务限制），请参阅[保护您的路由器](../getting-started/securing-your-router.md)。

## 创建用户 {#create-a-user}

默认配置中有一个用户 `admin`，位于 `full` 组中。先创建一个具有用户所需策略的组，然后添加用户：

```ros
/user/group/add name=managers policy=ssh,read,write,password
/user/add name=john group=managers password="StrongPass123!"
```

```ros
[admin@MikroTik] > /user/group/print where name=managers
4  name="managers"
   policy=ssh,read,write,password,!local,!telnet,!ftp,!reboot,!policy,!test,
      !winbox,!web,!sniff,!sensitive,!api,!romon,!rest-api skin=default
```

未列出的策略会从该组中撤销。密码可包含任意字符，包括空格和 UTF-8。添加用户时，password 参数是必填的；显式设置为空密码（`password=""`）则允许使用空密码登录。

将 `address` 设置为 IP 前缀，可让该用户只能从匹配的源地址登录：

```ros
/user/set john address=192.168.88.0/24
```

用户名可包含字母、数字以及字符 `_` `.` `#` `-` `@`，必须以字母或数字结尾，且不能以 `.` 或 `-` 开头。

有关所有用户属性的说明，请参阅 CLI 参考中的 [`/user`](../cli-reference/user/index.md)。

## 修改密码 {#change-a-password}

用户可以使用 `/password` 命令修改自己的密码，既可在交互模式下进行，也可在一行命令中完成：

```ros
/password old-password=StrongPass123! new-password=NewStrongPass456 confirm-new-password=NewStrongPass456
```

用户所属的组必须包含 `password` 策略，否则命令会因 “not enough permissions” 而失败。

管理员使用 `/user/set` 修改其他用户的密码：

```ros
/user/set john password="NewStrongPass456"
```

要强制用户在下次登录时设置新密码，请将当前密码设为过期：

```ros
/user/expire-password john
```

```ros
[admin@MikroTik] > /user/print where name=john
Flags: E - EXPIRED
Columns: NAME, GROUP, ADDRESS, INACTIVITY-POLICY
#   NAME  GROUP     ADDRESS          INACTIVITY-POLICY
2 E john  managers  192.168.88.0/24  none
```

在下次交互式登录时，路由器会要求用户输入新密码；由管理员设置的新密码同样会清除 `E` 标志。

可通过 [`/user/settings`](../cli-reference/user/settings.md) 中的复杂度设置来要求更强的密码：`minimum-password-length` 和 `minimum-categories`（密码中必须包含数字、小写字母、大写字母和符号这几类字符中的几类）。

## 用户组 {#user-groups}

组为用户分配访问权限。策略的完整列表以及每项策略授予的权限见 [`/user/group`](../cli-reference/user/group.md)。

RouterOS 有三个无法删除的默认组：

```ros
[admin@MikroTik] > /user/group/print
0  name="read"
   policy=local,telnet,ssh,reboot,read,test,winbox,password,web,sniff,
      sensitive,api,romon,rest-api,!ftp,!write,!policy skin=default

1  name="write"
   policy=local,telnet,ssh,reboot,read,write,test,winbox,password,web,sniff,
      sensitive,api,romon,rest-api,!ftp,!policy skin=default

2  name="full"
   policy=local,telnet,ssh,ftp,reboot,read,write,policy,test,winbox,password,
      web,sniff,sensitive,api,romon,rest-api
```

:::warning
即使是 `read` 组也包含 `reboot` 和 `sensitive` 策略。不要将其授予不受信任的用户；应改为创建仅包含其所需策略的自定义组。
:::

策略前面的感叹号 `!` 表示从该组中撤销该策略。

### 创建只读用户 {#create-a-read-only-user}

若要允许某人查看配置而不做任何更改，请创建一个具有 `read` 策略以及该用户登录所用工具所需策略的组，然后将该用户添加到该组中：

```ros
/user/group/add name=readonly policy=read,winbox,web,ssh
/user/add name=viewer group=readonly password="StrongPass123!"
```

该用户可以在 WinBox、WebFig 以及通过 SSH 查看配置。更改配置、重启、运行 ping 和 torch 等工具，以及使用 `/password` 更改自己的密码都会失败，并提示 `not enough permissions`。如果没有 `sensitive` 策略，该用户无法看到密码：`/export show-sensitive` 会将其显示为 `*****`。

## 锁定或关闭非活动会话 {#lock-or-close-inactive-sessions}

在用户上设置 `inactivity-timeout`（范围为 1 分钟到 24 小时）和 `inactivity-policy`，以处理空闲的控制台会话：

- `logout` 会关闭空闲会话，并提示 “`<name>` was logged out due to inactivity”。
- `lockscreen` 会锁定会话，恢复时需输入用户密码；按 <kbd>Control</kbd>+<kbd>D</kbd> 可关闭已锁定的会话。

## SSH 密钥 {#ssh-keys}

`/user/ssh-keys` 菜单存储分配给用户的 SSH 公钥，`/user/ssh-keys/private` 存储用于在路由器通过 SSH 连接其他设备（例如使用 `/system/ssh` 或 `/tool/fetch`）时标识路由器自身的私钥。

:::warning
当用户被分配了 SSH 密钥后，SSH 将不再接受该用户的密码认证。支持的配置请参阅 [SSH](../management-tools/ssh.md) 页面。
:::

将密钥文件上传到路由器，并为其导入给某个用户：

```ros
/user/ssh-keys/import public-key-file=mykey.pub user=john info="john laptop"
```

```ros
[admin@MikroTik] > /user/ssh-keys/print where user=john
Columns: USER, KEY-TYPE, BITS, INFO
#  USER  KEY-TYPE  BITS  INFO
1  john  ed25519    256  john laptop
```

公钥导入支持 OpenSSH 单行格式、PKCS#1 PEM（`BEGIN RSA PUBLIC KEY`）以及 PKCS#8/SPKI PEM（`BEGIN PUBLIC KEY`）文件。也可以使用 `/user/ssh-keys/add key="ssh-ed25519 AAAA..." user=john` 直接粘贴 OpenSSH 格式的密钥；密钥字符串末尾的注释会成为该密钥的 `info`。

私钥导入支持 PKCS#1 PEM（`BEGIN RSA PRIVATE KEY`）和 PKCS#8 文件，包括未加密（`BEGIN PRIVATE KEY`）和加密（`BEGIN ENCRYPTED PRIVATE KEY`，需要 `passphrase` 参数）两种：

```ros
/user/ssh-keys/private/import private-key-file=routerkey.pem user=john passphrase=keypass
```

不接受 OpenSSH 格式的私钥（`BEGIN OPENSSH PRIVATE KEY`）。有关所有属性的说明，请参阅 CLI 参考中的 [`/user/ssh-keys`](../cli-reference/user/ssh-keys/index.md) 和 [`/user/ssh-keys/private`](../cli-reference/user/ssh-keys/private/index.md)。

:::info
公钥指数较弱（7 或更小）的 RSA 密钥仍然可用，但在 `/user/ssh-keys` 和 `/user/ssh-keys/private` 的 print 输出中会被标记为 `key uses insecure RSA public exponent!`。请用更强的密钥对替换此类密钥对。
:::

## RADIUS 认证 {#radius-authentication}

路由器用户的远程 AAA 会针对 RADIUS 服务器对管理登录进行身份验证，并向其发送计费记录。请先配置 RADIUS 客户端：添加一个带 `service=login` 的 [`/radius`](../cli-reference/radius/index.md) 条目，然后启用 [`/user/aaa`](../cli-reference/user/aaa.md)。作为 RADIUS 服务器，任何安装了 [用户管理器](./user-manager.md) 软件包的 RouterOS 均可使用：

```ros
# 在 RADIUS 服务器上
/user-manager/set enabled=yes
/user-manager/router/add name=main address=192.168.88.24 shared-secret=radiusSecret
/user-manager/user/add name=john-remote password=JohnPass456

# 在用户登录的路由器上
/radius/add service=login address=192.168.88.36 secret=radiusSecret
/user/aaa/set use-radius=yes
```

默认情况下，User Manager 允许每个用户只有一个并发登录（`shared-users`）；当第一个会话仍处于活动状态时，使用相同名称的第二次登录会被拒绝。

只有当用户名在本地用户数据库中不存在时才会查询 RADIUS；同名的本地用户始终优先。通过 RADIUS 认证的用户会获得 `default-group`（默认为 `read`），除非服务器发送了指定其他本地组的 `Mikrotik-Group` 属性（在 User Manager 中，可通过 `attributes="Mikrotik-Group:full"` 在用户上设置该属性）。`exclude-groups` 中列出的组绝不会被服务器接受，此时用户会获得 `default-group`。

活动的 RADIUS 认证会话会在 `/user/active/print` 中显示 `R`（radius）标志。

## 监控活动会话 {#monitor-active-sessions}

`/user/active/print` 显示已连接的管理会话：

```ros
[admin@MikroTik] > /user/active/print
Flags: R - RADIUS
Columns: WHEN, NAME, ADDRESS, VIA
#   WHEN                 NAME         ADDRESS        VIA
0 R 2026-09-25 09:32:20  john-remote  192.168.88.17  ssh
```

使用 `/user/active/remove` 关闭会话：

```ros
/user/active/remove [find name=john-remote]
```

有关会话属性（包括 `M`（by-romon）标志和完整的 `via` 列表），请参阅 [`/user/active`](../cli-reference/user/active.md)。

## 技术细节 {#technical-details}

### 密码过期流程 {#expired-password-flow}

`/user/expire-password` 会在用户上设置 `E` 标志。在下次交互式登录时，路由器会打印 “Change your password (Ctrl-C to skip)”，然后要求输入 “new password” 和 “repeat new password”；若两者不一致，会打印 “New passwords do not match!” 并重复提示。按 <kbd>Control</kbd>+<kbd>C</kbd> 可跳过修改。非交互式会话（通过 SSH 执行命令）不会出现提示。为该用户设置新密码会清除该标志。

### RADIUS 认证与计费 {#radius-authentication-and-accounting}

- 转发到 RADIUS 的密码登录使用 MS-CHAPv2 进行认证（Access-Request 中携带 `MS-CHAP-Challenge` 和 `MS-CHAP2-Response`）。
- 当 `accounting=yes` 时，路由器在登录时发送 Accounting-Request（Start），在注销时发送（Stop）；`interim-update` 设置在会话活动期间发送 Interim-Update 消息的间隔。管理会话的计费不包含带宽计数器。
- `radius` 日志主题会显示实际交换的属性：`/system/logging/add topics=radius`。

## 延伸阅读 {#read-more}

- CLI 参考中的 [`/user`](../cli-reference/user/index.md)、[`/user/settings`](../cli-reference/user/settings.md)、[`/user/group`](../cli-reference/user/group.md)、[`/user/active`](../cli-reference/user/active.md)、[`/user/aaa`](../cli-reference/user/aaa.md)、[`/user/ssh-keys`](../cli-reference/user/ssh-keys/index.md)
- [RADIUS 客户端](./radius.md)
- [用户管理器](./user-manager.md)
- [SSH](../management-tools/ssh.md)
