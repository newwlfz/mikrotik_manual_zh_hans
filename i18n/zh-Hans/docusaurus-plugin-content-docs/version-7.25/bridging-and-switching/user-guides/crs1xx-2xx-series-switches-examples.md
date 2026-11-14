---
sidebar_key: "bridging-and-switching/user-guides/crs1xx-2xx-series-switches-examples"
sidebar_position: 4
title: "CRS1xx/2xx 系列交换机示例"
sidebar_label: "CRS1xx/2xx 系列交换机示例"
description: "本页面提供 CRS1xx/2xx 系列交换机上 Cloud Router Switch 功能的配置示例和用例，涵盖端口切换、带 VLAN 过滤的管理访问设置，以及基于 IP 访问的安全注意事项。"
tags:
  - 'vlan'
  - 'bridge-hardware-offloading'
  - 'management-access'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/crs1xx-2xx-series-switches-examples
captured_at: '2026-11-04T11:15:45+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Cloud Router Switch 系列是高度集成的交换机，配备高性能 MIPS CPU 和功能丰富的报文处理器。CRS 交换机可设计用于各种以太网应用，包括非管理型交换机、二层管理型交换机、运营商交换机和有线/无线统一报文处理。

:::danger
本文适用于 CRS1xx 和 CRS2xx 系列交换机，不适用于搭载 Marvell Prestera 交换芯片的 MikroTik 设备（例如 CRS3xx）。有关搭载 Marvell Prestera 交换芯片的 MikroTik 设备，请参阅 [Marvell Prestera 交换芯片特性](../marvell-prestera-switch-chip-features.md)手册。
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

### 适用的交换机型号 {#applicable-switch-models}

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

### 缩写与说明 {#abbreviations-and-explanations}

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

### 端口交换 {#port-switching}

---

要在 CRS1xx/2xx 系列交换机上设置端口交换，请参阅 [网桥硬件卸载](../index.md#bridge-hardware-offloading) 页面。

:::warning
在创建启用硬件卸载的网桥并添加交换端口组时，CRS 交换机会创建动态保留 VLAN 条目（VLAN4091；VLAN4090；VLAN4089 等）。这些 VLAN 是内部运行所必需的，其优先级低于用户配置的 VLAN。
:::

:::danger
通过使用多个启用了硬件卸载的网桥，可以创建多个隔离的交换机组；这仅在 CRS1xx/2xx 系列交换机上可行。对于更复杂的设置（例如 VLAN 过滤），应改用端口隔离功能。
:::

#### 多个交换机组 {#multiple-switch-groups}

CRS1xx/2xx 系列交换机允许使用多个带硬件卸载的网桥；这样可以轻松隔离多个交换机组。只需创建多个网桥并启用硬件卸载即可完成。

:::warning
多硬件卸载桥接配置被设计为一种快速且简单的端口隔离解决方案，但它限制了 CRS 交换芯片所支持的部分 VLAN 功能。对于高级配置，请在 CRS 交换芯片内为所有端口使用一个桥接，配置 VLAN，并通过端口隔离配置文件配置来隔离端口组。
:::

:::danger
CRS1xx/2xx 系列交换机可以运行多个启用 (R)STP 的硬件卸载网桥，但不建议这样做，因为设备并非设计为在硬件层面运行多个 (R)STP 实例。要在启用 (R)STP 的同时隔离多个交换机组，应通过端口隔离配置文件配置来隔离端口组。
:::

## 管理访问配置 {#management-access-configuration}

---

一般来说，出于安全原因，交换机只应使用内置交换芯片转发数据包，而不应允许访问设备本身。可以使用设备的串口进行管理访问，但在大多数情况下，这种访问方式并不理想，使用 IP 地址访问更合适。在这种情况下，你需要配置管理访问。

在所有类型的管理访问中，都假定必须将端口加入同一个交换组。使用以下命令将所需端口加入同一个交换组：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether3 hw=yes
add bridge=bridge1 interface=ether4 hw=yes
add bridge=bridge1 interface=ether5 hw=yes
```

还应给网桥接口分配 IP 地址，以便可以通过 IP 地址访问设备（也可以通过 MAC 地址访问设备）：

```ros
/ip/address
add address=192.168.88.1/24 interface=bridge1
```

### 未标记 {#untagged}

如果未启用无效 VLAN 过滤，则已经允许从任何端口通过带标记或未标记（**VLAN 0**）流量对设备进行管理访问，但这不是良好实践；这可能导致安全问题，并在某些情况下（最常见的是广播类型流量）导致设备 CPU 过载。

如果你打算使用无效 VLAN 过滤（你应该这样做），则必须将要用于访问交换机的端口添加到 VLAN 表中，以允许未标记（**VLAN 0**）流量，例如，如果你想从 **ether2** 访问交换机：

```ros
/interface/ethernet/switch/vlan
add vlan-id=0 ports=ether2,switch1-cpu  
```

### 带标记 {#tagged}

仅允许带标记流量通过特定端口对设备进行管理访问是更好的做法。例如，要仅允许 **VLAN99** 通过 **ether2** 访问设备，应首先向 VLAN 表添加条目，这将允许所选端口和 CPU 端口（**switch1-cpu**）转发所选 VLAN ID，从而允许管理访问：

```ros
/interface/ethernet/switch/vlan
add ports=ether2,switch1-cpu vlan-id=99
```

从 CPU 发出的数据包（例如 ping 应答）将不带 VLAN 标记；要解决此问题，需要指定对于特定 VLAN ID，哪些端口应始终发送带 VLAN 标记的数据包：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether2,switch1-cpu vlan-id=99
```

在设置有效的 VLAN99 配置后，可以启用未知/无效 VLAN 过滤，这将不允许通过 VLAN 表中指定端口以外的端口进行管理访问：

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether2,ether3,ether4,ether5
```

在此示例中，将使用 VLAN99 访问设备。必须在网桥上创建 VLAN 接口，并为其分配 IP 地址。

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.1/24 interface=MGMT
```

## VLAN {#vlan}

---

:::danger 
锁定风险。
强烈建议在配置 VLAN 之前测试并准备好串口控制台线缆。配置错误很容易使您无法通过 CPU 或已连接端口访问设备。
:::

:::tip
排查缓存的 MAC 地址问题。
由于已学习的 MAC 地址，某些更改可能看起来有延迟。如果更改后流量未按预期流动，请刷新单播转发表：
`/interface/ethernet/switch/unicast-fdb/flush`
:::

:::info
架构最佳实践。
使用多个硬件卸载网桥是实现简单端口隔离的快速方法，但它限制了 CRS 交换芯片上的高级 VLAN 功能。对于高级设置，请为所有端口使用**单个网桥**，配置 VLAN，并使用端口隔离配置文件隔离端口组。
:::

### 基于端口的 VLAN {#port-based-vlan}

:::warning
对于 CRS3xx 系列设备，必须使用网桥 VLAN 过滤；更多信息请参阅 [网桥 VLAN 过滤](../index.md#bridge-vlan-filtering) 小节。
:::

#### 示例 1（干道端口和接入端口） {#example-1-trunk-and-access-ports}

![Access Ports](/img/dcbdce357964f958.webp)

将所需端口加入交换：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

为每个接入端口指定交换机必须为未标记（VLAN0）流量设置的 VLAN ID：

```ros
/interface/ethernet/switch/ingress-vlan-translation
add ports=ether6 customer-vid=0 new-customer-vid=200
add ports=ether7 customer-vid=0 new-customer-vid=300
add ports=ether8 customer-vid=0 new-customer-vid=400
```

:::warning
当在 `/interface/ethernet/switch/ingress-vlan-translation` 下创建条目时，交换芯片会在指定端口的入站帧上添加 VLAN 标记。要为同一端口上的出站帧移除 VLAN 标记，应为同一 VLAN ID 创建一个 `/interface/ethernet/switch/egress-vlan-tag` 条目，并在其中仅指定带标记端口。如果特定 VLAN 仅在接入端口之间转发，仍应创建不带任何带标记端口的 `/interface/ethernet/switch/egress-vlan-tag` 条目。另一种选择是在 `/interface/ethernet/switch/egress-vlan-translation` 菜单下创建额外条目，以设置未标记（VLAN0）流量。
:::

还必须指定哪些 VLAN 应以带 VLAN 标记的方式从干道端口发出。使用 tagged-ports 属性来设置干道端口：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether2 vlan-id=200
add tagged-ports=ether2 vlan-id=300
add tagged-ports=ether2 vlan-id=400
```

向 VLAN 表添加条目，为每个端口和每个 VLAN ID 指定 VLAN 成员关系：

```ros
/interface/ethernet/switch/vlan
add ports=ether2,ether6 vlan-id=200
add ports=ether2,ether7 vlan-id=300
add ports=ether2,ether8 vlan-id=400
```

在设置有效的 VLAN 配置后，可以启用未知/无效 VLAN 过滤：

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether2,ether6,ether7,ether8
```

:::warning
可以同时使用内置交换芯片和 CPU 来创建 Switch-Router 设置，使设备同时充当交换机和路由器。
:::

#### 示例 2（干道端口和混合端口） {#example-2-trunk-and-hybrid-ports}

![Hybrid Ports](/img/90b987271e134d95.webp)

将所需端口加入交换：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

为每个接入端口指定交换机必须为未标记（VLAN0）流量设置的 VLAN ID：

```ros
/interface/ethernet/switch/ingress-vlan-translation
add ports=ether6 customer-vid=0 new-customer-vid=200
add ports=ether7 customer-vid=0 new-customer-vid=300
add ports=ether8 customer-vid=0 new-customer-vid=400
```

通过将端口指定为 tagged-ports，交换机会始终以带对应 VLAN ID 标记的数据包形式发送数据包。按上图添加相应条目：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether2,ether7,ether8 vlan-id=200
add tagged-ports=ether2,ether6,ether8 vlan-id=300
add tagged-ports=ether2,ether6,ether7 vlan-id=400
```

向 VLAN 表添加条目，为每个端口和每个 VLAN ID 指定 VLAN 成员关系：

```ros
/interface/ethernet/switch/vlan
add ports=ether2,ether6,ether7,ether8 vlan-id=200 learn=yes
add ports=ether2,ether6,ether7,ether8 vlan-id=300 learn=yes
add ports=ether2,ether6,ether7,ether8 vlan-id=400 learn=yes
```

在设置有效的 VLAN 配置后，可以启用未知/无效 VLAN 过滤：

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether2,ether6,ether7,ether8
```

### 基于协议的 VLAN {#protocol-based-vlan}

![Protocol Based VLAN](/img/279b50d6fabcdc21.webp)

将所需端口加入交换：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

为 IP 和 ARP 协议设置 VLAN：

```ros
/interface/ethernet/switch/protocol-based-vlan
add port=ether2 protocol=arp set-customer-vid-for=all new-customer-vid=0
add port=ether6 protocol=arp set-customer-vid-for=all new-customer-vid=200
add port=ether2 protocol=ip set-customer-vid-for=all new-customer-vid=0
add port=ether6 protocol=ip set-customer-vid-for=all new-customer-vid=200
```

为 IPX 协议设置 VLAN：

```ros
/interface/ethernet/switch/protocol-based-vlan
add port=ether2 protocol=ipx set-customer-vid-for=all new-customer-vid=0
add port=ether7 protocol=ipx set-customer-vid-for=all new-customer-vid=300
```

为 AppleTalk AARP 和 AppleTalk DDP 协议设置 VLAN：

```ros
/interface/ethernet/switch/protocol-based-vlan
add port=ether2 protocol=0x80F3 set-customer-vid-for=all new-customer-vid=0
add port=ether8 protocol=0x80F3 set-customer-vid-for=all new-customer-vid=400
add port=ether2 protocol=0x809B set-customer-vid-for=all new-customer-vid=0
add port=ether8 protocol=0x809B set-customer-vid-for=all new-customer-vid=400
```

### 基于 MAC 的 VLAN {#mac-based-vlan}

:::danger
在内部，基于 MAC 的 VLAN 中的所有 MAC 地址都会进行哈希。某些 MAC 地址可能具有相同的哈希；如果该哈希与已加载 MAC 地址的哈希匹配，就会阻止某个 MAC 地址加载到交换芯片中。因此，建议将基于端口的 VLAN 与基于 MAC 的 VLAN 结合使用。这是硬件限制。
:::

![MAC Based VLAN](/img/fb1b49b2f44e71a3.webp)

将所需端口加入交换：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
```

在接入端口上启用基于 MAC 的 VLAN 转换：

```ros
/interface/ethernet/switch/port
set ether7 allow-fdb-based-vlan-translate=yes
```

在基于 MAC 的 VLAN 表中添加 MAC 到 VLAN 的映射条目：

```ros
/interface/ethernet/switch/mac-based-vlan
add src-mac=A4:12:6D:77:94:43 new-customer-vid=200
add src-mac=84:37:62:DF:04:20 new-customer-vid=300
add src-mac=E7:16:34:A1:CD:18 new-customer-vid=400
```

在 ether2 端口上添加 VLAN200、VLAN300 和 VLAN400 标记，使其成为 VLAN 干道端口：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether2 vlan-id=200
add tagged-ports=ether2 vlan-id=300
add tagged-ports=ether2 vlan-id=400
```

此外，还要向 VLAN 表添加条目，为每个端口指定 VLAN 成员关系，并启用未知/无效 VLAN 过滤，请参阅下面的示例——未知/无效 VLAN 过滤。对于向网桥添加了更多接口的网络设置，这是必需的，因为它允许定义 VLAN 边界。

### VLAN 间路由 {#intervlan-routing}

![VLAN Routing](/img/f659d62947a98802.webp)

VLAN 间路由配置由两个主要部分组成——交换芯片中的 VLAN 标记和 RouterOS 中的路由。通过将此配置与每个 VLAN 的 DHCP 服务器、Hotspot、PPP 和其他功能结合使用，可将其应用于许多场景。

将所需端口加入交换：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

在 CPU 端口上为所有 VLAN 设置 VLAN 标记，使数据包在路由之前带上标记：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=switch1-cpu vlan-id=200
add tagged-ports=switch1-cpu vlan-id=300
add tagged-ports=switch1-cpu vlan-id=400
```

添加入站 VLAN 转换规则，以确保在接入端口上正确分配 VLAN ID：

```ros
/interface/ethernet/switch/ingress-vlan-translation
add ports=ether6 customer-vid=0 new-customer-vid=200
add ports=ether7 customer-vid=0 new-customer-vid=300
add ports=ether8 customer-vid=0 new-customer-vid=400
```

在网桥接口之上创建 VLAN 接口：

```ros
/interface/vlan
add name=VLAN200 interface=bridge1 vlan-id=200
add name=VLAN300 interface=bridge1 vlan-id=300
add name=VLAN400 interface=bridge1 vlan-id=400
```

:::danger
确保 VLAN 接口创建在网桥接口之上，而不是创建在任何物理接口之上。如果 VLAN 接口创建在从属接口上，则数据包可能无法正确接收，从而导致路由失败。更多详细信息可在 [从属接口上的 VLAN 接口](./layer2-misconfiguration.md#vlan-interface-on-a-slave-interface) 手册页中找到。
:::

在已创建的 VLAN 接口上添加 IP 地址。在此示例中，向 VLAN200、VLAN300 和 VLAN400 接口添加三个 192.168.x.1 地址：

```ros
/ip/address
add address=192.168.20.1/24 interface=VLAN200
add address=192.168.30.1/24 interface=VLAN300
add address=192.168.40.1/24 interface=VLAN400
```

### 未知/无效 VLAN 过滤 {#unknowninvalid-vlan-filtering}

VLAN 成员关系在 VLAN 表中定义。添加包含 VLAN ID 和端口的条目会使该 VLAN 流量在这些端口上有效。设置有效的 VLAN 配置后，可以启用未知/无效 VLAN 过滤。此 VLAN 过滤配置示例适用于 VLAN 间路由设置。

```ros
/interface/ethernet/switch/vlan
add ports=switch1-cpu,ether6 vlan-id=200
add ports=switch1-cpu,ether7 vlan-id=300
add ports=switch1-cpu,ether8 vlan-id=400
```

- 选项 1：在特定端口上禁用无效 VLAN 转发（更常见）。

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether6,ether7,ether8
```

- 选项 2：在所有端口上禁用无效 VLAN 转发。

```ros
/interface/ethernet/switch
set forward-unknown-vlan=no
```

:::danger
在启用了未知/无效 VLAN 过滤的单个交换芯片上使用多个网桥可能会导致意外行为。使用 VLAN 过滤时，应始终使用单个网桥配置。如果需要端口隔离，则应使用端口隔离功能，而不是使用多个网桥。
:::

### VLAN 隧道（Q-in-Q） {#vlan-tunneling-q-in-q}

此示例涵盖典型的 VLAN 隧道用例：服务提供商设备添加另一个 VLAN 标记以实现独立转发，同时允许客户使用自己的 VLAN。

:::warning
此示例仅包含服务 VLAN 标记部分。建议另外在端口上设置未知/无效 VLAN 过滤配置。
:::

![QinQ](/img/1f0680bc5266cc50.webp)

**CRS-1**：服务提供商网络边缘的第一台交换机必须正确识别端口上来自客户 VLAN ID 的流量，并使用入站 VLAN 转换规则分配新的服务 VLAN ID。用于服务提供商 VLAN 标记的 VLAN 干道端口配置在同一个 `egress-vlan-tag` 表中。与基本的基于端口 VLAN 配置的主要区别在于，必须将 CRS 交换芯片设置为根据服务（*外层*）VLAN ID 而不是客户（*内层*）VLAN ID 进行转发。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1 hw=yes
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether9 hw=yes

/interface/ethernet/switch/ingress-vlan-translation
add customer-vid=200 new-service-vid=400 ports=ether1
add customer-vid=300 new-service-vid=500 ports=ether2

/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether9 vlan-id=400
add tagged-ports=ether9 vlan-id=500

/interface/ethernet/switch
set bridge-type=service-vid-used-as-lookup-vid
```

**CRS-2**：服务提供商网络中的第二台交换机只需要将交换端口配置为根据服务（*外层*）VLAN ID 而不是客户（*内层*）VLAN ID 进行转发。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether9 hw=yes
add bridge=bridge1 interface=ether10 hw=yes

/interface/ethernet/switch
set bridge-type=service-vid-used-as-lookup-vid
```

**CRS-3**：第三台交换机的配置与 CRS-1 类似：

- 使用网桥的交换机组中的端口。
- 用于在端口上定义新服务 VLAN 分配的入站 VLAN 转换规则。
- 用于服务提供商 VLAN 干道的 tagged-ports。
- 将 CRS 交换芯片设置为在交换查找中使用服务 VLAN ID。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether3 hw=yes
add bridge=bridge1 interface=ether4 hw=yes
add bridge=bridge1 interface=ether10 hw=yes

/interface/ethernet/switch/ingress-vlan-translation
add customer-vid=200 new-service-vid=400 ports=ether3
add customer-vid=300 new-service-vid=500 ports=ether4

/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether10 vlan-id=400
add tagged-ports=ether10 vlan-id=500

/interface/ethernet/switch
set bridge-type=service-vid-used-as-lookup-vid
```

### CVID 堆叠 {#cvid-stacking}

可以将 CRS1xx/CRS2xx 系列交换机用于 CVID 堆叠设置。CRS1xx/CRS2xx 系列交换机能够基于带有两个 CVID 标记（双 CVID 标记）的带标记数据包的外层标记进行 VLAN 过滤。这些交换机还能够在现有 CVID 标记之上添加另一个 CVID 标记（CVID 堆叠）。例如，在 **ether1** 接收带有 CVID 10 的带标记数据包，但要求 **ether2** 以另一个标记 CVID 20（VLAN10 位于 VLAN20 内）发送这些数据包，同时过滤掉任何其他 VLAN 的设置中，必须配置以下内容：

将 **ether1** 和 **ether2** 加入同一个交换组：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1 hw=yes
add bridge=bridge1 interface=ether2 hw=yes
```

将交换机设置为根据服务标记（0x88a8）过滤 VLAN：

```ros
/interface/ethernet/switch
set bridge-type=service-vid-used-as-lookup-vid
```

为 **ether1** 上带有 CVID 10 标记的数据包添加服务标记 SVID 20：

```ros
/interface/ethernet/switch/ingress-vlan-translation
add customer-vid=10 new-service-vid=20 ports=ether1
```

将 **ether2** 指定为 SVID 20 的带标记/干道端口：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether2 vlan-id=20
```

允许 **ether1** 和 **ether2** 转发 SVID 20：

```ros
/interface/ethernet/switch/vlan
add ports=ether1,ether2 vlan-id=20
```

在 **ether2** 上将 SVID EtherType（0x88a8）覆盖为 CVID EtherType（0x8100）：

```ros
/interface/ethernet/switch/port
set ether2 egress-service-tpid-override=0x8100 ingress-service-tpid-override=0x8100
```

启用未知/无效 VLAN 过滤：

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether1,ether2
```

:::warning
由于交换机被设置为根据服务标记查找 VLAN ID，而该服务标记已被覆盖为不同的 EtherType，因此 VLAN 过滤仅针对数据包的外层标记执行；不会检查内层标记。
:::

## 镜像 {#mirroring}

---

![Mirroring](/img/7c1963a9e5b62ba0.webp)

Cloud Router Switches 支持三种类型的镜像。基于端口的镜像可应用于任何交换芯片端口；基于 VLAN 的镜像适用于所有指定 VLAN，与交换芯片端口无关；基于 MAC 的镜像会复制从单播转发表中配置的端口可到达的特定设备发送或接收的流量。

### 基于端口的镜像 {#port-based-mirroring}

第一个配置将 ether5 端口设置为 mirror0 分析端口，用于入站和出站镜像。镜像流量将发送到此端口。从 ether6 端口启用基于端口的入站和出站镜像。

```ros
/interface/ethernet/switch
set ingress-mirror0=ether5 egress-mirror0=ether5

/interface/ethernet/switch/port
set ether6 ingress-mirror-to=mirror0 egress-mirror-to=mirror0
```

### 基于 VLAN 的镜像 {#vlan-based-mirroring}

第二个示例要求将端口加入同一个交换组。镜像配置将 ether5 端口设置为 mirror0 分析端口，并设置当发生来自 VLAN 的镜像时使用 mirror0 端口。VLAN 表条目仅为 ether2 和 ether7 端口之间的 VLAN 300 流量启用镜像。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether7 hw=yes

/interface/ethernet/switch
set ingress-mirror0=ether5 vlan-uses=mirror0

/interface/ethernet/switch/vlan
add ports=ether2,ether7 vlan-id=300 learn=yes ingress-mirror=yes
```

### 基于 MAC 的镜像 {#mac-based-mirroring}

第三个配置同样要求将端口作为一个组加入交换。镜像配置将 ether5 端口设置为 mirror0 分析端口，并设置当发生来自单播转发表的镜像时使用 mirror0 端口。单播转发表中的条目为来自 ether8 端口、源 MAC 地址或目的 MAC 地址为 E7:16:34:A1:CD:18 的数据包启用镜像。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether8 hw=yes

/interface/ethernet/switch
set ingress-mirror0=ether5 fdb-uses=mirror0

/interface/ethernet/switch/unicast-fdb
add port=ether8 mirror=yes svl=yes mac-address=E7:16:34:A1:CD:18
```

## 干道（Trunking） {#trunking}

---

![Trunking 3](/img/601e6a4b07f4a6d0.webp)

Cloud Router Switches 中的干道提供静态链路聚合组，并具有硬件自动故障转移和负载均衡功能。尚不支持兼容 IEEE802.3ad 和 IEEE802.1ax 的链路聚合控制协议。最多支持 8 个干道组，每个干道组最多支持 8 个干道成员端口。

配置需要一组已加入交换的端口，以及在干道表中的条目：

```ros
/interface/bridge
add name=bridge1 protocol-mode=none
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes

/interface/ethernet/switch/trunk
add name=trunk1 member-ports=ether6,ether7,ether8
```

此示例还展示了另一端 RouterOS 中正确的绑定配置：

```ros
/interface/bonding
add name=bonding1 slaves=ether2,ether3,ether4 mode=balance-xor transmit-hash-policy=layer-2-and-3
```

:::danger
网桥 (R)STP 不知道底层交换机干道配置，某些干道端口可能会进入丢弃或阻塞状态。当干道成员端口连接到其他网桥时，应禁用 (R)STP 或过滤掉干道设备之间的任何 BPDU（例如使用 ACL 规则）。
:::

## 每端口受限 MAC 访问 {#limited-mac-access-per-port}

---

禁用 MAC 学习并配置静态 MAC 地址，可以控制哪些确切设备能够与 CRS1xx/2xx 交换机通信以及通过它们通信。

配置需要一组已加入交换的端口、在这些端口上禁用 MAC 学习，以及静态 FDB 条目：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes learn=no unknown-unicast-flood=no
add bridge=bridge1 interface=ether7 hw=yes learn=no unknown-unicast-flood=no

/interface/ethernet/switch/unicast-fdb
add mac-address=4C:5E:0C:00:00:01 port=ether6 svl=yes
add mac-address=D4:CA:6D:00:00:02 port=ether7 svl=yes

/interface/ethernet/switch/acl
add action=drop src-mac-addr-state=sa-not-found src-ports=ether6,ether7 table=egress
add action=drop src-mac-addr-state=static-station-move src-ports=ether6,ether7 table=egress
```

CRS1xx/2xx 交换机还允许每个端口学习一个动态 MAC，以确保无论其 MAC 地址是什么，只连接一个最终用户设备：

```ros
/interface/ethernet/switch/port
set ether6 learn-limit=1
set ether7 learn-limit=1
```

## 隔离 {#isolation}

---

### 端口级隔离 {#port-level-isolation}

![Port Level Isolation](/img/b0340fbe7ac5c7ee.webp)

端口级隔离常用于 Private VLAN，其中：

- 一个或多个上行链路端口由所有用户共享，用于访问网关或路由器。
- 端口组 Isolated Ports 用于访客用户。只能通过上行链路端口进行通信。
- 端口组 Community 0 用于部门 A。允许组成员之间以及通过上行链路端口进行通信。
- 端口组 Community X 用于部门 X。允许组成员之间以及通过上行链路端口进行通信。

Cloud Router Switches 使用端口级隔离配置模板来实现 Private VLAN：

- 上行链路端口——端口级隔离配置模板 0
- 隔离端口——端口级隔离配置模板 1
- Community 0 端口——端口级隔离配置模板 2
- Community X（X \<= 30）端口——端口级隔离配置模板 X

**此示例需要一组已加入交换的端口。假设此示例中使用的所有端口都在同一个交换机组中。**

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
add bridge=bridge1 interface=ether9 hw=yes
add bridge=bridge1 interface=ether10 hw=yes
```

端口隔离配置的第一部分是设置上行链路端口——为 ether2 将端口配置模板设置为 0：

```ros
/interface/ethernet/switch/port
set ether2 isolation-leakage-profile-override=0
```

然后继续在所有隔离端口上设置隔离配置模板 1，并为端口隔离配置模板 1 添加通信端口：

```ros
/interface/ethernet/switch/port
set ether5 isolation-leakage-profile-override=1
set ether6 isolation-leakage-profile-override=1

/interface/ethernet/switch/port-isolation
add port-profile=1 ports=ether2 type=dst
```

设置 Community 2 和 Community 3 端口的配置类似：

```ros
/interface/ethernet/switch/port
set ether7 isolation-leakage-profile-override=2
set ether8 isolation-leakage-profile-override=2

/interface/ethernet/switch/port-isolation
add port-profile=2 ports=ether2,ether7,ether8 type=dst

/interface/ethernet/switch/port
set ether9 isolation-leakage-profile-override=3
set ether10 isolation-leakage-profile-override=3

/interface/ethernet/switch/port-isolation
add port-profile=3 ports=ether2,ether9,ether10 type=dst
```

### 协议级隔离 {#protocol-level-isolation}

![Protocol Level Isolation](/img/efafb0531d23c36a.webp)

CRS 交换机上的协议级隔离可用于增强网络安全。例如，限制用户（ether2、ether3、ether4、ether5）之间的 DHCP 流量，并仅允许其发往受信任的 DHCP 服务器端口（ether1），可以防止 DHCP 欺骗攻击等安全风险。以下示例展示了如何在 CRS 上配置。

将所需端口加入交换：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1 hw=yes
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether3 hw=yes
add bridge=bridge1 interface=ether4 hw=yes
add bridge=bridge1 interface=ether5 hw=yes
```

为所有 DHCP 客户端端口设置相同的 Community 端口配置模板。Community 端口配置模板编号为 2 到 30。

```ros
/interface/ethernet/switch/port
set ether2 isolation-leakage-profile-override=2
set ether3 isolation-leakage-profile-override=2
set ether4 isolation-leakage-profile-override=2
set ether5 isolation-leakage-profile-override=2
```

并为选定的 Community（2）配置端口隔离/泄漏配置模板，以仅允许发往受信任 DHCP 服务器所在端口的 DHCP 流量。必须将 registration-status 和 traffic-type 属性设置为空，才能仅对 DHCP 协议应用限制。

```ros
/interface/ethernet/switch/port-isolation
add port-profile=2 protocol-type=dhcpv4 type=dst forwarding-type=bridged ports=ether1 registration-status="" traffic-type=""
```

## 服务质量（QoS） {#quality-of-service-qos}

---

**QoS 配置方案**

基于 MAC 的流量调度和整形：[UFDB 中的 MAC 地址] -> [QoS 组] -> [优先级] -> [队列] -> [整形器]

基于 VLAN 的流量调度和整形：[VLAN 表中的 VLAN ID] -> [QoS 组] -> [优先级] -> [队列] -> [整形器]

基于协议的流量调度和整形：[协议 VLAN 表中的协议] -> [QoS 组] -> [优先级] -> [队列] -> [整形器]

基于 PCP/DEI 的流量调度和整形：[交换机端口 PCP/DEI 映射] -> [优先级] -> [队列] -> [整形器]

基于 DSCP 的流量调度和整形：[QoS DSCP 映射] -> [优先级] -> [队列] -> [整形器]

### 使用内部优先级的基于 MAC 的流量调度 {#mac-based-traffic-scheduling-using-internal-priority}

在严格优先级调度模式中，最高优先级队列最先得到服务。队列编号表示优先级，队列编号最高的队列具有最高优先级。流量从最高优先级队列发送，直到该队列为空，然后转到下一个最高优先级队列，依此类推。如果出站端口没有拥塞，数据包一收到就会发送。如果高优先级流量持续到来的端口发生拥塞，较低优先级的队列会得不到服务。

在所有 CRS 交换机上，根据内部优先级进行基于 MAC 的出站流量调度的方案如下：[MAC 地址] -> [QoS 组] -> [优先级] -> [队列]；  
在此示例中，host1（E7:16:34:00:00:01）和 host2（E7:16:34:00:00:02）在 ether7 端口上的发送流量将具有较高优先级 1，其余主机将具有较低优先级 0。请注意，CRS 每个端口最多有 8 个队列。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

创建一个供 UFDB 使用的 QoS 组：

```ros
/interface/ethernet/switch/qos-group
add name=group1 priority=1
```

添加 UFDB 条目以匹配 ether7 上的特定 MAC，并应用 QoS group1：

```ros
/interface/ethernet/switch/unicast-fdb
add mac-address=E7:16:34:00:00:01 port=ether7 qos-group=group1 svl=yes
add mac-address=E7:16:34:00:00:02 port=ether7 qos-group=group1 svl=yes
```

配置 ether7 端口队列，使其仅针对目的地址按严格优先级和 QoS 方案工作：

```ros
/interface/ethernet/switch/port
set ether7 per-queue-scheduling="strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0" priority-to-queue=0:0,1:1 qos-scheme-precedence=da-based
```

### 使用内部优先级的基于 MAC 的流量整形 {#mac-based-traffic-shaping-using-internal-priority}

根据内部优先级进行基于 MAC 的流量整形的方案如下：[MAC 地址] -> [QoS 组] -> [优先级] -> [队列] -> [整形器]；  
在此示例中，不限速流量将具有优先级 0，限速流量将具有优先级 1，带宽限制为 10Mbit。请注意，CRS 每个端口最多有 8 个队列。

创建一组用于交换的端口：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

创建一个供 UFDB 使用的 QoS 组：

```ros
/interface/ethernet/switch/qos-group
add name=group1 priority=1
```

添加 UFDB 条目以匹配 ether8 上的特定 MAC，并应用 QoS group1：

```ros
/interface/ethernet/switch/unicast-fdb
add mac-address=E7:16:34:A1:CD:18 port=ether8 qos-group=group1 svl=yes
```

配置 ether8 端口队列，使其仅针对目的地址按严格优先级和 QoS 方案工作：

```ros
/interface/ethernet/switch/port
set ether8 per-queue-scheduling="strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0" priority-to-queue=0:0,1:1 qos-scheme-precedence=da-based
```

在 ether8 上为 queue1 应用带宽限制：

```ros
/interface/ethernet/switch/shaper
add port=ether8 rate=10M target=queue1
```

如果 CRS 交换机支持访问控制列表，则此配置更简单：

```ros
/interface/ethernet/switch/acl/policer
add name=policer1 yellow-burst=100k yellow-rate=10M

/interface/ethernet/switch/acl
add mac-dst-address=E7:16:34:A1:CD:18 policer=policer1
```

### 使用内部优先级的基于 VLAN 的流量调度 + 整形 {#vlan-based-traffic-scheduling--shaping-using-internal-priorities}

最佳实践是为受整形器限制的流量分配较低的内部 QoS 优先级，从而使其在严格优先级调度程序中也不那么重要。（较高优先级应更重要且不受限制）

在此示例中：  
交换机端口 ether6 使用整形器来限制来自 ether7 和 ether8 的流量。  
当链路达到容量时，具有最高优先级的流量将首先发送。  
VLAN10 -> QoS group0 = 最低优先级  
VLAN20 -> QoS group1 = 正常优先级  
VLAN30 -> QoS group2 = 最高优先级

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

创建供 VLAN 表使用的 QoS 组。

```ros
/interface/ethernet/switch/qos-group
add name=group0 priority=0
add name=group1 priority=1
add name=group2 priority=2
```

添加 VLAN 条目，为特定 VLAN 应用 QoS 组。

```ros
/interface/ethernet/switch/vlan
add ports=ether6,ether7,ether8 qos-group=group0 vlan-id=10
add ports=ether6,ether7,ether8 qos-group=group1 vlan-id=20
add ports=ether6,ether7,ether8 qos-group=group2 vlan-id=30
```

配置 ether6、ether7 和 ether8 端口队列，使其仅针对基于 VLAN 的 QoS 按严格优先级和 QoS 方案工作。

```ros
/interface/ethernet/switch/port
set ether6 per-queue-scheduling="strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0" priority-to-queue=0:0,1:1,2:2 qos-scheme-precedence=vlan-based
set ether7 per-queue-scheduling="strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0" priority-to-queue=0:0,1:1,2:2 qos-scheme-precedence=vlan-based
set ether8 per-queue-scheduling="strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0" priority-to-queue=0:0,1:1,2:2 qos-scheme-precedence=vlan-based
```

在 ether6 上应用带宽限制。

```ros
/interface/ethernet/switch/shaper
add port=ether6 rate=10M
```

### 基于 PCP 的流量调度 {#pcp-based-traffic-scheduling}

默认情况下，CRS1xx/CRS2xx 系列设备会忽略 PCP/CoS/802.1p 值，并以 FIFO（先进先出）方式转发数据包。当设备内部队列未满时，数据包以 FIFO 方式发送；但一旦某个队列被填满，较高优先级的流量可以先发送。让我们考虑一个场景：**ether1** 和 **ether2** 正在向 **ether3** 转发数据，但当 **ether3** 拥塞时，数据包将被调度。我们可以配置交换机保留最低优先级的数据包，直到所有更高优先级的数据包都发送完毕。这是 VoIP 类型设置中非常常见的场景，其中某些流量需要优先处理。

要实现这种行为，请将 **ether1**、**ether2,** 和 **ether3** 端口加入同一个交换组：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1 hw=yes
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether3 hw=yes
```

为每个端口上的每个内部队列启用 **Strict Policy**：

```ros
/interface/ethernet/switch/port
set ether1,ether2,ether3 per-queue-scheduling="strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0"
```

将每个 PCP 值映射到内部优先级值；为方便起见，只需将 PCP 一对一映射到内部优先级：

```ros
/interface/ethernet/switch/port
set ether1,ether2,ether3 pcp-based-qos-priority-mapping=0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7
```

由于交换机会先清空最大的队列，而你需要最高优先级先得到服务，因此可以将此内部优先级一对一分配到队列：

```ros
/interface/ethernet/switch/port
set ether1,ether2,ether3 priority-to-queue=0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7
```

最后，将每个交换机端口设置为根据 PCP 值调度数据包：

```ros
/interface/ethernet/switch/port
set ether1,ether2,ether3 qos-scheme-precedence=pcp-based
```

## 带宽限制 {#bandwidth-limiting}

---

入口端口策略器和整形器都为 CRS 交换机提供带宽限制功能。

- 入口端口策略器在端口上设置 RX 限制：

```ros
/interface/ethernet/switch/ingress-port-policer
add port=ether5 meter-unit=bit rate=10M
```

- 整形器在端口上设置 TX 限制。

```ros
/interface/ethernet/switch/shaper
add port=ether5 meter-unit=bit rate=10M
```

## 流量风暴控制 {#traffic-storm-control}

---

同一个入口端口策略器还可用于流量风暴控制，以防止广播、组播或单播流量风暴对二层端口造成中断。

- 在 ether5 端口上进行广播风暴控制的示例，限制为每秒 500 个数据包：

```ros
/interface/ethernet/switch/ingress-port-policer
add port=ether5 rate=500 meter-unit=packet packet-types=broadcast  
```

- 包含多种数据包类型的示例，其中包括 ARP 和 ND 协议以及未注册组播流量。未注册组播是未在组播转发表中定义的流量。

```ros
/interface/ethernet/switch/ingress-port-policer
add port=ether5 rate=5k meter-unit=packet packet-types=broadcast,arp-or-nd,unregistered-multicast
```

## 另请参阅 {#see-also}

---

- [基本 VLAN 交换](./basic-vlan-switching.md)
- [网桥硬件卸载](../index.md#bridge-hardware-offloading)
- [生成树协议](./spanning-tree-protocol.md)
- [IGMP 侦听](./bridge-igmp-mld-snooping.md)
- [DHCP 侦听和 Option 82](../index.md#dhcp-snooping-and-dhcp-option-82)
- [RouterBOARD 上的 MTU](../../hardware/mtu-in-routeros.md)
- [二层错误配置](./layer2-misconfiguration.md)
