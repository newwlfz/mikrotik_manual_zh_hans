---
sidebar_key: "cli-reference/cmr/device/upgrade"
sidebar_position: 6
title: "upgrade"
sidebar_label: 'upgrade'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/device/upgrade
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/device/upgrade {#cmrdeviceupgrade}
**软件包：** cmr
**类型：** Command

为所选设备启动升级（任务）。升级在 [`/cmr/upgrade/job`](../upgrade/job.md) 中作为任务运行，具有相同的任务状态和结果计数器。在控制台上，该命令会显示任务的设备及其状态，直到您按下 <kbd>Control</kbd>+<kbd>C</kbd> 或 `duration` 中给定的时间结束；任务将在服务器上继续运行。使用 `order` 时，标签组会依次升级；请将其他设备所连接的设备（例如交换机和网关）列在最后。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="L" typ="controller">包含 CMR 服务器本身（自客户端）。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="labels" typ="object" unset="1">使用 labels 选择要升级的设备。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。</ArgTableRow>
<ArgTableRow arg="order" typ="object" unset="1">执行顺序（按 labels）。</ArgTableRow>
<ArgTableRow arg="channel" typ="alt" unset="1">升级通道（`long-term`、`stable`、`testing` 或 `development`）或固定版本，例如 `channel=7.24.4`。当未设置时，每台设备按其自身的升级通道升级，即 `/cmr/device` 中显示的 `channel` 值。</ArgTableRow>
<ArgTableRow arg="schedule-time" typ="super { time: date
, [day] [ @enum (sun | mon | tue | wed | thu | fri | sat) { sun:1, mon:2, tue:3, wed:4, thu:5, fri:6, sat:7 }]
 }" unset="1">升级开始的时间：一个时间，可在 `@` 之后附加可选的工作日，例如 `14:00:00` 或 `00:00:00@sat`。任务会以 `scheduled` 状态等待，直到该时间的下一次到来。</ArgTableRow>
<ArgTableRow arg="strategy" typ="enum (parallel | sequential)" unset="1">设备的升级方式：`parallel` 同时升级所有涉及的设备；`sequential` 依次逐台升级并等待每台完成。使用 `continue-order` 时，设备按 `order` 给定的顺序逐标签组处理：在 `parallel` 下每组设备一起升级，在 `sequential` 下逐台升级。默认值：`parallel`。</ArgTableRow>
<ArgTableRow arg="fail-policy" typ="enum (continue | stop | continue-order)" unset="1">设备失败时的行为：`continue` 跳过失败的设备并继续处理其余设备；`stop` 在首次失败时停止整个升级，不再继续处理剩余设备或下一个标签组；`continue-order` 跳过失败的设备并继续处理下一个标签组，按 `order` 给定的顺序逐组处理各标签。在 `sequential` 下，失败设备所在标签组的其余设备会被跳过；在 `parallel` 下，只放弃失败的设备，组内已在进行中的设备会继续完成。默认值：`stop`。</ArgTableRow>
<ArgTableRow arg="packages" typ="multi { package: string
 }" unset="1">要升级的软件包。</ArgTableRow>
</ArgTable>
