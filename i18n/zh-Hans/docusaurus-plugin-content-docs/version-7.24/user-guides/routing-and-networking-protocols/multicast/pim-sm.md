---
title: "PIM-SM"
description: "本页介绍 MikroTik RouterOS 中的 IP Multicast 和 Protocol Independent Multicast - Sparse Mode（PIM-SM），说明其如何实现跨网络的高效数据共享。内容涵盖不同接口之间组播路由的基本 PIM-SM 配置，包括接口设置、PIM 实例创建和 IGMP 集成。"
tags:
  - 'pim-sm'
  - 'igmp'
  - 'ospf'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/multicast/pim-sm
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

IP 组播是一种通过 Internet 将数据高效共享给多个接收者的技术。发送方将数据发送到特定的组播 IP 地址，接收方通过表明自身对发送到该地址的数据感兴趣来加入接收。随后由网络负责将数据从发送方传送到接收方。

如果某个组播组的发送方和接收方位于同一本地网段，则该过程不需要路由器。通信可以直接进行，并且可以通过使用 [IGMP snooping](/docs/bridging-and-switching/user-guides/bridge-igmp-mld-snooping) 交换机来增强。但是，如果发送方和接收方位于不同网段，则必须使用组播路由协议来建立它们之间的数据传输路径。

Protocol Independent Multicast - Sparse Mode（PIM-SM 或 PIM）使 RouterOS 能够在网络区域内支持组播流。PIM 代表 Protocol Independent Multicast，意味着它不依赖于任何特定的单播路由。SM 代表 Sparse-Mode，意味着特定控制消息可确保数据仅传送到存在需要该数据的接收方的网段。除了管理网段之间数据传输的路由协议之外，路由器还需要一种方法来发现其直连网段上的本地接收方。对于 IPv4，这通过 Internet Group Management Protocol（IGMP）实现；对于 IPv6，则通过 Multicast Listener Discovery（MLD）实现。

![](/img/6708aabff35dbf61.webp)

:::info
RouterOS v7 在主 **system** 软件包中提供 PIM-SM 配置。较旧的 RouterOS 版本需要安装额外的 **multicast** 软件包才能使用 PIM-SM。有关 [Packages](/docs/getting-started/installation-and-upgrade/packages) 的更多详情，请参阅相关文档。

SMIPS 设备（hAP lite、hAP lite TC 和 hAP mini）不支持该功能。
:::

## 单台设备上的基本组播路由 {#basic-multicast-routing-on-single-device}

假设有如下场景：你有一台带有两个接口的路由器，分别为 ether1 和 ether2，并且每个接口都配置在独立的网络中。通常，路由器会创建直连路由，两个网络中的主机将能够使用单播流量进行通信。但是，如果要在这些网络之间启用组播通信，则需要单独配置组播路由，否则无法工作。在此场景中，我们将创建一个简单配置。这包括创建一个 PIM 实例并配置所需接口。

![](/img/8c9bb4fc76a4a35b.webp)

首先，确保路由器接口上已配置 IP 地址。

```ros
/ip/address
add address=192.168.10.1/24 interface=ether1 network=192.168.10.0
add address=192.168.20.1/24 interface=ether2 network=192.168.20.0
```

配置一个 PIM 实例。对于此示例，默认设置即可正常工作。

```ros
/routing/pimsm/instance
add name=pimsm-instance-1
```

为将接收组播流量的接口添加 PIM 接口模板。

```ros
/routing/pimsm/interface-template
add interfaces=ether1 instance=pimsm-instance-1
```

在 ether2 上配置 IGMP querier，使 PIM 实例能够获知本地组成员关系。

```ros
/routing/pimsm/igmp-interface-template
add instance=pimsm-instance-1 interfaces=ether2
```

此时路由器开始监听 IGMP 成员报告（客户端加入消息），并将组播流量路由给有兴趣接收该流量的客户端。

要测试配置，可以使用 RouterOS [traffic-generator](/docs/diagnostics-monitoring-and-troubleshooting/traffic-generator) 配置组播发送端，并使用 [GMP](/docs/user-guides/routing-and-networking-protocols/multicast/group-management-protocol) 配置 IGMP 客户端。

```ros
# Multicast Sender
/ip/address
add address=192.168.10.10/24 interface=ether1 network=192.168.10.0
/tool/traffic-generator/packet-template
add interface=ether1 ip-dst=229.1.1.2 mac-dst=01:00:5E:01:01:02/FF:FF:FF:FF:FF:FF name=multicast
/tool/traffic-generator/quick tx-template=multicast mbps=10

# Multicast Client
/ip/address
add address=192.168.20.10/24 interface=ether1 network=192.168.20.0
/routing/gmp
add disabled=no groups=229.1.1.2 interfaces=ether1
```

要验证组播流量是否正确路由，可以监控客户端接口上的接收数据包计数器，或使用 [Torch](/docs/diagnostics-monitoring-and-troubleshooting/torch) 或 [Packet Sniffer](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer) 等工具。

也可以监控路由器上的活动组播组：

```ros
/routing/pimsm/uib-g/print
Columns: INSTANCE, GROUP
# INSTANCE          GROUP    
0 pimsm-instance-1  229.1.1.2

/routing/pimsm/uib-sg/print
Flags: K - KEEPALIVE; S - SPT-BIT
Columns: INSTANCE, GROUP, SOURCE
#    INSTANCE          GROUP      SOURCE       
0 KS pimsm-instance-1  229.1.1.2  192.168.10.10

```

## 使用静态 RP 的组播路由 {#multicast-routing-with-static-rp}

在下面的示例中，我们将使用多台 PIM 路由器，如下图所示。PIM-SM 使用共享树，要使其正常工作，需要指定一个特定节点作为组播根分发点。在 PIM 中，该路由器称为 Rendezvous Point，即 RP。在 PIM 中选择 RP 有多种方法，例如 Bootstrap Router（BSR）方法。不过，本示例将使用一种简单的方法，称为静态 RP 配置。这意味着管理员可以手动为特定组播组指定一个或多个 RP。

![](/img/456509a833c70101.webp)

首先，需要配置 IP 地址并设置单播路由。在本示例中，将使用 OSPF 在路由器之间交换路由信息。有关 [OSPF](/docs/user-guides/routing-and-networking-protocols/unicast/ospf) 的更多详情，请参阅相关文档。

```ros
# R1 Rendezvous Point:
/ip/address
add address=10.0.0.1 interface=lo network=10.0.0.1
add address=10.0.1.1/24 interface=ether2 network=10.0.1.0
add address=10.0.2.1/24 interface=ether3 network=10.0.2.0
/routing/ospf/instance
add disabled=no name=ospf-instance-1 router-id=10.0.0.1
/routing/ospf/area
add disabled=no instance=ospf-instance-1 name=ospf-area-1
/routing/ospf/interface-template
add area=ospf-area-1 disabled=no interfaces=lo,ether2,ether3

# R2:
/ip/address
add address=10.0.0.2 interface=lo network=10.0.0.2
add address=10.0.1.2/24 interface=ether1 network=10.0.1.0
add address=192.168.20.1/24 interface=ether12 network=192.168.20.0
/routing/ospf/instance
add disabled=no name=ospf-instance-1 router-id=10.0.0.2
/routing/ospf/area
add disabled=no instance=ospf-instance-1 name=ospf-area-1
/routing/ospf/interface-template
add area=ospf-area-1 disabled=no interfaces=lo,ether1,ether12

# R3:
/ip/address
add address=10.0.0.3 interface=lo network=10.0.0.3
add address=10.0.2.3/24 interface=ether1 network=10.0.2.0
add address=192.168.30.1/24 interface=ether12 network=192.168.30.0
/routing/ospf/instance
add disabled=no name=ospf-instance-1 router-id=10.0.0.3
/routing/ospf/area
add disabled=no instance=ospf-instance-1 name=ospf-area-1
/routing/ospf/interface-template
add area=ospf-area-1 disabled=no interfaces=lo,ether1,ether12
```

与上一个单路由器示例一样，需要在所有路由器上配置 PIM 实例并添加必要的接口。

```ros
# R1 Rendezvous Point:
/routing/pimsm/instance
add disabled=no name=pimsm-instance-1
/routing/pimsm/interface-template
add instance=pimsm-instance-1 interfaces=lo,ether2,ether3

# R2:
/routing/pimsm/instance
add disabled=no name=pimsm-instance-1
/routing/pimsm/interface-template
add instance=pimsm-instance-1 interfaces=lo,ether1,ether12
/routing/pimsm/igmp-interface-template
add instance=pimsm-instance-1 interfaces=ether12

# R3:
/routing/pimsm/instance
add disabled=no name=pimsm-instance-1
/routing/pimsm/interface-template
add instance=pimsm-instance-1 interfaces=lo,ether1,ether12
/routing/pimsm/igmp-interface-template
add instance=pimsm-instance-1 interfaces=ether12

```

现在，查看 PIM 邻居及其当前状态。在 R1 上有两个邻居，而在 R2 和 R3 上各有一个邻居。

```ros
# R1 Rendezvous Point:
/routing/pimsm/neighbor/print
Flags: R - DESIGNATED-ROUTER; J - JOIN-TRACKING
Columns: INSTANCE, ADDRESS, PRIORITY
#    INSTANCE          ADDRESS          PRIORITY
0 RJ pimsm-instance-1  10.0.1.2%ether2  1       
1 RJ pimsm-instance-1  10.0.2.3%ether3  1       

# R2:
/routing/pimsm/neighbor/print 
Flags: R - DESIGNATED-ROUTER; J - JOIN-TRACKING
Columns: INSTANCE, ADDRESS, PRIORITY
#    INSTANCE          ADDRESS          PRIORITY
0  J pimsm-instance-1  10.0.1.1%ether1  1       

# R3:
/routing/pimsm/neighbor/print 
Flags: J - JOIN-TRACKING
Columns: INSTANCE, ADDRESS, PRIORITY
#   INSTANCE          ADDRESS          PRIORITY
0 J pimsm-instance-1  10.0.2.1%ether1  1       

```

最后，选择一台路由器作为 Rendezvous Point（RP）。在所有 PIM 路由器上配置 R1 loopback IP 地址。确保每台路由器都具有到达 R1 loopback 地址的正确路由信息，这一点很重要。

```ros
# R1 Rendezvous Point:
/routing/pimsm/static-rp
add address=10.0.0.1 instance=pimsm-instance-1

# R2:
/routing/pimsm/static-rp
add address=10.0.0.1 instance=pimsm-instance-1

# R3:
/routing/pimsm/static-rp
add address=10.0.0.1 instance=pimsm-instance-1
```
