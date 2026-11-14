---
sidebar_key: "cli-reference/cmr/layout/add-devices"
sidebar_position: 1
title: "add-devices"
sidebar_label: 'add-devices'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/layout/add-devices
captured_at: '2026-11-09T11:35:47.715Z'
pagination_prev: "cli-reference/cmr/layout"
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/layout/add-devices {#cmrlayoutadd-devices}
**包：** cmr
**类型：** Command

此命令将多个设备批量添加到拓扑中。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">选择应使用标签添加到拓扑中的设备。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。（默认值：**all**）</ArgTableRow>
<ArgTableRow arg="devices" typ="multi { array-id, device: enum
 }" unset="1">选择应添加到拓扑中的特定设备。</ArgTableRow>
</ArgTable>
