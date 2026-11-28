---
title: "pppoe-server"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/pppoe-server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/pppoe-server 
**类型：** 目录

PPPoE server 配置中有两类接口（隧道）项 - 静态用户和动态连接。每当与指定服务器建立隧道时，都会创建一个接口。如果需要引用为特定用户创建的特定接口名称（在防火墙规则或其他位置），则以管理方式添加静态接口。每当用户连接且用户名不匹配任何现有静态条目时，动态接口会自动添加到此列表中（或者在该条目已处于活动状态时也会添加，因为不能存在两个同名引用的独立隧道接口 - 如果这会造成问题，请设置 *one-session-per-host* 值）。动态接口在用户连接时出现，并在用户断开连接后消失，因此无法在路由器配置中引用为该用户创建的隧道（例如，在防火墙中）。如果需要针对该用户的持久规则，请为其创建静态条目。否则，使用动态配置是安全的。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether an item is disabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">Whether the server interface was created dynamically.</ArgTableRow>
<ArgTableRow arg="R" typ="running">Whether the interface is running.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Interface name.</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">Username used for authentication.</ArgTableRow>
<ArgTableRow arg="service" typ="string" mandatory="1">PPPoE service name.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="mtu" typ="num">Current MTU of the connection.</ArgTableRow>
<ArgTableRow arg="mru" typ="num">Current MRU of the connection.</ArgTableRow>
<ArgTableRow arg="remote-address" typ="string">Remote IP address of the connection.</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">Encryption encoding used.</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">Connection uptime.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">Interface the client is connected through.</ArgTableRow>
<ArgTableRow arg="vid" typ="num">VLAN ID of the connection.</ArgTableRow>
</ArgTable>
