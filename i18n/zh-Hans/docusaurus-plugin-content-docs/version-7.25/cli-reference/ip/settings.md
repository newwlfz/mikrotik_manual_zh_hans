---
sidebar_key: "cli-reference/ip/settings"
sidebar_position: 21
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/settings
captured_at: '2026-11-01T21:24:24+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/settings {#ipsettings}
**类型：** 设置目录

此菜单允许你配置与 IPv4 和 IPv6 相关的各类内核及系统级网络参数。这些设置控制操作系统如何处理 IP 流量和网络通信。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ip-forward" typ="bool">启用或禁用接口之间的数据包转发。会按照 [RFC 1812](https://tools.ietf.org/html/rfc1812) 中对路由器的规定，把所有配置参数重置为默认值。</ArgTableRow>
<ArgTableRow arg="send-redirects" typ="bool">发送 ICMP 重定向。在路由器上启用此项。</ArgTableRow>
<ArgTableRow arg="accept-source-route" typ="bool">接受带有 SRR 选项的数据包。接受源路由（SSRR/LSRR）数据包是一种众所周知的安全风险，除非安装环境要求，否则应保持禁用。</ArgTableRow>
<ArgTableRow arg="accept-redirects" typ="bool">接受 ICMP 重定向消息。在主机上启用，在路由器上禁用。</ArgTableRow>
<ArgTableRow arg="secure-redirects" typ="bool">仅接受来自默认网关列表中所列网关的 ICMP 重定向消息。</ArgTableRow>
<ArgTableRow arg="rp-filter" typ="enum (no | strict | loose) { no:0, strict:1, loose:2 }">
启用或禁用源地址验证。
- `no` - 不验证源地址。
- `strict` - [RFC 3704](https://tools.ietf.org/html/rfc3704) 中定义的严格反向路径模式。每个传入数据包都会与 FIB 进行比对，如果该接口不是最佳反向路径，则数据包检查失败。默认情况下，检查失败的数据包会被丢弃。
- `loose` - [RFC 3704](https://tools.ietf.org/html/rfc3704) 中定义的松散反向路径模式。每个传入数据包的源地址都会与 FIB 进行比对，如果该源地址无法通过任何接口到达，则数据包检查失败。

[RFC 3704](https://tools.ietf.org/html/rfc3704) 建议启用 `strict` 模式，以防止 DDoS 攻击中的 IP 欺骗。

如果使用非对称路由、复杂路由或 VRRP，则 `strict` 模式会引发问题，此时应改为启用 `loose` 模式。
</ArgTableRow>
<ArgTableRow arg="ipv4-multipath-hash-policy" typ="enum (l3 | l4 | l3-inner) { l3:0, l4:1, l3-inner:2 }">
用于 [ECMP](../../user-guides/routing-and-networking-protocols/routing-decision.md#multipath-ecmp-routes) 路由的 IPv4 哈希策略。

- l3 - 对源 IP 地址和目标 IP 地址进行三层哈希。
- l3-inner - 进行三层哈希，如果存在内层三层头部则对内层进行哈希。
- l4 - 对源 IP 地址、目标 IP 地址、IP 协议、源端口和目标端口进行四层哈希。

启用 [L3 硬件卸载](../../bridging-and-switching/l3-hardware-offloading.md) 后，硬件转发的 ECMP 使用交换芯片自身的哈希掩码，其中包含 TCP/UDP 的 L4 端口；配置的策略会被忽略。FastTrack 卸载的连接遵循内核 FIB 查找，并可能选择不同的下一跳。[FastPath](../../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path) 按 L3 缓存路由。
</ArgTableRow>
<ArgTableRow arg="tcp-syncookies" typ="bool">当套接字的 SYN 积压队列溢出时发送 syncookies。这有助于防止 SYN flood 攻击。不过，syncookies 违反 TCP 协议，并且会阻止使用 TCP 扩展，这可能会降低某些服务（例如 SMTP 中继）的性能。这种性能下降可能会被你那些正在联系你的客户端和中继所察觉。</ArgTableRow>
<ArgTableRow arg="tcp-timestamps" typ="enum (disabled | random-offset | enabled) { disabled:0, random-offset:1, enabled:2 }">启用或禁用 TCP 时间戳，或为 TCP 时间戳添加随机偏移量（默认行为）。禁用时间戳有助于降低性能骤降的峰值。</ArgTableRow>
<ArgTableRow arg="max-neighbor-entries" typ="num">
设置 Linux 的 `gc_thresh3`。即 ARP 表中允许的邻居条目的最大数量。默认值取决于已安装的内存容量。可以设置高于默认值的数值，但这会增加内存耗尽的风险。
特定内存容量对应的默认值：

- 64 MiB 时为 2048，
- 128 MiB 时为 4096，
- 256 MiB 时为 8192，
- 512 MiB 或更高时为 16384。

ARP 缓存用于存储 ARP 条目，如果其中某些条目不完整，它们可能会无限期地留在缓存中。这种情况只会发生在缓存中的条目数量少于允许的最大值四分之一时。这样做的原因是，在 ARP 表尚未接近满时，避免不必要地运行垃圾回收器。
</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="time">在所有使用 ARP 的接口上设置 Linux 的 `base_reachable_time`（`base_reachable_time_ms`）。ARP 条目的初始有效期是在发现邻居之后，从区间 [`timeout/2 - 3*timeout/2`]（默认 15 秒到 45 秒）中选取的。可以使用后缀 ms、s、m、h、d 表示毫秒、秒、分钟、小时或天。如果未设置后缀，则使用秒（s）。该参数表示：在这段时间内，如果没有任何设备与该特定 MAC/IP 通信，一条有效的 ARP 记录还会被视为完整多久。该参数并不表示 ARP 条目从 ARP 缓存中被删除的时间（参见 `max-neighbor-entries` 设置）。</ArgTableRow>
<ArgTableRow arg="icmp-rate-limit" typ="num">限制向特定目标发送类型匹配 icmp-rate-mask 的 ICMP 数据包的最大速率。值为 `0` 表示禁用任何限制，其他值表示响应之间的最小间隔（毫秒）。</ArgTableRow>
<ArgTableRow arg="icmp-rate-mask" typ="num">受速率限制的 ICMP 类型的掩码。更多信息请参见 [Linux 手册页](http://man7.org/linux/man-pages/man7/icmp.7.html)。</ArgTableRow>
<ArgTableRow arg="icmp-errors-use-inbound-interface-address" typ="bool">启用后，发送 ICMP 错误消息回复时，源地址使用导致该错误的接收接口的主地址。适用于复杂的网络调试。</ArgTableRow>
<ArgTableRow arg="ipv4-high-fragment-thresh" typ="num">
设置内核可为所有分片重组队列合计消耗的内存上限（单位：字节，包含每个接口和每条流）。当缓存使用的总内存达到此限制时，内核会开始丢弃新到达的分片，从而导致数据包被丢弃。提高该限制可减少在高分片负载下（例如带有 VPN 的高吞吐链路，或受 MTU 限制的路径）发生丢包的可能性，但同时也会提高可被占用的最大 RAM 容量。

默认值取决于已安装的内存容量：

- 64 MiB RAM 时为 512 KiB，
- 128 MiB RAM 时为 1024 KiB，
- 256 MiB RAM 时为 2048 KiB，
- 512MiB RAM 时为 4096 KiB，
- 1 GiB RAM 时为 16 MiB，
- 2 GiB 或更高 RAM 时为 32 MiB。
</ArgTableRow>
<ArgTableRow arg="ipv4-fragment-time" typ="num">IPv4 分片在内存中保留的时间（秒）。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">允许使用 [Fast Path](../../firewall-and-quality-of-service/packet-flow-in-routeros.md#fast-path)</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="ipv4-fast-path-active" typ="bool">指示 fast-path 是否处于活动状态。</ArgTableRow>
<ArgTableRow arg="ipv4-fast-path-packets" typ="num">经过 fast-path 处理的数据包数量。</ArgTableRow>
<ArgTableRow arg="ipv4-fast-path-bytes" typ="num">经过 fast-path 处理的字节数。</ArgTableRow>
<ArgTableRow arg="ipv4-fasttrack-active" typ="bool">指示 fasttrack 是否处于活动状态。</ArgTableRow>
<ArgTableRow arg="ipv4-fasttrack-packets" typ="num">经过 fasttrack 处理的数据包数量。</ArgTableRow>
<ArgTableRow arg="ipv4-fasttrack-bytes" typ="num">经过 fasttrack 处理的字节数。</ArgTableRow>
</ArgTable>
