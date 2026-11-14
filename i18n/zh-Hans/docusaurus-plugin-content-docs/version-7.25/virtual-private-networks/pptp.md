---
sidebar_key: "virtual-private-networks/pptp"
sidebar_position: 9
title: "PPTP"
sidebar_label: "PPTP"
description: "本页介绍 MikroTik RouterOS 中 PPTP（点对点隧道协议）的实现，涵盖客户端和服务器配置选项，包括认证方式、MTU/MRRU 设置以及 TCP 端口要求。文中还指出了安全方面的局限性，并提供了用于 PPTP 客户端连接的示例设置命令。"
tags:
  - 'pptp'
  - 'vpn'
source: https://manual.mikrotik.com/docs/7.25/virtual-private-networks/pptp
captured_at: '2026-11-04T11:23:22+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Point-to-Point Tunneling Protocol (PPTP) 是一种传统 VPN 协议，旨在为远程访问连接封装 PPP 流量。PPTP 受到许多操作系统和网络设备的广泛支持，因此在以兼容性为首要需求的环境中，部署和配置都很简单。

由于存在多个已知的加密和协议级漏洞，PPTP 不适合用于保护敏感或不可信的网络流量。其使用通常仅限于兼容性场景、测试环境或加密强度不是主要需求的网络。

PPTP 不支持 IPv6 传输或 IPv6 流量转发。

PPTP 使用 TCP 端口 1723 进行隧道管理，并使用 Generic Routing Encapsulation（GRE，IP 协议 47）进行数据传输，这些由 Internet Assigned Numbers Authority（IANA）分配。为使 PPTP 通过防火墙或路由器正确运行，必须允许并正确转发 TCP 端口 1723 和 GRE 流量。

PPTP 为每个客户端会话支持 PPP 身份验证、加密和计费机制。身份验证和计费可以在本地执行，也可以通过外部 RADIUS 服务器执行。

## 静态和动态接口 {#static-and-dynamic-interfaces}

为连接到服务器的每条隧道都会创建一个接口。PPTP 服务器的配置中有两种类型的接口：

- 静态接口是在需要引用为特定用户创建的某个接口名称（在防火墙规则或其他位置）时，由管理员手动添加的。
- 当用户连接且其用户名不匹配任何现有静态条目时（或者该条目已经处于活动状态，因为不能有两个不同的隧道接口由同一名称引用），动态接口会自动添加到此列表中。

动态接口在用户连接时出现，在用户断开连接时消失，因此无法在路由器配置中（例如在防火墙中）引用为该用户创建的隧道。如果需要为该用户保留持久规则，请为该用户创建静态条目。否则，使用动态配置是安全的。

:::warning
无论哪种情况，都必须正确配置 PPP 用户——静态条目不能替代 PPP 配置。
:::

## 示例 {#example}

![](/img/35df5d1aa3979ebf.webp)

### PPTP 客户端 {#pptp-client}

以下示例演示如何设置用户名为 "MT-User"、密码为 "StrongPass"、服务器为 192.168.62.2 的 PPTP 客户端：

```ros
[admin@MikroTik] > /interface/pptp-client/add connect-to=192.168.62.2 disabled=no name=pptp-out1 password=StrongPass user=MT-User
[admin@MikroTik] > /interface/pptp-client/print 
Flags: X - disabled; R - running 
 0  R name="pptp-out1" max-mtu=1450 max-mru=1450 mrru=disabled connect-to=192.168.62.2 user="MT-User" 
      password="StrongPass" profile=default-encryption keepalive-timeout=60 add-default-route=no 
      dial-on-demand=no allow=pap,chap,mschap1,mschap2 
```

### PPTP 服务器 {#pptp-server}

在另一侧，启用 PPTP 服务器并为特定用户创建 PPP secret：

```ros
[admin@MikroTik] >  /interface/pptp-server/server/set enabled=yes
[admin@MikroTik] >  /ppp/secret/add local-address=10.0.0.1 name=MT-User password=StrongPass profile=default-encryption remote-address=10.0.0.5 service=pptp
[admin@MikroTik] >  interface pptp-server print
Flags: D - dynamic; R - running
Columns: NAME, USER, MTU, CLIENT-ADDRESS, UPTIME, ENCODING
#      NAME            USER     MTU  CLIENT-ADDRESS  UPTIM  ENCODING         
0  DR  <pptp-MT-User>  MT-User  1450  192.168.51.3   44m8s  MPPE128 stateless
```
