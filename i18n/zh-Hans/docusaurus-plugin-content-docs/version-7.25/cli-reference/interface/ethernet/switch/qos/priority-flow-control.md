---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/priority-flow-control"
sidebar_position: 4
title: "priority-flow-control"
sidebar_label: 'priority-flow-control'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/priority-flow-control
captured_at: '2026-11-01T21:22:41+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/priority-flow-control {#interfaceethernetswitchqospriority-flow-control}
**系统能力：** rbswitch and crs_prestera and !prestera-ac3
**类型：** 目录

[PFC](../../../../../bridging-and-switching/quality-of-service.md#priority-based-flow-control-pfc) 配置按配置文件组织。不同的交换机端口可以分配到不同的 PFC 配置文件。硬件 Tx 管理器的最大数量取决于交换芯片型号。名为“**disabled**”的内置配置文件无法更改。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">PFC 配置文件的用户自定义名称。</ArgTableRow>
<ArgTableRow arg="traffic-class" typ="multi { array-id, tc: num [ .. 7]
 }" mandatory="1">已启用 PFC 的流量类别列表。</ArgTableRow>
<ArgTableRow arg="rx" typ="bool">启用接收 PFC 帧。收到的 PFC 帧会在该 PFC 帧指定的持续时间内暂停接收到该 PFC 帧的端口上的特定优先级队列。禁用 rx 会禁用队列暂停。</ArgTableRow>
<ArgTableRow arg="tx" typ="bool">启用发送 PFC 帧。</ArgTableRow>
<ArgTableRow arg="pause-threshold" typ="alt { pause-threshold-pct: num [ .. 100]
, pause-threshold-byte: num [1536 .. ]
 }">当入队数据包的总大小达到此阈值时，发送暂停帧 (XOFF)。入队数据包按入端口计数。仅当 **tx=yes** 时生效。该值可以以字节为单位显式给出，或按相应共享池大小 (**shared-poolX-byte-cap**) 的百分比给出。</ArgTableRow>
<ArgTableRow arg="resume-threshold" typ="alt { resume-threshold-pct: num [ .. 100]
, resume-threshold-byte: num [256 .. ]
 }">当入队数据包的总大小降至此阈值时，发送恢复帧 (XON)。入队数据包按入端口计数。仅当 **tx=yes** 时生效。该值可以以字节为单位显式给出，或按相应共享池大小 (**shared-poolX-byte-cap**) 的百分比给出。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="hw-id" typ="num"></ArgTableRow>
</ArgTable>
