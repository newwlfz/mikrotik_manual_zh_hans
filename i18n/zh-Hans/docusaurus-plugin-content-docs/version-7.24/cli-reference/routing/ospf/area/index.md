---
sidebar_key: "cli-reference/routing/ospf/area/index"
sidebar_position: 1
title: "area"
sidebar_label: "area"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/ospf/area
captured_at: '2026-11-01T21:29:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/ospf/area {#routingospfarea}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="T" typ="transit-capable">transit-capable</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">区域的名称</ArgTableRow>
<ArgTableRow arg="instance" typ="enum" mandatory="1">此区域所属的 OSPF 实例的名称。</ArgTableRow>
<ArgTableRow arg="area-id" typ="ipAddr">OSPF 区域标识符。如果路由器在多个区域中都有网络，则必须始终存在一个 `area-id=0.0.0.0` 的区域（骨干区域）。骨干区域始终包含所有区域边界路由器。骨干区域负责在非骨干区域之间分发路由信息。骨干区域必须是连续的，即不能存在断开的段。但是，区域边界路由器不需要物理连接到骨干区域——与骨干区域的连接可以使用虚拟链路来模拟。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (default | stub | nssa)">区域类型。有关区域类型的更多信息，请参阅 [OSPF 用户指南](../../../../user-guides/routing-and-networking-protocols/unicast/ospf/index.md)。</ArgTableRow>
<ArgTableRow arg="no-summaries" typ="switch">标志参数；如果设置，则该区域将不会在 stub 区域中泛洪 summary LSA。</ArgTableRow>
<ArgTableRow arg="default-cost" typ="num" unset="1">注入到该区域的 LSA 的默认开销。如果未设置该值，则不会生成 stub 区域的 type-3 默认 LSA。</ArgTableRow>
<ArgTableRow arg="nssa-translator" typ="enum (candidate | no | yes)" unset="1">
该参数指示哪个 ABR 将用作从 `type-7` 到 `type-5` LSA 的转换器。仅当区域类型为 NSSA 时适用。
- yes - 路由器将始终用作转换器。
- no - 路由器绝不会用作转换器。
- candidate - OSPF 会从候选路由器中选择一个作为转换器。
</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="transit-capable" typ="bool"></ArgTableRow>
</ArgTable>
