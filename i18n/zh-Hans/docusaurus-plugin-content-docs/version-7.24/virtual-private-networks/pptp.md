---
title: "PPTP"
description: "本页介绍 MikroTik RouterOS 中的 PPTP（Point-to-Point Tunneling Protocol）实现，涵盖客户端和服务器配置选项，包括认证方法、MTU/MRRU 设置和 TCP 端口要求。文中说明了安全限制，并提供了 PPTP 客户端连接的示例配置命令。"
tags:
  - 'pptp'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/pptp
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Point-to-Point Tunneling Protocol（PPTP）是一种传统 VPN 协议，用于封装 PPP 流量以实现远程访问连接。PPTP 受到许多操作系统和网络设备的广泛支持，因此在优先考虑兼容性的环境中部署和配置较为简单。

由于存在多个已知的加密和协议级漏洞，PPTP 不被认为适合保护敏感或不可信的网络流量。其使用通常限于兼容性场景、测试环境，或对加密强度没有主要要求的网络。

PPTP 不支持 IPv6 传输或 IPv6 流量转发。

PPTP 使用 TCP 端口 1723 进行隧道管理，并使用 Generic Routing Encapsulation（GRE，IP 协议 47）进行数据传输，这些由 Internet Assigned Numbers Authority（IANA）分配。要使 PPTP 通过防火墙或路由器正常运行，必须允许并正确转发 TCP 端口 1723 和 GRE 流量。

PPTP 为每个客户端会话支持 PPP 身份验证、加密和计费机制。身份验证和计费可以在本地执行，也可以通过外部 RADIUS 服务器执行。

## PPTP 客户端 {#pptp-client}

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **add-default-route** (*yes \| no*；默认值：**no**) | 是否将 PPTP 远程地址添加为默认路由。 |
| **allow** (*mschap2 \| mschap1 \| chap \| pap*；默认值：**mschap2, mschap1, chap, pap**) | 允许的认证方法。 |
| **connect-to** (*IP*；默认值：) | PPTP 服务器的远程地址 |
| **default-route-distance** (*byte [0..255]*；默认值：**1**) | 设置应用于自动创建的默认路由的 distance 值，前提是同时选择了 add-default-route。 |
| **dial-on-demand** (*yes \| no*；默认值：**no**) | 仅在产生出站流量时连接到 PPTP 服务器。如果选中，则在连接未建立期间添加网关地址来自 10.112.112.0/24 网络的路由。 |
| **disabled** (*yes \| no*；默认值：**yes**) | 接口是否禁用。默认禁用。 |
| **keepalive-timeout** (*integer*；默认值：**60**) | 设置 keepalive 超时时间，单位为秒。 |
| **max-mru** (*integer*；默认值：**1450**) | 最大接收单元。PPTP 接口无需数据包分片即可接收的最大数据包大小。 |
| **max-mtu** (*integer*；默认值：**1450**) | 最大传输单元。PPTP 接口无需数据包分片即可发送的最大数据包大小。 |
| **mrru** (*disabled \| integer*；默认值：**disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或 Ethernet 数据包。 |
| **name** (*string*；默认值：) | 接口的描述性名称。 |
| **password** (*string*；默认值：**""**) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于认证的密码。 |
| **profile** (*name*；默认值：**default-encryption**) |  |
| **user** (*string*；默认值：) | 用于认证的用户名。 |

## PPTP 服务器 {#pptp-server}

**子菜单：** `/interface/pptp-server`

为连接到指定服务器的每个隧道创建一个接口。PPTP 服务器的配置中有两种接口类型：

- 静态接口由管理员添加，用于需要引用为特定用户创建的特定接口名称的场景（例如在防火墙规则或其他位置）。
- 当用户连接且其用户名不匹配任何现有静态条目时，动态接口会自动添加到此列表（或者在该条目已处于活动状态时添加，因为同一名称不能引用两个独立的隧道接口）。

动态接口在用户连接时出现，并在用户断开连接后消失，因此无法在路由器配置中引用为该用户创建的隧道（例如在防火墙中）。如果需要为该用户保留规则，请为其创建静态条目。否则，使用动态配置是安全的。

:::warning
在这两种情况下，都必须正确配置 PPP 用户——静态条目不会替代 PPP 配置。
:::

### *属性* {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **authentication** (*pap \| chap \| mschap1 \| mschap2*；默认：**mschap1,mschap2**) | 服务器接受的认证方法。 |
| **default-profile** (*name*；默认：**default-encryption**) |  |
| **enabled** (*yes \| no*；默认：**no**) | 定义是否启用 PPTP 服务器。 |
| **keepalive-timeout** (*time*；默认：**30**) | 如果服务器在 keepalive 期间未收到任何数据包，将每秒发送一次 keepalive 数据包，共 5 次。如果服务器未收到客户端的响应，则在 5 秒后断开连接。日志将显示 5 条“LCP missed echo reply”消息，然后断开连接。 |
| **max-mru** (*integer*；默认：**1450**) | 最大接收单元。PPTP 接口无需数据包分片即可接收的最大数据包大小。 |
| **max-mtu** (*integer*；默认：**1450**) | 最大传输单元。PPTP 接口无需数据包分片即可发送的最大数据包大小。 |
| **mrru** (*disabled \| integer*；默认：**disabled**) | 链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或 Ethernet 数据包。 |

## 示例 {#example}

![](/img/35df5d1aa3979ebf.webp)

### PPTP 客户端 {#pptp-client-1}

以下示例演示如何使用用户名“MT-User”、密码“StrongPass”和服务器 192.168.62.2 设置 PPTP 客户端：

```ros
[admin@MikroTik] > /interface/pptp-client/add connect-to=192.168.62.2 disabled=no name=pptp-out1 password=StrongPass user=MT-User
[admin@MikroTik] > /interface/pptp-client/print 
Flags: X - disabled; R - running 
 0  R name="pptp-out1" max-mtu=1450 max-mru=1450 mrru=disabled connect-to=192.168.62.2 user="MT-User" 
      password="StrongPass" profile=default-encryption keepalive-timeout=60 add-default-route=no 
      dial-on-demand=no allow=pap,chap,mschap1,mschap2 
```

### PPTP 服务器 {#pptp-server-1}

在另一端，只需启用 PPTP 服务器，并为特定用户创建 PPP secret：

```ros
[admin@MikroTik] >  /interface/pptp-server/server/set enabled=yes
[admin@MikroTik] >  /ppp/secret/add local-address=10.0.0.1 name=MT-User password=StrongPass profile=default-encryption remote-address=10.0.0.5 service=pptp
[admin@MikroTik] >  interface pptp-server print
Flags: D - dynamic; R - running
Columns: NAME, USER, MTU, CLIENT-ADDRESS, UPTIME, ENCODING
#      NAME            USER     MTU  CLIENT-ADDRESS  UPTIM  ENCODING         
0  DR  <pptp-MT-User>  MT-User  1450  192.168.51.3   44m8s  MPPE128 stateless
```
