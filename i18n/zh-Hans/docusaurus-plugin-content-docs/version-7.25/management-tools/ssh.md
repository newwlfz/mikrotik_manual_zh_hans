---
title: "SSH"
description: "RouterOS 内置 SSH 服务器和客户端。服务器可自定义（密码算法、密钥类型、转发、密码和公钥认证），其主机密钥可导出、导入和重新生成。客户端（ssh 和 ssh-exec）会根据已存储的 known hosts 验证远程主机密钥。"
tags:
  - 'ssh'
source: https://manual.mikrotik.com/docs/7.25/management-tools/ssh
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 提供 SSH（SSH v2）服务器，用于远程管理路由器；并提供 SSH 客户端，用于从路由器连接到其他设备。它有两个客户端命令：[`/system/ssh`](/docs/cli-reference/system/ssh) 用于交互式会话和手动命令，[`/system/ssh-exec`](/docs/cli-reference/ip/ssh-exec) 用于脚本和调度器中的非交互式使用。

## SSH 服务器 {#ssh-server}

SSH 服务器默认启用，并在 TCP/22 端口监听传入连接。可以在 [Services](/docs/system-information-and-utilities/services) 菜单下更改端口并禁用服务器。

参数说明请参阅 [`/ip/ssh`](/docs/cli-reference/ip/ssh) CLI 参考。

### 服务器主机密钥 {#server-host-key}

路由器的 SSH 主机密钥会自动生成。使用以下命令显示当前密钥的指纹：

```ros
/ip/ssh/print
```

只读的 `host-key-fingerprint` 值可让管理员确认其连接的是正确的路由器。

使用以下命令创建新的主机密钥对，例如在旧密钥泄露后：

```ros
/ip/ssh/regenerate-host-key
```

更改 `host-key-type` 也会立即重新生成密钥。重新生成后，固定旧密钥的 SSH 客户端会报告指纹不匹配；分发新指纹（`/ip/ssh/print`）或更新固定条目。

:::info
如果主机密钥是公钥指数较弱（7 或更低）的 RSA 密钥，则会自动重新生成 SSH 主机密钥，并记录该事件：

```text
ssh,critical host key uses insecure RSA public exponent! Host key will be regenerated!
```
:::

新安装时默认主机密钥类型为 Ed25519；从旧版 RouterOS 升级的路由器会保留其 RSA 密钥。

使用 [`export-host-key`](/docs/cli-reference/ip/ssh/export-host-key) 和 [`import-host-key`](/docs/cli-reference/ip/ssh/import-host-key) 可将主机密钥迁移到另一台路由器（例如更换硬件时）。导出的文件按 `key-file-prefix` 命名，例如 `key-file-prefix=bbu` 的 RSA 密钥会生成 `bbu_rsa.pem` 和 `bbu_rsa_pub.pem`。

### 使用公钥登录 {#log-in-with-a-public-key}

要为传入连接启用 PKI 身份验证，请导入连接用户的公钥。先在连接设备上生成密钥对（请参阅 [Log in with an SSH key](#log-in-with-an-ssh-key)），将公钥文件上传到路由器，并为该用户导入：

```ros
/user/ssh-keys/import public-key-file=id_rsa.pub user=admin
```

当用户至少分配了一个密钥时，该用户的密码登录将被拒绝（默认 `password-authentication=yes-if-no-key`）。有关支持的密钥格式的更多信息，请参阅 [User SSH keys](/docs/authentication-authorization-accounting/user#ssh-keys) 部分。

## SSH 客户端 {#ssh-client}

交互式 [`/system/ssh`](/docs/cli-reference/system/ssh) 命令通过 SSH 将路由器连接到远程主机。该命令从控制台使用；对于脚本和调度器，请使用 [`ssh-exec`](#run-remote-commands-from-scripts)。

### 登录远程主机 {#log-in-to-a-remote-host}

连接到远程主机并启动 SSH 会话。该地址支持 IPv4 和 IPv6：

```ros
/system/ssh 192.168.88.3
/system/ssh 2001:db8:add:1337::beef
```

该命令会传递你已登录的路由器账户的用户名。使用 `user=<username>` 以其他用户登录：

```ros
/system/ssh 192.168.88.3 user=noc
/system/ssh 2001:db8:add:1337::beef user=noc
```

### 从路由器的指定地址登录 {#log-in-from-a-specific-address-of-the-router}

要从指定源地址登录主机（例如用于防火墙规则或测试），请使用 `src-address=<ip address>` 参数。该地址支持 IPv4 和 IPv6：

```ros
/system/ssh 192.168.88.3 src-address=192.168.89.2
/system/ssh 2001:db8:add:1337::beef src-address=2001:db8:bad:1000::2
```

在这种情况下，SSH 客户端会绑定到指定地址，然后发起与远程主机的 SSH 连接。

### 使用 SSH 密钥登录 {#log-in-with-an-ssh-key}

RouterOS 无法自行生成用户密钥对，因此密钥对必须来自其他位置。可以在管理设备上生成 RSA 或 Ed25519 密钥对，也可以复用路由器自身的主机密钥对：使用 [`/ip/ssh/export-host-key`](/docs/cli-reference/ip/ssh/export-host-key) 导出，并导入导出的私钥文件。

将私钥文件上传到路由器（通过 WinBox 中的 Files 菜单或通过 SFTP），并为发起出站连接的用户导入该文件：

```ros
/user/ssh-keys/private/import user=admin private-key-file=id_rsa
```

只有对路由器拥有完整权限的用户才能更改 `/user/ssh-keys/private` 下的 `user` 属性值。

密钥文件必须为 PEM 格式（PKCS#1、PKCS#8 或加密的 PKCS#8）。OpenSSH 私钥格式（“BEGIN OPENSSH PRIVATE KEY”）的密钥会被拒绝；请使用 `ssh-keygen -m PEM` 生成密钥，或使用 `ssh-keygen -p -m PEM` 转换现有密钥。

对应的公钥必须安装在 SSH 服务器端（对于 RouterOS 服务器，请参阅[使用公钥登录](#log-in-with-a-public-key)）。导入私钥后，SSH 会话无需密码即可登录：

```ros
/system/ssh 192.168.88.3
```

观看如何使用 [RSA 密钥](http://youtube.com/watch?v=8tt7fSvdFRM)或 [Ed25519 密钥](http://youtube.com/watch?v=be-pBwhjRWA)登录。

### 验证远程主机密钥 {#verify-remote-host-keys}

如果不进行验证，SSH 客户端会接受任意主机密钥，这会使连接容易受到路径上攻击者的攻击。客户端主机密钥验证由 [`/ip/ssh`](/docs/cli-reference/ip/ssh) 中的 `known-hosts-validation` 控制：新安装时默认启用；从旧版 RouterOS 升级的路由器会保留之前的设置，因此在你启用之前，这些路由器上的验证仍处于关闭状态。

受信任的服务器密钥保存在 [`/ip/ssh/known-hosts`](/docs/cli-reference/ip/ssh/known-hosts) 中。

启用验证后，交互式客户端在首次连接到新服务器时会询问，并在确认后固定该密钥：

```text
host key not trusted: SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
do you want to trust this host key? <y/n>
```

当服务器随后提供与固定密钥不同的密钥时，客户端不会静默继续，而是询问是否更新已存储的密钥：

```text
host key mismatch for 192.168.88.3
old fingerprint: SHA256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
new fingerprint: SHA256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
do you want to update the host key? <y/n>
```

非交互式命令无法询问：`ssh-exec`（以及通过 SFTP 的 fetch）对于未知或不匹配的服务器会失败，并显示 `host key not trusted`。对于脚本化连接，请预先固定服务器密钥，传递 `known-hosts-ignore=yes` 以跳过该命令的验证，或设置 `known-hosts-trusted-subnets` 以跳过整个子网的验证，例如管理网络。

使用服务器的公钥预先固定其密钥——从服务器管理员处获取 OpenSSH 格式的密钥行（`<type> <base64>`），或从带有 `ssh-keyscan 192.168.88.3` 的工作站获取，然后添加：

```ros
/ip/ssh/known-hosts/add host=192.168.88.3 key="ssh-ed25519 AAAA..." \
    comment="backup server"
```

对交互式客户端的信任提示回答 `y` 会以相同方式固定密钥，因此，在通过交互式 `/system/ssh` 登录并确认密钥一次后，之前因 `host key not trusted` 失败的脚本化 `ssh-exec` 即可正常工作。

禁用验证后，不会询问或存储任何主机密钥，并且接受任意密钥。

### 在远程主机上运行命令 {#run-a-command-on-a-remote-host}

要执行远程命令，请在登录行末尾提供该命令：

```ros
/system/ssh 192.168.88.3 "/ip/address/print"
/system/ssh 192.168.88.3 command="/ip/address/print"
/system/ssh 2001:db8:add:1337::beef "/ip/address/print"
/system/ssh 2001:db8:add:1337::beef command="/ip/address/print"
```

:::note
MikroTik SSH 服务器不提供伪终端（OpenSSH 中的 `ssh -T` 模式）。多行命令，例如 `"/ip/address \n add address=1.1.1.1/24"`，在较旧的 RouterOS 版本上会失败；RouterOS 7.25 及更高版本会执行这些命令。
:::

如果希望通过 **scripts** 或 **scheduler** 执行远程命令，请使用 [`ssh-exec`](/docs/cli-reference/system/ssh-exec) 命令。

## 从脚本运行远程命令 {#run-remote-commands-from-scripts}

`ssh-exec` 命令是非交互式 SSH 命令，允许通过脚本和 scheduler 在远程设备上执行命令。参数说明请参阅 [`ssh-exec`](/docs/cli-reference/system/ssh-exec) CLI 参考。

### 获取信息 {#retrieve-information}

该命令返回两个值：

- **exit-code**：远程命令 shell 报告的退出代码——命令运行时为 `0`；使用 `exit` 的命令会设置该代码。RouterOS 命令失败时，会以错误文本形式返回到 `output` 中
- **output**：返回远程执行命令的输出，包括远程命令失败时的错误消息，例如 `input does not match any value...`

**示例：** 以下代码从设备 10.10.10.1 获取 ether1 的链路状态，并将结果输出到“Log”。该示例假定用户 `remote` 已配置公钥认证（命令行中没有 `password=`），并且已固定服务器主机密钥，这是新安装环境中 [host key verification](#verify-remote-host-keys) 的要求：

```ros
:local res ([/system/ssh-exec address=10.10.10.1 user=remote \
    command=":put ([/interface ethernet monitor ether1 once as-value]->\"status\")" \
    as-value])
:log info ($res->"output")
```

:::warning
不要在命令行中的 `password` 参数里放置明文密码；密码会进入脚本和命令历史。请为两端用户使用 SSH PKI 认证。

执行命令的用户组和脚本策略需要 **test** 权限。
:::

观看如何[通过 SSH 执行命令](http://youtube.com/watch?v=JfGfPSicTzs)。

有关所有参数，请参阅 [`/ip/ssh`](/docs/cli-reference/ip/ssh)、[`/system/ssh`](/docs/cli-reference/system/ssh) 和 [`/system/ssh-exec`](/docs/cli-reference/system/ssh-exec) CLI 参考。
