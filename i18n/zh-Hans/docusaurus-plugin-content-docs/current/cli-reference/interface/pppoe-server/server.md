---
sidebar_key: "cli-reference/interface/pppoe-server/server"
sidebar_position: 2
title: "server"
sidebar_label: 'server'
source: https://manual.mikrotik.com/docs/cli-reference/interface/pppoe-server/server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/pppoe-server/server {#interfacepppoe-serverserver}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">服务器配置是否无效。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="service-name" typ="string">PPPoE 服务名称。服务器接受发送的 PADI 消息中 service-names 与此设置匹配的客户端，或者 PADI 消息中的 service-name 字段未设置时也接受。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum { <l2tp>:0xfffffffe }" mandatory="1">客户端连接到的接口。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。最佳值是在隧道所运行的接口 MTU 基础上减去 20（因此，对于 1500 字节的以太网链路，将 MTU 设置为 1480 以避免数据包分片）。</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">最大接收单元。最佳值是在隧道所运行的接口 MTU 基础上减去 20（因此，对于 1500 字节的以太网链路，将 MTU 设置为 1480 以避免数据包分片）。</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，则会被拆分为多个数据包，从而允许通过隧道发送全尺寸 IP 或以太网数据包。</ArgTableRow>
<ArgTableRow arg="authentication" typ="ubit (pap, chap, mschap1, mschap2)">服务器接受的身份验证方法。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">定义时间段（以秒为单位），超过该时间后，路由器开始每秒发送 keepalive 数据包。如果在 `keepalive-timeout` 的两倍时间内没有流量到达，也没有 keepalive 响应到达，则断开无响应的客户端。设置为 `disabled` 可关闭 echo 数据包。</ArgTableRow>
<ArgTableRow arg="one-session-per-host" typ="bool">每个主机仅允许一个会话（由 MAC 地址确定）。如果主机尝试建立新会话，则关闭旧会话。</ArgTableRow>
<ArgTableRow arg="max-sessions" typ="num">AC 可服务的最大客户端数量。`0` 表示无限制。</ArgTableRow>
<ArgTableRow arg="pado-delay" typ="num">发送 PADO 响应前的延迟（毫秒）。</ArgTableRow>
<ArgTableRow arg="default-profile" typ="enum">指定建立隧道时使用哪个 PPP 配置文件。</ArgTableRow>
<ArgTableRow arg="accept-empty-service" typ="bool">如果没有匹配的 PPPoE 服务可用，则接受服务名称为空的 PADI。</ArgTableRow>
<ArgTableRow arg="pppoe-over-vlan-range" typ="multi { vlan-range: range [1 .. 4094]
 }">
此设置允许 PPPoE 服务器在 802.1Q VLAN 上运行。支持 VLAN ID 范围以及使用逗号分隔值指定的单个 VLAN，例如：`100-115,120,122,128-130`。  

指定 VLAN ID 后，PPPoE 服务器将接受来自客户端的 802.1Q 标记数据包，并使用同一 VLAN 进行回复。然后，您可以选择使用 `accept-untagged` 属性在同一接口上接受或丢弃未标记的 PPPoE 客户端。  
您甚至可以在 VLAN 接口上使用 `pppoe-over-vlan-range` 设置配置 PPPoE 服务器，从而也启用 QinQ 设置。但请记住，内层 VLAN 标记应为 802.1Q。
</ArgTableRow>
<ArgTableRow arg="accept-untagged" typ="bool">指定 `pppoe-over-vlan-range` 时，是否在接口上接受未标记（非 VLAN）的 PPPoE 数据包。</ArgTableRow>
</ArgTable>
