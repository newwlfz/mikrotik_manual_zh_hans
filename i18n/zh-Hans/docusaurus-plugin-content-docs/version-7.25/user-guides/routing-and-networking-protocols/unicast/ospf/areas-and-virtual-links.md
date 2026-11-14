---
sidebar_key: "routing-and-networking-protocols/unicast/ospf/areas-and-virtual-links"
sidebar_position: 4
title: "区域和虚拟链路"
sidebar_label: "区域和虚拟链路"
description: "理解 OSPF 区域和虚链路的概念。"
tags:
  - 'routing'
  - 'ospf'
slug: /user-guides/routing-and-networking-protocols/unicast/ospf/areas-and-virtual-links
source: https://manual.mikrotik.com/docs/7.25/user-guides/routing-and-networking-protocols/unicast/ospf/areas-and-virtual-links
captured_at: '2026-11-04T11:23:13+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

OSPF 的一个显著特性是可以将一个 AS 划分为多个路由区域，每个区域都有自己的一组邻居。想象一个包含 300 多台路由器且它们之间有多条链路的大型网络。每当链路抖动或网络中发生其他拓扑变化时，该变化都会被泛洪到网络中的所有 OSPF 设备。这会给网络带来沉重负载，甚至导致停机，因为对于如此大型的网络，[网络收敛](../../routing-decision.md) 可能需要一些时间。

大型单区域网络可能会产生严重问题：

- 每当网络拓扑发生变化时，每台路由器都会重新计算数据库。该过程会消耗 CPU 资源。
- 每台路由器都保存整个链路状态数据库，该数据库显示整个网络的拓扑。这会占用内存资源。
- 路由表的完整副本以及路由表条目数量可能显著多于网络数量，这会占用更多内存资源。
- 更新大型数据库需要更多带宽。

引入区域可以实现更好的资源管理，因为一个区域内部的拓扑变化不会被泛洪到网络中的其他区域。区域概念使网络管理更简单，并支持区域之间的路由汇总，从而显著减少每个 OSPF 邻居上要存储的数据库大小。这意味着每个区域都有自己的链路状态数据库以及相应的最短路径树。有关 OSPF 邻居如何相互发现并同步数据库的更多信息，请参见[邻居关系](./neighbour-relationship.md)。

区域的结构对其他区域不可见。这种知识隔离使得在使用多个区域时协议更具可扩展性。路由表计算消耗的 CPU 资源更少，路由流量也会减少。

然而，多区域设置会带来额外的复杂性。不应将少于 50 台路由器的区域进行划分。一个区域中的最大路由器数量主要取决于用于路由表计算的 CPU 能力。

![](/img/9ea2d8342282c898.png#gh-light-mode-only)
![](/img/5a10dfe626a5e2b8.png#gh-dark-mode-only)

OSPF 区域具有唯一的 32 位标识（Area ID）。Area ID 为 0.0.0.0 的区域（称为骨干区域）是主区域，任何其他区域都应连接到该区域。连接到多个区域的路由器称为 **ABR**（区域边界路由器），其主要职责是在所连接的区域之间进行汇总和更新抑制。连接到另一个路由域的路由器称为 **ASBR**（自治系统边界路由器）。

每个区域都有自己的链路状态数据库，由描述该区域中所有路由器如何互连的 router-LSA 和 network-LSA 组成。区域拓扑的详细信息对其他所有区域隐藏。Router-LSA 和 network-LSA 不会泛洪到区域边界之外。区域边界路由器（**ABR**）通过 OSPF summary-LSA 将一个区域的编址信息泄漏到另一个区域。这使路由器在将数据转发到来自另一区域的目的地时能够选择最佳的区域边界路由器，这称为**区域内路由**。有关如何计算路由表的更多信息，请参见[路由表计算](./routing-calculation.md)。

区域之间的路由信息交换本质上是一种距离矢量算法。为防止诸如计数到无穷大之类的算法收敛问题，所有区域都必须直接连接到**骨干区域**，从而形成简单的中心辐射型拓扑。骨干区域的 area-ID 始终为 0.0.0.0，且不能更改。有关路由决策过程的更多信息，请参见[路由决策](../../routing-decision.md)。

在 [`/routing/ospf/area`](../../../../cli-reference/routing/ospf/area/index.md) 菜单中配置 RouterOS 区域。例如，以下是一个 ABR 路由器的配置，该路由器连接了多个区域、一个 Stub 区域和一个默认区域：

```ros
/routing/ospf/area
add name=backbone_v2 area-id=0.0.0.0 instance=v2inst
add name=stub_area area-id=1.1.1.1 instance=v2inst type=stub
add name=another_area area-id=2.2.2.2 instance=v2inst type=default
```

OSPF 可以有 5 种区域类型，由 [`type`](../../../../cli-reference/routing/ospf/area/index.md#type) 参数配置。每种区域类型定义该区域支持哪些类型的 LSA：

- 标准/默认 - 可以在此区域中传输 OSPF 数据包。它支持 1、2、3、4 和 5 类 LSA。
- 骨干 - 如前所述，这是任何其他区域所连接的主区域。它基本上与标准区域相同，但使用 ID 0.0.0.0 标识。
- [Stub](#stub-area) - 此区域不接受任何外部路由。
- [Totally stubby](#totally-stubby-area) - Stub 区域的一种变体。
- [Not-so-stubby (NSSA)](#nssa) - Stub 区域的一种变体。

## LSA 类型 {#lsa-types}

在继续详细了解每种区域类型之前，请先熟悉 LSA 类型：

- ***type 1*** - （Router LSA）由区域内的路由器发送，包括直接连接链路的列表。这些 LSA 不会跨越 ABR 或 ASBR。
- ***type 2*** - （Network LSA）为区域中的每个“传输网络”生成。传输网络至少有两台直接连接的 OSPF 路由器。以太网就是传输网络的一个示例。Type 2 LSA 列出组成该传输网络的每台所连接路由器，并由 DR 生成。
- ***type 3*** - （Summary LSA）ABR 发送 Type 3 Summary LSA。Type 3 LSA 将一个区域拥有的任何网络通告给 OSPF AS 中的其他区域。默认情况下，OSPF 会为始发区域中定义的每个子网通告 Type 3 LSA，这可能导致泛洪问题。应在 ABR 上使用手动汇总。
- ***type 4*** - （ASBR-Summary LSA）通告 ASBR 地址并显示 ASBR 所在位置，通告其地址而不是其路由表。
- ***type 5*** - （External LSA）通告通过 ASBR 学到的路由，并泛洪到除 Stub 区域之外的所有区域。此 LSA 分为两个子类型：***external type 1*** 和 ***external type 2***。
- ***type 6*** - （Group Membership LSA）为 OSPF 的多播扩展定义，RouterOS 不使用。
- ***type 7*** - Type 7 LSA 向 ABR 通知导入 NSSA 区域的外部路由。然后，区域边界路由器将这些 LSA 转换为 **type 5** 外部 LSA，并将它们泛洪到 OSPF 网络的其余部分。
- ***type 8*** - External Attributes LSA（OSPFv2）/ link-local LSA（OSPFv3）。
- ***type 9*** - Link-Local Scope Opaque（OSPFv2）/ Intra Area Prefix LSA（OSPFv3）。此类型的 LSA 不会泛洪到本地（子）网络之外。
- ***type 10*** - Area Local Scope Opaque。此类型的 LSA 不会泛洪到其关联区域的范围之外。
- ***type 11*** - Opaque LSA，会泛洪到整个 AS（作用域与 **type 5** 相同）。它不会在 stub 区域和 NSSA 中泛洪。

:::note
如果没有任何 ASBR，则网络中没有 LSA Type 4 和 Type 5。
:::

## 标准区域 {#standard-area}

此区域支持 1、2、3、4 和 5 类 LSA。

![](/img/9645f9b3ee7f9728.jpg#gh-light-mode-only)
![](/img/40a928bda151d8ac.png#gh-dark-mode-only)

一个带有默认区域的简单多区域网络。在此示例中，area1 中的所有网络都会泛洪到骨干，而骨干中的所有网络都会泛洪到 area1。

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

## Stub 区域 {#stub-area}

Stub 区域的主要目的是防止此类区域承载外部路由。从这些区域到外部世界的路由基于[默认路由](#external-routing-information-and-default-route)。Stub 区域可减小区域中的数据库大小以及该区域中路由器的内存需求。

![](/img/cfd7aadcf0fea194.jpg#gh-light-mode-only)
![](/img/68d33098a30f4218.png#gh-dark-mode-only)

Stub 区域有一些限制。ASBR 路由器不能位于该区域内部，并且 Stub 区域不能用作虚拟链路的传输区域。存在这些限制是因为 Stub 区域被配置为不承载外部路由。

此区域支持 1、2 和 3 类 LSA。

考虑上一个示例。Area1 被配置为 Stub 区域，这意味着路由器 R2 和 R3 除了默认路由外，不会从骨干区域接收任何路由信息。

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

如果未设置 [`default-cost`](../../../../cli-reference/routing/ospf/area/index.md#default-cost) 参数，则不会产生 stub 区域的 type-3 默认 LSA。

## 完全 Stubby 区域 {#totally-stubby-area}

完全 Stubby 区域是 Stub 区域的扩展。完全 Stubby 区域会阻止外部路由和汇总（区域间）路由进入该区域。只有区域内路由会注入该区域。完全 Stubby 区域配置为带有附加 [`no-summaries`](../../../../cli-reference/routing/ospf/area/index.md#no-summaries) 标志的 Stub 区域。此区域支持 Type 1、Type 2 LSA 以及带默认路由的 Type 3 LSA。

```ros
/routing/ospf/area
add name=totally_stubby_area area-id=1.1.1.1 instance=v2inst type=stub no-summaries
```

## NSSA {#nssa}

Not-so-stubby area（NSSA）适用于需要注入外部路由，但不需要注入 type 5 LSA 路由的情况。NSSA RFC 参考另请参见[理解 OSPF](./understanding-ospf.md#supported-standards)。

![](/img/2679895c4a889aa5.jpg#gh-light-mode-only)
![](/img/6550f8718446a2a6.png#gh-dark-mode-only)

插图显示了两个区域（骨干和 area1）以及到位于 area1 中路由器的 RIP 连接。Area1 必须配置为 Stub 区域，但还必须将外部 RIP 路由注入骨干。在这种情况下，Area1 应配置为 NSSA。

该配置示例不涵盖 [RIP](../rip.md) 配置。

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
虚拟链路不能跨越 NSSA 区域使用。使用 [`nssa-translator`](../../../../cli-reference/routing/ospf/area/index.md#nssa-translator) 参数控制 type-7 到 type-5 LSA 的转换。
:::

## 外部路由信息和默认路由 {#external-routing-information-and-default-route}

在 OSPF 路由域的边缘，可以找到称为 **AS 边界路由器（ASBR）** 的路由器，它们运行其他路由协议之一。这些路由器的职责是将从其他路由协议学到的路由信息导入 OSPF 路由域。根据度量类型，可以在两个不同级别导入外部路由。

- Type1 - OSPF 度量是内部 OSPF 开销与外部路由开销之和。
- Type2 - OSPF 度量仅等于外部路由开销。

:::tip
Type 1 外部路径始终优先于 Type 2 外部路径。当所有路径都是 Type 2 外部路径时，始终优先选择通告的 Type 2 度量最小的路径。（RFC2328）
:::

可以通过多种方式导入外部路由，并按所列顺序处理：

- 选择与 [`redistribute`](../../../../cli-reference/routing/ospf/instance.md#redistribute) 或 [`originate-default`](../../../../cli-reference/routing/ospf/instance.md#originate-default) 实例参数匹配的路由。
- 如果指定了输出路由过滤链：
  - 如果使用了 [`redistribute`](../../../../cli-reference/routing/ospf/instance.md#redistribute) 或 [`originate-default`](../../../../cli-reference/routing/ospf/instance.md#originate-default) 参数，则仅处理选中的路由。
  - 否则，处理所有活动路由。
- 在 [`out-filter-select`](../../../../cli-reference/routing/ospf/instance.md#out-filter-select) 中处理选中的路由。

仍然需要[路由过滤器](../../route-selection-and-filtering.md)来设置路由开销和类型（在需要时）。

以下配置示例选择并重分发所有静态路由和 RIP 路由：

```ros
/routing/ospf/instance
add name=v2inst version=2 router-id=1.2.3.4 redistribute=static,rip
```

默认路由的重分发是一种特殊情况，此时应使用 `originate-default` 参数：

```ros
/routing/ospf/instance
set v2inst originate-default=if-installed
```

当重分发由 `originate-default` 和 `redistribute` 参数控制时，会为默认路由过滤引入一些边界情况。

- 如果启用了 `redistribute`，则选择与 redistribute 参数匹配的所有路由。
- 如果 `originate-default=never`，则默认路由将被拒绝。
- 将选中的路由（如果未设置 redistribute 参数，则为所有路由）通过 [`out-filter-select`](../../../../cli-reference/routing/ospf/instance.md#out-filter-select) 运行（如果已配置）。
- 将选中的路由通过 [`out-filter-chain`](../../../../cli-reference/routing/ospf/instance.md#out-filter-chain) 运行（如果已配置）。路由过滤器参考请参见 [`/routing/filter`](../../../../cli-reference/routing/filter/rule.md)。
- 如果 [`originate-default`](../../../../cli-reference/routing/ospf/instance.md#originate-default) 设置为 `always` 或 `if-installed`：
  - OSPF 会创建一个不带属性的虚拟默认路由。
  - 将此路由通过 [`out-filter-chain`](../../../../cli-reference/routing/ospf/instance.md#out-filter-chain) 运行，其中可以应用属性，但操作会被忽略（始终接受）。

有关重分发值的完整列表，请参见 [`/routing/ospf/instance`](../../../../cli-reference/routing/ospf/instance.md)。

## 路由汇总 {#route-summarization}

路由汇总将多条路由合并为单个通告。它在区域边界（区域边界路由器）处完成。

应朝骨干方向进行汇总。这样，骨干会接收所有聚合路由，并将它们注入其他区域时已经过汇总。汇总有两种类型：区域间路由汇总和外部路由汇总。

区域间路由汇总在区域边界（ABR）上生效。它不适用于通过重分发注入 OSPF 的外部路由。默认情况下，ABR 会为特定区域中的每条路由创建一个 summary LSA，并在相邻区域中通告它。

范围允许为多条路由仅创建一个 summary LSA，并向相邻区域仅发送单个通告，或者完全抑制通告。

如果使用 [`advertise`](../../../../cli-reference/routing/ospf/area/range.md) 参数配置了范围，则当特定区域在该范围下有任何路由时，会为每个范围通告单个 summary LSA。否则（当 `advertise` 参数被禁用时），不会创建任何 summary LSA，也不会在区域边界之外通告。

可以从 [`/routing/ospf/area/range`](../../../../cli-reference/routing/ospf/area/range.md) 菜单配置区域间路由汇总。

考虑两个区域：骨干和 area1。Area1 有若干来自 10.0.0.0/16 范围的 /24 路由，并且当可以汇总时，不必用每个 /24 子网泛洪骨干区域。在将 area1 连接到骨干的路由器上，可以设置区域范围：

```ros
/routing/ospf/area/range
add prefix=10.0.0.0/16 area=area1 advertise=yes cost=10
```

有关 [`advertise`](../../../../cli-reference/routing/ospf/area/range.md) 和 [`cost`](../../../../cli-reference/routing/ospf/area/range.md) 参数参考，请参见 [`/routing/ospf/area/range`](../../../../cli-reference/routing/ospf/area/range.md#cost)。

:::info
对于活动范围（即至少有一条来自指定区域的 OSPF 路由落在其下），会创建一条类型为 'blackhole' 的路由并安装到路由表中。
:::

外部路由汇总可以通过使用[路由过滤器](../../route-selection-and-filtering.md)来实现。考虑与上一个相同的示例，不同之处在于 area1 具有从其他协议重分发的 /24 路由。要发送单个汇总 LSA，请添加一条[黑洞路由](../../../../cli-reference/ip/route/index.md)，并配置适当的 [`/routing/filter/rule`](../../../../cli-reference/routing/filter/rule.md) 以仅接受汇总后的路由：

```ros
/ip/route/add dst-address=10.0.0.0/16 blackhole
/routing/ospf/instance
set v2inst out-filter-chain=ospf_out
/routing/filter/rule
add chain=ospf_out rule="if (dst == 10.0.0.0/16) {accept} else {reject}"
```

## 虚拟链路 {#virtual-link}

所有 OSPF 区域都必须连接到骨干区域，但有时无法进行物理连接。为克服此限制，可以使用**虚拟链路**以逻辑方式连接区域。

可以使用虚拟链路的两种常见场景：

- 将碎片化的骨干区域粘合在一起。
- 连接没有直接连接到骨干的远程区域。

### 分区骨干 {#partitioned-backbone}

OSPF 允许使用虚拟链路连接骨干区域的不连续部分。当两个分离的 OSPF 网络合并为一个大型网络时，可能需要这样做。可以在分别从两侧接触骨干区域并具有共同区域的独立 ABR 之间配置虚拟链路。

![](/img/ef8fd4be4ae15662.jpg#gh-light-mode-only)
![](/img/618a626465d2c05c.png#gh-dark-mode-only)

当不存在共同区域时，可以创建额外区域作为传输区域。上一张图展示了这一点。

当非骨干区域被分区时，不需要为它们使用虚拟链路。OSPF 不会主动尝试修复区域分区。当区域被分区时，每个组成部分只会成为单独的区域。骨干在新区域之间执行路由。某些目的地可通过**区域内**路由到达。区域分区需要**区域间**路由。

但是，要在分区后保持完整路由，地址范围不得拆分到区域分区的多个组成部分中。考虑使用 [BFD](../bfd.md) 在虚拟链路上实现更快的故障检测。

### 无到骨干的物理连接 {#no-physical-connection-to-a-backbone}

区域可能没有到骨干的物理连接。虚拟链路为断开连接的区域提供到骨干的逻辑路径。必须在共享共同区域的两个 ABR 之间建立链路，其中一个 ABR 连接到骨干。

![](/img/e642c0bd34f2b743.jpg#gh-light-mode-only)
![](/img/2a58e5cf11fcca93.png#gh-dark-mode-only)

R1 和 R2 都是 ABR，并且 R1 连接到骨干区域。Area2 将用作**传输区域**，而 R1 是进入骨干区域的**入口点**。必须在两台路由器上配置虚拟链路。

在 [`/routing/ospf/interface`](../../../../cli-reference/routing/ospf/interface.md) 菜单中添加虚拟链路配置。必须在两台路由器上配置 [`vlink-transit-area`](../../../../cli-reference/routing/ospf/interface.md#vlink-transit-area) 和 [`vlink-neighbor-id`](../../../../cli-reference/routing/ospf/interface.md#vlink-neighbor-id) 参数。基于该图的配置如下：

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
