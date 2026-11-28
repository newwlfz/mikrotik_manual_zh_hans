---
title: "SSTP"
description: "SSTP 通过 HTTPS 使用 TLS 加密提供安全的远程访问，使 VPN 连接能够穿过防火墙和 NAT 设备。本页详细介绍 MikroTik RouterOS 中的 SSTP 客户端和服务器属性，包括身份验证、加密设置和连接管理选项。"
tags:
  - 'sstp'
  - 'vpn'
  - 'tls'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/sstp
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Secure Socket Tunneling Protocol（SSTP）将 Point-to-Point Protocol（PPP）流量封装在 Transport Layer Security（TLS）会话中，以通过互联网提供安全的远程访问。SSTP 通过 TCP 端口 443 使用 HTTPS，使 VPN 流量能够穿过大多数通常允许标准 Web 流量的防火墙、网络地址转换（NAT）设备和代理服务器。

SSTP 通过 TLS 支持强加密、身份验证和数据完整性，有助于保护传输中的数据免受拦截或篡改。由于它依赖 TCP，SSTP 可以在不稳定的网络条件下提供可靠连接，但与基于 UDP 的 VPN 协议相比，可能会引入额外开销。

SSTP 常用于其他 VPN 协议（如 PPTP、L2TP/IPsec 或非标准端口上的 OpenVPN）可能因网络限制而被阻止的环境。

## 简介 {#introduction}

下面来看 SSTP 连接机制：

![](/img/bf2c8b57ee4c0808.webp)

1. 从客户端到服务器建立 TCP 连接（默认使用端口 443）。
2. SSL 验证服务器证书。如果证书有效，则建立连接；否则拒绝连接。（但请参阅下方说明）。
3. 客户端在 HTTPS 会话中发送 SSTP 控制数据包，在双方建立 SSTP 状态机。
4. 通过 SSTP 进行 PPP 协商。客户端向服务器进行身份验证，并将 IP 地址绑定到 SSTP 接口。

SSTP 隧道现已建立，可以开始封装数据包。

:::warning
从 v5.0beta2 开始，SSTP 不再需要证书即可运行，并且可以使用任何可用的身份验证类型。此功能仅在两台 MikroTik 路由器之间有效，因为它不符合 Microsoft 标准。否则，要建立安全隧道，应使用 **mschap** 身份验证以及来自同一证书链的客户端/服务器证书。

**警告：** 从 7.15beta10 版本开始添加了 TLS SNI 支持。如果选中“Add SNI”复选框或在 CLI 中设置，该扩展将添加到 client hello 数据包中：

`/interface/sstp-client/set` add-sni=yes
:::

## SSTP 客户端 {#sstp-client}

### 属性 {#properties}

|  |  |
| :-- | :-- |
| **authentication** (*chap, mschap1, mschap2, pap*; Default: **"all"**) | 允许的认证方法，默认允许所有方法。 |
| **disabled** (*yes \| no*; Default: **yes**) | 启用或禁用隧道。 |
| **add-default-route** (*yes \| no*; Default: **no**) | 是否将 SSTP 远程地址添加为默认路由。 |
| **default-route-distance** (*byte*; Default: ) | 设置应用于自动创建的默认路由的 distance 值，前提是同时选择 add-default-route。 |
| **mrru** (*integer: 512..65535\|disabled*; Default: **disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或 Ethernet 数据包。 |
| **proxy-port** (*integer*; Default: **443** ) | 设置代理端口。 |
| **add-sni** (*yes \| no*; Default: **no**) | 启用或禁用服务。 |
| **dial-on-demand** (*yes \| no*; Default: **no**) | 仅在产生出站流量时连接。选择后，在连接未建立期间，将添加一条网关地址来自 10.112.112.0/24 网络的路由。 |
| **name** (*string*; Default: ) | 接口的描述性名称。 |
| **tls-version**(*any*\|*only-1.2*; Default: **any**) | 指定允许的 TLS 版本。 |
| **numbers** (*integer;*) | 设置 ROS 中隧道的编号。 |
| **user** (*string*; Default: ) | 用于认证的用户名。 |
| **certificate** (*string*\|*none*; Default: **none**) | 客户端证书名称。 |
| **http-proxy** (*string*; Default: ) | 代理地址字段。 |
| **password** (*string*; Default: **""**) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于认证的密码。 |
| **verify-server-address-from-certificate** (*yes\|no*; Default: **no**) | SSTP 客户端将验证证书中的服务器地址。 |
| **verify-server-certificate** (*yes\|no*; Default: **no**) | SSTP 客户端将验证服务器证书。 |
| **ciphers** (aes256-gcm-sha384 \| aes256-sha; Default: **all**) | 允许的加密算法。 |
| **keepalive-timeout** (*integer*; Default:**60**) | 设置 keepalive 超时时间，单位为秒。 |
| **pfs** (*yes \| no \| required* ; Default: **no**) | 指定使用哪种 TLS 认证。使用 pfs=yes 时，TLS 将使用 ECDHE-RSA- 和 DHE-RSA-。为获得最高安全性，设置 pfs=required 将仅使用 ECDHE。 |
| **comment** (*string*; Default: ) | 隧道的简短描述。 |
| **max-mru** (*integer*; Default: **1500**) | 最大接收单元。 |
| **max-mtu** (*integer*; Default: **1500**) | 最大传输单元。 |
| **port** (*integer*; Default: **443**) | 要连接的端口。 |
| **connect-to** (*IP\|IPv6*; Default: ) | SSTP 服务器的远程地址。 |
| **profile** (*name*; Default: **default**) | 指定建立隧道时使用的 PPP profile 配置。 |

## SSTP 服务器 {#sstp-server}

### 属性 {#properties-1}

|  |  |
| :-- | :-- |
| **authentication** (*chap, mschap1, mschap2, pap*; Default: **"all"**) | 允许的认证方法，默认允许所有方法。 |
| **keepalive-timeout** (*integer*; Default:**60**) | 设置 keepalive 超时时间，单位为秒。 |
| **port** (*string*; Default: **443** ) | 设置使用的端口。 |
| **certificate** (*string*\|*none*; Default: **none**) | 使用的证书名称。 |
| **max-mru** (*integer*; Default: **1500**) | 最大接收单元。 |
| **max-mtu** (*integer*; Default: **1500**) | 最大传输单元。 |
| **tls-version**(*any*\|*only-1.2*; Default: **any**) | 指定允许的 TLS 版本。 |
| **ciphers** (aes256-gcm-sha384 \| aes256-sha; Default: **all**) | 允许的加密算法。 |
| **verify-client-certificate** (*yes\|no*; Default: **no**) | SSTP 服务器将验证客户端证书。 |
| **mrru** (*integer: 512..65535\|disabled*; Default: **disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或 Ethernet 数据包。 |
| **default-profile** (*name*; Default: **default**) | 指定建立隧道时使用的 PPP profile 配置。 |
| **enabled** (*yes \| no*; Default: **no**) | 启用或禁用该服务。 |
| **pfs** (*yes \| no \| required* ; Default: **no**) | 指定使用的 TLS 认证。使用 pfs=yes 时，TLS 将使用 ECDHE-RSA- 和 DHE-RSA-。为获得最高安全性，设置 pfs=required 将仅使用 ECDHE。 |

## 证书 {#certificates}

要建立安全的 SSTP 隧道，需要证书。在服务器上，认证仅通过用户名和密码完成，而在客户端上，服务器通过服务器证书进行认证。客户端还使用它以加密方式绑定 SSL 和 PPP 认证，即客户端通过 SSTP 连接向服务器发送一个特殊值，该值由 PPP 认证期间生成的密钥数据和服务器证书派生。这使服务器能够检查两个通道是否都安全。

如果 SSTP 客户端位于 Windows PC 上，则使用自签名证书时建立安全 SSTP 隧道的唯一方法是，在 SSTP 服务器上导入“server”证书，并在 Windows PC 上将 CA 证书添加到[受信任的根证书](https://technet.microsoft.com/en-us/library/dd458982.aspx)。

:::warning
如果服务器证书由 Windows 已知晓的 CA 颁发，则 Windows 客户端无需向受信任的根证书导入任何额外证书即可工作。

**注意：** 如果证书由 SSTP 使用，则 RSA 密钥长度必须至少为 472 位。较短的密钥被视为安全威胁。
:::

在 RouterOS 客户端上的类似配置是导入 CA 证书并启用 verify-server-certificate 选项。在此场景下，中间人攻击无法实施。

在两台 MikroTik 路由器之间，也可以完全不使用证书来建立不安全隧道。在这种情况下，通过 SSTP 隧道传输的数据使用匿名 DH，中间人攻击很容易实施。该场景与 Windows 客户端不兼容。

也可以通过添加客户端证书进行额外授权来建立安全的 SSTP 隧道。配置要求如下：

- 服务器和客户端上均有证书。
- 服务器和客户端上均启用了验证选项。

此场景在 Windows 客户端上也不可实现，因为无法在 Windows 上设置客户端证书。

#### 证书错误消息 {#certificate-error-messages}

当 SSL 握手失败时，将看到以下证书错误之一：

- **Certificate is not yet valid** - notBefore 证书日期晚于当前时间。
- **Certificate has expired** - 证书到期日期早于当前时间。
- **Invalid certificate purpose** - 提供的证书不能用于指定用途。
- **Self signed certificate in a chain** - 可以使用不受信任的证书构建证书链，但无法在本地找到根证书。
- **Unable to get issuer certificate locally** - 本地未导入 CA 证书。
- **Server's IP address does not match certificate** - 已启用服务器地址验证，但证书中提供的地址与服务器地址不匹配。

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

**重要：** 与任何其他 ppp 隧道一样，SSTP 也支持 BCP，可将其与本地接口桥接到 SSTP 隧道。例如，在路由器通过 ether1 连接到 Internet，工作站和笔记本电脑连接到 ether2 的设置中。两个本地网络都通过 SSTP 客户端路由，并且它们不在同一广播域中。此时使用 BCP。
:::
