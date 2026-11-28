---
title: "SOCKS"
description: 'The SOCKS proxy server in RouterOS: enable the server, restrict who can use it with the access list, authenticate clients with users, and monitor active proxied connections.'
tags:
  - 'socks'
  - 'access-control'
  - 'proxy'
source: https://manual.mikrotik.com/docs/7.25/network-management/socks
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

SOCKS 是用于 TCP 连接的代理协议。支持 SOCKS 的应用程序连接到代理，指定目标地址，代理建立连接并转发数据。由于连接由代理建立，能够访问代理的应用程序可以使用防火墙规则原本会阻止的目标地址，并且可以在一处控制允许哪些客户端和目标地址。SOCKS 适用于任何基于 TCP 的协议，例如 HTTP、FTP 或 SSH。

RouterOS 包含 SOCKS 服务器（位于 `/ip/socks`，即本页）和 [Socksify](/docs/network-management/socks/socksify) 服务，用于相反方向：将由防火墙规则选择的流量转发到上游 SOCKS 服务器。

<DocCardList />

## 启用服务器 {#enable-the-server}

服务器默认禁用。设置协议 `version` 并启用它：

```ros
/ip/socks/set version=5 enabled=yes
```

默认 `version=4` 仅接受 SOCKS4 客户端；SOCKS5 客户端会被拒绝。对于 SOCKS5 客户端，请选择 `5`；密码认证也需要版本 5。

使用这些设置时，服务器会在路由器所有地址的 TCP 端口 1080 上监听。在添加访问列表规则之前，任何能够访问此端口的客户端都可以使用该代理。

## 访问列表 {#access-list}

**子菜单：** `/ip/socks/access`

The access list controls which requests the server accepts. Rules are checked in order and the first matching rule decides. A request that matches no rule is **allowed**; an empty list allows everything. For a restrictive list, finish with a `deny` rule:

```ros
/ip/socks/access/add src-address=192.168.0.0/24 action=allow
/ip/socks/access/add action=deny
```

Besides addresses and ports, `dst-address` accepts a domain name, which matches only clients that request the destination by name.

:::warning
Secure the proxy with the access list or firewall rules. An open SOCKS proxy lets anyone route connections through the router, for example to abuse it for spam.
:::

## Users and authentication

**Sub-menu:** `/ip/socks/users`

With `/ip/socks/set auth-method=password`, clients must authenticate with a username and password of a user in the list; the connection is rejected when no users exist. Authentication uses the SOCKS5 username/password method:

```ros
/ip/socks/set version=5 auth-method=password
/ip/socks/users/add name=alice password=s3cret
```

New users are created enabled. Passwords are not shown in `print` output:

```ros
[admin@MikroTik] /ip/socks/users> print
Columns: NAME, ONLY-ONE
# NAME      ONLY-ONE
0 alice     no
```

## Monitor connections

**Sub-menu:** `/ip/socks/connections`

This read-only list shows the connections currently relayed by the server, with the client address, the requested destination and the byte counters. The `user` column shows the authenticated user, if any:

```ros
[admin@MikroTik] /ip/socks/connections> print detail
0  src-address=192.168.0.2:59264 dst-address=198.51.100.8:21 type=out
   tx=103 rx=737 user=alice
```

## Application example: FTP through the SOCKS server

Your network 192.168.0.0/24 is masqueraded behind a router with the addresses 203.0.113.104 and 192.168.0.1, and the firewall blocks direct FTP access:

```ros
[admin@MikroTik] /ip/firewall/nat> print
0   chain=srcnat action=masquerade src-address=192.168.0.0/24
[admin@MikroTik] /ip/firewall/filter> print
0   chain=forward action=drop protocol=tcp src-address=192.168.0.0/24
    dst-port=21
```

To allow the client 192.168.0.2 to reach an FTP server at 198.51.100.8 through the proxy, enable the server and add access rules: allow the client to connect to the FTP server's port 21 and to open passive data connections to it (high ports), then deny everything else:

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

While the transfer runs, the control and the passive-data connections show in the connection list described in the previous section.

Configure the FTP client to use SOCKS with the router's address 192.168.0.1 and TCP port 1080.
