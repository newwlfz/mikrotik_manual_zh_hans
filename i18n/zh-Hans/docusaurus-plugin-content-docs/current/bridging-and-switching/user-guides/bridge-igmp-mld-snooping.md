---
sidebar_key: "bridging-and-switching/user-guides/bridge-igmp-mld-snooping"
sidebar_position: 2
title: "网桥 IGMP/MLD 侦听"
sidebar_label: "网桥 IGMP/MLD 侦听"
description: "本页介绍 MikroTik RouterOS 网桥的 IGMP/MLD snooping 功能，通过仅将组播流转发到已订阅端口来实现高效的组播流量转发。内容涵盖 IGMP/MLD 版本、查询器检测、组播路由器状态的配置选项，以及用于管理组播数据库条目的监控工具。"
tags:
  - 'igmp'
  - 'mld'
  - 'sdvoe'
source: https://manual.mikrotik.com/docs/bridging-and-switching/user-guides/bridge-igmp-mld-snooping
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

IGMP（Internet Group Management Protocol）和 MLD（Multicast Listener Discovery）snooping 是网桥功能，使网桥能够被动侦听 IGMP/MLD 网络通信，并利用此信息为组播流量做出智能转发决策。默认情况下，网桥会将所有组播流量泛洪到每个网桥端口，类似于广播流量的处理方式。对于组播视频流或 SDVoE（Software Defined Video over Ethernet）部署等某些应用，这种默认行为可能并不理想。IGMP/MLD snooping 通过仅将组播流量转发到有感兴趣客户端订阅的端口来解决此问题。请参见下面的 IGMP/MLD 网络概念图。

RouterOS 网桥实现支持 IGMP 版本 1、2 和 3，以及 MLD 版本 1 和 2。此实现基于 RFC4541，各协议规范分别在 RFC1112（IGMPv1）、RFC2236（IGMPv2）、RFC3376（IGMPv3）、RFC2710（MLDv1）和 RFC3810（MLDv2）中定义。

:::warning
源特定组播转发在 IGMPv3 和 MLDv2 中不受支持。
:::

![IGMP Configuration Diagram](/img/bda205876bdd0bb4.webp)

网桥仅在启用 `igmp-snooping` 时处理 IGMP/MLD 消息。此外，网桥必须具有活动的 IPv6 地址才能处理 MLD 数据包。最初，网桥不限制任何组播流量，并泛洪所有组播数据包。一旦检测到 IGMP/MLD 查询器——通过接收 IGMP/MLD 查询消息（来自外部组播路由器，或在启用 `multicast-querier` 时从网桥接口本地发出）——网桥开始限制未知 IP 组播流量，并仅转发组播数据库（MDB）中的已知组播流。IGMP 和 MLD 查询器检测独立运行；检测到 IGMP 查询器不会影响 IPv6 组播转发，反之亦然。查询器检测也不会限制非 IP 和链路本地组播组的转发，例如 224.0.0.0/24 和 ff02::1。

:::danger
配备 Marvell-98DX3236、Marvell-98DX224S 或 Marvell-98DX226S 交换芯片的 CRS3xx 系列设备，在检测到 IGMP 或 MLD 查询器后，无法区分非 IP、IPv4 和 IPv6 组播数据包。这意味着当检测到查询器时，交换机会停止转发所有未知组播流量（无论协议如何）。此限制不适用于某些链路本地组播地址范围，例如 224.0.0.0/24 或 ff02::1。
:::

## 配置选项 {#configuration-options}

---

本节介绍 IGMP 和 MLD snooping 网桥配置选项。

**子菜单：** `/interface/bridge`

| 属性 | 描述 |
| :-- | :-- |
| **igmp-snooping**（*yes \| no*；默认：**no**） | 启用 IGMP 和 MLD snooping。 |
| **igmp-version**（*2 \| 3*；默认：**2**） | 选择当网桥接口充当 IGMP 查询器时将用于生成 IGMP 成员查询的 IGMP 版本。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **last-member-interval**（*time*；默认：**1s**） | 当网桥端口上的最后一个客户端取消订阅某个组播组，并且网桥充当活动查询器时，网桥将发送特定于该组的 IGMP/MLD 查询，以确保没有其他客户端仍在订阅。此设置会更改这些查询的响应时间。如果在特定时间段（`last-member-interval` \* `last-member-query-count`）内未收到成员报告，则从组播数据库（MDB）中移除该组播组。如果网桥端口配置了 fast-leave，则组播组会立即被移除，而不发送任何查询。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **last-member-query-count**（*integer: 0..4294967295*；默认：**2**） | `last-member-interval` 应经过多少次后，IGMP/MLD snooping 网桥才停止转发某个组播流。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **membership-interval**（*time*；默认：**4m20s**） | 如果在网桥端口上未收到 IGMP/MLD 成员报告，则从组播数据库（MDB）中移除条目之前的时间量。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才生效。 |
| **mld-version**（*1 \| 2*；默认：**1**） | 选择当网桥接口充当 MLD 查询器时将用于生成 MLD 成员查询的 MLD 版本。仅当网桥具有活动的 IPv6 地址，且 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **multicast-querier**（*yes \| no*；默认：**no**） | 组播查询器会生成周期性 IGMP/MLD 通用成员查询，所有支持 IGMP/MLD 的设备都会以 IGMP/MLD 成员报告进行响应；通常由 PIM（组播）路由器或 IGMP 代理生成这些查询。通过使用此属性，可以使启用了 IGMP/MLD snooping 的网桥生成 IGMP/MLD 通用成员查询。当二层网络中没有活动查询器（PIM 路由器或 IGMP 代理）时，应使用此属性。如果二层网络中没有组播查询器，则组播数据库（MDB）不会更新，已学习的条目将超时，并且 IGMP/MLD snooping 将无法正常工作。仅生成未标记的 IGMP/MLD 通用成员查询；IGMP 查询使用网桥接口自身的 IPv4 地址作为源地址发送（请参阅 `querier-uses-bridge-address`），MLD 查询使用网桥接口的 IPv6 链路本地地址发送。如果检测到外部 IGMP/MLD 查询器，则网桥不会发送查询（请参阅监控值 `igmp-querier` 和 `mld-querier`）。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才生效。 |
| **multicast-router**（*disabled \| permanent \| temporary-query*；默认：**temporary-query**） | 组播路由器端口是连接组播路由器或查询器的端口。在该端口上，将发送未注册的组播流和 IGMP/MLD 成员报告。此设置会更改网桥接口本身的组播路由器状态。此属性可用于将 IGMP/MLD 成员报告和组播流量发送到网桥接口，以便进一步进行组播路由或代理。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才生效。<span className="ros-icon-success"><code>disabled</code></span> - 禁用网桥接口上的组播路由器状态。无论网桥接口上配置了什么，未注册的组播流和 IGMP/MLD 成员报告都不会发送到网桥接口。<span className="ros-icon-success"><code>permanent</code></span> - 启用网桥接口上的组播路由器状态。无论网桥接口上配置了什么，未注册的组播流和 IGMP/MLD 成员报告都会发送到网桥接口本身。<span className="ros-icon-success"><code>temporary-query</code></span> - 使用 IGMP/MLD 查询自动检测网桥接口上的组播路由器状态。 |
| **querier-interval**（*time*；默认：**4m15s**） | 更改检测到的查询器和组播路由器端口的超时时间。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才生效。 |
| **querier-uses-bridge-address**（*yes \| no*；默认：**yes**） | 启用后，网桥 IGMP 查询器使用网桥接口自身的 IPv4 地址作为 IGMP 查询数据包的源地址，而不是默认的 0.0.0.0。某些组播客户端认为来自 0.0.0.0 的查询无效而不响应，这可能导致 snooping 表条目超时时组播流中断。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 且网桥接口分配了 IPv4 地址时，此属性才生效。此设置仅适用于 IPv4（IGMP）。MLD 查询始终使用网桥接口的 IPv6 链路本地地址。 |
| **query-interval**（*time*；默认：**2m5s**） | 更改当网桥接口充当 IGMP/MLD 查询器时发送 IGMP/MLD 通用成员查询的间隔。该间隔在发送最后一个启动查询后生效。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **query-response-interval**（*time*；默认：**10s**） | 当网桥充当 IGMP/MLD 查询器时，此设置会更改通用 IGMP/MLD 查询的响应时间。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **startup-query-count**（*integer: 0..4294967295*；默认：**2**） | 指定当启用网桥接口或活动查询器超时时，必须发送通用 IGMP/MLD 查询的次数。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |
| **startup-query-interval**（*time*；默认：**31s250ms**） | 指定启动通用 IGMP/MLD 查询之间的间隔。仅当 `igmp-snooping` 和 `multicast-querier` 设置为 `yes` 时，此属性才生效。 |

**子菜单：** `/interface/bridge/port`

| 属性 | 描述 |
| :-- | :-- |
| **fast-leave**（*yes \| no*；默认：**no**） | 在网桥端口上启用 IGMP/MLD fast leave 功能。当收到 IGMP/MLD 离开消息时，网桥将停止向该网桥端口转发组播流量。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才生效。 |
| **multicast-router**（*disabled \| permanent \| temporary-query*；默认：**temporary-query**） | 组播路由器端口是连接组播路由器或查询器的端口。在该端口上，将发送未注册的组播流和 IGMP/MLD 成员报告。此设置会更改网桥端口的组播路由器状态。此属性可用于将 IGMP/MLD 成员报告和组播流发送到某些网桥端口，以便进一步进行组播路由或代理。仅当 `igmp-snooping` 设置为 `yes` 时，此属性才生效。<span className="ros-icon-success"><code>disabled</code></span> - 禁用网桥端口上的组播路由器状态。无论连接到该端口的是什么，未注册的组播流和 IGMP/MLD 成员报告都不会发送到该网桥端口。<span className="ros-icon-success"><code>permanent</code></span> - 启用网桥端口上的组播路由器状态。无论连接到该端口的是什么，未注册的组播和 IGMP/MLD 成员报告都会发送到该网桥端口。<span className="ros-icon-success"><code>temporary-query</code></span> - 使用 IGMP/MLD 查询自动检测网桥端口上的组播路由器状态。 |
| **unknown-multicast-flood**（*yes \| no*；默认：**yes**） | 更改网桥端口上的组播泛洪选项。它仅控制出方向流量。启用时，网桥允许将组播数据包泛洪到指定的网桥端口；禁用时，网桥限制组播流量泛洪到指定的网桥端口。此设置影响所有组播流量。这包括非 IP、IPv4、IPv6 以及链路本地组播范围（例如 224.0.0.0/24 和 ff02::1）。请注意，当启用 `igmp-snooping` 并检测到 IGMP/MLD 查询器时，网桥会自动限制未知 IP 组播泛洪，因此对于 IGMP/MLD snooping 设置来说，此设置不是必需的。当将此设置与 `igmp-snooping` 一起使用时，网桥端口上唯一允许的组播流量是来自 MDB 表的已知组播。 |

**子菜单：** `/interface/bridge/mdb`

| 属性 | 描述 |
| :-- | :-- |
| **bridge**（*name*；默认：） | MDB 条目将分配到的网桥接口。 |
| **disabled**（*yes \| no*；默认：**no**） | 禁用或启用静态 MDB 条目。 |
| **group**（*ipv4 \| ipv6 address*；默认：） | IPv4 或 IPv6 组播地址。无法为链路本地组播组 224.0.0.0/24 和 ff02::1 创建静态条目，因为这些数据包始终会在所有端口和 VLAN 上泛洪。 |
| **ports**（*name*；默认：） | 组播组将转发到的网桥端口列表。 |
| **vid**（*integer: 1..4094*；默认：） | 将在其上创建 MDB 条目的 VLAN ID，仅在启用 `vlan-filtering` 时适用。未指定 VLAN ID 时，该条目将在共享 VLAN 模式下工作，并动态应用于特定端口的所有已定义 VLAN ID。 |

## 监控和故障排除 {#monitoring-and-troubleshooting}

---

本节介绍 IGMP/MLD snooping 网桥监控和故障排除选项。

要监控已学习的组播数据库（MDB）条目，请使用 `print` 命令。

**子菜单：** `/interface/bridge/mdb`

| 属性 | 描述 |
| :-- | :-- |
| **bridge**（*只读：* *name*） | 显示该条目所属的网桥接口。 |
| **group**（*只读：* *ipv4 \| ipv6 address*） | 显示组播组地址。 |
| **on-ports**（*只读：* *name*） | 显示订阅了某个组播组的网桥端口。 |
| **vid**（*只读：* *integer*） | 显示该组播组的 VLAN ID，仅在启用 `vlan-filtering` 时适用。 |

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

要监控桥接接口的当前状态，请使用 `monitor` 命令。

**子菜单：** `/interface/bridge`

| 属性 | 描述 |
| :-- | :-- |
| **igmp-querier**（*none*\| *接口和 IPv4 地址*） | 显示检测到的 IGMP 查询器的网桥端口和源 IP 地址。仅显示检测到的外部 IGMP 查询器，不会显示本地网桥 IGMP 查询器（包括 IGMP 代理和 PIM）。仅当启用 `igmp-snooping` 时，才会显示该监控值。 |
| **mld-querier**（*none*\| *接口和 IPv6 地址*） | 显示检测到的 MLD 查询器的网桥端口和源 IPv6 地址。仅显示检测到的外部 MLD 查询器，不会显示本地网桥 MLD 查询器。仅当启用 `igmp-snooping` 且网桥具有活动的 IPv6 地址时，才会显示该监控值。 |
| **multicast-router**（*yes \| no*） | 显示是否在网桥接口上检测到组播路由器。仅当启用 `igmp-snooping` 时，才会显示该监控值。 |

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

要监控桥接端口的当前状态，请使用 `monitor` 命令。

**子菜单：** `/interface/bridge/port`

| 属性 | 描述 |
| :-- | :-- |
| **multicast-router**（*yes \| no*） | 显示是否在端口上检测到组播路由器。仅当启用 `igmp-snooping` 时，才会显示该监控值。 |

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

下面介绍最常见的配置示例。部分示例使用带有 VLAN 过滤的网桥，因此请务必先了解过滤原理 - [网桥 VLAN 过滤](../index.md#bridge-vlan-filtering)、[网桥 VLAN 表](./bridge-vlan-table.md)。

### 基本 IGMP snooping 配置 {#basic-igmp-snooping-configuration}

第一个示例仅包含一个 IGMP snooping 网桥、一个组播源设备和几个组播客户端设备。请参见下面的网络方案。

![IGMP Basic Setup Diagram](/img/33992ed3c8365049.webp)

首先，创建一个启用了 IGMP snooping 的网桥接口。在此示例中，没有活动的 IGMP 查询器（没有组播路由器或代理），因此必须在同一网桥上启用本地 IGMP 查询器。这可以通过 `multicast-querier` 设置来完成。如果 LAN 中没有活动的 IGMP 查询器，未注册的 IP 组播将被泛洪，并且组播条目将始终从组播数据库中超时。

```ros
/interface/bridge
add igmp-snooping=yes multicast-querier=yes name=bridge1
```

然后添加必要的接口作为网桥端口。

```ros
/interface/bridge/port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
add bridge=bridge1 interface=ether4
add bridge=bridge1 interface=ether5
```

基本 IGMP snooping 配置已完成。使用 "`/interface/bridge/mdb/print"` 命令监控活动的组播组。如有必要，可以在同一网桥接口上配置 IP 地址和 [DHCP 服务器](../../network-management/dhcp/server.md#configuration-examples)。

### 带 VLAN 的 IGMP snooping 配置 {#igmp-snooping-configuration-with-vlans}

第二个示例增加了一些复杂性。有两个 IGMP snooping 网桥，我们需要在不同的 VLAN 上隔离组播流量。请参见下面的网络方案。

![IGMP VLAN Setup Diagram](/img/106ab87a1a96eb99.webp)

首先，在两台设备上创建网桥，并将需要的接口添加为网桥端口。要更改网桥端口的未标记 VLAN，请使用 `pvid` 设置。Bridge1 将充当 IGMP 查询器。以下是 Bridge1 的配置命令：

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

Bridge2 的配置如下：

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
网桥 IGMP 查询器实现只能发送未标记的 IGMP 查询。如果需要发送标记的 IGMP 查询，或需要在多个 VLAN 中生成 IGMP 查询，可以结合 [IGMP 代理](../../user-guides/routing-and-networking-protocols/multicast/igmp-proxy.md) 或 [PIM-SM](../../user-guides/routing-and-networking-protocols/multicast/pim-sm.md) 配置 VLAN 接口。IGMP Proxy 的下游接口以及 PIM-SM 接口可以充当 IGMP 查询器。
:::

请确保为设备配置[管理访问](../index.md#management-access-configuration)。在配置带有 VLAN 过滤的网桥时，这一点至关重要。在此示例中，将一个带有 IP 地址的 VLAN 99 接口添加到网桥。该 VLAN 将在标记的 sfp-sfpplus1 端口上允许。以下是 Bridge1 的配置命令：

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.1/24 interface=MGMT network=192.168.99.0
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,sfp-sfpplus1 vlan-ids=99
```

Bridge2 的配置如下：

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.2/24 interface=MGMT network=192.168.99.0
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,sfp-sfpplus1 vlan-ids=99
```

添加网桥 VLAN 条目并指定标记和未标记端口。VLAN 99 条目已在配置管理访问时创建；现在只应添加 VLAN 10 和 VLAN 20。以下是 Bridge1 的配置命令：

```ros
/interface/bridge/vlan
add bridge=bridge1 untagged=ether2,ether3,ether4,sfp-sfpplus1 vlan-ids=10
add bridge=bridge1 tagged=sfp-sfpplus1 untagged=ether5 vlan-ids=20
```

Bridge2 的配置如下：

```ros
/interface/bridge/vlan
add bridge=bridge1 untagged=ether3,ether4,sfp-sfpplus1 vlan-ids=10
add bridge=bridge1 tagged=sfp-sfpplus1 untagged=ether5 vlan-ids=20
```

最后，启用 VLAN 过滤。以下是 Bridge1 和 Bridge2 的配置命令：

```ros
/interface/bridge/set [find name=bridge1] vlan-filtering=yes
```

此时，VLAN 和 IGMP snooping 已配置完成，设备应能够通过端口通信。但是，建议更进一步并应用一些额外的过滤选项。在网桥端口上启用 `ingress-filtering` 和 `frame-types`。以下是 Bridge1 的配置命令：

```ros
/interface/bridge/port
set [find interface=ether2] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether3] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether4] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether5] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=sfp-sfpplus1] ingress-filtering=yes
```

Bridge2 的配置如下：

```ros
/interface/bridge/port
set [find interface=ether3] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether4] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=ether5] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
set [find interface=sfp-sfpplus1] ingress-filtering=yes
```

### 静态 MDB 条目 {#static-mdb-entries}

从 RouterOS 7.7 版本开始，可以为 IPv4 和 IPv6 组播组创建静态 MDB 条目。例如，要在 VLAN 10 上的端口 ether2 和 ether3 上为组播组 229.10.10.10 创建静态 MDB 条目，请使用以下命令：

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

如果某个 IPv6 组播组不需要被 snooping，并且希望在所有端口和 VLAN 上泛洪，则可以在所有 VLAN 和端口（包括网桥接口本身）上创建静态 MDB 条目。使用以下命令为所有 VLAN 和端口上的组播组 ff02::2 创建静态 MDB 条目（根据你的具体设置修改 `ports` 设置）：

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
