---
sidebar_key: "cli-reference/ip/traffic-flow/monitor"
sidebar_position: 2
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/ip/traffic-flow/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/traffic-flow/monitor {#iptraffic-flowmonitor}
**类型：** 命令
显示当前的 flow-cache 计数器（输出实时更新；在 `duration` 之后停止）。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="finished-flows" typ="num">已过期并导出的流数量</ArgTableRow>
<ArgTableRow arg="active-flows" typ="num">当前缓存中的流数量</ArgTableRow>
<ArgTableRow arg="unmanaged-packets" typ="num">未能归入任何被跟踪流的报文</ArgTableRow>
<ArgTableRow arg="unmanaged-bytes" typ="num">未管理报文的字节数</ArgTableRow>
</ArgTable>
