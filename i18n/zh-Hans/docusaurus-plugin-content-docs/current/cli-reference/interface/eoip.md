---
sidebar_key: "cli-reference/interface/eoip"
sidebar_position: 7
title: "eoip"
sidebar_label: 'eoip'
source: https://manual.mikrotik.com/docs/cli-reference/interface/eoip
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/eoip {#interfaceeoip}
**类型：** 目录

[IP 上的以太网（EoIP）](../../virtual-private-networks/eoip.md) 隧道是一种 MikroTik RouterOS 协议，用于通过 IP 网络在两台路由器之间创建以太网隧道。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">Layer3 最大传输单元。默认值：`auto` —— 路由器从路径 MTU 中减去 42 字节的 EoIP/IPv4 开销（在 1500 字节路径上 actual-mtu 为 1458）。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">接口的媒体访问控制（MAC）地址。可接受任意值；自动生成的地址为本地管理地址。IANA 允许自由使用 00:00:5E:80:00:00 至 00:00:5E:FF:FF:FF 范围（私有单播）。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ipAddr">隧道数据包的源地址，位于路由器本地。默认值 `0.0.0.0` —— 用于到达远端的接口地址。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="address (flags=4Dv)" mandatory="1">EoIP 隧道远端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="tunnel-id" typ="num" mandatory="1">唯一的隧道标识符，必须与隧道另一端匹配。</ArgTableRow>
<ArgTableRow arg="keepalive" typ="super { keepalive-interval: time [1 .. ]
, [keepalive-retries] [ ,num [1 .. ]]
 }">
当远端在 `KeepaliveInterval × KeepaliveRetries` 时间内没有应答时，路由器会移除该接口的 running 标志。
参数按以下格式写入：`KeepaliveInterval,KeepaliveRetries`
其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试次数。
Keepalive 默认启用（`10s,10`）。将其设置为禁用值（`0,0`、`off`、`none`）会被拒绝；取消设置 `keepalive` 会将其完全关闭 — 此后当远端停止应答时就不再移除 running 标志。
</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">数据包的 DSCP 值。Inherited 表示 DSCP 值从待封装的数据包继承。</ArgTableRow>
<ArgTableRow arg="clamp-tcp-mss" typ="bool">控制是否更改接收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器会更改接收到的 TCP SYN 数据包的 MSS 大小。接收到的封装数据包仍包含原始 MSS，只有在解封装后才会更改 MSS。</ArgTableRow>
<ArgTableRow arg="dont-fragment" typ="bool">
是否在相关报文中包含 DF 位。默认值：`no`。
- `no` - 如需要则进行分片。
- `inherit` - 使用原始数据包的 DF 标志。
</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string" syscap="security">指定密钥后，路由器会使用预共享密钥和策略向 remote-address 添加一个动态 IPsec 对等体（默认情况下 phase2 使用 sha1/aes128cbc）。IPsec 与快速路径互斥——必须将 `allow-fast-path` 设置为 `no`。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">是否允许 FastPath 处理。如果使用 IPsec 隧道，则必须禁用。</ArgTableRow>
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
<ArgTableRow arg="l2mtu" typ="num">[二层最大传输单元](../../hardware/mtu-in-routeros.md)。EoIP 不可配置此项；显示值为 65535。</ArgTableRow>
<ArgTableRow arg="current-remote-address" typ="ipAddr">远端当前的 IPv4 地址。</ArgTableRow>
<ArgTableRow arg="loop-protect-status" typ="enum (off | on | disabled) { off:1, on:2, disabled:3 }">
环路保护状态：
- `on` - 已启用环路保护，并且接口正在发送和监听环路保护数据包
- `off` - 已禁用环路保护
- `disabled` - 已启用环路保护，接口已收到环路保护数据包并禁用自身以防止环路。
</ArgTableRow>
</ArgTable>
