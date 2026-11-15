---
title: "文档更新 - 2026年10月13日"
date: 2026-10-13T00:00:00.000Z
slug: /changelog-2026-10-13
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026 年 10 月 13 日 {#documentation-updates---october-13-2026}

October 13, 2026

2026 年 10 月 13 日文档变更摘要。

## 用户指南 {#user-guides}

-   **[路由选择与过滤](/docs/user-guides/routing-and-networking-protocols/route-selection-and-filtering#community-regexp-matching)**：新增“Community 正则表达式匹配”部分。一个 community 列表项包含具体的 `communities` 或一个 `regexp`，同一个列表可以混合使用两者。正则表达式会与每个 community 的输出形式进行匹配：标准 community 为 `asn:value` 或熟知名称，扩展 community 为带类型的 `rt:`/`soo:` 形式，large community 为三个十进制字段。示例按 large community 的管理域删除或拒绝路由。另外新增：对于没有 community 属性的路由，“any” 匹配器返回 false，“subset” 匹配器返回 true，因此使用 `bgp-communities-empty`（或 extended 和 large 变体）来测试属性是否为空；带列表的 `delete` 还会删除与其 regexp 条目匹配的 community，而 `append` 和 `set` 仅使用具体值。

## 入门 {#getting-started}

-   **[IPv6 邻居发现](/docs/getting-started/networking-fundamentals/ipv6-neighbor-discovery)**：对于接口 `all` 的 `/ipv6/nd` 条目，其优先级低于为特定接口配置的条目。

## 管理工具 {#management-tools}

-   **[CMR](/docs/management-tools/cmr#run-script-permissions)**：run-script 权限部分将 `/system backup save`、`/system reset-configuration` 和 `/file copy` 列为被拒绝的命令。`/export` 可用并返回客户端配置，因此 `run-script` 可以从整个设备群收集配置导出；敏感值仍保持隐藏（`/export` 会省略它们，`show-sensitive` 不会显示它们，而 `get` 会将它们显示为 `*`）。

## 硬件 {#hardware}

-   **[KNOT LR8G kit](/hardware/knot-lr8g-kit)**、**[KNOT LR9G kit](/hardware/knot-lr9g-kit)**：已针对 G 套件更正：GPS 模块位于 LoRa 卡上（不支持 GLONASS、BeiDou 或 Galileo），microUSB 端口仅用于外设，不能用于供电。GNSS 配置部分现在为 GPS 配置，并链接到 GPS 指南；BG77 AT 命令说明已替换为两项天线检查（从 LoRa 卡到 SMA 端口的 U.FL 转接线，以及标有 GNSS 的 SMA 端口上的外部天线）。已链接 Modbus 配置指南。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
