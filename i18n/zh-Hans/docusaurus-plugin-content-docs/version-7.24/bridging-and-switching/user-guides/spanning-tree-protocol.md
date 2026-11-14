---
sidebar_key: "bridging-and-switching/user-guides/spanning-tree-protocol"
sidebar_position: 8
title: "生成树协议"
sidebar_label: "生成树协议"
description: "本页介绍 MikroTik RouterOS 中的生成树协议（STP），详细说明其如何通过选举根桥并利用桥协议数据单元（BPDU）优化端口使用来防止网络环路。文中强调了在较大型网络中应进行手动配置，并提供了用于检查网桥和端口上 STP 状态的监控命令。"
tags:
  - 'spanning-tree'
  - 'stp'
  - 'rstp'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/user-guides/spanning-tree-protocol
captured_at: '2026-11-04T11:27:37+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

生成树协议的目的是在具有冗余链路的情况下，能够创建无环的二层拓扑。连接多个网桥或仅交叉连接网桥端口时，可能会产生网络环路，从而严重影响网络的稳定性。生成树协议旨在通过引入根桥的概念来解决此问题。同一二层域中的所有网桥都会交换有关到根桥的最短路径的信息。之后，每个网桥将协商使用哪些端口到达根桥。此信息交换借助网桥协议数据单元 (BPDU) 完成。STP 会为每个网桥禁用某些端口以避免环路，同时仍确保所有网桥能够相互通信。有关该协议的深入说明，请参阅 IEEE 802.1D。

作为最佳实践，始终建议手动设置每个网桥的优先级、端口优先级和端口路径开销，以确保始终具备正常的二层功能。对于由 1 到 2 台启用 (R/M)STP 的网桥组成的网络，将 STP 相关值保留为默认值是可以接受的，但对于更大的网络，强烈建议手动设置这些值。由于 STP 会通过检查网络中网桥的 STP 相关值来选举根桥和根端口，将 STP 设置保留为自动可能会选举出非预期的根桥和根端口，并且在发生硬件故障时可能导致网络无法访问。

:::info
RouterOS 桥接不支持 PVST 及其变体。PVST BPDU（目标 MAC 为 01:00:0C:CC:CC:CD）会被 RouterOS 桥接视为典型的组播数据包。简单来说，它们会经过 RouterOS 桥接/交换转发逻辑，并可能被标记或取消标记。
:::

## 监控 {#monitoring}

---

你可以使用 `/interface/bridge/monitor` 命令查看网桥的 STP 状态，例如：

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

请注意，根桥没有任何根端口，只有指定端口。

你可以使用 `/interface/bridge/port/monitor` 命令查看网桥端口的 STP 状态，例如：

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

请注意，`root-bridge-id` 由网桥优先级和网桥的 MAC 地址组成；对于非根网桥，根桥将显示为 `designated-bridge`。

:::warning
当使用将 802.1Q 设置为 EtherType 的网桥时，它们会向 01:80:C2:00:00:00 发送 BPDU，这些 BPDU 由 MSTP、RSTP 和 STP 使用。当使用 802.1ad 作为网桥 VLAN 协议时，BPDU 与 802.1Q 网桥不兼容，并且会发送到 01:80:C2:00:00:08。如果二层网络中存在不同的网桥 VLAN 协议，则 (R/M)STP 将无法正常工作。
:::

## STP 和 RSTP {#stp-and-rstp}

---

STP 和 RSTP 在许多网络中被广泛使用，但由于 RSTP 的优势，几乎所有网络都已切换到仅使用 RSTP。STP 是一种非常旧的协议，其收敛时间（完全学习网络拓扑变化并继续正确转发流量所需的时间）可长达 50 秒。RSTP 的收敛时间要短得多，只需几秒甚至几毫秒。建议使用 RSTP 而不是 STP，因为它快得多，并且还向后兼容 STP。RSTP 更快的原因之一是可能出现的端口状态减少了，以下是可能的 STP 端口状态列表：

- **Forwarding** - 端口参与流量转发并学习 MAC 地址，同时接收 BPDU。
- **Listening** - 端口不参与流量转发，也不学习 MAC 地址，同时接收 BPDU。
- **Learning** - 端口不参与流量转发，但会学习 MAC 地址。
- **Blocking** - 由于端口导致环路而被阻塞，但仍接收 BPDU。
- **Disabled** - 端口已禁用或处于非活动状态。

在 RSTP 中，disabled、listening 和 blocking 端口状态被替换为仅一个称为 **Discarding** 的状态：

- **Forwarding** - 端口参与流量转发、学习 MAC 地址并接收 BPDU（forwarding=yes）。
- **Learning** - 端口不参与流量转发，但会学习 MAC 地址（learning=yes）。
- **Discarding** - 端口不参与流量转发、不学习 MAC 地址，并接收 BPDU（forwarding=no）。

在 STP 中，端口主要按状态分类（例如 Forwarding、Listening、Learning、Blocking、Disabled）。端口行为根据生成树算法动态确定，但不会显式分配角色。转发或阻塞流量的逻辑源自对根桥、根端口和指定端口的计算，但这些被视为生成树拓扑的一部分，而不是正式化的端口角色。RSTP 明确定义了端口角色，并引入了备份路径的概念，这些路径通过 Alternate Port 和 Backup Port 角色显式表示。这些角色在 STP 中不存在，因为 STP 对阻塞端口进行通用处理，没有区分它们作为潜在备份的功能。

以下是 RSTP 协议的端口角色细分：

- **Root Port** - 朝向根桥并具有到根桥的最佳（最低开销）路径的端口。每个网桥只选举一个根端口（根桥本身除外）。
- **Designated Port** - 背向根桥并将流量从根桥转发到下游设备的端口。
- **Alternate Port** - 朝向根桥但不会转发流量的端口。如果当前根端口发生故障，该端口提供通往根桥的备份路径。
- **Backup Port** - 背向根桥但不会转发流量的端口。该端口充当同一网段上指定端口的备份。
- **Disabled Port** - 已禁用或非活动的端口。

在 STP 中，网桥之间的连通性通过邻居网桥之间发送和接收 BPDU 来确定。指定端口会向根端口发送 BPDU。如果连续 3 个 **HelloTime** 周期未收到 BPDU，则认为连接不可用，并将开始网络拓扑收敛。在某些场景中，可以通过减少 `forward-delay` 计时器来缩短 STP 收敛时间，该计时器决定端口可处于 learning/listening 状态的时间。

在 RouterOS 中，可以指定哪些网桥端口是边缘端口。边缘端口是不应接收任何 BPDU 的端口。这很有益，因为它允许 STP 跳过 learning 和 listening 状态，直接进入 forwarding 状态。此功能有时称为 **PortFast**。你可以将此参数保留为默认值 **auto**，也可以手动指定。对于其后不应再有网桥的端口，可以手动将端口设置为边缘端口。通常，这些是接入端口。

此外，网桥端口 `point-to-point` 指定网桥端口是否通过点对点链路连接到网桥，以便在发生故障时更快收敛。将此属性设置为 `yes`，即强制该链路为点对点链路，这会跳过检查机制，该机制会检测并等待来自此单条链路上其他设备的 BPDU。将此属性设置为 `no`，表示该链路可以接收来自多个设备的 BPDU。将此属性设置为 `yes`，可显著改善 (R/M)STP 收敛时间。通常，只有在链路之间可能连接另一台设备时，才应将此属性设置为 `no`。这主要与无线介质和以太网集线器相关。如果以太网链路是全双工，`auto` 会启用点对点功能。当 `protocol-mode` 设置为 `none` 时，此属性无效。

### 默认值 {#default-values}

创建网桥或向网桥添加端口时，RouterOS 分配的默认值如下：

- 默认网桥优先级：**32768** / **0x8000**
- 默认网桥端口路径开销：**基于接口速率**
- 默认网桥端口优先级：**0x80**
- BPDU 消息年龄增量：**1**
- HelloTime：**2**
- 默认最大消息年龄：**20**

网桥接口设置 `port-cost-mode` 会更改桥接端口的端口 `path-cost` 和 `internal-path-cost` 模式，使用基于接口速率的自动值。此设置不会影响已手动配置 `path-cost` 或 `internal-path-cost` 属性的桥接端口。以下示例说明了特定数据速率对应的 path-cost（中间速率按比例计算）：

| 数据速率 | 长 | 短 |
| :-- | :-- | --: |
| 10 Mbps | 2,000,000 | 100 |
| 100 Mbps | 200,000 | 19 |
| 1 Gbps | 20,000 | 4 |
| 10 Gbps | 2,000 | 2 |
| 25 Gbps | 800 | 1 |
| 40 Gbps | 500 | 1 |
| 50 Gbps | 400 | 1 |
| 100 Gbps | 200 | 1 |

对于绑定接口，会应用所有绑定成员端口中最大的 `path-cost`，该值不受绑定总链路速率的影响。对于虚拟接口（例如 VLAN、EoIP、VXLAN）以及 wifi、wireless 和 60GHz 接口，长模式下会分配 `path-cost` 为 20,000，短模式下为 10。对于动态桥接的接口（例如 wifi、wireless、PPP、VPLS），`path-cost` 在长模式下默认为 20,000，在短模式下默认为 10。但是，这可以由动态向网桥添加接口的服务手动覆盖，例如使用 CAPsMAN 的 `datapath.bridge-cost` 设置。7.13 之前的 RouterOS 版本不会根据链路速率更改端口路径开销；对于 10M、100M、1000M 和 10000M 链路速率，向网桥添加端口时的默认路径开销值始终为 **10**。

BPDU 的年龄由 BPDU 经过的网桥数量乘以消息年龄决定，因为 RouterOS 使用 **1** 作为消息年龄增量，所以 BPDU 数据包可以经过 `max-message-age` 参数指定的那么多网桥。默认情况下，此值设置为 **20**。这意味着经过第 20 个网桥后，BPDU 数据包将被丢弃，下一个网桥将成为根桥。请注意，如果设置了 `max-message-age=20`，则很难预测第 21 个网桥上的哪些端口将成为指定端口，并可能导致流量无法正确转发。

:::warning
如果使用网桥过滤规则，请确保允许目的 MAC 地址为 **01:80:C2:00:00:00** 的数据包，因为这些数据包携带对 STP 正常工作至关重要的 BPDU。
:::

### 选举过程 {#election-process}

要在网络中正确配置 STP，你需要了解选举过程以及哪些参数以何种顺序参与。在 RouterOS 中，根桥将按以下特定顺序基于最小优先级和最小 MAC 地址选举：

1. 网桥优先级（最低）。
2. 网桥 MAC 地址（最低）。

在 RouterOS 中，根端口按以下特定顺序基于最低根端口路径开销、最低网桥标识符和最低网桥端口 ID 选举：

1. 根端口路径开销（最低）
2. 网桥标识符（最低）
3. 网桥端口 ID（最低）

首先，当设备考虑将其哪个端口选举为根端口时，它会检查其端口所见的**根路径开销**。如果两个或多个端口的根路径开销相同，则将检查**上游**设备的**网桥标识符**，连接到最低网桥标识符的端口将成为根端口。如果在两个或多个端口上看到相同的网桥标识符，则将检查**上游**设备的**网桥端口 ID**。

## 属性说明 {#explanation-of-attributes}

根路径开销：所有网桥都有一个根路径开销。根桥的根路径开销为 0。对于所有其他网桥，它是最低开销路径上到根桥的各端口路径开销之和。你可以在 `/interface/bridge/port` 下修改本地端口路径开销。
网桥标识符是“网桥优先级”和“网桥 MAC”的组合，可在 `/interface/bridge` 下配置。

网桥端口 ID 是“唯一 ID”和“网桥端口优先级”的组合。唯一 ID 在将网桥端口添加到网桥时自动分配。它无法编辑。可在 WinBox 的“Bridge Port”的“Port Number”列中查看，或使用 `/interface/bridge/port/monitor` 以 `port-number` 查看。

:::tip 理解 STP 端口选举
确保将路径开销和优先级应用到正确的端口：

- **Path Cost** 影响*朝向*根桥的端口。（在根桥端口上设置路径开销没有效果）。
- **Port Priority** 影响*背向*根桥的端口。
- **Bridge Identifier** 不影响设备自身根端口的选举；它会影响*下游*设备的根端口选举。
:::

:::warning 网桥优先级兼容性
RouterOS 允许将网桥优先级设置为 0 到 65535 之间的任意值。但是，IEEE 802.1W 标准严格要求网桥优先级以 4096 为步长。为避免与其他厂商设备不兼容，请**仅**使用以下优先级值：
`0, 4096, 8192, 12288, 16384, 20480, 24576, 28672, 32768, 36864, 40960, 45056, 49152, 53248, 57344, 61440`
:::

### 示例 {#examples}

#### 根路径开销示例 {#root-path-cost-example}

![Root Path](/img/3683697e750a8f2f.webp)

此示例概述了根路径开销的工作方式。SW1 将成为根桥，因为它具有最低的优先级 0x1000。每个网桥都会计算到根桥的路径开销。计算根路径开销时，网桥会考虑其端口上配置的路径开销 + 邻居网桥通告的根路径开销。

**SW1**：由于它是根桥，即使配置的路径开销为 10，它也会向邻居通告根路径开销为 0。

**SW2:****ether1** 的根路径开销为 0 + 25=**25**。在 **ether2** 路径上，开销将为 10+10+10+0=**30**

**SW3:** **ether2** 的根路径开销为 0 + 10=**10**。在 **ether4** 路径上，路径开销将为 10+5+25+0=**40**

**SW4:** **ether1** 的根路径开销为 0+25+5=**30**。在 **ether4** 上，路径开销将为 10+10+0=**20**。

具有最低路径开销的端口将被选举为根端口。STP 拓扑中的每个网桥都需要一条通往根桥的路径。找到最佳路径后，冗余路径将被阻塞，在本例中，即 SW2 和 SW4 之间的路径。

:::warning
你可以在根桥上配置路径开销，但只有当该网桥失去根状态时才会考虑它。
:::

#### STP 示例 {#stp-example}

![STP Example 1](/img/4c8bc04b481c916d.webp)

在此示例中，我们希望确保从 ServerA 到 ServerB 的连接具备二层冗余。如果某个端口连接到不是网桥且未运行 (R)STP 的设备，则该端口被视为边缘端口。在本例中，ServerA 和 ServerB 连接到边缘端口。通过在网络中使用 STP 可以实现这一点。以下是每个交换机的配置示例：

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

在此示例中，**SW1** 是根桥，因为它具有最低的网桥优先级。**SW2** 和 **SW3** 的 ether1、ether2 连接到根桥，ether3 连接到 **SW4**。当所有交换机正常工作时，流量将从 ServerA 经过 SW1\_ether2、SW2 和 SW4 流向 ServerB。如果 **SW1** 发生故障，**SW2** 将因次低优先级而成为根桥，如图中虚线所示。以下是每个交换机的端口及其角色列表：

- **root-port** - SW2\_ether2、SW3\_ether2、SW4\_ether1
- **alternate-port** - SW2\_ether1、SW3\_ether1、SW4\_ether2
- **designated-port** - SW1\_ether1、SW1\_ether2、SW1\_ether3、SW1\_ether4、SW1\_ether5、SW2\_ether3、SW3\_ether3、SW4\_ether3

:::note
**注意：** 根据 802.1Q 建议，应使用以 4096 为步长的网桥优先级。要设置建议的优先级，使用十六进制表示法更方便，例如，0 为 0x0000，4096 为 0x1000，8192 为 0x2000，依此类推（0..F）。
:::

## 多生成树协议 {#multiple-spanning-tree-protocol}

---

多生成树协议 (MSTP) 用于网桥接口，以确保跨多个 VLAN 的无环拓扑。MSTP 还可以提供二层冗余，并可用作 VLAN 的负载均衡技术，因为它能够为不同 VLAN 使用不同路径。MSTP 的运行方式与 (R)STP 非常相似，并且 (R)STP 的许多概念都可以应用于 MSTP；强烈建议在使用 MSTP 之前理解 (R)STP 的原理，但在设计启用 MSTP 的网络时，必须考虑一些差异。

在使用 (R)STP 的情况下，BPDU 会在网桥中的所有物理接口上发送，以确定环路，并在端口导致环路时阻止其转发流量。如果某个 VLAN 内存在环路，(R)STP 可能无法检测到。某些 STP 变体通过在每个 VLAN 上运行一个 STP 实例 (PVST) 来解决此问题，但这已被证明效率低下；还有一些 STP 变体通过在所有 VLAN 上运行单个 STP 实例 (CST) 来解决此问题，但它无法为每个 VLAN 或 VLAN 组进行负载均衡。MSTP 倾向于通过使用 MST 实例来解决这两个问题，这些实例可以定义一组 VLAN（VLAN 映射），用于负载均衡和冗余，这意味着每个 VLAN 组可以有不同的根桥和不同的路径。请注意，将多个 VLAN 分组到单个实例中有利于减少每次网络拓扑变化时的 CPU 周期数。

:::danger
在启用 MSTP 的 RouterOS 中，网桥优先级是 CIST 的根桥优先级。如 IEEE 802.1Q 标准所述，网桥优先级必须以 4096 为步长，最低的 12 位会被忽略。以下是有效的网桥优先级：0、4096、8192、12288、16384、20480、24576、28672、32768、36864、40960、45056、49152、53248、57344、61440。设置无效的网桥优先级时，RouterOS 会发出警告并将该值截断为有效值，但会在配置中保存原始值，因为无效的网桥优先级值仍可在运行 RouterOS 的设备之间的 (R)STP 中使用，不过建议改用有效的网桥优先级。
:::

### MSTP 区域 {#mstp-regions}

MSTP 以称为区域的组来工作。每个区域都会有一个区域根桥，并且在区域之间会选举一个根桥。MSTP 将使用内部生成树 (IST) 构建区域内的网络拓扑，并使用公共生成树 (CST) 在区域外构建多个区域之间的网络拓扑。MSTP 将这两种协议合并为公共和内部生成树 (CIST)，它保存有关区域内和区域间拓扑的信息。从 CST 的角度来看，一个区域似乎是一个单一的虚拟网桥，因此 MSTP 被认为对大型网络非常具有可扩展性。要使网桥处于同一区域，它们的配置必须匹配。BPDU 不会包含 VLAN 映射，因为映射可能很大，而是会传输计算出的哈希值。如果网桥通过某个端口收到 BPDU 且配置不匹配，则 MSTP 会将该端口视为边界端口，并认为它可用于到达其他区域。以下是 MSTP 认为 BPDU 来自同一区域所需匹配的参数列表：

- 区域名称
- 区域修订版本
- 到 MST 实例 ID 的 VLAN 映射（计算出的哈希）

可以创建不带区域的启用 MSTP 网络，但要能够按 VLAN 组进行负载均衡，网桥需要从与其连接且具有上述相同参数的网桥接收 BPDU。在 RouterOS 中，默认区域名称为空，区域修订版本为 0，这些都是有效值，但你必须确保它们匹配，才能让多个网桥处于同一个 MSTP 区域。如果区域中的网桥分散在网络中，则该区域无法存在；这些网桥必须至少以一种方式连接，使它们能够在不离开区域的情况下发送和接收 BPDU。例如，如果一台具有不同区域相关参数的网桥位于两台具有相同区域相关参数的网桥之间，那么将至少存在 3 个不同的 MSTP 区域。

![MSTP Topology](/img/77a9b366354f5ae5.webp)

将每个网桥都运行在单个 MSTP 区域中的缺点是 CPU 周期过多。相比之下，PVST(+) 会为网络中存在的每个 VLAN ID 创建一个生成树实例；由于网络中可能存在的路径非常有限，这种方法会产生大量开销和不必要的 CPU 周期。这也意味着这种方法可扩展性不佳，并且可能使 CPU 性能不是很强的交换机过载。MSTP 通过将网络划分为 MSTP 区域来解决此问题：此区域内的每个网桥将交换并处理同一区域内存在的 VLAN 信息，但会在后台运行单个生成树协议实例，以维护区域之间的网络拓扑。此方法已被证明更加有效且更具可扩展性。这意味着对于较大的网络，应使用区域来减少 CPU 周期。

在区域中，你可以定义 MST 实例，用于配置按 VLAN 组的负载均衡并选举区域根桥。值得注意的是，每个区域中都存在一个预定义的 MST 实例，在大多数文档中称为 **MSTI0**· 此 MST 实例被视为默认 MST 实例。有一些参数适用于此特殊 MST 实例。当流量经过启用 MSTP 的网桥时，MSTP 会查找具有匹配 VLAN 映射的 MST 实例；但如果某个 VLAN ID 不存在 VLAN 映射，则流量将归入 **MSTI0**。

:::warning
由于 MSTP 要求启用网桥接口上的 VLAN 过滤，因此请确保你已在 `/interface/bridge/vlan` 中允许所有必需的 VLAN ID；否则，流量将不会被转发，并且可能看起来像是 MSTP 配置错误，尽管这实际上是 VLAN 过滤配置错误。
:::

### 选举过程 {#election-process-1}

MSTP 中的选举过程可以分为两部分：区域内和区域间。要使 MSTP 正常工作，始终需要有一个区域根，即区域内的根桥，以及一个 CIST 根，即区域之间的根桥。区域根是区域内的根桥，需要区域根桥来正确设置区域内 VLAN 组的负载均衡。CIST 根将用于配置哪些端口将成为替代/备份端口（非活动），以及哪些端口将成为根端口（活动）。

:::warning
在区域之间，没有按 VLAN 组的负载均衡，也没有根端口选举过程，并且 MSTP 区域之间的端口阻塞方式与 (R)STP 中相同。如果 CIST 已阻塞 MSTP 区域内的某个端口以防止 MSTP 区域之间的流量环路，则该端口仍可对 IST 保持活动，以便在 MSTP 区域内按 VLAN 组进行负载均衡。
:::

- 以下参数参与在 MSTP 区域内选举区域根桥或根端口：

| 属性 | 描述 |
| :-- | :-- |
| **priority** (*integer：0..65535 十进制格式或 0x0000-0xffff 十六进制格式*；默认值：**32768 / 0x8000**) | `/interface/bridge/msti`，MST 实例优先级，用于在 MSTP 区域内选举区域根。必须以 4096 (0x1000) 为步长设置；最低 12 位会被忽略。有效值：0x0000、0x1000、0x2000、...、0xf000（或十进制等价值：0、4096、8192、...、61440）。 |
| **internal-path-cost** (*integer：1..200000000*；默认值： ) | `/interface/bridge/port`，未知 VLAN ID (MSTI0) 到区域根的路径开销，用于 MSTP 区域内的根端口。 |
| **priority** (*0x00 \| 0x10 \| 0x20 \| 0x30 \| 0x40 \| 0x50 \| 0x60 \| 0x70 \| 0x80 \| 0x90 \| 0xa0 \| 0xb0 \| 0xc0 \| 0xd0 \| 0xe0 \| 0xf0*；默认值：**0x80**) | `/interface/bridge/port/mst-override`，为定义的 MST 实例设置 MST 端口优先级，用于区域根桥上的网桥端口。必须以 16 (0x10) 为步长设置。 |
| **internal-path-cost** (*integer：1..200000000*；默认值： ) | `/interface/bridge/port/mst-override`，为定义的 MST 实例设置 MST 端口路径开销，用于 MSTP 区域内的非根网桥端口。 |

- 以下参数参与选举 CIST 根桥或 CIST 根端口：

| 属性 | 描述 |
| :-- | :-- |
| **priority** (*integer：0..65535 十进制格式或 0x0000-0xffff 十六进制格式*；默认值：**32768 / 0x8000**) | `/interface/bridge`，CIST 网桥优先级，用于选举 CIST 根桥。必须以 4096 (0x1000) 为步长设置；最低 12 位会被忽略。 |
| **priority** (*0x00 \| 0x10 \| 0x20 \| 0x30 \| 0x40 \| 0x50 \| 0x60 \| 0x70 \| 0x80 \| 0x90 \| 0xa0 \| 0xb0 \| 0xc0 \| 0xd0 \| 0xe0 \| 0xf0*；默认值：**0x80**) | `/interface/bridge/port`，CIST 端口优先级，用于在 CIST 根桥上选举 CIST 根端口。必须以 16 (0x10) 为步长设置。 |
| **path-cost** (*integer：1..200000000*；默认值： ) | `/interface/bridge/port`，CIST 端口路径开销，用于在 CIST 非根网桥端口上选举 CIST 根端口。 |

:::warning
MSTP 检查选举根桥/根端口所依据的参数顺序与 (R)STP 中相同，你可以阅读 (R)STP 选举过程一节了解更多信息。
:::

### MST 实例 {#mst-instance}

**子菜单：** `/interface/bridge/msti`

此部分用于将多个 VLAN ID 分组到单个实例中，以便为 MSTP 区域内的每个 VLAN 组创建不同的根桥。

| 属性 | 描述 |
| :-- | :-- |
| **bridge** (*text*；默认值： ) | MST 实例分配到的网桥。 |
| **identifier** (*integer：1..31*；默认值： ) | MST 实例标识符。 |
| **priority** (*integer：0..65535 十进制格式或 0x0000-0xffff 十六进制格式*；默认值：**32768 / 0x8000**) | MST 实例优先级用于确定 MSTP 区域中一组 VLAN 的根桥。 |
| **vlan-mapping** (*integer：1..4094*；默认值： ) | 要分配给 MST 实例的 VLAN ID 列表。此设置接受 VLAN ID 范围以及逗号分隔的值。例如 `vlan-mapping=100-115,120,122,128-130` |

### MST 覆盖 {#mst-override}

**子菜单：** `/interface/bridge/port/mst-override`

此部分用于为 MSTP 区域内的每个 VLAN 映射选择所需路径。

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认值：**no**) | 条目是否已禁用。 |
| **internal-path-cost** (*integer：1..200000000*；默认值： ) | MST 实例 VLAN 映射的路径开销，用于面向根桥的 VLAN 以操纵路径选择；路径开销越低越优先。 |
| **identifier** (*integer：1..31*；默认值： ) | MST 实例标识符。 |
| **priority** (*integer：0..240*；默认值：**128**) | MST 实例 VLAN 的优先级，用于背向根桥的 VLAN 以操纵路径选择；优先级越低越优先。 |
| **interface** (*name*；默认值： ) | 要使用已配置的 MST 实例 VLAN 映射以及定义的路径开销和优先级的端口名称。 |

### 监控 {#monitoring-1}

与 (R)STP 类似，也可以监控 MSTP 状态。通过监控网桥接口本身，可以查看当前的 CIST 根桥以及 MSTI0 的当前区域根桥。还可以查看 MST 实例标识符和 VLAN 映射的计算哈希值。这在确保某些网桥处于同一 MSTP 区域时很有用。以下是监控 MSTP 网桥的示例：

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

在 MSTP 中，可以监控 MST 实例。这对于确定某个 MST 实例和 VLAN 组的当前区域根桥很有用。以下是监控 MST 实例的示例：

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

还可以监控某个 MST 覆盖条目。这在 MSTP 区域中配置根端口和替代/备份端口时，对于确定某个 MST 实例的端口角色很有用。以下是监控 MST 覆盖条目的示例：

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

假设我们需要设计一个拓扑并配置 MSTP，使 VLAN 10、20 沿一条路径转发，而 VLAN 30、40 沿另一条路径转发，同时所有其他 VLAN ID 将沿其中一条路径转发。通过设置 MST 实例并分配端口路径开销，可以轻松完成此操作。以下是一个需要按 VLAN 组进行负载均衡且包含 3 个独立区域的网络拓扑示例：

![MSTP Example](/img/27652a7629c4268f.webp)

按 VLAN 组进行负载均衡的启用 MSTP 网络拓扑

首先将每个接口添加到网桥。最初，应创建一个未启用 VLAN 过滤的 (R)STP 网桥。这是为了防止失去对 CPU 的访问。此示例中的每个设备都按其所在区域 (Rx) 和设备编号 (\_x) 命名。对于较大的网络，由于链路和设备数量众多，配置 MSTP 可能会令人困惑。我们建议使用 The Dude 来监控和设计网络拓扑。

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

- 确保在这些设备上允许所需的 VLAN ID。这里我们假设每个设备都会收到需要按 VLAN 组进行负载均衡的带标签流量。在 **R1\_1**、**R1\_3**、**R2\_1**、**R2\_3**、**R3\_1**、**R3\_3** 上使用以下命令：

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
请确保将所有需要的 VLAN ID 和端口添加到网桥 VLAN 表中，否则你的设备将不会转发所有必需的 VLAN，和/或你将失去对设备的访问。
:::

我们需要为希望处于同一 MSTP 区域的每个网桥分配区域名称。你也可以指定区域修订版本，但它是可选的，不过它们需要匹配。在此示例中，如果所有网桥具有相同的区域名称，那么它们都将处于单个 MSTP 网桥中。在本例中，我们希望将一组 3 个网桥分到不同的 MSTP 区域，以便按 VLAN 组进行负载均衡并实现多样性和可扩展性：

- 为每个网桥设置适当的区域名称（和区域修订版本），并在每台设备上使用以下命令（**更改区域名称！**）：

```ros
/interface/bridge
set bridge region-name=Rx region-revision=1
```

创建 3 个不同的 MSTP 区域后，我们需要决定哪台设备将作为每个 VLAN 组的区域根。为了一致性，我们将把每个区域中的第一台设备 (\_1) 设置为 VLAN 10、20 的区域根，并把每个区域中的第三台设备 (\_3) 设置为 VLAN 30、40 的区域根。这可以通过为每个 VLAN 组创建 MST 实例并为其分配网桥优先级来完成。MST 实例标识符仅在 MSTP 区域内部相关；在 MSTP 区域外部，这些标识符可以不同，并映射到不同的 VLAN 组。

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

现在我们需要为每个 MST 实例覆盖端口 `path-cost` 和/或端口优先级。这可以通过为每个端口和每个 MST 实例添加 MST 覆盖条目来完成。要使某个 MST 实例的流量流路径不同，我们只需确保端口路径开销和/或优先级更大。我们可以增加端口路径开销，或减少面向区域根桥的端口的端口路径开销。增加还是减少所有值并不重要；重要的是最终一个端口的路径开销要大于另一个端口。

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

在这种情况下，对于 VLAN 10、20 从第一台设备到达第三台设备，它会在 ether1 和 ether2 之间选择，其中一个端口将被阻塞并设置为替代端口；ether1 的路径开销为 `5+9=14`，ether2 的路径开销为 `10`，ether2 将被选举为第三台设备上 MSTI1 的根端口。对于 VLAN 30、40 从第三台设备到达第一台设备的情况，ether1 的路径开销为 `5+9=14`，ether2 的路径开销为 `15`，ether1 将被选举为第三台设备上 MSTI2 的根端口。

现在我们可以为 **MSTI0** 配置根端口，它将涵盖所有未分配给特定 MST 实例的 VLAN，例如我们示例中的 VLAN 10、20 和 VLAN 30、40。要配置此特殊 MST 实例，你需要为网桥端口指定 `internal-path-cost`。此值仅与 MSTP 区域相关，在 MSTP 区域外没有任何效果。在此示例中，我们将选择让所有未知 VLAN 沿与 VLAN 30、40 相同的路径转发，只需增加其中一个端口的路径开销即可。

- 在 **R1\_3**、**R2\_3**、**R3\_3** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether3] internal-path-cost=25
```

至此，可以认为单区域 MSTP 已配置完成；一般来说，MSTP 已完全可用。强烈建议配置 CIST 部分，但出于测试目的，可以保留默认值。在进行任何测试之前，你需要在所有网桥上启用 MSTP。

- 在**所有**设备上使用以下命令：

```ros
/interface/bridge
set bridge protocol-mode=mstp vlan-filtering=yes
```

配置 MSTP 区域后，你可以通过转发流量来检查它们是否配置正确，例如，从第一台设备向第三台设备发送带标签流量，并更改带标签流量的 VLAN ID，以观察基于 VLAN ID 的不同路径。当此功能按预期工作时，你可以继续配置 CIST 相关参数，以选举 CIST 根桥和 CIST 根端口。为了一致性，我们将选择第一个区域中的第一台设备作为 CIST 根桥；并且为了确保故障时的一致性，我们可以为所有其他网桥设置更高的优先级。

- 在 **R1\_1** 上使用以下命令：

```ros
/interface/bridge
set bridge priority=0x1000
```

- 在 **R1\_2** 上使用以下命令：

```ros
/interface/bridge
set bridge priority=0x2000
```

- ...

- 在 **R3\_3** 上使用以下命令：

```ros
/interface/bridge
set bridge priority=0x9000
```

我们还需要在每个网桥上选举一个根端口；为简单起见，我们将选择最接近 **R1\_1** 且跳数最少的端口作为根端口。此时，选举根端口的过程与 (R)STP 中的过程相同。

- 在 **R3\_3** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether2] path-cost=30
set [find where interface=ether3] path-cost=40
set [find where interface=ether4] path-cost=20
```

- 在 **R1\_3** 和 **R2\_3** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether2] path-cost=20
set [find where interface=ether3] path-cost=30
```

- 在 **R1\_2** 上使用以下命令：

```ros
/interface/bridge/port
set [find where interface=ether1] path-cost=30
```
