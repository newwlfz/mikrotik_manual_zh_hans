---
title: "文档更新 - 2026年10月27日"
date: 2026-10-27T00:00:00.000Z
slug: /changelog-2026-10-27
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026年10月27日 {#documentation-updates---october-27-2026}

October 27, 2026

2026年10月27日所做的文档变更摘要。

## 用户指南[​](#user-guides "Direct link to User Guides") {#user-guides}

-   **[RPKI](/docs/user-guides/routing-and-networking-protocols/unicast/rpki)**：针对 ASPA 和 RTR 协议版本 2 进行了扩展。RouterOS 以版本 2 启动 RTR 会话，并自动回退到版本 1；协商后的版本显示在 [`/routing/rpki/session`](/docs/cli-reference/routing/rpki/session) 的 `version` 字段中。新增章节涵盖前缀源验证和 ASPA 验证：验证状态、如何验证它们，以及相关要求（支持 RTR 版本 2 并发布 ASPA 对象的验证器、在 eBGP 连接上使用 `local.role` 设置 RFC 9234 角色集，以及在过滤链中使用 `rpki-aspa-verify`）。[路由选择与过滤](/docs/user-guides/routing-and-networking-protocols/route-selection-and-filtering) 列出了 `rpki-aspa` 属性和 `rpki-aspa-verify` 命令，且 [`/routing/route`](/docs/cli-reference/routing/route) 描述了 `rpki-aspa`。

## 桥接与交换[​](#bridging--switching "Direct link to Bridging & Switching") {#bridging--switching}

-   **[CRS3xx 和 CSS3xx (SwOS)](/docs/bridging-and-switching/swos/crs3)**、**[CSS106](/docs/bridging-and-switching/swos/css106)**、**[CSS610](/docs/bridging-and-switching/swos/css610)**、**[GPEN21](/docs/bridging-and-switching/swos/gpen21)**：描述了 `DHCP with fallback` 地址获取及其时序。交换机每秒发送一次 DHCP 请求，在没有服务器应答时使用静态地址，在服务器应答后 1–2 秒获得租约，并在租约时间过半时续租。当续租无人应答时，它会在 5 秒内返回静态地址并恢复请求。
-   **[L3 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading)**：在功能表中新增了关于 L3 硬件卸载和 FastPath 的 ECMP 哈希策略的说明，并新增到 [RouterOS 中的数据包流](/docs/firewall-and-quality-of-service/packet-flow-in-routeros)、[路由决策](/docs/user-guides/routing-and-networking-protocols/routing-decision) 以及 `/ip/settings` 和 `/ipv6/settings` 参考中。这些说明已于 10 月 30 日更正。

## CLI 参考[​](#cli-reference "Direct link to CLI Reference") {#cli-reference}

-   **[CLI 参考](/docs/cli-reference)**：基于更新的 RouterOS 7.26 测试构建重新生成。新增菜单：[`/interface/wifi/easymesh`](/docs/cli-reference/interface/wifi/easymesh)（包含 `bss`、`sta`、`topology`、`dpp-trigger` 和 `wps-push-button`）；[`/system/resource/hardware`](/docs/cli-reference/system/resource/hardware) 中的 `power-cycle`、`power-reset` 和 `reset-overcurrent` 命令以及 `overcurrent` 计数器；以及 `/app/settings/remove-certificate`。新增参数包括 [`/certificate/import`](/docs/cli-reference/certificate/import) 中的 `pem`，[`/container`](/docs/cli-reference/container) 中的 `labels` 和 `image-labels`，bonding 中的 `lacp-strict`，网桥中的 `dhcp-snooping-option82-policy` 和 STP 拓扑变更计数器，网桥端口上的 `host-moves`，`forced-on-a` 和 `forced-on-bt` PoE-out 模式，以及 IPFIX 中的 `nat-src-address6`/`nat-dst-address6`。在 [`/interface/ethernet/pon`](/docs/cli-reference/interface/ethernet/pon) 中重新设计了 PON ONU 身份字段（`ploam-password`、`loid`、`loid-password`、`vendor-id`、`serial-number`、`equipment-id` 等），并且 `/routing/stats/memory` 报告 `reserved`、`free` 和 `fragmentation`。[`/system/routerboard/settings`](/docs/cli-reference/system/routerboard/settings) 页面已移动，并保留了其描述。7.25 和 7.24 参考在同一轮中获得了少量修复。

## 硬件[​](#hardware "Direct link to Hardware") {#hardware}

-   **[LAMP 5G R16](/hardware/lamp-5g-r16)**：包含图片的新安装说明：使用 U 型螺栓进行抱杆安装（杆径 25–60 mm）和壁挂安装（6 mm 孔和墙塞），并警告设备必须垂直安装。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
