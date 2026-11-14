---
sidebar_key: "cli-reference/interface/ipip"
sidebar_position: 12
title: "ipip"
sidebar_label: 'ipip'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ipip
captured_at: '2026-11-01T21:22:43+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ipip {#interfaceipip}
**类型：** 目录

[IPIP](../../virtual-private-networks/ipip.md)（IP-in-IP）是 RFC 2003 中定义的一种简单隧道协议，它将 IP 数据包封装在另一个 IP 头中，以便在两个端点之间传输流量。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">接口是否为动态创建。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">三层最大传输单元。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ipAddr">IPIP 隧道在路由器上使用的 IP 地址。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="address (flags=4Dv)" mandatory="1">IPIP 隧道远端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="keepalive" typ="super { keepalive-interval: time [1 .. ]
, [keepalive-retries] [ ,num [1 .. ]]
 }">
keepalive 参数设置一个时间间隔，在该间隔内即使隧道远端宕机，隧道的运行标志仍会保持。如果配置的时间和重试次数失败，则移除接口的运行标志。  
参数按以下格式书写：`KeepaliveInterval,KeepaliveRetries`  
 其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试尝试次数。  
默认情况下，keepalive 设置为 10 秒和 10 次重试。
</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">数据包的 DSCP 值。Inherited 表示 DSCP 值继承自隧道传输的流量。</ArgTableRow>
<ArgTableRow arg="clamp-tcp-mss" typ="bool">控制是否更改收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器会更改收到的 TCP SYN 数据包的 MSS 大小。收到的封装数据包仍包含原始 MSS，只有在解封装后才会更改 MSS。</ArgTableRow>
<ArgTableRow arg="dont-fragment" typ="bool">
是否在相关数据包中包含 DF 位。
- `no` - 如有需要则分片。
- `inherit` - 使用原始数据包的 DF 标志。
</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string" syscap="security">指定密钥后，路由器会向 remote-address 添加一个动态 IPsec 对等体，并带有预共享密钥和策略（默认情况下 phase2 使用 sha1/aes128cbc）。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">是否允许 FastPath 处理。如果使用 IPsec 隧道，则必须禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-mtu" typ="num">隧道的实际最大传输单元。</ArgTableRow>
<ArgTableRow arg="current-remote-address" typ="ipAddr">远端的当前 IP 地址。</ArgTableRow>
</ArgTable>
