---
sidebar_key: "cli-reference/cmr/upgrade/trigger"
sidebar_position: 3
title: "trigger"
sidebar_label: 'trigger'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/upgrade/trigger
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/upgrade/trigger {#cmrupgradetrigger}
**软件包：** cmr
**类型：** 命令

立即启动所选规则的任务，而无需等待 schedule-time。同一时间只运行一个升级任务；如果在有任务正在进行时触发另一条规则，则新任务会进入[排队状态](./job.md#cmr-upgrade-job)，直到当前任务完成。

触发会强制提前升级该规则涵盖的设备：任务立即运行，并升级每个有较新版本可用的涵盖设备，而无需等待 schedule-time。已是最新版本的涵盖设备会被跳过，因此本次运行的计数器只统计已升级的设备。要升级单个设备而不考虑其规则，请参阅 [`/cmr/device/upgrade`](../device/upgrade.md)。
