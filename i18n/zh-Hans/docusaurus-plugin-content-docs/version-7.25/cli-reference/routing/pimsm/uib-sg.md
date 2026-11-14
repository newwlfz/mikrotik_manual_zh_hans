---
sidebar_key: "cli-reference/routing/pimsm/uib-sg"
sidebar_position: 9
title: "uib-sg"
sidebar_label: 'uib-sg'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/pimsm/uib-sg
captured_at: '2026-11-01T21:25:17+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/pimsm/uib-sg {#routingpimsmuib-sg}
**条件：** !smips
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="K" typ="keepalive">keepalive</ArgTableRow>
<ArgTableRow arg="S" typ="spt-bit">最短路径树 (SPT) 位指示转发是在 (S,G) 最短路径树上进行，还是在 (\*,G) 树上进行。在源特定树构建期间，路由器可以拥有 (S,G) 状态，并且仍然在 (\*,G) 状态上进行转发。当 SPT 位为 false 时，仅使用 (\*,G) 转发状态来转发从 S 到 G 的数据包。当 SPT 位为 true 时，会同时使用 (\*,G) 和 (S,G) 转发状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum">在其上创建组播组的 PIM 实例的名称。</ArgTableRow>
<ArgTableRow arg="group" typ="address (flags=46i)">组播组地址。</ArgTableRow>
<ArgTableRow arg="source" typ="address (flags=46i)">该组播组的源 IP 地址。</ArgTableRow>
<ArgTableRow arg="rpf" typ="address (flags=46i)">反向路径转发 (RPF) 指示该组的 Join 消息发往的路由器地址和出接口。</ArgTableRow>
<ArgTableRow arg="register" typ="enum (join | join-pending | prune)"></ArgTableRow>
</ArgTable>
