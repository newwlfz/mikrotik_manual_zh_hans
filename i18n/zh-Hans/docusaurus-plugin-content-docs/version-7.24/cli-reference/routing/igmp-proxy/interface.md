---
sidebar_key: "cli-reference/routing/igmp-proxy/interface"
sidebar_position: 1
title: "interface"
sidebar_label: "interface"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/igmp-proxy/interface
captured_at: '2026-11-01T21:29:32+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/igmp-proxy/interface {#routingigmp-proxyinterface}
**类型：** 目录

配置哪些接口将作为路由器上的 IGMP 代理接口参与工作。如果某个接口未配置为 IGMP 代理接口，则从该接口收到的所有 IGMP 流量都会被忽略。

可以使用 `print status` 命令获取每个接口的详细状态信息。

```ros
[admin@MikroTik] /routing/igmp-proxy/interface/print status 
Flags: X - disabled, I - inactive, D - dynamic; U - upstream 
 0  U interface=ether2 threshold=1 alternative-subnets="" upstream=yes source-ip-address=192.168.10.10 rx-bytes=3018487500 rx-packets=2012325 tx-bytes=0 tx-packets=0 

 1    interface=ether3 threshold=1 alternative-subnets="" upstream=no querier=yes source-ip-address=192.168.20.10 rx-bytes=0 rx-packets=0 tx-bytes=2973486000 tx-packets=1982324 

 2    interface=ether4 threshold=1 alternative-subnets="" upstream=no querier=yes source-ip-address=192.168.30.10 rx-bytes=0 rx-packets=0 tx-bytes=152019000 tx-packets=101346 
```

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="U" typ="upstream">上游</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum { all:0 }">接口的名称。</ArgTableRow>
<ArgTableRow arg="threshold" typ="num">最小 TTL。收到的 TTL 值低于该值的报文将被忽略。</ArgTableRow>
<ArgTableRow arg="alternative-subnets" typ="multi { numbers: super { as: ipAddr
, [netmask] /num
 }
 }">默认情况下，只接受来自直连子网的报文。此参数可用于指定一份备用的有效报文源子网列表，对数据报文和 IGMP 报文均适用。仅对上游接口生效。当组播数据的源经常位于不同的 IP 网络时应使用此参数。</ArgTableRow>
<ArgTableRow arg="upstream" typ="bool">如果接口位于组播树的根方向，则该接口被称为 "upstream"（上游）接口。IGMP 转发路由器必须配置且仅配置一个上游接口。上游接口用于发送 IGMP 成员关系请求。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="querier" typ="bool">该接口是否充当 IGMP 查询器。</ArgTableRow>
<ArgTableRow arg="source-ip-address" typ="ipAddr">检测到的该接口源 IP。</ArgTableRow>
<ArgTableRow arg="rx-bytes" typ="num">该接口上接收的组播流量总量。</ArgTableRow>
<ArgTableRow arg="rx-packets" typ="num">该接口上接收的组播报文总数。</ArgTableRow>
<ArgTableRow arg="tx-bytes" typ="num">该接口上发送的组播流量总量。</ArgTableRow>
<ArgTableRow arg="tx-packets" typ="num">该接口上发送的组播报文总数。</ArgTableRow>
</ArgTable>
