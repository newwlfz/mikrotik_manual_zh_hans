---
sidebar_key: "virtual-private-networks/pptp"
sidebar_position: 9
title: "PPTP"
sidebar_label: "PPTP"
description: "本页介绍 MikroTik RouterOS 中 PPTP（点对点隧道协议）的实现，涵盖客户端和服务器配置选项，包括认证方式、MTU/MRRU 设置以及 TCP 端口要求。文中还指出了安全方面的局限性，并提供了用于 PPTP 客户端连接的示例设置命令。"
tags:
  - 'pptp'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/pptp
captured_at: '2026-11-04T11:34:56+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Point-to-Point Tunneling Protocol (PPTP) 是一种传统 VPN 协议，旨在为远程访问连接封装 PPP 流量。PPTP 受到许多操作系统和网络设备的广泛支持，因此在以兼容性为首要需求的环境中，部署和配置都很简单。

由于存在多个已知的加密和协议级漏洞，PPTP 不适合用于保护敏感或不可信的网络流量。其使用通常仅限于兼容性场景、测试环境或加密强度不是主要需求的网络。

PPTP 不支持 IPv6 传输或 IPv6 流量转发。

PPTP 使用 TCP 端口 1723 进行隧道管理，并使用 Generic Routing Encapsulation（GRE，IP 协议 47）进行数据传输，这些由 Internet Assigned Numbers Authority（IANA）分配。为使 PPTP 通过防火墙或路由器正确运行，必须允许并正确转发 TCP 端口 1723 和 GRE 流量。

PPTP 为每个客户端会话支持 PPP 身份验证、加密和计费机制。身份验证和计费可以在本地执行，也可以通过外部 RADIUS 服务器执行。

## PPTP 客户端 {#pptp-client}

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **add-default-route** (*yes \| no*；默认：**no**) | 是否将 PPTP 远端地址添加为默认路由。 |
| **allow** (*mschap2 \| mschap1 \| chap \| pap*；默认：**mschap2, mschap1, chap, pap**) | 允许的身份验证方法。 |
| **connect-to** (*IP*；默认：) | PPTP 服务器的远端地址 |
| **default-route-distance** (*byte [0..255]*；默认：**1**) | 如果同时选择了 add-default-route，则设置应用于自动创建的默认路由的距离值 |
| **dial-on-demand** (*yes \| no*；默认：**no**) | 仅在生成出站流量时才连接到 PPTP 服务器。如果选中，则在连接尚未建立期间，将添加网关地址来自 10.112.112.0/24 网络的路由。 |
| **disabled** (*yes \| no*；默认：**yes**) | 接口是否被禁用。默认情况下为禁用状态 |
| **keepalive-timeout** (*integer*；默认：**60**) | 设置 keepalive 超时时间（秒）。 |
| **max-mru** (*integer*；默认：**1450**) | 最大接收单元。PPTP 接口在不进行数据包分片的情况下能够接收的最大数据包大小。 |
| **max-mtu** (*integer*；默认：**1450**) | 最大传输单元。PPTP 接口在不进行数据包分片的情况下能够发送的最大数据包大小。 |
| **mrru** (*disabled \| integer*；默认：**disabled**) | 链路上能够接收的最大数据包大小。如果数据包大于隧道 MTU，它将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或以太网数据包。 |
| **name** (*string*；默认：) | 接口的描述性名称。 |
| **password** (*string*；默认：**""**) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于身份验证的密码。 |
| **profile** (*name*；默认：**default-encryption**) |  |
| **user** (*string*；默认：) | 用于身份验证的用户名。 |

## PPTP 服务器 {#pptp-server}

**子菜单：** `/interface/pptp-server`

为每个建立到指定服务器的隧道创建一个接口。PPTP 服务器配置中有两种类型的接口：

- 如果需要引用为特定用户创建的特定接口名称（在防火墙规则或其他位置），则通过管理方式添加静态接口。
- 每当用户连接且其用户名不匹配任何现有静态条目时（或者在该条目已经处于活动状态的情况下，因为不能有两个单独的隧道接口使用同一名称引用），动态接口会自动添加到此列表。

动态接口在用户连接时出现，并在用户断开连接后消失，因此无法在路由器配置（例如防火墙）中引用为该用户创建的隧道。因此，如果该用户需要持久规则，请为其创建静态条目。否则，使用动态配置是安全的。

:::warning
无论哪种情况，都必须正确配置 PPP 用户——静态条目不能替代 PPP 配置。
:::

### *属性* {#properties-1}

| 属性 | 描述 |
| :-- | :-- |
| **authentication** (*pap \| chap \| mschap1 \| mschap2*；默认：**mschap1,mschap2**) | 服务器将接受的身份验证方法。 |
| **default-profile** (*name*；默认：**default-encryption**) |  |
| **enabled** (*yes \| no*；默认：**no**) | 定义 PPTP 服务器是否启用。 |
| **keepalive-timeout** (*time*；默认：**30**) | 如果服务器在 keepalive 周期内未收到任何数据包，它将每秒发送 keepalive 数据包，共发送五次。如果服务器未收到客户端响应，则在 5 秒后断开连接。日志将显示 5 条 "LCP missed echo reply" 消息，然后断开连接。 |
| **max-mru** (*integer*；默认：**1450**) | 最大接收单元。PPTP 接口在不进行数据包分片的情况下能够接收的最大数据包大小。 |
| **max-mtu** (*integer*；默认：**1450**) | 最大传输单元。PPTP 接口在不进行数据包分片的情况下能够发送的最大数据包大小。 |
| **mrru** (*disabled \| integer*；默认：**disabled**) | 链路上能够接收的最大数据包大小。如果数据包大于隧道 MTU，它将被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或以太网数据包。 |

## 示例 {#example}

![](/img/35df5d1aa3979ebf.webp)

### PPTP 客户端 {#pptp-client-1}

以下示例演示如何设置用户名为 "MT-User"、密码为 "StrongPass"、服务器为 192.168.62.2 的 PPTP 客户端：

```ros
[admin@MikroTik] > /interface/pptp-client/add connect-to=192.168.62.2 disabled=no name=pptp-out1 password=StrongPass user=MT-User
[admin@MikroTik] > /interface/pptp-client/print 
Flags: X - disabled; R - running 
 0  R name="pptp-out1" max-mtu=1450 max-mru=1450 mrru=disabled connect-to=192.168.62.2 user="MT-User" 
      password="StrongPass" profile=default-encryption keepalive-timeout=60 add-default-route=no 
      dial-on-demand=no allow=pap,chap,mschap1,mschap2 
```

### PPTP 服务器 {#pptp-server-1}

在另一端，我们只需启用 PPTP 服务器并为特定用户创建 PPP secret：

```ros
[admin@MikroTik] >  /interface/pptp-server/server/set enabled=yes
[admin@MikroTik] >  /ppp/secret/add local-address=10.0.0.1 name=MT-User password=StrongPass profile=default-encryption remote-address=10.0.0.5 service=pptp
[admin@MikroTik] >  interface pptp-server print
Flags: D - dynamic; R - running
Columns: NAME, USER, MTU, CLIENT-ADDRESS, UPTIME, ENCODING
#      NAME            USER     MTU  CLIENT-ADDRESS  UPTIM  ENCODING         
0  DR  <pptp-MT-User>  MT-User  1450  192.168.51.3   44m8s  MPPE128 stateless
```
