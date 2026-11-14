---
sidebar_key: "cli-reference/ipv6/nd"
title: "nd"
sidebar_label: 'nd'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/nd
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/nd {#ipv6nd}
**类型：** 目录

已配置 IPv6 邻居发现（ND）协议。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="*" typ="default">default</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum { all:0 }">
运行邻居发现的接口。
-all - 在所有正在运行的接口上运行 ND。
</ArgTableRow>
<ArgTableRow arg="ra-interval" typ="super { min: time [3 .. 1250]
, [max] -time [4 .. 1800]
 }">允许从该接口发送的未经请求的多播路由器通告之间的最小和最大间隔。</ArgTableRow>
<ArgTableRow arg="ra-delay" typ="time">从该接口发送的多播路由器通告之间的最小时间。</ArgTableRow>
<ArgTableRow arg="mtu" typ="alt { special: enum (unspecified) { unspecified:0 }
, value: num
 }">
路由器通告中的 MTU 选项可确保当链路 MTU 未知时，链路上的所有节点使用相同的 MTU 值。
- **unspecified** - 不发送 MTU 选项。
</ArgTableRow>
<ArgTableRow arg="reachable-time" typ="alt { special: enum (unspecified) { unspecified:0 }
, value: time [ .. 3600]
 }">RouterOS 在收到可达性确认后假定邻居可达的时间。由邻居不可达检测使用（参见 [RFC 4861](https://tools.ietf.org/html/rfc4861) 第 7.3 节）。</ArgTableRow>
<ArgTableRow arg="retransmit-interval" typ="alt { special: enum (unspecified) { unspecified:0 }
, value: time
 }">重传的邻居请求消息之间的时间。用于地址解析和邻居不可达检测（参见 [RFC 4861](https://tools.ietf.org/html/rfc4861) 第 7.2 和 7.3 节）。</ArgTableRow>
<ArgTableRow arg="ra-lifetime" typ="alt { special: enum (none) { none:0 }
, value: time [ .. 9000]
 }">设置 RA 生存期。生存期为 0 表示此路由器不是默认路由器。参见 [RFC 4861](https://tools.ietf.org/html/rfc4861) 第 6.2.1 节。</ArgTableRow>
<ArgTableRow arg="ra-preference" typ="enum (low | medium | high)">指定在路由器通告中传达给 IPv6 主机的路由器优先级。`ra-preference` 值可帮助主机选择用于到达远程目的地的默认路由器。</ArgTableRow>
<ArgTableRow arg="hop-limit" typ="alt { special: enum (unspecified) { unspecified:0 }
, value: num [ .. 255]
 }">为出站单播数据包的 IPv6 头部中的 Hop Count 字段设置的默认值。</ArgTableRow>
<ArgTableRow arg="advertise-mac-address" typ="bool">设置后，在路由器通告中包含出站接口的链路层地址。</ArgTableRow>
<ArgTableRow arg="advertise-dns" typ="enum (no | yes | self)">
使用 RADVD 重新分发 DNS 服务器信息。

- `no` - 不通告 DNS 服务器。
- `yes` - 通告路由器上安装的 DNS 服务器。
- `self` - 将接口链路本地地址通告为 DNS 服务提供者。
</ArgTableRow>
<ArgTableRow arg="managed-address-configuration" typ="bool">指示主机是否应使用有状态自动配置（DHCPv6）来获取地址。参见 [RFC 3315](https://tools.ietf.org/html/rfc3315)。</ArgTableRow>
<ArgTableRow arg="other-configuration" typ="bool">指示主机是否应使用有状态自动配置来获取除地址之外的附加信息。参见 [RFC 3315](https://tools.ietf.org/html/rfc3315)。</ArgTableRow>
<ArgTableRow arg="dns" typ="multi { address: address (flags=6)
 }">指定主机为配置 DNS 服务器而接收的一个或多个 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="pref64" typ="object { pref64: ip6Prefix
 }">指定主机作为 NAT64 前缀接收的一个或多个位于 /32、/40、/48、/56、/64 或 /96 子网内的 IPv6 前缀。</ArgTableRow>
</ArgTable>
