---
sidebar_key: "bridging-and-switching/user-guides/bridge-vlan-table"
sidebar_position: 3
title: "网桥 VLAN 表"
sidebar_label: "网桥 VLAN 表"
description: "本页介绍 MikroTik RouterOS 的 Bridge VLAN Table 功能，说明如何使用 tagged/untagged 端口、PVID 以及 ingress/egress 规则在网桥中配置 VLAN filtering。文中包含 trunk 和 access 端口的设置示例，强调通过管理访问控制和 EtherType filtering 来提升安全性。"
tags:
  - 'bridge-vlan-filtering'
  - 'vlan'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/user-guides/bridge-vlan-table
captured_at: '2026-11-04T11:27:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

---

可以使用网桥来过滤网络中的 VLAN。为此，应使用[网桥 VLAN 过滤](../index.md#bridge-vlan-filtering)功能。应使用此功能来替代许多已知的 VLAN 错误配置，这些配置很可能导致性能问题或连接问题。你可以在[带有物理接口的网桥中的 VLAN](./layer2-misconfiguration.md#vlan-in-a-bridge-with-a-physical-interface)一节中了解一种最常见的错误配置。网桥 VLAN 过滤功能最重要的部分是网桥 VLAN 表，它指定每个端口允许哪些 VLAN；但如果你要尝试更高级的设置，配置它可能会变得相当复杂。对于通用设置，你应该能够使用 [Trunk 和 Access 端口](../index.md#vlan-example-trunk-and-access-ports)示例来配置设备，但本指南的目的是提供深入说明，并指出使用网桥 VLAN 过滤时的一些行为特征。

## 背景 {#background}

---

在深入解释网桥 VLAN 过滤之前，你应该了解网桥 VLAN 过滤涉及的几个基本概念。

- **Tagged/Untagged** - 在 `/interface/bridge/vlan` 菜单下，你可以指定一个包含带标签端口和不带标签端口的条目。通常，带标签端口应是你的 Trunk 端口，不带标签端口应是你的 Access 端口。通过指定带标签端口，网桥会始终为此端口发出的数据包（出方向）设置 VLAN 标签。通过指定不带标签端口，网桥会始终从出方向数据包中移除 VLAN 标签。

- **VLAN-ids** - 在 `/interface/bridge/vlan` 菜单下，你可以指定一个条目，在其中允许特定端口上使用某些 VLAN。VLAN ID 会在出方向端口上检查。如果数据包包含的 VLAN ID 在该出方向端口的网桥 VLAN 表中不存在，那么该数据包会在发出之前被丢弃。

- **PVID** - 端口 VLAN ID 用于 Access 端口，为所有入方向流量打上特定 VLAN ID 的标签。每使用一个 PVID，都会在网桥 VLAN 表中添加一个动态条目，并且该端口会自动作为不带标签端口添加。

- **入方向过滤** - 默认情况下，网桥 VLAN 表中不存在的 VLAN 会在发出（出方向）之前被丢弃，但此属性允许你在数据包被接收（入方向）时将其丢弃。

- **管理访问** - 网桥本应只是在网桥端口之间转发数据包，对其他设备来说，就好像它们之间只有一根线缆。使用网桥 VLAN 过滤，你可以限制哪些数据包允许访问配置了该网桥的设备。最常见的做法是只允许通过一个非常特定的 VLAN ID 访问设备，但还有其他授予设备访问权限的方式。管理访问是通过网桥端口访问设备时增加另一层安全性的好方法；这种访问有时称为管理端口。对于支持带硬件卸载的 VLAN 过滤的设备，它还与网桥的 CPU 端口相关。

- **CPU 端口** - 每个带有交换芯片的设备都有一个称为 CPU 端口的专用端口，用于与设备的 CPU 通信。对于支持带硬件卸载的 VLAN 过滤的设备，此端口就是网桥接口本身。此端口主要用于创建管理访问，但也可用于其他目的，例如在 VLAN 之间路由流量、标记数据包以及应用队列。

- **frame-type** - 你可以根据数据包是否带有 VLAN 标签来过滤数据包；这对于为网桥端口增加额外一层安全性很有用。

- **EtherType** - 默认情况下，支持 VLAN 的网桥会通过检查 C-TAG (0x8100) 来过滤 VLAN；所有其他 VLAN 标签类型都会被视为不带标签的数据包（没有 VLAN 标签）。选定的 EtherType 将用于 VLAN 过滤以及 VLAN 打标签/移除标签。

- **VLAN 隧道** - 如果数据包的 EtherType 与网桥配置的 EtherType 不匹配，那么入方向数据包会被视为不带标签的数据包；这种行为使得可以将 VLAN 封装到另一个不同的 VLAN 中。这也使得可以在网络中将特定流量引导通过不同的设备。

- **标签堆叠** - 如果数据包带有与 EtherType 匹配的 VLAN 标签，那么该数据包会被视为带标签的数据包，但你可以不顾数据包内容而强制添加另一个 VLAN 标签。通过在网桥端口上设置 `tag-stacking=yes`，你会为所有入方向数据包在任意其他标签之上再添加一个使用 PVID 值的 VLAN 标签。

## Trunk/Access 端口设置 {#trunkaccess-port-setup}

---

下面是一个非常常见的示意图，展示了一种非常典型的设置，由一个 Trunk 端口和多个 Access 端口组成：

![Trunk and Access Setup](/img/20938aff1d4b205b.webp)

这种设置非常常见，因为它允许你在使用单台交换机（也许还有单台路由器）的同时，将网络划分为多个网段。对于希望分隔多个部门的公司来说，这种需求非常常见。使用 VLAN，你可以使用不同的 DHCP 服务器，这些服务器可以根据 VLAN ID 从不同子网分配 IP 地址，从而使创建防火墙规则和 QoS 容易得多。

在这样的设置中，你会将一些通用设备（例如台式 PC）连接到 **ether2** 和 **ether3**。这些设备可以视为工作站，它们通常只使用不带标签的流量（可以强制从通用工作站发出的所有流量都带 VLAN 标签，不过这并不常见）。要将某些工作站与其他工作站隔离，你必须为进入 **ether2** 或 **ether3** 的所有数据包添加 VLAN 标签，但要决定数据包应获得哪个 VLAN ID，你需要使用一种称为 **基于端口的 VLAN** 的概念。在此概念中，数据包会根据设备所连接的网桥端口获得带有相应 VLAN ID 的 VLAN 标签。例如，在此设置中，**ether2** 上的设备将获得带有 **VLAN20** 的 VLAN 标签，而 **ether3** 上的设备将获得带有 **VLAN30** 的 VLAN 标签。只要你有足够的网桥端口，此概念就非常具有可扩展性。这应让你理解：网桥与 **ether2/ether3** 后面的设备之间的流量是不带标签的（因为没有 VLAN 标签，名称也由此而来）。

在确定不带标签端口之后，我们现在可以确定带标签端口。带标签端口将是 Trunk 端口（承载多个 VLAN 的端口），通常此端口连接到路由器或另一台交换机/网桥。你也可以有多个 Trunk 端口。带标签端口始终承载带有 VLAN 标签的数据包（名称也由此而来），并且对于你希望该端口转发的每个 VLAN ID，你**必须始终**指定带标签端口。一个端口可能对某个 VLAN ID 是带标签端口，而同一端口对另一个 VLAN ID 是不带标签端口，但这属于另一种类型的设置（Hybrid 端口设置）。

需要特别说明 PVID 属性。此属性应在 Access 端口上使用，但也可以用于 Trunk 端口（在 Hybrid 端口设置中）。通过使用 PVID 属性，你会为在该特定网桥端口上接收到的所有 **不带标签** 数据包添加一个带有 PVID 中指定 VLAN ID 的新 VLAN 标签。PVID 对带标签数据包没有任何影响，这意味着，例如，如果 **ether2** 上接收到一个带有 **VLAN40** 标签的数据包，而该端口具有 `PVID=20`，那么 VLAN 标签**不会**改变，转发将取决于网桥 VLAN 表中的条目。

要配置 Trunk/Access 端口设置，你需要先创建一个网桥：

```ros
/interface/bridge
add name=bridge1
```

:::danger
暂时不要启用 VLAN 过滤，否则你可能会因为缺少管理访问（将在最后配置）而被锁定在设备之外。
:::

添加网桥端口，并为每个 Access 端口指定 PVID：

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

你可能认为可以用单个条目简化这些条目，类似这样：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=ether1 untagged=ether2,ether3 vlan-ids=20,30
```

**不要**在 Access 端口上使用多个 VLAN ID。这会无意中在两个 Access 端口上都允许 **VLAN20** 和 **VLAN30**。在上面的示例中，**ether3** 本应为所有入方向数据包设置使用 **VLAN30** 的 VLAN 标签（因为 `PVID=30`），但当 VLAN 通过此端口发出时，这并不会限制该端口上允许的 VLAN。网桥 VLAN 表负责决定是否允许某个 VLAN 通过特定端口发送。上面的条目指定允许 **VLAN20** 和 **VLAN30** 都通过 **ether2** 和 **ether3** 发出，而且该条目还指定数据包应在不带 VLAN 标签的情况下发出（数据包作为不带标签的数据包发出）。结果，你可能会造成 VLAN 数据包泄漏到甚至不应接收此类流量的端口，见下图。

![Trunk and Access Setup Bad](/img/a7093a0683d04f73.webp)

配置错误的 VLAN 表允许 VLAN20 通过 ether3 发送；它也会允许 VLAN30 通过 ether2 发送

:::danger
对于 Access 端口，不要在单个网桥 VLAN 表条目中指定多个 VLAN ID；只应为 Trunk 端口指定多个 VLAN ID。
:::

没有必要将网桥端口添加为不带标签端口，因为每个网桥端口都会根据 PVID 属性中指定的 VLAN ID 动态添加为不带标签端口。这是因为有一项功能会出于便利性和性能原因自动在网桥 VLAN 表中添加相应条目。此功能确实有一些你必须了解的注意事项。所有具有相同 PVID 的端口都会作为不带标签端口添加到相应 VLAN ID 的单个条目中，但请注意，**网桥接口**也有一个 VLAN ID。

出于测试目的，我们将启用 VLAN 过滤，但请注意，这可能会让你失去对设备的访问权限，因为尚未配置管理访问（我们稍后会配置）。始终建议在使用串行控制台时配置 VLAN 过滤，不过你也可以通过未添加到网桥的端口来配置设备。请确保你正在使用串行控制台，或通过其他端口（不在网桥中）连接，然后启用 VLAN 过滤：

```ros
/interface/bridge/set bridge1 vlan-filtering=yes
```

:::warning
启用 VLAN 过滤后，你可能不会立即失去对设备的访问权限，但可能会断开连接，因为网桥必须重置自身才能使 VLAN 过滤生效，这会迫使你重新连接（这主要与使用 MAC-telnet 时相关）。你仍有可能通过不带标签的流量访问设备。下面将描述这种情况。
:::

如果你现在已启用 VLAN 过滤并打印当前 VLAN 表，你会看到类似这样的表：

```text
[admin@MikroTik] > /interface/bridge/vlan/print
Flags: X - disabled, D - dynamic 
 #   BRIDGE                     VLAN-IDS  CURRENT-TAGGED       CURRENT-UNTAGGED
 0   bridge1                    20        ether1               ether2
 1   bridge1                    30        ether1               ether3
 2 D bridge1                    1                              bridge1
                                                               ether1
```

由于默认情况下所有网桥端口（包括我们的 Trunk 端口 **ether1**）都设置了 `PVID=1`，因此会为 **VLAN1** 添加一个动态条目，但你也应该注意到 **bridge1** 接口（CPU 端口）也被动态添加了。你应该意识到 **bridge1** 也是一个网桥端口，因此可能会被动态添加到网桥 VLAN 表中。由于此功能，你可能会有意无意地允许访问设备。例如，如果你遵循了本指南，并为 Trunk 端口（**ether1**）保留了 **PVID=1**，同时也没有更改 CPU 端口（**bridge1**）的 PVID，那么就允许通过 **ether1** 使用不带标签的流量访问设备。打印网桥 VLAN 表时也可以看到这一点。下图说明了这种情况：

![Trunk and Access Setup Unintentional Management](/img/f93fac4718d29a3f.webp)

通过 Trunk 端口使用不带标签流量无意中允许的管理访问

:::danger
始终检查网桥 VLAN 表，确认你没有无意中允许某些 VLAN 或不带标签流量访问特定端口，尤其是 CPU 端口（网桥）。
:::

有一种简单方法可以防止网桥（CPU 端口）被添加为不带标签端口。你可以简单地将 Trunk 端口上的 PVID 设置为不同于网桥 PVID 的值（或更改网桥的 PVID），但还有另一个更直观且推荐的选择。由于你期望 Trunk 端口只接收带标签流量（在此示例中，它应只接收 **VLAN20/VLAN30**），而不接收不带标签流量，你可以结合使用 ingress-filtering 和 frame-type 来过滤掉不需要的数据包，但要完全理解入方向过滤的行为，我们必须先了解管理访问的细节。

管理访问用于创建一种通过启用了 VLAN 过滤的网桥访问设备的方式。你可以直接允许不带标签访问，这样做相当简单。假设你希望 **ether3** 后面的工作站能够访问设备。我们之前假设该工作站是一台通用计算机，不会使用带标签数据包，因此只会发出不带标签数据包。这意味着我们应该将 CPU 端口（**bridge1**）作为不带标签接口添加到网桥 VLAN 表中；为此，只需为 **bridge1** 和 **ether3** 端口使用相同的 PVID 值，并将两个端口都设置为该 VLAN ID 的不带标签成员。在这种情况下，你将通过具有 `PVID=30` 的 **ether3** 连接，因此相应地更改配置：

```ros
/interface/bridge/set [find name=bridge1] pvid=30
/interface/bridge/vlan/set [find vlan-ids=30] untagged=bridge1,ether3
```

:::warning
你可以使用自动将具有相同 PVID 值的端口添加为不带标签端口的功能，也可以简单地更改 PVID，使 **ether3** 和 **bridge1** 的 PVID 相匹配。
:::

使用不带标签流量允许访问设备并不被认为是一种良好的安全实践。更好的方式是使用一个非常特定的 VLAN（有时称为管理 VLAN）来允许访问设备。在我们的情况下，这将是 **VLAN99**。这增加了一层显著的安全性，因为攻击者必须猜测用于管理目的的 VLAN ID，然后再猜测登录凭据。除此之外，你甚至可以通过仅允许来自特定 IP 地址的访问来增加另一层安全性。本指南的目的是提供深入说明。因此，我们正在为设置增加一定复杂度，以了解你必须考虑的一些可能注意事项。我们将允许从 Access 端口使用带标签流量进行访问（如下图所示）。要允许从 **ether3** 使用 **VLAN99** 访问设备，我们必须在网桥 VLAN 表中添加一个正确的条目。此外，连接到 ether3 的网络设备必须支持 VLAN 标签。

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,ether3 vlan-ids=99
```

![Trunk and Access Setup Management Access](/img/2e50b643c921b4f2.webp)

通过 Access 端口使用带标签流量进行管理访问（这使其成为 Hybrid 端口）

:::warning
如果 ether1 和 bridge1 的 PVID 相同（默认情况下确实与 1 相同），那么由于会自动将不带标签端口添加到网桥 VLAN 表的功能，允许从 ether1 使用不带标签流量访问设备。
:::

但你可能注意到，此时使用 **VLAN99** 的访问还无法工作。这是因为你需要一个监听带标签流量的 VLAN 接口。你可以简单地为相应 VLAN ID 创建此接口，并且还可以为该接口设置 IP 地址：

```ros
/interface/vlan
add interface=bridge1 name=VLAN99 vlan-id=99
/ip/address
add address=192.168.99.2/24 interface=VLAN99
```

:::warning
此时我们的 Access 端口（**ether3**）同时期望带标签和不带标签流量；这样的端口称为 **混合端口**。
:::

此时，我们可以受益于使用 `ingress-filtering` 和 `frame-type`。首先，我们将重点关注 `frame-type`，它限制允许的数据包类型（带标签、不带标签、两者），但要让 `frame-type` 正常工作，必须启用 `ingress-filtering`，否则它不会产生任何效果。在我们的示例中，我们希望允许从 **ether3** 使用带标签流量（**VLAN99**）访问，同时允许通用工作站访问网络，因此可以得出结论：此端口需要允许带标签和不带标签数据包，但 **ether1** 和 **ether2** 应只接收特定类型的数据包；基于这些原因，我们可以增强网络的安全性。由于 **ether1** 是我们的 Trunk 端口，它应只承载带标签数据包，而 **ether2** 是我们的 Access 端口，因此它不应承载任何带标签数据包；基于这些结论，我们可以丢弃无效数据包：

```ros
/interface/bridge/port
set [find where interface=ether1] ingress-filtering=yes frame-types=admit-only-vlan-tagged
set [find where interface=ether2] ingress-filtering=yes frame-types=admit-only-untagged-and-priority-tagged
```

假设你忘记在 **ether1** 上启用 ingress-filtering 并更改 frame-type 属性，由于 **bridge1** 和 **ether1** 的 PVID 相同，这会无意中允许通过 **ether1** 使用不带标签流量访问设备，而你期望只有带标签流量才能访问设备。可以丢弃所有发往 **CPU 端口** 的不带标签数据包：

```ros
/interface/bridge
set bridge1 frame-types=admit-only-vlan-tagged ingress-filtering=yes
```

这不仅会丢弃不带标签数据包，还会禁用自动将不带标签端口添加到网桥 VLAN 表的功能。如果你打印当前网桥 VLAN 表，你会注意到 **bridge1** 没有被动态添加为不带标签端口：

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
在端口上使用 `frame-type=admit-only-vlan-tagged` 时，该端口不会为 PVID 动态添加为不带标签端口。
:::

虽然 `frame-type` 可用于丢弃某种类型的数据包，但 `ingress-filtering` 可用于在数据包发出之前将其过滤掉。要完全理解入方向过滤的必要性，请考虑以下场景：**VLAN99** 在 **ether3** 和 **bridge1** 上被允许，但你仍然可以将 **VLAN99** 流量从 **ether1** 发送到 **ether3**。这是因为网桥 VLAN 表只在出方向端口上检查某个端口是否允许承载特定 VLAN。在我们的情况下，**ether3** 被允许承载 **VLAN99**，因此它会被转发。要防止这种情况，你**必须**使用 ingress-filtering。使用入方向过滤时，入方向数据包也会被检查。在我们的情况下，网桥 VLAN 表不包含允许 **VLAN99** 在 **ether1** 上的条目，因此该数据包会立即被丢弃。当然，在没有入方向过滤的场景中，连接无法建立，因为 **VLAN99** 只能从 **ether1** 转发到 **ether3**，而不能从 **ether3** 转发到 **ether1**，不过在这种错误配置下仍可能存在一些攻击（例如 ARP 欺骗）。下图说明了数据包丢弃行为：

![Trunk and Access Setup Ingress](/img/7749e7dc360a6532.webp)

使用和不使用入方向过滤的 Trunk/Access 端口设置。入方向过滤可以防止不需要的流量被转发。注意，在网桥 VLAN 表中，ether1 不被允许承载 VLAN99。

:::danger
只要可能，就始终尝试使用 `ingress-filtering`。它会增加一层显著的安全性。
:::

`ingress-filtering` 也可以用在 **CPU 端口**（网桥）上。这可用于防止一些可能的攻击向量，并限制可访问 CPU 的允许 VLAN。最好在入方向端口而不是出方向端口丢弃数据包。这会降低 CPU 负载，这在使用带网桥 VLAN 过滤的硬件卸载时非常关键。

:::warning
`ingress-filtering` 属性只影响入方向流量，而 `frame-type` 同时影响出方向和入方向流量。
:::

即使你可以限制端口上允许的 VLAN 和数据包类型，通过 Access 端口允许访问设备也从来都不是良好的安全实践，因为攻击者可以嗅探数据包并提取管理 VLAN 的 ID。你应只允许从 Trunk 端口（**ether1**）访问设备，因为 Trunk 端口通常具有更好的物理安全性。你应删除之前的条目，并允许通过连接到路由器的端口访问设备（如下图所示）：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,ether1 vlan-ids=99
```

![Basic VLAN Switching](/img/3d52e43430750024.webp)

## VLAN 隧道设置 {#vlan-tunnelling-setup}

---

在某些情况下，你可能希望通过某些交换机转发已经带有标签的流量。这对于骨干基础设施来说是一种相当常见的设置，因为它提供了一种可能性：将来自（例如）边缘路由器的流量封装起来，并无缝地通过骨干网转发到另一个边缘路由器。下面是一个 VLAN 隧道拓扑示例：

![Provider Bridge](/img/e772ab697f2fae91.webp)

提供商网桥拓扑

SVID 代表 Service VID，表示标签类型以及 VID。

:::warning
要完全理解如何正确配置 VLAN 隧道，你应先阅读 Trunk/Access 端口设置一节，然后再继续。
:::

有两种可行的方法：一种是标准化的 IEEE 802.1ad 方式，另一种是使用 **标签堆叠**。我们将先回顾标准化方式，因为两种方式适用相同的原则，使用另一种方法只需更改几个参数。VLAN 隧道的工作方式是：网桥检查外层 VLAN 标签是否使用与 ether-type 中指定的相同 VLAN 标签。如果 VLAN 标签匹配，则该数据包被视为带标签数据包；否则，它被视为不带标签数据包。

:::warning
网桥只检查外层标签（最靠近 MAC 地址的标签）；在网桥配置的任何位置都会忽略其他标签。网桥并不了解数据包内容；即使可能存在另一个 VLAN 标签，也只检查第一个 VLAN 标签。
:::

ether-type 属性允许你为 VLAN 标签选择以下 EtherType：

- 0x88a8 - IEEE 802.1ad，Service Tag。
- 0x8100 - IEEE 802.1Q，Customer VLAN（常规 VLAN 标签）。
- 0x9100 - 非官方标签类型（很少使用）。

要正确配置网桥 VLAN 过滤，你必须理解网桥如何区分带标签和不带标签数据包。如前所述，网桥会检查 EtherType 是否与数据包中的外层 VLAN 标签匹配。例如，考虑以下数据包：

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

假设我们设置了 **`ether-type=0x88a8`**，在这种情况下，上面的数据包将被视为不带标签，因为网桥在查找不同的 VLAN 标签。现在考虑以下数据包：

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

这次假设我们设置了 **`ether-type=0x8100`**。在这种情况下，上面的数据包也会被视为不带标签，因为外层标签使用的是 IEEE 802.1ad VLAN 标签。相同的原则适用于其他与 VLAN 相关的功能，例如，`PVID` 属性会在 Access 端口上添加新的 VLAN 标签，而该 VLAN 标签将使用 ether-type 中指定的 EtherType。

**SW1** 和 **SW2** 都使用相同的配置：

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

在此示例中，我们假设所有路由器都在传递使用常规/客户 VLAN 标签的流量。基于上述原则，交换机上的此类流量将被视为不带标签流量。交换机会使用 Service VLAN 标签（外层 802.1ad 标签）封装此流量，而 **SW1** 和 **SW2** 之间的流量将被视为带标签。在流量到达目的地之前，交换机会解封装外层标签，并转发原始的 802.1Q 带标签帧。请参见下面的数据包示例：

![Service VLAN 802.1ad](/img/b77a2f1f9e4171e9.webp)802.1ad VLAN 封装前后的数据包示例

:::warning
适用于使用 IEEE 802.1Q 的常规 Trunk/Access 端口设置的所有原则也适用于 VLAN 隧道设置。请确保你使用网桥 VLAN 表和入方向过滤正确限制 VLAN 和数据包类型。
:::

如果你希望从（比如说）**ether3** 到设备创建管理访问，并希望使用 **VLAN99**，那么你会使用如下命令：

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,ether3 vlan-ids=99
/interface/vlan
add interface=bridge1 name=VLAN99 use-service-tag=yes vlan-id=99
/ip/address
add address=192.168.99.2/24 interface=VLAN99
```

你可能注意到，唯一的区别是 VLAN 接口使用了 `use-service-tag=yes`；这会将 VLAN 接口设置为监听 IEEE 802.1ad VLAN 标签。这将要求你使用 IEEE 802.1ad VLAN 标签来通过管理 VLAN 访问设备——在启用网桥 VLAN 过滤时，你将无法使用常规 VLAN 标签连接到设备。ether-type 是全局设置的，会影响所有网桥 VLAN 过滤功能。

:::danger
配备 Marvell-98DX3257 交换机芯片的设备（例如 CRS354 系列）不支持在 1Gbps 以太网接口上对其他 VLAN 类型（`0x88a8` 和 `0x9100`）进行 VLAN 过滤。
:::

### 标签堆叠 {#tag-stacking}

在 VLAN 隧道设置中，我们添加的是不同于原 VLAN 标签的新 VLAN 标签，但实际上可以不顾数据包内容而添加新的 VLAN 标签。与常规 VLAN 隧道设置的区别在于，网桥不检查数据包是带标签还是不带标签；它假设在特定端口上接收到的所有数据包都是不带标签数据包，并且无论是否存在 VLAN 标签都会添加新的 VLAN 标签。这称为 **标签堆叠**，因为它会将 VLAN 标签“堆叠”在前一个标签之上，而不考虑 VLAN 标签类型。对于不支持 IEEE 802.1ad 标准但仍希望将 VLAN 流量封装到新 VLAN 中的网络来说，这是一种非常常见的设置。

将要添加的 VLAN 标签取决于 `ether-type` 和 `PVID`。例如，如果你在某个端口上设置了 `ether-type=0x8100` 和 `PVID=200`，那么网桥会在任何其他标签（如果存在）之上添加一个新的 IEEE 802.1Q VLAN 标签。相同的 VLAN 过滤原则仍然适用。你必须确定哪些端口将成为你的 Trunk 端口并将它们标记为带标签端口，确定你的 Access 端口并将它们添加为不带标签端口。

为了解释标签堆叠下 VLAN 打标签和移除标签如何工作，我们使用与之前相同的网络拓扑：

![Basic VLAN Switching 2](/img/02a6439c12aa7838.webp)

我们想要实现的是：无论 **ether2** 和 **ether3** 上接收到什么，都会添加一个新的 VLAN 标签，以封装来自这些端口的流量。`Tag-stacking` 会强制添加新的 VLAN 标签，因此我们可以使用此属性来实现所需的设置。我们将使用与 Trunk/Access 端口设置相同的配置，但在 Access 端口上启用 `tag-stacking`：

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
添加的 VLAN 标签将使用指定的 `ether-type`。选定的 EtherType 也将用于 VLAN 过滤。只检查外层标签，但在启用标签堆叠的情况下，会跳过标签检查，并假定无论如何都必须添加新标签。
:::

假设 **ether2** 和 **ether3** 后面的设备正在发送带标签的 **VLAN40** 流量。使用此配置，**所有**数据包都会被新的 VLAN 标签封装，但你必须确保已将外层标签中的 VLAN ID 添加到网桥 VLAN 表。**VLAN40** 不会添加到网桥 VLAN 表，因为它是内层标签且不会被检查；我们只关心外层标签，根据端口不同，它要么是 **VLAN20**，要么是 **VLAN30**。

与其他设置类似，网桥 VLAN 表将用于确定是否需要移除 VLAN 标签。例如，当 **ether1** 接收到带标签的 **VLAN20** 数据包时，网桥会检查 **ether2** 是否被允许承载 **VLAN20**，因此它准备通过 **ether2** 将其发出，但它还会检查网桥 VLAN 表以确定是否应移除 VLAN 标签；由于 **ether2** 被标记为不带标签端口，网桥会将这些数据包从 **ether1** 转发到 **ether2**，并移除 **VLAN20** VLAN 标签。

从 Access 端口的角度来看，适用与 Trunk/Access 端口设置相同的原则。在 **ether2** 上接收到的所有数据包都会获得带有 PVID 中指定 VLAN ID 的新 VLAN 标签；在这种情况下，将添加带有 **VLAN20** 的新 VLAN 标签，并且此 VLAN 将受到 VLAN 过滤的约束。请参见下面的数据包示例：

![Tag Stacking](/img/ef2698e5bd946e5c.webp)

标签堆叠前后的数据包示例
