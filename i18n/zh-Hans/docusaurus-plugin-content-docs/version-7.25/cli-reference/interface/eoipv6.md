---
sidebar_key: "cli-reference/interface/eoipv6"
sidebar_position: 8
title: "eoipv6"
sidebar_label: 'eoipv6'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/eoipv6
captured_at: '2026-11-01T21:22:29+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/eoipv6 {#interfaceeoipv6}
**类型：** 目录

[IP 上的以太网（EoIP）](../../virtual-private-networks/eoip.md) 隧道是一种 MikroTik RouterOS 协议，用于通过 IP 网络在两台路由器之间创建以太网隧道。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="R" typ="running">running</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">隧道名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">Layer3 最大传输单元。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">接口的媒体访问控制编号。地址分配机构 IANA 允许自由使用 00:00:5E:80:00:00 - 00:00:5E:FF:FF:FF 范围内的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ip6Addr">隧道数据包的源地址，属于路由器本地。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="address (flags=6Dvi)" mandatory="1">EoIP 隧道远端的 IPV6 地址。</ArgTableRow>
<ArgTableRow arg="tunnel-id" typ="num" mandatory="1">唯一的隧道标识符，必须与隧道另一端匹配。</ArgTableRow>
<ArgTableRow arg="keepalive" typ="super { keepalive-interval: time [1 .. ]
, [keepalive-retries] [ ,num [1 .. ]]
 }">
keepalive 参数设置时间间隔；即使隧道远端断开，隧道的 running 标志也会在该时间间隔内保留。如果配置的时间和重试次数失败，则移除接口的 running 标志。  
参数按以下格式写入：`KeepaliveInterval,KeepaliveRetries`  
 其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试尝试次数。  
默认情况下，keepalive 设置为 10 秒和 10 次重试。
</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">数据包的 DSCP 值。Inherited 表示 DSCP 值继承自待封装的数据包。</ArgTableRow>
<ArgTableRow arg="clamp-tcp-mss" typ="bool">控制是否更改收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器会更改收到的 TCP SYN 数据包的 MSS 大小。收到的封装数据包仍包含原始 MSS，只有在解封装之后才会更改 MSS。</ArgTableRow>
<ArgTableRow arg="dont-fragment" typ="bool">
是否在相关数据包中包含 DF 位。
- `no` - 如有需要则进行分片。
- `inherit` - 使用原始数据包的 DF 标志。
</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string" syscap="security">指定密钥时，路由器会使用预共享密钥和策略向 remote-address 添加动态 IPsec 对等体（默认情况下 phase2 使用 sha1/aes128cbc）。</ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp) { disabled:0, enabled:1, proxy-arp:2, reply-only:3, local-proxy-arp:4 }">[地址解析协议](../../getting-started/networking-fundamentals/index.md#arp-and-tying-it-all-together) 模式。</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }">ARP 条目超时的时间间隔。</ArgTableRow>
<ArgTableRow arg="arp-accept" typ="bool">是否接受免费 ARP 回复。</ArgTableRow>
<ArgTableRow arg="loop-protect" typ="enum (default | off | on) { default:0, off:1, on:2 }">在所选接口上启用或禁用环路保护。`default` 的作用等同于关闭。</ArgTableRow>
<ArgTableRow arg="loop-protect-send-interval" typ="time">设置所选接口上发送环路保护数据包的频率。</ArgTableRow>
<ArgTableRow arg="loop-protect-disable-time" typ="time">设置检测到环路时禁用所选接口的时长。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-mtu" typ="num">隧道的实际最大传输单元。</ArgTableRow>
<ArgTableRow arg="l2mtu" typ="num">[Layer2 最大传输单元](../../hardware/mtu-in-routeros.md)。对于 EoIP 不可配置。</ArgTableRow>
<ArgTableRow arg="current-remote-address" typ="ip6Addr">远端的当前 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="loop-protect-status" typ="enum (off | on | disabled) { off:1, on:2, disabled:3 }">
环路保护状态：
- `on` - 已启用环路保护，并且接口正在发送和监听环路保护数据包
- `off` - 已禁用环路保护
- `disabled` - 已启用环路保护，接口已收到环路保护数据包并禁用自身以防止环路。
</ArgTableRow>
</ArgTable>
