---
title: "Nv2"
description: "Nv2 是 MikroTik 专有的无线协议，使用 TDMA 在 PtMP 网络中实现高效的介质访问，支持 Atheros 802.11n 设备和传统设备，无需升级硬件。它提供动态速率选择、QoS、加密、RADIUS 认证和同步功能，但与其他无线协议不兼容。"
tags:
  - 'nv2'
  - 'tdma'
  - 'qos'
source: https://manual.mikrotik.com/docs/7.24/wireless/abgn/nv2
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Nv2 是 MikroTik 开发的专有无线协议，用于 Atheros 802.11 无线芯片。它基于 TDMA（Time Division Multiple Access）介质访问技术，而非普通 802.11 设备使用的 CSMA（Carrier Sense Multiple Access）技术。TDMA 解决了隐藏节点问题，并提高了介质利用率，从而获得更好的吞吐量和延迟，尤其是在 PtMP 网络中。

Nv2 支持 Atheros 802.11n 芯片，以及从 AR5212 开始的旧版 802.11a/b/g 芯片，但不支持更早的 AR5211 和 AR5210 芯片。这意味着 11n 设备和旧版设备都可以加入同一网络，实施 Nv2 无需升级硬件。

Nv2 网络中的介质访问由 Nv2 Access Point 控制。AP 将时间划分为固定大小的“周期”，然后根据 AP 和客户端上的队列状态，动态将其拆分为下行链路（AP 到客户端）和上行链路（客户端到 AP）部分。上行链路时间再根据连接客户端的带宽需求在客户端之间进一步分配。在每个周期开始时，AP 会广播一个调度表，告知客户端何时发送以及可使用多少时间。

为允许新客户端连接，Nv2 AP 会定期为“未指定”客户端分配上行链路时间。新客户端使用该时间间隔发起与 AP 的注册。随后 AP 估算自身与客户端之间的传播延迟，并开始定期为该客户端调度上行链路时间，以完成注册并接收数据。

Nv2 按客户端实施动态速率选择，并对数据传输使用 ARQ，从而在 Nv2 链路上实现可靠通信。

在 QoS 方面，Nv2 支持可变数量的优先级队列，并内置默认 QoS 调度器。可通过基于防火墙规则的细粒度 QoS 策略，或使用 VLAN 优先级或 MPLS EXP 位在网络中传播的优先级信息对其进行补充。

Nv2 协议每个接口最多支持 511 个客户端。

## Nv2 协议实现状态 {#nv2-protocol-implementation-status}

Nv2 包含以下功能：

| 功能 | 描述 |
|---|---|
| TDMA 媒体访问 | 用于媒体控制的时分多址 |
| WDS 支持 | 无线分布式系统兼容性 |
| QoS 支持 | 可变数量的优先级队列 |
| 数据加密 | 对传输数据进行加密 |
| RADIUS 认证 | 基于 RADIUS 的认证功能 |
| 统计字段 | 可用的统计和报告字段 |
| 固定下行模式 | 支持固定下行运行 |
| 上行/下行比例 | 支持配置上行/下行比例 |
| Nv2 AP 同步 | AP 同步的实验性支持 |

## 与其他无线协议的兼容性和共存 {#compatibility-and-coexistence-with-other-wireless-protocols}

Nv2 协议不兼容也不基于任何其他可用的无线协议或实现，无论是基于 TDMA 的还是其他类型。这意味着**只有支持并启用 Nv2 的设备才能加入 Nv2 网络**。

普通 802.11 设备无法识别或连接到 Nv2 AP。支持 Nv2 的 RouterOS 设备（即运行 RouterOS 5.0rc1 或更高版本）在执行 scan 命令时会看到 Nv2 AP，但只有正确配置后才会连接到 Nv2 AP。

由于 Nv2 不使用 CSMA 技术，它可能会干扰在同一信道上运行的其他网络。同样，其他网络也可能干扰 Nv2 网络，因为每个非 Nv2 信号都会被视为噪声。

关于兼容性和共存的关键点如下：

* 只有 RouterOS 设备可以加入 Nv2 网络。
* 只有 RouterOS 设备在扫描时会看到 Nv2 AP。
* Nv2 网络会干扰同一信道上的其他网络。
* Nv2 网络可能受到同一信道上任何其他网络的影响，无论其是否为 Nv2。
* 启用 Nv2 的设备不会连接到任何其他基于 TDMA 的网络。

## Nv2 与 Nstreme 和 802.11 的比较 {#how-nv2-compares-with-nstreme-and-80211}

### Nv2 与 802.11 对比 {#nv2-vs-80211}

Nv2 与 802.11 的主要区别：

* 介质访问由 AP 调度，这消除了隐藏节点问题，并可实现集中式介质访问策略，AP 控制每个客户端使用的时间，并可根据策略为客户端分配时间，而不是由每台设备争用介质访问。
* 降低传播延迟开销，Nv2 中没有逐帧 ACK，这显著提高了吞吐量，尤其是在远距离链路上，数据帧和随后 ACK 帧的传播延迟会明显降低介质使用效率。
* 降低每帧开销，Nv2 实现帧聚合和分片，以最大限度利用分配的介质并减少每帧开销（帧间间隔、前导码）。

### Nv2 与 Nstreme 对比 {#nv2-vs-nstreme}

Nv2 与 Nstreme 的主要区别：

* 降低轮询开销，Nv2 AP 不逐个轮询客户端，而是广播上行链路调度，为多个客户端分配时间；这可视为“组轮询”，不会浪费时间逐个轮询客户端，从而留出更多时间用于实际数据传输。这可提高吞吐量，尤其是在 PtMP 配置中。
* 降低传播延迟开销，Nv2 不必逐个轮询客户端，因此可根据到客户端的估计距离（传播延迟）创建上行链路调度，使介质使用最为有效。这可提高吞吐量，尤其是在 PtMP 配置中。
* 更好地控制延迟，降低开销、可调整的周期大小和 QoS 功能可更好地控制网络中的延迟。

## 配置 Nv2 {#configuring-nv2}

**wireless-protocol** 设置控制选择并使用哪种无线协议。请注意，该设置的含义取决于接口角色（AP 或客户端），而接口角色取决于接口 **mode** 设置。请在下表中查看 **wireless-protocol** 的可能值及其含义。

| value | AP | client |
| :-- | :-- | :-- |
| unspecified | 根据旧的 **nstreme** 设置建立 nstreme 或 802.11 网络 | 根据旧的 **nstreme** 设置连接到 nstreme 或 802.11 网络 |
| any | 与 **unspecified** 相同 | 扫描所有匹配的网络，无论使用何种协议，并使用所选网络的协议进行连接 |
| 802.11 | 建立 802.11 网络 | 仅连接到 802.11 网络 |
| nstreme | 建立 Nstreme 网络 | 仅连接到 Nstreme 网络 |
| Nv2 | 建立 Nv2 网络 | 仅连接到 Nv2 网络 |
| Nv2-nstreme-802.11 | 建立 Nv2 网络 | 扫描 Nv2 网络，如果找到合适的网络则连接；否则扫描 Nstreme 网络，如果找到合适的网络则连接；否则扫描 802.11 网络，如果找到合适的网络则连接。 |
| Nv2-nstreme | 建立 Nv2 网络 | 扫描 Nv2 网络，如果找到合适的网络则连接；否则扫描 Nstreme 网络，如果找到合适的网络则连接 |

请注意，**wireless-protocol** 值 **Nv2-nstreme-802.11** 和 **Nv2-nstreme** **不**表示某种混合协议或特殊协议类型；实现这些值是为了在客户端必须连接的网络协议可能发生变化时简化客户端配置。使用这些值有助于将网络迁移到 Nv2 协议。

大多数 Nv2 设置仅对 Nv2 AP 有意义；Nv2 客户端会自动从 AP 适配必要的设置。以下设置与 Nv2 AP 相关：

* **Nv2-queue-count** - 指定 Nv2 网络中使用的优先级队列数量。详情请参阅 [QoS in Nv2 network](#qos-in-nv2-network)。
* **Nv2-qos** - 控制帧到优先级队列的映射策略。详情请参阅 [QoS in Nv2 network](#qos-in-nv2-network)。
* **Nv2-cell-radius** - 指定 Nv2 网络中到最远客户端的距离，单位为 km。该设置会影响 AP 为客户端发起连接分配争用时间片的大小，以及用于估算到客户端距离的时间片大小。如果该设置过小，较远的客户端可能无法连接，和/或以“ranging timeout”错误断开。尽管在正常运行期间该设置的影响应可忽略，但为了保持最大性能，建议不要在必要时增大该值，以免 AP 预留实际从未使用的时间，而应将其分配给实际数据传输。
* **tdma-period-size** - 指定 Nv2 AP 用于介质访问调度的时间周期大小，单位为 ms。较小的周期可能降低延迟（因为 AP 可以更早为客户端分配时间），但会增加协议开销，从而降低吞吐量。另一方面，增大周期会提高吞吐量，但也会增加延迟。对于特别长的链路，可能需要增大该值以获得可接受的吞吐量。这种必要性可能源于下行链路（从 AP 到客户端）和上行链路（从客户端到 AP）数据之间存在“传播间隔”，在此期间不会发生数据传输。该间隔是必要的，因为客户端必须接收来自 AP 的最后一帧；这发生在 AP 发送后的传播延迟之后，随后客户端才可以发送；因此，来自客户端的帧会在客户端发送后的传播延迟之后到达 AP（因此间隔为传播延迟的两倍）。距离越长，每个周期中所需的传播间隔越大。如果传播间隔占周期的很大一部分，实际吞吐量可能变得不可接受，此时应增大周期大小，但代价是延迟增加。基本上，必须仔细选择该设置的值，以最大化吞吐量，同时将延迟保持在可接受水平。
* **Nv2-mode** - 指定使用动态或固定的下行/上行比例。默认值为“dynamic-downlink”。

“sync-master” - 工作方式与 nv2-mode=fixed-downlink 相同（因此使用 nv2-downlink-ratio），但允许从站同步到该主站；“sync-slave” - 尝试同步到主站（或已同步的从站），并从主站适配 period-size 和 downlink ratio 设置。

* **Nv2-downlink-ratio** - 指定 Nv2 下行比例。上行比例会根据 downlink-ratio 值自动计算。使用 dynamic-downlink 模式时，链路完全饱和也会使用 downlink-ratio。最小值为 20，最大值为 80。默认值为 50。

以下设置在 Nv2 AP 和 Nv2 客户端上均有意义：

* **Nv2-security** - 指定 Nv2 安全模式，详情请参阅 [Security in Nv2 network](#security-in-nv2-network)。
* **Nv2-preshared-key** - 指定要使用的预共享密钥，详情请参阅 [Security in Nv2 network](#security-in-nv2-network)。
* **nv2-sync-secret** - 指定用于 Nv2 同步的密钥。Master 和 Slave 设备上的密钥应匹配，以建立同步状态。

## 迁移到 Nv2 {#migrating-to-nv2}

使用 **wireless-protocol** 设置可以简化现有网络中 Nv2 协议的迁移或评估，并尽可能减少停机时间。建议按以下步骤操作：

* 将 AP 升级到支持 Nv2 的版本，但暂时不要在 AP 上启用 Nv2。
* 将客户端升级到支持 Nv2 的版本。
* 将所有客户端配置为 **wireless-protocol=Nv2-nstreme-802.11**。客户端仍会使用之前使用的协议连接到 AP，因为 AP 尚未切换到 Nv2。
* 在 AP 上配置 Nv2 相关设置。
* 如需使用数据加密和安全认证，请在 AP 和客户端上配置 Nv2 安全相关设置（请参阅 [Security in Nv2 network](#security-in-nv2-network)）。
* 在 AP 上设置 **wireless-protocol=Nv2**。这将使 AP 切换到 Nv2 协议。客户端现在应使用 Nv2 协议连接。
* 如果出现问题，只需在 AP 上将协议改回之前使用的协议，即可轻松回退。
* 微调 Nv2 相关设置，以获得可接受的时延和吞吐量。
* 实施 QoS 策略以获得最佳性能。

基本故障排除指南：

* 客户端连接失败或因“ranging timeout”错误断开连接 - 检查 **Nv2-cell-radius** 设置是否配置正确。
* 长距离链路的信号和速率正常，但吞吐量意外偏低 - 尝试增大 **tdma-period-size** 设置。

## Nv2 AP 同步 {#nv2-ap-synchronization}

该功能通过减少同一位置多个 MikroTik Nv2 AP 之间的干扰，使它们能够更好地共存。该功能会同步相同频率上 AP 的发送/接收时间窗口，使所有已同步的 MikroTik Nv2 AP 在同一时间发送/接收。这样可以在同一位置为多个 AP 复用相同的无线频率，从而为频率规划提供更大的灵活性。

要构建 Nv2 同步配置：

* 对于 Nv2 同步，应选择一个 Master Nv2 AP，并指定“nv2-mode=sync-master”以及“nv2-sync-secret”。
* 对于 Nv2 Slave AP，应使用与 Master AP 相同的无线频率，并指定“nv2-mode=sync-slave”以及与 Master AP 配置中相同的“nv2-sync-secret”。
* 启用 Master AP 后，Slave AP 将尝试通过匹配的“nv2-sync-secret”搜索 Master AP。
* 找到 Master AP 后，Slave AP 将计算到 Master AP 的距离，因为 Master AP 可能不在同一位置。
* 随后 Slave AP 开始作为 AP 运行，并从同步的 Master AP 适配周期大小和下行链路比例。
* 此外，在 Slave AP 开始运行后，其他 Slave AP 可以使用该 Slave AP 进行同步。
* Slave AP 会定期监听 Master AP，检查“nv2-sync-secret”是否仍然匹配，并再次适配参数。如果 Master AP 接口被禁用或启用，所有 Slave 也将被禁用，并从头开始同步过程。
* 如果 Master AP 停止工作，Slave AP 也将停止工作，因为它们没有同步信息。

### 配置示例 {#configuration-example}

Master AP：

```
 /interface/wireless/set wlan1 mode=ap-bridge ssid=Sector1 frequency=5220 nv2-mode=sync-master nv2-preshared-key=clients1 nv2-sync-secret=Tower1
```

Slave AP：

```
 /interface/wireless/set wlan1 mode=ap-bridge ssid=Sector2 frequency=5220 nv2-mode=sync-slave nv2-preshared-key=clients2 nv2-sync-secret=Tower1
```

Slave AP 上的监控接口：

```
[admin@SlaveAP] /interface/wireless> monitor wlan1
                   status: running-ap
                  channel: 5220/20/an
        wireless-protocol: nv2
              noise-floor: -110dBm
       registered-clients: 1
    authenticated-clients: 1
           nv2-sync-state: synced
          nv2-sync-master: 4C:5E:0C:57:84:38
        nv2-sync-distance: 1
     nv2-sync-period-size: 2
  nv2-sync-downlink-ratio: 50
```

Master AP 上的调试日志：

```
 09:22:08 wireless,debug wlan1: 4C:5E:0C:57:85:BE attempts to sync
```

Slave AP 上的调试日志：

```
09:22:08 wireless,debug wlan1: attempting to sync to 4C:5E:0C:57:84:38 
09:22:09 wireless,debug wlan1: synced to 4C:5E:0C:57:84:38 
```

## Nv2 网络中的 QoS {#qos-in-nv2-network}

Nv2 中的 QoS 通过数量可变的优先级队列实现。只有所有更高优先级队列均为空时，才会按照 802.1D-2004 推荐的规则考虑传输某个队列。实际上，这意味着首先发送更高优先级队列中的所有帧，然后才考虑下一个队列。因此，必须谨慎设计 QoS 策略，避免高优先级队列导致低优先级队列饥饿。

Nv2 网络中的 QoS 策略由 AP 控制，客户端从 AP 适配该策略。在 AP 上，QoS 策略通过 **Nv2-queue-count** 和 **Nv2-qos** 参数配置。**Nv2-queue-count** 参数指定使用的优先级队列数量。帧到队列的映射由 **Nv2-qos** 参数控制。

### Nv2-qos=default

在此模式下，内置 QoS 策略算法首先检查出站帧，并根据数据包类型和大小选择队列。如果内置规则不匹配，则根据帧优先级字段选择队列，与 **Nv2-qos=frame-priority** 模式相同。

### Nv2-qos=frame-priority

在此模式下，QoS 队列根据帧优先级字段选择。请注意，帧优先级字段不是报头中的某个字段，因此仅在数据包由给定设备处理时有效。帧优先级字段必须由防火墙规则显式设置，或由帧转发过程根据入站优先级隐式设置，例如根据 MPLS EXP 位设置。有关帧优先级字段的更多信息，请参阅：

* [EXP bit and MPLS Queuing](/docs/user-guides/routing-and-networking-protocols/mpls/exp-bit-and-mpls-queuing)
* [WMM and VLAN priority](/docs/bridging-and-switching/user-guides/wmm-and-vlan-priority)

队列根据帧优先级选择，遵循 802.1D 推荐的用户优先级到流量类别映射。映射取决于可用队列的数量（**Nv2-queue-count** 参数）。例如，如果队列数为 4，映射如下（注意此映射与 WMM 使用的映射相似）：

* 优先级 0,3 -> 队列 0。
* 优先级 1,2 -> 队列 1。
* 优先级 4,5 -> 队列 2。
* 优先级 6,7 -> 队列 3。

如果队列数为 2（默认），映射如下：

* priority 0,1,2,3 -> queue 0。
* priority 4,5,6,7 -> queue 1。

如果队列数为 8（最大可能值），映射如下：

* Priority 1 -> queue 0。
* Priority 2 -> queue 1。
* Priority 0 -> queue 2。
* Priority 3 -> queue 3。
* Priority 4 -> queue 4。
* Priority 5 -> queue 5。
* Priority 6 -> queue 6。
* Priority 7 -> queue 7。

对于其他映射，以及这些映射的依据和推荐做法的讨论，请参阅 802.1D-2004。

## Nv2 网络中的安全 {#security-in-nv2-network}

Nv2 安全实现具有以下特性：

* 使用 AES-CCM 和 128 bit 密钥进行硬件加速数据加密。
* 用于密钥管理的 4-way handshake（类似于 802.11i）。
* Preshared key 认证方法（类似于 802.11i）。
* 定期更新的组密钥（用于广播和多播数据）。

作为专有协议，Nv2 不使用 802.11 的安全机制，因此安全配置有所不同。使用 Nv2 协议的接口会忽略 **security-profile** 设置。安全由以下接口设置配置：

* **Nv2-security** - 该设置启用或禁用 Nv2 网络中的安全功能。请注意，当 AP 启用安全功能时，它不会接受禁用安全功能的客户端。同样，启用安全功能的客户端也不会连接到不安全的 AP。
* **Nv2-preshared-key** - 用于认证的预共享密钥。数据加密密钥在 4-way handshake 期间从预共享密钥派生。两台设备要建立连接，预共享密钥必须相同。如果预共享密钥不同，连接将超时，因为远端无法正确解析密钥交换消息。
