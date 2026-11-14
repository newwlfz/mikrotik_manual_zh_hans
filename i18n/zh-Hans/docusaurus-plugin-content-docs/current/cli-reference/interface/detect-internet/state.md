---
sidebar_key: "cli-reference/interface/detect-internet/state"
sidebar_position: 1
title: "state"
sidebar_label: 'state'
source: https://manual.mikrotik.com/docs/cli-reference/interface/detect-internet/state
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/detect-internet/state {#interfacedetect-internetstate}
**类型：** 目录

Detect Internet 所监视的每个接口的只读状态（即 [`/interface/detect-internet`](./index.md) 中 `detect-interface-list` 的接口）。参见 [检测互联网](../../../diagnostics-monitoring-and-troubleshooting/detect-internet.md)。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="iface_enum">被监视的接口。</ArgTableRow>
<ArgTableRow arg="state" typ="enum (no-link | unknown | lan | wan | internet | slave) { no-link:0, unknown:1, lan:2, wan:3, internet:4, slave:5 }">
接口状态：
- `no-link` - 接口没有链路。
- `unknown` - 路由器正在检查该接口，大约 6 秒。
- `lan` - 二层接口的起始状态，以及链路变化后的状态。保持为 `lan` 一小时的接口会被锁定，直到下一次链路变化。
- `wan` - 路由器到 8.8.8.8 的活动路由经过该接口。三层隧道在其链路接通时变为 `wan`。`wan` 接口只有在链路变化后才会回到 `lan`。
- `internet` - 一个 `wan` 接口，路由器通过它到达 UDP 端口 30000 上的 `cloud.mikrotik.com`。
- `slave` - 该接口是网桥或其他接口的端口。
</ArgTableRow>
<ArgTableRow arg="state-change-time" typ="date">接口获得当前状态的时间。</ArgTableRow>
<ArgTableRow arg="cloud-rtt" typ="time">通过该接口进行的最后一次云检查的往返时间。当接口不是 `internet` 时为空。</ArgTableRow>
</ArgTable>
