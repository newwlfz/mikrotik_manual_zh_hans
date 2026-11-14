---
sidebar_key: "cli-reference/cmr/upgrade/version-check"
sidebar_position: 4
title: "version-check"
sidebar_label: 'version-check'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/upgrade/version-check
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/upgrade/version-check {#cmrupgradeversion-check}
**包：** cmr
**类型：** 命令

列出升级规则中配置的每个升级通道所提供的最新版本。未被任何规则使用的通道不会被检查。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="channel" typ="alt">已检查信道。</ArgTableRow>
<ArgTableRow arg="version" typ="string">可用版本。</ArgTableRow>
</ArgTable>
