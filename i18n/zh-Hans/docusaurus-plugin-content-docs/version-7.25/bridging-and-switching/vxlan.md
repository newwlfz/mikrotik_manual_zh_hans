---
sidebar_key: "bridging-and-switching/vxlan"
sidebar_position: 6
title: "VXLAN"
sidebar_label: "VXLAN"
description: "本页介绍 MikroTik RouterOS 的 VXLAN 实现，涵盖其在扩展 VLAN ID 方面的用途、VXLAN 接口和 VTEP 的配置选项，以及转发表监控。它详细说明了 MTU、VNI、ARP 处理以及用于 UDP 上二层 overlay 的组播组管理等设置。"
tags:
  - 'vxlan'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/vxlan
captured_at: '2026-11-04T11:14:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

Virtual eXtensible Local Area Network (VXLAN) 是一种隧道协议，旨在解决 IEEE 802.1Q 中 VLAN ID 数量有限（4096 个）的问题，并由 IETF RFC 7348 描述。使用 VXLAN 时，标识符的大小扩展到 24 位（16777216）。它在三层网络上创建二层覆盖方案，并且该协议运行在 UDP 之上。RouterOS VXLAN 接口支持 IPv4 或 IPv6（自 7.6 版本起），但不支持双栈。

:::info
VXLAN 会为 IPv4 带来 50 字节开销，为 IPv6 带来 70 字节开销。配置 VXLAN 时，建议确保封装后的以太网帧大小不超过底层网络的 MTU，这可以通过相应配置 MTU 或限制以太网帧大小来实现。
:::

只有同一 VXLAN 段内的设备才能相互通信。每个 VXLAN 段通过一个 24 位段 ID 来标识，称为 VXLAN 网络标识符（VNI）。与大多数隧道不同，VXLAN 是一对多网络，而不仅仅是点对点。终止 VXLAN 隧道的 VXLAN 端点称为 VXLAN 隧道端点（VTEP）。RouterOS 仅支持静态配置的远程 VTEP。当需要通过 VXLAN 发送单播流量时，设备可以以类似于学习网桥的方式动态学习另一端的 IP 地址，并仅将流量转发到必要的 VTEP。对于需要泛洪（广播、未知单播和组播）到同一段内所有 VTEP 的流量，VXLAN 可以使用组播或带首端复制的单播，为每个远程 VTEP 发送一个副本。

## 配置选项 {#configuration-options}

---

本节介绍 VXLAN 接口和 VTEP 配置选项。

**子菜单：** `/interface/vxlan`

| 属性 | 描述 |
| :-- | :-- |
| **allow-fast-path** (*yes \| no*; 默认值: **yes**) | 是否允许 [Fast Path](../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path) 处理。通过 VXLAN 传输的分片和泛洪数据包将被重定向到慢速路径。使用 VRF 的 VXLAN 接口会禁用 Fast Path。该设置自 RouterOS 7.8 版本起可用。 |
| **arp** (*disabled \| enabled \| local-proxy-arp \| proxy-arp \| reply-only*; 默认值: **enabled**) | 地址解析协议（ARP）设置<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 接口将不使用 ARP</li><li><span className="ros-icon-success"><code>enabled</code></span> - 接口将使用 ARP</li><li><span className="ros-icon-success"><code>local-proxy-arp</code></span> - 路由器在接口上执行代理 ARP，并将应答发送回同一接口</li><li><span className="ros-icon-success"><code>proxy-arp</code></span> - 路由器在接口上执行代理 ARP，并将应答发送到其他接口</li><li><span className="ros-icon-success"><code>reply-only</code></span> - 接口仅应答源自与 IP/ARP 表中静态条目匹配的 IP 地址/MAC 地址组合的请求。动态条目不会自动存储到 IP/ARP 表中。因此，要使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout** (*auto \| integer*; 默认值: **auto**) | 在未从某 IP 收到数据包后，ARP 记录在 ARP 表中保留的时长。值 `auto` 等于 IP/Settings 中 `arp-timeout` 的值，默认为 30 秒。 |
| **bridge** (*name*; 默认值: ) | 将 VXLAN 接口作为从属端口添加到的[网桥](../user-guides/routing-and-networking-protocols/unicast/bgp/index.md)接口名称。 |
| **bridge-pvid** (*integer 1..4094;* 默认值: **1**) | 用于为动态网桥端口分配 PVID 参数。仅当网桥的 vlan-filtering 设置为 yes 时，此属性才会生效。 |
| **checksum**(*yes \| no*; 默认值：**no**) | 设置控制是否在发送的外部 VXLAN 数据包中计算 UDP 校验和：<span className="ros-background-accent-green-bolder"><code>no</code></span> – 在发送的外部数据包中，UDP 校验和设置为零。这还允许接收通过 IPv6 传输且 UDP 校验和为零的 VXLAN 数据包。<span className="ros-background-accent-green-bolder"><code>yes</code></span> - 在发送的外部数据包中计算 UDP 校验和。如果数据包传输使用硬件卸载，则忽略此设置，行为默认为发送 UDP 校验和为零的数据包。 |
| **comment** (*string*; 默认值: ) | 接口的简短描述。 |
| **disabled** (*yes \| no*; 默认值: **no**) | 更改接口是否被禁用。 |
| **dont-fragment**(*auto \| disabled \| enabled \| inherit*; 默认值: **auto**) | “不分片”（DF）标志控制数据包在网络中发送前是否可被拆分为更小的数据包（即分片）。在配置 VXLAN 时，此设置决定外层 IPv4 报头中是否设置 DF 标志，并且当封装的数据包超过出接口 MTU 时可以控制数据包分片。此设置有三个选项： <br/><ul><li><span className="ros-icon-success"><code>auto</code></span> - 如果设备支持 VXLAN 卸载，则 dont-fragment 模式将按 <span className="ros-icon-success"><code>enabled</code></span> 运行。如果不支持 VXLAN 卸载，则将使用 <span className="ros-background-accent-green-bolder"><code>inherit</code></span> 模式。</li><li><span className="ros-icon-success"><code>disabled</code></span> - 不在外层 IPv4 报头中设置 DF 标志，这意味着如果数据包过大而无法通过出接口发送，则可以被分片。这也允许在 VXLAN 使用 IPv6 底层网络时进行数据包分片。会在兼容设备上禁用硬件卸载。</li><li><span className="ros-icon-success"><code>enabled</code></span> - 始终在外层 IPv4 报头中设置 DF 标志，这意味着数据包不会被分片，若超过出接口的 MTU 则会被丢弃。这也避免了在 VXLAN 使用 IPv6 底层网络时的数据包分片。</li><li><span className="ros-background-accent-green-bolder"><code>inherit</code></span> - 外层 IPv4 报头中的 DF 标志取决于内层 IPv4 的 DF 标志。如果内层 IPv4 报头设置了 DF 标志，则外层 IPv4 报头也会设置。如果数据包超过出接口的 MTU 且已设置 DF，则会被丢弃。如果内层数据包不是 IP，则外层 IPv4 报头不会设置 DF 标志，数据包可以被分片。如果内层数据包是 IPv6，则外层 IPv4 报头将始终设置 DF 标志，数据包不能被分片。请注意，当 VXLAN 使用 IPv6 底层网络时，此设置不起任何作用，其处理方式与 <span className="ros-icon-success"><code>disabled</code></span> 相同。</li></ul> 该设置自 RouterOS 7.8 版本起可用。 |
| **group** (*IPv4 \| IPv6*; 默认值: ) | 指定后，可使用组播组地址在 VTEP 之间转发广播、未知单播和组播流量。此属性需要同时指定 `interface` 设置。接口将使用 IGMP 或 MLD 加入指定的组播组，请确保添加必要的 PIM 和 IGMP/MLD 配置。设置此属性后，`vteps-ip-version` 会自动更新为所使用的组播 IP 版本。会在兼容设备上禁用硬件卸载。 |
| **hw** (*yes \| no*; 默认值: **yes**) | 允许禁用硬件卸载，仅适用于支持 VXLAN 卸载的设备。 |
| **interface** (*name*; 默认值: ) | 用于组播转发的接口名称。此属性需要同时指定 `group` 设置。会在兼容设备上禁用硬件卸载。 |
| **learning**(*yes \| no*; 默认值: **yes**) | 该设置控制是否从接收到的数据包中动态学习内层源 MAC 地址和远端 VTEP IP/IPv6 地址。 |
| **local-address** (*IPv4 \| IPv6*; 默认值: ) | 指定 VXLAN 接口的本地源地址。如果未设置，则会选择一个出接口的 IP 地址作为 VXLAN 数据包的源地址。设置该属性后，`vteps-ip-version` 会自动更新为所使用的本地 IP 版本。该设置自 RouterOS 7.7 版本起可用。 |
| **mac-address** (*MAC*; 默认值: ) | 接口的静态 MAC 地址。未指定时将分配一个随机生成的 MAC 地址。 |
| **max-fdb-size** (*integer: 1*..65535**; 默认值: **4096**) | 限制 VXLAN 可在转发数据库（FDB）中存储的 MAC 地址最大数量。 |
| **mtu** (*integer*; 默认值: **1500**) | 对于最大传输单元，VXLAN 接口默认将 MTU 设置为 1500。`l2mtu` 将根据关联的 `interface` 自动设置（减去与 VXLAN 报头对应的 50 字节）。如果未指定接口，则使用 `l2mtu` 值 65535。`l2mtu` 无法更改。 |
| **name** (*text*; 默认值: **vxlan1**) | 接口名称。 |
| **port** (*integer: 1*..65535**; 默认值: **4789**) | 用于监听并向远端 VTEP 发送数据包的 UDP 端口号。 |
| **rem-csum** (*both \| none \| rx \| tx*; 默认值: **none**) | 更改 VXLAN 接口的远程校验和卸载（RCO）设置。RCO 是一种省略封装数据报内层校验和的技术，允许由网络驱动卸载外层校验和。然而，它涉及对封装协议的改动，接收方也必须支持。因此，默认情况下它是禁用的，提供该设置是为了确保与依赖此功能的系统兼容。 <br/> RCO 在以下 Internet-Draft 中有详细说明： <br/> Remote checksum offload for VXLAN, draft-herbert-vxlan-rco-00. Remote checksum offload for encapsulation, draft-herbert-remotecsumoffload-00. <br/> 如果使用了[硬件卸载](./vxlan.md#hardware-offloaded-vxlan)，则忽略此设置，行为默认为 none。 |
| **ttl** (*auto \| integer: 0*..255**; 默认值: **auto**) | 指定在发送的数据包中使用的 TTL 值。使用 `auto` 选项时，TTL 默认设置为 64。但是，如果 VXLAN 使用组播底层网络，则默认 TTL 设置为 1。如果组播网络涉及路由，则需要将 TTL 增大到更高的值。 |
| **vni** (*integer: 1..16777215*; 默认值: ) | VXLAN 网络标识符（VNI）。 |
| **vtep-vrf** (*name*; 默认值: **main**) | 为 VXLAN 接口设置 VRF，VTEP 将在该 VRF 上监听并建立连接。使用 `interface` 和组播 `group` 设置时不支持 VRF。同一个 UDP `port` 不能同时用于多个路由表。当使用未设置为 "main" 的 VRF 时，会在兼容设备上禁用硬件卸载。该设置自 RouterOS 7.7 版本起可用。 |
| **vteps-ip-version** (*ipv4 \| ipv6*; 默认值: **ipv4**) | 用于静态配置的 VTEP 的 IP 协议版本。RouterOS VXLAN 接口不支持双栈，任何配置为相反 IP 版本的远端 VTEP 都将被忽略。当设置了组播 `group` 或 `local-address` 属性时，`vteps-ip-version` 会自动更新为所使用的 IP 版本。使用 IPv6 会在兼容设备上禁用硬件卸载。该设置自 RouterOS 7.6 版本起可用。 |

**子菜单：** `/interface/vxlan/vteps`

| 属性 | 描述 |
| :-- | :-- |
| **comment** (*string*; 默认值：) | 已配置 VTEP 的简短描述。 |
| **interface** (*name*; 默认值：) | VXLAN 接口的名称。 |
| **remote-ip** (*IPv4 \| IPv6*; 默认值：) | 定义当 VXLAN 接口需要发送 BUM（广播、未知单播、组播）流量时使用的 VTEP 端点 IPv4 或 IPv6 地址。它不用作访问控制。 |

## 转发表 {#forwarding-table}

---

自 RouterOS 7.9 版本起，可以监控从远程 VTEP 学习到的 MAC 地址。

**子菜单：** `/interface/vxlan/fdb`

| 属性 | 描述 |
| :-- | :-- |
| **interface** (*只读：*name**) | VXLAN 接口的名称。 |
| **mac-address** (*只读：MAC 地址*) | MAC 地址。 |
| **remote-ip** (*只读：IPv4 \| IPv6 地址*) | 远程 VTEP 的 IPv4 或 IPv6 目标地址。 |

```ros
[admin@MikroTik] > /interface/vxlan/fdb/print          
 0 remote-ip=2001::2 mac-address=56:FF:AA:1A:72:33 interface=vxlan1 

 1 remote-ip=2002::2 mac-address=AE:EC:C4:12:8B:B9 interface=vxlan1 

 2 remote-ip=192.168.10.20 mac-address=FE:AF:58:31:A7:B6 interface=vxlan2
```

## 配置示例 {#configuration-example}

---

此配置示例在两个静态配置的 VTEP 端点之间创建单个 VXLAN 隧道。

首先，在两台路由器上创建 VXLAN 接口。

```ros
/interface/vxlan
add name=vxlan1 port=4789 vni=10
```

然后，在两台路由器上使用各自的 IPv4 目标地址配置 VTEP。两台设备都应具有通往目标地址的活动路由。

```ros
# Router1
/interface/vxlan/vteps
add interface=vxlan1 remote-ip=192.168.10.10

# Router2
/interface/vxlan/vteps
add interface=vxlan1 remote-ip=192.168.20.20
```

配置完成。可以将 VXLAN 接口与其他以太网接口一起加入网桥。

## 硬件卸载 VXLAN {#hardware-offloaded-vxlan}

---

从 RouterOS 7.18 版本开始，引入了对硬件卸载 VXLAN 的初步支持。这使得卸载的 VXLAN 数据平面成为可能，支持封装和解封装，并允许在启用 vlan-filtering 的网桥内进行静态的一对一 VLAN 到 VXLAN 映射。有关兼容设备列表，请参阅 [L3HW 设备支持](./l3-hardware-offloading.md#l3hw-device-support) 文档。

目前，一些已知功能尚未实现。

### 底层网络（路由封装后的 VXLAN 数据包） {#underlay-routing-encapsulated-vxlan-packets}

1. VTEP 不支持通过 ECMP。

2. VTEP 不支持通过 bond、bridge、VLAN 接口（仅支持独立的路由以太网接口）。

3. VTEP 不支持通过组播。

4. VTEP 无法在 VRF 内运行。

5. VTEP 不支持 IPv6。

### 覆盖网络（在以太网和 VXLAN 之间转发） {#overlay-forwarding-between-ethernet-and-vxlan}

1. 不支持在不同 VXLAN VNI 之间路由。

2. VTEP 彼此隔离，并且没有机制控制它们之间的“horizon”。

3. 桥接的 VXLAN 接口不支持 IGMP snooping。启用 snooping 后，VXLAN 上的 MDB 条目不会被卸载，并且组播流量在 Ethernet 和 VXLAN 之间会受到限制。

4. 桥接的 VXLAN 接口不受 MLAG 支持。

### 基本配置示例 {#basic-configuration-example}

在此示例中，使用静态路由到达远程 VTEP，但也可以使用 OSPF 或 BGP 等动态路由协议。上游接口具有更高的 MTU，以支持大型数据包和 VXLAN 封装。以下是网络拓扑概览：

**sfp-sfpplus1** - 上游（底层）接口  
**sfp-sfpplus3** - 用于未标记 VLAN 10 的桥接端口  
**sfp-sfpplus4** - 用于未标记 VLAN 20 的桥接端口  
**vxlan-10010** - 用于未标记 VLAN 10 的覆盖端口  
**vxlan-10020** - 用于未标记 VLAN 20 的覆盖端口

```routeros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/ethernet
set [ find default-name=sfp-sfpplus1 ] l2mtu=9500 mtu=9500
/interface/vxlan
add bridge=bridge1 bridge-pvid=10 local-address=192.168.1.1 name=vxlan-10010 vni=10010
add bridge=bridge1 bridge-pvid=20 local-address=192.168.1.1 name=vxlan-10020 vni=10020
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus3 pvid=10
add bridge=bridge1 interface=sfp-sfpplus4 pvid=20
/interface/vxlan/vteps
add interface=vxlan-10010 remote-ip=192.168.1.2
add interface=vxlan-10020 remote-ip=192.168.1.2
/ip/address
add address=192.168.1.1 interface=lo network=192.168.1.1
add address=192.168.10.10/24 interface=sfp-sfpplus1 network=192.168.10.0
/ip/route
add dst-address=192.168.1.2 gateway=192.168.10.20
/interface/ethernet/switch
set 0 l3-hw-offloading=yes
```
