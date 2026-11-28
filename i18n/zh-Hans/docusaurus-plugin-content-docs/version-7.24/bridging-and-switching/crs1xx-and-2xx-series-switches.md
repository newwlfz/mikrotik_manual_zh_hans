---
title: "CRS1xx 和 2xx 系列交换机"
description: "本页介绍 MikroTik RouterOS CRS1xx 和 2xx 系列交换机，重点说明其高性能特性，包括 Layer 2/3 交换、VLAN 支持、QoS 工具、镜像功能和端口隔离选项。文中详细说明型号差异、CPU 速度和巨型帧大小等技术规格，并提供 VLAN 相关术语的缩写。"
tags:
  - 'vlan'
  - 'qos'
  - 'switching'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/crs1xx-and-2xx-series-switches
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

Cloud Router Switch 系列是高度集成的交换机，配备高性能 MIPS CPU 和功能丰富的数据包处理器。CRS 交换机可应用于多种以太网场景，包括非网管交换机、Layer 2 网管交换机、运营商交换机，以及无线/有线统一数据包处理。请参阅 [Cloud Router Switch](/docs/bridging-and-switching/user-guides/crs1xx-2xx-series-switches-examples) 配置示例。

:::danger
本文适用于 CRS1xx 和 CRS2xx 系列交换机，不适用于配备 Marvell Prestera 交换芯片的 MikroTik 设备（例如 CRS3xx）。对于配备 Marvell Prestera 交换芯片的 MikroTik 设备，请参阅 [Marvell Prestera switch chip features](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 手册。
:::

| 功能 | 说明 |
| :-- | :-- |
| **转发** | <ul class="bullets"><li>可配置端口用于交换或路由</li><li>完整的无阻塞线速交换</li><li>Unicast FDB 中最多 16k 个 MAC 条目，用于 Layer 2 单播转发</li><li>Multicast FDB 中最多 1k 个 MAC 条目，用于组播转发</li><li>Reserved FDB 中最多 256 个 MAC 条目，用于控制和管理的目的</li><li>所有 Forwarding Database 均支持 IVL 和 SVL</li><li>可配置基于端口的 MAC 学习限制</li><li>支持巨型帧（CRS1xx/2xx：9204 字节；CRS125/CRS109：4064 字节）</li><li>支持 IGMP Snooping</li></ul> |
| **镜像** | <ul class="bullets"><li>多种镜像类型：<ul class="bullets"><li>基于端口的镜像</li><li>基于 VLAN 的镜像</li><li>基于 MAC 的镜像</li></ul></li><li>2 个独立的镜像分析器端口</li></ul> |
| **VLAN** | <ul class="bullets"><li>完全兼容 IEEE802.1Q 和 IEEE802.1ad VLAN</li><li>4k 个活动 VLAN</li><li>灵活的 VLAN 分配：<ul class="bullets"><li>基于端口的 VLAN</li><li>基于协议的 VLAN</li><li>基于 MAC 的 VLAN</li></ul></li><li>任意 VLAN 之间的转换和交换</li><li>1:1 VLAN 交换 - VLAN 到端口的映射</li><li>VLAN 过滤</li></ul> |
| **端口隔离和泄漏** | <ul class="bullets"><li>适用于 Private VLAN 实现</li><li>3 种端口配置文件类型：Promiscuous、Isolated 和 Community</li><li>最多 28 个 Community 配置文件</li><li>泄漏配置文件允许绕过出口 VLAN 过滤</li></ul> |
| **链路聚合** | <ul class="bullets"><li>支持静态链路聚合组</li><li>最多 8 个 Port Trunk 组</li><li>每个 Port Trunk 组最多 8 个成员端口</li><li>硬件自动故障切换和负载均衡</li></ul> |
| **服务质量（QoS）** | <ul class="bullets"><li>灵活的 QoS 分类和分配：<ul class="bullets"><li>基于端口</li><li>基于 MAC</li><li>基于 VLAN</li><li>基于协议</li><li>基于 PCP/DEI</li><li>基于 DSCP</li><li>基于 ACL</li></ul></li><li>QoS 重新标记和重新映射，用于服务提供商和客户端网络之间的 QoS 域转换</li><li>根据配置的优先级覆盖每项 QoS 分配</li></ul> |
| **整形和调度** | <ul class="bullets"><li>每个物理端口 8 个队列</li><li>支持按端口、按队列、按队列组进行整形</li></ul> |
| **访问控制列表** | <ul class="bullets"><li>入口和出口 ACL 表</li><li>最多 128 条 ACL 规则（受 RouterOS 限制）</li><li>基于端口、L2、L3、L4 协议头字段进行分类</li><li>ACL 动作包括过滤、转发和修改协议头字段</li></ul> |

## Cloud Router Switch 型号 {#cloud-router-switch-models}

---

此表说明 Cloud Router Switch 各型号之间的主要差异。

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

## 缩写和说明 {#abbreviations-and-explanations}

---

CVID - Customer VLAN id：IEEE 802.1ad 帧的内层 VLAN 标签 id

SVID - Service VLAN id：IEEE 802.1ad 帧的外层 VLAN 标签 id

IVL - Independent VLAN learning - 学习/查找基于 MAC 地址和 VLAN ID。

SVL - Shared VLAN learning - 学习/查找基于 MAC 地址，而不基于 VLAN ID。

TPID - Tag Protocol Identifier（标签协议标识符）

PCP - Priority Code Point：一个 3 位字段，表示 IEEE 802.1p 优先级

DEI - 丢弃合格指示符

DSCP - 区分服务代码点

Drop precedence - 一种内部 CRS 交换机 QoS 属性，用于数据包入队或丢弃。

## 端口交换 {#port-switching}

---

要在 CRS1xx/2xx 系列交换机上设置端口交换，请查看 [Bridge Hardware Offloading](/docs/bridging-and-switching/crs1xx-and-2xx-series-switches#bridge-hardware-offloading) 页面。

:::warning
当创建硬件卸载网桥时添加交换端口组，会在 CRS 交换机中创建动态保留 VLAN 条目（VLAN4091；VLAN4090；VLAN4089；等）。这些 VLAN 是内部运行所必需的，其优先级低于用户配置的 VLAN。
:::

### 多个交换组 {#multiple-switch-groups}

CRS1xx/2xx 系列交换机允许使用多个启用硬件卸载的网桥；这样可轻松隔离多个交换组。只需创建多个网桥并启用硬件卸载即可。

:::warning
多个硬件卸载网桥配置旨在提供快速、简单的端口隔离方案，但会限制 CRS 交换芯片支持的部分 VLAN 功能。对于高级配置，请在 CRS 交换芯片中为所有端口使用一个网桥，配置 VLAN，并通过端口隔离配置文件配置隔离端口组。
:::

:::danger
CRS1xx/2xx 系列交换机可以在启用 (R)STP 的情况下运行多个硬件卸载网桥，但不建议这样做，因为该设备并非设计用于在硬件层面运行多个 (R)STP 实例。要隔离多个交换组并启用 (R)STP，应通过端口隔离配置文件配置隔离端口组。
:::

## 全局设置 {#global-settings}

---

CRS 交换芯片可从 `/interface/ethernet/switch` 控制台菜单进行配置。

**子菜单：** `/interface/ethernet/switch`

| 属性 | 说明 |
| :-- | :-- |
| **name** (*字符串值*；默认：**switch1**) | 交换机名称。 |
| **bridge-type** (*customer-vid-used-as-lookup-vid \| service-vid-used-as-lookup-vid*；默认：**customer-vid-used-as-lookup-vid**) | 网桥类型定义哪个 VLAN 标签用作 Lookup-VID。Lookup-VID 作为所有基于 VLAN 查找的 VLAN 键。 |
| **mac-level-isolation** (*yes \| no*；默认：**yes**) | 全局启用或禁用 MAC 层隔离。启用后，交换机将检查单播转发表中的源 MAC 地址和目标 MAC 地址条目及其 `isolation-profile`。默认情况下，交换机会学习 MAC 地址并将其放入 `promiscuous` 隔离配置文件。创建静态单播条目时可使用其他隔离配置文件。如果源 MAC 地址或目标 MAC 地址位于 `promiscuous` 隔离配置文件中，则转发数据包。如果源 MAC 地址和目标 MAC 地址均位于同一 `community1` 或 `community2` 隔离配置文件中，则转发数据包。当源 MAC 地址和目标 MAC 地址的隔离配置文件为 `isolated`，或源 MAC 地址和目标 MAC 地址的隔离配置文件来自不同社区时（例如源 MAC 地址为 `community1`，目标 MAC 地址为 `community2`），将丢弃数据包。全局禁用 MAC 层隔离时，将绕过隔离检查。 |
| **use-svid-in-one2one-vlan-lookup** (*yes \| no*；默认：**no**) | 是否使用 service VLAN ID 进行 1:1 VLAN 交换查找。 |
| **use-cvid-in-one2one-vlan-lookup** (*yes \| no*；默认：**yes**) | 是否使用 customer VLAN ID 进行 1:1 VLAN 交换查找。 |
| <strong>multicast-lookup-mode</strong> (<em>dst-ip-and-vid-for-ipv4 &#124; dst-mac-and-vid-always</em>；<br/>默认：<strong>dst-ip-and-vid-for-ipv4</strong>) | IPv4 组播桥接的查找模式。<ul class="bullets"><li>dst-mac-and-vid-always - 对于所有数据包类型，查找键为目标 MAC 和 VLAN ID。</li><li>dst-ip-and-vid-for-ipv4 - 对于 IPv4 数据包，查找键为目标 IP 和 VLAN ID。对于其他数据包类型，查找键为目标 MAC 和 VLAN ID。</li></ul> |
| **unicast-fdb-timeout** (*时间间隔*；默认：**5m**) | Unicast FDB 条目的超时时间。 |
| **override-existing-when-ufdb-full** (*yes \| no*；默认：**no**) | 启用或禁用在 UFDB 已满时覆盖老化值最低的现有条目。 |

| 属性 | 说明 |
| :-- | :-- |
| **drop-if-no-vlan-assignment-on-ports** (*ports*；默认：**none**) | 未应用基于 MAC、基于协议的 VLAN 分配或 Ingress VLAN Translation 时丢弃帧的端口。 |
| **drop-if-invalid-or-src-port- -not-member-of-vlan-on-ports** (*ports*；默认：**none**) | 丢弃无效帧以及其他端口 VLAN ID 帧的端口。 |
| **unknown-vlan-lookup-mode** (*ivl \| svl*；默认：**svl**) | 对 VLAN 无效的数据包使用的查找和学习模式。 |
| **forward-unknown-vlan** (*yes \| no*；默认：**yes**) | 是否允许转发不属于 VLAN 表的 VLAN。 |

| 属性 | 说明 |
| :-- | :-- |
| **bypass-vlan-ingress-filter-for** (*protocols*；默认：**none**) | 不参与 Ingress VLAN 过滤的协议。这些协议即使 VLAN 无效也不会被丢弃。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1） |
| **bypass-ingress-port-policing-for** (*protocols*；默认：**none**) | 不参与 Ingress Port Policing 的协议。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1） |
| **bypass-l2-security-check-filter-for** (*protocols*；默认：**none**) | 不参与 Policy rule 安全检查的协议。（arp、dhcpv4、dhcpv6、eapol、igmp、mld、nd、pppoe-discovery、ripv1） |

| 属性 | 说明 |
| :-- | :-- |
| **ingress-mirror0** (*port \| trunk,format*；默认：**none,modified**) | 第一个入口镜像 analyzer 端口或 trunk，以及镜像格式：<ul class="bullets"><li>analyzer-configured - 数据包与发往目标的数据包相同。VLAN 格式根据 analyzer 端口的 VLAN 配置进行修改。</li><li>modified - 数据包与发往目标的数据包相同。VLAN 格式根据出口端口的 VLAN 配置进行修改。</li><li>original - 镜像流量时不对原始入站数据包格式做任何更改。但 service VLAN 标签会在边缘端口被剥离。</li></ul> |
| **ingress-mirror1** (*port \| trunk,format*；默认：**none,modified**) | 第二个入口镜像 analyzer 端口或 trunk，以及镜像格式：<ul class="bullets"><li>analyzer-configured - 数据包与发往目标的数据包相同。VLAN 格式根据 analyzer 端口的 VLAN 配置进行修改。</li><li>modified - 数据包与发往目标的数据包相同。VLAN 格式根据出口端口的 VLAN 配置进行修改。</li><li>original - 镜像流量时不对原始入站数据包格式做任何更改。但 service VLAN 标签会在边缘端口被剥离。</li></ul> |
| **ingress-mirror-ratio** (*1/32768..1/1*；默认：**1/1**) | 入口镜像数据包占所有数据包的比例。 |
| **egress-mirror0** (*port \| trunk,format*；默认：**none,modified**) | 第一个出口镜像 analyzer 端口或 trunk，以及镜像格式：<ul class="bullets"><li>analyzer-configured - 数据包与发往目标的数据包相同。VLAN 格式根据 analyzer 端口的 VLAN 配置进行修改。</li><li>modified - 数据包与发往目标的数据包相同。VLAN 格式根据出口端口的 VLAN 配置进行修改。</li><li>original - 镜像流量时不对原始入站数据包格式做任何更改。但 service VLAN 标签会在边缘端口被剥离。</li></ul> |
| **egress-mirror1** (*port \| trunk,format*；默认：**none,modified**) | 第二个出口镜像 analyzer 端口或 trunk，以及镜像格式：<ul class="bullets"><li>analyzer-configured - 数据包与发往目标的数据包相同。VLAN 格式根据 analyzer 端口的 VLAN 配置进行修改。</li><li>modified - 数据包与发往目标的数据包相同。VLAN 格式根据出口端口的 VLAN 配置进行修改。</li><li>original - 镜像流量时不对原始入站数据包格式做任何更改。但 service VLAN 标签会在边缘端口被剥离。</li></ul> |
| **egress-mirror-ratio** (*1/32768..1/1*；默认：**1/1**) | 出口镜像数据包占所有数据包的比例。 |
| **mirror-egress-if-ingress-mirrored** (*yes \| no*；默认：**no**) | 当数据包同时应用入口和出口镜像时，如果禁用此设置，则仅对该数据包执行入口镜像。如果启用此设置，则应用两种镜像类型。 |
| **mirror-tx-on-mirror-port** (*yes \| no*；默认：**no**) |  |
| **mirrored-packet-qos-priority** (*0..7*；默认：**0**) | 镜像数据包中重新标记的优先级。 |
| **mirrored-packet-drop-precedence** (*drop \| green \| red \| yellow*；默认：**green**) | 镜像数据包中重新标记的丢弃优先级。该 QoS 属性用于镜像数据包的入队或丢弃。 |
| **fdb-uses** (*mirror0 \| mirror1*；默认：**mirror0**) | 用于基于 FDB 镜像的 analyzer 端口。 |
| **vlan-uses** (*mirror0 \| mirror1*；默认：**mirror0**) | 用于基于 VLAN 镜像的 analyzer 端口。 |

## 端口设置 {#port-settings}

---

**子菜单：** `/interface/ethernet/switch/port`

| 属性 | 说明 |
| :-- | :-- |
| **vlan-type** (*edge-port \| network-port*；默认值：**network-port**) | 端口 VLAN 类型指定是否在 UFDB 学习中使用 VLAN ID。network port 会在 UFDB 中学习 VLAN ID，edge port 不会，使用 VLAN 0。该行为仅在 IVL 学习模式下可观察。 |
| <strong>isolation-leakage-profile-override</strong> (<em>yes &#124; no</em>；默认值：<strong>!isolation-leakage-profile-override</strong>) <br/><strong>isolation-leakage-profile</strong> (<em>0..31</em>；) | 用于端口隔离/泄漏配置的自定义端口配置文件。<ul class="bullets"><li>端口级隔离配置文件 0。uplink 端口，允许该端口与设备中的所有端口通信。</li><li>端口级隔离配置文件 1。隔离端口，仅允许该端口与 uplink 端口通信。</li><li>端口级隔离配置文件 2 - 31。community 端口，允许同一 community 端口之间以及与 uplink 端口通信。</li></ul> |
| **learn-override** (*yes \| no*；默认值：**!learn-override**) **learn-limit** (*1..1023*；默认值：**!learn-limit**) | 启用或禁用 MAC 地址学习，并设置端口上的 MAC 限制。当设置 !learn-override 和 !learn-limit 时，MAC 学习限制默认禁用。自 RouterOS v6.42 起，属性 learn-override 已在 `/interface/bridge/port` 菜单中替换为 learn。 |
| **drop-when-ufdb-entry-src-drop** (*yes \| no*；默认值：**yes**) | 当 UFDB 条目具有 src-drop 动作时，启用或禁用丢弃数据包。 |
| **allow-unicast-loopback** (*yes \| no*；默认值：**no**) | 端口上的单播环回。启用后，对于已知单播数据包，当源端口和目的端口相同时，允许将其发回。 |
| **allow-multicast-loopback** (*yes \| no*；默认值：**no**) | 端口上的组播环回。启用后，对于已注册的组播或广播数据包，当源端口和目的端口相同时，允许将其发回。 |
| **action-on-static-station-move** (*copy-to-cpu \| drop \| forward \| redirect-to-cpu*；默认值：**forward**) | 当 UFDB 已包含具有该 MAC 但位于不同端口的静态条目时，对数据包执行的动作。 |
| **drop-dynamic-mac-move** (*yes \| no*；默认值：**no**) | 如果 MAC 已在另一个端口上学习到，则在 UFDB 超时前阻止该 MAC 重新学习。 |

| 属性 | 说明 |
| :-- | :-- |
| **allow-fdb-based-vlan-translate** (*yes \| no*；默认值：**no**) | 启用或禁用端口上基于 MAC 的 VLAN 转换。 |
| <strong>allow-mac-based-service-vlan-assignment-for</strong> (<em>all-frames &#124; none &#124;</em><em>tagged-frame-only &#124; untagged-and-priority-tagged-frame-only</em>；默认值：<br/><strong>none</strong>) | 应用基于 MAC 的 service VLAN 转换的帧类型。 |
| <strong>allow-mac-based-customer-vlan-assignment-for</strong> (<em>all-frames &#124; none &#124;</em><em>tagged-frame-only &#124; untagged-and-priority-tagged-frame-only</em>；默认值：<br/><strong>none</strong>) | 应用基于 MAC 的 customer VLAN 转换的帧类型。 |
| **default-customer-pcp** (*0..7*；默认值：**0**) | 端口的默认 customer PCP。 |
| **default-service-pcp** (*0..7*；默认值：**0**) | 端口的默认 service PCP。 |
| **pcp-propagation-for-initial-pcp** (*yes \| no*；默认值：**no**) | 启用或禁用入方向初始 PCP 分配的 PCP 传播。<ul class="bullets"><li>如果端口 vlan-type 为 Edge port，则从 customer PCP 复制 service PCP。</li><li>如果端口 vlan-type 为 Network port，则从 service PCP 复制 customer PCP。</li></ul> |
| **filter-untagged-frame** (*yes \| no*；默认值：**no**) | 是否过滤端口上的 untagged 帧。 |
| **filter-priority-tagged-frame** (*yes \| no*；默认值：**no**) | 是否过滤端口上带优先级的 tagged 帧。 |
| **filter-tagged-frame** (*yes \| no*；默认值：**no**) | 是否过滤端口上的 tagged 帧。 |

| 属性 | 说明 |
| :-- | :-- |
| **egress-vlan-tag-table-lookup-key** (*according-to-bridge-type \| egress-vid*；默认值：**egress-vid**) | 出方向 VLAN 表（VLAN Tagging）查找：<ul class="bullets"><li>egress-vid - 配置 Edge port 时，查找 VLAN ID 为 CVID；配置 Network port 时，查找 VLAN ID 为 SVID。</li><li>according-to-bridge-type - 配置 customer VLAN bridge 时，查找 VLAN ID 为 CVID；配置 service VLAN bridge 时，查找 VLAN ID 为 SVID。对于 service VLAN bridge 中的 Edge port，Customer tag 不会被修改。</li></ul> |
| **egress-vlan-mode** (*tagged \| unmodified \| untagged*；默认值：**unmodified**) | 端口上的出方向 VLAN 标记动作。 |
| **egress-pcp-propagation** (*yes \| no*；默认值：**no**) | 启用或禁用出方向 PCP 传播。<ul class="bullets"><li>如果端口 vlan-type 为 Edge port，则从 customer PCP 复制 service PCP。</li><li>如果端口 vlan-type 为 Network port，则从 service PCP 复制 customer PCP。</li></ul> |

| 属性 | 说明 |
| :-- | :-- |
| **ingress-mirror-to** (*mirror0 \| mirror1 \| none*；默认值：**none**) | 用于基于端口的入方向镜像的 Analyzer 端口。 |
| **ingress-mirroring-according-to-vlan** (*yes \| no*；默认值：**no**) |  |
| **egress-mirror-to** (*mirror0 \| mirror1 \| none*；默认值：**none**) | 用于基于端口的出方向镜像的 Analyzer 端口。 |

| 属性 | 说明 |
| :-- | :-- |
| **qos-scheme-precedence** (*da-based \| dscp-based \| ingress-acl-based \| pcp-based \| protocol-based \| sa-based \| vlan-based*；默认值：**pcp-based, sa-based, da-based, dscp-based, protocol-based, vlan-based**) | 指定在端口入方向应用的 QoS 分配方案。<ul class="bullets"><li>da-based</li><li>dscp-based</li><li>ingress-acl-based</li><li>pcp-based</li><li>protocol-based</li><li>sa-based</li><li>vlan-based</li></ul> |
| **pcp-or-dscp-based-qos-change-dei** (*yes \| no*；默认值：**no**) | 启用或禁用端口上基于 PCP 或 DSCP 的 DEI 修改。 |
| **pcp-or-dscp-based-qos-change-pcp** (*yes \| no*；默认值：**no**) | 启用或禁用端口上基于 PCP 或 DSCP 的 PCP 修改。 |
| **pcp-or-dscp-based-qos-change-dscp** (*yes \| no*；默认值：**no**) | 启用或禁用端口上基于 PCP 或 DSCP 的 DSCP 修改。 |
| **dscp-based-qos-dscp-to-dscp-mapping** (*yes \| no*；默认值：**yes**) | 启用或禁用端口上 DSCP 到内部 DSCP 的映射。 |
| **pcp-based-qos-drop-precedence-mapping** (*PCP/DEI-range:drop-precedence*；默认值：**0-15:green**) | PCP/DEI 到 drop precedence（drop \| green \| red \| yellow）映射的 drop precedence 新值。允许多个映射，以英文逗号分隔，例如“0-7:yellow,8-15:red”。 |
| **pcp-based-qos-dscp-mapping** (*PCP/DEI-range:DEI*；默认值：**0-15:0**) | PCP/DEI 到 DSCP（0..63）映射的 DSCP 新值。允许多个映射，以英文逗号分隔，例如“0-7:25,8-15:50”。 |
| **pcp-based-qos-dei-mapping** (*PCP/DEI-range:DEI*；默认值：**0-15:0**) | PCP/DEI 到 DEI（0..1）映射的 DEI 新值。允许多个映射，以英文逗号分隔，例如“0-7:0,8-15:1”。 |
| **pcp-based-qos-pcp-mapping** (*PCP/DEI-range:DEI*；默认值：**0-15:0**) | PCP/DEI 到 PCP（0..7）映射的 PCP 新值。允许多个映射，以英文逗号分隔，例如“0-7:3,8-15:4”。 |
| **pcp-based-qos-priority-mapping** (*PCP/DEI-range:DEI*；默认值：**0-15:0**) | PCP/DEI 到 priority（0..15）映射的内部优先级新值。允许多个映射，以英文逗号分隔，例如“0-7:5,8-15:15”。 |

| 属性 | 说明 |
| :-- | :-- |
| **priority-to-queue** (*priority-range:queue*；默认值：**0-15:0,1:1,2:2,3:3**) | 每个端口上内部优先级（0..15）到队列（0..7）的映射。 |
| <strong>per-queue-scheduling</strong> (<em>Scheduling-type:Weight</em>；默认值：<strong>wrr-group0:1,wrr-group0:2,wrr-group0:4,wrr-group0:8,wrr-group0:16,wrr-group0:32,</strong><br/><strong>wrr-group0:64,wrr-group0:128</strong>) | 设置端口对每个队列组使用 strict 或 weighted round robin 策略进行流量整形；每个队列以英文逗号分隔。 |

| 属性 | 说明 |
| :-- | :-- |
| <strong>ingress-customer-tpid-override</strong> (<em>yes &#124; no</em>；默认值：<strong>!ingress-customer-tpid-override</strong>) <br/><strong>ingress-customer-tpid</strong> (<em>0..10000</em>；默认值：<strong>0x8100</strong>) | 入方向 customer TPID override 允许接受具有自定义 customer tag TPID 的特定帧。默认值用于 802.1Q 帧的 tag。 |
| <strong>egress-customer-tpid-override</strong> (<em>yes &#124; no</em>；默认值：<strong>!egress-customer-tpid-override</strong>) <strong>egress-customer-tpid</strong> (<em>0..10000</em>；默认值：<br/><strong>0x8100</strong>) | 出方向 customer TPID override 允许对带 customer tag 的出方向帧进行自定义标识。默认值用于 802.1Q 帧的 tag。 |
| <strong>ingress-service-tpid-override</strong> (<em>yes &#124; no</em>；默认值：<strong>!ingress-service-tpid-override</strong>) <br/><strong>ingress-service-tpid</strong> (<em>0..10000</em>；默认值：<strong>0x88A8</strong>) | 入方向 service TPID override 允许接受具有自定义 service tag TPID 的特定帧。默认值用于 802.1AD 帧的 service tag。 |
| <strong>egress-service-tpid-override</strong> (<em>yes &#124; no</em>；默认值：<strong>!egress-service-tpid-override</strong>) <strong>egress-service-tpid</strong> (<em>0..10000</em>；默认值：<br/><strong>0x88A8</strong>) | 出方向 service TPID override 允许对带 service tag 的出方向帧进行自定义标识。默认值用于 802.1AD 帧的 service tag。 |

| 属性 | 说明 |
| :-- | :-- |
| **custom-drop-counter-includes** (*counters*；默认值：**none**) | 自定义包含项，用于统计交换机端口 custom-drop-packet 计数器的丢弃数据包。<ul><li><strong>device-loopback</strong></li><li><strong>fdb-hash-violation</strong></li><li><strong>exceeded-port-learn-limitation</strong></li><li><strong>dynamic-station-move</strong></li><li><strong>static-station-move</strong></li><li><strong>ufdb-source-drop</strong></li><li><strong>host-source-drop</strong></li><li><strong>unknown-host</strong></li><li><strong>ingress-vlan-filtered</strong></li></ul> |
| **queue-custom-drop-counter0-includes** (*counters*；默认值：**none**) | 自定义包含项，用于统计交换机端口 tx-queue-custom0-drop-packet 计数器的丢弃数据包以及 tx-queue-custom0-drop-byte 计数器的字节数。<br/><ul><li><strong>red</strong></li><li><strong>yellow</strong></li><li><strong>green</strong></li><li><strong>queue0</strong></li><li><strong>...</strong></li><li><strong>queue7</strong></li></ul> |
| **queue-custom-drop-counter1-includes** (*counters*；默认值：**none**) | 自定义包含项，用于统计交换机端口 tx-queue-custom1-drop-packet 计数器的丢弃数据包以及 tx-queue-custom1-drop-byte 计数器的字节数。<br/><ul><li><strong>red</strong></li><li><strong>yellow</strong></li><li><strong>green</strong></li><li><strong>queue0</strong></li><li><strong>...</strong></li><li><strong>queue7</strong></li></ul> |
| **policy-drop-counter-includes** (*counters*；默认值：**none**) | 自定义包含项，用于统计交换机端口 policy-drop-packet 计数器的丢弃数据包。<ul><li><strong>ingress-policing</strong></li><li><strong>ingress-acl</strong></li><li><strong>egress-policing</strong></li><li><strong>egress-acl</strong></li></ul> |

## 转发表 {#forwarding-databases}

---

### 单播 FDB {#unicast-fdb}

单播转发表最多支持 16K 个 MAC 条目。

**子菜单：** `/interface/ethernet/switch/unicast-fdb`

| 属性 | 说明 |
| :-- | :-- |
| **action** (*action*；默认：**forward**) | UFDB 条目的动作：<ul class="bullets"><li>dst-drop - 当数据包的目的 MAC 匹配该条目时，丢弃数据包。</li><li>dst-redirect-to-cpu - 当数据包的目的 MAC 匹配该条目时，将数据包重定向到 CPU。</li><li>forward - 转发数据包。</li><li>src-and-dst-drop - 当数据包的源 MAC 或目的 MAC 匹配该条目时，丢弃数据包。</li><li>src-and-dst-redirect-to-cpu - 当数据包的源 MAC 或目的 MAC 匹配该条目时，将数据包重定向到 CPU。</li><li>src-drop - 当数据包的源 MAC 匹配该条目时，丢弃数据包。</li><li>src-redirect-to-cpu - 当数据包的源 MAC 匹配该条目时，将数据包重定向到 CPU。</li></ul> |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用单播 FDB 条目。 |
| **isolation-profile** (*community1 \| community2 \| isolated \| promiscuous*；默认：**promiscuous**) | MAC 层隔离配置文件。 |
| **mac-address** (*MAC address*) | 当目的 MAC 或源 MAC 匹配该条目时，对该数据包应用动作命令。 |
| **mirror** (*yes \| no*；默认：**no**) | 启用或禁用基于源 MAC 或目的 MAC 的镜像。 |
| **port** (*port*) | 单播 FDB 条目的匹配端口。 |
| **qos-group** (*none*；默认：**none**) | 从 QoS group 菜单中定义的 QoS 组。 |
| **svl** (*yes \| no*；默认：**no**) | 单播 FDB 学习模式：<ul class="bullets"><li>Shared VLAN Learning (svl) - 学习/查找基于 MAC 地址，而不基于 VLAN ID。</li><li>Independent VLAN Learning (ivl) - 学习/查找同时基于 MAC 地址和 VLAN ID。</li></ul> |
| **vlan-id** (*0..4095*) | 单播 FDB 查找/学习的 VLAN id。 |

### 组播 FDB {#multicast-fdb}

CRS125 交换芯片在 MFDB 中最多支持 1024 个用于组播转发的条目。对于每个组播数据包，会在 MFDB 中执行目的 MAC 或目的 IP 查找。MFDB 条目不会自动学习，只能手动配置。

**子菜单：** `/interface/ethernet/switch/multicast-fdb`

| 属性 | 说明 |
| :-- | :-- |
| **address** (*X.X.X.X \| XX:XX:XX:XX:XX:XX*) | 匹配组播数据包的 IP 地址或 MAC 地址。 |
| **bypass-vlan-filter** (*yes \| no*；默认：**no**) | 允许对匹配的组播数据包绕过 VLAN 过滤。 |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用 Multicast FDB 条目。 |
| **ports** (*ports*) | 组播流量的成员端口。 |
| **qos-group** (*none*；默认：**none**) | 从 QoS group 菜单中定义的 QoS 组。 |
| **svl** (*yes \| no*；默认：**no**) | Multicast FDB 学习模式：<ul class="bullets"><li>Shared VLAN Learning (svl) - 学习/查找基于 MAC 地址，而不基于 VLAN ID。</li><li>Independent VLAN Learning (ivl) - 学习/查找同时基于 MAC 地址和 VLAN ID。</li></ul> |
| **vlan-id** (*0..4095*；默认：**0**) | Multicast FDB 查找 VLAN ID。如果 VLAN 学习模式为 IVL，则 VLAN id 为查找 ID，否则 VLAN id = 0。 |

### 保留的 FDB {#reserved-fdb}

Cloud Router Switch 支持 256 个 RFDB 条目。每个 RFDB 条目可通过特定命令存储 Layer2 单播或组播 MAC 地址。

**子菜单：** `/interface/ethernet/switch/reserved-fdb`

| 属性 | 说明 |
| :-- | :-- |
| **action** (*copy-to-cpu \| drop \| forward \| redirect-to-cpu*；默认：**forward**) | RFDB 条目的动作：<ul class="bullets"><li>copy-to-cpu - 当数据包的目的 MAC 与该条目匹配时，将数据包复制到 CPU。</li><li>drop - 当数据包的目的 MAC 与该条目匹配时，丢弃数据包。</li><li>forward - 当数据包的目的 MAC 与该条目匹配时，转发数据包。</li><li>redirect-to-cpu - 当数据包的目的 MAC 与该条目匹配时，将数据包重定向到 CPU。</li></ul> |
| **bypass-ingress-port-policing** (*yes \| no*；默认：**no**) | 允许对匹配的数据包绕过 Ingress Port Policer。 |
| **bypass-ingress-vlan-filter** (*yes \| no*；默认：**no**) | 允许对匹配的数据包绕过 VLAN 过滤。 |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用 Reserved FDB 条目。 |
| **mac-address** (*MAC address*；默认：**00:00:00:00:00:00**) | Reserved FDB 条目的匹配 MAC 地址。 |
| **qos-group** (*none*；默认：**none**) | 从 QoS group 菜单中定义的 QoS 组。 |

## VLAN

---

### VLAN 表 {#vlan-table}

VLAN 表支持 4096 个 VLAN 条目，用于存储 VLAN 成员信息以及 QoS、隔离、强制 VLAN、学习和镜像等其他 VLAN 信息。

**子菜单：** `/interface/ethernet/switch/vlan`

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 指示 VLAN 条目是否禁用。只有启用的条目才会应用于查找过程和转发决策。 |
| **flood** (*yes \| no*；默认：**no**) | 启用或禁用每个 VLAN 的强制 VLAN 泛洪。如果启用该功能，则忽略在 UFDB 或 MFDB 中进行的目的 MAC 查找结果，<br/>并强制数据包在 VLAN 中泛洪。 |
| **ingress-mirror** (*yes \| no*；默认：**no**) | 启用每个 VLAN 的入站镜像，以支持基于 VLAN 的镜像功能。 |
| **learn** (*yes \| no*；默认：**yes**) | 启用或禁用 VLAN 的源 MAC 学习。 |
| **ports** (*ports*) | VLAN 的成员端口。 |
| **qos-group** (*none*；默认：**none**) | 从 QoS group 菜单中定义的 QoS 组。 |
| **svl** (*yes \| no*；默认：**no**) | 用于在 UFDB 和 MFDB 中查找的 FDB 查找模式。<ul class="bullets"><li>Shared VLAN Learning (svl) - 学习/查找基于 MAC 地址，而不基于 VLAN ID。</li><li>Independent VLAN Learning (ivl) - 学习/查找同时基于 MAC 地址和 VLAN ID。</li></ul> |
| **vlan-id** (*0..4095*) | VLAN 成员条目的 VLAN ID。 |

### 出站 VLAN Tag {#egress-vlan-tag}

出站数据包可以分配不同的 VLAN tag 格式。当数据包发送到出站端口（目的端口）时，可以移除、添加 VLAN tag，或保持原样。每个端口都有独立的出站 VLAN tag 格式控制。tag 格式包括：

- Untagged
- Tagged
- Unmodified

Egress VLAN Tag 表包含 4096 个条目，用于 VLAN tag 选择。

**子菜单：** `/interface/ethernet/switch/egress-vlan-tag`

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用 Egress VLAN Tag 表条目。 |
| **tagged-ports** (*ports*) | 在出站时添加 tag 的端口。 |
| **vlan-id** (*0..4095*) | 在出站时添加 tag 的 VLAN ID。 |

### 入站/出站 VLAN Translation {#ingressegress-vlan-translation}

Ingress VLAN Translation 表允许每个端口最多配置 15 条条目。可以从数据包报头中选择一个或多个字段，用于在 Ingress VLAN Translation 表中查找。第一个匹配条目中配置的 S-VLAN 或 C-VLAN，或两者，将分配给该数据包。

**子菜单：** `/interface/ethernet/switch/ingress-vlan-translation, /interface/ethernet/switch/egress-vlan-translation`

| 属性 | 说明 |
| :-- | :-- |
| **customer-dei** (*0..1*；默认：**none**) | 匹配客户标签的 DEI。 |
| **customer-pcp** (*0..7*；默认：**none**) | 匹配客户标签的 PCP。 |
| **customer-vid** (*0..4095*；默认：**none**) | 匹配客户标签的 VLAN ID。 |
| **customer-vlan-format** (*any \| priority-tagged-or-tagged \| tagged \| untagged-or-tagged*；默认：**any**) | VLAN 转换规则适用的带客户标签的帧类型。 |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用 VLAN 转换条目。 |
| **new-customer-vid** (*0..4095*；默认：**none**) | 新的客户 VLAN ID 将替换匹配的客户 VLAN ID。如果设置为 4095 并使用 ingress VLAN 转换，则会丢弃流量。 |
| **new-service-vid** (*0..4095*；默认：**none**) | 新的服务 VLAN ID 将替换匹配的服务 VLAN ID。 |
| **pcp-propagation** (*yes \| no*；默认：**no**) | 启用或禁用 PCP 传播。<ul class="bullets"><li>如果端口类型为 Edge，则从服务 PCP 复制客户 PCP。</li><li>如果端口类型为 Network，则从客户 PCP 复制服务 PCP。</li></ul> |
| **ports** (*ports*) | VLAN 转换规则匹配的交换机端口。 |
| **protocol** (*protocols*；默认：**none**) | 匹配的 Ethernet 协议。*（仅适用于 Ingress VLAN Translation）* |
| **sa-learning** (*yes \| no*；默认：**no**) | 启用或禁用 VLAN 转换后的源 MAC 学习。*（仅适用于 Ingress VLAN Translation）* |
| **service-dei** (*0..1*；默认：**none**) | 匹配服务标签的 DEI。 |
| **service-pcp** (*0..7*；默认：**none**) | 匹配服务标签的 PCP。 |
| **service-vid** (*0..4095*；默认：**none**) | 匹配服务标签的 VLAN ID。 |
| **service-vlan-format** (*any \| priority-tagged-or-tagged \| tagged \| untagged-or-tagged*；默认：**any**) | VLAN 转换规则适用的带服务标签的帧类型。 |

下表列出了会触发设置了特定 VLAN 格式的规则的流量；请注意，带有 VLAN ID 0 标签的流量是一种特殊情况，也会予以考虑。

| 属性 | 说明 |
| :-- | :-- |
| **any** | 接受：<ul><li>未带标签的流量</li><li>带标签的流量</li><li>带优先级标签的流量</li><li>VLAN 0 流量</li><li>带优先级的 VLAN 0 流量</li></ul> |
| **priority-tagged-or-tagged** | 接受：<ul><li>带标签的流量</li><li>带优先级标签的流量</li><li>VLAN 0 流量</li><li>带优先级的 VLAN 0 流量</li></ul> |
| **tagged** | 接受：<ul><li>带标签的流量</li><li>带优先级标签的流量</li></ul> |
| **untagged-or-tagged** | 接受：<ul><li>未带标签的流量</li><li>带标签的流量</li><li>带优先级标签的流量</li></ul> |

:::danger
如果 `VLAN-format` 设置为 `any`，则设置为 `0` 的 `customer-vid``/``service-vid` 将使用 VLAN 0 流量触发交换机规则。在这种情况下，交换机规则将查找未带标签的流量或带有 VLAN 0 标签的流量，并且只有 `untagged-or-tagged` 会过滤掉 VLAN 0 流量。
:::

### 基于协议的 VLAN {#protocol-based-vlan}

Protocol Based VLAN 表用于按端口为相关协议数据包分配 VID 和 QoS 属性。

**子菜单：** `/interface/ethernet/switch/protocol-based-vlan`

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用 Protocol Based VLAN 条目。 |
| **frame-type** (*ethernet \| llc \| rfc-1042*；默认：**ethernet**) | 匹配帧的封装类型。 |
| **new-customer-vid** (*0..4095*；默认：**0**) | 对于指定协议，新的 customer VLAN ID 会替换原始 customer VLAN ID。如果设置为 4095，则丢弃流量。 |
| **new-service-vid** (*0..4095*；默认：**0**) | 对于指定协议，新的 service VLAN ID 会替换原始 service VLAN ID。 |
| **ports** (*ports*) | Protocol-based VLAN 规则的匹配交换机端口。 |
| **protocol** (*protocol*；默认：**0**) | Protocol-based VLAN 规则的匹配协议。 |
| **qos-group** (*none*；默认：**none**) | 从 QoS group 菜单中定义的 QoS 组。 |
| **set-customer-vid-for** (*all \| none \| tagged \| untagged-or-priority-tagged*；默认：**all**) | 针对不同数据包类型的 customer VLAN ID 分配命令。 |
| **set-qos-for** (*all \| none \| tagged \| untagged-or-priority-tagged*；默认：**none**) | QoS 分配命令适用的帧类型。 |
| **set-service-vid-for** (*all \| none \| tagged \| untagged-or-priority-tagged*；默认：**all**) | 针对不同数据包类型的 service VLAN ID 分配命令。 |

### 基于 MAC 的 VLAN {#mac-based-vlan}

MAC Based VLAN 表用于根据源 MAC 分配 VLAN。

**子菜单：** `/interface/ethernet/switch/mac-based-vlan`

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用 MAC Based VLAN 条目。 |
| **new-customer-vid** (*0..4095*；默认：**0**) | 对于匹配的数据包，新的 customer VLAN ID 会替换原始 service VLAN ID。如果设置为 4095，则丢弃流量。 |
| **new-service-vid** (*0..4095*；默认：**0**) | 对于匹配的数据包，新的 service VLAN ID 会替换原始 service VLAN ID。 |
| **src-mac-address** (*MAC address*) | MAC based VLAN 规则的匹配源 MAC 地址。 |

:::warning
所有 CRS1xx/2xx 系列交换机最多支持 1024 条 MAC Based VLAN 表条目。
:::

### 1:1 VLAN 交换 {#11-vlan-switching}

1:1 VLAN switching 可用于替代匹配数据包的常规 L2 网桥。当数据包命中 1:1 VLAN switching 表项时，表项中的目的端口信息会分配给该数据包。UFDB 和 MFDB 表项中匹配的目的信息不再适用于该数据包。

**子菜单：** `/interface/ethernet/switch/one2one-vlan-switching`

| 属性 | 说明 |
| :-- | :-- |
| **customer-vid** (*0..4095*；默认：**0**) | 用于 1:1 VLAN switching 的匹配客户 VLAN id。 |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用 1:1 VLAN switching 表项。 |
| **dst-port** (*port*) | 匹配的 1:1 VLAN switching 数据包的目的端口。 |
| **service-vid** (*0..4095*；默认：**0**) | 用于 1:1 VLAN switching 的匹配客户 VLAN id。 |

## 端口隔离/泄漏 {#port-isolationleakage}

---

CRS 交换机支持灵活的多级隔离功能，可用于用户访问控制、流量工程以及高级安全和网络管理。隔离功能提供有组织的交换结构，使用户能够轻松编程并按端口、MAC 地址、VLAN、协议、流和帧类型控制访问。支持以下隔离和泄漏功能：

- 端口级隔离
- MAC 级隔离
- VLAN 级隔离
- 协议级隔离
- 流级隔离
- 以上功能的自由组合

端口级隔离支持在源端口和目的端口上使用不同的控制方案。每个表项都可以针对源端口或目的端口编程访问控制。

- 当表项编程为源端口访问控制时，该表项为。

应用于入站数据包。

- 当该条目配置了目标端口访问控制时，该条目

应用于出站数据包。

端口泄漏允许绕过端口上的出站 VLAN 过滤。泄漏端口允许访问其他端口，用于安全、网络控制和管理等各类应用。注意：当同一端口同时应用隔离和泄漏时，该端口将被隔离。

**子菜单：** `/interface/ethernet/switch/port-isolation`

**子菜单：** `/interface/ethernet/switch/port-leakage`

| 属性 | 描述 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用端口隔离/泄露条目。 |
| **flow-id** (*0..63*；默认：**none**) |  |
| **forwarding-type** (*bridged; routed*；默认：**bridged,routed**) | 在 Cloud Router Switch 上匹配的流量转发类型。 |
| **mac-profile** (*community1 \| community2 \| isolated \| promiscuous*；默认：**none**) | 匹配的 MAC 隔离/泄露配置文件。 |
| **port-profile** (*0..31*；默认：**none**) | 匹配的端口隔离/泄露配置文件。 |
| **ports** (*ports*；默认：**none**) | 隔离/泄露的端口。 |
| **protocol-type** (*arp; nd; dhcpv4; dhcpv6; ripv1*；默认：**arp,nd,dhcpv4,dhcpv6,ripv1**) | 包含在隔离/泄露中的协议。 |
| **registration-status** (*known; unknown*；默认：**known,unknown**) | 匹配数据包的注册状态。已知数据包存在于 UFDB 和 MFDB 中，未知数据包则不存在。 |
| **traffic-type** (*unicast; multicast; broadcast*；默认：**unicast,multicast,broadcast**) | 匹配的流量类型。 |
| **type** (*dst \| src*；默认：**src**) | 隔离/泄露条目的查找类型：<ul class="bullets"><li>src - 条目应用于端口的入站数据包。</li><li>dst - 条目应用于端口的出站数据包。</li></ul> |
| **vlan-profile** (*community1 \| community2 \| isolated \| promiscuous*；默认：**none**) | 匹配的 VLAN 隔离/泄露配置文件。 |

## Trunking

---

Cloud Router Switch 中的 Trunking 提供静态链路聚合组，并支持硬件自动故障切换和负载均衡。不支持与 IEEE802.3ad 和 IEEE802.1ax 兼容的 Link Aggregation Control Protocol。最多支持 8 个 Trunk 组，每个 Trunk 组最多支持 8 个 Trunk 成员端口。CRS Port Trunking 基于以下所有参数计算 transmit-hash：L2 src-dst MAC + L3 src-dst IP + L4 src-dst Port。

**子菜单：** `/interface/ethernet/switch/trunk`

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用端口 trunk 条目。 |
| **member-ports** (*ports*) | Trunk 组的成员端口。 |
| **name** (*string value*；默认：**trunkX**) | Trunk 组的名称。 |

## 服务质量 {#quality-of-service}

---

### Shaper

流量整形限制从接口发出的流的速率和突发大小。整形器通过令牌桶实现。如果数据包超过最大速率或突发大小，即没有足够的令牌供该数据包使用，则该数据包会存储在缓冲区中，直到有足够的令牌将其发出。

**子菜单：** `/interface/ethernet/switch/shaper`

| 属性 | 说明 |
| :-- | :-- |
| **burst** (*integer*；默认：**100k**) | 允许突发时可传输的最大数据速率。 |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用流量整形器条目。 |
| **meter-unit** (*bit \| packet*；默认：**bit**) | 流量整形器速率的计量单位。 |
| **port** (*port*) | 流量整形器的物理端口。 |
| **rate** (*integer*；默认：**1M**) | 最大数据速率限制。 |
| **target** (*port \| queueX \| wrr-groupX*；默认：**port**) | 每个端口（包括 CPU 端口）支持三级整形器：<ul class="bullets"><li>端口级别 - 条目应用于交换芯片的端口。</li><li>WRR 组级别 - 条目应用于端口上的 2 个加权轮询队列组之一（wrr-group0、wrr-group1）。</li><li>队列级别 - 条目应用于端口上的 8 个队列之一（queue0 - queue7）。</li></ul> |

### 入口端口监管器 {#ingress-port-policer}

**子菜单：** `/interface/ethernet/switch/ingress-port-policer`

| 属性 | 说明 |
| :-- | :-- |
| **burst** (*integer*；默认值：**100k**) | 允许突发时可传输的最大数据速率。 |
| **disabled** (*yes \| no*；默认值：**no**) | 启用或禁用入口端口监管器条目。 |
| **meter-len** (*layer-1 \| layer-2 \| layer-3*；默认值：**layer-1**) | 用于设置计量数据包字节长度的数据包分类。<ul class="bullets"><li>layer-1 - 包括整个 layer-2 帧 + FCS + 数据包间隔 + 前导码。</li><li>layer-2 - 包括 layer-2 帧 + FCS。</li><li>layer-3 - 仅包括 layer-3 和以太网填充，不包括 layer-2 报头和 FCS。</li></ul> |
| **meter-unit** (*bit \| packet*；默认值：**bit**) | 流量入口端口监管器速率的计量单位。 |
| **new-dei-for-yellow** (*0..1 \| remap*；默认值：**none**) | 当 yellow-action 为 remark 时，为超出流量重新标记的 DEI。 |
| **new-dscp-for-yellow** (*0..63 \| remap*；默认值：**none**) | 当 yellow-action 为 remark 时，为超出流量重新标记的 DSCP。 |
| **new-pcp-for-yellow** (*0..7 \| remap*；默认值：**none**) | 当 yellow-action 为 remark 时，为超出流量重新标记的 PCP。 |
| **packet-types** (*packet-types*；默认值：**all types from the description**) | 入口端口监管器条目适用的匹配数据包类型。 |
| **port** (*port*) | 入口端口监管器条目的物理端口或 trunk。 |
| **rate** (*integer*) | 最大数据速率限制。 |
| **yellow-action** (*drop \| forward \| remark*；默认值：**drop**) | 对超出流量执行的操作。 |

### QoS 组 {#qos-group}

全局 QoS group 表用于配置基于 VLAN、Protocol 和 MAC 的 QoS group 分配。

**子菜单：** `/interface/ethernet/switch/qos-group`

| 属性 | 说明 |
| :-- | :-- |
| **dei** (*0..1*；默认值：**none**) | QoS group 的新 DEI 值。 |
| **disabled** (*yes \| no*；默认值：**no**) | 启用或禁用 protocol QoS group 条目。 |
| **drop-precedence** (*drop \| green \| red \| yellow*；默认值：**green**) | 丢弃优先级是用于数据包入队或丢弃的内部 QoS 属性。 |
| **dscp** (*0..63*；默认值：**none**) | QoS group 的新 DSCP 值。 |
| **name** (*string value*；默认值：**groupX**) | QoS group 的名称。 |
| **pcp** (*0..7*；默认值：**none**) | QoS group 的新 PCP 值。 |
| **priority** (*0..15*；默认值：**0**) | 内部优先级仅在本地有效，用于将数据流分类到端口上的不同出口队列。（1 为最高，15 为最低） |

### DSCP QoS 映射 {#dscp-qos-map}

全局 DSCP 到 QOS 映射表用于将数据包的 DSCP 映射到表中配置的新 QoS 属性。

**子菜单：** `/interface/ethernet/switch/dscp-qos-map`

| 属性 | 说明 |
| :-- | :-- |
| **dei** (*0..1*) | DSCP 到 QOS 映射条目的新 DEI 值。 |
| **drop-precedence** (*drop \| green \| red \| yellow*) | DSCP 到 QOS 映射条目的新丢弃优先级值。 |
| **pcp** (*0..7*) | DSCP 到 QOS 映射条目的新 PCP 值。 |
| **priority** (*0..15*) | DSCP 到 QOS 映射条目的新内部优先级值。 |

### DSCP 到 DSCP 映射 {#dscp-to-dscp-map}

全局 DSCP 到 DSCP 映射表用于将数据包的原始 DSCP 映射为表中配置的新 DSCP 值。

**子菜单：** `/interface/ethernet/switch/dscp-to-dscp`

| 属性 | 说明 |
| :-- | :-- |
| **new-dscp** (*0..63*) | DSCP 到 DSCP 映射条目的新 DSCP 值。 |

### Policer QoS 映射 {#policer-qos-map}

**子菜单：** `/interface/ethernet/switch/policer-qos-map`

| 属性 | 说明 |
| :-- | :-- |
| **dei-for-red** (*0..1*；默认：**0**) | 红色数据包的 Policer DEI 重映射值。 |
| **dei-for-yellow** (*0..1*；默认：**0**) | 黄色数据包的 Policer DEI 重映射值。 |
| **dscp-for-red** (*0..63*；默认：**0**) | 红色数据包的 Policer DSCP 重映射值。 |
| **dscp-for-yellow** (*0..63*；默认：**0**) | 黄色数据包的 Policer DSCP 重映射值。 |
| **pcp-for-red** (*0..7*；默认：**0**) | 红色数据包的 Policer PCP 重映射值。 |
| **pcp-for-yellow** (*0..7*；默认：**0**) | 黄色数据包的 Policer PCP 重映射值。 |

## 访问控制列表 {#access-control-list}

---

访问控制列表由入向策略和出向策略引擎组成，最多可配置 128 条策略规则（受 RouterOS 限制）。它是一种高级工具，可基于 Layer2、Layer3 和 Layer4 协议头字段条件，以线速对数据包进行过滤、转发、整形和修改。

:::info
有关支持 Access Control List 的 Cloud Router Switch 设备，请参阅 Summary 部分。
:::

:::danger
由于硬件限制，无法在特定端口上匹配广播/组播流量。应使用端口隔离、在入向端口丢弃流量，或使用 VLAN 过滤，防止某些广播/组播流量被转发。
:::

**子菜单：** `/interface/ethernet/switch/acl`

### 数据包 MAC 相关字段的 ACL 条件部分 {#acl-condition-part-for-mac-related-fields-of-packets}

| 属性 | 说明 |
| :-- | :-- |
| **disabled** (*yes \| no*；默认：**no**) | 启用或禁用 ACL 条目。 |
| **table** (*egress \| ingress*；默认：**ingress**) | 为入向或出向数据包选择策略表。 |
| **invert-match** (*yes \| no*；默认：**no**) | 反转整条 ACL 规则的匹配结果。 |
| **src-ports** (*ports,trunks*) | 匹配物理源端口或 trunk。 |
| **dst-ports** (*ports,trunks*) | 匹配物理目的端口或 trunk。由于硬件限制，无法在出向端口上匹配广播/组播流量。 |
| **mac-src-address** (*MAC address/Mask*) | 源 MAC 地址和掩码。 |
| **mac-dst-address** (*MAC address/Mask*) | 目的 MAC 地址和掩码。 |
| **dst-addr-registered** (*yes \| no*) | 定义是否匹配处于 registered 状态的数据包，即目的 MAC 地址位于 UFDB/MFDB/RFDB 中的数据包。仅在 egress 表中有效。 |
| **mac-protocol** (*802.2 \| arp \| homeplug-av \| ip \| ip-or-ipv6 \| ipv6 \| ipx \| lldp \| loop-protect \| mpls-multicast \| mpls-unicast \| mvrp \| non-ip \| packing-compr \| packing-simple \| pppoe \| pppoe-discovery \| rarp \| service-vlan \| vlan or integer: 0..65535 decimal format or 0x0000-0xffff hex format*) | Ethernet 载荷类型（MAC 层协议）<ul><li><strong>802.2</strong> - 802.2 帧（0x0004）</li><li><strong>arp</strong> - 地址解析协议（0x0806）</li><li><strong>capsman</strong> - CAPsMAN 到 CAP 的 MAC 层连接（0x88BB）</li><li><strong>dot1x</strong> - EAPoL IEEE 802.1X（0x888E）</li><li><strong>homeplug-av</strong> - HomePlug AV MME（0x88E1）</li><li><strong>ip</strong> - Internet Protocol version 4（0x0800）</li><li><strong>ip-or-ipv6</strong> - IPv4 或 IPv6（0x0800 或 0x86DD）</li><li><strong>ipv6</strong> - Internet Protocol Version 6（0x86DD）</li><li><strong>ipx</strong> - Internetwork Packet Exchange（0x8137）</li><li><strong>lacp</strong> - Link Aggregation Control Protocol（0x8809）</li><li><strong>lldp</strong> - Link Layer Discovery Protocol（0x88CC）</li><li><strong>loop-protect</strong> - Loop Protect Protocol（0x9003）</li><li><strong>macsec</strong> - MAC security IEEE 802.1AE（0x88E5）</li><li><strong>mpls-multicast</strong> - MPLS 组播（0x8848）</li><li><strong>mpls-unicast</strong> - MPLS 单播（0x8847）</li><li><strong>mvrp</strong> - Multiple VLAN Registration protocol（0x88F5）</li><li><strong>non-ip</strong> - 非 Internet Protocol version 4（非 0x0800）</li><li><strong>packing-compr</strong> - 使用压缩 <a href="/docs/system-information-and-utilities/ip-packing">IP packing</a> 封装的数据包（0x9001）</li><li><strong>packing-simple</strong> - 使用简单 <a href="/docs/system-information-and-utilities/ip-packing">IP packing</a> 封装的数据包（0x9000）</li><li><strong>pppoe</strong> - PPPoE Session Stage（0x8864）</li><li><strong>pppoe-discovery</strong> - PPPoE Discovery Stage（0x8863）</li><li><strong>rarp</strong> - Reverse Address Resolution Protocol（0x8035）</li><li><strong>romon</strong> - Router Management Overlay Network RoMON（0x88BF）</li><li><strong>service-vlan</strong> - Provider Bridging（IEEE 802.1ad）和 Shortest Path Bridging IEEE 802.1aq（0x88A8）</li><li><strong>vlan</strong> - 带 VLAN 标签的帧（IEEE 802.1Q）以及兼容 NNI 的 Shortest Path Bridging IEEE 802.1aq（0x8100）</li></ul> |
| **drop-precedence** (*drop \| green \| red \| yellow*) | 匹配内部丢弃优先级。仅在 egress 表中有效。 |
| **custom-fields** |  |

### 数据包 VLAN 相关字段的 ACL 条件部分 {#acl-condition-part-for-vlan-related-fields-of-packets}

| 属性 | 说明 |
| :-- | :-- |
| **lookup-vid** (*0..4095*) | 查找中使用的 VLAN ID。可在到达 egress 表之前修改。 |
| **service-vid** (*0-4095*) | 匹配的服务 VLAN ID。 |
| **service-pcp** (*0..7*) | 匹配的服务 PCP。 |
| **service-dei** (*0..1*) | 匹配的服务 DEI。 |
| **service-tag** (*priority-tagged \| tagged \| tagged-or-priority-tagged \| untagged*) | 服务标签的格式。 |
| **customer-vid** (*0-4095*) | 匹配的客户 VLAN ID。 |
| **customer-pcp** (*0..7*) | 匹配的客户 PCP。 |
| **customer-dei** (*0..1*) | 匹配的客户 DEI。 |
| **customer-tag** (*priority-tagged \| tagged \| tagged-or-priority-tagged \| untagged*) | 客户标签的格式。 |
| **priority** (*0..15*) | 匹配的内部优先级。仅在 egress 表中有效。 |

### 数据包 IPv4 和 IPv6 相关字段的 ACL 条件部分 {#acl-condition-part-for-ipv4-and-ipv6-related-fields-of-packets}

| 属性 | 说明 |
| :-- | :-- |
| **ip-src** (*IPv4/0..32*) | 匹配源 IPv4 地址。 |
| **ip-dst** (*IPv4/0..32*) | 匹配目的 IPv4 地址。 |
| **ip-protocol** (*tcp \| udp \| udp-lite \| other*) | IP 协议类型。 |
| **src-l3-port** (*0-65535*) | 匹配 Layer3 源端口。 |
| **dst-l3-port** (*0-65535*) | 匹配 Layer3 目的端口。 |
| **ttl** (*0 \| 1 \| max \| other*) | 匹配数据包的 TTL 字段。 |
| **dscp** (*0..63*) | 匹配数据包的 DSCP 字段。 |
| **ecn** (*0..3*) | 匹配数据包的 ECN 字段。 |
| **fragmented** (*yes \| no*) | 是否匹配分片数据包。 |
| **first-fragment** (*yes \| no*) | YES 匹配未分片的数据包和第一个分片，NO 匹配其他分片。 |
| **ipv6-src** (*IPv6/0..128*) | 匹配源 IPv6 地址。 |
| **ipv6-dst** (*IPv6/0..128*) | 匹配目的 IPv6 地址。 |
| **mac-isolation-profile** (*community1 \| community2 \| isolated \| promiscuous*) | 基于 UFDB 匹配隔离配置。仅在 egress 策略表中有效。 |
| **src-mac-addr-state** (*dynamic-station-move \| sa-found \| sa-not-found \| static-station-move*) | 定义是否匹配具有已注册状态的数据包，即目的 MAC 地址位于 UFDB/MFDB/RFDB 中的数据包。仅在 egress 策略表中有效。 |
| **flow-id** (*0..63*) |  |

### ACL 规则动作部分 {#acl-rule-action-part}

| 属性 | 说明 |
| :-- | :-- |
| <strong>action</strong> (<em>copy-to-cpu &#124; drop &#124; forward &#124;</em><em>redirect-to-cpu &#124; send-to-new-dst-ports</em>; Default: <br/><strong>forward</strong>) | <ul class="bullets"><li>copy-to-cpu - 匹配 ACL 条件的数据包会被复制到 CPU。</li><li>drop - 匹配 ACL 条件的数据包会被丢弃。</li><li>forward - 匹配 ACL 条件的数据包会被转发。</li><li>redirect-to-cpu - 匹配 ACL 条件的数据包会被重定向到 CPU。</li><li>send-to-new-dst-ports - 匹配 ACL 条件的数据包会被发送到新的目的端口。</li></ul> |
| **new-dst-ports** (*ports,trunks*) | 如果动作为“send-to-new-dst-ports”，则该属性设置哪些端口/中继作为新的目的端。 |
| **mirror-to** (*mirror0 \| mirror1*) | ACL 数据包的镜像目的端。 |
| **policer** (*policer*) | 应用于 ACL 数据包的 ACL Policer。 |
| **src-mac-learn** (*yes \| no*) | 是否学习匹配 ACL 数据包的源 MAC。仅在 ingress 策略表中有效。 |
| **new-service-vid** (*0..4095*) | ACL 数据包的新服务 VLAN ID。 |
| **new-service-pcp** (*0..7*) | ACL 数据包的新服务 PCP。 |
| **new-service-dei** (*0..1*) | ACL 数据包的新服务 DEI。 |
| **new-customer-vid** (*0..4095*) | ACL 数据包的新客户 VLAN ID。如果设置为 4095，则丢弃流量。 |
| **new-customer-pcp** (*0..7*) | ACL 数据包的新客户 PCP。 |
| **new-customer-dei** (*0..1*) | ACL 数据包的新客户 DEI。 |
| **new-dscp** (*0..63*) | ACL 数据包的新 DSCP。 |
| **new-priority** (*0..15*) | ACL 数据包的新内部优先级。 |
| **new-drop-precedence** (*drop \| green \| red \| yellow*) | ACL 数据包的新内部丢弃优先级。 |
| **new-registered-state** (*yes \| no*) | 是否修改数据包状态。YES 将数据包状态设置为 registered，NO 设置为 unregistered。仅在 ingress 策略表中有效。 |
| **new-flow-id** (*0..63*) |  |

### ACL 数据包的过滤绕过部分 {#filter-bypassing-part-for-acl-packets}

| 属性 | 说明 |
| :-- | :-- |
| **attack-filter-bypass** (*yes \| no*; Default: **no**) |  |
| **ingress-vlan-filter-bypass** (*yes \| no*; Default: **no**) | 允许匹配的数据包绕过 VLAN 表中的 ingress VLAN 过滤。仅适用于 ingress 策略表。 |
| **egress-vlan-filter-bypass** (*yes \| no*; Default: **no**) | 允许匹配的数据包绕过 VLAN 表中的 egress VLAN 过滤。仅适用于 ingress 策略表。 |
| **isolation-filter-bypass** (*yes \| no*; Default: **no**) | 允许匹配的数据包绕过 Isolation 表。仅适用于 ingress 策略表。 |
| **egress-vlan-translate-bypass** (*yes \| no*; Default: **no**) | 允许匹配的数据包绕过 egress VLAN 转换表。 |

### ACL Policer

**子菜单：** `/interface/ethernet/switch/acl/policer`

| 属性 | 说明 |
| :-- | :-- |
| **name** (*string*；默认：**policerX**) | ACL 中使用的 Policer 名称。 |
| **yellow-rate** (*integer*) | 具有 yellow drop precedence 的数据包的最大数据速率限制。 |
| **yellow-burst** (*integer*；默认：**0**) | 允许具有 yellow drop precedence 的数据包突发时可以传输的最大数据速率。 |
| **red-rate** (*integer*；默认：**0**) | 具有 red drop precedence 的数据包的最大数据速率限制。 |
| **red-burst** (*integer*；默认：**0**) | 允许具有 red drop precedence 的数据包突发时可以传输的最大数据速率。 |
| **meter-unit** (*bit \| packet*；默认：**bit**) | ACL 流量速率的计量单位。 |
| **meter-len** (*layer-1 \| layer-2 \| layer-3*；默认：**layer-1**) | 用于设置计量数据包字节长度的数据包分类。<ul class="bullets"><li>layer-1 - 包括整个 layer-2 帧 + FCS + 数据包间隔 + 前导码。</li><li>layer-2 - 包括 layer-2 帧 + FCS。</li><li>layer-3 - 仅包括 layer-3 + ethernet padding，不包括 layer-2 报头和 FCS。</li></ul> |
| **color-awareness** (*yes \| no*；默认：**no**) | YES 使 policer 考虑预先标记的 drop precedence，NO 则忽略 drop precedence。 |
| **bucket-coupling** (*yes \| no*；默认：**no**) |  |
| **yellow-action** (*drop \| forward \| remark*；默认：**drop**) | 对超过速率且具有 yellow drop precedence 的流量执行的动作。 |
| **new-dei-for-yellow** (*0..1 \| remap*) | 具有 yellow drop precedence 的数据包的新 DEI。 |
| **new-pcp-for-yellow** (*0..7 \| remap*) | 具有 yellow drop precedence 的数据包的新 PCP。 |
| **new-dscp-for-yellow** (*0..63 \| remap*) | 具有 yellow drop precedence 的数据包的新 DSCP。 |
| **red-action** (*drop \| forward \| remark*；默认：**drop**) | 对超过速率且具有 red drop precedence 的流量执行的动作。 |
| **new-dei-for-red** (*0..1 \| remap*) | 具有 red drop precedence 的数据包的新 DEI。 |
| **new-pcp-for-red** (*0..7 \| remap*) | 具有 red drop precedence 的数据包的新 PCP。 |
| **new-dscp-for-red** (*0..63 \| remap*) | 具有 red drop precedence 的数据包的新 DSCP。 |

## 另请参阅 {#see-also}

---

- [CRS1xx/2xx series switches examples](/docs/bridging-and-switching/user-guides/crs1xx-2xx-series-switches-examples)
- [Basic VLAN switching](/docs/bridging-and-switching/user-guides/basic-vlan-switching)
- [Bridge Hardware Offloading](/docs/bridging-and-switching/crs1xx-and-2xx-series-switches#bridge-hardware-offloading)
- [Spanning Tree Protocol](/docs/bridging-and-switching/user-guides/spanning-tree-protocol)
- [IGMP Snooping](/docs/bridging-and-switching/user-guides/bridge-igmp-mld-snooping)
- [DHCP Snooping and Option 82](/docs/bridging-and-switching/crs1xx-and-2xx-series-switches#dhcp-snooping-and-dhcp-option-82)
- [MTU on RouterBOARD](/docs/hardware/mtu-in-routeros)
- [Layer2 misconfiguration](/docs/bridging-and-switching/user-guides/layer2-misconfiguration)
