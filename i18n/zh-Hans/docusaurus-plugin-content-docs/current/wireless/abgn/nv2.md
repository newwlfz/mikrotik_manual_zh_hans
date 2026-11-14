---
sidebar_key: "wireless/abgn/nv2"
sidebar_position: 4
title: "Nv2"
sidebar_label: "Nv2"
description: "Nv2 是 MikroTik 专有的无线协议，使用 TDMA 在 PtMP 网络中实现高效的媒体访问，支持 Atheros 802.11n 和传统设备，无需硬件升级。它提供动态速率选择、QoS、加密、RADIUS 认证和同步功能，但与其他无线协议不兼容。"
tags:
  - 'nv2'
  - 'tdma'
  - 'qos'
source: https://manual.mikrotik.com/docs/wireless/abgn/nv2
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Nv2 是 MikroTik 开发的专有无线协议，用于 Atheros 802.11 无线芯片。它基于 TDMA（时分多址）媒体访问技术，而不是普通 802.11 设备使用的 CSMA（载波侦听多路访问）技术。TDMA 解决了隐藏节点问题并提高了媒体使用效率，从而带来更好的吞吐量和延迟——尤其是在 PtMP 网络中。

Nv2 受支持于 Atheros 802.11n 芯片以及从 AR5212 开始的传统 802.11a/b/g 芯片，但不支持较旧的 AR5211 和 AR5210 芯片。这意味着 11n 和传统设备都可以加入同一网络，并且实施 Nv2 无需硬件升级。

Nv2 网络中的媒体访问由 Nv2 接入点控制。AP 将时间划分为固定大小的“周期”，然后根据 AP 和客户端上的队列状态，动态划分为下行（AP 到客户端）和上行（客户端到 AP）部分。上行时间再根据已连接客户端的带宽需求在它们之间分配。每个周期开始时，AP 会广播调度，告知客户端何时应发送以及可以使用多少时间。

为了允许新客户端连接，Nv2 AP 会定期为“未指定”客户端分配上行时间。新客户端使用此间隔向 AP 发起注册。然后，AP 会估计自身与客户端之间的传播延迟，并开始定期为该客户端调度上行时间，以完成注册和接收数据。

Nv2 按客户端实现动态速率选择，并为数据传输实现 ARQ，从而在 Nv2 链路上实现可靠通信。

在 QoS 方面，Nv2 支持可变数量的优先级队列，并内置默认 QoS 调度器。这可以通过基于防火墙规则的细粒度 QoS 策略，或通过使用 VLAN 优先级或 MPLS EXP 位在网络中传播的优先级信息来补充。

Nv2 协议每个接口最多支持 511 个客户端。

## Nv2 协议实现状态 {#nv2-protocol-implementation-status}

Nv2 包含以下功能：

| 功能 | 描述 |
|---|---|
| TDMA 媒体访问 | 用于媒体控制的时分多址 |
| WDS 支持 | 无线分布系统兼容性 |
| QoS 支持 | 可变数量的优先级队列 |
| 数据加密 | 对传输数据进行加密 |
| RADIUS 认证 | 基于 RADIUS 的认证功能 |
| 统计字段 | 可用的统计和报告字段 |
| 固定下行模式 | 支持固定下行操作 |
| 上行/下行比率 | 可配置的上行/下行比率支持 |
| Nv2 AP 同步 | 对 AP 同步的实验性支持 |

## 与其他无线协议的兼容性和共存 {#compatibility-and-coexistence-with-other-wireless-protocols}

Nv2 协议不兼容也不基于任何其他可用的无线协议或实现，无论其基于 TDMA 还是其他类型。这意味着**只有支持并启用了 Nv2 的设备才能加入 Nv2 网络**。

普通 802.11 设备无法识别 Nv2 AP，也无法连接到 Nv2 AP。支持 Nv2 的 RouterOS 设备（即运行 RouterOS 5.0rc1 或更高版本）在执行 scan 命令时会看到 Nv2 AP，但只有正确配置后才会连接到 Nv2 AP。

由于 Nv2 不使用 CSMA 技术，它可能会干扰同一信道上的其他网络。同样，其他网络也可能干扰 Nv2 网络，因为所有非 Nv2 信号都会被当作噪声。

关于兼容性和共存的关键点如下：

* 只有 RouterOS 设备才能加入 Nv2 网络。
* 只有 RouterOS 设备在扫描时才能看到 Nv2 AP。
* Nv2 网络会干扰同一信道上的其他网络。
* Nv2 网络可能会受到同一信道上任何其他网络的影响，无论该网络是否为 Nv2。
* 启用了 Nv2 的设备不会连接到任何其他基于 TDMA 的网络。

## Nv2 与 Nstreme 和 802.11 的比较 {#how-nv2-compares-with-nstreme-and-80211}

### Nv2 与 802.11 {#nv2-vs-80211}

Nv2 与 802.11 的主要区别：

* 媒体访问由 AP 调度——这消除了隐藏节点问题，并允许实施集中式媒体访问策略——AP 控制每个客户端使用多少时间，并且可以根据某种策略为客户端分配时间，而不是让每个设备竞争媒体访问。
* 降低传播延迟开销——Nv2 中没有逐帧 ACK——这显著提高了吞吐量，尤其是在长距离链路上，数据帧及随后的 ACK 帧的传播延迟会显著降低媒体使用效率。
* 降低每帧开销——Nv2 实现帧聚合和分片，以最大化分配的媒体使用率并降低每帧开销（帧间间隔、前导码）。

### Nv2 与 Nstreme {#nv2-vs-nstreme}

Nv2 与 Nstreme 的主要区别：

* 降低轮询开销——Nv2 AP 不逐个轮询客户端，而是广播上行调度，为多个客户端分配时间；这可以视为“组轮询”——不会把时间浪费在逐个轮询每个客户端上，从而为实际数据传输留出更多时间。这提高了吞吐量，尤其是在 PtMP 配置中。
* 降低传播延迟开销——Nv2 不必逐个轮询每个客户端；这允许根据到客户端的估计距离（传播延迟）创建上行调度，从而使媒体使用效率最高。这提高了吞吐量，尤其是在 PtMP 配置中。
* 更好地控制延迟——降低的开销、可调整的周期大小和 QoS 功能可以更好地控制网络中的延迟。

## 配置 Nv2 {#configuring-nv2}

**wireless-protocol** 设置控制选择和使用哪种无线协议。请注意，此设置的含义取决于接口角色（AP 或客户端），而接口角色取决于接口 **mode** 设置。下表中列出了 **wireless-protocol** 的可能值及其含义。

| 值 | AP | 客户端 |
| :-- | :-- | :-- |
| unspecified | 根据旧的 **nstreme** 设置建立 nstreme 或 802.11 网络 | 根据旧的 **nstreme** 设置连接到 nstreme 或 802.11 网络 |
| any | 与 **unspecified** 相同 | 扫描所有匹配网络，无论使用何种协议，并使用所选网络的协议进行连接 |
| 802.11 | 建立 802.11 网络 | 仅连接到 802.11 网络 |
| nstreme | 建立 Nstreme 网络 | 仅连接到 Nstreme 网络 |
| Nv2 | 建立 Nv2 网络 | 仅连接到 Nv2 网络 |
| Nv2-nstreme-802.11 | 建立 Nv2 网络 | 扫描 Nv2 网络；如果找到合适的网络，则连接；否则扫描 Nstreme 网络；如果找到合适的网络，则连接；否则扫描 802.11 网络，如果找到合适的网络，则连接。 |
| Nv2-nstreme | 建立 Nv2 网络 | 扫描 Nv2 网络；如果找到合适的网络，则连接；否则扫描 Nstreme 网络，如果找到合适的网络，则连接 |

请注意，**wireless-protocol** 的值 **Nv2-nstreme-802.11** 和 **Nv2-nstreme** **并不**指定某种混合或特殊类型的协议——实现这些值是为了简化客户端配置，适用于客户端必须连接的网络协议可能变化的情况。使用这些值有助于将网络迁移到 Nv2 协议。

大多数 Nv2 设置仅对 Nv2 AP 有意义——Nv2 客户端会自动采用 AP 的必要设置。以下设置与 Nv2 AP 相关：

* **Nv2-queue-count**——指定 Nv2 网络中使用的优先级队列数量。有关更多详细信息，请参阅 [Nv2 网络中的 QoS](#qos-in-nv2-network)。
* **Nv2-qos**——控制帧到优先级队列的映射策略。有关更多详细信息，请参阅 [Nv2 网络中的 QoS](#qos-in-nv2-network)。
* **Nv2-cell-radius**——指定 Nv2 网络中到最远客户端的距离，单位为 km。此设置会影响 AP 为客户端分配用于发起连接的竞争时隙大小，也会影响用于估计到客户端距离的时隙大小。如果此设置过小，距离较远的客户端可能无法连接，和/或断开并出现“ranging timeout”错误。尽管在正常运行期间此设置的影响应该可以忽略不计，但为了保持最大性能，建议非必要不要增大此设置，这样 AP 就不会预留实际上从未使用的时间，而是将其分配给实际数据传输。
* **tdma-period-size**——指定 Nv2 AP 用于媒体访问调度的时间周期大小，单位为 ms。较小的周期有可能降低延迟（因为 AP 可以更早地为客户端分配时间），但会增加协议开销，从而降低吞吐量。另一方面，增大周期会提高吞吐量，但也会增加延迟。对于特别长的链路，可能需要增大此值才能获得可接受的吞吐量。这种必要性可能源于下行（从 AP 到客户端）和上行（从客户端到 AP）数据之间存在“传播间隙”，在此期间不会发生数据传输。这个间隙是必要的，因为客户端必须收到来自 AP 的最后一帧——这发生在 AP 传输经过传播延迟之后，只有到这时客户端才能传输——结果，来自客户端的帧会在客户端传输经过传播延迟之后到达 AP（因此该间隙为传播延迟的两倍）。距离越长，每个周期中所需的传播间隙就越大。如果传播间隙占周期的很大一部分，实际吞吐量可能变得不可接受，此时应以增加延迟为代价增大周期大小。基本上，必须仔细选择此设置的值，以最大化吞吐量，同时将延迟保持在可接受水平。
* **Nv2-mode**——指定使用动态或固定下行/上行比率。默认值为 "dynamic-downlink"。

"sync-master"——作用等同于 nv2-mode=fixed-downlink（因此使用 nv2-downlink-ratio），但允许从设备同步到此主设备；"sync-slave"——尝试同步到主设备（或已同步的从设备），并从主设备采用 period-size 和下行比率设置。

* **Nv2-downlink-ratio**——指定 Nv2 下行比率。上行比率根据 downlink-ratio 值自动计算。使用 dynamic-downlink 模式时，当链路完全饱和，也会使用 downlink-ratio。最小值为 20，最大值为 80。默认值为 50。

以下设置在 Nv2 AP 和 Nv2 客户端上都很重要：

* **Nv2-security**——指定 Nv2 安全模式，有关更多详细信息，请参阅 [Nv2 网络中的安全](#security-in-nv2-network)。
* **Nv2-preshared-key**——指定要使用的预共享密钥，有关更多详细信息，请参阅 [Nv2 网络中的安全](#security-in-nv2-network)。
* **nv2-sync-secret**——指定用于 Nv2 同步的密钥。主设备和从设备上的密钥应匹配，才能建立同步状态。

## 迁移到 Nv2 {#migrating-to-nv2}

使用 **wireless-protocol** 设置可以非常简单地在现有网络中迁移或评估 Nv2 协议，并尽可能减少停机时间。以下是推荐步骤：

* 将 AP 升级到支持 Nv2 的版本，但暂时不要在 AP 上启用 Nv2。
* 将客户端升级到支持 Nv2 的版本。
* 将所有客户端配置为 **wireless-protocol=Nv2-nstreme-802.11**。客户端仍会使用之前使用的协议连接到 AP，因为 AP 尚未切换到 Nv2。
* 在 AP 上配置 Nv2 相关设置。
* 如果需要使用数据加密和安全认证，请在 AP 和客户端上配置 Nv2 安全相关设置（请参阅 [Nv2 网络中的安全](#security-in-nv2-network)）。
* 在 AP 上设置 **wireless-protocol=Nv2**。这会使 AP 切换到 Nv2 协议。客户端现在应使用 Nv2 协议连接。
* 如果遇到问题，只需将其改回 AP 之前使用的协议，即可轻松切换回之前的协议。
* 微调 Nv2 相关设置，以获得可接受的延迟和吞吐量。
* 实施 QoS 策略以获得最大性能。

基本故障排除指南：

* 客户端连接困难或断开并出现“ranging timeout”错误——检查 **Nv2-cell-radius** 设置是否设置得当。
* 尽管信号和速率正常，但长距离链路的吞吐量却意外偏低——尝试增大 **tdma-period-size** 设置。

## Nv2 AP 同步 {#nv2-ap-synchronization}

此功能通过减少相互之间的干扰，使同一位置上的多个 MikroTik Nv2 AP 以更好的方式共存。此功能会同步同一频率上 AP 的发送/接收时间窗口，使所有已同步的 MikroTik Nv2 AP 在同一时间发送/接收。这样一来，就可以在同一位置为多个 AP 复用同一无线频率，从而在频率规划方面提供更大的灵活性。

要建立 Nv2 同步设置：

* 对于 Nv2 同步，应选择一个主 Nv2 AP，并同时指定 "nv2-mode=sync-master" 和 "nv2-sync-secret"。
* 对于 Nv2 从 AP，应使用与主 AP 相同的无线频率，并指定 "nv2-mode=sync-slave"，且使用与主 AP 配置中相同的 "nv2-sync-secret"。
* 启用主 AP 后，从 AP 会尝试通过将指定的 "nv2-sync-secret" 与其匹配来开始搜索主 AP。
* 找到主 AP 后，从 AP 会计算到主 AP 的距离，因为主 AP 可能并不位于同一位置。
* 然后，从 AP 开始作为 AP 运行，并采用已同步主 AP 的周期大小和下行比率。
* 此外，从 AP 投入运行后，其他从 AP 可以使用此从 AP 进行同步。
* 从 AP 会定期监听主 AP，检查 "nv2-sync-secret" 是否仍然匹配，并再次采用相应参数。如果禁用/启用主 AP 接口，所有从设备也会被禁用，并从头开始同步过程。
* 如果主 AP 停止工作，从 AP 也会停止工作，因为它们没有同步信息。

### 配置示例 {#configuration-example}

主 AP：

```
 /interface/wireless/set wlan1 mode=ap-bridge ssid=Sector1 frequency=5220 nv2-mode=sync-master nv2-preshared-key=clients1 nv2-sync-secret=Tower1
```

从 AP：

```
 /interface/wireless/set wlan1 mode=ap-bridge ssid=Sector2 frequency=5220 nv2-mode=sync-slave nv2-preshared-key=clients2 nv2-sync-secret=Tower1
```

在从 AP 上监控接口：

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

主 AP 上的调试日志：

```
 09:22:08 wireless,debug wlan1: 4C:5E:0C:57:85:BE attempts to sync
```

从 AP 上的调试日志：

```
09:22:08 wireless,debug wlan1: attempting to sync to 4C:5E:0C:57:84:38 
09:22:09 wireless,debug wlan1: synced to 4C:5E:0C:57:84:38 
```

## Nv2 网络中的 QoS {#qos-in-nv2-network}

Nv2 中的 QoS 通过可变数量的优先级队列实现。根据 802.1D-2004 推荐的规则，只有当所有更高优先级队列都为空时，才会考虑传输某个队列。在实践中，这意味着首先会发送来自更高优先级队列的所有帧，然后才会考虑下一个队列。因此，必须谨慎设计 QoS 策略，以免更高优先级队列使较低优先级队列得不到服务。

Nv2 网络中的 QoS 策略由 AP 控制，客户端会采用来自 AP 的策略。在 AP 上，QoS 策略通过 **Nv2-queue-count** 和 **Nv2-qos** 参数配置。**Nv2-queue-count** 参数指定使用的优先级队列数量。帧到队列的映射由 **Nv2-qos** 参数控制。

### Nv2-qos=default {#nv2-qosdefault}

在此模式下，出站帧首先由内置 QoS 策略算法检查，该算法根据数据包类型和大小选择队列。如果内置规则不匹配，则根据帧优先级字段选择队列，与 **Nv2-qos=frame-priority** 模式中一样。

### Nv2-qos=frame-priority {#nv2-qosframe-priority}

在此模式下，QoS 队列根据帧优先级字段选择。请注意，帧优先级字段并不是标头中的某个字段，因此它仅在数据包由给定设备处理期间有效。帧优先级字段必须由防火墙规则显式设置，或由帧转发过程根据入口优先级隐式设置，例如根据 MPLS EXP 位。有关帧优先级字段的更多信息，请参阅：

* [EXP 位和 MPLS 排队](../../user-guides/routing-and-networking-protocols/mpls/exp-bit-and-mpls-queuing.md)
* [WMM 和 VLAN 优先级](../../bridging-and-switching/user-guides/wmm-and-vlan-priority.md)

根据 802.1D 推荐的用户优先级到流量类别映射，队列基于帧优先级进行选择。映射取决于可用队列数量（**Nv2-queue-count** 参数）。例如，如果队列数量为 4，则映射如下（请注意此映射与 WMM 使用的映射有何相似之处）：

* 优先级 0、3 -> 队列 0。
* 优先级 1、2 -> 队列 1。
* 优先级 4、5 -> 队列 2。
* 优先级 6、7 -> 队列 3。

如果队列数量为 2（默认），则映射如下：

* 优先级 0、1、2、3 -> 队列 0。
* 优先级 4、5、6、7 -> 队列 1。

如果队列数量为 8（可能的最大值），则映射如下：

* 优先级 1 -> 队列 0。
* 优先级 2 -> 队列 1。
* 优先级 0 -> 队列 2。
* 优先级 3 -> 队列 3。
* 优先级 4 -> 队列 4。
* 优先级 5 -> 队列 5。
* 优先级 6 -> 队列 6。
* 优先级 7 -> 队列 7。

有关其他映射、这些映射的原理讨论以及推荐实践，请参阅 802.1D-2004。

## Nv2 网络中的安全 {#security-in-nv2-network}

Nv2 安全实现具有以下功能：

* 使用 128 位密钥的 AES-CCM 进行硬件加速数据加密。
* 用于密钥管理的 4 次握手（类似于 802.11i）。
* 预共享密钥认证方法（类似于 802.11i）。
* 定期更新的组密钥（用于广播和多播数据）。

作为专有协议，Nv2 不使用 802.11 的安全机制，因此安全配置有所不同。使用 Nv2 协议的接口会忽略 **security-profile** 设置。相反，安全通过以下接口设置进行配置：

* **Nv2-security**——此设置启用/禁用 Nv2 网络中的安全功能。请注意，当 AP 上启用安全功能时，它不会接受禁用了安全功能的客户端。同样，启用了安全功能的客户端不会连接到不安全的 AP。
* **Nv2-preshared-key**——用于认证的预共享密钥。数据加密密钥在 4 次握手期间从预共享密钥派生。两台设备必须使用相同的预共享密钥才能建立连接。如果预共享密钥不同，连接将超时，因为对方将无法正确解析密钥交换消息。
