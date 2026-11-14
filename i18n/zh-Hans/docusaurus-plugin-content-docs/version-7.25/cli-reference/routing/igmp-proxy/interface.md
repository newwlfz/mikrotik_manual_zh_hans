---
sidebar_key: "cli-reference/routing/igmp-proxy/interface"
sidebar_position: 1
title: "interface"
sidebar_label: 'interface'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/igmp-proxy/interface
captured_at: '2026-11-01T21:25:12+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/igmp-proxy/interface {#routingigmp-proxyinterface}
**类型：** 目录

配置哪些接口将作为路由器上的 IGMP 代理接口参与工作。如果某个接口未配置为 IGMP 代理接口，则从该接口收到的所有 IGMP 流量都会被忽略。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum { all:0 }">接口名称。</ArgTableRow>
<ArgTableRow arg="upstream" typ="bool">如果接口位于组播树根的方向，则该接口称为 "upstream"。IGMP 转发路由器必须恰好配置一个 upstream 接口。upstream 接口用于发送 IGMP 成员关系请求。</ArgTableRow>
<ArgTableRow arg="threshold" typ="num">最小 TTL。接收到 TTL 值更低的数据包将被忽略</ArgTableRow>
<ArgTableRow arg="alternative-subnets" typ="multi { numbers: super { as: ipAddr
, [netmask] /num
 }
 }">默认情况下，仅接受来自直连子网的数据包。此参数可用于指定备用有效数据包源子网列表，适用于数据和 IGMP 数据包。仅对 upstream 接口生效。当组播数据的源经常位于不同的 IP 网络时应使用此参数。</ArgTableRow>
<ArgTableRow arg="robustness" typ="num">此接口的 robustness 值。覆盖 `/routing/igmp-proxy` 菜单中的全局 robustness 设置。</ArgTableRow>
<ArgTableRow arg="query-interval" typ="time">通过此接口发送 IGMP Query 消息的频率。覆盖 `/routing/igmp-proxy` 菜单中的全局 query-interval 设置。</ArgTableRow>
<ArgTableRow arg="query-response-interval" typ="time">在此接口上等待 IGMP Query 消息响应的时间。覆盖 `/routing/igmp-proxy` 菜单中的全局 query-response-interval 设置。</ArgTableRow>
<ArgTableRow arg="last-member-query-interval" typ="time">此接口上组特定查询的超时时间。覆盖 `/routing/igmp-proxy` 菜单中的全局 last-member-query-interval 设置。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="state.querier" typ="bool">此接口当前是否为当选的 IGMP querier。</ArgTableRow>
<ArgTableRow arg="state.source-ip-address" typ="ipAddr">此接口用于 IGMP 消息的源 IP 地址。</ArgTableRow>
<ArgTableRow arg="state.rx-bytes" typ="num">接口上接收到的组播流量总量，以字节为单位。</ArgTableRow>
<ArgTableRow arg="state.rx-packets" typ="num">接口上接收到的组播流量总量，以数据包为单位。</ArgTableRow>
<ArgTableRow arg="state.tx-bytes" typ="num">接口上发送的组播流量总量，以字节为单位。</ArgTableRow>
<ArgTableRow arg="state.tx-packets" typ="num">接口上发送的组播流量总量，以数据包为单位。</ArgTableRow>
<ArgTableRow arg="state.robustness" typ="num">接口上正在使用的有效 robustness 值。当此接口不是当选的 querier 时，它会采用当选 querier 在其 IGMP 查询中通告的 robustness 值。</ArgTableRow>
<ArgTableRow arg="state.query-interval" typ="time">接口上正在使用的有效查询间隔。当此接口不是当选的 querier 时，它会采用当选 querier 在其 IGMP 查询中通告的查询间隔。</ArgTableRow>
</ArgTable>
