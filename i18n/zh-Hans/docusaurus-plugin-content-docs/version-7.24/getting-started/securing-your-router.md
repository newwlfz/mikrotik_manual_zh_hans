---
sidebar_key: "getting-started/securing-your-router"
sidebar_position: 3
title: "保护您的路由器"
sidebar_label: "保护您的路由器"
description: "本页提供 MikroTik RouterOS 的安全建议，包括升级 RouterOS 版本、更改默认用户名和密码、使用防火墙规则和 VPN 保护访问、禁用 MAC-Telnet 和 Neighbor Discovery 等不必要的服务，以及管理 DNS 缓存以增强路由器安全性。"
tags:
  - 'firewall'
  - 'vpn'
  - 'security'
source: https://manual.mikrotik.com/docs/7.24/getting-started/securing-your-router
captured_at: '2026-11-04T11:29:05+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

以下步骤是关于如何在已配置[强防火墙规则](../firewall-and-quality-of-service/firewall/filter.md)的情况下进一步保护设备的建议。

## RouterOS 版本 {#routeros-version}

首先升级 RouterOS 版本。某些旧版本存在已修复的弱点或漏洞。保持设备更新以确保安全。在 WinBox 或 WebFig 中点击“检查更新”进行升级。建议关注我们的[安全公告博客](https://blog.mikrotik.com)，及时了解任何新的安全问题。

## 访问路由器 {#access-to-a-router}

### 访问用户名 {#access-username}

将默认用户名 **admin** 更改为自定义名称。使用唯一用户名有助于在有人获得设备直接物理访问权限时保护对路由器的访问：

```ros
/user/add name=myname password=mypassword group=full
/user/disable admin
```

### 访问密码 {#access-password}

MikroTik 路由器需要配置密码。我们建议使用密码生成工具创建安全且不重复的密码。所谓安全密码，是指：

- 至少 12 个字符。
- 包含数字、符号、大写和小写字母。
- 不是词典单词或词典单词的组合。
- 请注意，密码中的引号字符需要转义。

```ros
/user/set myname password="!={Ba3N!40TуX+GvKBz?jTLIUcx/,"
```

### 保护对设备的访问 {#securing-access-to-the-device}

预配置防火墙默认会阻止 WAN（互联网侧）连接尝试。这是有意为之——除非你确定连接是安全的，否则不要删除这些规则。

如果你需要开放对设备的远程访问，我们建议使用虚拟专用网络（VPN），例如 WireGuard，来保护连接。

此处提供了 [WireGuard VPN](../virtual-private-networks/wireguard.md) 的配置指南。

### 管理访问的防火墙规则 {#firewall-rules-for-management-access}

应使用防火墙规则限制对公网接口上服务的访问，这些规则会阻止连接到达服务。下面的示例仅允许来自 WAN 接口的 ICMP（ping 和 traceroute）、WinBox 和 SSH，并丢弃其他所有内容：

```ros
/ip/firewall/filter
add chain=input action=accept connection-state=established,related,untracked comment="accept established,related,untracked"
add chain=input action=drop connection-state=invalid comment="drop invalid"
add chain=input in-interface=ether1 action=accept protocol=icmp comment="accept ICMP"
add chain=input in-interface=ether1 action=accept protocol=tcp dst-port=8291 comment="allow WinBox"
add chain=input in-interface=ether1 action=accept protocol=tcp dst-port=22 comment="allow SSH"
add chain=input in-interface=ether1 action=drop comment="block everything else"
```

:::danger
如果公网接口是 PPPoE、LTE 或其他接口类型，则应相应设置 `in-interface`。
:::

你还可以使用 **Allowed Address** 属性将特定用户账户限制到特定源地址：

```ros
/user/set 0 address=192.168.88.0/24
```

### RouterOS MAC 访问 {#routeros-mac-access}

RouterOS 包含内置功能选项，可为网络设备提供便捷的管理访问。但是，在生产网络中应禁用以下服务：**MAC-Telnet, MAC-WinBox,** 和 **MAC-Ping.**

```ros
/tool/mac-server/set allowed-interface-list=none 
/tool/mac-server/mac-winbox/set allowed-interface-list=none 
/tool/mac-server/ping/set enabled=no
```

### 邻居发现 {#neighbor-discovery}

MikroTik Neighbor Discovery 协议用于发现和识别网络上的其他 MikroTik 路由器。要在所有接口上禁用 Neighbor Discovery，请使用以下命令：

```ros
/ip/neighbor/discovery-settings/set discover-interface-list=none
```

### 带宽服务器 {#bandwidth-server}

带宽服务器用于测试两台 MikroTik 路由器之间的吞吐量。在生产环境中应将其禁用：

```ros
/tool/bandwidth-server/set enabled=no 
```

### DNS 缓存 {#dns-cache}

DNS 缓存通过将已解析的 DNS 查询结果存储在路由器本地来提高性能，从而减少客户端设备向远程服务器解析 DNS 请求所需的时间。如果你的路由器不需要 DNS 缓存——例如，网络中的另一台设备负责 DNS 缓存——则应禁用此功能以提高安全性：

```ros
/ip/dns/set allow-remote-requests=no
```

### 其他服务 {#additional-services}

RouterOS 包含若干服务，这些服务可能会根据你的配置而启用。在生产环境中应禁用以下服务：缓存代理、SOCKS、UPnP 和 MikroTik Cloud 服务。

```ros
/ip/proxy/set enabled=no
/ip/socks/set enabled=no
/ip/upnp/set enabled=no
/ip/cloud/set ddns-enabled=auto update-time=no
```

### 管理服务端口 {#management-service-ports}

在 `/ip/service` 菜单中禁用你不使用的 RouterOS 管理服务：

```ros
/ip/service/disable telnet,ftp,www,api
```

更改默认 SSH 端口可以减少遭受自动化暴力破解尝试的风险：

```ros
/ip/service/set ssh port=2200
```

也可以将每个服务限制到特定源地址，但更推荐使用防火墙规则（见上文）实施访问控制，因为这样可以阻止连接到达服务：

```ros
/ip/service/set winbox address=192.168.88.0/24
```

### 更安全的 SSH 访问 {#more-secure-ssh-access}

你可以在路由器上启用更严格的 SSH 安全设置。这包括启用 aes-128-ctr 加密算法，以及禁用 hmac-sha1 和带 sha1 的组算法。要应用这些更安全的 SSH 设置，请使用以下命令：

```ros
/ip/ssh/set strong-crypto=yes
```

## 路由器接口 {#router-interface}

### Ethernet/SFP 接口 {#ethernetsfp-interfaces}

良好做法是禁用路由器上所有未使用的接口，以减少对路由器的未经授权访问：

```ros
/interface/print 
/interface/set X disabled=yes
```

其中 **X** 是未使用接口的编号。

### LCD {#lcd}

某些 RouterBOARD 设备包含用于显示系统信息的 LCD 模块。要保护 LCD 安全，请设置 PIN 码：

```ros
/lcd/pin/set pin-number=3659 hide-pin-number=yes
```

或者，你可以完全禁用 LCD：

```ros
/lcd/set enabled=no
```
