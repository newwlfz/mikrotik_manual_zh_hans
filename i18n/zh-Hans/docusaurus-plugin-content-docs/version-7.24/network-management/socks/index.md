---
sidebar_key: "network-management/socks/index"
sidebar_position: 1
title: "SOCKS"
sidebar_label: "SOCKS"
description: "本页介绍 MikroTik RouterOS 中的 SOCKS 代理配置，涵盖连接超时、端口分配、用于保障安全的访问列表以及活动连接监控等设置。它说明了如何启用带身份验证的 SOCKS5/4 代理，并通过访问规则控制客户端与服务器之间的流量。"
tags:
  - 'socks'
  - 'access-control'
  - 'proxy'
source: https://manual.mikrotik.com/docs/7.24/network-management/socks
captured_at: '2026-11-04T11:32:53+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍 SOCKS 功能。你可以用它来配置 RouterOS 上的 SOCKS 代理行为和 socksify 规则。

<DocCardList />

SOCKS（Socket Secure）是一种代理服务器，它允许基于 TCP 的应用数据跨越防火墙进行中继，即使防火墙会阻止这些数据包。SOCKS 协议与具体的应用协议无关，因此可用于许多服务，例如 WWW、FTP、TELNET 等。

首先，应用客户端连接到 SOCKS 代理服务器，然后代理服务器查询其访问列表，以确定该客户端是否被允许访问远程应用资源；如果允许，代理服务器会将数据包中继到应用服务器，并在应用服务器与客户端之间建立连接。

请记得配置你的应用客户端使用 SOCKS！

你应使用访问列表和/或防火墙保护 SOCKS 代理，禁止来自外部的访问。未能保护代理服务器可能会给你的网络带来安全问题，并可能为垃圾邮件发送者提供通过路由器发送垃圾邮件的途径。

### 属性说明 {#property-description}

| 属性 | 说明 |
| :-- | :-- |
| **connection-idle-timeout**（time；默认值：2m） | 空闲连接被终止前的等待时间 |
| **enabled**（yes \| no；默认值：no） | 是否启用 SOCKS 代理 |
| **max-connections**（integer: 1..500；默认值：200） | 同时连接的最大数量 |
| **port**（integer: 1..65535；默认值：1080） | SOCKS 服务器监听连接的 TCP 端口 |
| **vrf**（VRF name；默认值：main） | 设置服务建立连接所使用的 VRF。 |
| **version**（4 \| 5；默认值：4） | SOCKS 版本。|
| **auth-method**（none \| password；默认值：none） | SOCKS 认证方法。|

## 访问列表 {#access-list}

**子菜单：** `/ip/socks/access`

在 SOCKS 访问列表中，你可以添加用于控制对 SOCKS 服务器访问的规则。此列表与防火墙列表类似。

| 属性 | 描述 |
| :-- | :-- |
| **action**（allow \| deny；默认值：allow） | allow - 允许匹配此规则的数据包被转发以进行进一步处理  deny - 拒绝匹配此规则的数据包访问 |
| **dst-address**（IP address/netmask） | 目标（服务器）地址 |
| **dst-port**（port） | 目标 TCP 端口 |
| **src-address**（IP address/netmask） | 数据包的源（客户端）地址 |
| **src-port**（port） | 源 TCP 端口 |

## 活动连接 {#active-connections}

活动连接列表显示通过 SOCKS 代理服务器维护的所有已建立的 TCP 连接。

**子菜单：** `/ip/socks/connections`

| 属性 | 描述 |
| :-- | :-- |
| **dst-address**（只读：IP address） | 目标（应用服务器）IP 地址 |
| **rx**（只读：integer） | 接收的字节数 |
| **src-address**（只读：IP address） | 源（应用客户端）IP 地址 |
| **tx**（只读：integer） | 发送的字节数 |
| **type**（只读：in \| out \| unknown）- 连接类型 | in - 入站连接  out - 出站连接  unknown - 连接刚刚被发起 |
| **user**（只读：string） | 用于该连接的 `/ip/socks/users` 菜单中的用户|

## 用户 {#users}

用于 SOCKS 服务器访问的特定用户。

**子菜单：** `/ip/socks/users`

| 属性 | 说明 |
| :-- | :-- |
| **disabled**（*yes* \| *no*；默认值：yes） | 该用户记录是否处于活动状态。 |
| **name**（*string*；默认值：） | SOCKS 用户的名称。 |
| **password**（*string*；默认值：）*[sensitive](../../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于 SOCKS 服务器访问的密码。 |
| **only-one**（*yes* \| *no*；默认值：no） |  每个用户仅允许一个连接。 |
| **rate-limit**（*integer*；默认值：） | 特定用户的速率限制（单位为比特每秒） |

### 示例 {#example}

查看当前 TCP 连接：

```ros
[admin@MikroTik] /ip/socks/connections> print
 # SRC-ADDRESS                DST-ADDRESS                TX         RX
 0 192.168.0.2:3242           159.148.147.196:80         4847       2880
 1 192.168.0.2:3243           159.148.147.196:80         3408       2127
 2 192.168.0.2:3246           159.148.95.16:80           10172      25207
 3 192.168.0.2:3248           194.8.18.26:80             474        1629
 4 192.168.0.2:3249           159.148.95.16:80           6477       18695
 5 192.168.0.2:3250           159.148.95.16:80           4137       27568
 6 192.168.0.2:3251           159.148.95.16:80           1712       14296
 7 192.168.0.2:3258           80.91.34.241:80            314        208
 8 192.168.0.2:3259           80.91.34.241:80            934        524
 9 192.168.0.2:3260           80.91.34.241:80            930        524
10 192.168.0.2:3261           80.91.34.241:80            312        158
11 192.168.0.2:3262           80.91.34.241:80            312        158
[admin@MikroTik] /ip/socks/connections>
```

## 应用示例 {#application-examples}

### 通过 SOCKS 服务器使用 FTP 服务 {#ftp-service-through-socks-server}

假设我们有一个 192.168.0.0/24 的网络进行了伪装，使用的是一台具有公网 IP 203.0.113.104/24 和私有 IP 192.168.0.1/24 的路由器。网络中某处有一台 IP 地址为 198.51.100.8 的 FTP 服务器。我们希望允许本地网络中 IP 地址为 192.168.0.2/24 的客户端访问此 FTP 服务器。

我们已经对本地网络进行了伪装：

```ros
[admin@MikroTik] /ip/firewall/nat> print
Flags: X - disabled, I - invalid, D - dynamic
 0   chain=srcnat action=masquerade src-address=192.168.0.0/24
[admin@MikroTik] /ip/firewall/nat>
```

并且防火墙中拒绝了对公共 FTP 服务器的访问：

```ros
[admin@MikroTik] /ip/firewall/filter> print
Flags: X - disabled, I - invalid, D - dynamic
 0   chain=forward action=drop src-address=192.168.0.0/24 dst-port=21 protocol=tcp
[admin@MikroTik] /ip/firewall/filter>
```

我们必须启用 SOCKS 服务器：

```ros
[admin@MikroTik] /ip/socks> set enabled=yes
[admin@MikroTik] /ip/socks> print
                    enabled: yes
                       port: 1080
    connection-idle-timeout: 2m
            max-connections: 200
               version: 4
           auth-method: none
[admin@MikroTik] /ip/socks>
```

在 SOCKS 访问列表中添加对 IP 地址为 192.168.0.2/32 的客户端的访问，允许从 FTP 服务器到该客户端的数据传输（允许任意 IP 地址的目标端口 1024 到 65535），并丢弃其他所有内容：

```ros
[admin@MikroTik] /ip/socks/access> add src-address=192.168.0.2 dst-port=21 \
\... action=allow
[admin@MikroTik] /ip/socks/access> add dst-port=1024-65535 action=allow
[admin@MikroTik] /ip/socks/access> add action=deny
[admin@MikroTik] /ip/socks/access> print
Flags: X - disabled
 0   src-address=192.168.0.2 dst-port=21 action=allow
 1   dst-port=1024-65535 action=allow
 2   action=deny
[admin@MikroTik] /ip/socks/access>
```

就这样——SOCKS 服务器已配置完成。查看活动连接以及发送和接收的数据：

```ros
[admin@MikroTik] /ip/socks/connections> print
 # SRC-ADDRESS                DST-ADDRESS                TX         RX
 0 192.168.0.2:1238           198.51.100.8:21                1163       4625
 1 192.168.0.2:1258           198.51.100.8:3423              0          3231744
[admin@MikroTik] /ip/socks/connections>
```

:::warning
要使用 SOCKS 代理服务器，你必须在 FTP 客户端中指定其 IP 地址和端口。在本例中，IP 地址为 192.168.0.1（路由器/SOCKS 服务器的本地 IP 地址），TCP 端口为 1080。
:::
