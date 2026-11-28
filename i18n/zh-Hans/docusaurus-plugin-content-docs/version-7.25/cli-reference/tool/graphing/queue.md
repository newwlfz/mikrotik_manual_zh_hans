---
title: "queue"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/graphing/queue
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## tool/graphing/queue 
**类型：** 目录

用于选择哪些简单队列会绘制图形，以及哪些客户端可以在路由器的 `/graphs/` 网页（`/graphs/queue/<queue>/`，其中名称经过 URL 编码）上查看其流量图形的规则。添加规则之前不会绘制任何图形。当队列规则允许客户端地址时，或者在使用 `allow-target=yes` 时客户端地址位于队列的 `target` 中时，客户端可以看到该队列的图形。队列规则不会打开接口或资源图形。图形将到目标的流量（下载）显示为 `In`，将来自目标的流量（上传）显示为 `Out`，也会显示为队列 `max-limit` 的占比。请参阅 [Graphing](/docs/diagnostics-monitoring-and-troubleshooting/graphing)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Disabled rule: its graphs are not shown.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="simple-queue" typ="enum (all) { all:0 }">The simple queue to graph, by name. `all` graphs every simple queue, also the queues added later and the dynamic queues of PPP users. The queue of an existing rule cannot be changed (`Can't change queue, please create new config`): remove the rule and add a new one. Default: all.</ArgTableRow>
<ArgTableRow arg="allow-address" typ="alt { ip-prefix: ipPrefix
, ipv6-prefix: ip6Prefix
 }">The IPv4 or IPv6 prefix of the clients that can see the graphs of this rule's queues on the router's `/graphs/` web page. The pages need no login. A change applies immediately. To allow several prefixes, add a rule for each. Default: 0.0.0.0/0 (every IPv4 address).</ArgTableRow>
<ArgTableRow arg="store-on-disk" typ="bool">
- `yes` (default) - Keep the collected data in the system storage: the graphs survive a reboot. The data is written every [`store-every`](/docs/cli-reference/tool/graphing).
- `no` - Keep the data in RAM only: the graphs start empty after a reboot.
</ArgTableRow>
<ArgTableRow arg="allow-target" typ="bool">
Whether the addresses in a queue's `target` can also see that queue's graph, so that each customer of a simple queue sees their own traffic. A client sees a graph when any rule allows it, so another rule with `no` does not hide a graph that this rule shows.
- `yes` (default) - Every address in the target sees the graph, in addition to `allow-address`. A queue with a subnet target shows its graph to the whole subnet; a queue whose target is 0.0.0.0/0 or an interface, such as the dynamic queue of a PPP user, shows it to every client that reaches the web server.
- `no` - Only `allow-address` sees the graph.
</ArgTableRow>
</ArgTable>
