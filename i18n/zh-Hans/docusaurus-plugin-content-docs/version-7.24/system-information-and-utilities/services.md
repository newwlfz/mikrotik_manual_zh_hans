---
title: "服务"
description: "本页介绍 MikroTik RouterOS 中的 IP/Services 部分，详细说明 Telnet、FTP、SSH 和 WinBox 等默认服务，以及地址限制、端口、TLS 版本和会话限制等配置属性。文中提供了管理服务访问控制的示例。"
tags:
  - 'ip-services'
  - 'firewall'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/services
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

IP/Services 列出各种 MikroTik RouterOS 服务和容器使用的协议和端口，包括用于传入连接的协议和端口。

它有助于确定哪些 MikroTik 服务（或容器）正在监听特定端口，以及如果要限制或允许访问某些服务，需要阻止或允许哪些内容。

可从 IP/Services 部分配置的默认服务：

| Property | Description |
| :-- | :-- |
| **telnet** | Telnet 服务 |
| **ftp** | FTP 服务 |
| **www** | WebFig HTTP 服务 |
| **ssh** | SSH 服务 |
| **www-ssl** | WebFig HTTPS 服务 |
| **api** | API 服务 |
| **winbox** | 负责 WinBox 工具访问，以及 MikroTik 智能手机应用和 Dude |
| **api-ssl** | 基于 SSL 的 API 服务 |
| **reverse-proxy** | 反向代理服务 |

## 属性 {#properties}

请注意，无法添加新服务，只允许修改现有服务。

**子菜单：** `/ip/service`

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP address/netmask \| IPv6/0..128*；默认：) | 可访问服务的 IP/IPv6 前缀列表。设置该参数后，数据包不会在网络层被丢弃，但来自不匹配指定地址的源的访问将被拒绝。该选项最适合用于限制受信任网络内的访问。<br/> 要阻止来自外部或不受信任网络的访问，建议改用防火墙。 |
| **certificate** (*name*；默认：**none**) | 特定服务使用的证书名称。仅适用于依赖证书的服务（*www-ssl、api-ssl*）。 |
| **name** (*name*；默认：**none**) | 服务名称 |
| **max-sessions**(*integer: 1..1000*；默认：20) | 服务的最大并发会话数 |
| **port** (*integer: 1..65535*；默认：) | 特定服务监听的端口 |
| ***tls-version*** (*any* \| *only-1.2*；默认：**any**) | 指定特定服务允许的 TLS 版本 |
| **vrf** (*name*；默认：**main**) | 指定特定服务使用的 VRF 实例 |

### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **Container** | 监听该端口的容器名称 |
| **Local** | 用于连接的路由器本地地址 |
| **Remote** | 建立到服务连接的远程地址 |

### 示例 {#example}

例如，仅允许来自特定 IP/IPv6 地址范围的 API 访问

```ros
[admin@dzeltenais_burkaans] /ip/service/set api address=10.5.101.0/24,2001:db8:fade::/64
[admin@dzeltenais_burkaans] /ip/service/print where !dynamic      
Flags: X - DISABLED, I - INVALID
Columns: NAME, PORT, PROTO, ADDRESS, CERTIFICATE, VRF, MAX-SESSIONS
 #   NAME     PORT  PROTO  ADDRESS             CERTIFICATE  VRF   MAX-SESSIONS
 0   ftp        21  tcp                                     main            20
 1   ssh        22  tcp                                     main            20
 2   telnet     23  tcp                                     main            20
 7   www        80  tcp                                     main            20
 9 X www-ssl   443  tcp                        none         main            20
13   winbox   8291  tcp                                     main            20
15   api      8728  tcp    10.5.101.0/24                    main            20
                           2001:db8:fade::/64                                 
16   api-ssl  8729  tcp                        none         main            20
```

以下示例显示监听路由器服务或已与路由器服务建立连接的动态服务

```routeros
[admin@dzeltenais_burkaans] /ip/service/print where dynamic  
Flags: D - DYNAMIC; c - CONNECTION
Columns: NAME, NETNS, CONTAINER, PORT, PROTO, LOCAL, REMOTE
 #    NAME        NETNS  CONTAINER  PORT  PROTO  LOCAL         REMOTE            
 3 D  resolver                        53  tcp                                    
 4 D  resolver                        53  udp                                    
 5 D  dhcp                            67  udp                                    
 6 D  dhcpclient                      68  udp                                    
 8 D  snmp                           161  udp                                    
10 D  btest                         2000  tcp                                    
11 D  loader                        3986  tcp                                    
12 D  discover                      5678  udp                                    
14 Dc winbox                        8291  tcp    10.155.221.4  10.145.221.15:51595
17 D  pihole-FTL     16  Pi-hole      53  tcp                                    
18 D  pihole-FTL     16  Pi-hole      53  udp                                    
19 D  lighttpd       16  Pi-hole      80  tcp                                    
28 Dc lighttpd       16  Pi-hole      80  tcp    172.55.1.2    10.145.221.15:52298
29 Dc lighttpd       16  Pi-hole      80  tcp    172.55.1.2    10.145.221.15:52333
30 Dc lighttpd       16  Pi-hole      80  tcp    172.55.1.2    10.145.221.15:52339
31 Dc lighttpd       16  Pi-hole      80  tcp    172.55.1.2    10.145.221.15:52340
32 Dc lighttpd       16  Pi-hole      80  tcp    172.55.1.2    10.145.221.15:52341
33 Dc lighttpd       16  Pi-hole      80  tcp    172.55.1.2    10.145.221.15:52342
26 D  pihole-FTL     16  Pi-hole    4711  tcp
```

## 协议和端口 {#protocols-and-ports}

下表列出了 RouterOS 使用的协议和端口。

| Proto/Port | Description |
| :-- | :-- |
| <strong>20/tcp</strong> | FTP 数据连接 |
| <strong>21/tcp</strong> | FTP 控制连接 |
| <strong>22/tcp</strong> | 安全 Shell（SSH）远程登录协议 |
| <strong>23/tcp</strong> | Telnet 协议 |
| <strong>53/tcp 53/udp</strong> | DNS |
| <strong>67/udp</strong> | 引导协议或 <a href="/docs/network-management/dhcp#dhcp-server">DHCP Server</a> |
| <strong>68/udp</strong> | 引导协议或 <a href="/docs/network-management/dhcp#dhcp-client">DHCP Client</a> |
| <strong>80/tcp</strong> | 万维网 HTTP |
| <strong>123/udp</strong> | 网络时间协议（<a href="/docs/system-information-and-utilities/ntp">NTP</a> |
| <strong>161/udp</strong> | 简单网络管理协议（<a href="/docs/diagnostics-monitoring-and-troubleshooting/snmp">SNMP</a> |
| <strong>179/tcp</strong> | 边界网关协议（<a href="/docs/user-guides/routing-and-networking-protocols/unicast/bgp">BGP</a> |
| <strong>443/tcp</strong> | 安全套接字层（SSL）加密 HTTP |
| <strong>500/udp</strong> | Internet 密钥交换（IKE）协议 |
| <strong>520/udp 521/udp</strong> | <a href="/docs/user-guides/routing-and-networking-protocols/unicast/rip">RIP</a> 路由协议 |
| <strong>546/udp</strong> | <a href="/docs/network-management/dhcp">DHCPv6 Client</a> 消息 |
| <strong>547/udp</strong> | <a href="/docs/network-management/dhcp">DHCPv6 Server</a> 消息 |
| <strong>646/tcp</strong> | <a href="/docs/user-guides/routing-and-networking-protocols/mpls/ldp">LDP</a> 传输会话 |
| <strong>646/udp</strong> | <a href="/docs/user-guides/routing-and-networking-protocols/mpls/ldp">LDP</a> hello 协议 |
| <strong>1080/tcp</strong> | <a href="/docs/network-management/socks">SOCKS</a> 代理协议 |
| <strong>1698/udp 1699/udp</strong> | RSVP TE 隧道 |
| <strong>1701/udp</strong> | 二层隧道协议（<a href="/docs/virtual-private-networks/l2tp">L2TP</a>） |
| <strong>1723/tcp</strong> | 点对点隧道协议（<a href="/docs/virtual-private-networks/pptp">PPTP</a>） |
| <strong>1900/udp 2828/tcp</strong> | 通用即插即用（<a href="/docs/firewall-and-quality-of-service/upnp">uPnP</a>） |
| <strong>1966/udp</strong> | MME 发起方消息流量 |
| <strong>1966/tcp</strong> | MME 网关协议 |
| <strong>2000/tcp</strong> | 带宽测试服务器 |
| <strong>5246,5247/udp</strong> | <a href="/docs/wireless/abgn/capsman/ap-controller-capsman">CAPsMAN</a> |
| <strong>5350/udp</strong> | NAT-PMP 客户端 |
| <strong>5351/udp</strong> | NAT-PMP 服务器 |
| <strong>5678/udp</strong> | MikroTik 邻居发现协议 |
| <strong>6343/tcp</strong> | 默认 OpenFlow 端口 |
| <strong>8080/tcp</strong> | HTTP Web 代理 |
| <strong>8291/tcp</strong> | <a href="/docs/management-tools/winbox">Winbox</a> |
| <strong>8728/tcp</strong> | <a href="/docs/developer-guides/api">API</a> |
| <strong>8729/tcp</strong> | API-SSL |
| <strong>20561/udp</strong> | MAC winbox |
| <strong>/1</strong> | ICMP |
| <strong>/2</strong> | [Multicast |
| <strong>/4</strong> | <a href="/docs/virtual-private-networks/ipip">IPIP</a> 封装 |
| <strong>/41</strong> | IPv6（封装） |
| <strong>/46</strong> | RSVP TE 隧道 |
| <strong>/47</strong> | 通用路由封装（GRE），用于 PPTP 和 <a href="/docs/virtual-private-networks/eoip">EoIP</a> 隧道 |
| <strong>/50</strong> | IPv4 封装安全载荷（ESP） |
| <strong>/51</strong> | IPv4 认证头（AH） |
| <strong>/89</strong> | <a href="/docs/user-guides/routing-and-networking-protocols/unicast/ospf">OSPF</a> 路由协议 |
| <strong>/103</strong> | [Multicast |
| <strong>/112</strong> | <a href="/docs/high-availability-solutions/vrrp">VRRP</a> |

## Web 服务器 {#web-server}

下表列出了可为 Web 服务启用或禁用的属性。所有属性默认启用，可根据需要禁用。

在此表中，“plain”指 HTTP 连接，“secure”指 HTTPS 连接。

| 属性 | 说明 |
| :-- | :-- |
| index-plain：（默认：**yes**） | 主页 / 登录页（当 webfig-plain 和 graphs-plain 禁用时可禁用） |
| webfig-plain：（默认：**yes**） | WebFig 接口 |
| graphs-plain：（默认：**yes**） | 图表页面 |
| rest-plain：（默认：**yes**） | REST API 支持 |
| crl-plain：（默认：**yes**） | CRL（Certificate Revocation List） |
| scep-plain：（默认：**yes**） | SCEP（Simple Certificate Enrollment Protocol） |
| acme-plain：（默认：**yes**） | ACME Challenge |
| index-secure：（默认：**yes**） | 主页 / 登录页（当 webfig-secure 和 graphs-secure 禁用时可禁用） |
| webfig-secure：（默认：**yes**） | WebFig 接口 |
| graphs-secure：（默认：**yes**） | 图表页面 |
| rest-secure：（默认：**yes**） | REST API 支持 |
