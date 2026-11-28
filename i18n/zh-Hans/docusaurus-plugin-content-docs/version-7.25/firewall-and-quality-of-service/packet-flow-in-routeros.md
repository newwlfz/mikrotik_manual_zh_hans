---
title: "RouterOS 中的数据包流"
description: "本页说明数据包如何在 MikroTik RouterOS 中流动，详细介绍网桥、路由、MPLS 决策和防火墙链之间的交互。页面包含图示，展示数据包从入口到出口的处理阶段，并说明路由表和防火墙链等关键组件。"
tags:
  - 'firewall'
  - 'packet-flow'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/packet-flow-in-routeros
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

更复杂的防火墙配置或复杂任务，例如流量优先级、路由策略，需要使用多个 RouterOS 功能时，必须具备相关知识：这些功能如何协同工作？何时以及为何会发生某些处理？

RouterOS 数据包流程图和流程示例将尝试回答这些问题。

用一个图表示数据包经历的全部过程会非常复杂；因此，数据包流程图分为三个部分：

- 总体图。
- 详细的网桥、路由和 MPLS 流程图。
- 显示 prerouting、input、forward、output 和 postrouting 中包含哪些功能以及按什么顺序处理的图。

### 总体数据包流程图 {#overall-packetflow-diagram}

下面来看总体图。它初看可能比较复杂，但结合示例逐步分析后，会变得更加清晰。

![](/img/54a08457cdf41791.svg)

图中央有 4 个框：Bridging、Routing、MPLS decisions 和本地路由器进程。例如，如果数据包需要通过路由器进行路由，其流动方式如下图所示。不深入查看每个功能时，数据包从 in-interface 进入，路由器判断它是 IP 流量且需要被路由，随后数据包经过所有路由处理，并从 out-interface 发出。

![](/img/47875864c1d4173f.webp)Let's take a look at another example that will illustrate what happens if the packet's destination is a router. For example, the in-interface receives an ICMP (ping) packet, its destination is the router itself, so the packet will go for *local-in* processing. After the packet is processed, an ICMP (ping) reply is generated inside the router *(local-out* processing) and will be sent out over the out-interface.

![](/img/c6b18c0d99ad79af.webp)A simple explanation of each box before we go further with examples:

- **Physical in-interface** - 路由器接收到的数据包的起点。
- **Logical in-interface** - 解封装后数据包的起点（来自隧道、IPsec 等）。
- **Local in** - 发往路由器自身的数据包的终点。
- **Interface HTB (Hierarchical Token Bucket)** - 接口队列。
- **Physical out-interface** - 数据包实际发出前的最后一点。
- **Logical out-interface** - 数据包封装前的最后一点（发往隧道、IPsec 等）。
- **Local out** - 路由器生成的数据包的起点。

现在需要进一步了解网桥、MPLS 和路由流程内部发生的情况。

![](/img/3d82c42594228f6f.webp)

在继续示例之前，先简单说明每个框：

- **Routing decision** - 遍历路由表中的路由，查找与数据包目标 IP 地址匹配的项。找到匹配项后，数据包将被进一步处理；未找到匹配项时，数据包将被丢弃。
- **MPLS decision** - 根据 MPLS 转发表决定如何处理数据包。
- **Bridging decision** - 网桥遍历 MAC 地址表，查找与数据包目标 MAC 地址匹配的项。找到匹配项后，数据包将被进一步处理；未找到匹配项时，将创建多个数据包副本，并泛洪数据包（通过所有网桥端口发送）。由于网桥接口本身也是众多目标之一，单个数据包副本也会到达网桥 input 链。使用 `vlan-filtering=yes` 时，因 `/interface/bridge/vlan` 表而不允许通过的数据包将在此阶段被丢弃。
- **use-ip-firewall** - 网桥设置中是否启用了“*use-ip-firewall'*”选项。
- **ipsec-policy** - 数据包是否匹配任何已配置的 IPsec 策略。

#### Chains

RouterOS 包含多个默认链。这些链允许你在不同位置过滤数据包：

- **PREROUTING** 链：该链中的规则适用于刚到达网络接口的数据包。该链存在于 *nat*、*mangle* 和 *raw* 表中。
- **INPUT** 链：该链中的规则适用于即将交给本地进程的数据包。该链存在于 *mangle* 和 *filter* 表中。
- **OUTPUT** 链：此处的规则适用于刚由进程产生的数据包。该链存在于 *raw*、*mangle*、nat 和 *filter* 表中。
- **FORWARD** 链：此处的规则适用于经由当前主机路由的任何数据包。该链仅存在于 *mangle* 和 *filter* 表中。
- **POSTROUTING** 链：该链中的规则适用于即将离开网络接口的数据包。该链存在于 *nat* 和 *mangle* 表中。

每个 prerouting、input、forward、output 和 postrouting 块都包含更多设施，数据包流程图第三部分对此进行了说明：

![](/img/0724b7c10ff614e8.webp)

在继续示例之前，先简单说明每个框：

- **Hotspot-in** - 允许捕获否则会被连接跟踪丢弃的流量，这样即使网络设置不完整或混乱，Hotspot 功能也能提供连接。
- **RAW Prerouting** - RAW 表的 prerouting 链。
- **Connection tracking** - 数据包由连接跟踪处理。
- **Mangle Prerouting** - Mangle prerouting 链。
- **Mangle Input** - Mangle input 链。
- **Filter Input** - 防火墙 filter input 链。
- **HTB Global** - 队列树。
- **Simple Queues** - 可用于限制特定目标流量的功能。
- **TTL** - 表示路由数据包的 Time To Live（TTL）减少 1 的确切位置。如果 TTL 变为 0，数据包将被丢弃。
- **Mangle Forward** - Mangle forward 链。
- **Filter Forward** - Filter forward 链。
- **Accounting** - Authentication、Authorization 和 Accounting 功能处理。
- **RAW Output** - RAW 表的 output 链。
- **Mangle Output** - Mangle output 链。
- **Filter Output** - 防火墙 filter output 链。
- **Routing Adjustment** - 一种变通方法，允许在 mangle output 链中设置策略路由（routing-mark）。
- **Mangle Postrouting** - Mangle postrouting 链。
- **Src Nat** - Network Address Translation srcnat 链。
- **Dst Nat** - Network Address Translation dstnat 链。
- **Hotspot-out** - 撤销 hotspot-in 对返回客户端的数据包所做的所有处理。

### 路由数据包的流程 {#flow-of-routed-packet}

#### Forward

现在，让我们以第一个示例为例，数据包经过路由器路由，并进一步了解数据包经过哪些设施：

我们已经了解到，数据包进入 in-interface，路由器判断它是 IP 数据包并需要路由，复杂的过程从这里开始：

1. 数据包进入 prerouting 处理：
   1. 检查是否存在 hotspot，并为 hotspot 使用修改数据包。
   2. 通过 RAW prerouting chain 处理数据包。
   3. 将数据包送入 connection tracking。
   4. 通过 Mangle prerouting chain 处理数据包。
   5. 通过 NAT 的 dst-nat chain 处理数据包。
2. 通过路由表运行数据包，以做出路由决策。
3. 数据包进入 forward 处理：
   1. 检查 TTL 值。
   2. 通过 Mangle forward chain 处理数据包。
   3. 通过 Filter forward chain 处理数据包。
   4. 将数据包送入 accounting 处理。
4. 数据包进入 postrouting 处理：
   1. 通过 Mangle postrouting chain 处理数据包。
   2. 通过 NAT 的 src-nat chain 处理数据包。
   3. 如果存在 hotspot，则撤销在 hotspot-in 中所做的任何修改。
   4. 通过 queue tree（HTB Global）处理数据包。
   5. 通过 simple queues 处理数据包。
5. 检查是否存在 IPsec，然后通过 IPsec policies 处理。

![](/img/8dac7fe74227e99a.webp)

![](/img/d45ef1f88a92f873.webp)

#### Input

我们已经了解到，数据包进入 in-interface，路由器判断它是 IP 数据包并需要路由，复杂的过程从这里开始：

1. 当数据包的目的地是路由器时，会发生非常类似的过程（routing input）：数据包进入 prerouting 处理：
   1. - 检查是否存在 hotspot，并为 hotspot 使用修改数据包。
   2. - 通过 RAW prerouting chain 处理数据包。
   3. - 将数据包送入 connection tracking。
   4. - 通过 Mangle prerouting chain 处理数据包。
   5. - 通过 NAT 的 dst-nat chain 处理数据包。
2. 通过路由表运行数据包，以做出路由决策。
3. 数据包进入 input 处理：
   1. - 通过 Mangle input chain 处理数据包。
   2. - 通过 Filter input chain 处理数据包。
   3. - 通过 queue tree（HTB Global）处理数据包。
   4. - 通过 simple queues 处理数据包。
4. 检查是否存在 IPsec，然后通过 IPsec policies 处理。

![](/img/8d210a14ee931fdf.webp)

![](/img/e4c27a683fe133ca.webp)

#### Output

或者当数据包源自路由器时（routing output）：

1. 数据包源自路由器本身。
   1. 数据包通过路由表做出路由决策。
2. 数据包进入 output 处理。
   1. 通过 Bridge decision 处理数据包。
   2. 将数据包送入 connection tracking。
   3. 通过 Mangle output chain 处理数据包。
   4. 通过 Filter output chain 处理数据包。
   5. 将数据包送入 routing adjustment（policy routing）。
3. 数据包进入 postrouting 处理。
   1. - 通过 Mangle postrouting chain 处理数据包。
   2. - 通过 NAT 的 src-nat chain 处理数据包。
   3. - 如果存在 hotspot，则撤销在 hotspot-in 中所做的任何修改。
   4. - 通过 queue tree（HTB Global）处理数据包。
   5. - 通过 simple queues 处理数据包。
4. 检查是否存在 IPsec，然后通过 IPsec policies 处理。

![](/img/d7ee665d35fc59eb.webp)![](/img/bbe918f99502e362.webp)

### 网桥数据包流程 {#flow-of-bridged-packet}

下文讨论 RouterOS 中的通用网桥处理过程。大多数数据包始终遵循相同的处理路径，但在某些配置中（例如启用了 VLAN 过滤、horizon、STP、DHCP 或 IGMP snooping）部分数据包可能会被区别处理。更具体的信息请参阅网桥手册。

#### ![](/img/936d1582966e9a76.webp)

#### 网桥转发 {#bridge-forward}

网桥转发是指数据包从一个网桥端口转发到另一个网桥端口时发生的过程，本质上是将同一网络中的多个设备连接起来。设备在入接口收到数据包后，会判断该入接口是否为网桥端口，随后将数据包传入网桥处理流程：

1. 数据包经过网桥 NAT dst-nat 链，在该链中可以修改 MAC 目的地址和优先级。除此之外，数据包也可以被直接接受、丢弃或标记。
2. 检查网桥设置中是否启用了 use-ip-firewall 选项。
3. 让数据包经过网桥主机表以做出转发决策。最终被泛洪的数据包（例如广播、组播、未知单播流量）会按每个网桥端口复制，然后在网桥 forward 链中继续处理。使用 `vlan-filtering=yes` 时，因 `/interface/bridge/vlan` 表而不允许通过的数据包会在该阶段被丢弃。
4. 数据包经过网桥 filter forward 链，在该链中可以修改优先级，也可以直接接受、丢弃或标记数据包。
5. 检查网桥设置中是否启用了 use-ip-firewall 选项。
6. 数据包经过网桥 NAT src-nat 链，在该链中可以修改 MAC 源地址和优先级。除此之外，数据包也可以被直接接受、丢弃或标记。
7. 检查网桥设置中是否启用了 use-ip-firewall 选项。

![](/img/19c0854c81bd23fd.webp)

:::info
**对于 RouterOS v6：**  
启用网桥 `vlan-filtering` 后，收到的未标记数据包可能会在“DST-NAT”块之前被封装进 VLAN 头，这意味着可以使用 `mac-protocol=vlan` 和 `vlan-encap` 设置过滤这些数据包。如果出接口的 `frame-types` 设置为 `admit-all` 或 `admit-only-untagged-and-priority-tagged`，则可能发生封装。

标记数据包可能会在“BRIDGING DECISION”块被解封装，这意味着这些数据包将不再匹配 `mac-protocol=vlan` 和 `vlan-encap` 设置。如果数据包的 VLAN ID 与出端口的未标记 VLAN 成员关系匹配，则可能发生解封装。
  
**对于 RouterOS v7 及更高版本：**

启用网桥 `vlan-filtering` 后，收到的未标记数据包可能会在“BRIDGING-DECISION”块被封装进 VLAN 头，这意味着可以使用 `mac-protocol=vlan` 和 `vlan-encap` 设置过滤这些数据包。如果出接口的 `frame-types` 设置为 `admit-all` 或 `admit-only-untagged-and-priority-tagged`，则可能发生封装。

标记数据包可能会在“BRIDGING DECISION”块被解封装，这意味着这些数据包将不再匹配 `mac-protocol=vlan` 和 `vlan-encap` 设置。如果数据包的 VLAN ID 与出端口的未标记 VLAN 成员关系匹配，则可能发生解封装。
:::

#### 网桥输入 {#bridge-input}

网桥输入是指数据包的目的地为网桥接口时发生的过程。最常见的情况是你需要访问运行在网桥接口上的某些服务（例如 DHCP 服务器），或者需要将数据流路由到其他网络。最初的步骤与网桥转发过程类似：设备在入接口收到数据包后，会判断该入接口是否为网桥端口，随后将数据包传入网桥处理流程：

1. 数据包经过 bridge NAT dst-nat 链，在该链中可以修改 MAC 目的地址和优先级；除此之外，数据包可以被直接接受、丢弃或标记。
2. 检查 bridge 设置中的 use-ip-firewall 选项是否启用。
3. 让数据包经过 bridge host table 以做出转发决策。目的 MAC 地址与 bridge MAC 地址匹配的数据包将被传递到 bridge input 链。最终被泛洪的数据包（例如广播、组播、未知单播流量）也会到达 bridge input 链，因为 bridge 接口本身就是众多目的之一。
4. 数据包经过 bridge filter input 链，在该链中可以修改优先级，也可以直接接受、丢弃或标记数据包。

![](/img/c086efd5882264c9.webp)

#### 网桥输出 {#bridge-output}

Bridge output 是数据包应通过一个或多个 bridge 端口离开设备时发生的过程。最常见的情况是 bridge 接口自身尝试访问连接到某个 bridge 端口的设备（例如运行在 bridge 接口上的 DHCP 服务器响应 DHCP 客户端）。在数据包经过其他更高层级的 RouterOS 进程处理，并且设备最终确定输出接口是 bridge 后，数据包会经过桥接过程：

1. 让数据包经过 bridge host table 以做出转发决策。最终被泛洪的数据包（例如广播、组播、未知单播流量）会按每个 bridge 端口复制，然后在 bridge output 链中继续处理。
2. 数据包经过 bridge filter output 链，在该链中可以修改优先级，也可以直接接受、丢弃或标记数据包。
3. 数据包经过 bridge NAT src-nat 链，在该链中可以修改 MAC 源地址和优先级；除此之外，数据包可以被直接接受、丢弃或标记。
4. 检查 bridge 设置中的 use-ip-firewall 选项是否启用。

![](/img/c29c9ee3aa3a635e.webp)

#### 启用防火墙时转发 {#forward-with-firewall-enabled}

在某些网络配置中，可能需要为桥接流量启用路由链上的额外处理，例如使用简单队列或 IP 防火墙。可以在 bridge 设置下启用 use-ip-firewall 来实现。请注意，额外处理会消耗更多 CPU 资源来处理这些数据包。所有步骤已在前面各点中讨论过；以下为回顾：

1. 数据包经过 bridge NAT dst-nat 链。
2. 启用 use-ip-firewall 选项后，数据包将在 prerouting 链中进一步处理。
3. 数据包进入 prerouting 处理。
4. 让数据包经过 bridge host table 以做出转发决策。
5. 数据包经过 bridge filter forward 链。
6. 启用 use-ip-firewall 选项后，数据包将在路由 forward 链中进一步处理。
7. 数据包进入路由 forward 处理。
8. 数据包经过 bridge NAT src-nat 链。
9. 启用 use-ip-firewall 选项后，数据包将在 postrouting 链中进一步处理。
10. 数据包进入 postrouting 处理。

![](/img/ca8f80b20d2e4d28.webp)![](/img/f1ae5b79a33340c3.webp)

### 硬件卸载数据包的流程 {#flow-of-hardware-offloaded-packet}

在上一主题中，我们仅讨论了软件网桥，它需要主 CPU 处理才能通过正确的网桥端口转发数据包。大多数 MikroTik 设备都配备专用交换硬件，即所谓的交换芯片或交换 ASIC。这使我们能够将部分网桥功能（例如网桥端口之间的数据包转发或数据包过滤）卸载到该专用硬件芯片，而不消耗任何 CPU 资源。在 RouterOS 中，我们将此功能称为 Bridge Hardware (HW) Offloading。不同 MikroTik 设备可能配备不同的交换芯片，每种芯片提供的功能集也不同，因此请务必访问此文章以获取更多详情 - [Bridge Hardware Offloading](/docs/7.24/bridging-and-switching#bridge-hardware-offloading)。

![](/img/ea5afd533506de95.webp)

:::warning
当 out-interface 已硬件卸载且网桥 Fast Path 未激活时，Interface HTB 将无法正常工作。
:::

![](/img/3fcb32a3b81fe833.webp)

- **Switching decision** - 在很大程度上取决于交换型号。该模块控制所有与交换相关的任务，例如主机学习、数据包转发、过滤、VLAN tagging/untagging 等。某些交换配置可能会改变数据包流。
- **switch-cpu port** - 用于主 CPU 与其他交换端口之间通信的专用交换端口。请注意，switch-cpu port 除 switch 菜单外不会在 RouterOS 中的任何位置显示。任何与软件相关的配置（例如 interface-list）都无法应用于该端口。到达 CPU 的数据包会自动与物理 in-interface 关联。

不过，硬件卸载并不限制设备只能使用硬件受限的功能；相反，可以同时利用硬件和软件处理。这确实需要对数据包如何经过交换芯片以及它们何时被传递到主 CPU 有深入理解。

:::info
在 `/interface/ethernet/switch` 菜单及其子菜单中找到的交换功能，例如 ACL 规则、镜像、ingress/egress 速率限制器、QoS 和 L3HW（inter-VLAN routing 除外），可能不依赖网桥硬件卸载。因此，它们**可能**应用于未在硬件卸载网桥中配置的接口。
:::

#### 交换机转发 {#switch-forward}

下面将进一步讨论启用网桥硬件卸载时的数据包流，以及数据包在单个交换芯片上的两个交换端口之间转发的情况。这是最常见且最简单的示例：

1. 交换机会检查 in-interface 是否为硬件卸载接口。
2. 交换机让数据包经过交换主机表以做出转发决策。如果交换机找到与目标 MAC 地址匹配的条目，则通过物理接口发送该数据包。最终被泛洪的数据包（例如广播、组播、未知单播流量）会被复制并发送到每个硬件卸载的交换端口。

![](/img/dddbd2a9528c75c7.webp)

#### 切换到 CPU 输入 {#switch-to-cpu-input}

当数据包在物理接口上接收，并且其目标是 switch-cpu 端口以进行进一步软件处理时，会发生此过程。到 switch-cpu 有两条路径。一条路径是完全未使用硬件卸载和交换的情况（例如，用于路由的独立接口，或故意禁用 HW 卸载的网桥接口），因此数据包会直接传递给软件处理。另一条路径是在 in-interface 上启用硬件卸载时采用。这会使数据包经过交换决策，并且交换芯片可能出于多种原因将数据包转发到 switch-cpu 端口：

- 数据包的目 MAC 地址与本地 MAC 地址匹配，例如数据包发往本地网桥接口。
- 数据包可能被泛洪到所有交换机端口，包括 switch-cpu 端口，例如接收到广播、组播或未知单播流量时。
- 交换机可能已学习到某些主机只能通过 CPU 到达（switch-cpu 端口学习将在下一节讨论），例如网桥包含 HW 和非 HW 卸载接口时，如 wireless、EoIP，甚至 Ethernet 接口。
- 数据包被有意复制到 switch-cpu，例如用于数据包检查。
- 数据包由交换机配置触发，应在软件中处理，例如 DHCP 或 IGMP snooping。

查看 in-interface 为硬件卸载时的数据包流程：

1. 交换机检查 in-interface 是否为硬件卸载接口。
2. 让数据包通过交换机主机表进行转发决策。如果上述任意条件成立，数据包将被转发到 switch-cpu 端口。
3. 数据包通过 switch-cpu 端口离开，并由 RouterOS 数据包流程进一步处理。

![](/img/aa47730474667b9a.webp)

:::warning
交换芯片泛洪的任何已接收数据包都不会再由软件网桥泛洪回同一 HW 卸载交换组。这可防止形成重复数据包。
:::

#### CPU 输出到交换机 {#cpu-output-to-switch}

当数据包退出 RouterOS 软件处理并在 switch-cpu 端口上接收时，会发生此过程。同样，数据包可以采用两条路径。一条路径是完全未使用硬件卸载和交换的情况（例如，用于路由的独立接口，或故意禁用 HW 卸载的网桥接口），因此数据包会直接通过物理 out-interface 发送出去。另一条路径是在 out-interface 上启用硬件卸载时采用。这会使数据包经过交换决策。与任何其他交换机端口一样，交换机会从 switch-cpu 端口接收到的数据包中学习源 MAC 地址。当网桥包含 HW 和非 HW 卸载接口时，这很有用，因为交换机可以学习哪些帧应转发到 CPU。查看 out-interface 为硬件卸载时的数据包流程：

1. 退出 RouterOS 软件处理的数据包会在 switch-cpu 端口上接收。
2. 交换机检查 out-interface 是否为硬件卸载接口。
3. 交换机通过交换机主机表运行数据包，以做出转发决策。如果交换机找到与目标 MAC 地址匹配的条目，则通过物理接口发送该数据包。最终被泛洪的数据包（例如广播、组播、未知单播流量）会被复制并发送到每个硬件卸载的交换机端口。

![](/img/c2e413d83e995a03.webp)

:::warning
通过 HW 卸载接口发送泛洪数据包的软件网桥，每个 HW 卸载交换机组只会发送一份数据包副本，而不是每个 HW 卸载接口都发送一份。实际泛洪将由交换芯片完成；这可避免形成重复数据包。
:::

### MPLS 数据包流程 {#flow-of-mpls-packet}

![](/img/3dc66d654b4ce06e.webp)

#### Pop Label

![](/img/7a74ba782936be6d.webp)

#### 交换机标签 {#switch-label}

![](/img/ea6fa4d9db09d154.webp)

#### 推送标签 {#push-label}

![](/img/87c77c70ffb17ec1.webp)

### MPLS IP VPN

在 VPNv4 部署中，到达 PE 路由器且需要转发到 CE 路由器的数据包并不是典型的“转发”。

如果传入标签和目的地址绑定到 VRF，那么在弹出 MPLS 标签后：

- 目的地址为路由器本地地址，则数据包移动到 LOCAL\_IN。
- 目的地址位于 CE 网络中，则数据包移动到 LOCAL\_OUT。

:::danger
从 MPLS 云转发到 CE 网络的数据包不会显示在 forward 中。
:::

例如，从 src:111.15.0.1 到 dst:111.13.0.1 的流量。

```text
[admin@CCR2004_2XS] /mpls/forwarding-table> print 
Flags: L - LDP, P - VPN
Columns: LABEL, VRF, PREFIX, NEXTHOPS
#   LABEL  VRF      PREFIX         NEXTHOPS                                                                                                           
0 P    17  myVrf    111.13.0.0/24  
4 L    20  main     203.0.113.2    { label=impl-null; nh=111.11.0.1; interface=sfp-sfpplus1 }
[admin@CCR2004_2XS] /mpls/forwarding-table>                                                           
...

[admin@CCR2004_2XS] /ip/route> print detail 
Flags: D - dynamic; X - disabled, I - inactive, A - active; c - connect, s - static, r - rip, b - bgp, o - ospf, i - is-is, d - dhcp, v - vpn, m - modem, y - bgp-mpls-vpn; 
H - hw-offloaded; + - ecmp 

   DAc   dst-address=111.11.0.0/24 routing-table=main gateway=sfp-sfpplus1 immediate-gw=sfp-sfpplus1 distance=0 scope=10 suppress-hw-offload=no 
         local-address=111.11.0.2%sfp-sfpplus1 
   DAc   dst-address=203.0.113.1/32 routing-table=main gateway=lo immediate-gw=lo distance=0 scope=10 suppress-hw-offload=no local-address=203.0.113.1%lo 
   DAo   dst-address=203.0.113.2/32 routing-table=main gateway=111.11.0.1%sfp-sfpplus1 immediate-gw=111.11.0.1%sfp-sfpplus1 distance=110 scope=20 target-scope=10 
         suppress-hw-offload=no 
   DAc   dst-address=111.13.0.0/24 routing-table=myVrf gateway=sfp-sfpplus2@myVrf immediate-gw=sfp-sfpplus2 distance=0 scope=10 suppress-hw-offload=no 
         local-address=111.13.0.2%sfp-sfpplus2@myVrf 
   DAy   dst-address=111.15.0.0/24 routing-table=myVrf gateway=203.0.113.2 immediate-gw=111.11.0.1%sfp-sfpplus1 distance=200 scope=40 target-scope=30 suppress-hw-offload=no [admin@CCR2004_2XS] /ip/route>              
```

该数据包将出现在 output 和 postrouting 链中，因为现在它是本地发起的数据包，其源 MAC 地址等于 vrfInterface：

```text
08:10:55 firewall,info output: in:(unknown 0) out:sfp-sfpplus2, connection-state:established src-mac f2:b5:e9:17:18:3b, proto ICMP (type 8, code 0), 111.15.0.1->111.13.0.1, len 56
08:10:55 firewall,info postrouting: in:myVrf out:sfp-sfpplus2, connection-state:established src-mac f2:b5:e9:17:18:3b, proto ICMP (type 8, code 0), 111.15.0.1->111.13.0.1, len 56
```

另一方面，沿 CE→PE 方向路由的数据包将在发送到 MPLS 之前，像其他路由 IP 流量一样出现在“forward”中：

```text
 08:10:55 firewall,info prerouting: in:sfp-sfpplus2 out:(unknown 0), connection-state:established src-mac dc:2c:6e:46:f8:93, proto ICMP (type 0, code 0), 111.13.0.1->111.15.0.1, len 56
 08:10:55 firewall,info forward: in:sfp-sfpplus2 out:sfp-sfpplus1, connection-state:established src-mac dc:2c:6e:46:f8:93, proto ICMP (type 0, code 0), 111.13.0.1->111.15.0.1, len 56
 08:10:55 firewall,info postrouting: in:sfp-sfpplus2 out:sfp-sfpplus1, connection-state:established src-mac dc:2c:6e:46:f8:93, proto ICMP (type 0, code 0), 111.13.0.1->111.15.0.1, len 56
 
```

但也可能存在例外。如果回复数据包的目的 IP 是路由器本地地址，并且连接跟踪正在执行 NAT 转换，则连接跟踪将“强制”数据包经过防火墙 prerouting/forward/postrouting 链。

### 逻辑接口 {#logical-interfaces}

到目前为止，我们看到的示例都是 in 或 out 接口为实际物理接口（Ethernet、无线）的情况，但如果路由器收到隧道封装的数据包，数据包将如何流动？

![](/img/91fe801fb891e2c4.webp)

假设有一个 IPIP 数据包进入路由器。由于它是普通 IPv4 数据包，因此会经过所有与路由相关的设施处理（直到图中的“J”）。然后路由器会检查该数据包是否需要解封装。在本例中，它是 IPIP 数据包，因此“是”，将数据包发送到解封装。之后，数据包会再次经过所有设施处理，但这次是作为已解封装的 IPv4 数据包。

这一点非常重要，因为数据包实际上会两次经过防火墙，所以如果防火墙规则严格，则不仅需要对已解封装的 IP 数据包配置“accept”规则，也需要对 IPIP 封装的数据包配置“accept”规则。

:::info
使用启用了 `vlan-filtering` 的网桥进行数据包封装和解封装与逻辑接口无关。详情请参阅网桥部分。
:::

### IPSec 策略 {#ipsec-policies}

让我们看另一种隧道类型——IPSec。这种 VPN 没有逻辑接口，但处理方式类似。

数据包不是通过逻辑接口处理，而是通过 IPSec 策略处理。在路由决策（2）和 input 防火墙处理（3）之后，路由器会尝试将源地址和目标地址与 IPsec 策略进行匹配。当策略与数据包匹配时，数据包会被发送到解密（5）。解密后，数据包再次进入 PREROUTING 处理（6），并开始另一个处理循环，但此时处理的是已解封装的数据包。

![](/img/4dea6a04e6bb6979.webp)

封装过程相同，但顺序相反。第一个 IP 数据包先经过各设施处理，然后与 IPsec 策略匹配（5），进行封装（6），再发送到第二个循环进行处理（7-10）。

![](/img/4b030c78a10265d8.webp)

## 快速路径 {#fast-path}

根据目前所述内容，很明显此类数据包处理会占用大量 CPU 资源。为加快处理速度，RouterOS v6 首次引入了 FastPath。它会跳过 Linux 内核中的处理，本质上是以部分 RouterOS 功能换取性能。要使 FastPath 工作，需要接口驱动支持和特定配置条件。

### Fast Path 的工作原理 {#how-fast-path-works}

FastPath 是接口驱动扩展，允许驱动直接与特定 RouterOS 设施通信，并跳过所有其他设施。

![](/img/1613487aa5987120.svg)

只有当至少源接口支持 fast path 时，数据包才能由 fast path 处理程序转发。要实现完整的快速转发，还需要目标接口支持。

目前，RouterOS 具有以下 FastPath 处理程序：

- IP 流量处理
- FastTrack
- Traffic Generator
- MPLS
- 网桥

满足以下条件时使用 FastPath 处理程序：

- 未配置防火墙规则。
- 未配置 Simple queue 或带 *parent=global* 的队列树。
- 未配置 Mesh 或 metarouter 接口。
- Sniffer 或 torch 未运行。
- Connection tracking 未激活。
- IP accounting 已禁用。
- 未配置 VRF（`/ip/vrf` 为空）。
- 未使用 hotspot（`/ip/hotspot` 没有接口）。
- 未配置 IPSec 策略。
- `/tool/mac-scan` 未在使用中。
- `/tool/ip-scan` 未在使用中。

:::warning
无论是否满足上述条件，使用 FastTrack 时数据包都会走 FastPath 路径。
:::

FastPath 按目的地址缓存 IPv4 和 IPv6 路由，而不是按 L4 端口或内部报头缓存。因此，对于 FastPath 缓存的流量，ECMP `l4` 和 `l3-inner` 策略不提供按流分发。

如果接口支持该功能，Traffic Generator 会自动使用 FastPath。

目前，MPLS fast-path 适用于 MPLS 交换流量（以 MPLS 形式进入路由器且必须以 MPLS 形式离开路由器的帧）以及执行 VPLS 封装/解封装的 VPLS 端点。其他 MPLS ingress 和 egress 将按原有方式运行。

满足以下条件时使用 Bridge handler：

- 没有 bridge Calea、filter、NAT 规则。
- *use-ip-firewall* 已禁用。
- 没有 mesh、MetaRouter 接口配置。
- sniffer、torch 和 traffic generator 未运行。
- bridge vlan-filtering 已禁用（自 RouterOS 7.2 起移除该条件）。
- bridge dhcp-snooping 已禁用。

:::warning
启用 vlan-filtering 的网桥上的 FastPath 不支持带优先级标记的数据包（带 VLAN 报头但 VLAN ID = 0 的数据包）。这些数据包会通过慢速路径转发。
:::

支持 FastPath 的接口：

| RouterBoard | 接口 |
| :-- | :-- |
| **RB6xx series** | ether1,2 |
| **RB800** | ether1,2 |
| **RB1100 series** | ether1-11 |
| **All devices** | Ethernet 接口 |
|  | 无线接口 |
|  | 网桥接口 |
|  | VLAN、VRRP 接口 |
|  | bonding 接口（仅 RX） |
|  | PPPoE、L2TP 接口 |
|  | EoIP、GRE、IPIP、VXLAN 接口。 |
|  | VPLS（从 v7.17 开始） |

EoIP、Gre、IPIP、VXLAN 和 L2TP 接口具有每接口设置 *allow-fast-path.* 在这些接口上允许 fast path 会产生副作用：对于通过 fast-path 的封装数据包，将绕过防火墙、连接跟踪、simple queues、parent=global 的 queue tree、IP accounting、IPsec、hotspot universal client 和 vrf 分配。此外，FastPath 无法接收数据包分片。

:::info
可使用 `/interface/print stats-detail` 验证是否正在使用 FastPath
:::

唯一能够保证 FastPath 的接口队列是 only-hardware-queue。如果需要硬件队列以外的接口队列，数据包将无法完整经过 FastPath，但对性能影响不大，因为“接口队列”是数据包流程中的最后一步。

数据包可能通过从 FastPath 切换到 SlowPath 而进入 Half-FastPath，但不能反向切换。例如，如果接收接口支持 FastPath，而出接口不支持，则路由器会尽可能使用 FastPath 处理程序处理数据包，然后继续使用 SlowPath。如果接收接口不支持 FastPath，而出接口支持，则数据包在路由器中全程由 SlowPath 处理。

![](/img/4af1f73d77c10a2d.webp)

## FastTrack

Fasttrack 可理解为 Fast Path + Connection Tracking。它允许将连接标记为“fast-tracked”，属于 fast-tracked 连接的数据包将通过 fast-path 方式发送。此类连接的连接表条目现在将带有 fast-tracked 标志。

![](/img/aa98e5eb14f84662.webp)

:::warning
FastTrack 数据包会绕过防火墙、连接跟踪、simple queues、parent=global 的 queue tree、ip traffic-flow、IP accounting、IPSec、hotspot universal client 和 VRF 分配，因此管理员需要确保 FastTrack 不会干扰其他配置！
:::

要将连接标记为 fast-tracked，已为防火墙 filter 和 mangle 实现新动作“*fasttrack-connection*”。目前，只有 TCP 和 UDP 连接可以被 fast-tracked，并且为维护连接跟踪条目，仍会将一些随机数据包发送到慢速路径。在设计启用“fasttrack”的防火墙时，必须考虑这一点。

FastTrack 处理器还支持源 NAT 和目的 NAT，因此无需为 NAT 连接设置特殊例外。

:::danger
属于 fast-tracked 连接的流量会在 FastPath 中传输，这意味着其他路由器 L3 功能（防火墙、队列、IPsec、IP 计费、VRF 分配等）将看不到这些流量。Fasttrack 查找会在设置路由标记之前进行路由，因此它仅适用于主路由表。
:::

在家庭路由器上开始使用该功能的最简单方法，是为所有 *established, related* 连接启用“fasttrack”：

```ros
/ip/firewall/filter 
add chain=forward action=fasttrack-connection connection-state=established,related \
  comment="fasttrack established/related"
add chain=forward action=accept connection-state=established,related \
  comment="accept established/related"
```

请注意，第一条规则将 established/related 连接标记为 fast-tracked，第二条规则仍然必需，用于接受属于这些连接的数据包。原因是，如前所述，来自 fast-tracked 连接的一些随机数据包仍会通过慢速路径发送，并且只有 UDP 和 TCP 会被 fast-tracked，但我们仍希望接受其他协议的数据包。

![](/img/eb9e99053f1967f1.webp)![](/img/6940cdf22b657bb5.webp)

添加“FastTrack”规则后，列表顶部会出现一条特殊的虚拟规则。它不是实际规则，仅用于直观显示部分流量正在通过 FastPath 传输，并且不会到达其他防火墙规则。

:::warning
FastTrack 只能处理主路由表中的数据包，因此系统管理员有责任不要对经过非主路由表的连接执行 FastTrack（即由 mangle action=mark-routing 规则处理的连接）。否则，数据包可能会通过主路由表被错误路由。
:::

这些规则会在至少存在一个 fast-tracked 连接跟踪条目时出现，并在连接表中最后一个 fast-tracked 连接超时后消失。

:::warning
连接会保持 FastTracked，直到连接关闭、超时或路由器重启。
:::

#### 配置示例：排除特定主机，使其不被 Fast-Tracked {#configuration-example-excluding-specific-host-from-being-fast-tracked}

```ros
/ip/firewall/filter
add action=accept chain=forward connection-state=established,related src-address=192.168.88.111
add action=accept chain=forward connection-state=established,related dst-address=192.168.88.111
add action=fasttrack-connection chain=forward connection-state=established,related hw-offload=no
add action=accept chain=forward connection-state=established,related
```

在此示例中，我们通过先使用防火墙规则接受主机 192.168.88.111 的流量（包括源和目标），将其排除在 Fast-track 之外。其思路是：不让流量到达 FastTrack action。

注意：“排除”规则必须放在 fasttrack 过滤器之前；顺序很重要。

#### 要求 {#requirements}

满足以下条件时，FastTrack 处于活动状态：

- 未配置 mesh、metarouter 接口。
- Sniffer、torch 和 traffic generator 未运行。
- 未主动使用 `/tool/mac-scan`。
- 未主动使用 `/tool/ip-scan`。
- IP/Settings 下启用了 FastPath 和 Route cache（route cache 条件不适用于 RouterOS v7 或更高版本）。
- 如果连接经过网桥接口，则启用 Bridge FastPath。

## 面向视障用户的数据包流程 {#packet-flow-for-the-visually-impaired}

以下 DOCX 格式的文档以适合视障人士的方式描述图示。相关描述由 Apex CoVantage 代 Benetech 提供，不再更新。

- [Packet flow, optimized document.](https://box.mikrotik.com/f/673207754e4d40638fae/?dl=1)
