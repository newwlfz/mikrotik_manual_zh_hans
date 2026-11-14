---
sidebar_key: "cli-reference/system/license/generate-new-id"
sidebar_position: 1
title: "generate-new-id"
sidebar_label: 'generate-new-id'
source: https://manual.mikrotik.com/docs/cli-reference/system/license/generate-new-id
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/license/generate-new-id {#systemlicensegenerate-new-id}
**系统能力：** chr
**类型：** 命令

为 CHR 实例生成一个新的唯一系统 ID。当从同一磁盘镜像部署多个 CHR 实例时，请在首次启动之后、申请试用许可证之前使用该命令，以避免出现相同的系统 ID。

:::warning
该命令只能在运行 Free 许可证级别的 CHR 上使用。在已应用试用许可证或付费许可证之后，请勿使用该命令。
:::
