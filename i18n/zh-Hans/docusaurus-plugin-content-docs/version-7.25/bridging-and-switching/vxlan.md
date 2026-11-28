---
title: "VXLAN"
description: "本页介绍 MikroTik RouterOS 的 VXLAN 实现，涵盖其扩展 VLAN ID 的用途、VXLAN 接口和 VTEP 的配置选项，以及转发表监控。文中详细说明 MTU、VNI、ARP 处理和组播组管理等设置，用于在 UDP 之上构建 Layer 2 overlay。"
tags:
  - 'vxlan'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/vxlan
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

Virtual eXtensible Local Area Network（VXLAN）是一种隧道协议，旨在解决 IEEE 802.1Q 中 VLAN ID 数量有限（4096）的问题，由 IETF RFC 7348 描述。使用 VXLAN 时，标识符大小扩展为 24 位（16777216）。它在三层网络上创建二层 overlay 方案，协议运行在 UDP 之上。RouterOS VXLAN 接口支持 IPv4 或 IPv6（自版本 7.6 起），但不支持双栈。

:::info
VXLAN 会为 IPv4 增加 50 字节开销，为 IPv6 增加 70 字节开销。配置 VXLAN 时，建议通过相应配置 MTU 或限制以太网帧大小，确保封装后的以太网帧大小不超过底层网络的 MTU。
:::

只有同一 VXLAN 段内的设备可以相互通信。每个 VXLAN 段通过 24 位段 ID 标识，称为 VXLAN Network Identifier（VNI）。与大多数隧道不同，VXLAN 是 1 对 N 网络，而不仅仅是点对点。终止 VXLAN 隧道的 VXLAN 端点称为 VXLAN tunnel endpoints（VTEPs）。RouterOS 仅支持静态配置的远端 VTEP。当需要通过 VXLAN 发送单播流量时，设备可以类似学习网桥的方式动态学习另一端点的 IP 地址，并仅将流量转发到必要的 VTEP。对于需要泛洪到同一段内所有 VTEP 的流量（广播、未知单播和组播），VXLAN 可以使用组播，或使用带头端复制的单播，为每个远端 VTEP 发送一个副本。

## 配置选项 {#configuration-options}

---

本节介绍 VXLAN 接口和 VTEP 配置项。

**子菜单：** `/interface/vxlan`

| 属性 | 说明 |
| :-- | :-- |
| **allow-fast-path** (*yes \| no*；默认值：**yes**) | 是否允许 [Fast Path](/docs/firewall-and-quality-of-service/packet-flow-in-routeros#fast-path) 处理。通过 VXLAN 传输的分片数据包和泛洪数据包会经由慢速路径重定向。对于使用 VRF 的 VXLAN 接口，Fast Path 会被禁用。该设置自 RouterOS 7.8 版本起可用。 |
| **arp** (*disabled \| enabled \| local-proxy-arp \| proxy-arp \| reply-only*；默认值：**enabled**) | 地址解析协议设置<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 接口将不使用 ARP</li><li><span className="ros-icon-success"><code>enabled</code></span> - 接口将使用 ARP</li><li><span className="ros-icon-success"><code>local-proxy-arp</code></span> - 路由器在接口上执行代理 ARP，并将回复发送到同一接口</li><li><span className="ros-icon-success"><code>proxy-arp</code></span> - 路由器在接口上执行代理 ARP，并将回复发送到其他接口</li><li><span className="ros-icon-success"><code>reply-only</code></span> - 接口仅回复来自 IP 地址/MAC 地址组合匹配且已在 IP/ARP 表中作为静态条目输入的请求。不会自动在 IP/ARP 表中存储动态条目。因此，要使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout** (*auto \| integer*；默认值：**auto**) | 在不再从 IP 收到数据包后，ARP 记录在 ARP 表中保留多长时间。值 `auto` 等于 IP/Settings 中的 `arp-timeout` 值，默认值为 30 秒。 |
| **arp-accept** (*yes \| no*；默认值：**no**) | 定义接受从尚未存在于 ARP 表中的设备收到的无偿 ARP（GARP）帧的行为：<ul><li><span className="ros-icon-success"><code>no</code></span> - 不在 ARP 表中创建新条目</li><li><span className="ros-icon-success"><code>yes</code></span> - 在 ARP 表中创建新条目</li></ul> 该设置自 RouterOS 7.25.1 版本起可用。 |
| **bridge** (*name*；默认值：) | VXLAN 接口将作为从属端口添加到的 [bridge](/docs/user-guides/routing-and-networking-protocols/unicast/bgp) 接口名称。 |
| **bridge-pvid** (*integer 1..4094;* 默认值：**1**) | 用于为动态网桥端口分配 PVID 参数。仅当 bridge vlan-filtering 设置为 yes 时，该属性才生效。 |
| **checksum**(*yes \| no*；默认值：**no**) | 该设置控制是否在发送的外部 VXLAN 数据包中计算 UDP 校验和： <br/><ul><li><span className="ros-icon-success"><code>no</code></span> – 在发送的外部数据包中将 UDP 校验和设置为零。这也允许接收 UDP 校验和为零的 IPv6 VXLAN 数据包。</li><li><span className="ros-icon-success"><code>yes</code></span> - 在发送的外部数据包中计算 UDP 校验和。</li></ul> 如果使用硬件卸载进行数据包传输，则该设置会被忽略，行为默认为发送 UDP 校验和为零的数据包。 |
| **comment** (*string*；默认值：) | 接口的简短描述。 |
| **disabled** (*yes \| no*；默认值：**no**) | 更改接口是否禁用。 |
| **dont-fragment**(*auto \| disabled \| enabled \| inherit*；默认值：**auto**) | Don't Fragment（DF）标志控制数据包在通过网络发送之前是否可以拆分为称为分片的较小数据包。配置 VXLAN 时，该设置决定外部 IPv4 报头中是否存在 DF 标志，并可在封装数据包超过出接口 MTU 时控制数据包分片。该设置有三个选项： <br/><ul><li><span className="ros-icon-success"><code>auto</code></span> - 如果设备支持 VXLAN 卸载，dont-fragment 模式将按 <span className="ros-icon-success"><code>enabled</code></span> 运行。如果不支持 VXLAN 卸载，则将使用 <span className="ros-background-accent-green-bolder"><code>inherit</code></span> 模式。</li><li><span className="ros-icon-success"><code>disabled</code></span> - 外部 IPv4 报头中未设置 DF 标志，这意味着如果数据包过大而无法通过出接口发送，则可以对其进行分片。当 VXLAN 使用 IPv6 underlay 时，这也允许数据包分片。在兼容设备上会禁用硬件卸载。</li><li><span className="ros-icon-success"><code>enabled</code></span> - 外部 IPv4 报头中始终设置 DF 标志，这意味着数据包不会被分片，如果超过出接口的 MTU，则会被丢弃。当 VXLAN 使用 IPv6 underlay 时，这也避免了数据包分片。</li><li><span className="ros-background-accent-green-bolder"><code>inherit</code></span> - 外部 IPv4 报头上的 DF 标志基于内部 IPv4 DF 标志。如果内部 IPv4 报头设置了 DF 标志，则外部 IPv4 报头也会设置该标志。如果数据包超过出接口的 MTU 且设置了 DF，则会被丢弃。如果内部数据包为非 IP 数据包，则外部 IPv4 报头不会设置 DF 标志，数据包可以被分片。如果内部数据包为 IPv6，则外部 IPv4 报头将始终设置 DF 标志，数据包无法被分片。请注意，当 VXLAN 使用 IPv6 underlay 时，该设置不起作用，并按与 <span className="ros-icon-success"><code>disabled</code></span> 相同的方式处理。</li></ul> 该设置自 RouterOS 7.8 版本起可用。 |
| **group** (*IPv4 \| IPv6*；默认值：) | 指定后，可使用组播组地址在 VTEP 之间转发广播、未知单播和组播流量。该属性需要指定 `interface` 设置。接口将使用 IGMP 或 MLD 加入指定的组播组，请确保添加必要的 PIM 和 IGMP/MLD 配置。设置该属性时，`vteps-ip-version` 会自动更新为所使用的 IP 版本。在兼容设备上会禁用硬件卸载。 |
| **hw** (*yes \| no*；默认值：**yes**) | 允许禁用硬件卸载，仅适用于支持 VXLAN 卸载的设备。 |
| **interface** (*name*；默认值：) | 用于组播转发的接口名称。该属性需要指定 `group` 设置。在兼容设备上会禁用硬件卸载。 |
| **learning**(*yes \| no*；默认值：**yes**) | 该设置控制是否从收到的数据包中动态学习内部源 MAC 地址和远端 VTEP IP/IPv6 地址。 |
| **local-address** (*IPv4 \| IPv6*；默认值：) | 指定 VXLAN 接口的本地源地址。如果未设置，将选择出接口的一个 IP 地址作为 VXLAN 数据包的源地址。设置该属性时，`vteps-ip-version` 会自动更新为所使用的本地 IP 版本。该设置自 RouterOS 7.7 版本起可用。 |
| **mac-address** (*MAC*；默认值：) | 接口的静态 MAC 地址。未指定时，将分配一个随机生成的 MAC 地址。 |
| **max-fdb-size** (*integer: 1*..65535**；默认值：**4096**) | 限制 VXLAN 可在转发表（FDB）中存储的 MAC 地址最大数量。 |
| **mtu** (*integer*；默认值：**1500**) | 对于最大传输单元，VXLAN 接口默认将 MTU 设置为 1500。`l2mtu` 将根据关联的 `interface` 自动设置（减去与 VXLAN 报头对应的 50 字节）。如果未指定接口，则使用 `l2mtu` 值 65535。`l2mtu` 无法更改。 |
| **name** (*text*；默认值：**vxlan1**) | 接口名称。 |
| **port** (*integer: 1*..65535**；默认值：**4789**) | 用于监听和向远端 VTEP 发送数据包的 UDP 端口号。 |
| **rem-csum** (*both \| none \| rx \| tx*；默认值：**none**) | 更改 VXLAN 接口的 Remote Checksum Offload（RCO）设置。RCO 是一种省略封装数据报内部校验和的技术，使外部校验和可由网络驱动程序卸载。不过，它确实涉及对封装协议的更改，接收方也必须支持该更改。因此，该选项默认禁用；提供该设置是为了确保与依赖此功能的系统兼容。 <br/> RCO 在以下 Internet-Draft 中有详细说明： <br/> Remote checksum offload for VXLAN，draft-herbert-vxlan-rco-00。Remote checksum offload for encapsulation，draft-herbert-remotecsumoffload-00。 <br/> 如果使用 <a href="/docs/bridging-and-switching/vxlan#hardware-offloaded-vxlan">硬件卸载</a>，则该设置会被忽略，行为默认为 none。 |
| **ttl** (*auto \| integer: 0*..255**；默认值：**auto**) | 指定外出数据包中使用的 TTL 值。默认情况下，使用 `auto` 选项时 TTL 设置为 64。但是，如果 VXLAN 使用组播 underlay 网络，则默认 TTL 设置为 1。如果组播网络涉及路由，则需要将 TTL 增大到更高的值。 |
| **vni** (*integer: 1..16777215*；默认值：) | VXLAN 网络标识符（VNI）。 |
| **vtep-vrf** (*name*；默认值：**main**) | 为 VXLAN 接口设置 VRF，VTEP 在该 VRF 中监听并建立连接。使用 `interface` 和组播 `group` 设置时不支持 VRF。同一 UDP `port` 不能同时在多个路由表中使用。使用未设置为“main”的 VRF 时，兼容设备上的硬件卸载会被禁用。该设置自 RouterOS 7.7 版本起可用。 |
| **vteps-ip-version** (*ipv4 \| ipv6*；默认值：**ipv4**) | 静态配置 VTEP 所使用的 IP 协议版本。RouterOS VXLAN 接口不支持双栈，任何使用相反 IP 版本配置的远端 VTEP 都将被忽略。设置组播 `group` 或 `local-address` 属性时，`vteps-ip-version` 会自动更新为所使用的 IP 版本。使用 IPv6 会在兼容设备上禁用硬件卸载。该设置自 RouterOS 7.6 版本起可用。 |

**子菜单：** `/interface/vxlan/vteps`

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 已配置 VTEP 的简短说明。 |
| **interface** (*name*; Default: ) | VXLAN 接口的名称。 |
| **remote-ip** (*IPv4 \| IPv6*; Default: ) | 定义 VTEP 端点的 IPv4 或 IPv6 地址，当 VXLAN 接口需要发送 BUM（广播、未知单播、组播）流量时使用该地址。它不用于访问控制。 |

## 转发表 {#forwarding-table}

---

自 RouterOS 7.9 起，可以监控从远端 VTEP 学习到的 MAC 地址。

**子菜单：** `/interface/vxlan/fdb`

| 属性 | 说明 |
| :-- | :-- |
| **interface** (*read-only: *name**) | VXLAN 接口的名称。 |
| **mac-address** (*read-only: MAC address*) | MAC 地址。 |
| **remote-ip** (*read-only: IPv4 \| IPv6 address*) | 远端 VTEP 的 IPv4 或 IPv6 目的地址。 |

```ros
[admin@MikroTik] > /interface/vxlan/fdb/print          
 0 remote-ip=2001::2 mac-address=56:FF:AA:1A:72:33 interface=vxlan1 

 1 remote-ip=2002::2 mac-address=AE:EC:C4:12:8B:B9 interface=vxlan1 

 2 remote-ip=192.168.10.20 mac-address=FE:AF:58:31:A7:B6 interface=vxlan2
```

## 配置示例 {#configuration-example}

---

该配置示例在两个静态配置的 VTEP 端点之间创建一条 VXLAN 隧道。

首先，在两台路由器上创建 VXLAN 接口。

```ros
/interface/vxlan
add name=vxlan1 port=4789 vni=10
```

然后在两台路由器上配置 VTEP，并分别指定 IPv4 目的地址。两台设备都应有通往目的地址的活动路由。

```ros
# Router1
/interface/vxlan/vteps
add interface=vxlan1 remote-ip=192.168.10.10

# Router2
/interface/vxlan/vteps
add interface=vxlan1 remote-ip=192.168.20.20
```

配置完成。可以将 VXLAN 接口加入包含其他以太网接口的网桥。

## 硬件卸载 VXLAN {#hardware-offloaded-vxlan}

---

从 RouterOS 7.18 版本开始，引入了对硬件卸载 VXLAN 的初步支持。这使得卸载的 VXLAN 数据平面成为可能，支持封装和解封装，并允许在启用 vlan-filtering 的网桥中进行静态一对一 VLAN 到 VXLAN 映射。兼容设备列表请参阅 [L3HW Device Support](/docs/7.24/bridging-and-switching/l3-hardware-offloading#l3hw-device-support) 文档。

目前，部分已知功能尚未实现。

### Underlay（路由封装的 VXLAN 数据包） {#underlay-routing-encapsulated-vxlan-packets}

1. 不支持通过 ECMP 使用 VTEP。

2. 不支持通过 bond、网桥、VLAN 接口使用 VTEP（仅支持独立路由的以太网接口）。

3. 不支持通过组播运行 VTEP。

4. VTEP 无法在 VRF 内运行。

5. 不支持将 VTEP 与 IPv6 配合使用。

### Overlay（Ethernet 和 VXLAN 之间的转发） {#overlay-forwarding-between-ethernet-and-vxlan}

1. 不支持在不同 VXLAN VNI 之间进行路由。

2. VTEP 相互隔离，没有机制控制它们之间的“horizon”。

3. 网桥中的 VXLAN 接口不支持 IGMP snooping。启用 snooping 时，VXLAN 上的 MDB 条目不会被卸载，组播流量在 Ethernet 和 VXLAN 之间会受到限制。

4. MLAG 不支持网桥中的 VXLAN 接口。

### 基本配置示例 {#basic-configuration-example}

在本示例中，使用静态路由访问远端 VTEP，但也可以使用 OSPF 或 BGP 等动态路由协议。上游接口使用较高的 MTU，以支持大数据包和 VXLAN 封装。以下是网络拓扑概述：

**sfp-sfpplus1** - 上游（underlay）接口  
**sfp-sfpplus3** - 未标记 VLAN 10 的网桥端口  
**sfp-sfpplus4** - 未标记 VLAN 20 的网桥端口  
**vxlan-10010** - 未标记 VLAN 10 的 overlay 端口  
**vxlan-10020** - 未标记 VLAN 20 的 overlay 端口

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
