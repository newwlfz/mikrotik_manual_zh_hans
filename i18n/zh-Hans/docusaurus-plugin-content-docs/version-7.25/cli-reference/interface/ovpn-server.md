---
title: "ovpn-server"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ovpn-server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/ovpn-server 
**类型：** 目录

系统会为连接到指定服务器的每个隧道创建一个接口。OVPN 服务器配置中有两种接口类型：

- 静态接口由管理员添加，当您需要引用为特定用户创建的接口名称时（例如，在防火墙规则或其他位置），使用静态接口。
- 当用户连接且其用户名不匹配任何现有静态条目时，或者匹配的静态条目已处于活动状态时，动态接口会自动添加到此列表，因为两个独立的隧道接口不能使用相同名称。

动态接口在用户连接时出现，并在用户断开连接时消失。因此，无法在路由器配置中引用为该用户创建的隧道（例如，在防火墙规则中）。如果用户需要持久规则，请创建静态条目。否则，动态配置即可满足需求。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether an item is disabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Whether the server interface was created dynamically.</ArgTableRow>
<ArgTableRow arg="R" typ="running">Whether the interface is running.</ArgTableRow>
<ArgTableRow arg="H" typ="hw-crypto">Whether hardware encryption is active.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Interface name.</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">User name used for authentication.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="mtu" typ="num">Current MTU of the connection.</ArgTableRow>
<ArgTableRow arg="client-address" typ="string">IP address of the connected client.</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">Connection uptime.</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">Encryption encoding used.</ArgTableRow>
</ArgTable>
