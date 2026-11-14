---
sidebar_key: "cli-reference/routing/pimsm/uib-g"
sidebar_position: 8
title: "uib-g"
sidebar_label: 'uib-g'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/pimsm/uib-g
captured_at: '2026-11-01T21:25:17+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/pimsm/uib-g {#routingpimsmuib-g}
**条件：** !smips
**类型：** 目录

上游信息库菜单显示任意源组播（\*,G）和源特定组播（S,G）组及其状态。这些菜单仅包含只读条目。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="R" typ="rp-local">该路由器本身是该组的 Rendezvous Point（RP）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum">创建该组播组所在的 PIM 实例名称。</ArgTableRow>
<ArgTableRow arg="group" typ="address (flags=46i)">组播组地址。</ArgTableRow>
<ArgTableRow arg="rp" typ="address (flags=46i)">该组的 Rendezvous Point 地址。</ArgTableRow>
<ArgTableRow arg="rpf" typ="address (flags=46i)">反向路径转发（RPF）指示该组播组的 Join 消息所指向的路由器地址和出接口。</ArgTableRow>
</ArgTable>
