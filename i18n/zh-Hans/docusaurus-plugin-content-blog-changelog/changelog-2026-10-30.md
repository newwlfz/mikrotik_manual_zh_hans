---
title: "文档更新 - 2026年10月30日"
date: 2026-10-30T00:00:00.000Z
slug: /changelog-2026-10-30
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026年10月30日 {#documentation-updates---october-30-2026}

October 30, 2026

2026年10月30日所做的文档更改摘要。

## 桥接与交换[​](#bridging--switching "Direct link to Bridging & Switching") {#bridging--switching}

-   **[L3 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading)**：更正了 ECMP 哈希说明。启用 L3 硬件卸载后，硬件转发的 ECMP 使用交换芯片自身的哈希掩码，其中包含 TCP/UDP 端口，并忽略配置的哈希策略；FastTrack 卸载的连接遵循内核 FIB 查找，可能选择不同的 nexthop。新增警告指出，同一流中混合硬件转发与 FastTrack/CPU 转发的数据包可能导致非对称路由和连接重置。[RouterOS 中的数据包流](/docs/firewall-and-quality-of-service/packet-flow-in-routeros) 说明 FastPath 按目标地址缓存路由，因此 `l4` 和 `l3-inner` 策略不会按流分散 FastPath 缓存的流量；[路由决策](/docs/user-guides/routing-and-networking-protocols/routing-decision) 以及 [`/ip/settings`](/docs/cli-reference/ip/settings) 和 [`/ipv6/settings`](/docs/cli-reference/ipv6/settings) 参考文档与之相符。7.25 和 7.24 手册中也有此说明。

## 高可用性解决方案[​](#high-availability-solutions "Direct link to High Availability Solutions") {#high-availability-solutions}

-   **[VRRP](/docs/high-availability-solutions/vrrp#hardware-offloading)**：新增“硬件卸载”一节。启用 L3 硬件卸载后，处于 master 状态的 VRRP 实例会被卸载：交换芯片对发往虚拟 MAC 地址的帧进行路由，并将其用作被路由流量的源 MAC 地址，且该实例显示 `H`（`hw-offloaded`）标志，该标志在 [`/interface/vrrp`](/docs/cli-reference/interface/vrrp) 参考文档中描述。[L3 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading) 和 [Marvell Prestera 交换芯片特性](/docs/bridging-and-switching/marvell-prestera-switch-chip-features) 将 VRRP 列为可卸载，但 98DX3236、98DX224S、98DX226S 和 98DX2528 交换芯片除外。

## 用户指南[​](#user-guides "Direct link to User Guides") {#user-guides}

-   **[路由选择与过滤](/docs/user-guides/routing-and-networking-protocols/route-selection-and-filtering#community-regexp-matching)**：更多 community regexp 细节：反斜杠转义一个字面字符（`\d` 匹配字母 `d`，因此数字请使用 `[0-9]`），匹配区分大小写且不锚定。[`community-list`](/docs/cli-reference/routing/filter/community-list)、[`community-ext-list`](/docs/cli-reference/routing/filter/community-ext-list) 和 [`community-large-list`](/docs/cli-reference/routing/filter/community-large-list) 中的 `regexp` 描述说明，regexp 条目用于匹配以及由 `delete`/`filter` 使用，而 `append`/`set` 只使用具体值。

## 诊断与监控[​](#diagnostics--monitoring "Direct link to Diagnostics & Monitoring") {#diagnostics--monitoring}

-   **[Netwatch](/docs/diagnostics-monitoring-and-troubleshooting/netwatch)**、**[接口统计与 monitor-traffic](/docs/diagnostics-monitoring-and-troubleshooting/interface-stats-and-monitor-traffic)**：新增警告，说明脚本策略：Netwatch 脚本以 `read`、`write`、`test` 和 `reboot` 运行，`/tool/traffic-monitor` 脚本以 `ftp`、`reboot`、`read`、`write` 和 `test` 运行。两者都链接到 Scripting 页面的脚本权限部分。Netwatch 警告也出现在 7.25 和 7.24 手册中。

## CLI 参考[​](#cli-reference "Direct link to CLI Reference") {#cli-reference}

-   **[`/routing/pimsm/interface-template`](/docs/cli-reference/routing/pimsm/interface-template)**、**[`/routing/pimsm/igmp-interface-template`](/docs/cli-reference/routing/pimsm/igmp-interface-template)**：这两个菜单分别配置：`interface-template` 仅启用 PIM，`igmp-interface-template` 运行 IGMP/MLD 查询器，因此一个接口可以运行 PIM、IGMP/MLD，或两者同时运行。
-   **[CLI 参考](/docs/cli-reference#standard-list-entry-properties)**：`comment` 属性限制为 16 KB。

## 物联网[​](#internet-of-things "Direct link to Internet of Things") {#internet-of-things}

-   **[TG-LR 设置](/docs/internet-of-things/lora/user-guides/tg-lr-setup-guide)**：根据 TG-LR 源手册重新生成。设备命令描述详细得多，配置传感器与数据规则已移至遥测下，磁开关与已知问题部分已扩充。页面链接到上行链路负载解码器脚本以及出厂默认配置命令的下载；TG-LRX2 工具现在从 PyPI 安装（`pip install tg-lrx2-utils`），而不是捆绑归档。

## 硬件[​](#hardware "Direct link to Hardware") {#hardware}

-   **[FTC21-ups](/hardware/ftc21-ups)**：新的防风雨光纤转铜缆转换器手册，带 2.5G SFP 端口、两个千兆以太网端口（Ether2 上的 PoE-out）以及集成电池，可在短暂断电期间维持运行。
-   **[KNOT Gateway LR8](/hardware/l14g-2ax-bt5-lr8-and-eg800k)**、**[KNOT Gateway HL9](/hardware/l14g-2ax-bt5-hl9-and-eg800q)**：新手册，包含规格、快速入门、壁挂和抱杆安装、供电、蜂窝调制解调器配置以及重置按钮部分。HL9 是一款 IP66 IoT 网关，具有 BLE 5.1、915 MHz Wi-Fi HaLow、Wi-Fi、千兆以太网、LTE Cat 1 bis 和 GNSS。
-   **[IAQM-THC2PV-W 和 IAQM-THC2PV-G](/hardware/iaqm-thc2pv-w-and-iaqm-thc2pv-g)**：安全螺丝使用 T9 Torx 批头，而不是 TA23 三角批头。
-   **[CRS326-24G-2S+RM](/hardware/crs326-24g-2s-plus-rm)**、**[CRS317-1G-16S+RM](/hardware/crs317-1g-16s-plus-rm)**、**[CRS309-1G-8S+IN](/hardware/crs309-1g-8s-plus-in)** 以及其他 11 个 CRS 交换机页面：已按硬件页面模板对齐：一个链接到产品页面的标题、以列表形式呈现的安全警告、链接到“安装”和“供电”部分的快速入门步骤、其中 12 个页面上的新规格表，以及缺少时的重置按钮部分。RouterOS/SwOS 启动说明和 Marvell Prestera 特性参考现在格式化为步骤和链接。
-   **[RouterBOARD](/docs/hardware/routerboard)**：由 Mode 或 Reset 按钮启动的脚本以 `ftp`、`reboot`、`read`、`write`、`test` 和 `romon` 策略运行。7.25 和 7.24 手册中也有此说明。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
