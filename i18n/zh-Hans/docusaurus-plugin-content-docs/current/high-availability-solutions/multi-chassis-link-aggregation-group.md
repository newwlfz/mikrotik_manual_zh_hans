---
sidebar_key: "high-availability-solutions/multi-chassis-link-aggregation-group"
sidebar_position: 3
title: "多机箱链路聚合组"
sidebar_label: "多机箱链路聚合组"
description: "RouterOS 中的 MLAG 通过在两个设备上配置 LACP bond 来实现物理冗余，让客户端感知到单一连接，同时确保故障切换。它使用 ICCP 进行对等通信，支持 STP 协议，并且需要在专用端口上进行谨慎的 VLAN 配置。MLAG 在大型网络中会大量占用 CPU，并且与 L3 hardware offloading 不兼容。"
tags:
  - 'mlag'
  - 'bridge-configuration'
  - 'stp'
source: https://manual.mikrotik.com/docs/high-availability-solutions/multi-chassis-link-aggregation-group
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

RouterOS 中的 MLAG（多机箱链路聚合组）实现允许在两台独立设备上配置 LACP bond，而客户端设备会认为自己连接的是同一台机器。这在交换机故障时提供物理冗余。

两台对等设备都会建立 MLAG 接口，并通过 `mlag-peer-port` 使用 ICCP（Inter Chassis Control Protocol）更新网桥主机表。RouterOS ICCP 不需要 IP 配置；它会发送未标记的 Layer2 数据包，这些数据包标记为 EtherType 0x88B5，目的 MAC 地址为 01:80:C2:00:00:0E。ICCP 数据包属于链路本地流量，这意味着它们始终由 MLAG 设备自身接收和处理，绝不会转发到网络的其他部分。每台 MLAG 设备上的 peer-port 必须彼此直接连接。还建议将 peer 端口使用的未标记 VLAN 与网络其余部分隔离：可以为 peer 端口分配专用的未标记 VLAN（使用 `pvid`），或将其设置为仅允许带 VLAN 标签的帧（使用 `frame-types=admit-only-vlan-tagged`）。peer 端口可以配置为单个以太网接口或 bonding 接口。不过，建议使用 bonding 接口，因为它有助于防止单个接口故障影响连通性，尤其是在两台 MLAG 节点仍处于运行状态时。

当 mlag-peer-port 正常运行且 ICCP 建立后，将进行主设备选举并选出 system-id。优先级最低的对等设备将充当主设备。如果优先级相同，则网桥 MAC 地址最低的对等设备将成为主设备。此 system-id 用于 STP BPDU 网桥标识和 LACP 系统 ID。MLAG 支持 STP、RSTP 或 MSTP 协议。在两台节点的双连接网桥端口上使用相同的 STP 优先级和相同的 STP 配置。当 MLAG 网桥被选举为 STP 根桥时，两台设备都会在网桥监控中显示为根桥。

:::info
MLAG 按桥接接口进行配置。任何 RouterOS 设备（包括虚拟 CHR 实例）都可以用作 MLAG 节点。

桥接硬件卸载 MLAG 仅在[配备 Marvell Prestera 交换机的 MikroTik 设备](../bridging-and-switching/marvell-prestera-switch-chip-features.md)上可用。所有其他设备仅支持软件形式的 MLAG。
:::

:::info
MLAG 与 [L3 硬件卸载](../bridging-and-switching/l3-hardware-offloading.md) 不兼容。使用 MLAG 时，必须在整个交换机上禁用 L3 hardware offloading（`/interface/ethernet/switch/set 0 l3-hw-offloading=no`）。仅在单个交换机端口上设置 `l3-hw-offloading=no` 是不够的。
:::

:::danger
在包含大量主机和 VLAN 的网络中，MLAG 主机同步可能会大量占用 CPU 和内存。对于使用单核 **MIPSBE CPU** 的交换机（例如 CRS326-24S+2Q+RM、CRS354-48P-4S+2Q+RM、CRS518-16XS-2XQ-RM），建议仅在最多 1,000 台主机的网络中使用 MLAG。

在主机数量更多的网络中，这些交换机上的 MLAG 可能导致意外行为。

:::

![](/img/5b5134db602c21b1.png)

### 数据包转发与负载均衡 {#packet-forwarding-and-load-balancing}

BUM（广播、未知单播、组播）数据包转发分两个阶段进行。

#### 阶段 1 - 本地转发 {#stage-1---local-forwarding}  

当节点收到 BUM 流量时，会像传统（非 MLAG）设置中一样，将数据包本地泛洪到同一 VLAN 的所有成员端口。此外，它还会通过 peer-port 将流量转发到另一台 MLAG 节点。

:::info
仅当 peer-port 也是该 VLAN 的成员时，才会通过 peer-port 转发。因此文档强调应将 peer-port 包含在跨越两台 MLAG 节点的所有 VLAN 中。

:::

#### 阶段 2 - 对等设备远程转发 {#stage-2---remote-forwarding-by-peer}  

当对等节点通过 peer-port 收到 BUM 流量时，会将该流量泛洪到同一 VLAN 的所有常规网桥端口。这些是未指定 `mlag-id` 的端口（即独立的以太网或 bond 接口）。对于带 `mlag-id` 的 bond 接口，对等节点会根据链路状态做出决定：

- 如果两条链路（本地和远程）均处于活动状态，则不会将流量泛洪到自己的 MLAG bond 端口——这样可以避免发送重复数据包，因为第一个节点已经处理过该流量。
- 如果远程对等设备的链路不活动，而本地链路活动，则对等节点会将流量泛洪到 MLAG bond，以确保送达。

单播流量的行为类似，但在比较常规 LAG 与 MLAG 时有一个关键区别。在常规 LAG 设置中，出站数据包会根据发送哈希策略在所有活动链路上进行负载均衡。在两条链路均处于活动状态的 MLAG 设置中，流量不会通过两台交换机之间的 peer-port 进行负载均衡。相反，流量仅通过 MLAG 的本地成员链路转发——始终走最短路径。仅当本地 MLAG 链路故障时才使用 peer-port。在这种情况下，流量会通过 peer-port 转发到另一台节点以到达目的地。发生这种情况时，主机表还会更新在 MLAG bond 上学习到的 MAC 地址条目，以表明目的地现在可通过 peer-port 到达。在 MLAG bond 由 2 + 2 条活动链路（每节点 2 条链路）组成的设置中，发送哈希仅在两条本地链路之间执行——而不是在所有四条链路上执行。当 MLAG 对用于多个双连接 bond，且传入流量已经分布在两个对上时，才能实现负载均衡。

## 快速设置 {#quick-setup}

在此示例中，CRS317 和 CRS309 设备用作 MLAG 对等设备，任何具有两个 SFP+ 接口的设备都可以用作 LACP 客户端。两台对等节点上都使用 SFP+1 接口来创建 `mlag-peer-port`，并将其用于 ICCP，网络示意图见下文。

![](/img/bd07685ca17e6836.png)为 **Peer1** 和 **Peer2** 设备配置用于 MLAG 的 bonding 接口，在两台对等设备上使用匹配的 `mlag-id` 设置，并将 LACPDU 发送速率设置为 1 秒：

```ros
# Peer1
/interface/bonding
add mlag-id=10 mode=802.3ad name=client-bond slaves=sfp-sfpplus2 lacp-rate=1sec

# Peer2
/interface/bonding
add mlag-id=10 mode=802.3ad name=client-bond slaves=sfp-sfpplus2 lacp-rate=1sec
```

设置启用 `vlan-filtering` 的网桥接口。指定 `mlag-peer-port` 以启用 MLAG。要控制哪台设备成为主 MLAG 节点，请在首选设备上设置较低的 `mlag-priority` 值。在此示例中，我们希望 Peer1 成为主节点，因此设置其 `priority=50`。Peer2 保留默认优先级 128，从而成为辅助节点。

在此示例中，我们希望两台 MLAG 节点都充当根桥，因此使用 `priority=0x1000` 分配更优（更低）的网桥优先级。请确保两台 MLAG 节点使用相同的优先级值。

可选：可以在网桥接口上设置 `frame-types=admit-only-vlan-tagged`，以禁用默认的未标记 VLAN 1（`pvid=1`）。

```routeros
# Peer1
/interface/bridge
add name=bridge1 vlan-filtering=yes mlag-peer-port=sfp-sfpplus1 mlag-priority=50 priority=0x1000 frame-types=admit-only-vlan-tagged

# Peer2
/interface/bridge
add name=bridge1 vlan-filtering=yes mlag-peer-port=sfp-sfpplus1 priority=0x1000 frame-types=admit-only-vlan-tagged
```

接下来，将必要的接口添加到网桥。在此示例中，只需添加 peer 端口（sfp-sfpplus1）和 client-bond 接口。

对于 peer 端口，我们通过将其配置为仅接受带 VLAN 标签的流量（`frame-types=admit-only-vlan-tagged`）来禁用默认的未标记 VLAN 1（`pvid=1`）。

对于 client-bond 接口，我们希望未标记流量属于 VLAN 10，因此在该接口上设置 `pvid=10`。

```ros
# Peer1
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus1 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=client-bond pvid=10

# Peer2
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus1 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=client-bond pvid=10
```

:::danger
MLAG 支持 STP、RSTP 或 MSTP 协议。在两台节点的双连接网桥端口上使用相同的 STP 优先级和相同的 STP 配置（例如 path-cost、priority、edge）。

:::

:::info
如果双连接 bond 接口未连接到任何其他 RSTP/MSTP 网桥或交换机，可以在两台 MLAG 节点的该接口上设置 `edge=yes`。

此设置允许 bond 端口快速进入转发状态，有助于在 MLAG 一侧再次可用时减少数据包丢失。

:::

在此示例中，client-bond 接口使用 VLAN 10 承载未标记流量（通过 `pvid=10` 设置），并且我们还希望允许带标签的 VLAN 20。为确保两个 VLAN 的流量都能在 MLAG 设备之间通过，我们需要在两台 MLAG 节点上将 peer 端口添加为 VLAN 10 和 20 的带标签成员。重要的是，要将 peer 端口包含在其他网桥端口使用的所有 VLAN 中。这包括未标记和带标签的 VLAN。以下是两台对等设备的配置命令：

```ros
# Peer1
/interface/bridge/vlan
add bridge=bridge1 tagged=sfp-sfpplus1 vlan-ids=10
add bridge=bridge1 tagged=sfp-sfpplus1,client-bond vlan-ids=20

# Peer2
/interface/bridge/vlan
add bridge=bridge1 tagged=sfp-sfpplus1 vlan-ids=10
add bridge=bridge1 tagged=sfp-sfpplus1,client-bond vlan-ids=20
```

:::danger
网桥从端口使用的所有 VLAN 也必须为 peer-port 配置为带标签 VLAN，以便 peer-port 成为这些 VLAN 的成员并能够转发数据。

:::

最后，检查对等设备上的 MLAG 状态，并确保客户端 LACP 的两个接口均处于活动状态。

```ros
# Peer1
[admin@Peer1] > /interface/bridge/monitor [find name=bridge1]
                  state: enabled                 
    current-mac-address: B8:69:F4:1B:B0:7C       
              bridge-id: 0x1000.B8:69:F4:1B:B0:7C
            root-bridge: yes                     
         root-bridge-id: 0x1000.B8:69:F4:1B:B0:7C
         root-path-cost: 0                       
              root-port: none                    
             port-count: 2                       
  designated-port-count: 2                       
           fast-forward: no                      
             mlag-state: connected               
       mlag-active-role: primary  

# Peer2
[admin@Peer2] > /interface/bridge/monitor [find name=bridge1]
                  state: enabled                 
    current-mac-address: B8:69:F4:1B:B0:7C       
              bridge-id: 0x1000.B8:69:F4:1B:B0:7C
            root-bridge: yes                     
         root-bridge-id: 0x1000.B8:69:F4:1B:B0:7C
         root-path-cost: 0                       
              root-port: none                    
             port-count: 2                       
  designated-port-count: 1                       
           fast-forward: no                      
             mlag-state: connected               
       mlag-active-role: secondary    

# Client
[admin@Client] > /interface/bonding/monitor bond1 
                    mode: 802.3ad
            active-ports: sfp-sfpplus1,sfp-sfpplus2
          inactive-ports: 
          lacp-system-id: 74:4D:28:7B:7F:96
    lacp-system-priority: 65535
  lacp-partner-system-id: B8:69:F4:1B:B0:7C

```

如果 **Client** 设备是 RouterOS，以下是创建常规 [绑定](./bonding.md#8023ad) 的配置命令。为加快 LACP 链路建立，请使用 1 秒的 LACPDU 发送速率：

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=sfp-sfpplus1,sfp-sfpplus2 lacp-rate=1sec 
```

## MLAG 设置与监控 {#mlag-settings-and-monitoring}

有多个与 MLAG 相关的设置和监控选项：来自 `interface/bridge` 菜单的 [`mlag-heartbeat`](../cli-reference/interface/bridge/index.md#mlag-heartbeat)、[`mlag-init-delay`](../cli-reference/interface/bridge/index.md#mlag-init-delay)、[`mlag-lacp-fallback`](../cli-reference/interface/bridge/index.md#mlag-lacp-fallback)、[`mlag-peer-port`](../cli-reference/interface/bridge/index.md#mlag-peer-port)、[`mlag-priority`](../cli-reference/interface/bridge/index.md#mlag-priority)，以及来自 `interface/bonding` 菜单的 [`mlag-id`](./bonding.md#mlag-id)。

默认情况下，MLAG 使用当选主节点的系统 ID 作为共享系统 ID，同时用于 RSTP 桥 ID 和双连接聚合链路的 LACP 系统 ID。如果主节点重启，剩余的辅助节点会将其聚合链路恢复为自己的 LACP 系统 ID（请参阅 [`mlag-lacp-fallback`](../cli-reference/interface/bridge/index.md#mlag-lacp-fallback)）。然后 LACP 对端必须重新协商聚合链路，从而导致短暂的数据包丢失。

考虑设置 `mlag-lacp-fallback=no`，以在对等链路丢失后保留共享的 MLAG 系统 ID，从而避免 LACP 重新协商。主节点必须重新加入集群才能恢复共享系统 ID。

当节点加入或重新加入集群时，其双连接聚合从接口会保持不加入 802.3ad 聚合链路，直到 MLAG 系统 ID 与对等节点同步。[`mlag-init-delay`](../cli-reference/interface/bridge/index.md#mlag-init-delay) 控制重启后从接口保持排除状态的时长，防止聚合链路在短暂时间内使用本地系统 ID 激活。

使用 `/interface/bridge/monitor` 命令查看当前 MLAG 状态和活动角色。`mlag-state` 字段在 ICCP 建立后显示 `connected`，在对等节点建立或重新建立连接期间显示 `connecting`，或者当配置的对等端口不可用时显示诸如 `peer port not running` 之类的错误。

```ros
 [admin@Peer1] > /interface/bridge/monitor [find name=bridge1]
                  state: enabled                 
    current-mac-address: B8:69:F4:1B:B0:7C       
              bridge-id: 0x1000.B8:69:F4:1B:B0:7C
            root-bridge: yes                     
         root-bridge-id: 0x1000.B8:69:F4:1B:B0:7C
         root-path-cost: 0                       
              root-port: none                    
             port-count: 2                       
  designated-port-count: 2                       
           fast-forward: no                      
             mlag-state: connected               
       mlag-active-role: primary   
```

可以使用 `monitor` 和 `monitor-slaves` 命令监控 LACP bonding 接口和 bonding 从端口。更多详情请参阅 [Bonding 监控](./bonding.md#bonding-monitoring)。
