---
sidebar_key: "bridging-and-switching/user-guides/controller-bridge-and-port-extender"
sidebar_position: 4
title: "控制器桥接与端口扩展器"
sidebar_label: "控制器桥接与端口扩展器"
description: "RouterOS 中的 Controller Bridge (CB) 和 Port Extender (PE) 可为 CRS3xx 交换机实现具有简化管理的扩展网络拓扑，允许通过级联/上游进行虚拟端口扩展和集中控制……"
tags:
  - 'controller-bridge'
  - 'port-extender'
  - 'vlan'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/user-guides/controller-bridge-and-port-extender
captured_at: '2026-11-07T17:11:03.548Z'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::danger
该功能自 v7.18 起已从 RouterOS 中移除。
:::

---

Controller Bridge (CB) 和 Port Extender (PE) 是 RouterOS 中针对 CRS3xx 系列交换机的 IEEE 802.1BR 标准实现。它允许通过 PE 设备虚拟扩展 CB 端口，并从单个控制设备管理这些扩展接口。此类配置提供了简化的网络拓扑、灵活性、更高的端口密度以及更简便的管理。Controller Bridge 和 Port Extender 拓扑示例如下。

![CB Summary](/img/2e226d34e405eb3e.webp)

Controller Bridge 通过**级联端口**与 Port Extender 建立通信。同样，Port Extender 仅通过**上游端口**与 Controller Bridge 通信。在 PE 设备上，必须配置控制端口，并且只有一个端口（最靠近 CB 的端口）充当上游端口。其他控制端口可以作为上游端口的备份，甚至可以作为串联连接交换机的级联端口（例如上图中的 Port Extender 2 和 3）。级联端口和上游端口用于发送和接收控制流量与网络流量。**扩展端口**是由 CB 设备控制的接口，通常连接到终端主机。扩展端口仅发送和接收网络流量。

请参见下表中各交换机型号支持的功能。

| **型号** | **Controller Bridge** | Port Extender |
| :-- | :-- | :-- |
| netPower 15FR (CRS318-1Fi-15Fr-2S) | **-** | **+** |
| netPower 16P (CRS318-16P-2S+) | **-** | **+** |
| CRS310-1G-5S-4S+ (netFiber 9/IN) | **-** | **+** |
| CRS326-24G-2S+ (RM/IN) | **-** | **+** |
| CRS328-24P-4S+ | **-** | **+** |
| CRS328-4C-20S-4S+ | **-** | **+** |
| CRS305-1G-4S+ | **-** | **+** |
| CRS309-1G-8S+ | **+** | **+** |
| CRS317-1G-16S+ | **+** | **+** |
| CRS312-4C+8XG | **+** | **+** |
| CRS326-24S+2Q+ | **+** | **+** |
| CRS354-48G-4S+2Q+ | **+** | **+** |
| CRS354-48P-4S+2Q+ | **+** | **+** |

### 限制 {#limitations}

尽管控制器允许配置 Port Extender 接口，但某些桥接和交换功能无法使用或无法正常工作。以下是 Controller Bridge 和 Port Extender 最常见的限制。该列表可能会随着后续 RouterOS 版本而变化。

| 功能 | 支持 |
| :-- | :-- |
| 用于级联和上游端口的 Bonding | + |
| 网桥 VLAN 过滤 | + |
| 用于扩展端口的 Bonding | - |
| Dot1x 认证器（服务器） | - |
| 入方向和出方向速率 | - |
| 镜像 | - |
| 端口入方向 VLAN 过滤 | - |
| 端口隔离 | - |
| 风暴控制 | - |
| 交换规则（ACL） | - |
| L3HW 卸载 | - |
| MLAG | - |

## 快速设置 {#quick-setup}

---

在本示例中，我们将创建一个 Controlling Bridge（例如 CRS317-1G-16S+ 交换机），它将通过 SFP+1 接口连接到单个 Port Extender（例如 CRS326-24G-2S+ 交换机）。

首先，在 CB 设备上配置一个启用了 VLAN 过滤的网桥：

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
```

在同一设备上，配置一个连接到 PE 设备并将充当级联端口的端口：

```ros
/interface/bridge/port-controller
set bridge=bridge1 cascade-ports=sfp-sfpplus1 switch=switch1
```

最后，在 PE 设备上，只需配置一个控制端口，该端口将被选为上游端口：

```ros
/interface/bridge/port-extender
set control-ports=sfp-sfpplus1 switch=switch1
```

一旦 PE 和 CB 设备连接，处于同一交换机组中的所有接口（控制端口除外）都将被扩展，并可在 CB 设备上进一步配置。CB 设备上将自动应用网桥端口配置，将所有扩展端口添加到单个网桥中。此配置之后可以修改。

:::warning
为了将某个端口排除在扩展之外（例如用于带外管理目的），还需配置 `excluded-ports` 属性。
:::

:::warning
请确保不要将 `cascade-ports` 和 `control-ports` 包含在任何路由或桥接配置中。这些端口仅建议用于 CB 和 PE 用途。
:::

## 发现和控制协议 {#discovery-and-control-protocols}

---

在扩展端口上进行帧转发之前，Controlling Bridge 和 Port Extender 必须相互发现并交换必要信息。

启用 CB 和 PE 的设备使用带有特定 Port Extension TLV 的邻居发现协议 LLDP。这允许 CB 和 PE 设备在级联端口和控制端口上通告其支持。

:::warning
CB 和 PE 配置可以覆盖邻居发现设置，例如，如果某个级联端口未包含在邻居发现接口列表中，LLDP 消息仍会被发送。
:::

一旦 CB 和 PE 之间交换了 LLDP 消息，就会启动基于边缘控制协议（ECP）的控制和状态协议（CSP）。CSP 用于 CB 和 PE 之间，以施加控制并从关联的 PE 接收状态信息——它为扩展端口分配唯一 ID，控制数据路径设置（例如端口 VLAN 成员关系），并发送端口状态信息（例如接口统计信息、PoE-out 监控）。ECP 提供可靠且按序的帧传送（使用 EtherType 0x8940 编码）。

:::danger
当前的 CB 实现不支持任何故障转移技术。一旦 CB 设备变得不可用，PE 设备将丢失所有控制规则和数据转发规则。
:::

## 数据包流程 {#packet-flow}

---

为了更好地理解 Controlling Bridge 和 Port Extender 的基本原理，下面提供了数据包遍历过程：

1. 在扩展端口上接收到一个 L2 数据包。
2. Port Extender 使用 E-TAG 头（EtherType 0x893F）封装该数据包，并通过上游端口将其转发给 Controller Bridge。E-TAG 数据包包含有关 PE 源端口 ID 的信息。PE 设备不进行任何本地交换决策。
3. Controller Bridge 接收到 E-TAG 数据包，并确切知道是哪个扩展接口接收了它。然后，CB 在内部解封装该数据包，并通过常规交换决策（主机学习、目的地址查找、VLAN 过滤等）进行处理。
4. 一旦做出交换决策，CB 将再次使用 E-TAG 封装原始数据包，并通过级联端口发送给 Port Extender。
   1. 对于单目的地数据包（单播），CB 将在 E-TAG 中包含 PE 目的端口 ID，并通过正确的级联端口发送。
   2. 对于多目的地数据包（广播、组播或未知单播），CB 将在 E-TAG 中包含目标组标记和源端口 ID，并为每个级联端口发送单个数据包副本。
5. 一旦 PE 设备在上游端口上收到 E-TAG 数据包，PE 会将其解封装，并通过扩展端口发送原始 L2 数据包。
   1. 对于单目的地数据包（单播），PE 将仅把数据包发送到正确的扩展端口。
   2. 对于多目的地数据包（广播、组播或未知单播），PE 将为每个扩展端口发送单个数据包副本（接收该数据包的源端口除外）。

|  |  |
| :-- | :-- |
| ![CB 单播 3](/img/0b036b8c3624374c.webp)<br/> |  |

![CB Broadcast 2](/img/c463f4757394bb7b.webp) 

## Controller Bridge 设置和监控 {#controller-bridge-settings-and-monitoring}

---

本节介绍 Controller Bridge 的设置和监控选项。

**子菜单：** `/interface/bridge/port-controller`

| 属性 | 描述 |
| :-- | :-- |
| **bridge** (*name;*Default: **none**) | 将在其中扩展端口的网桥接口。仅当指定了 `bridge` 和 `switch` 属性时，CB 才会启用；否则将处于禁用状态。 |
| **cascade-ports** (*interfaces;* Default: **none**) | 将充当级联端口的接口。也支持使用 802.3ad 或 balance-xor `mode` 的 bonding 接口。 |
| **switch** (*name;*Default: **none**) | 将充当 CB 并确保控制流量和网络流量的交换机。仅当指定了 `bridge` 和 `switch` 属性时，CB 才会启用；否则将处于禁用状态。 |

在配置并连接 CB 和 PE 设备后，每个 PE 设备将自动显示在设备菜单中。使用 `print` 和 `monitor` 命令查看更多详细信息。

```ros
[admin@Controller] > /interface/bridge/port-controller/device/print
Flags: I - inactive 
 0   name="pe1" pe-mac=64:D1:54:EB:AE:BC descr="MikroTik RouterOS 6.48beta35 (testing) CRS328-24P-4S+" control-ports=pe1-sfpplus1,pe1-sfpplus2 

 1   name="pe2" pe-mac=64:D1:54:C7:3A:58 descr="MikroTik RouterOS 6.48beta35 (testing) CRS326-24G-2S+" control-ports=pe2-sfpplus1
[admin@Controller] > /interface/bridge/port-controller/device/monitor pe2
                 name: pe2
               status: active
  connected-via-ports: sfp-sfpplus1==pe1-sfpplus1,pe1-sfpplus2==pe2-sfpplus1
   connected-via-devs: controller,pe1
```

**子菜单：** `/interface/bridge/port-controller/device`

| 属性 | 描述 |
| :-- | :-- |
| **connected-via-devs** (*name*) | 显示从 PE 到 CB 路径上已连接的设备。 |
| **connected-via-ports** (*name*) | 显示从 PE 到 CB 的连接路径。 |
| **control-ports** (*interfaces*) | PE 设备控制端口。 |
| **descr** (*name*) | 简短的 PE 设备描述。 |
| **name** (*name*) | 自动分配的 PE 设备名称。 |
| **pe-mac** (*MAC address*) | PE 设备 MAC 地址。 |
| **status** (*active \| inactive*) | PE 设备状态。 |

此外，每个 PE 设备接口都可以在端口菜单中监控。使用 `print` 和 `monitor` 命令查看更多详细信息。

```ros
[admin@Controller] > /interface/bridge/port-controller/port/print where !disabled
Flags: I - inactive, X - disabled, R - running, U - upstream-port, C - cascade-port 
 #    NAME                                   DEVICE
 0 I  pe1-ether1                             pe1
 1 R  pe1-ether2                             pe1
 2 R  pe1-ether3                             pe1
 3 R  pe1-ether4                             pe1
 4  U pe1-sfpplus1                           pe1
 5 RC pe1-sfpplus2                           pe1
 6 I  pe2-ether1                             pe2
 7 R  pe2-ether2                             pe2
 8 R  pe2-ether3                             pe2
 9 R  pe2-ether4                             pe2
10  U pe2-sfpplus1                           pe2
[admin@Controller] > /interface/bridge/port-controller/port/monitor [find where !disabled]
           name: pe1-ether1 pe1-ether2 pe1-ether3 pe1-ether4 pe1-sfpplus1 pe1-sfpplus2 pe2-ether1 pe2-ether2 pe2-ether3 pe2-ether4 pe2-sfpplus1
         status: unknown    link-ok    link-ok    link-ok    no-link      link-ok      unknown    link-ok    link-ok    link-ok    no-link
           rate:            1Gbps      1Gbps      1Gbps      10Gbps       10Gbps                  1Gbps      1Gbps      1Gbps      10Gbps
    port-status: not-added  ok         ok         ok         ok           ok           not-added  ok         ok         ok         ok
           pcid:            457        458        459        480          481                     509        510        511        532
```

**子菜单：** `/interface/bridge/port-controller/port`

| 属性 | 描述 |
| :-- | :-- |
| **device** (*name*) | 自动分配的 PE 设备名称。 |
| **name** (*name*) | 自动分配的 PE 端口名称。 |
| **pcid** (*integer*) | 自动分配的端口标识符。 |
| **port-status** (*dev-inactive \| not-added \| ok*) | PE 端口状态。 |
| **rate** (*bps*) | 连接的数据速率。 |
| **status** (*link-ok \| no-link \| unknown*) | PE 端口链路状态。 |

Controller Bridge 可以在端口 PoE 菜单中监控来自 Port Extender 的 PoE-out 相关信息。使用 `print` 和 `monitor` 命令查看更多详细信息。有关 PoE-out 的更多信息，请访问 [PoE-out 手册](../../hardware/poe-out.md)。

```ros
[admin@Controller] > /interface/bridge/port-controller/port/poe/print
 # NAME                                    DEVICE
 0 pe1-ether1                              pe1
 1 pe1-ether2                              pe1
 2 pe1-ether3                              pe1
 3 pe1-ether4                              pe1
 4 pe1-ether5                              pe1
 5 pe1-ether6                              pe1
 6 pe1-ether7                              pe1
...
[admin@Controller] > /interface/bridge/port-controller/port/poe/monitor pe1-ether2,pe1-ether3
               name: pe1-ether2 pe1-ether3
     poe-out-status: powered-on powered-on
    poe-out-voltage: 52.8V      52.9V
    poe-out-current: 123mA      95mA
      poe-out-power: 6.4W       5W
```

## Port Extender 设置 {#port-extender-settings}

---

本节介绍 Port Extender 设置。

**子菜单：** `/interface/bridge/port-extender`

| 属性 | 描述 |
| :-- | :-- |
| **control-ports** (*interfaces;* Default: **none**) | 将连接到 CB（上游端口）或以串联方式连接其他 PE 设备（级联端口）的接口。也支持使用 802.3ad 或 balance-xor `mode` 的 bonding 接口。 |
| **excluded-ports** (*interfaces;* Default: **none**) | 将不被扩展的接口。 |
| **switch** (*name;*Default: **none**) | 将充当扩展器并确保控制流量和网络流量的交换机。仅当指定此属性时，PE 才会启用；否则将处于禁用状态。 |

## 配置示例 {#configuration-examples}

---

下面描述了最常见的配置示例。要使 CB 和 PE 配置正常工作，需要启用网桥 VLAN 过滤，因此请务必先理解过滤原理——[网桥 VLAN 过滤](../index.md#bridge-vlan-filtering)、[网桥 VLAN 表](./bridge-vlan-table.md)。

### 基本 CB 和 PE 配置 {#basic-cb-and-pe-configuration}

在本示例中，CRS317-1G-16S+ 设备用作 Controller Bridge，CRS328-24P-4S+ 用作 Port Extender；请参见下面的连接示意图。

![Basic CB PE Configuration](/img/0b58575d7d9204a3.webp)

首先，配置 CB 设备。这可以通过添加一个启用了 VLAN 过滤的网桥接口来完成。此外，将任意本地接口添加到同一网桥中，这样可以在此类本地接口和扩展接口之间转发流量。在本示例中，添加了 sfp-sfpplus2 接口。

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus2
```

要启用 CB，请指定 bridge、switch 以及至少一个级联端口。确保级联端口未包含在网桥或路由配置中。建议这些端口仅用于 CB 和 PE。

```ros
/interface/bridge/port-controller
set bridge=bridge1 cascade-ports=sfp-sfpplus1 switch=switch1
```

要启用 PE，请配置控制端口和 switch。此外，使用 `excluded-ports` 属性配置一个或多个不应被扩展的接口（例如用于带外管理目的）。在本示例中，所有交换机端口都将被扩展。

```ros
/interface/bridge/port-extender
set control-ports=sfp-sfpplus4 switch=switch1
```

一旦 PE 和 CB 设备完成发现并启动控制和状态协议（CSP），RouterOS 将永久创建新接口并将其添加到 CB 设备上的网桥中。接口以自动分配的 PE 设备名称加上默认接口名称命名。这些接口名称之后可以修改。请注意，控制端口和排除端口也会显示在接口列表中，但它们不包含在网桥中。

```ros
[admin@Controller_Bridge] > /interface/print where name~"pe"
Flags: D - dynamic, X - disabled, R - running, S - slave 
 #     NAME                                TYPE       ACTUAL-MTU L2MTU  MAX-L2MTU
 0  RS pe1-ether1                          extport          1500  1584
 1  RS pe1-ether2                          extport          1500  1584
 2  RS pe1-ether3                          extport          1500  1584
 3   S pe1-ether4                          extport          1500  1584
 4   S pe1-ether5                          extport          1500  1584
 5   S pe1-ether6                          extport          1500  1584
 6   S pe1-ether7                          extport          1500  1584
 7   S pe1-ether8                          extport          1500  1584
 8   S pe1-ether9                          extport          1500  1584
 9   S pe1-ether10                         extport          1500  1584
10   S pe1-ether11                         extport          1500  1584
11   S pe1-ether12                         extport          1500  1584
12   S pe1-ether13                         extport          1500  1584
13   S pe1-ether14                         extport          1500  1584
14   S pe1-ether15                         extport          1500  1584
15   S pe1-ether16                         extport          1500  1584
16   S pe1-ether17                         extport          1500  1584
17   S pe1-ether18                         extport          1500  1584
18   S pe1-ether19                         extport          1500  1584
19   S pe1-ether20                         extport          1500  1584
20   S pe1-ether21                         extport          1500  1584
21   S pe1-ether22                         extport          1500  1584
22   S pe1-ether23                         extport          1500  1584
23   S pe1-ether24                         extport          1500  1584
24  RS pe1-sfpplus1                        extport          1500  1584
25  RS pe1-sfpplus2                        extport          1500  1584
26  RS pe1-sfpplus3                        extport          1500  1584
27     pe1-sfpplus4                        extport          1500  1584
[admin@Controller_Bridge] > interface bridge port print 
Flags: X - disabled, I - inactive, D - dynamic, H - hw-offload 
 #     INTERFACE              BRIDGE             HW  PVID PRIORITY  PATH-COST INTERNAL-PATH-COST    HORIZON
 0   H sfp-sfpplus2           bridge1            yes    1     0x80         10                 10       none
 1   H pe1-ether1             bridge1            yes    1     0x80         10                 10       none
 2   H pe1-ether2             bridge1            yes    1     0x80         10                 10       none
 3   H pe1-ether3             bridge1            yes    1     0x80         10                 10       none
 4 I H pe1-ether4             bridge1            yes    1     0x80         10                 10       none
 5 I H pe1-ether5             bridge1            yes    1     0x80         10                 10       none
 6 I H pe1-ether6             bridge1            yes    1     0x80         10                 10       none
 7 I H pe1-ether7             bridge1            yes    1     0x80         10                 10       none
 8 I H pe1-ether8             bridge1            yes    1     0x80         10                 10       none
 9 I H pe1-ether9             bridge1            yes    1     0x80         10                 10       none
10 I H pe1-ether10            bridge1            yes    1     0x80         10                 10       none
11 I H pe1-ether11            bridge1            yes    1     0x80         10                 10       none
12 I H pe1-ether12            bridge1            yes    1     0x80         10                 10       none
13 I H pe1-ether13            bridge1            yes    1     0x80         10                 10       none
14 I H pe1-ether14            bridge1            yes    1     0x80         10                 10       none
15 I H pe1-ether15            bridge1            yes    1     0x80         10                 10       none
16 I H pe1-ether16            bridge1            yes    1     0x80         10                 10       none
17 I H pe1-ether17            bridge1            yes    1     0x80         10                 10       none
18 I H pe1-ether18            bridge1            yes    1     0x80         10                 10       none
19 I H pe1-ether19            bridge1            yes    1     0x80         10                 10       none
20 I H pe1-ether20            bridge1            yes    1     0x80         10                 10       none
21 I H pe1-ether21            bridge1            yes    1     0x80         10                 10       none
22 I H pe1-ether22            bridge1            yes    1     0x80         10                 10       none
23 I H pe1-ether23            bridge1            yes    1     0x80         10                 10       none
24 I H pe1-ether24            bridge1            yes    1     0x80         10                 10       none
25   H pe1-sfpplus1           bridge1            yes    1     0x80         10                 10       none
26   H pe1-sfpplus2           bridge1            yes    1     0x80         10                 10       none
27   H pe1-sfpplus3           bridge1            yes    1     0x80         10                 10       none
```

现在，CRS317-1G-16S+ 设备已使用 CRS328-24P-4S+ 设备扩展了其端口，并且可以在所有桥接端口之间进行数据包转发。

### Trunk 和 Access 端口 {#trunk-and-access-ports}

在本示例中，将在 Controller Bridge 设备上创建 untagged（access）和 tagged（trunk）端口配置。请参见下面的网络图。

![CB PE VLANs](/img/6a112aa3a790d572.webp)First, configure the CB and PE devices. The configuration is identical to the previous example. Use this configuration for the CB device.

```ros
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus2
/interface/bridge/port-controller
set bridge=bridge1 cascade-ports=sfp-sfpplus1 switch=switch1
```

将此配置用于 PE 设备。

```ros
/interface/bridge/port-extender
set control-ports=sfp-sfpplus4 switch=switch1
```

在扩展端口成功创建并添加到 CB 设备上的网桥后，我们可以开始配置与 VLAN 相关的属性。首先，使用 `pvid` 属性将 access 端口配置到各自的 VLAN ID。在 `/interface/bridge/port` 菜单中使用 `print` 命令找出确切的接口名称。

```ros
/interface/bridge/port
set [find interface=pe1-ether1] pvid=10
set [find interface=pe1-ether2] pvid=20
set [find interface=pe1-ether3] pvid=30
```

然后添加网桥 VLAN 条目，并指定 tagged、untagged 端口。请注意，有两个 tagged 端口——名为 sfp-sfpplus2 的本地端口和名为 pe1-sfpplus1 的扩展端口。

```ros
/interface/bridge/vlan
add bridge=bridge1 tagged=pe1-sfpplus1,sfp-sfpplus2 untagged=pe1-ether1 vlan-ids=10
add bridge=bridge1 tagged=pe1-sfpplus1,sfp-sfpplus2 untagged=pe1-ether2 vlan-ids=20
add bridge=bridge1 tagged=pe1-sfpplus1,sfp-sfpplus2 untagged=pe1-ether3 vlan-ids=30
```

此时 VLAN 已配置，设备应能够通过这些端口通信。但是，建议更进一步，应用一些额外的过滤选项。在本地网桥端口上启用端口 `ingress-filtering`，并使用 `frame-types` 设置基于数据包类型进行帧过滤。

```ros
/interface/bridge/port
set [find interface=pe1-ether1] frame-types=admit-only-untagged-and-priority-tagged
set [find interface=pe1-ether2] frame-types=admit-only-untagged-and-priority-tagged
set [find interface=pe1-ether3] frame-types=admit-only-untagged-and-priority-tagged
set [find interface=pe1-sfpplus1] frame-types=admit-only-vlan-tagged
set [find interface=sfp-sfpplus2] frame-types=admit-only-vlan-tagged ingress-filtering=yes
```

:::warning
扩展端口不支持端口入口 VLAN 过滤。
:::

### 级联多个 Port Extender 并使用 bonding 接口 {#cascading-multiple-port-extenders-and-using-bonding-interface}

在本示例中，两个 PE 设备（CRS328-24P-4S+ 和 CRS326-24G-2S+）将添加到 CB（CRS317-1G-16S+）。为了提高上游端口和级联端口的吞吐量，将创建 [bonding 接口](../../high-availability-solutions/bonding.md)。请参见下面的网络图。

![Bonding Cascade](/img/79872d18d20c4e0b.webp)

CB 和 PE 配置与第一个示例类似，主要区别是 bonding 接口的使用。首先，配置 CB 设备——为级联端口创建 bonding 接口，创建网桥并添加任何所需的本地网桥端口，最后启用 CB。使用以下命令：

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=sfp-sfpplus1,sfp-sfpplus2
/interface/bridge
add name=bridge1 vlan-filtering=yes
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus3
/interface/bridge/port-controller
set bridge=bridge1 cascade-ports=bond1 switch=switch1
```

然后配置 Port Extender 1 设备。此设备需要两个 bonding 接口——第一个将用作上游端口，第二个将用作 Port Extender 2 设备的级联端口。此外，使用 `excluded-ports` 属性配置一个或多个不应被扩展的接口（例如用于带外管理目的）。在本示例中，所有交换机端口都将被扩展。

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=sfp-sfpplus1,sfp-sfpplus2
add mode=802.3ad name=bond2 slaves=sfp-sfpplus3,sfp-sfpplus4
/interface/bridge/port-extender
set control-ports=bond1,bond2 switch=switch1
```

最后，配置 Port Extender 2 设备——创建 bonding 接口并启用 PE。如有必要，另外配置一个或多个 `excluded-ports`。在本示例中，所有交换机端口都将被扩展。

```ros
/interface/bonding
add mode=802.3ad name=bond1 slaves=sfp-sfpplus1,sfp-sfpplus2
/interface/bridge/port-extender
set control-ports=bond1 switch=switch1
```

现在，CRS317-1G-16S+ 设备已扩展出其端口，增加了 48 个千兆以太网端口，并且可以在所有桥接端口之间实现数据包转发。

在设备菜单中使用 `monitor` 命令查看 PE 设备连接路径。另外，在端口菜单中使用 `print` 命令查看哪些 PE 接口用作上游端口和级联端口。

```ros
[admin@Controller_Bridge] > /interface/bridge/port-controller/device/monitor [find]
                   name: pe1                    pe2
                 status: active                 active
    connected-via-ports: bond1==pe1-cntrl-bond1 bond1==pe1-cntrl-bond1
                                                pe1-cntrl-bond2==pe2-cntrl-bond1
     connected-via-devs: controller             controller
                                                pe1
[admin@Controller_Bridge] > /interface/bridge/port-controller/port/print where running or upstream-port 
Flags: I - inactive, X - disabled, R - running, U - upstream-port, C - cascade-port 
 #    NAME                                                  DEVICE                                                 
 0 R  pe1-ether2                                            pe1                                                    
 1 R  pe1-ether3                                            pe1                                                    
 2 R  pe1-ether4                                            pe1                                                    
 3  U pe1-sfpplus1                                          pe1                                                    
 4  U pe1-sfpplus2                                          pe1                                                    
 5 RC pe1-sfpplus3                                          pe1                                                    
 6 RC pe1-sfpplus4                                          pe1                                                    
 7 R  pe2-ether1                                            pe2                                                    
 8 R  pe2-ether2                                            pe2                                                    
 9 R  pe2-ether3                                            pe2                                                    
10 R  pe2-ether4                                            pe2                                                    
11  U pe2-sfpplus1                                          pe2                                                    
12  U pe2-sfpplus2                                          pe2                                                    
```

### 配置修改和移除 {#configuration-modification-and-removal}

在某些情况下，需要调整（例如 PE 设备需要新的控制端口）或完全移除 CB 和 PE 设备配置。要修改 PE 设备配置，应首先从 CB 设备移除所有相关的 PE 设备配置。只有这样才能应用新配置。

首先，要从 CB 移除 PE 配置，请使用以下命令禁用 PE：

```ros
/interface/bridge/port-extender/set switch=none control-ports="" excluded-ports=""
```

然后，在 CB 设备上移除相关的网桥以及其他使用过 PE 接口的 RouterOS 配置（例如，查看 `/interface/bridge/port` 和 `/interface/bridge/vlan` 菜单中的 export）。例如，要移除特定 PE 设备的所有网桥端口，请使用以下命令：

```ros
/interface/bridge/port/remove [find interface~"pe1"]
```

配置移除后，可以从 CB 设备列表中移除 PE。此命令还会自动从 CB 接口列表中移除所有 PE 设备接口。如果 CB 上仍应用了某些 PE 接口配置，则该配置将不再有效。使用 `print` 命令找出 PE 设备名称。

```ros
/interface/bridge/port-controller/device/remove [find name=pe1]
```
