---
sidebar_key: "user-guides/routing-and-networking-protocols/multicast/pim-sm"
sidebar_position: 3
title: "PIM-SM"
sidebar_label: "PIM-SM"
description: "本页介绍 MikroTik RouterOS 中的 IP 组播和协议无关组播 - 稀疏模式（PIM-SM），说明它如何实现跨网络的高效数据共享。内容包括用于在独立接口之间进行组播路由的 PIM-SM 基本配置，涵盖接口设置、PIM 实例创建以及 IGMP 集成。"
tags:
  - 'pim-sm'
  - 'igmp'
  - 'ospf'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/multicast/pim-sm
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

IP 组播是一种允许通过 Internet 与许多接收者高效共享数据的技术。发送端将其数据传输到特定的组播 IP 地址，接收端表示有兴趣接收发送到该地址的数据。然后网络负责将数据从发送端传递到接收端。

如果某个组播组的发送端和接收端位于同一本地网段，则该过程不需要路由器。通信可以直接进行，并且可以通过使用 [IGMP 侦听](../../../bridging-and-switching/user-guides/bridge-igmp-mld-snooping.md) 交换机来增强。但是，如果发送端和接收端位于不同网段，则必须使用组播路由协议来建立它们之间的数据传输路径。

协议无关组播 - 稀疏模式（PIM-SM 或 PIM）使 RouterOS 能够支持网络区域内的组播流传输。PIM 代表协议无关组播，这意味着它不绑定到任何特定的单播路由。SM 代表稀疏模式，这意味着特定控制消息确保数据仅传递到有接收者需要它的网段。除了管理网段之间数据传输的路由协议之外，路由器还需要一种方法来发现其直连网段上的本地接收者。对于 IPv4，这通过 Internet 组管理协议（IGMP）实现；对于 IPv6，则通过组播侦听者发现（MLD）实现。

![](/img/6708aabff35dbf61.webp)

:::info
RouterOS v7 在主 **system** 软件包中提供 PIM-SM 配置。较旧的 RouterOS 版本需要安装额外的 **multicast** 软件包才能使用 PIM-SM。有关 [软件包](../../../getting-started/installation-and-upgrade/packages.md) 的更多详细信息。

该功能在 SMIPS 设备（hAP lite、hAP lite TC 和 hAP mini）上不受支持。
:::

## 单设备上的基本组播路由 {#basic-multicast-routing-on-single-device}

设想这样一个场景：你有一台具有两个接口（即 ether1 和 ether2）的路由器，并且每个接口都设置在独立的网络中。通常情况下，路由器会创建直连路由，并且两个网络上的主机将能够使用单播流量进行通信。但是，如果要在这些网络之间启用组播通信，则需要单独配置组播路由，否则无法工作。在此场景中，我们将创建一个简单配置。这包括创建 PIM 实例并配置所需接口。

![](/img/8c9bb4fc76a4a35b.webp)

首先确保已在路由器接口上设置 IP 地址。

```ros
/ip/address
add address=192.168.10.1/24 interface=ether1 network=192.168.10.0
add address=192.168.20.1/24 interface=ether2 network=192.168.20.0
```

配置 PIM 实例。对于此示例，默认设置应该可以正常工作。

```ros
/routing/pimsm/instance
add name=pimsm-instance-1
```

为将接收组播流量的接口添加 PIM 接口模板。

```ros
/routing/pimsm/interface-template
add interfaces=ether1 instance=pimsm-instance-1
```

在 ether2 上配置 IGMP 查询器，以便 PIM 实例可以了解本地组成员关系。

```ros
/routing/pimsm/igmp-interface-template
add instance=pimsm-instance-1 interfaces=ether2
```

现在，路由器开始监听 IGMP 成员报告（客户端加入消息），并将组播流量路由到有兴趣接收它的客户端。

要测试该配置，你可以使用 RouterOS [traffic-generator](../../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md) 配置组播发送端，并使用 [GMP](./group-management-protocol.md) 配置 IGMP 客户端。

```ros
# 组播发送者
/ip/address
add address=192.168.10.10/24 interface=ether1 network=192.168.10.0
/tool/traffic-generator/packet-template
add interface=ether1 ip-dst=229.1.1.2 mac-dst=01:00:5E:01:01:02/FF:FF:FF:FF:FF:FF name=multicast
/tool/traffic-generator/quick tx-template=multicast mbps=10

# 组播客户端
/ip/address
add address=192.168.20.10/24 interface=ether1 network=192.168.20.0
/routing/gmp
add disabled=no groups=229.1.1.2 interfaces=ether1
```

要验证组播流量是否被正确路由，请监控客户端接口上接收的数据包计数器，或使用 [Torch](../../../diagnostics-monitoring-and-troubleshooting/torch.md) 或 [数据包嗅探器](../../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) 等工具。

还可以监控路由器上的活动组播组：

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

在接下来的示例中，我们将使用多台 PIM 路由器，如下图所示。PIM-SM 使用共享树，为使此机制正常工作，我们需要指定一个特定节点作为组播根分发点。在 PIM 中，该路由器称为汇聚点（Rendezvous Point），或 RP。在 PIM 中有多种选择 RP 的方法，例如引导路由器（BSR）方法。但是，对于此示例，我们将使用一种称为静态 RP 配置的简单方法。这意味着管理员可以为特定组播组手动指定一个或多个 RP。

![](/img/456509a833c70101.webp)

首先，我们需要配置 IP 地址并设置单播路由。在此示例中，我们将使用 OSPF 在路由器之间交换路由信息。有关 [OSPF](../unicast/ospf/index.md) 的更多详细信息。

```ros
# R1 汇聚点：
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

与之前单路由器示例一样，我们需要配置 PIM 实例并在所有路由器上添加必要的接口。

```ros
# R1 汇聚点：
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

现在，让我们查看 PIM 邻居及其当前状态。在 R1 上有两个邻居，而在 R2 和 R3 上各只有一个邻居。

```ros
# R1 汇聚点：
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

最后，我们将选择一台路由器作为我们的汇聚点（RP）。我们将在所有 PIM 路由器上配置 R1 环回 IP 地址。确保每台路由器都具有到达 R1 环回地址的正确路由信息非常重要。

```ros
# R1 汇聚点：
/routing/pimsm/static-rp
add address=10.0.0.1 instance=pimsm-instance-1

# R2:
/routing/pimsm/static-rp
add address=10.0.0.1 instance=pimsm-instance-1

# R3:
/routing/pimsm/static-rp
add address=10.0.0.1 instance=pimsm-instance-1
```
