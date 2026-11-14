---
sidebar_key: "cli-reference/interface/pppoe-server"
title: "pppoe-server"
sidebar_label: 'pppoe-server'
source: https://manual.mikrotik.com/docs/cli-reference/interface/pppoe-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/pppoe-server {#interfacepppoe-server}
**类型：** 目录

PPPoE 服务器配置中有两类接口（隧道）项——静态用户和动态连接。为每个建立到给定服务器的隧道创建一个接口。如果需要引用为特定用户创建的特定接口名称（在防火墙规则或其他位置），则会以管理方式添加静态接口。每当用户连接且其用户名不匹配任何现有静态条目时，动态接口会自动添加到此列表（或者如果该条目已处于活动状态，因为不能有两个单独的隧道接口使用同一名称引用——如果这是个问题，请设置 *one-session-per-host* 值）。动态接口在用户连接时出现，并在用户断开后消失，因此无法在路由器配置中（例如在防火墙中）引用为该用户创建的隧道，所以如果你需要为该用户设置持久规则，请为其创建静态条目。否则，使用动态配置是安全的。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">服务器接口是否为动态创建。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称。</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">用于认证的用户名。</ArgTableRow>
<ArgTableRow arg="service" typ="string" mandatory="1">PPPoE 服务名称。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mtu" typ="num">连接的当前 MTU。</ArgTableRow>
<ArgTableRow arg="mru" typ="num">连接的当前 MRU。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="string">连接的远端 IP 地址。</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">所使用的加密编码。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">连接运行时长。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">客户端接入的接口。</ArgTableRow>
<ArgTableRow arg="vid" typ="num">连接的 VLAN ID。</ArgTableRow>
</ArgTable>
