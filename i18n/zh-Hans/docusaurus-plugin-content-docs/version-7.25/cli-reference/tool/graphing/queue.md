---
sidebar_key: "cli-reference/tool/graphing/queue"
sidebar_position: 2
title: "queue"
sidebar_label: 'queue'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/graphing/queue
captured_at: '2026-11-01T21:25:54+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/graphing/queue {#toolgraphingqueue}
**类型：** 目录

这些规则用于选择哪些简单队列会被绘制成图，以及哪些客户端可以在路由器的 `/graphs/` 网页上查看这些队列的流量图（`/graphs/queue/<queue>/`，其中名称经过 URL 编码）。在添加规则之前，不会绘制任何图形。当针对某个队列的规则允许客户端地址时，或者当 `allow-target=yes` 且客户端地址位于该队列的 `target` 中时，客户端就能看到该队列的图形。队列规则不会打开接口或资源图形。图形中 `In` 表示发往目标（下载）的流量，`Out` 表示来自目标（上传）的流量，同时也显示为队列 `max-limit` 的占比。请参阅 [图表](../../../diagnostics-monitoring-and-troubleshooting/graphing.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用的规则：不显示其图表。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="simple-queue" typ="enum (all) { all:0 }">要绘制图形的简单队列，按名称指定。`all` 会为每个简单队列绘制图形，也包括之后添加的队列以及 PPP 用户的动态队列。现有规则的队列无法更改（`Can't change queue, please create new config`）：请删除该规则并添加新规则。默认：all。</ArgTableRow>
<ArgTableRow arg="allow-address" typ="alt { ip-prefix: ipPrefix
, ipv6-prefix: ip6Prefix
 }">可以在路由器的 `/graphs/` 网页上查看此规则所对应队列图形的客户端的 IPv4 或 IPv6 前缀。这些页面无需登录。更改会立即生效。要允许多个前缀，请为每个前缀添加一条规则。默认：0.0.0.0/0（所有 IPv4 地址）。</ArgTableRow>
<ArgTableRow arg="store-on-disk" typ="bool">
- `yes`（默认） - 将收集的数据保存在系统存储中：图表在重启后仍会保留。数据每隔 [`store-every`](./index.md) 写入一次。
- `no` - 仅将数据保存在 RAM 中：重启后图表会从空白开始。
</ArgTableRow>
<ArgTableRow arg="allow-target" typ="bool">
队列的 `target` 中的地址是否也能看到该队列的图表，从而使 simple queue 的每个客户都能看到自己的流量。只要任一规则允许，客户端就能看到图表，因此另一条设置为 `no` 的规则不会隐藏此规则所显示的图表。
- `yes`（默认）- target 中的每个地址除 `allow-address` 之外还能看到图表。目标为子网的队列会向整个子网显示其图表；目标为 0.0.0.0/0 或某个接口的队列（例如 PPP 用户的动态队列）会向每个能访问到 Web 服务器的客户端显示其图表。
- `no` - 只有 `allow-address` 能看到图表。
</ArgTableRow>
</ArgTable>
