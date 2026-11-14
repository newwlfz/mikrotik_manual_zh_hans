---
sidebar_key: "user-guides/routing-and-networking-protocols/unicast/bfd"
sidebar_position: 1
title: "BFD"
sidebar_label: "BFD"
description: "双向转发检测（BFD）是一种低延迟协议，用于检测网络路径中的故障，其运行独立于路由协议。它使用 UDP 封装，端口可配置，并支持多跳会话，但目前缺少回显模式和认证。配置涉及在 RouterOS CLI 中指定接口、地址和 VRF。"
tags:
  - 'routing'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/unicast/bfd
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**双向转发检测**（**BFD**）是一种低开销、短时协议，用于检测两个转发引擎之间双向路径上的故障。这包括物理接口、子接口、数据链路，以及尽可能包括转发引擎本身，且延迟都非常低。它独立于介质、数据协议和路由协议运行。

**BFD** 是一种 hello 协议，用于检查双向邻居可达性。它提供亚秒级链路故障检测，并且不同于协议 hello 定时器，它不特定于任何路由协议。

**Control** 数据封装在目的端口为 3784 的 **UDP** 帧中；端口 4784 用于多跳路径。源端口范围是 49152 – 65535。  
**Echo** 封装在目的端口为 3785 的 UDP 帧中。

标准与技术：

- [RFC 5880 双向转发检测（BFD）](https://datatracker.ietf.org/doc/rfc5880/)
- [RFC 5881 用于 IPv4 和 IPv6 的 BFD](https://datatracker.ietf.org/doc/rfc5881/)
- [RFC 5882 BFD 的通用应用](https://datatracker.ietf.org/doc/rfc5882/)
- [RFC 5883 用于多跳路径的双向转发检测（BFD）](https://datatracker.ietf.org/doc/rfc5883/)

## 尚不支持的功能 {#features-not-yet-supported}

- Echo 模式。
- 为 ip route 网关启用 BFD。
- 认证。

## 配置 {#configuration}

允许或禁止 **BFD** 会话可通过 [`/routing/bfd/configuration`](../../../cli-reference/routing/bfd/configuration.md) 菜单完成。例如：

```ros
/routing bfd configuration
add interfaces=sfp12 forbid-bfd=yes
add interfaces=static
```

配置条目对顺序敏感，这意味着在上面的示例中，我们显式禁止 "sfp12" 接口上的 BFD 会话（使用 [`forbid-bfd`](../../../cli-reference/routing/bfd/configuration.md#forbid-bfd)），并允许属于 "static" 接口列表的其余接口上的 BFD 会话。

为了能够过滤多跳会话，可使用 [`addresses`](../../../cli-reference/routing/bfd/configuration.md#addresses) 或 [`address-list`](../../../cli-reference/routing/bfd/configuration.md#address-list) 属性来匹配目标地址，以及相应的 [`vrf`](../../../cli-reference/routing/bfd/configuration.md#vrf)（如果会话未运行在 "main" VRF 中）。

```ros
/ip firewall address-list
add address=10.155.255.183 list=bgp_allow_bfd
add address=10.155.255.217 list=bgp_allow_bfd

/routing bfd configuration
add addresses=111.111.0.0/16 vrf=vrf1
add address-list=bgp_allow_bfd
```

任何未在配置中显式列出的内容默认都被禁止。

### BFD 与 BGP {#bfd-with-bgp}

要为 [BGP](./bgp/index.md) 会话启用 BFD，请在 [`/routing/bgp/connection`](../../../cli-reference/routing/bgp/connection.md#use-bfd) 菜单中的所需条目上设置 [`use-bfd`](../../../cli-reference/routing/bgp/connection.md)。

当关联的 BFD 会话处于 down 状态时，BGP 会话输出会显示出来：

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

要为 [OSPF](./ospf/index.md) 邻居启用 BFD，请在 [`/routing/ospf/interface-template`](../../../cli-reference/routing/ospf/interface-template.md#use-bfd) 菜单中的所需条目上设置 [`use-bfd`](../../../cli-reference/routing/ospf/interface-template.md)。

## 会话状态 {#session-status}

在 [`/routing/bfd/session`](../../../cli-reference/routing/bfd/session.md) 菜单中查看当前会话的状态：

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

BFD 会选择本地 tx 间隔和远端最小 rx 间隔中的较大者作为期望发送间隔。如果会话未建立，期望最小 tx 间隔默认为 1 秒。
