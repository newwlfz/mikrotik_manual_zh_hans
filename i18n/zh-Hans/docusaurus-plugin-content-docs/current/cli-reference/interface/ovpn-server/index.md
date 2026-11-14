---
sidebar_key: "cli-reference/interface/ovpn-server"
title: "ovpn-server"
sidebar_label: 'ovpn-server'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ovpn-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ovpn-server {#interfaceovpn-server}
**类型：** 目录

为连接到指定服务器的每个隧道创建一个接口。OVPN 服务器配置中有两种类型的接口：

- 静态接口由管理员手动添加，用于在需要引用为特定用户创建的某个具体接口名称时使用（例如在防火墙规则或其他位置）。
- 动态接口会在用户连接时自动加入此列表，前提是该用户的用户名与任何现有静态条目都不匹配，或者匹配的静态条目已处于活动状态，因为两个独立的隧道接口不能使用相同的名称。

动态接口在用户连接时出现，在用户断开连接时消失。因此，无法在路由器配置中（例如在防火墙规则中）引用为该用户创建的隧道。如果需要为用户保留持久规则，请创建静态条目。否则，动态配置已经足够。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">条目是否被禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">服务器接口是否为动态创建。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
<ArgTableRow arg="H" typ="hw-crypto">硬件加密是否已启用。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称。</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">用于身份验证的用户名。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mtu" typ="num">连接的当前 MTU。</ArgTableRow>
<ArgTableRow arg="client-address" typ="string">已连接客户端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">连接运行时间。</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">使用的加密编码。</ArgTableRow>
</ArgTable>
