---
sidebar_key: "cli-reference/cmr/upgrade"
title: "upgrade"
source: https://manual.mikrotik.com/docs/cli-reference/cmr/upgrade
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/upgrade {#cmrupgrade}
**包：** cmr
**类型：** 目录

升级规则用于描述何时将选定设备（按标签）升级至哪个通道。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">规则已禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">规则为动态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" unset="1">升级规则的名称。</ArgTableRow>
<ArgTableRow arg="labels" typ="object" unset="1">使用标签选择该规则涵盖的设备。支持使用 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。如果省略，则该规则涵盖所有已连接设备。默认值：`all`。</ArgTableRow>
<ArgTableRow arg="order" typ="object">执行顺序（按标签）。当 `fail-policy=continue-order` 时必填。</ArgTableRow>
<ArgTableRow arg="channel" typ="alt" mandatory="1">升级通道：`long-term`、`stable`、`testing` 或 `development`。或者，通过直接将版本作为值来固定特定版本，例如 `channel=7.24.4`。</ArgTableRow>
<ArgTableRow arg="schedule-time" typ="multi { array-id, array-id, time: super { time: date
, [day] [ @enum (sun | mon | tue | wed | thu | fri | sat) { sun:1, mon:2, tue:3, wed:4, thu:5, fri:6, sat:7 }]
 }
 }" unset="1">升级开始时间：时间，可选星期几在 `@` 后给出。例如 `14:00:00` 表示每天 14:00 开始，`00:00:00@sat` 表示每周六午夜开始。多个条目用逗号分隔，例如 `00:00:00@sat,00:00:00@sun`。</ArgTableRow>
<ArgTableRow arg="strategy" typ="enum ()" unset="1">设备如何升级：`parallel` 会同时升级所有涵盖的设备；`sequential` 会逐个升级它们，并等待每个完成。使用 `continue-order` 时，设备按 `order` 给定的顺序按标签组处理：在 `parallel` 中，每个组的设备一起升级，在 `sequential` 中一次一个。默认值：`parallel`。</ArgTableRow>
<ArgTableRow arg="fail-policy" typ="enum ()" unset="1">设备失败时的行为：`continue` 跳过失败的设备并继续处理其余设备；`stop` 在首次失败时停止整个升级，并且不继续处理剩余设备，也不继续处理下一个标签组；`continue-order` 跳过失败的设备并继续处理下一个标签组，按照 `order` 给定的顺序逐个处理标签组。使用 `sequential` 时，会跳过失败设备所在组的其余部分；使用 `parallel` 时，只会放弃失败的设备，组中已在进行的设备会完成。默认值：`stop`。</ArgTableRow>
</ArgTable>
