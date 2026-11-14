---
sidebar_key: "cli-reference/zerotier"
title: "zerotier"
sidebar_label: 'zerotier'
source: https://manual.mikrotik.com/docs/cli-reference/zerotier
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## zerotier {#zerotier}
**软件包：** zerotier
**类型：** 目录

[ZeroTier](../../virtual-private-networks/zerotier.md) 网络虚拟机监控程序是一个自包含的网络虚拟化引擎，它实现以太网虚拟化层

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">条目是否已禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="online">实例是否在线。</ArgTableRow>
<ArgTableRow arg="F" typ="tcp-fallback">TCP 回退是否处于活动状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">实例名称。</ArgTableRow>
<ArgTableRow arg="disabled" typ="bool">条目是否已禁用。</ArgTableRow>
<ArgTableRow arg="port" typ="num">实例监听的端口号。</ArgTableRow>
<ArgTableRow arg="identity" typ="string">实例的 40 位唯一地址。</ArgTableRow>
<ArgTableRow arg="interfaces" typ="multi { array-id, interface: iface_enum
 }">用于通过 ARP 和 IP 类型连接发现 ZeroTier 对等体的接口列表。</ArgTableRow>
<ArgTableRow arg="route-distance" typ="num">从 planet/moon 服务器获取的路由所对应的路由距离。</ArgTableRow>
<ArgTableRow arg="backup-priorities" typ="multi { array-id, array-id, backup-priority: composite { interface: iface_enum
, priority: num
 }
 }">用于故障转移的备用接口优先级。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="identity.public" typ="string">实例的公开身份。</ArgTableRow>
<ArgTableRow arg="state" typ="string">实例的当前状态。</ArgTableRow>
<ArgTableRow arg="moons" typ="multi { array-id, moon: string
 }">实例连接到的 moon 列表。</ArgTableRow>
</ArgTable>
