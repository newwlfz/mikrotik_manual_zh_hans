---
sidebar_key: "cli-reference/interface/ethernet/switch/l3hw-settings/advanced/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/l3hw-settings/advanced/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/l3hw-settings/advanced/monitor {#interfaceethernetswitchl3hw-settingsadvancedmonitor}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 命令

这是 [Monitor](../monitor.md) 的增强版本，为高级用户提供额外的遥测数据。Advanced Monitor 也包含基本 monitor 的所有数据。

```ros
/interface/ethernet/switch/l3hw-settings/advanced> monitor once
        ipv4-routes-total: 29968
           ipv4-routes-hw: 29957
          ipv4-routes-cpu: 11
  ipv4-shortest-hw-prefix: 0
               ipv4-hosts: 3
        ipv6-routes-total: 4
           ipv6-routes-hw: 0
          ipv6-routes-cpu: 4
  ipv6-shortest-hw-prefix: 0
               ipv6-hosts: 0
         route-queue-size: 0
         route-queue-rate: 0
       route-process-rate: 0
     fasttrack-ipv4-conns: 0
     fasttrack-queue-size: 0
     fasttrack-queue-rate: 0
   fasttrack-process-rate: 0
   fasttrack-hw-min-speed: 0
   fasttrack-hw-offloaded: 0
    fasttrack-hw-unloaded: 0
                  lpm-cap: 54560
                lpm-usage: 31931
             lpm-bank-cap: 2728
           lpm-bank-usage: 46,0,0,0,2589,2591,1983,0,2728,2728,2728,2728,2728,2728,2728,2728,2728,170,0,0
                  pbr-cap: 8192
                pbr-usage: 0
             pbr-lpm-bank: 3
                nat-usage: 0
              nexthop-cap: 8192
            nexthop-usage: 85
```

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="error-code" typ="num">L3HW 驱动处于故障状态时的错误代码。</ArgTableRow>
<ArgTableRow arg="state" typ="enum (ok | stopping | starting | fib-failure | net-failure | switch-failure | fasttrack-failure | out-of-memory) { ok:0, stopping:1, starting:2, fib-failure:3, net-failure:4, switch-failure:5, fasttrack-failure:6, out-of-memory:0xFFFFFFF4 }">L3HW 驱动的当前状态。</ArgTableRow>
<ArgTableRow arg="ipv4-routes-total" typ="num">交换机驱动处理的 IPv4 路由总数。</ArgTableRow>
<ArgTableRow arg="ipv4-routes-hw" typ="num">硬件卸载的 IPv4 路由数量（即硬件路由）。</ArgTableRow>
<ArgTableRow arg="ipv4-routes-cpu" typ="num">重定向到 CPU 的 IPv4 路由数量（即软件路由）。</ArgTableRow>
<ArgTableRow arg="ipv4-shortest-hw-prefix" typ="num">**最短硬件前缀 (SHWP)**（针对 IPv4）。如果整个 IPv4 路由表无法放入硬件内存，则应用**部分卸载**，即最长前缀被硬件卸载，而较短前缀被重定向到 CPU。此字段显示被卸载到硬件内存的最短路由前缀 (/x)。所有比该前缀更短的前缀都由 CPU 处理。`ipv4-shortest-hw-prefix=0` 表示整个 IPv4 路由表都被卸载到硬件内存。</ArgTableRow>
<ArgTableRow arg="ipv4-hosts" typ="num">硬件卸载的 IPv4 主机数量（/32 路由）。</ArgTableRow>
<ArgTableRow arg="ipv6-routes-total" typ="num">交换机驱动处理的 IPv6 路由总数。</ArgTableRow>
<ArgTableRow arg="ipv6-routes-hw" typ="num">硬件卸载的 IPv6 路由数量（即硬件路由）。仅在启用 IPv6 硬件路由（`ipv6-hw=yes`）时显示。</ArgTableRow>
<ArgTableRow arg="ipv6-routes-cpu" typ="num">重定向到 CPU 的 IPv6 路由数量（即软件路由）。仅在启用 IPv6 硬件路由（`ipv6-hw=yes`）时显示。</ArgTableRow>
<ArgTableRow arg="ipv6-shortest-hw-prefix" typ="num">**最短硬件前缀 (SHWP)**（针对 IPv6）。如果整个 IPv6 路由表无法放入硬件内存，则应用**部分卸载**，即最长前缀被硬件卸载，而较短前缀被重定向到 CPU。此字段显示被卸载到硬件内存的最短路由前缀 (/x)。所有比该前缀更短的前缀都由 CPU 处理。`ipv6-shortest-hw-prefix=0` 表示整个 IPv6 路由表都被卸载到硬件内存。仅在启用 IPv6 硬件路由（`ipv6-hw=yes`）时显示。</ArgTableRow>
<ArgTableRow arg="ipv6-hosts" typ="num">硬件卸载的 IPv6 主机数量（/128 路由）。仅在启用 IPv6 硬件路由（`ipv6-hw=yes`）时显示。</ArgTableRow>
<ArgTableRow arg="route-queue-size" typ="num" syscap="!prestera-cpss">队列中等待交换机芯片驱动处理的路由数量。在正常工作条件下，此字段为 0，表示所有路由都已由驱动处理。</ArgTableRow>
<ArgTableRow arg="route-queue-rate" typ="num" syscap="!prestera-cpss">路由被加入队列等待交换机驱动处理的速率（`route-queue-size` 路由每秒的增长速率）。</ArgTableRow>
<ArgTableRow arg="route-process-rate" typ="num" syscap="!prestera-cpss">交换机驱动处理先前排队路由的速率（`route-queue-size` 路由每秒的减少速率）。</ArgTableRow>
<ArgTableRow arg="nexthop-cap" typ="num">下一跳容量。</ArgTableRow>
<ArgTableRow arg="nexthop-usage" typ="num">当前使用的下一跳数量。</ArgTableRow>
<ArgTableRow arg="vxlan-mtu-packet-drop" typ="num" syscap="prestera-bc2">因超出接口 MTU 设置而丢弃的 VXLAN 数据包数量。</ArgTableRow>
<ArgTableRow arg="fasttrack-ipv4-conns" typ="num" syscap="prestera-bc2">硬件卸载的 FastTrack 连接数量。仅当启用 FastTrack 连接的硬件卸载时才会显示该参数。</ArgTableRow>
<ArgTableRow arg="fasttrack-queue-size" typ="num" syscap="prestera-bc2">队列中等待交换机芯片驱动处理的 FastTrack 连接数量。</ArgTableRow>
<ArgTableRow arg="fasttrack-queue-rate" typ="num" syscap="prestera-bc2">FastTrack 连接被加入队列等待交换机驱动处理的速率（`fasttrack-queue-size` 连接每秒的增长速率）。</ArgTableRow>
<ArgTableRow arg="fasttrack-process-rate" typ="num" syscap="prestera-bc2">交换机驱动处理先前排队的 FastTrack 连接的速率（`fasttrack-queue-size` 连接每秒的减少速率）。</ArgTableRow>
<ArgTableRow arg="fasttrack-hw-min-speed" typ="num" syscap="prestera-bc2">当用于存储 FastTrack 的硬件内存已满时，此字段显示硬件卸载的 FastTrack 连接的最低速度（字节/秒）。仅当启用 FastTrack 连接的硬件卸载时才会显示该参数。</ArgTableRow>
<ArgTableRow arg="fasttrack-hw-offloaded" typ="num" syscap="prestera-bc2">卸载到硬件的 FastTrack 连接数量。计数器每秒重置。</ArgTableRow>
<ArgTableRow arg="fasttrack-hw-unloaded" typ="num" syscap="prestera-bc2">从硬件卸载的 FastTrack 连接数量（重定向到软件路由）。计数器每秒重置。</ArgTableRow>
<ArgTableRow arg="lpm-cap" typ="num" syscap="!prestera-ac3">LPM 硬件表的大小（LPM = 最长前缀匹配）。LPM 存储用于硬件路由的路由索引。并非所有交换机芯片型号都使用 LPM。其他型号使用 TCAM。</ArgTableRow>
<ArgTableRow arg="lpm-usage" typ="num" syscap="!prestera-ac3">已使用的 LPM 块数量。</ArgTableRow>
<ArgTableRow arg="lpm-bank-cap" typ="num" syscap="!prestera-ac3">LPM 内存按 bank 组织。此值显示单个 bank 的大小（以 LPM 块为单位）。bank 大小取决于交换机芯片型号。lpm-cap / lpm-bank-cap = bank 数量。</ArgTableRow>
<ArgTableRow arg="lpm-bank-usage" typ="multi { array-id, lpm-bank: num
 }" syscap="!prestera-ac3">每个 bank 的 LPM 使用量（以 LPM 块为单位）。</ArgTableRow>
<ArgTableRow arg="pbr-cap" typ="num" syscap="prestera-bc2">策略路由（PBR）硬件表的大小。PBR 用于 FastTrack 连接的 NAT 卸载。</ArgTableRow>
<ArgTableRow arg="pbr-usage" typ="num" syscap="prestera-bc2">已使用的 PBR 条目数量。</ArgTableRow>
<ArgTableRow arg="pbr-lpm-bank" typ="num" syscap="prestera-bc2">PBR 与路由表共享 LPM 内存 bank。此值显示与 PBR 共享的 LPM bank 索引（0 = 第一个 bank）。</ArgTableRow>
<ArgTableRow arg="nat-usage" typ="num" syscap="prestera-bc2">已使用的 NAT 硬件条目数量（用于 FastTrack 连接）。</ArgTableRow>
</ArgTable>
