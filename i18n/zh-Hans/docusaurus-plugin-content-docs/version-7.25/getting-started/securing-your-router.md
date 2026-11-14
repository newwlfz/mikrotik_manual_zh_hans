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
source: https://manual.mikrotik.com/docs/7.25/getting-started/securing-your-router
captured_at: '2026-11-04T11:17:01+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

以下步骤是关于如何在已配置[强防火墙规则](../firewall-and-quality-of-service/firewall/filter.md)的情况下进一步保护设备的建议。

## RouterOS 版本 {#routeros-version}

首先升级你的 RouterOS 版本。一些较旧版本存在某些已修复的弱点或漏洞。保持设备更新以确保其安全。要升级，请在 WinBox 或 WebFig 中选择 **检查更新**。建议关注我们的[安全公告博客](https://blog.mikrotik.com)上的公告，以随时了解任何新的安全问题。

## 访问用户名 {#access-username}

将默认用户名 **admin** 更改为自定义名称。使用唯一用户名有助于在有人获得设备直接物理访问权限时保护对路由器的访问：

```ros
/user/add name=myname password=mypassword group=full
/user/disable admin
```

## 访问密码 {#access-password}

MikroTik 路由器要求配置密码。使用密码生成器工具创建安全且不重复的密码。安全密码应：

- 至少 12 个字符。
- 包含数字、符号、大写和小写字母。
- 不是词典单词或词典单词的组合。
- 在带引号的密码中，使用反斜杠（`\$`）转义 `"`、`\` 和 `$`。未转义的 `$` 会开始一个变量名：路由器会将 `$` 及其后面的名称替换为该变量的值（通常为空），密码会在不知不觉中变短。

```ros
/user/set myname password="!={Ba3N!40TyX+GvKBz?jTLIUcx/,"
```

## 用户账户和组 {#user-accounts-and-groups}

为每位管理员创建一个账户，而不是共享单个 `admin` 账户，并为每个账户分配一个仅包含所需策略的自定义组——内置的 `read` 组可以重启路由器并查看敏感配置。对于基于密钥的登录，请导入每位管理员的公共 SSH 密钥；当为用户分配了密钥后，该用户的 SSH 密码登录将被禁用。参见[用户](../authentication-authorization-accounting/user.md)。

## 保护对设备的访问 {#securing-access-to-the-device}

默认情况下，预配置的防火墙会阻止来自 WAN（面向互联网）接口的所有管理访问。**这是有意为之——除非你完全了解后果，否则不要删除这些规则。**

:::danger[不要将管理服务暴露到互联网]
具有对互联网开放的管理接口的网络设备会不断被自动化攻击扫描和针对。将 WinBox、SSH 或其他管理服务直接暴露到互联网可能导致：

- **针对登录凭据的暴力破解攻击**。
- **利用未打补丁的 RouterOS 版本中的已知漏洞**。
- **设备完全失陷**——攻击者可以拦截流量、重定向 DNS、安装恶意软件，或将路由器用作进一步攻击的代理。

如果你需要远程访问设备，**请使用 VPN**，例如 [WireGuard](../virtual-private-networks/wireguard.md) 来创建加密隧道。这会使管理流量完全避开公共互联网。
:::

### 从 WAN 开放管理访问（高级） {#opening-management-access-from-wan-advanced}

以下防火墙规则适用于无法避免从 WAN 直接访问管理服务的情况——例如，由 ISP 管理的基础设施或没有 VPN 网关的站点。**除非你有直接面向互联网进行管理的特定需求，否则不要应用这些规则。**

这些规则仅允许来自 WAN 接口的 ICMP（ping 和 traceroute）、WinBox 和 SSH，并丢弃其他所有内容：

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

对于没有默认配置的路由器，这些规则构成完整的 input 链。在具有默认配置的路由器上，`add` 会将它们追加到丢弃来自 LAN 外部所有输入的规则之后，因此 WAN 连接永远无法到达它们。在这种情况下，只需在该规则之前添加所需服务的 accept 规则：

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
如果公共接口是 PPPoE、LTE 或其他接口类型，应相应地设置 `in-interface`。如果选择了错误的接口，你可能会失去对设备的访问。
:::

:::danger[需要额外加固]
从 WAN 开放管理访问时，你**必须**同时：

- 使用强度高且唯一的密码（参见 [Access password](#access-password)）。
- 在可能的情况下，将访问限制为特定的源地址。
- 限制来自同一地址的重复 SSH 连接，如 [SSH 暴力破解防护](../firewall-and-quality-of-service/user-guides/bruteforce-prevention.md) 中所述。
- 保持 RouterOS 更新到最新的稳定版本。
- 监控日志以发现未经授权的连接尝试。
:::

你还可以使用 **Allowed Address** 属性将特定用户账户限制到特定源地址：

```ros
/user/set 0 address=192.168.88.0/24
```

## RouterOS MAC-access {#routeros-mac-access}

RouterOS 包含内置功能选项，可为网络设备提供便捷的管理访问。但是，在生产网络中应禁用以下服务：**MAC-Telnet, MAC-WinBox,** 和 **MAC-Ping.**

```ros
/tool/mac-server/set allowed-interface-list=none
/tool/mac-server/mac-winbox/set allowed-interface-list=none
/tool/mac-server/ping/set enabled=no
```

## 邻居发现 {#neighbor-discovery}

MikroTik Neighbor Discovery 协议用于发现和识别网络上的其他 MikroTik 路由器。要在所有接口上禁用 Neighbor Discovery，请使用以下命令：

```ros
/ip/neighbor/discovery-settings/set discover-interface-list=none
```

## 带宽服务器 {#bandwidth-server}

带宽服务器用于测试两台 MikroTik 路由器之间的吞吐量。在生产环境中应将其禁用：

```ros
/tool/bandwidth-server/set enabled=no
```

## DNS 缓存 {#dns-cache}

DNS 缓存将已解析的 DNS 查询结果存储在路由器本地，从而缩短客户端设备向远程服务器解析 DNS 请求所需的时间，以提高性能。如果路由器不需要应答来自其他设备的 DNS 查询——例如，如果你的网络中有另一台设备负责处理 DNS——请关闭远程请求。这样路由器只为自己解析名称，即使防火墙规则允许来自互联网的 DNS 查询通过，它也无法应答这些查询：

```ros
/ip/dns/set allow-remote-requests=no
```

## 附加服务 {#additional-services}

RouterOS 包含若干服务，这些服务可能会根据你的配置而启用。在生产环境中应禁用以下服务：缓存代理、SOCKS、UPnP 和 MikroTik Cloud 服务。

```ros
/ip/proxy/set enabled=no
/ip/socks/set enabled=no
/ip/upnp/set enabled=no
/ip/cloud/set ddns-enabled=auto update-time=no
```

在默认的 `ddns-enabled=auto` 下，路由器仅在启用 Back To Home（远程回家） 时向 MikroTik 云注册 DNS 名称。`update-time=no` 会阻止路由器从云设置其时钟。

## 管理服务端口 {#management-service-ports}

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
/ip/service/set winbox available-from=192.168.88.0/24
```

## 更安全的 SSH 访问 {#more-secure-ssh-access}

你可以在路由器上启用更严格的 SSH 安全设置。使用 `strong-crypto=yes` 后，SSH 服务器将停止提供较弱的算法：128 位、CBC、3DES 和 `none` 加密算法，SHA-1 和 MD5 MAC，以及使用 SHA-1 的密钥交换。要应用这些更安全的 SSH 设置，请使用以下命令：

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
