---
sidebar_key: "cli-reference/openflow/group"
sidebar_position: 2
title: "group"
sidebar_label: 'group'
source: https://manual.mikrotik.com/docs/cli-reference/openflow/group
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## openflow/group {#openflowgroup}
**包：** openflow
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="switch" typ="enum">安装该组的控制器名称。</ArgTableRow>
<ArgTableRow arg="id" typ="num">组的标识符。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (all | select | indirect | ff)">组类型，决定动作桶的处理方式：all、select、indirect 或 fast failover。</ArgTableRow>
<ArgTableRow arg="bucket-count" typ="num">组中动作桶的数量。</ArgTableRow>
<ArgTableRow arg="flow-count" typ="num">引用该组的流表项数量。</ArgTableRow>
<ArgTableRow arg="buckets" typ="string">组中动作桶的列表。</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">该组处理的字节数。</ArgTableRow>
<ArgTableRow arg="packets" typ="num">该组处理的数据包数。</ArgTableRow>
<ArgTableRow arg="duration" typ="time">自该组安装以来经过的时间。</ArgTableRow>
<ArgTableRow arg="bucket-stats" typ="string">每个桶的数据包和字节统计信息。</ArgTableRow>
</ArgTable>
