---
title: "网桥 VLAN 表"
description: "本页介绍 MikroTik RouterOS 的 Bridge VLAN Table 功能，说明如何使用 tagged/untagged 端口、PVID 和 ingress/egress 规则在网桥中配置 VLAN 过滤。页面包含 trunk 端口和 access 端口的配置示例，并重点说明通过管理访问控制 and EtherType 过滤增强安全性。"
tags:
  - 'bridge-vlan-filtering'
  - 'vlan'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/user-guides/bridge-vlan-table
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

可以使用网桥过滤网络中的 VLAN。为此，应使用 [Bridge VLAN Filtering](/docs/7.24/bridging-and-switching#bridge-vlan-filtering) 功能。应使用此功能替代许多已知的 VLAN 错误配置，这些配置很可能导致性能问题或连接问题。可以在 [VLAN in a bridge with a physical interface](/docs/7.24/bridging-and-switching/user-guides/layer2-misconfiguration#vlan-in-a-bridge-with-a-physical-interface) 一节中了解最常见的错误配置之一。bridge VLAN filtering 功能最重要的部分是 bridge VLAN 表，它指定每个端口允许哪些 VLAN，但如果要进行更高级的设置，配置可能会相当复杂。对于通用设置，应能使用 [Trunk and Access ports](/docs/7.24/bridging-and-switching#vlan-example-trunk-and-access-ports) 示例配置设备，但本指南的目的是深入解释并指出使用 bridge VLAN Filtering 时的一些行为特征。

## Background

---

在深入解释 bridge VLAN filtering 之前，应了解与 bridge VLAN filtering 相关的几个基本概念。

- **Tagged/Untagged** - 在 `/interface/bridge/vlan` 菜单下，可以指定包含 tagged 和 untagged 端口的条目。通常，tagged 端口应为 trunk 端口，untagged 端口应为 access 端口。通过指定 tagged 端口，网桥将始终为通过该端口发送（egress）的数据包设置 VLAN 标签。通过指定 untagged 端口，网桥将始终从 egress 数据包中移除 VLAN 标签。

- **VLAN-ids** - 在 `/interface/bridge/vlan` 菜单下，可以指定一个条目，允许特定 VLAN 通过指定端口。VLAN ID 会在 egress 端口上检查。如果数据包包含的 VLAN ID 在 egress 端口的 bridge VLAN 表中不存在，则该数据包会在发送出去之前被丢弃。

- **PVID** - Port VLAN ID 用于 access 端口，为所有 ingress 流量添加特定 VLAN ID 标签。对于每个使用的 PVID，都会在 bridge VLAN 表中添加一条动态条目，并自动将该端口添加为 untagged 端口。

- **Ingress filtering** - 默认情况下，bridge VLAN 表中不存在的 VLAN 会在发送出去之前（egress）被丢弃，但该属性允许在收到数据包时（ingress）丢弃该数据包。

- **Management access** - 网桥应只是在网桥端口之间转发数据包，对其他设备而言，它们之间似乎只有一根网线。借助 bridge VLAN filtering，可以限制哪些数据包允许访问配置了网桥的设备。最常见的做法是仅允许使用非常特定的 VLAN ID 访问设备，但也有其他方式可以授予对设备的访问权限。通过网桥端口访问设备时，Management access 是增加一层安全性的好方法；这种访问有时称为 management port。对于支持通过硬件卸载进行 VLAN Filtering 的设备，它也与网桥的 CPU 端口相关。

- **CPU port** - 每个带交换芯片的设备都有一个特殊用途的端口，称为 CPU port，用于与设备的 CPU 通信。对于支持通过硬件卸载进行 VLAN filtering 的设备，该端口就是网桥接口本身。该端口主要用于创建 management access，但也可用于其他目的，例如，在 VLAN 之间路由流量、标记数据包以及应用队列。

- **frame-type** - 可以根据数据包是否带有 VLAN 标签进行过滤；这有助于为网桥端口增加一层额外的安全性。

- **EtherType** - 默认情况下，支持 VLAN 的网桥会通过检查 C-TAG（0x8100）来过滤 VLAN；所有其他 VLAN 标签类型都被视为未带标签的数据包（没有 VLAN 标签）。所选的 EtherType 将用于 VLAN 过滤以及 VLAN 添加/移除标签。

- **VLAN Tunnelling** - 如果数据包的 EtherType 与网桥配置的 EtherType 不匹配，则入站数据包会被视为未带标签的数据包；此行为可以将 VLAN 封装到另一个不同的 VLAN 中。这也可以让特定流量经过网络中的不同设备。

- **Tag stacking** - 如果数据包带有与 EtherType 匹配的 VLAN 标签，则该数据包会被视为带标签的数据包，但你可以强制添加另一个 VLAN 标签，而不考虑数据包的内容。通过在网桥端口上设置 `tag-stacking=yes`，你可以为所有入站数据包在其他任何标签之上再添加一个带有 PVID 值的 VLAN 标签。

## Trunk/Access 端口设置 {#trunkaccess-port-setup}

---

下面给出了一种非常常见的典型设置示意图，由一个 trunk 端口和多个 access 端口组成：

![Trunk and Access Setup](/img/20938aff1d4b205b.webp)

这种设置非常常见，因为它可以在使用单台交换机（可能还有单台路由器）的同时，将网络划分为多个网段。对于希望分离多个部门的公司来说，这种需求非常常见。借助 VLAN，你可以使用不同的 DHCP 服务器，根据 VLAN ID 从不同子网分配 IP 地址，从而大大简化防火墙规则和 QoS 的创建。

在这种设置中，你可以将一些通用设备（如台式电脑）连接到 **ether2** 和 **ether3**。这些设备可视为工作站，通常只使用未带标签的流量（也可以强制为通用工作站发送的所有流量添加 VLAN 标签，但这并不常见）。要将某些工作站与其他工作站隔离，必须为进入 **ether2** 或 **ether3** 的所有数据包添加 VLAN 标签；但要决定数据包应获得哪个 VLAN ID，需要使用一个称为 **Port-based VLANs** 的概念。在该概念中，数据包会根据设备所连接的网桥端口获得带有相应 VLAN ID 的 VLAN 标签。例如，在此设置中，**ether2** 上的设备将获得带有 **VLAN20** 的 VLAN 标签，**ether3** 上的设备将获得带有 **VLAN30** 的 VLAN 标签。只要有足够的网桥端口，这个概念就具有很强的可扩展性。这应能帮助你理解，网桥与 **ether2/ether3** 后面设备之间的流量是未带标签的（因为没有 VLAN 标签，因此得名）。

确定未标记端口后，即可确定标记端口。标记端口将作为 trunk 端口（承载多个 VLAN 的端口），通常该端口连接到路由器或另一台交换机/网桥。也可以有多个 trunk 端口。标记端口始终承载带 VLAN 标签的数据包（因此得名），并且必须为希望该端口转发的每个 VLAN ID **始终**指定标记端口。一个端口对于某个 VLAN ID 可以是标记端口，而同一端口对于另一个 VLAN ID 可以是未标记端口，但这用于另一种类型的配置（Hybrid 端口配置）。

必须特别说明 PVID 属性。该属性应用于 access 端口，但也可用于 trunk 端口（在 Hybrid 端口配置中）。通过使用 PVID 属性，会为在该特定网桥端口上接收的所有 **未标记** 数据包添加一个新的 VLAN 标签，其 VLAN ID 由 PVID 指定。PVID 对带标签的数据包没有任何影响，这意味着，例如，如果在具有 `PVID=20` 的 **ether2** 上接收到带有 **VLAN40** 标签的数据包，则 VLAN 标签 **不会** 更改，转发将取决于网桥 VLAN 表中的条目。

要配置 trunk/access 端口设置，需要先创建一个网桥：

```ros
/interface/bridge
add name=bridge1
```

:::danger
暂时不要启用 VLAN 过滤，否则可能因为缺少管理访问而被锁定在设备之外，管理访问将在最后配置。
:::

添加网桥端口，并为每个 access 端口指定 PVID：

```ros
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2 pvid=20
add bridge=bridge1 interface=ether3 pvid=30
```

:::warning
在启用 VLAN 过滤之前，PVID 不会生效。
:::

在网桥 VLAN 表中添加相应条目：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 untagged=ether2 vlan-ids=20
add bridge=bridge1 tagged=ether1 untagged=ether3 vlan-ids=30
```

你可能会认为可以用一个条目简化这些配置，类似这样：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 untagged=ether2,ether3 vlan-ids=20,30
```

请勿在 access 端口上使用多个 VLAN ID。这会无意中允许 **VLAN20** 和 **VLAN30** 同时通过两个 access 端口。在上面的示例中，**ether3** 本应将所有入站数据包的 VLAN 标签设置为使用 **VLAN30**（因为 `PVID=30`），但当 VLAN 通过该端口发出时，这并不会限制该端口允许的 VLAN。bridge VLAN 表负责决定某个 VLAN 是否允许通过特定端口发送。上面的条目指定 **VLAN20** 和 **VLAN30** 都允许通过 **ether2** 和 **ether3** 发出，此外该条目还指定数据包应以不带 VLAN 标签的方式发出（数据包以 untagged 数据包形式发出）。因此，你可能造成数据包从 VLAN 泄漏到本不应接收此类流量的端口，见下图。

![Trunk and Access Setup Bad](/img/a7093a0683d04f73.webp)

配置错误的 VLAN 表允许 VLAN20 通过 ether3 发送；它也会允许 VLAN30 通过 ether2

:::danger
不要在 bridge VLAN 表条目中为 access 端口指定多个 VLAN ID；只应为 trunk 端口指定多个 VLAN ID。
:::

无需将 bridge 端口添加为 untagged 端口，因为每个 bridge 端口都会根据 PVID 属性中指定的 VLAN ID 动态添加为 untagged 端口。这是因为有一项功能会出于便利性和性能考虑，自动在 bridge VLAN 表中添加相应条目。该功能确实有一些注意事项，你必须了解。所有具有相同 PVID 的端口都会作为 untagged 端口添加到对应 VLAN ID 的单个条目中，但请注意，**Bridge interface** 也有一个 VLAN ID。

出于测试目的，我们将启用 VLAN 过滤，但请注意，这可能会导致你失去对设备的访问，因为设备尚未配置管理访问（稍后会配置）。始终建议在使用串行控制台时配置 VLAN 过滤，不过你也可以通过未添加到 bridge 的端口配置设备。确保你正在使用串行控制台，或通过其他端口（不在 bridge 中的端口）连接，然后启用 VLAN 过滤：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes
```

:::warning
启用 VLAN 过滤后，你可能不会立即失去对设备的访问，但可能会断开连接，因为 bridge 必须自行重置才能使 VLAN 过滤生效，这将迫使你重新连接（这在使用 MAC-telnet 时尤其相关）。你仍有可能使用 untagged 流量访问设备。下文描述了这种情况。
:::

如果你现在已经启用了 VLAN 过滤并打印出当前 VLAN 表，你会看到这样的表：

```text
[admin@MikroTik] > /interface/bridge/vlan/print
Flags: X - disabled, D - dynamic 
 #   BRIDGE                     VLAN-IDS  CURRENT-TAGGED       CURRENT-UNTAGGED
 0   bridge1                    20        ether1               ether2
 1   bridge1                    30        ether1               ether3
 2 D bridge1                    1                              bridge1
                                                               ether1
```

由于所有 bridge 端口（包括我们的 trunk 端口 **ether1**）默认设置了 `PVID=1`，因此会为 **VLAN1** 添加动态条目，但你还应注意，**bridge1** 接口（CPU 端口）也会动态添加。你应了解，**bridge1** 也是 bridge 端口，因此可能会被动态添加到 bridge VLAN 表中。由于该功能，你可能会无意中允许访问设备。例如，如果你按照本指南操作，trunk 端口（**ether1**）保留了 **PVID=1**，并且也没有更改 CPU 端口（**bridge1**）的 PVID，则允许通过 **ether1** 使用 untagged 流量访问设备。打印 bridge VLAN 表时也可以看到这一点。下图说明了这种情况：

![Trunk and Access Setup Unintentional Management](/img/f93fac4718d29a3f.webp)

意外允许通过 trunk 端口使用未标记流量进行管理访问

:::danger
如果未意外允许某些 VLAN 或未标记流量访问特定端口，尤其是 CPU 端口（bridge），请始终检查网桥 VLAN 表。
:::

有一种简单的方法可以防止网桥（CPU 端口）被添加为未标记端口。只需将 trunk 端口的 PVID 设置为与网桥的 PVID 不同（或更改网桥的 PVID），但还有另一个更直观且推荐的选项。由于你期望 trunk 端口只接收带标记的流量（在本示例中，它应只接收 **VLAN20/VLAN30**），而不接收未标记流量，因此可以使用 ingress-filtering 和 frame-type 过滤不需要的数据包，但要完全理解 ingress filtering 的行为，必须先了解管理访问的细节。

管理访问用于创建一种通过启用了 VLAN 过滤的网桥访问设备的方式。你可以简单地允许未标记访问，这样做相当简单。假设你希望 **ether3** 后面的工作站能够访问设备。我们之前假设该工作站是一台普通计算机，不会使用带标记的数据包，因此只会发送未标记的数据包。这意味着我们应该将 CPU 端口（**bridge1**）作为未标记接口添加到网桥 VLAN 表中。为此，只需为 **bridge1** 和 **ether3** 端口使用相同的 PVID 值，并将两个端口都设置为该 VLAN ID 的未标记成员。在这种情况下，你将从具有 `PVID=30` 的 **ether3** 连接，因此相应地更改配置：

```ros
/interface/bridge/set [find name=bridge1] pvid=30
/interface/bridge/vlan/set [find vlan-ids=30] untagged=bridge1,ether3
```

:::warning
你可以使用动态添加具有相同 PVID 值的未标记端口的功能，也可以直接更改 PVID，使 **ether3** 和 **bridge1** 匹配。
:::

允许使用未标记流量访问设备不被视为良好的安全实践。更好的方式是允许使用非常特定的 VLAN（有时称为管理 VLAN）访问设备。在本例中，这将是 **VLAN99**。这增加了一层重要的安全性，因为攻击者必须先猜测用于管理目的的 VLAN ID，然后再猜测登录凭据。除此之外，你甚至可以通过仅允许某些 IP 地址访问设备来增加另一层安全性。本指南的目的是提供深入解释。因此，我们在配置中增加了一层复杂性，以了解你必须考虑的一些潜在注意事项。我们将允许从 access 端口使用带标记的流量进行访问（如下图所示）。要允许从 **ether3** 使用 **VLAN99** 访问设备，必须在网桥 VLAN 表中添加正确的条目。此外，连接到 ether3 的网络设备必须支持 VLAN 标记。

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,ether3 vlan-ids=99
```

![Trunk and Access Setup Management Access](/img/2e50b643c921b4f2.webp)

通过 access 端口使用带标记流量进行管理访问（这使其成为 hybrid 端口）

:::warning
如果 ether1 和 bridge1 的 PVID 匹配（默认情况下确实匹配，均为 1），则由于动态向网桥 VLAN 表添加未标记端口的功能，将允许使用来自 ether1 的未标记流量访问设备。
:::

但你可能会发现，此时使用 **VLAN99** 的访问无法工作。这是因为你需要一个监听带标签流量的 VLAN 接口。你可以直接为相应的 VLAN ID 创建该接口，并为其设置 IP 地址：

```ros
/interface/vlan
add interface=bridge1 name=VLAN99 vlan-id=99
/ip/address
add address=192.168.99.2/24 interface=VLAN99
```

:::warning
此时，我们的 access 端口（**ether3**）同时期望接收带标签和未带标签的流量；这样的端口称为 **hybrid port**。
:::

此时，我们可以使用 `ingress-filtering` 和 `frame-type`。首先，我们重点介绍 `frame-type`，它用于限制允许的数据包类型（tagged、untagged、both），但要使 `frame-type` 正常工作，必须启用 `ingress-filtering`，否则它不会生效。在我们的示例中，我们希望允许通过带标签流量（**VLAN99**）从 **ether3** 访问，同时允许普通工作站访问网络，因此可以得出结论：该端口需要允许带标签和未带标签的数据包，但 **ether1** 和 **ether2** 只应接收特定类型的数据包，基于这些原因，我们可以增强网络的安全性。由于 **ether1** 是 trunk 端口，它只应承载带标签的数据包，而 **ether2** 是 access 端口，因此不应承载任何带标签的数据包，基于这些结论，我们可以丢弃无效数据包：

```ros
/interface/bridge/port
set [find where interface=ether1] ingress-filtering=yes frame-types=admit-only-vlan-tagged
set [find where interface=ether2] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
```

假设你忘记启用 ingress-filtering，并且没有修改 **ether1** 上的 frame-type 属性，这将意外地允许通过 **ether1** 使用未带标签流量访问设备，因为 **bridge1** 和 **ether1** 的 PVID 匹配，但你期望只有带标签流量能够访问设备。可以丢弃所有发往 **CPU port** 的未带标签数据包：

```ros
/interface/bridge
set bridge1 frame-types=admit-only-vlan-tagged ingress-filtering=yes
```

这不仅会丢弃未带标签的数据包，还会禁用将未带标签端口动态添加到 bridge VLAN 表的功能。如果你打印当前的 bridge VLAN 表，你会发现 **bridge1** 没有被动态添加为未带标签端口：

```text
[admin@MikroTik] > /interface/bridge/vlan/print 
Flags: X - disabled, D - dynamic 
 #   BRIDGE       VLAN-IDS  CURRENT-TAGGED        CURRENT-UNTAGGED
 0   bridge1      20        ether1
 1   bridge1      30        ether1                ether3
 2 D bridge1      1                               ether1
 3   bridge1      99        bridge1
                            ether3  
```

:::warning
当在端口上使用 `frame-type=admit-only-vlan-tagged` 时，该端口不会作为 PVID 的未带标签端口被动态添加。
:::

虽然 `frame-type` 可用于丢弃某种类型的数据包，但 `ingress-filtering` 可用于在数据包被转发出去之前将其过滤掉。要完全理解 ingress filtering 的必要性，请考虑以下场景：**VLAN99** 允许在 **ether3** 和 **bridge1** 上使用，但你仍然可以将 **VLAN99** 流量从 **ether1** 发送到 **ether3**。这是因为 bridge VLAN 表只在 egress 端口上检查端口是否允许承载某个 VLAN。在我们的例子中，**ether3** 被允许承载 **VLAN99**，因此数据包会被转发。要防止这种情况，你**必须**使用 ingress-filtering。启用 ingress filtering 后，ingress 数据包也会被检查。在我们的例子中，bridge VLAN 表中没有允许 **VLAN99** 在 **ether1** 上使用的条目，因此数据包会立即被丢弃。当然，在我们的场景中，如果没有 ingress filtering，连接无法建立，因为 **VLAN99** 只能从 **ether1** 转发到 **ether3**，而不能从 **ether3** 转发到 **ether1**，但对于这种错误配置，仍然存在可能的攻击方式（例如 ARP 欺骗）。下图展示了数据包丢弃行为：

![Trunk and Access Setup Ingress](/img/7749e7dc360a6532.webp)

启用和未启用 ingress filtering 时的 trunk/access 端口设置。Ingress filtering 可以防止不需要的流量被转发。请注意，bridge VLAN 表中不允许 ether1 承载 VLAN99。

:::danger
尽可能在所有可用位置使用 `ingress-filtering`。它会增加一层重要的安全防护。
:::

`ingress-filtering` 也可用于 **CPU 端口**（网桥）。它可用于阻止某些可能的攻击途径，并限制可访问 CPU 的 VLAN。相比在出端口丢弃数据包，最好在入端口丢弃数据包。这可以降低 CPU 负载，在使用网桥 VLAN 过滤和硬件卸载时，这一点非常重要。

:::warning
`ingress-filtering` 属性仅影响入站流量，而 `frame-type` 会同时影响出站和入站流量。
:::

即使可以限制端口上允许的 VLAN 和数据包类型，通过 access 端口允许访问设备也不是良好的安全实践，因为攻击者可能嗅探数据包并提取管理 VLAN 的 ID。应仅允许通过 trunk 端口（**ether1**）访问设备，因为 trunk 端口通常具有更好的物理安全性。应删除先前的条目，并允许通过连接到路由器的端口访问设备（如下图所示）：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,ether1 vlan-ids=99
```

![Basic VLAN Switching](/img/3d52e43430750024.webp)

## VLAN 隧道设置 {#vlan-tunnelling-setup}

---

在某些情况下，你可能希望通过某些交换机转发已带标签的流量。这是骨干基础设施中很常见的设置，因为它可以将来自例如边缘路由器的流量进行封装，并通过骨干网络无缝转发到另一台边缘路由器。下面是一个 VLAN 隧道拓扑示例：

![Provider Bridge](/img/e772ab697f2fae91.webp)

服务提供商网桥拓扑

SVID 表示 Service VID，用于指示标签类型以及 VID。

:::warning
在继续操作之前，请先阅读 Trunk/Access 端口设置部分，以完整了解如何正确配置 VLAN 隧道。
:::

有两种方式可以实现这一点：一种是标准化的 IEEE 802.1ad 方式，另一种是使用 **Tag stacking**。我们先介绍标准化方式，因为两种方式遵循相同的原理，只需更改几个参数即可使用另一种方法。VLAN 隧道的工作方式是：网桥检查外层 VLAN tag 是否使用 ether-type 中指定的 VLAN tag。如果 VLAN tag 匹配，则将数据包视为带 tag 的数据包；否则，将其视为不带 tag 的数据包。

:::warning
网桥仅检查外层 tag（最接近 MAC 地址的 tag）；在网桥配置中，其他任何位置的 tag 都会被忽略。网桥不感知数据包内容；即使数据包中可能还有另一个 VLAN tag，也只检查第一个 VLAN tag。
:::

ether-type 属性允许为 VLAN tag 选择以下 EtherType：

- 0x88a8 - IEEE 802.1ad，Service Tag。
- 0x8100 - IEEE 802.1Q，Customer VLAN（常规 VLAN tag）。
- 0x9100 - 非官方 tag 类型（很少使用）。

要正确配置网桥 VLAN 过滤，必须了解网桥如何区分带 tag 和不带 tag 的数据包。如前所述，网桥会检查 EtherType 是否与数据包中的外层 VLAN tag 匹配。例如，考虑以下数据包：

```text
FFFFFFFFFFFF 6C3B6B7C413E 8100 6063 9999
----------------------------------------
DST-MAC = FFFFFFFFFFFF
SRC-MAC = 6C3B6B7C413E
Outer EtherType = 8100 (IEEE 802.1Q VLAN tag)
VLAN priority = 3
VLAN ID = 99 (HEX = 63)
Inner EtherType = 9999
```

假设我们设置了 **`ether-type=0x88a8`**，在这种情况下，上述数据包将被视为不带 tag，因为网桥正在查找不同的 VLAN tag。现在考虑以下数据包：

```text
FFFFFFFFFFFF 6C3B6B7C413E 88A8 6063 8100 5062 9999
----------------------------------------
DST-MAC = FFFFFFFFFFFF
SRC-MAC = 6C3B6B7C413E
Outer EtherType = 88A8 (IEEE 802.1ad VLAN tag)
VLAN priority = 3
VLAN ID = 99 (HEX = 63)
Inner EtherType 1 = 8100 (IEEE 802.1Q VLAN tag)
VLAN priority = 2
VLAN ID = 98 (HEX = 62)
Inner EtherType 2 = 9999
```

这次假设我们设置了 **`ether-type=0x8100`**。在这种情况下，上述数据包同样被视为不带 tag，因为外层 tag 使用的是 IEEE 802.1ad VLAN tag。相同的原理也适用于其他 VLAN 相关功能，例如，`PVID` 属性会在 access 端口上添加新的 VLAN tag，并且该 VLAN tag 将使用 ether-type 中指定的 EtherType。

**SW1** 和 **SW2** 均使用相同的配置：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes ether-type=0x88a8
/interface/bridge/port
add interface=ether1 bridge=bridge1 pvid=200
add interface=ether2 bridge=bridge1 pvid=300
add interface=ether3 bridge=bridge1
/interface/bridge/vlan
add bridge=bridge1 tagged=ether3 untagged=ether1 vlan-ids=200
add bridge=bridge1 tagged=ether3 untagged=ether2 vlan-ids=300
```

在本示例中，我们假设所有路由器都在转发使用普通 VLAN / 客户 VLAN 标签的流量。根据上述原则，交换机上的此类流量将被视为未标记流量。交换机会使用 Service VLAN 标签（外层 802.1ad 标签）封装该流量，并且 **SW1** 和 **SW2** 之间的流量将被视为已标记流量。在流量到达目的地之前，交换机会解封装外层标签，并转发原始的 802.1Q 标记帧。请参见下面的数据包示例：

![Service VLAN 802.1ad](/img/b77a2f1f9e4171e9.webp)A packet example before and after 802.1ad VLAN encapsulation

:::warning
适用于使用 IEEE 802.1Q 的普通 trunk / access 端口设置的所有原则也适用于 VLAN 隧道设置。请确保使用 bridge VLAN 表和 ingress filtering 正确限制 VLAN 和数据包类型。
:::

如果你想创建从 **ether3** 到设备的管理访问，并希望使用 **VLAN99**，则可以使用以下命令：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,ether3 vlan-ids=99
/interface/vlan
add interface=bridge1 name=VLAN99 use-service-tag=yes vlan-id=99
/ip/address
add address=192.168.99.2/24 interface=VLAN99
```

如你所见，唯一的区别是 VLAN 接口使用了 `use-service-tag=yes`；这会将 VLAN 接口设置为监听 IEEE 802.1ad VLAN 标签。这将要求你使用 IEEE 802.1ad VLAN 标签通过管理 VLAN 访问设备——当 bridge VLAN filtering 启用时，你将无法使用普通 VLAN 标签连接到设备。ether-type 是全局设置的，将影响所有 bridge VLAN filtering 功能。

:::danger
搭载 Marvell-98DX3257 交换芯片的设备（例如 CRS354 系列）不支持在 1Gbps 以太网接口上对其他 VLAN 类型（`0x88a8` 和 `0x9100`）进行 VLAN 过滤。
:::

### 标签堆叠 {#tag-stacking}

在 VLAN Tunnelling 设置中，我们会添加一个与原有 VLAN 标签不同的新 VLAN 标签，但也可以无论数据包内容如何都添加新的 VLAN 标签。与普通 VLAN 隧道设置的区别在于，bridge 不会检查数据包是已标记还是未标记，它假定特定端口上收到的所有数据包都是未标记数据包，并且无论是否存在 VLAN 标签都会添加新的 VLAN 标签。这称为 **Tag Stacking**，因为它会在之前的标签之上“堆叠”VLAN 标签，而不考虑 VLAN 标签类型。对于不支持 IEEE 802.1ad 标准、但仍希望将 VLAN 流量封装到新 VLAN 中的网络，这是一种非常常见的设置。

要添加的 VLAN 标签取决于 `ether-type` 和 `PVID`。例如，如果端口上配置了 `ether-type=0x8100` 和 `PVID=200`，网桥将在任何其他标签（如果存在）之上添加一个新的 IEEE 802.1Q VLAN 标签。相同的 VLAN 过滤原则仍然适用。必须确定哪些端口将作为 trunk 端口，并将它们标记为 tagged 端口；确定 access 端口，并将它们添加为 untagged 端口。

为说明标签堆叠时 VLAN 添加标签和移除标签的工作方式，我们使用与之前相同的网络拓扑：

![Basic VLAN Switching 2](/img/02a6439c12aa7838.webp)

我们要实现的目标是，无论 **ether2** 和 **ether3** 接收到什么流量，都会添加一个新的 VLAN 标签来封装来自这些端口的流量。`Tag-stacking` 会强制添加新的 VLAN 标签，因此可以使用该属性实现所需配置。我们将使用与 Trunk/Access 端口配置相同的配置，但在 access 端口上启用 `tag-stacking`：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes ether-type=0x8100
/interface/bridge/port
add bridge=bridge1 interface=ether1
add bridge=bridge1 interface=ether2 tag-stacking=yes pvid=20
add bridge=bridge1 interface=ether3 tag-stacking=yes pvid=30
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 untagged=ether2 vlan-ids=20
add bridge=bridge1 tagged=ether1 untagged=ether3 vlan-ids=30
```

:::warning
添加的 VLAN 标签将使用指定的 `ether-type`。所选 EtherType 也将用于 VLAN 过滤。仅检查外层标签，但启用 tag-stacking 后，会跳过标签检查，并假定无论如何都必须添加新标签。
:::

假设 **ether2** 和 **ether3** 后面的设备正在发送带标签的 **VLAN40** 流量。使用此配置时，**所有**数据包都会被封装上一个新的 VLAN 标签，但必须确保已将外层标签中的 VLAN ID 添加到网桥 VLAN 表中。**VLAN40** 不会添加到网桥 VLAN 表中，因为它是内层标签且不会被检查；我们只关注外层标签，根据端口不同，外层标签为 **VLAN20** 或 **VLAN30**。

与其他配置类似，网桥 VLAN 表将用于确定是否需要移除 VLAN 标签。例如，当 **ether1** 接收到带标签的 **VLAN20** 数据包时，网桥会检查 **ether2** 是否允许承载 **VLAN20**，并准备通过 **ether2** 发送这些数据包；同时，网桥还会检查网桥 VLAN 表以确定是否应移除 VLAN 标签。由于 **ether2** 被标记为 untagged 端口，网桥会将这些数据包从 **ether1** 转发到 **ether2**，且不携带 **VLAN20** VLAN 标签。

从 access 端口的角度来看，Trunk/Access 端口配置中的相同原则仍然适用。**ether2** 接收到的所有数据包都会获得一个带有 PVID 中指定 VLAN ID 的新 VLAN 标签；在本例中，将添加带有 **VLAN20** 的新 VLAN 标签，并且该 VLAN 将接受 VLAN 过滤。请参见下面的数据包示例：

![Tag Stacking](/img/ef2698e5bd946e5c.webp)

标签堆叠前后的数据包示例
