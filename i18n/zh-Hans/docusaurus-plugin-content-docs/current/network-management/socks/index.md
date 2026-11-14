---
sidebar_key: "network-management/socks"
title: "SOCKS"
sidebar_label: "SOCKS"
description: "RouterOS 中的 SOCKS 代理服务器：启用服务器，使用访问列表限制谁可以使用它，使用用户对客户端进行身份验证，并监控活动的代理连接。"
tags:
  - 'socks'
  - 'access-control'
  - 'proxy'
source: https://manual.mikrotik.com/docs/network-management/socks
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

SOCKS 是一种用于 TCP 连接的代理协议。支持 SOCKS 的应用程序连接到代理，指明它想要的目标地址，然后由代理建立连接并转发数据。由于连接由代理发起，凡是能够访问代理的应用程序都可以使用那些原本会被防火墙规则阻止的目标地址，而且你可以在一个地方集中控制允许哪些客户端和哪些目标地址。SOCKS 适用于任何基于 TCP 的协议，例如 HTTP、FTP 或 SSH。

RouterOS 中既包含 SOCKS 服务器（位于 `/ip/socks`，即本页内容），也包含用于反方向的 [Socksify](./socksify.md) 服务：把由防火墙规则选出的流量通过上游 SOCKS 服务器转发。

<DocCardList />

## 启用服务器 {#enable-the-server}

服务器默认处于禁用状态。设置协议 `version` 并将其启用：

```ros
/ip/socks/set version=5 enabled=yes
```

默认的 `version=4` 只接受 SOCKS4 客户端，SOCKS5 客户端会被拒绝。若要让 SOCKS5 客户端接入，请选择 `5`；密码认证同样需要 version 5。

使用这些设置后，服务器会在路由器所有地址的 TCP 端口 1080 上监听。在你添加访问列表规则之前，任何能够访问该端口的人都可以使用这个代理。

## 访问列表 {#access-list}

**子菜单：** `/ip/socks/access`

访问列表控制服务器接受哪些请求。规则按顺序进行检查，由第一条匹配的规则做出决定。不匹配任何规则的请求会被**允许**；空列表允许一切。若要使用限制性的列表，请在末尾添加一条 `deny` 规则：

```ros
/ip/socks/access/add src-address=192.168.0.0/24 action=allow
/ip/socks/access/add action=deny
```

除了地址和端口之外，`dst-address` 还接受域名，此时只匹配按名称请求该目标地址的客户端。

:::warning
请使用访问列表或防火墙规则保护该代理。开放的 SOCKS 代理会让任何人都能通过路由器转发连接，例如滥用它来发送垃圾邮件。
:::

## 用户与认证 {#users-and-authentication}

**子菜单：** `/ip/socks/users`

使用 `/ip/socks/set auth-method=password` 时，客户端必须使用列表中某个用户的用户名和密码进行认证；如果不存在任何用户，连接会被拒绝。认证使用 SOCKS5 用户名/密码方法：

```ros
/ip/socks/set version=5 auth-method=password
/ip/socks/users/add name=alice password=s3cret
```

新建用户默认处于启用状态。密码不会在 `print` 输出中显示：

```ros
[admin@MikroTik] /ip/socks/users> print
Columns: NAME, ONLY-ONE
# NAME      ONLY-ONE
0 alice     no
```

## 监控连接 {#monitor-connections}

**子菜单：** `/ip/socks/connections`

这个只读列表显示服务器当前转发的连接，包括客户端地址、请求的目标地址以及字节计数器。`user` 列显示已认证的用户（如果有）：

```ros
[admin@MikroTik] /ip/socks/connections> print detail
0  src-address=192.168.0.2:59264 dst-address=198.51.100.8:21 type=out
   tx=103 rx=737 user=alice
```

## 应用示例：通过 SOCKS 服务器使用 FTP {#application-example-ftp-through-the-socks-server}

你的网络 192.168.0.0/24 通过一台拥有地址 203.0.113.104 和 192.168.0.1 的路由器进行伪装（masquerade），并且防火墙阻止了直接访问 FTP：

```ros
[admin@MikroTik] /ip/firewall/nat> print
0   chain=srcnat action=masquerade src-address=192.168.0.0/24
[admin@MikroTik] /ip/firewall/filter> print
0   chain=forward action=drop protocol=tcp src-address=192.168.0.0/24
    dst-port=21
```

若要允许客户端 192.168.0.2 通过代理访问位于 198.51.100.8 的 FTP 服务器，请启用服务器并添加访问规则：允许该客户端连接到 FTP 服务器的端口 21，并允许它向该服务器打开被动数据连接（高位端口），然后拒绝其他一切：

```ros
[admin@MikroTik] /ip/socks> set enabled=yes version=5
[admin@MikroTik] /ip/socks> print
                  enabled: yes
                     port: 1080
  connection-idle-timeout: 2m
          max-connections: 200
                      vrf: main
                  version: 5
              auth-method: none
[admin@MikroTik] /ip/socks> access/add src-address=192.168.0.2 dst-address=198.51.100.8 dst-port=21 action=allow
[admin@MikroTik] /ip/socks> access/add src-address=192.168.0.2 dst-address=198.51.100.8 dst-port=1024-65535 action=allow
[admin@MikroTik] /ip/socks> access/add action=deny
[admin@MikroTik] /ip/socks> access/print
0   src-address=192.168.0.2 dst-address=198.51.100.8 dst-port=21 action=allow

1   src-address=192.168.0.2 dst-address=198.51.100.8 dst-port=1024-65535 action=allow

2   action=deny
```

在传输进行期间，控制连接和被动数据连接会显示在上一节所述的连接列表中。

请将 FTP 客户端配置为使用 SOCKS，代理地址填写路由器的地址 192.168.0.1，TCP 端口为 1080。
