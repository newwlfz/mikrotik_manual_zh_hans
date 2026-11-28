---
title: "L3 硬件卸载"
description: "L3 Hardware Offloading 通过将 CPU 密集型任务卸载到交换芯片，实现线速路由。本页详细介绍如何为整个交换机、单个端口以及全局设置（如 IPv6 支持和 FastTrack 卸载）配置 L3HW，并说明可能对现有连接产生的影响的警告。"
tags:
  - 'l3hw'
  - 'switching'
source: https://manual.mikrotik.com/docs/7.25/bridging-and-switching/l3-hardware-offloading
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**Layer 3 Hardware Offloading**（**L3HW**，也称为 IP switching 或 HW routing）允许将部分路由器功能卸载到交换芯片。这样在路由数据包时可以达到线速，而仅靠 CPU 无法实现。

## 交换配置 {#switch-configuration}

要启用 Layer 3 Hardware Offloading，请为交换机设置 `l3-hw-offloading=yes`：

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

### 交换机端口配置 {#switch-port-configuration}

Layer 3 Hardware Offloading 可以为每个物理交换机端口配置。例如：

```ros
/interface/ethernet/switch/port/set sfp-sfpplus1 l3-hw-offloading=yes
```

请注意，交换机和端口的 l3hw 设置不同：

- 为交换机设置 `l3-hw-offloading``=no` 会完全禁用卸载，所有数据包都将由 CPU 路由。
- 但是，为交换机端口设置 `l3-hw-offloading``=no` 只会禁用该特定端口的硬件路由。此外，该端口仍可参与 Fasttrack 连接卸载。

要启用完整硬件路由，请在所有交换机端口上启用 l3hw：

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
/interface/ethernet/switch/port/set [find] l3-hw-offloading=yes
```

要让所有数据包先经过 CPU，并且仅卸载 Fasttrack 连接，请在所有端口上禁用 l3hw，但在交换芯片本身保持启用：

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
/interface/ethernet/switch/port/set [find] l3-hw-offloading=no
```

:::info
**当入接口和出接口均设置 `l3-hw-offloading=yes` 时，数据包由硬件路由。**

如果入接口和出接口均设置 `l3-hw-offloading=no`，数据包将经过 CPU/防火墙，并且仅卸载 Fasttrack 连接。

可以仅在出接口上设置 `l3-hw-offloading=no`，使数据包经过 CPU/防火墙。但是，仅在入接口上设置 `l3-hw-offloading=no` 可能导致不可预测的行为，例如，数据包仍可能由硬件路由并完全绕过 CPU/防火墙。
:::

下一个示例在所有端口上启用硬件路由，但上游端口（sfp-sfpplus16）除外。进出 sfp-sfpplus16 的数据包将进入 CPU，因此会经过防火墙/NAT 处理。

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
/interface/ethernet/switch/port/set [find] l3-hw-offloading=yes
/interface/ethernet/switch/port/set sfp-sfpplus16 l3-hw-offloading=no
```

:::warning
现有连接可能不受 `l3-hw-offloading` 设置更改的影响。
:::

### L3HW 设置 {#l3hw-settings}

可以使用 Settings 菜单 [`/interface/ethernet/switch/l3hw-settings`](/docs/cli-reference/interface/ethernet/switch/l3hw-settings) 根据部署需求调整 L3HW 行为。

### 接口列表 {#interface-lists}

无法直接使用接口列表控制 `l3-hw-offloading`，因为接口列表可能包含虚拟接口（例如 VLAN），而 `l3-hw-offloading` 设置只能应用于物理交换机端口。例如，如果两个 VLAN 接口（vlan20 和 vlan30）运行在同一交换机端口（trunk 端口）上，则无法在 vlan20 上启用硬件路由而在 vlan30 上保持禁用。

不过，接口列表可用作端口选择器。以下示例演示如何在 LAN 端口（属于“LAN”接口列表的端口）上启用硬件路由，并在 WAN 端口上禁用硬件路由：

```ros
:foreach i in=[/interface/list/member/find where list=LAN] do={
    /interface/ethernet/switch/port/set [/interface/list/member/get $i interface] l3-hw-offloading=yes
}

:foreach i in=[/interface/list/member/find where list=WAN] do={
    /interface/ethernet/switch/port/set [/interface/list/member/get $i interface] l3-hw-offloading=no
}
```

请注意，由于接口列表不直接用于硬件路由控制，**修改接口列表也不会自动反映到 l3hw 更改中**。例如，将某个交换机端口添加到“LAN”接口列表不会自动在该端口上启用 `l3-hw-offloading`。用户必须重新运行上述脚本才能应用更改。

### MTU

硬件最多支持 8 个 MTU 配置，也就是说用户最多可为接口设置 8 个不同的 MTU 值：默认 1500 加 7 个自定义值。

:::tip
建议更改接口上的 MTU/L2MTU 值时禁用 `l3-hw-offloading`。
:::

**MTU 更改示例**

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=no
/interface/set sfp-sfpplus1 mtu=9000 l2mtu=9022
/interface/set sfp-sfpplus2 mtu=9000 l2mtu=9022
/interface/set sfp-sfpplus3 mtu=10000 l2mtu=10022
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

### 第 2 层依赖关系 {#layer-2-dependency}

第 3 层硬件处理位于第 2 层硬件处理之上。因此，L3HW 卸载需要在底层接口上启用 L2HW 卸载。后者默认启用，但存在一些例外。例如，支持 Marvell Prestera 交换机的 MikroTik 设备仅支持一个硬件网桥。如果存在多个网桥，其他网桥将由 CPU 处理，不受 L3HW 约束。

另一个示例是 ACL 规则。如果某条规则将流量重定向到 CPU 进行软件处理，则不会触发硬件路由（L3HW）：

#### 用于在特定端口上禁用硬件处理的 ACL 规则 {#acl-rule-to-disable-hardware-processing-on-a-specific-port}

```ros
/interface/ethernet/switch/rule/add switch=switch1 ports=ether1 redirect-to-cpu=yes
```

:::tip
建议在配置 L2 时关闭 L3HW offloading。
:::

为确保软件侧和硬件侧的 Layer 3 与 Layer 2 保持同步，建议在配置 Layer 2 功能时禁用 L3HW。该建议适用于以下配置：

- 添加/删除/启用/禁用网桥。
- 向网桥添加/从网桥删除交换机端口。
- 绑定交换机端口/移除绑定。
- 更改 VLAN 设置。
- 更改交换机端口上的 MTU/L2MTU。
- 更改以太网（MAC）地址。

简而言之，在 `/interface/bridge/` 和 `/interface/vlan/` 下进行更改时，禁用 `l3-hw-offloading`：

#### Layer 2 配置模板 {#layer-2-configuration-template}

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=no

/interface/bridge
# put bridge configuration changes here

/interface/vlan
# define/change VLAN interfaces
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

### MAC telnet

当 **98DX8xxx**、**98DX4xxx,** 或 **98DX325x** 交换芯片启用 L3HW offloading 时，MAC telnet 存在限制。来自 MAC Telnet 的数据包会被丢弃且不会到达 CPU，因此将无法访问设备。

如果需要将 MAC telnet 与 L3HW 结合使用，可以创建一条 ACL 规则，强制将这些数据包发送到 CPU。

例如，如果需要通过 sfp-sfpplus1 和 sfp-sfpplus2 进行 MAC telnet 访问，则需要添加以下 ACL 规则。可以使用 `ports` 设置选择更多接口。

```ros
/interface/ethernet/switch/rule
add dst-port=20561 ports=sfp-sfpplus1,sfp-sfpplus2 protocol=udp redirect-to-cpu=yes switch=switch1
```

### VLAN 间路由 {#inter-vlan-routing}

由于 L3HW 依赖 L2HW，而 L2HW 负责 VLAN 处理，因此 Inter-VLAN *硬件* 路由通常需要底层有硬件网桥。即使某个 VLAN 只有一个 tagged 端口成员，该端口也必须是网桥成员，并且 VLAN 接口必须分配给该网桥。

采用 Marvell 98DX7xxx 系列交换芯片的设备除外——它们还支持在直接创建于以太网交换端口上的 VLAN 接口之间进行硬件路由，无需网桥：

`/interface/vlan/add interface=ether2 name=vlan20 vlan-id=20`

在所有其他 L3HW 设备上，不要将 VLAN 接口直接分配给交换端口——此类接口不会被卸载，其流量将由 CPU 路由。应将 VLAN 接口分配给网桥。这样，VLAN 配置会卸载到硬件，并且在启用 L3HW 后，流量将进行 Inter-VLAN 硬件路由。

#### VLAN 配置示例 {#vlan-configuration-example}

```ros
/interface/ethernet/switch/set 0 l3-hw-offloading=no
/interface/bridge/port/add bridge=bridge interface=ether2
/interface/bridge/vlan/add bridge=bridge tagged=bridge,ether2 vlan-ids=20
/interface/vlan/add interface=bridge name=vlan20 vlan-id=20
/ip/address/add address=192.0.2.1/24 interface=vlan20
/interface/bridge/set bridge vlan-filtering=yes
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

:::info
对于 VLAN 间路由，网桥接口必须是每个可路由 `/interface/bridge/vlan/` 条目的 tagged 成员。
:::

### 按 VLAN 卸载 {#per-vlan-offloading}

可以使用 `/interface/vlan` 菜单中的 `l3-hw-offloading=yes|no` 设置，为每个 VLAN 接口单独配置 L3HW 卸载。这样可以更精细地控制哪些 VLAN（及其相关路由）卸载到交换芯片，哪些由 CPU 处理。无需再禁用交换机端口上的 L3HW，即可禁用特定 VLAN 的 L3HW 路由。

仅当满足以下所有条件时，VLAN 接口才会被卸载（获得 H 标志）：

- VLAN 接口具有 `l3-hw-offloading=yes`。
- VLAN 接口创建在启用硬件卸载且启用 vlan-filtering 的网桥上，或者，在 98DX7xxx 交换机上，直接创建在以太网交换机端口上。
- 所有相关交换机端口均具有 l3-hw-offloading=yes —— 对于网桥场景，是 VLAN 的所有成员端口；对于直接创建在交换机端口上的 VLAN 接口，是父端口。

对于 VLAN 间路由，入站和出站 VLAN 都必须启用硬件卸载，否则数据包将发送到 CPU。

:::info
如果一个交换机端口承载多个具有不同 L3HW 设置的 VLAN，请保持该端口的 `l3-hw-offloading=yes`。
:::

### L3HW MAC 地址范围限制（仅 DX2000/DX3000 系列） {#l3hw-mac-address-range-limitation-dx2000dx3000-series-only}

Marvell Prestera DX2000 和 DX3000 交换芯片存在硬件限制，每个接口只能配置 MAC 地址的最后一个（最低有效）八位字节。其余五个（最高有效）八位字节是全局配置的，因此所有接口（交换端口、网桥、VLAN）必须相同。换句话说，MAC 地址必须采用“**XX:XX:XX:XX:XX:??**”格式，其中：

- “**XX:XX:XX:XX:XX**”部分对所有接口通用。
- “**??**”是可变部分。

**此要求仅适用于第 3 层（路由）。** 第 2 层（桥接）不使用交换机的以太网地址。此外，它不适用于网桥端口，因为这些端口使用网桥的 MAC 地址。

公共五个八位字节的要求适用于：

- 启用硬件路由的独立交换机端口（非网桥成员）（`l3-hw-offloading=yes`）。
- 网桥本身。
- VLAN 接口（默认使用网桥 MAC 地址的那些接口）。

## 路由配置 {#route-configuration}

---

### 抑制硬件卸载 {#suppressing-hw-offload}

默认情况下，所有路由都是硬件候选路由。要进一步微调要卸载的流量，每条路由都有一个选项，可禁用/启用 **`suppress-hw-offload`**。

例如，如果已知大部分流量流向服务器所在的网络，则可以仅对到该特定目的地的流量启用卸载：

```ros
/ip/route/set [find where static && dst-address!="192.168.3.0/24"] suppress-hw-offload=yes
```

现在只有到 192.168.3.0/24 的路由带有 H 标志，表示它是唯一有资格被选中进行硬件卸载的路由：

```ros
[admin@MikroTik] > /ip/route/print where static
Flags: A - ACTIVE; s - STATIC, y - COPY; H - HW-OFFLOADED
Columns: DST-ADDRESS, GATEWAY, DISTANCE
#     DST-ADDRESS       GATEWAY         D
0 As  0.0.0.0/0         172.16.2.1      1
1 As  10.0.0.0/8        10.155.121.254  1
2 AsH 192.168.3.0/24    172.16.2.1      1
```

:::danger
H-flag 不表示该路由已实际进行 HW 卸载；它仅表示该路由可被选择进行 HW 卸载。
:::

### 路由过滤器 {#routing-filters}

对于 OSPF 和 BGP 等动态路由协议，可以使用 [routing filters](/docs/7.24/user-guides/routing-and-networking-protocols/route-selection-and-filtering) 抑制 HW 卸载。例如，要抑制所有 OSPF instance 路由的 HW 卸载，请使用“**`suppress-hw-offload yes`**”属性：

```ros
/routing/ospf/instance
set [find name=instance1] in-filter-chain=ospf-input
/routing/filter/rule
add chain="ospf-input" rule="set suppress-hw-offload yes; accept"
```

### 卸载 Fasttrack 连接 {#offloading-fasttrack-connections}

防火墙过滤规则针对 Fasttrack 提供 **`hw-offload`** 选项，可用于精细调整连接卸载。由于用于 Fasttrack 连接的硬件内存非常有限，可以选择要卸载的连接类型，从而受益于接近线速的流量。以下示例仅卸载 TCP 连接，而 UDP 数据包由 CPU 路由，不占用 HW 内存：

```ros
/ip/firewall/filter
add action=fasttrack-connection chain=forward connection-state=established,related hw-offload=yes protocol=tcp
add action=fasttrack-connection chain=forward connection-state=established,related hw-offload=no
add action=accept chain=forward connection-state=established,related
```

### 无状态硬件防火墙 {#stateless-hardware-firewall}

连接跟踪和有状态防火墙只能由 CPU 执行，而硬件可以通过 [switch rules (ACL)](/docs/7.24/bridging-and-switching/marvell-prestera-switch-chip-features#switch-rules-acl) 执行无状态防火墙。以下示例在硬件层面阻止从 ether1 访问 MySQL 服务器，并将来自 ether2 和 ether3 的数据包重定向到 CPU/Firewall：

```ros
/interface/ethernet/switch/rule
add switch=switch1 dst-address=10.0.1.2/32 dst-port=3306 ports=ether1 new-dst-ports=""
add switch=switch1 dst-address=10.0.1.2/32 dst-port=3306 ports=ether2,ether3 redirect-to-cpu=yes
```

### Switch Rules (ACL) 与 Fasttrack HW 卸载对比 {#switch-rules-acl-vs-fasttrack-hw-offloading}

某些防火墙规则既可以通过 [switch rules (ACL)](/docs/7.24/bridging-and-switching/marvell-prestera-switch-chip-features#switch-rules-acl) 实现，也可以通过 CPU [Firewall Filter](/docs/7.24/firewall-and-quality-of-service/firewall/filter) + Fasttrack HW Offloading 实现。两种方案都能提供接近线速的性能。那么该选择哪一种？

首先，[并非所有设备都支持 Fasttrack HW Offloading](/docs/7.24/bridging-and-switching/l3-hardware-offloading#l3hw-device-support)，如果没有 HW offloading，Firewall Filter 只使用软件路由，其速度远低于硬件对应方案。其次，即使可以使用 Fasttrack HW Offloading，也有一个经验法则：

:::tip
如果可能，始终使用 Switch Rules (ACL)。
:::

Switch rules 与 Fasttrack 连接共享硬件内存。但是，硬件资源会为每条 Fasttrack 连接分配，而单条 ACL 规则可以匹配多个连接。例如，如果访客 WiFi 网络连接到 sfp-sfpplus1 VLAN 10，并且你不希望它访问内部网络，只需创建一条 ACL 规则：

```ros
/interface/ethernet/switch/rule
add switch=switch1 ports=sfp-sfpplus1 vlan-id=10 dst-address=10.0.0.0/8 new-dst-ports=""
```

匹配的数据包将在硬件层面被丢弃。这比让*所有*访客数据包都进入 CPU 进行 Firewall 过滤要好得多。

当然，ACL 规则无法匹配所有内容。例如，ACL 规则无法过滤连接状态：接受 established，丢弃其他连接。这时就需要 Fasttrack HW Offloading 发挥作用：默认将数据包重定向到 CPU 进行防火墙过滤，然后卸载已建立的 Fasttrack 连接。不过，为整个交换机或端口禁用 `l3-hw-offloading` 并不是唯一选择。

:::info
使用 `redirect-to-cpu=yes` 定义 ACL 规则，而不是在交换机端口上设置 `l3-hw-offloading=no`，以缩小进入 CPU 的流量范围。
:::

### 硬件卸载 VRF {#hardware-offloaded-vrf}

硬件卸载 VRF 在 [98DX8xxx、98DX4xxx、98DX325x、98CX8410](#ccr2xxx-crs3xx-crs5xx-switch-98dx8xxx-and-98dx4xxx-series) 和 [98DX7xxx](#crs8xx-switch-98dx7xxx-series) 交换芯片上受支持。[98DX3xxx 和 98DX2xxx](#crs3xx-switch-98dx3xxx-and-98dx2xxx-series) 系列不支持该功能。

如果路由位于 VRF 中，且出口接口支持 L3HW，则交换芯片将路由该数据包。可以将任何支持 L3HW 的接口（Ethernet、bonding、网桥、VLAN）与 VRF 关联。始终将主接口与 VRF 关联，而不是带有 `S`（slave）标志的接口，例如网桥或 bonding 端口。Fasttrack、NAT 和 VXLAN 卸载仅限于 `main` 路由表。

VRF 在 `/ip/vrf` 下配置。详情请参阅 [VRF](/docs/7.24/user-guides/routing-and-networking-protocols/vrf) 手册。

98DX8208、98DX8212、98DX8332、98DX3257、98DX3255 最多支持 512 个 VRF 表。所有其他受支持的交换芯片最多支持 1024 个。

#### 通过 ACL 分配 VRF {#vrf-assignment-via-acl}

L3HW 支持使用 ACL 交换规则为入站流量分配 VRF。`/interface/ethernet/switch/rule` 中的 `new-vrf` 选项可将匹配的数据包定向到指定的 VRF 表。

在不支持 VRF 的交换机（98DX3xxx 和 98DX2xxx 系列）上，将 `new-vrf` 设置为 `main` 以外的任何值都会导致 `redirect-to-cpu=yes`。

有关 ACL 规则的详情，请参阅 [Switch Rules (ACL)](/docs/7.24/bridging-and-switching/marvell-prestera-switch-chip-features#switch-rules-acl)。

## 配置示例 {#configuration-examples}

---

### 上游端口位于 Firewall/NAT 之后的 VLAN 间路由 {#inter-vlan-routing-with-upstream-port-behind-firewallnat}

本示例演示如何在上游端口保持 Firewall 和 NAT 运行的同时，利用接近线速的 VLAN 间路由。此外，到上游端口的 Fasttrack 连接也会卸载到硬件，从而将流量速度提升至接近线速。VLAN 间流量完全由硬件路由，不进入 CPU/Firewall，因此不会占用 Fasttrack 连接的硬件内存。

我们使用具有以下设置的 **CRS317-1G-16S+** 型号：

- sfp1-sfp4 - 网桥端口，VLAN ID 20，未标记。
- sfp5-sfp8 - 网桥端口，VLAN ID 30，未标记。
- sfp16 - 上游端口。
- ether1 - 管理端口。

设置接口列表以便于访问：

### 接口列表 {#interface-lists-1}

```ros
/interface/list
add name=LAN
add name=WAN
add name=MGMT 

/interface/list/member
add interface=sfp-sfpplus1 list=LAN
add interface=sfp-sfpplus2 list=LAN
add interface=sfp-sfpplus3 list=LAN
add interface=sfp-sfpplus4 list=LAN
add interface=sfp-sfpplus5 list=LAN
add interface=sfp-sfpplus6 list=LAN
add interface=sfp-sfpplus7 list=LAN
add interface=sfp-sfpplus8 list=LAN
add interface=sfp-sfpplus16 list=WAN
add interface=ether1 list=MGMT 
```

### 网桥设置 {#bridge-setup}

```ros
/interface/bridge
add name=bridge vlan-filtering=yes

/interface/bridge/port
add bridge=bridge interface=sfp-sfpplus1 pvid=20
add bridge=bridge interface=sfp-sfpplus2 pvid=20
add bridge=bridge interface=sfp-sfpplus3 pvid=20
add bridge=bridge interface=sfp-sfpplus4 pvid=20
add bridge=bridge interface=sfp-sfpplus5 pvid=30
add bridge=bridge interface=sfp-sfpplus6 pvid=30
add bridge=bridge interface=sfp-sfpplus7 pvid=30
add bridge=bridge interface=sfp-sfpplus8 pvid=30

/interface/bridge/vlan
add bridge=bridge tagged=bridge untagged=sfp-sfpplus1,sfp-sfpplus2,sfp-sfpplus3,sfp-sfpplus4 vlan-ids=20
add bridge=bridge tagged=bridge untagged=sfp-sfpplus5,sfp-sfpplus6,sfp-sfpplus7,sfp-sfpplus8 vlan-ids=30
```

路由需要专用 VLAN 接口。对于标准 L2 VLAN 网桥（不进行 VLAN 间路由），可以省略下一步。

#### 用于路由的 VLAN 接口设置 {#vlan-interface-setup-for-routing}

```ros
/interface/vlan
add interface=bridge name=vlan20 vlan-id=20
add interface=bridge name=vlan30 vlan-id=30

/ip/address
add address=192.168.20.17/24 interface=vlan20 network=192.168.20.0
add address=192.168.30.17/24 interface=vlan30 network=192.168.30.0
```

配置管理和上游端口、基本防火墙、NAT，并启用 Fasttrack 连接的硬件卸载：

#### 防火墙设置 {#firewall-setup}

```ros
/ip/address
add address=192.168.88.1/24 interface=ether1
add address=10.0.0.17/24 interface=sfp-sfpplus16

/ip/route
add gateway=10.0.0.1

/ip/firewall/filter
add action=fasttrack-connection chain=forward connection-state=established,related hw-offload=yes
add action=accept chain=forward connection-state=established,related

/ip/firewall/nat
add action=masquerade chain=srcnat out-interface-list=WAN
```

此时，所有路由仍由 CPU 执行。在交换芯片上启用硬件路由：

#### 启用 Layer 3 硬件卸载 {#enable-layer-3-hardware-offloading}

```ros
# Enable full hardware routing on LAN ports
:foreach i in=[/interface/list/member/find where list=LAN] do={ 
    /interface/ethernet/switch/port/set [/interface/list/member/get $i interface] l3-hw-offloading=yes 
} 

# Disable full hardware routing on WAN or Management ports
:foreach i in=[/interface/list/member/find where list=WAN or list=MGMT] do={ 
    /interface/ethernet/switch/port/set [/interface/list/member/get $i interface] l3-hw-offloading=no 
}

# Activate Layer 3 Hardware Offloading on the switch chip
/interface/ethernet/switch/set 0 l3-hw-offloading=yes
```

Results:

- 在同一 VLAN 内（例如 sfp1-sfp4），流量由硬件在 Layer 2 转发 *（L2HW）*。
- VLAN 间流量（例如 sfp1-sfp5）由硬件在 Layer 3 路由 *（L3HW）。*
- 来自/发往 WAN 端口的流量先由 CPU/防火墙处理。随后 Fasttrack 连接被卸载到硬件 *（Hardware-Accelerated L4 Stateful Firewall）。* NAT 同时适用于由 CPU 和硬件处理的数据包。
- 发往管理端口的流量受防火墙保护。

## 典型错误配置 {#typical-misconfiguration}

---
以下是配置 Layer 3 Hardware Offloading 时常见的用户错误。

### 在交换端口或 bond 上创建 VLAN 接口 {#vlan-interface-on-a-switch-port-or-bond}

```ros
/interface/vlan
add name=vlan10 vlan-id=10 interface=sfp-sfpplus1
add name=vlan20 vlan-id=20 interface=bond1
```

由于存在二层依赖，在大多数设备上，只有在启用硬件卸载且开启 vlan-filtering 的网桥上创建的 VLAN 接口才能进行 L3HW 卸载。正确配置如下：

```ros
/interface/bridge/port
add bridge=bridge1 interface=sfp-sfpplus1 frame-types=admit-only-vlan-tagged
add bridge=bridge1 interface=bond1 frame-types=admit-only-vlan-tagged
 
/interface/bridge/vlan
add bridge=bridge1 tagged=bridge1,sfp-sfpplus1 vlan-ids=10
add bridge=bridge1 tagged=bridge1,bond1 vlan-ids=20
 
/interface/vlan
add name=vlan10 vlan-id=10 interface=bridge1
add name=vlan20 vlan-id=20 interface=bridge1
```

:::warning
如果在不支持此类接口卸载的设备上直接在 Ethernet 或 bonding 接口上创建 VLAN 接口（请参阅 [Inter-VLAN Routing](#inter-vlan-routing)），数据包可能会被错误卸载，绕过 CPU 处理（例如防火墙和 NAT），并导致未定义行为。

如果需要此类配置，必须在 `/interface/ethernet/switch/port` 菜单下，通过将相关交换机端口设置为 `l3-hw-offloading=no` 来禁用 L3HW 卸载。
:::

### 未将网桥接口添加到 /interface/bridge/vlan/ {#not-adding-the-bridge-interface-to-interfacebridgevlan}

对于 Inter-VLAN 路由，网桥接口本身需要添加到指定 VLAN 的 tagged 成员中。在以下示例中，Inter-VLAN 路由可在 VLAN 10 和 11 之间工作，但数据包不会被路由到 VLAN 20。

```ros
/interface/bridge/vlan
add bridge=bridge1 vlan-ids=10 tagged=bridge1,sfp-sfpplus1
add bridge=bridge1 vlan-ids=11 tagged=bridge1 untagged=sfp-sfpplus2,sfp-sfpplus3 
add bridge=bridge1 vlan-ids=20 tagged=sfp-sfpplus1 untagged=sfp-sfpplus4,sfp-sfpplus5
```

上述示例并不总是意味着错误。有时，你可能希望设备在某些或所有 VLAN 中充当简单的 L2 交换机。只需确保有意设置此类行为，而不是由于误操作导致。

### 创建多个网桥 {#creating-multiple-bridges}

这些设备仅支持一个硬件网桥。如果创建了多个网桥，只有一个会获得硬件卸载。对于 L2，这意味着其他网桥采用软件转发；对于 L3HW，多个网桥可能导致未定义行为。

:::tip
不要创建多个网桥，而是创建一个网桥，并使用 VLAN 过滤隔离 L2 网络。
:::

### 使用不属于交换机的端口 {#using-ports-that-do-not-belong-to-the-switch}

某些设备有两个交换芯片，或者管理端口直接连接到 CPU。例如，**CRS312-4C+8XG** 的 **ether9** 端口连接到单独的交换芯片。尝试将该端口添加到网桥或使其参与 L3HW 设置会导致意外结果。请将管理端口保留用于管理！

```ros
[admin@crs312] /interface/ethernet/switch> print
Columns: NAME, TYPE, L3-HW-OFFLOADING
# NAME     TYPE              L3-HW-OFFLOADING
0 switch1  Marvell-98DX8212  yes            
1 switch2  Atheros-8227      no   
           
[admin@crs312] /interface/ethernet/switch> port print
Columns: NAME, SWITCH, L3-HW-OFFLOADING, STORM-RATE
 # NAME         SWITCH   L3-HW-OFFLOADING  STORM-RATE
 0 ether9       switch2                             
 1 ether1       switch1  yes                      100
 2 ether2       switch1  yes                      100
 3 ether3       switch1  yes                      100
 4 ether4       switch1  yes                      100
 5 ether5       switch1  yes                      100
 6 ether6       switch1  yes                      100
 7 ether7       switch1  yes                      100
 8 ether8       switch1  yes                      100
 9 combo1       switch1  yes                      100
10 combo2       switch1  yes                      100
11 combo3       switch1  yes                      100
12 combo4       switch1  yes                      100
13 switch1-cpu  switch1                           100
14 switch2-cpu  switch2
```

### 过度依赖 Fasttrack HW Offloading {#relying-on-fasttrack-hw-offloading-too-much}

由于 Fasttrack HW Offloading 提供接近线速的性能，且无需额外配置，用户容易将其作为默认解决方案。然而，HW Fasttrack 连接的数量非常有限，其他流量会交由 CPU 处理。尽可能使用硬件路由，通过交换机 ACL 规则将 CPU 流量降至最低，然后使用防火墙过滤规则精细调整要卸载哪些 Fasttrack 连接。

### 尝试卸载 slow-path 连接 {#trying-to-offload-slow-path-connections}

使用某些配置（例如启用网桥“**use-ip-firewall**”设置、创建网桥 nat/filter 规则）或运行特定功能（如 sniffer 或 torch）可能会禁用 RouterOS [FastPath](/docs/7.24/firewall-and-quality-of-service/packet-flow-in-routeros#fast-path)，这会影响正确 FastTrack 和 HW 卸载连接的能力。如果需要 HW 卸载的 Fasttrack，请确保不存在禁用 FastPath 的设置，并确认连接获得“H”标志，或使用 L3HW [monitor](/docs/7.24/bridging-and-switching/l3-hardware-offloading#monitor) 命令查看 HW 卸载连接的数量。

## L3HW 功能支持 {#l3hw-feature-support}

- **HW** - 该功能受支持，并卸载到硬件。
- **CPU** - 该功能受支持，但由软件（CPU）执行。
- **N/A** - 该功能无法与 L3HW 一起使用。必须完全禁用三层硬件卸载（**switch** `l3-hw-offloading=no`），该功能才能工作。
- **FW** - 该功能要求指定的 **switch port** 使用 `l3-hw-offloading=no`。在 **switch** 级别，`l3-hw-offloading=yes`。

| 功能 | 支持 | 注释 | 版本 |
| :-- | :-- | :-- | :-- |
| IPv4 Unicast Routing | **HW** |  | 7.1 |
| IPv6 Unicast Routing | **HW** | <br/><code>/interface/ethernet/switch/l3hw-settings/set ipv6-hw=yes</code><br/> | 7.6 |
| IPv4 Multicast Routing | **CPU** |  |  |
| IPv6 Multicast Routing | **CPU** |  |  |
| ECMP | **HW** | 多路径路由。L3HW 使用交换芯片自身的 ECMP 哈希掩码，其中包含 TCP/UDP 的 L4 端口；对于硬件转发的 ECMP，配置的哈希策略会被忽略。FastTrack-offloaded 连接遵循内核 FIB 查找，并可能选择不同的下一跳。[FastPath](/docs/firewall-and-quality-of-service/packet-flow-in-routeros#fast-path) 按 L3 缓存路由。 | 7.1 |
| Blackholes | **HW** | <br/><code>/ip/route/add dst-address=10.0.99.0/24 blackhole</code><br/> | 7.1 |
| `gateway=<interface_name>` | **CPU/HW** | <br/><code>/ip/route/add dst-address=10.0.0.0/24 gateway=ether1</code><br/><br/> 这仅适用于直连网络。由于 HW 不知道如何发送 ARP 请求，CPU 会发送 ARP 请求并等待回复，以便在匹配 DST IP 地址的连接收到的第一个数据包上确定 DST MAC 地址。确定 DST MAC 后，会添加 HW 条目，所有后续数据包将由交换芯片处理。 | 7.1 |
| Bridge | **HW** | 从 [hardware-offloaded bridge](/docs/bridging-and-switching#bridge-hardware-offloading) 接口路由或路由到该接口。 | 7.1 |
| VLAN | **HW** | 在使用 <a href="/docs/bridging-and-switching#bridge-vlan-filtering">vlan-filtering</a> 的硬件卸载网桥接口上创建的 VLAN 接口之间路由。<br/><br/>在 <a href="#crs8xx-switch-98dx7xxx-series">98DX7xxx</a> 交换机上，也支持在以太网交换端口上直接创建的 VLAN 接口之间路由。<br/><br/><code>/interface/vlan</code><br/> | 7.1 |
| Bonding | **HW** | bonding 接口之间路由。<br/><br/><code>/interface/bonding</code><br/><br/> 仅 <code>802.3ad</code> 和 <code>balance-xor</code> bonding 模式支持硬件卸载。 | 7.1 |
| IPv4 Firewall | **FW** | 用户必须选择 HW 加速路由或防火墙。防火墙规则由 CPU 处理。***Fasttrack*** 连接会卸载到 HW。 | 7.1 |
| IPv4 NAT | **FW** | 应用于卸载的 ***Fasttrack*** 连接的 NAT 规则也由 HW 处理。 | 7.1 |
| MLAG | **N/A** |  |  |
| VRF | **HW** | [Hardware-offloaded VRF](#hardware-offloaded-vrf)。 |  |
| VRRP | **N/A** |  |  |
| Traffic-Flow | **N/A** | L3HW 卸载的流量不会通过 [Traffic Flow](/docs/diagnostics-monitoring-and-troubleshooting/traffic-flow) 报告。 |  |
| VXLAN | **HW** | 支持硬件卸载的 <a href="/docs/bridging-and-switching/vxlan">VXLAN</a> 数据平面、VXLAN 封装和解封装。这允许在 vlan-filtering 网桥内进行静态的一对一 VLAN 到 VXLAN 映射。目前，部分已知功能尚未实现。<br/><strong>Underlay（路由封装的 VXLAN 数据包）：</strong><br/> 1. 不支持通过 ECMP 使用 VTEP <br/> 2. 不支持通过 bond、bridge、VLAN 接口使用 VTEP（仅支持独立的路由以太网接口） <br/> 3. 不支持通过组播使用 VTEP <br/> 4. VXLAN 硬件卸载仅限于 <code>main</code> 路由表。VTEP 无法在 VRF 中运行。 <br/> 5. 不支持将 VTEP 与 IPv6 一起使用 <br/><strong>Overlay（在以太网和 VXLAN 之间转发）：</strong><br/> 1. 不支持通过 VXLAN 进行 VLAN 标记 <br/> 2. 不支持在不同 VXLAN VNI 之间路由 <br/> 3. VTEP 相互隔离，并且没有机制控制它们之间的“horizon”。 <br/> 4. 桥接的 VXLAN 接口不支持 IGMP snooping。启用 snooping 时，VXLAN 上的 MDB 条目不会卸载，组播流量在以太网和 VXLAN 之间受到限制。 <br/> 5. MLAG 不支持桥接的 VXLAN 接口。 <br/><br/><code>/interface/vxlan</code><br/> | 7.18 |
| MTU | **HW** | 硬件支持最多 8 个 MTU 配置文件。 | 7.1 |
| QinQ Routing | **CPU** | 堆叠的可路由 VLAN 接口将失去 L3HW 卸载，而直接在网桥接口上创建的可路由 VLAN 接口仍可使用 HW 卸载。 |  |
| IPv4 routes with IPv6 nexthops or vice versa | **N/A** |  |  |

:::warning
混合同一流的硬件转发数据包和 FastTrack/CPU 转发数据包可能选择不同的 ECMP 下一跳，从而导致非对称路由和连接重置。
:::

仅下表中列出的设备支持 L3 HW Offloading。

## L3HW 设备支持 {#l3hw-device-support}

仅下表中列出的设备支持 L3 HW Offloading。

### CRS3xx：Switch 98DX3xxx 和 98DX2xxx 系列 {#crs3xx-switch-98dx3xxx-and-98dx2xxx-series}

以下设备基于 **Marvell **98DX224S、98DX226S****、**98DX2528** 或 **98DX3236** 交换芯片型号。

:::info
**98DX3255** 和 **98DX3257** 型号属于例外，其功能集来自 98DX8xxx 系列，而不是 98DX3xxx 系列。

**注意：** 与其他交换型号相比，这些设备缺少以下重要功能：

- Fasttrack 和 NAT 连接卸载
- 每 VLAN 数据包和字节计数器
- VXLAN 卸载
- 硬件卸载 VRF
:::

| 交换芯片 | 型号 | IPv4 路由前缀 <sup>1</sup> | IPv6 路由前缀 <sup>2</sup> | 下一跳 | 每前缀 ECMP 路径 <sup>3</sup> |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **98DX3236** | CRS305-1G-4S+IN <br/> CRS326-24G-2S+ (RM/IN) <br/> CRS328-24P-4S+RM <br/> CRS328-4C-20S-4S+RM | 13312 | 3328 | 4K | 8 |
| **98DX226S** | CRS305-1G-4S+OUT (FiberBox Plus) <br/> CRS310-1G-5S-4S+ (netFiber 9/IN) <br/> CRS310-8G+2S+IN <br/> CRS318-16P-2S+OUT (netPower 16P) <br/> CRS320-8P-8B-4S+RM <br/> CRS418-8P-8G-2S+RM <br/> CRS418-8P-8G-2S+5axQ2axQ-RM | 13312 | 3328 | 4K | 8 |
| **98DX224S** | CRS318-1Fi-15Fr-2S-OUT (netPower 15FR) | 13312 | 3328 | 4K | 8 |
| **98DX2528** | CRS304-4XG-IN | 13312 | 3328 | 4K | 8 |

---

<sup>1</sup> Since the total number of routes that can be offloaded is limited, prefixes with higher netmask are preferred to be forwarded by hardware (e.g., /32, /30, /29, etc.). Any other prefixes that do not fit in the HW table will be processed by the CPU. Directly connected hosts are offloaded as /32 (IPv4) or /128 (IPv6) route prefixes. The number of hosts is also limited by max-neighbor-entries in [IP Settings](/docs/cli-reference/ip/settings) / [IPv6 Settings](/docs/cli-reference/ipv6/settings).  
<sup>2</sup> IPv4 and IPv6 routing tables share the same hardware memory.  
<sup>3</sup> If a route has more paths than the hardware ECMP limit (X), only the first X paths get offloaded.

#### 部分卸载 {#partial-offloading}

对于 **98DX3xxx**、**98DX2xxx** 交换芯片系列，情况很简单：一条 RouterOS 路由条目（/ip/route/）对应一条 HW IPv4 路由前缀条目。直连主机（/32 路由）也占用同一张表。只要路由总数（"/ip/route/print count-only"）加上直连主机数（"/ip/arp/print count-only where status=reachable or status=stale"）不超过 **13312（13k）**，所有路由都会被卸载。超过该数量时，具有*更短*前缀的路由会保留在 CPU 上。

### CCR2xxx、CRS3xx、CRS5xx：Switch 98DX8xxx 和 98DX4xxx 系列 {#ccr2xxx-crs3xx-crs5xx-switch-98dx8xxx-and-98dx4xxx-series}

以下设备基于 **Marvell 98DX8xxx**、**98DX4xxx** 交换芯片或 **98DX325x** 型号。

<WideTable>

| 交换芯片 | 型号 | IPv4 路由 <sup>1</sup> | IPv4 主机 <sup>5</sup> | IPv6 路由 <sup>1</sup> | IPv6 主机 <sup>5</sup> | 下一跳 | IPv4 Fasttrack 连接 <sup>2, 3, 4</sup> | IPv4 NAT 条目 <sup>2, 4</sup> | IPv4 Fasttrack/NAT、VXLAN 卸载 每 VLAN 数据包/字节计数器 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **98DX8208** | CRS309-1G-8S+IN | 最多 36K | 最多 16K | 最多 6K | 最多 12K | 8K | 4.5K | 3.9K | + |
| **98DX8212** | CRS312-4C+8XG-RM | 最多 36K | 最多 16K | 最多 6K | 最多 12K | 8K | 2.25K | 2.25K | + |
| **98DX8216** | CRS317-1G-16S+RM | 最多 240K | 最多 64K | 最多 40K | 最多 48K | 8K | 4.5K | 4K | + |
| **98DX8332** | CRS326-24S+2Q+RM <br/> CRS326-4C+20G+2Q+RM | 最多 36K | 最多 16K | 最多 6K | 最多 12K | 8K | 2.25K | 2.25K | + |
| **98DX3257** <sup>6</sup> | CRS354-48G-4S+2Q+RM <br/> CRS354-48P-4S+2Q+RM | 最多 36K | 最多 16K | 最多 6K | 最多 12K | 8K | 2.25K | 2.25K | + |
| **98DX4310** | CRS504-4XQ (IN/OUT) <br/> CRS510-8XS-2XQ-IN <br/> RDS2216-2XG-4S+4XS-2XQ | 最多 120K | 最多 64K | 最多 20K | 最多 48K | 8K | 4.5K | 4K | + |
| **98CX8410** | CRS520-4XS-16XQ-RM | 最多 240K | 最多 64K | 最多 40K | 最多 48K | 8K | 4.5K | 4K | + |
| **98DX3255** <sup>6</sup> | CCR2116-12G-4S+ | 最多 36K | 最多 16K | 最多 6K | 最多 12K | 8K | 2.25K | 2.25K | + |
| **98DX8525** | CCR2216-1G-12XS-2XQ <br/> CRS518-16XS-2XQ-RM | 最多 120K | 最多 64K | 最多 20K | 最多 48K | 8K | 4.5K | 4K | + |

</WideTable>

<sup>1</sup> Depends on the complexity of the routing table. Whole-byte IP prefixes (/8, /16, /24, etc.) occupy less HW space than others (e.g., /22). When the Routing HW table gets full, only routes with longer subnet prefixes are offloaded (/30, /29, /28, etc.) while the CPU processes the shorter prefixes. Users can fine-tune what routes to offload via routing filters (for dynamic routes) or suppressing hardware offload per switch port, static route or VLAN. IPv4 and IPv6 routing tables share the same hardware memory.  
<sup>2</sup> When the HW limit of Fasttrack or NAT entries is reached, other connections will fall back to the CPU. MikroTik's smart connection offload algorithm ensures that the connections with the most traffic are offloaded to the hardware.  
<sup>3</sup> Fasttrack connections share the same HW memory with ACL rules. Depending on the complexity, one ACL rule may occupy the memory of 3-6 Fasttrack connections.  
<sup>4</sup> If a Fasttrack connection requires Network Address Translation, a hardware NAT entry is created. The hardware supports both SRCNAT and DSTNAT.  
<sup>5</sup> DX4000/DX8000 switch chips store directly connected hosts, IPv4 /32, and IPv6 /128 route entries in the FDB table rather than the routing table. The HW memory is shared between regular FDB L2 entries (MAC), IPv4, and IPv6 addresses. The number of hosts is also limited by max-neighbor-entries in [IP Settings](/docs/cli-reference/ip/settings) / [IPv6 Settings](/docs/cli-reference/ipv6/settings).  
<sup>6</sup> The switch chip has a feature set of the DX8000 series.

#### 部分卸载 {#partial-offloading-1}

**98DX8xxx**、**98DX4xxx** 使用完全不同的路由表。它们不是基于前缀，而是需要卸载路由索引。整个 IPv4 地址范围（IPv6 相同）都必须建立索引，即 0.0.0.0 - 255.255.255.255。添加新路由条目会触发索引重建，并根据路由表的复杂度增加 0-5 个条目的硬件内存占用。因此无法给出精确数字。例如，某些包含 240K 条目的路由表可以完全卸载到 CRS317 HW，而另一些只有 160K 条目的路由表几乎无法容纳。只有尝试后才会知道结果。

对整个 IP 地址范围（0.0.0.0 - 255.255.255.255）建立索引时，可以卸载任意数量的路由，前提是还存在一条使用相同 next-hop 的默认路由（0.0.0.0/0）。

例如，在一台 CCR2216 路由器上创建了约 950k 条 /30 前缀路由，全部使用相同的 next-hop，并配合一条默认路由。结果是所有路由都被卸载，而 lpm-usage 仍保持很低。

```routeros
[admin@MikroTik] > /interface/ethernet/switch/l3hw-settings/advanced/monitor 
        ipv4-routes-total: 942338
           ipv4-routes-hw: 942326
          ipv4-routes-cpu:     11
  ipv4-shortest-hw-prefix:      0
               ipv4-hosts:      1
         route-queue-size:      0
         route-queue-rate:      0
       route-process-rate:      0
              nexthop-cap:   8192
            nexthop-usage:     85
    vxlan-mtu-packet-drop:      0
     fasttrack-ipv4-conns:      0
     fasttrack-queue-size:      0
     fasttrack-queue-rate:      0
   fasttrack-process-rate:      0
   fasttrack-hw-min-speed:      0
   fasttrack-hw-offloaded:      0
    fasttrack-hw-unloaded:      0
                  lpm-cap:  27200
                lpm-usage:     11
             lpm-bank-cap:   1360
           lpm-bank-usage:      1
                                0
                                0
                                0
                                1
                                0
                                0
                                0
                                4
                                0
                                0
                                0
                                5
                                0
                                0
                                0
                                0
                                0
                                0
                                0
                  pbr-cap:   8192
                pbr-usage:      0
             pbr-lpm-bank:      2
                nat-usage:      0
```

但是，如果地址范围中存在“间隙”，例如未使用默认路由或存在多个 next-hop，则会消耗 HW 表。当路由 HW 表满时，只有具有更长子网前缀的路由会被卸载（/30、/29、/28 等），较短前缀则由 CPU 处理。当默认路由被禁用或使用不同 next-hop 时，会出现以下情况：HW 表中只能容纳 37k 条 /30 前缀路由。这是 CCR2216 的最差情况。

```routeros
[admin@MikroTik] > /interface/ethernet/switch/l3hw-settings/advanced/monitor 
        ipv4-routes-total: 942337
           ipv4-routes-hw:  37729
          ipv4-routes-cpu: 904608
  ipv4-shortest-hw-prefix:     30
               ipv4-hosts:      1
         route-queue-size:      0
         route-queue-rate:      0
       route-process-rate:      0
              nexthop-cap:   8192
            nexthop-usage:     85
    vxlan-mtu-packet-drop:      0
     fasttrack-ipv4-conns:      0
     fasttrack-queue-size:      0
     fasttrack-queue-rate:      0
   fasttrack-process-rate:      0
   fasttrack-hw-min-speed:      0
   fasttrack-hw-offloaded:      0
    fasttrack-hw-unloaded:      0
                  lpm-cap:  27200
                lpm-usage:  22392
             lpm-bank-cap:   1360
           lpm-bank-usage:   1022
                             1033
                             1027
                             1028
                             1221
                             1033
                             1040
                              678
                             1358
                             1245
                             1254
                             1242
                             1246
                             1249
                             1273
                             1260
                             1101
                             1024
                             1031
                             1027
                  pbr-cap:   8192
                pbr-usage:      0
             pbr-lpm-bank:      2
                nat-usage:      0
```

在许多情况下，默认行为“仅卸载具有更长子网前缀的路由”并不理想，尤其是 CPU 处理的路由与 HW 卸载的路由比例过高时。发生这种情况时，数据包被硬件转发的概率会显著下降。

如果 HW 内存不足并发生部分卸载，作为网络管理员，更好的做法是仅卸载承载最多流量的路由，将负载较低的路由保留在 CPU 上，不要让部分卸载自然发生。

幸运的是，有多种方法可以管理这一点。可以使用每交换机端口和静态路由抑制，以及[使用多种属性过滤动态路由](/docs/7.24/user-guides/routing-and-networking-protocols/route-selection-and-filtering)。一个示例是使用 as-path 过滤负载最高的前缀（Google、Meta），同时对所有其他路由启用 L3HW 抑制。

### CRS8xx：Switch 98DX7xxx 系列 {#crs8xx-switch-98dx7xxx-series}

以下设备基于 **Marvell 98DX7xxx** 交换芯片型号。

:::danger
以下功能的软件支持仍在开发中，尚不可用：

- FastTrack 和 NAT 连接卸载
- VXLAN 卸载
:::

<WideTable>

| 交换芯片 | 型号 | IPv4 路由 <sup>1</sup> | IPv4 主机 <sup>2</sup> | IPv6 路由 <sup>1</sup> | IPv6 主机 <sup>2</sup> | 下一跳 | IPv4 Fasttrack 连接 | IPv4 NAT 条目 | VXLAN 卸载 | 每 VLAN 数据包/字节计数器 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **98DX7335** | CRS812-8DS-2DQ-2DDQ-RM | 最多 240K | 最多 64K | 最多 40K | 最多 48K | 16K | 待公布 | 待公布 | 待公布 | + |
| **98DX7335** | CRS804-4DDQ-hRM | 最多 240K | 最多 64K | 最多 40K | 最多 48K | 16K | 待公布 | 待公布 | 待公布 | + |

</WideTable>

---

<sup>1</sup> Depends on the complexity of the routing table. Whole-byte IP prefixes (/8, /16, /24, etc.) occupy less HW space than others (e.g., /22). When the Routing HW table gets full, only routes with longer subnet prefixes are offloaded (/30, /29, /28, etc.) while the CPU processes the shorter prefixes. Users can fine-tune what routes to offload via routing filters (for dynamic routes) or suppressing hardware offload of static routes. IPv4 and IPv6 routing tables share the same hardware memory.  
<sup>2</sup> 98DX7xxx switch chips store directly connected hosts, IPv4 /32 route entries, and IPv6 /128 route entries in the FDB table rather than the routing table. The HW memory is shared between regular FDB L2 entries (MAC), IPv4 addresses, and IPv6 addresses. The number of hosts is also limited by max-neighbor-entries in [IP Settings](/docs/cli-reference/ip/settings) / [IPv6 Settings](/docs/cli-reference/ipv6/settings).
