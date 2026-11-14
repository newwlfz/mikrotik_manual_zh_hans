---
title: "文档更新 - 2026年10月19日"
date: 2026-10-19T00:00:00.000Z
slug: /changelog-2026-10-19
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026年10月19日 {#documentation-updates---october-19-2026}

October 19, 2026

2026年10月19日文档更改摘要。

## CLI 参考[​](#cli-reference "Direct link to CLI Reference") {#cli-reference}

-   **[CLI 参考版本比较](/docs/cli-reference/compare-versions)**: 新页面，在顶部导航中链接为“CLI compare”。选择两个 RouterOS 版本，以查看它们的 CLI 参考之间新增或移除了哪些命令和参数。
-   **[CLI 参考](/docs/cli-reference#standard-list-entry-properties)**: 索引说明了每个列表菜单共有的内容，这些内容不会在每个菜单页面上重复：`comment`、`disabled`（带有 `enable` 和 `disable` 命令）、`copy-from` 和 `place-before` 属性，以及 `detail` 和 `as-value` 打印修饰符。参数类型列表新增了 `script`：`/system script` 条目的名称或内联脚本源代码。也已添加到 7.25 和 7.24 参考中。
-   **[7.24 CLI 参考](/docs/cli-reference)**: 根据 RouterOS 7.24.5 控制台数据重新生成，与 7.25 和 7.26 参考一样，每个命令一个页面：约 900 个新页面取代了 84 个合并菜单页面。修复了 BGP 和 VPLS 描述中的损坏锚点。

## 硬件[​](#hardware "Direct link to Hardware") {#hardware}

-   **[CCR1016-12G](/hardware/ccr1016-12g)**、**[CCR2004-16G-2S+](/hardware/ccr2004-16g-2s-plus)**、**[CCR2216-1G-12XS-2XQ](/hardware/ccr2216-1g-12xs-2xq)** 以及另外 11 个 CCR 页面：已与硬件页面模板对齐：链接到产品页面并附有简短说明的标题、以列表形式呈现的安全警告、重写的复位按钮说明，以及在页面仍然存在旧“First use”部分时用 Quickstart 部分替换它。
-   **[Cube 60G ac](/hardware/cube-60g-ac)**、**[LHG Lite60](/hardware/lhg-lite60)**、**[wAP 60G series](/hardware/wap-60g-series)** 以及另外 5 个 60 GHz 页面：标题链接到产品页面，并修复了以下格式问题：标题与上一行连在一起、RF 暴露警告中缺少空格以及产品图片位置错误。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
