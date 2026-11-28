---
title: "多机箱链路聚合组"
description: "RouterOS 中的 MLAG 通过在两台设备上配置 LACP bond 实现物理冗余，使客户端感知为单一连接，同时确保故障切换。它使用 ICCP 进行对等通信，支持 STP 协议，并要求在专用端口上仔细配置 VLAN。对于大型网络，MLAG 会占用大量 CPU 资源，并且与 L3 硬件卸载不兼容。"
tags:
  - 'mlag'
  - 'bridge-configuration'
  - 'stp'
source: https://manual.mikrotik.com/docs/7.25/high-availability-solutions/multi-chassis-link-aggregation-group
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

RouterOS 中的 MLAG（Multi-chassis Link Aggregation Group）实现允许在两台独立设备上配置 LACP bond，而客户端设备会认为其连接到同一台设备。这可在交换机故障时提供物理冗余。

两个对等体建立 MLAG 接口，并通过 `mlag-peer-port` 使用 ICCP（Inter Chassis Control Protocol）更新网桥主机表。RouterOS ICCP 不需要 IP 配置；它发送带有 EtherType 0x88B5 和目的 MAC 地址 01:80:C2:00:00:0E 的未标记 Layer2 数据包。ICCP 数据包是链路本地的，这意味着它们始终由 MLAG 设备自身接收和处理，不会转发到网络中的其他部分。每台 MLAG 设备上的 peer-port 必须直接互连。还建议将 peer 端口使用的未标记 VLAN 与网络其余部分隔离，方法是分配专用未标记 VLAN（使用 `pvid`），或将 peer 端口设置为仅允许 VLAN 标记帧（使用 `frame-types=admit-only-vlan-tagged`）。Peer 端口可配置为单个以太网接口或 bonding 接口。不过，建议使用 bonding 接口，因为这有助于防止单个接口故障影响连接，尤其是在两个 MLAG 节点仍在运行时。

当 mlag-peer-port 运行且 ICCP 建立后，会进行主设备选举并选择 system-id。优先级最低的对等体将充当主设备。如果优先级相同，则桥 MAC 地址最低的对等体将成为主设备。该 system-id 用于 STP BPDU 网桥标识符和 LACP system ID。MLAG 支持 STP、RSTP 或 MSTP 协议。在两个节点的双连接网桥端口上使用相同的 STP 优先级和相同的 STP 配置。当 MLAG 网桥被选举为 STP 根时，两台设备在 bridge monitor 中都会显示为根网桥。

:::info
MLAG 按网桥接口配置。任何 RouterOS 设备（包括虚拟 CHR 实例）都可用作 MLAG 节点。

仅 [MikroTik devices with Marvell Prestera switch](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 支持网桥硬件卸载 MLAG。所有其他设备仅支持软件 MLAG。
:::

:::info
MLAG 与 [L3 hardware offloading](/docs/bridging-and-switching/l3-hardware-offloading) 不兼容。使用 MLAG 时，必须禁用 L3 hardware offloading。
:::

:::danger
在主机和 VLAN 数量较多的网络中，MLAG 主机同步可能会大量占用 CPU 和内存。对于采用单核 **MIPSBE CPU** 的交换机（例如 CRS326-24S+2Q+RM、CRS354-48P-4S+2Q+RM、CRS518-16XS-2XQ-RM），建议仅在主机数量不超过 1,000 的网络中使用 MLAG。

在主机数量更多的网络中，这些交换机上的 MLAG 可能导致意外行为。
:::

![](/img/5b5134db602c21b1.png)

### 数据包转发和负载均衡 {#packet-forwarding-and-load-balancing}

BUM（广播、未知单播、组播）数据包转发分为两个阶段。

#### 阶段 1 - 本地转发 {#stage-1---local-forwarding}

当节点收到 BUM 流量时，它会在本地将数据包泛洪到属于同一 VLAN 的所有端口，就像传统（非 MLAG）环境中一样。此外，它还会通过 peer-port 将流量转发到另一个 MLAG 节点。

:::info
只有通过 peer-port 转发这一行为仅在 peer-port 也属于该 VLAN 时才会发生。因此，文档强调 peer-port 应加入跨越两个 MLAG 节点的所有 VLAN。
:::

#### 阶段 2 - 由对等端进行远程转发 {#stage-2---remote-forwarding-by-peer}

当对端节点通过 peer-port 收到 BUM 流量时，它会将流量泛洪到属于同一 VLAN 的所有普通网桥端口。这些端口未指定 `mlag-id`（即独立的 Ethernet 或 bond 接口）。对于 `mlag-id` bond 接口，对端节点会根据链路状态作出判断：

- 如果两条链路（本地和远端）均处于活动状态，它不会将流量泛洪到自己的 MLAG bond 端口，这样可以避免发送重复数据包，因为第一个节点已经处理了该流量。
- 如果对端节点的链路处于非活动状态，而本地链路处于活动状态，对端节点会将流量泛洪到 MLAG bond，以确保送达。

单播流量的行为类似，但在比较普通 LAG 和 MLAG 时有一个关键区别。在普通 LAG 环境中，出站数据包会根据 transmit hash policy 在所有活动链路上进行负载均衡。在两条链路均处于活动状态的 MLAG 环境中，流量不会在两台交换机之间的 peer-port 上进行负载均衡。相反，流量只通过 MLAG 的本地成员链路转发，始终采用最短路径。只有当本地 MLAG 链路故障时，才会使用 peer-port。在这种情况下，流量会通过 peer-port 转发到另一个节点，以到达目的地。发生这种情况时，主机表也会更新在 MLAG bond 上学习到的 MAC 地址条目，以指示现在可通过 peer-port 到达目的地。在 MLAG bond 由 2 + 2 条活动链路组成（每个节点 2 条链路）的环境中，transmit hashing 只在两条本地链路之间执行，而不是在所有四条链路之间执行。当 MLAG 对用于多个双连接 bond，并且入站流量已经分布在两对链路之间时，可以实现负载均衡。

## 快速设置 {#quick-setup}

在本示例中，CRS317 和 CRS309 设备用作 MLAG 对等节点，任何具有两个 SFP+ 接口的设备都可用作 LACP 客户端。两个对等节点均使用 SFP+1 接口创建 `mlag-peer-port`，该接口用于 ICCP，网络方案如下所示。

![](/img/bd07685ca17e6836.png)Configure bonding interfaces for MLAG on **Peer1** and **Peer2** devices, use a matching `mlag-id` setting on both peer devices, and set the 1-second LACPDU transmission rate:

```ros
# Peer1
/interface/bonding
add mlag-id=10 mode=802.3ad name=client-bond slaves=sfp-sfpplus2 lacp-rate=1sec

# Peer2
/interface/bonding
add mlag-id=10 mode=802.3ad name=client-bond slaves=sfp-sfpplus2 lacp-rate=1sec
```

设置启用 `vlan-filtering` 的网桥接口。指定 `mlag-peer-port` 以启用 MLAG。要控制哪台设备成为主 MLAG 节点，请在首选设备上设置较低的 `mlag-priority` 值。在本示例中，我们希望 Peer1 成为主节点，因此设置其 `priority=50`。Peer2 保留默认优先级 128，使其成为从节点。

在本示例中，我们希望两个 MLAG 节点都充当根网桥，因此使用 `priority=0x1000` 分配更优（更低）的网桥优先级。确保两个 MLAG 节点使用相同的优先级值。

可选地，可以在网桥接口上设置 `frame-types=admit-only-vlan-tagged`，以禁用默认的未标记 VLAN 1（`pvid=1`）。

```routeros
# Peer1
/interface/bridge
add name=bridge1 vlan-filtering=yes mlag-peer-port=sfp-sfpplus1 mlag-priority=50 priority=0x1000 frame-types=admit-only-vlan-tagged

# Peer2
/interface/bridge
add name=bridge1 vlan-filtering=yes mlag-peer-port=sfp-sfpplus1 priority=0x1000 frame-types=admit-only-vlan-tagged
```

接下来，将必要的接口添加到网桥。在本示例中，只需添加对等端口（sfp-sfpplus1）和 client-bond 接口。

对于对等端口，通过将其配置为仅接受带 VLAN 标记的流量（`frame-types=admit-only-vlan-tagged`）来禁用默认的未标记 VLAN 1（`pvid=1`）。

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
MLAG 支持 STP、RSTP 或 MSTP 协议。在两个节点的双连接网桥端口上使用相同的 STP 优先级和相同的 STP 配置（例如 path-cost、priority、edge）。
:::

:::info
如果双链路连接的 bond 接口未连接到任何其他 RSTP/MSTP 网桥或交换机，可以在两个 MLAG 节点上将该接口设置为 `edge=yes`。

该设置允许 bond 端口快速进入转发状态，有助于在 MLAG 一侧再次可用时减少数据包丢失。
:::

在本示例中，client-bond 接口使用 VLAN 10 承载未标记流量（通过 `pvid=10` 设置），我们还希望允许带标签的 VLAN 20。为确保两个 VLAN 的流量都可以在 MLAG 设备之间传递，需要在两个 MLAG 节点上将对等端口添加为 VLAN 10 和 VLAN 20 的带标签成员。务必将对等端口包含在其它网桥端口使用的所有 VLAN 中，包括未标记和带标签的 VLAN。以下是两台对等设备的配置命令：

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
用于网桥从属端口的所有 VLAN 也必须配置为 peer-port 的带标签 VLAN，使 peer-port 成为这些 VLAN 的成员并能够转发数据。
:::

最后，检查对等设备上的 MLAG 状态，并确保 Client LACP 的两个接口均处于活动状态。

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

如果 **Client** 设备是 RouterOS，以下是创建普通 [LACP bonding](/docs/7.24/high-availability-solutions/bonding#8023ad) 的配置命令。为加快 LACP 链路建立，使用 1 秒的 LACPDU 传输速率：

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=sfp-sfpplus1,sfp-sfpplus2 lacp-rate=1sec 
```

## MLAG 设置和监控 {#mlag-settings-and-monitoring}

有多个与 MLAG 相关的设置和监控选项：来自 `interface/bridge` 菜单的 [`mlag-heartbeat`](/docs/cli-reference/interface/bridge#mlag-heartbeat)、[`mlag-init-delay`](/docs/cli-reference/interface/bridge#mlag-init-delay)、[`mlag-lacp-fallback`](/docs/cli-reference/interface/bridge#mlag-lacp-fallback)、[`mlag-peer-port`](/docs/cli-reference/interface/bridge#mlag-peer-port)、[`mlag-priority`](/docs/cli-reference/interface/bridge#mlag-priority)，以及来自 `interface/bonding` 菜单的 [`mlag-id`](/docs/high-availability-solutions/bonding#mlag-id)。

默认情况下，MLAG 使用选举出的主节点的 system ID 作为共享 system ID，用于双连接 bond 的 RSTP bridge ID 和 LACP system ID。如果主节点重启，剩余的从节点会将其 bond 恢复为自身的 LACP system ID（请参阅 [`mlag-lacp-fallback`](/docs/cli-reference/interface/bridge#mlag-lacp-fallback)）。随后 LACP 对端必须重新协商 bond，从而导致短暂的数据包丢失。

可考虑设置 `mlag-lacp-fallback=no`，在 peer link 丢失后保留共享的 MLAG system ID，避免 LACP 重新协商。主节点必须重新加入集群，才能恢复共享 system ID。

当节点加入或重新加入集群时，其双连接 bond 的 slave 会保持在 802.3ad bond 之外，直到 MLAG system ID 与对端同步。[`mlag-init-delay`](/docs/cli-reference/interface/bridge#mlag-init-delay) 控制重启后 slave 保持排除状态的时长，防止 bond 短暂使用本地 system ID 激活。

使用 `/interface/bridge/monitor` 命令查看当前 MLAG 状态和活动角色。`mlag-state` 字段在 ICCP 建立后显示 `connected`，在对端建立或重新建立连接期间显示 `connecting`，或者在配置的 peer port 不可用时显示错误，例如 `peer port not running`。

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

可以使用 `monitor` 和 `monitor-slaves` 命令监控 LACP bonding 接口和 bonding 从属端口。详情请参阅 [Bonding monitoring](/docs/7.24/high-availability-solutions/bonding#bonding-monitoring)。
