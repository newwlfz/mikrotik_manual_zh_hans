---
sidebar_key: "getting-started/upgrading-to-v7"
sidebar_position: 9
title: "升级到 v7"
sidebar_label: "升级到 v7"
description: "本页概述了将 MikroTik RouterOS 升级到版本 7 的步骤和注意事项，详细说明了与 BGP、OSPF、MPLS 及 User Manager 设置等功能的兼容性。它重点介绍了 BGP 连接的必选参数、合并后的 OSPF 菜单，以及有关 MPLS 配置备份的注意事项。"
tags:
  - 'bgp'
  - 'ospf'
source: https://manual.mikrotik.com/docs/7.24/getting-started/upgrading-to-v7
captured_at: '2026-11-04T11:29:11+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 简介 {#introduction}

本文介绍将 RouterOS 升级到 v7 主要版本的建议步骤以及升级时可能遇到的注意事项。

从 v6 升级到 v7 的方式与在 v6 版本内升级相同。更详细的步骤请参阅[升级手册](./installation-and-upgrade/upgrade.md)。如果您当前运行的是 RouterOS 版本 6 或更旧版本，我们首先建议升级到 v6 的最新稳定版或长期支持版。

:::info
在大多数使用上述 v6 版本运行正常的 RouterOS 设置中，不需要额外步骤。升级到 v7 会自动转换配置，设备将立即正常工作。

:::

:::note
**注意：** 我们不建议在内存不足 64 MB 的硬件上运行 v7。

:::

### 功能列表兼容性 {#feature-list-compatibility}

如前所述，几乎所有 RouterOS 系统都可以使用“检查更新”功能，只需点击几下即可升级到 v7，但有些功能可能需要额外步骤：

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
| 路由过滤器 | OK，但需要注意 [\*\*\*\*](#notes) |
| PIM-SM | 参见[注意事项](#notes) |
| IGMP 代理 | OK |
| Tools | OK |
| Queues | OK |
| Firewall | OK |
| HotSpot | OK |
| 静态路由 | OK |
| User Manager | 参见[注意事项](#notes) |

### 备注 {#notes}

:::danger
路由协议配置升级只会触发一次。这意味着，如果路由器被降级到 ROSv6、修改了配置，然后又被升级回 ROSv7，那么最终配置将是降级前所存在的配置。要重新触发 v6 配置转换，请加载 ROSv6 备份，并使用选项 `force-v6-to-v7-configuration-upgrade=yes`。

:::

### **BGP** {#bgp}

所有已知配置都能从 6.x 成功升级到 7.x。但请注意，配置经过了彻底重新设计。v7 的 BGP 实现提供 **`connection`**、**`template`** 和 **`session`** 菜单。

**`Template`** 包含所有与 BGP 协议相关的配置选项。它可用作动态对等体的模板，也可用于将类似配置应用到一组对等体。大多数参数与之前的实现类似，不同之处在于有些参数被分组到输出和输入部分，使配置更易读，也更容易理解该选项是应用于输入还是输出。

BGP **`connection`** 的最小参数集是 `remote.address`、`template, connect`、`listen` 和 `local.role`  
Connect 和 listen 参数指定对等体是尝试连接并监听远程地址，还是只连接或只监听。在某些设置中，如果对等体使用多跳连接，则还必须配置 `local.address`。对等体角色现在是必填参数。对于基本设置，直接使用 ibgp、ebgp 即可。

现在可以从 `/routing/bgp/session` 菜单监控所有已连接和未连接对等体的状态。  
所有路由进程的其他有用调试信息可以从 `/routing/stats` 菜单监控。

网络会被添加到防火墙 address-list，并在 BGP **`connection`** 配置中引用。

### OSPF {#ospf}

所有已知配置都能从 6.x 成功升级到 7.x。  
OSPFv2 和 OSPFv3 现在合并到一个菜单 `/routing/ospf` 中。目前没有默认实例和区域。要启动 OSPF，您需要创建一个实例，然后向该实例添加一个区域。

RouterOSv7 使用模板将接口与模板匹配，并应用匹配模板中的配置。OSPF 菜单 `interface` 和 `neighbor` 包含用于状态监控的只读条目。

### MPLS {#mpls}

升级 MPLS 设置时请谨慎，并确保在升级前备份配置。

### 路由过滤器 {#routing-filters}

所有受支持的选项都会顺利升级；对于不受支持的选项，则会创建一个空条目。路由过滤器配置已改为类似脚本的配置。

现在规则可以使用 "if .. then" 语法，根据 "if" 语句中的条件设置参数或应用动作。

多个不带动作的规则会堆叠到单个规则中，并像防火墙一样按顺序执行；原因是 "set" 参数的顺序很重要，每行写一个 "set" 可以让人从上到下更容易理解应用了哪些动作。

更多 RouterOSv7 路由过滤器示例见[此处](../user-guides/routing-and-networking-protocols/moving-from-rosv6-to-rosv7.md#routing-filters)。

### PIM-SM {#pim-sm}

将 RouterOS 升级到 v7 不会保留与 PIM 相关的配置。升级后，组播路由配置将在 `/routing/pimsm` 菜单下提供，并且不再需要额外的 "multicast" 软件包。更多信息见[此处](../user-guides/routing-and-networking-protocols/multicast/pim-sm.md)。

### User Manager {#user-manager}

RouterOSv7 提供了全新且经过重新设计的 User Manager 实现，配置现已集成到 RouterOS WinBox 和控制台（WEB 管理配置界面不可用），更多信息见[此处](../authentication-authorization-accounting/user-manager.md)。无法从旧版 User Manager 直接迁移，但可以通过 `/user-manager/database/migrate-legacy-db` 迁移旧数据库。不过，从零开始配置可能是个好主意。

### 新功能 {#new-features}

RouterOSv7 中实现了新内核，这会因路由缓存而导致性能变化，并且某些任务可能因不同进程而需要更高的 CPU 和 RAM 使用量。

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

### 不再支持 {#dropped-support}

在 RouterOS v7 中，已不再支持：

- LCD 软件包
- KVM 软件包
