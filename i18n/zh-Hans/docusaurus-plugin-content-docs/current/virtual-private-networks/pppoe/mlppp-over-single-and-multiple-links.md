---
sidebar_key: "virtual-private-networks/pppoe/mlppp-over-single-and-multiple-links"
sidebar_position: 2
title: "基于单链路和多链路的 MLPPP"
sidebar_label: "基于单链路和多链路的 MLPPP"
description: "MLPPP 通过将数据拆分并重新组合到多条逻辑或物理链路上来增强 PPP 链路，从而在不升级硬件的情况下提升带宽。它同时支持单链路（使用 MRRU）和多链路配置，并提供了 PPPoE 服务器/客户端设置的示例。"
tags:
  - 'mlppp'
  - 'ppp'
  - 'lcp'
source: https://manual.mikrotik.com/docs/virtual-private-networks/pppoe/mlppp-over-single-and-multiple-links
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**标准：** `RFC 1990`

Multi-Link Point to Point Protocol（MP、Multi-Link PPP、MultiPPP 或 MLPPP）是一种在多个逻辑数据链路上拆分、重组和排序数据的方法。

在一对设备之间存在多条 DSL 链路的情况下，可以通过使用 Multi-Link PPP 来“拓宽管道”，从而提升两台设备之间的性能，而无需采用更新、更昂贵的技术。

大包实际上会被拆分成片段，并均匀地通过所有逻辑数据链路发送。这一过程瞬时完成，且不会损失带宽。需要理解的是，链路另一端必须使用相同的协议来重组你的数据。

Multilink 基于 [LCP](../../mobile-networking/ppp.md#introduction) 选项协商，该协商允许向对端表明自己能够合并多条物理链路。

## 单链路 MLPPP {#mlppp-over-single-link}

通常，由于开销，通过 PPP 链路发送的数据包大小会减小。MP 可用于在单条 ppp 链路上发送和接收完整帧。为实现这一点，Multilink Protocol 使用额外的 LCP 配置选项 **Multilink Maximum Received Reconstructed Unit (MRRU)**

要在单条链路上启用 Multi-link PPP，必须指定 MRRU（Maximum Receive Reconstructed Unit）选项。如果双方都支持此功能，则无需进行 MSS 调整（在防火墙 mangle 中）。研究表明，与每个客户端使用 2 条 mangle 规则相比，MRRU 的 CPU 开销更小。MRRU 允许你将数据包划分到多个通道，因此可提高可能的 MTU 和 MRU（最高 65535 字节）。

在 Windows 下，可以在网络选项卡的“设置”按钮中启用“Negotiate multi-link for single link connections”。其 MRRU 被硬编码为 1614。

:::warning
启用 MPPE 加密时，MTU 会减少 4 字节以确保正常工作
:::

### 配置示例 {#configuration-example}

让我们配置一个兼容 Windows 客户端并启用 MRRU 的 PPPoE 服务器。

```ros
[admin@RB800] /interface/pppoe-server/server> add service-name=myPPP interface=ether1 mrru=1614
[admin@RB800] /interface/pppoe-server/server> print 
Flags: X - disabled 
 0   service-name="myPPP" interface=ether1 max-mtu=1480 max-mru=1480 mrru=1614 
     authentication=pap,chap,mschap1,mschap2 keepalive-timeout=10 one-session-per-host=no 
     max-sessions=0 default-profile=default 
 
```

简而言之——标准 PPP 链路——只需在两端指定 MRRU。

## 多链路 MLPPP {#mlppp-over-multiple-links}

多链路 MLPPP 允许在多个物理连接上创建一条 PPP 链路。所有 PPP 链路必须来自同一台服务器（服务器必须支持多链路 MLPPP），并且所有 PPP 链路必须具有相同的用户名和密码。

而要启用 MLPPP，你只需创建一个 PPP 客户端并指定多个接口，而不是单个接口。RouterOS 仅支持 MLPPP 客户端。目前没有可用的 MLPPP 服务器支持。

### 配置示例 {#configuration-example-1}

![](/img/7c7ea14f6d0a9d21.webp)

ISP 为其客户提供两条物理链路（DSL 线路），每条 1Mbps。要获得聚合的 2Mbps 管道，我们必须设置 MLPPP。假设 ISP 路由器已预配置为支持 MLPPP。

路由器（R1）上的配置为：

```ros
/interface/pppoe-client 
   add service-name=ISP interface=ether1,ether2 user=xxx password=yyy disabled=no \
   add-default-route=yes use-peer-dns=yes
```

```ros
[admin@RB800] /interface/pppoe-client> print 
Flags: X - disabled, R - running 
 0    name="pppoe-out1" max-mtu=1480 max-mru=1480 mrru=disabled interface=ether1,ether2 
      user="xxx" password="yyy" profile=default service-name="ISP" ac-name="" add-default-route=yes
      dial-on-demand=no use-peer-dns=yes allow=pap,chap,mschap1,mschap2  
```

现在，当 PPPoE 客户端连接后，我们可以设置其余配置、本地网络地址、启用 DNS 请求、设置 masquerade 和防火墙

```ros
/ip/address/add address=192.168.88.1/24 interface=local

/ip/dns/set allow-remote-request=yes

/ip/firewall/nat
add chain=srcnat action=masquerade out-interface=pppoe-out1

/ip/firewall/filter
add chain=input connection-state=invalid action=drop \
	comment="Drop Invalid connections"  
add chain=input connection-state=established action=accept \
	comment="Allow Established connections"  
add chain=input protocol=icmp action=accept \
	comment="Allow ICMP" 
add chain=input src-address=192.168.88.0/24 action=accept \
	in-interface=!pppoe-out1
add chain=input action=drop comment="Drop everything else"   
```

如需更高级的路由器和客户保护，请查看[防火墙示例](../../firewall-and-quality-of-service/firewall/filter.md)。
