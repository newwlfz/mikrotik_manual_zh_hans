---
title: "网桥 IGMP/MLD 侦听"
description: "本页介绍 MikroTik RouterOS 网桥的 IGMP/MLD snooping 功能，通过将组播流过滤到已订阅端口，实现高效转发组播流量。内容涵盖 IGMP/MLD 版本、querier 检测、组播路由器状态的配置选项，以及用于管理组播数据库条目的监控工具。"
tags:
  - 'igmp'
  - 'mld'
  - 'sdvoe'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/user-guides/bridge-igmp-mld-snooping
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

IGMP（Internet Group Management Protocol）和 MLD（Multicast Listener Discovery）snooping 是网桥功能，使网桥能够被动监听 IGMP/MLD 网络通信，并使用这些信息为组播流量做出智能转发决策。默认情况下，网桥会将所有组播流量泛洪到每个网桥端口，与广播流量的处理方式类似。对于某些应用（例如组播视频流或 SDVoE（Software Defined Video over Ethernet）部署），这种默认行为可能并不理想。IGMP/MLD snooping 通过仅将组播流量转发到已订阅的相关客户端端口来解决此问题。请参阅下方的 IGMP/MLD 网络概念图。

RouterOS 网桥实现支持 IGMP 版本 1、2 和 3，以及 MLD 版本 1 和 2。该实现基于 RFC4541，各协议规范分别定义于 RFC1112（IGMPv1）、RFC2236（IGMPv2）、RFC3376（IGMPv3）、RFC2710（MLDv1）和 RFC3810（MLDv2）。

:::warning
IGMPv3 和 MLDv2 不支持指定源组播转发。
:::

![IGMP Configuration Diagram](/img/bda205876bdd0bb4.webp)

仅当启用 `igmp-snooping` 时，网桥才会处理 IGMP/MLD 报文。此外，网桥必须具有活动的 IPv6 地址才能处理 MLD 数据包。最初，网桥不会限制任何组播流量，并会泛洪所有组播数据包。一旦检测到 IGMP/MLD querier——通过接收 IGMP/MLD 查询报文（来自外部组播路由器，或来自启用了 `multicast-querier` 的本地网桥接口）——网桥将开始限制未知 IP 组播流量，并仅转发来自 Multicast Database（MDB）的已知组播流。IGMP 和 MLD querier 检测独立运行；检测到 IGMP querier 不会影响 IPv6 组播转发，反之亦然。querier 检测也不会限制非 IP 和链路本地组播组的转发，例如 224.0.0.0/24 和 ff02::1。

:::danger
搭载 Marvell-98DX3236、Marvell-98DX224S 或 Marvell-98DX226S 交换芯片的 CRS3xx 系列设备，在检测到 IGMP 或 MLD querier 后，无法区分非 IP、IPv4 和 IPv6 组播数据包。这意味着当检测到 querier 时，交换机将停止转发所有未知组播流量（无论协议）。此限制不适用于某些链路本地组播地址范围，例如 224.0.0.0/24 或 ff02::1。
:::

## 配置选项 {#configuration-options}

---

本节介绍 IGMP 和 MLD snooping 的网桥配置选项。

**子菜单：** `/interface/bridge`

| 属性 | 说明 |
| :-- | :-- |
| **igmp-snooping** (*yes \| no*；默认：**no**) | 启用 IGMP 和 MLD snooping。 |
| **igmp-version** (*2 \| 3*；默认：**2**) | 选择网桥接口作为 IGMP querier 时生成 IGMP membership query 的 IGMP 版本。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，该属性才生效。 |
| **last-member-interval** (*time*；默认：**1s**) | 当网桥端口上的最后一个客户端取消订阅组播组，且网桥作为活动 querier 时，网桥将发送 group-specific IGMP/MLD query，以确认是否仍有其他客户端订阅。该设置更改这些查询的响应时间。如果在指定时间段内未收到 membership report（<code>last-member-interval</code> * <code>last-member-query-count</code>），则该组播组将从组播数据库（MDB）中移除。<br/> 如果网桥端口配置了 fast-leave，则会立即移除组播组，而不发送任何查询。<br/> 仅当 <code>igmp-snooping</code> 和 <code>multicast-querier</code> 设置为 <code>yes</code> 时，该属性才生效。 |
| **last-member-query-count** (*integer: 0..4294967295*；默认：**2**) | 在 IGMP/MLD snooping 网桥停止转发某个组播流之前，`last-member-interval` 需要经过多少次。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，该属性才生效。 |
| **membership-interval** (*time*；默认：**4m20s**) | 如果在网桥端口上未收到 IGMP/MLD membership report，Multicast Database（MDB）中的条目在多长时间后被移除。仅当 `igmp-snooping` 设置为 `yes` 时，该属性才生效。 |
| **mld-version** (*1 \| 2*；默认：**1**) | 选择网桥接口作为 MLD querier 时生成 MLD membership query 的 MLD 版本。仅当网桥具有活动 IPv6 地址，且 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，该属性才生效。 |
| **multicast-querier** (*yes \| no*；默认：**no**) | Multicast querier 会生成周期性 IGMP/MLD general membership query，所有支持 IGMP/MLD 的设备都会以 IGMP/MLD membership report 响应。通常，这些查询由 PIM（组播）路由器或 IGMP proxy 生成。<br/> 使用该属性可使启用 IGMP/MLD snooping 的网桥生成 IGMP/MLD general membership query。当 Layer2 网络中没有活动 querier（PIM 路由器或 IGMP proxy）时，应使用此属性。如果 Layer2 网络中没有 multicast querier，Multicast Database（MDB）将不会更新，已学习条目会超时，IGMP/MLD snooping 将无法正常工作。<br/> 仅生成未打标签的 IGMP/MLD general membership query。IGMP query 使用网桥接口自身的 IPv4 地址作为源地址（请参阅 <code>querier-uses-bridge-address</code>），MLD query 使用网桥接口的 IPv6 link-local 地址发送。如果检测到外部 IGMP/MLD querier，网桥将不会发送查询（请参阅监控值 <code>igmp-querier</code> 和 <code>mld-querier</code>）。<br/> 仅当 <code>igmp-snooping</code> 设置为 <code>yes</code> 时，该属性才生效。 |
| **multicast-router** (*disabled \| permanent \| temporary-query*；默认：**temporary-query**) | 组播路由器端口是连接组播路由器或 querier 的端口。在该端口上，将发送未注册的组播流和 IGMP/MLD membership report。该设置更改网桥接口自身的组播路由器状态。该属性可用于将 IGMP/MLD membership report 和组播流量发送到网桥接口，以便进一步进行组播路由或代理。仅当 <code>igmp-snooping</code> 设置为 <code>yes</code> 时，该属性才生效。<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 在网桥接口上禁用组播路由器状态。无论网桥接口如何配置，未注册的组播流和 IGMP/MLD membership report 都不会发送到网桥接口。</li><li><span className="ros-icon-success"><code>permanent</code></span> - 在网桥接口上启用组播路由器状态。无论网桥接口如何配置，未注册的组播流和 IGMP/MLD membership report 都会发送到网桥接口自身。</li><li><span className="ros-icon-success"><code>temporary-query</code></span> - 使用 IGMP/MLD query 自动检测网桥接口上的组播路由器状态。</li></ul> |
| **querier-interval** (*time*；默认：**4m15s**) | 更改检测到的 querier 和 multicast-router 端口的超时时间。仅当 `igmp-snooping` 设置为 `yes` 时，该属性才生效。 |
| **querier-uses-bridge-address** (*yes \| no*；默认：**yes**) | 启用后，网桥 IGMP querier 使用网桥接口自身的 IPv4 地址作为 IGMP query 数据包的源地址，而不是默认的 0.0.0.0。某些组播客户端认为来自 0.0.0.0 的查询无效并且不会响应，这可能在 snooping 表条目超时时导致组播流中断。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes`，且网桥接口已分配 IPv4 地址时，该属性才生效。该设置仅适用于 IPv4（IGMP）。MLD query 始终使用网桥接口的 IPv6 link-local 地址。 |
| **query-interval** (*time*；默认：**2m5s**) | 更改网桥接口作为 IGMP/MLD querier 时发送 IGMP/MLD general membership query 的间隔。该间隔在发送最后一个 startup query 后生效。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，该属性才生效。 |
| **query-response-interval** (*time*；默认：**10s**) | 更改网桥作为 IGMP/MLD querier 时 general IGMP/MLD query 的响应时间。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，该属性才生效。 |
| **startup-query-count** (*integer: 0..4294967295*；默认：**2**) | 指定启用网桥接口或活动 querier 超时时必须发送多少次 general IGMP/MLD query。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，该属性才生效。 |
| **startup-query-interval** (*time*；默认：**31s250ms**) | 指定 startup general IGMP/MLD query 之间的间隔。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，该属性才生效。 |

**子菜单：** `/interface/bridge/port`

| 属性 | 说明 |
| :-- | :-- |
| **fast-leave** (*yes \| no*；默认：**no**) | 在网桥端口上启用 IGMP/MLD fast leave 功能。收到 IGMP/MLD leave 消息后，网桥将停止向该网桥端口转发组播流量。仅当 `igmp-snooping` 设置为 `yes` 时，该属性才生效。 |
| **multicast-router** (*disabled \| permanent \| temporary-query*；默认：**temporary-query**) | 组播路由器端口是连接组播路由器或 querier 的端口。在该端口上，将发送未注册的组播流和 IGMP/MLD membership report。该设置更改网桥端口的组播路由器状态。该属性可用于将 IGMP/MLD membership report 和组播流发送到指定网桥端口，以便进一步进行组播路由或代理。仅当 <code>igmp-snooping</code> 设置为 <code>yes</code> 时，该属性才生效。<ul><li><span className="ros-icon-success"><code>disabled</code></span> - 在网桥端口上禁用组播路由器状态。无论该端口连接了什么设备，未注册的组播流和 IGMP/MLD membership report 都不会发送到该网桥端口。</li><li><span className="ros-icon-success"><code>permanent</code></span> - 在网桥端口上启用组播路由器状态。无论该端口连接了什么设备，未注册的组播和 IGMP/MLD membership report 都会发送到该网桥端口。</li><li><span className="ros-icon-success"><code>temporary-query</code></span> - 使用 IGMP/MLD query 自动检测网桥端口上的组播路由器状态。</li></ul> |
| **unknown-multicast-flood** (*yes \| no*；默认：**yes**) | 更改网桥端口上的组播泛洪选项。它仅控制出站流量。启用后，网桥允许向指定网桥端口泛洪组播数据包；禁用后，网桥限制组播流量泛洪到指定网桥端口。该设置影响所有组播流量，包括非 IP、IPv4、IPv6 以及 link-local 组播范围（例如 224.0.0.0/24 和 ff02::1）。<br/> 请注意，启用 <code>igmp-snooping</code> 并检测到 IGMP/MLD querier 后，网桥将自动限制未知 IP 组播的泛洪，因此 IGMP/MLD snooping 配置中并非必须使用该设置。<br/> 将该设置与 <code>igmp-snooping</code> 一起使用时，网桥端口上唯一允许的组播流量是 MDB 表中的已知组播。 |

**子菜单：** `/interface/bridge/mdb`

| 属性 | 说明 |
| :-- | :-- |
| **bridge** (*name*；默认：) | 要将 MDB 条目分配到的网桥接口。 |
| **disabled** (*yes \| no*；默认：**no**) | 禁用或启用静态 MDB 条目。 |
| **group** (*ipv4 \| ipv6 address*；默认：) | IPv4 或 IPv6 组播地址。无法为 link-local 组播组 224.0.0.0/24 和 ff02::1 创建静态条目，因为这些数据包始终会在所有端口和 VLAN 上泛洪。 |
| **ports** (*name*；默认：) | 要将组播组转发到的网桥端口列表。 |
| **vid** (*integer: 1..4094*；默认：) | 创建 MDB 条目所在的 VLAN ID，仅在启用 `vlan-filtering` 时适用。未指定 VLAN ID 时，该条目将在 shared-VLAN 模式下工作，并动态应用于特定端口上所有已定义的 VLAN ID。 |

## 监控和故障排除 {#monitoring-and-troubleshooting}

---

本节介绍 IGMP/MLD snooping 网桥的监控和故障排除选项。

要监控已学习的组播数据库（MDB）条目，请使用 `print` 命令。

**子菜单：** `/interface/bridge/mdb`

| 属性 | 说明 |
| :-- | :-- |
| **bridge**（*只读：* *name*） | 显示该条目所属的网桥接口。 |
| **group**（*只读：* *ipv4 \| ipv6 address*） | 显示组播组地址。 |
| **on-ports**（*只读：name*） | 显示已订阅特定组播组的网桥端口。 |
| **vid**（*只读：integer*） | 显示组播组的 VLAN ID，仅在启用 `vlan-filtering` 时适用。 |

```ros
[admin@MikroTik] /interface/bridge/mdb/print 
Flags: D - DYNAMIC
Columns: GROUP, VID, ON-PORTS, BRIDGE
 #   GROUP              VID  ON-PORTS  BRIDGE 
 0 D ff02::2              1  bridge1   bridge1
 1 D ff02::6a             1  bridge1   bridge1
 2 D ff02::1:ff00:0       1  bridge1   bridge1
 3 D ff02::1:ff01:6a43    1  bridge1   bridge1
 4 D 229.1.1.1           10  ether2    bridge1
 5 D 229.2.2.2           10  ether3    bridge1
                             ether2           
 6 D ff02::2             10  ether5    bridge1
                             ether3           
                             ether2           
                             ether4            
```

要监控网桥接口的当前状态，请使用 `monitor` 命令。

**子菜单：** `/interface/bridge`

| 属性 | 说明 |
| :-- | :-- |
| **igmp-querier**（*none*\| *interface & IPv4 address*） | 显示检测到的 IGMP querier 所在的网桥端口和源 IP 地址。仅显示检测到的外部 IGMP querier，不会显示本地网桥 IGMP querier（包括 IGMP proxy 和 PIM）。仅当启用 `igmp-snooping` 时才会显示该监控值。 |
| **mld-querier**（*none*\| *interface & IPv6 address*） | 显示检测到的 MLD querier 所在的网桥端口和源 IPv6 地址。仅显示检测到的外部 MLD querier，不会显示本地网桥 MLD querier。仅当启用 `igmp-snooping` 且网桥具有活动 IPv6 地址时才会显示该监控值。 |
| **multicast-router**（*yes \| no*） | 显示是否在网桥接口上检测到组播路由器。仅当启用 `igmp-snooping` 时才会显示该监控值。 |

```ros
[admin@MikroTik] /interface/bridge/monitor bridge1
                  state: enabled
    current-mac-address: 64:D1:54:C7:3A:59
            root-bridge: yes
         root-bridge-id: 0x8000.64:D1:54:C7:3A:59
         root-path-cost: 0
              root-port: none
             port-count: 3
  designated-port-count: 3
           fast-forward: no
       multicast-router: no
           igmp-querier: ether2 192.168.10.10
            mld-querier: ether2 fe80::e68d:8cff:fe39:3824
```

要监控网桥端口的当前状态，请使用 `monitor` 命令。

**子菜单：** `/interface/bridge/port`

| 属性 | 说明 |
| :-- | :-- |
| **multicast-router**（*yes \| no*） | 显示是否在端口上检测到组播路由器。仅当启用 `igmp-snooping` 时才会显示监控值。 |

```ros
[admin@MikroTik] > /interface/bridge/port/monitor [find]
              interface: ether2          ether3          ether4
                 status: in-bridge       in-bridge       in-bridge
            port-number: 1               2               3
                   role: designated-port designated-port designated-port
              edge-port: no              yes             yes
    edge-port-discovery: yes             yes             yes
    point-to-point-port: yes             yes             yes
           external-fdb: no              no              no
           sending-rstp: yes             yes             yes
               learning: yes             yes             yes
             forwarding: yes             yes             yes
       multicast-router: yes             no              no
       hw-offload-group: switch1         switch1         switch1
```

## 配置示例 {#configuration-examples}

---

下面介绍最常见的配置示例。部分示例使用启用了 VLAN 过滤的网桥，因此请先了解过滤原理——[网桥 VLAN 过滤](/docs/bridging-and-switching#bridge-vlan-filtering)、[网桥 VLAN 表](/docs/bridging-and-switching/user-guides/bridge-vlan-table)。

### 基本 IGMP snooping 配置 {#basic-igmp-snooping-configuration}

第一个示例仅包含一个 IGMP snooping 网桥、一个组播源设备和几个组播客户端设备。请参见下面的网络示意图。

![IGMP Basic Setup Diagram](/img/33992ed3c8365049.webp)

首先，创建一个启用 IGMP snooping 的网桥接口。在本示例中，没有活动的 IGMP 查询器（没有组播路由器或代理），因此必须在同一网桥上启用本地 IGMP 查询器。可通过 `multicast-querier` 设置完成。如果 LAN 中没有活动的 IGMP 查询器，未注册的 IP 组播将被泛洪，并且组播条目会始终从组播数据库中超时。

```ros
/interface/bridge
add igmp-snooping=yes multicast-querier=yes name=bridge1
```

然后将所需接口添加为网桥端口。

```ros
/interface/bridge/port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
add bridge=bridge1 interface=ether4
add bridge=bridge1 interface=ether5
```

基本 IGMP snooping 配置已完成。使用 “`/interface/bridge/mdb/print`” 命令监控活动组播组。如有必要，可以在同一网桥接口上配置 IP 地址和 [DHCP 服务器](/docs/network-management/dhcp#configuration-examples)。

### 使用 VLAN 的 IGMP snooping 配置 {#igmp-snooping-configuration-with-vlans}

第二个示例增加了一些复杂性。有两个启用 IGMP snooping 的网桥，需要将组播流量隔离到不同的 VLAN。网络方案如下所示。

![IGMP VLAN Setup Diagram](/img/106ab87a1a96eb99.webp)

首先，在两台设备上创建网桥，并将所需接口添加为网桥端口。要更改网桥端口的 untagged VLAN，请使用 `pvid` 设置。Bridge1 将充当 IGMP querier。以下是 Bridge1 的配置命令：

```ros
/interface/bridge
add igmp-snooping=yes multicast-querier=yes name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 pvid=10
add bridge=bridge1 interface=ether3 pvid=10
add bridge=bridge1 interface=ether4 pvid=10
add bridge=bridge1 interface=ether5 pvid=20
add bridge=bridge1 interface=sfp-sfpplus1 pvid=10
```

以下是 Bridge2 的配置命令：

```ros
/interface/bridge
add igmp-snooping=yes name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether3 pvid=10
add bridge=bridge1 interface=ether4 pvid=10
add bridge=bridge1 interface=ether5 pvid=20
add bridge=bridge1 interface=sfp-sfpplus1 pvid=10
```

:::warning
网桥 IGMP querier 实现只能发送 untagged IGMP 查询。如果需要发送 tagged IGMP 查询，或者需要在多个 VLAN 中生成 IGMP 查询，可以配置 VLAN 接口，并结合 [IGMP Proxy](/docs/user-guides/routing-and-networking-protocols/multicast/igmp-proxy) 或 [PIM-SM](/docs/user-guides/routing-and-networking-protocols/multicast/pim-sm)。IGMP Proxy 的下游接口以及 PIM-SM 接口都可以充当 IGMP querier。
:::

请确保为设备配置[管理访问](/docs/bridging-and-switching#management-access-configuration)。在配置启用 VLAN 过滤的网桥时，这一点很重要。本示例将一个带 IP 地址的 VLAN 99 接口添加到网桥。该 VLAN 将允许在 tagged sfp-sfpplus1 端口上通过。以下是 Bridge1 的配置命令：

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.1/24 interface=MGMT network=192.168.99.0
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,sfp-sfpplus1 vlan-ids=99
```

以下是 Bridge2 的配置命令：

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.2/24 interface=MGMT network=192.168.99.0
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,sfp-sfpplus1 vlan-ids=99
```

添加网桥 VLAN 条目，并指定 tagged 和 untagged 端口。配置管理访问时已创建 VLAN 99 条目；现在只需添加 VLAN 10 和 VLAN 20。以下是 Bridge1 的配置命令：

```ros
/interface/bridge/vlan
add bridge=bridge1 untagged=ether2,ether3,ether4,sfp-sfpplus1 vlan-ids=10
add bridge=bridge1 tagged=sfp-sfpplus1 untagged=ether5 vlan-ids=20
```

以下是 Bridge2 的配置命令：

```ros
/interface/bridge/vlan
add bridge=bridge1 untagged=ether3,ether4,sfp-sfpplus1 vlan-ids=10
add bridge=bridge1 tagged=sfp-sfpplus1 untagged=ether5 vlan-ids=20
```

最后，启用 VLAN 过滤。以下是 Bridge1 和 Bridge2 的配置命令：

```ros
/interface/bridge/set [find name=bridge1] vlan-filtering=yes
```

此时，VLAN 和 IGMP snooping 已配置完成，设备应能通过端口通信。不过，建议进一步应用一些额外的过滤选项。在网桥端口上启用 `ingress-filtering` 和 `frame-types`。以下是 Bridge1 的配置命令：

```ros
/interface/bridge/port
set [find interface=ether2] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether3] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether4] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether5] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=sfp-sfpplus1] ingress-filtering=yes
```

以下是 Bridge2 的配置命令：

```ros
/interface/bridge/port
set [find interface=ether3] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether4] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether5] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=sfp-sfpplus1] ingress-filtering=yes
```

### 静态 MDB 条目 {#static-mdb-entries}

自 RouterOS 7.7 起，可以为 IPv4 和 IPv6 组播组创建静态 MDB 条目。例如，要在 VLAN 10 的 ether2 和 ether3 端口上为组播组 229.10.10.10 创建静态 MDB 条目，请使用以下命令：

```ros
/interface/bridge/mdb
add bridge=bridge1 group=229.10.10.10 ports=ether2,ether3 vid=10
```

使用 `print` 命令验证结果：

```ros
[admin@MikroTik] > /interface/bridge/mdb/print where group=229.10.10.10
Columns: GROUP, VID, ON-PORTS, BRIDGE
 # GROUP         VID  ON-PORTS  BRIDGE 
12 229.10.10.10   10  ether2    bridge1
                      ether3   
```

如果某个 IPv6 组播组不需要被侦听，并且希望在所有端口和 VLAN 上泛洪，则可以在所有 VLAN 和端口上创建静态 MDB 条目，包括网桥接口本身。使用以下命令为所有 VLAN 和端口上的组播组 ff02::2 创建静态 MDB 条目（根据您的具体配置修改 `ports` 设置）：

```ros
/interface/bridge/mdb
add bridge=bridge1 group=ff02::2 ports=bridge1,ether2,ether3,ether4,ether5

[admin@MikroTik] > /interface/bridge/mdb/print where group=ff02::2
Flags: D - DYNAMIC
Columns: GROUP, VID, ON-PORTS, BRIDGE
 #   GROUP    VID  ON-PORTS  BRIDGE 
 0   ff02::2                 bridge1
15 D ff02::2    1  bridge1   bridge1
16 D ff02::2   10  bridge1   bridge1
                   ether2           
                   ether3           
                   ether4           
                   ether5           
17 D ff02::2   20  bridge1   bridge1
                   ether2           
                   ether3           
18 D ff02::2   30  bridge1   bridge1
                   ether2           
                   ether3     
```
