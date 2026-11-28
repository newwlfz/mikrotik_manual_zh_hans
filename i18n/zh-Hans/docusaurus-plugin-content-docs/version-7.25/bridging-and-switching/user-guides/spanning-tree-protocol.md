---
title: "生成树协议"
description: "本页介绍 MikroTik RouterOS 中的 Spanning Tree Protocol（STP），说明其如何通过选择根网桥防止网络环路，并通过 Bridge Protocol Data Units（BPDUs）优化端口使用。本页强调大型网络中的手动配置，并提供监控命令，用于检查网桥和端口上的 STP 状态。"
tags:
  - 'spanning-tree'
  - 'stp'
  - 'rstp'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/spanning-tree-protocol
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

生成树协议的目的是在存在冗余链路时，能够创建无环的第 2 层拓扑。连接多个网桥或仅交叉连接网桥端口时，可能会产生网络环路，严重影响网络稳定性。生成树协议通过引入根网桥的概念来解决该问题。同一第 2 层域中的所有网桥都会交换有关到根网桥最短路径的信息。随后，每个网桥将协商使用哪些端口到达根网桥。该信息交换借助 Bridge Protocol Data Units（BPDU）完成。STP 会为每个网桥禁用某些端口以避免环路，同时仍确保所有网桥之间可以通信。有关该协议的详细说明，请参阅 IEEE 802.1D。

作为最佳实践，始终建议手动设置每个网桥的 priority、端口 priority 和端口 path cost，以确保第 2 层功能始终正常。对于由 1 到 2 个启用 (R/M)STP 的网桥组成的网络，将 STP 相关值保留为默认设置是可以接受的，但对于更大规模的网络，强烈建议手动设置这些值。由于 STP 通过检查网络中网桥的 STP 相关值来选举根网桥和根端口，因此将 STP 设置保留为自动可能会选举出非预期的根网桥和根端口，并在硬件故障时导致网络不可访问。

:::info
RouterOS 网桥不适用于 PVST 及其变体。PVST BPDU（MAC 目的地址为 01:00:0C:CC:CC:CD）会被 RouterOS 网桥视为普通组播数据包。简单来说，它们会经过 RouterOS 网桥/交换机转发逻辑，并可能被添加或移除 VLAN 标签。
:::

## 监控 {#monitoring}

---

可以使用 `/interface/bridge/monitor` 命令检查网桥的 STP 状态，例如：

```ros
/interface/bridge/monitor bridge1
                    state: enabled                         
      current-mac-address: 74:4D:28:6F:31:10               
                bridge-id: 0x8000.74:4D:28:6F:31:10        
              root-bridge: no                              
           root-bridge-id: 0.74:4D:28:11:70:6B             
  regional-root-bridge-id: 0.74:4D:28:11:70:6B             
           root-path-cost: 0                               
                root-port: combo1                          
               port-count: 2                               
    designated-port-count: 0                               
        mst-config-digest: 4e22fbb9ede77faa45ec995c4ffa8085
             fast-forward: no                              
         multicast-router: yes                             
             igmp-querier: none                            
              mld-querier: none                            
        declared-vlan-ids: 1                               
      registered-vlan-ids: 1      
```

请注意，根网桥没有任何根端口，只有指定端口。

可以使用 `/interface/bridge/port/monitor` 命令检查网桥端口的 STP 状态，例如：

```ros
/interface/bridge/port/monitor [find interface=combo1]
                  interface: combo1             
                     status: in-bridge          
                    port-id: 0x80.1             
                       role: root-port          
                  edge-port: no                 
        edge-port-discovery: yes                
        point-to-point-port: yes                
               external-fdb: no                 
               sending-rstp: yes                
                   learning: yes                
                 forwarding: yes                
           actual-path-cost: 2000               
    internal-root-path-cost: 2000               
       designated-bridge-id: 0.74:4D:28:11:70:6B
   designated-internal-cost: 0                  
         designated-port-id: 0x80.1             
  designated-remaining-hops: 20                 
                 bpdu-tx-rx: 3/7791             
        discard-transitions: 0                  
        forward-transitions: 1                  
                   tc-tx-rx: 2/2                
           topology-changes: 1                  
       last-topology-change: 4h19m43s           
           multicast-router: no                 
           hw-offload-group: switch1            
          declared-vlan-ids: 1                  
                             100                
        registered-vlan-ids: 1                  
                             100                
                             200-203     
```

请注意，`root-bridge-id` 由网桥 priority 和网桥的 MAC 地址组成；对于非根网桥，根网桥将显示为 `designated-bridge`。

:::warning
当使用设置为将 802.1Q 作为 EtherType 的网桥时，它们会向 01:80:C2:00:00:00 发送 BPDU，这些 BPDU 由 MSTP、RSTP 和 STP 使用。当使用 802.1ad 作为网桥 VLAN 协议时，BPDU 与 802.1Q 网桥不兼容，并且会发送到 01:80:C2:00:00:08。如果 Layer2 网络中存在不同的网桥 VLAN 协议，(R/M)STP 将无法正常工作。
:::

## STP 和 RSTP {#stp-and-rstp}

---

STP 和 Rapid STP 在许多网络中广泛使用，但几乎所有网络都已切换为仅使用 RSTP，因为它具有优势。STP 是一个非常老的协议，其收敛时间（完全学习网络拓扑变化并继续正确转发流量所需的时间）最长可达 50 秒。RSTP 的收敛时间要短得多，只需几秒甚至几毫秒。建议使用 RSTP 而不是 STP，因为它快得多，并且还向后兼容 STP。RSTP 更快的原因之一是减少了可能的端口状态，以下是可能的 STP 端口状态列表：

- **Forwarding** - 端口参与流量转发，学习 MAC 地址，并接收 BPDU。
- **Listening** - 端口不参与流量转发，不学习 MAC 地址，但接收 BPDU。
- **Learning** - 端口不参与流量转发，但学习 MAC 地址。
- **Blocking** - 端口因会导致环路而被阻塞，但仍接收 BPDU。
- **Disabled** - 端口被禁用或非活动。

在 RSTP 中，disabled、listening 和 blocking 端口状态被一个称为 **Discarding** 的状态取代：

- **Forwarding** - 端口参与流量转发，学习 MAC 地址，并接收 BPDU（forwarding=yes）。
- **Learning** - 端口不参与流量转发，但学习 MAC 地址（learning=yes）。
- **Discarding** - 端口不参与流量转发，不学习 MAC 地址，但接收 BPDU（forwarding=no）。

在 STP 中，端口主要按状态分类（例如 Forwarding、Listening、Learning、Blocking、Disabled）。端口行为由生成树算法动态确定，但不显式分配角色。转发或阻塞流量的逻辑源自 Root Bridge、Root Ports 和 Designated Ports 的计算，但这些被视为生成树拓扑的一部分，而不是形式化的端口角色。RSTP 显式定义端口角色，并引入备份路径的概念，这些路径通过 Alternate Port 和 Backup Port 角色显式表示。这些角色在 STP 中不存在，因为 STP 将阻塞端口统一处理，不区分其作为潜在备份的功能。

以下是 RSTP 协议的端口角色细分：

- **Root Port** - 面向根网桥且具有到根网桥最佳（开销最低）路径的端口。每个网桥只选举一个 root port（根网桥本身除外）。
- **Designated Port** - 背向根网桥并将流量从根网桥转发到下游设备的端口。
- **Alternate Port** - 面向根网桥但不转发流量的端口。当当前 root port 故障时，该端口提供到根网桥的备份路径。
- **Backup Port** - 背向根网桥但不转发流量的端口。该端口作为同一网段上 designated port 的备份。
- **Disabled Port** - 已禁用或非活动端口。

在 STP 中，网桥之间的连通性通过在相邻网桥之间发送和接收 BPDU 来确定。Designated port 向 root port 发送 BPDU。如果连续 3 次 **HelloTime** 都未收到 BPDU，则认为连接不可用，并开始网络拓扑收敛。在某些情况下，可以通过减小 `forward-delay` 计时器来缩短 STP 收敛时间，该计时器决定端口可以处于 learning/listening 状态的时长。

在 RouterOS 中，可以指定哪些网桥端口是 edge port。Edge port 是不应接收任何 BPDU 的端口。这很有用，因为它允许 STP 跳过 learning 和 listening 状态，直接进入 forwarding 状态。此功能有时称为 **PortFast**。可以将此参数保留为默认值 **auto**，也可以手动指定。对于后面不应再连接其他网桥的端口，可以手动将其设置为 edge port。通常，这些端口是接入端口。

此外，网桥端口 `point-to-point` 指定网桥端口是否通过点到点链路连接到网桥，以便在故障时更快收敛。将此属性设置为 `yes` 会强制链路为点到点链路，从而跳过检测并等待来自该单一链路上其他设备的 BPDU 的检查机制。将此属性设置为 `no` 表示链路可以从多个设备接收 BPDU。将此属性设置为 `yes` 可显著改善 (R/M)STP 收敛时间。通常，只有在链路上可能连接其他设备时才应将此属性设置为 `no`。这主要与无线介质和以太网集线器相关。如果以太网链路为全双工，`auto` 会启用点到点功能。当 `protocol-mode` 设置为 `none` 时，此属性无效。

### 默认值 {#default-values}

创建网桥或向网桥添加端口时，RouterOS 会分配以下默认值：

- 默认网桥优先级：**32768** / **0x8000**
- 默认网桥端口路径开销：**based on interface speed**
- 默认网桥端口优先级：**0x80**
- BPDU 消息生存时间增量：**1**
- HelloTime：**2**
- 默认最大消息生存时间：**20**

网桥接口设置 `port-cost-mode` 会更改网桥端口的 `path-cost` 和 `internal-path-cost` 模式，使用基于接口速度的自动值。此设置不会影响手动配置了 `path-cost` 或 `internal-path-cost` 属性的网桥端口。以下示例说明与特定数据速率对应的路径开销（中间速率按比例计算）：

| 数据速率 | Long | Short |
| :-- | :-- | --: |
| 10 Mbps | 2,000,000 | 100 |
| 100 Mbps | 200,000 | 19 |
| 1 Gbps | 20,000 | 4 |
| 10 Gbps | 2,000 | 2 |
| 25 Gbps | 800 | 1 |
| 40 Gbps | 500 | 1 |
| 50 Gbps | 400 | 1 |
| 100 Gbps | 200 | 1 |

对于绑定接口，将应用所有绑定成员端口中最高的 `path-cost`，该值不受 bonding 总链路速率影响。对于虚拟接口（例如 VLAN、EoIP、VXLAN），以及 wifi、wireless 和 60GHz 接口，在 long 模式下分配 `path-cost` 20,000，在 short 模式下分配 10。对于动态桥接接口（例如 wifi、wireless、PPP、VPLS），`path-cost` 在 long 模式下默认为 20,000，在 short 模式下默认为 10。但是，将该接口动态添加到网桥的服务可以手动覆盖此值，例如使用 CAPsMAN 的 `datapath.bridge-cost` 设置。7.13 之前的 RouterOS 版本不会根据链路速率更改端口路径开销，对于 10M、100M、1000M 和 10000M 链路速率，端口添加到网桥时的默认路径开销值始终为 **10**。

BPDU 的年龄由 BPDU 经过的网桥数量乘以消息年龄决定，因为 RouterOS 使用 **1** 作为消息年龄增量，所以 BPDU 数据包可以经过的网桥数量由 `max-message-age` 参数指定。默认情况下该值设置为 **20**。这意味着在第 20 个网桥之后，BPDU 数据包将被丢弃，下一个网桥将成为根网桥。请注意，如果设置了 `max-message-age=20`，则很难预测第 21 个网桥上哪些端口将成为指定端口，并可能导致流量无法正常转发。

:::warning
如果使用网桥过滤规则，请确保允许 DST-MAC 地址为 **01:80:C2:00:00:00** 的数据包，因为这些数据包携带 BPDU，而 BPDU 对 STP 正常工作至关重要。
:::

### 选举过程 {#election-process}

要正确配置网络中的 STP，需要了解选举过程以及各参数按顺序参与决策的方式。在 RouterOS 中，根网桥将按以下特定顺序，根据最小优先级和最小 MAC 地址选举：

1. 网桥优先级（最低）。
2. 网桥 MAC 地址（最低）。

在 RouterOS 中，根端口按以下特定顺序，根据最低根端口路径开销、最低网桥标识符和最低网桥端口 ID 选举：

1. 根端口路径开销（最低）
2. 网桥标识符（最低）
3. 网桥端口 ID（最低）

首先，当设备选择哪个端口作为根端口时，会检查其端口看到的**根路径开销**。如果两个或更多端口的根路径开销相同，则会检查**上游**设备的**网桥标识符**，连接到最低网桥标识符的端口将成为根端口。如果两个或更多端口看到相同的网桥标识符，则会检查**上游**设备的**网桥端口 ID**。

## 属性说明 {#explanation-of-attributes}

根路径开销：所有网桥都有 Root Path Cost。根网桥的 root path cost 为 0。对于其他网桥，该值是到根网桥的最低开销路径上的 Port Path Costs 之和。可以在 `/interface/bridge/port` 下修改本地端口路径开销。
网桥标识符是“bridge priority”和“bridge MAC”的组合，可在 `/interface/bridge` 下配置。

网桥端口 ID 是“unique ID”和“bridge port priority”的组合。将网桥端口添加到网桥时，会自动为其分配 unique ID。该值不可编辑。可在 WinBox 的“Bridge Port”中的“Port Number”列查看，也可通过 `/interface/bridge/port/monitor` 以 `port-number` 查看。

:::tip 理解 STP 端口选举
确保将路径开销和优先级应用到正确的端口：

- **Path Cost** 影响朝向根网桥的端口。（在根网桥端口上设置路径开销无效）。
- **Port Priority** 影响背离根网桥的端口。
- **Bridge Identifier** 不影响设备自身的根端口选举；它影响**下游**设备的根端口选举。
:::

:::warning 网桥优先级兼容性
RouterOS 允许设置 0 到 65535 之间的任意网桥优先级值。但是，IEEE 802.1W 标准严格要求网桥优先级按 4096 的步长取值。为避免与其他厂商设备不兼容，请**仅**使用以下优先级值：
`0, 4096, 8192, 12288, 16384, 20480, 24576, 28672, 32768, 36864, 40960, 45056, 49152, 53248, 57344, 61440`
:::

### 示例 {#examples}

#### 根路径开销示例 {#root-path-cost-example}

![Root Path](/img/3683697e750a8f2f.webp)

本示例说明根路径开销的工作方式。SW1 将作为根网桥，因为其优先级最低，为 0x1000。每个网桥都会计算到根网桥的路径开销。计算根路径开销时，网桥会考虑其端口上配置的路径开销，加上相邻网桥通告的根路径开销。

**SW1**：由于它是根网桥，因此即使其配置的路径开销为 10，它也会向邻居通告根路径开销 0。

**SW2:****ether1** 的根路径开销为 0 + 25=**25**。在 **ether2** 路径上，开销为 10+10+10+0=**30**

**SW3:** **ether2** 的根路径开销为 0 + 10=**10**。在 **ether4** 路径上，路径开销为 10+5+25+0=**40**

**SW4:** **ether1** 的根路径开销为 0+25+5=**30**。在 **ether4** 上，路径开销为 10+10+0=**20**。

路径开销最低的端口将被选为根端口。STP 拓扑中的每个网桥都需要一条到根网桥的路径。找到最佳路径后，冗余路径将被阻塞，在本例中为 SW2 和 SW4 之间的路径。

:::warning
你可以在根网桥上配置路径开销，但只有在该网桥失去根状态后，该配置才会生效。
:::

#### STP 示例 {#stp-example}

![STP Example 1](/img/4c8bc04b481c916d.webp)

在本示例中，我们希望确保 ServerA 到 ServerB 连接的二层冗余。如果某个端口连接到未运行 (R)STP 的非网桥设备，则该端口被视为边缘端口。本例中，ServerA 和 ServerB 连接到边缘端口。这可以通过在网络中使用 STP 实现。以下是每台交换机的配置示例：

- SW1 的配置：

```ros
/interface/bridge
add name=bridge priority=0x1000
/interface/bridge/port
add bridge=bridge interface=ether1 priority=0x60
add bridge=bridge interface=ether2 priority=0x50
add bridge=bridge interface=ether3 priority=0x40
add bridge=bridge interface=ether4 priority=0x30
add bridge=bridge interface=ether5
```

- SW2 的配置：

```ros
/interface/bridge
add name=bridge priority=0x2000
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=ether2
add bridge=bridge interface=ether3
```

- SW3 的配置

```ros
/interface/bridge
add name=bridge priority=0x3000
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=ether2
add bridge=bridge interface=ether3
```

- SW4 的配置：

```ros
/interface/bridge
add name=bridge priority=0x4000
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=ether2 path-cost=20
add bridge=bridge interface=ether3
```

在本示例中，**SW1** 是根网桥，因为它具有最低的网桥优先级。**SW2** 和 **SW3** 的 ether1、ether2 连接到根网桥，ether3 连接到 **SW4**。当所有交换机正常工作时，流量将从 ServerA 经由 SW1\_ether2、SW2 和 SW4 流向 ServerB。在 **SW1** 故障时，**SW2** 因优先级次低而成为根网桥，如图中虚线所示。以下是每台交换机的端口及其角色列表：

- **root-port** - SW2\_ether2、SW3\_ether2、SW4\_ether1
- **alternate-port** - SW2\_ether1、SW3\_ether1、SW4\_ether2
- **designated-port** - SW1\_ether1、SW1\_ether2、SW1\_ether3、SW1\_ether4、SW1\_ether5、SW2\_ether3、SW3\_ether3、SW4\_ether3

:::note
**注意：** 根据 802.1Q 建议，应以 4096 为步长设置网桥优先级。要设置推荐的优先级，使用十六进制表示更方便，例如，0 为 0x0000，4096 为 0x1000，8192 为 0x2000，依此类推（0..F）。
:::

## 多生成树协议 {#multiple-spanning-tree-protocol}

---

多生成树协议（MSTP）用于桥接接口，以确保跨多个 VLAN 的无环拓扑。MSTP 还可以提供二层冗余，并可用作 VLAN 的负载均衡技术，因为它能够针对不同 VLAN 使用不同路径。MSTP 的运行方式与 (R)STP 非常相似，(R)STP 中的许多概念都可以应用于 MSTP，强烈建议在使用 MSTP 前理解 (R)STP 背后的原理，但在设计启用 MSTP 的网络时，必须考虑一些差异。

如果使用 (R)STP，BPDU 会通过网桥中的所有物理接口发送，以确定环路，并阻止可能导致环路的端口转发流量。如果某个 VLAN 内部存在环路，(R)STP 可能无法检测到它。一些 STP 变体通过在每个 VLAN 上运行一个 STP 实例（PVST）来解决此问题，但已证明这种方式效率低下；另一些 STP 变体通过跨所有 VLAN 运行单个 STP 实例（CST）来解决此问题，但它无法为每个 VLAN 或 VLAN 组执行负载均衡。MSTP 通过使用 MST 实例来解决这两个问题，MST 实例可以定义一组 VLAN（VLAN 映射），用于负载均衡和冗余，这意味着每个 VLAN 组可以有不同的根网桥和不同路径。请注意，将多个 VLAN 分组到单个实例中是有益的，可以减少每次网络拓扑变化的 CPU 周期数。

:::danger
在启用 MSTP 的 RouterOS 中，网桥优先级是 CIST 的根网桥优先级。如 IEEE 802.1Q 标准所述，网桥优先级必须以 4096 为步长，低 12 位会被忽略。以下是有效的网桥优先级：0、4096、8192、12288、16384、20480、24576、28672、32768、36864、40960、45056、49152、53248、57344、61440。设置无效的网桥优先级时，RouterOS 会发出警告，并将该值截断为有效值，但会在配置中保存原始值，因为无效的网桥优先级值仍可用于运行 RouterOS 的设备之间的 (R)STP，不过建议改用有效的网桥优先级。
:::

### MSTP 区域 {#mstp-regions}

MSTP 在称为区域的组中工作。每个区域都有一个区域根网桥，区域之间会选举一个根网桥。MSTP 使用内部生成树（IST）在区域内部构建网络拓扑，并使用公共生成树（CST）在区域外部构建多个区域之间的网络拓扑。MSTP 将这两个协议组合为公共和内部生成树（CIST），其中包含区域内部和区域之间的拓扑信息。从 CST 的角度来看，一个区域看起来像单个虚拟网桥，因此 MSTP 被认为非常适合大型网络扩展。要使网桥位于同一区域，其配置必须匹配。BPDU 不会包含 VLAN 映射，因为它们可能很大，而是传输计算出的哈希值。如果网桥通过某个端口收到 BPDU，且配置不匹配，则 MSTP 会将该端口视为边界端口，并认为它可用于到达其他区域。以下是 MSTP 将 BPDU 视为来自同一区域时需要匹配的参数列表：

- 区域名称
- 区域修订号
- 到 MST Instance ID 的 VLAN 映射（计算出的哈希）

可以创建未启用区域的 MSTP 网络，但若要按 VLAN 组实现负载均衡，网桥必须收到来自与其相连且具有相同参数的网桥的 BPDU。在 RouterOS 中，默认区域名称为空，区域修订号为 0，这些都是有效值，但必须确保它们匹配，才能将多个网桥置于同一个 MSTP 区域中。如果某个区域的网桥分散在网络中，则该区域无法存在；这些网桥必须至少通过一种方式相连，并且可以在不离开区域的情况下发送和接收 BPDU。例如，如果两个具有相同区域相关参数的网桥之间有一个区域相关参数不同的网桥，则将至少存在 3 个不同的 MSTP 区域。

![MSTP Topology](/img/77a9b366354f5ae5.webp)

让每个网桥都处于单个 MSTP 区域的缺点是会消耗额外的 CPU 周期。相比之下，PVST(+) 会为网络中存在的每个 VLAN ID 创建一个生成树实例，由于网络中可存在的路径非常有限，这种方式会产生大量开销和不必要的 CPU 周期。这也意味着这种方式的可扩展性较差，并可能使 CPU 性能不强的交换机过载。MSTP 通过将网络划分为多个 MSTP 区域来解决此问题，其中该区域内的每个网桥都会交换和处理同一区域内存在的 VLAN 信息，同时在后台运行单个生成树协议实例，以维护区域之间的网络拓扑。实践证明，这种方式更有效，也具有更好的可扩展性。这意味着应将区域用于较大的网络，以减少 CPU 周期。

在区域中，可以定义 MST 实例，用于配置按 VLAN 组进行的负载均衡，并选举区域根网桥。值得一提的是，每个区域中都有一个预定义的 MST 实例，在大多数文档中，它被称为 **MSTI0**。该 MST 实例被视为默认 MST 实例。某些参数适用于这个特殊的 MST 实例。当流量经过启用 MSTP 的网桥时，MSTP 会查找具有匹配 VLAN 映射的 MST 实例，但如果某个 VLAN ID 不存在 VLAN 映射，则流量将归入 **MSTI0**。

:::warning
由于 MSTP 要求启用网桥接口上的 VLAN 过滤，因此请确保已在 `/interface/bridge/vlan` 中允许所有必需的 VLAN ID，否则流量将不会被转发，并且看起来可能像是 MSTP 配置错误，尽管这实际上是 VLAN 过滤配置错误。
:::

### 选举过程 {#election-process-1}

MSTP 中的选举过程可分为两个部分：区域内和区域间。要使 MSTP 正常工作，始终需要有一个区域根，即区域内的根网桥，以及一个 CIST 根，即区域之间的根网桥。区域根是区域内的根网桥，需要区域根网桥才能正确设置区域内 VLAN 组的负载均衡。CIST 根将用于配置哪些端口是 alternate/backup 端口（非活动），哪些端口是根端口（活动）。

:::warning
区域之间不存在按 VLAN 组进行的负载均衡，也不存在根端口选举过程，MSTP 区域之间的端口阻塞方式与 (R)STP 相同。如果 CIST 已阻塞 MSTP 区域内的某个端口，以防止 MSTP 区域之间出现流量环路，则该端口对于 IST 仍可处于活动状态，以便在 MSTP 区域内按 VLAN 组进行负载均衡。
:::

- 以下参数参与选举 MSTP 区域内的区域根网桥或根端口：

| 属性 | 说明 |
| :-- | :-- |
| **priority** (*integer: 0..65535 decimal format or 0x0000-0xffff hex format*；默认值：**32768 / 0x8000**) | `/interface/bridge/msti`，MST Instance 优先级，用于在 MSTP 区域内选举区域根桥。必须以 4096（0x1000）为步长设置；低 12 位会被忽略。有效值：0x0000、0x1000、0x2000、...、0xf000（或十进制等效值：0、4096、8192、...、61440）。 |
| **internal-path-cost** (*integer: 1..200000000*；默认值：) | `/interface/bridge/port`，未知 VLAN ID（MSTI0）到区域根桥的路径开销，用于 MSTP 区域内的根端口。 |
| **priority** (*0x00 \| 0x10 \| 0x20 \| 0x30 \| 0x40 \| 0x50 \| 0x60 \| 0x70 \| 0x80 \| 0x90 \| 0xa0 \| 0xb0 \| 0xc0 \| 0xd0 \| 0xe0 \| 0xf0*；默认值：**0x80**) | `/interface/bridge/port/mst-override`，指定 MST Instance 的 MST 端口优先级，用于区域根桥上的桥接端口。必须以 16（0x10）为步长设置。 |
| **internal-path-cost** (*integer: 1..200000000*；默认值：) | `/interface/bridge/port/mst-override`，指定 MST Instance 的 MST 端口路径开销，用于 MSTP 区域内的非根桥接端口。 |

- 以下参数参与 CIST 根桥或 CIST 根端口的选举：

| 属性 | 说明 |
| :-- | :-- |
| **priority** (*integer: 0..65535 decimal format or 0x0000-0xffff hex format*；默认值：**32768 / 0x8000**) | `/interface/bridge`，CIST 桥接优先级，用于选举 CIST 根桥。必须以 4096（0x1000）为步长设置；低 12 位会被忽略。 |
| **priority** (*0x00 \| 0x10 \| 0x20 \| 0x30 \| 0x40 \| 0x50 \| 0x60 \| 0x70 \| 0x80 \| 0x90 \| 0xa0 \| 0xb0 \| 0xc0 \| 0xd0 \| 0xe0 \| 0xf0*；默认值：**0x80**) | `/interface/bridge/port`，CIST 端口优先级，用于 CIST 根桥选举 CIST 根端口。必须以 16（0x10）为步长设置。 |
| **path-cost** (*integer: 1..200000000*；默认值：) | `/interface/bridge/port`，CIST 端口路径开销，用于 CIST 非根桥接端口选举 CIST 根端口。 |

:::warning
MSTP 检查参数以选举根桥/端口的顺序与 (R)STP 相同，详情请参阅 (R)STP Election Process 部分。
:::

### MST 实例 {#mst-instance}

**子菜单：** `/interface/bridge/msti`

本节用于将多个 VLAN ID 分组到一个实例中，以便在 MSTP 区域内为每个 VLAN 组创建不同的根桥。

| 属性 | 说明 |
| :-- | :-- |
| **bridge** (*text*；默认值：) | 分配 MST instance 的网桥。 |
| **identifier** (*integer: 1..31*；默认值：) | MST instance 标识符。 |
| **priority** (*integer: 0..65535 decimal format or 0x0000-0xffff hex format*；默认值：**32768 / 0x8000**) | MST instance 优先级，用于确定 MSTP 区域内一组 VLAN 的根桥。 |
| **vlan-mapping** (*integer: 1..4094*；默认值：) | 要分配给 MST instance 的 VLAN ID 列表。该设置接受 VLAN ID 范围以及以逗号分隔的值。例如 `vlan-mapping=100-115,120,122,128-130` |

### MST 覆盖 {#mst-override}

**子菜单：** `/interface/bridge/port/mst-override`

本节用于为 MSTP 区域中的每个 VLAN 映射选择所需路径。

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 该条目是否禁用。 |
| **internal-path-cost** (*integer: 1..200000000*；默认：) | MST 实例的 VLAN 映射路径开销，用于面向根网桥的 VLAN 以控制路径选择；路径开销越低越优先。 |
| **identifier** (*integer: 1..31*；默认：) | MST 实例标识符。 |
| **priority** (*integer: 0..240*；默认：**128**) | MST 实例的 VLAN 优先级，用于背向根网桥的 VLAN 以控制路径选择；优先级越低越优先。 |
| **interface** (*name*；默认：) | 使用已配置 MST 实例的 VLAN 映射以及所定义路径开销和优先级的端口名称。 |

### 监控 {#monitoring-1}

与 (R)STP 类似，也可以监控 MSTP 状态。通过监控网桥接口本身，可以查看当前 CIST 根网桥以及 MSTI0 的当前区域根网桥。还可以查看 MST Instance 标识符和 VLAN 映射的计算哈希值。这在确认某些网桥是否位于同一 MSTP 区域时很有用。下面给出了监控 MSTP 网桥的示例：

```ros
/interface/bridge/monitor bridge
                    state: enabled
      current-mac-address: 6C:3B:6B:7B:F0:AA
                bridge-id: 0x8000.6C:3B:6B:7B:F0:AA 
              root-bridge: no
           root-bridge-id: 0x1000.64:D1:54:24:23:72
  regional-root-bridge-id: 0x4000.6C:3B:6B:7B:F0:AA
           root-path-cost: 10
                root-port: ether4
               port-count: 5
    designated-port-count: 3
        mst-config-digest: 74edbeefdbf82cf63a70cf60e43a56f3
             fast-forward: no                              
         multicast-router: yes                             
             igmp-querier: none                            
              mld-querier: none                            
        declared-vlan-ids: 1                               
      registered-vlan-ids: 1
```

在 MSTP 中，可以监控 MST Instance。这有助于确定某个 MST Instance 和 VLAN 组的当前区域根网桥。下面给出了监控 MST Instance 的示例：

```ros
/interface/bridge/msti/monitor 1
                    state: enabled
               identifier: 2
      current-mac-address: 6C:3B:6B:7B:F0:AA
                bridge-id: 0x8000.6C:3B:6B:7B:F0:AA
              root-bridge: no
           root-bridge-id: 0.00:00:00:00:00:00
  regional-root-bridge-id: 0x1002.6C:3B:6B:7B:F9:08
           root-path-cost: 0
                root-port: ether2
               port-count: 5
    designated-port-count: 1
```

还可以监控某个 MST Override 条目。这有助于在 MSTP 区域中配置根端口和 alternate/backup 端口时，确定某个 MST Instance 的端口角色。下面给出了监控 MST Override 条目的示例：

```ros
/interface/bridge/port/mst-override/monitor 1
                      port: ether3
                    status: active
                identifier: 2
                   port-id: 0x80.1     
                      role: alternate-port
                  learning: no
                forwarding: no
   internal-root-path-cost: 15
         designated-bridge: 0x1002.6C:3B:6B:7B:F9:08
  designated-internal-cost: 0
        designated-port-id: 0x80.1  
 designated-remaining-hops: 20                      
                tx-rx-bpdu: 3/7991                  
       discard-transitions: 0                       
       forward-transitions: 1                       
                  tx-rx-tc: 2/2                     
          topology-changes: 1                       
```

### MSTP 示例 {#mstp-example}

假设需要设计一种拓扑并配置 MSTP，使 VLAN 10、20 沿一条路径转发，VLAN 30、40 沿另一条路径转发，而其他所有 VLAN ID 沿其中一条路径转发。通过配置 MST 实例并分配端口路径开销，可以轻松实现这一点。以下示例展示了一个需要按 VLAN 组进行负载分担、包含 3 个独立区域的网络拓扑：

![MSTP Example](/img/27652a7629c4268f.webp)

启用 MSTP 并按 VLAN 组进行负载分担的网络拓扑

首先将每个接口添加到网桥。最初应创建一个未启用 VLAN 过滤的 (R)STP 网桥，以避免失去对 CPU 的访问。本示例中的每台设备均按其所在区域 (Rx) 和设备编号 (\_x) 命名。对于较大的网络，由于链路和设备数量较多，配置 MSTP 可能比较复杂。建议使用 The Dude 监控和设计网络拓扑。

- 在 **R1\_1**、**R1\_3**、**R2\_1**、**R2\_3**、**R3\_1**、**R3\_3** 上使用以下命令：

```ros
/interface/bridge
add name=bridge protocol-mode=rstp vlan-filtering=no
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=ether2
add bridge=bridge interface=ether3
add bridge=bridge interface=ether4
```

- 在 **R1\_2**、**R2\_2**、**R3\_2** 上使用以下命令。

```ros
/interface/bridge
add name=bridge protocol-mode=rstp vlan-filtering=no
/interface/bridge/port
add bridge=bridge interface=ether1
add bridge=bridge interface=ether2
```

- 确保在这些设备上允许所需的 VLAN ID。此处假设每台设备都会接收需要按 VLAN 组进行负载分担的带标签流量。在 **R1\_1**、**R1\_3**、**R2\_1**、**R2\_3**、**R3\_1**、**R3\_3** 上使用以下命令：

```ros
/interface/bridge/vlan
add bridge=bridge tagged=ether1,ether2,ether3,ether4 vlan-ids=10,20,30,40
```

- 在 **R1\_2**、**R2\_2**、**R3\_2** 上使用以下命令：

```ros
/interface/bridge/vlan
add bridge=bridge tagged=ether1,ether2 vlan-ids=10,20,30,40
```

:::warning
确保将所有需要的 VLAN ID 和端口添加到网桥 VLAN 表中，否则设备将不会转发所有必需的 VLAN，和/或你将失去对设备的访问。
:::

我们需要为要加入同一 MSTP 区域的每个网桥指定区域名称。你也可以指定区域修订号，但它是可选的，不过它们需要匹配。在本例中，如果所有网桥具有相同的区域名称，则它们都将位于同一个 MSTP 网桥中。在这种情况下，我们希望将 3 个网桥组成的组划分到不同的 MSTP 区域，以按 VLAN 组进行负载均衡，并创建多样性和可扩展性：

- 为每个网桥设置适当的区域名称（和区域修订号），并在每台设备上使用以下命令（**更改区域名称！**）：

```ros
/interface/bridge
set bridge region-name=Rx region-revision=1
```

在我们创建了 3 个不同的 MSTP 区域后，需要确定哪台设备将作为每个 VLAN 组的区域根。为保持一致，我们将每个区域中的第一台设备（\_1）设置为 VLAN 10,20 的区域根，并将每个区域中的第三台设备（\_3）设置为 VLAN 30,40 的区域根。这可以通过为每个 VLAN 组创建 MST Instance 并为其分配网桥优先级来实现。MST Instance 标识符仅在 MSTP 区域内相关，在 MSTP 区域外，这些标识符可以不同，并映射到不同的 VLAN 组。

- 在 **R1\_1**、**R2\_1**、**R3\_1** 上使用以下命令：

```ros
/interface/bridge/msti
add bridge=bridge identifier=1 priority=0x1000 vlan-mapping=10,20
add bridge=bridge identifier=2 priority=0x3000 vlan-mapping=30,40
```

- 在 **R1\_3**、**R2\_3**、**R3\_3** 上使用以下命令：

```ros
/interface/bridge/msti
add bridge=bridge identifier=1 priority=0x3000 vlan-mapping=10,20
add bridge=bridge identifier=2 priority=0x1000 vlan-mapping=30,40
```

- 在 **R1\_2**、**R2\_2**、**R3\_2** 上使用以下命令。

```ros
/interface/bridge/msti
add bridge=bridge identifier=1 priority=0x2000 vlan-mapping=10,20
add bridge=bridge identifier=2 priority=0x2000 vlan-mapping=30,40
```

现在我们需要为每个 MST Instance 覆盖端口 `path-cost` 和/或端口优先级。可以通过为每个端口和每个 MST Instance 添加 MST-Override 条目来实现。要使某个 MST Instance 的流量路径不同，只需确保端口路径开销和/或优先级更大。对于朝向区域根网桥的端口，可以增大端口路径开销，也可以减小端口路径开销。增大或减小所有值并不重要；重要的是最终一个端口的路径开销大于另一个端口。

- 在 **R1\_1**、**R2\_1**、**R3\_1** 上使用以下命令：

```ros
/interface/bridge/port/mst-override
add identifier=2 interface=ether1 internal-path-cost=5
add identifier=2 interface=ether2 internal-path-cost=15
```

- 在 **R1\_2**、**R2\_2**、**R3\_2** 上使用以下命令：

```ros
/interface/bridge/port/mst-override
add identifier=1 interface=ether1 internal-path-cost=5
add identifier=2 interface=ether2 internal-path-cost=9
```

- 在 **R1\_3**、**R2\_3**、**R3\_3** 上使用以下命令：

```ros
/interface/bridge/port/mst-override
add identifier=1 interface=ether2 internal-path-cost=5
add identifier=1 interface=ether3 internal-path-cost=9
```

在本例中，对于 VLAN 10、20，从第一台设备到达第三台设备时，会在 ether1 和 ether2 之间进行选择，其中一个端口将被阻塞并设置为 alternate 端口，ether1 的路径开销为 `5+9=14`，ether2 的路径开销为 `10`，因此 ether2 将被选为第三台设备上 MSTI1 的 root 端口。对于 VLAN 30、40，从第三台设备到达第一台设备时，ether1 的路径开销为 `5+9=14`，ether2 的路径开销为 `15`，因此 ether1 将被选为第三台设备上 MSTI2 的 root 端口。

现在可以配置 **MSTI0** 的 root 端口，它适用于所有未分配到特定 MST Instance 的 VLAN，例如本例中的 VLAN 10、20 和 VLAN 30、40。要配置这个特殊的 MST Instance，需要为网桥端口指定 `internal-path-cost`。该值仅与 MSTP 区域相关，在 MSTP 区域之外没有任何作用。在本例中，我们选择让所有未知 VLAN 与 VLAN 30、40 使用相同路径转发，只需增加其中一个端口的路径开销即可。

- 在 **R1\_3**、**R2\_3**、**R3\_3** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether3] internal-path-cost=25
```

此时，可以认为单区域 MSTP 已配置完成，通常 MSTP 已完全可用。强烈建议配置 CIST 部分，但出于测试目的，可以保留默认值。在进行任何测试之前，需要在所有网桥上启用 MSTP。

- 在**所有**设备上使用以下命令：

```ros
/interface/bridge
set bridge protocol-mode=mstp vlan-filtering=yes
```

配置 MSTP 区域后，可以通过转发流量检查配置是否正确，例如，从第一台设备向第三台设备发送带标签的流量，并更改带标签流量的 VLAN ID，以观察基于 VLAN ID 的不同路径。当上述行为符合预期时，可以继续配置 CIST 相关参数，以选举 CIST 根网桥和 CIST 根端口。为保持一致性，选择第一个区域中的第一台设备作为 CIST 根网桥；为确保故障时的一致性，可以为所有其他网桥设置更高的优先级。

- 在 **R1\_1:** 上使用以下命令：

```ros
/interface/bridge
set bridge priority=0x1000
```

- 在 **R1\_2:** 上使用以下命令：

```ros
/interface/bridge
set bridge priority=0x2000
```

- ...

- 在 **R3\_3:** 上使用以下命令：

```ros
/interface/bridge
set bridge priority=0x9000
```

还需要在每台网桥上选举根端口；为简化操作，选择距离 **R1\_1** 最近且跳数最少的端口作为根端口。此时，选举根端口的过程与 (R)STP 中的过程相同。

- 在 **R3\_3:** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether2] path-cost=30
set [find where interface=ether3] path-cost=40
set [find where interface=ether4] path-cost=20
```

- 在 **R1\_3** 和 **R2\_3:** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether2] path-cost=20
set [find where interface=ether3] path-cost=30
```

- 在 **R1\_2:** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether1] path-cost=30
```
