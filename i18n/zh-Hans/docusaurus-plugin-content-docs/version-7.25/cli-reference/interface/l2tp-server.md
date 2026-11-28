---
title: "l2tp-server"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/l2tp-server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/l2tp-server 
**类型：** 目录

系统会为连接到指定服务器的每个隧道创建一个接口。L2TP 服务器配置中有两种接口类型：
- 静态接口：如果需要引用为特定用户创建的接口名称（在防火墙规则或其他位置），则由管理员添加。
- 动态接口：当用户连接且其用户名与任何现有静态条目都不匹配时，会自动添加到此列表中（或者在该条目已处于活动状态时添加，因为不能有两个不同的隧道接口使用同一名称引用）。

动态接口在用户连接时出现，并在用户断开连接后消失，因此无法在路由器配置中引用为该用户创建的隧道（例如，在防火墙中）。如果需要针对该用户的持久规则，请为其创建静态条目。否则，使用动态配置即可。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether an item is disabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Whether the server interface was created dynamically.</ArgTableRow>
<ArgTableRow arg="R" typ="running">Whether the interface is running.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Interface name.</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">User name used for authentication.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="mtu" typ="num">Current MTU of the connection.</ArgTableRow>
<ArgTableRow arg="mru" typ="num">Current MRU of the connection.</ArgTableRow>
<ArgTableRow arg="client-address" typ="string">IP address of the connected client.</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">Connection uptime.</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">Encryption encoding used.</ArgTableRow>
</ArgTable>
