---
sidebar_key: "cli-reference/cmr/device/run-script"
sidebar_position: 5
title: "run-script"
sidebar_label: 'run-script'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/device/run-script
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/device/run-script {#cmrdevicerun-script}
**包：** cmr
**类型：** 命令

在选定的设备上运行脚本。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="script" typ="alt { script: string
 }">要在选定设备上运行的脚本。</ArgTableRow>
<ArgTableRow arg="labels" typ="object" unset="1">使用标签选择要运行脚本的设备。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。</ArgTableRow>
<ArgTableRow arg="order" typ="object">执行顺序（按标签）。</ArgTableRow>
<ArgTableRow arg="strategy" typ="enum ()" unset="1">设备的处理方式：`parallel` 或 `sequential`。</ArgTableRow>
<ArgTableRow arg="fail-policy" typ="enum ()" unset="1">设备失败时的行为：`continue`、`stop` 或 `continue-order`。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time" unset="1">脚本执行超时时间。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="device" typ="enum">正在运行脚本的设备。</ArgTableRow>
<ArgTableRow arg="status" typ="string">执行状态。</ArgTableRow>
<ArgTableRow arg="output" typ="string">脚本输出。</ArgTableRow>
</ArgTable>
