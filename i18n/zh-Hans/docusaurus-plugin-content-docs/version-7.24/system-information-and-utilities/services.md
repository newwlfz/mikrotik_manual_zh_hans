---
sidebar_key: "system-information-and-utilities/services"
sidebar_position: 15
title: "服务"
sidebar_label: "服务"
description: "本页面介绍 MikroTik RouterOS 中的 IP/Services 部分，详细说明 Telnet、FTP、SSH 和 WinBox 等默认服务及其配置属性，例如地址限制、端口、TLS 版本和会话限制。文中还提供了用于管理服务访问控制的示例。"
tags:
  - 'ip-services'
  - 'firewall'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/services
captured_at: '2026-11-04T11:33:46+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

IP/Services 列出了各种 MikroTik RouterOS 服务和容器所使用的协议和端口，包括用于传入连接的那些。

它有助于确定哪些 MikroTik 服务（或容器）正在监听特定端口，以及如果你想要限制或允许访问某些服务，需要阻止或允许什么。

可以从 IP/Services 部分配置的默认服务：

| 属性 | 描述 |
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

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP address/netmask \| IPv6/0..128*; 默认值： ) | 服务可访问的 IP/IPv6 前缀列表。设置此参数后，数据包不会在网络层被丢弃，但来自与指定地址不匹配的源的访问将被拒绝。此选项最适合用于限制受信任网络内的访问。  要阻止来自外部或不受信任网络的访问，我们建议改用防火墙。 |
| **certificate** (*name*; 默认值：**none**) | 特定服务所使用的证书名称。仅适用于依赖证书的服务（*www-ssl、api-ssl*） |
| **name** (*name*; 默认值：**none**) | 服务名称 |
| **max-sessions**(*integer: 1..1000*; 默认值：20) | 服务的最大并发会话数 |
| **port** (*integer: 1..65535*; 默认值： ) | 特定服务监听的端口 |
| ***tls-version*** (*any* \| *only-1.2*; 默认值：**any**) | 指定特定服务允许的 TLS 版本 |
| **vrf** (*name*; 默认值：**main**) | 指定特定服务要使用的 VRF 实例 |

### 只读属性 {#read-only-properties}

| 属性 | 描述 |
| :-- | :-- |
| **Container** | 监听该端口的容器名称 |
| **Local** | 用于该连接的路由器本地地址 |
| **Remote** | 建立到该服务连接的远程地址 |

### 示例 {#example}

例如，仅允许从特定 IP/IPv6 地址范围访问 API

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

以下示例展示了正在监听或已建立到路由器服务连接的动态服务

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

| 协议/端口 | 描述 |
| :-- | :-- |
| **20/tcp** | FTP 数据连接 |
| **21/tcp** | FTP 控制连接 |
| **22/tcp** | Secure Shell (SSH) 远程登录协议 |
| **23/tcp** | Telnet 协议 |
| <strong>53/tcp 53/udp</strong> | DNS |
| **67/udp** | Bootstrap protocol 或 [DHCP Server](../network-management/dhcp.md#dhcp-server) |
| **68/udp** | Bootstrap protocol 或 [DHCP Client](../network-management/dhcp.md#dhcp-client) |
| <strong>80/tcp</strong> | 万维网 HTTP |
| <strong>123/udp</strong> | 网络时间协议（[NTP](./ntp.md) |
| <strong>161/udp</strong> | 简单网络管理协议（[SNMP](../diagnostics-monitoring-and-troubleshooting/snmp.md) |
| <strong>179/tcp</strong> | 边界网关协议（[BGP](../user-guides/routing-and-networking-protocols/unicast/bgp/index.md) |
| **443/tcp** | Secure Socket Layer (SSL) 加密 HTTP |
| **500/udp** | Internet Key Exchange (IKE) 协议 |
| **520/udp 521/udp** | [RIP](../user-guides/routing-and-networking-protocols/unicast/rip.md) 路由协议 |
| **546/udp** | [DHCPv6 Client](../network-management/dhcp.md) 消息 |
| **547/udp** | [DHCPv6 Server](../network-management/dhcp.md) 消息 |
| **646/tcp** | [LDP](../user-guides/routing-and-networking-protocols/mpls/ldp.md) 传输会话 |
| **646/udp** | [LDP](../user-guides/routing-and-networking-protocols/mpls/ldp.md) hello 协议 |
| **1080/tcp** | [SOCKS](../network-management/socks/index.md) 代理协议 |
| **1698/udp 1699/udp** | RSVP TE 隧道 |
| <strong>1701/udp</strong> | 二层隧道协议（[L2TP](../virtual-private-networks/l2tp/index.md)） |
| <strong>1723/tcp</strong> | 点对点隧道协议（[PPTP](../virtual-private-networks/pptp.md)） |
| <strong>1900/udp 2828/tcp</strong> | 通用即插即用（[uPnP](../firewall-and-quality-of-service/upnp.md)） |
| **1966/udp** | MME 发起方消息流量 |
| **1966/tcp** | MME 网关协议 |
| **2000/tcp** | 带宽测试服务器 |
| <strong>5246,5247/udp</strong> | [CAPsMAN](../wireless/abgn/capsman/ap-controller-capsman.md) |
| **5350/udp** | NAT-PMP 客户端 |
| **5351/udp** | NAT-PMP 服务器 |
| <strong>5678/udp</strong> | Mikrotik 邻居发现协议 |
| **6343/tcp** | 默认 OpenFlow 端口 |
| **8080/tcp** | HTTP Web 代理 |
| <strong>8291/tcp</strong> | [Winbox](../management-tools/winbox.md) |
| <strong>8728/tcp</strong> | [API](../developer-guides/api/index.md) |
| <strong>8729/tcp</strong> | API-SSL |
| <strong>20561/udp</strong> | MAC winbox |
| **/1** | ICMP |
| **/2** | [IGMP 代理](../user-guides/routing-and-networking-protocols/multicast/igmp-proxy.md) |
| **/4** | [IPIP](../virtual-private-networks/ipip.md) 封装 |
| **/41** | IPv6（封装） |
| **/46** | RSVP TE 隧道 |
| **/47** | General Routing Encapsulation (GRE) - 用于 PPTP 和 [EoIP](../virtual-private-networks/eoip.md) 隧道 |
| <strong>/50</strong> | 用于 IPv4 的封装安全载荷 (ESP) |
| <strong>/51</strong> | 用于 IPv4 的认证头 (AH) |
| **/89** | [OSPF](../user-guides/routing-and-networking-protocols/unicast/ospf/index.md) 路由协议 |
| **/103** | [PIM-SM](../user-guides/routing-and-networking-protocols/multicast/pim-sm.md) |
| **/112** | [VRRP](../high-availability-solutions/vrrp.md) |

## Web 服务器 {#web-server}

下表列出了可为 Web 服务启用/禁用的属性。所有属性默认均已启用，如有需要可以禁用。

在此表中，“plain”指 HTTP 连接，“secure”指 HTTPS 连接。

| 属性 | 描述 |
| :-- | :-- |
| index-plain: (默认值：**yes**) | 主页/登录页（当 webfig-plain 和 graphs-plain 被禁用时，可以禁用此属性） |
| webfig-plain: (默认值：**yes**) | WebFig 接口 |
| graphs-plain: (默认值：**yes**) | 图表页面 |
| rest-plain: (默认值：**yes**) | REST API 支持 |
| crl-plain: (默认值：**yes**) | CRL（证书吊销列表） |
| scep-plain: (默认值：**yes**) | SCEP（Simple Certificate Enrollment Protocol） |
| acme-plain: (默认值：**yes**) | ACME 挑战 |
| index-secure: (默认值：**yes**) | 主页/登录页（当 webfig-secure 和 graphs-secure 被禁用时，可以禁用此属性） |
| webfig-secure: (默认值：**yes**) | WebFig 接口 |
| graphs-secure: (默认值：**yes**) | 图表页面 |
| rest-secure: (默认值：**yes**) | REST API 支持 |
