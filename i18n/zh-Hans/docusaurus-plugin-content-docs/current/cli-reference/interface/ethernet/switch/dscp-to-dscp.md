---
sidebar_key: "cli-reference/interface/ethernet/switch/dscp-to-dscp"
sidebar_position: 3
title: "dscp-to-dscp"
sidebar_label: 'dscp-to-dscp'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/dscp-to-dscp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/dscp-to-dscp {#interfaceethernetswitchdscp-to-dscp}
**系统能力：** musicswitch
**类型：** 目录

全局 DSCP 到 DSCP 映射表用于将数据包的原始 DSCP 映射到表中配置的新 DSCP 值。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="new-dscp" typ="num">DSCP 到 DSCP 映射条目的新 DSCP 值。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="original-dscp" typ="num"></ArgTableRow>
<ArgTableRow arg="hex" typ="num"></ArgTableRow>
</ArgTable>
