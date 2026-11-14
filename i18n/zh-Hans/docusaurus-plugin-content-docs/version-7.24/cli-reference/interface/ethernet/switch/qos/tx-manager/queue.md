---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/tx-manager/queue"
sidebar_position: 1
title: "queue"
sidebar_label: "queue"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/ethernet/switch/qos/tx-manager/queue
captured_at: '2026-11-01T21:27:18+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/tx-manager/queue {#interfaceethernetswitchqostx-managerqueue}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="*" typ="default"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="H" typ="hw-offloaded"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="schedule" typ="enum (strict-priority | low-priority-group | high-priority-group) { strict-priority:0, low-priority-group:1, high-priority-group:2 }">按流量类的严格优先级或组内轮询来调度 tx</ArgTableRow>
<ArgTableRow arg="weight" typ="num">优先级组的权重值</ArgTableRow>
<ArgTableRow arg="queue-buffers" typ="alt { queue-buffers-pct: num [ .. 100]
, queue-buffers-byte: num [1536 .. 67108864]
 }" syscap="!prestera-cpss">每队列保留缓冲区。专用于该队列的字节数（或 tx-manager 的百分比）。</ArgTableRow>
<ArgTableRow arg="use-shared-buffers" typ="bool" syscap="!prestera-cpss">当端口或队列缓冲区已满时，允许使用共享缓冲池</ArgTableRow>
<ArgTableRow arg="wred" typ="bool" syscap="!prestera-ac3">加权随机早期检测</ArgTableRow>
<ArgTableRow arg="ecn" typ="bool" syscap="!prestera-ac3">显式拥塞通知 - ECN 标记</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="tx-manager" typ="enum"></ArgTableRow>
<ArgTableRow arg="traffic-class" typ="num"></ArgTableRow>
<ArgTableRow arg="wred-actual" typ="bool" syscap="!prestera-ac3">实际 WRED 值</ArgTableRow>
<ArgTableRow arg="ecn-actual" typ="bool" syscap="!prestera-ac3">实际 ECN 值</ArgTableRow>
</ArgTable>
