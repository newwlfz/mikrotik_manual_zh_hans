---
title: "settings"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/nd/settings
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/nd/settings 
**类型：** 设置目录

IPv6 ND 菜单包含子菜单“Settings”，可用于修改全局邻居发现设置。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="router-advertisement-route-distance" typ="num">Specify the distance that must be used when installing SLAAC default route.</ArgTableRow>
<ArgTableRow arg="router-advertisement-ignored-options" typ="ubit (dns, mtu)">Lets you ignore specific received ND options such as DNS and MTU. If RA will contain such options, they simply will be ignored if selected on this list.</ArgTableRow>
</ArgTable>
