---
title: "升级到 v7"
description: "本页概述将 MikroTik RouterOS 升级到版本 7 的步骤和注意事项，详细说明与 BGP、OSPF、MPLS 等功能以及用户管理器设置的兼容性。文中重点介绍 BGP 连接的必填参数、合并后的 OSPF 菜单，并提示注意 MPLS 配置备份。"
tags:
  - 'bgp'
  - 'ospf'
source: https://manual.mikrotik.com/docs/7.24/getting-started/upgrading-to-v7
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 简介 {#introduction}

本文档介绍将 RouterOS 升级到 v7 主要版本的推荐步骤，以及升级时可能遇到的注意事项。

从 v6 升级到 v7 的方式与在 v6 各版本之间升级相同。更详细的步骤请参阅[升级手册](/docs/getting-started/installation-and-upgrade/upgrade)。如果当前运行的是 RouterOS 6 或更早版本，建议先升级到 v6 的最新 stable 或 long-term 版本。

:::info
在大多数运行上述 v6 版本且工作正常的 RouterOS 配置中，无需执行额外步骤。升级到 v7 会自动转换配置，设备将立即正常运行。
:::

:::note
**注意：** 不建议在 RAM 少于 64 MB 的硬件上运行 v7。
:::

### 功能列表兼容性 {#feature-list-compatibility}

如前所述，几乎所有 RouterOS 系统都可以使用“Check for updates”功能，并通过几次点击升级到 v7，但某些功能可能需要执行额外步骤：

| 功能 | 状态 |
| :-- | :-- |
| CAPsMAN | 正常 |
| 接口 | 正常 |
| 无线 | 正常 |
| 网桥/交换 | 正常 |
| 隧道/PPP | 正常 |
| IPv6 | 正常 |
| BGP | 正常，但需注意 <a href="#bgp">*</a><br/> |
| OSPF | 正常，但需注意 [\*\*](#ospf) |
| MPLS | 正常，但需注意 [\*\*\*](#mpls) |
| 路由过滤器 | 正常，但需注意 [\*\*\*\*](#routing-filters) |
| PIM-SM | 请参阅[说明](#notes) |
| IGMP 代理 | 正常 |
| 工具 | 正常 |
| 队列 | 正常 |
| 防火墙 | 正常 |
| HotSpot | 正常 |
| 静态路由 | 正常 |
| User Manager | 请参阅[说明](#notes) |

### 说明 {#notes}

:::danger
路由协议配置升级仅触发一次。这意味着，如果路由器降级到 ROSv6，配置被修改，随后路由器又升级回 ROSv7，则最终配置将是降级前存在的配置。要重新触发 v6 配置转换，请加载 ROSv6 备份，并使用选项 `force-v6-to-v7-configuration-upgrade=yes`。
:::

### **BGP**

所有已知配置都将成功从 6.x 升级到 7.x。但请注意，配置进行了完全重新设计。v7 BGP 实现提供了 **`connection`**、**`template`** 和 **`session`** 菜单。

**`Template`** 包含所有与 BGP 协议相关的配置选项。它可用作动态对等体的模板，并将相似配置应用到一组对等体。大多数参数与之前的实现类似，只是部分参数被分组到 output 和 input 部分，使配置更易读，也更容易判断该选项应用于输入还是输出。

BGP **`connection`** 的最小参数集是 `remote.address`、`template, connect`、`listen` 和 `local.role`  
Connect 和 listen 参数指定对等体将尝试连接并监听远程地址，还是仅连接或仅监听。在某些配置中，如果对等体使用多跳连接，则还必须配置 `local.address`。对等体角色现在是必填参数。对于基本配置，可以只使用 ibgp、ebgp。

现在，可以从 `/routing/bgp/session` 菜单监控所有已连接和未连接对等体的状态。  
其他有关所有路由进程的调试信息可以从 `/routing/stats` 菜单监控。

网络将添加到防火墙 address-list，并在 BGP **`connection`** 配置中引用。

### OSPF

所有已知配置都将成功从 6.x 升级到 7.x。  
OSPFv2 和 OSPFv3 现已合并到一个菜单 `/routing/ospf`。目前没有默认实例和区域。要启动 OSPF，需要创建一个实例，然后向该实例添加区域。

RouterOSv7 使用模板匹配接口，并应用匹配模板中的配置。OSPF 菜单 `interface` 和 `neighbor` 包含用于状态监控的只读条目。

### MPLS

升级 MPLS 配置时要谨慎，并确保在升级前备份配置。

### 路由过滤器 {#routing-filters}

所有支持的选项都会正常升级；如果遇到不支持的选项，则会创建空条目。路由过滤器配置已改为类似脚本的配置。

规则现在可以使用“if .. then”语法，根据“if”语句中的条件设置参数或应用动作。

没有动作的多个规则会合并到单条规则中，并按顺序执行，类似防火墙。原因是“set”参数的顺序很重要，每行编写一个“set”更便于从上到下理解应用了哪些动作。

更多 RouterOSv7 路由过滤器示例请见[此处](/docs/user-guides/routing-and-networking-protocols/moving-from-rosv6-to-rosv7#routing-filters)。

### PIM-SM

将 RouterOS 升级到 v7 不会保留 PIM 相关配置。升级后，组播路由配置将在 `/routing/pimsm` 菜单下提供，并且不再需要额外的“multicast”软件包。更多信息请见[此处](/docs/user-guides/routing-and-networking-protocols/multicast/pim-sm)。

### 用户管理器 {#user-manager}

RouterOSv7 提供了经过重新设计的新版 User Manager，配置现已集成到 RouterOS WinBox 和控制台中（不提供 WEB 管理配置接口），详情请参阅[此处](/docs/authentication-authorization-accounting/user-manager)。无法从旧版 User Manager 直接迁移，可以通过 `/user-manager/database/migrate-legacy-db` 迁移旧版数据库。不过，从头开始配置可能是更好的选择。

### 新功能 {#new-features}

RouterOSv7 中实现了新内核，这会因路由缓存带来性能变化，同时某些任务可能会使不同进程占用更高的 CPU 和 RAM。

- 全新的 NTP 客户端和服务器实现。
- 合并了各个软件包，仅保留 bundle 和少量额外软件包 *（不再支持 LCD 和 KVM 软件包）*。
- 新的命令行界面（CLI）风格（仍支持 RouterOS v6 命令）。
- 支持生成 Let's Encrypt 证书。
- 支持 REST API。
- 支持 x86 上的 UEFI 启动模式。
- CHR FastPath 支持“vmxnet3”和“virtio-net”驱动。
- 支持“Cake”和“FQ\_Codel”类型的队列。
- 支持 IPv6 NAT。
- 在搭载 Marvell Prestera 交换机的 MikroTik 设备上支持第 3 层硬件加速、QoS 和 MLAG。
- 支持 MBIM 驱动，并为所有具有 MBIM 模式的调制解调器提供基本功能支持。
- 支持 VRRP 分组以及节点之间的连接跟踪数据同步。
- 支持 Virtual eXtensible Local Area Network（VXLAN）。
- 支持 L2TPv3。
- 支持 OpenVPN UDP 传输协议。
- 支持 WireGuard。
- 在 RTL8367（RB4011、RB100AHx4）和 MT7621（hEX、hEX S、RBM33G）交换机上支持硬件卸载的 VLAN 过滤。
- 在 ARM 和 ARM64 设备上支持 ZeroTier。
- 支持 x86 设备的 CPU 频率调节。

### 已停止支持 {#dropped-support}

在 RouterOS v7 中，已停止支持：

- LCD 软件包
- KVM 软件包
