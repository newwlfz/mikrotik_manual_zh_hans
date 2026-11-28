---
title: "SSH"
description: "RouterOS 内置 SSH 服务器，支持自定义设置，例如 cipher 配置、密钥类型和转发选项。它支持密码和公钥认证，并提供导出/导入主机密钥以及重新生成密钥的命令。可通过为用户导入公钥来启用 PKI 认证。"
tags:
  - 'ssh'
source: https://manual.mikrotik.com/docs/7.24/management-tools/ssh
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## SSH 服务器 {#ssh-server}

RouterOS 内置 SSH（SSH v2）服务器，默认启用，并监听 TCP/22 端口上的传入连接。可以在 [Services](/docs/system-information-and-utilities/services) 菜单下更改端口并禁用该服务器。

### 属性 {#properties}

**子菜单：** `/ip/ssh`

| 属性 | 说明 |
| :-- | :-- |
| **password-authentication** (*yes-if-no-key* \| *yes \| no*; Default: **yes-if-no-key**) | 是否允许在为用户配置公钥授权的同时使用密码登录。 |
| **ciphers** (*3des-cbc *\| aes-cbc \| aes-ctr \| aes-gcm \| auto \| null*;* Default: **auto**) | 允许配置 SSH 加密算法。 |
| **forwarding-enabled** (*both \| local \| no \| remote*; Default: **no**) | 控制允许使用哪种 SSH 转发方式：<ul><li>no - 禁用 SSH 转发；</li><li>local - 允许 SSH 客户端从服务器（路由器）发起连接，该设置也控制动态转发；</li><li>remote - 允许 SSH 客户端在服务器（路由器）上监听并转发传入连接；</li><li>both - 允许本地和远程转发方式。</li></ul> |
| **host-key-size** (*1024 \| 1536 \| 2048 \| 4096 \| 8192*; Default: **2048**) | 重新生成主机密钥时使用的 RSA 密钥大小。 |
| **host-key-type** (*ed25519* \| *rsa*; Default: **rsa**) | 选择主机密钥类型 |
| **publickey-authentication-options**  (*none* \| *touch-required* \| *verify-required*; Default: **none**) | 设置公钥认证选项。 <br/> touch-required 选项使使用 FIDO 认证器算法的公钥认证始终要求签名证明用户在场并明确确认了认证（通常通过触摸认证器）。 <br/> verify-required 选项要求 FIDO 密钥签名证明用户已通过验证，例如通过 PIN。 |
| **strong-crypto** (*yes \| no*; Default: **no**) | 使用更强的加密、HMAC 算法和更大的 DH 素数，并禁用较弱的算法：<ul><li>使用 256 位和 192 位加密，而不是 128 位；</li><li>禁用 null 加密；</li><li>使用 sha256 进行哈希，而不是 sha1；</li><li>禁用 md5；</li><li>Diffie-Hellman 交换使用 2048 位素数，而不是 1024 位。</li></ul> |

### 命令 {#commands}

**export-host-key** (*key-file-prefix*)

将 RSA/Ed25519 公钥和私钥导出到文件。该命令接受两个参数：

- **key-file-prefix** - 生成文件使用的前缀，例如，前缀“my”将生成文件“my_rsa”、“my_rsa.pub”等。
- **passphrase** - 私钥口令 [sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)

:::info
主机密钥以 PKCS#8 格式导出。

**Warning:** 导出 SSH 主机密钥需要“sensitive”用户策略。
:::

---

**import-host-key** (*private-key-file*)

从指定文件导入并替换 RSA/Ed25519 私钥。该命令接受两个参数：

- **private-key-file** - RSA/Ed25519 私钥文件的名称
- **passphrase** - 私钥口令 [sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)

:::info
私钥支持 PEM 或 PKCS#8 格式。
:::

---

**regenerate-host-key** ()

在路由器上生成并替换当前的私钥集（RSA/Ed25519）。请注意，之前导入的密钥可能会停止工作。

### 启用 PKI 身份验证 {#enabling-pki-authentication}

为 **admin** 用户导入公钥的示例

[在客户端设备上获取 SSH 密钥对](#log-in-using-ssh-key)（你将从中连接的设备）。将 SSH 公钥上传到路由器并导入。

有关支持的 SSH 密钥的更多信息，请参阅 [User SSH keys](/docs/authentication-authorization-accounting/user#ssh-keys) 部分。

```ros
/user/ssh-keys/import public-key-file=id_rsa.pub user=admin
```

### SSH 密钥对生成 {#ssh-key-pair-generation}

RouterOS 不支持直接生成 SSH 密钥，Linux 系统支持该操作。

要获取 SSH 密钥对（SSH 密钥对在首次 SSH 连接时自动生成），必须[导出](#commands)设备的 SSH 主机密钥。

## SSH 客户端 {#ssh-client}

**子菜单：** `/system/ssh`

### **简单登录远程主机** {#simple-log-in-to-remote-host}

可连接远程主机并启动 ssh 会话。IP 地址支持 IPv4 和 IPv6。

```ros
/system/ssh 192.168.88.1
/system/ssh 2001:db8:add:1337::beef
```

在这种情况下，提供给远程主机的用户名是已登录路由器的用户名。如果需要其他值，则必须使用 *user=\<username>*。

```ros
/system/ssh 192.168.88.1 user=lala
/system/ssh 2001:db8:add:1337::beef user=lala
```

### **从路由器指定 IP 地址登录** {#log-in-from-certain-ip-address-of-the-router}

出于测试或安全原因，可能需要使用连接的特定源地址登录另一台主机。在这种情况下，必须使用 *src-address=\<ip address>* 参数。请注意，此处的 IP 地址支持 IPv4 和 IPv6。

```ros
/system/ssh 192.168.88.1 src-address=192.168.89.2
/system/ssh 2001:db8:add:1337::beef src-address=2001:db8:bad:1000::2
```

在这种情况下，ssh 客户端将尝试绑定到指定地址，然后发起与远程主机的 ssh 连接。

### **使用 SSH 密钥登录** {#log-in-using-ssh-key}

为用户 *admin* 导入 RSA 私钥的示例。

首先，将当前生成的 SSH 密钥导出到文件：

```ros
/ip/ssh/export-host-key key-file-prefix=admin
```

将生成两个文件 *admin\_rsa* 和 *admin\_rsa.pub*。pub 文件需要在 SSH 服务器端受信任（[如何在 RouterOS 上启用 SSH PKI](/docs/management-tools/ssh#enabling-pki-authentication)）。必须为特定用户添加私钥。

```ros
/user/ssh-keys/private/import user=admin private-key-file=admin_rsa
```

:::danger
只有对路由器拥有完全权限的用户才能更改 *`/user/ssh-keys/private`* 下的 'user' 属性值
:::

在 SSH 服务器上安装并信任公钥后，可以创建 PKI SSH 会话。

```ros
/system/ssh 192.168.1.1
```

观看操作演示：

使用 [RSA key](http://youtube.com/watch?v=8tt7fSvdFRM) 登录。

使用 [Ed25519](http://youtube.com/watch?v=be-pBwhjRWA) 登录。

### **执行远程命令** {#executing-remote-commands}

要执行远程命令，必须在登录行的末尾提供该命令

```ros
/system/ssh 192.168.88.1 "/ip/address/print"
/system/ssh 192.168.88.1 command="/ip/address/print"
/system/ssh 2001:db8:add:1337::beef "/ip/address/print"
/system/ssh 2001:db8:add:1337::beef command="/ip/address/print"
```

:::danger
*如果服务器不支持 pseudo-tty（ssh -T 或 ssh host command），例如 MikroTik ssh server，则无法通过 SSH 发送多行命令*
:::

例如，向 MikroTik 路由器发送命令 `"/ip/address \n add address=1.1.1.1/24"` 将失败。

:::warning
如果希望通过 **scripts** 或 **scheduler** 执行远程命令，请使用命令 **ssh-exec**。
:::

## SSH exec

**子菜单：** `/system/ssh-exec`

*ssh-exec* 命令是非交互式 ssh 命令，因此允许通过脚本和调度器在设备上远程执行命令。

### **检索信息** {#retrieve-information}

该命令将返回两个值：

- **exit-code**：命令执行成功时返回 0
- **output**：返回远程执行命令的输出

**示例：** 以下代码将从设备 10.10.10.1 检索 ether1 的接口状态，并将结果输出到“Log”

```ros
:local Status ([/system/ssh-exec address=10.10.10.1 user=remote command=":put ([/interface/ethernet/monitor [find where name=ether1] once as-value]->\"status\")" as-value]->"output")
:log info $Status
```

:::warning
出于安全原因，不应在命令行中使用参数 "password" 指定明文密码。为确保远程命令的安全执行，强烈建议在两端用户之间使用 SSH PKI 身份验证。

**注意：** 执行命令的用户组和脚本策略需要 **test** 权限
:::

观看如何[通过 SSH 执行命令](http://youtube.com/watch?v=JfGfPSicTzs)。
