---
sidebar_key: "bridging-and-switching/user-guides/layer2-misconfiguration"
sidebar_position: 6
title: "Layer2 配置错误"
sidebar_label: "Layer2 配置错误"
description: "本页介绍 MikroTik RouterOS 中的二层（Layer2）配置错误，重点讨论桥接配置不当并启用硬件卸载以及端口隔离等问题。文中说明了吞吐量偏低、CPU 占用过高以及硬件卸载标志不正确等症状，并针对不支持端口隔离的设备给出了解决方案。"
tags:
  - 'bridging'
  - 'hardware-offloading'
  - 'mac-learning'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/user-guides/layer2-misconfiguration
captured_at: '2026-11-04T11:27:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

有些配置在设计上就存在重大缺陷，应尽可能避免。配置错误的 Layer2 有时会导致难以检测的网络错误、随机性能下降、网络中的某些网段不可达、某些网络服务运行异常，甚至整个网络故障。本页将介绍一些常见以及不太常见的、会导致网络问题的配置。

## 单个交换芯片上的网桥 {#bridges-on-a-single-switch-chip}

---

考虑以下场景。你有一台带内置交换芯片的设备，并且需要将某些端口彼此隔离。因此，你创建了多个网桥并在其上启用了硬件卸载。由于每个网桥位于不同的 Layer2 域，Layer2 帧不会在这些网桥之间转发。结果是，每个网桥中的端口与其他网桥上的端口相互隔离。

### 配置 {#configuration}

```ros
/interface/bridge
add name=bridge1
add name=bridge2
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge2 interface=ether3
add bridge=bridge2 interface=ether4
```

### 问题 {#problem}

经过一次简单的性能测试后，你可能会注意到一个网桥能够以线速转发流量，而第二个、第三个等网桥无法像第一个网桥那样转发那么多数据。另一个症状可能是需要路由的数据包存在巨大延迟。快速检查后，你可能会注意到 CPU 始终处于满载状态。这是因为硬件卸载并非在所有网桥上可用，而只在一个网桥上可用。通过检查硬件卸载状态，你会注意到只有一个网桥启用了它：

```ros
[admin@MikroTik] > /interface/bridge/port/print
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE                                 BRIDGE                                 HW
 0   H ether1                                    bridge1                                yes
 1   H ether2                                    bridge1                                yes
 2     ether3                                    bridge2                                yes
 3     ether4                                    bridge2                                yes
```

只有一个网桥具有硬件卸载标志的原因是设备不支持端口隔离。如果不支持端口隔离，那么只有一个网桥能够将流量卸载到交换芯片。

### 症状 {#symptoms}

以下是此类错误配置可能导致的症状列表：

- 网桥端口缺少 "H" 标志。
- 吞吐量低。
- CPU 使用率高。

### 解决方案 {#solution}

并非所有设备都支持端口隔离。目前只有 CRS1xx/CRS2xx 系列设备支持它，并且同时只支持 7 个隔离且硬件卸载的网桥。其他设备将不得不使用 CPU 在其他网桥上转发数据包。这通常是硬件限制，可能需要更换设备。Bridge split-horizon 参数是一种软件功能，会禁用硬件卸载；使用网桥过滤规则时，需要启用将所有数据包转发到 CPU，这要求禁用硬件卸载。你可以通过 `hw=yes` 标志控制哪个网桥进行硬件卸载，并将其他网桥设置为 `hw=no`，例如：

```ros
/interface/bridge/port/set [find where bridge=bridge1] hw=no
/interface/bridge/port/set [find where bridge=bridge2] hw=yes
```

有时可以重构网络拓扑以使用 VLAN，这是隔离 Layer2 网络的正确方式。

## 启用硬件卸载和 MAC 学习时的数据包流 {#packet-flow-with-hardware-offloading-and-mac-learning}

---

考虑以下场景：你设置了一个网桥并启用了硬件卸载，以便最大化设备吞吐量；结果，你的设备像交换机一样工作，但你想使用 [数据包嗅探器](../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) 或 [Torch](../../diagnostics-monitoring-and-troubleshooting/torch.md) 工具进行调试，或者也许你想实现数据包日志记录。

### 配置 {#configuration-1}

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 hw=yes interface=ether1 learn=yes
add bridge=bridge1 hw=yes interface=ether2 learn=yes
```

### 问题 {#problem-1}

运行 [数据包嗅探器](../../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md) 或 [Torch](../../diagnostics-monitoring-and-troubleshooting/torch.md) 工具捕获数据包时，你可能会注意到几乎看不到任何数据包，只能看到一些单播数据包，但捕获到的大多是广播/组播数据包，而接口报告某些接口中流动的流量远大于捕获到的流量。如果将两个或更多以太网接口添加到网桥并启用[硬件卸载](../index.md#bridge-hardware-offloading)，那么交换芯片将用于在端口之间转发数据包。要理解为什么只捕获到部分数据包，我们必须先检查交换芯片如何与 CPU 互连。在此示例中，我们可以使用一个通用 5 端口以太网路由器的框图：

![Switch Chip Block Diagram](/img/ec5a5a402792668a.webp)

对于此设备，每个以太网端口都连接到交换芯片，而交换芯片通过 CPU 端口（有时称为 **switch-cpu** 端口）连接到 CPU。要让数据包在 Sniffer 或 Torch 工具中可见，数据包必须从以太网端口发送到 CPU 端口，这意味着数据包必须发往 CPU 端口（数据包的目标 MAC 地址与网桥的 MAC 地址匹配），或者数据包的 MAC 地址尚未被学习（数据包被泛洪到所有端口），这种行为是由 **MAC 学习**导致的。

交换芯片维护一份 MAC 地址和端口列表，称为 **主机表**。每当需要转发数据包时，交换芯片会检查数据包的目标 MAC 地址与主机表，以找出应该使用哪个端口转发数据包。如果交换芯片找不到目标 MAC 地址，则数据包会被泛洪到所有端口（包括 CPU 端口）。在数据包本应从例如 ether1 转发到 ether2，且 ether2 后面设备 MAC 地址在主机表中的情况下，数据包永远不会发送到 CPU，因此对 Sniffer 或 Torch 工具不可见。

### 症状 {#symptoms-1}

以下是此类错误配置可能导致的症状列表：

- Sniffer 或 Torch 工具看不到数据包。
- 过滤规则不生效。

### 解决方案 {#solution-1}

目标 MAC 地址已被学习的数据包不会发送到 CPU，因为这些数据包不会泛洪到所有端口。如果你确实需要将某些数据包发送到 CPU 以供数据包分析器或防火墙使用，则可以使用 ACL 规则将数据包复制或重定向到 CPU。以下是发送发往 **4C:5E:0C:4D:12:4B** 的数据包副本的示例：

```ros
/interface/ethernet/switch/rule
add copy-to-cpu=yes dst-mac-address=4C:5E:0C:4D:12:4B/FF:FF:FF:FF:FF:FF ports=ether1 switch=switch1
```

:::warning
如果数据包被发送到 CPU，那么数据包必须由 CPU 处理；这会增加 CPU 负载。
:::

## LAG 接口与负载均衡 {#lag-interfaces-and-load-balancing}

---

考虑以下场景：你创建了一个 LAG 接口，以增加两个网络节点之间的总带宽；通常这些节点是交换机。为了测试 LAG 接口是否正常工作，你连接了两台传输数据的服务器，最常用的是众所周知的网络性能测量工具 [Iperf](https://en.wikipedia.org/wiki/Iperf) 来测试此类设置。例如，你可能用两个千兆以太网端口组成了一个 LAG 接口，这为你提供了一个虚拟接口，可以在两个接口上对流量进行负载均衡，理论上可达到 2Gbps 吞吐量，而服务器使用 10Gbps 接口连接，例如 SFP+。

![LACP Setup](/img/fa65c1f36095531a.webp)

### 配置 {#configuration-2}

以下配置与 **SW1** 和 **SW2** 相关：

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=ether1,ether2
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=bond1
add bridge=bridge1 interface=sfp-sfpplus1
```

### 问题 {#problem-2}

初始测试后，你会立即注意到网络吞吐量从未超过 1Gbps 限制，即使服务器和网络节点（此处为交换机）上的 CPU 负载都很低，但吞吐量仍然仅限 1Gbps。背后的原因是 LACP (802.ad) 使用传输哈希策略来确定流量是否可以在多个 LAG 成员上均衡；在这种情况下，LAG 接口并不会创建一个 2Gbps 接口，而是创建一个在可能时可以在多个从接口上均衡流量的接口。每个数据包都会生成一个传输哈希，这决定数据包将通过哪个 LAG 成员发送，这是为了避免数据包乱序所必需的；可以选择传输哈希策略，通常可以在 Layer2 (MAC)、Layer3 (IP) 和 Layer4 (Port) 之间选择，在 RouterOS 中，可以通过 `transmit-hash-policy` 参数选择。在这种情况下，由于你将数据包发送到相同的目标 MAC 地址以及相同的 IP 地址，并且 Iperf 也使用相同的端口，因此传输哈希相同，这为所有数据包生成相同的传输哈希，LAG 成员之间的负载均衡无法实现。请注意，即使目标不同，数据包也不一定总能在 LAG 成员之间均衡，这是因为标准化的传输哈希策略可能为不同目标生成相同的传输哈希，例如，使用 `layer2-and-3` 传输哈希策略且目标 MAC 地址相同时，192.168.0.1/192.168.0.2 会被均衡，但 192.168.0.2/192.168.0.4 **不会**被均衡。

### 症状 {#symptoms-2}

以下是此类错误配置可能导致的症状列表：

- 流量只经过一个 LAG 成员。

### 解决方案 {#solution-2}

选择适当的传输哈希策略并正确测试网络吞吐量。测试此类设置的最简单方法是使用多个目标，例如，不要只向一台服务器发送数据，而是向多台服务器发送数据。这将为每个数据包生成不同的传输哈希，并使 LAG 成员之间的负载均衡成为可能。对于某些设置，你可能需要更改绑定接口模式以增加总吞吐量。对于 UDP 流量，`balance-rr` 模式可能足够，但可能会给 TCP 流量带来问题。你可以[在此处](../../high-availability-solutions/bonding.md#bonding-modes)阅读更多关于为你的设置选择正确模式的内容。

## 从接口上的 VLAN 接口 {#vlan-interface-on-a-slave-interface}

---

考虑以下场景：你创建了一个网桥，并希望 DHCP Server 只向某些带标签的 VLAN 流量分配 IP 地址；因此，你创建了一个 VLAN 接口，指定了 VLAN ID，并在其上创建了 DHCP Server，但出于某种原因，它无法正常工作。

### 配置 {#configuration-3}

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add interface=ether1 bridge=bridge1
add interface=ether2 bridge=bridge1
/interface/vlan
add name=VLAN99 interface=ether1 vlan-id=99
/ip/pool
add name=VLAN99_POOL range=192.168.99.100-192.168.99.200
/ip/address/add address=192.168.99.1/24 interface=VLAN99
/ip/dhcp-server
add interface=VLAN99 address-pool=VLAN99_POOL disabled=no
/ip/dhcp-server/network
add address=192.168.99.0/24 gateway=192.168.99.1 dns-server=192.168.99.1
```

### 问题 {#problem-3}

当你将接口添加到网桥时，网桥成为主接口，所有网桥端口成为从端口。这意味着在网桥端口上接收到的所有流量都会被网桥接口捕获，并且所有流量会使用网桥接口而不是物理接口转发到 CPU。结果是，在从接口上创建的 VLAN 接口将完全无法捕获任何流量，因为在执行任何数据包处理之前，流量会立即转发到主接口。通常的副作用是一些 DHCP 客户端收到 IP 地址，而另一些则没有。

### 症状 {#symptoms-3}

以下是此类错误配置可能导致的症状列表：

- DHCP 客户端/服务器无法正常工作。
- 设备不可达。
- 网桥后面的设备无法通过带标签流量访问。

### 解决方案 {#solution-3}

更改 VLAN 接口监听流量的接口，将其改为主接口：

```ros
/interface/vlan/set VLAN99 interface=bridge1
```

## 网桥内网桥上的 VLAN {#vlan-on-a-bridge-in-a-bridge}

---

考虑以下场景：你有一组接口（不必是物理接口），并且希望它们都处于同一个 Layer2 段中。解决方案是将它们添加到一个网桥中，但你要求来自一个端口的流量将所有流量标记到某个 VLAN。这可以通过在网桥接口之上创建 VLAN 接口，并创建一个单独的网桥来实现，该网桥包含这个新创建的 VLAN 接口以及一个应该为所有接收到的流量添加 VLAN 标签的接口。网络图如下：

![VLAN on Bridge in Bridge](/img/fdbfbd53e29c7dbf.webp)

### 配置 {#configuration-4}

```ros
/interface/bridge
add name=bridge1
add name=bridge2
/interface/vlan
add interface=bridge1 name=VLAN vlan-id=99
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge2 interface=VLAN
add bridge=bridge2 interface=ether3
```

### 问题 {#problem-4}

为了更好地理解底层问题，我们先查看网桥主机表。

```ros
[admin@switch] /interface/bridge/host/print where !local 
Flags: X - disabled, I - invalid, D - dynamic, L - local, E - external 
 #       MAC-ADDRESS        VID ON-INTERFACE    BRIDGE
 0   D   CC:2D:E0:E4:B3:A1      ether1          bridge1
 1   D   CC:2D:E0:E4:B3:A2      ether2          bridge1
 2   D   CC:2D:E0:E4:B3:A1      VLAN            bridge2
 3   D   CC:2D:E0:E4:B3:A2      VLAN            bridge2
 4   D   CC:2D:E0:E4:B3:A3      ether3          bridge2
```

**ether1** 和 **ether2** 上的设备需要发送带有 VLAN-ID 99 的带标签数据包，才能到达 **ether3** 上的主机（其他数据包不会传递到 VLAN 接口并进一步与 ether3 桥接）。我们可以在主机表中看到 **bridge2** 已学习这些主机。从 **ether3** 发往 **ether1** 的数据包将正确地以带标签方式发送出去，并且流量不会在 **bridge1** 中泛洪。但由于 MAC 学习只能在网桥端口之间进行，而不能在网桥接口之上创建的接口上进行，因此从 **ether2** 发送到 **ether3** 的数据包将在 **bridge1** 中泛洪。

此外，如果 **ether3** 后面的设备使用 (R)STP，那么 **ether1** 和 **ether2** 将发送带标签的 BPDU，这违反了 IEEE 802.1W 标准。由于 MAC 学习功能损坏以及 (R)STP 损坏，必须避免这种设置和配置。还已知在某些设置中，这种配置会阻止你通过 MAC telnet 连接到设备。

### 症状 {#symptoms-4}

以下是此类错误配置可能导致的症状列表：

- 端口被 RSTP 阻塞。
- 网络中出现环路。
- 端口抖动。
- 流量被泛洪到所有端口。
- MAC telnet 无法连接。
- 设备不可访问。

### 解决方案 {#solution-4}

使用网桥 VLAN 过滤。标记流量的正确方式是在流量进入网桥时分配 VLAN ID。通过为网桥端口指定 **PVID** 值，并指定哪些端口是 **tagged**（trunk）端口、哪些是 **untagged**（access）端口，可以轻松实现这种行为。以下是此类设置本应如何配置的示例：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3 pvid=99
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1,ether2 untagged=ether3 vlan-ids=99
```

:::danger
启用 `vlan-filtering` 后，你将过滤掉发往 CPU 的流量；在启用 VLAN 过滤之前，应确保设置好[管理端口](../index.md#management-access-configuration)。
:::

## 带有物理接口的网桥中的 VLAN {#vlan-in-a-bridge-with-a-physical-interface}

---

与[网桥内网桥上的 VLAN](./layer2-misconfiguration.md#vlan-on-a-bridge-in-a-bridge)非常相似。最常见的用例是将物理接口与 VLAN 桥接（简化的 trunk/access 端口设置）。在这种设置中，你可能希望在一侧发送带标签流量，在另一侧发送不带标签流量。为此，你在 trunk 端口（带标签侧）上创建 VLAN 接口，然后创建网桥，并将 VLAN 接口和物理接口（不带标签侧）都添加为网桥端口。

### 配置 {#configuration-5}

```ros
/interface/vlan
add interface=ether1 name=VLAN99 vlan-id=99
/interface/bridge
add name=bridge1
/interface/bridge/port
add interface=ether2 bridge=bridge1
add interface=VLAN99 bridge=bridge1
```

### 问题 {#problem-5}

这种设置和配置在大多数情况下可以工作，但在使用 (R/M)STP 时违反了 IEEE 802.1W 标准。如果这是你 Layer2 域中的唯一设备，那么这不应导致问题，但当存在其他厂商交换机时可能会出现问题。原因是网桥接口上的 RSTP 默认启用，允许从每个网桥端口发送网桥协议数据单元 (BPDU)。虽然 **ether2** 正确地发送不带标签的 BPDU，但作为网桥端口的 **VLAN99** 接口会通过 ether1 发送带标签的 BPDU。并非所有交换机都能理解带标签的 BPDU。在更复杂的网络中，某些（组）VLAN 存在多个网络拓扑时，采用此配置应谨慎。这与混合厂商设备中的 MSTP 和 PVSTP(+) 相关。在具有多个 VLAN 网络拓扑的环形拓扑中，交换机的一个端口会被阻塞，但在 MSTP 和 PVSTP(+) 中，可以为某个 VLAN 打开一条路径；在这种情况下，不支持 PVSTP(+) 的设备可能会去除 BPDU 的标签并转发 BPDU，结果交换机将收到自己的数据包，触发环路检测并阻塞端口。这也会发生在其他协议上，但 (R)STP 是最常见的情况。如果交换机使用 BPDU guard 功能，那么这种类型的配置可能触发它并导致端口被 STP 阻塞。据报道，在使用 6.41 或更高版本时，这种类型的配置会随时间推移阻止流量在某些网桥端口上转发。这种类型的配置不仅会破坏 (R/M)STP，还可能导致环路警告。这可能由 MNDP 数据包或从接口直接发送出的任何其他数据包引起。

### 症状 {#symptoms-5}

以下是此类错误配置可能导致的症状列表：

- 端口被 RSTP 阻塞。
- 网络中出现环路。
- 端口抖动。
- 流量随时间推移停止转发。
- BPDU 被其他启用了 RSTP 的设备忽略。

### 解决方案 {#solution-5}

为避免兼容性问题，应使用网桥 VLAN 过滤。下面你可以找到一个示例，说明如何通过网桥 VLAN 过滤配置实现相同的流量标记效果：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2 pvid=99
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 untagged=ether2 vlan-ids=99
```

:::danger
启用 `vlan-filtering` 后，您将过滤掉发往 CPU 的流量。在启用 VLAN 过滤之前，应确保已设置[管理端口](../index.md#management-access-configuration)。
:::

## 物理接口上的桥接 VLAN {#bridged-vlan-on-physical-interfaces}

---

与[网桥内网桥上的 VLAN](./layer2-misconfiguration.md#vlan-on-a-bridge-in-a-bridge)非常相似：考虑以下场景。你的网络中有几台交换机，并使用 VLAN 隔离某些 Layer2 域，并将这些交换机连接到一台路由器，由该路由器分配地址并将流量路由到外部网络。为了实现冗余，你将所有交换机直接连接到路由器并启用了 RSTP，但为了能够设置 DHCP Server，你决定可以在每个连接到交换机的物理接口上为每个 VLAN 创建一个 VLAN 接口，并将这些 VLAN 接口添加到网桥中。网络图如下：

![Bridged VLANs](/img/3cff20b2aa3e5fb4.webp)

### 配置 {#configuration-6}

此案例只涉及路由器部分，交换机配置并不重要，只要端口处于交换状态即可。路由器配置如下：

```ros
/interface/bridge
add name=bridge10
add name=bridge20
/interface/vlan
add interface=ether1 name=ether1_v10 vlan-id=10
add interface=ether1 name=ether1_v20 vlan-id=20
add interface=ether2 name=ether2_v10 vlan-id=10
add interface=ether2 name=ether2_v20 vlan-id=20
/interface/bridge/port
add bridge=bridge10 interface=ether1_v10
add bridge=bridge10 interface=ether2_v10
add bridge=bridge20 interface=ether1_v20
add bridge=bridge20 interface=ether2_v20
```

### 问题 {#problem-6}

你可能会注意到网络出现一些奇怪的延迟，甚至网络无响应。你可能会注意到检测到环路（收到带有自己 MAC 地址的数据包），并且一些流量不知从何处生成。问题发生的原因是，来自 **Router** 上创建的任一 VLAN 接口的广播数据包将被发送出物理接口，该数据包将通过物理接口、经过交换机转发，并会在另一个物理接口上被接收；在这种情况下，从 **ether1\_v10** 发送出的广播数据包将在 **ether2** 上被接收，该数据包将被 **ether2\_v10** 捕获，而 **ether2\_v10** 与 **ether1\_v10** 桥接，并会再次通过相同路径转发（环路）。(R)STP 可能并不总能检测到此环路，因为 (R)STP 不知道任何 VLAN。不带标签流量不存在环路，但带标签流量存在环路。在此场景中，环路相当明显，但在更复杂的设置中，并不总是容易发现网络设计缺陷。有时如果网络不使用广播流量，这种网络设计缺陷可能会在很长时间内不被注意到；通常，[邻居发现](../../system-information-and-utilities/neighbor-discovery.md) 会从 VLAN 接口广播数据包，并通常会在这种设置中触发环路检测。有时捕获触发环路检测的数据包很有用，这可以通过使用 sniffer 并分析数据包捕获文件来完成：

```ros
/tool/sniffer
set filter-mac-address=4C:5E:0C:4D:12:44/FF:FF:FF:FF:FF:FF \
filter-interface=ether1 filter-direction=rx file-name=loop_packet.pcap
```

或者使用日志的更便捷方式：

```ros
/interface/bridge/filter
add action=log chain=forward src-mac-address=4C:5E:0C:4D:12:44/FF:FF:FF:FF:FF:FF
add action=log chain=input src-mac-address=4C:5E:0C:4D:12:44/FF:FF:FF:FF:FF:FF
```

### 症状 {#symptoms-6}

以下是此类错误配置可能导致的症状列表：

- 端口被 (R)STP 阻塞。
- 网络中出现环路。
- 吞吐量低。
- 端口抖动。
- 网络不可访问。

### 解决方案 {#solution-6}

解决方案是使用网桥 VLAN 过滤，使所有网桥兼容 IEEE 802.1W 和 IEEE 802.1Q。

```ros
/interface/bridge
add name=bridge vlan-filtering=yes
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=ether2
/interface/bridge/vlan
add bridge=bridge tagged=ether1,ether2,bridge vlan-ids=10
add bridge=bridge tagged=ether1,ether2,bridge vlan-ids=20
/interface/vlan
add name=vlan10 interface=bridge vlan-id=10
add name=vlan20 interface=bridge vlan-id=20
```

:::danger
启用 `vlan-filtering` 后，您将过滤掉发往 CPU 的流量。在启用 VLAN 过滤之前，应确保已设置[管理端口](../index.md#management-access-configuration)。
:::

## 桥接 VLAN {#bridged-vlan}

---

[物理接口上的桥接 VLAN](./layer2-misconfiguration.md#bridged-vlan-on-physical-interfaces)的一个更简化场景，但在这种情况下，你只是想将不同物理接口上创建的两个或多个 VLAN 桥接在一起。这是一种非常常见的设置类型，值得单独写一篇文章，因为错误配置这种类型的设置已经导致了多次网络故障。这种类型的设置也用于 VLAN 转换。

### 配置 {#configuration-7}

```ros
/interface/vlan
add interface=ether1 name=ether1_v10 vlan-id=10
add interface=ether2 name=ether2_v10 vlan-id=10
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1_v10
add bridge=bridge1 interface=ether2_v10
```

### 问题 {#problem-7}

你可能会注意到网络的某些部分不可访问和/或某些链路持续抖动。这是由于 (R)STP。这种类型的配置会强制设备发送带标签的 BPDU，而其他设备（包括 RouterOS）可能不支持这些 BPDU。由于设备收到格式错误的数据包（运行 (R)STP 时，网络中不应存在带标签的 BPDU，这违反了 IEEE 802.1W 和 IEEE 802.1Q），设备将无法正确解释该数据包，并可能出现意外行为。

### 症状 {#symptoms-7}

以下是此类错误配置可能导致的症状列表：

- 端口被 (R)STP 阻塞。
- 端口抖动。
- 网络不可访问。

### 解决方案 {#solution-7}

最简单的解决方案是直接在网桥上禁用 (R)STP：

```ros
/interface/bridge
set bridge1 protocol-mode=none
```

不过仍建议重写配置以使用网桥 VLAN 过滤：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1,ether2 vlan-ids=10
```

:::danger
启用 `vlan-filtering` 后，您将过滤掉发往 CPU 的流量。在启用 VLAN 过滤之前，应确保已设置[管理端口](../index.md#management-access-configuration)。
:::

## 不使用硬件卸载的网桥 VLAN 过滤 {#bridge-vlan-filtering-without-hardware-offloading}

---

考虑以下场景：你发现了新的网桥 VLAN 过滤功能，并决定更改设备上的配置。你有一个非常简单的 trunk/access 端口设置，并且喜欢网桥 VLAN 过滤的概念。

### 配置 {#configuration-8}

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2 pvid=20
add bridge=bridge1 interface=ether3 pvid=30
add bridge=bridge1 interface=ether4 pvid=40
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 untagged=ether2 vlan-ids=20
add bridge=bridge1 tagged=ether1 untagged=ether3 vlan-ids=30
add bridge=bridge1 tagged=ether1 untagged=ether4 vlan-ids=40
```

### 问题 {#problem-8}

例如，你在 CRS1xx/CRS2xx 系列设备上使用此配置，并开始注意到 CPU 使用率非常高；运行性能测试以检查网络吞吐量时，你注意到总吞吐量只是它本应轻松达到的线速性能的一小部分。问题的原因是并非所有设备都在硬件级别支持网桥 VLAN 过滤。所有设备都可以配置网桥 VLAN 过滤，但只有少数设备能够将流量卸载到交换芯片。如果在带内置交换芯片的设备上使用了不恰当的配置方法，那么将使用 CPU 转发流量。

### 症状 {#symptoms-8}

以下是此类错误配置可能导致的症状列表：

- 网桥端口缺少 "H" 标志。
- 吞吐量低。
- CPU 使用率高。

### 解决方案 {#solution-8}

在使用网桥 VLAN 过滤之前，请检查你的设备是否在硬件级别支持它。兼容性表可在[网桥硬件卸载](../index.md#bridge-hardware-offloading)部分找到。目前每种设备类型都需要不同的配置方法。以下是设备上应使用哪种配置以利用硬件卸载优势的列表：

- [配备 Marvell Prestera 交换芯片的 MikroTik 设备](../index.md#bridge-vlan-filtering)
- [CRS1xx/CRS2xx 系列设备](./crs1xx-2xx-series-switches-examples.md#vlan)
- [其他带交换芯片的设备](../switch-chip-features.md#setup-examples)

## 多交换芯片下的 VLAN 过滤 {#vlan-filtering-with-multiple-switch-chips}

---

考虑以下场景：你有一台带两个或更多交换芯片的设备，并决定使用单个网桥并在硬件级别设置 VLAN 过滤（通过使用 `/interface/ethernet/switch` 菜单），以便在网络中达到线速性能。这与 RB2011 和 RB3011 系列设备非常相关。在此示例中，假设你希望有一个 trunk 端口，所有其他端口都是 access 端口，例如，**ether10** 是我们的 trunk 端口，**ether1-ether9** 是我们的 access 端口。

### 配置 {#configuration-9}

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
add bridge=bridge1 interface=ether4
add bridge=bridge1 interface=ether5
add bridge=bridge1 interface=ether6
add bridge=bridge1 interface=ether7
add bridge=bridge1 interface=ether8
add bridge=bridge1 interface=ether9
add bridge=bridge1 interface=ether10
/interface/vlan
add interface=bridge1 name=VLAN10 vlan-id=10
/interface/ethernet/switch/port
set ether1,ether2,ether3,ether4,ether5,ether6,ether7,ether8,ether9 default-vlan-id=10 vlan-header=always-strip vlan-mode=secure
set ether10 vlan-header=add-if-missing vlan-mode=secure
set switch1-cpu,switch2-cpu vlan-mode=secure
/interface/ethernet/switch/vlan
add ports=ether1,ether2,ether3,ether4,ether5,switch1-cpu switch=switch1 vlan-id=10
add ports=ether6,ether7,ether8,ether9,ether10,switch2-cpu switch=switch2 vlan-id=10
```

### 问题 {#problem-9}

运行几次测试后，你可能会注意到来自 **ether6-ether10** 的数据包按预期转发，但来自 **ether1-ether5** 的数据包并不总是正确转发（尤其是通过 trunk 端口时）。最明显的问题是通过 **ether10** 的来自 **ether1-ether5** 的数据包会被直接丢弃。这是因为这些端口位于不同的交换芯片上。这意味着无法在硬件级别进行 VLAN 过滤，因为交换芯片不知道另一个交换芯片上的 VLAN 表内容。在不同交换芯片上的端口之间转发的数据包也会由 CPU 处理，这意味着你无法达到线速性能。

### 症状 {#symptoms-9}

以下是此类错误配置可能导致的症状列表：

- 数据包被丢弃。
- 吞吐量低。

### 解决方案 {#solution-9}

正确的解决方案是考虑这种硬件设计并相应地规划网络拓扑。要解决此问题，必须创建两个单独的网桥，并在每个交换芯片上配置 VLAN 过滤。这限制了在交换芯片之间转发数据包的可能性，不过可以在两个网桥之间配置路由（如果每个交换芯片上连接的设备使用不同的网络子网）。

有一种方法可以配置设备，使所有端口一起交换，同时仍能在硬件级别使用 VLAN 过滤，不过此解决方案有一些注意事项。思路是牺牲每个交换芯片上的一个以太网端口，将其作为 trunk 端口在交换芯片之间转发数据包，这可以通过在两个交换芯片之间插入以太网线缆来实现；例如，让我们在 **ether5** 和 **ether6** 之间插入以太网线缆，然后假设这些端口是 trunk 端口来重新配置设备：

```ros
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3
add bridge=bridge1 interface=ether4
add bridge=bridge1 interface=ether5
add bridge=bridge2 interface=ether6
add bridge=bridge2 interface=ether7
add bridge=bridge2 interface=ether8
add bridge=bridge2 interface=ether9
add bridge=bridge2 interface=ether10
/interface/ethernet/switch/port
set ether1,ether2,ether3,ether4,ether7,ether8,ether9 default-vlan-id=10 vlan-header=always-strip vlan-mode=secure
set ether5,ether6,ether10 vlan-header=add-if-missing vlan-mode=secure default-vlan-id=auto
set switch1-cpu,switch2-cpu vlan-mode=secure
/interface/ethernet/switch/vlan
add ports=ether1,ether2,ether3,ether4,ether5,switch1-cpu switch=switch1 vlan-id=10
add ports=ether6,ether7,ether8,ether9,ether10,switch2-cpu switch=switch2 vlan-id=10
```

:::warning
对于 100Mbps 交换芯片，请使用 `default-vlan-id=0` 而不是 `default-vlan-id=auto`
:::

## 使用简化网桥 VLAN 表的 VLAN 过滤 {#vlan-filtering-with-simplified-bridge-vlan-table}

---

:::info
此问题自 **RouterOS v7.15** 起已解决。动态 VLAN 现在始终作为单独条目创建，不再与静态配置的条目合并。
:::

你需要创建一个网络设置，其中多个客户端连接到单独的 access 端口，并由不同的 VLAN 隔离。这些流量应被标记并发送到适当的 trunk 端口。Access 端口使用 pvid 属性配置。由于 trunk 端口在两个 VLAN 上都使用，你决定通过添加单个网桥 VLAN 表条目并用逗号分隔 VLAN 来简化配置。当带标签的 trunk 端口用于大量 VLAN 甚至某些 VLAN 范围（例如 vlan-id=100-200）时，这尤其有用。请参见下面的网络图和配置。

![Switch Multiple Untagged](/img/3205c6726f791982.webp)

### 配置 {#configuration-10}

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=ether2
add bridge=bridge1 interface=ether3 pvid=10
add bridge=bridge1 interface=ether4 pvid=20
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2 vlan-ids=10,20
```

### 问题 {#problem-10}

流量会正确地从 access 端口转发并标记到 trunk 端口，但你可能会注意到一些广播或组播数据包实际上在两个不带标签的 access 端口之间泛洪，尽管它们应该位于不同的 VLAN 上。此外，来自带标签端口的广播和组播流量也会泛洪到两个 access 端口。这可能引起一些安全问题，因为可以嗅探来自不同网络的流量。查看网桥 VLAN 表时，你注意到为 VLAN 10 和 20 创建了单个条目，并且两个不带标签端口都属于同一个 VLAN 组。

```ros
[admin@SW1] /interface/bridge/vlan/print where tagged=ether2
Columns: BRIDGE, VLAN-IDS, CURRENT-TAGGED, CURRENT-UNTAGGED
# BRIDGE   VLAN-IDS  CURRENT-TAGGED  CURRENT-UNTAGGED
;;; port with pvid added to untagged group which might cause problems, consider adding a separate VLAN entry
0 bridge1        10  ether2          ether3          
                 20                  ether4     
```

### 症状 {#symptoms-10}

- 流量在不同 VLAN 之间泛洪
- 红色警告：`port with pvid added to untagged group which might cause problems, consider adding a separate VLAN entry`

### 解决方案 {#solution-10}

当 access 端口使用 pvid 属性配置后，它们会被动态添加到相应的 VLAN 条目中。创建包含多个 VLAN 或 VLAN 范围的静态 VLAN 条目后，具有匹配 pvid 的不带标签 access 端口也会被包含在同一 VLAN 组或范围中。使用单条配置行定义大量 VLAN 可能很有用，但在配置 access 端口时应格外小心。对于此示例，应创建单独的 VLAN 条目：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2 untagged=ether3 vlan-ids=10
add bridge=bridge1 tagged=ether2 untagged=ether4 vlan-ids=20
```

## 主接口上的 MTU {#mtu-on-the-master-interface}

---

考虑以下场景：你创建了一个网桥，向其中添加了几个接口，并在网桥接口之上创建了一个 VLAN 接口，但你需要增大 VLAN 接口上的 MTU 大小以接收更大的数据包。

### 配置 {#configuration-11}

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2
/interface/vlan
add interface=bridge1 name=VLAN99 vlan-id=99
```

### 问题 {#problem-11}

当你尝试增大 VLAN 接口上的 MTU 大小时，会收到 RouterOS **Could not set MTU** 错误。当你尝试设置大于 L2MTU 的 MTU 时，就会发生这种情况。在这种情况下，你需要增大所有从接口上的 L2MTU 大小，这将更新网桥接口上的 L2MTU 大小。完成此操作后，你将能够在 VLAN 接口上设置更大的 MTU。同样的原则适用于 bond 接口。只有当所有物理从接口都设置了适当的 L2MTU 时，你才能增大 VLAN、MPLS、VPLS、Bonding 和其他接口上的 MTU。

### 症状 {#symptoms-11}

以下是此类错误配置可能导致的症状列表：

- 无法更改 MTU。

### 解决方案 {#solution-11}

在更改主接口上的 MTU 之前，增大从接口上的 L2MTU。

```ros
/interface/ethernet
set ether1,ether2 l2mtu=9018
/interface/vlan
set VLAN99 mtu=9000
```

## MTU 不一致 {#mtu-inconsistency}

---

考虑以下场景：你的网络中有多台设备。大多数设备在网络中用作交换机/网桥，并且有一些端点应该接收和处理流量。为了减少网络中的开销，你决定增大 MTU 大小，因此在两个端点上设置了更大的 MTU 大小，但你开始注意到一些数据包被丢弃。

![MTU Issues](/img/e87e9a6138906e63.webp)

### 配置 {#configuration-12}

在这种情况下，两个端点可以是任何类型的设备，我们假设它们都是 Linux 服务器，应该传输大量数据。在这种场景中，你可能在 **ServerA** 和 **ServerB** 上将接口 MTU 设置为 9000，而在你的 **Switch** 上，你可能设置了类似以下内容：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add interface=ether1 bridge=bridge1
add interface=ether2 bridge=bridge1
```

### 问题 {#problem-12}

这是一个非常简单的问题，但在较大的网络中可能很难检测。例如，ping 可能正常工作，因为一般 ping 数据包长度为 70 字节（14 字节以太网头、20 字节 IPv4 头、8 字节 ICMP 头、28 字节 ICMP 负载），但数据传输可能无法正常工作。某些数据包可能无法转发的原因是，运行 RouterOS 的 MikroTik 设备默认将 MTU 设置为 1500，将 L2MTU 设置为约 1580 字节（取决于设备），但以太网接口会静默丢弃任何不适合 L2MTU 大小的内容。请注意，L2MTU 参数与 x86 或 CHR 设备无关。对于只应转发数据包的设备，无需增大 MTU 大小；只需要增大 L2MTU 大小。RouterOS 不允许你将 MTU 大小增大到大于 L2MTU 大小。如果你需要在接口上接收数据包，并且设备需要处理该数据包而不仅仅是转发它，例如在路由的情况下，那么需要增大 L2MTU 和 MTU 大小，但如果你只使用 IP 流量（支持数据包分片）并且不介意数据包被分片，则可以将接口上的 MTU 大小保留为默认值。你可以使用 ping 工具确保所有设备都能转发巨型帧：

```ros
/ping 192.168.88.1 size=9000 do-not-fragment
```

请记住，在你发送 ping 数据包的源设备和目标设备上，L2MTU 和 MTU 大小需要大于或等于 ping 数据包大小，因为 ping (ICMP) 是通过 Layer3 从接口发送出去的 IP 流量。

### 症状 {#symptoms-12}

以下是此类错误配置可能导致的症状列表：

- 网页无法加载，但 ping 正常工作。
- 隧道丢弃流量。
- 特定协议异常。
- 大量丢包。

### 解决方案 {#solution-12}

增大 **Switch** 上的 L2MTU 大小：

```ros
/interface/ethernet
set ether1,ether2 l2mtu=9000
```

如果你的流量被封装（VLAN、VPN、MPLS、VPLS 或其他），那么你可能需要考虑设置更大的 L2MTU 大小。在此场景中，由于上述原因，不需要增大 MTU 大小。

:::warning
完整帧 MTU 与 L2MTU 不同。L2MTU 大小不包括以太网头（14 字节）和 CRC 校验和 (FCS) 字段。FCS 字段由以太网驱动剥离，RouterOS 永远不会向任何数据包显示额外的 4 字节。例如，如果将 MTU 和 L2MTU 设置为 9000，则完整帧 MTU 长度为 9014 字节。使用 "`/tool/sniffer/quick"` 命令嗅探数据包时也可以观察到这一点。
:::

## 网桥与保留 MAC 地址 {#bridge-and-reserved-mac-addresses}

---

考虑以下场景：你希望将两个网段透明地桥接在一起，无论是 EoIP 等隧道接口、无线接口、以太网接口，还是任何其他可以添加到网桥的接口类型。这种设置允许你将两台设备无缝连接起来，就像它们之间只有一根物理线缆一样。这有时被称为从 **DeviceA** 到 **DeviceB** 的**透明网桥**。

### 配置 {#configuration-13}

对于 **DeviceA** 和 **DeviceB** 两台设备，应使用非常相似的配置。

```ros
/interface/bridge
add name=bridge1 protocol-mode=rstp
/interface/bridge/port
add interface=ether1 bridge=bridge1
add interface=eoip1 bridge=bridge1
```

### 问题 {#problem-13}

两台设备能够相互通信，但某些协议无法正常工作。原因是，一旦使用任何 STP 变体（STP、RSTP、MSTP），你就使网桥符合 IEEE 802.1D 和 IEEE 802.1Q。这些标准建议发往 **01:80:C2:00:00:0X** 的数据包**不应**被转发。在网桥中只添加了 2 个端口的情况下，不应使用 (R/M)STP，因为 2 个接口不可能产生环路；如果确实出现环路，原因在别处，应在不同的网桥上修复。由于透明网桥设置中不需要 (R/M)STP，因此可以将其禁用。一旦禁用 (R/M)STP，RouterOS 网桥就不再符合 IEEE 802.1D 和 IEEE 802.1Q，因此将转发发往 **01:80:C2:00:00:0X** 的数据包。

### 症状 {#symptoms-13}

以下是此类错误配置可能导致的症状列表：

- LLDP 邻居不显示。
- 802.1x 认证 (dot1x) 不工作。
- LACP 接口不转发流量。

### 解决方案 {#solution-13}

可以部分禁用对 IEEE 802.1D 和 IEEE 802.1Q 的符合性；这可以通过更改网桥协议模式来完成。

```ros
/interface/bridge
set bridge1 protocol-mode=none
```

:::danger
IEEE 802.1x 标准旨在直接在交换机和客户端之间使用。如果可以在交换机和客户端之间连接设备，那么这会带来安全威胁。因此，不建议禁用对 IEEE 802.1D 和 IEEE 802.1Q 的符合性，而应设计适当的网络拓扑。
:::

## 无线链路之间的绑定 {#bonding-between-wireless-links}

---

考虑以下场景：你设置了多条无线链路，为了实现最大吞吐量并同时实现冗余，你决定将以太网接口放入一个 bond 中，并根据转发的流量选择了某种绑定模式。此场景适用于在彼此不直接连接的链路之间创建绑定接口的任何情况。

![LACP over WLAN](/img/2de2fccfd3fb0dad.webp)

### 配置 {#configuration-14}

以下配置与 **R1** 和 **R2** 相关：

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=ether1,ether2 transmit-hash-policy=layer-2-and-3
/ip/address
add address=192.168.1.X/24 interface=bond1
```

以下配置与 **AP1**、**AP2**、**ST1,** 和 **ST2** 相关，其中 **X** 对应每台设备的 IP 地址。

```ros
/interface/bridge
add name=bridge1 protocol-mode=none
/interface/bridge/port
add interface=ether1 bridge=bridge1
add interface=wlan1 bridge=bridge1
/ip/address
add address=192.168.1.X/24 interface=bridge1
```

### 问题 {#problem-14}

虽然流量在 **R1** 和 **R2** 之间正常转发，负载均衡、链路故障切换也正常工作，但 **R1** 和 **R2** 之间的设备并不总是可访问，或者其中一些完全不可访问（大多数情况下 **AP2** 和 **ST2** 不可访问）。检查问题后，你可能会注意到数据包并不总是通过所需的绑定从接口转发，结果你尝试访问的设备永远收不到这些数据包。这是网络设计和绑定协议的限制。一旦数据包需要通过绑定接口发送出去（在这种情况下，你可能尝试向 **AP2** 或 **ST2** 发送 ICMP 数据包），绑定接口将根据选定的绑定模式和 transmit-hash-policy 创建哈希，并选择一个接口将数据包发送出去，而不考虑目标是否只能通过某个接口到达。有些设备会可访问，因为生成的哈希与设备所在接口匹配，但也可能不会选择所需接口，从而导致设备不可访问。只有广播绑定模式没有这种协议限制，但这种绑定模式的用例非常有限。

### 症状 {#symptoms-14}

以下是此类错误配置可能导致的症状列表：

- 连接性受限
- 链路不稳定（使用 balance-rr 时）

### 解决方案 {#solution-14}

绑定接口不应使用间接链路连接，但仍然可以创建变通方法。此变通方法背后的思路是找到一种方法绕过通过绑定接口发送的数据包。有多种方法可以强制数据包不通过绑定接口发送，但本质上解决方案是在物理接口之上创建新接口，并将这些新创建的接口而不是物理接口添加到 bond 中。实现这一点的一种方法是在每个物理接口上创建 EoIP 隧道，但这会产生巨大开销并降低整体吞吐量。你应该改为在每个物理接口之上创建 VLAN 接口。这产生的开销小得多，并且不会明显影响整体性能。以下是 **R1** 和 **R2** 应如何重新配置的示例：

```ros
/interface/vlan
add interface=ether1 name=VLAN_ether1 vlan-id=999
add interface=ether2 name=VLAN_ether2 vlan-id=999
/interface/bonding
add mode=balance-xor name=bond1 slaves=VLAN_ether1,VLAN_ether2 transmit-hash-policy=layer-2-and-3
/ip/address
add address=192.168.1.X/24 interface=bond1
add address=192.168.11.X/24 interface=ether1
add address=192.168.22.X/24 interface=ether2
```

**AP1** 和 **ST1** 只需要将 IP 地址更新为正确的子网：

```ros
/ip/address
add address=192.168.11.X/24 interface=bridge1
```

必须对 **AP2** 和 **ST2** 应用相同的更改（确保使用正确的子网）：

```ros
/ip/address
add address=192.168.22.X/24 interface=bridge1
```

使用这种方法，你产生的开销最少，并且所需的配置更改也最少。

:::warning
LACP (802.3ad) 不适用于设备的绑定从接口不直接连接的设置；在这种情况下，如果两台路由器之间存在无线链路，不建议使用 LACP。LACP 要求两个绑定从接口具有相同的链路速度，无线链路可以随时改变速率，这会降低整体性能和稳定性。应改用其他绑定模式。
:::

## 带宽测试 {#bandwidth-testing}

---

考虑以下场景：你在两台设备之间设置了一条链路。这可以是任何链路，以太网线缆、无线链路、隧道或任何其他连接。你决定测试链路的带宽，但为了方便，你决定使用运行该链路的同一批设备开始测试链路。

![Bad Bandwidth Setup](/img/590e348e86dd552a.webp)

### 问题 {#problem-15}

一旦开始 [带宽测试](../../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md) 或 [流量生成器](../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md)，你就会注意到吞吐量远小于预期。对于非常强大的路由器，它们应该能够转发数吉比特每秒 (Gbps)，但你注意到只转发了几个吉比特每秒。发生这种情况的原因是你使用的测试方法。你不应使用同一台路由器生成流量时测试该路由器的吞吐量，因为这会增加 CPU 的额外负载，从而降低总吞吐量。

### 症状 {#symptoms-15}

以下是此类错误配置可能导致的症状列表：

- 吞吐量低。
- CPU 使用率高。

### 解决方案 {#solution-15}

使用适当的测试方法。不要使用 Bandwidth-test 测试大容量链路，也不要在你正在测试的同一台设备上运行任何生成流量的工具。正确设计网络，以便可以在两端连接生成和接收流量的设备。如果你熟悉 **Iperf**，那么这个概念应该很清楚。请记住，在现实世界中，路由器或交换机不会生成大量流量（至少不应该，否则可能表明存在安全问题），服务器/客户端生成流量，而路由器/交换机转发流量（并在适当情况下对流量进行一些处理）。

![Good Bandwidth Setup](/img/94426a9891add21a.webp)

## 网桥 split-horizon 的使用 {#bridge-split-horizon-usage}

---

考虑以下场景：你有一个网桥，并且需要将某些网桥端口彼此隔离。在某些交换芯片上可以选择使用内置交换芯片隔离某些端口，你可以使用网桥防火墙规则防止某些端口向其他端口发送任何流量，也可以在 PVLAN 类型的设置中使用端口隔离来隔离端口，但还有一种基于软件的解决方案使用网桥 split-horizon（这会禁用所有交换芯片上的硬件卸载）。

### 配置 {#configuration-15}

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 horizon=1 hw=no interface=ether1
add bridge=bridge1 horizon=2 hw=no interface=ether2
add bridge=bridge1 horizon=3 hw=no interface=ether3
add bridge=bridge1 horizon=4 hw=no interface=ether4
```

### 问题 {#problem-16}

在每个端口上设置网桥 split-horizon 后，你开始注意到端口仍然能够相互发送数据。原因是错误使用了网桥 split-horizon。网桥端口只是无法与同一 horizon 中的端口通信，例如，horizon=1 无法与 horizon=1 通信，但可以与 horizon=2、horizon=3 等通信。

### 症状 {#symptoms-16}

以下是此类错误配置可能导致的症状列表：

- 流量在不同的网桥 split-horizon 之间转发。

### 解决方案 {#solution-16}

将网桥 split-horizon 设置为适当的值。如果你希望将端口彼此隔离（PPPoE 设置的常见场景），并且每个端口只能与网桥本身通信，那么所有端口必须处于同一个网桥 split-horizon 中。

```ros
/interface/bridge/port
set [f] horizon=1
```

:::warning
将所有网桥端口设置到同一个网桥 split-horizon 中会导致流量只能到达网桥接口本身，然后数据包只能被路由。当你希望其他设备过滤掉某些流量时，这很有用。使用网桥过滤规则也可以实现类似行为。
:::

## 不受支持的 SFP 模块 {#unsupported-sfp-modules}

---

考虑以下场景：你决定使用光纤线缆，通过 SFP 或 SFP+ 光模块将设备连接在一起，但为了方便，你决定使用手头可用的 SFP 光模块。

### 问题 {#problem-17}

一旦你配置设备在使用这些 SFP 光模块的端口上建立连接，你可能会注意到链路要么正常工作，要么出现随机连接问题。有许多厂商制造 SFP 光模块，但并非所有厂商都严格遵循 SFP MSA、SFF 和 IEEE 802.3 标准，这可能导致不可预测的兼容性问题；在 MikroTik 设备中使用不知名或不受支持的 SFP 光模块时，这是一个非常常见的问题。

### 症状 {#symptoms-17}

以下是此类错误配置可能导致的症状列表：

- SFP 接口无法建立链路。
- 随机丢包。
- 链路不稳定（抖动）。
- 重启后 SFP 模块不工作。
- 断电重启后 SFP 模块不工作。
- SFP 模块仅在一侧工作。

### 解决方案 {#solution-17}

你只应使用受支持的 SFP 模块。如果你打算使用 MikroTik 制造的 SFP 模块，请始终检查 [SFP 兼容性表](../../wired-connections/mikrotik-wired-interface-compatibility.md)。也有其他 SFP 模块可与 MikroTik 设备配合使用。请检查[受支持的外设表](../../hardware/peripherals.md#sfp-modules)，以查找已确认可与 MikroTik 设备配合使用的其他 SFP 模块。某些不受支持的模块在某些速度和自动协商下可能无法正常工作。你可以尝试禁用自动协商并手动设置链路速度。
