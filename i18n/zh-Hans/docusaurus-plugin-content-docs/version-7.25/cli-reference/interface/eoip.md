---
sidebar_key: "cli-reference/interface/eoip"
sidebar_position: 7
title: "eoip"
sidebar_label: 'eoip'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/eoip
captured_at: '2026-11-01T21:22:30+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
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
<ArgTableRow arg="mtu" typ="num">三层最大传输单元。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">接口的媒体访问控制地址。地址编号管理机构 IANA 允许自由使用 00:00:5E:80:00:00 - 00:00:5E:FF:FF:FF 范围内的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ipAddr">隧道报文的源地址，位于路由器本地。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="address (flags=4Dv)" mandatory="1">EoIP 隧道远端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="tunnel-id" typ="num" mandatory="1">唯一的隧道标识符，必须与隧道另一端匹配。</ArgTableRow>
<ArgTableRow arg="keepalive" typ="super { keepalive-interval: time [1 .. ]
, [keepalive-retries] [ ,num [1 .. ]]
 }">
keepalive 参数设置时间间隔，在此期间即使隧道远端断开，隧道运行标志仍保持不变。如果配置的时间和重试次数都已用尽，则移除接口运行标志。  
参数按以下格式书写：`KeepaliveInterval,KeepaliveRetries`  
 其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试次数。  
默认情况下 keepalive 设置为 10 秒和 10 次重试。
</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">报文的 DSCP 值。Inherited 表示 DSCP 值继承自要被封装的报文。</ArgTableRow>
<ArgTableRow arg="clamp-tcp-mss" typ="bool">控制是否更改接收到的 TCP SYN 报文的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器会更改接收到的 TCP SYN 报文的 MSS 大小。接收到的封装报文仍包含原始 MSS，只有在解封装之后才会更改 MSS。</ArgTableRow>
<ArgTableRow arg="dont-fragment" typ="bool">
是否在相关报文中包含 DF 位。
- `no` - 如有需要则进行分片。
- `inherit` - 使用原始报文的 DF 标志。
</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string" syscap="security">指定密钥后，路由器会向 remote-address 添加一个动态 IPsec 对等体，并附带预共享密钥和策略（默认情况下 phase2 使用 sha1/aes128cbc）。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">是否允许 FastPath 处理。如果使用 IPsec 隧道，则必须禁用。</ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp) { disabled:0, enabled:1, proxy-arp:2, reply-only:3, local-proxy-arp:4 }">[地址解析协议](../../getting-started/networking-fundamentals/index.md#arp-and-tying-it-all-together) 模式。</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }">ARP 条目的超时时间间隔。</ArgTableRow>
<ArgTableRow arg="arp-accept" typ="bool">是否接受无偿 ARP 应答。</ArgTableRow>
<ArgTableRow arg="loop-protect" typ="enum (default | off | on) { default:0, off:1, on:2 }">启用或禁用所选接口上的环路保护。`default` 的作用与关闭相同。</ArgTableRow>
<ArgTableRow arg="loop-protect-send-interval" typ="time">设置所选接口上发送环路保护报文的频率。</ArgTableRow>
<ArgTableRow arg="loop-protect-disable-time" typ="time">设置检测到环路时禁用所选接口的时长。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-mtu" typ="num">隧道的实际最大传输单元。</ArgTableRow>
<ArgTableRow arg="l2mtu" typ="num">[Layer2 最大传输单元](../../hardware/mtu-in-routeros.md)。对于 EoIP 不可配置。</ArgTableRow>
<ArgTableRow arg="current-remote-address" typ="ipAddr">远端的当前 IPv4 地址。</ArgTableRow>
<ArgTableRow arg="loop-protect-status" typ="enum (off | on | disabled) { off:1, on:2, disabled:3 }">
环路保护状态：
- `on` - 环路保护已启用，接口正在发送并监听环路保护报文
- `off` - 环路保护已禁用
- `disabled` - 环路保护已启用，接口已收到环路保护报文并禁用了自身以防止环路。
</ArgTableRow>
</ArgTable>
