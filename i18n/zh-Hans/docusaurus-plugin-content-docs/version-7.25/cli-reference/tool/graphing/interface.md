---
title: "interface"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/graphing/interface
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/tool/graphing"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/graphing/interface 
**类型：** 目录

这些规则用于选择哪些接口会生成图表，以及哪些客户端可以在路由器的 `/graphs/` 网页（`/graphs/iface/<interface>/`）上查看其流量图表。添加规则之前不会生成任何图表。你可以为一个接口添加多条规则，每条规则都有自己的 `allow-address`；只要其中任意一条规则允许客户端地址，该客户端就能查看图表。接口规则不会开放资源图表或队列图表。图表以每秒位数显示接口接收的流量 `In` 和发送的流量 `Out`。请参阅 [Graphing](/docs/diagnostics-monitoring-and-troubleshooting/graphing)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Disabled rule: its graphs are not shown.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum { all:0 }">The interface to graph. `all` graphs every interface, also disabled interfaces, the loopback interface `lo` and dynamic interfaces such as PPPoE users while they exist. A rule for one dynamic interface loses it when the interface is created again, for example when a PPPoE user reconnects (the rule then shows an ID such as `*F00000`); graph a static PPPoE server binding instead. The interface of an existing rule cannot be changed (`Can't change interface, please create new config`): remove the rule and add a new one. Default: all.</ArgTableRow>
<ArgTableRow arg="allow-address" typ="alt { ip-prefix: ipPrefix
, ipv6-prefix: ip6Prefix
 }">The IPv4 or IPv6 prefix of the clients that can see this interface's graphs on the router's `/graphs/` web page. The pages need no login. A change applies immediately. To allow several prefixes, add a rule for each. Default: 0.0.0.0/0 (every IPv4 address).</ArgTableRow>
<ArgTableRow arg="store-on-disk" typ="bool">
- `yes` (default) - Keep the collected data in the system storage: the graphs survive a reboot. The data is written every [`store-every`](/docs/cli-reference/tool/graphing).
- `no` - Keep the data in RAM only: the graphs start empty after a reboot.
</ArgTableRow>
</ArgTable>
