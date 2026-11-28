---
title: "以 Cisco 作为 LAC 的 LAC 和 LNS 设置"
description: "本页说明如何将 MikroTik RouterOS 设备配置为 L2TP Network Server（LNS），以与充当 LAC 的 Cisco 路由器建立 VPDN 连接。内容包括在 LAC 上配置 PPPoE 客户端、在 LNS 上启用 L2TP 服务器的基本配置示例，以及两种角色的 routerOS 命令示例。"
tags:
  - 'vpdn'
  - 'l2tp'
  - 'ppp'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/l2tp/lac-and-lns-setup-with-cisco-as-lac
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "virtual-private-networks/l2tp"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

LAC/LNS 设置，也称为 Virtual Private DialUp Network（VPDN），允许远程拨号用户与专用网络之间建立远距离点对点连接。

拨号客户端使用 PPPOE 连接到 L2TP 访问集中器（LAC），LAC 确定该会话应通过 IP 网络转发到 L2TP Network Server（LNS），创建 L2TP 隧道并将 PPP 帧转发到服务器，在服务器上对客户端进行身份验证并建立会话（见下图）。

![](/img/fd5eb4904ada5626.svg)

撰写本文时，RouterOS 不能用作 LAC 角色。因此，本文将演示如何设置一个非常基础的网络，其中 RouterOS 作为 LNS，Cisco 路由器作为 LAC。

## 配置 {#configuration}

我们将使用简单配置演示 VPDN 设置的最基础知识。假设 LAC 会将 FQDN 名称包含 [mt.lv](https://mt.lv) 域的 LNS 客户端转发过去。

### 客户端 {#client}

为简化起见，假设客户端是一台 RouterOS 路由器：

```ros
/interface/pppoe-client/add interface=ether1 user=good_worker@mt.lv password=strongpass
```

### LAC

假设客户端连接到 GigabitEthernet1 端口，LNS 服务器的 IP 地址为 10.155.101.231

```text
aaa new-model
!
aaa authentication ppp default local
!
vpdn enable
vpdn aaa attribute nas-ip-address vpdn-nas
vpdn search-order domain dnis 
!
vpdn-group LAC
 request-dialin
  protocol l2tp
  domain mt.lv
 initiate-to ip 10.155.101.231
 source-ip 10.155.101.216
 local name LAC
 l2tp tunnel password 0 tunnelpass
!
bba-group pppoe MAIN-BBA
 virtual-template 1
!
interface GigabitEthernet1
 pppoe enable group MAIN-BBA
!
interface Virtual-Template1
 description pppoe MAIN-BBA
 no ip address
 no peer default ip address
 ppp mtu adaptive
 ppp authentication chap
!

```

请注意，为简化起见，此设置不会在本地或通过 RADIUS 对客户端进行身份验证，不会实际检查域名，也不会控制 L2 访问。如果要使用这些功能，请参阅 Cisco 配置手册。

### LNS

在 LNS 上，需要启用 L2TP 服务器，并设置一种方法来验证来自 LAC 的 L2TP 连接。

```ros
/interface/l2tp-server/server
set enabled=yes
/ppp/l2tp-secret
add address=10.155.101.216/32 secret=tunnelpass
```

接下来是实际的用户身份验证。在这种情况下，为简化起见，我们将使用本地身份验证方法。

```ros
/ip/pool
add name=pool0 ranges=192.168.99.2-192.168.99.99
/ppp/profile
set default local-address=192.168.99.1 remote-address=pool0
/ppp/secret
add name=good_worker@mt.lv password=strongpass
```

## 状态检查 {#status-check}

在 LNS 上，可以通过检查 l2tp server interfaces 或检查活动的 ppp 连接来查看所有成功连接的客户端：

```text
[admin@CHR_v6_bgp] /interface/l2tp-server> print
Flags: X - disabled, D - dynamic, R - running
# NAME USER MTU CLIENT-ADDRESS UPTIME ENCODING
0 DR <l2tp-... good_worker@mt.lv 1450 10.155.101.216 6h13m49s

[admin@CHR_v6_bgp] /ppp/active> print
Flags: R - radius
# NAME SERVICE CALLER-ID ADDRESS UPTIME ENCODING
0 good_worker@mt.lv l2tp 10.155.101.216 192.168.99.2 6h15m57s 

```

在 LAC 上，也可以查看活动的客户端会话以及 LAC 和 LNS 之间的活动 L2TP 隧道：

```text
csrLAC#show vpdn

L2TP Tunnel and Session Information Total tunnels 1 sessions 1

LocTunID RemTunID Remote Name State Remote Address Sessn L2TP Class/
Count VPDN Group
26090 11 CHR_v6_bgp est 10.155.101.231 1 LAC

LocID RemID TunID Username, Intf/ State Last Chg Uniq ID
Vcid, Circuit
18521 16 26090 good_worker@mt.lv, Gi1 est 06:17:07 571

```

## 会话建立 {#session-establishment}

下面详细了解客户端会话如何通过 LAC 进行认证和建立。

![](/img/2926b26e48134203.svg)

- 客户端发起 PPPoE 呼叫。
- LAC 和客户端开始 LCP 协商。
- 协商 CHAP 后，LAC 发送 CHAP challenge。
- 客户端发送 CHAP response。
- LAC 根据收到的域名检查客户端会话是否应转发到 LNS。该检查可以在本地完成，也可以使用 RADIUS 服务器完成。客户端也可以在转发会话之前在此处进行认证。
- LAC 建立 L2TP 隧道。
- LNS 检查是否允许 LAC 打开隧道并运行认证过程。隧道已建立并准备好转发 VPDN 会话。
- LAC 将与客户端协商的 LCP 选项、用户名和密码转发给 LNS。
- LNS 在本地或使用 RADIUS 对客户端进行认证，并发送 CHAP Success 或 CHAP Failure 消息。
- 执行 IP Control Protocol（IPCP）阶段，安装 IP 地址和路由。此时，会话被视为已建立。
