---
title: "Bonding"
description: "Bonding 允许将多个以太网接口组合成一个虚拟链路，以提高带宽并实现故障转移。MikroTik RouterOS 支持多种模式，包括 LACP，以及针对特定芯片的硬件卸载。"
tags:
  - 'bonding'
  - 'link-aggregation'
  - 'arp-monitoring'
source: https://manual.mikrotik.com/docs/7.25/high-availability-solutions/bonding
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "high-availability-solutions"
pagination_next: "high-availability-solutions/load-balancing"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

---

Bonding 是一种技术，可将多个类似以太网的接口聚合为一条虚拟链路，从而获得更高的数据速率并提供故障切换。

:::warning
接口 Bonding 不会创建具有更高链路速率的接口。接口 Bonding 会创建一个虚拟接口，可在多个接口之间对流量进行负载均衡。更多详情请参阅 [LAG interfaces and load balancing](/docs/7.24/bridging-and-switching/user-guides/layer2-misconfiguration#lag-interfaces-and-load-balancing) 页面。
:::

:::info
配备 Marvell Prestera 交换机以及 88E6393X、88E6191X、88E6190 交换芯片的 MikroTik 设备支持通过 Bonding 接口进行网桥硬件卸载。

仅 `802.3ad`（LACP）、`balance-xor`（静态 LAG）和 `active-backup` Bonding 模式支持硬件卸载；其他 Bonding 模式将使用 CPU 资源。

配备 Marvell Prestera 交换机的 MikroTik 设备将始终使用 Layer2+Layer3+Layer4 作为传输哈希策略，而 88E6393X、88E6191X、88E6190 交换芯片仅支持 Layer2 传输哈希。在使用 HW 卸载时手动更改传输哈希策略不会生效。

更多详情请参阅 [Marvell Prestera switch chip features](/docs/7.24/bridging-and-switching/marvell-prestera-switch-chip-features)。
:::

## 快速设置指南 {#quick-setup-guide}

---

假设每台路由器（Router1 和 Router2）上有两个以太网接口，并且希望在这两台路由器之间获得最大数据速率。为此，请执行以下步骤：

1. 确保将要加入 Bonding 接口的接口上没有 IP 地址。
2. 在 Router1 上添加 Bonding 接口和 IP 地址：

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
bonding 接口需要几秒钟才能与其对等设备建立连接。
:::

## 链路监控 {#link-monitoring}

---

必须启用一种可用的链路监控选项。在上面的示例中，如果某条绑定链路发生故障，bonding 驱动会继续通过该故障链路发送数据包，导致网络性能下降。RouterOS bonding 当前支持两种监控 slave 设备链路状态的方法：MII 和 ARP 监控。由于 bonding 驱动的限制，无法同时使用这两种方法。

### ARP 监控 {#arp-monitoring}

ARP 监控通过发送 ARP 查询并将响应作为链路正常的指示来确定链路状态。ARP 回复不会经过验证——slave 接口收到的任何数据包都会将该接口标记为活动。这种方法可确保流量确实在链路上传输。

使用 balance-rr 或 balance-xor 模式时，必须将连接的交换机配置为在所有链路路径上均匀分发数据包。否则，来自目标的所有 ARP 回复都会在同一 slave 接口上收到，这可能导致其他绑定链路显示为故障。

通过配置三个属性启用 ARP 监控：link-monitoring、arp-ip-targets 和 arp-interval。可以指定多个 ARP 目标地址，这在高可用性配置中尤其有用。仅依赖单个目标会产生潜在故障点——配置更多目标可提高 ARP 监控机制的可靠性。

要在 Router1 上启用 ARP 监控：

```ros
/interface/bonding/set [find name=bond1] link-monitoring=arp arp-ip-targets=172.16.0.2
```

在 Router2 上：

```ros
/interface/bonding/set [find name=bond1] link-monitoring=arp arp-ip-targets=172.16.0.1
```

RouterOS 中 arp-interval 的默认值为 100ms，本示例中无需修改。要验证链路监控是否正常工作，请断开其中一条线缆链路。在 ARP 监控检测到链路故障之前，你可能会观察到一些 ping 超时。

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
ARP 监控不要求设备上配置 IP 地址，无论任何接口上设置的 IP 地址是什么，它都可以工作。
:::

:::danger
启用 ARP 监控时，bonding slave 将发送不带 VLAN 标签的 ARP 请求，即使在 VLAN 接口上配置了与 arp-ip-targets 地址处于同一子网的 IP 地址也是如此。
:::

### MII 监控 {#mii-monitoring}

MII 监控仅监控本地接口的状态。MII Type 1 是一种由设备驱动程序判断链路是 up 还是 down 的方法。如果设备驱动程序不支持该选项，链路将始终显示为 up。MII 监控的主要缺点是，即使检测到链路为 up，它也无法判断该链路是否确实能够传输数据包流量。通过设置 link-monitoring 和 mii-interval 参数来配置 MII 监控。

要在 Router1 和 Router2 上启用 MII Type1 监控：

```ros
/interface/bonding/set [find name=bond1] link-monitoring=mii
```

我们将 mii-interval 保留为默认值（100ms）。拔掉其中一根线缆时，与 ARP 链路监控相比，几乎可以立即检测到故障。

## Bonding 模式 {#bonding-modes}

---

### 802.3ad

802.3ad 模式是 IEEE 标准，也称为 LACP（Link Aggregation Control Protocol）。它提供聚合的自动配置，只需最少的交换机配置。该标准还要求帧按顺序传送，因此连接不应出现数据包乱序。此外，聚合中的所有设备必须以相同的速度和双工模式运行。

LACP 根据哈希后的协议头信息在活动端口之间均衡出站流量，并接受来自任何活动端口的入站流量。哈希包括以太网源地址和目标地址、VLAN 标签（如果有），以及 IPv4/IPv6 源地址和目标地址。计算方法取决于 transmit-hash-policy 参数。不建议 ARP 链路监控，因为由于 LACP 对端设备上的传输哈希策略，ARP 回复数据包可能只到达一个 slave 端口。这可能导致发送流量不均衡，因此建议使用 MII 链路监控。

:::warning
layer-3-and-4 传输哈希模式与 LACP 不完全兼容。更多详情请参阅 https://www.kernel.org/doc/Documentation/networking/bonding.txt
:::

### balance-xor

该模式使用哈希后的协议头在活动端口之间均衡出站流量，并接受来自任何活动端口的入站流量。该模式与 LACP 非常相似，但未标准化。它可以与所连接交换机上的静态 Link Aggregation Group（LAG）接口配置一起使用。

### balance-rr

设置该模式时，数据包会按从第一个可用 slave 到最后一个 slave 的顺序发送。balance-rr 模式是唯一可以跨属于同一 TCP/IP 连接的多个接口发送数据包的 bonding 模式。使用多条发送链路和多条接收链路时，数据包经常会乱序接收，从而导致段重传。对于 UDP 等其他协议，如果客户端软件能够容忍乱序数据包，则不会出现问题。如果使用交换机聚合链路，则需要相应的交换机端口配置；但是，许多交换机不支持 balance-rr。[Quick setup guide](#quick-setup-guide) 演示了 balance-rr bonding 模式的使用。如你所见，设置非常简单。balance-rr 也适用于绑定多条无线链路；但是，它要求所有绑定链路具有相同的带宽。如果一条绑定链路的带宽下降，则 bond 的总带宽将等于最慢绑定链路的带宽。

### active-backup

该模式仅使用一个活动 slave 发送数据包。仅当主 slave 故障时，备用 slave 才会变为活动状态。bonding 接口的 MAC 地址会在活动端口上呈现，以防止交换机混淆。对于具有多个互连交换机的高可用性配置，active-backup 是最佳选择。

:::warning
当两台路由器设备直接相连时，ARP 监控无法正常工作。在此类配置中，必须使用 MII 监控，或者在路由器设备与其对端之间放置一台交换机。
:::

### broadcast

当端口配置为 broadcast 模式时，所有 slave 端口都会向目的地址发送相同的数据。该模式提供故障容错，但不提供负载均衡。

### balance-tlb

该模式按对等体平衡出站流量。每条绑定链路可以以不同的速率和双工设置运行，并且与其他 bonding 模式不同，无需特定交换机配置。该模式的限制是仅支持 MII 链路监控——配置时会忽略 ARP 监控——并且入站流量不会被平衡。入站流量将使用指定为“primary”接口的链路。

#### 配置示例 {#configuration-example}

假设路由器有两条链路——**ether1** 的最大带宽为 10Mbps，**ether2** 的最大带宽为 5Mbps。第一条链路带宽更大，因此将其设置为主链路：

```ros
/interface/bonding/add mode=balance-tlb slaves=ether1,ether2 primary=ether1
```

![](/img/b5887323292b3cec.webp)

交换机无需额外配置。上图说明了 balance-tlb 模式的工作方式。如你所见，路由器可以与连接到交换机的所有客户端通信，总带宽为两条链路之和（15Mbps）。但如你已经了解的，balance-tlb 不会平衡入站流量。在本示例中，客户端与路由器通信的总带宽为主链路带宽，在我们的配置中为 10Mbps。

### balance-alb

该模式基本与 balance-tlb 相同，但入站 IPv4 流量也会被平衡。接收负载均衡通过 ARP 协商实现。bonding 驱动会拦截本地生成的 ARP 消息，并在其发出前将源硬件地址改写为 bond 中某个 slave 的唯一地址，使不同对等体使用不同的硬件地址。仅支持 MII 链路监控（配置时会忽略 ARP 链路监控）。该模式的另一个缺点是要求设备驱动具备修改 MAC 地址的能力。该模式与 local-proxy-arp 设置不兼容。

![](/img/177dba8c86cfc7f2.webp)  
The image above illustrates how balance-alb mode works. Compared to balance-tlb mode, traffic from clients can also use the secondary link to communicate with the router.

## Bonding 监控 {#bonding-monitoring}

---

对于 `802.3ad` bonding 模式，可使用更详细的监控选项。

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

要监控单个 bonding 端口，请使用 `monitor-slaves` 命令。

```text
/interface/bonding/monitor-slaves bond1
Flags: A - active, P - partner 
 AP port=ether4 key=17 flags="A-GSCD--" partner-sys-id=D4:CA:6D:12:06:65 partner-sys-priority=65535 partner-key=9 partner-flags="A-GSCD--" 

 AP port=ether5 key=17 flags="A-GSCD--" partner-sys-id=D4:CA:6D:12:06:65 partner-sys-priority=65535 partner-key=9 partner-flags="A-GSCD--" 
```

## 另请参阅 {#see-also}

- [Configuration example - VLANs with bonds](/docs/bridging-and-switching/marvell-prestera-switch-chip-features#configuration-example---vlans-with-bonds)
