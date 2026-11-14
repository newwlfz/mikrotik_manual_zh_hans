---
sidebar_key: "cli-reference/openflow/meter"
sidebar_position: 3
title: "meter"
sidebar_label: 'meter'
source: https://manual.mikrotik.com/docs/cli-reference/openflow/meter
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## openflow/meter {#openflowmeter}
**软件包：** openflow
**类型：** 目录

该子菜单列出了控制器安装的流量计量表。计量表支持在输出和应用动作指令之前进行速率监控。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="switch" typ="enum">安装该计量表的控制器名称。</ArgTableRow>
<ArgTableRow arg="id" typ="num">计量表的标识符。</ArgTableRow>
<ArgTableRow arg="band-count" typ="num">该计量表中的计量带数量。</ArgTableRow>
<ArgTableRow arg="bands" typ="string">定义速率以及数据包处理方式的计量带列表。</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">该计量表处理的字节数。</ArgTableRow>
<ArgTableRow arg="packets" typ="num">该计量表处理的数据包数。</ArgTableRow>
<ArgTableRow arg="duration" typ="time">自该计量表安装以来经过的时间。</ArgTableRow>
</ArgTable>
