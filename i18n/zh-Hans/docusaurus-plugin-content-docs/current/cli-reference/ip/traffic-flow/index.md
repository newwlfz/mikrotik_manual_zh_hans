---
sidebar_key: "cli-reference/ip/traffic-flow"
title: "traffic-flow"
sidebar_label: 'traffic-flow'
source: https://manual.mikrotik.com/docs/cli-reference/ip/traffic-flow
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/traffic-flow {#iptraffic-flow}
**类型：** 设置目录
Traffic-Flow（兼容 NetFlow/IPFIX）配置。使用 `enabled=yes` 将其开启，并在 [`target`](./target.md) 下添加导出目标。流量仅通过路由器的 CPU 路径，因此经硬件卸载的流量无法被导出。请参阅 [流量监控](../../../diagnostics-monitoring-and-troubleshooting/traffic-flow/index.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">启用或禁用 Traffic-Flow 服务</ArgTableRow>
<ArgTableRow arg="interfaces" typ="multi { array-id, interface-or-list: alt { interface: iface_enum { local:0, all:0xFFFFFFFF }
, interface-list: enum
 }
 }">以逗号分隔的接口名称（或 `all`），其转发的流量将被统计</ArgTableRow>
<ArgTableRow arg="cache-entries" typ="enum (1k | 2k | 4k | 8k | 16k | 32k | 64k | 128k | 256k | 512k | 1M | 2M | 4M | 8M | 16M | 32M) { 1k:0x400, 2k:0x800, 4k:0x1000, 8k:0x2000, 16k:0x4000, 32k:0x8000, 64k:0x10000, 128k:0x20000, 256k:0x40000, 512k:0x80000, 1M:0x100000, 2M:0x200000, 4M:0x400000, 8M:0x800000, 16M:0x1000000, 32M:0x2000000 }">一次保存在内存中的流记录数量（默认值取决于设备内存：较大的板卡上为 256k，最小的板卡上低至 4k）</ArgTableRow>
<ArgTableRow arg="active-flow-timeout" typ="time">流的最大生存时间，即使数据包持续匹配该流也是如此；超过此时间后该流会过期并被导出。默认值：30m</ArgTableRow>
<ArgTableRow arg="inactive-flow-timeout" typ="time">如果某个流在这么长时间内没有收到任何数据包，就会过期并被导出；下一个数据包将开始一个新流。如果超时时间太短，可能会产生大量流并使缓冲区溢出。默认值：15s</ArgTableRow>
<ArgTableRow arg="packet-sampling" typ="bool">启用数据包采样：仅按照 `sampling-interval` 和 `sampling-space` 统计数据包</ArgTableRow>
<ArgTableRow arg="sampling-interval" typ="num">每个采样周期中被采样的连续数据包数量</ArgTableRow>
<ArgTableRow arg="sampling-space" typ="num">每个采样周期中被省略的连续数据包数量</ArgTableRow>
</ArgTable>
