---
sidebar_key: "cli-reference/interface/w60g/station/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/interface/w60g/station/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/w60g/station/monitor {#interfacew60gstationmonitor}
**系统能力：** 60ghz
**软件包：** wireless-rep
**类型：** 命令

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="connected" typ="bool"></ArgTableRow>
<ArgTableRow arg="remote" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="tx-mode" typ="enum (dmg | edmg-cb1 | edmg-cb2 | edmg-cb1-long-ldpc | edmg-cb2-long-ldpc) { dmg:0, edmg-cb1:1, edmg-cb2:2, edmg-cb1-long-ldpc:3, edmg-cb2-long-ldpc:4 }"></ArgTableRow>
<ArgTableRow arg="tx-mcs" typ="num"></ArgTableRow>
<ArgTableRow arg="tx-phy-rate" typ="num"></ArgTableRow>
<ArgTableRow arg="signal" typ="num"></ArgTableRow>
<ArgTableRow arg="rssi" typ="num"></ArgTableRow>
<ArgTableRow arg="tx-sector" typ="num"></ArgTableRow>
<ArgTableRow arg="tx-sector-info" typ="string"></ArgTableRow>
<ArgTableRow arg="distance" typ="num"></ArgTableRow>
</ArgTable>
