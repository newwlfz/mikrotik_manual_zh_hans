---
sidebar_key: "virtual-private-networks/openvpn"
sidebar_position: 7
title: "OpenVPN"
sidebar_label: "OpenVPN"
description: "OpenVPN 是一种安全的 VPN 协议，提供二层/三层隧道、IPv4/IPv6 支持，以及灵活的传输协议（UDP/TCP）。它支持客户端-服务器部署，具备可配置的身份验证、加密算法和路由管理。RouterOS 上的 OpenVPN 存在一些限制，例如缺少 LZO 压缩和 NCP 自动协商，同时提供基于 TLS 的身份验证以及可导入的"
tags:
  - 'openvpn'
  - 'tls'
source: https://manual.mikrotik.com/docs/7.25/virtual-private-networks/openvpn
captured_at: '2026-11-04T11:23:15+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

OpenVPN 是一种基于 SSL/TLS 安全模型的 VPN 协议，广泛用于在不受信任的网络上提供安全的远程访问和站点到站点连接。它支持二层和三层隧道模式，可根据部署需求传输以太网帧或路由 IP 流量。

OpenVPN 同时支持 IPv4 和 IPv6 流量，并可跨多种网络拓扑运行。

OpenVPN 可用于多种平台，包括 Linux、Windows、macOS 和其他操作系统。其配置结构在各平台间基本一致，从而简化了混合环境中的部署、维护和互操作。

OpenVPN 可通过 User Datagram Protocol (UDP) 或 Transmission Control Protocol (TCP) 运行，允许管理员选择最适合其网络需求的传输协议。多个 VPN 会话可复用到单个 TCP 或 UDP 端口上。

OpenVPN 还可以通过 HTTP 和 SOCKS 代理服务器运行，这有助于在出站连接受限的网络环境中使用。其灵活性、强大的加密支持以及广泛的平台兼容性，使 OpenVPN 成为一种常用的 VPN 解决方案。

## 限制 {#limitations}

ROS 有自己的 OpenVPN 实现，但并非所有功能都受支持，并且并非所有不受支持的功能都已列出。值得注意的不受支持功能包括：

- LZO 压缩（**已弃用**）。通常不建议使用压缩。使用压缩的 VPN 隧道容易受到 VORACLE 攻击。
- NCP 自动协商。连接到 ROS OpenVPN 服务器时，必须在 `.ovpn` 文件中指定加密算法。

OpenVPN 用户名限制为 27 个字符，密码限制为 1000 个字符。

## tls-crypt、tls-crypt v2 {#tls-crypt-tls-crypt-v2}

为改进 TLS 身份验证，`tls-crypt` 支持已在版本 `7.17rc3` 中添加。

`tls-crypt` 和 `tls-crypt v2` 仅由 OVPN 客户端在以下设置下支持：

- 服务器配置中使用 `auth SHA256` 且没有 `key-direction`。
- 客户端配置中使用 `auth SHA256` 和 `key-direction 1`。

## 示例配置文件 {#example-configuration-files}

[client-1.ovpn](pathname:///assets/291241994_client-1.ovpn)
[server-1.conf](pathname:///assets/291241995_server-1.conf)

## 示例 {#example}

### 设置概览 {#setup-overview}

![](/img/0b0a9eebe9f16be2.webp)

假设办公室公网 IP 地址为 `2.2.2.2`，并且两个远程 OVPN 客户端需要访问位于办公室网关后面的 `10.5.8.20` 主机和 `192.168.55.0/24` 网络。

### 创建证书 {#creating-certificates}

所有证书都可以在 RouterOS 服务器上使用证书管理器创建。[参见示例 >>](../authentication-authorization-accounting/certificates.md)

对于最简单的设置，只需要 OVPN 服务器证书。

### 服务器配置 {#server-config}

第一步是创建用于分配客户端地址的 IP 池，然后创建用户账户。

```ros
/ip/pool/add name=ovpn-pool range=192.168.77.2-192.168.77.254

/ppp/profile/add name=ovpn local-address=192.168.77.1 remote-address=ovpn-pool
/ppp/secret
add name=client1 password=123 profile=ovpn
add name=client2 password=234 profile=ovpn
```

假设服务器证书已经创建，并且名称为 `server`。

```ros
/interface/ovpn-server/server/add disabled=no certificate=server name=myServer
```

也可以为 OVPN 客户端准备 `.ovpn` 文件，该文件可以轻松导入到终端设备。**服务器必须启用所需的客户端证书选项，导出才能正常工作。**

```ros
/interface/ovpn-server/server/export-client-configuration ca-certificate=ca.crt  client-certificate=cert_e
xport_rw-client.crt  client-cert-key=cert_export_rw-client.key server-address=1.1.1.1 server=ovpn-server1 
```

:::info
确保路由器日期位于已安装证书的有效期内。为避免证书验证问题，请在服务器和客户端上都启用 **NTP** 日期同步。
:::

### 客户端配置 {#client-config}

手动添加希望通过隧道访问的网络。

```ros
/interface/ovpn-client
add name=ovpn-client1 connect-to=2.2.2.2 user=client1 password=123 disabled=no
/ip/route 
add dst-address=10.5.8.20 gateway=ovpn-client1
add dst-address=192.168.55.0/24 gateway=ovpn-client1
/ip/firewall/nat/add chain=srcnat action=masquerade out-interface=ovpn-client1
```

也可以从 `.ovpn` 配置文件导入 OVPN 客户端配置。该文件通常由 OVPN 服务器提供，并且已经包含所需配置，因此只需手动配置少量参数。

```ros
/interface/ovpn-client/import-ovpn-configuration ovpn-password=securepassword \
key-passphrase=certificatekeypassphrase ovpn-user=myuserid skip-cert-import=no 
```

OVPN 客户端支持 TLS 认证。`tls-auth` 配置只能通过导入 `.ovpn` 配置文件来添加。tls-auth 需要生成共享密钥，该密钥必须包含在客户端 `.ovpn` 配置文件中。

ROS 客户端需要用户名和密码。身份验证由服务器端管理。如果服务器支持 TLS 身份验证，则用户名会被忽略。

```ros
key-direction 1
<tls-auth>
#
# 2048 bit OpenVPN static key
#
-----BEGIN OpenVPN Static key V1-----
-----END OpenVPN Static key V1-----
</tls-auth>
```

```
non-null auth in GCM mode is supported.
```

### 推送路由 {#push-route}

推送路由支持已在 `7.14` 版本中添加。最大输入限制为 1400 个字符或 37 条路由。IPv6 支持已在 `7.21_ab220` 版本中添加。
示例：`route network/IP [netmask] [gateway] [metric]`。

```ros
/interface/ovpn-server/server/set 0 push-routes-ipv6="fdaa::/64,2001:db8::/32"
```

### VRF 支持 {#vrf-support}

从 7.17 版本开始支持，并引入了若干配置变更。如果您使用的是最新版本，请参考此示例：

```ros
      /interface/ovpn-server/server
        add disabled=no certificate=yourcert auth=sha1 cipher=aes128-cbc require-client-certificate=yes protocol=tcp name=ovpn-server1 vrf=main
```
