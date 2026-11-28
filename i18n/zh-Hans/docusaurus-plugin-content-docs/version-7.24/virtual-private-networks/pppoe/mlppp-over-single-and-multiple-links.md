---
title: "单条和多条链路上的 MLPPP"
description: "MLPPP 通过在多个逻辑或物理链路上拆分和重组数据来增强 PPP 链路，无需升级硬件即可增加带宽。它支持单链路（使用 MRRU）和多链路配置，并提供了 PPPoE 服务器/客户端设置示例。"
tags:
  - 'mlppp'
  - 'ppp'
  - 'lcp'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/pppoe/mlppp-over-single-and-multiple-links
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**标准：** `RFC 1990`

多链路点对点协议（MP、Multi-Link PPP、MultiPPP 或 MLPPP）是一种在多个逻辑数据链路上拆分、重组和排序数据的方法。

当一对设备之间有多条 DSL 链路时，可以使用 Multi-Link PPP 通过“加宽管道”提高两台设备之间的性能，而无需采用更新、更昂贵的技术。

大数据包实际上会被拆分为分片，并在所有逻辑数据链路上均匀发送。该过程瞬时完成，不会损失带宽。务必了解链路另一端需要使用相同协议来重组数据。

多链路基于 [LCP](/docs/mobile-networking/ppp#introduction) 选项协商，该协商可向对端指示其具备组合多个物理链路的能力。

## 单链路上的 MLPPP {#mlppp-over-single-link}

通常，由于开销，通过 PPP 链路发送的数据包大小会减小。MP 可用于在单条 ppp 链路上发送和接收完整帧。为实现这一点，多链路协议使用额外的 LCP 配置选项 **Multilink Maximum Received Reconstructed Unit (MRRU)**。

要在单链路上启用 Multi-link PPP，必须指定 MRRU（Maximum Receive Reconstructed Unit）选项。如果双方都支持该功能，则无需在 firewall mangle 中调整 MSS。研究表明，MRRU 的 CPU 开销低于每个客户端使用 2 条 mangle 规则。MRRU 允许将数据包划分到多个通道，从而提高可能的 MTU 和 MRU（最高 65535 字节）。

在 Windows 下，可在“网络”选项卡的“设置”按钮中启用“Negotiate multi-link for single link connections”。其 MRRU 硬编码为 1614。

:::warning
启用 MPPE 加密时，MTU 将减少 4 字节以正常工作
:::

### 配置示例 {#configuration-example}

配置兼容 Windows 客户端且启用 MRRU 的 pppoe 服务器。

```ros
[admin@RB800] /interface/pppoe-server/server> add service-name=myPPP interface=ether1 mrru=1614
[admin@RB800] /interface/pppoe-server/server> print 
Flags: X - disabled 
 0   service-name="myPPP" interface=ether1 max-mtu=1480 max-mru=1480 mrru=1614 
     authentication=pap,chap,mschap1,mschap2 keepalive-timeout=10 one-session-per-host=no 
     max-sessions=0 default-profile=default 
 
```

简而言之，标准 PPP 链路只需在两端指定 MRRU。

## 多链路上的 MLPPP {#mlppp-over-multiple-links}

多链路上的 MLPPP 允许通过多个物理连接创建单条 PPP 链路。所有 PPP 链路必须来自同一服务器（服务器必须支持多链路上的 MLPPP），并且所有 PPP 链路必须使用相同的用户名和密码。

要启用 MLPPP，只需创建 PPP 客户端并指定多个接口，而不是单个接口。RouterOS 仅支持 MLPPP 客户端。目前不支持 MLPPP 服务器。

### 配置示例 {#configuration-example-1}

![](/img/7c7ea14f6d0a9d21.webp)

ISP 为其客户端提供两条物理链路（DSL 线路），每条 1Mbps。要获得聚合后的 2Mbps 管道，必须配置 MLPPP。假设 ISP 路由器已预配置为支持 MLPPP。

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

当 PPPoE 客户端连接后，可以配置其余设置：本地网络地址、启用 DNS 请求、配置 masquerade 和防火墙。

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

有关更高级的路由器和客户保护，请查看[防火墙示例](/docs/firewall-and-quality-of-service/firewall/filter)。
