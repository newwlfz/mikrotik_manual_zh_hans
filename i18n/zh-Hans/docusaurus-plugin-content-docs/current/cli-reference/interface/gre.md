---
sidebar_key: "cli-reference/interface/gre"
sidebar_position: 10
title: "gre"
sidebar_label: 'gre'
source: https://manual.mikrotik.com/docs/cli-reference/interface/gre
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/gre {#interfacegre}
**类型：** 目录

[Generic Routing Encapsulation (GRE)](../../virtual-private-networks/gre.md) 是一种隧道协议，最初由 Cisco 开发，用于通过 IP 网络封装各种网络层协议。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">隧道的名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">隧道的 Layer3 最大传输单元。默认值：`auto` — 路由器从出接口 MTU 中减去 24 字节的 GRE/IP 开销（在 1500 字节接口上 actual-mtu 为 1476）。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ipAddr">用于本地隧道端的 IP 地址。如果设置为 0.0.0.0，则使用出接口的 IP 地址。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="address (flags=4Dv)" mandatory="1">远程隧道端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="keepalive" typ="super { keepalive-interval: time [1 .. ]
, [keepalive-retries] [ ,num [1 .. ]]
 }">
keepalive 参数设置路由器检查隧道远端的频率：路由器每隔 `KeepaliveInterval` 秒向远端发送 GRE 回显探测，最多重复 `KeepaliveRetries` 次。最小间隔为 1 秒，0 秒设置会被拒绝；取消设置 `keepalive` 会将其关闭，但在当前 RouterOS 上这不会改变 running-flag 行为。默认情况下 keepalive 设置为 10 秒和 10 次重试。在当前 RouterOS 上，隧道在启用期间会保持 running 标志，即使远端停止应答；随后隧道流量会被丢弃，直到远端再次响应。
参数按以下格式写入：`KeepaliveInterval,KeepaliveRetries`
其中 KeepaliveInterval 是时间间隔，KeepaliveRetries 是重试次数。
</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">数据包的 DSCP 值。Inherited 表示 DSCP 值继承自隧道传输的流量。</ArgTableRow>
<ArgTableRow arg="clamp-tcp-mss" typ="bool">控制是否更改收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器会更改收到的 TCP SYN 数据包的 MSS 大小。收到的封装数据包仍包含原始 MSS，只有在解封装后才会更改 MSS。</ArgTableRow>
<ArgTableRow arg="dont-fragment" typ="bool">
是否在相关数据包中包含 DF 位。默认值：`no` — 在 RouterOS 7 上 `yes` 会被拒绝，只有 `no` 和 `inherit` 有效。
- `no` - 如需要则进行分片。
- `inherit` - 使用原始数据包的 DF 标志。
</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string" syscap="security">指定 secret 后，路由器会向 remote-address 添加动态 IPsec 对等体，并带有预共享密钥和策略（默认情况下，phase2 使用 sha1/aes128cbc）。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">是否允许 FastPath 处理。如果使用 IPsec 隧道，则必须禁用。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-mtu" typ="num">隧道的实际最大传输单元。</ArgTableRow>
<ArgTableRow arg="current-remote-address" typ="ipAddr">远端的当前 IP 地址。</ArgTableRow>
</ArgTable>
