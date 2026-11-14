---
sidebar_key: "getting-started/upgrading-to-v7"
sidebar_position: 9
title: "升级到 v7"
sidebar_label: "升级到 v7"
description: "本页概述了将 MikroTik RouterOS 升级到版本 7 的步骤和注意事项，详细说明了与 BGP、OSPF、MPLS 及 User Manager 设置等功能的兼容性。它重点介绍了 BGP 连接的必选参数、合并后的 OSPF 菜单，以及有关 MPLS 配置备份的注意事项。"
tags:
  - 'bgp'
  - 'ospf'
source: https://manual.mikrotik.com/docs/getting-started/upgrading-to-v7
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 简介 {#introduction}

本文介绍将 RouterOS 升级到 v7 主要版本的建议步骤以及升级时可能遇到的注意事项。

从 v6 升级到 v7 的方式与在 v6 各版本之间升级相同。请按照[升级手册](./installation-and-upgrade/upgrade.md)中的详细步骤操作。如果您运行的是 RouterOS 版本 6 或更早版本，则应先升级到 v6 的最新稳定版或长期支持版。

:::info
在大多数使用上述 v6 版本即可正常运行的 RouterOS 环境中，无需额外步骤。升级到 v7 会自动转换配置，设备会立即正常工作。
:::

:::note
不应在 RAM 不足 64 MB 的硬件上运行 v7。
:::

## 功能列表兼容性 {#feature-list-compatibility}

如前所述，几乎所有 RouterOS 系统都可以使用“检查更新”功能，只需点击几下即可升级到 v7，但某些功能可能需要额外步骤：

| 功能 | 状态 |
| :-- | :-- |
| CAPsMAN | OK |
| Interfaces | OK |
| Wireless | OK |
| 桥接/交换 | OK |
| 隧道/PPP | OK |
| IPv6 | OK |
| BGP | OK，但需要注意  [\*](#ospf)  |
| OSPF | OK，但需要注意 [\*\*](#mpls) |
| MPLS | OK，但需要注意 [\*\*\*](#routing-filters) |
| 路由过滤器 | OK，但需要注意 [\*\*\*\*](#pim-sm) |
| PIM-SM | 参见[注意事项](#user-manager) |
| IGMP 代理 | OK |
| Tools | OK |
| Queues | OK |
| Firewall | OK |
| HotSpot | OK |
| 静态路由 | OK |
| User Manager | 参见[注意事项](#notes) |

:::danger
路由协议配置升级仅触发一次。这意味着，如果路由器降级到 v6、修改了配置，然后又升级回 v7，那么最终配置就是降级前存在的配置。要重新触发 v6 配置转换，请使用 [`force-v6-to-v7-configuration-upgrade=yes`](../cli-reference/system/backup/load.md) 选项加载 v6 备份。
:::

## BGP {#bgp}

所有已知配置都能从 6.x 成功升级到 7.x。但请记住，配置经过了完全重新设计。v7 BGP 实现提供了 [`connection`](../cli-reference/routing/bgp/connection.md)、[`template`](../cli-reference/routing/bgp/template.md) 和 [`session`](../cli-reference/routing/bgp/session/index.md) 菜单。

**`Template`** 包含所有与 BGP 协议相关的配置选项。它可用作动态对等体的模板，也可用于将类似配置应用到一组对等体。大多数参数与之前的实现类似，不同之处在于有些参数被分组到输出和输入部分，使配置更易读，也更容易理解该选项是应用于输入还是输出。

BGP **`connection`** 的最小参数集是 [`remote.address`](../cli-reference/routing/bgp/connection.md#remote.address)、[`template`](../cli-reference/routing/bgp/template.md)、[`connect`](../cli-reference/routing/bgp/connection.md#connect)、[`listen`](../cli-reference/routing/bgp/connection.md#listen) 和 [`local.role`](../cli-reference/routing/bgp/connection.md#local.role)。  
Connect 和 listen 参数指定对等体是尝试连接并侦听远程地址，还是仅连接或仅侦听。在对等体使用多跳连接的设置中，还必须配置 [`local.address`](../cli-reference/routing/bgp/connection.md)。对等体角色现在是必填参数。对于基本设置，只需使用 ibgp、ebgp 即可。

现在可以从 [`/routing/bgp/session`](../cli-reference/routing/bgp/session/index.md) 菜单监控所有已连接和已断开对等体的状态。  
所有路由进程的其他有用调试信息可以从 [`/routing/stats`](../cli-reference/routing/stats/process/index.md) 菜单监控。

网络会被添加到防火墙 address-list，并在 BGP **`connection`** 配置中引用。

## OSPF {#ospf}

所有已知配置都能从 6.x 成功升级到 7.x。  
OSPFv2 和 OSPFv3 现在合并为一个菜单 [`/routing/ospf`](../cli-reference/routing/ospf/instance.md)。没有默认实例和区域。要启动 OSPF，需要先创建实例，然后向该实例添加区域。

RouterOS v7 使用模板将接口与模板匹配，并应用匹配模板中的配置。OSPF 菜单 [`interface`](../cli-reference/routing/ospf/interface.md) 和 [`neighbor`](../cli-reference/routing/ospf/neighbor.md) 包含用于状态监控的只读条目。

## MPLS {#mpls}

升级 MPLS 设置时请谨慎，并在升级前备份配置。

## 路由过滤器 {#routing-filters}

所有受支持的选项都会顺利升级；对于不受支持的选项，则会创建一个空条目。路由过滤器配置已改为类似脚本的配置。

现在规则可以使用 "if .. then" 语法，根据 "if" 语句中的条件设置参数或应用动作。

多个不带动作的规则会堆叠到单个规则中，并像防火墙一样按顺序执行，因为 "set" 参数的顺序很重要，而且每行写一个 "set" 可以更容易地自上而下理解应用了哪些动作。

更多 RouterOS v7 路由过滤器示例见[此处](../user-guides/routing-and-networking-protocols/moving-from-rosv6-to-rosv7.md#routing-filters)。

## PIM-SM {#pim-sm}

将 RouterOS 升级到 v7 不会保留与 PIM 相关的配置。升级后，组播路由配置位于 [`/routing/pimsm`](../cli-reference/routing/pimsm/index.md) 菜单下，并且不再需要额外的 "multicast" 软件包。更多信息见[此处](../user-guides/routing-and-networking-protocols/multicast/pim-sm.md)。

## 用户管理器 {#user-manager}

RouterOS v7 提供了全新且重新设计的 User Manager 实现，配置现已集成到 RouterOS WinBox 和控制台中（WEB 管理配置界面不可用），更多信息见[此处](../authentication-authorization-accounting/user-manager.md)。无法直接从旧版 User Manager 迁移，但可以使用 [`/user-manager/database/migrate-legacy-db`](../cli-reference/user-manager/database/migrate-legacy-db.md) 迁移旧数据库。不过，您可能希望从头开始配置。

## 新功能 {#new-features}

RouterOS v7 实现了新内核，这会因路由缓存带来性能变化，并且某些任务可能会因不同进程而需要更高的 CPU 和 RAM 使用量。

- 全新的 NTP 客户端和服务器实现。
- 合并了各个单独的软件包，只保留 bundle 和少数额外软件包 *(不再支持 LCD 和 KVM 软件包)*。
- 新的命令行接口（CLI）风格（仍支持 RouterOS v6 命令）。
- 支持 Let's Encrypt 证书生成。
- 支持 REST API。
- 支持 x86 上的 UEFI 启动模式。
- CHR FastPath 支持 "vmxnet3" 和 "virtio-net" 驱动。
- 支持 "Cake" 和 "FQ\_Codel" 类型队列。
- 支持 IPv6 NAT。
- 在配备 Marvell Prestera 交换机的 MikroTik 设备上支持三层硬件加速、QoS 和 MLAG。
- 支持 MBIM 驱动，并为所有处于 MBIM 模式的调制解调器提供基本功能支持。
- 支持 VRRP 分组以及节点间的连接跟踪数据同步。
- 支持虚拟可扩展局域网（VXLAN）。
- 支持 L2TPv3。
- 支持 OpenVPN UDP 传输协议。
- 支持 WireGuard。
- 在 RTL8367 (RB4011, RB100AHx4) 和 MT7621 (hEX, hEX S, RBM33G) 交换机上支持硬件卸载的 VLAN 过滤。
- 在 ARM 和 ARM64 设备上支持 ZeroTier。
- 支持 x86 设备的 CPU 频率调节。

## 已取消的支持 {#dropped-support}

在 RouterOS v7 中，已不再支持：

- LCD 软件包
- KVM 软件包
