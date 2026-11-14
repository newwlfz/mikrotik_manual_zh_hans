---
sidebar_key: "bridging-and-switching/swos/gpen21"
sidebar_position: 4
title: "GPEN21 系列手册"
sidebar_label: "GPEN21 系列手册"
description: "适用于 MikroTik GPEN21 智能 PoE 供电注入器和中继器的 SwOS Lite 手册：功能、端口设置、VLAN 和交换机管理。"
source: https://manual.mikrotik.com/docs/bridging-and-switching/swos/gpen21
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#summary}

GPEN21 是一款智能供电注入器，可作为高级软件控制的中继器使用。它不仅可以通过 PoE 为上行设备供电，还可以提供一系列有用的软件功能。GPEN21 具有以太网端口和 SFP 端口，用于光纤连接。客户可以选择使用 GPEN21 为光模块供电，以上行连接到提供商；也可以提供 PoE，为以太网上行连接到提供商供电（使用我们的 GPeR 和/或 netPower 产品）。GPEN21 设备可以安全地安装到墙壁或通信机柜上。以太网线缆可以直接穿过底部线缆开口，也可以布入墙内，按需选择。

SwOS Lite 是专为管理 MikroTik GPEN21 产品而设计的操作系统。GPEN21 仅支持 SwOS Lite 操作系统。

---

## GPEN21 系列特性 {#gpen21-series-features}

| 功能 | 描述 |
| --- | --- |
| **Forwarding** | 全非阻塞线速交换；Host 表中最多 2k 个 MAC 条目 ¹；转发数据库仅基于 SVL 工作；支持巨型帧 - 10222 字节 |
| **Monitoring** | SNMP；链路故障检测；SFP 诊断；接口统计信息 |
| **VLAN** | 完全兼容 IEEE802.1Q；基于端口的 VLAN；最多 250 个 VLAN 条目（受 SwOS 限制）；VLAN 过滤 |
| **Security** | 端口锁定；广播风暴控制 |
| **Quality of Service (QoS)** | 入口流量限制；出口流量限制 |
| **Access Control List** | 入口 ACL 表；最多 32 条 ACL 规则（受 SwOS 限制）；基于端口、L2、L3、L4 协议头字段进行分类；ACL 动作包括过滤、转发和修改协议头字段 |

¹ Host 表限制不影响转发，因为即使达到 MAC 学习限制，数据包仍会从上游端口发送到下游端口，反之亦然。

---

## 连接到设备 {#connecting-to-the-device}

打开 Web 浏览器，输入设备的 IP 地址（默认 192.168.88.1），将出现登录界面。设备也可以运行 DHCP 客户端，请检查 DHCP 服务器是否已分配其他 IP 地址。

![Gpen21 login](/img/409dd330e4b344ae.webp)

SwOS 默认 IP 地址：**192.168.88.1**，用户名：**admin**，并且没有密码。

[邻居发现](../../system-information-and-utilities/neighbor-discovery.md) 可用于发现 Mikrotik 交换机的 IP 地址。不支持 LLDP。

---

## 接口概览 {#interface-overview}

SwOS 界面菜单由多个选项卡组成，具体取决于设备型号。以下是所有可能的 SwOS 菜单：Link、SFP、Forwarding、Stats、Errors、Hist、VLAN、VLANs、Hosts、SNMP、ACL、System 和 Upgrade。

SwOS 配置工具中按钮的说明：

- **Append** - 将新项目添加到列表末尾
- **Apply All** - 应用当前配置更改
- **Cut** - 从列表中移除项目
- **Clear** - 重置项目属性
- **Discard Changes** - 移除未保存的配置
- **Insert** - 将新项目添加到列表（放在当前项目之前）
- **Sort** - 按 VLAN ID 对 VLAN 表排序；按 MAC 地址对 Host 表排序
- **Change Password** - 更改设备密码
- **Logout** - 从当前设备注销
- **Reboot** - 重启设备
- **Reset Configuration** - 将配置重置为出厂默认值
- **Choose File** - 浏览升级或备份文件
- **Upgrade** - 使用选定的文件升级设备固件
- **Download & Upgrade** - 自动尝试下载并升级固件；运行 Web 浏览器的 PC 应能够访问互联网
- **Restore Backup** - 使用选定的备份文件恢复设备
- **Save Backup** - 生成并下载设备的备份文件

> **注意：** 每台设备都有自己的固件，不能安装在其他系列型号上！
>
> - GPEN21 支持 SwOS Lite v2.13 及更高版本。

---

## 系统 {#system}

System 选项卡执行以下功能：

- 设备的一般信息
- 设备管理
- 配置重置
- 备份和恢复配置

> **注意：** SwOS 使用简单算法来确保 TCP/IP 通信——它只回复数据包来源的同一 IP 和 MAC 地址。这样设备本身就不需要默认网关。

![Gpen21 system](/img/d54c34af2163e92c.webp)

| 属性 | 描述 |
| --- | --- |
| **Address Acquisition** | 指定要使用的地址获取方法：<br/><code>DHCP with fallback</code> - 交换机每秒发送 DHCP 请求，在没有 DHCP 服务器应答时，立即使用配置的 <strong>Static IP Address</strong> 值。当服务器应答时，交换机在 1-2 秒内获得租约，并在租约时间的一半时续租。如果续租无人应答，交换机在 5 秒内恢复到 <strong>Static IP Address</strong> 值，并恢复每秒发送请求。<br/><code>static</code> - 地址设置为 <strong>Static IP Address</strong> 值（仅 IPv4）<br/><code>DHCP only</code> - 交换机使用 DHCPv4 客户端获取地址 |
| **Static IP Address** | 如果 **Address Acquisition** 设置为 `DHCP with fallback` 或 `static`，则为设备的 IP 地址 |
| **Identity** | 设备名称（用于 Mikrotik Neighbor Discovery protocol） |
| **Allow From** | 可访问设备的 IP 地址。默认值为 `0.0.0.0/0` - 任意地址 |
| **Allow From Ports** | 设备端口列表，可通过这些端口访问设备 |
| **Allow From VLAN** | 可访问该服务的 VLAN ID。请确保先配置 VLAN 和 VLAN 页面 |
| **Watchdog** | 启用或禁用系统 Watchdog。在发生故障情况时，它将重置设备的 CPU |
| **Mikrotik Discovery Protocol** | 启用或禁用 Mikrotik Neighbor Discovery protocol |
| **Dark Mode** | 禁用或启用设备上的所有 LED |
| **MAC Address** | 设备的 MAC 地址（只读） |
| **Serial Number** | 设备的序列号（只读） |
| **Board Name** | 设备的 MikroTik 型号名称（只读） |
| **Uptime** | 当前设备运行时间（只读） |
| **PoE Out Mode** | 指定 PoE-Out 状态：<br/><code>auto-on</code> - 板卡将尝试检测是否可以向端口供电。要发生上电，备用线对上应存在 3kΩ 至 26.5kΩ 范围内的电阻<br/><code>forced-on</code> - 移除检测范围。因此，以太网供电将始终开启<br/><code>off</code> - 该端口的所有检测和供电均关闭 |
| **PoE Out Status** | 显示端口上当前的 PoE-Out 状态（只读） |

### 密码和备份 {#password-and-backup}

![Swos system3 css326](/img/3ba4a76afdcc03bc.webp)

---

## 链路 {#link}

Link 选项卡允许你配置每个接口的设置并监控链路状态。

![Gpen21 link](/img/5ff6c176083c3282.webp)

| 属性 | 说明 |
| --- | --- |
| **Enabled** | 启用或禁用端口 |
| **Name** | 可编辑的端口名称 |
| **Link Status** | 当前链路状态（只读） |
| **Auto Negotiation** | 启用或禁用自动协商 |
| **Speed** | 显示协商后的速度，或允许手动更改端口的速度设置（需要禁用自动协商） |
| **Full Duplex** | 显示协商后的双工模式，或允许手动更改端口的双工模式（需要禁用自动协商） |
| **Hops** | 显示链路中的 GPER 中继器数量 |
| **Last Hop** | 如果链路终止，显示最后一个 GPER 中继器的编号 |
| **Length** | 如果链路终止，显示线缆长度（米） |
| **Fault At** | 如果线缆损坏但链路仍活动，显示到故障点的距离（米） |
| **Cable Pairs** | 显示线缆线对的四个位置及其状态：`O` - 开路；`S` - 短路；`P` - 反极性 |

设备支持最大 10222 字节的 Jumbo 帧。SwOS Lite 设备不支持手动降低 MTU 设置。

---

## SFP {#sfp}

SFP 选项卡允许你监控 SFP 模块的状态。

![Gpen21 sfp](/img/be292d329c1e86cf.webp)

---

## 转发 {#forwarding}

Forwarding 选项卡提供设备端口之间的高级转发选项、端口锁定、带宽限制和广播风暴控制功能。

![Gpen21 forwarding](/img/cd3fc931cb10de58.webp)

| 属性 | 描述 |
| --- | --- |
| **Port Lock** | `Port Lock` - 启用或禁用此端口上的 MAC 地址学习。启用该选项后，将限制 MAC 地址学习，并且应配置静态 MAC 地址。任何源 MAC 地址未知的接收帧都将被丢弃。`Lock On First` - 允许从第一个接收帧中学习源 MAC 地址；此属性应与 `Port Lock` 一起使用。每次接口状态变化时，第一个 MAC 地址的学习都会重置。 |
| **Uplink Port** | `Set As Uplink Port` - 允许在 PoE-in（Port1）、PoE-out（Port2）或 SFP 接口之间更改上行端口。在下游端口接收的数据包仅转发到上行端口；只能使用单个接口作为上行链路。 |
| **Broadcast Storm Control** | `Storm Rate` - 限制接口发送的广播数据包数量。速率以比特每秒（bps）为单位。`Limit Unknown Unicast` - 将 Host 表中无条目的单播数据包纳入 `Storm Rate` 限制。 |
| **Bandwidth Limit** | `Ingress Rate` - 限制进入此端口的流量（bps）`Egress Rate` - 限制离开此端口的流量（bps） |

> **注意：** 可以按端口限制入方向/出方向流量。入方向流量使用 policer，出方向流量使用 shaper。入方向 policer 通过丢包来控制接收的流量 —— 所有超过所定义限制的流量都会被丢弃。这可能影响终端主机上的 TCP 拥塞控制机制，实际达到的带宽可能小于所定义的值。出方向 shaper 会尝试将超过限制的数据包排队，而不是丢弃它们。最终，当输出队列满时它也会丢弃数据包；不过，它应能更好地利用所定义的吞吐量。

---

## Stats、Errors 与 Histogram {#stats-errors-and-histogram}

这些菜单提供有关接收和发送数据包的详细信息。

![Gpen21 stats](/img/8c24a317a5b42b3a.webp)

![Gpen21 errors](/img/3d5a295488158c9c.webp)

![Gpen21 hist](/img/077b5e39de0381bb.webp)

---

## VLAN 与 VLANs {#vlan-and-vlans}

设备端口的 VLAN 配置。

![Gpen21 vlan](/img/d06a967fc11b4004.webp)

| 属性 | 描述 |
| --- | --- |
| **VLAN Mode** (*disabled \| optional \| strict*；默认：**optional**) | VLAN 过滤模式；这些选项与出端口相关（`strict` 模式除外）。`disabled` - 不使用 VLAN 表。设备会在出端口丢弃带有 VLAN 标签的数据包。如果数据包带有 VLAN 标签，且 VLAN ID 与出端口上的 `Default VLAN ID` 匹配，则在 `VLAN Receive=any` 时，设备会移除 VLAN 标签并转发该数据包。`optional` - 禁用 VLAN 过滤。对于 VLAN ID 不在 VLAN 表中的带标签数据包，按与无 VLAN 标签数据包相同的方式处理。`strict` - 启用 VLAN 过滤，并附加入口过滤，检查入端口是否为 VLAN 表中接收到的 VLAN ID 的成员。入端口上接收到的 VLAN ID 与 VLAN 表不匹配的数据包将被丢弃。必须为接入端口指定 Default VLAN ID，因为它将用于为某个端口的入口流量添加标签，并移除出口流量的标签。 |
| **VLAN Receive** (*any \| only tagged \| only untagged*；默认：**optional**) | 基于 VLAN 标签存在情况对接收流量进行过滤。`any` - 允许某个端口上的带标签和无标签数据包`only tagged` - 仅允许带有 VLAN 标签的数据包。"Default VLAN ID" 将不起作用，因为它仅适用于无标签流量`only untagged` - 仅允许不带 VLAN 标签的数据包 |
| **Default VLAN ID** (*整数：1..4095*；默认：**1**) | 设备会将接收到的无标签数据包放入 "Default VLAN ID" VLAN。仅对无标签流量有效，并且当 **VLAN Receive** 设置为 "any" 或 "only untagged" 时有效。它不适用于带标签流量。此参数通常用于为接入端口分配特定 VLAN。如果数据包的 VLAN ID 与 Default VLAN ID 匹配，它也会用于移除出口流量的标签。 |
| **Force VLAN ID** (*yes \| no*；默认：**no**) | 将所有入口流量（带标签和无标签）分配为 `Default VLAN ID` 值。在所有 VLAN 模式下均有效。如果端口接收带标签流量，且 `Default VLAN ID` 设置为 1，则使用此参数后，出口流量将不带标签。 |

设备端口的 VLAN 成员关系配置。

![Gpen21 vlans](/img/f6b4c2a55ea8de5f.webp)

| 属性 | 说明 |
| --- | --- |
| **VLAN ID** (*整数：1..4094*；默认：**0**) | 要为其分配端口的 VLAN ID |
| **Members** (*端口*；默认：**none**) | 允许在定义的 VLAN 上转发流量的端口组 |

### VLAN 配置示例 {#vlan-configuration-examples}

VLAN 配置示例取自 [CSS610 交换机用户手册](https://help.mikrotik.com/docs/display/SWOS/CSS610+series+Manual#CSS610seriesManual-VLANConfigurationExample)；不过，相同的原理也可应用于 GPEN21 设备。

#### Trunk 和 Access 端口 {#trunk-and-access-ports}

![Access ports](/img/dcbdce357964f958.webp)

1. 在 VLANs 菜单中添加 VLAN 条目并指定端口成员关系。

![Css610 vlans](/img/dd2937f9ae0a3398.webp)

1. 在 VLAN 菜单中为计划作为接入端口的端口（不带标签）配置 Default VLAN ID，选择正确的 VLAN Receive 设置（Port2 为 only tagged，Port6-8 为 only untagged），并启用 strict VLAN 过滤以确保只有被允许的 VLAN 能通过这些端口。

![Css610 vlan](/img/8fb78913b7a9e9ab.webp)

#### Trunk 和 Hybrid 端口 {#trunk-and-hybrid-ports}

![Hybrid ports](/img/90b987271e134d95.webp)

1. 在 VLANs 菜单中添加 VLAN 条目并指定端口成员关系。

![Css610 vlans hybrid](/img/167fe7083c6b6f90.webp)

1. 在 VLAN 菜单中为计划作为混合端口的端口（用于不带标签的 VLAN）配置 Default VLAN ID，选择正确的 VLAN Receive 设置（Port2 为 only tagged，Port6-8 为 any），并启用 strict VLAN 过滤以确保只有被允许的 VLAN 能通过这些端口。

![Css610 vlan hybrid](/img/2d8b9483f5a9f2de.webp)

#### 管理访问 {#management-access}

在此示例中，将创建 VLAN 200 上的设备管理访问。配置方案与“**Trunk and Access Ports**”相同，步骤 **1.、2.** 完全一样。额外的第 **3** 步要求在 System 菜单中指定管理 VLAN ID。应用配置后，设备将仅在 Port2 上响应带标签的 VLAN 200 数据包，并在 Port6 上响应无标签数据包。DHCP 客户端也将在指定的 VLAN ID 中工作。

![Css610 system vlan](/img/2a14134bc28aaf54.webp)

> **警告：** 如果 VLAN 设置配置不正确，更改管理 VLAN 可能会完全禁用对设备管理的访问。更改此设置前请保存配置备份，并在管理访问丢失时使用 [重置和重新安装](#reset-and-reinstall)。

---

## 主机 {#hosts}

此表表示动态学习到的 MAC 地址到端口的映射条目。它可以包含两种条目：动态和静态。动态条目会自动添加——这也称为学习过程：当设备从某个端口接收到数据包时，它会将该数据包的源 MAC 地址以及接收该数据包的端口添加到 Host 表，这样当带有特定目标 MAC 地址的数据包进入时，它就知道应该将数据包转发到哪个端口。如果 Host 表中不存在目标 MAC 地址，则会将数据包转发到组中的所有端口。动态条目大约需要 5 分钟超时。

如果已存在具有相同 MAC 地址的动态条目，静态条目将取代动态条目。添加静态条目还可获得更多功能。

![Gpen21 hosts](/img/63754074b05b2fc7.webp)

**静态主机属性**

| 属性 | 描述 |
| --- | --- |
| **端口** | 数据包应转发到的端口 |
| **MAC** | MAC 地址 |

**动态主机属性（只读）**

| 属性 | 描述 |
| --- | --- |
| **端口** | 数据包应转发到的端口 |
| **MAC** | 学习到的 MAC 地址 |

---

## SNMP {#snmp}

SwOS 支持 SNMP v1 和 v2c（对 GetRequest、GetNextRequest 和 GetBulkRequest 的响应），并使用 IF-MIB、SNMPv2-MIB、BRIDGE-MIB 和 MIKROTIK-MIB（仅用于 health、PoE-out 和 SFP 诊断）。不支持 SNMP trap 和写入 SwOS 配置。

可用的 SNMP 数据：

- 系统信息
- 系统运行时间
- 端口状态
- 接口统计
- 主机表信息

![Swos snmp2 1](/img/f3b87569bbcad587.webp)

| 属性 | 描述 |
| --- | --- |
| **Enabled** | 启用或禁用 SNMP 服务 |
| **Community** | SNMP 团体名称 |
| **Contact Info** | NMS 的联系信息 |
| **Location** | NMS 的位置信息 |

---

## ACL {#acl}

访问控制列表（ACL）规则表是一个非常强大的工具，可基于 L2、L3 和 L4 协议头字段条件实现线速的数据包过滤、转发和 VLAN 打标签。每条规则包含条件部分和动作部分。

![Gpen21 acl](/img/c6424e2e468a15af.webp)

**条件部分参数**

| 属性 | 描述 |
| --- | --- |
| **From** | 数据包进入的端口 |
| **MAC Src** | 源 MAC 地址和掩码 |
| **MAC Dst** | 目标 MAC 地址和掩码 |
| **Ethertype** | 封装在以太网帧有效载荷中的协议 |
| **VLAN** | VLAN 头是否存在：`any` / `present` / `not present` |
| **VLAN ID** | VLAN 标签 ID |
| **Priority** | VLAN 标签中的优先级 |
| **IP Src**（IP/netmask:port） | 源 IPv4 地址、子网掩码和 L4 端口号 |
| **IP Dst**（IP/netmask:port） | 目标 IPv4 地址、子网掩码和 L4 端口号 |
| **Protocol** *（integer）* | IP 协议 |
| **DSCP** | IP DSCP 字段 |

**动作部分参数**

| 属性 | 说明 |
| --- | --- |
| **Drop** | 丢弃数据包 |
| **Set VLAN ID** | 如果存在 VLAN 标签，则更改 VLAN 标签 ID |
| **Priority** | 如果存在 VLAN 标签，则更改 VLAN 标签优先级位 |

---

## 重置与重新安装 {#reset-and-reinstall}

GPEN21 内置备份 SwOS 固件，可在标准固件损坏或升级失败时加载：

- 设备启动时按住 Reset 按钮几秒钟将重置配置并加载备份固件。Reset 按钮位于前盖后面。
- 加载备份固件后，可以使用 Web 浏览器连接到 192.168.88.1（或 DHCP 服务器租用的地址）并安装新的 SwOS 固件。
