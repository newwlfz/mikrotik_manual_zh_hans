---
title: "generate-new-id"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/license/generate-new-id
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/system/license"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/license/generate-new-id 
**Syscap：** chr
**类型：** Command

为 CHR 实例生成新的唯一系统 ID。在从同一磁盘镜像部署多个 CHR 实例时，请在首次启动后、申请试用许可证前使用该命令，以避免系统 ID 重复。

:::warning
该命令只能用于运行 Free 许可证级别的 CHR。不要在已应用试用许可证或付费许可证后使用该命令。
:::
