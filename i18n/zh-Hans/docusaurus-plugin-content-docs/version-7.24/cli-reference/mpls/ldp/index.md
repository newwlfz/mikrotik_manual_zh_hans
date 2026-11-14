---
sidebar_key: "cli-reference/mpls/ldp/index"
sidebar_position: 3
title: "ldp"
sidebar_label: "ldp"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/mpls/ldp
captured_at: '2026-11-01T21:29:14+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/ldp {#mplsldp}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="lsr-id" typ="ipAddr" unset="1">标签交换路由器的唯一 ID。</ArgTableRow>
<ArgTableRow arg="path-vector-limit" typ="num" unset="1">用于环路检测的最大路径向量限制。与 `loop-detect` 属性配合使用。</ArgTableRow>
<ArgTableRow arg="hop-limit" typ="num" unset="1">用于环路检测的最大跳数限制。与 `loop-detect` 属性配合使用。</ArgTableRow>
<ArgTableRow arg="loop-detect" typ="bool" unset="1">定义是否运行 LSP 环路检测。如果未在所有 LSR 上启用，则无法正常工作。仅应在非 TTL 网络（例如 ATM）上使用。</ArgTableRow>
<ArgTableRow arg="use-explicit-null" typ="bool" unset="1">是否分发 explicit-null 标签绑定。</ArgTableRow>
<ArgTableRow arg="distribute-for-default" typ="bool" unset="1">定义是否为默认路由映射标签。</ArgTableRow>
<ArgTableRow arg="transport-addresses" typ="multi { array-id, transport-address: address (flags=46)
 }" unset="1">指定 LDP 会话连接的源地址，并将这些地址作为传输地址通告给 LDP 邻居。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum" unset="1">此实例将操作的 VRF 表名称。</ArgTableRow>
<ArgTableRow arg="afi" typ="ubit (ip, ipv6)" unset="1">确定该实例支持的地址族。</ArgTableRow>
<ArgTableRow arg="preferred-afi" typ="enum (ip | ipv6)" unset="1">确定首选哪种地址族连接。该值也会设置到 dual-stack 元素中（如果使用）。</ArgTableRow>
</ArgTable>
