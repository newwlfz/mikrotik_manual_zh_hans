---
title: "Layer2 配置错误"
description: "本页介绍 MikroTik RouterOS 中的 Layer2 配置错误，重点说明硬件卸载和端口隔离相关的网桥配置不当问题。文中解释了低吞吐量、高 CPU 使用率以及硬件卸载标志不正确等症状，并提供了针对不支持端口隔离的设备的解决方案。"
tags:
  - 'bridging'
  - 'hardware-offloading'
  - 'mac-learning'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/layer2-misconfiguration
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

某些配置在设计上存在重大缺陷，应尽可能避免。配置错误的 Layer2 有时会导致难以发现的网络错误、随机性能下降、网络中的某些网段不可达、某些网络服务异常，或整个网络故障。本页将列出一些常见和不那么常见的配置，这些配置会导致网络出现问题。

## 单个交换芯片上的网桥 {#bridges-on-a-single-switch-chip}

---

考虑以下场景。你有一台带内置交换芯片的设备，需要将某些端口彼此隔离。为此，你创建了多个网桥，并在这些网桥上启用了硬件卸载。由于每个网桥位于不同的 Layer2 域，Layer2 帧不会在这些网桥之间转发。因此，每个网桥中的端口会与其他网桥上的端口隔离。

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

经过简单的性能测试后，你可能会发现一个网桥能够以线速转发流量，而第二个、第三个等网桥无法转发与第一个网桥相同数量的数据。另一个症状可能是需要路由的数据包存在巨大延迟。快速检查后，你可能会发现 CPU 始终处于满载状态。这是因为硬件卸载并非在所有网桥上都可用，而只在一个网桥上可用。通过检查硬件卸载状态，你会发现只有一个网桥启用了该功能：

```ros
[admin@MikroTik] > /interface/bridge/port/print
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE                                 BRIDGE                                 HW
 0   H ether1                                    bridge1                                yes
 1   H ether2                                    bridge1                                yes
 2     ether3                                    bridge2                                yes
 3     ether4                                    bridge2                                yes
```

只有一个网桥具有硬件卸载标志的原因是设备不支持端口隔离。如果不支持端口隔离，则只有一个网桥能够将流量卸载到交换芯片。

### 症状 {#symptoms}

以下是由此类错误配置可能导致的症状列表：

- 网桥端口缺少“H”标志。
- 吞吐量低。
- CPU 使用率高。

### 解决方案 {#solution}

并非所有设备都支持端口隔离。目前仅 CRS1xx/CRS2xx 系列设备支持该功能，并且同时仅支持 7 个隔离且硬件卸载的网桥。其他设备将不得不使用 CPU 在其他网桥上转发数据包。这通常是硬件限制，可能需要更换设备。Bridge split-horizon 参数是一项软件功能，会禁用硬件卸载；使用网桥过滤规则时，需要启用将所有数据包转发到 CPU，这要求禁用硬件卸载。可以通过 `hw=yes` 标志控制哪个网桥进行硬件卸载，并对其他网桥设置 `hw=no`，例如：

```ros
/interface/bridge/port/set [find where bridge=bridge1] hw=no
/interface/bridge/port/set [find where bridge=bridge2] hw=yes
```

有时可以重构网络拓扑以使用 VLAN，这是隔离 Layer2 网络的正确方式。

## 硬件卸载和 MAC 学习的数据包流程 {#packet-flow-with-hardware-offloading-and-mac-learning}

---

考虑以下场景：你已设置网桥并启用硬件卸载，以最大化设备吞吐量；因此，你的设备正在作为交换机工作，但你想使用 [Sniffer](/docs/7.24/diagnostics-monitoring-and-troubleshooting/packet-sniffer) 或 [Torch](/docs/7.24/diagnostics-monitoring-and-troubleshooting/torch) 工具进行调试，或者你可能希望实现数据包日志记录。

### 配置 {#configuration-1}

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 hw=yes interface=ether1 learn=yes
add bridge=bridge1 hw=yes interface=ether2 learn=yes
```

### 问题 {#problem-1}

运行 [Sniffer](/docs/7.24/diagnostics-monitoring-and-troubleshooting/packet-sniffer) 或 [Torch](/docs/7.24/diagnostics-monitoring-and-troubleshooting/torch) 工具捕获数据包时，你可能几乎看不到数据包，只能看到少量单播数据包，捕获到的主要是广播/组播数据包，而接口报告的某些接口流量远大于捕获到的流量。如果将两个或更多以太网接口添加到网桥并启用 [Hardware Offloading](/docs/7.24/bridging-and-switching#bridge-hardware-offloading)，则交换芯片将用于在端口之间转发数据包。要理解为什么只能捕获部分数据包，首先需要了解交换芯片与 CPU 的互连方式。在本例中，可以使用通用 5 端口以太网路由器的框图：

![Switch Chip Block Diagram](/img/ec5a5a402792668a.webp)

对于该设备，每个以太网端口都连接到交换芯片，交换芯片通过 CPU 端口（有时称为 **switch-cpu** 端口）连接到 CPU。要使数据包在 Sniffer 或 Torch 工具中可见，数据包必须从以太网端口发送到 CPU 端口。这意味着数据包的目的地必须是 CPU 端口（数据包的目的 MAC 地址与网桥的 MAC 地址匹配），或者数据包的 MAC 地址尚未被学习（数据包被泛洪到所有端口）。这种行为源于 **MAC learning**。

交换芯片会维护一个包含 MAC 地址和端口的列表，称为 **Host table**。每当需要转发数据包时，交换芯片都会根据数据包的目的 MAC 地址查询 hosts table，以确定应使用哪个端口转发数据包。如果交换芯片找不到目的 MAC 地址，则数据包会被泛洪到所有端口（包括 CPU 端口）。如果某个数据包本应从 ether1 转发到 ether2，并且 ether2 后面设备的 MAC 地址已在 host table 中，则该数据包永远不会发送到 CPU，因此不会在 Sniffer 或 Torch 工具中可见。

### 症状 {#symptoms-1}

以下是由此类错误配置可能导致的症状列表：

- Sniffer 或 Torch 工具看不到数据包。
- Filter 规则不生效。

### 解决方案 {#solution-1}

目的 MAC 地址已被学习的数据包不会发送到 CPU，因为这些数据包不会泛洪到所有端口。如果确实需要将数据包发送到 CPU 以供数据包分析器或防火墙处理，则可以使用 ACL 规则将数据包复制或重定向到 CPU。以下示例说明如何发送发往 **4C:5E:0C:4D:12:4B** 的数据包副本：

```ros
/interface/ethernet/switch/rule
add copy-to-cpu=yes dst-mac-address=4C:5E:0C:4D:12:4B/FF:FF:FF:FF:FF:FF ports=ether1 switch=switch1
```

:::warning
如果将数据包发送到 CPU，则该数据包必须由 CPU 处理；这会增加 CPU 负载。
:::

## LAG 接口和负载均衡 {#lag-interfaces-and-load-balancing}

---

考虑以下场景：你创建了一个 LAG 接口，以增加 2 个网络节点之间的总带宽；这些节点通常是交换机。为了测试 LAG 接口是否正常工作，你连接了两台传输数据的服务器，通常使用知名的网络性能测试工具 [Iperf](https://en.wikipedia.org/wiki/Iperf) 测试此类配置。例如，你可能用两个 Gigabit Ethernet 端口创建了一个 LAG 接口，从而得到一个虚拟接口，可以在两个接口之间均衡流量，理论上达到 2Gbps 吞吐量，而服务器使用 10Gbps 接口连接，例如 SFP+。

![LACP Setup](/img/fa65c1f36095531a.webp)

### 配置 {#configuration-2}

以下配置适用于 **SW1** 和 **SW2**：

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

完成初始测试后，你会立即发现网络吞吐量从未超过 1Gbps，即使服务器和网络节点（此处为交换机）的 CPU 负载都很低，吞吐量仍被限制为 1Gbps。原因在于 LACP（802.ad）使用传输哈希策略来确定流量是否可以在多个 LAG 成员之间均衡。在这种情况下，LAG 接口不会创建一个 2Gbps 接口，而是一个在可能的情况下跨多个从接口均衡流量的接口。每个数据包都会生成一个传输哈希，该哈希决定数据包通过哪个 LAG 成员发送；这样做是为了避免数据包乱序。可以选择传输哈希策略，通常可以在 Layer2（MAC）、Layer3（IP）和 Layer4（Port）之间选择；在 RouterOS 中，可以使用 `transmit-hash-policy` 参数进行选择。在这种情况下，由于你将数据包发送到相同的 MAC 地址、相同的 IP 地址，并且 Iperf 也使用相同的端口，因此所有数据包都会生成相同的传输哈希，无法在 LAG 成员之间进行负载均衡。请注意，即使目的地址不同，数据包也不一定总能在 LAG 成员之间均衡，这是因为标准化的传输哈希策略可能为不同目的地址生成相同的传输哈希。例如，如果使用 `layer2-and-3` 传输哈希策略且目的 MAC 地址相同，则 192.168.0.1/192.168.0.2 会被均衡，但 192.168.0.2/192.168.0.4 **不会**被均衡。

### 症状 {#symptoms-2}

以下是由此类错误配置可能导致的症状列表：

- 流量只经过一个 LAG 成员。

### 解决方案 {#solution-2}

选择合适的 transmit hash policy，并正确测试网络吞吐量。测试此类设置的最简单方法是使用多个目标，例如，不要只向一台服务器发送数据，而是向多台服务器发送数据。这将为每个数据包生成不同的 transmit hash，并使跨 LAG 成员的负载均衡成为可能。对于某些设置，可能需要更改 bonding 接口模式以提高总吞吐量。对于 UDP 流量，`balance-rr` 模式可能足够，但可能会导致 TCP 流量出现问题。有关为设置选择合适模式的更多信息，请参阅[此处](/docs/7.24/high-availability-solutions/bonding#bonding-modes)。

## 从接口上的 VLAN 接口 {#vlan-interface-on-a-slave-interface}

---

考虑以下场景：你已创建网桥，并希望 DHCP Server 仅向特定 tagged VLAN 流量分配 IP 地址，因此你创建了 VLAN 接口，指定了 VLAN ID，并在其上创建了 DHCP Server，但由于某些原因，它无法正常工作。

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

将接口添加到网桥后，该网桥将成为主接口，所有网桥端口都将成为从端口。这意味着，网桥端口上接收的所有流量都会被网桥接口捕获，并且所有流量都会通过网桥接口而不是物理接口转发到 CPU。因此，在从接口上创建的 VLAN 接口永远不会捕获任何流量，因为数据包在任何处理完成之前就已立即转发到主接口。常见的副作用是，一些 DHCP 客户端会收到 IP 地址，而另一些则不会。

### 症状 {#symptoms-3}

以下是由此类错误配置可能导致的症状列表：

- DHCP 客户端/服务器无法正常工作。
- 设备不可达。
- 网桥后的设备无法通过带标签流量访问。

### 解决方案 {#solution-3}

更改 VLAN 接口监听流量的接口，将其更改为主接口：

```ros
/interface/vlan/set VLAN99 interface=bridge1
```

## 网桥中的网桥上的 VLAN {#vlan-on-a-bridge-in-a-bridge}

---

请考虑以下场景：你有一组接口（不一定是物理接口），并且希望它们都位于同一个 Layer2 网段中。解决方案是将它们添加到同一个网桥，但你要求来自某个端口的流量将所有流量打上某个 VLAN 标签。这可以通过在网桥接口之上创建 VLAN 接口，并创建一个单独的网桥来实现，该网桥包含这个新建的 VLAN 接口，以及一个应当为所有接收到的流量添加 VLAN 标签的接口。网络拓扑图如下：

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

**ether1** 和 **ether2** 上的设备需要发送带有 VLAN-ID 99 的带标签数据包，才能到达 **ether3** 上的主机（其他数据包不会被传递到 VLAN 接口，并进一步与 ether3 桥接）。我们可以在主机表中看到 **bridge2** 已经学习到这些主机。从 **ether3** 发往 **ether1** 的数据包会被正确地以带标签方式发出，并且流量不会在 **bridge1** 中泛洪。但由于 MAC 学习只能在网桥端口之间进行，而不能在网桥接口之上创建的接口上进行，因此从 **ether2** 发往 **ether3** 的数据包会在 **bridge1** 中泛洪。

此外，如果 **ether3** 后面的设备使用 (R)STP，则 **ether1** 和 **ether2** 会发出带标签的 BPDU，这违反了 IEEE 802.1W 标准。由于 MAC 学习功能失效以及 (R)STP 失效，必须避免使用这种设置和配置。还已知在某些设置中，此类配置可能导致无法通过 MAC telnet 连接到设备。

### 症状 {#symptoms-4}

以下是由此类错误配置可能导致的症状列表：

- 端口被 RSTP 阻塞。
- 网络中存在环路。
- 端口频繁上下线。
- 流量被泛洪到所有端口。
- MAC telnet 无法连接。
- 设备无法访问。

### 解决方案 {#solution-4}

使用网桥 VLAN 过滤。标记流量的正确方式是：当流量进入网桥时为其分配 VLAN ID。通过为网桥端口指定 **PVID** 值，并指定哪些端口是 **tagged**（trunk）端口、哪些端口是 **untagged**（access）端口，即可轻松实现此行为。下面是此类配置应有的示例：

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
启用 `vlan-filtering` 后，发往 CPU 的流量也会被过滤。在启用 VLAN 过滤之前，应确保已设置 [Management port](/docs/7.24/bridging-and-switching#management-access-configuration)。
:::

## 网桥中包含物理接口的 VLAN {#vlan-in-a-bridge-with-a-physical-interface}

---

与 [VLAN on a bridge in a bridge](/docs/7.24/bridging-and-switching/user-guides/layer2-misconfiguration#vlan-on-a-bridge-in-a-bridge) 的情况非常相似。最常见的用例是将物理接口与 VLAN 桥接（简化的 trunk/access 端口配置）。在此类配置中，可能需要在一侧发送 tagged 流量，在另一侧发送 untagged 流量。为此，在 trunk 端口（tagged 侧）创建 VLAN 接口，然后创建网桥，并将 VLAN 接口和物理接口（untagged 侧）都添加为网桥端口。

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

这种设置和配置在大多数情况下可以工作，但在使用 (R/M)STP 时违反 IEEE 802.1W 标准。如果该设备是 Layer2 域中的唯一设备，则通常不会引发问题，但当网络中存在其他厂商的交换机时可能出现问题。原因是网桥接口上的 RSTP 默认启用，允许从每个网桥端口发送 Bridge Protocol Data Units（BPDU）。虽然 **ether2** 能正确发送未打标签的 BPDU，但作为网桥端口的 **VLAN99** 接口会通过 ether1 发送带标签的 BPDU。并非所有交换机都能理解带标签的 BPDU。在更复杂的网络中，如果某些 VLAN 或 VLAN 组存在多种网络拓扑，采用这种配置时应采取预防措施。这涉及混合厂商设备环境中的 MSTP 和 PVSTP(+)。在环形拓扑中，如果某些 VLAN 存在多种网络拓扑，交换机会阻塞其中一个端口，但在 MSTP 和 PVSTP(+) 中，可以为某个 VLAN 打开路径。在这种情况下，不支持 PVSTP(+) 的设备可能会去除 BPDU 的标签并转发 BPDU，结果是交换机收到自己的数据包，触发环路检测并阻塞端口。其他协议也可能发生这种情况，但 (R)STP 是最常见的情况。如果交换机使用 BPDU guard 功能，则此类配置可能触发该功能，并导致端口被 STP 阻塞。已有报告表明，使用 6.41 或更高版本时，此类配置可能随时间推移阻止流量在某些网桥端口上转发。此类配置不仅会破坏 (R/M)STP，还可能导致环路警告。这可能由 MNDP 数据包或任何直接从接口发出的数据包引起。

### 症状 {#symptoms-5}

以下是由此类错误配置可能导致的症状列表：

- 端口被 RSTP 阻塞。
- 网络中存在环路。
- 端口频繁抖动。
- 流量随时间停止转发。
- BPDU 被其他启用 RSTP 的设备忽略。

### 解决方案 {#solution-5}

为避免兼容性问题，应使用网桥 VLAN 过滤。以下示例说明如何通过网桥 VLAN 过滤配置实现相同的流量打标签效果：

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
启用 `vlan-filtering` 后，将过滤发往 CPU 的流量。在启用 VLAN 过滤之前，应确保已设置 [Management port](/docs/7.24/bridging-and-switching#management-access-configuration)。
:::

## 物理接口上的桥接 VLAN {#bridged-vlan-on-physical-interfaces}

---

与 [网桥中的网桥上的 VLAN](/docs/7.24/bridging-and-switching/user-guides/layer2-misconfiguration#vlan-on-a-bridge-in-a-bridge) 非常相似的情况：请考虑以下场景。网络中有几台交换机，使用 VLAN 隔离某些 Layer2 域，并将这些交换机连接到一台路由器，由该路由器分配地址并将流量路由到外部网络。为实现冗余，将所有交换机直接连接到路由器并启用 RSTP，但为了能够设置 DHCP Server，决定为每个连接到交换机的物理接口上的每个 VLAN 创建一个 VLAN 接口，并将这些 VLAN 接口添加到网桥中。网络拓扑图如下：

![Bridged VLANs](/img/3cff20b2aa3e5fb4.webp)

### 配置 {#configuration-6}

本案例只与路由器部分相关，交换机配置并不重要，只要端口处于交换模式即可。路由器配置如下：

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

可能会发现网络出现一些奇怪的延迟，甚至网络无响应。也可能会检测到环路（收到带有自身 MAC 地址的数据包），并且有流量凭空产生。问题产生的原因是，来自 **Router** 上创建的任一 VLAN 接口的广播数据包会从物理接口发出，该数据包经物理接口转发，通过交换机后，再从另一个物理接口被接收回来。在本例中，从 **ether1\_v10** 发出的广播数据包会在 **ether2** 上被接收，数据包会被 **ether2\_v10** 捕获，而 **ether2\_v10** 与 **ether1\_v10** 处于同一网桥中，因此数据包会再次沿相同路径被转发（形成环路）。(R)STP 可能并不总能检测到该环路，因为 (R)STP 并不知道任何 VLAN。未标记流量不存在环路，但标记流量存在环路。在本场景中，环路很容易发现，但在更复杂的配置中，网络设计缺陷并不总是容易检测。有时，如果网络不使用广播流量，这种网络设计缺陷可能会长期未被发现。通常，[Neighbor Discovery Protocol](/docs/7.24/system-information-and-utilities/neighbor-discovery) 会从 VLAN 接口广播数据包，在此类配置中通常会触发环路检测。有时，捕获触发环路检测的数据包很有用，可以使用 sniffer 并分析数据包捕获文件来完成：

```ros
/tool/sniffer
set filter-mac-address=4C:5E:0C:4D:12:44/FF:FF:FF:FF:FF:FF \
filter-interface=ether1 filter-direction=rx file-name=loop_packet.pcap
```

或者使用更方便的日志方式：

```ros
/interface/bridge/filter
add action=log chain=forward src-mac-address=4C:5E:0C:4D:12:44/FF:FF:FF:FF:FF:FF
add action=log chain=input src-mac-address=4C:5E:0C:4D:12:44/FF:FF:FF:FF:FF:FF
```

### 症状 {#symptoms-6}

以下是由此类错误配置可能导致的症状列表：

- 端口被 (R)STP 阻塞。
- 网络中存在环路。
- 吞吐量低。
- 端口频繁上下线。
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
启用 `vlan-filtering` 后，将过滤发往 CPU 的流量。在启用 VLAN 过滤之前，应确保已设置 [Management port](/docs/7.24/bridging-and-switching#management-access-configuration)。
:::

## 桥接 VLAN {#bridged-vlan}

---

这是 [Bridged VLAN on physical interfaces](/docs/7.24/bridging-and-switching/user-guides/layer2-misconfiguration#bridged-vlan-on-physical-interfaces) 的更简化场景，但在本例中，只需将不同物理接口上创建的两个或更多 VLAN 桥接在一起。这是一种非常常见的配置类型，值得单独成文，因为错误配置此类设置已导致多次网络故障。此类设置也用于 VLAN 转换。

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

你可能会发现网络的某些部分无法访问，和/或某些链路持续抖动。这是由 (R)STP 导致的。此类配置会强制设备发送 tagged BPDU，而其他设备（包括 RouterOS）可能不支持这些 BPDU。由于设备收到格式错误的数据包（运行 (R)STP 时，网络中不应存在 tagged BPDU，这违反了 IEEE 802.1W 和 IEEE 802.1Q），设备将无法正确解析该数据包，并可能出现异常行为。

### 症状 {#symptoms-7}

以下是由此类错误配置可能导致的症状列表：

- 端口被 (R)STP 阻塞。
- 端口抖动。
- 网络无法访问。

### 解决方案 {#solution-7}

最简单的解决方案是直接在网桥上禁用 (R)STP：

```ros
/interface/bridge
set bridge1 protocol-mode=none
```

不过，仍建议重写配置以使用网桥 VLAN 过滤：

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
启用 `vlan-filtering` 后，将过滤发往 CPU 的流量。在启用 VLAN 过滤之前，应确保已设置 [Management port](/docs/7.24/bridging-and-switching#management-access-configuration)。
:::

## 未启用硬件卸载的网桥 VLAN 过滤 {#bridge-vlan-filtering-without-hardware-offloading}

---

请考虑以下场景：你了解了新的网桥 VLAN 过滤功能，并决定更改设备上的配置。你有一个非常简单的 trunk/access 端口配置，并且喜欢网桥 VLAN 过滤的概念。

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

例如，你在 CRS1xx/CRS2xx 系列设备上使用此配置，并开始注意到 CPU 使用率非常高。当运行性能测试以检查网络吞吐量时，你发现总吞吐量只是它本应轻松达到的线速性能的一小部分。问题的原因是并非所有设备都支持硬件层面的网桥 VLAN 过滤。所有设备都可以配置网桥 VLAN 过滤，但只有少数设备能够将流量卸载到交换芯片。如果在带有内置交换芯片的设备上使用了不适当的配置方法，则将使用 CPU 转发流量。

### 症状 {#symptoms-8}

以下是由此类错误配置可能导致的症状列表：

- 网桥端口上缺少“H”标志。
- 吞吐量低。
- CPU 使用率高。

### 解决方案 {#solution-8}

使用网桥 VLAN 过滤之前，请检查设备是否在硬件层面支持该功能。兼容性表位于 [Bridge Hardware Offloading](/docs/7.24/bridging-and-switching#bridge-hardware-offloading) 部分。目前，每类设备都需要不同的配置方法。以下列出了设备上应使用的配置，以便利用硬件卸载的优势：

- [MikroTik devices with Marvell Prestera switch](/docs/bridging-and-switching#bridge-vlan-filtering)
- [CRS1xx/CRS2xx series devices](/docs/bridging-and-switching/user-guides/crs1xx-2xx-series-switches-examples#vlan)
- [Other devices with a switch chip](/docs/bridging-and-switching/switch-chip-features#setup-examples)

## 使用多个交换芯片进行 VLAN 过滤 {#vlan-filtering-with-multiple-switch-chips}

---

考虑以下场景：你有一台带有两个或更多交换芯片的设备，并决定使用单个网桥，同时在硬件层面设置 VLAN 过滤（通过使用 `/interface/ethernet/switch` 菜单），以便在网络中实现线速性能。这对 RB2011 和 RB3011 系列设备非常重要。在本例中，假设你希望使用一个 trunk 端口，其余所有端口均为 access 端口，例如，**ether10** 是 trunk 端口，**ether1-ether9** 是 access 端口。

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

运行几项测试后，你可能会发现来自 **ether6-ether10** 的数据包会按预期转发，但来自 **ether1-ether5** 的数据包并不总能正确转发（尤其是通过 trunk 端口时）。最明显的问题是，来自 **ether1-ether5** 并经 **ether10** 转发的数据包会被直接丢弃。这是因为这些端口位于不同的交换芯片上。这意味着无法在硬件层面进行 VLAN 过滤，因为交换芯片无法感知另一颗交换芯片上的 VLAN 表内容。位于不同交换芯片上的端口之间转发的数据包也会由 CPU 处理，这意味着无法实现线速性能。

### 症状 {#symptoms-9}

以下是由此类错误配置可能导致的症状列表：

- 数据包被丢弃。
- 吞吐量低。

### 解决方案 {#solution-9}

正确的解决方案是考虑此硬件设计，并据此规划网络拓扑。要解决此问题，必须创建两个独立的网桥，并在每个交换芯片上配置 VLAN 过滤。这会限制在交换芯片之间转发数据包的可能性，不过可以在两个网桥之间配置路由（如果连接在每个交换芯片上的设备使用不同的网络子网）。

有一种方法可以将设备配置为所有端口一起交换，同时仍能在硬件层面使用 VLAN 过滤，但此解决方案有一些注意事项。思路是在每个交换芯片上牺牲一个以太网端口，使其作为 trunk 端口在交换芯片之间转发数据包。为此，可以在两个交换芯片之间插入一根以太网电缆。例如，在 **ether5** 和 **ether6** 之间插入一根以太网电缆，然后重新配置设备，假设这些端口是 trunk 端口：

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

## 使用简化网桥 VLAN 表进行 VLAN 过滤 {#vlan-filtering-with-simplified-bridge-vlan-table}

---

:::info
此问题自 **RouterOS v7.15** 起已解决。动态 VLAN 现在始终创建为独立条目，不再与静态配置的条目合并。
:::

你需要创建一个网络配置，其中多个客户端连接到不同的 access 端口，并通过不同 VLAN 进行隔离。此流量应被打上标签并发送到相应的 trunk 端口。access 端口使用 pvid 属性进行配置。由于 trunk 端口同时用于两个 VLAN，你决定通过添加单条 bridge VLAN 表项并用逗号分隔 VLAN 来简化配置。当 tagged trunk 端口用于大量 VLAN，甚至某些 VLAN 范围（例如 vlan-id=100-200）时，这尤其有用。请参阅下面的网络拓扑图和配置。

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

流量从 access 端口正确转发并打上标签到 trunk 端口，但你可能会注意到，一些广播或组播数据包实际上会在两个 untagged access 端口之间泛洪，尽管它们应位于不同 VLAN 中。此外，来自 tagged 端口的广播和组播流量也会泛洪到两个 access 端口。这可能会引发一些安全问题，因为来自不同网络的流量可能被嗅探。当你查看 bridge VLAN 表时，会发现已为 VLAN 10 和 20 创建了一条表项，并且两个 untagged 端口都属于同一个 VLAN 组。

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

当 access 端口使用 pvid 属性配置后，它们会被动态添加到相应的 VLAN 表项中。创建包含多个 VLAN 或 VLAN 范围的静态 VLAN 表项后，具有匹配 pvid 的 untagged access 端口也会被包含在同一 VLAN 组或范围中。使用单条配置行定义大量 VLAN 可能很有用，但在配置 access 端口时应格外谨慎。对于此示例，应创建单独的 VLAN 表项：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether2 untagged=ether3 vlan-ids=10
add bridge=bridge1 tagged=ether2 untagged=ether4 vlan-ids=20
```

## 主接口上的 MTU {#mtu-on-the-master-interface}

---

考虑以下场景：你已创建一个网桥，向其中添加了几个接口，并在网桥接口之上创建了一个 VLAN 接口，但你需要增大 VLAN 接口的 MTU，以接收更大的数据包。

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

当你尝试增大 VLAN 接口的 MTU 时，会收到 RouterOS **Could not set MTU** 错误。当你尝试将 MTU 设置为大于 L2MTU 的值时，可能会出现这种情况。此时，你需要在所有从接口上增大 L2MTU，这将更新网桥接口的 L2MTU。完成此操作后，你就可以在 VLAN 接口上设置更大的 MTU。同样的原则适用于 bond 接口。只有当所有物理从接口都设置了合适的 L2MTU 时，才能增大 VLAN、MPLS、VPLS、Bonding 等接口的 MTU。

### 症状 {#symptoms-11}

以下是由此类错误配置可能导致的症状列表：

- 无法更改 MTU。

### 解决方案 {#solution-11}

在更改主接口的 MTU 之前，先增大从接口的 L2MTU。

```ros
/interface/ethernet
set ether1,ether2 l2mtu=9018
/interface/vlan
set VLAN99 mtu=9000
```

## MTU 不一致 {#mtu-inconsistency}

---

考虑以下场景：网络中有多台设备。大多数设备用作网络中的交换机/网桥，某些端点应接收并处理流量。为降低网络开销，你决定增大 MTU 大小，因此在两个端点上都设置了更大的 MTU 大小，但开始注意到一些数据包被丢弃。

![MTU Issues](/img/e87e9a6138906e63.webp)

### 配置 {#configuration-12}

在这种情况下，两个端点可以是任何类型的设备，我们假设它们都是 Linux 服务器，并且需要传输大量数据。在这样的场景中，你可能已在 **ServerA** 和 **ServerB** 上将接口 MTU 设置为 9000，并且在 **Switch** 上可能设置了类似如下的配置：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add interface=ether1 bridge=bridge1
add interface=ether2 bridge=bridge1
```

### 问题 {#problem-12}

这是一个非常简单的问题，但在较大的网络中可能难以检测。例如，ping 可能正常工作，因为通用 ping 数据包长度为 70 字节（以太网头部 14 字节，IPv4 头部 20 字节，ICMP 头部 8 字节，ICMP 有效载荷 28 字节），但数据传输可能无法正常工作。某些数据包可能无法转发的原因是，运行 RouterOS 的 MikroTik 设备默认将 MTU 设置为 1500，并将 L2MTU 设置为约 1580 字节（具体取决于设备），但以太网接口会静默丢弃任何不适合 L2MTU 大小的内容。请注意，L2MTU 参数与 x86 或 CHR 设备无关。对于仅用于转发数据包的设备，无需增大 MTU 大小；只需增大 L2MTU 大小。RouterOS 不允许将 MTU 大小设置为大于 L2MTU 大小。如果你要求接口接收数据包，并且设备需要处理该数据包而不只是转发它，例如在路由情况下，则需要同时增大 L2MTU 和 MTU 大小，但如果仅使用 IP 流量（支持数据包分片）并且不介意数据包被分片，则可以将接口上的 MTU 大小保留为默认值。你可以使用 ping 工具确保所有设备都能够转发巨型帧：

```ros
/ping 192.168.88.1 size=9000 do-not-fragment
```

请记住，L2MTU 和 MTU 大小需要大于或等于发送 ping 数据包的设备上 ping 数据包的大小，因为 ping（ICMP）是通过 Layer3 从接口发出的 IP 流量。

### 症状 {#symptoms-12}

以下是由此类错误配置可能导致的症状列表：

- 网页无法加载，但 ping 正常工作。
- 隧道丢弃流量。
- 特定协议无法正常工作。
- 严重丢包。

### 解决方案 {#solution-12}

增大 **Switch** 上的 L2MTU 大小：

```ros
/interface/ethernet
set ether1,ether2 l2mtu=9000
```

如果流量被封装（VLAN、VPN、MPLS、VPLS 或其他），则可能需要考虑设置更大的 L2MTU 大小。在这种情况下，无需增大 MTU 大小，原因如上所述。

:::warning
完整帧 MTU 与 L2MTU 不同。L2MTU 大小不包括 Ethernet 报头（14 字节）和 CRC 校验（FCS）字段。FCS 字段由 Ethernet 驱动剥离，RouterOS 永远不会向任何数据包显示额外的 4 字节。例如，如果将 MTU 和 L2MTU 设置为 9000，则完整帧 MTU 长度为 9014 字节。使用 “`/tool/sniffer/quick`” 命令嗅探数据包时也可以观察到这一点。
:::

## 网桥和保留的 MAC 地址 {#bridge-and-reserved-mac-addresses}

---

考虑以下场景：你希望透明桥接两个网段，它们可以是 EoIP 等隧道接口、Wireless 接口、Ethernet 接口，或任何其他可添加到网桥的接口类型。这种配置可以让两台设备无缝连接，就像它们之间只有一根物理线缆一样。这有时称为从 **DeviceA** 到 **DeviceB** 的**透明网桥**。

### 配置 {#configuration-13}

**DeviceA** 和 **DeviceB** 两台设备的配置应非常相似。

```ros
/interface/bridge
add name=bridge1 protocol-mode=rstp
/interface/bridge/port
add interface=ether1 bridge=bridge1
add interface=eoip1 bridge=bridge1
```

### 问题 {#problem-13}

两台设备能够相互通信，但某些协议无法正常工作。原因是，一旦使用任何 STP 变体（STP、RSTP、MSTP），就会使网桥符合 IEEE 802.1D 和 IEEE 802.1Q。这些标准建议不要转发目的地址为 **01:80:C2:00:00:0X** 的数据包。在网桥中仅添加 2 个端口的情况下，不应使用 (R/M)STP，因为 2 个接口不会产生环路；如果确实出现环路，原因在其他位置，应在其他网桥上修复。由于透明网桥配置中不需要 (R/M)STP，因此可以将其禁用。禁用 (R/M)STP 后，RouterOS 网桥将不再符合 IEEE 802.1D 和 IEEE 802.1Q，因此会转发目的地址为 **01:80:C2:00:00:0X** 的数据包。

### 症状 {#symptoms-13}

以下是由此类错误配置可能导致的症状列表：

- LLDP 邻居未显示。
- 802.1x 认证（dot1x）无法工作。
- LACP 接口不转发流量。

### 解决方案 {#solution-13}

可以部分禁用对 IEEE 802.1D 和 IEEE 802.1Q 的兼容性；这可以通过更改网桥协议模式来实现。

```ros
/interface/bridge
set bridge1 protocol-mode=none
```

:::danger
IEEE 802.1x 标准用于交换机和客户端之间直接连接。如果可以在交换机和客户端之间接入设备，则会造成安全威胁。因此，不建议禁用对 IEEE 802.1D 和 IEEE 802.1Q 的兼容性，而应设计合理的网络拓扑。
:::

## 无线链路之间的 Bonding {#bonding-between-wireless-links}

---

考虑以下场景：你已建立多条 Wireless 链路，为了实现最大吞吐量并实现冗余，你决定将 Ethernet 接口加入 bond，并根据转发的流量选择特定的 bonding 模式。该场景适用于在彼此未直接连接的链路之间创建 bonding 接口的任何情况。

![LACP over WLAN](/img/2de2fccfd3fb0dad.webp)

### 配置 {#configuration-14}

以下配置适用于 **R1** 和 **R2**：

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=ether1,ether2 transmit-hash-policy=layer-2-and-3
/ip/address
add address=192.168.1.X/24 interface=bond1
```

以下配置与 **AP1**、**AP2**、**ST1** 和 **ST2** 相关，其中 **X** 对应每台设备的 IP 地址。

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

虽然 **R1** 和 **R2** 之间的流量转发正常，负载均衡和链路故障切换也正常工作，但 **R1** 和 **R2** 之间的设备并不总是可访问，或者其中一些设备完全无法访问（大多数情况下 **AP2** 和 **ST2** 无法访问）。检查该问题后可能会发现，数据包并不总是通过所需的 bonding 从接口转发，因此永远不会被尝试访问的设备接收。这是网络设计和 bonding 协议的限制。当数据包需要通过 bonding 接口发送时（在这种情况下，可能尝试向 **AP2** 或 **ST2** 发送 ICMP 数据包），bonding 接口会根据所选的 bonding 模式和 transmit-hash-policy 创建哈希，并选择用于发送数据包的接口，而不考虑目标是否只能通过某个特定接口到达。某些设备可以访问，因为生成的哈希与设备所在的接口匹配，但也可能不会选择所需的接口，从而导致设备无法访问。只有 broadcast bonding 模式没有这种协议限制，但该 bonding 模式的使用场景非常有限。

### 症状 {#symptoms-14}

以下是由此类错误配置可能导致的症状列表：

- 连接受限
- 链路不稳定（在 balance-rr 情况下）

### 解决方案 {#solution-14}

bonding 接口不应通过间接链路连接，但仍可以创建一种变通方案。该变通方案的核心思路是找到一种方式，绕过通过 bonding 接口发送的数据包。有多种方法可以强制数据包不通过 bonding 接口发送，但本质上，解决方案是在物理接口之上创建新接口，并将这些新创建的接口添加到 bond 中，而不是添加物理接口。一种实现方式是在每个物理接口上创建 EoIP 隧道，但这会产生很大的开销，并降低整体吞吐量。应改为在每个物理接口之上创建 VLAN 接口。这产生的开销要小得多，不会明显影响整体性能。以下是 **R1** 和 **R2** 应如何重新配置的示例：

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

**AP1** 和 **ST1** 只需将 IP 地址更新为正确子网：

```ros
/ip/address
add address=192.168.11.X/24 interface=bridge1
```

必须对 **AP2** 和 **ST2** 应用相同的更改（确保使用正确的子网）：

```ros
/ip/address
add address=192.168.22.X/24 interface=bridge1
```

采用这种方法，开销最小，所需的配置更改也最少。

:::warning
LACP (802.3ad) 不适用于设备的 bonding 从接口未直接连接的场景；在这种情况下，如果两台路由器之间存在 Wireless 链路，不建议使用 LACP。LACP 要求两个 bonding 从接口具有相同的链路速率，而 Wireless 链路可能随时改变速率，这会降低整体性能和稳定性。应改用其他 bonding 模式。
:::

## 带宽测试 {#bandwidth-testing}

---

考虑以下场景：你在两台设备之间建立了一条链路。这可以是任意链路，例如以太网线缆、无线链路、隧道或任何其他连接。你决定测试该链路的带宽，但出于方便，你决定使用运行该链路的同一设备开始测试。

![Bad Bandwidth Setup](/img/590e348e86dd552a.webp)

### 问题 {#problem-15}

当你启动 [Bandwidth test](/docs/7.24/diagnostics-monitoring-and-troubleshooting/bandwidth-test) 或 [Traffic generator](/docs/7.24/diagnostics-monitoring-and-troubleshooting/traffic-generator) 时，会发现吞吐量远低于预期。对于本应能够转发每秒数吉比特（Gbps）的高性能路由器，你会发现实际只转发了每秒几个吉比特。出现这种情况的原因是所使用的测试方法。切勿在使用同一路由器生成流量时测试该路由器的吞吐量，因为这会给 CPU 增加额外负载，从而降低总吞吐量。

### 症状 {#symptoms-15}

以下是由此类错误配置可能导致的症状列表：

- 吞吐量低。
- CPU 使用率高。

### 解决方案 {#solution-15}

使用正确的测试方法。不要使用 Bandwidth-test 测试大容量链路，也不要在被测设备上运行任何会产生流量的工具。合理设计网络，以便在两端连接用于生成和接收流量的设备。如果熟悉 **Iperf**，那么应当清楚这一概念。请记住，在实际环境中，路由器或交换机不会生成大量流量（至少不应如此，否则可能表示存在安全问题），流量由服务器/客户端生成，而路由器/交换机负责转发流量（并在适当情况下对流量进行一些处理）。

![Good Bandwidth Setup](/img/94426a9891add21a.webp)

## Bridge split-horizon 用法 {#bridge-split-horizon-usage}

---

考虑以下场景：你有一个网桥，需要将某些网桥端口彼此隔离。可以使用内置交换芯片在某些交换芯片上隔离特定端口，可以使用网桥防火墙规则阻止特定端口向其他端口发送任何流量，也可以使用 port isolation 在 PVLAN 类型配置中隔离端口，但还有一种基于软件的解决方案，即使用 bridge split-horizon（它会禁用所有交换芯片的硬件卸载）。

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

在每个端口上设置网桥 split-horizon 后，你可能会发现端口之间仍能相互发送数据。原因是误用了网桥 split-horizon。网桥端口只是无法与处于同一 horizon 的端口通信，例如，horizon=1 无法与 horizon=1 通信，但可以与 horizon=2、horizon=3 等通信。

### 症状 {#symptoms-16}

以下是由此类错误配置可能导致的症状列表：

- 流量正在不同的网桥 split-horizon 之间转发。

### 解决方案 {#solution-16}

设置正确的网桥 split-horizon 值。如果要将端口彼此隔离（PPPoE 设置的常见场景），并且每个端口只能与网桥本身通信，则所有端口必须处于同一网桥 split-horizon 中。

```ros
/interface/bridge/port
set [f] horizon=1
```

:::warning
将所有网桥端口设置在同一网桥 split-horizon 中，将导致流量只能到达网桥接口本身，随后数据包只能被路由。当你希望其他设备过滤特定流量时，这很有用。类似行为也可以通过网桥过滤规则实现。
:::

## 不支持的 SFP 模块 {#unsupported-sfp-modules}

---

请考虑以下场景：你决定使用光纤线缆，通过 SFP 或 SFP+ 光模块连接设备，但出于方便，你决定使用现有的 SFP 光模块。

### 问题 {#problem-17}

当你配置设备，使使用这些 SFP 光模块的端口建立连接时，可能会发现链路要么正常工作，要么出现随机连接问题。制造 SFP 光模块的厂商很多，但并非所有厂商都严格遵循 SFP MSA、SFF 和 IEEE 802.3 标准，这可能导致不可预测的兼容性问题。在 MikroTik 设备中使用不知名或不受支持的 SFP 光模块时，这是非常常见的问题。

### 症状 {#symptoms-17}

以下是由此类错误配置可能导致的症状列表：

- SFP 接口无法建立链路。
- 随机丢包。
- 链路不稳定（flapping）。
- 重启后 SFP 模块无法运行。
- 断电重启后 SFP 模块无法运行。
- SFP 模块仅在一侧运行。

### 解决方案 {#solution-17}

请仅使用受支持的 SFP 模块。如果打算使用 MikroTik 生产的 SFP 模块，请始终查看 [SFP compatibility table](/docs/7.24/wired-connections/mikrotik-wired-interface-compatibility)。其他 SFP 模块也可与 MikroTik 设备配合使用。请查看 [Supported peripherals table](/docs/7.24/hardware/peripherals#sfp-modules)，查找已确认可与 MikroTik 设备配合使用的其他 SFP 模块。某些不受支持的模块在特定速率和自动协商下可能无法正常工作。可以尝试禁用自动协商，并手动设置链路速率。
