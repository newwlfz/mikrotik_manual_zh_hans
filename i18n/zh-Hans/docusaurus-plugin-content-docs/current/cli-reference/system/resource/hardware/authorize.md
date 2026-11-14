---
sidebar_key: "cli-reference/system/resource/hardware/authorize"
sidebar_position: 1
title: "authorize"
sidebar_label: 'authorize'
source: https://manual.mikrotik.com/docs/cli-reference/system/resource/hardware/authorize
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/resource/hardware/authorize {#systemresourcehardwareauthorize}
**条件：** !powerpc, !smips
**类型：** 命令
允许或禁止使用 USB 硬件设备（在 `usb-settings` 中开启授权时使用）。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="allow" typ="bool">授权 USB 设备（`yes`）或使其保持不可用（`no`）</ArgTableRow>
</ArgTable>
