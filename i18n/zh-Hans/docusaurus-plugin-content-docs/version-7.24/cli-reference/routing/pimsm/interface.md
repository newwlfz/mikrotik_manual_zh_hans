---
title: "interface"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/pimsm/interface
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## routing/pimsm/interface 
**条件：** !smips
**类型：** 目录

interface 菜单显示当前参与 PIM 的所有接口及其状态。该菜单包含由已定义接口模板创建的动态只读条目。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
<ArgTableRow arg="P" typ="designated-router">designated-router</ArgTableRow>
<ArgTableRow arg="J" typ="join-tracking">join-tracking</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="instance" typ="enum"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum"></ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46)"></ArgTableRow>
<ArgTableRow arg="dr" typ="switch"></ArgTableRow>
<ArgTableRow arg="join-tracking" typ="switch"></ArgTableRow>
<ArgTableRow arg="priority" typ="num"></ArgTableRow>
<ArgTableRow arg="propagation-delay" typ="time"></ArgTableRow>
<ArgTableRow arg="override-interval" typ="time"></ArgTableRow>
</ArgTable>
