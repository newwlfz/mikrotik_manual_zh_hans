---
title: "用户"
description: "RouterOS 用户管理：本地用户数据库、用户组和策略、密码复杂度和有效期、会话空闲处理、SSH 密钥认证，以及管理登录的 RADIUS 认证和计费。"
tags:
  - 'user-management'
  - 'radius'
  - 'user-groups'
source: https://manual.mikrotik.com/docs/7.25/authentication-authorization-accounting/user
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "high-availability-solutions"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

`/user` 中的路由器用户功能管理使用管理工具访问路由器的账户：WinBox、WebFig、通过 SSH 或 Telnet 的控制台、API 和 REST API。RouterOS 根据本地用户数据库或 RADIUS 服务器对用户进行身份验证。每个用户只属于一个用户组，组的策略定义用户可以在路由器上执行的操作。有关加固建议（每个管理员独立账户、密钥登录、服务限制），请参阅[保护路由器安全](/docs/getting-started/securing-your-router)。

## 创建用户 {#create-a-user}

默认配置中有一个用户 `admin`，属于 `full` 组。先创建具有用户所需策略的组，然后添加用户：

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

未列出的策略会从组中撤销。密码接受任意字符，包括空格和 UTF-8。添加用户时，password 参数为必填项；显式设置空密码（`password=""`）允许使用空白密码登录。

将 `address` 设置为 IP 前缀，可允许用户仅从匹配的源地址登录：

```ros
/user/set john address=192.168.88.0/24
```

用户名接受字母、数字以及字符 `_`、`.`、`#`、`-`、`@`，必须以字母或数字结尾，且不能以 `.` 或 `-` 开头。

有关所有用户属性，请参阅 CLI 参考中的 [`/user`](/docs/cli-reference/user)。

## 修改密码 {#change-a-password}

用户可以使用 `/password` 命令在交互模式或单行模式中修改自己的密码：

```ros
/password old-password=StrongPass123! new-password=NewStrongPass456 confirm-new-password=NewStrongPass456
```

用户所属组必须包含 `password` 策略，否则命令将失败并显示“not enough permissions”。

管理员可以使用 `/user/set` 修改其他用户的密码：

```ros
/user/set john password="NewStrongPass456"
```

要强制用户在下次登录时设置新密码，请使当前密码过期：

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

下次交互式登录时，路由器会要求用户输入新密码；管理员设置的新密码也会清除 `E` 标志。

通过 [`/user/settings`](/docs/cli-reference/user/settings) 中的复杂性设置要求使用更强的密码：`minimum-password-length` 和 `minimum-categories`（密码必须包含数字、小写字母、大写字母和符号这些组中的多少组）。

## 用户组 {#user-groups}

组用于为用户分配访问权限。策略的完整列表以及每项策略授予的权限见 [`/user/group`](/docs/cli-reference/user/group)。

RouterOS 有 3 个无法删除的默认组：

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
即使 `read` 组也包含 `reboot` 和 `sensitive` 策略。不要将其授予不受信任的用户；应创建一个仅包含所需策略的自定义组。
:::

策略前的感叹号 `!` 会从组中撤销该策略。

## 锁定或关闭非活动会话 {#lock-or-close-inactive-sessions}

在用户上设置 `inactivity-timeout`（范围为 1 分钟到 24 小时）和 `inactivity-policy`，以处理空闲控制台会话：

- `logout` 会关闭空闲会话，并显示消息“`<name>` was logged out due to inactivity”。
- `lockscreen` 会锁定会话，并要求输入用户密码才能恢复；<kbd>Control</kbd>+<kbd>D</kbd> 会关闭已锁定的会话。

## SSH 密钥 {#ssh-keys}

`/user/ssh-keys` 菜单存储分配给用户的 SSH 公钥，`/user/ssh-keys/private` 存储私钥，用于在路由器通过 SSH 连接其他设备时标识路由器自身，例如通过 `/system/ssh` 或 `/tool/fetch`。

:::warning
为用户分配 SSH 密钥后，SSH 将不再接受该用户的密码认证。支持的配置请参阅 [SSH](/docs/management-tools/ssh) 页面。
:::

将密钥文件上传到路由器，并为某个用户导入：

```ros
/user/ssh-keys/import public-key-file=mykey.pub user=john info="john laptop"
```

```ros
[admin@MikroTik] > /user/ssh-keys/print where user=john
Columns: USER, KEY-TYPE, BITS, INFO
#  USER  KEY-TYPE  BITS  INFO
1  john  ed25519    256  john laptop
```

公钥导入支持 OpenSSH 单行格式、PKCS#1 PEM（`BEGIN RSA PUBLIC KEY`）和 PKCS#8/SPKI PEM（`BEGIN PUBLIC KEY`）文件。也可以使用 `/user/ssh-keys/add key="ssh-ed25519 AAAA..." user=john` 直接粘贴 OpenSSH 格式的密钥；密钥字符串末尾的注释会成为该密钥的 `info`。

私钥导入支持 PKCS#1 PEM（`BEGIN RSA PRIVATE KEY`）和 PKCS#8 文件，包括明文（`BEGIN PRIVATE KEY`）和加密文件（`BEGIN ENCRYPTED PRIVATE KEY`，需要 `passphrase` 参数）：

```ros
/user/ssh-keys/private/import private-key-file=routerkey.pem user=john passphrase=keypass
```

不接受 OpenSSH 格式的私钥（`BEGIN OPENSSH PRIVATE KEY`）。所有属性请参阅 CLI 参考中的 [`/user/ssh-keys`](/docs/cli-reference/user/ssh-keys) 和 [`/user/ssh-keys/private`](/docs/cli-reference/user/ssh-keys/private)。

:::info
公钥指数较弱（7 或更低）的 RSA 密钥仍可继续使用，但会在 `/user/ssh-keys` 和 `/user/ssh-keys/private` 的 print 输出中标记为注释 `key uses insecure RSA public exponent!`。请将此类密钥对替换为强度更高的密钥对。
:::

## RADIUS 认证 {#radius-authentication}

路由器用户的远程 AAA 通过 RADIUS 服务器认证管理登录，并向其发送计费记录。先配置 RADIUS 客户端：添加一条 `service=login` 的 [`/radius`](/docs/cli-reference/radius) 条目，然后启用 [`/user/aaa`](/docs/cli-reference/user/aaa)。RADIUS 服务器可以是任何安装了 [User Manager](/docs/authentication-authorization-accounting/user-manager) 包的 RouterOS：

```ros
# on the RADIUS server
/user-manager/set enabled=yes
/user-manager/router/add name=main address=192.168.88.24 shared-secret=radiusSecret
/user-manager/user/add name=john-remote password=JohnPass456

# on the router the users log in to
/radius/add service=login address=192.168.88.36 secret=radiusSecret
/user/aaa/set use-radius=yes
```

User Manager 默认允许每个用户同时登录一次（`shared-users`）；当第一个会话处于活动状态时，使用相同名称的第二次登录会被拒绝。

仅对本地用户数据库中不存在的用户名查询 RADIUS；同名的本地用户始终优先。通过 RADIUS 认证的用户将获得 `default-group`（默认为 `read`），除非服务器发送 `Mikrotik-Group` 属性指定其他本地组（在 User Manager 中，使用 `attributes="Mikrotik-Group:full"` 在用户上设置该属性）。`exclude-groups` 中列出的组不会被服务器接受，用户将改为获得 `default-group`。

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

有关会话属性，包括 `M`（by-romon）标志和完整的 `via` 列表，请参阅 [`/user/active`](/docs/cli-reference/user/active)。

## 技术细节 {#technical-details}

### 密码过期流程 {#expired-password-flow}

`/user/expire-password` 会在用户上设置 `E` 标志。下次交互式登录时，路由器会打印“Change your password (Ctrl-C to skip)”，然后询问“new password”和“repeat new password”；如果不匹配，则打印“New passwords do not match!”并重复提示。按 <kbd>Control</kbd>+<kbd>C</kbd> 可跳过更改。非交互式会话（通过 SSH 执行命令）不会收到提示。为该用户设置新密码会清除该标志。

### RADIUS 认证和计费 {#radius-authentication-and-accounting}

- 转发到 RADIUS 的密码登录使用 MS-CHAPv2 进行认证（Access-Request 携带 `MS-CHAP-Challenge` 和 `MS-CHAP2-Response`）。
- 使用 `accounting=yes` 时，路由器会在登录时发送 Accounting-Request（Start），在注销时发送（Stop）；`interim-update` 设置会话处于活动状态时 Interim-Update 消息的间隔。管理会话计费不携带带宽计数器。
- `radius` 日志主题会显示交换的确切属性：`/system/logging/add topics=radius`。

## 延伸阅读 {#read-more}

- CLI 参考中的 [`/user`](/docs/cli-reference/user)、[`/user/settings`](/docs/cli-reference/user/settings)、[`/user/group`](/docs/cli-reference/user/group)、[`/user/active`](/docs/cli-reference/user/active)、[`/user/aaa`](/docs/cli-reference/user/aaa)、[`/user/ssh-keys`](/docs/cli-reference/user/ssh-keys)
- [RADIUS 客户端](/docs/authentication-authorization-accounting/radius)
- [User Manager](/docs/authentication-authorization-accounting/user-manager)
- [SSH](/docs/management-tools/ssh)
