---
sidebar_key: "cli-reference/system/ptp/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/system/ptp/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ptp/monitor {#systemptpmonitor}
**条件：** !smips
**系统能力：** ptp
**类型：** 命令
显示 PTP 配置文件实例的详细状态和同步精度，`monitor <number or name>`。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">PTP 配置文件实例的名称</ArgTableRow>
<ArgTableRow arg="clock-id" typ="string">本地时钟的标识符</ArgTableRow>
<ArgTableRow arg="priority1" typ="num">主时钟选举中本地的 priority1 值</ArgTableRow>
<ArgTableRow arg="priority2" typ="num">主时钟选举中本地的 priority2 值</ArgTableRow>
<ArgTableRow arg="i-am-gm" typ="bool">此设备是否为主时钟（grandmaster clock）</ArgTableRow>
<ArgTableRow arg="gm-clock-id" typ="string">主时钟（grandmaster clock）的标识符</ArgTableRow>
<ArgTableRow arg="gm-priority1" typ="num">主时钟（grandmaster clock）的 priority1</ArgTableRow>
<ArgTableRow arg="gm-priority2" typ="num">主时钟（grandmaster clock）的 priority2</ArgTableRow>
<ArgTableRow arg="master-clock-id" typ="string">PTP 路径中主时钟的标识符（grandmaster clock 或 boundary clock）</ArgTableRow>
<ArgTableRow arg="slave-port" typ="iface_enum">连接到主时钟的本地端口</ArgTableRow>
<ArgTableRow arg="freq-drift" typ="num">主时钟与从时钟之间的频率漂移，单位为十亿分之一</ArgTableRow>
<ArgTableRow arg="offset" typ="num">主时钟与从时钟之间的时间差，单位为纳秒</ArgTableRow>
<ArgTableRow arg="slave-port-delay" typ="num">两个时钟之间数据包测得的延迟，单位为纳秒（线缆和收发器长度会影响结果）</ArgTableRow>
</ArgTable>
