---
sidebar_key: "cli-reference/cmr/layout/link"
sidebar_position: 2
title: "link"
sidebar_label: 'link'
source: https://manual.mikrotik.com/docs/cli-reference/cmr/layout/link
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/layout/link {#cmrlayoutlink}
**软件包：** cmr
**类型：** 目录

用于拓扑中特定链路的配置。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="layout" typ="enum" mandatory="1">链接将显示所在布局的名称。</ArgTableRow>
<ArgTableRow arg="node1" typ="enum" mandatory="1">链路中第一个节点的名称。</ArgTableRow>
<ArgTableRow arg="node2" typ="enum" mandatory="1">链路中第二个节点的名称。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="links" typ="multi { array-id, array-id, link: super { port1: object
, [port2] --object
 }
 }">有关链路状态的详细信息，例如 PoE 状态、接口名称和流量信息。端口名称前的 `*` 表示直连的物理链路。示例：`ether1(,tx=85.9KiB,rx=10.8KiB)--ether23(poe=powered-on,tx=10.9KiB,rx=86.8KiB)`</ArgTableRow>
</ArgTable>
