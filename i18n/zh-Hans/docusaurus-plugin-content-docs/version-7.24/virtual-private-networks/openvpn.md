---
sidebar_key: "virtual-private-networks/openvpn"
sidebar_position: 7
title: "OpenVPN"
sidebar_label: "OpenVPN"
description: "OpenVPN 是一种安全的 VPN 协议，提供二层/三层隧道、IPv4/IPv6 支持，以及灵活的传输协议（UDP/TCP）。它支持客户端-服务器部署，具备可配置的身份验证、加密算法和路由管理。RouterOS 上的 OpenVPN 存在一些限制，例如缺少 LZO 压缩和 NCP 自动协商，同时提供基于 TLS 的身份验证以及可导入的"
tags:
  - 'openvpn'
  - 'tls'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/openvpn
captured_at: '2026-11-04T11:34:48+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

OpenVPN 是一种基于 SSL/TLS 安全模型的 VPN 协议，广泛用于在不受信任的网络上提供安全的远程访问和站点到站点连接。它支持二层和三层隧道模式，可根据部署需求传输以太网帧或路由 IP 流量。

OpenVPN 同时支持 IPv4 和 IPv6 流量，并可跨多种网络拓扑运行。

OpenVPN 可用于多种平台，包括 Linux、Windows、macOS 和其他操作系统。其配置结构在各平台间基本一致，从而简化了混合环境中的部署、维护和互操作。

OpenVPN 可通过 User Datagram Protocol (UDP) 或 Transmission Control Protocol (TCP) 运行，允许管理员选择最适合其网络需求的传输协议。多个 VPN 会话可复用到单个 TCP 或 UDP 端口上。

OpenVPN 还可以通过 HTTP 和 SOCKS 代理服务器运行，这在出站连接受限的网络环境中可能很有用。其灵活性、强大的加密支持以及广泛的平台兼容性使 OpenVPN 成为一种常用的 VPN 解决方案。

## 限制 {#limitations}

ROS 有自己的 OpenVPN 实现，但并非支持所有 OpenVPN 功能，并且并非所有不受支持的功能都会列出。目前，值得注意的不受支持的 OpenVPN 功能包括：

- LZO 压缩。\*\*已弃用\*\* 通常不建议使用压缩。使用压缩的 VPN 隧道容易受到 VORACLE 攻击。
- NCP 自动协商。连接到 ROS OpenVPN 服务器时，必须在 `.ovpn` 文件中指定 cipher。

OpenVPN 用户名限制为 27 个字符，密码限制为 233 个字符。从版本 `7.18_ab253` 开始，密码限制已增加到 1000 个字符。

## OVPN 客户端 {#ovpn-client}

| 属性 | 描述 |
| :-- | :-- |
| **add-default-route** (*yes* \| *no*; 默认：**no**) | 是否将 OVPN 远程地址添加为默认路由。 |
| **auth** (*md5* \| *sha1* \| *null* \| *sha256* \| *sha512*; 默认：**sha1**) | 允许的身份验证方法。 |
| **certificate** (*string* \| *none*; 默认：**none**) | 客户端证书的名称 |
| **cipher** (*null* \| *aes128-cbc* \| *aes128-gcm* \| *aes192-cbc* \| *aes192-gcm* \| *aes256-cbc* \| *aes256-gcm* \| *blowfish128*; 默认：**blowfish128**) | 允许的加密算法。为了使用 GCM 类型的加密算法，必须将 "auth" 参数设置为 "null"，因为如果使用 GCM 加密算法，它也负责 "auth"。 |
| **comment** (*string*; 默认： ) | 条目的描述性名称 |
| **connect-to** (*IP\|IPv6*; 默认： ) | OVPN 服务器的远程地址。 |
| **disabled** (*yes* \| *no*; 默认：**yes**) | 接口是否被禁用。默认情况下为禁用状态。 |
| **mac-address** (*MAC*; 默认： ) | OVPN 接口的 MAC 地址。如果未指定，将自动生成。 |
| **max-mtu** (*integer*; 默认：**1500**) | 最大传输单元。OVPN 接口能够在不进行分片的情况下发送的最大数据包大小。 |
| **mode** (*ip* \| *ethernet*; 默认：**ip**) | 三层或二层隧道模式（也可称为 tun、tap） |
| **name** (*string*; 默认： ) | 接口的描述性名称。 |
| **password** (*string*; 默认：**""**) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于身份验证的密码。密码值长度不应超过 1000 个字符。 |
| **port** (*integer*; 默认：**1194**) | 要连接到的端口。 |
| **profile** (*name*; 默认：**default**) | 指定建立隧道时将使用哪个 PPP 配置文件配置。 |
| **protocol** (*tcp*\| *udp*; 默认：**tcp**) | 指示与远程端点连接时要使用的协议。 |
| **verify-server-certificate**(*yes* \| *no*; 默认：**no**) | 将证书的 CN 或 SAN 与 "connect-to" 参数进行核对。IP 或主机名必须存在于服务器证书中。 |
| **tls-version** (*any*\|*only-1.2*; 默认：**any**) | 指定允许使用哪些 TLS 版本 |
| **use-peer-dns**(*yes* \| *no*; 默认：**no**) | 是否将 OVPN 服务器提供的 DNS 服务器添加到 IP/DNS 配置中。 |
| **route-nopull** (*yes* \| *no*; 默认：**no**) | 指定是否允许 OVPN 服务器向 OVPN 客户端实例路由表添加路由。 |
| **user** (*string*; 默认： ) | 用于身份验证的用户名。 |

也可以从 `.ovpn` 配置文件导入 OVPN 客户端配置。该文件通常由 OVPN 服务器提供，并且已经包含所需配置，因此只需手动配置少量参数。

```ros
/interface/ovpn-client/import-ovpn-configuration ovpn-password=securepassword \
key-passphrase=certificatekeypassphrase ovpn-user=myuserid skip-cert-import=no 
```

OVPN 客户端支持 TLS 身份验证。`tls-auth` 配置只能通过导入 `.ovpn` 配置文件来添加。使用 `tls-auth` 需要生成共享密钥，并且该密钥必须包含在客户端 `.ovpn` 配置文件中。

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

```ros
7.17beta5 added support to allow non-null auth in gcm mode.
```

## Tls-crypt、tls-crypt v2 {#tls-crypt-tls-crypt-v2}

为改进 TLS 身份验证，`tls-crypt` 支持已在版本 `7.17rc3` 中添加。

`tls-crypt` 和 `tls-crypt v2` 仅由 OVPN 客户端在以下设置下支持：

- 服务器配置中使用 `auth SHA256` 且没有 `key-direction`；
- 客户端配置中需要使用 `auth SHA256` 和 `key-direction 1`，身份验证才能正常工作。

## 示例配置文件 {#example-configuration-files}

[client-1.ovpn](pathname:///assets/291241994_client-1.ovpn)
[server-1.conf](pathname:///assets/291241995_server-1.conf)

## OVPN 服务器 {#ovpn-server}

**子菜单：** `/interface/ovpn-server`

为连接到指定服务器的每个隧道创建一个接口。OVPN 服务器配置中有两种类型的接口：

- 静态接口是在需要引用为特定用户创建的特定接口名称时（例如在防火墙规则或其他位置）由管理员手动添加的接口。
- 当用户连接且其用户名与任何现有静态条目都不匹配时，或者匹配的静态条目已经处于活动状态时，动态接口会自动添加到此列表中，因为两个独立的隧道接口不能使用相同名称。

动态接口在用户连接时出现，并在用户断开连接后消失。因此，无法在路由器配置中（例如在防火墙规则中）引用为该用户创建的隧道。如果需要对用户使用持久规则，请创建静态条目。否则，动态配置就足够了。

:::warning
升级到版本 `7.17` 后，由于支持多个服务器，OVPN 服务器会获得自己的配置。

配置中会出现一个已禁用且已分配 MAC 地址的 OVPN 服务器：
`/interface/ovpn-server/server/add mac-address=99:99:99:99:99:99 name=ovpn-server1`

**警告：** 在这两种情况下，都必须正确配置 PPP 用户。静态条目不能替代 PPP 配置。
:::

### 服务器配置 {#server-configuration}

#### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **auth** (*md5* \| *sha1* \| *null* \| *sha256* \| *sha512*; 默认：**sha1,md5,sha256,sha512**) | 服务器将接受的身份验证方法。 |
| **certificate** (*name* \| *none*; 默认：**none**) | OVPN 服务器将使用的证书名称。 |
| **cipher** (*null* \| *aes128-cbc* \| *aes128-gcm* \| *aes192-cbc* \| *aes192-gcm* \| *aes256-cbc* \| *aes256-gcm* \| *blowfish128*; 默认：**aes128-cbc,blowfish128**) | 允许的加密算法。 |
| **default-profile** (*name*; 默认：**default**) | 要使用的默认配置文件。 |
| **disabled** (*yes* \| *no*; 默认：**yes**) | 定义 OVPN 服务器是否启用。 |
| **protocol (*tcp*\| *udp*; 默认：tcp)** | 指示与远程端点连接时要使用的协议。 |
| **keepalive-timeout** (*integer* \| *disabled*; 默认：**60**) | 定义时间周期（以秒为单位），经过该时间后路由器开始每秒发送 keepalive 数据包。如果在该时间段内（即 2 \* keepalive-timeout）没有流量且没有收到 keepalive 响应，则未响应的客户端会被宣布为断开连接 |
| **mac-address** (*MAC*; 默认： ) | 服务器自动生成的 MAC 地址。 |
| **max-mtu** (*integer*; 默认：**1500**) | 最大传输单元。OVPN 接口能够在不进行分片的情况下发送的最大数据包大小。 |
| **mode** (*ip* \| *ethernet*; 默认：**ip**) | 三层或二层隧道模式（也可称为 tun、tap） |
| **name** *(string)* | 服务器名称 |
| **netmask** (*integer*; 默认：**24**) | 应用于客户端的子网掩码。 |
| **port** (*integer*; 默认：**1194**) | 运行服务器的端口。 |
| **require-client-certificate** (*yes* \| *no*; 默认：**no**) | 如果设置为 yes，则服务器会检查客户端证书是否属于同一证书链。 |
| **redirect-gateway** (*def1* \| *disabled* \| *ipv6;* 默认：**disabled**) | 指定 OVPN 客户端必须向路由表添加何种路由。`def1` – 使用此标志可通过 0.0.0.0/1 和 128.0.0.0/1 而不是 0.0.0.0/0 来覆盖默认网关。这样做的好处是覆盖但不消除原始默认网关。`disabled` - 不向 OVPN 客户端发送 redirect-gateway 标志。`ipv6` - 在客户端将 IPv6 路由重定向到隧道中。其工作方式与 def1 标志类似，即添加更具体的 IPv6 路由（2000::/4 和 3000::/4），覆盖整个 IPv6 单播空间。 |
| **enable-tun-ipv6** (y*es* \| *no;* 默认：**no**) | 指定此 OVPN 服务器是否应支持 IPv6 IP 隧道模式。 |
| **ipv6-prefix-len** (*integer;* 默认：**64**) | 在服务器端生成 OVPN 接口时将使用的 IPv6 地址的 IPv6 前缀长度。 |
| **reneg-sec** (*integer;* 默认：**3600)** | 密钥重新协商秒数，即服务器定期为数据通道重新协商密钥的时间。 |
| **push-routes** (*string*; 默认： ) | 推送路由支持已在 7.14 中添加，最大可能输入限制为 1400 个字符或 37 条推送路由。IPv6 支持已在 7.21\_ab220 中添加。 |
| **tls-version** (any\| *only-1.2 ;* 默认：**any** ) | TLS 协议设置。 |
| **tun-server-ipv6** (*IPv6 prefix;* 默认：**::**) | 在服务器端生成 OVPN 接口时将使用的 IPv6 前缀地址。 |
| **user-auth-method** (*mschap2 \| pap ; 默认 **pap***) | 默认使用 pap 身份验证方法；如果希望服务器使用 chap 质询进行身份验证，请在服务器设置中设置 mschap2。 |
| **vrf** () | 用于监听连接尝试的 VRF |

也可以为 OVPN 客户端准备 `.ovpn` 文件，该文件可以轻松导入到终端设备。**服务器必须启用所需的客户端证书选项，导出才能正常工作。**

```ros
/interface/ovpn-server/server/export-client-configuration ca-certificate=ca.crt  client-certificate=cert_e
xport_rw-client.crt  client-cert-key=cert_export_rw-client.key server-address=1.1.1.1 server=ovpn-server1 
```

:::info
路由器的日期处于已安装证书的有效期内非常重要。为避免证书验证问题，请在服务器和客户端上都启用 **NTP** 日期同步。
:::

## 示例 {#example}

### 设置概览 {#setup-overview}

![](/img/0b0a9eebe9f16be2.webp)

假设办公室公网 IP 地址为 `2.2.2.2`，并且两个远程 OVPN 客户端需要访问位于办公室网关后面的 `10.5.8.20` 主机和 `192.168.55.0/24` 网络。

### 创建证书 {#creating-certificates}

所有证书都可以使用证书管理器在 RouterOS 服务器上创建。[参见示例 >>](../authentication-authorization-accounting/certificates.md)

对于最简单的设置，只需要 OVPN 服务器证书。

### 服务器配置 {#server-config}

第一步是创建将从中分配客户端地址的 IP 池，然后创建用户账户。

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

### 推送路由 {#push-route}

推送路由支持已在版本 `7.14` 中添加。最大输入限制为 \*\*1400\*\* 个字符或 37 条路由。IPv6 支持已在版本 `7.21_ab220` 中添加。  
示例：`route network/IP [netmask] [gateway] [metric]`。

```ros
/interface/ovpn-server/server/set 0 push-routes-ipv6="fdaa::/64,2001:db8::/32"
```

### VRF 支持 {#vrf-support}

从 \*\*版本 7.17\*\* 开始添加了支持，并引入了若干配置更改。如果您使用的是最新版本，请参考此示例：

```ros
      /interface/ovpn-server/server
        add disabled=no certificate=yourcert auth=sha1 cipher=aes128-cbc require-client-certificate=yes protocol=tcp name=ovpn-server1 vrf=main
```
