---
sidebar_key: "cli-reference/system/ptp/status"
sidebar_position: 3
title: "status"
sidebar_label: 'status'
source: https://manual.mikrotik.com/docs/cli-reference/system/ptp/status
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ptp/status {#systemptpstatus}
**Conditions：** !smips
**系统能力：** ptp
**类型：** Directory
每个实例和接口的当前 PTP 端口状态。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">PTP 端口的接口</ArgTableRow>
<ArgTableRow arg="state" typ="string">当前端口状态（例如 `listening`、`master` 或 `slave`）</ArgTableRow>
<ArgTableRow arg="delay" typ="num">从端口上测得的路径延迟，以纳秒为单位</ArgTableRow>
<ArgTableRow arg="port-nr" typ="num">此端口在 PTP 数据集中的端口号</ArgTableRow>
<ArgTableRow arg="as-capable" typ="bool">该端口是否符合 IEEE 802.1AS 的 asCapable 要求</ArgTableRow>
<ArgTableRow arg="neigh-freq-drift" typ="num">测得的邻居时钟频率漂移，以十亿分之一为单位</ArgTableRow>
</ArgTable>
