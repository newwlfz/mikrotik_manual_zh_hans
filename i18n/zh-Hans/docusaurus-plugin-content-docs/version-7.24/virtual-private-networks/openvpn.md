---
title: "OpenVPN"
description: "OpenVPN 是一种安全的 VPN 协议，提供 Layer 2/3 隧道、IPv4/IPv6 支持以及灵活的传输协议（UDP/TCP）。它支持客户端-服务器部署，并可配置身份验证、加密密码和路由管理。RouterOS 上的 OpenVPN 存在一些限制，例如缺少 LZO 压缩和 NCP 自动协商，同时提供基于 TLS 的身份验证和可导入的"
tags:
  - 'openvpn'
  - 'tls'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/openvpn
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "virtual-private-networks/pppoe"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

OpenVPN 是基于 SSL/TLS 安全模型的 VPN 协议，广泛用于通过不可信网络提供安全的远程访问和站点到站点连接。它支持 Layer 2 和 Layer 3 隧道模式，可根据部署需求传输以太网帧或路由 IP 流量。

OpenVPN 支持 IPv4 和 IPv6 流量，可在多种网络拓扑中运行。

OpenVPN 可用于多个平台，包括 Linux、Windows、macOS 和其他操作系统。其配置结构在各平台之间通常保持一致，从而简化混合环境中的部署、维护和互操作性。

OpenVPN 可通过 User Datagram Protocol（UDP）或 Transmission Control Protocol（TCP）运行，使管理员能够根据网络需求选择最合适的传输协议。多个 VPN 会话可以在单个 TCP 或 UDP 端口上复用。

OpenVPN 也可以通过 HTTP 和 SOCKS 代理服务器运行，这在出站连接受限的网络环境中可能很有用。其灵活性、强大的加密支持和广泛的平台兼容性使 OpenVPN 成为常用的 VPN 解决方案。

## Limitations

ROS 有自己的 OpenVPN 实现，但并非支持所有 OpenVPN 功能，且并未列出所有不支持的功能。目前，值得注意的不支持功能包括：

- LZO 压缩。\*\*已弃用\*\* 通常不建议使用压缩。使用压缩的 VPN 隧道容易受到 VORACLE 攻击。
- NCP 自动协商。连接到 ROS OpenVPN 服务器时，必须在 `.ovpn` 文件中指定 cipher。

OpenVPN 用户名限制为 27 个字符，密码限制为 233 个字符。从 `7.18_ab253` 版本开始，密码限制已提高到 1000 个字符。

## OVPN 客户端 {#ovpn-client}

| 属性 | 说明 |
| :-- | :-- |
| **add-default-route** (*yes* \| *no*；默认值：**no**) | 是否将 OVPN 远程地址添加为默认路由。 |
| **auth** (*md5* \| *sha1* \| *null* \| *sha256* \| *sha512*；默认值：**sha1**) | 允许的认证方法。 |
| **certificate** (*string* \| *none*；默认值：**none**) | 客户端证书名称。 |
| **cipher** (*null* \| *aes128-cbc* \| *aes128-gcm* \| *aes192-cbc* \| *aes192-gcm* \| *aes256-cbc* \| *aes256-gcm* \| *blowfish128*；默认值：**blowfish128**) | 允许的加密算法。要使用 GCM 类型加密算法，必须将“auth”参数设置为“null”，因为使用 GCM 加密算法时，它也负责“auth”。 |
| **comment** (*string*；默认值：) | 项目的描述性名称。 |
| **connect-to** (*IP\|IPv6*；默认值：) | OVPN 服务器的远程地址。 |
| **disabled** (*yes* \| *no*；默认值：**yes**) | 接口是否禁用。默认禁用。 |
| **mac-address** (*MAC*；默认值：) | OVPN 接口的 MAC 地址。如果未指定，将自动生成。 |
| **max-mtu** (*integer*；默认值：**1500**) | 最大传输单元。OVPN 接口无需数据包分片即可发送的最大数据包大小。 |
| **mode** (*ip* \| *ethernet*；默认值：**ip**) | Layer3 或 layer2 隧道模式（也可称为 tun、tap）。 |
| **name** (*string*；默认值：) | 接口的描述性名称。 |
| **password** (*string*；默认值：**""**) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于认证的用户密码。密码值不应超过 1000 个字符。 |
| **port** (*integer*；默认值：**1194**) | 要连接的端口。 |
| **profile** (*name*；默认值：**default**) | 指定建立隧道时使用的 PPP profile 配置。 |
| **protocol** (*tcp*\| *udp*；默认值：**tcp**) | 指定与远程端点连接时使用的协议。 |
| **verify-server-certificate**(*yes* \| *no*；默认值：**no**) | 根据“connect-to”参数检查证书的 CN 或 SAN。IP 或主机名必须存在于服务器证书中。 |
| **tls-version** (*any*\|*only-1.2*；默认值：**any**) | 指定允许的 TLS 版本。 |
| **use-peer-dns**(*yes* \| *no*；默认值：**no**) | 是否将 OVPN 服务器提供的 DNS 服务器添加到 IP/DNS 配置。 |
| **route-nopull** (*yes* \| *no*；默认值：**no**) | 指定是否允许 OVPN 服务器向 OVPN 客户端实例的路由表添加路由。 |
| **user** (*string*；默认值：) | 用于认证的用户名。 |

也可以从 `.ovpn` 配置文件导入 OVPN 客户端配置。该文件通常由 OVPN 服务器提供，并且已包含所需配置，因此只需手动配置少量参数。

```ros
/interface/ovpn-client/import-ovpn-configuration ovpn-password=securepassword \
key-passphrase=certificatekeypassphrase ovpn-user=myuserid skip-cert-import=no 
```

OVPN 客户端支持 TLS 认证。`tls-auth` 配置只能通过导入 `.ovpn` 配置文件添加。使用 `tls-auth` 需要生成共享密钥，该密钥必须包含在客户端 `.ovpn` 配置文件中。

ROS 客户端需要用户名和密码。认证由服务器端管理。如果服务器支持 TLS 认证，则忽略用户名。

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

为改进 TLS 认证，版本 `7.17rc3` 增加了 `tls-crypt` 支持。

`tls-crypt` 和 `tls-crypt v2` 仅受具有以下设置的 OVPN 客户端支持：

- 服务器配置中使用 `auth SHA256`，且不要配置 `key-direction`；
- 客户端配置中必须使用 `auth SHA256` 和 `key-direction 1`，身份验证才能正常工作。

## 配置文件示例 {#example-configuration-files}

[client-1.ovpn](pathname:///assets/291241994_client-1.ovpn)
[server-1.conf](pathname:///assets/291241995_server-1.conf)

## OVPN 服务器 {#ovpn-server}

**子菜单：** `/interface/ovpn-server`

系统会为连接到指定服务器的每个隧道创建一个接口。OVPN 服务器配置中有两种接口类型：

- 静态接口由管理员添加，用于需要引用为特定用户创建的指定接口名称的场景（例如，在防火墙规则或其他位置）。
- 当用户连接且其用户名不匹配任何现有静态条目，或匹配的静态条目已处于活动状态时，动态接口会自动添加到此列表，因为两个独立的隧道接口不能使用相同名称。

动态接口会在用户连接时出现，并在用户断开连接后消失。因此，无法在路由器配置中引用为该用户创建的隧道（例如，在防火墙规则中）。如果用户需要持久规则，请创建静态条目。否则，动态配置即可满足需求。

:::warning
升级到版本 `7.17` 后，由于支持多个服务器，OVPN 服务器会获得自己的配置。

配置中会显示一个已分配 MAC 地址且处于禁用状态的 OVPN 服务器：
`/interface/ovpn-server/server/add mac-address=99:99:99:99:99:99 name=ovpn-server1`

**警告：** 在这两种情况下，都必须正确配置 PPP 用户。静态条目不能替代 PPP 配置。
:::

### 服务器配置 {#server-configuration}

#### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **auth** (*md5* \| *sha1* \| *null* \| *sha256* \| *sha512*; Default: **sha1,md5,sha256,sha512**) | 服务器接受的身份验证方法。 |
| **certificate** (*name* \| *none*; Default: **none**) | OVPN 服务器将使用的证书名称。 |
| **cipher** (*null* \| *aes128-cbc* \| *aes128-gcm* \| *aes192-cbc* \| *aes192-gcm* \| *aes256-cbc* \| *aes256-gcm* \| *blowfish128*; Default: **aes128-cbc,blowfish128**) | 允许的加密算法。 |
| **default-profile** (*name*; Default: **default**) | 要使用的默认配置文件。 |
| **disabled** (*yes* \| *no*; Default: **yes**) | 定义 OVPN 服务器是否启用。 |
| **protocol (*tcp*\| *udp*; Default: tcp)** | 指示与远端端点连接时使用的协议。 |
| **keepalive-timeout** (*integer* \| *disabled*; Default: **60**) | 定义路由器开始每秒发送 keepalive 数据包之前的时间段（以秒为单位）。如果该时间段内没有流量且没有收到 keepalive 响应（即 2 \* keepalive-timeout），则将无响应的客户端判定为已断开连接。 |
| **mac-address** (*MAC*; Default: ) | 服务器自动生成的 MAC 地址。 |
| **max-mtu** (*integer*; Default: **1500**) | 最大传输单元。OVPN 接口无需数据包分片即可发送的最大数据包大小。 |
| **mode** (*ip* \| *ethernet*; Default: **ip**) | Layer3 或 layer2 隧道模式（也可称为 tun、tap）。 |
| **name** *(string)* | 服务器名称。 |
| **netmask** (*integer*; Default: **24**) | 应用于客户端的子网掩码。 |
| **port** (*integer*; Default: **1194**) | 服务器运行所用的端口。 |
| **require-client-certificate** (*yes* \| *no*; Default: **no**) | 如果设置为 yes，服务器将检查客户端证书是否属于同一证书链。 |
| **redirect-gateway** (*def1* \| *disabled* \| *ipv6;* Default: **disabled**) | 指定 OVPN 客户端必须添加到路由表中的路由类型。<br/><code>def1</code> – 使用该标志可通过 0.0.0.0/1 和 128.0.0.0/1 覆盖默认网关，而不是使用 0.0.0.0/0。其优点是覆盖原默认网关但不会清除它。<code>disabled</code> - 不向 OVPN 客户端发送 redirect-gateway 标志。<code>ipv6</code> - 在客户端将 IPv6 路由重定向到隧道中。其工作方式类似于 def1 标志，即添加更具体的 IPv6 路由（2000::/4 和 3000::/4），覆盖整个 IPv6 单播空间。 |
| **enable-tun-ipv6** (y*es* \| *no;* Default: **no**) | 指定此 OVPN 服务器是否可以使用 IPv6 IP 隧道模式。 |
| **ipv6-prefix-len** (*integer;* Default: **64**) | 在服务器端生成 OVPN 接口时所用 IPv6 地址的 IPv6 前缀长度。 |
| **reneg-sec** (*integer;* Default: **3600)** | 密钥重新协商秒数，即服务器定期重新协商数据通道密钥的时间。 |
| **push-routes** (*string*; Default: ) | 7.14 中添加了推送路由支持，最大输入限制为 1400 个字符或 37 条推送路由。7.21\_ab220 中添加了 IPv6 支持。 |
| **tls-version** (any\| *only-1.2 ;* Default: **any** ) | TLS 协议设置。 |
| **tun-server-ipv6** (*IPv6 prefix;* Default: **::**) | 在服务器端生成 OVPN 接口时使用的 IPv6 前缀地址。 |
| **user-auth-method** (*mschap2 \| pap ; Default **pap***) | 默认使用 pap 身份验证方法，如果希望服务器使用 chap challenge 身份验证，请在服务器设置中设置 mschap2。 |
| **vrf** () | 用于监听连接尝试的 VRF。 |

还可以为 OVPN 客户端准备 `.ovpn` 文件，该文件可轻松导入到终端设备。**服务器必须启用所需的客户端证书选项，导出才能正常工作。**

```ros
/interface/ovpn-server/server/export-client-configuration ca-certificate=ca.crt  client-certificate=cert_e
xport_rw-client.crt  client-cert-key=cert_export_rw-client.key server-address=1.1.1.1 server=ovpn-server1 
```

:::info
路由器的日期必须处于已安装证书的有效期内，这一点非常重要。为避免证书验证问题，请在服务器和客户端上均启用 **NTP** 日期同步。
:::

## 示例 {#example}

### 设置概述 {#setup-overview}

![](/img/0b0a9eebe9f16be2.webp)

假设办公室的公网 IP 地址为 `2.2.2.2`，两个远程 OVPN 客户端需要访问办公室网关后面的 `10.5.8.20` 主机和 `192.168.55.0/24` 网络。

### 创建证书 {#creating-certificates}

所有证书都可以在 RouterOS 服务器上使用证书管理器创建。[参见示例 >>](/docs/authentication-authorization-accounting/certificates)

对于最简单的设置，只需要一个 OVPN 服务器证书。

### 服务器配置 {#server-config}

第一步是创建一个 IP 池，用于分配客户端地址，然后创建用户账户。

```ros
/ip/pool/add name=ovpn-pool range=192.168.77.2-192.168.77.254

/ppp/profile/add name=ovpn local-address=192.168.77.1 remote-address=ovpn-pool
/ppp/secret
add name=client1 password=123 profile=ovpn
add name=client2 password=234 profile=ovpn
```

假设服务器证书已经创建，名称为 `server`。

```ros
/interface/ovpn-server/server/add disabled=no certificate=server name=myServer
```

### 客户端配置 {#client-config}

手动添加要通过隧道访问的网络。

```ros
/interface/ovpn-client
add name=ovpn-client1 connect-to=2.2.2.2 user=client1 password=123 disabled=no
/ip/route 
add dst-address=10.5.8.20 gateway=ovpn-client1
add dst-address=192.168.55.0/24 gateway=ovpn-client1
/ip/firewall/nat/add chain=srcnat action=masquerade out-interface=ovpn-client1
```

### 推送路由 {#push-route}

推送路由支持从版本 `7.14` 开始提供。最大输入限制为 \*\*1400\*\* 个字符或 37 条路由。IPv6 支持从版本 `7.21_ab220` 开始提供。  
示例：`route network/IP [netmask] [gateway] [metric]`。

```ros
/interface/ovpn-server/server/set 0 push-routes-ipv6="fdaa::/64,2001:db8::/32"
```

### VRF 支持 {#vrf-support}

从 \*\*版本 7.17\*\* 开始提供相关支持，并引入了若干配置变更。如果使用最新版本，请参阅以下示例：

```ros
      /interface/ovpn-server/server
        add disabled=no certificate=yourcert auth=sha1 cipher=aes128-cbc require-client-certificate=yes protocol=tcp name=ovpn-server1 vrf=main
```
