---
sidebar_key: "firewall-and-quality-of-service/packet-flow-in-routeros"
sidebar_position: 2
title: "RouterOS 中的数据包流程"
sidebar_label: "RouterOS 中的数据包流程"
description: "本页说明数据包如何在 MikroTik RouterOS 中流转，详细描述桥接、路由、MPLS 决策与防火墙链之间的交互。文中包含示意图，展示从入口到出口各阶段的数据包处理过程，并对路由表和防火墙链等关键组件进行说明。"
tags:
  - 'firewall'
  - 'packet-flow'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/packet-flow-in-routeros
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

更高级的防火墙配置或复杂任务（例如流量优先级划分、路由策略），在需要利用多个 RouterOS 功能时，要求了解：这些功能如何协同工作？在什么情况下、为什么会发生什么？

RouterOS 数据包流程图和流程示例将尝试回答这些问题。

在单个图中表示数据包的处理过程会非常复杂；因此，数据包流程图被分为三个部分：

- 总体图。
- 详细的桥接、路由和 MPLS 流程图。
- 显示 prerouting、input、forward、output 和 postrouting 中包含哪些功能及其顺序的图。

### 总体数据包流程图 {#overall-packetflow-diagram}

让我们先看总体图。乍一看很复杂，但在我们通过示例讲解之后，它会变得清晰得多。

![](/img/689a8eb69f241285.svg#gh-light-mode-only)![Overall packet flow diagram: physical and logical interfaces, the bridging, MPLS and routing areas, and the local processes of the router](/img/543356c8bcc1a05d.svg#gh-dark-mode-only)

图中央有 4 个框：桥接、路由、MPLS 决策和本地路由器进程。例如，如果数据包需要通过路由器进行路由，数据包将按下图所示流动。无需深入了解每个功能，数据包进入 in-interface，路由器判断它是 IP 流量且需要路由，数据包经过所有路由进程并从 out-interface 发出。

让我们再看另一个示例，说明当数据包的目的地是路由器本身时会发生什么。例如，in-interface 收到一个 ICMP（ping）数据包，其目的地是路由器本身，因此数据包将进入 *local-in* 处理。数据包处理完毕后，路由器内部会生成一个 ICMP（ping）应答（*local-out* 处理），并通过 out-interface 发送出去。

在继续举例之前，先简单解释每个框：

- **物理 in-interface** - 路由器接收数据包的起点。
- **逻辑 in-interface** - 解封装后数据包（来自隧道、IPsec 等）的起点。
- **Local in** - 发往路由器本身的数据包的终点。
- **Interface HTB（分层令牌桶）** - 接口队列。
- **物理 out-interface** - 数据包实际发出前的终点。
- **逻辑 out-interface** - 数据包封装前（发往隧道、IPsec 等）的终点。
- **Local out** - 路由器生成的数据包的起点。

现在该深入了解桥接、MPLS 和路由流程内部发生了什么。

![](/img/732a056895e8c87d.svg#gh-light-mode-only)![Detailed diagram of the bridging, routing and MPLS areas with the firewall chains, the bridge chains, the IPsec steps and the MPLS label operations](/img/fb79756a608f53e8.svg#gh-dark-mode-only)

在继续举例之前，先简单解释每个框：

- **路由决策** - 遍历路由表中的路由，为数据包的目标 IP 地址查找匹配项。找到匹配项时，数据包将继续处理；未找到匹配项时，数据包将被丢弃。
- **MPLS 决策** - 根据 MPLS 转发表决定如何处理数据包。
- **桥接决策** - 网桥遍历 MAC 地址表，为数据包的目标 MAC 地址查找匹配项。找到匹配项时，数据包将继续处理；未找到匹配项时，将创建数据包的多个副本并泛洪（通过所有网桥端口发送）。由于网桥接口本身也是众多目的地之一，单个数据包副本也会到达网桥 input 链。使用 `vlan-filtering=yes` 时，因 `/interface/bridge/vlan` 表而不被允许的数据包将在此阶段被丢弃。
- **use-ip-firewall** - 网桥设置中是否启用了 '*use-ip-firewall'* 选项。
- **ipsec-policy** - 数据包是否匹配任何已配置的 IPsec 策略。

#### 链 {#chains}

RouterOS 包含几个默认链。这些链允许你在各个点过滤数据包：

- **PREROUTING** 链：此链中的规则适用于刚到达网络接口的数据包。此链存在于 *nat*、*mangle* 和 *raw* 表中。
- **INPUT** 链：此链中的规则适用于即将交给本地进程的数据包。此链存在于 *mangle* 和 *filter* 表中。
- **OUTPUT** 链：此处的规则适用于进程刚生成的数据包。此链存在于 *raw*、*mangle*、nat 和 *filter* 表中。
- **FORWARD** 链：此处的规则适用于任何通过当前主机路由的数据包。此链仅存在于 *mangle* 和 *filter* 表中。
- **POSTROUTING** 链：此链中的规则适用于即将离开网络接口的数据包。此链存在于 *nat* 和 *mangle* 表中。

prerouting、input、forward、output 和 postrouting 每个块都包含更多功能，这些在数据包流程图的第三部分中说明：

![](/img/e9cd7ff4d3689c88.svg#gh-light-mode-only)![Diagram of the facilities in the prerouting, routing decision, input, forward, output and postrouting stages, in processing order](/img/89a2301156fd0802.svg#gh-dark-mode-only)

在继续举例之前，先简单解释每个框：

- **Hotspot-in** - 允许捕获否则会被连接跟踪丢弃的流量——这样即使网络设置一团糟，我们的 Hotspot 功能也能提供连接。
- **RAW Prerouting** - RAW 表 prerouting 链。
- **连接跟踪** - 数据包由连接跟踪处理。
- **Mangle Prerouting** - Mangle prerouting 链。
- **Mangle Input** - Mangle input 链。
- **Filter Input** - 防火墙 filter input 链。
- **HTB Global** - 队列树。
- **Simple Queues** - 可用于限制特定目标流量的功能。
- **TTL** - 指示路由数据包的生存时间（TTL）减 1 的确切位置。如果 TTL 变为 0，数据包将被丢弃。
- **Mangle Forward** - Mangle forward 链。
- **Filter Forward** - Filter forward 链。
- **Accounting** - 认证、授权和计费功能处理。
- **RAW Output** - RAW 表 output 链。
- **Mangle Output** - Mangle output 链。
- **Filter Output** - 防火墙 filter output 链。
- **路由调整** - 这是一种变通方法，允许在 mangle 链 output 中设置策略路由（routing-mark）。
- **Mangle Postrouting** - Mangle postrouting 链。
- **Src Nat** - 网络地址转换 srcnat 链。
- **Dst Nat** - 网络地址转换 dstnat 链。
- **Hotspot-out** - 对返回客户端的数据包撤销 hotspot-in 所做的所有操作。

### 路由数据包的流程 {#flow-of-routed-packet}

#### 转发 {#forward}

现在，让我们看第一个示例，数据包通过路由器进行路由，并深入了解数据包经过哪些功能：

我们已经了解到，数据包进入 in-interface，路由器判断它是 IP 数据包且需要路由，这里开始了复杂的过程：

1. 数据包进入 prerouting 处理：
   1. 检查是否存在 hotspot，并为 hotspot 使用修改数据包。
   2. 通过 RAW prerouting 链处理数据包。
   3. 将数据包发送通过连接跟踪。
   4. 通过 Mangle prerouting 链处理数据包。
   5. 通过 NAT 的 dst-nat 链处理数据包。
2. 让数据包通过路由表以做出路由决策。
3. 数据包进入 forward 处理：
   1. 检查 TTL 值。
   2. 通过 Mangle forward 链处理数据包。
   3. 通过 Filter forward 链处理数据包。
   4. 将数据包发送到计费进程。
4. 数据包进入 postrouting 处理：
   1. 通过 Mangle postrouting 链处理数据包。
   2. 通过 NAT 的 src-nat 链处理数据包。
   3. 如果存在 hotspot，撤销 hotspot-in 中所做的任何修改。
   4. 通过队列树（HTB Global）处理数据包。
   5. 通过 simple queues 处理数据包。
5. 检查是否存在 IPsec，然后通过 IPsec 策略处理。

#### 输入 {#input}

我们已经了解到，数据包进入 in-interface，路由器判断它是 IP 数据包且需要路由，这里开始了复杂的过程：

1. 当数据包的目的地是路由器时（路由 input），会发生非常类似的过程：数据包进入 prerouting 处理：
   1. - 检查是否存在 hotspot，并为 hotspot 使用修改数据包。
   2. - 通过 RAW prerouting 链处理数据包。
   3. - 将数据包发送通过连接跟踪。
   4. - 通过 Mangle prerouting 链处理数据包。
   5. - 通过 NAT 的 dst-nat 链处理数据包。
2. 让数据包通过路由表以做出路由决策。
3. 数据包进入 input 处理：
   1. - 通过 Mangle input 链处理数据包。
   2. - 通过 Filter input 链处理数据包。
   3. - 通过队列树（HTB Global）处理数据包。
   4. - 通过 simple queues 处理数据包。
4. 检查是否存在 IPsec，然后通过 IPsec 策略处理。

#### 输出 {#output}

或者当数据包由路由器发起时（路由 output）：

1. 数据包由路由器本身发起。
   1. 数据包通过路由表以做出路由决策。
2. 数据包进入 output 处理。
   1. 通过桥接决策处理数据包。
   2. 将数据包发送通过连接跟踪。
   3. 通过 Mangle output 链处理数据包。
   4. 通过 Filter output 链处理数据包。
   5. 将数据包发送到路由调整（策略路由）。
3. 数据包进入 postrouting 处理。
   1. - 通过 Mangle postrouting 链处理数据包。
   2. - 通过 NAT 的 src-nat 链处理数据包。
   3. - 如果存在 hotspot，撤销 hotspot-in 中所做的任何修改。
   4. - 通过队列树（HTB Global）处理数据包。
   5. - 通过 simple queues 处理数据包。
4. 检查是否存在 IPsec，然后通过 IPsec 策略处理。

### 桥接数据包的流程 {#flow-of-bridged-packet}

下面讨论 RouterOS 中的一般桥接过程。大多数数据包将始终遵循相同的处理路径，但在某些配置下（例如启用 VLAN 过滤、horizon、STP、DHCP 或 IGMP snooping 时），某些数据包可能会被区别对待。请访问桥接手册以获取更具体的信息。

#### 桥接转发 {#bridge-forward}

Bridge forward 是数据包从一个网桥端口转发到另一个网桥端口时发生的过程，本质上是在同一网络上连接多个设备。在 in-interface 上收到数据包后，设备判断 in-interface 是网桥端口，因此数据包通过桥接过程：

1. 数据包通过网桥 NAT dst-nat 链，其中可以更改 MAC 目的地和优先级，除此之外，数据包可以被简单地接受、丢弃或标记。
2. 检查网桥设置中是否启用了 use-ip-firewall 选项。
3. 让数据包通过网桥主机表以做出转发决策。最终被泛洪的数据包（例如广播、组播、未知单播流量）会按网桥端口复制，然后在 bridge forward 链中进一步处理。使用 `vlan-filtering=yes` 时，因 `/interface/bridge/vlan` 表而不被允许的数据包将在此阶段被丢弃。
4. 数据包通过网桥 filter forward 链，其中可以更改优先级，或者数据包可以被简单地接受、丢弃或标记。
5. 检查网桥设置中是否启用了 use-ip-firewall 选项。
6. 数据包通过网桥 NAT src-nat 链，其中可以更改 MAC 源和优先级，除此之外，数据包可以被简单地接受、丢弃或标记。
7. 检查网桥设置中是否启用了 use-ip-firewall 选项。

:::info
**对于 RouterOS v6：**  
当启用网桥 `vlan-filtering` 时，接收到的未标记数据包可能会在 "DST-NAT" 块之前被封装到 VLAN 头中，这意味着这些数据包可以使用 `mac-protocol=vlan` 和 `vlan-encap` 设置进行过滤。如果出接口的 `frame-types` 设置为 `admit-all` 或 `admit-only-untagged-and-priority-tagged`，则可能发生封装。

已标记的数据包可能会在 "BRIDGING DECISION" 块上被解封装，这意味着这些数据包将不再匹配 `mac-protocol=vlan` 和 `vlan-encap` 设置。如果数据包的 VLAN ID 与出端口的未标记 VLAN 成员资格匹配，则可能发生解封装。  
  
**对于 RouterOS v7 及更新版本：**

当启用网桥 `vlan-filtering` 时，接收到的未标记数据包可能会在 "BRIDGING-DECISION" 块上被封装到 VLAN 头中，这意味着这些数据包可以使用 `mac-protocol=vlan` 和 `vlan-encap` 设置进行过滤。如果出接口的 `frame-types` 设置为 `admit-all` 或 `admit-only-untagged-and-priority-tagged`，则可能发生封装。

已标记的数据包可能会在 "BRIDGING DECISION" 块上被解封装，这意味着这些数据包将不再匹配 `mac-protocol=vlan` 和 `vlan-encap` 设置。如果数据包的 VLAN ID 与出端口的未标记 VLAN 成员资格匹配，则可能发生解封装。
:::

#### 桥接输入 {#bridge-input}

Bridge input 是数据包目的地为网桥接口时发生的过程。最常见的情况是你需要访问网桥接口上运行的某些服务（例如 DHCP 服务器），或者需要将流量路由到其他网络。最初的步骤与 bridge forward 过程类似——在 in-interface 上收到数据包后，设备判断 in-interface 是网桥端口，因此它通过桥接过程：

1. 数据包通过网桥 NAT dst-nat 链，其中可以更改 MAC 目的地和优先级，除此之外，数据包可以被简单地接受、丢弃或标记。
2. 检查网桥设置中是否启用了 use-ip-firewall 选项。
3. 让数据包通过网桥主机表以做出转发决策。目标 MAC 地址与网桥 MAC 地址匹配的数据包将被传递到网桥 input 链。最终被泛洪的数据包（例如广播、组播、未知单播流量）也会到达网桥 input 链，因为网桥接口本身也是众多目的地之一。
4. 数据包通过网桥 filter input 链，其中可以更改优先级，或者数据包可以被简单地接受、丢弃或标记。

#### 桥接输出 {#bridge-output}

Bridge output 是数据包应通过一个或多个网桥端口离开设备时发生的过程。最常见的情况是网桥接口本身尝试访问连接到某个网桥端口的设备（例如，网桥接口上运行的 DHCP 服务器响应 DHCP 客户端时）。在数据包由其他更高级别的 RouterOS 进程处理完毕，并且设备最终判断出接口是网桥之后，数据包通过桥接过程：

1. 让数据包通过网桥主机表以做出转发决策。最终被泛洪的数据包（例如广播、组播、未知单播流量）会按网桥端口复制，然后在 bridge output 链中进一步处理。
2. 数据包通过网桥 filter output 链，其中可以更改优先级，或者数据包可以被简单地接受、丢弃或标记。
3. 数据包通过网桥 NAT src-nat 链，其中可以更改 MAC 源和优先级，除此之外，数据包可以被简单地接受、丢弃或标记。
4. 检查网桥设置中是否启用了 use-ip-firewall 选项。

#### 启用防火墙时的 Forward {#forward-with-firewall-enabled}

在某些网络配置中，你可能需要为桥接流量在路由链上启用额外处理，例如使用 simple queues 或 IP 防火墙。这可以在网桥设置中启用 use-ip-firewall 时完成。请注意，额外处理将消耗更多 CPU 资源来处理这些数据包。所有步骤已在前面几点中讨论过；下面是回顾：

1. 数据包通过网桥 NAT dst-nat 链。
2. 启用 use-ip-firewall 选项后，数据包将在 prerouting 链中进一步处理。
3. 数据包进入 prerouting 处理。
4. 让数据包通过网桥主机表以做出转发决策。
5. 数据包通过网桥 filter forward 链。
6. 启用 use-ip-firewall 选项后，数据包将在路由 forward 链中进一步处理。
7. 数据包进入路由 forward 处理。
8. 数据包通过网桥 NAT src-nat 链。
9. 启用 use-ip-firewall 选项后，数据包将在 postrouting 链中进一步处理。
10. 数据包进入 postrouting 处理。

### 硬件卸载数据包的流程 {#flow-of-hardware-offloaded-packet}

在上一主题中，我们仅讨论了软件桥接，它需要主 CPU 处理才能将数据包转发到正确的网桥端口。大多数 MikroTik 设备配备了专用交换硬件，即所谓的交换芯片或交换 ASIC。这允许我们将一些桥接功能（例如网桥端口之间的数据包转发或数据包过滤）卸载到这个专用硬件芯片上，而不消耗任何 CPU 资源。在 RouterOS 中，我们将此功能命名为 Bridge Hardware (HW) Offloading。不同的 MikroTik 设备可能具有不同的交换芯片，每个芯片可用的功能集也不同，因此请务必访问本文以获取更多详细信息 - [Bridge Hardware Offloading](../bridging-and-switching/index.md#bridge-hardware-offloading)。

![](/img/ea5afd533506de95.webp)

:::warning
当 out-interface 为硬件卸载且网桥 Fast Path 未激活时，Interface HTB 将无法正常工作。
:::

![](/img/3fcb32a3b81fe833.webp)

- **交换决策** - 很大程度上取决于交换机型号。此块控制所有与交换相关的任务，例如主机学习、数据包转发、过滤、VLAN 标记/取消标记等。某些交换机配置可能会改变数据包流程。
- **switch-cpu 端口** - 用于主 CPU 与其他交换机端口之间通信的特殊用途交换机端口。请注意，switch-cpu 端口不会在 RouterOS 中除 switch 菜单以外的任何地方显示。任何与软件相关的配置（例如 interface-list）都无法应用于此端口。到达 CPU 的数据包会自动与物理 in-interface 关联。

然而，硬件卸载并不限制设备只能使用硬件有限的功能；相反，可以同时利用硬件和软件处理。这确实需要深入理解数据包如何通过交换芯片传输，以及它们究竟何时被传递给主 CPU。

:::info
在 `/interface/ethernet/switch` 菜单及其子菜单中找到的交换机功能，例如 ACL 规则、镜像、入/出速率限制器、QoS 和 L3HW（除 VLAN 间路由外），可能不依赖网桥硬件卸载。因此，它们**可能**可以应用于未在硬件卸载网桥中配置的接口。
:::

#### 交换机转发 {#switch-forward}

我们将进一步讨论启用网桥硬件卸载且数据包在单个交换芯片上的两个交换端口之间转发时的数据包流程。这是最常见也是最简单的示例：

1. 交换机检查 in-interface 是否为硬件卸载接口。
2. 交换机让数据包通过交换机主机表以做出转发决策。如果交换机找到目标 MAC 地址的匹配项，数据包将通过物理接口发送出去。最终被泛洪的数据包（例如广播、组播、未知单播流量）会被复制并发送到每个硬件卸载交换机端口。

![](/img/dddbd2a9528c75c7.webp)

#### 交换机到 CPU 输入 {#switch-to-cpu-input}

此过程发生在物理接口上收到数据包，且其目的地是 switch-cpu 端口以进行进一步软件处理时。通往 switch-cpu 的路径有两条。一条是甚至不使用硬件卸载和交换的情况（例如用于路由的独立接口，或故意禁用 HW 卸载的桥接接口），因此数据包只是被传递以进行进一步软件处理。另一条路径是在 in-interface 上启用了硬件卸载时采用的。这会导致数据包通过交换决策，并且交换机可能因各种原因将数据包转发到 switch-cpu 端口：

- 数据包的目标 MAC 地址与本地 MAC 地址匹配，例如当数据包目的地是本地网桥接口时。
- 数据包可能被泛洪到所有交换机端口，包括 switch-cpu 端口，例如收到广播、组播或未知单播流量时。
- 交换机可能已学习到某些主机只能通过 CPU 访问（switch-cpu 端口学习将在下一节讨论），例如当网桥包含 HW 和非 HW 卸载接口（如无线、EoIP 甚至以太网接口）时。
- 数据包被有意复制到 switch-cpu，例如用于数据包检查。
- 数据包由交换机配置触发，应在软件中处理，例如 DHCP 或 IGMP snooping。

查看 in-interface 为硬件卸载时的数据包流程：

1. 交换机检查 in-interface 是否为硬件卸载接口。
2. 让数据包通过交换机主机表以做出转发决策。如果上述任何一点成立，数据包将被转发到 switch-cpu 端口。
3. 数据包通过 switch-cpu 端口离开，并将由 RouterOS 数据包流程进一步处理。

![](/img/aa47730474667b9a.webp)

:::warning
任何被交换芯片泛洪的已接收数据包，都不会再被软件网桥泛洪到同一 HW 卸载交换机组。这可以防止形成重复数据包。
:::

#### CPU 输出到交换机 {#cpu-output-to-switch}

此过程发生在数据包离开 RouterOS 软件处理并在 switch-cpu 端口上被接收时。同样，数据包可以走两条路径。一条是甚至不使用硬件卸载和交换的情况（例如用于路由的独立接口，或故意禁用 HW 卸载的桥接接口），因此数据包只是通过物理 out-interface 发送出去。另一条路径是在 out-interface 上启用了硬件卸载时采用的。这会导致数据包通过交换决策。就像任何其他交换机端口一样，交换机会从 switch-cpu 端口上接收的数据包中学习源 MAC 地址。当网桥包含 HW 和非 HW 卸载接口时，这确实很有用，这样交换机可以学习哪些帧应转发到 CPU。查看 out-interface 为硬件卸载时的数据包流程：

1. 离开 RouterOS 软件处理的数据包在 switch-cpu 端口上被接收。
2. 交换机检查 out-interface 是否为硬件卸载接口。
3. 交换机让数据包通过交换机主机表以做出转发决策。如果交换机找到目标 MAC 地址的匹配项，数据包将通过物理接口发送出去。最终被泛洪的数据包（例如广播、组播、未知单播流量）会被复制并发送到每个硬件卸载交换机端口。

![](/img/c2e413d83e995a03.webp)

:::warning
软件网桥通过 HW offloaded 接口发送泛洪数据包时，每个 HW offloaded 交换机组只会发送一份数据包副本，而不是每个 HW offloaded 接口各发送一份。实际的泛洪由交换芯片完成；这样可以防止产生重复数据包。
:::

### MPLS 数据包流程 {#flow-of-mpls-packet}

#### Pop 标签 {#pop-label}

#### Switch 标签 {#switch-label}

#### Push 标签 {#push-label}

### MPLS IP VPN {#mpls-ip-vpn}

在 VPNv4 环境中，到达 PE 路由器且需要转发到 CE 路由器的数据包并不是典型的“转发”。

如果入站标签和目的地都绑定到 VRF，那么在 MPLS 标签被弹出之后：

- 如果目的地址属于路由器本地，则数据包被移至 LOCAL\_IN。
- 如果目的地址位于 CE 网络中，则数据包被移至 LOCAL\_OUT。

:::danger
从 MPLS 云转发到 CE 网络的数据包不会出现在 forward 中。
:::

例如，从 src:111.15.0.1 到 dst:111.13.0.1 的流量

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

该数据包会出现在 output 和 postrouting 链中，因为此时它已经是一个本地产生的数据包，其源 MAC 地址等于 vrfInterface：

```text
08:10:55 firewall,info output: in:(unknown 0) out:sfp-sfpplus2, connection-state:established src-mac f2:b5:e9:17:18:3b, proto ICMP (type 8, code 0), 111.15.0.1->111.13.0.1, len 56
08:10:55 firewall,info postrouting: in:myVrf out:sfp-sfpplus2, connection-state:established src-mac f2:b5:e9:17:18:3b, proto ICMP (type 8, code 0), 111.15.0.1->111.13.0.1, len 56
```

另一方面，CE→PE 方向路由的数据包在发送到 MPLS 之前，会像其他任何路由 IP 流量一样出现在 "forward" 中：

```text
 08:10:55 firewall,info prerouting: in:sfp-sfpplus2 out:(unknown 0), connection-state:established src-mac dc:2c:6e:46:f8:93, proto ICMP (type 0, code 0), 111.13.0.1->111.15.0.1, len 56
 08:10:55 firewall,info forward: in:sfp-sfpplus2 out:sfp-sfpplus1, connection-state:established src-mac dc:2c:6e:46:f8:93, proto ICMP (type 0, code 0), 111.13.0.1->111.15.0.1, len 56
 08:10:55 firewall,info postrouting: in:sfp-sfpplus2 out:sfp-sfpplus1, connection-state:established src-mac dc:2c:6e:46:f8:93, proto ICMP (type 0, code 0), 111.13.0.1->111.15.0.1, len 56
 
```

但也可能存在例外。如果回复数据包的目的 IP 属于路由器本地，并且连接跟踪正在执行 NAT 转换，那么连接跟踪会“强制”该数据包经过防火墙的 prerouting/forward/postrouting 链。

### 逻辑接口 {#logical-interfaces}

到目前为止，我们看到的示例中 in 或 out 接口都是实际的物理接口（以太网、无线），但如果路由器接收到隧道封装的数据包，数据包会如何流动呢？

假设有一个 IPIP 数据包进入路由器。由于它是普通的 IPv4 数据包，因此会经过所有与路由相关的处理环节（直到图中的 "J"）。然后路由器会检查该数据包是否需要解封装。在本例中，它是 IPIP 数据包，所以“是”，将数据包送去解封装。之后，数据包会再次循环经过所有处理环节，但这一次是作为解封装后的 IPv4 数据包。

这一点非常重要，因为数据包实际上会两次经过防火墙，所以如果配置了严格的防火墙，那么既需要为 IPIP 封装的数据包设置 "accept" 规则，也需要为解封装后的 IP 数据包设置 "accept" 规则。

:::info
使用启用了 `vlan-filtering` 的网桥进行的数据包封装和解封装与逻辑接口无关。更多细节请参见网桥章节。
:::

### IPSec 策略 {#ipsec-policies}

我们来看另一种隧道类型——IPSec。这种 VPN 没有逻辑接口，但处理方式类似。

数据包不是通过逻辑接口处理，而是通过 IPSec 策略处理。在完成路由决策 (2) 和 input 防火墙处理 (3) 之后，路由器会尝试将源和目的与 IPsec 策略进行匹配。当策略与数据包匹配时，数据包会被送去解密 (5)。解密之后，数据包再次进入 PREROUTING 处理 (6)，并开始另一轮处理循环，但此时处理的是解封装后的数据包。

![](/img/fb9ab813f5631fcb.svg#gh-light-mode-only)![Diagram of the chains that a packet received on a VRF port and a packet sent by the router into a VRF pass, with the in-interface or out-interface of each pass](/img/825d02eb23aec496.svg#gh-dark-mode-only)

同样的过程也适用于封装，只是顺序相反。第一个 IP 数据包先经过各处理环节，然后与 IPsec 策略匹配 (5)，进行封装 (6)，然后在第二轮循环中送去处理 (7-10)。

## 快速路径 {#fast-path}

从目前所学的内容来看，很明显这样的数据包处理会消耗大量 CPU 资源。为了加速处理，RouterOS v6 首次引入了 FastPath。它的作用是跳过 Linux 内核中的处理，本质上是用部分 RouterOS 功能换取性能。要使 FastPath 生效，需要接口驱动支持以及特定的配置条件。

### Fast Path 的工作原理 {#how-fast-path-works}

FastPath 是一种接口驱动扩展，允许驱动直接与特定的 RouterOS 处理环节通信，并跳过其他所有环节。

![](/img/f89c29d624bb584b.svg#gh-light-mode-only)![Diagram of the hardware offload, FastPath and slow path choices between the physical in-interface and the physical out-interface](/img/97ea0a5fe481261d.svg#gh-dark-mode-only)

只有当至少源接口支持 fast path 时，数据包才能由 fast path 处理器转发。要实现完整的快速转发，还需要目的接口也支持。

目前，RouterOS 有以下 FastPath 处理器：

- IP 流量处理
- FastTrack
- Traffic Generator
- MPLS
- Bridge

满足以下条件时才会使用 FastPath 处理器：

- 未配置防火墙规则。
- 未配置 simple queue 或 *parent=global* 的 queue tree。
- 未配置 mesh 或 metarouter 接口。
- 未运行 sniffer 或 torch。
- 连接跟踪未启用。
- IP accounting 已禁用。
- 未配置 VRF（`/ip/vrf` 为空）。
- 未使用 hotspot（`/ip/hotspot` 没有接口）。
- 未配置 IPSec 策略。
- 未主动使用 `/tool/mac-scan`。
- 未主动使用 `/tool/ip-scan`。

:::warning
如果使用了 FastTrack，无论上述条件是否满足，数据包都会走 FastPath 路径。
:::

FastPath 按目的地址缓存 IPv4 和 IPv6 路由，而不是按 L4 端口或内部头部缓存。因此，ECMP 的 `l4` 和 `l3-inner` 策略不会为 FastPath 缓存的流量提供按流分发。

如果接口支持该功能，Traffic Generator 会自动使用 FastPath。

目前，MPLS fast-path 适用于 MPLS 交换流量（以 MPLS 进入路由器且必须以 MPLS 离开路由器的帧）以及执行 VPLS 封装/解封装的 VPLS 端点。其他 MPLS 入站和出站流量将照旧处理。

满足以下条件时会使用 Bridge 处理器：

- 没有 bridge Calea、filter、NAT 规则。
- *use-ip-firewall* 已禁用。
- 没有 mesh、MetaRouter 接口配置。
- 未运行 sniffer、torch 和 traffic generator。
- bridge vlan-filtering 已禁用（自 RouterOS 7.2 版本起该条件已移除）。
- bridge dhcp-snooping 已禁用。

:::warning
vlan-filtering 网桥上的 FastPath 不支持 priority-tagged 数据包（带有 VLAN 头但 VLAN ID = 0 的数据包）。这些数据包会被重定向到慢速路径。
:::

支持 FastPath 的接口：

| RouterBoard | 接口 |
| :-- | :-- |
| **RB6xx 系列** | ether1,2 |
| **RB800** | ether1,2 |
| **RB1100 系列** | ether1-11 |
| **所有设备** | 以太网接口 |
|  | 无线接口 |
|  | 网桥接口 |
|  | VLAN、VRRP 接口 |
|  | bonding 接口（仅 RX） |
|  | PPPoE、L2TP 接口 |
|  | EoIP、GRE、IPIP、VXLAN 接口。 |
|  | VPLS（从 v7.17 开始） |

EoIP、Gre、IPIP、VXLAN 和 L2TP 接口有一个按接口的设置 *allow-fast-path*。在这些接口上允许 fast path 会带来副作用：对于经过 fast-path 的封装数据包，会绕过防火墙、连接跟踪、simple queues、parent=global 的 queue tree、IP accounting、IPsec、hotspot universal client、vrf 分配。此外，数据包分片无法在 FastPath 中接收。

:::info
可以通过 `/interface/print stats-detail` 验证是否正在使用 FastPath
:::

唯一能保证 FastPath 的接口队列是 only-hardware-queue。如果你需要硬件队列以外的接口队列，那么数据包将无法完全走 FastPath，但性能影响不大，因为“接口队列”是数据包流程中的最后一步。

数据包可能通过从 FastPath 切换到 SlowPath 而走 Half-FastPath，但反过来不行。因此，例如，如果接收接口支持 FastPath，但出接口不支持，那么路由器会尽可能由 FastPath 处理器处理数据包，然后继续使用 SlowPath。如果接收接口不支持 FastPath，但出接口支持，那么数据包将全程由 SlowPath 处理。

![](/img/4af1f73d77c10a2d.webp)

## FastTrack {#fasttrack}

Fasttrack 可以理解为 Fast Path + Connection Tracking。它允许将连接标记为 "fast-tracked"，属于 fast-tracked 连接的数据包将被标记为走 fast-path 路径。此类连接的连接表条目现在会带有 fast-tracked 标志。

![](/img/aa98e5eb14f84662.webp)

:::warning
FastTrack 数据包会绕过防火墙、连接跟踪、simple queues、parent=global 的 queue tree、ip traffic-flow、IP accounting、IPSec、hotspot universal client、VRF 分配，因此管理员需要确保 FastTrack 不会干扰其他配置！
:::

为了将连接标记为 fast-tracked，为防火墙 filter 和 mangle 实现了一个新动作 "*fasttrack-connection"*。目前，只有 TCP 和 UDP 连接可以被 fast-tracked，并且为了维护连接跟踪条目，一些随机数据包仍会被送到慢速路径。在设计启用 "fasttrack" 的防火墙时必须考虑到这一点。

FastTrack 处理器还支持源 NAT 和目的 NAT，因此不需要为 NAT 连接设置特殊例外。

:::danger
属于 fast-tracked 连接的流量走 FastPath，这意味着它不会被其他路由器 L3 处理环节（防火墙、队列、IPsec、IP accounting、VRF 分配等）看到。Fasttrack 查找路由发生在设置路由标记之前，因此它只适用于 main 路由表。
:::

在家庭路由器上开始使用此功能的最简单方法是为所有 *established, related* 连接启用 "fasttrack"：

```ros
/ip/firewall/filter 
add chain=forward action=fasttrack-connection connection-state=established,related \
  comment="fasttrack established/related"
add chain=forward action=accept connection-state=established,related \
  comment="accept established/related"
```

请注意，第一条规则将 established/related 连接标记为 fast-tracked，第二条规则仍然是必需的，用于接受属于这些连接的数据包。原因是，如前所述，来自 fast-tracked 连接的一些随机数据包仍会经过慢速路径，并且只有 UDP 和 TCP 会被 fast-tracked，但我们仍然希望接受其他协议的数据包。

![](/img/eb9e99053f1967f1.webp)![](/img/6940cdf22b657bb5.webp)

添加 "FastTrack" 规则后，列表顶部会出现一条特殊的虚拟规则。这不是实际规则，而是用于直观显示部分流量正走 FastPath，不会到达其他防火墙规则。

:::warning
FastTrack 只能在 main 路由表中处理数据包，因此系统管理员有责任不要对经过非 main 路由表的连接（即通过 mangle action=mark-routing 规则处理的连接）进行 FastTrack。否则数据包可能会通过 main 路由表被错误路由。
:::

只要存在至少一个 fast-tracked 连接跟踪条目，这些规则就会出现；当最后一个 fast-tracked 连接在连接表中超时后，它们就会消失。

:::warning
连接会一直保持 FastTracked 状态，直到连接关闭、超时或路由器重启。
:::

#### 配置示例：排除特定主机使其不被 Fast-Tracked {#configuration-example-excluding-specific-host-from-being-fast-tracked}

```ros
/ip/firewall/filter
add action=accept chain=forward connection-state=established,related src-address=192.168.88.111
add action=accept chain=forward connection-state=established,related dst-address=192.168.88.111
add action=fasttrack-connection chain=forward connection-state=established,related hw-offload=no
add action=accept chain=forward connection-state=established,related
```

在此示例中，我们通过首先用防火墙规则接受主机 192.168.88.111（源和目的均接受），将其排除在 Fast-tracked 之外。思路是——不让该流量到达 FastTrack 动作。

注意："exclusion" 规则必须放在 fasttrack 过滤器之前；顺序很重要。

#### 要求 {#requirements}

满足以下条件时 FastTrack 才会生效：

- 没有 mesh、metarouter 接口配置。
- 未运行 sniffer、torch 和 traffic generator。
- 未主动使用 `/tool/mac-scan`。
- 未主动使用 `/tool/ip-scan`。
- 在 IP/Settings 下启用了 FastPath 和 Route cache（route cache 条件不适用于 RouterOS v7 或更新版本）。
- 如果连接经过网桥接口，则必须启用 Bridge FastPath。

## 面向视障人士的数据包流程 {#packet-flow-for-the-visually-impaired}

以下 DOCX 格式文档以针对视障人士优化的方式描述了该图。描述由 Apex CoVantage 提供，由 Benetech 负责。这些描述不再更新。

- [数据包流程，优化文档。](https://box.mikrotik.com/f/673207754e4d40638fae/?dl=1)
