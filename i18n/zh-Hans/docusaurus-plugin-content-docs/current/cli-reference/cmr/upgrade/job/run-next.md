---
sidebar_key: "cli-reference/cmr/upgrade/job/run-next"
sidebar_position: 1
title: "run-next"
sidebar_label: 'run-next'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/upgrade/job/run-next
captured_at: '2026-11-09T11:35:47.715Z'
pagination_prev: "cli-reference/cmr/upgrade/job"
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/upgrade/job/run-next {#cmrupgradejobrun-next}
**软件包：** cmr
**类型：** 命令

立即运行下一个已安排的升级任务。对于升级规则的任务，该任务会作为一次新的运行启动，而原先安排的任务仍保持已安排状态。通过 `/cmr/device/upgrade` 安排的任务没有需要保留的计划，因此该任务本身会启动。同一时间只能运行一个升级任务，因此在另一个任务已在进行时启动的任务会排队等待，而不会将其中断。
