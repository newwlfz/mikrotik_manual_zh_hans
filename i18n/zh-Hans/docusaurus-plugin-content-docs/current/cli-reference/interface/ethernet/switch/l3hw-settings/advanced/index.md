---
sidebar_key: "cli-reference/interface/ethernet/switch/l3hw-settings/advanced"
title: "advanced"
sidebar_label: 'advanced'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/l3hw-settings/advanced
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/l3hw-settings/advanced {#interfaceethernetswitchl3hw-settingsadvanced}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 设置目录

此菜单允许针对特定使用场景调整 l3hw 设置。

除非获得 MikroTik 支持人员或 MikroTik 认证路由工程师的指示，否则不建议更改高级 L3HW 设置。应用不正确的设置可能会破坏 L3HW 运行。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="route-queue-limit-high" typ="num" syscap="!prestera-cpss">当 [`route-queue-size`](../monitor.md#route-queue-size) 超过此值时，交换机驱动会停止路由索引。降低此值可加快路由处理，但会增加路由在 RouterOS 中出现与其在硬件内存中出现之间的延迟。设置 **0** 会在处理队列中有任何路由时禁用路由索引——CPU 使用效率最高，但硬件卸载前的延迟最长。仅当存在静态路由时有用。当路由表频繁变化时，不建议与路由协议（如 BGP 或 OSPF）一起使用。</ArgTableRow>
<ArgTableRow arg="route-queue-limit-low" typ="num" syscap="!prestera-cpss">当 [`route-queue-size`](../monitor.md#route-queue-size) 降至该值时，重新启用路由索引。不得超过上限。设置 **0** 会告诉交换机驱动在下一次 hw-offloading 尝试之前处理所有待处理路由。虽然这是期望的行为，但在持续的 BGP 路由更新下，它可能会完全阻塞 hw-offloading。</ArgTableRow>
<ArgTableRow arg="shwp-reset-counter" typ="num">
在路由表发生此数量的更改后，重置最短硬件前缀（SHWP），并尝试进行完整路由表卸载。  
在部分卸载时，当整个路由表无法放入硬件内存，且较短前缀被重定向到 CPU 时，理论上无需尝试卸载比 SHWP 更短的路由前缀，因为这些前缀无论如何都会被重定向到 CPU。但是，路由表的重大变化可能会导致不同的索引布局，从而改变可被 hw-offloaded 的路由数量。这就是为什么建议偶尔执行完整的表重新索引。
降低此值可能会允许更多路由被 hw-offloaded，但会增加 CPU 使用率，反之亦然。设置 `shwp-reset-counter=0` 会在每次路由表更改后始终执行完整重新索引。
此设置仅在部分卸载（Partial Offloading）期间使用，并且当 [`ipv4-shortest-hw-prefix`](./monitor.md#ipv4-shortest-hw-prefix)=0（以及 IPv6 的相应情况）时不起作用。
</ArgTableRow>
<ArgTableRow arg="partial-offload-chunk" typ="num" syscap="prestera-bc2">
在部分卸载（Partial Offloading）中增量添加的最小路由数。  
取决于交换机芯片型号，路由要么按原样卸载（RouterOS 中的每个路由条目对应硬件内存中的一个条目），要么进行索引，写入硬件内存的是索引条目。此设置仅在部分卸载期间用于后者。
取决于索引碎片化情况，单条 IPv4 路由添加可能占用 -3 到 +6 个 LPM HW 内存块（由于索引碎片整理，某些路由添加可能会降低所需的 HW 内存量）。因此，无法预测可能适合硬件内存的确切路由数量。交换机驱动使用二分拆分算法来查找适合硬件的最大路由数量。  
假设有 128k 条路由，它们都无法放入硬件内存。算法会将数量减半，并尝试卸载 64k 条路由。假设卸载成功。在下一次迭代中，算法选择 96k，假设失败；然后 80k——再次失败，72k——成功，76k，等等，直到成功与失败数量之间的差值低于 partial-offload-chunk 值。
降低 partial-offload-chunk 值会增加可被 hw-offloaded 的路由数量，但也会提高 CPU 使用率，反之亦然。
</ArgTableRow>
<ArgTableRow arg="route-index-delay-min" typ="time" syscap="!prestera-cpss">
路由处理与其卸载之间的最小延迟。该延迟允许一起处理更多路由并一次性卸载它们，从而节省 CPU 使用率。  
它还通过减少每条路由的处理工作来加快整个路由表的卸载。另一方面，它会减慢单个路由的卸载。  
如果在延迟期间收到额外路由，则延迟会重置为 `route-index-delay-min` 值。在延迟期间添加越来越多的路由会不断重置计时器，直到达到 `route-index-delay-max`。
</ArgTableRow>
<ArgTableRow arg="route-index-delay-max" typ="time">路由处理与其卸载之间的最大延迟。当达到最大延迟时，即使还有更多路由待处理，已处理的路由也会被卸载。但是，`route-queue-limit-high` 的优先级高于此设置，这意味着当达到特定队列大小时，索引/卸载仍会暂停。</ArgTableRow>
<ArgTableRow arg="neigh-keepalive-interval" typ="time" syscap="!prestera-cpss">邻居（主机）保活间隔。当主机被 hw-offloaded 后，来自/发往它的所有流量都由交换机芯片路由，RouterOS 可能会认为该邻居不活动并将其删除。为防止这种情况，交换机驱动必须通过向 RouterOS 发送周期性刷新来保持已卸载邻居的存活。</ArgTableRow>
<ArgTableRow arg="neigh-discovery-interval" typ="time" syscap="!prestera-cpss">
发送 ARP (IPv4) 或 Neighbor Discovery (IPv6) 请求以检查已卸载主机是否仍处于活动状态的间隔。  
遗憾的是，交换芯片不提供每个邻居的统计信息。因此，检查已卸载主机是否仍处于活动状态的唯一方法是向所连接的网络偶尔发送 ARP (IPv4) / Neighbor Discovery (IPv6) 请求。  
Neighbor discovery 会在邻居 keepalive 工作中触发。因此，发现时间会向上取整到下一个 keepalive 会话。请为 `neigh-discovery-interval` 选择一个不能被 `neigh-keepalive-interval` 整除的值，以便在不同会话中发送 ARP/ND 请求，从而防止广播突发。
</ArgTableRow>
<ArgTableRow arg="neigh-discovery-burst-limit" typ="num" syscap="!prestera-cpss">一次可以发送的 ARP/ND 请求的最大数量。</ArgTableRow>
<ArgTableRow arg="neigh-discovery-burst-delay" typ="time" syscap="!prestera-cpss">如果请求数量超过 `neigh-discovery-burst-limit`，则 ARP/ND 后续突发之间的延迟。</ArgTableRow>
<ArgTableRow arg="neigh-dump-retries" typ="num" syscap="!prestera-cpss">在失败情况下卸载邻居表的最大重试次数。</ArgTableRow>
</ArgTable>
