---
sidebar_key: "cli-reference/cmr/device/reboot"
sidebar_position: 4
title: "reboot"
sidebar_label: 'reboot'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/device/reboot
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/device/reboot {#cmrdevicereboot}
**包：** cmr
**类型：** 命令

重启所选设备。该命令会立即返回。当设备重启完成后，示例告警规则 `rebooted` 会记录 `<device> rebooted`，其中 `<device>` 为 `identity@address`。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">选择要使用标签重启的设备。分别支持用 + 和 - 符号作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。</ArgTableRow>
</ArgTable>
