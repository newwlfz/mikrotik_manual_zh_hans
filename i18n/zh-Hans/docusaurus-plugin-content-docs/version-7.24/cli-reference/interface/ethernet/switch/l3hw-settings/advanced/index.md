---
sidebar_key: "cli-reference/interface/ethernet/switch/l3hw-settings/advanced/index"
sidebar_position: 1
title: "advanced"
sidebar_label: "advanced"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/ethernet/switch/l3hw-settings/advanced
captured_at: '2026-11-01T21:27:12+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/l3hw-settings/advanced {#interfaceethernetswitchl3hw-settingsadvanced}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="route-queue-limit-high" typ="num" syscap="!prestera-cpss">如果队列中的路由数量超过此值，则禁用索引</ArgTableRow>
<ArgTableRow arg="route-queue-limit-low" typ="num" syscap="!prestera-cpss">如果队列中的路由数量降至该值，则重新启用索引</ArgTableRow>
<ArgTableRow arg="shwp-reset-counter" typ="num">在路由表发生此数量的变更后，重置 Shortest HW Prefix 并尝试完整路由表卸载</ArgTableRow>
<ArgTableRow arg="partial-offload-chunk" typ="num" syscap="prestera-bc2">部分卸载时进行增量添加所需的最小路由数量</ArgTableRow>
<ArgTableRow arg="route-index-delay-min" typ="time" syscap="!prestera-cpss">路由处理与表索引之间的最短时间</ArgTableRow>
<ArgTableRow arg="route-index-delay-max" typ="time">路由处理与表索引之间的最长时间</ArgTableRow>
<ArgTableRow arg="neigh-keepalive-interval" typ="time" syscap="!prestera-cpss">保持硬件卸载邻居（主机）存活的时间间隔</ArgTableRow>
<ArgTableRow arg="neigh-discovery-interval" typ="time" syscap="!prestera-cpss">发送 ARP/ND 请求以检查硬件卸载邻居可用性的时间间隔</ArgTableRow>
<ArgTableRow arg="neigh-discovery-burst-limit" typ="num" syscap="!prestera-cpss">限制一次可发送的 ARP/ND 请求数量</ArgTableRow>
<ArgTableRow arg="neigh-discovery-burst-delay" typ="time" syscap="!prestera-cpss">ARP/ND 请求突发之间的时间间隔</ArgTableRow>
<ArgTableRow arg="neigh-dump-retries" typ="num" syscap="!prestera-cpss">在失败情况下卸载邻居表的最大重试次数</ArgTableRow>
</ArgTable>
