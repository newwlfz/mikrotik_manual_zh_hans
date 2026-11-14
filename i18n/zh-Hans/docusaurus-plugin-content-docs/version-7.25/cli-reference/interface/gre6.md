---
sidebar_key: "cli-reference/interface/gre6"
sidebar_position: 11
title: "gre6"
sidebar_label: 'gre6'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/gre6
captured_at: '2026-11-01T21:22:44+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/gre6 {#interfacegre6}
**类型：** 目录

[Generic Routing Encapsulation (GRE)](../../virtual-private-networks/gre.md) 是一种隧道协议，最初由 Cisco 开发，用于通过 IP 网络封装各种网络层协议。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="R" typ="running">running</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">隧道名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">Layer3 最大传输单元。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ip6Addr">用于本地隧道端的 IPV6 地址。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="address (flags=6Dvi)" mandatory="1">远程隧道端的 IPV6 地址。</ArgTableRow>
<ArgTableRow arg="keepalive" typ="super { keepalive-interval: time [1 .. ]
, [keepalive-retries] [ ,num [1 .. ]]
 }">
keepalive 参数设置一个时间间隔，在该间隔内即使隧道远端宕机，隧道 running 标志仍会保持。如果配置的时间和重试次数失败，则移除接口 running 标志。  
参数按以下格式书写：`KeepaliveInterval,KeepaliveRetries`  
 其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试次数。  
默认情况下，keepalive 设置为 10 秒和 10 次重试。
</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">数据包的 DSCP 值。Inherited 表示 DSCP 值继承自隧道流量。</ArgTableRow>
<ArgTableRow arg="clamp-tcp-mss" typ="bool">控制是否更改接收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器会更改接收到的 TCP SYN 数据包的 MSS 大小。接收到的封装数据包仍包含原始 MSS，只有在解封装后才会更改 MSS。</ArgTableRow>
<ArgTableRow arg="dont-fragment" typ="bool">
是否在相关数据包中包含 DF 位。
- `no` - 如有需要则分片。
- `inherit` - 使用原始数据包的 DF 标志。
</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string" syscap="security">指定密钥后，路由器会使用预共享密钥和策略向 remote-address 添加动态 IPsec 对等体（默认情况下 phase2 使用 sha1/aes128cbc）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-mtu" typ="num"></ArgTableRow>
<ArgTableRow arg="current-remote-address" typ="ip6Addr"></ArgTableRow>
</ArgTable>
