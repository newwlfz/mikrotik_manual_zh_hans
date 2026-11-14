---
sidebar_key: "cli-reference/interface/ethernet/switch/l3hw-settings/monitor"
sidebar_position: 2
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/l3hw-settings/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/l3hw-settings/monitor {#interfaceethernetswitchl3hw-settingsmonitor}
**系统能力：** rbswitch and crs_prestera
**类型：** 命令

此命令用于监控交换芯片及 L3HW 相关驱动的统计信息。

```ros
/interface/ethernet/switch/l3hw-settings/monitor
        ipv4-routes-total: 99363
           ipv4-routes-hw: 61250
          ipv4-routes-cpu: 38112
  ipv4-shortest-hw-prefix: 24
               ipv4-hosts: 87
        ipv6-routes-total: 15
           ipv6-routes-hw: 11
          ipv6-routes-cpu: 4
  ipv6-shortest-hw-prefix: 0
               ipv6-hosts: 7
         route-queue-size: 118
     fasttrack-ipv4-conns: 2031
   fasttrack-hw-min-speed: 0
              nexthop-cap: 8192
            nexthop-usage: 93
    vxlan-mtu-packet-drop: 0
```

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="state" typ="enum (ok | stopping | starting | fib-failure | net-failure | switch-failure | fasttrack-failure | out-of-memory) { ok:0, stopping:1, starting:2, fib-failure:3, net-failure:4, switch-failure:5, fasttrack-failure:6, out-of-memory:0xFFFFFFF4 }">L3HW 驱动的当前状态。</ArgTableRow>
<ArgTableRow arg="ipv4-routes-total" typ="num">交换芯片驱动处理的 IPv4 路由总数。</ArgTableRow>
<ArgTableRow arg="ipv4-routes-hw" typ="num">硬件卸载的 IPv4 路由数量。</ArgTableRow>
<ArgTableRow arg="ipv4-routes-cpu" typ="num">重定向到 CPU 的 IPv4 路由数量。</ArgTableRow>
<ArgTableRow arg="ipv4-shortest-hw-prefix" typ="num">IPv4 的**最短硬件前缀 (SHWP)**。如果整个 IPv4 路由表无法装入硬件内存，则会应用**部分卸载**，即最长前缀被硬件卸载，而较短前缀被重定向到 CPU。此字段显示卸载到硬件内存的最短路由前缀 (/x)。所有比该前缀更短的前缀均由 CPU 处理。`ipv4-shortest-hw-prefix=0` 表示整个 IPv4 路由表都已卸载到硬件内存。</ArgTableRow>
<ArgTableRow arg="ipv4-hosts" typ="num">硬件卸载的 IPv4 主机（/32 路由）数量。</ArgTableRow>
<ArgTableRow arg="ipv6-routes-total" typ="num">交换芯片驱动处理的 IPv6 路由总数。</ArgTableRow>
<ArgTableRow arg="ipv6-routes-hw" typ="num">硬件卸载的 IPv6 路由（也称为硬件路由）数量。仅当启用 IPv6 硬件路由（`ipv6-hw=yes`）时显示。</ArgTableRow>
<ArgTableRow arg="ipv6-routes-cpu" typ="num">重定向到 CPU 的 IPv6 路由（也称为软件路由）数量。仅当启用 IPv6 硬件路由（`ipv6-hw=yes`）时显示。</ArgTableRow>
<ArgTableRow arg="ipv6-shortest-hw-prefix" typ="num">IPv6 的**最短硬件前缀 (SHWP)**。如果整个 IPv6 路由表无法装入硬件内存，则会应用**部分卸载**，即最长前缀被硬件卸载，而较短前缀被重定向到 CPU。此字段显示卸载到硬件内存的最短路由前缀 (/x)。所有比该前缀更短的前缀均由 CPU 处理。`ipv6-shortest-hw-prefix=0` 表示整个 IPv6 路由表都已卸载到硬件内存。仅当启用 IPv6 硬件路由（`ipv6-hw=yes`）时显示。</ArgTableRow>
<ArgTableRow arg="ipv6-hosts" typ="num">硬件卸载的 IPv6 主机（/128 路由）数量。</ArgTableRow>
<ArgTableRow arg="route-queue-size" typ="num" syscap="!prestera-cpss">等待交换芯片驱动处理的路由队列中的路由数量。正常工作条件下，此字段为 0，表示所有路由均已由驱动处理。</ArgTableRow>
<ArgTableRow arg="nexthop-cap" typ="num">下一跳容量。</ArgTableRow>
<ArgTableRow arg="nexthop-usage" typ="num">当前使用的下一跳数量。</ArgTableRow>
<ArgTableRow arg="vxlan-mtu-packet-drop" typ="num" syscap="prestera-bc2">由于超出接口 MTU 设置而丢弃的 VXLAN 数据包数量。</ArgTableRow>
<ArgTableRow arg="fasttrack-ipv4-conns" typ="num" syscap="prestera-bc2">硬件卸载的 FastTrack 连接数量。仅当启用 FastTrack 连接的硬件卸载时才会显示此参数。</ArgTableRow>
<ArgTableRow arg="fasttrack-hw-min-speed" typ="num" syscap="prestera-bc2">当用于存储 FastTrack 的硬件内存已满时，此字段显示硬件卸载的 FastTrack 连接的最低速度（单位：字节/秒）。仅当启用 FastTrack 连接的硬件卸载时才会显示此参数。</ArgTableRow>
</ArgTable>
