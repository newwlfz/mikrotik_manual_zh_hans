---
sidebar_key: "user-guides/routing-and-networking-protocols/moving-from-rosv6-to-rosv7"
sidebar_position: 2
title: "从 ROSv6 迁移到 ROSv7"
sidebar_label: "从 ROSv6 迁移到 ROSv7"
description: "本页介绍从 RouterOS v6 到 v7 的过渡，重点说明关键变化，例如路由表限制增加、新的 `/routing/table` 和 `/routing/rule` 菜单、路由处理速度提升，以及策略路由方面的差异。文中包含配置自定义路由表、多 WAN 设置以及排查 mangle 规则冲突的示例。"
tags:
  - 'ospf'
  - 'bgp'
  - 'rip'
  - 'routing'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/moving-from-rosv6-to-rosv7
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

默认情况下，所有路由都会像以前一样加入 "main" 路由表。从配置角度看，最大的区别是路由表限制增加、路由表监控方式不同，以及路由如何加入特定路由表（见下一个示例）。
V7 引入了新菜单 `/routing/route`，它显示所有地址族路由以及所有被过滤的路由及其所有可能的路由属性。`/ip/route` 和 `/ipv6/route` 菜单用于添加静态路由，并为简单起见只显示基本路由属性。

有关路由的更深入信息，请参阅本文 ([IP 路由](../../getting-started/networking-fundamentals/index.md).

另一个新变化是，最常见的路由打印请求由路由进程处理，与 v6 相比显著提高了速度。

## 路由表的使用与策略路由 {#use-of-routing-tables-and-policy-routing}

与 v6 的主要区别在于，在配置中任何地方引用路由表之前，必须先将其添加到 `/routing/table` 菜单。  并且，如果打算让路由表将路由推送到 FIB，则应指定 **fib** 参数。
路由规则配置相同，只是菜单位置不同（现在不再是 `/ip route rule`，而是 `/routing/rule`）。

让我们考虑一个基本示例：我们只想在名为 myTable 的路由表中将 8.8.8.8 解析到网关 172.16.1.1：

```ros
/routing/table/add name=myTable fib
/routing/rule/add dst-address=8.8.8.8 action=lookup-only-in-table table=myTable
/ip/route/add dst-address=8.8.8.8 gateway=172.16.1.1@main routing-table=myTable
```

除了路由规则之外，您还可以使用 mangle 用 routing-mark 标记数据包，就像在 ROSv6 中一样。

使用 mangle 设置 routing-mark 时，请注意不要标记 "local" 流量。如果您的规则也标记本地流量，那么路由器的 IP 地址将不可达，因为默认情况下，mangle 位于列表首位并覆盖本地查找：

```routeros
[admin@CCR2004_2XS_111] /routing/rule> print
Flags: X - disabled, I - inactive; * - default
 0  * action=mangle

 1  * action=lookup vrf

 2  * action=unreachable vrf

 3  * action=lookup table=local

 4  * action=lookup table=main
```

例如，一个基本的多 WAN 设置：

```ros
/routing/table/add name=myTable fib
/ip/address
add address=192.168.1.1/24 interface=LAN
add address=1.1.1.2/24 interface=WAN1
add address=2.2.2.2/24 interface=WAN2
/ip/route
add gateway=1.1.1.1@main routing-table=myTable
add gateway=2.2.2.1
/ip/firewall/mangle/add in-interface=LAN action=mark-routing new-routing-mark=myTable
```

来自 LAN 接口、目标地址为 192.168.1.1 的数据包将被 mangle 规则标记，并由 "myTable" 路由表处理。在该表中，到达 192.168.1.1 的唯一路由是默认路由，这意味着该数据包将被转发到 1.1.1.1 网关。

有两种方法可以解决此问题：

- 通过向 mangle 规则添加 **`!dst-address-type=local`**，将 local 排除在标记之外。
- 在 `/routing/rule` 菜单中，将第一条规则（action=mangle）移到（action=lookup table=local）下方。

使用哪种方法取决于设置的复杂程度。

## 下一跳查找 {#nexthop-lookup}

考虑一个来自 v6 的示例：

```ros
/ip/route/add dst-address=10.0.1.0/24 gateway=10.0.0.1
    scope=50 target-scope=30 comment=A
/ip/route/add dst-address=10.0.2.0/24 gateway=10.0.0.1
    scope=30 target-scope=20 comment=B
/ip/route/add dst-address=10.0.0.0/24 scope=20 gateway=WHATEVER
    comment=C
```

网关 10.0.0.1 通过 C 使用最小的引用 scope（来自路由 B 的 scope 20）进行递归解析，并且两条路由都处于活动状态。现在我们同时更改 A 和 B：

```ros
/ip/route/set A target-scope=10
```

突然，应用对路由 A 的更新会使路由 B 的网关变为非活动状态。这是因为在 v6 中，每个地址只有一个网关对象。

v7 为每个地址保留多个网关对象，每个 scope 和网关检查的组合对应一个对象。

当更改路由的 `target-scope` 或网关检查时，ROS v7 ***不会影响其他路由***，而在 v6 中则会影响。在 v7 中，target-scope 和网关检查是内部附加到网关而不是路由的属性。

## OSPF 配置 {#ospf-configuration}

OSPFv3 和 OSPFv2 现在合并到一个菜单 `/routing/ospf` 中。撰写本文时，没有默认实例和区域。
要启动 OSPFv2 和 OSPF v3 实例，首先需要为每个实例创建一个实例，然后为每个实例添加一个区域。

```ros
/routing/ospf/instance
add name=v2inst version=2 router-id=1.2.3.4
add name=v3inst version=3 router-id=1.2.3.4
/routing/ospf/area
add name=backbone_v2 area-id=0.0.0.0 instance=v2inst
add name=backbone_v3 area-id=0.0.0.0 instance=v3inst
```

此时，您已准备好在网络接口上启动 OSPF。对于 IPv6，您可以添加要运行 OSPF 的接口（与 ROSv6 相同），或者添加 IPv6 网络。在第二种情况下，OSPF 将自动检测接口。以下是一些接口配置示例：

```ros
/routing/ospf/interface-template
add network=192.168.0.0/24 area=backbone_v2
add network=2001:db8::/64 area=backbone_v3
add network=ether1 area=backbone_v3
```

ROSv7 使用模板将接口与模板匹配，并应用匹配模板中的配置。  OSPF 菜单 `interface` 和 `neighbor` 包含只读条目，仅用于状态监控。

RouteOS 允许直接通过路由过滤器控制路由重分发，而无需 `redistribute` 参数。这为从哪些协议重分发哪些路由提供了更大的灵活性。
例如，假设您只想重分发来自 192.168.0.0/16 网络范围的静态 IPv4 路由。

**选项 1：**

```ros
/routing/ospf/instance
set v2inst out-filter-chain=ospf_out redistribute=static
```

```ros
/routing/filter/rule/add chain=ospf_out rule="if (dst in 192.168.0.0/16) {accept}"
```

**选项 2：**

```ros
/routing/filter/rule/add chain=ospf_out rule="if (protocol static && dst in 192.168.0.0/16) {accept}"
```

:::warning
路由过滤链的默认动作是 "reject"
:::

## BGP 配置 {#bgp-configuration}

与 ROSv6 相比，BGP 配置进行了彻底重新设计。第一个也是最大的区别是不再有 `instance` 和 **`peer`** 配置菜单。取而代之的是 **`connection`**、**`template`** 和 **`session`** 菜单。
这种结构的原因是要严格区分负责连接的参数和 BGP 协议特定的参数。

让我们从 Template 开始。它包含所有与 BGP 协议相关的配置选项。它可以用作动态对等体的模板，也可以将类似配置应用到一组对等体。请注意，这与 Cisco 设备上的对等体组不同，后者不仅仅是共同配置。

默认情况下，有一个默认模板，要求您设置自己的 AS。

```ros
/routing/bgp/template/set default as=65533
```

:::info
从 v7.1beta4 开始，模板参数暴露在 "connection" 配置中。这意味着模板不再是必需的，从而可以更轻松地进行基本 BGP 连接设置，类似于 ROSv6 中的方式。
:::

大多数参数与 ROSv6 类似，不同的是有些参数分组到 output 和 input 部分，使配置更易读，也更容易理解该选项是应用于输入还是输出。如果您熟悉 CapsMan，那么语法是相同的，例如，要指定输出选择链，您可以设置 `output.filter-chain=myBgpChain`。

您甚至可以从另一个模板继承模板参数，例如：

```ros
/routing/bgp/template
add name=myAsTemplate as=65500 output.filter-chain=myAsFilter
set default template=myAsTemplate
```

新路由配置的另一个重要方面是全局 Router ID，它设置 router-id 并将对等体分组到一个实例中。RouterOS 会添加一个默认 ID，该 ID 从任意接口的最高 IP 中选择 instance-id。默认 BGP 模板默认设置为使用 "default" ID。
如果出于任何原因需要调整或添加新实例，可以在 `/routing/id` 菜单中完成。

非常有趣的参数是 **`input.``affinity`** `and` **`output.affinity`**；它们允许控制活动会话的输入和输出将在哪个进程中处理：

- **alone** - 每个会话的输入和输出在其自己的进程中处理，当有很多核心和很多对等体时，这很可能是最佳选项。
- **afi, instance, vrf, remote-as** - 尝试在具有类似参数的进程中运行新会话的输入/输出。
- **main** - 在主进程中运行输入/输出（在单核上甚至可能在核心数较少的多核设备上可能提高性能）。
- **input** - 在与输入相同的进程中运行输出（仅可为 output affinity 设置）。

现在我们已经为模板设置了参数，可以添加 BGP 连接。最小参数集是 `remote.address`、`template, connect`、`listen` 和 `local.role`

Connect 和 listen 参数指定对等体是尝试连接并监听远程地址，还是只连接或只监听。在对等体使用多跳连接的设置中，也可能必须配置 `local.address`（就像 ROSv6 中的 `update-source` 一样）。

:::warning
并非必须指定远程 AS 号。ROS v7 可以从 open 消息中确定远程 ASN。只有当您想接受来自该特定 AS 的连接时，才应指定远程 AS。
:::

对等体角色现在是一个必需参数。对于基本设置，您可以直接使用 ibgp、ebgp（有关可用角色的更多信息，请参阅相应的 [RFC 草案]( https://datatracker.ietf.org/doc/draft-ietf-idr-bgp-open-policy/?include_text=1)）。请记住，目前草案中描述的能力、community 和过滤尚未实现。

非常基本的 iBGP 设置，用于在整个本地网络上监听连接：

```ros
/routing/bgp/connection
add remote.address=10.155.101.0/24 listen=yes template=default local.role=ibgp
```

现在您可以从 `/routing/bgp/session` 菜单监控所有已连接和未连接对等体的状态。

所有路由进程的其他有用调试信息可以从 `/routing/stats` 菜单监控

```text
[admin@v7_ccr_bgp] /routing/stats/process> print interval=1
Columns: TASKS, PRIVATE-MEM-BLOCKS, SHARED-MEM-BLOCKS, PSS, RSS, VMS, RETIRED, ID, PID, RPID, PROCESS-TIME, KERNEL-TIME, CUR-B>
# TASKS PRIVATE-M SHARED-ME PSS RSS VMS RET ID PID R PROCESS-TI KERN>
0 routing tables 12.2MiB 20.0MiB 18.7MiB 42.2MiB 83.4MiB 8 main 319 0 19s750ms 8s50>
rib >
connected networks >
1 fib 512.0KiB 0 7.4MiB 30.9MiB 83.4MiB fib 384 1 5s160ms 22s5>
2 ospf 1024.0KiB 1024.0KiB 5.9MiB 25.9MiB 83.4MiB 382 ospf 388 1 1m42s170ms 1m31>
connected networks >
3 fantasy 512.0KiB 0 2061.0KiB 5.9MiB 83.4MiB fantasy 389 1 1s410ms 870m>
4 configuration and reporting 40.0MiB 512.0KiB 45.0MiB 64.8MiB 83.4MiB static 390 1 12s550ms 1s17>
5 rip 768.0KiB 0 5.3MiB 24.7MiB 83.4MiB rip 387 1 1s380ms 1s20>
connected networks >
6 /routing/policy/configuration 512.0KiB 256.0KiB 2189.0KiB 6.0MiB 83.4MiB policy 385 1 1s540ms 1s20>
7 BGP service 768.0KiB 0 2445.0KiB 6.2MiB 83.4MiB bgp 386 1 6s170ms 9s38>
8 BGP Input 10.155.101.217 8.8MiB 6.0MiB 15.6MiB 38.5MiB 83.4MiB 20 21338 1 25s170ms 3s23>
BGP Output 10.155.101.217 >
9 Global memory 256.0KiB global 0 0 >
-- [Q quit|D dump|C-z pause|right]
```

路由过滤与 ROSv6 略有不同。在 BGP 模板中，您现在可以指定 output.filter-chain、output.filter-select、input.filter 以及若干 input.accept-\* 选项。

现在 input.accept-\* 允许在传入消息甚至还未被解析和存储到内存之前直接对其进行过滤，从而显著减少内存使用。常规输入过滤链只能拒绝前缀，这意味着它仍会占用内存，并会在 `/routing/route` 表中显示为 "not active, filtered"。

一个非常基本的 BGP 输入过滤器示例：接受来自 192.168.0.0/16 子网的前缀而不修改任何属性。对于其他前缀，从收到的 local pref 值中减去 1，并将 IGP metric 设置为来自 OSPF ext 的值。此外，我们将只接受地址列表中的特定前缀，以减少内存使用。

```ros
/ip/firewall/address-list
add list=bgp_list address=192.168.1.0/24
add list=bgp_list address=192.168.0.0/24
add list=bgp_list address=172.16.0.0/24

/routing/bgp/template
set default input.filter=bgp_in .accept-nlri=bgp_list

```

```ros
/routing/filter/rule
add chain=bgp_in rule="if (dst in 192.168.0.0/16) {accept}"
add chain=bgp_in rule="set bgp-local-pref -1; set bgp-igp-metric ospf-ext-metric; accept"
```

:::danger
如果未指定路由过滤链，BGP 将尝试通告它在路由表中能找到的每条活动路由
:::

:::info
路由过滤链的默认动作是 `reject`。
:::

### 监控通告 {#monitoring-advertisements}

RouterOS v7 默认禁用 BGP 输出监控。这可以在具有大型路由表的设置中显著减少资源使用。

要能够查看输出通告，应采取以下几个步骤：

- 在 BGP 连接配置中启用 "output.keep-sent-attributes"。
- 从 BGP 会话菜单运行 "dump-saved-advertisements"。
- 从 `/routing/stats/pcap` 菜单查看保存的输出。

```ros
[admin@arm-bgp] /routing/bgp/connection>  set 0 output.keep-sent-attributes=yes
[admin@arm-bgp] /routing/bgp/session> print
Flags: E - established
 0 E remote.address=10.155.101.183 .as=444 .id=192.168.44.2 .refused-cap-opt=no .capabilities=mp,rr,gr,as4
     .afi=ip,ipv6 .messages=4 .bytes=219 .eor=""
     local.address=10.155.101.186 .as=456 .id=10.155.255.186 .capabilities=mp,rr,gr,as4 .afi=ip,ipv6
     .messages=1 .bytes=19 .eor=""
     output.procid=66 .filter-chain=bgp_out .network=bgp-nets .keep-sent-attributes=yes
     input.procid=66 ebgp
     hold-time=3m keepalive-time=1m uptime=4s30ms

[admin@arm-bgp] /routing/bgp/session> dump-saved-advertisements 0 save-to=test_out.pcap

```

### 网络 {#networks}

最后，您可能会注意到 **`network`** 菜单不见了，并且可能想知道如何通告自己的网络。现在网络被添加到防火墙地址列表，并在 BGP 配置中引用。
以下是 ROSv6 网络配置：

```ros
/routing bgp network add network=192.168.0.0/24 synchronize=yes
/ip route add dst-address=192.168.0.0/24 type=blackhole
```

在 v7 中会转换为：

```ros
/ip/firewall/address-list
add list=bgp-networks address=192.168.0.0/24

/ip/route
add dst-address=192.168.0.0/24 blackhole

/routing/bgp/connection
set peer_name output.network=bgp-networks
```

还可以为每个 BGP 网络自动创建 blackhole 路由：

```ros
/routing/bgp/connection
set peer_name output.network-blackhole=yes
```

仅添加一个网络时需要做更多配置，但当您需要处理大量网络时，这提供了简便性。v7 甚至允许为每个 BGP 连接指定自己的网络集。

:::warning
在 v7 中无法关闭与 IGP 路由的同步（只有当相应的 IGP 路由存在于路由表中时，该网络才会被通告）。
:::

## 路由过滤器 {#routing-filters}

从 ROSv7.1beta4 开始，路由过滤器配置已改为类似脚本的配置。规则现在可以具有 "if .. then" 语法，以根据 "if" 语句中的条件设置参数或应用动作。

多个没有动作的规则会堆叠在单个规则中，并像防火墙一样按顺序执行，原因是 "set" 参数的顺序很重要，而且每行写一个 "set" 可以更容易地自上而下理解应用了哪些动作。

例如，匹配静态默认路由并应用 accept 动作可以写在一个配置规则中：

```ros
/routing/filter/rule
add chain=ospf_in rule="if (dst==0.0.0.0/0 && protocol static) { accept }"
```

例如，ROSv6 规则 `/routing/filter/add chain=ospf_in prefix=172.16.0.0/16 prefix-length=24 protocol=static action=accept` 转换为 ROSv7 后为：

```ros
/routing/filter/rule
add chain=ospf_in rule="if (dst in 172.16.0.0/16 && dst-len==24 && protocol static) { accept }"
```

另一个示例是匹配来自 172.16.0.0/16 范围且前缀长度等于 24 的前缀，并设置 BGP med 和 prepend 值

```ros
/routing/filter/rule
add chain=BGP_OUT rule="if (dst-len==24 && dst in 172.16.0.0/16) { \n
    set bgp-med 20; set bgp-path-prepend 2; accept }"
```

也可以像这样匹配前缀长度范围

```ros
/routing/filter/rule
add chain=BGP_OUT rule="if (dst-len>13 && dst-len<31 && dst in 172.16.0.0/16) { accept }"
```

过滤规则现在可用于从 community 列表中匹配或设置 community、large community 和 extended community：

```ros
/routing/filter/rule
add chain=bgp_in rule="set bgp-large-communities 200001:200001:10 "
```

如果有很多 community 集需要在多个规则中应用，则可以定义 community 集并使用它们来匹配或设置：

```ros
/routing/filter/large-community-set
add set=myLargeComSet communities=200001:200001:10

/routing/filter/rule
add chain=bgp_in rule="append bgp-large-communities myLargeComSet "
```

由于 route-target 编码在 extended community 属性中，要更改或匹配 RT，您需要操作 extended community 属性，例如：

```ros
/routing/filter/rule
add chain=bgp_in rule="set bgp-ext-communities rt:327824:20 "
```

## RPKI {#rpki}

RouterOS 实现了 RTR 客户端。您连接到服务器，服务器将发送路由有效性信息。然后，该信息可用于在路由过滤器中通过 "rpki-validate" 针对某个组验证路由，进一步在过滤器中可以使用 "match-rpki" 匹配确切状态。

有关更多信息，请参阅 [RPKI](./unicast/rpki.md) 文档。

## RIP 配置 {#rip-configuration}

要启动 RIP，应配置实例。在那里您应选择 RIP 将重分发哪些路由，以及是否重分发默认路由。

```ros
/routing/rip/instance
add name=instance1 originate-default=never redistribute=connected,static
```

然后应配置 interface-template。在 ROS 版本 7 中，不再像版本 6 那样需要定义网络。

```ros
/routing/rip/interface-template
add interfaces=ether1 instance=instance1
```

现在一台路由器上的基本配置已完成。RIP 邻居路由器应以类似方式配置。

在 ROS v7 中，仅当有路由要发送和/或接收时，邻居才会出现。

ROSv6 中的前缀列表已弃用，现在所有过滤都必须由路由过滤器完成。
