---
sidebar_key: "bridging-and-switching/crs1xx-and-2xx-series-switches"
sidebar_position: 8
title: "CRS1xx 和 2xx 系列交换机"
sidebar_label: "CRS1xx 和 2xx 系列交换机"
description: "本页面介绍 MikroTik RouterOS CRS1xx 和 2xx 系列交换机，重点说明其高性能特性，包括二层/三层交换、VLAN 支持、QoS 工具、镜像功能和端口隔离选项。页面详细说明了各型号之间的差异、CPU 速度和巨型帧大小等技术规格，并提供了 VLAN 相关术语的缩写。"
tags:
  - 'vlan'
  - 'qos'
  - 'switching'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/crs1xx-and-2xx-series-switches
captured_at: '2026-11-07T17:11:03.548Z'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

Cloud Router Switch 系列是高度集成的交换机，配备高性能 MIPS CPU 和功能丰富的包处理器。CRS 交换机可设计用于各种以太网应用，包括非管理型交换机、二层管理型交换机、运营商交换机以及无线/有线统一包处理。请参阅 [Cloud Router Switch](./user-guides/crs1xx-2xx-series-switches-examples.md) 配置示例。

:::danger
本文适用于 CRS1xx 和 CRS2xx 系列交换机，不适用于搭载 Marvell Prestera 交换芯片的 MikroTik 设备（例如 CRS3xx）。有关搭载 Marvell Prestera 交换芯片的 MikroTik 设备，请参阅 [Marvell Prestera 交换芯片特性](./marvell-prestera-switch-chip-features.md)手册。
:::

| 功能 | 描述 |
| :-- | :-- |
| **转发** | <ul class="bullets"><li>可配置用于交换或路由的端口</li><li>完全非阻塞线速交换</li><li>在单播 FDB 中最多 16k 条 MAC 条目，用于第 2 层单播转发</li><li>在组播 FDB 中最多 1k 条 MAC 条目，用于组播转发</li><li>在保留 FDB 中最多 256 条 MAC 条目，用于控制和管理目的</li><li>所有转发数据库均支持 IVL 和 SVL</li><li>可配置的基于端口的 MAC 学习限制</li><li>巨型帧支持（CRS1xx/2xx：9204 字节；CRS125/CRS109：4064 字节）</li><li>支持 IGMP Snooping</li></ul> |
| **镜像** | <ul class="bullets"><li>各种类型的镜像：<ul class="bullets"><li>基于端口的镜像</li><li>基于 VLAN 的镜像</li><li>基于 MAC 的镜像</li></ul></li><li>2 个独立的镜像分析端口</li></ul> |
| **VLAN** | <ul class="bullets"><li>完全兼容 IEEE802.1Q 和 IEEE802.1ad VLAN</li><li>4k 个活动 VLAN</li><li>灵活的 VLAN 分配：<ul class="bullets"><li>基于端口的 VLAN</li><li>基于协议的 VLAN</li><li>基于 MAC 的 VLAN</li></ul></li><li>从任意到任意的 VLAN 转换与交换</li><li>1:1 VLAN 交换 - VLAN 到端口映射</li><li>VLAN 过滤</li></ul> |
| **端口隔离与泄漏** | <ul class="bullets"><li>适用于 Private VLAN 实现</li><li>3 种端口配置类型：Promiscuous、Isolated 和 Community</li><li>最多 28 个 Community 配置</li><li>Leakage 配置允许绕过出方向 VLAN 过滤</li></ul> |
| **链路聚合** | <ul class="bullets"><li>支持静态链路聚合组</li><li>最多 8 个 Port Trunk 组</li><li>每个 Port Trunk 组最多 8 个成员端口</li><li>硬件自动故障转移和负载均衡</li></ul> |
| **服务质量（QoS）** | <ul class="bullets"><li>灵活的 QoS 分类和分配：<ul class="bullets"><li>基于端口</li><li>基于 MAC</li><li>基于 VLAN</li><li>基于协议</li><li>基于 PCP/DEI</li><li>基于 DSCP</li><li>基于 ACL</li></ul></li><li>用于服务提供商与客户端网络之间 QoS 域转换的 QoS 重标记和重映射</li><li>根据配置的优先级覆盖每个 QoS 分配</li></ul> |
| **整形与调度** | <ul class="bullets"><li>每个物理端口 8 个队列</li><li>按端口、按队列、按队列组整形</li></ul> |
| **访问控制列表** | <ul class="bullets"><li>入方向与出方向 ACL 表</li><li>最多 128 条 ACL 规则（受 RouterOS 限制）</li><li>基于端口、L2、L3、L4 协议头字段的分类</li><li>ACL 操作包括过滤、转发和修改协议头字段</li></ul> |

## Cloud Router Switch 型号 {#cloud-router-switch-models}

---

下表说明了 Cloud Router Switch 各型号之间的主要差异。

|  |  |  |  |  |  |  |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **型号** | **交换芯片** | **CPU** | **无线** | **SFP+ 端口** | **访问控制列表** | **巨型帧（字节）** |
| **CRS105-5S-FB** | QCA-8511 | 400MHz | - | - | + | 9204 |
| **CRS106-1C-5S** | QCA-8511 | 400MHz | - | - | + | 9204 |
| **CRS112-8G-4S** | QCA-8511 | 400MHz | - | - | + | 9204 |
| **CRS210-8G-2S+** | QCA-8519 | 400MHz | - | + | + | 9204 |
| **CRS212-1G-10S-1S+** | QCA-8519 | 400MHz | - | + | + | 9204 |
| **CRS226-24G-2S+** | QCA-8519 | 400MHz | - | + | + | 9204 |
| **CRS125-24G-1S** | QCA-8513L | 600MHz | - | - | - | 4064 |
| **CRS125-24G-1S-2HnD** | QCA-8513L | 600MHz | + | - | - | 4064 |
| **CRS109-8G-1S-2HnD** | QCA-8513L | 600MHz | + | - | - | 4064 |

## 缩写与说明 {#abbreviations-and-explanations}

---

CVID - 客户 VLAN ID：IEEE 802.1ad 帧的内层 VLAN 标签 ID

SVID - 服务 VLAN ID：IEEE 802.1ad 帧的外层 VLAN 标签 ID

IVL - 独立 VLAN 学习 - 学习和查找基于 MAC 地址和 VLAN ID 两者。

SVL - 共享 VLAN 学习 - 学习和查找基于 MAC 地址 - 而不是 VLAN ID。

TPID - 标签协议标识符

PCP - 优先级代码点：一个 3 位字段，表示 IEEE 802.1p 优先级

DEI - 丢弃资格指示符

DSCP - 差分服务代码点

丢弃优先级 - 一种内部 CRS 交换机 QoS 属性，用于数据包入队或丢弃。

## 端口交换 {#port-switching}

---

要在 CRS1xx/2xx 系列交换机上设置端口交换，请参阅 [网桥硬件卸载](./index.md#bridge-hardware-offloading) 页面。

:::warning
在创建启用硬件卸载的网桥并添加交换端口组时，CRS 交换机会创建动态保留 VLAN 条目（VLAN4091；VLAN4090；VLAN4089 等）。这些 VLAN 是内部运行所必需的，其优先级低于用户配置的 VLAN。
:::

### 多个交换机组 {#multiple-switch-groups}

CRS1xx/2xx 系列交换机允许使用多个带硬件卸载的网桥；这样可以轻松隔离多个交换机组。只需创建多个网桥并启用硬件卸载即可完成。

:::warning
多硬件卸载桥接配置被设计为一种快速且简单的端口隔离解决方案，但它限制了 CRS 交换芯片所支持的部分 VLAN 功能。对于高级配置，请在 CRS 交换芯片内为所有端口使用一个桥接，配置 VLAN，并通过端口隔离配置文件配置来隔离端口组。
:::

:::danger
CRS1xx/2xx 系列交换机可以运行多个启用 (R)STP 的硬件卸载网桥，但不建议这样做，因为设备并非设计为在硬件层面运行多个 (R)STP 实例。要在启用 (R)STP 的同时隔离多个交换机组，应通过端口隔离配置文件配置来隔离端口组。
:::

## 全局设置 {#global-settings}

---

CRS 交换芯片可通过 `/interface/ethernet/switch` 控制台菜单配置。

**子菜单：** `/interface/ethernet/switch`

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string value*; Default: **switch1**) | 交换机的名称。 |
| **bridge-type** (*customer-vid-used-as-lookup-vid \| service-vid-used-as-lookup-vid*; Default: **customer-vid-used-as-lookup-vid**) | bridge 类型定义哪个 VLAN 标签用作 Lookup-VID。Lookup-VID 用作所有基于 VLAN 的查找的 VLAN 键。 |
| **mac-level-isolation** (*yes \| no*; Default: **yes**) | 全局启用或禁用 MAC 级别隔离。启用后，交换机将检查源和目的 MAC 地址表项及其在单播转发表中的 `isolation-profile`。默认情况下，交换机会学习 MAC 地址并将其放入 `promiscuous` 隔离配置文件。创建静态单播表项时可以使用其他隔离配置文件。如果源或目的 MAC 地址位于 `promiscuous` 隔离配置文件中，则转发该数据包。如果源和目的 MAC 地址都位于同一个 `community1` 或 `community2` 隔离配置文件中，则转发该数据包。当源和目的 MAC 地址隔离配置文件为 `isolated`，或源和目的 MAC 地址隔离配置文件来自不同 community（例如源 MAC 地址为 `community1`，目的 MAC 地址为 `community2`）时，丢弃该数据包。当 MAC 级别隔离全局禁用时，隔离被绕过。 |
| **use-svid-in-one2one-vlan-lookup** (*yes \| no*; Default: **no**) | 是否使用服务 VLAN ID 进行 1:1 VLAN 交换查找。 |
| **use-cvid-in-one2one-vlan-lookup** (*yes \| no*; Default: **yes**) | 是否使用客户 VLAN ID 进行 1:1 VLAN 交换查找。 |
| <strong>multicast-lookup-mode</strong> (<em>dst-ip-and-vid-for-ipv4 &#124; dst-mac-and-vid-always</em>; <br/>Default:<strong>dst-ip-and-vid-for-ipv4</strong>) | IPv4 组播桥接的查找模式。<ul class="bullets"><li>dst-mac-and-vid-always - 对于所有数据包类型，查找键是目的 MAC 和 VLAN ID。</li><li>dst-ip-and-vid-for-ipv4 - 对于 IPv4 数据包，查找键是目的 IP 和 VLAN ID。对于其他数据包类型，查找键是目的 MAC 和 VLAN ID。</li></ul> |
| **unicast-fdb-timeout** (*time interval*; Default: **5m**) | Unicast FDB 表项的超时时间。 |
| **override-existing-when-ufdb-full** (*yes \| no*; Default: **no**) | 启用或禁用当 UFDB 已满时覆盖具有最低老化值的现有表项。 |

| 属性 | 描述 |
| :-- | :-- |
| **drop-if-no-vlan-assignment-on-ports**（*端口*；默认：**none**） | 如果未应用基于 MAC、基于协议的 VLAN 分配或入站 VLAN 转换，则丢弃帧的端口。 |
| **drop-if-invalid-or-src-port- -not-member-of-vlan-on-ports**（*端口*；默认：**none**） | 丢弃无效帧和其他端口 VLAN ID 帧的端口。 |
| **unknown-vlan-lookup-mode**（*ivl \| svl*；默认：**svl**） | 具有无效 VLAN 的数据包的查找和学习模式。 |
| **forward-unknown-vlan**（*yes \| no*；默认：**yes**） | 是否允许转发不属于 VLAN 表成员的 VLAN。 |

| 属性 | 描述 |
| :-- | :-- |
| **bypass-vlan-ingress-filter-for**（*协议*；默认：**none**） | 从入站 VLAN 过滤中排除的协议。如果这些协议具有无效 VLAN，则不会丢弃它们。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1） |
| **bypass-ingress-port-policing-for**（*协议*；默认：**none**） | 从入站端口监管中排除的协议。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1） |
| **bypass-l2-security-check-filter-for**（*协议*；默认：**none**） | 从 Policy 规则安全检查中排除的协议。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1） |

| 属性 | 描述 |
| :-- | :-- |
| **ingress-mirror0** (*port \| trunk,format*; Default: **none,modified**) | 第一个入向镜像分析端口或 trunk 以及镜像格式：<ul class="bullets"><li>analyzer-configured - 数据包与发往目的地的数据包相同。VLAN 格式根据分析端口的 VLAN 配置进行修改。</li><li>modified - 数据包与发往目的地的数据包相同。VLAN 格式根据出口端口的 VLAN 配置进行修改。</li><li>original - 流量按原始入向数据包格式原样镜像，不做任何更改。但边缘端口中的服务 VLAN 标签会被剥离。</li></ul> |
| **ingress-mirror1** (*port \| trunk,format*; Default: **none,modified**) | 第二个入向镜像分析端口或 trunk 以及镜像格式：<ul class="bullets"><li>analyzer-configured - 数据包与发往目的地的数据包相同。VLAN 格式根据分析端口的 VLAN 配置进行修改。</li><li>modified - 数据包与发往目的地的数据包相同。VLAN 格式根据出口端口的 VLAN 配置进行修改。</li><li>original - 流量按原始入向数据包格式原样镜像，不做任何更改。但边缘端口中的服务 VLAN 标签会被剥离。</li></ul> |
| **ingress-mirror-ratio** (*1/32768..1/1*; Default: **1/1**) | 入向镜像数据包占所有数据包的比例。 |
| **egress-mirror0** (*port \| trunk,format*; Default: **none,modified**) | 第一个出口镜像分析端口或 trunk 以及镜像格式：<ul class="bullets"><li>analyzer-configured - 数据包与发往目的地的数据包相同。VLAN 格式根据分析端口的 VLAN 配置进行修改。</li><li>modified - 数据包与发往目的地的数据包相同。VLAN 格式根据出口端口的 VLAN 配置进行修改。</li><li>original - 流量按原始入向数据包格式原样镜像，不做任何更改。但边缘端口中的服务 VLAN 标签会被剥离。</li></ul> |
| **egress-mirror1** (*port \| trunk,format*; Default: **none,modified**) | 第二个出口镜像分析端口或 trunk 以及镜像格式：<ul class="bullets"><li>analyzer-configured - 数据包与发往目的地的数据包相同。VLAN 格式根据分析端口的 VLAN 配置进行修改。</li><li>modified - 数据包与发往目的地的数据包相同。VLAN 格式根据出口端口的 VLAN 配置进行修改。</li><li>original - 流量按原始入向数据包格式原样镜像，不做任何更改。但边缘端口中的服务 VLAN 标签会被剥离。</li></ul> |
| **egress-mirror-ratio** (*1/32768..1/1*; Default: **1/1**) | 出口镜像数据包占所有数据包的比例。 |
| **mirror-egress-if-ingress-mirrored** (*yes \| no*; Default: **no**) | 当数据包同时应用入向和出口镜像时，如果此设置禁用，则仅对该数据包执行入向镜像。如果启用此设置，则两种镜像类型都会应用。 |
| **mirror-tx-on-mirror-port** (*yes \| no*; 默认值： **no**) |  |
| **mirrored-packet-qos-priority** (*0..7*; Default: **0**) | 镜像数据包中重标记的优先级。 |
| **mirrored-packet-drop-precedence** (*drop \| green \| red \| yellow*; Default: **green**) | 镜像数据包中重标记的丢弃优先级。此 QoS 属性用于镜像数据包入队或丢弃。 |
| **fdb-uses** (*mirror0 \| mirror1*; Default: **mirror0**) | 用于基于 FDB 的镜像的分析端口。 |
| **vlan-uses** (*mirror0 \| mirror1*; Default: **mirror0**) | 用于基于 VLAN 的镜像的分析端口。 |

## 端口设置 {#port-settings}

---

**子菜单：** `/interface/ethernet/switch/port`

| 属性 | 描述 |
| :-- | :-- |
| **vlan-type** (*edge-port \| network-port*; Default: **network-port**) | 端口 VLAN 类型指定 VLAN ID 是否用于 UFDB 学习。network port 在 UFDB 中学习 VLAN ID，edge port 不学习 - VLAN 0。只能在 IVL 学习模式下观察到。 |
| <strong>isolation-leakage-profile-override</strong> (<em>yes &#124; no</em>; Default: <strong>!isolation-leakage-profile-override</strong>) <br/><strong>isolation-leakage-profile</strong> (<em>0..31</em>;) | 用于端口隔离/泄漏配置的自定义端口配置文件。<ul class="bullets"><li>端口级隔离配置文件 0。Uplink 端口 - 允许该端口与设备中的所有端口通信。</li><li>端口级隔离配置文件 1。Isolated 端口 - 仅允许该端口与 uplink 端口通信。</li><li>端口级隔离配置文件 2 - 31。Community 端口 - 允许在同一 community 端口和 uplink 端口之间通信。</li></ul> |
| **learn-override** (*yes \| no*; Default: **!learn-override**) **learn-limit** (*1..1023*; Default: **!learn-limit**) | 启用或禁用 MAC 地址学习并设置端口上的 MAC 限制。当设置 !learn-override 和 !learn-limit 时，MAC 学习限制默认禁用。自 RouterOS v6.42 起，属性 learn-override 在 `/interface/bridge/port` 菜单下由 learn 替代。 |
| **drop-when-ufdb-entry-src-drop** (*yes \| no*; Default: **yes**) | 启用或禁用当 UFDB 表项具有 action src-drop 时丢弃数据包。 |
| **allow-unicast-loopback** (*yes \| no*; Default: **no**) | 端口上的单播环回。启用后，对于已知单播数据包，当源端口和目的端口相同时允许回送。 |
| **allow-multicast-loopback** (*yes \| no*; Default: **no**) | 端口上的组播环回。启用后，对于已注册组播或广播数据包，当源端口和目的端口相同时允许回送。 |
| **action-on-static-station-move** (*copy-to-cpu \| drop \| forward \| redirect-to-cpu*; Default: **forward**) | 当 UFDB 已包含具有相同 MAC 但端口不同的静态表项时，对数据包执行的动作。 |
| **drop-dynamic-mac-move** (*yes \| no*; Default: **no**) | 如果 MAC 已在另一个端口上学习到，则阻止 MAC 重新学习直到 UFDB 超时。 |

| 属性 | 描述 |
| :-- | :-- |
| **allow-fdb-based-vlan-translate** (*yes \| no*; Default: **no**) | 启用或禁用端口上基于 MAC 的 VLAN 转换。 |
| <strong>allow-mac-based-service-vlan-assignment-for</strong> (<em>all-frames &#124; none &#124;</em><em>tagged-frame-only &#124; untagged-and-priority-tagged-frame-only</em>; Default: <br/><strong>none</strong>) | 应用基于 MAC 的服务 VLAN 转换的帧类型。 |
| <strong>allow-mac-based-customer-vlan-assignment-for</strong> (<em>all-frames &#124; none &#124;</em><em>tagged-frame-only &#124; untagged-and-priority-tagged-frame-only</em>; Default: <br/><strong>none</strong>) | 应用基于 MAC 的客户 VLAN 转换的帧类型。 |
| **default-customer-pcp** (*0..7*; Default: **0**) | 端口的默认客户 PCP。 |
| **default-service-pcp** (*0..7*; Default: **0**) | 端口的默认服务 PCP。 |
| **pcp-propagation-for-initial-pcp** (*yes \| no*; Default: **no**) | 启用或禁用入向初始 PCP 分配时的 PCP 传播。<ul class="bullets"><li>如果端口 vlan-type 为 Edge 端口，则服务 PCP 从客户 PCP 复制。</li><li>如果端口 vlan-type 为 Network 端口，则客户 PCP 从服务 PCP 复制。</li></ul> |
| **filter-untagged-frame** (*yes \| no*; Default: **no**) | 是否过滤端口上的未标记帧。 |
| **filter-priority-tagged-frame** (*yes \| no*; Default: **no**) | 是否过滤端口上的带优先级标记帧。 |
| **filter-tagged-frame** (*yes \| no*; Default: **no**) | 是否过滤端口上的标记帧。 |

| 属性 | 描述 |
| :-- | :-- |
| **egress-vlan-tag-table-lookup-key** (*according-to-bridge-type \| egress-vid*; Default: **egress-vid**) | 出口 VLAN 表（VLAN Tagging）查找：<ul class="bullets"><li>egress-vid - 当配置为 Edge 端口时，查找 VLAN ID 为 CVID；当配置为 Network 端口时，为 SVID。</li><li>according-to-bridge-type - 当配置为客户 VLAN bridge 时，查找 VLAN ID 为 CVID；当配置为服务 VLAN bridge 时，为 SVID。在服务 VLAN bridge 中，Edge 端口的 Customer 标签保持不变。</li></ul> |
| **egress-vlan-mode** (*tagged \| unmodified \| untagged*; Default: **unmodified**) | 端口上的出口 VLAN 标记动作。 |
| **egress-pcp-propagation** (*yes \| no*; Default: **no**) | 启用或禁用出口 PCP 传播。<ul class="bullets"><li>如果端口 vlan-type 为 Edge 端口，则服务 PCP 从客户 PCP 复制。</li><li>如果端口 vlan-type 为 Network 端口，则客户 PCP 从服务 PCP 复制。</li></ul> |

| 属性 | 描述 |
| :-- | :-- |
| **ingress-mirror-to**（*mirror0 \| mirror1 \| none*；默认：**none**） | 用于基于端口的入站镜像的分析端口。 |
| **ingress-mirroring-according-to-vlan**（*yes \| no*；默认：**no**） |  |
| **egress-mirror-to**（*mirror0 \| mirror1 \| none*；默认：**none**） | 用于基于端口的出站镜像的分析端口。 |

| 属性 | 描述 |
| :-- | :-- |
| **qos-scheme-precedence** (*da-based \| dscp-based \| ingress-acl-based \| pcp-based \| protocol-based \| sa-based \| vlan-based*; Default: **pcp-based, sa-based, da-based, dscp-based, protocol-based, vlan-based**) | 指定端口入向应用的 QoS 分配方案。<ul class="bullets"><li>da-based</li><li>dscp-based</li><li>ingress-acl-based</li><li>pcp-based</li><li>protocol-based</li><li>sa-based</li><li>vlan-based</li></ul> |
| **pcp-or-dscp-based-qos-change-dei** (*yes \| no*; Default: **no**) | 启用或禁用端口上基于 PCP 或 DSCP 的 DEI 更改。 |
| **pcp-or-dscp-based-qos-change-pcp** (*yes \| no*; Default: **no**) | 启用或禁用端口上基于 PCP 或 DSCP 的 PCP 更改。 |
| **pcp-or-dscp-based-qos-change-dscp** (*yes \| no*; Default: **no**) | 启用或禁用端口上基于 PCP 或 DSCP 的 DSCP 更改。 |
| **dscp-based-qos-dscp-to-dscp-mapping** (*yes \| no*; Default: **yes**) | 启用或禁用端口上的 DSCP 到内部 DSCP 映射。 |
| **pcp-based-qos-drop-precedence-mapping** (*PCP/DEI-range:drop-precedence*; Default: **0-15:green**) | 用于 PCP/DEI 到丢弃优先级（drop、green、red、yellow）映射的新丢弃优先级值。允许多个映射，用逗号分隔，例如 "0-7:yellow,8-15:red"。 |
| **pcp-based-qos-dscp-mapping** (*PCP/DEI-range:DEI*; Default: **0-15:0**) | 用于 PCP/DEI 到 DSCP（0..63）映射的新 DSCP 值。允许多个映射，用逗号分隔，例如 "0-7:25,8-15:50"。 |
| **pcp-based-qos-dei-mapping** (*PCP/DEI-range:DEI*; Default: **0-15:0**) | 用于 PCP/DEI 到 DEI（0..1）映射的新 DEI 值。允许多个映射，用逗号分隔，例如 "0-7:0,8-15:1"。 |
| **pcp-based-qos-pcp-mapping** (*PCP/DEI-range:DEI*; Default: **0-15:0**) | 用于 PCP/DEI 到 PCP（0..7）映射的新 PCP 值。允许多个映射，用逗号分隔，例如 "0-7:3,8-15:4"。 |
| **pcp-based-qos-priority-mapping** (*PCP/DEI-range:DEI*; Default: **0-15:0**) | 用于 PCP/DEI 到优先级（0..15）映射的新内部优先级值。允许多个映射，用逗号分隔，例如 "0-7:5,8-15:15"。 |

| 属性 | 描述 |
| :-- | :-- |
| **priority-to-queue** (*priority-range:queue*; Default: **0-15:0,1:1,2:2,3:3**) | 每个端口的内部优先级（0..15）到队列（0..7）的映射。 |
| <strong>per-queue-scheduling</strong> (<em>Scheduling-type:Weight</em>; Default: <strong>wrr-group0:1,wrr-group0:2,wrr-group0:4,wrr-group0:8,wrr-group0:16,wrr-group0:32,</strong><br/><strong>wrr-group0:64,wrr-group0:128</strong>) | 设置端口对每个队列组使用严格或加权轮询策略进行流量整形；每个队列用逗号分隔。 |

| 属性 | 描述 |
| :-- | :-- |
| <strong>ingress-customer-tpid-override</strong> (<em>yes &#124; no</em>; Default:<strong>!ingress-customer-tpid-override</strong>) <br/><strong>ingress-customer-tpid</strong> (<em>0..10000</em>; Default: <strong>0x8100</strong>) | 入向客户 TPID 覆盖允许接受带有自定义客户标签 TPID 的特定帧。默认值用于 802.1Q 帧的标签。 |
| <strong>egress-customer-tpid-override</strong> (<em>yes &#124; no</em>; Default: <strong>!egress-customer-tpid-override</strong>) <strong>egress-customer-tpid</strong> (<em>0..10000</em>; Default: <br/><strong>0x8100</strong>) | 出口客户 TPID 覆盖允许对带有客户标签的出口帧进行自定义标识。默认值用于 802.1Q 帧的标签。 |
| <strong>ingress-service-tpid-override</strong> (<em>yes &#124; no</em>; Default: <strong>!ingress-service-tpid-override</strong>) <br/><strong>ingress-service-tpid</strong> (<em>0..10000</em>; Default: <strong>0x88A8</strong>) | 入向服务 TPID 覆盖允许接受带有自定义服务标签 TPID 的特定帧。默认值用于 802.1AD 帧的服务标签。 |
| <strong>egress-service-tpid-override</strong> (<em>yes &#124; no</em>; Default: <strong>!egress-service-tpid-override</strong>) <strong>egress-service-tpid</strong> (<em>0..10000</em>; Default: <br/><strong>0x88A8</strong>) | 出口服务 TPID 覆盖允许对带有服务标签的出口帧进行自定义标识。默认值用于 802.1AD 帧的服务标签。 |

| 属性 | 描述 |
| :-- | :-- |
| **custom-drop-counter-includes** (*counters*; Default: **none**) | 自定义包含项，用于为交换机端口 custom-drop-packet 计数器统计丢弃的数据包。<ul><li><strong>device-loopback</strong></li><li><strong>fdb-hash-violation</strong></li><li><strong>exceeded-port-learn-limitation</strong></li><li><strong>dynamic-station-move</strong></li><li><strong>static-station-move</strong></li><li><strong>ufdb-source-drop</strong></li><li><strong>host-source-drop</strong></li><li><strong>unknown-host</strong></li><li><strong>ingress-vlan-filtered</strong></li></ul> |
| **queue-custom-drop-counter0-includes** (*counters*; Default: **none**) | 自定义包含项，用于为交换机端口 tx-queue-custom0-drop-packet 和 tx-queue-custom0-drop-byte 计数器统计丢弃的数据包和字节。<br/><ul><li><strong>red</strong></li><li><strong>yellow</strong></li><li><strong>green</strong></li><li><strong>queue0</strong></li><li><strong>...</strong></li><li><strong>queue7</strong></li></ul> |
| **queue-custom-drop-counter1-includes** (*counters*; Default: **none**) | 自定义包含项，用于为交换机端口 tx-queue-custom1-drop-packet 和 tx-queue-custom1-drop-byte 计数器统计丢弃的数据包和字节。<br/><ul><li><strong>red</strong></li><li><strong>yellow</strong></li><li><strong>green</strong></li><li><strong>queue0</strong></li><li><strong>...</strong></li><li><strong>queue7</strong></li></ul> |
| **policy-drop-counter-includes** (*counters*; Default: **none**) | 自定义包含项，用于为交换机端口 policy-drop-packet 计数器统计丢弃的数据包。<ul><li><strong>ingress-policing</strong></li><li><strong>ingress-acl</strong></li><li><strong>egress-policing</strong></li><li><strong>egress-acl</strong></li></ul> |

## 转发表数据库 {#forwarding-databases}

---

### 单播 FDB {#unicast-fdb}

单播转发表数据库最多支持 16K 个 MAC 条目。

**子菜单：** `/interface/ethernet/switch/unicast-fdb`

| 属性 | 描述 |
| :-- | :-- |
| **action** (*action*; Default: **forward**) | UFDB 表项的动作：<ul class="bullets"><li>dst-drop - 当数据包的目的 MAC 与表项匹配时丢弃数据包。</li><li>dst-redirect-to-cpu - 当数据包的目的 MAC 与表项匹配时将数据包重定向到 CPU。</li><li>forward - 转发数据包。</li><li>src-and-dst-drop - 当数据包的源 MAC 或目的 MAC 与表项匹配时丢弃数据包。</li><li>src-and-dst-redirect-to-cpu - 当数据包的源 MAC 或目的 MAC 与表项匹配时将数据包重定向到 CPU。</li><li>src-drop - 当数据包的源 MAC 与表项匹配时丢弃数据包。</li><li>src-redirect-to-cpu - 当数据包的源 MAC 与表项匹配时将数据包重定向到 CPU。</li></ul> |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用 Unicast FDB 表项。 |
| **isolation-profile** (*community1 \| community2 \| isolated \| promiscuous*; Default: **promiscuous**) | MAC 级别隔离配置文件。 |
| **mac-address** (*MAC address*) | 当目的 MAC 或源 MAC 与表项匹配时，action 命令应用于该数据包。 |
| **mirror** (*yes \| no*; Default: **no**) | 启用或禁用基于源 MAC 或目的 MAC 的镜像。 |
| **port** (*port*) | Unicast FDB 表项的匹配端口。 |
| **qos-group** (*none*; Default: **none**) | 从 QoS group 菜单定义的 QoS 组。 |
| **svl** (*yes \| no*; Default: **no**) | Unicast FDB 学习模式：<ul class="bullets"><li>Shared VLAN Learning (svl) - 学习/查找基于 MAC 地址 - 而不是 VLAN ID。</li><li>Independent VLAN Learning (ivl) - 学习/查找同时基于 MAC 地址和 VLAN ID。</li></ul> |
| **vlan-id** (*0..4095*) | Unicast FDB 查找/学习 VLAN ID。 |

### 组播 FDB {#multicast-fdb}

CRS125 交换芯片在 MFDB 中最多支持 1024 个条目用于组播转发。对于每个组播数据包，在 MFDB 中执行目标 MAC 或目标 IP 查找。MFDB 条目不会自动学习，只能配置。

**子菜单：** `/interface/ethernet/switch/multicast-fdb`

| 属性 | 描述 |
| :-- | :-- |
| **address** (*X.X.X.X \| XX:XX:XX:XX:XX:XX*) | 组播数据包的匹配 IP 地址或 MAC 地址。 |
| **bypass-vlan-filter** (*yes \| no*; Default: **no**) | 允许匹配的组播数据包绕过 VLAN 过滤。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用 Multicast FDB 表项。 |
| **ports** (*ports*) | 组播流量的成员端口。 |
| **qos-group** (*none*; Default: **none**) | 从 QoS group 菜单定义的 QoS 组。 |
| **svl** (*yes \| no*; Default: **no**) | Multicast FDB 学习模式：<ul class="bullets"><li>Shared VLAN Learning (svl) - 学习/查找基于 MAC 地址 - 而不是 VLAN ID。</li><li>Independent VLAN Learning (ivl) - 学习/查找同时基于 MAC 地址和 VLAN ID。</li></ul> |
| **vlan-id** (*0..4095*; Default: **0**) | Multicast FDB 查找 VLAN ID。如果 VLAN 学习模式为 IVL，则 VLAN ID 为查找 ID，否则 VLAN ID = 0。 |

### 保留 FDB {#reserved-fdb}

Cloud Router Switch 支持 256 个 RFDB 条目。每个 RFDB 条目可以存储具有特定命令的二层单播或组播 MAC 地址。

**子菜单：** `/interface/ethernet/switch/reserved-fdb`

| 属性 | 描述 |
| :-- | :-- |
| **action** (*copy-to-cpu \| drop \| forward \| redirect-to-cpu*; Default: **forward**) | RFDB 表项的动作：<ul class="bullets"><li>copy-to-cpu - 当数据包的目的 MAC 与表项匹配时，将数据包复制到 CPU。</li><li>drop - 当数据包的目的 MAC 与表项匹配时丢弃数据包。</li><li>forward - 当数据包的目的 MAC 与表项匹配时转发数据包。</li><li>redirect-to-cpu - 当数据包的目的 MAC 与表项匹配时将数据包重定向到 CPU。</li></ul> |
| **bypass-ingress-port-policing** (*yes \| no*; Default: **no**) | 允许匹配的数据包绕过入口端口 Policer。 |
| **bypass-ingress-vlan-filter** (*yes \| no*; Default: **no**) | 允许匹配的数据包绕过 VLAN 过滤。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用 Reserved FDB 表项。 |
| **mac-address** (*MAC address*; Default: **00:00:00:00:00:00**) | Reserved FDB 表项的匹配 MAC 地址。 |
| **qos-group** (*none*; Default: **none**) | 从 QoS group 菜单定义的 QoS 组。 |

## VLAN {#vlan}

---

### VLAN 表 {#vlan-table}

VLAN 表支持 4096 个 VLAN 条目，用于存储 VLAN 成员信息以及其他 VLAN 信息，例如 QoS、隔离、强制 VLAN、学习和镜像。

**子菜单：** `/interface/ethernet/switch/vlan`

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes \| no*; Default: **no**) | 指示 VLAN 表项是否禁用。只有启用的表项才会应用于查找过程和转发决策。 |
| **flood** (*yes \| no*; Default: **no**) | 启用或禁用按 VLAN 强制泛洪。如果启用该功能，则忽略 UFDB 或 MFDB 中的目的 MAC 查找结果，<br/>并且强制数据包在 VLAN 中泛洪。 |
| **ingress-mirror** (*yes \| no*; Default: **no**) | 启用按 VLAN 的入向镜像，以支持基于 VLAN 的镜像功能。 |
| **learn** (*yes \| no*; Default: **yes**) | 启用或禁用 VLAN 的源 MAC 学习。 |
| **ports** (*ports*) | VLAN 的成员端口。 |
| **qos-group** (*none*; Default: **none**) | 从 QoS group 菜单定义的 QoS 组。 |
| **svl** (*yes \| no*; Default: **no**) | 用于在 UFDB 和 MFDB 中查找的 FDB 查找模式。<ul class="bullets"><li>Shared VLAN Learning (svl) - 学习/查找基于 MAC 地址 - 而不是 VLAN ID。</li><li>Independent VLAN Learning (ivl) - 学习/查找同时基于 MAC 地址和 VLAN ID。</li></ul> |
| **vlan-id** (*0..4095*) | VLAN 成员表项的 VLAN ID。 |

### 出站 VLAN 标签 {#egress-vlan-tag}

出站数据包可以被分配不同的 VLAN 标签格式。当数据包发送到出站端口（目标端口）时，VLAN 标签可以被移除、添加或保持原样。每个端口对出站 VLAN 标签格式有专用控制。标签格式包括：

- 未标记
- 已标记
- 未修改

出站 VLAN 标签表包含 4096 个条目，用于选择 VLAN 标记。

**子菜单：** `/interface/ethernet/switch/egress-vlan-tag`

| 属性 | 描述 |
| :-- | :-- |
| **disabled**（*yes \| no*；默认：**no**） | 启用或禁用出站 VLAN 标签表条目。 |
| **tagged-ports**（*端口*） | 在出站中标记的端口。 |
| **vlan-id**（*0..4095*） | 在出站中标记的 VLAN ID。 |

### 入站/出站 VLAN 转换 {#ingressegress-vlan-translation}

入站 VLAN 转换表允许每个端口最多 15 个条目。可以从数据包头中选择一个或多个字段，以便在入站 VLAN 转换表中查找。第一个匹配条目中配置的 S-VLAN 或 C-VLAN 或两者都会分配给该数据包。

**子菜单：** `/interface/ethernet/switch/ingress-vlan-translation, /interface/ethernet/switch/egress-vlan-translation`

| 属性 | 描述 |
| :-- | :-- |
| **customer-dei** (*0..1*; Default: **none**) | 客户标签的匹配 DEI。 |
| **customer-pcp** (*0..7*; Default: **none**) | 客户标签的匹配 PCP。 |
| **customer-vid** (*0..4095*; Default: **none**) | 匹配客户标签的 VLAN ID。 |
| **customer-vlan-format** (*any \| priority-tagged-or-tagged \| tagged \| untagged-or-tagged*; Default:**any**) | VLAN 转换规则有效的带客户标签帧类型。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用 VLAN 转换表项。 |
| **new-customer-vid** (*0..4095*; Default: **none**) | 新的客户 VLAN ID 替换匹配的客户 VLAN ID。如果设置为 4095 且使用入向 VLAN 转换，则流量被丢弃。 |
| **new-service-vid** (*0..4095*; Default: **none**) | 新的服务 VLAN ID 替换匹配的服务 VLAN ID。 |
| **pcp-propagation** (*yes \| no*; Default: **no**) | 启用或禁用 PCP 传播。<ul class="bullets"><li>如果端口类型为 Edge，则客户 PCP 从服务 PCP 复制。</li><li>如果端口类型为 Network，则服务 PCP 从客户 PCP 复制。</li></ul> |
| **ports** (*ports*) | VLAN 转换规则的匹配交换机端口。 |
| **protocol** (*protocols*; Default: **none**) | 匹配以太网协议。*(仅用于入向 VLAN 转换)* |
| **sa-learning** (*yes \| no*; Default: **no**) | 启用或禁用 VLAN 转换后的源 MAC 学习。*(仅用于入向 VLAN 转换)* |
| **service-dei** (*0..1*; Default: **none**) | 服务标签的匹配 DEI。 |
| **service-pcp** (*0..7*; Default: **none**) | 服务标签的匹配 PCP。 |
| **service-vid** (*0..4095*; Default: **none**) | 匹配服务标签的 VLAN ID。 |
| **service-vlan-format** (*any \| priority-tagged-or-tagged \| tagged \| untagged-or-tagged*; Default:**any**) | VLAN 转换规则有效的带服务标签帧类型。 |

下表列出了会触发具有特定 VLAN 格式设置的规则的流量；请注意，带 VLAN ID 0 标记的流量是一种特殊情况，也会被考虑在内。

| 属性 | 描述 |
| :-- | :-- |
| **any** | 接受：<ul><li>未标记流量</li><li>标记流量</li><li>设置了优先级的标记流量</li><li>VLAN 0 流量</li><li>设置了优先级的 VLAN 0 流量</li></ul> |
| **priority-tagged-or-tagged** | 接受：<ul><li>标记流量</li><li>设置了优先级的标记流量</li><li>VLAN 0 流量</li><li>设置了优先级的 VLAN 0 流量</li></ul> |
| **tagged** | 接受：<ul><li>标记流量</li><li>设置了优先级的标记流量</li></ul> |
| **untagged-or-tagged** | 接受：<ul><li>未标记流量</li><li>标记流量</li><li>设置了优先级的标记流量</li></ul> |

:::danger
如果 `VLAN-format` 设置为 `any`，那么将 `customer-vid``/``service-vid` 设置为 `0` 会触发针对 VLAN 0 流量的交换机规则。在这种情况下，交换机规则会查找未标记流量或带有 VLAN 0 标签的流量，只有 `untagged-or-tagged` 会过滤掉 VLAN 0 流量。
:::

### 基于协议的 VLAN {#protocol-based-vlan}

基于协议的 VLAN 表用于按端口为相关协议数据包分配 VID 和 QoS 属性。

**子菜单：** `/interface/ethernet/switch/protocol-based-vlan`

| 属性 | 描述 |
| :-- | :-- |
| **disabled**（*yes \| no*；默认：**no**） | 启用或禁用基于协议的 VLAN 条目。 |
| **frame-type**（*ethernet \| llc \| rfc-1042*；默认：**ethernet**） | 匹配帧的封装类型。 |
| **new-customer-vid**（*0..4095*；默认：**0**） | 新的客户 VLAN ID 替换指定协议的原始客户 VLAN ID。如果设置为 4095，则丢弃流量。 |
| **new-service-vid**（*0..4095*；默认：**0**） | 新的服务 VLAN ID 替换指定协议的原始服务 VLAN ID。 |
| **ports**（*端口*） | 基于协议的 VLAN 规则的匹配交换机端口。 |
| **protocol**（*协议*；默认：**0**） | 基于协议的 VLAN 规则的匹配协议。 |
| **qos-group**（*none*；默认：**none**） | 从 QoS 组菜单定义的 QoS 组。 |
| **set-customer-vid-for**（*all \| none \| tagged \| untagged-or-priority-tagged*；默认：**all**） | 针对不同数据包类型的客户 VLAN ID 分配命令。 |
| **set-qos-for**（*all \| none \| tagged \| untagged-or-priority-tagged*；默认：**none**） | 应用 QoS 分配命令的帧类型。 |
| **set-service-vid-for**（*all \| none \| tagged \| untagged-or-priority-tagged*；默认：**all**） | 针对不同数据包类型的服务 VLAN ID 分配命令。 |

### 基于 MAC 的 VLAN {#mac-based-vlan}

基于 MAC 的 VLAN 表用于根据源 MAC 分配 VLAN。

**子菜单：** `/interface/ethernet/switch/mac-based-vlan`

| 属性 | 描述 |
| :-- | :-- |
| **disabled**（*yes \| no*；默认：**no**） | 启用或禁用基于 MAC 的 VLAN 条目。 |
| **new-customer-vid**（*0..4095*；默认：**0**） | 新的客户 VLAN ID 替换匹配数据包的原始服务 VLAN ID。如果设置为 4095，则丢弃流量。 |
| **new-service-vid**（*0..4095*；默认：**0**） | 新的服务 VLAN ID 替换匹配数据包的原始服务 VLAN ID。 |
| **src-mac-address**（*MAC 地址*） | 基于 MAC 的 VLAN 规则的匹配源 MAC 地址。 |

:::warning
所有 CRS1xx/2xx 系列交换机最多支持 1024 条基于 MAC 的 VLAN 表项。
:::

### 1:1 VLAN 交换 {#11-vlan-switching}

1:1 VLAN 交换可用于替换匹配数据包的常规 L2 桥接。当数据包命中 1:1 VLAN 交换表条目时，该条目中的目标端口信息会分配给该数据包。UFDB 和 MFDB 条目中匹配的目标信息不再适用于该数据包。

**子菜单：** `/interface/ethernet/switch/one2one-vlan-switching`

| 属性 | 描述 |
| :-- | :-- |
| **customer-vid**（*0..4095*；默认：**0**） | 用于 1:1 VLAN 交换的匹配客户 VLAN ID。 |
| **disabled**（*yes \| no*；默认：**no**） | 启用或禁用 1:1 VLAN 交换表条目。 |
| **dst-port**（*端口*） | 匹配的 1:1 VLAN 交换数据包的目标端口。 |
| **service-vid**（*0..4095*；默认：**0**） | 用于 1:1 VLAN 交换的匹配客户 VLAN ID。 |

## 端口隔离/泄漏 {#port-isolationleakage}

---

CRS 交换机支持灵活的多级隔离功能，可用于用户访问控制、流量工程以及高级安全和网络管理。隔离功能提供有组织的结构，使用户可以轻松地按端口、MAC 地址、VLAN、协议、流和帧类型编程和控制访问。支持以下隔离和泄漏功能：

- 端口级隔离
- MAC 级隔离
- VLAN 级隔离
- 协议级隔离
- 流级隔离
- 上述功能的自由组合

端口级隔离在源端口和目标端口上支持不同的控制方案。每个条目可以为源端口或目标端口编程访问控制。

- 当条目配置为源端口访问控制时，该条目会。

应用于入站数据包。

- 当条目配置为目的地端口访问控制时，该条目

应用于出站数据包。

端口泄漏允许绕过端口上的出站 VLAN 过滤。允许泄漏端口访问其他端口，用于安全、网络控制和管理等各种应用。注意：当同一端口同时应用隔离和泄漏时，该端口被隔离。

**子菜单：** `/interface/ethernet/switch/port-isolation`

**子菜单：** `/interface/ethernet/switch/port-leakage`

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用端口隔离/泄漏表项。 |
| **flow-id** (*0..63*; 默认值： **none**) |  |
| **forwarding-type** (*bridged; routed*; Default: **bridged,routed**) | Cloud Router Switch 上的匹配流量转发类型。 |
| **mac-profile** (*community1 \| community2 \| isolated \| promiscuous*; Default: **none**) | 匹配的 MAC 隔离/泄漏配置文件。 |
| **port-profile** (*0..31*; Default: **none**) | 匹配的端口隔离/泄漏配置文件。 |
| **ports** (*ports*; Default: **none**) | 隔离/泄漏端口。 |
| **protocol-type** (*arp; nd; dhcpv4; dhcpv6; ripv1*; Default: **arp,nd,dhcpv4,dhcpv6,ripv1**) | 隔离/泄漏包含的协议。 |
| **registration-status** (*known; unknown*; Default: **known,unknown**) | 匹配数据包的注册状态。Known 表项存在于 UFDB 和 MFDB 中，unknown 表项不存在。 |
| **traffic-type** (*unicast; multicast; broadcast*; Default: **unicast,multicast,broadcast**) | 匹配流量类型。 |
| **type** (*dst \| src*; Default: **src**) | 隔离/泄漏表项的查找类型：<ul class="bullets"><li>src - 表项应用于端口的入向数据包。</li><li>dst - 表项应用于端口的出口数据包。</li></ul> |
| **vlan-profile** (*community1 \| community2 \| isolated \| promiscuous*; Default: **none**) | 匹配的 VLAN 隔离/泄漏配置文件。 |

## 干道（Trunking） {#trunking}

---

Cloud Router Switch 中的 Trunking 提供具有硬件自动故障转移和负载均衡的静态链路聚合组。不支持 IEEE802.3ad 和 IEEE802.1ax 兼容的链路聚合控制协议。最多支持 8 个 Trunk 组，每个 Trunk 组最多 8 个 Trunk 成员端口。CRS 端口 Trunking 根据以下所有参数计算 transmit-hash：L2 src-dst MAC + L3 src-dst IP + L4 src-dst Port。

**子菜单：** `/interface/ethernet/switch/trunk`

| 属性 | 描述 |
| :-- | :-- |
| **disabled**（*yes \| no*；默认：**no**） | 启用或禁用端口 trunking 条目。 |
| **member-ports**（*端口*） | Trunk 组的成员端口。 |
| **name**（*字符串值*；默认：**trunkX**） | Trunk 组的名称。 |

## 服务质量 {#quality-of-service}

---

### 整形器 {#shaper}

流量整形限制从接口传输的流的速率和突发大小。整形器通过令牌桶实现。如果数据包超过最大速率或突发大小，这意味着没有足够的数据包令牌，则该数据包会存储在缓冲区中，直到有足够的令牌传输它。

**子菜单：** `/interface/ethernet/switch/shaper`

| 属性 | 描述 |
| :-- | :-- |
| **burst** (*integer*; Default: **100k**) | 允许突发期间可传输的最大数据速率。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用流量整形器表项。 |
| **meter-unit** (*bit \| packet*; Default: **bit**) | 流量整形器速率的测量单位。 |
| **port** (*port*) | 流量整形器的物理端口。 |
| **rate** (*integer*; Default: **1M**) | 最大数据速率限制。 |
| **target** (*port \| queueX \| wrr-groupX*; Default: **port**) | 每个端口（包括 CPU 端口）支持三级整形器：<ul class="bullets"><li>Port level - 表项应用于交换机芯片的端口。</li><li>WRR group level - 表项应用于端口上的 2 个加权轮询队列组之一（wrr-group0、wrr-group1）。</li><li>Queue level - 表项应用于端口上的 8 个队列之一（queue0 - queue7）。</li></ul> |

### 入站端口监管器 {#ingress-port-policer}

**子菜单：** `/interface/ethernet/switch/ingress-port-policer`

| 属性 | 描述 |
| :-- | :-- |
| **burst** (*integer*; Default: **100k**) | 允许突发期间可传输的最大数据速率。 |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用入口端口 policer 表项。 |
| **meter-len** (*layer-1 \| layer-2 \| layer-3*; Default: **layer-1**) | 设置用于计量的数据包字节长度的数据包分类。<ul class="bullets"><li>layer-1 - 包括整个二层帧 + FCS + 包间间隔 + 前导码。</li><li>layer-2 - 包括二层帧 + FCS。</li><li>layer-3 - 仅包括三层 + 以太网填充，不包括二层头和 FCS。</li></ul> |
| **meter-unit** (*bit \| packet*; Default: **bit**) | 流量入口端口 policer 速率的测量单位。 |
| **new-dei-for-yellow** (*0..1 \| remap*; Default: **none**) | 如果 yellow-action 为 remark，则为超限流量重标记的 DEI。 |
| **new-dscp-for-yellow** (*0..63 \| remap*; Default: **none**) | 如果 yellow-action 为 remark，则为超限流量重标记的 DSCP。 |
| **new-pcp-for-yellow** (*0..7 \| remap*; Default: **none**) | 如果 yellow-action 为 remark，则为超限流量重标记的 PCP。 |
| **packet-types** (*packet-types*; Default: **all types from the description**) | 入口端口 policer 表项有效的匹配数据包类型。 |
| **port** (*port*) | 入口端口 policer 表项的物理端口或 trunk。 |
| **rate** (*integer*) | 最大数据速率限制。 |
| **yellow-action** (*drop \| forward \| remark*; Default: **drop**) | 对超限流量执行的动作。 |

### QoS 组 {#qos-group}

全局 QoS 组表用于基于 VLAN、基于协议和基于 MAC 的 QoS 组分配配置。

**子菜单：** `/interface/ethernet/switch/qos-group`

| 属性 | 描述 |
| :-- | :-- |
| **dei**（*0..1*；默认：**none**） | QoS 组的新 DEI 值。 |
| **disabled**（*yes \| no*；默认：**no**） | 启用或禁用协议 QoS 组条目。 |
| **drop-precedence**（*drop \| green \| red \| yellow*；默认：**green**） | 丢弃优先级是一种内部 QoS 属性，用于数据包入队或丢弃。 |
| **dscp**（*0..63*；默认：**none**） | QoS 组的新 DSCP 值。 |
| **name**（*字符串值*；默认：**groupX**） | QoS 组的名称。 |
| **pcp**（*0..7*；默认：**none**） | QoS 组的新 PCP 值。 |
| **priority**（*0..15*；默认：**0**） | 内部优先级具有本地意义，用于将流量分类到端口上的不同出站队列。（1 为最高，15 为最低） |

### DSCP QoS 映射 {#dscp-qos-map}

全局 DSCP 到 QoS 映射表用于将数据包的 DSCP 映射到表中配置的新 QoS 属性。

**子菜单：** `/interface/ethernet/switch/dscp-qos-map`

| 属性 | 描述 |
| :-- | :-- |
| **dei**（*0..1*） | DSCP 到 QoS 映射条目的新 DEI 值。 |
| **drop-precedence**（*drop \| green \| red \| yellow*） | DSCP 到 QoS 映射条目的新丢弃优先级值。 |
| **pcp**（*0..7*） | DSCP 到 QoS 映射条目的新 PCP 值。 |
| **priority**（*0..15*） | DSCP 到 QoS 映射条目的新内部优先级值。 |

### DSCP 到 DSCP 映射 {#dscp-to-dscp-map}

全局 DSCP 到 DSCP 映射表用于将数据包的原始 DSCP 映射到表中配置的新 DSCP 值。

**子菜单：** `/interface/ethernet/switch/dscp-to-dscp`

| 属性 | 描述 |
| :-- | :-- |
| **new-dscp**（*0..63*） | DSCP 到 DSCP 映射条目的新 DSCP 值。 |

### 监管器 QoS 映射 {#policer-qos-map}

**子菜单：** `/interface/ethernet/switch/policer-qos-map`

| 属性 | 描述 |
| :-- | :-- |
| **dei-for-red**（*0..1*；默认：**0**） | 红色数据包的监管器 DEI 重映射值。 |
| **dei-for-yellow**（*0..1*；默认：**0**） | 黄色数据包的监管器 DEI 重映射值。 |
| **dscp-for-red**（*0..63*；默认：**0**） | 红色数据包的监管器 DSCP 重映射值。 |
| **dscp-for-yellow**（*0..63*；默认：**0**） | 黄色数据包的监管器 DSCP 重映射值。 |
| **pcp-for-red**（*0..7*；默认：**0**） | 红色数据包的监管器 PCP 重映射值。 |
| **pcp-for-yellow**（*0..7*；默认：**0**） | 黄色数据包的监管器 PCP 重映射值。 |

## 访问控制列表 {#access-control-list}

---

访问控制列表由入站策略和出站策略引擎组成，最多允许配置 128 条策略规则（受 RouterOS 限制）。它是一种高级工具，可基于二层、三层和四层协议头字段条件进行线速数据包过滤、转发、整形和修改。

:::info
有关支持访问控制列表的 Cloud Router Switch 设备，请参阅摘要部分。
:::

:::danger
由于硬件限制，无法在特定端口上匹配广播/组播流量。您应使用端口隔离、在入站端口上丢弃流量，或使用 VLAN 过滤来防止某些广播/组播流量被转发。
:::

**子菜单：** `/interface/ethernet/switch/acl`

### 针对数据包 MAC 相关字段的 ACL 条件部分 {#acl-condition-part-for-mac-related-fields-of-packets}

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes \| no*; Default: **no**) | 启用或禁用 ACL 表项。 |
| **table** (*egress \| ingress*; Default: **ingress**) | 为入向或出向数据包选择策略表。 |
| **invert-match** (*yes \| no*; Default: **no**) | 反转整个 ACL 规则匹配。 |
| **src-ports** (*ports,trunks*) | 匹配的物理源端口或 trunk。 |
| **dst-ports** (*ports,trunks*) | 匹配的物理目的端口或 trunk。由于硬件限制，无法在出口端口匹配广播/组播流量。 |
| **mac-src-address** (*MAC address/Mask*) | 源 MAC 地址和掩码。 |
| **mac-dst-address** (*MAC address/Mask*) | 目的 MAC 地址和掩码。 |
| **dst-addr-registered** (*yes \| no*) | 定义是否匹配处于已注册状态的数据包 - 其目的 MAC 地址位于 UFDB/MFDB/RFDB 中的数据包。仅在出口表中有效。 |
| **mac-protocol** (*802.2 \| arp \| homeplug-av \| ip \| ip-or-ipv6 \| ipv6 \| ipx \| lldp \| loop-protect \| mpls-multicast \| mpls-unicast \| mvrp \| non-ip \| packing-compr \| packing-simple \| pppoe \| pppoe-discovery \| rarp \| service-vlan \| vlan or integer: 0..65535 decimal format or 0x0000-0xffff hex format*) | 以太网负载类型（MAC 层协议）<ul><li><strong>802.2</strong> - 802.2 帧 (0x0004)</li><li><strong>arp</strong> - 地址解析协议 (0x0806)</li><li><strong>capsman</strong> - CAPsMAN 到 CAP 的 MAC 层连接 (0x88BB)</li><li><strong>dot1x</strong> - EAPoL IEEE 802.1X (0x888E)</li><li><strong>homeplug-av</strong> - HomePlug AV MME (0x88E1)</li><li><strong>ip</strong> - 互联网协议版本 4 (0x0800)</li><li><strong>ip-or-ipv6</strong> - IPv4 或 IPv6 (0x0800 或 0x86DD)</li><li><strong>ipv6</strong> - 互联网协议版本 6 (0x86DD)</li><li><strong>ipx</strong> - 互联网分组交换 (0x8137)</li><li><strong>lacp</strong> - 链路聚合控制协议 (0x8809)</li><li><strong>lldp</strong> - 链路层发现协议 (0x88CC)</li><li><strong>loop-protect</strong> - Loop Protect 协议 (0x9003)</li><li><strong>macsec</strong> - MAC 安全 IEEE 802.1AE (0x88E5)</li><li><strong>mpls-multicast</strong> - MPLS 组播 (0x8848)</li><li><strong>mpls-unicast</strong> - MPLS 单播 (0x8847)</li><li><strong>mvrp</strong> - 多 VLAN 注册协议 (0x88F5)</li><li><strong>non-ip</strong> - 非互联网协议版本 4（不是 0x0800）</li><li><strong>packing-compr</strong> - 使用压缩 [IP 打包](../system-information-and-utilities/ip-packing.md) 的封装数据包 (0x9001)</li><li><strong>packing-simple</strong> - 使用简单 [IP 打包](../system-information-and-utilities/ip-packing.md) 的封装数据包 (0x9000)</li><li><strong>pppoe</strong> - PPPoE 会话阶段 (0x8864)</li><li><strong>pppoe-discovery</strong> - PPPoE 发现阶段 (0x8863)</li><li><strong>rarp</strong> - 反向地址解析协议 (0x8035)</li><li><strong>romon</strong> - Router Management Overlay Network RoMON (0x88BF)</li><li><strong>service-vlan</strong> - 提供商桥接 (IEEE 802.1ad) &amp; 最短路径桥接 IEEE 802.1aq (0x88A8)</li><li><strong>vlan</strong> - VLAN 标记帧 (IEEE 802.1Q) 和具有 NNI 兼容性的最短路径桥接 IEEE 802.1aq (0x8100)</li></ul> |
| **drop-precedence** (*drop \| green \| red \| yellow*) | 匹配内部丢弃优先级。仅在出口表中有效。 |
| **custom-fields** |  |

### 针对数据包 VLAN 相关字段的 ACL 条件部分 {#acl-condition-part-for-vlan-related-fields-of-packets}

| 属性 | 描述 |
| :-- | :-- |
| **lookup-vid**（*0..4095*） | 查找中使用的 VLAN ID。它可以在到达出站表之前更改。 |
| **service-vid**（*0-4095*） | 匹配服务 VLAN ID。 |
| **service-pcp**（*0..7*） | 匹配服务 PCP。 |
| **service-dei**（*0..1*） | 匹配服务 DEI。 |
| **service-tag**（*priority-tagged \| tagged \| tagged-or-priority-tagged \| untagged*） | 服务标签的格式。 |
| **customer-vid**（*0-4095*） | 匹配客户 VLAN ID。 |
| **customer-pcp**（*0..7*） | 匹配客户 PCP。 |
| **customer-dei**（*0..1*） | 匹配客户 DEI。 |
| **customer-tag**（*priority-tagged \| tagged \| tagged-or-priority-tagged \| untagged*） | 客户标签的格式。 |
| **priority**（*0..15*） | 匹配内部优先级。仅在出站表中有效。 |

### 针对数据包 IPv4 和 IPv6 相关字段的 ACL 条件部分 {#acl-condition-part-for-ipv4-and-ipv6-related-fields-of-packets}

| 属性 | 描述 |
| :-- | :-- |
| **ip-src**（*IPv4/0..32*） | 匹配源 IPv4 地址。 |
| **ip-dst**（*IPv4/0..32*） | 匹配目标 IPv4 地址。 |
| **ip-protocol**（*tcp \| udp \| udp-lite \| other*） | IP 协议类型。 |
| **src-l3-port**（*0-65535*） | 匹配三层源端口。 |
| **dst-l3-port**（*0-65535*） | 匹配三层目标端口。 |
| **ttl**（*0 \| 1 \| max \| other*） | 匹配数据包的 TTL 字段。 |
| **dscp**（*0..63*） | 匹配数据包的 DSCP 字段。 |
| **ecn**（*0..3*） | 匹配数据包的 ECN 字段。 |
| **fragmented**（*yes \| no*） | 是否匹配分片数据包。 |
| **first-fragment**（*yes \| no*） | YES 匹配未分片和第一个分片，NO 匹配其他分片。 |
| **ipv6-src**（*IPv6/0..128*） | 匹配源 IPv6 地址。 |
| **ipv6-dst**（*IPv6/0..128*） | 匹配目标 IPv6 地址。 |
| **mac-isolation-profile**（*community1 \| community2 \| isolated \| promiscuous*） | 基于 UFDB 匹配隔离配置文件。仅在出站策略表中有效。 |
| **src-mac-addr-state**（*dynamic-station-move \| sa-found \| sa-not-found \| static-station-move*） | 定义是否匹配具有注册状态的数据包 - 其目标 MAC 地址在 UFDB/MFDB/RFDB 中的数据包。仅在出站策略表中有效。 |
| **flow-id**（*0..63*） |  |

### ACL 规则操作部分 {#acl-rule-action-part}

| 属性 | 描述 |
| :-- | :-- |
| <strong>action</strong> (<em>copy-to-cpu &#124; drop &#124; forward &#124;</em><em>redirect-to-cpu &#124; send-to-new-dst-ports</em>; Default: <br/><strong>forward</strong>) | <ul class="bullets"><li>copy-to-cpu - 如果数据包匹配 ACL 条件，则复制到 CPU。</li><li>drop - 如果数据包匹配 ACL 条件，则丢弃。</li><li>forward - 如果数据包匹配 ACL 条件，则转发。</li><li>redirect-to-cpu - 如果数据包匹配 ACL 条件，则重定向到 CPU。</li><li>send-to-new-dst-ports - 如果数据包匹配 ACL 条件，则发送到新的目的端口。</li></ul> |
| **new-dst-ports** (*ports,trunks*) | 如果动作为 "send-to-new-dst-ports"，则此属性设置哪些端口/trunk 是新的目的地。 |
| **mirror-to** (*mirror0 \| mirror1*) | ACL 数据包的镜像目的地。 |
| **policer** (*policer*) | 为 ACL 数据包应用的 ACL Policer。 |
| **src-mac-learn** (*yes \| no*) | 是否学习匹配 ACL 数据包的源 MAC。仅在入向策略表中有效。 |
| **new-service-vid** (*0..4095*) | ACL 数据包的新服务 VLAN ID。 |
| **new-service-pcp** (*0..7*) | ACL 数据包的新服务 PCP。 |
| **new-service-dei** (*0..1*) | ACL 数据包的新服务 DEI。 |
| **new-customer-vid** (*0..4095*) | ACL 数据包的新客户 VLAN ID。如果设置为 4095，则流量被丢弃。 |
| **new-customer-pcp** (*0..7*) | ACL 数据包的新客户 PCP。 |
| **new-customer-dei** (*0..1*) | ACL 数据包的新客户 DEI。 |
| **new-dscp** (*0..63*) | ACL 数据包的新 DSCP。 |
| **new-priority** (*0..15*) | ACL 数据包的新内部优先级。 |
| **new-drop-precedence** (*drop \| green \| red \| yellow*) | ACL 数据包的新内部丢弃优先级。 |
| **new-registered-state** (*yes \| no*) | 是否修改数据包状态。YES 将数据包状态设置为已注册，NO - 未注册。仅在入向策略表中有效。 |
| **new-flow-id** (*0..63*) |  |

### ACL 数据包过滤绕过部分 {#filter-bypassing-part-for-acl-packets}

| 属性 | 描述 |
| :-- | :-- |
| **attack-filter-bypass**（*yes \| no*；默认：**no**） |  |
| **ingress-vlan-filter-bypass**（*yes \| no*；默认：**no**） | 允许匹配的数据包绕过 VLAN 表中的入站 VLAN 过滤。这仅适用于入站策略表。 |
| **egress-vlan-filter-bypass**（*yes \| no*；默认：**no**） | 允许匹配的数据包绕过 VLAN 表中的出站 VLAN 过滤。这仅适用于入站策略表。 |
| **isolation-filter-bypass**（*yes \| no*；默认：**no**） | 允许匹配的数据包绕过隔离表。这仅适用于入站策略表。 |
| **egress-vlan-translate-bypass**（*yes \| no*；默认：**no**） | 允许匹配的数据包绕过出站 VLAN 转换表。 |

### ACL 监管器 {#acl-policer}

**子菜单：** `/interface/ethernet/switch/acl/policer`

| 属性 | 描述 |
| :-- | :-- |
| **name** (*string*; Default: **policerX**) | ACL 中使用的 Policer 名称。 |
| **yellow-rate** (*integer*) | 具有黄色丢弃优先级的数据包的最大数据速率限制。 |
| **yellow-burst** (*integer*; Default: **0**) | 具有黄色丢弃优先级的数据包在允许突发期间可传输的最大数据速率。 |
| **red-rate** (*integer*; Default: **0**) | 具有红色丢弃优先级的数据包的最大数据速率限制。 |
| **red-burst** (*integer*; Default: **0**) | 具有红色丢弃优先级的数据包在允许突发期间可传输的最大数据速率。 |
| **meter-unit** (*bit \| packet*; Default: **bit**) | ACL 流量速率的测量单位。 |
| **meter-len** (*layer-1 \| layer-2 \| layer-3*; Default: **layer-1**) | 设置用于计量的数据包字节长度的数据包分类。<ul class="bullets"><li>layer-1 - 包括整个二层帧 + FCS + 包间间隔 + 前导码。</li><li>layer-2 - 包括二层帧 + FCS。</li><li>layer-3 - 仅包括三层 + 以太网填充，不包括二层头和 FCS。</li></ul> |
| **color-awareness** (*yes \| no*; Default: **no**) | YES 使 policer 考虑预先着色的丢弃优先级，NO - 忽略丢弃优先级。 |
| **bucket-coupling** (*yes \| no*; 默认值： **no**) |  |
| **yellow-action** (*drop \| forward \| remark*; Default: **drop**) | 对具有黄色丢弃优先级的超限流量执行的动作。 |
| **new-dei-for-yellow** (*0..1 \| remap*) | 黄色丢弃优先级数据包的新 DEI。 |
| **new-pcp-for-yellow** (*0..7 \| remap*) | 黄色丢弃优先级数据包的新 PCP。 |
| **new-dscp-for-yellow** (*0..63 \| remap*) | 黄色丢弃优先级数据包的新 DSCP。 |
| **red-action** (*drop \| forward \| remark*; Default: **drop**) | 对具有红色丢弃优先级的超限流量执行的动作。 |
| **new-dei-for-red** (*0..1 \| remap*) | 红色丢弃优先级数据包的新 DEI。 |
| **new-pcp-for-red** (*0..7 \| remap*) | 红色丢弃优先级数据包的新 PCP。 |
| **new-dscp-for-red** (*0..63 \| remap*) | 红色丢弃优先级数据包的新 DSCP。 |

## 另请参阅 {#see-also}

---

- [CRS1xx/2xx 系列交换机示例](./user-guides/crs1xx-2xx-series-switches-examples.md)
- [基本 VLAN 交换](./user-guides/basic-vlan-switching.md)
- [网桥硬件卸载](index.md#bridge-hardware-offloading)
- [生成树协议](./user-guides/spanning-tree-protocol.md)
- [IGMP Snooping](./user-guides/bridge-igmp-mld-snooping.md)
- [DHCP Snooping 和 Option 82](index.md#dhcp-snooping-and-dhcp-option-82)
- [RouterBOARD 上的 MTU](../hardware/mtu-in-routeros.md)
- [Layer2 配置错误](./user-guides/layer2-misconfiguration.md)
