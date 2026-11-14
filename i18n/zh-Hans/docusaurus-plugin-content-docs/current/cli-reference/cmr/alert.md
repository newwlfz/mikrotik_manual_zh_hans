---
sidebar_key: "cli-reference/cmr/alert"
title: "alert"
source: https://manual.mikrotik.com/docs/cli-reference/cmr/alert
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/alert {#cmralert}
**包：** cmr
**类型：** Directory

告警规则定义条件，并在 CMR 控制器上运行其动作。设备规则通过 `labels` 选择设备。状态告警在所有已配置的状态条件匹配期间保持活动，并在变为活动时运行一次动作。仅当条件停止匹配、随后再次匹配后，它们才会再次触发。事件告警针对每次匹配的发生运行动作，且从不保持活动，也不计入活动告警计数器。一条规则可以包含多个状态条件，但最多只能包含一个事件条件。大多数告警按设备应用；`upgrade-job-done` 是用于整个升级作业的系统事件。有关条件、动作和告警作用范围，请参阅 [CMR - 告警规则](../../management-tools/cmr.md#alert-rules)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">警报规则已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" unset="1">警报规则的名称。</ArgTableRow>
<ArgTableRow arg="labels" typ="object" unset="1">
Select the devices, by labels, that the alert rule applies to. Supports + and - signs as AND and AND NOT operators, respectively; if no sign is provided, the OR operator is used.

当未设置 `labels` 时，该规则应用于所有已连接设备（`labels=all`）。
</ArgTableRow>
<ArgTableRow arg="connected" typ="bool" unset="1">
状态条件，用于匹配设备是已连接（`yes`）还是已断开（`no`）。

默认：no。
</ArgTableRow>
<ArgTableRow arg="cpu-above" typ="num" unset="1">
当 CPU 负载高于给定百分比值（0..100）时告警；等于阈值也会触发该规则。

默认：unset。
</ArgTableRow>
<ArgTableRow arg="cpu-below" typ="num" unset="1">
当 CPU 负载低于给定百分比值（0..100）时告警；仅当值严格低于阈值时才触发。

默认：unset。
</ArgTableRow>
<ArgTableRow arg="hdd-above" typ="num" unset="1">
当磁盘（HDD）负载高于给定百分比值（0..100）时告警；等于阈值也会触发该规则。

默认：unset。
</ArgTableRow>
<ArgTableRow arg="hdd-below" typ="num" unset="1">
当磁盘（HDD）负载低于给定百分比值（0..100）时告警；仅当值严格低于阈值时才触发。

默认：unset。
</ArgTableRow>
<ArgTableRow arg="mem-above" typ="num" unset="1">
当 RAM 负载高于给定百分比值（0..100）时告警；等于阈值也会触发该规则。

默认值：unset。
</ArgTableRow>
<ArgTableRow arg="mem-below" typ="num" unset="1">
当 RAM 负载低于给定的百分比值（0..100）时发出告警；仅当值严格低于阈值时触发。

默认值：unset。
</ArgTableRow>
<ArgTableRow arg="health-above" typ="num" unset="1">
当由 `health-value` 指定的健康传感器高于给定值时发出告警；等于阈值也会触发该规则。不上报该传感器的设备会被忽略。

默认值：unset。
</ArgTableRow>
<ArgTableRow arg="health-below" typ="num" unset="1">
当由 `health-value` 指定的健康传感器低于给定值时发出告警；仅当值严格低于阈值时触发。不上报该传感器的设备会被忽略。

默认值：unset。
</ArgTableRow>
<ArgTableRow arg="health-value" typ="string" unset="1">要比较的健康传感器名称，需匹配 `/system/health/print` 中的名称，例如 `cpu-temperature`。在动作文本中使用 `[cpu-temperature]` 样式的占位符。</ArgTableRow>
<ArgTableRow arg="interface-change" typ="alt { change: enum (any)
, change: ubit (running, not-running, added, removed)
 }" unset="1">
在接口状态变化时发出告警：

- `any`（默认）- 任何状态变化。
- `running` - 接口的链路接通。
- `not-running` - 接口的链路断开。
- `added` - 首次发现接口。
- `removed` - 不再发现接口。

`running` 和 `not-running` 遵循接口的链路状态，而不是其管理状态：启用或禁用没有连接的接口不会触发，而实际链路丢失或恢复则会触发。
</ArgTableRow>
<ArgTableRow arg="interface-type" typ="alt { type: enum (any)
, type: ubit (ethernet, wifi, bridge)
 }" unset="1">
将 `interface-change` 告警限制为一种接口类型：

- `any`（默认）- 任意类型的接口。
- `ethernet` - Ethernet 端口。
- `wifi` - 无线接口。
- `bridge` - 桥接接口。
</ArgTableRow>
<ArgTableRow arg="upgrade-available" typ="bool" unset="1">
当设备有更新的 RouterOS 版本可用时发出告警。

默认值：no。
</ArgTableRow>
<ArgTableRow arg="disconnected-more-than" typ="time" unset="1">
当设备断开连接的时间超过给定时间时发出告警。

默认：unset。
</ArgTableRow>
<ArgTableRow arg="upgrade-job-done" typ="alt { cond: enum (yes)
, cond: ubit (success, fail)
 }" unset="1">
当升级任务完成时告警；该规则对整个任务只触发一次，即在任务中最后一台设备完成时触发：

- `yes`（默认）- 任意结果。
- `success` - 任务成功完成。
- `fail` - 任务失败。

未安装升级便结束的任务会被视为失败任务，因此 `yes` 和 `fail` 两种取值都会触发。
</ArgTableRow>
<ArgTableRow arg="upgrade-done" typ="alt { cond: enum (yes)
, cond: ubit (success, fail)
 }" unset="1">
当某台设备的升级完成时告警；该规则对每台完成升级的设备各触发一次：

- `yes`（默认）- 任意结果。
- `success` - 升级成功完成。
- `fail` - 升级失败。

当设备没有更新的版本可用时，其升级仍会以失败结束（`[upgrade-error]` 为 `no upgrade available`），因此 `yes` 和 `fail` 两种取值都会触发。
</ArgTableRow>
<ArgTableRow arg="unpaired-device-connected" typ="bool" unset="1">
当一台未与控制器配对的设备连接时告警。

默认：no。
</ArgTableRow>
<ArgTableRow arg="rebooted" typ="bool" unset="1">
事件条件，在设备重启时触发；当重启是升级的一部分或来自 `/cmr/device/reboot` 时也会触发。

默认：no。
</ArgTableRow>
<ArgTableRow arg="log-topics" typ="multi { array-id, array-id, topic: super { !
, topic: enum
 }
 }" unset="1">要跟踪的日志主题；在主题前加上 `!` 可将其排除。与 `log-regex` 一起定义日志消息事件条件。CMR 会自动指示设备转发匹配的日志消息。</ArgTableRow>
<ArgTableRow arg="log-regex" typ="string" unset="1">用给定的正则表达式匹配日志消息。每条同时匹配所配置主题和正则表达式的消息都会触发动作，但不会创建持久的活动告警。</ArgTableRow>
<ArgTableRow arg="action.log" typ="string" unset="1">告警触发时向日志写入一条消息。消息中可以包含诸如 `[device]` 或 `[cpu-usage]` 的占位符，它们会被替换为触发告警的设备的值；不适用的占位符会呈现为 `unknown`。</ArgTableRow>
<ArgTableRow arg="action.log-topics" typ="multi { array-id, topic: enum
 }" unset="1">
要将消息写入的日志主题。

默认：`cmr,info`，对于日志行条件则为 `cmr,warning`。
</ArgTableRow>
<ArgTableRow arg="action.log-prefix" typ="string" unset="1">日志消息的前缀。设置后，前缀会直接加在消息之前，中间不加分隔符；未设置时，消息按原样写入。</ArgTableRow>
<ArgTableRow arg="action.script" typ="enum" unset="1">告警触发时运行指定的系统脚本。该脚本必须允许自身以降低的权限运行；否则该动作会失败并报 `executing script ... from cmr failed ... (not enough permissions)`。请将该脚本的 `dont-require-permissions` 设为 yes。</ArgTableRow>
<ArgTableRow arg="action.script-vars" typ="multi { array-id, script-var: string
 }" unset="1">要提供给 `action.script` 的变量名列表：每个变量都会填入触发告警的设备对应的值。例如 `device`、`identity`、`address`、`board`、`version` 在脚本中会变成 `$device`、`$identity` 等。带连字符的名称（例如 `cpu-usage`）无法作为普通脚本变量读取。</ArgTableRow>
<ArgTableRow arg="action.http-url" typ="string" unset="1">触发告警时要调用的 HTTP webhook URL。调用失败时，告警会将 `alert "<name>" HTTP action failed: <reason>` 写入 `cmr` 主题，严重级别为 `warning`，并在 `action-failures` 中统计该失败；其他操作仍会执行。</ArgTableRow>
<ArgTableRow arg="action.http-method" typ="enum (get | post | put | delete | head | patch)" unset="1">
用于 webhook 的 HTTP 方法：

- `get`
- `post`
- `put`
- `delete`
- `head`
- `patch`
</ArgTableRow>
<ArgTableRow arg="action.http-body" typ="string" unset="1">发送到 webhook 的 HTTP 请求正文。支持与日志消息相同的占位符，并按设备替换（例如 `[device]` 和 `[version]`）。不会自动添加 `Content-Type` 头；当接收方需要时，可使用 `action.http-headers` 添加，例如为 JSON 正文添加 `Content-Type: application/json`。</ArgTableRow>
<ArgTableRow arg="action.http-headers" typ="multi { header: string
 }" unset="1">随 webhook 发送的额外 HTTP 头，每个格式为 `Header: value`。请求还会携带控制器的 `RouterOS <version>` 用户代理。</ArgTableRow>
<ArgTableRow arg="reset-on-disconnect" typ="enum (yes | no) { yes:0, no:-1 }" unset="1">当设备断开连接时清除（重置）状态警报，以便重新连接的设备在仍然匹配时再次触发规则：`yes` 或 `no`。默认值：`no`（断开连接期间保留状态）。事件警报没有可重置的持久状态。</ArgTableRow>
<ArgTableRow arg="severity" typ="enum (critical | high | medium | low)" unset="1">
警报的严重性：

- `critical`
- `high`
- `medium`（默认）
- `low`
</ArgTableRow>
<ArgTableRow arg="category" typ="multi { array-id, category: enum
 }" unset="1">分配给警报的类别。类别是分组标签：服务器根据规则的条件分配一个类别（例如 `performance`、`availability`、`version`、`network` 或 `logging`），并且可以将其更改为任意值。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="devices" typ="num">警报规则匹配的设备数量（由 `labels` 选中的设备）。当规则覆盖所有设备时，此计数包含控制器本身。</ArgTableRow>
<ArgTableRow arg="devices-on" typ="num">存在活动状态警报的设备数量。事件发生次数不会增加此计数。</ArgTableRow>
<ArgTableRow arg="fired" typ="num">警报已触发的总次数。</ArgTableRow>
<ArgTableRow arg="action-failures" typ="num">警报操作失败的次数，例如无法访问 webhook。</ArgTableRow>
</ArgTable>
