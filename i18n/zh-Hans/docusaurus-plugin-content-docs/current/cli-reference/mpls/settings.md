---
sidebar_key: "cli-reference/mpls/settings"
sidebar_position: 5
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/mpls/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## mpls/settings {#mplssettings}
**条件：** !smips
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="dynamic-label-range" typ="range">用于动态分配的标签编号范围。前 16 个标签保留用于特殊用途（如 RFC 中所定义）。如果打算静态配置标签，请调整动态默认范围，使其不包含将在静态配置中使用的编号。</ArgTableRow>
<ArgTableRow arg="propagate-ttl" typ="enum (yes | no)">是否将 TTL 值从 IP 首部复制到 MPLS 首部。如果此选项设置为 **no**，则 MPLS 云内部的跳数将对 traceroute 不可见。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="enum (yes | no)">启用/禁用 MPLS fast-path 支持。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mpls-fast-path-packets" typ="num"></ArgTableRow>
<ArgTableRow arg="mpls-fast-path-bytes" typ="num"></ArgTableRow>
</ArgTable>
