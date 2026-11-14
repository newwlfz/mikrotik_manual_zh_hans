---
sidebar_key: "management-tools/ssh"
sidebar_position: 6
title: "SSH"
sidebar_label: "SSH"
description: "RouterOS 包含内置 SSH 服务器，具有可自定义的设置，例如加密算法配置、密钥类型和转发选项。它支持密码和公钥认证，并提供用于 export/import 主机密钥并重新生成它们的命令。通过为用户导入公钥，可以启用 PKI 认证。"
tags:
  - 'ssh'
source: https://manual.mikrotik.com/docs/7.24/management-tools/ssh
captured_at: '2026-11-04T11:32:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## SSH 服务器 {#ssh-server}

RouterOS 有一个内置的 SSH（SSH v2）服务器，默认启用，并在 TCP/22 端口监听传入连接。可以在 [服务](../system-information-and-utilities/services.md) 菜单下更改端口并禁用服务器。

### 属性 {#properties}

**子菜单：** `/ip/ssh`

| 属性 | 描述 |
| :-- | :-- |
| **password-authentication** (*yes-if-no-key* \| *yes \| no*; 默认：**yes-if-no-key**) | 当为用户配置了公钥授权时，是否同时允许密码登录。 |
| **ciphers** (*3des-cbc *\| aes-cbc \| aes-ctr \| aes-gcm \| auto \| null*;* 默认：**auto**) | 允许配置 SSH 加密算法。 |
| **forwarding-enabled** (*both \| local \| no \| remote*; 默认：**no**) | 允许控制要允许哪种 SSH 转发方法：no - 禁用 SSH 转发；local - 允许 SSH 客户端从服务器（路由器）发起连接，此设置还控制动态转发；remote - 允许 SSH 客户端在服务器（路由器）上监听并转发传入连接；both - 允许本地和远程转发方法。 |
| **host-key-size** (*1024 \| 1536 \| 2048 \| 4096 \| 8192*; 默认：**2048**) | 重新生成主机密钥时使用的 RSA 密钥大小。 |
| **host-key-type** (*ed25519* \| *rsa*; 默认：**rsa**) | 选择主机密钥类型 |
| **publickey-authentication-options**  (*none* \| *touch-required* \| *verify-required*; 默认：**none**) | 设置公钥认证选项。touch-required 选项会使使用 FIDO 认证器算法的公钥认证始终要求签名证明存在物理用户并明确确认了认证（通常通过触摸认证器）。verify-required 选项要求 FIDO 密钥签名证明用户已通过验证，例如通过 PIN。 |
| **strong-crypto** (*yes \| no*; 默认：**no**) | 使用更强的加密、HMAC 算法，使用更大的 DH 素数并禁止较弱的选项：使用 256 和 192 位加密而不是 128 位；禁用 null 加密；使用 sha256 进行哈希而不是 sha1；禁用 md5；使用 2048 位素数进行 Diffie-Hellman 交换而不是 1024 位。 |

### 命令 {#commands}

**export-host-key** (*key-file-prefix*)

将公有和私有 RSA/Ed25519 密钥导出到文件。该命令接受两个参数：

- **key-file-prefix** - 生成文件使用的前缀，例如，前缀 'my' 将生成文件 'my_rsa'、'my_rsa.pub' 等。
- **passphrase** - 私钥口令 [sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)

:::info
主机密钥以 PKCS#8 格式导出。

**警告：** 导出 SSH 主机密钥需要 "sensitive" 用户策略。
:::

---

**import-host-key** (*private-key-file*)

从指定文件导入并替换私有 RSA/Ed25519 密钥。该命令接受两个参数：

- **private-key-file** - 私有 RSA/Ed25519 密钥文件的名称
- **passphrase** - 私钥口令 [sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)

:::info
支持 PEM 或 PKCS#8 格式的私钥。
:::

---

**regenerate-host-key** ()

在路由器上生成新的私钥集（RSA/Ed25519）并替换当前私钥集。请注意，之前导入的密钥可能会停止工作。

### 启用 PKI 认证 {#enabling-pki-authentication}

为用户 **admin** 导入公钥的示例

[在客户端设备上获取 SSH 密钥对](#log-in-using-ssh-key)（你将从中连接的设备）。将 SSH 公钥上传到路由器并导入。

有关受支持 SSH 密钥的更多信息，请参阅 [用户 SSH 密钥](../authentication-authorization-accounting/user.md#ssh-keys) 部分。

```ros
/user/ssh-keys/import public-key-file=id_rsa.pub user=admin
```

### SSH 密钥对生成 {#ssh-key-pair-generation}

RouterOS 不支持 Linux 系统上可用的直接 SSH 密钥生成。

要获取 SSH 密钥对（SSH 密钥对会在首次 SSH 连接时自动生成），必须[导出](#commands)设备的 SSH 主机密钥。

## SSH 客户端 {#ssh-client}

**子菜单：** `/system/ssh`

### **简单登录到远程主机** {#simple-log-in-to-remote-host}

可以连接到远程主机并启动 SSH 会话。该 IP 地址同时支持 IPv4 和 IPv6。

```ros
/system/ssh 192.168.88.1
/system/ssh 2001:db8:add:1337::beef
```

在这种情况下，提供给远程主机的用户名是登录到路由器的那个用户名。如果需要其他值，则必须使用 *user=\<username>*。

```ros
/system/ssh 192.168.88.1 user=lala
/system/ssh 2001:db8:add:1337::beef user=lala
```

### **从路由器的特定 IP 地址登录** {#log-in-from-certain-ip-address-of-the-router}

出于测试或安全原因，可能需要使用连接的特定源地址登录到另一台主机。在这种情况下，必须使用 *src-address=\<ip address>* 参数。请注意，此处的 IP 地址同时支持 IPv4 和 IPv6。

```ros
/system/ssh 192.168.88.1 src-address=192.168.89.2
/system/ssh 2001:db8:add:1337::beef src-address=2001:db8:bad:1000::2
```

在这种情况下，SSH 客户端将尝试绑定到指定的地址，然后向远程主机发起 SSH 连接。

### **使用 SSH 密钥登录** {#log-in-using-ssh-key}

为用户 *admin* 导入 RSA 私钥的示例。

首先，将当前生成的 SSH 密钥导出到文件：

```ros
/ip/ssh/export-host-key key-file-prefix=admin
```

将生成两个文件 *admin\_rsa* 和 *admin\_rsa.pub*。需要在 SSH 服务器端信任 pub 文件（[如何在 RouterOS 上启用 SSH PKI](./ssh.md#enabling-pki-authentication)）。必须为特定用户添加私钥。

```ros
/user/ssh-keys/private/import user=admin private-key-file=admin_rsa
```

:::danger
只有对路由器拥有完全权限的用户才能更改 *`/user/ssh-keys/private`* 下的 'user' 属性值
:::

在 SSH 服务器上安装并信任公钥后，即可创建 PKI SSH 会话。

```ros
/system/ssh 192.168.1.1
```

观看操作方法：

使用 [RSA 密钥](http://youtube.com/watch?v=8tt7fSvdFRM) 登录。

使用 [Ed25519](http://youtube.com/watch?v=be-pBwhjRWA) 登录。

### **执行远程命令** {#executing-remote-commands}

要执行远程命令，必须在登录行末尾提供该命令

```ros
/system/ssh 192.168.88.1 "/ip/address/print"
/system/ssh 192.168.88.1 command="/ip/address/print"
/system/ssh 2001:db8:add:1337::beef "/ip/address/print"
/system/ssh 2001:db8:add:1337::beef command="/ip/address/print"
```

:::danger
*如果服务器不支持 pseudo-tty（ssh -T 或 ssh host command），例如 MikroTik SSH 服务器，则无法通过 SSH 发送多行命令*
:::

例如，向 MikroTik 路由器发送命令 `"/ip/address \n add address=1.1.1.1/24"` 将会失败。

:::warning
如果你想通过 **scripts** 或 **scheduler** 执行远程命令，请使用 **ssh-exec** 命令。
:::

## SSH 执行 {#ssh-exec}

**子菜单：** `/system/ssh-exec`

命令 *ssh-exec* 是一个非交互式 SSH 命令，因此允许通过 scripts 和 scheduler 在设备上远程执行命令。

### **获取信息** {#retrieve-information}

该命令将返回两个值：

- **exit-code**：如果命令执行成功则返回 0
- **output**：返回远程执行命令的输出

**示例：** 下面的代码将从设备 10.10.10.1 获取 ether1 的接口状态，并将结果输出到 "Log"

```ros
:local Status ([/system/ssh-exec address=10.10.10.1 user=remote command=":put ([/interface/ethernet/monitor [find where name=ether1] once as-value]->\"status\")" as-value]->"output")
:log info $Status
```

:::warning
出于安全原因，你不应使用在命令行中指定 "password" 参数的明文密码。为确保远程安全执行命令，强烈建议在两端为用户使用 SSH PKI 认证。

**注意：** 执行该命令的用户组和脚本策略需要 **test** 权限
:::

观看如何[通过 SSH 执行命令](http://youtube.com/watch?v=JfGfPSicTzs)。
