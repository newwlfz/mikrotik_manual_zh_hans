---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/priority-flow-control"
sidebar_position: 4
title: "priority-flow-control"
sidebar_label: "priority-flow-control"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/ethernet/switch/qos/priority-flow-control
captured_at: '2026-11-01T21:27:17+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/priority-flow-control {#interfaceethernetswitchqospriority-flow-control}
**系统能力：** rbswitch and crs_prestera and !prestera-ac3
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">PFC 配置文件名称</ArgTableRow>
<ArgTableRow arg="traffic-class" typ="multi { array-id, tc: num [ .. 7]
 }" mandatory="1"></ArgTableRow>
<ArgTableRow arg="rx" typ="bool">接收（并遵循）PFC 帧</ArgTableRow>
<ArgTableRow arg="tx" typ="bool">发送 PFC 帧</ArgTableRow>
<ArgTableRow arg="pause-threshold" typ="alt { pause-threshold-pct: num [ .. 100]
, pause-threshold-byte: num [1536 .. ]
 }">当排队报文的总大小达到此阈值时，发送暂停帧（XOFF）</ArgTableRow>
<ArgTableRow arg="resume-threshold" typ="alt { resume-threshold-pct: num [ .. 100]
, resume-threshold-byte: num [256 .. ]
 }">当排队报文的总大小降至此阈值时，发送恢复帧（XON）</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hw-id" typ="num"></ArgTableRow>
</ArgTable>
