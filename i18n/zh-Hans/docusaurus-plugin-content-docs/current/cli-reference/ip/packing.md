---
sidebar_key: "cli-reference/ip/packing"
sidebar_position: 15
title: "packing"
sidebar_label: 'packing'
source: https://manual.mikrotik.com/docs/cli-reference/ip/packing
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/packing {#ippacking}
**类型：** 目录

打包规则会把接口的出站数据包聚合成更大的数据包（可选压缩），并在接收端将其解包。两台路由器都需要在该接口上运行邻居发现。路由器通过打包链路发起的 TCP 连接会失败，请参阅 [IP 打包](../../system-information-and-utilities/ip-packing.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">打包规则已禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">用于聚合或压缩出站数据包并解包入站数据包的接口。路由器只会向通过邻居发现通告其解包能力的邻居进行打包，因此两台路由器都必须在该接口上运行发现。两台路由器必须对称配置。</ArgTableRow>
<ArgTableRow arg="packing" typ="enum (none | simple | compress-headers | compress-all) { none:0x00, simple:0x01, compress-headers:0x03, compress-all:0x07 }">
对出站数据包执行的操作：
- `none`（默认）- 按原样发送数据包。
- `simple` - 仅聚合数据包。
- `compress-headers` - 聚合数据包并压缩其头部；保持载荷不变。
- `compress-all` - 聚合数据包并压缩头部和载荷。
</ArgTableRow>
<ArgTableRow arg="unpacking" typ="enum (none | simple | compress-headers | compress-all) { none:0x00, simple:0x01, compress-headers:0x03, compress-all:0x07 }">
对传入数据包执行的操作。路由器会向邻居通告此设置（`/ip/neighbor` 中的 `unpack` 字段）：
- `none`（默认值）- 对接收到的数据包不做任何处理。
- `simple` - 解包聚合数据包。
- `compress-headers` - 解包聚合数据包并解压缩报头。
- `compress-all` - 解包聚合数据包并解压缩报头和负载。
</ArgTableRow>
<ArgTableRow arg="aggregated-size" typ="num">打包在发送聚合数据包前尝试达到的大小（以字节为单位）。打包会等待填满数据包，因此会增加链路延迟。范围：20..16384。默认值：1500。</ArgTableRow>
</ArgTable>
