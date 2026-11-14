---
sidebar_key: "cli-reference/ipv6/settings"
sidebar_position: 10
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/settings {#ipv6settings}
**类型：** 设置目录

此菜单允许你配置各种与 IPv6 相关的内核及系统级网络参数。这些设置控制操作系统如何处理 IP 流量和网络通信。

:::note
更改 IPv6 设置不会动态移除现有的 SLAAC 配置，需要重启路由器。

:::

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="disable-ipv6" typ="bool">在系统范围内禁用或启用 IPv6。禁用后，会阻止生成链路本地地址。</ArgTableRow>
<ArgTableRow arg="forward" typ="bool">启用或禁用接口之间的数据包转发。</ArgTableRow>
<ArgTableRow arg="multipath-hash-policy" typ="enum (l3 | l4 | l3-inner) { l3:0, l4:1, l3-inner:2 }">
为 [ECMP](../../user-guides/routing-and-networking-protocols/routing-decision.md#multipath-ecmp-routes) 路由指定 IPv6 哈希策略：
- l3 - 对源 IP、目标 IP、流标签和 IP 协议进行三层哈希。
- l3-inner - 三层哈希，或在可用时进行内层三层哈希。
- l4 - 对源 IP、目标 IP、IP 协议、源端口和目标端口进行四层哈希。

启用 [L3 硬件卸载](../../bridging-and-switching/l3-hardware-offloading.md) 后，硬件转发的 ECMP 使用交换芯片自身的哈希掩码，其中包含 TCP/UDP 的 L4 端口；配置的策略会被忽略。FastTrack 卸载的连接遵循内核 FIB 查找，并可能选择不同的下一跳。[FastPath](../../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path) 按 L3 缓存路由。
</ArgTableRow>
<ArgTableRow arg="accept-redirects" typ="bool">接受或拒绝 ICMP 重定向消息。在主机上启用，在路由器上禁用。</ArgTableRow>
<ArgTableRow arg="accept-router-advertisements" typ="enum (no | yes-if-forwarding-disabled | yes) { no:0, yes-if-forwarding-disabled:1, yes:2 }">控制是否接受路由器通告 (RA) 消息。启用后，路由器会使用 [无状态地址配置](../../system-information-and-utilities/neighbor-discovery.md) 获取地址。</ArgTableRow>
<ArgTableRow arg="accept-router-advertisements-on" typ="enum">指定在哪些接口上监听传入的路由器通告 (RA)。</ArgTableRow>
<ArgTableRow arg="disable-link-local-address" typ="bool">禁用非 VPN 接口的自动链路本地地址生成。当你需要手动配置链路本地地址时使用此选项。</ArgTableRow>
<ArgTableRow arg="stale-neighbor-detect-interval" typ="num">设置系统检查过期 IPv6 邻居条目并探测这些条目以验证可达性的间隔。</ArgTableRow>
<ArgTableRow arg="stale-neighbor-timeout" typ="num">超时持续时间，超过后过期 IPv6 邻居条目将被清除。</ArgTableRow>
<ArgTableRow arg="min-neighbor-entries" typ="num">设置设备必须为其分配内存的 IPv6 邻居条目的最小数量。</ArgTableRow>
<ArgTableRow arg="soft-max-neighbor-entries" typ="num">设置系统应处理的 IPv6 邻居条目的预期最大数量。</ArgTableRow>
<ArgTableRow arg="max-neighbor-entries" typ="num">
设置 IPv6 邻居条目的最大数量。从 RouterOS 7.1 版本开始，默认值取决于已安装的 RAM：
- 64 MiB 为 1024
- 128 MiB 为 2048
- 256 MiB 为 4096
- 512 MiB 为 8192
- 1024 MiB 或更高为 16384

将值设置为高于默认值会增加内存不足情况的风险。
</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">为 IPv6 流量启用 [Fast Path](../../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path)。</ArgTableRow>
</ArgTable>
Fasttrack 和 fastpath 值自上次启用该功能或自系统重启以来累积计算。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="ipv6-fast-path-active" typ="bool">指示 IPv6 fast path 功能当前是否处于活动状态。</ArgTableRow>
<ArgTableRow arg="ipv6-fast-path-packets" typ="num">通过 IPv6 fast path 处理的数据包总数。</ArgTableRow>
<ArgTableRow arg="ipv6-fast-path-bytes" typ="num">通过 IPv6 fast path 处理的字节总数。</ArgTableRow>
<ArgTableRow arg="ipv6-fasttrack-active" typ="bool">指示 IPv6 fasttrack 功能当前是否处于活动状态。</ArgTableRow>
<ArgTableRow arg="ipv6-fasttrack-packets" typ="num">通过 IPv6 fasttrack 处理的数据包总数。</ArgTableRow>
<ArgTableRow arg="ipv6-fasttrack-bytes" typ="num">通过 IPv6 fasttrack 处理的字节总数。</ArgTableRow>
</ArgTable>
