---
title: "settings"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/settings
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/ip/smb"
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/settings 
**类型：** 设置目录

该菜单用于配置各种 IPv4 和 IPv6 相关的内核及系统级网络参数。这些设置控制操作系统如何处理 IP 流量和网络通信。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="ip-forward" typ="bool">Enable or disable packet forwarding between interfaces. Resets all configuration parameters to defaults according to [RFC 1812](https://tools.ietf.org/html/rfc1812) for routers.</ArgTableRow>
<ArgTableRow arg="send-redirects" typ="bool">Send ICMP redirects. Enable this on routers.</ArgTableRow>
<ArgTableRow arg="accept-source-route" typ="bool">Accept packets with the SRR option. Accepting source-routed (SSRR/LSRR) packets is a well-known spoofing/security risk and should be kept disabled unless required by the setup.</ArgTableRow>
<ArgTableRow arg="accept-redirects" typ="bool">Accept ICMP redirect messages. Enable on hosts and disable on routers.</ArgTableRow>
<ArgTableRow arg="secure-redirects" typ="bool">Accept ICMP redirect messages only for gateways listed in the default gateway list.</ArgTableRow>
<ArgTableRow arg="rp-filter" typ="enum (no | strict | loose) { no:0, strict:1, loose:2 }">
Enable or disable source validation.
- `no` - Do not validate source addresses.
- `strict` - Strict mode as defined in [RFC 3704](https://tools.ietf.org/html/rfc3704) Strict Reverse Path. Each incoming packet is tested against the FIB and if the interface is not the best reverse path, the packet check will fail. By default, failed packets are discarded.
- `loose` - Loose mode as defined in [RFC 3704](https://tools.ietf.org/html/rfc3704) Loose Reverse Path. Each incoming packet's source address is tested against the FIB and if the source address is not reachable through any interface, the packet check will fail.

[RFC 3704](https://tools.ietf.org/html/rfc3704) 建议启用 `strict` 模式，以防止来自 DDoS 攻击的 IP 欺骗。

如果使用非对称路由、复杂路由或 VRRP，则 `strict` 模式会导致问题，请改为启用 `loose` 模式。
</ArgTableRow>
<ArgTableRow arg="ipv4-multipath-hash-policy" typ="enum (l3 | l4 | l3-inner) { l3:0, l4:1, l3-inner:2 }">
用于 [ECMP](/docs/user-guides/routing-and-networking-protocols/routing-decision#multipath-ecmp-routes) 路由的 IPv4 哈希策略。

- l3 - 对源 IP 地址和目的 IP 地址进行三层哈希。
- l3-inner - 三层哈希；如果可用，则使用内层三层哈希。
- l4 - 对源 IP 地址、目的 IP 地址、IP 协议、源端口和目的端口进行四层哈希。

启用 [L3 hardware offloading](/docs/bridging-and-switching/l3-hardware-offloading) 后，硬件转发的 ECMP 使用交换芯片自身的哈希掩码，其中包含 TCP/UDP 的 L4 端口；配置的策略将被忽略。FastTrack-offloaded 连接遵循内核 FIB 查找，可能会选择不同的 nexthop。[FastPath](/docs/firewall-and-quality-of-service/packet-flow-in-routeros#fast-path) 按 L3 缓存路由。
</ArgTableRow>
<ArgTableRow arg="tcp-syncookies" typ="bool">当套接字的 SYN backlog 队列溢出时发送 syncookies。这有助于防止 SYN flood 攻击。但是，syncookies 违反 TCP 协议，并会阻止使用 TCP 扩展，这可能降低某些服务的性能（例如 SMTP 中继）。这种性能下降可能会被客户端和与你通信的中继感知到。</ArgTableRow>
<ArgTableRow arg="tcp-timestamps" typ="enum (disabled | random-offset | enabled) { disabled:0, random-offset:1, enabled:2 }">启用或禁用 TCP 时间戳，或为 TCP 时间戳添加随机偏移（默认行为）。禁用时间戳有助于减少性能下降峰值。</ArgTableRow>
<ArgTableRow arg="max-neighbor-entries" typ="num">
设置 Linux `gc_thresh3`。ARP 表中允许的邻居最大数量。默认值取决于已安装的 RAM 容量。可以设置高于默认值的值，但会增加内存不足的风险。
特定 RAM 容量的默认值：

- 64 MiB 为 2048，
- 128 MiB 为 4096，
- 256 MiB 为 8192，
- 512 MiB 或更高为 16384。

ARP 缓存存储 ARP 条目，如果其中某些条目不完整，它们可以在缓存中无限期保留。只有当缓存中的条目数少于允许最大数的四分之一时，才会发生这种情况。这样做是为了防止在 ARP 表未接近满时不必要的 garbage-collector 运行。
</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="time">在所有使用 ARP 的接口上设置 Linux `base_reachable_time`（`base_reachable_time_ms`）。找到邻居后，ARP 条目的初始有效性从区间 [`timeout/2 - 3*timeout/2`] 中选取（默认为 15s 至 45s）。可使用后缀 ms、s、m、h、d 表示毫秒、秒、分钟、小时或天。如果未设置后缀，则使用秒（s）。该参数表示在此期间如果没有与特定 MAC/IP 通信，有效 ARP 记录将被视为完整的时长。该参数不表示 ARP 条目从 ARP 缓存中移除的时间（请参阅 `max-neighbor-entries` 设置）。</ArgTableRow>
<ArgTableRow arg="icmp-rate-limit" typ="num">限制向特定目标发送类型匹配 icmp-rate-mask 的 ICMP 数据包的最大速率。值 `0` 禁用任何限制，其他值表示响应之间的最小间隔（以毫秒为单位）。</ArgTableRow>
<ArgTableRow arg="icmp-rate-mask" typ="num">受速率限制的 ICMP 类型掩码。详情请参阅 [Linux man pages](http://man7.org/linux/man-pages/man7/icmp.7.html)。</ArgTableRow>
<ArgTableRow arg="icmp-errors-use-inbound-interface-address" typ="bool">启用后，发送 ICMP 错误消息回复时，使用导致错误的接收接口的主地址作为源地址。将其用于复杂网络调试。</ArgTableRow>
<ArgTableRow arg="ipv4-high-fragment-thresh" typ="num">
设置内核可用于所有分片重组队列总和的内存上限（以字节为单位）（包括每个接口和每个流）。当缓存使用的总内存达到此限制时，内核开始丢弃新到达的分片，导致数据包被丢弃。提高该限制可减少在大量分片情况下发生丢弃的可能性（例如使用 VPN 的高吞吐链路，或受 MTU 限制的路径），但也会提高可使用的最大 RAM 容量。

默认值取决于已安装的 RAM 容量：

- 64 MiB RAM 为 512 KiB，
- 128 MiB RAM 为 1024 KiB，
- 256 MiB RAM 为 2048 KiB，
- 512MiB RAM 为 4096 KiB，
- 1 GiB RAM 为 16 MiB，
- 2 GiB 或更高 RAM 为 32 MiB。
</ArgTableRow>
<ArgTableRow arg="ipv4-fragment-time" typ="num">在内存中保留 IPv4 分片的时间，单位为秒。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">允许 [Fast Path](/docs/firewall-and-quality-of-service/packet-flow-in-routeros#fast-path)</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="ipv4-fast-path-active" typ="bool">Indicates whether fast-path is active.</ArgTableRow>
<ArgTableRow arg="ipv4-fast-path-packets" typ="num">Amount of fast-pathed packets.</ArgTableRow>
<ArgTableRow arg="ipv4-fast-path-bytes" typ="num">Amount of fast-pathed bytes.</ArgTableRow>
<ArgTableRow arg="ipv4-fasttrack-active" typ="bool">Indicates whether fasttrack is active.</ArgTableRow>
<ArgTableRow arg="ipv4-fasttrack-packets" typ="num">Amount of fasttracked packets.</ArgTableRow>
<ArgTableRow arg="ipv4-fasttrack-bytes" typ="num">Amount of fasttracked bytes.</ArgTableRow>
</ArgTable>
