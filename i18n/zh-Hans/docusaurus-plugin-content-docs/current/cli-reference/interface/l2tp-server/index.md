---
sidebar_key: "cli-reference/interface/l2tp-server"
title: "l2tp-server"
sidebar_label: 'l2tp-server'
source: https://manual.mikrotik.com/docs/cli-reference/interface/l2tp-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/l2tp-server {#interfacel2tp-server}
**类型：** 目录

对于每个建立到给定服务器的隧道，都会创建一个接口。L2TP 服务器配置中有两种类型的接口：
- 静态接口由管理员手动添加，用于在需要引用为特定用户创建的特定接口名称时（例如在防火墙规则或其他位置）。
- 动态接口会在用户连接时自动添加到此列表，前提是该用户的用户名与任何现有静态条目都不匹配（或者该条目已处于活动状态，因为同一个名称不能引用两个独立的隧道接口）。

动态接口在用户连接时出现，并在用户断开连接后消失，因此无法在路由器配置中（例如在防火墙中）引用为该用户创建的隧道，所以如果需要为该用户设置持久规则，请为其创建静态条目。否则，使用动态配置是安全的。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">服务器接口是否为动态创建。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称。</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">用于身份验证的用户名。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mtu" typ="num">连接的当前 MTU。</ArgTableRow>
<ArgTableRow arg="mru" typ="num">连接的当前 MRU。</ArgTableRow>
<ArgTableRow arg="client-address" typ="string">已连接客户端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">连接运行时长。</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">使用的加密编码。</ArgTableRow>
</ArgTable>
