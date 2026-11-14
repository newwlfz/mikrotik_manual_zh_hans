---
sidebar_key: "cli-reference/ipv6/nd/settings"
sidebar_position: 3
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/nd/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/nd/settings {#ipv6ndsettings}
**类型：** 设置目录

IPv6 ND 菜单有一个名为 "Settings" 的子菜单，可用于更改全局邻居发现设置。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="router-advertisement-route-distance" typ="num">指定安装 SLAAC 默认路由时必须使用的距离。</ArgTableRow>
<ArgTableRow arg="router-advertisement-ignored-options" typ="ubit (dns, mtu)">允许忽略接收到的特定 ND 选项，例如 DNS 和 MTU。如果 RA 包含此类选项，只要在此列表中选择它们，它们就会被直接忽略。</ArgTableRow>
</ArgTable>
