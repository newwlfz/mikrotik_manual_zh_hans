---
sidebar_key: "cli-reference/mpls/ldp/interface"
sidebar_position: 3
title: "interface"
sidebar_label: 'interface'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/mpls/ldp/interface
captured_at: '2026-11-01T21:24:47+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/ldp/interface {#mplsldpinterface}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="enum ()" mandatory="1">接口或接口列表的名称，LDP 将在其中侦听。</ArgTableRow>
<ArgTableRow arg="hello-interval" typ="time" unset="1">路由器在指定接口上发送的 hello 报文之间的间隔。默认值为 5s。</ArgTableRow>
<ArgTableRow arg="hold-time" typ="time" unset="1">指定接口上发现的邻居在多长时间后被声明为不可达。默认值为 15s。</ArgTableRow>
<ArgTableRow arg="transport-addresses" typ="multi { array-id, transport-address: address (flags=46)
 }" unset="1">如果传输地址与 LDP Instance 设置不同，则使用这些传输地址。</ArgTableRow>
<ArgTableRow arg="accept-dynamic-neighbors" typ="bool" unset="1">定义是动态发现邻居，还是仅使用在 LDP neighbors 菜单中静态配置的邻居。</ArgTableRow>
<ArgTableRow arg="afi" typ="ubit (ip, ipv6)" unset="1">确定接口地址族。仅考虑实例配置为支持的 AFI。如果未显式指定该值，则视为等于实例支持的 AFI。</ArgTableRow>
</ArgTable>
