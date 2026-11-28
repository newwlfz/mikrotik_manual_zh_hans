---
title: "区域和虚拟链路"
description: "了解 OSPF 区域和虚链路的概念。"
tags:
  - 'routing'
  - 'ospf'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/unicast/ospf/areas-and-virtual-links
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

OSPF 的一个显著特点是可以将 AS 划分为多个路由区域，每个区域都有各自的邻居集合。设想一个包含 300 多台路由器且路由器之间有多条链路的大型网络。每当网络中发生链路抖动或其他拓扑变化时，该变化都会泛洪到网络中的所有 OSPF 设备。这会导致网络负载过重，甚至出现停机，因为对于如此大规模的网络，[网络收敛](/docs/user-guides/routing-and-networking-protocols/routing-decision)可能需要一些时间。

大型单区域网络可能产生严重问题：

- 每当网络拓扑发生变化时，每台路由器都会重新计算数据库。该过程会占用 CPU 资源。
- 每台路由器都保存完整的链路状态数据库，其中显示整个网络的拓扑。这会占用内存资源。
- 完整的路由表副本以及路由表条目数量可能显著大于网络数量，从而占用更多内存资源。
- 更新大型数据库需要更多带宽。

引入区域可以实现更好的资源管理，因为一个区域内部的拓扑变化不会泛洪到网络中的其他区域。区域概念简化了网络管理，并支持区域间路由汇总，显著减少每个 OSPF 邻居需要存储的数据库大小。这意味着每个区域都有各自的链路状态数据库和对应的最短路径树。有关 OSPF 邻居如何相互发现并同步数据库的更多信息，请参阅[邻居关系](/docs/user-guides/routing-and-networking-protocols/unicast/ospf/neighbour-relationship)。

区域结构对其他区域不可见。这种知识隔离使协议在使用多个区域时更具可扩展性。路由表计算占用的 CPU 资源更少，路由流量也会减少。

不过，多区域设置会带来额外的复杂性。不应将少于 50 台路由器的区域分开。一个区域中路由器的最大数量主要取决于用于路由表计算的 CPU 性能。

![](/img/9ea2d8342282c898.png#gh-light-mode-only)
![](/img/5a10dfe626a5e2b8.png#gh-dark-mode-only)

OSPF 区域具有唯一的 32 位标识（Area ID）。Area ID 为 0.0.0.0 的区域（称为 Backbone area）是主区域，其他任何区域都应连接到该区域。连接到多个区域的路由器称为 **ABR**（Area Border Routers），其主要职责是在相连区域之间进行汇总和更新抑制。连接到另一个路由域的路由器称为 **ASBR**（Autonomous System Boundary Router）。

每个区域都有各自的链路状态数据库，由 router-LSA 和 network-LSA 组成，用于描述该区域内所有路由器的互连方式。区域拓扑的详细信息对所有其他区域隐藏。router-LSA 和 network-LSA 不会泛洪到区域边界之外。Area Border Routers（**ABR**）会通过 OSPF summary-LSA 将寻址信息从一个区域泄漏到另一个区域。这使路由器在将数据转发到来自其他区域的目的地时可以选择最佳的区域边界路由器，这称为 **intra-area routing**。有关路由表如何计算的更多信息，请参阅[路由表计算](/docs/user-guides/routing-and-networking-protocols/unicast/ospf/routing-calculation)。

区域之间的路由信息交换本质上是 Distance Vector 算法。为防止算法收敛问题（例如计数到无穷大），所有区域都必须直接连接到 **backbone area**，从而形成简单的 hub-and-spoke 拓扑。backbone area 的 area-ID 始终为 0.0.0.0，且无法更改。有关路由决策过程的更多信息，请参阅 [Routing Decision](/docs/user-guides/routing-and-networking-protocols/routing-decision)。

在 [`/routing/ospf/area`](/docs/cli-reference/routing/ospf/area) 菜单中配置 RouterOS 区域。例如，以下配置是一个 ABR 路由器，连接多个区域，其中一个 Stub area 和一个默认区域：

```ros
/routing/ospf/area
add name=backbone_v2 area-id=0.0.0.0 instance=v2inst
add name=stub_area area-id=1.1.1.1 instance=v2inst type=stub
add name=another_area area-id=2.2.2.2 instance=v2inst type=default
```

OSPF 可包含 5 种区域类型，通过 [`type`](/docs/cli-reference/routing/ospf/interface-template#type) 参数配置。每种区域类型定义该区域支持的 LSA 类型：

- Standard/default - 该区域中可传输 OSPF 数据包。它支持类型 1、2、3、4 和 5 的 LSA。
- Backbone - 如前所述，这是其他任何区域连接的主区域。它基本上与 standard area 相同，但使用 ID 0.0.0.0 标识。
- [Stub](#stub-area) - 该区域不接受任何外部路由。
- [Totally stubby](#totally-stubby-area) - Stub area 的一种变体。
- [Not-so-stubby (NSSA)](#nssa) - Stub area 的一种变体。

## LSA 类型 {#lsa-types}

在继续详细了解每种区域类型之前，请先熟悉 LSA 类型：

- ***type 1*** - （Router LSA）由区域中的路由器发送，包括直接连接的链路列表。这些 LSA 不会跨越 ABR 或 ASBR。
- ***type 2*** - （Network LSA）为区域中的每个“transit network”生成。transit network 至少有两个直接连接的 OSPF 路由器。Ethernet 是 transit network 的一个示例。Type 2 LSA 列出组成该 transit network 的每个连接的路由器，并由 DR 生成。
- ***type 3*** - （Summary LSA）ABR 发送 Type 3 Summary LSA。Type 3 LSA 将一个区域拥有的任意网络通告给 OSPF AS 中的其他区域。默认情况下，OSPF 会为发起区域中定义的每个子网通告 Type 3 LSA，这可能导致泛洪问题。应在 ABR 上使用手动汇总。
- ***type 4*** - （ASBR-Summary LSA）通告 ASBR 地址并显示 ASBR 的位置，通告的是其地址而不是其路由表。
- ***type 5*** - （External LSA）通告通过 ASBR 学到的路由，并泛洪到除 Stub area 之外的所有区域。该 LSA 分为两个子类型：***external type 1*** 和 ***external type 2***。
- ***type 6*** - （Group Membership LSA）为 OSPF 的组播扩展定义，RouterOS 不使用。
- ***type 7*** - Type 7 LSA 向 ABR 通告导入到 NSSA 区域的外部路由。随后，Area Border Router 将这些 LSA 转换为 **type 5** 外部 LSA，并将其泛洪到 OSPF 网络的其余部分。
- ***type 8*** - External Attributes LSA（OSPFv2）/ link-local LSA（OSPFv3）。
- ***type 9*** - Link-Local Scope Opaque（OSPFv2）/ Intra Area Prefix LSA（OSPFv3）。该类型的 LSA 不会泛洪到本地（子）网络之外。
- ***type 10*** - Area Local Scope Opaque。该类型的 LSA 不会泛洪到其关联区域范围之外。
- ***type 11*** - Opaque LSA，在整个 AS 内泛洪（范围与 **type 5** 相同）。它不会在 stub area 和 NSSA 中泛洪。

:::note
如果没有任何 ASBR，则网络中没有 LSA Types 4 和 5。
:::

## 标准区域 {#standard-area}

该区域支持 1、2、3、4 和 5 类 LSA。

![](/img/9645f9b3ee7f9728.jpg#gh-light-mode-only)
![](/img/40a928bda151d8ac.png#gh-dark-mode-only)

一个包含默认区域的简单多区域网络。在此示例中，area1 中的所有网络都会泛洪到骨干区域，骨干区域中的所有网络都会泛洪到 area1。

**R1**

```ros
/ip/address/add address=10.0.3.1/24 interface=ether1
/ip/address/add address=10.0.2.1/24 interface=ether2
/routing/ospf/instance
add name=v2inst version=2 router-id=1.0.0.1
/routing/ospf/area
add name=backbone_v2 area-id=0.0.0.0 instance=v2inst
add name=area1 area-id=1.1.1.1 type=default instance=v2inst
/routing/ospf/interface-template
add networks=10.0.2.0/24 area=backbone_v2
add networks=10.0.3.0/24 area=area1
```

**R2**

```ros
/ip/address/add address=10.0.1.1/24 interface=ether2
/ip/address/add address=10.0.2.2/24 interface=ether1
/routing/ospf/instance
add name=v2inst version=2 router-id=1.0.0.2
/routing/ospf/area
add name=backbone_v2 area-id=0.0.0.0 instance=v2inst
/routing/ospf/interface-template
add networks=10.0.2.0/24 area=backbone_v2
add networks=10.0.1.0/24 area=backbone_v2
```

**R3**

```ros
/ip/address/add address=10.0.3.2/24 interface=ether2
/ip/address/add address=10.0.4.1/24 interface=ether1
/routing/ospf/instance
add name=v2inst version=2 router-id=1.0.0.3
/routing/ospf/area
add name=area1 area-id=1.1.1.1 type=default instance=v2inst
/routing/ospf/interface-template
add networks=10.0.3.0/24 area=area1
add networks=10.0.4.0/24 area=area1
```

## Stub Area

Stub 区域的主要目的是防止此类区域承载外部路由。从这些区域到外部网络的路由基于[默认路由](#external-routing-information-and-default-route)。Stub 区域可减少区域内的数据库大小以及区域内路由器的内存需求。

![](/img/cfd7aadcf0fea194.jpg#gh-light-mode-only)
![](/img/68d33098a30f4218.png#gh-dark-mode-only)

Stub 区域有一些限制。ASBR 路由器不能位于区域内部，Stub 区域不能用作虚链路的传输区域。这些限制存在的原因是 Stub 区域配置为不承载外部路由。

该区域支持 1、2 和 3 类 LSA。

参考前面的示例。Area1 配置为 Stub 区域，这意味着路由器 R2 和 R3 不会从骨干区域接收除默认路由之外的任何路由信息。

R1:

```ros
/routing/ospf/instance
add name=v2inst version=2 router-id=1.0.0.1
/routing/ospf/area
add name=backbone_v2 area-id=0.0.0.0 instance=v2inst
add name=area1 area-id=1.1.1.1 type=stub instance=v2inst

/routing/ospf/interface-template
add networks=10.0.0.0/24 area=backbone_v2
add networks=10.0.1.0/24 area=area1
add networks=10.0.3.0/24 area=area1
```

R2:

```ros
/routing/ospf/instance
add name=v2inst version=2 router-id=1.0.0.2
/routing/ospf/area
add name=area1 area-id=1.1.1.1 type=stub instance=v2inst
/routing/ospf/interface-template
add networks=10.0.1.0/24 area=area1
```

R3:

```ros
/routing/ospf/instance
add name=v2inst version=2 router-id=1.0.0.3
/routing/ospf/area
add name=area1 area-id=1.1.1.1 type=stub instance=v2inst
/routing/ospf/interface-template
add networks=10.0.3.0/24 area=area1
```

如果未设置 [`default-cost`](/docs/cli-reference/routing/ospf/area#default-cost) 参数，则不会发起 stub area 的 type-3 默认 LSA。

## 完全末节区域 {#totally-stubby-area}

Totally stubby area 是 stub area 的扩展。Totally stubby area 会阻止外部路由和汇总（区域间）路由进入该区域。仅将区域内路由注入该区域。Totally stubby area 配置为 stub area，并额外设置 [`no-summaries`](/docs/cli-reference/routing/ospf/area#no-summaries) 标志。该区域支持 Type 1、Type 2 LSA，以及带默认路由的 Type 3 LSA。

```ros
/routing/ospf/area
add name=totally_stubby_area area-id=1.1.1.1 instance=v2inst type=stub no-summaries
```

## NSSA

当需要注入外部路由，但不希望注入 type 5 LSA 路由时，使用 Not-so-stubby area（NSSA）。有关 NSSA RFC 参考，另请参阅 [Understanding OSPF](/docs/user-guides/routing-and-networking-protocols/unicast/ospf/understanding-ospf#supported-standards)。

![](/img/2679895c4a889aa5.jpg#gh-light-mode-only)
![](/img/6550f8718446a2a6.png#gh-dark-mode-only)

图中显示了两个区域（backbone 和 area1），以及一条到位于 area1 中路由器的 RIP 连接。area1 必须配置为 stub area，但外部 RIP 路由也必须注入 backbone。在这种情况下，应将 area1 配置为 NSSA。

该配置示例不涉及 [RIP](/docs/user-guides/routing-and-networking-protocols/unicast/rip) 配置。

**R1**

```ros
/routing/ospf/instance
add name=v2inst version=2 router-id=1.0.0.1
/routing/ospf/area
add name=backbone_v2 area-id=0.0.0.0 instance=v2inst
add name=area1 area-id=1.1.1.1 type=nssa instance=v2inst
/routing/ospf/interface-template
add networks=10.0.0.0/24 area=backbone_v2
add networks=10.0.1.0/24 area=area1
```

**R2**

```ros
/routing/ospf/instance
add name=v2inst version=2 router-id=1.0.0.2
/routing/ospf/area
add name=area1 area-id=1.1.1.1 type=nssa instance=v2inst
/routing/ospf/interface-template
add networks=10.0.1.0/24 area=area1
```

:::info
虚拟链路不能用于 NSSA 区域。使用 [`nssa-translator`](/docs/cli-reference/routing/ospf/area#nssa-translator) 参数控制 type-7 到 type-5 LSA 的转换。
:::

## 外部路由信息和默认路由 {#external-routing-information-and-default-route}

在 OSPF 路由域的边缘，可以找到运行其他路由协议的路由器，称为 **AS boundary routers (ASBRs)**。这些路由器的作用是将从其他路由协议学到的路由信息导入 OSPF 路由域。外部路由可根据度量类型在两个不同层级导入。

- Type1 - OSPF 度量是内部 OSPF cost 与外部路由 cost 之和。
- Type2 - OSPF 度量仅等于外部路由 cost。

:::tip
Type 1 外部路径始终优先于 type 2 外部路径。当所有路径均为 type 2 外部路径时，始终优先选择通告的 type 2 度量最小的路径。（RFC2328）
:::

外部路由可通过多种方式导入，并按列出的顺序处理：

- 选择匹配 [`redistribute`](/docs/cli-reference/routing/ospf/instance#redistribute) 或 [`originate-default`](/docs/cli-reference/routing/ospf/instance#originate-default) 实例参数的路由。
- 如果指定了输出路由过滤链：
  - 如果使用了 [`redistribute`](/docs/cli-reference/routing/ospf/instance#redistribute) 或 [`originate-default`](/docs/cli-reference/routing/ospf/instance#originate-default) 参数，则仅处理选定的路由。
  - 否则，处理所有活动路由。
- 在 [`out-filter-select`](/docs/cli-reference/routing/ospf/instance#out-filter-select) 中处理选定的路由。

仍需要使用 [routing filter](/docs/user-guides/routing-and-networking-protocols/route-selection-and-filtering) 设置路由 cost 和类型（需要时）。

配置示例选择并重分发所有静态路由和 RIP 路由：

```ros
/routing/ospf/instance
add name=v2inst version=2 router-id=1.2.3.4 redistribute=static,rip
```

默认路由的重分发是一种特殊情况，应使用 `originate-default` 参数：

```ros
/routing/ospf/instance
set v2inst originate-default=if-installed
```

当重分发由 `originate-default` 和 `redistribute` 参数控制时，会引入一些默认路由过滤的边界情况。

- 如果启用了 `redistribute`，则选择所有匹配重分发参数的路由。
- 如果 `originate-default=never`，默认路由将被拒绝。
- 将所选路由（如果未设置 redistribute 参数，则为所有路由）通过 [`out-filter-select`](/docs/cli-reference/routing/ospf/instance#out-filter-select)（如果已配置）。
- 将所选路由通过 [`out-filter-chain`](/docs/cli-reference/routing/ospf/instance#out-filter-chain)（如果已配置）。路由过滤器参考请参阅 [`/routing/filter`](/docs/cli-reference/routing/filter/chain)。
- 如果 [`originate-default`](/docs/cli-reference/routing/ospf/instance#originate-default) 设置为 `always` 或 `if-installed`：
  - OSPF 会创建一条不带属性的伪默认路由。
  - 将该路由通过 [`out-filter-chain`](/docs/cli-reference/routing/ospf/instance#out-filter-chain)，可在其中应用属性，但会忽略动作（始终接受）。

有关重分发值的完整列表，请参阅 [`/routing/ospf/instance`](/docs/cli-reference/routing/ospf/instance)。

## 路由汇总 {#route-summarization}

路由汇总是将多条路由合并为单条通告。它在区域边界（区域边界路由器）处完成。

应朝骨干方向进行汇总。这样，骨干区域会接收所有聚合路由，并将已汇总的路由注入其他区域。汇总分为两种类型：区域间汇总和外部路由汇总。

区域间路由汇总在区域边界（ABR）上工作。它不适用于通过重分发注入 OSPF 的外部路由。默认情况下，ABR 会为特定区域中的每条路由创建一条 summary LSA，并在相邻区域中通告它。

范围允许只为多条路由创建一条 summary LSA，并向相邻区域只发送单条通告，或者完全抑制通告。

如果某个范围配置了 [`advertise`](/docs/cli-reference/routing/ospf/instance) 参数，并且特定区域中该范围内存在路由，则会为该范围通告一条汇总 LSA。否则（禁用 `advertise` 参数时），不会创建汇总 LSA，也不会将其通告到区域边界之外。

区域间路由汇总可以在 [`/routing/ospf/area/range`](/docs/cli-reference/routing/ospf/area/range) 菜单中配置。

假设有两个区域：backbone 和 area1。area1 中有多条来自 10.0.0.0/16 范围的 /24 路由。既然可以进行汇总，就不必将每个 /24 子网都泛洪到 backbone 区域。在连接 area1 和 backbone 的路由器上，可以设置区域范围：

```ros
/routing/ospf/area/range
add prefix=10.0.0.0/16 area=area1 advertise=yes cost=10
```

有关 [`advertise`](/docs/cli-reference/routing/ospf/instance) 和 [`cost`](/docs/cli-reference/routing/ospf/interface-template#cost) 参数的参考信息，请参阅 [`/routing/ospf/area/range`](/docs/cli-reference/routing/ospf/area/range)。

:::info
对于活动范围（即至少有一条来自指定区域且落在该范围内的 OSPF 路由），会创建一条类型为“blackhole”的路由，并将其安装到路由表中。
:::

外部路由汇总可以通过使用[路由过滤器](/docs/user-guides/routing-and-networking-protocols/route-selection-and-filtering)来实现。假设示例与前一个相同，但 area1 中是从其他协议重分发而来的 /24 路由。要发送一条汇总 LSA，请添加一条[blackhole 路由](/docs/cli-reference/ip/route)，并配置适当的 [`/routing/filter/rule`](/docs/cli-reference/routing/filter/chain)，使其仅接受汇总路由：

```ros
/ip/route/add dst-address=10.0.0.0/16 blackhole
/routing/ospf/instance
set v2inst out-filter-chain=ospf_out
/routing/filter/rule
add chain=ospf_out rule="if (dst == 10.0.0.0/16) {accept} else {reject}"
```

## 虚拟链路 {#virtual-link}

所有 OSPF 区域都必须连接到 backbone 区域，但有时无法建立物理连接。要克服这一限制，可以使用 **virtual links** 在逻辑上连接区域。

虚拟链路可用于以下两种常见场景：

- 将碎片化的骨干区域连接起来。
- 连接未与骨干区域直接相连的远程区域。

### 分区骨干网 {#partitioned-backbone}

OSPF 允许使用虚拟链路连接骨干区域中不连续的部分。当两个独立的 OSPF 网络合并为一个大型网络时，可能需要这样做。可以在分别接触骨干区域且具有公共区域的不同 ABR 之间配置虚拟链路。

![](/img/ef8fd4be4ae15662.jpg#gh-light-mode-only)
![](/img/618a626465d2c05c.png#gh-dark-mode-only)

当不存在公共区域时，可以创建一个额外区域作为传输区域。上图对此进行了说明。

非骨干区域发生分区时不需要虚拟链路。OSPF 不会主动尝试修复区域分区。当某个区域发生分区时，每个组成部分都会成为一个独立区域。骨干区域负责在新区域之间执行路由。某些目的地可通过 **intra-area** 路由到达。区域分区需要 **inter-area** 路由。

但是，要在分区后维持完整路由，地址范围不得拆分到区域分区的多个组成部分中。在虚拟链路上考虑使用 [BFD](/docs/user-guides/routing-and-networking-protocols/unicast/bfd) 以加快故障检测。

### 与骨干网无物理连接 {#no-physical-connection-to-a-backbone}

某个区域可能与骨干区域没有物理连接。虚链路为断开连接的区域提供到骨干区域的逻辑路径。必须在共享同一区域的两个 ABR 之间建立链路，其中一个 ABR 连接到骨干区域。

![](/img/e642c0bd34f2b743.jpg#gh-light-mode-only)
![](/img/2a58e5cf11fcca93.png#gh-dark-mode-only)

R1 和 R2 均为 ABR，R1 连接到骨干区域。Area2 将用作 **transit area**，R1 是进入骨干区域的 **entry point**。必须在两台路由器上配置虚链路。

在 [`/routing/ospf/interface`](/docs/cli-reference/routing/ospf/interface) 菜单中添加虚链路配置。必须在两台路由器上配置 [`vlink-transit-area`](/docs/cli-reference/routing/ospf/interface#vlink-transit-area) 和 [`vlink-neighbor-id`](/docs/cli-reference/routing/ospf/interface#vlink-neighbor-id) 参数。基于该图的配置如下：

R1:

```ros
/routing/ospf/interface
add vlink-transit-area=area2 area=backbone_v2 type=virtual-link vlink-neighbor-id=2.2.2.2
```

R2:

```ros
/routing/ospf/interface
add vlink-transit-area=area2 area=backbone_v2 type=virtual-link vlink-neighbor-id=1.1.1.1
```
