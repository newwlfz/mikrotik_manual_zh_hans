---
sidebar_key: "high-availability-solutions/bonding"
sidebar_position: 1
title: "绑定"
sidebar_label: "绑定"
description: "Bonding 可以将多个 ethernet 接口组合成一条虚拟链路，以获得更高的带宽和故障转移能力，MikroTik RouterOS 支持多种模式，包括 LACP 以及针对特定芯片的硬件卸载。"
tags:
  - 'bonding'
  - 'link-aggregation'
  - 'arp-monitoring'
source: https://manual.mikrotik.com/docs/high-availability-solutions/bonding
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

---

Bonding 是一种技术，可将多个类似以太网的接口聚合成单个虚拟链路，从而获得更高的数据速率并提供故障转移。

:::warning
接口 bonding 不会创建具有更大链路速度的接口。接口 bonding 会创建一个虚拟接口，可在多个接口上对流量进行负载均衡。更多详细信息可在 [LAG 接口与负载均衡](../bridging-and-switching/user-guides/layer2-misconfiguration.md#lag-interfaces-and-load-balancing) 页面中找到。

:::

:::info
带有 Marvell Prestera 交换机以及 88E6393X、88E6191X、88E6190 交换芯片的 MikroTik 设备支持 bonding 接口的桥接硬件卸载。

只有 `802.3ad`（LACP）、`balance-xor`（静态 LAG）和 `active-backup` bonding 模式会进行硬件卸载；其他 bonding 模式将使用 CPU 的资源。

带有 Marvell Prestera 交换机的 MikroTik 设备将始终使用 Layer2+Layer3+Layer4 作为发送哈希策略，而 88E6393X、88E6191X、88E6190 交换芯片仅限于 Layer2 发送哈希。在使用硬件卸载时手动更改发送哈希策略将不会产生效果。

更多详细信息请参见 [Marvell Prestera 交换芯片特性](../bridging-and-switching/marvell-prestera-switch-chip-features.md)。

:::

## 快速设置指南 {#quick-setup-guide}

---

假设每个路由器（Router1 和 Router2）上都有两个以太网接口，并且希望在这两个路由器之间获得最大数据速率。为此，请按照以下步骤操作：

1. 确保将要作为 bonding 接口从属接口的接口上没有 IP 地址。
2. 在 Router1 上添加 bonding 接口和 IP 地址：

   ```ros
   /interface/bonding/add slaves=ether1,ether2 name=bond1
   /ip/address/add address=172.16.0.1/24 interface=bond1
   ```

3. 在 Router2 上执行相同操作：

   ```ros
   /interface/bonding/add slaves=ether1,ether2 name=bond1
   /ip/address/add address=172.16.0.2/24 interface=bond1
   ```

4. 从 Router1 测试链路：

   ```ros
   [admin@Router1] > ping 172.16.0.2
     SEQ HOST                                 SIZE TTL TIME  STATUS                   
       0 172.16.0.2                             56  64 0ms  
       1 172.16.0.2                             56  64 0ms  
       2 172.16.0.2                             56  64 0ms  
       sent=3 received=3 packet-loss=0% min-rtt=0ms avg-rtt=0ms max-rtt=0ms
   ```

:::warning
bonding 接口需要几秒钟才能与其对端建立连接。

:::

未指定 `mode` 时，bonding 接口使用 `balance-rr`。要通过 LACP 连接到交换机，请使用 `mode=802.3ad`，这将在后面的 802.3ad 小节中介绍。

## 链路监控 {#link-monitoring}

---

启用一种可用的链路监控选项至关重要。在上面的示例中，如果其中一个 bonding 链路发生故障，bonding 驱动程序将继续通过故障链路发送数据包，从而导致网络性能下降。RouterOS bonding 目前支持两种监控从属设备链路状态的方法：MII 和 ARP 监控。由于 bonding 驱动程序的限制，无法同时使用这两种方法。

### ARP 监控 {#arp-monitoring}

ARP 监控通过发送 ARP 查询并将响应作为链路正常运行的指示来确定链路状态。ARP 回复不会经过验证——从属接口收到的任何数据包都会将该接口标记为活动。此方法可确保流量确实在链路上传输。

使用 balance-rr 或 balance-xor 模式时，连接的交换机必须配置为在所有链路路径上均匀分发数据包。否则，来自目标的所有 ARP 回复都将在同一个从属接口上收到，这可能导致其他 bonding 链路看起来已故障。

ARP 监控通过配置三个属性启用：link-monitoring、arp-ip-targets 和 arp-interval。可以指定多个 ARP 目标地址，这在高可用性设置中特别有用。依赖单个目标会形成潜在故障点——配置额外目标可提高 ARP 监控机制的可靠性。

要在 Router1 上启用 ARP 监控：

```ros
/interface/bonding/set [find name=bond1] link-monitoring=arp arp-ip-targets=172.16.0.2
```

在 Router2 上：

```ros
/interface/bonding/set [find name=bond1] link-monitoring=arp arp-ip-targets=172.16.0.1
```

在 RouterOS 中，arp-interval 值默认为 100ms，在此示例中无需修改。要验证链路监控是否正常工作，请断开其中一个线缆链路。在 ARP 监控检测到链路故障之前，可能会观察到一些 ping 超时。

```text
[admin@MikroTik] > /ping 172.16.0.2
  SEQ HOST                                     SIZE TTL TIME  STATUS                                 
    0 172.16.0.2                                 56  64 0ms  
    1 172.16.0.2                                 56  64 0ms  
    2 172.16.0.2                                 56  64 0ms  
    3 172.16.0.2                                 56  64 0ms  
    4 172.16.0.2                                              timeout                                
    5 172.16.0.2                                 56  64 0ms  
    6 172.16.0.2                                 56  64 0ms  
    sent=7 received=6 packet-loss=14% min-rtt=0ms avg-rtt=0ms max-rtt=0ms
```

:::note
ARP 监控不需要在设备上配置 IP 地址——无论任何接口上设置的 IP 地址如何，它都能正常工作。

:::

:::danger
当 ARP 监控处于活动状态时，即使在与 arp-ip-targets 地址处于同一子网的 VLAN 接口上配置了 IP 地址，bonding 从属接口也会发送不带 VLAN 标签的 ARP 请求。

:::

### MII 监控 {#mii-monitoring}

MII 监控仅监控本地接口的状态。MII Type 1 是一种由设备驱动程序确定链路是 up 还是 down 的方法。如果设备驱动程序不支持此选项，链路将始终显示为 up。MII 监控的主要缺点在于，即使链路被检测为 up，它也无法确定链路是否真的能够传递数据包流量。MII 监控通过设置 link-monitoring 和 mii-interval 参数进行配置。

要在 Router1 和 Router2 上启用 MII Type1 监控：

```ros
/interface/bonding/set [find name=bond1] link-monitoring=mii
```

我们将 mii-interval 保留为默认值（100ms）。当拔掉其中一个线缆时，与 ARP 链路监控相比，故障几乎会立即被检测到。

## Bonding 模式 {#bonding-modes}

---

### 802.3ad {#8023ad}

802.3ad 模式是一种 IEEE 标准，也称为 LACP（链路聚合控制协议）。它提供聚合的自动配置，所需的交换机配置最少。该标准还要求帧按顺序交付，因此连接不应出现数据包乱序。此外，聚合中的所有设备必须以相同的速度和双工模式运行。

要创建 LACP bond，请设置 `mode=802.3ad`。另一端的设备（通常是交换机）必须在相同的链路上运行 LACP：

```ros
/interface/bonding/add name=bond1 slaves=ether1,ether2 mode=802.3ad
```

使用 `/interface/bonding/monitor bond1` 检查 bond。当 LACP 正常工作时，两个端口都位于 `active-ports` 中，并且 `lacp-partner-system-id` 显示另一台设备。如果另一端未运行 LACP，则 `lacp-partner-system-id` 缺失，只有一个端口处于活动状态，并且链路可能会丢流量。

LACP 根据哈希后的协议头信息在活动端口之间对传出流量进行负载均衡，并接受来自任何活动端口的传入流量。哈希包括以太网源地址和目标地址、VLAN 标签（如果可用）以及 IPv4/IPv6 源地址和目标地址。计算方法取决于 transmit-hash-policy 参数。不建议使用 ARP 链路监控，因为由于 LACP 对端设备上的发送哈希策略，ARP 回复数据包可能只到达一个从属端口。这可能导致传输流量不均衡，因此建议使用 MII 链路监控。

:::warning
layer-3-and-4 发送哈希模式与 LACP 不完全兼容。更多详细信息可在 https://www.kernel.org/doc/Documentation/networking/bonding.txt 中找到

:::

### balance-xor {#balance-xor}

此模式使用哈希后的协议头在活动端口之间对传出流量进行负载均衡，并接受来自任何活动端口的传入流量。该模式与 LACP 非常相似，只是它未标准化。此模式可与连接的交换机上的静态链路聚合组（LAG）接口配置一起使用。

### balance-rr {#balance-rr}

设置此模式后，数据包将按顺序从第一个可用从属接口发送到最后一个从属接口。balance-rr 模式是唯一一种可以通过属于同一 TCP/IP 连接的多个接口发送数据包的 bonding 模式。当使用多个发送链路和多个接收链路时，数据包通常会乱序到达，从而导致分段重传。对于 UDP 等其他协议，如果客户端软件能够容忍乱序数据包，则这不是问题。如果使用交换机将链路聚合在一起，则需要适当的交换机端口配置；然而，许多交换机不支持 balance-rr。[快速设置指南](#quick-setup-guide) 演示了 balance-rr bonding 模式的用法。如您所见，设置相当简单。balance-rr 也可用于绑定多个无线链路；但是，它要求所有 bonding 链路的带宽相等。如果其中一个 bonding 链路的带宽下降，则 bond 的总带宽将等于最慢 bonding 链路的带宽。

### active-backup {#active-backup}

此模式仅使用一个活动从属接口发送数据包。辅助从属接口仅在主从属接口失败时才变为活动状态。bonding 接口的 MAC 地址会显示在活动端口上，以防止交换机混淆。Active-backup 是使用多个互连交换机的高可用性设置的最佳选择。

:::warning
当两个路由器设备直接连接时，ARP 监控无法正常工作。在此类设置中，必须使用 MII 监控，或者应在路由器设备及其对端之间放置交换机。

:::

### broadcast {#broadcast}

当端口配置为 broadcast 模式时，所有从属端口都会向目标发送相同的数据。此模式提供容错，但不提供负载均衡。

### balance-tlb {#balance-tlb}

此模式按对端对传出流量进行负载均衡。每个 bonding 链路可以以不同的速度和双工设置运行，并且与其他 bonding 模式不同，不需要特定的交换机配置。此模式的限制在于它仅支持 MII 链路监控——配置了 ARP 监控时会被忽略——并且传入流量不会进行负载均衡。传入流量将使用指定为“主”接口的链路。

#### 配置示例 {#configuration-example}

假设路由器有两个链路——**ether1** 最大带宽为 10Mbps，**ether2** 最大带宽为 5Mbps。第一个链路具有更多带宽，因此我们将其设置为主链路：

```ros
/interface/bonding/add mode=balance-tlb slaves=ether1,ether2 primary=ether1
```

![](/img/b5887323292b3cec.webp)

交换机不需要额外配置。上图说明了 balance-tlb 模式的工作方式。如您所见，路由器可以与连接到交换机的所有客户端通信，总带宽为两个链路的总和（15Mbps）。但如您所知，balance-tlb 不会对传入流量进行负载均衡。在我们的示例中，客户端与路由器通信的总带宽为主链路的带宽，在我们的配置中为 10Mbps。

### balance-alb {#balance-alb}

该模式基本上与 balance-tlb 相同，但传入 IPv4 流量也会进行负载均衡。接收负载均衡通过 ARP 协商实现。bonding 驱动程序会拦截本地生成的 ARP 消息，并在其发出时用 bond 中某个从属接口的唯一地址覆盖源硬件地址，从而使不同对端使用不同的硬件地址。仅支持 MII 链路监控（配置了 ARP 链路监控时会被忽略）。此模式的另一个缺点是它需要设备驱动程序具备更改 MAC 地址的能力。该模式与 local-proxy-arp 设置不兼容。

![](/img/177dba8c86cfc7f2.webp)  
上图说明了 balance-alb 模式的工作方式。与 balance-tlb 模式相比，来自客户端的流量还可以使用辅助链路与路由器通信。

## Bonding 监控 {#bonding-monitoring}

---

对于 `802.3ad` bonding 模式，可以使用更详细的监控选项。

```text
/interface/bonding/monitor [find] 
                      mode: 802.3ad           active-backup
              active-ports: ether4            ether6
                            ether5            
            inactive-ports:                   ether7
            lacp-system-id: CC:2D:E0:11:22:33 
      lacp-system-priority: 65535             
    lacp-partner-system-id: B8:69:F4:44:55:66
```

要监控各个 bonding 端口，请使用 `monitor-slaves` 命令。

```text
/interface/bonding/monitor-slaves bond1
Flags: A - active, P - partner 
 AP port=ether4 key=17 flags="A-GSCD--" partner-sys-id=D4:CA:6D:12:06:65 partner-sys-priority=65535 partner-key=9 partner-flags="A-GSCD--" 

 AP port=ether5 key=17 flags="A-GSCD--" partner-sys-id=D4:CA:6D:12:06:65 partner-sys-priority=65535 partner-key=9 partner-flags="A-GSCD--" 
```

## 另请参阅 {#see-also}

- [配置示例 - 带 bond 的 VLAN](../bridging-and-switching/marvell-prestera-switch-chip-features.md#configuration-example---vlans-with-bonds)
