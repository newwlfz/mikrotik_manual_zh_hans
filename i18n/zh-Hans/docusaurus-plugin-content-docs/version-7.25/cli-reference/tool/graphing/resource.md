---
sidebar_key: "cli-reference/tool/graphing/resource"
sidebar_position: 3
title: "resource"
sidebar_label: 'resource'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/graphing/resource
captured_at: '2026-11-01T21:25:55+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/graphing/resource {#toolgraphingresource}
**类型：** 目录

用于控制 CPU、内存和磁盘使用率图表（路由器网页上的 `/graphs/cpu/`、`/graphs/ram/` 和 `/graphs/hdd/`）的规则，以及哪些客户端可以查看这些图表。添加规则之前不会绘制任何图表。你可以添加多条规则，每条规则都有自己的 `allow-address`；只要其中任意一条规则允许某个客户端的地址，该客户端就能看到图表。资源规则不会开启接口或队列图表。请参阅[图表](../../../diagnostics-monitoring-and-troubleshooting/graphing.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用的规则：不显示其图表。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="allow-address" typ="alt { ip-prefix: ipPrefix
, ipv6-prefix: ip6Prefix
 }">可在路由器 `/graphs/` 网页上查看 CPU、内存和磁盘图表的客户端的 IPv4 或 IPv6 前缀。这些页面无需登录。更改会立即生效。要允许多个前缀，请为每个前缀添加一条规则。默认：0.0.0.0/0（所有 IPv4 地址）。</ArgTableRow>
<ArgTableRow arg="store-on-disk" typ="bool">
- `yes`（默认） - 将收集的数据保存在系统存储中：图表在重启后仍会保留。数据每隔 [`store-every`](./index.md) 写入一次。
- `no` - 仅将数据保存在 RAM 中：重启后图表会从空白开始。
</ArgTableRow>
</ArgTable>
