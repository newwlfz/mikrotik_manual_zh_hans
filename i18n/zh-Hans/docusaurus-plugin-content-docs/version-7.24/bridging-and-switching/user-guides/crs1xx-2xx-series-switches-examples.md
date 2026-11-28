---
title: "CRS1xx/2xx 系列交换机示例"
description: "本页提供 CRS1xx/2xx 系列交换机上 Cloud Router Switch 功能的配置示例和使用场景，涵盖端口交换、通过 VLAN 过滤设置管理访问，以及基于 IP 访问的安全注意事项。"
tags:
  - 'vlan'
  - 'bridge-hardware-offloading'
  - 'management-access'
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/user-guides/crs1xx-2xx-series-switches-examples
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

---

Cloud Router Switch 功能的基本使用场景和配置示例。

:::info
本文适用于 CRS1xx 和 CRS2xx 系列交换机，不适用于 [MikroTik devices with Marvell Prestera switch](/docs/bridging-and-switching/marvell-prestera-switch-chip-features)（例如 CRS3xx 系列交换机）。
:::

## 端口交换 {#port-switching}

---

要在 CRS1xx/2xx 系列交换机上设置端口交换，请参阅 [Bridge Hardware Offloading](/docs/bridging-and-switching#bridge-hardware-offloading) 页面。

:::danger
可以通过使用多个启用了硬件卸载的网桥来创建多个隔离的交换组；此功能仅在 CRS1xx/2xx 系列交换机上可用。对于更复杂的设置（例如 VLAN 过滤），应改用端口隔离功能。
:::

## 管理访问配置 {#management-access-configuration}

---

通常，交换机只应通过内置交换芯片转发数据包，而出于安全原因，不应允许访问设备本身。可以使用设备的串口进行管理访问，但在大多数情况下，不希望采用这种访问方式，使用 IP 地址访问更合适。在这种情况下，需要配置管理访问。

在所有类型的管理访问中，都假定端口必须交换在一起。使用以下命令将所需端口交换在一起：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether3 hw=yes
add bridge=bridge1 interface=ether4 hw=yes
add bridge=bridge1 interface=ether5 hw=yes
```

还应为网桥接口分配 IP 地址，以便通过 IP 地址访问设备（也可以通过 MAC 地址访问设备）：

```ros
/ip/address
add address=192.168.88.1/24 interface=bridge1
```

### Untagged

如果未启用 invalid VLAN filtering，则已允许从任何端口使用带标签或未带标签（**VLAN 0**）流量访问设备进行管理，但这并不是良好做法；这可能导致安全问题，并在某些情况下导致设备 CPU 过载（最常见的是广播类流量）。

如果打算使用 invalid VLAN filtering（建议这样做），则必须将用于访问交换机的端口添加到 VLAN 表中，以允许未带标签（**VLAN 0**）流量，例如，如果希望通过 **ether2** 访问交换机：

```ros
/interface/ethernet/switch/vlan
add vlan-id=0 ports=ether2,switch1-cpu  
```

### Tagged

仅允许带标签流量通过特定端口访问设备进行管理是更好的做法。例如，要仅允许 **VLAN99** 通过 **ether2** 访问设备，应先在 VLAN 表中添加条目，允许所选端口和 CPU 端口（**switch1-cpu**）转发所选 VLAN ID，从而允许管理访问：

```ros
/interface/ethernet/switch/vlan
add ports=ether2,switch1-cpu vlan-id=99
```

从 CPU 发出的数据包（例如 ping 回复）不会带有 VLAN 标签。要解决此问题，需要指定哪些端口对于特定 VLAN ID 始终发送带 VLAN 标签的数据包：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether2,switch1-cpu vlan-id=99
```

完成有效的 VLAN99 配置后，可以启用 unknown/invalid VLAN filtering，这样将不允许通过 VLAN 表中指定端口以外的端口进行管理访问：

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether2,ether3,ether4,ether5
```

在本示例中，VLAN99 将用于访问设备。必须在网桥上创建 VLAN 接口，并为其分配 IP 地址。

```ros
/interface/vlan
add interface=bridge1 name=MGMT vlan-id=99
/ip/address
add address=192.168.99.1/24 interface=MGMT
```

## VLAN

---

:::danger 锁定风险
强烈建议在配置 VLAN 之前准备并测试好 Serial Console 线缆。配置错误很容易导致无法通过 CPU 或所连接端口访问设备。
:::

:::tip 排查已缓存的 MAC 地址
由于已学习到的 MAC 地址，某些更改可能看起来有延迟。如果更改后流量未按预期转发，请刷新 Unicast Forwarding Database：
`/interface/ethernet/switch/unicast-fdb/flush`
:::

:::info 架构最佳实践
使用多个硬件卸载网桥是快速实现简单端口隔离的方法，但会限制 CRS 交换芯片上的高级 VLAN 功能。对于高级配置，请为所有端口使用**单个网桥**，配置 VLAN，并使用端口隔离配置文件隔离端口组。
:::

### 基于端口的 VLAN {#port-based-vlan}

:::warning
对于 CRS3xx 系列设备，必须使用网桥 VLAN 过滤；详情请参阅 [Bridge VLAN Filtering](/docs/bridging-and-switching#bridge-vlan-filtering) 章节。
:::

#### 示例 1（Trunk 和 Access 端口） {#example-1-trunk-and-access-ports}

![Access Ports](/img/dcbdce357964f958.webp)

将所需端口交换在一起：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

指定交换机必须为每个 access 端口的未标记（VLAN0）流量设置的 VLAN ID：

```ros
/interface/ethernet/switch/ingress-vlan-translation
add ports=ether6 customer-vid=0 new-customer-vid=200
add ports=ether7 customer-vid=0 new-customer-vid=300
add ports=ether8 customer-vid=0 new-customer-vid=400
```

:::warning
在 `/interface/ethernet/switch/ingress-vlan-translation` 下创建条目时，交换芯片会在指定端口的入站帧上添加 VLAN 标签。要在同一端口上为出站帧移除 VLAN 标签，应为同一 VLAN ID 创建 `/interface/ethernet/switch/egress-vlan-tag` 条目，并且仅指定 tagged 端口。如果某个 VLAN 仅在 access 端口之间转发，仍应创建不带任何 tagged 端口的 `/interface/ethernet/switch/egress-vlan-tag` 条目。另一种选择是在 `/interface/ethernet/switch/egress-vlan-translation` 菜单下创建额外条目，以设置未标记（VLAN0）流量。
:::

还必须指定哪些 VLAN 应带有 VLAN 标签发送到 trunk 端口。使用 `tagged-ports` 属性设置 trunk 端口：

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

配置有效的 VLAN 后，可以启用未知/无效 VLAN 过滤：

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether2,ether6,ether7,ether8
```

:::warning
可以同时使用内置交换芯片和 CPU 创建 Switch-Router 配置，其中设备同时充当交换机和路由器。
:::

#### 示例 2（Trunk 和 Hybrid 端口） {#example-2-trunk-and-hybrid-ports}

![Hybrid Ports](/img/90b987271e134d95.webp)

将所需端口交换在一起：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

指定交换机必须为每个 access 端口的未标记（VLAN0）流量设置的 VLAN ID：

```ros
/interface/ethernet/switch/ingress-vlan-translation
add ports=ether6 customer-vid=0 new-customer-vid=200
add ports=ether7 customer-vid=0 new-customer-vid=300
add ports=ether8 customer-vid=0 new-customer-vid=400
```

通过将端口指定为 `tagged-ports`，交换机将始终以带有相应 VLAN 标签的数据包发送数据包。根据上图添加相应条目：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether2,ether7,ether8 vlan-id=200
add tagged-ports=ether2,ether6,ether8 vlan-id=300
add tagged-ports=ether2,ether6,ether7 vlan-id=400
```

在 VLAN 表中添加条目，为每个端口和每个 VLAN ID 指定 VLAN 成员关系：

```ros
/interface/ethernet/switch/vlan
add ports=ether2,ether6,ether7,ether8 vlan-id=200 learn=yes
add ports=ether2,ether6,ether7,ether8 vlan-id=300 learn=yes
add ports=ether2,ether6,ether7,ether8 vlan-id=400 learn=yes
```

配置有效的 VLAN 后，可以启用未知/无效 VLAN 过滤：

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether2,ether6,ether7,ether8
```

### 基于协议的 VLAN {#protocol-based-vlan}

![Protocol Based VLAN](/img/279b50d6fabcdc21.webp)

将所需端口交换到一起：

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
在内部，MAC-based VLAN 中的所有 MAC 地址都会进行哈希运算。某些 MAC 地址可能具有相同的哈希值，如果该哈希值与已加载 MAC 地址的哈希值匹配，则会阻止该 MAC 地址加载到交换芯片中。因此，建议将 Port-based VLAN 与 MAC-based VLAN 结合使用。这是硬件限制。
:::

![MAC Based VLAN](/img/fb1b49b2f44e71a3.webp)

将所需端口加入 Switch：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether2 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
```

在 access 端口上启用 MAC-based VLAN 转换：

```ros
/interface/ethernet/switch/port
set ether7 allow-fdb-based-vlan-translate=yes
```

在 MAC-based VLAN 表中添加 MAC-to-VLAN 映射条目：

```ros
/interface/ethernet/switch/mac-based-vlan
add src-mac=A4:12:6D:77:94:43 new-customer-vid=200
add src-mac=84:37:62:DF:04:20 new-customer-vid=300
add src-mac=E7:16:34:A1:CD:18 new-customer-vid=400
```

在 ether2 端口上添加 VLAN200、VLAN300 和 VLAN400 的 tagging，以将其创建为 VLAN trunk 端口：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=ether2 vlan-id=200
add tagged-ports=ether2 vlan-id=300
add tagged-ports=ether2 vlan-id=400
```

此外，在 VLAN 表中添加条目，为每个端口指定 VLAN 成员关系，并启用 unknown/invalid VLAN 过滤，请参阅以下示例 - Unknown/Invalid VLAN filtering。对于向网桥添加更多接口的网络配置，这是必需的，因为它允许定义 VLAN 边界。

### InterVLAN 路由 {#intervlan-routing}

![VLAN Routing](/img/f659d62947a98802.webp)

InterVLAN 路由配置由两个主要部分组成：switch-chip 中的 VLAN tagging 和 RouterOS 中的路由。通过将其与 DHCP server、Hotspot、PPP 以及每个 VLAN 的其他功能结合使用，该配置可用于多种应用场景。

将所需端口交换到一起：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

为所有 VLAN 在 CPU 端口上设置 VLAN 标记，使数据包在路由前带有标记：

```ros
/interface/ethernet/switch/egress-vlan-tag
add tagged-ports=switch1-cpu vlan-id=200
add tagged-ports=switch1-cpu vlan-id=300
add tagged-ports=switch1-cpu vlan-id=400
```

添加 ingress VLAN 转换规则，以确保在 access 端口上完成正确的 VLAN ID 分配：

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
确保 VLAN 接口创建在网桥接口之上，而不是任何物理接口之上。如果 VLAN 接口创建在 slave 接口上，则可能无法正确接收数据包，因此路由可能失败。更多详细信息请参阅 [VLAN interface on a slave interface](/docs/bridging-and-switching/user-guides/layer2-misconfiguration#vlan-interface-on-a-slave-interface) 手册页。
:::

在已创建的 VLAN 接口上添加 IP 地址。在本示例中，将三个 192.168.x.1 地址添加到 VLAN200、VLAN300 和 VLAN400 接口：

```ros
/ip/address
add address=192.168.20.1/24 interface=VLAN200
add address=192.168.30.1/24 interface=VLAN300
add address=192.168.40.1/24 interface=VLAN400
```

### Unknown/Invalid VLAN 过滤 {#unknowninvalid-vlan-filtering}

VLAN 成员关系在 VLAN 表中定义。添加包含 VLAN ID 和端口的条目后，该 VLAN 流量在这些端口上即为有效。配置有效的 VLAN 后，可以启用 unknown/invalid VLAN 过滤。此 VLAN 过滤配置示例适用于 InterVLAN Routing 设置。

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
在启用未知/无效 VLAN 过滤的情况下，在单个交换芯片上使用多个网桥可能会导致意外行为。使用 VLAN 过滤时，应始终使用单个网桥配置。如果需要端口隔离，则应使用端口隔离功能，而不是使用多个网桥。
:::

### VLAN 隧道（Q-in-Q） {#vlan-tunneling-q-in-q}

本示例介绍一种典型的 VLAN 隧道用例：服务提供商设备在允许客户使用自身 VLAN 的同时，添加另一个 VLAN 标签用于独立转发。

:::warning
本示例仅包含 Service VLAN 标记部分。建议同时在端口上配置未知/无效 VLAN 过滤。
:::

![QinQ](/img/1f0680bc5266cc50.webp)

**CRS-1**：服务提供商网络边缘的第一台交换机必须正确识别端口上来自客户 VLAN ID 的流量，并通过 ingress VLAN 转换规则分配新的服务 VLAN ID。服务提供商 VLAN 标签的 VLAN trunk 端口配置位于同一个 `egress-vlan-tag` 表中。与基本的 Port-Based VLAN 配置的主要区别在于，必须将 CRS 交换芯片设置为根据服务（*outer*）VLAN ID 而不是客户（*inner*）VLAN ID 进行转发。

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

**CRS-2**：服务提供商网络中的第二台交换机只需让交换端口根据服务（*outer*）VLAN ID 而不是客户（*inner*）VLAN ID 进行转发。

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

- 使用网桥将端口加入一个交换机组。
- 使用 ingress VLAN translation 规则在端口上定义新的 service VLAN 分配。
- 使用 tagged-ports 作为服务提供商 VLAN trunk。
- 将 CRS 交换芯片设置为在交换查找中使用 service VLAN ID。

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

可以将 CRS1xx/CRS2xx 系列交换机用于 CVID Stacking 配置。CRS1xx/CRS2xx 系列交换机能够基于带有两个 CVID 标签（double CVID tag）的 tagged 数据包的外层标签进行 VLAN 过滤。这些交换机还能够在现有 CVID 标签之上添加另一个 CVID 标签（CVID Stacking）。例如，在某个配置中，**ether1** 接收带有 CVID 10 的 tagged 数据包，但要求 **ether2** 发送这些数据包时带有另一个 CVID 20 标签（VLAN10 位于 VLAN20 内），同时过滤掉其他所有 VLAN，则必须配置以下内容：

将 **ether1** 和 **ether2** 交换在一起：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether1 hw=yes
add bridge=bridge1 interface=ether2 hw=yes
```

设置交换机基于 service tag（0x88a8）过滤 VLAN：

```ros
/interface/ethernet/switch
set bridge-type=service-vid-used-as-lookup-vid
```

为 **ether1** 上带有 CVID 10 标签的数据包添加 service tag SVID 20：

```ros
/interface/ethernet/switch/ingress-vlan-translation
add customer-vid=10 new-service-vid=20 ports=ether1
```

将 **ether2** 指定为 SVID 20 的 tagged/trunk 端口：

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

启用未知或无效 VLAN 过滤：

```ros
/interface/ethernet/switch
set drop-if-invalid-or-src-port-not-member-of-vlan-on-ports=ether1,ether2
```

:::warning
由于交换机设置为基于 service tag 查找 VLAN ID，而该 service tag 被覆盖为不同的 EtherType，因此 VLAN 过滤仅对数据包的外层 tag 执行；不会检查内层 tag。
:::

## Mirroring

---

![Mirroring](/img/7c1963a9e5b62ba0.webp)

Cloud Router Switches 支持三种镜像类型。基于端口的镜像可应用于任何 switch-chip 端口，基于 VLAN 的镜像适用于所有指定的 VLAN，而不受 switch-chip 端口限制，基于 MAC 的镜像会复制从 Unicast Forwarding Database 中配置端口可达的特定设备发送或接收的流量。

### 基于端口的镜像 {#port-based-mirroring}

第一个配置将 ether5 端口设置为 mirror0 analyzer 端口，用于入站和出站镜像。镜像流量将发送到该端口。基于端口的入站和出站镜像从 ether6 端口启用。

```ros
/interface/ethernet/switch
set ingress-mirror0=ether5 egress-mirror0=ether5

/interface/ethernet/switch/port
set ether6 ingress-mirror-to=mirror0 egress-mirror-to=mirror0
```

### 基于 VLAN 的镜像 {#vlan-based-mirroring}

第二个示例要求将端口作为一组进行交换。镜像配置将 ether5 端口设置为 mirror0 analyzer 端口，并设置从 VLAN 进行镜像时使用的 mirror0 端口。VLAN 表条目仅对 ether2 和 ether7 端口之间的 VLAN 300 流量启用镜像。

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

第三个配置也要求将端口作为一组进行交换。镜像配置将 ether5 端口设置为 mirror0 analyzer 端口，并设置从 Unicast Forwarding database 进行镜像时使用的 mirror0 端口。Unicast Forwarding database 中的条目对来自 ether8 端口、源 MAC 地址或目的 MAC 地址为 E7:16:34:A1:CD:18 的数据包启用镜像。

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

## Trunking

---

![Trunking 3](/img/601e6a4b07f4a6d0.webp)

Cloud Router Switches 中的 Trunking 提供静态链路聚合组，并支持硬件自动故障切换和负载均衡。目前尚不支持与 IEEE802.3ad 和 IEEE802.1ax 兼容的 Link Aggregation Control Protocol。最多支持 8 个 Trunk 组，每个 Trunk 组最多支持 8 个 Trunk 成员端口。

配置需要一组已交换端口和 Trunk 表中的条目：

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

此示例还展示了另一端 RouterOS 中正确的 bonding 配置：

```ros
/interface/bonding
add name=bonding1 slaves=ether2,ether3,ether4 mode=balance-xor transmit-hash-policy=layer-2-and-3
```

:::danger
Bridge (R)STP 不知道底层交换机的 trunking 配置，某些 trunk 端口可能会进入 discarding 或 blocking 状态。当 trunking 成员端口连接到其他网桥时，应禁用 (R)STP，或在 trunked 设备之间过滤所有 BPDU（例如使用 ACL 规则）。
:::

## 每个端口的受限 MAC 访问 {#limited-mac-access-per-port}

---

禁用 MAC 学习并配置静态 MAC 地址，可以控制哪些设备能够与 CRS1xx/2xx 交换机通信以及通过这些交换机通信。

配置需要一组交换端口、在这些端口上禁用 MAC 学习，以及静态 FDB 条目：

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

CRS1xx/2xx 交换机还允许每个端口学习一个动态 MAC，以确保无论终端用户设备的 MAC 地址是什么，每个端口只连接一台终端用户设备：

```ros
/interface/ethernet/switch/port
set ether6 learn-limit=1
set ether7 learn-limit=1
```

## Isolation

---

### 端口级隔离 {#port-level-isolation}

![Port Level Isolation](/img/b0340fbe7ac5c7ee.webp)

端口级隔离通常用于 Private VLAN，其中：

- 一个或多个 uplink 端口由所有用户共享，用于访问网关或路由器。
- 端口组 Isolated Ports 用于访客用户。通信只能通过 uplink 端口进行。
- 端口组 Community 0 用于部门 A。允许组成员之间以及通过 uplink 端口进行通信。
- 端口组 Community X 用于部门 X。允许组成员之间以及通过 uplink 端口进行通信。

Cloud Router Switches 使用端口级隔离配置文件实现 Private VLAN：

- Uplink 端口 – 端口级隔离配置文件 0
- Isolated 端口 – 端口级隔离配置文件 1
- Community 0 端口 - 端口级隔离配置文件 2
- Community X（X \<= 30）端口 - 端口级隔离配置文件 X

**本示例需要一组交换端口。假设本示例中使用的所有端口均位于同一个交换组中。**

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

端口隔离配置的第一部分是设置 Uplink 端口：将 ether2 的端口配置文件设置为 0：

```ros
/interface/ethernet/switch/port
set ether2 isolation-leakage-profile-override=0
```

然后继续在所有隔离端口上设置隔离配置文件 1，并为端口隔离配置文件 1 添加通信端口：

```ros
/interface/ethernet/switch/port
set ether5 isolation-leakage-profile-override=1
set ether6 isolation-leakage-profile-override=1

/interface/ethernet/switch/port-isolation
add port-profile=1 ports=ether2 type=dst
```

配置 Community 2 和 Community 3 端口的方式类似：

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

### 协议级别隔离 {#protocol-level-isolation}

![Protocol Level Isolation](/img/efafb0531d23c36a.webp)

CRS 交换机上的协议级别隔离可用于增强网络安全性。例如，限制用户端口（ether2、ether3、ether4、ether5）之间的 DHCP 流量，并仅允许其访问受信任的 DHCP 服务器端口（ether1），可以防止 DHCP 欺骗攻击等安全风险。以下示例展示如何在 CRS 上进行配置。

将所需端口交换在一起：

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

为所有 DHCP 客户端端口设置相同的 Community 端口配置文件。Community 端口配置文件编号为 2 到 30。

```ros
/interface/ethernet/switch/port
set ether2 isolation-leakage-profile-override=2
set ether3 isolation-leakage-profile-override=2
set ether4 isolation-leakage-profile-override=2
set ether5 isolation-leakage-profile-override=2
```

并为所选 Community (2) 配置端口隔离/泄露配置文件，以仅允许发往可信 DHCP 服务器所在端口的 DHCP 流量。Registration status 和 traffic-type 属性必须设置为空，以便仅对 DHCP 协议应用限制。

```ros
/interface/ethernet/switch/port-isolation
add port-profile=2 protocol-type=dhcpv4 type=dst forwarding-type=bridged ports=ether1 registration-status="" traffic-type=""
```

## 服务质量（QoS） {#quality-of-service-qos}

---

**QoS 配置方案**

基于 MAC 的流量调度和整形：[MAC address in UFDB] -> [QoS Group] -> [Priority] -> [Queue] -> [Shaper]

基于 VLAN 的流量调度和整形：[VLAN id in VLAN table] -> [QoS Group] -> [Priority] -> [Queue] -> [Shaper]

基于协议的流量调度和整形：[Protocol in Protocol VLAN table] -> [QoS Group] -> [Priority] -> [Queue] -> [Shaper]

基于 PCP/DEI 的流量调度和整形：[Switch port PCP/DEI mapping] -> [Priority] -> [Queue] -> [Shaper]

基于 DSCP 的流量调度和整形：[QoS DSCP mapping] -> [Priority] -> [Queue] -> [Shaper]

### 基于 MAC 地址并使用内部 Priority 的流量调度 {#mac-based-traffic-scheduling-using-internal-priority}

在 Strict Priority 调度模式下，优先处理最高优先级队列。队列编号表示优先级，队列编号最大的队列优先级最高。数据包从最高优先级队列开始发送，直到该队列为空，然后转向下一个最高优先级队列，依此类推。如果出口端口不存在拥塞，数据包在收到后立即发送。如果端口发生拥塞，且高优先级流量持续到达，则低优先级队列会饥饿。

在所有 CRS 交换机上，根据内部 Priority 执行基于 MAC 地址的出口流量调度方案如下：[MAC address] -> [QoS Group] -> [Priority] -> [Queue]；  
在本示例中，host1（E7:16:34:00:00:01）和 host2（E7:16:34:00:00:02）在端口 ether7 上的发送流量将使用较高优先级 1，其余主机将使用较低优先级 0。请注意，CRS 每个端口最多支持 8 个队列。

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

创建用于 UFDB 的 QoS 组：

```ros
/interface/ethernet/switch/qos-group
add name=group1 priority=1
```

添加 UFDB 条目，以匹配 ether7 上的特定 MAC 地址并应用 QoS group1：

```ros
/interface/ethernet/switch/unicast-fdb
add mac-address=E7:16:34:00:00:01 port=ether7 qos-group=group1 svl=yes
add mac-address=E7:16:34:00:00:02 port=ether7 qos-group=group1 svl=yes
```

将 ether7 端口队列配置为仅根据目标地址按 Strict Priority 和 QoS 方案工作：

```ros
/interface/ethernet/switch/port
set ether7 per-queue-scheduling="strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0" priority-to-queue=0:0,1:1 qos-scheme-precedence=da-based
```

### 基于 MAC 地址并使用内部 Priority 的流量整形 {#mac-based-traffic-shaping-using-internal-priority}

根据内部 Priority 执行基于 MAC 地址的流量整形方案如下：[MAC address] -> [QoS Group] -> [Priority] -> [Queue] -> [Shaper]；  
在本示例中，不受限流量将使用优先级 0，受限流量将使用优先级 1，带宽限制为 10Mbit。请注意，CRS 每个端口最多支持 8 个队列。

创建一组用于交换的端口：

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

创建一组用于 UFDB 的 QoS 组：

```ros
/interface/ethernet/switch/qos-group
add name=group1 priority=1
```

添加一条 UFDB 条目，以匹配 ether8 上的特定 MAC 并应用 QoS group1：

```ros
/interface/ethernet/switch/unicast-fdb
add mac-address=E7:16:34:A1:CD:18 port=ether8 qos-group=group1 svl=yes
```

配置 ether8 端口队列，使其仅根据目标地址按照 Strict Priority 和 QoS 方案工作：

```ros
/interface/ethernet/switch/port
set ether8 per-queue-scheduling="strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0,strict-priority:0" priority-to-queue=0:0,1:1 qos-scheme-precedence=da-based
```

为 ether8 上的 queue1 应用带宽限制：

```ros
/interface/ethernet/switch/shaper
add port=ether8 rate=10M target=queue1
```

如果 CRS 交换机支持 Access Control Lists，则此配置更简单：

```ros
/interface/ethernet/switch/acl/policer
add name=policer1 yellow-burst=100k yellow-rate=10M

/interface/ethernet/switch/acl
add mac-dst-address=E7:16:34:A1:CD:18 policer=policer1
```

### 基于 VLAN 的流量调度和整形（使用内部优先级） {#vlan-based-traffic-scheduling--shaping-using-internal-priorities}

最佳做法是为受 shaper 限制的流量分配较低的内部 QoS Priority，使其在 Strict Priority 调度器中的优先级也较低。（较高优先级应更重要且不受限制）

在本示例中：  
交换机端口 ether6 使用 shaper 限制来自 ether7 和 ether8 的流量。  
当链路达到其容量时，优先级最高的流量将优先发送。  
VLAN10 -> QoS group0 = 最低优先级  
VLAN20 -> QoS group1 = 普通优先级  
VLAN30 -> QoS group2 = 最高优先级

```ros
/interface/bridge
add name=bridge1
/interface/bridge/port
add bridge=bridge1 interface=ether6 hw=yes
add bridge=bridge1 interface=ether7 hw=yes
add bridge=bridge1 interface=ether8 hw=yes
```

创建 QoS 组，以在 VLAN 表中使用。

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

配置 ether6、ether7 和 ether8 端口队列，使其仅针对基于 VLAN 的 QoS 按照 Strict Priority 和 QoS 方案工作。

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

默认情况下，CRS1xx/CRS2xx 系列设备会忽略 PCP/CoS/802.1p 值，并以 FIFO（First-In-First-Out）方式转发数据包。当设备内部队列未满时，数据包会以 FIFO 方式发送，但一旦队列被填满，较高优先级的流量就可以优先发送。假设 **ether1** 和 **ether2** 正在向 **ether3** 转发数据，但当 **ether3** 发生拥塞时，将对数据包进行调度。我们可以配置交换机保留最低优先级的数据包，直到所有较高优先级的数据包发送完毕。这在 VoIP 类型场景中很常见，其中某些流量需要优先处理。

要实现这种行为，请将 **ether1**、**ether2,** 和 **ether3** 端口交换在一起：

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

为方便起见，将每个 PCP 值映射到内部优先级值，只需将 PCP 与内部优先级 1 对 1 映射：

```ros
/interface/ethernet/switch/port
set ether1,ether2,ether3 pcp-based-qos-priority-mapping=0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7
```

由于交换机将先清空最大的队列，而你需要优先处理最高优先级，因此可以将该内部优先级 1 对 1 分配给队列：

```ros
/interface/ethernet/switch/port
set ether1,ether2,ether3 priority-to-queue=0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7
```

最后，将每个交换机端口设置为基于 PCP 值调度数据包：

```ros
/interface/ethernet/switch/port
set ether1,ether2,ether3 qos-scheme-precedence=pcp-based
```

## 带宽限制 {#bandwidth-limiting}

---

Ingress Port Policer 和 Shaper 都为 CRS 交换机提供带宽限制功能。

- Ingress Port Policer 在端口上设置 RX 限制：

```ros
/interface/ethernet/switch/ingress-port-policer
add port=ether5 meter-unit=bit rate=10M
```

- Shaper 在端口上设置 TX 限制。

```ros
/interface/ethernet/switch/shaper
add port=ether5 meter-unit=bit rate=10M
```

## 流量风暴控制 {#traffic-storm-control}

---

相同的 Ingress Port policer 也可用于流量风暴控制，防止广播、组播或单播流量风暴对 Layer 2 端口造成中断。

- 在 ether5 端口上配置广播风暴控制示例，限制为每秒 500 个数据包：

```ros
/interface/ethernet/switch/ingress-port-policer
add port=ether5 rate=500 meter-unit=packet packet-types=broadcast  
```

- 包含 ARP 和 ND 协议以及未注册组播流量的多种数据包类型示例。未注册组播是指在 Multicast Forwarding Database 中未定义的流量。

```ros
/interface/ethernet/switch/ingress-port-policer
add port=ether5 rate=5k meter-unit=packet packet-types=broadcast,arp-or-nd,unregistered-multicast
```

## 另请参阅 {#see-also}

---

- [Basic VLAN switching](/docs/bridging-and-switching/user-guides/basic-vlan-switching)
- [Bridge Hardware Offloading](/docs/bridging-and-switching#bridge-hardware-offloading)
- [Spanning Tree Protocol](/docs/bridging-and-switching/user-guides/spanning-tree-protocol)
- [IGMP Snooping](/docs/bridging-and-switching/user-guides/bridge-igmp-mld-snooping)
- [DHCP Snooping and Option 82](/docs/bridging-and-switching#dhcp-snooping-and-dhcp-option-82)
- [MTU on RouterBOARD](/docs/hardware/mtu-in-routeros)
- [Layer2 misconfiguration](/docs/bridging-and-switching/user-guides/layer2-misconfiguration)
