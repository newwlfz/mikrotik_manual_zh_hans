---
title: "GPEN21 系列手册"
description: "MikroTik GPEN21 智能 PoE 供电器和中继器的 SwOS Lite 手册：功能、端口设置、VLAN 和交换机管理。"
source: https://manual.mikrotik.com/docs/7.24/bridging-and-switching/swos/gpen21
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T11:05:14.673Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 摘要 {#summary}

GPEN21 是一款智能供电器，可作为高级软件控制的中继器。它不仅可以通过 PoE 为上行设备供电，还提供一系列实用的软件功能。GPEN21 具有一个 Ethernet 端口和一个用于光纤连接的 SFP 端口。用户可以选择使用 GPEN21 为光模块供电以上联运营商，也可以提供 PoE 为 Ethernet 上行供电（使用我们的 GPeR 和/或 netPower 产品）。GPEN21 设备可以牢固安装在墙壁或通信机柜上。Ethernet 线缆可以根据需要直接从底部线缆开口引出，或穿入墙内。

SwOS Lite 是专为管理 MikroTik GPEN21 产品而设计的操作系统。GPEN21 仅支持 SwOS Lite 操作系统。

---

## GPEN21 系列功能 {#gpen21-series-features}

| 功能 | 描述 |
| --- | --- |
| **转发** | 全非阻塞线速交换<br/>Host 表中最多 2k 个 MAC 表项 ¹<br/>Forwarding Database 仅基于 SVL 工作<br/>支持巨型帧 - 10222 字节 |
| **监控** | SNMP<br/>链路故障检测<br/>SFP 诊断<br/>接口统计 |
| **VLAN** | 完全兼容 IEEE802.1Q<br/>基于端口的 VLAN<br/>最多 250 个 VLAN 表项（受 SwOS 限制）<br/>VLAN 过滤 |
| **安全** | Port Lock<br/>广播风暴控制 |
| **服务质量（QoS）** | 入站流量限制<br/>出站流量限制 |
| **访问控制列表** | 入站 ACL 表<br/>最多 32 条 ACL 规则（受 SwOS 限制）<br/>基于端口、L2、L3、L4 协议头字段进行分类<br/>ACL 动作包括过滤、转发和修改协议头字段 |

¹ Host 表限制不会影响转发，因为即使达到 MAC 学习限制，数据包仍会在上游端口和下游端口之间双向发送。

---

## 连接到设备 {#connecting-to-the-device}

打开 Web 浏览器并输入设备的 IP 地址（默认为 192.168.88.1），将显示登录界面。设备也可以运行 DHCP 客户端，请检查 DHCP 服务器是否分配了其他 IP 地址。

![Gpen21 login](/img/409dd330e4b344ae.webp)

SwOS 默认 IP 地址：**192.168.88.1**，用户名：**admin**，无密码。

[MikroTik Neighbor Discovery](/docs/system-information-and-utilities/neighbor-discovery) 可用于发现 MikroTik 交换机的 IP 地址。不支持 LLDP。

---

## 接口概述 {#interface-overview}

SwOS 接口菜单由多个选项卡组成，具体取决于设备型号。以下是所有可能的 SwOS 菜单：Link、SFP、Forwarding、Stats、Errors、Hist、VLAN、VLANs、Hosts、SNMP、ACL、System 和 Upgrade。

SwOS 配置工具中的按钮说明：

- **Append** - 在列表末尾添加新项目
- **Apply All** - 应用当前配置更改
- **Cut** - 从列表中移除项目
- **Clear** - 重置项目属性
- **Discard Changes** - 移除未保存的配置
- **Insert** - 向列表中添加新项目（将其放在当前项目之前）
- **Sort** - 按 VLAN-ID 对 VLAN 表排序；按 MAC 地址对主机表排序
- **Change Password** - 更改设备密码
- **Logout** - 从当前设备退出登录
- **Reboot** - 重启设备
- **Reset Configuration** - 将配置重置为出厂默认值
- **Choose File** - 浏览升级或备份文件
- **Upgrade** - 使用所选文件升级设备固件
- **Download & Upgrade** - 自动尝试下载并升级固件，运行 Web 浏览器的 PC 应能访问 Internet
- **Restore Backup** - 使用所选备份文件恢复设备
- **Save Backup** - 从设备生成并下载备份文件

> **Note:** 每台设备都有专用固件，不能安装到其他系列型号上！
>
> - GPEN21 支持 SwOS Lite v2.13 及更高版本。

---

## 系统 {#system}

System Tab 执行以下功能：

- 设备的常规信息
- 设备管理
- 配置重置
- 备份和还原配置

> **注意：** SwOS 使用简单算法确保 TCP/IP 通信——它只回复数据包来源的 IP 和 MAC 地址。这样，设备本身无需 Default Gateway。

![Gpen21 system](/img/d54c34af2163e92c.webp)

| 属性 | 说明 |
| --- | --- |
| **Address Acquisition** | 指定要使用的地址获取方法：<br/><code>DHCP with fallback</code> - 设备尝试从 DHCP 服务器请求 IPv4 地址。如果请求失败，则可以使用 <strong>Static IP Address</strong> 值访问设备<br/><code>static</code> - 地址设置为 <strong>Static IP Address</strong> 值（仅 IPv4）<br/><code>DHCP only</code> - 设备使用 DHCPv4 客户端获取地址 |
| **Static IP Address** | 当 **Address Acquisition** 设置为 `DHCP with fallback` 或 `static` 时设备的 IP 地址 |
| **Identity** | 设备名称（用于 Mikrotik Neighbor Discovery 协议） |
| **Allow From** | 可访问设备的 IP 地址。默认值为 `0.0.0.0/0` - 任意地址 |
| **Allow From Ports** | 可访问设备的端口列表 |
| **Allow From VLAN** | 可访问服务的 VLAN ID。请先配置 VLAN 和 VLAN 页面 |
| **Watchdog** | 启用或禁用系统 Watchdog。发生故障时，它将重置设备的 CPU |
| **Mikrotik Discovery Protocol** | 启用或禁用 Mikrotik Neighbor Discovery 协议 |
| **Dark Mode** | 禁用或启用设备上的所有 LED |
| **MAC Address** | 设备的 MAC 地址（只读） |
| **Serial Number** | 设备的序列号（只读） |
| **Board Name** | 设备的 MikroTik 型号名称（只读） |
| **Uptime** | 当前设备运行时间（只读） |
| **PoE Out Mode** | 指定 PoE-Out 状态：<br/><code>auto-on</code> - 主板将尝试检测是否可以向端口供电。要上电，备用线对上的电阻应在 3kΩ 至 26.5kΩ 范围内<br/><code>forced-on</code> - 移除检测范围。因此以太网供电将始终开启<br/><code>off</code> - 关闭该端口的所有检测和供电 |
| **PoE Out Status** | 显示端口上的当前 PoE-Out 状态（只读） |

### 密码和备份 {#password-and-backup}

![Swos system3 css326](/img/3ba4a76afdcc03bc.webp)

---

## 链接 {#link}

Link Tab 允许你配置每个接口设置并监控链路状态。

![Gpen21 link](/img/5ff6c176083c3282.webp)

| 属性 | 说明 |
| --- | --- |
| **Enabled** | 启用或禁用端口 |
| **Name** | 可编辑的端口名称 |
| **Link Status** | 当前链路状态（只读） |
| **Auto Negotiation** | 启用或禁用自动协商 |
| **Speed** | 显示协商后的速率，或允许手动更改端口的速率设置（需要禁用自动协商） |
| **Full Duplex** | 显示协商后的双工模式，或允许手动更改端口的双工模式（需要禁用自动协商） |
| **Hops** | 显示链路中的 GPER 中继器数量 |
| **Last Hop** | 如果链路终止，显示最后一个 GPER 中继器的编号 |
| **Length** | 如果链路终止，显示线缆长度（米） |
| **Fault At** | 如果线缆损坏但链路仍处于活动状态，显示到故障点的距离（米） |
| **Cable Pairs** | 显示线缆线对的四个位置及其状态：`O` - 开路；`S` - 短路；`P` - 极性反接 |

该设备支持最大 10222 字节的 Jumbo 帧。SwOS Lite 设备不支持手动降低 MTU 设置。

---

## SFP

SFP 选项卡可用于监控 SFP 模块的状态。

![Gpen21 sfp](/img/be292d329c1e86cf.webp)

---

## Forwarding

Forwarding Tab 提供设备端口之间的高级转发选项、端口锁定、带宽限制和广播风暴控制功能。

![Gpen21 forwarding](/img/cd3fc931cb10de58.webp)

| 属性 | 描述 |
| --- | --- |
| **Port Lock** | <code>Port Lock</code> - 启用或禁用该端口上的 MAC 地址学习。启用该选项时，将限制 MAC 地址学习，应配置静态 MAC 地址。任何源 MAC 地址未知的接收帧都将被丢弃。<br/><code>Lock On First</code> - 允许从接收到的第一个帧学习源 MAC 地址；该属性应与 <code>Port Lock</code> 一起使用。每次接口状态变化时，第一个 MAC 地址的学习都会重置。 |
| **Uplink Port** | `Set As Uplink Port` - 允许在 PoE-in（Port1）、PoE-out（Port2）或 SFP 接口之间更改 uplink 端口。下游端口收到的数据包仅转发到 uplink 端口；只能使用一个接口作为 uplink。 |
| **Broadcast Storm Control** | <code>Storm Rate</code> - 限制接口发送的广播数据包数量。速率以每秒位数（bps）计量。<br/><code>Limit Unknown Unicast</code> - 将主机表中没有对应条目的单播数据包纳入 <code>Storm Rate</code> 限制。 |
| **Bandwidth Limit** | <code>Ingress Rate</code> - 限制进入该端口的流量（bps）<br/><code>Egress Rate</code> - 限制离开该端口的流量（bps） |

> **注意：** 可以按端口限制 ingress/egress 流量。ingress 流量使用 policer，egress 流量使用 shaper。ingress policer 通过丢弃数据包来控制接收流量——超过定义限制的所有流量都将被丢弃。这可能会影响终端主机上的 TCP 拥塞控制机制，实际达到的带宽可能低于定义值。egress shaper 会尝试将超过限制的数据包排队，而不是直接丢弃。最终，当输出队列满时也会丢弃数据包；不过，这应能更好地利用定义的吞吐量。

---

## 统计、错误和直方图 {#stats-errors-and-histogram}

这些菜单提供有关接收和发送数据包的详细信息。

![Gpen21 stats](/img/8c24a317a5b42b3a.webp)

![Gpen21 errors](/img/3d5a295488158c9c.webp)

![Gpen21 hist](/img/077b5e39de0381bb.webp)

---

## VLAN 和 VLANs {#vlan-and-vlans}

设备端口的 VLAN 配置。

![Gpen21 vlan](/img/d06a967fc11b4004.webp)

| 属性 | 说明 |
| --- | --- |
| **VLAN Mode** (*disabled \| optional \| strict*；默认：**optional**) | VLAN 过滤模式；这些选项与 egress 端口相关（strict 模式除外）。<br/><code>disabled</code> - 不使用 VLAN 表。设备会在 egress 端口丢弃带 VLAN 标签的数据包。如果数据包带有 VLAN 标签，并且 VLAN ID 与 egress 端口上的 <code>Default VLAN ID</code> 匹配，则在 <code>VLAN Receive=any</code> 时，设备将移除 VLAN 标签并转发该数据包。<br/><code>optional</code> - 禁用 VLAN 过滤。将 VLAN 标签 ID 不在 VLAN 表中的数据包，按与不带 VLAN 标签的数据包相同的方式处理。<br/><code>strict</code> - 启用 VLAN 过滤并进行额外的 ingress 过滤，检查 ingress 端口是否为 VLAN 表中所接收 VLAN ID 的成员。ingress 端口上接收到的 VLAN ID 与 VLAN 表不匹配的数据包将被丢弃。必须为 access 端口指定 Default VLAN ID，因为它将用于为该端口的 ingress 流量添加标签，并为 egress 流量移除标签。 |
| **VLAN Receive** (*any \| only tagged \| only untagged*；默认：**optional**) | 根据 VLAN 标签是否存在来过滤接收到的流量。<br/><code>any</code> - 允许指定端口上同时存在带标签和不带标签的数据包<br/><code>only tagged</code> - 仅允许带 VLAN 标签的数据包。“Default VLAN ID”将不起作用，因为它仅适用于不带标签的流量<br/><code>only untagged</code> - 仅允许不带 VLAN 标签的数据包 |
| **Default VLAN ID** (*integer: 1..4095*；默认：**1**) | 设备会将接收到的不带标签数据包放入“Default VLAN ID”VLAN。仅对不带标签的流量生效，并且仅在 **VLAN Receive** 设置为“any”或“only untagged”时生效。它不适用于带标签的流量。该参数通常用于为 access 端口分配特定 VLAN。当数据包的 VLAN ID 与 Default VLAN ID 匹配时，也用于移除 egress 流量的标签。 |
| **Force VLAN ID** (*yes \| no*；默认：**no**) | 为所有 ingress 流量（带标签和不带标签）分配 `Default VLAN ID` 值。在所有 VLAN Mode 下均生效。如果端口接收到带标签的流量，并且 `Default VLAN ID` 设置为 1，则启用该参数后，egress 流量将不带标签。 |

设备端口的 VLAN 成员配置。

![Gpen21 vlans](/img/f6b4c2a55ea8de5f.webp)

| 属性 | 说明 |
| --- | --- |
| **VLAN ID** (*integer: 1..4094*；默认：**0**) | 要分配端口的 VLAN ID |
| **Members** (*ports*；默认：**none**) | 允许在指定 VLAN 上转发流量的端口组 |

### VLAN 配置示例 {#vlan-configuration-examples}

VLAN 配置示例取自 [CSS610 switch user manual](https://help.mikrotik.com/docs/display/SWOS/CSS610+series+Manual#CSS610seriesManual-VLANConfigurationExample)；不过，相同原则也适用于 GPEN21 设备。

#### Trunk 和 Access 端口 {#trunk-and-access-ports}

![Access ports](/img/dcbdce357964f958.webp)

1. 在 VLANs 菜单中添加 VLAN 条目并指定端口成员。

![Css610 vlans](/img/dd2937f9ae0a3398.webp)

1. 在 VLAN 菜单中，为规划的 access 端口配置 Default VLAN ID（untagged），选择正确的 VLAN Receive 设置（Port2 仅 tagged，Port6-8 仅 untagged），并启用严格 VLAN 过滤，以确保只有允许的 VLAN 可以通过端口。

![Css610 vlan](/img/8fb78913b7a9e9ab.webp)

#### Trunk 和 Hybrid 端口 {#trunk-and-hybrid-ports}

![Hybrid ports](/img/90b987271e134d95.webp)

1. 在 VLANs 菜单中添加 VLAN 条目并指定端口成员关系。

![Css610 vlans hybrid](/img/167fe7083c6b6f90.webp)

1. 在 VLAN 菜单中，为规划的 hybrid 端口配置 Default VLAN ID（用于 untagged VLAN），选择正确的 VLAN Receive 设置（Port2 仅 tagged，Port6-8 任意），并启用严格 VLAN 过滤，以确保只有允许的 VLAN 可以通过端口。

![Css610 vlan hybrid](/img/2d8b9483f5a9f2de.webp)

#### 管理访问 {#management-access}

在本示例中，将创建 VLAN 200 上的设备管理访问。配置方案与“**Trunk 和 Access 端口**”相同，步骤 **1.、2.** 完全一致。额外的第 **3** 步需要在 System 菜单中指定管理 VLAN ID。应用配置后，设备将仅响应 Port2 上 tagged VLAN 200 数据包和 Port6 上的 untagged 数据包。DHCP 客户端也将在指定的 VLAN ID 中工作。

![Css610 system vlan](/img/2a14134bc28aaf54.webp)

> **警告：** 如果 VLAN 设置配置不正确，更改管理 VLAN 可能会完全禁用设备管理访问。更改此设置前请保存配置备份，如果管理访问丢失，请使用 [Reset and Reinstall](#reset-and-reinstall)。

---

## Hosts

此表表示动态学习到的 MAC 地址到端口的映射条目。它可以包含两类条目：动态和静态。动态条目会自动添加——这也称为学习过程：当设备从某个端口收到数据包时，它会将该数据包的源 MAC 地址以及收到该数据包的端口添加到主机表中，因此当带有某个目标 MAC 地址的数据包进入时，它知道应将数据包转发到哪个端口。如果主机表中不存在目标 MAC 地址，则会将数据包转发到组中的所有端口。动态条目大约 5 分钟后超时。

如果已存在具有相同 MAC 地址的动态条目，静态条目将接管该动态条目。添加静态条目还可使用更多功能。

![Gpen21 hosts](/img/63754074b05b2fc7.webp)

**静态主机属性**

| 属性 | 描述 |
| --- | --- |
| **Ports** | 数据包应转发到的端口 |
| **MAC** | MAC 地址 |

**动态主机属性（只读）**

| 属性 | 描述 |
| --- | --- |
| **Port** | 数据包应转发到的端口 |
| **MAC** | 学习到的 MAC 地址 |

---

## SNMP

SwOS 支持 SNMP v1 和 v2c（对 GetRequest、GetNextRequest 和 GetBulkRequest 的响应），并使用 IF-MIB、SNMPv2-MIB、BRIDGE-MIB 和 MIKROTIK-MIB（仅用于 health、PoE-out 和 SFP 诊断）。不支持 SNMP trap 和写入 SwOS 配置。

可用的 SNMP 数据：

- 系统信息
- 系统运行时间
- 端口状态
- 接口统计信息
- 主机表信息

![Swos snmp2 1](/img/f3b87569bbcad587.webp)

| 属性 | 说明 |
| --- | --- |
| **Enabled** | 启用或禁用 SNMP 服务 |
| **Community** | SNMP community 名称 |
| **Contact Info** | NMS 的联系信息 |
| **Location** | NMS 的位置信息 |

---

## ACL

访问控制列表（ACL）规则表是一个非常强大的工具，可基于 L2、L3 和 L4 协议报头字段条件，以线速执行数据包过滤、转发和 VLAN 标记。每条规则包含条件部分和动作部分。

![Gpen21 acl](/img/c6424e2e468a15af.webp)

**条件部分参数**

| 属性 | 说明 |
| --- | --- |
| **From** | 数据包进入的端口 |
| **MAC Src** | 源 MAC 地址和掩码 |
| **MAC Dst** | 目的 MAC 地址和掩码 |
| **Ethertype** | 封装在以太网帧载荷中的协议 |
| **VLAN** | VLAN 报头存在状态：`any` / `present` / `not present` |
| **VLAN ID** | VLAN 标签 ID |
| **Priority** | VLAN 标签中的优先级 |
| **IP Src**（IP/netmask:port） | 源 IPv4 地址、网络掩码和 L4 端口号 |
| **IP Dst**（IP/netmask:port） | 目的 IPv4 地址、网络掩码和 L4 端口号 |
| **Protocol** *（integer）* | IP 协议 |
| **DSCP** | IP DSCP 字段 |

**动作部分参数**

| 属性 | 说明 |
| --- | --- |
| **Drop** | 丢弃数据包 |
| **Set VLAN ID** | 如果存在 VLAN 标签，则更改 VLAN 标签 ID |
| **Priority** | 如果存在 VLAN 标签，则更改 VLAN 标签优先级位 |

---

## 重置和重新安装 {#reset-and-reinstall}

GPEN21 内置备份 SwOS 固件，当标准固件损坏或升级失败时可加载该固件：

- 设备启动时按住 Reset 按钮几秒，将重置配置并加载备用固件。Reset 按钮位于前盖后面。
- 加载备用固件后，可以使用 Web 浏览器连接到 192.168.88.1（或从 DHCP 服务器租用的地址），并安装新的 SwOS 固件。
