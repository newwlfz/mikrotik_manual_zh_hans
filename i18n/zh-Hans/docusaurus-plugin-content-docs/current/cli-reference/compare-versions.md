---
sidebar_key: "cli-reference/compare-versions"
sidebar_position: 1
title: "CLI 参考版本对比"
description: "比较两个 RouterOS CLI 参考版本之间的参数。"
source: https://manual.mikrotik.com/docs/cli-reference/compare-versions
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

每个 RouterOS 版本都会带来新的 CLI 参考：随着功能演进，命令和参数会被添加、重命名和删除。在下方选择两个版本，以查看它们之间添加了哪些参数以及删除了哪些参数。

<CliCompare />

## 比较的工作原理 {#how-the-comparison-works}

- 数据由此仓库中带版本号的 CLI 参考页面（`versioned_docs/version-*/cli-reference`）生成，因此它反映的是已发布的页面，而不是 RouterOS 源代码本身。
- **参数** 是命令或菜单的参数，包括只读参数。**标志** 是条目的属性，例如 `disabled`、`running` 和 `invalid`。
- 当整个页面在另一个版本中缺失时，命令或菜单会被列在 *新增命令* 或 *删除命令* 下。
- 目录页面（例如 `ip/firewall`）会列出该菜单下每个条目的参数，因此在那里被移除的参数实际上可能已移动到某个子菜单页面中。
