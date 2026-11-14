---
sidebar_key: "virtual-private-networks/sstp"
sidebar_position: 10
title: "SSTP"
sidebar_label: "SSTP"
description: "SSTP 使用 TLS 加密通过 HTTPS 提供安全的远程访问，使 VPN 连接能够穿过防火墙和 NAT 设备。本页面详细介绍了 SSTP 客户端和服务器属性，包括身份验证、加密设置以及 MikroTik RouterOS 的连接管理选项。"
tags:
  - 'sstp'
  - 'vpn'
  - 'tls'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/sstp
captured_at: '2026-11-04T11:34:48+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Secure Socket Tunneling Protocol (SSTP) 将 Point-to-Point Protocol (PPP) 流量封装在 Transport Layer Security (TLS) 会话中，以通过互联网提供安全的远程访问。SSTP 通过 TCP 端口 443 使用 HTTPS，使 VPN 流量能够穿过大多数防火墙、网络地址转换（NAT）设备和通常允许标准 Web 流量的代理服务器。

SSTP 通过 TLS 支持强加密、认证和数据完整性，有助于保护传输中的数据免受拦截或篡改。由于依赖 TCP，SSTP 可以在不稳定的网络条件下提供可靠连接，尽管与基于 UDP 的 VPN 协议相比，它可能会引入额外开销。

SSTP 常用于其他 VPN 协议（例如 PPTP、L2TP/IPsec，或运行在非标准端口上的 OpenVPN）可能被网络限制阻止的环境。

## 简介 {#introduction}

让我们看一下 SSTP 连接机制：

![](/img/bf2c8b57ee4c0808.webp)

1. 从客户端到服务器建立 TCP 连接（默认使用端口 443）。
2. SSL 验证服务器证书。如果证书有效，则建立连接；否则，连接将被拒绝。（但请参见下面的注释）。
3. 客户端在 HTTPS 会话内发送 SSTP 控制数据包，从而在两端建立 SSTP 状态机。
4. 通过 SSTP 进行 PPP 协商。客户端向服务器认证，并将 IP 地址绑定到 SSTP 接口。

此时 SSTP 隧道已建立，可以开始数据包封装。

:::warning
从 v5.0beta2 开始，SSTP 无需证书即可运行，并且可以使用任何可用的认证类型。此功能仅在两台 MikroTik 路由器之间有效，因为它不符合 Microsoft 标准。否则，要建立安全隧道，应使用 **mschap** 认证以及来自同一证书链的客户端/服务器证书。

**警告：** 从 7.15beta10 版本开始已添加 TLS SNI 支持；如果勾选 "Add SNI" 复选框或在 CLI 中设置，则扩展会被添加到 Client Hello 数据包中：

`/interface/sstp-client/set` add-sni=yes
:::

## SSTP 客户端 {#sstp-client}

### 属性 {#properties}

|  |  |
| :-- | :-- |
| **authentication** (*chap, mschap1, mschap2, pap*; 默认： **"all"**) | 允许的认证方法，默认允许所有方法。 |
| **disabled** (*yes \| no*; 默认： **yes**) | 启用/禁用隧道。 |
| **add-default-route** (*yes \| no*; 默认： **no**) | 是否将 SSTP 远程地址添加为默认路由。 |
| **default-route-distance** (*byte*; 默认： ) | 如果同时选择了 add-default-route，则设置应用于自动创建的默认路由的距离值。 |
| **mrru** (*integer: 512..65535\|disabled*; 默认： **disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，它将被拆分为多个数据包，从而允许通过隧道发送全尺寸 IP 或以太网数据包。 |
| **proxy-port** (*integer*; 默认： **443** ) | 设置代理端口。 |
| **add-sni** (*yes \| no*; 默认： **no**) | 启用/禁用服务。 |
| **dial-on-demand** (*yes \| no*; 默认： **no**) | 仅在产生出站流量时连接。如果选择此项，则在连接尚未建立时会添加一条网关地址来自 10.112.112.0/24 网络的路由。 |
| **name** (*string*; 默认： ) | 接口的描述性名称。 |
| **tls-version**(*any*\|*only-1.2*; 默认： **any**) | 指定允许使用的 TLS 版本。 |
| **numbers** (*integer;*) | 设置 ROS 中隧道的编号。 |
| **user** (*string*; 默认： ) | 用于认证的用户名。 |
| **certificate** (*string*\|*none*; 默认： **none**) | 客户端证书的名称 |
| **http-proxy** (*string*; 默认： ) | 代理地址字段。 |
| **password** (*string*; 默认： **""**) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于认证的密码。 |
| **verify-server-address-from-certificate** (*yes\|no*; 默认： **no**) | SSTP 客户端将验证证书中的服务器地址。 |
| **verify-server-certificate** (*yes\|no*; 默认： **no**) | SSTP 客户端将验证服务器证书。 |
| **ciphers** (aes256-gcm-sha384 \| aes256-sha; 默认： **all**) | 允许的加密套件。 |
| **keepalive-timeout** (*integer*; 默认：**60**) | 设置 keepalive 超时时间，单位为秒。 |
| **pfs** (*yes \| no \| required* ; 默认： **no**) | 指定使用哪种 TLS 认证。当 pfs=yes 时，TLS 将使用 ECDHE-RSA- 和 DHE-RSA-。为获得最高安全性，设置 pfs=required 将仅使用 ECDHE。 |
| **comment** (*string*; 默认： ) | 隧道的简短描述。 |
| **max-mru** (*integer*; 默认： **1500**) | 最大接收单元。 |
| **max-mtu** (*integer*; 默认： **1500**) | 最大传输单元。 |
| **port** (*integer*; 默认： **443**) | 要连接的端口。 |
| **connect-to** (*IP\|IPv6*; 默认： ) | SSTP 服务器的远程地址。 |
| **profile** (*name*; 默认： **default**) | 指定建立隧道时将使用哪个 PPP 配置文件。 |

## SSTP 服务器 {#sstp-server}

### 属性 {#properties-1}

|  |  |
| :-- | :-- |
| **authentication** (*chap, mschap1, mschap2, pap*; 默认： **"all"**) | 允许的认证方法，默认允许所有方法。 |
| **keepalive-timeout** (*integer*; 默认：**60**) | 设置 keepalive 超时时间，单位为秒。 |
| **port** (*string*; 默认： **443** ) | 设置使用的端口。 |
| **certificate** (*string*\|*none*; 默认： **none**) | 正在使用的证书名称。 |
| **max-mru** (*integer*; 默认： **1500**) | 最大接收单元。 |
| **max-mtu** (*integer*; 默认： **1500**) | 最大传输单元。 |
| **tls-version**(*any*\|*only-1.2*; 默认： **any**) | 指定允许使用的 TLS 版本。 |
| **ciphers** (aes256-gcm-sha384 \| aes256-sha; 默认： **all**) | 允许的加密套件。 |
| **verify-client-certificate** (*yes\|no*; 默认： **no**) | SSTP 服务器将验证客户端证书。 |
| **mrru** (*integer: 512..65535\|disabled*; 默认： **disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，它将被拆分为多个数据包，从而允许通过隧道发送全尺寸 IP 或以太网数据包。 |
| **default-profile** (*name*; 默认： **default**) | 指定建立隧道时将使用哪个 PPP 配置文件。 |
| **enabled** (*yes \| no*; 默认： **no**) | 启用/禁用服务。 |
| **pfs** (*yes \| no \| required* ; 默认： **no**) | 指定使用哪种 TLS 认证。当 pfs=yes 时，TLS 将使用 ECDHE-RSA- 和 DHE-RSA-。为获得最高安全性，设置 pfs=required 将仅使用 ECDHE。 |

## 证书 {#certificates}

要建立安全的 SSTP 隧道，需要使用证书。在服务器端，仅通过用户名和密码进行认证，但在客户端，服务器使用服务器证书进行认证。客户端还使用该证书以密码学方式绑定 SSL 和 PPP 认证，这意味着客户端通过 SSTP 连接向服务器发送一个特殊值，该值派生自 PPP 认证期间生成的密钥数据和服务器证书。这允许服务器检查两个通道是否都安全。

如果 SSTP 客户端位于 Windows PC 上，那么在使用自签名证书时，建立安全 SSTP 隧道的唯一方法是在 SSTP 服务器上导入 "server" 证书，并在 Windows PC 的[受信任根](https://technet.microsoft.com/en-us/library/dd458982.aspx)中添加 CA 证书。

:::warning
如果您的服务器证书由 Windows 已知的 CA 颁发，那么 Windows 客户端无需向受信任根额外导入任何证书即可工作。

**注意：** 如果证书由 SSTP 使用，RSA 密钥长度必须至少为 472 位。较短的密钥被视为安全威胁。
:::

在 RouterOS 客户端上的类似配置是导入 CA 证书并启用 verify-server-certificate 选项。在此场景中，无法进行中间人攻击。

在两台 Mikrotik 路由器之间，也可以完全不使用证书来建立不安全的隧道。在这种情况下，经过 SSTP 隧道的数据使用匿名 DH，中间人攻击很容易得手。此场景与 Windows 客户端不兼容。

也可以通过使用客户端证书添加额外授权来建立安全的 SSTP 隧道。配置要求如下：

- 服务器和客户端均需证书。
- 服务器和客户端均启用验证选项。

此场景也无法用于 Windows 客户端，因为无法在 Windows 上设置客户端证书。

#### 证书错误消息 {#certificate-error-messages}

当 SSL 握手失败时，您将看到以下证书错误之一：

- **证书尚未生效** - 证书的 notBefore 日期晚于当前时间。
- **证书已过期** - 证书到期日期早于当前时间。
- **证书用途无效** - 提供的证书不能用于指定用途。
- **证书链中存在自签名证书** - 证书链可以使用不受信任的证书构建，但无法在本地找到根证书。
- **无法在本地获取颁发者证书** - CA 证书未在本地导入。
- **服务器 IP 地址与证书不匹配** - 已启用服务器地址验证，但证书中提供的地址与服务器地址不匹配。

## 快速示例 {#quick-example}

![](/img/4d5265d637905a20.webp)

### SSTP 客户端 {#sstp-client-1}

在以下配置示例中，我们将创建一个不使用证书的简单 SSTP 客户端：

```ros
[admin@MikroTik] > /interface/sstp-client/add connect-to=192.168.62.2 disabled=no name=sstp-out1 password=StrongPass profile=default-encryption user=MT-User
[admin@MikroTik] > /interface/sstp-client/print
```

Flags: X - disabled; R - running
 0  R name="sstp-out1" max-mtu=1500 max-mru=1500 mrru=disabled connect-to=192.168.62.2:443
      http-proxy=0.0.0.0:443 certificate=none verify-server-certificate=no
      verify-server-address-from-certificate=yes user="MT-User" password="StrongPass"
      profile=default-encryption keepalive-timeout=60 add-default-route=no dial-on-demand=no
      authentication=pap,chap,mschap1,mschap2 pfs=no tls-version=any

```

### SSTP Server

We will configure PPP secret for a particular user, and afterwards simply enable an SSTP server:

```ros
[admin@MikroTik] > /ppp/secret/add local-address=10.0.0.1 name=MT-User password=StrongPass remote-address=10.0.0.5 service=sstp
[admin@MikroTik] > /interface/sstp-server/server/set default-profile=default-encryption enabled=yes
[admin@MikroTik] > /interface/sstp-server/server/print
                    enabled: yes
                       port: 443
                    max-mtu: 1500
                    max-mru: 1500
                       mrru: disabled
          keepalive-timeout: 60
            default-profile: default-encryption
             authentication: pap,chap,mschap1,mschap2
                certificate: none
  verify-client-certificate: no
                        pfs: no
                tls-version: any
```

:::info
在 P2P 设置中，网络地址将与其他端点的本地地址相同。

**重要：** 与任何其他 PPP 隧道一样，SSTP 也支持 BCP，这允许它将 SSTP 隧道与本地接口桥接。例如，在路由器通过 ether1 连接到互联网、工作站和笔记本电脑连接到 ether2 的设置中，两个本地网络都通过 SSTP 客户端路由，并且它们不在同一广播域中。此处使用了 BCP。
:::
