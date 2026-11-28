---
title: "resource"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/graphing/resource
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/graphing/resource 
**类型：** 目录

用于 CPU、内存和磁盘使用率图表的规则（路由器网页上的 `/graphs/cpu/`、`/graphs/ram/` 和 `/graphs/hdd/`）以及可查看这些图表的客户端。在添加规则之前，不会绘制任何图表。可以添加多条规则，每条规则都有自己的 `allow-address`；当任意规则允许客户端地址时，该客户端即可查看图表。资源规则不会打开接口或队列图表。详情请参阅 [Graphing](/docs/diagnostics-monitoring-and-troubleshooting/graphing)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Disabled rule: its graphs are not shown.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="allow-address" typ="alt { ip-prefix: ipPrefix
, ipv6-prefix: ip6Prefix
 }">The IPv4 or IPv6 prefix of the clients that can see the CPU, memory and disk graphs on the router's `/graphs/` web page. The pages need no login. A change applies immediately. To allow several prefixes, add a rule for each. Default: 0.0.0.0/0 (every IPv4 address).</ArgTableRow>
<ArgTableRow arg="store-on-disk" typ="bool">
- `yes` (default) - Keep the collected data in the system storage: the graphs survive a reboot. The data is written every [`store-every`](/docs/cli-reference/tool/graphing).
- `no` - Keep the data in RAM only: the graphs start empty after a reboot.
</ArgTableRow>
</ArgTable>
