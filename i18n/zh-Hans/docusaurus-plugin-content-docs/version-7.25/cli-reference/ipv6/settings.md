---
title: "settings"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/settings
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/lcd"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## ipv6/settings 
**类型：** 设置目录

该菜单用于配置各种与 IPv6 相关的内核和系统级网络参数。这些设置控制操作系统如何处理 IP 流量和网络通信。

:::note
更改 IPv6 设置不会动态移除现有的 SLAAC 配置，需要重启路由器。
:::

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="disable-ipv6" typ="bool">Disable or enable IPv6 system-wide. When disabled, prevents link-local address generation.</ArgTableRow>
<ArgTableRow arg="forward" typ="bool">Enable or disable packet forwarding between interfaces.</ArgTableRow>
<ArgTableRow arg="multipath-hash-policy" typ="enum (l3 | l4 | l3-inner) { l3:0, l4:1, l3-inner:2 }">
Specify the IPv6 hash policy for [ECMP](/docs/user-guides/routing-and-networking-protocols/routing-decision#multipath-ecmp-routes) routing:
- l3 - Layer-3 hashing of source IP, destination IP, flow label, and IP protocol.
- l3-inner - Layer-3 hashing or inner layer-3 hashing if available.
- l4 - Layer-4 hashing of source IP, destination IP, IP protocol, source port, and destination port.

启用 [L3 hardware offloading](/docs/7.24/bridging-and-switching/l3-hardware-offloading) 后，硬件转发的 ECMP 使用交换芯片自身的哈希掩码，其中包含 TCP/UDP 的 L4 端口；配置的策略将被忽略。FastTrack-offloaded 连接遵循内核 FIB 查找，并可能选择不同的下一跳。[FastPath](/docs/7.24/firewall-and-quality-of-service/packet-flow-in-routeros#fast-path) 按 L3 缓存路由。
</ArgTableRow>
<ArgTableRow arg="accept-redirects" typ="bool">接受或拒绝 ICMP 重定向消息。在主机上启用，在路由器上禁用。</ArgTableRow>
<ArgTableRow arg="accept-router-advertisements" typ="enum (no | yes-if-forwarding-disabled | yes) { no:0, yes-if-forwarding-disabled:1, yes:2 }">控制是否接受路由器通告（RA）消息。启用后，路由器通过[无状态地址配置](/docs/7.24/system-information-and-utilities/neighbor-discovery)获取地址。</ArgTableRow>
<ArgTableRow arg="accept-router-advertisements-on" typ="enum">指定监听传入路由器通告（RA）的接口。</ArgTableRow>
<ArgTableRow arg="disable-link-local-address" typ="bool">禁用非 VPN 接口的自动链路本地地址生成。需要手动配置链路本地地址时使用该项。</ArgTableRow>
<ArgTableRow arg="stale-neighbor-detect-interval" typ="num">设置系统检查过期 IPv6 邻居条目并探测其可达性的间隔。</ArgTableRow>
<ArgTableRow arg="stale-neighbor-timeout" typ="num">设置清除过期 IPv6 邻居条目之前的超时时长。</ArgTableRow>
<ArgTableRow arg="min-neighbor-entries" typ="num">设置设备必须为 IPv6 邻居条目分配内存的最小数量。</ArgTableRow>
<ArgTableRow arg="soft-max-neighbor-entries" typ="num">设置系统应处理的 IPv6 邻居条目预期最大数量。</ArgTableRow>
<ArgTableRow arg="max-neighbor-entries" typ="num">
设置 IPv6 邻居条目的最大数量。自 RouterOS 7.1 起，默认值取决于已安装的 RAM：
- 64 MiB 为 1024
- 128 MiB 为 2048
- 256 MiB 为 4096
- 512 MiB 为 8192
- 1024 MiB 或更高为 16384

设置高于默认值会增加内存不足的风险。
</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">为 IPv6 流量启用 [Fast Path](/docs/7.24/firewall-and-quality-of-service/packet-flow-in-routeros#fast-path)。</ArgTableRow>
</ArgTable>
Fasttrack 和 fastpath 值是自该功能上次启用以来或自系统重启以来的累计值。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="ipv6-fast-path-active" typ="bool">Indicates whether the IPv6 fast path feature is currently active.</ArgTableRow>
<ArgTableRow arg="ipv6-fast-path-packets" typ="num">Total number of packets that have been processed through the IPv6 fast path.</ArgTableRow>
<ArgTableRow arg="ipv6-fast-path-bytes" typ="num">Total number of bytes that have been processed through the IPv6 fast path.</ArgTableRow>
<ArgTableRow arg="ipv6-fasttrack-active" typ="bool">Indicates whether the IPv6 fasttrack feature is currently active.</ArgTableRow>
<ArgTableRow arg="ipv6-fasttrack-packets" typ="num">Total number of packets that have been processed through IPv6 fasttrack.</ArgTableRow>
<ArgTableRow arg="ipv6-fasttrack-bytes" typ="num">Total number of bytes that have been processed through IPv6 fasttrack.</ArgTableRow>
</ArgTable>
