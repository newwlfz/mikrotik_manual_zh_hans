---
title: "保护路由器安全"
description: "本页提供 MikroTik RouterOS 的安全建议，包括升级 RouterOS 版本、更改默认用户名和密码、使用防火墙规则和 VPN 保护访问、禁用 MAC-Telnet 和 Neighbor Discovery 等不必要的服务，以及管理 DNS 缓存，以增强路由器安全性。"
tags:
  - 'firewall'
  - 'vpn'
  - 'security'
source: https://manual.mikrotik.com/docs/7.25/getting-started/securing-your-router
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "getting-started/networking-fundamentals"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

以下步骤建议在已配置[强防火墙规则](/docs/7.24/firewall-and-quality-of-service/firewall/filter)的基础上，进一步保护设备。

## RouterOS 版本 {#routeros-version}

首先升级 RouterOS 版本。某些旧版本存在已修复的弱点或漏洞。请保持设备为最新版本，以确保安全。要升级，请在 WinBox 或 WebFig 中选择 **Check for Updates**。建议关注 [Security Announcements Blog](https://blog.mikrotik.com) 上的公告，以及时了解新的安全问题。

## 访问用户名 {#access-username}

将默认用户名 **admin** 更改为自定义名称。使用唯一的用户名有助于在有人获得设备直接物理访问权限时保护路由器访问：

```ros
/user/add name=myname password=mypassword group=full
/user/disable admin
```

## 访问密码 {#access-password}

MikroTik 路由器需要配置密码。使用密码生成工具创建安全且不重复的密码。安全密码应满足：

- 至少 12 个字符。
- 包含数字、符号、大写字母和小写字母。
- 不是字典单词或字典单词的组合。
- 在带引号的密码中，使用反斜杠转义 `"`、`\` 和 `$`（`\$`）。未转义的 `$` 会开始变量名：路由器会将其及其后的名称替换为变量值，通常为空，导致密码在无意中变短。

```ros
/user/set myname password="!={Ba3N!40TyX+GvKBz?jTLIUcx/,"
```

## 用户账户和组 {#user-accounts-and-groups}

为每位管理员创建一个账户，而不是共用一个 `admin` 账户，并为每个账户分配一个仅包含所需策略的自定义组——内置 `read` 组可以重启路由器并查看敏感配置。对于基于密钥的登录，导入每位管理员的 SSH 公钥；当用户分配了密钥后，该用户的 SSH 密码登录将被禁用。请参阅 [User](/docs/authentication-authorization-accounting/user)。

## 保护设备访问 {#securing-access-to-the-device}

默认情况下，预配置的防火墙会阻止来自 WAN（面向互联网）接口的所有管理访问。**这是有意设计——除非你完全理解后果，否则不要删除这些规则。**

:::danger[不要将管理服务暴露到互联网]
管理接口对互联网开放的网络设备会持续被扫描，并成为自动化攻击的目标。将 WinBox、SSH 或其他管理服务直接暴露到互联网可能导致：

- 针对登录凭据的**暴力破解攻击**。
- 利用未修补 RouterOS 版本中的**已知漏洞**。
- **设备完全失陷**——攻击者可以拦截流量、重定向 DNS、安装恶意软件，或将路由器用作进一步攻击的代理。

如果需要远程访问设备，**请使用 VPN**，例如 [WireGuard](/docs/virtual-private-networks/wireguard) 创建加密隧道。这样可使管理流量完全不经过公共互联网。
:::

### 从 WAN 开放管理访问（高级） {#opening-management-access-from-wan-advanced}

以下防火墙规则适用于无法避免从 WAN 直接访问管理服务的情况，例如 ISP 管理的基础设施或没有 VPN 网关的站点。**除非确实需要面向互联网直接开放管理，否则不要应用这些规则。**

这些规则仅允许来自 WAN 接口的 ICMP（ping 和 traceroute）、WinBox 和 SSH，并丢弃其他所有流量：

```ros
/ip/firewall/filter
add chain=input action=accept \
    connection-state=established,related,untracked \
    comment="accept established,related,untracked"
add chain=input action=drop \
    connection-state=invalid \
    comment="drop invalid"
add chain=input action=accept \
    in-interface=ether1 protocol=icmp \
    comment="accept ICMP"
add chain=input action=accept \
    in-interface=ether1 protocol=tcp dst-port=8291 \
    comment="allow WinBox"
add chain=input action=accept \
    in-interface=ether1 protocol=tcp dst-port=22 \
    comment="allow SSH"
add chain=input action=drop \
    in-interface=ether1 \
    comment="block everything else"
```

这些规则是未使用默认配置的路由器的完整 input 链。在具有默认配置的路由器上，`add` 会将这些规则追加到丢弃来自 LAN 外部所有 input 的规则之后，WAN 连接永远不会到达这些规则。在这种情况下，仅在该规则之前添加所需服务的接受规则：

```ros
/ip/firewall/filter
add chain=input action=accept \
    in-interface-list=WAN protocol=tcp dst-port=8291 \
    comment="allow WinBox" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
add chain=input action=accept \
    in-interface-list=WAN protocol=tcp dst-port=22 \
    comment="allow SSH" \
    place-before=[find comment="defconf: drop all not coming from LAN"]
```

:::warning
如果公共接口是 PPPoE、LTE 或其他接口类型，应相应地设置 `in-interface`。如果选择了错误的接口，可能会失去对设备的访问。
:::

:::danger[需要额外加固]
如果从 WAN 开放管理访问，还**必须**执行以下操作：

- 使用强且唯一的密码（请参阅 [Access password](#access-password)）。
- 尽可能将访问限制为特定源地址。
- 限制来自同一地址的重复 SSH 连接，如 [SSH brute-force protection](/docs/firewall-and-quality-of-service/user-guides/bruteforce-prevention) 中所述。
- 保持 RouterOS 更新到最新稳定版本。
- 监控日志中的未授权连接尝试。
:::

还可以使用 **Allowed Address** 属性将特定用户账户限制为仅从指定源地址访问：

```ros
/user/set 0 address=192.168.88.0/24
```

## RouterOS MAC 访问 {#routeros-mac-access}

RouterOS 内置功能选项，可便捷管理网络设备。但是，在生产网络中应禁用以下服务：**MAC-Telnet、MAC-WinBox** 和 **MAC-Ping。**

```ros
/tool/mac-server/set allowed-interface-list=none
/tool/mac-server/mac-winbox/set allowed-interface-list=none
/tool/mac-server/ping/set enabled=no
```

## 邻居发现 {#neighbor-discovery}

MikroTik Neighbor Discovery 协议用于发现并识别网络中的其他 MikroTik 路由器。要在所有接口上禁用 Neighbor Discovery，请使用以下命令：

```ros
/ip/neighbor/discovery-settings/set discover-interface-list=none
```

## 带宽服务器 {#bandwidth-server}

带宽服务器用于测试两台 MikroTik 路由器之间的吞吐量。在生产环境中禁用它：

```ros
/tool/bandwidth-server/set enabled=no
```

## DNS 缓存 {#dns-cache}

DNS 缓存将已解析的 DNS 查询结果存储在路由器本地，从而缩短从客户端设备到远程服务器解析 DNS 请求所需的时间，提高性能。如果路由器不需要应答其他设备的 DNS 查询，例如网络中的另一台设备负责处理 DNS，请关闭远程请求。此时路由器仅为自身解析名称，即使防火墙规则允许来自互联网 DNS 查询通过，路由器也无法应答这些查询：

```ros
/ip/dns/set allow-remote-requests=no
```

## 其他服务 {#additional-services}

RouterOS 包含多个服务，是否启用取决于配置。生产环境中应禁用以下服务：caching proxy、SOCKS、UPnP 和 MikroTik Cloud services。

```ros
/ip/proxy/set enabled=no
/ip/socks/set enabled=no
/ip/upnp/set enabled=no
/ip/cloud/set ddns-enabled=auto update-time=no
```

使用默认值 `ddns-enabled=auto` 时，路由器仅在启用 Back To Home（远程回家） 时向 MikroTik cloud 注册 DNS 名称。`update-time=no` 会阻止路由器从 cloud 设置其时钟。

## 管理服务端口 {#management-service-ports}

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
/ip/service/set winbox available-from=192.168.88.0/24
```

## 更安全的 SSH 访问 {#more-secure-ssh-access}

可以在路由器上启用更严格的 SSH 安全设置。使用 `strong-crypto=yes` 时，SSH 服务器将不再提供较弱的算法：128-bit、CBC、3DES 和 `none` 密码，SHA-1 和 MD5 MAC，以及使用 SHA-1 的密钥交换。要应用这些更安全的 SSH 设置，请使用以下命令：

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
