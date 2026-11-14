---
sidebar_key: "cli-reference/cmr/upgrade/job"
title: "job"
source: https://manual.mikrotik.com/docs/cli-reference/cmr/upgrade/job
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/upgrade/job {#cmrupgradejob}
**软件包：** cmr
**类型：** 目录

一个升级作业就是一次升级运行。作业由升级规则创建，其参数在创建时从规则复制，并且是只读的。计划作业仅在启动时才解析其设备列表，因此对于计划作业，`show-devices` 可能为空。移除排队中或处理中的作业即可取消它。作业状态会变为 `cancelled`。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">任务已禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="rule">由升级规则创建的任务。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">任务涵盖的设备，按标签选择。对于由 `/cmr/device/upgrade` 为按编号选择的设备启动的任务，此字段为空。</ArgTableRow>
<ArgTableRow arg="order" typ="object">标签组的执行顺序，与 `continue-order` 配合使用。</ArgTableRow>
<ArgTableRow arg="channel" typ="alt">任务安装的升级通道或固定版本。当每台设备按各自的升级通道升级时为空。</ArgTableRow>
<ArgTableRow arg="strategy" typ="enum ()" unset="1">任务升级设备的方式：`parallel` 同时全部升级，`sequential` 依次逐个升级。使用 `continue-order` 时，设备按 `order` 给定的顺序逐标签组处理。</ArgTableRow>
<ArgTableRow arg="fail-policy" typ="enum ()" unset="1">设备失败时任务的行为：`continue`、`stop` 或 `continue-order`。`stop` 在首次失败时停止整个任务；`continue-order` 继续处理 `order` 中的下一个标签组。</ArgTableRow>
<ArgTableRow arg="schedule-time" typ="date" unset="1">任务计划运行的时间，格式与规则的 `schedule-time` 相同。</ArgTableRow>
<ArgTableRow arg="starts-in" typ="time" unset="1">作业开始前的剩余时间。仅对已调度的作业显示。</ArgTableRow>
<ArgTableRow arg="start-time" typ="date" unset="1">作业开始运行的时间。</ArgTableRow>
<ArgTableRow arg="end-time" typ="date" unset="1">作业完成的时间。</ArgTableRow>
<ArgTableRow arg="state" typ="enum (scheduled | queued | waiting devices | queued (busy) | version check | processing | done | cancelled)">当前作业状态：`scheduled`（等待运行）、`queued`（在另一个作业运行时创建，待其完成后开始）、`waiting devices`、`version check`（查找可用版本）、`processing`（正在升级）、`done`（已完成）或 `cancelled`（已移除）。</ArgTableRow>
<ArgTableRow arg="success" typ="composite { success: num
, total: num
 }" unset="1">已升级/总数，例如 `3/10`。当设备已处于目标版本，或作业开始时某台被覆盖的设备不可达，会出现 `0/total`。</ArgTableRow>
<ArgTableRow arg="run-time" typ="time" unset="1">作业运行所花费的时间。</ArgTableRow>
<ArgTableRow arg="packages" typ="multi { package: string
 }" unset="1">作业升级的软件包。</ArgTableRow>
</ArgTable>
