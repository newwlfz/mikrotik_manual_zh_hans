---
title: "EVPN"
description: "本页介绍用于第 2 层和第 3 层 VPN 服务的 EVPN 技术，详细说明 BGP 控制平面、MPLS/VXLAN 封装以及 EVPN 路由类型（Type-1 至 Type-5）。文中解释 NVO 术语，例如 NVE、VNI 和 MAC-VRF，描述通过 ingress replication 处理 BUM 流量，并概述 symmetric/asymmetric IR。"
tags:
  - 'bgp'
  - 'evpn'
  - 'vxlan'
  - 'ospf'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/evpn
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

以太网虚拟专用网络（EVPN）是一种扩展不同网段之间 Layer 2 和 Layer 3 连接的技术。MPLS 或 VXLAN 封装通过 MPLS 或基于 IP 的网络传输以太网帧。

BGP EVPN 用作多种数据平面封装的控制平面（包括 Layer 2 和 Layer 3 VPN 服务）。MP-BGP 承载 MAC 地址、MAC/IP 绑定和 IP 前缀。

RFC7432 是最初的 EVPN 标准，定义了 BGP 作为 MPLS 数据平面的控制平面。RFC8365 扩展了对其他数据平面的支持（VXLAN、NVGRE 和 MPLS over GRE），并将 EVPN 定义为 Network Virtualization Overlay（NVO）。

## Terminology

- NVO：Network Virtualization Overlay，用于提供 Layer2 和 Layer 3 VPN 服务。
- NVE：Network Virtualization Endpoint，是 NVO 环境中的 Provider Edge（PE）节点。它负责 VPN 流量的封装/解封装。在 VXLAN 场景中，这定义了 VTEP（Virtual Tunnel End Point）。
- VNI：Virtual Network Identifier
- EVI：EVPN Instance
- RD：[Route Distinguisher](/docs/user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target#route-distinguisher) 是附加到 IP 前缀的 64 位前缀，用于使其唯一，多个租户可以使用重叠的 IP 地址范围。
- RT：[Route Target](/docs/user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target#route-targets) 是用于控制路由导入和导出的 BGP 扩展团体属性。通常，RT 基于 AS 号和 MAC-VRF 的 VNI。
- MAC-VRF：PE（VTEP）上用于 MAC 地址的 [VRF](/docs/user-guides/routing-and-networking-protocols/vrf) 表。需要 RD 和 RT。
- BUM：Broadcast、unknown Unicast 和 Multicast 流量是 vxlan 网络中的多目的 Layer2 流量。
- Ingress replication：处理 BUM 流量的单播方式。它使用 IMET 路由自动发现远端对等体。Ingress 设备将 BUM 流量复制到与 Layer-2 VNI 关联的所有 VTEPS。
- ESI - Ethernet Segment Identifier

为了使 MP-BGP 承载 EVPN，定义了新的 AFI/SAFI：25(L2 VPN)/70(EVPN)。NLRI 中的 Next-hop 地址是发布 EVPN 路由的 VTEP 的 IP 地址。

共有五种 EVPN 路由类型：

- Type‑1：（Ethernet A‑D）发布多归属以太网段的可达性。
- Type‑2：（MAC advertisement / MACIP）发布特定 EVI 学习到的 MAC/IP 绑定的 MAC 地址。
- Type‑3：（Inclusive multicast IMET）发布 Layer 2 域的成员关系，允许自动发现 VTEP。
- Type‑4：（Ethernet segment）用于发现连接到同一共享以太网段的 VTEP，适用于 EVPN 多归属模型（active‑active 或 active‑standby 转发）。
- Type‑5：（IP prefix）将 IP 前缀发布到 EVPN 域中，允许创建传统 Layer 3 VPN（请参阅 [`/routing/bgp/vpn`](/docs/cli-reference/routing/bgp/vpn)）。

数据平面封装通过 encapsulation extended community 值定义：

- 8 - VXLAN（RouterOS 当前仅支持一种）
- 9 - NVGRE
- 10 - MPLS
- 11 - MPLSoGRE

使用 EVPN 支持子网间路由有两种方法：对称和非对称集成路由与桥接（IRB）。两种方法的主要区别在于，对称方法在入口和出口 VTEP 上都支持路由和桥接，而非对称方法仅在入口支持路由，在出口仅支持桥接。对称 IRB 需要为 L3VNI 配置一个 [VRF](/docs/user-guides/routing-and-networking-protocols/vrf) 实例。

## 路由列表 {#route-list}

RouterOS 将在 [`/routing/route`](/docs/cli-reference/routing/route) 列表中显示本地和接收到的 EVPN 路由。

本地生成的路由将带有 **e-evpn** 标志。例如：

```routeros
[admin@ros_leaf_3] /routing/route> print where evpn
Flags: e - EVPN
Columns: DST-ADDRESS, GATEWAY, AFI, DISTANCE, SCOPE, TARGET-SCOPE
  DST-ADDRESS                                     GATEWAY        AFI   DISTANCE  SCOPE  TARGET-SCOPE
e [10.155.101.133:1010]macip:0|0C:50:85:84:00:01  203.0.255.133  evpn       200     40            10
e [10.155.101.133:1010]imet:0|203.0.255.133       203.0.255.133  evpn       200     40            10
e [203.0.255.133:4]imet:0|203.0.255.133           203.0.255.133  evpn       200     40            10

```

EVPN 数据编码在 `dst-address` 参数中：

```
    Dst [rd]type:x|y
         ^  ^    ^
         |  |    + - where x - tag or ESI; y - type specific data (can show mac addresses, ip addresses, ethernet segments etc.)
         |  +------- name of the EVPN route type (macip, imet, es, ad, prefix)
         +---------- route distinguisher in square brackets

```

## 配置示例 {#configuration-examples}

### 基本配置示例 {#basic-configuration-example}

基本 Layer2 EVPN Vxlan 配置：

```routeros
/interface/bridge
add name=bridge1 vlan-filtering=yes pvid=40
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus3 pvid=40

/ip/address
add address=203.0.113.1 interface=lo

/interface/vxlan
add bridge=bridge1 bridge-pvid=40 local-address=203.0.113.1 name=vxlan1 vni=100040 learning=no

/routing/bgp/instance
add as=65000 name=evpn-inst

/routing/bgp/connection
add afi=evpn instance=evpn-inst local.address=203.0.113.1 .role=ebgp multihop=yes name=to-leaf-lo remote.address=203.0.113.2 .as=65001

/routing/bgp/evpn
add instance=evpn-inst name=bgp-evpn-1o vni=100040
```

对于只有一个 VNI 的简单配置，无需设置 route distinguisher 或 [`import.route-targets`](/docs/cli-reference/routing/bgp/vpn#import.route-targets)/[`export.route-targets`](/docs/cli-reference/routing/bgp/vpn#export.route-targets)。

:::info
未指定 [RTs](/docs/user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target#route-targets) 或 [RD](/docs/user-guides/routing-and-networking-protocols/route-distinguisher-and-route-target#route-distinguisher) 时，会自动推导相应值。Route targets 设置为 `<PE ASN>:<VNI>`，route distinguishers 设置为 `<PE address>:<num derived from config id>`）。
:::

EVPN 配置直接映射到具有匹配 VNI 的 VXLAN 配置

### 与 Arista's Eos 和 ROS 的桥接 EVPN VXLAN Overlay {#bridged-evpn-vxlan-overlay-with-aristas-eos-and-ros}

#### 拓扑 {#topology}

本示例使用以下拓扑：

![](/img/63c06c8d554b8099.jpg#gh-light-mode-only)
![](/img/f73b2ee3f50a5d80.png#gh-dark-mode-only)

- 203.0.255.0/24 地址范围用于 loopback 地址
- 172.16.0.0/16 范围内的子网用于 leaf 和 spine 路由器的 underlay 连接
- 192.168.0.0/16 范围内的子网用于 VLAN 上的主机地址分配。

#### Underlay 配置 {#underlay-configuration}

Underlay 连接取决于现有网络；可以使用 eBGP、[OSPF](/docs/user-guides/routing-and-networking-protocols/unicast/ospf/areas-and-virtual-links)、ISIS，甚至静态路由。本示例使用 OSPF 作为 underlay 路由协议，发布 loopback 接口地址的路由。

**Ros\_Spine**

```routeros
/ip/address
add address=203.0.255.138 interface=lo
add address=172.16.1.1/30 interface=ether3
add address=172.16.2.1/30 interface=ether4
add address=172.16.3.1/30 interface=ether5
add address=172.16.4.1/30 interface=ether6
add address=172.16.5.1/30 interface=ether7

/routing/ospf/instance
add name=evpn_underlay
/routing/ospf/area
add disabled=no instance=evpn_underlay name=evpn-underlay-bb
/routing/ospf/interface-template
add area=evpn-underlay-bb disabled=no networks=172.16.0.0/16
add area=evpn-underlay-bb disabled=no interfaces=lo passive
```

**Ros\_Leaf\_3**

```routeros
/ip/address
add address=203.0.255.133 interface=lo
add address=172.16.3.2/30 interface=ether10

/routing/ospf/instance
add name=evpn_underlay
/routing/ospf/area
add disabled=no instance=evpn_underlay name=evpn-underlay-bb
/routing/ospf/interface-template
add area=evpn-underlay-bb disabled=no networks=172.16.0.0/16
add area=evpn-underlay-bb disabled=no interfaces=lo passive
```

**Eos\_Leaf**

```
interface Ethernet1
   no switchport
   ip address 172.16.5.2/30
!
interface Loopback0
   ip address 203.0.255.128/32
!
ip routing
!
router ospf 100
   router-id 203.0.255.135
   redistribute connected
   network 172.16.1.0/30 area 0.0.0.0
!

```

#### BGP EVPN Overlay

对于 [BGP](/docs/user-guides/routing-and-networking-protocols/unicast/bgp/understanding-bgp) overlay，使用带 loopback 地址的 [`multihop`](/docs/cli-reference/routing/bgp/connection#multihop) eBGP。

为简化配置，使用 BGP [`/routing/bgp/template`](/docs/cli-reference/routing/bgp/template) 设置公共参数，并配置 [`/routing/bgp/connection`](/docs/cli-reference/routing/bgp/connection) 监听整个 loopback 地址范围。这种方式扩展性良好：添加更多 leaf 路由器时，无需更改 spine 路由器。

此外，建议设置 [`nexthop-choice`](/docs/user-guides/routing-and-networking-protocols/unicast/bgp) 以进行传播，尤其是在有多个 spine 时。如果使用 iBGP 作为 overlay，则 spine 应为路由反射器，并且默认会进行 nexthop 传播。

**Ros\_Spine** — [`/routing/bgp/instance`](/docs/cli-reference/routing/bgp/instance)

```routeros
/routing/bgp/instance
add as=65000 name=bgp-instance-1
/routing/bgp/template
set default afi=evpn multihop=yes nexthop-choice=propagate
/routing/bgp/connection
add instance=bgp-instance-1 local.address=203.0.255.138 .role=ebgp name=evpn_leafs remote.address=\
    203.0.255.0/24 templates=default
```

**Ros\_Leaf\_3** — [`/routing/bgp/instance`](/docs/cli-reference/routing/bgp/instance)，[`/routing/bgp/connection`](/docs/cli-reference/routing/bgp/connection)

```routeros
/routing/bgp/instance
add as=65003 disabled=no name=bgp-instance-1
/routing/bgp/connection
add afi=evpn instance=bgp-instance-1 local.address=203.0.255.133 .role=ebgp multihop=yes name=to_spine remote.address=\
    203.0.255.138
```

**Eos\_Leaf**

```
service routing protocols model multi-agent
!
router bgp 65005
   neighbor SPINE_EVPN peer group
   neighbor SPINE_EVPN remote-as 65000
   neighbor SPINE_EVPN update-source Loopback0
   neighbor SPINE_EVPN ebgp-multihop 10
   neighbor SPINE_EVPN send-community extended
   neighbor 203.0.255.138 peer group SPINE_EVPN
   !
   address-family evpn
      neighbor SPINE_EVPN activate
!
```

##### 验证 BGP 连通性 {#verify-bgp-connectivity}

检查 [`/routing/bgp/session`](/docs/cli-reference/routing/bgp/session) 以验证 BGP 对等状态。

**Eos\_Leaf**

```
localhost#show bgp summary
BGP summary information for VRF default
Router identifier 203.0.255.128, local AS number 65005
Neighbor               AS Session State AFI/SAFI                AFI/SAFI State   NLRI Rcd   NLRI Acc
------------- ----------- ------------- ----------------------- -------------- ---------- ----------
203.0.255.138       65000 Established   IPv4 Unicast            Advertised              0          0
203.0.255.138       65000 Established   L2VPN EVPN              Negotiated              6          6
```

**Ros\_Leaf\_3**

```routeros
[admin@ros_leaf_3] /routing/bgp/session> print
Flags: E - established
 0 E name="to_spine-1" instance=bgp-instance-1
     remote.address=203.0.255.138 .as=65000 .id=203.0.255.138 .capabilities=mp,rr,gr,as4 .afi=evpn .messages=7 .bytes=682 .eor=""
     local.address=203.0.255.133 .as=65003 .id=203.0.255.133 .cluster-id=203.0.255.133 .capabilities=mp,rr,gr,as4 .afi=evpn .messages=7
     .bytes=698 .eor=""
     output.procid=20
     input.procid=20 ebgp
     multihop=yes hold-time=3m keepalive-time=1m uptime=1s620ms last-started=2025-05-29 11:01:38 prefix-count=0
```

#### VXLAN 和 EVPN 配置 {#vxlan-and-evpn-configuration}

**Ros\_Leaf\_3**

仅用于演示，在 RouterOS leaf 上，我们将向主机发送带 VLAN 标签的流量。

由于使用 [BGP EVPN](/docs/cli-reference/routing/bgp/evpn) 进行发现，应禁用 VXLAN 学习。EVPN 配置在 [`/routing/bgp/evpn`](/docs/cli-reference/routing/bgp/evpn) 菜单下完成。

```routeros
/interface/bridge
add name=bridge1 pvid=10 vlan-filtering=yes
/interface/vxlan
add bridge=bridge1 bridge-pvid=10 learning=no local-address=203.0.255.133 mac-address=C2:16:F6:B2:CC:D3 name=vxlan1 vni=1010
/interface/bridge/port
add bridge=bridge1 interface=ether11 pvid=10
/ip/address
add address=192.168.10.133/24 interface=bridge1
/routing/bgp/evpn
add disabled=no export.route-targets=1010:1010 import.route-targets=1010:1010 instance=bgp-instance-1 name=bgp-evpn-1 vni=1010
```

**Eos\_Leaf**

在 Arista 路由器上，我们设置 VLAN trunk，未带标签的流量将发送到主机。

```
vlan 10
!
interface Ethernet2
   switchport trunk allowed vlan 10
   switchport mode trunk
!
interface Vlan10
   ip address 192.168.10.128/24
!
interface Vxlan1
   vxlan source-interface Loopback0
   vxlan vlan 10 vni 1010
!
router bgp 65501
   vlan 10
      rd 203.0.255.128:1010
      route-target both 1010:1010
      redistribute learned
```

**Host\_1**

```routeros
/ip/address
add address=192.168.10.132/24 interface=ether2
```

**Host\_3**

```routeros
/interface/vlan
add interface=ether2 name=vlan10 vlan-id=10
/ip/address
add address=192.168.10.129/24 interface=vlan10
```

#### 验证 L2VPN 服务 {#validate-l2vpn-service}

验证 leaf 路由器上存在 **IMET** 路由，并且已发现 **VTEP**。

```routeros
[admin@ros_leaf_3] /routing/route> print where dst-address~"imet"
Flags: A - ACTIVE; b - BGP, e - EVPN
Columns: DST-ADDRESS, GATEWAY, AFI, DISTANCE, SCOPE, TARGET-SCOPE, IMMEDIATE-GW
   DST-ADDRESS                               GATEWAY        AFI   DISTANCE  SCOPE  TARGET-SCOPE  IMMEDIATE-GW
Ab [203.0.255.128:1010]imet:0|203.0.255.128  203.0.255.128  evpn        20     40            30  172.16.3.1%ether10
 e [203.0.255.133:256]imet:0|203.0.255.133   203.0.255.133  evpn       200     40            10

[admin@ros_leaf_3] /interface/vxlan/vteps> print
Flags: D - DYNAMIC
Columns: INTERFACE, REMOTE-IP
#   INTERFACE  REMOTE-IP
0 D vxlan1     203.0.255.128
```

在 Arista 上：

```
localhost#show bgp evpn route-type imet
BGP routing table information for VRF default
Router identifier 203.0.255.135, local AS number 65501
Route status codes: * - valid, > - active, S - Stale, E - ECMP head, e - ECMP
                    c - Contributing to ECMP, % - Pending BGP convergence
Origin codes: i - IGP, e - EGP, ? - incomplete
AS Path Attributes: Or-ID - Originator ID, C-LST - Cluster List, LL Nexthop - Link Local Nexthop

          Network                Next Hop              Metric  LocPref Weight  Path
 * >      RD: 203.0.255.128:1010 imet 203.0.255.128
                                 -                     -       -       0       i
 * >      RD: 203.0.255.133:256 imet 203.0.255.133
                                 203.0.255.133         -       100     0       65000 65003 i

localhost#show interfaces vxlan1
Vxlan1 is up, line protocol is up (connected)
  Hardware is Vxlan
  Source interface is Loopback0 and is active with 203.0.255.128
  Listening on UDP port 4789
  Replication/Flood Mode is headend with Flood List Source: EVPN
  Remote MAC learning via EVPN
  VNI mapping to VLANs
  Static VLAN to VNI mapping is
    [10, 1010]
  Note: All Dynamic VLANs used by VCS are internal VLANs.
        Use 'show vxlan vni' for details.
  Static VRF to VNI mapping is not configured
  Headend replication flood vtep list is:
    10 203.0.255.133
  Shared Router MAC is 0000.0000.0000

localhost#show vxlan flood vtep vlan 10
          VXLAN Flood VTEP Table
--------------------------------------------------------------------------------

VLANS                            Ip Address
-----------------------------   ------------------------------------------------
10                              203.0.255.133

```

此时，可以尝试从 **host\_1** ping **host\_3**：

```routeros
[admin@host_1] /interface> print
...
1 R ether2  ether           1500  0C:50:85:84:00:01

[admin@host_1] /ip/address> /ping 192.168.10.129
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 192.168.10.129                             56  64 17ms26us
    1 192.168.10.129                             56  64 13ms119us
    2 192.168.10.129                             56  64 17ms192us
```

**host-3**

```routeros
[admin@host_1] /interface> print
...
1 R ether2  ether           1500  0C:74:39:88:00:01
```

现在应能通过查看 MACIP 路由，确认 EVPN 用于学习远端 MAC 地址。

查看 **ros\_leaf** 上的路由，可以看到路由器 203.0.255.128 发送了 0C:74:39:88:00:01 MAC 地址的 macip 路由，该地址是位于 **eos\_leaf** 后面的 **host\_1** MAC 地址。

Eos 还会发送用于 arp/nd 抑制的 MAC/IP 绑定。遗憾的是，在撰写本文时，RouterOS 尚不具备此功能。

```routeros
[admin@ros_leaf_3] /routing/route> print where dst-address~"macip"
Flags: A - ACTIVE; b - BGP, e - EVPN
Columns: DST-ADDRESS, GATEWAY, AFI, DISTANCE, SCOPE, TARGET-SCOPE, IMMEDIATE-GW
   DST-ADDRESS                                                   GATEWAY        AFI   DISTANCE  SCOPE  TARGET-SCOPE  IMMEDIATE-GW
Ab [203.0.255.128:1010]macip:0|0C:74:39:88:00:01                 203.0.255.128  evpn        20     40            30  172.16.3.1%ether10
 e [203.0.255.133:256]macip:0|0C:50:85:84:00:01                  203.0.255.133  evpn       200     40            10
Ab [203.0.255.128:1010]macip:0|0C:74:39:88:00:01|192.168.10.129  203.0.255.128  evpn        20     40            30  172.16.3.1%ether10
```

Arista 还允许在“vxlan mac table”中查看远端学习的 MAC 地址，而“vlan mac-address table”也包含本地 MAC 地址：

```
localhost#show bgp evpn route-type mac-ip detail
BGP routing table information for VRF default
Router identifier 203.0.255.128, local AS number 65005
BGP routing table entry for mac-ip 0c50.8584.0001, Route Distinguisher: 203.0.255.133:256
 Paths: 1 available
  65000 65003
    203.0.255.133 from 203.0.255.138 (203.0.255.138)
      Origin IGP, metric -, localpref 100, weight 0, tag 0, valid, external, best
      Extended Community: Route-Target-AS:1010:1010 TunnelEncap:tunnelTypeVxlan
      VNI: 0 ESI: 0000:0000:0000:0000:0000
BGP routing table entry for mac-ip 0c74.3988.0001, Route Distinguisher: 203.0.255.128:1010
 Paths: 1 available
  Local
    - from - (0.0.0.0)
      Origin IGP, metric -, localpref -, weight 0, tag 0, valid, local, best
      Extended Community: Route-Target-AS:1010:1010 TunnelEncap:tunnelTypeVxlan
      VNI: 1010 ESI: 0000:0000:0000:0000:0000
BGP routing table entry for mac-ip 0c74.3988.0001 192.168.10.129, Route Distinguisher: 203.0.255.128:1010
 Paths: 1 available
  Local
    - from - (0.0.0.0)
      Origin IGP, metric -, localpref -, weight 0, tag 0, valid, local, best
      Extended Community: Route-Target-AS:1010:1010 TunnelEncap:tunnelTypeVxlan
      VNI: 1010 ESI: 0000:0000:0000:0000:0000

localhost#show vxlan address-table vlan 10
          Vxlan Mac Address Table
----------------------------------------------------------------------

VLAN  Mac Address     Type      Prt  VTEP             Moves   Last Move
----  -----------     ----      ---  ----             -----   ---------
  10  0c50.8584.0001  EVPN      Vx1  203.0.255.133    1       1:30:49 ago
Total Remote Mac Addresses for this criterion: 1

localhost#show mac address-table vlan 10
          Mac Address Table
------------------------------------------------------------------

Vlan    Mac Address       Type        Ports      Moves   Last Move
----    -----------       ----        -----      -----   ---------
  10    0c50.8584.0001    DYNAMIC     Vx1        1       1:31:17 ago
  10    0c74.3988.0001    DYNAMIC     Et2        1       1 day, 23:45:18 ago
Total Mac Addresses for this criterion: 2

          Multicast Mac Address Table
------------------------------------------------------------------

Vlan    Mac Address       Type        Ports
----    -----------       ----        -----
Total Mac Addresses for this criterion: 0
```

### 使用 Arista ESI LAG 的桥接 EVPN Overlay {#bridged-evpn-overlay-with-arista-esi-lag}

**ESI-LAG**（Ethernet Segment Identifier - Link Aggregation）或 **EVPN-LAG** 是一种网络概念，支持使用 **EVPN**（Ethernet Virtual Private Network）技术实现多归属。在该模式下，客户端设备（如接入交换机）可以通过多条链路连接到核心设备（如汇聚交换机），形成一个逻辑 **LAG** 接口。

#### 拓扑 {#topology-1}

扩展上一个示例中的拓扑。**Host\_2** 是一台 RouterOS 设备，在连接两台 Arista leaf 的链路上启用了 **LACP**，形成 active‑active 多归属场景。

![](/img/f668d4d418b4df89.jpg#gh-light-mode-only)
![](/img/cab72d55ae5e371e.png#gh-dark-mode-only)

#### 配置前置条件 {#configuration-prerequisities}

有关设置 underlay 和 EVPN overlay 的详情，请参阅上面的示例。本节重点介绍 ESI LAG 配置和验证。

#### Port Channel 配置 {#port-channel-configuration}

假设 underlay 和 overlay 已配置并正常运行，继续在 Arista 交换机上配置 port‑channel：

**leaf\_2** 和 **leaf\_4** 的配置完全相同

```
interface Port-Channel3
   switchport access vlan 10
   switchport trunk allowed vlan 10
   switchport mode trunk
   !
   evpn ethernet-segment
      identifier 0000:0000:0000:0333:3333
      route-target import 00:00:03:33:33:33
   lacp system-id 0000.0333.3333
!
interface Ethernet2
   channel-group 3 mode active
```

**ros\_host\_2**

```routeros
/interface/bonding
add mode=802.3ad name=bond1 slaves=ether2,ether3
/interface/vlan
add interface=bond1 mtu=1496 name=vlan10 vlan-id=10
/ip/address
add address=192.168.10.130/24 interface=vlan10
```

#### 验证设置 {#validate-setup}

现在查看 EVPN 路由时，应看到一些新的路由类型。两台 Arista 交换机都在通告 Type-1 AD 路由和 Type-4 Ethernet Segment（ES）路由，以发现多归属 VTEP

```routeros
[admin@gns3_spine1_ros] /routing/route>  print where afi=evpn dst-address~"(ad|es)"
Flags: A - ACTIVE; b - BGP
Columns: DST-ADDRESS, GATEWAY, AFI, DISTANCE, SCOPE, TARGET-SCOPE
   DST-ADDRESS                                                      GATEWAY        AFI   DISTANCE  SCOPE  TA
Ab [203.0.255.127:1]ad:4294967295|00:00:00:00:00:00:03:33:33:33     203.0.255.127  evpn        20     40  30
Ab [203.0.255.127:1]es:00:00:00:00:00:00:03:33:33:33|203.0.255.127  203.0.255.127  evpn        20     40  30
Ab [203.0.255.127:1010]ad:0|00:00:00:00:00:00:03:33:33:33           203.0.255.127  evpn        20     40  30

Ab [203.0.255.134:1]ad:4294967295|00:00:00:00:00:00:03:33:33:33     203.0.255.134  evpn        20     40  30
Ab [203.0.255.134:1]es:00:00:00:00:00:00:03:33:33:33|203.0.255.134  203.0.255.134  evpn        20     40  30
Ab [203.0.255.134:1010]ad:0|00:00:00:00:00:00:03:33:33:33           203.0.255.134  evpn        20     40  30

```

如果检查两台 Eos leaf，将看到指定的转发器 203.0.255.127（**eos\_leaf\_4**）被选中：

```
eos_leaf_2#show bgp evpn instance vlan 10
EVPN instance: VLAN 10
  Route distinguisher: 203.0.255.134:1010
  Route target import: Route-Target-AS:1010:1010
  Route target export: Route-Target-AS:1010:1010
  Service interface: VLAN-based
  Local VXLAN IP address: 203.0.255.134
  VXLAN: enabled
  MPLS: disabled
  Local ethernet segment:
    ESI: 0000:0000:0000:0333:3333
      Type: 0 (administratively configured)
      Interface: Port-Channel3
      Mode: all-active
      State: up
      ES-Import RT: 00:00:03:33:33:33
      DF election algorithm: modulus
      Designated forwarder: 203.0.255.127
      Non-Designated forwarder: 203.0.255.134

```

暂停 **host2** 到 **eos\_leaf\_4** 的链路并观察结果：

```
eos_leaf_2#show bgp evpn instance vlan 10
EVPN instance: VLAN 10
  Route distinguisher: 203.0.255.134:1010
  Route target import: Route-Target-AS:1010:1010
  Route target export: Route-Target-AS:1010:1010
  Service interface: VLAN-based
  Local VXLAN IP address: 203.0.255.134
  VXLAN: enabled
  MPLS: disabled
  Local ethernet segment:
    ESI: 0000:0000:0000:0333:3333
      Type: 0 (administratively configured)
      Interface: Port-Channel3
      Mode: all-active
      State: up
      ES-Import RT: 00:00:03:33:33:33
      DF election algorithm: modulus
      Designated forwarder: 203.0.255.134

[admin@spine1_ros] /routing/route>  print interval=1 where dst-address~"ad|es"
Flags: A - ACTIVE; b - BGP
Columns: DST-ADDRESS, GATEWAY, AFI, DISTANCE, SCOPE, TARGET-SCOPE
   DST-ADDRESS                                                      GATEWAY        AFI   DISTANCE  SCOPE  TA
Ab [203.0.255.134:1]ad:4294967295|00:00:00:00:00:00:03:33:33:33     203.0.255.134  evpn        20     40  30
Ab [203.0.255.134:1]es:00:00:00:00:00:00:03:33:33:33|203.0.255.134  203.0.255.134  evpn        20     40  30
Ab [203.0.255.134:1010]ad:0|00:00:00:00:00:00:03:33:33:33           203.0.255.134  evpn        20     40  30

[admin@host_2] /interface/bonding> /ping 192.168.10.132 interval=500ms
  SEQ HOST                                     SIZE TTL TIME       STATUS
    0 192.168.10.132                             56  64 2ms90us
    1 192.168.10.132                             56  64 2ms172us
    2 192.168.10.132                             56  64 2ms503us
    3 192.168.10.132                                               timeout
    4 192.168.10.132                                               timeout
    5 192.168.10.132                                               timeout
    6 192.168.10.132                             56  64 2ms191us
    7 192.168.10.132                             56  64 2ms31us
```

**eos\_leaf\_2** 成为转发器，**eos\_leaf\_4** 撤销 ES 和 AD 路由，流量切换到另一条 LACP 链路。
