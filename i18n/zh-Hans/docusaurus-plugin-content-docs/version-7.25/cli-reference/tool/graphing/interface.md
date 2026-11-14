---
sidebar_key: "cli-reference/tool/graphing/interface"
sidebar_position: 1
title: "interface"
sidebar_label: 'interface'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/graphing/interface
captured_at: '2026-11-01T21:25:53+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/graphing/interface {#toolgraphinginterface}
**类型：** 目录

这些规则用于选择要绘制图表的接口，以及哪些客户端可以在路由器的 `/graphs/` 网页（`/graphs/iface/<interface>/`）上查看其流量图表。在添加规则之前，不会绘制任何图表。可以为同一个接口添加多条规则，每条规则都有自己的 `allow-address`；只要其中任意一条规则允许某个客户端的地址，该客户端就能看到图表。接口规则不会开放资源图表或队列图表。图表中，`In` 表示接口接收的流量，`Out` 表示接口发送的流量，单位为比特/秒。参见 [图表](../../../diagnostics-monitoring-and-troubleshooting/graphing.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用的规则：不显示其图表。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum { all:0 }">要绘制图表的接口。`all` 会为每个接口绘制图表，也包括已禁用的接口、回环接口 `lo` 以及存在期间的动态接口，例如 PPPoE 用户。针对某个动态接口的规则会在该接口重新创建时失去它，例如 PPPoE 用户重新连接时（此时规则会显示类似 `*F00000` 的 ID）；请改为绘制静态 PPPoE 服务器绑定的图表。现有规则的接口无法更改（`Can't change interface, please create new config`）：请删除该规则并添加新规则。默认：all。</ArgTableRow>
<ArgTableRow arg="allow-address" typ="alt { ip-prefix: ipPrefix
, ipv6-prefix: ip6Prefix
 }">可以在路由器 `/graphs/` 网页上查看此接口图表的客户端的 IPv4 或 IPv6 前缀。这些页面无需登录。更改会立即生效。要允许多个前缀，请为每个前缀添加一条规则。默认：0.0.0.0/0（每个 IPv4 地址）。</ArgTableRow>
<ArgTableRow arg="store-on-disk" typ="bool">
- `yes`（默认） - 将收集的数据保存在系统存储中：图表在重启后仍会保留。数据每隔 [`store-every`](./index.md) 写入一次。
- `no` - 仅将数据保存在 RAM 中：重启后图表会从空白开始。
</ArgTableRow>
</ArgTable>
