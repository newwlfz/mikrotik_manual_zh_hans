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
source: https://manual.mikrotik.com/docs/virtual-private-networks/sstp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Secure Socket Tunneling Protocol (SSTP) 将 Point-to-Point Protocol (PPP) 流量封装在 Transport Layer Security (TLS) 会话中，以通过互联网提供安全的远程访问。SSTP 通过 TCP 端口 443 使用 HTTPS，使 VPN 流量能够穿过大多数防火墙、网络地址转换（NAT）设备和通常允许标准 Web 流量的代理服务器。

SSTP 通过 TLS 支持强加密、身份验证和数据完整性，有助于保护传输中的数据免遭截获或篡改。由于依赖 TCP，SSTP 可以在不稳定的网络条件下提供可靠的连接，但与基于 UDP 的 VPN 协议相比，它会带来额外的开销。

SSTP 常用于其他 VPN 协议（例如 PPTP、L2TP/IPsec 或使用非标准端口的 OpenVPN）被网络限制阻止的环境。

## 简介 {#introduction}

SSTP 连接机制：

![](/img/bf2c8b57ee4c0808.webp)

1. 从客户端到服务器建立 TCP 连接（默认使用端口 443）。
2. SSL 验证服务器证书。如果证书有效，则建立连接；否则连接被拒绝（参见下面的说明）。
3. 客户端在 HTTPS 会话内发送 SSTP 控制数据包，从而在双方建立 SSTP 状态机。
4. 通过 SSTP 进行 PPP 协商。客户端向服务器进行身份验证，并将 IP 地址绑定到 SSTP 接口。

此时 SSTP 隧道已建立，可以开始数据包封装。

:::warning
从 v5.0beta2 开始，SSTP 无需证书即可运行，并且可以使用任何可用的认证类型。此功能仅在两个 MikroTik 路由器之间有效，因为它不符合 Microsoft 标准。否则，要建立安全隧道，应使用 **mschap** 认证以及来自同一证书链的客户端/服务器证书。

**警告：** 从 7.15beta10 版本开始，已添加 TLS SNI 支持；如果勾选了“Add SNI”复选框或在 CLI 中设置，则会将扩展添加到 client hello 数据包中：

`/interface/sstp-client/set` add-sni=yes
:::

## 证书 {#certificates}

要建立安全的 SSTP 隧道，需要证书。在服务器上，身份验证仅通过用户名和密码完成；而在客户端上，服务器通过服务器证书进行身份验证。客户端还使用该证书以加密方式绑定 SSL 和 PPP 身份验证——客户端通过 SSTP 连接向服务器发送一个特殊值，该值由 PPP 身份验证期间生成的密钥数据和服务器证书派生而来。这使服务器能够检查两个通道是否安全。

如果 SSTP 客户端位于 Windows PC 上，使用自签名证书建立安全 SSTP 隧道的唯一方法是在 SSTP 服务器上导入“服务器”证书，并在 Windows PC 的[受信任根](https://technet.microsoft.com/en-us/library/dd458982.aspx)中添加 CA 证书。

:::warning
如果服务器证书由 Windows 已知的 CA 颁发，则 Windows 客户端无需向受信任根存储额外导入任何证书即可工作。

**注意：** 如果 SSTP 使用证书，RSA 密钥长度必须至少为 472 位。更短的密钥被视为安全威胁。
:::

在 RouterOS 客户端上，类似的配置是导入 CA 证书并启用 verify-server-certificate 选项。在这种情况下，不可能发生中间人攻击。

在两台 MikroTik 路由器之间，也可以建立不带证书的不安全隧道。在这种情况下，通过 SSTP 隧道传输的数据使用匿名 DH，中间人攻击很容易实现。此方案与 Windows 客户端不兼容。

也可以通过使用客户端证书添加额外授权来建立安全的 SSTP 隧道。配置要求如下：

- 服务器和客户端均需证书。
- 服务器和客户端均启用验证选项。

此方案无法用于 Windows 客户端，因为无法在 Windows 上设置客户端证书。

#### 证书错误消息 {#certificate-error-messages}

当 SSL 握手失败时，你会看到以下证书错误之一：

- **证书尚未生效** - 证书的 notBefore 日期晚于当前时间。
- **证书已过期** - 证书到期日期早于当前时间。
- **证书用途无效** - 提供的证书无法用于指定用途。
- **证书链中存在自签名证书** - 证书链可以用不受信任的证书构建，但无法在本地找到根证书。
- **无法在本地获取颁发者证书** - CA 证书未在本地导入。
- **服务器 IP 地址与证书不匹配** - 已启用服务器地址验证，但证书中提供的地址与服务器地址不匹配。

## 快速示例 {#quick-example}

![](/img/4d5265d637905a20.webp)

### SSTP 客户端 {#sstp-client}

此示例创建一个不带证书的简单 SSTP 客户端：

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

Configure a PPP secret for a particular user, then enable the SSTP server:

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
