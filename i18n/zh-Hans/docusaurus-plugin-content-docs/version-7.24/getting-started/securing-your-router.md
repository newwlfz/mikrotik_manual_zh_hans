---
title: "保护路由器安全"
description: "本页提供 MikroTik RouterOS 的安全建议，包括升级 RouterOS 版本、更改默认用户名和密码、使用防火墙规则和 VPN 保护访问、禁用 MAC-Telnet 和 Neighbor Discovery 等不必要的服务，以及管理 DNS 缓存，以增强路由器安全性。"
tags:
  - 'firewall'
  - 'vpn'
  - 'security'
source: https://manual.mikrotik.com/docs/7.24/getting-started/securing-your-router
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "getting-started/networking-fundamentals"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

以下步骤建议在已配置[强防火墙规则](/docs/firewall-and-quality-of-service/firewall/filter)的基础上，进一步保护设备。

## RouterOS 版本 {#routeros-version}

首先升级 RouterOS 版本。某些旧版本存在已被修复的弱点或漏洞。保持设备为最新版本，以确保其安全。在 WinBox 或 WebFig 中点击“Check for Updates”进行升级。建议关注我们的 [Security Announcements Blog](https://blog.mikrotik.com) 上的公告，以及时了解新的安全问题。

## 访问路由器 {#access-to-a-router}

### 访问用户名 {#access-username}

将默认用户名 **admin** 更改为自定义名称。使用唯一的用户名有助于在有人获得设备直接物理访问权限时保护路由器访问：

```ros
/user/add name=myname password=mypassword group=full
/user/disable admin
```

### 访问密码 {#access-password}

MikroTik 路由器要求配置密码。建议使用密码生成工具创建安全且不重复的密码。所谓安全密码，是指：

- 至少 12 个字符。
- 包含数字、符号、大写字母和小写字母。
- 不得是词典单词或词典单词的组合。
- 请注意，密码中的引号字符需要转义。

```ros
/user/set myname password="!={Ba3N!40TуX+GvKBz?jTLIUcx/,"
```

### 保护设备访问 {#securing-access-to-the-device}

预配置防火墙默认阻止来自 WAN（互联网侧）的连接尝试。这是有意设置，除非确定连接安全，否则不要删除这些规则。

如果需要开放对设备的远程访问，建议使用虚拟专用网络（VPN），例如 WireGuard，以保护连接。

可在此处查阅 [WireGuard VPN](/docs/virtual-private-networks/wireguard) 配置指南。

### 管理访问的防火墙规则 {#firewall-rules-for-management-access}

应使用防火墙规则限制对公网接口上服务的访问，从而阻止连接到达服务。以下示例仅允许来自 WAN 接口的 ICMP（ping 和 traceroute）、WinBox 和 SSH，并丢弃其他所有流量：

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
如果公网接口是 PPPoE、LTE 或其他接口类型，应相应地设置 `in-interface`。
:::

还可以使用 **Allowed Address** 属性将特定用户账户限制为仅从指定源地址访问：

```ros
/user/set 0 address=192.168.88.0/24
```

### RouterOS MAC 访问 {#routeros-mac-access}

RouterOS 内置功能选项，可便捷管理网络设备。但是，在生产网络中应禁用以下服务：**MAC-Telnet、MAC-WinBox** 和 **MAC-Ping。**

```ros
/tool/mac-server/set allowed-interface-list=none 
/tool/mac-server/mac-winbox/set allowed-interface-list=none 
/tool/mac-server/ping/set enabled=no
```

### 邻居发现 {#neighbor-discovery}

MikroTik Neighbor Discovery 协议用于发现并识别网络中的其他 MikroTik 路由器。要在所有接口上禁用 Neighbor Discovery，请使用以下命令：

```ros
/ip/neighbor/discovery-settings/set discover-interface-list=none
```

### 带宽服务器 {#bandwidth-server}

带宽服务器用于测试两台 MikroTik 路由器之间的吞吐量。在生产环境中禁用它：

```ros
/tool/bandwidth-server/set enabled=no 
```

### DNS 缓存 {#dns-cache}

DNS 缓存通过将已解析的 DNS 查询结果存储在路由器本地，提高性能，并减少将客户端设备的 DNS 请求解析到远程服务器所需的时间。如果路由器不需要 DNS 缓存，例如网络中的另一台设备负责 DNS 缓存，则应禁用此功能以提高安全性：

```ros
/ip/dns/set allow-remote-requests=no
```

### 其他服务 {#additional-services}

RouterOS 包含多个服务，是否启用取决于配置。生产环境中应禁用以下服务：caching proxy、SOCKS、UPnP 和 MikroTik Cloud services。

```ros
/ip/proxy/set enabled=no
/ip/socks/set enabled=no
/ip/upnp/set enabled=no
/ip/cloud/set ddns-enabled=auto update-time=no
```

### 管理服务端口 {#management-service-ports}

在 `/ip/service` 菜单中禁用不使用的 RouterOS 管理服务：

```ros
/ip/service/disable telnet,ftp,www,api
```

更改默认 SSH 端口可以减少遭受自动化暴力破解尝试的风险：

```ros
/ip/service/set ssh port=2200
```

每个服务也可以限制为特定源地址，但首选使用防火墙规则实施访问控制（见上文），因为它可以阻止连接到达服务：

```ros
/ip/service/set winbox address=192.168.88.0/24
```

### 更安全的 SSH 访问 {#more-secure-ssh-access}

可以在路由器上启用更严格的 SSH 安全设置。这包括启用 aes-128-ctr 加密算法，并禁用 hmac-sha1 和使用 sha1 的 group 算法。要应用这些更安全的 SSH 设置，请使用以下命令：

```ros
/ip/ssh/set strong-crypto=yes
```

## Router 接口 {#router-interface}

### Ethernet/SFP 接口 {#ethernetsfp-interfaces}

禁用路由器上所有未使用的接口是减少未经授权访问路由器的良好做法：

```ros
/interface/print 
/interface/set X disabled=yes
```

其中 **X** 是未使用接口的编号。

### LCD

部分 RouterBOARD 设备包含用于显示系统信息的 LCD 模块。要保护 LCD，请设置 PIN 码：

```ros
/lcd/pin/set pin-number=3659 hide-pin-number=yes
```

或者，可以完全禁用 LCD：

```ros
/lcd/set enabled=no
```
