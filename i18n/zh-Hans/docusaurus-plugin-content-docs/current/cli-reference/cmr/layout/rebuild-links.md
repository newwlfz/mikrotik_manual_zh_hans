---
sidebar_key: "cli-reference/cmr/layout/rebuild-links"
sidebar_position: 4
title: "rebuild-links"
sidebar_label: 'rebuild-links'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/layout/rebuild-links
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/layout/rebuild-links {#cmrlayoutrebuild-links}
**包：** cmr
**类型：** Command

如果拓扑中节点之间的链路已被删除或最初未生成，此命令会根据端口数据自动生成这些链路。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">使用标签选择应重建链路的设备。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。（默认值：**all**）</ArgTableRow>
<ArgTableRow arg="devices" typ="multi { array-id, device: enum
 }" unset="1">选择应重建链路的具体设备。</ArgTableRow>
</ArgTable>
