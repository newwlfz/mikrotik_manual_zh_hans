---
title: "BFD"
description: "双向转发检测（BFD）是一种低延迟协议，用于检测网络路径中的故障，独立于路由协议运行。它使用可配置端口的 UDP 封装，并支持多跳会话，但目前不支持回显模式和认证。配置时需要在 RouterOS CLI 中指定接口、地址和 VRF。"
tags:
  - 'routing'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/bfd
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "user-guides/routing-and-networking-protocols/unicast"
pagination_next: "user-guides/routing-and-networking-protocols/unicast/bgp"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**双向转发检测**（**BFD**）是一种低开销、短时长的协议，用于检测两个转发引擎之间双向路径中的故障。这包括物理接口、子接口、数据链路，以及尽可能包括转发引擎本身，且延迟非常低。它独立于介质、数据协议和路由协议运行。

**BFD** 是一种 hello 协议，用于检查双向邻居可达性。它提供亚秒级链路故障检测，并且不像协议 hello 定时器那样特定于任何路由协议。

**Control** 数据封装在目的端口为 3784 的 **UDP** 帧中；端口 4784 用于多跳路径。源端口范围为 49152 – 65535。  
**Echo** 封装在目的端口为 3785 的 UDP 帧中。

标准和技术：

- [RFC 5880 Bidirectional Forwarding Detection (BFD)](https://datatracker.ietf.org/doc/rfc5880/)
- [RFC 5881 BFD for IPv4 and IPv6](https://datatracker.ietf.org/doc/rfc5881/)
- [RFC 5882 Generic Application of BFD](https://datatracker.ietf.org/doc/rfc5882/)
- [RFC 5883 Bidirectional Forwarding Detection (BFD) for Multihop Paths](https://datatracker.ietf.org/doc/rfc5883/)

## 尚不支持的功能 {#features-not-yet-supported}

- Echo 模式。
- 为 ip route 网关启用 BFD。
- 认证。

## 配置 {#configuration}

可以在 [`/routing/bfd/configuration`](/docs/cli-reference/routing/bfd/configuration) 菜单中允许或禁止 **BFD** 会话。例如：

```ros
/routing bfd configuration
add interfaces=sfp12 forbid-bfd=yes
add interfaces=static
```

配置条目对顺序敏感，这意味着在上例中，我们在“sfp12”接口上显式禁止 BFD 会话（使用 [`forbid-bfd`](/docs/cli-reference/routing/bfd/configuration#forbid-bfd)），并允许属于“static”接口列表的其余接口建立 BFD 会话。

要过滤多跳会话，可以使用 [`addresses`](/docs/cli-reference/routing/bfd/configuration#addresses) 或 [`address-list`](/docs/cli-reference/routing/bfd/configuration#address-list) 属性匹配目的地址；如果会话不在“main”VRF 中运行，还可以使用相应的 [`vrf`](/docs/cli-reference/routing/bfd/session#vrf)。

```ros
/ip firewall address-list
add address=10.155.255.183 list=bgp_allow_bfd
add address=10.155.255.217 list=bgp_allow_bfd

/routing bfd configuration
add addresses=111.111.0.0/16 vrf=vrf1
add address-list=bgp_allow_bfd
```

未在配置中显式列出的所有内容默认禁止。

### BFD 与 BGP {#bfd-with-bgp}

要为 [BGP](/docs/user-guides/routing-and-networking-protocols/unicast/bgp) 会话启用 BFD，请在 [`/routing/bgp/connection`](/docs/cli-reference/routing/bgp/connection) 菜单中的所需条目上设置 [`use-bfd`](/docs/cli-reference/routing/bgp/connection#use-bfd)。

BGP 会话输出会显示关联的 BFD 会话何时断开：

```ros
[admin@dr_02_BGP_MUM] /routing/bgp/session> print 
Flags: E - established 
 0 E ;;; BFD session down
     name="ovpn_test1-1" 
     remote.address=111.111.11.11@vrf1 .as=65530 .id=10.155.101.217 
     .capabilities=mp,rr,as4 .hold-time=infinity .messages=40717 
     .bytes=3436281 .eor="" 
     local.address=111.111.11.12@vrf1 .as=555 .id=111.111.11.12 
     .capabilities=mp,rr,gr,as4 .messages=1 .bytes=19 .eor="" 
     output.procid=20 
     input.procid=20 .filter=bgp-in ebgp 
     hold-time=infinity use-bfd=yes uptime=3s210ms 
     last-started=2023-05-19 09:54:04 prefix-count=3853 
```

### BFD 与 OSPF {#bfd-with-ospf}

要为 [OSPF](/docs/user-guides/routing-and-networking-protocols/unicast/ospf) 邻居启用 BFD，请在 [`/routing/ospf/interface-template`](/docs/cli-reference/routing/ospf/interface-template) 菜单中的所需条目上设置 [`use-bfd`](/docs/cli-reference/routing/ospf/interface-template#use-bfd)。

## 会话状态 {#session-status}

在 [`/routing/bfd/session`](/docs/cli-reference/routing/bfd/session) 菜单中查看当前会话的状态：

```ros
[admin@dr_02_BGP_MUM] /routing/bfd/session> print 
Flags: U - up, I - inactive 
 0 I ;;; BFD forbidden for destination address
     multihop=yes remote-address=10.155.101.183 local-address="" desired-tx-interval=0ms required-min-rx=0ms 
     multiplier=0 

 1   multihop=no remote-address=111.111.11.11%ovpn-out1@vrf1 local-address=111.111.11.12@vrf1 state=down 
     state-changes=0 desired-tx-interval=200ms required-min-rx=200ms remote-min-rx=1us multiplier=5 
     packets-rx=0 packets-tx=7674 
```

BFD 会选择本地 tx 间隔和远端最小 rx 间隔中较大的值作为期望的发送间隔。如果会话未建立，则期望的最小 tx 间隔默认为 1 秒。
