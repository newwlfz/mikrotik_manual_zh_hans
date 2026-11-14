---
sidebar_key: "cli-reference/interface/detect-internet/index"
sidebar_position: 1
title: "detect-internet"
sidebar_label: 'detect-internet'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/detect-internet
captured_at: '2026-11-01T21:22:29+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/detect-internet {#interfacedetect-internet}
**类型：** 设置目录

Detect Internet 的设置。它会根据链路状态、经过该接口的路由，以及 `cloud.mikrotik.com` 是否能通过该接口在 UDP 端口 30000 上应答，为 `detect-interface-list` 中的每个接口赋予一个状态（见 [`state`](./state.md)），并把接口添加到此处设置的 LAN、WAN 和 internet 接口列表中。参见 [检测互联网](../../../diagnostics-monitoring-and-troubleshooting/detect-internet.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="detect-interface-list" typ="enum">Detect Internet 所监视的接口列表。`none` 会关闭 Detect Internet。默认值：none。</ArgTableRow>
<ArgTableRow arg="lan-interface-list" typ="enum">该接口列表会以动态成员的形式接收处于 `lan` 状态的接口，并带有注释 `LAN detected`。默认值：none。</ArgTableRow>
<ArgTableRow arg="wan-interface-list" typ="enum">该接口列表会以动态成员的形式接收处于 `wan` 状态的接口，并带有注释 `WAN detected`。默认值：none。</ArgTableRow>
<ArgTableRow arg="internet-interface-list" typ="enum">该接口列表会以动态成员的形式接收处于 `internet` 状态的接口，并带有注释 `INTERNET detected`。默认值：none。</ArgTableRow>
<ArgTableRow arg="request-interval" typ="time">设置路由器检查云端的频率：它会以此间隔的一半向 `cloud.mikrotik.com` 发送 UDP 消息，使用 `2m` 时约每分钟一次。使用默认值时，处于 `internet` 状态的接口在约 4 分钟无应答后会回退为 `wan`。范围：1m..1d。默认值：2m。</ArgTableRow>
</ArgTable>
