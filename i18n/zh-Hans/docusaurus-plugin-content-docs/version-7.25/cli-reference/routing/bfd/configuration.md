---
sidebar_key: "cli-reference/routing/bfd/configuration"
sidebar_position: 2
title: "configuration"
sidebar_label: 'configuration'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/bfd/configuration
captured_at: '2026-11-01T21:25:02+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bfd/configuration {#routingbfdconfiguration}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vrf" typ="enum" unset="1">此配置适用的虚拟路由转发实例。</ArgTableRow>
<ArgTableRow arg="interfaces" typ="object { interface: iface_enum
 }" unset="1">应激活 BFD 配置的接口列表。</ArgTableRow>
<ArgTableRow arg="addresses" typ="object { address: alt { ipv6: ip6Prefix
, ip: ipPrefix
 }
 }" unset="1">此配置条目仅适用于与这些特定远程邻居建立的 BFD 会话。</ArgTableRow>
<ArgTableRow arg="address-list" typ="enum" unset="1">防火墙地址列表名称。如果远程 IP 地址包含在指定列表中，则应用 BFD 配置。</ArgTableRow>
<ArgTableRow arg="min-tx" typ="time" unset="1">本地路由器向邻居发送 BFD 数据包时希望使用的传输间隔。</ArgTableRow>
<ArgTableRow arg="min-rx" typ="time" unset="1">本地路由器在接收的 BFD 数据包之间要求的最小接收间隔。</ArgTableRow>
<ArgTableRow arg="multiplier" typ="num" unset="1">此值会与协商后的传输间隔相乘，以确定 **Hold Time**；如果在 Hold Time 内未收到任何数据包，则邻居被宣告为 down。 `Hold Time = negotiated interval × multiplier`</ArgTableRow>
<ArgTableRow arg="forbid-bfd" typ="bool" unset="1">如果 = **yes**：匹配条件的 BFD 会话将被禁止。</ArgTableRow>
<ArgTableRow arg="keyring" typ="enum" mandatory="1"></ArgTableRow>
</ArgTable>
