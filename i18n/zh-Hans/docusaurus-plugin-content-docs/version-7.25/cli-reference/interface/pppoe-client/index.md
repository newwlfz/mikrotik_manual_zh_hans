---
sidebar_key: "cli-reference/interface/pppoe-client/index"
sidebar_position: 1
title: "pppoe-client"
sidebar_label: 'pppoe-client'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/pppoe-client
captured_at: '2026-11-01T21:22:56+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/pppoe-client {#interfacepppoe-client}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否已禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">接口是否无效。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">PPPoE 接口的名称，若未指定则由 RouterOS 生成。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">最大接收单元。</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，则会被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或以太网数据包。</ArgTableRow>
<ArgTableRow arg="interface" typ="multi { array-id, interface: iface_enum
 }">运行客户端的接口名称。</ArgTableRow>
<ArgTableRow arg="user" typ="string">用于身份验证的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于身份验证的密码。</ArgTableRow>
<ArgTableRow arg="profile" typ="enum">指定建立隧道时使用的 PPP 配置文件。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">保活超时时间，单位为秒。</ArgTableRow>
<ArgTableRow arg="service-name" typ="string">指定接入集中器上设置的服务名称。可以留空以连接到任何 PPPoE 服务器。</ArgTableRow>
<ArgTableRow arg="ac-name" typ="string">接入集中器名称。可以留空，客户端将连接到广播域中的任何接入集中器。</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool">是否自动添加默认路由。</ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num">如果同时启用了 add-default-route，则应用于自动创建的默认路由的距离值。</ArgTableRow>
<ArgTableRow arg="dial-on-demand" typ="bool">仅在生成出站流量时才连接到 AC。如果选中，则在连接尚未建立时添加一条网关地址来自 10.112.112.0/24 网络的路由。</ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="bool">是否从对端获取 DNS 设置。</ArgTableRow>
<ArgTableRow arg="allow" typ="ubit (pap, chap, mschap1, mschap2)">允许的身份验证方法。默认情况下，允许所有方法。</ArgTableRow>
<ArgTableRow arg="host-uniq" typ="string">十六进制格式的 host-uniq 值。</ArgTableRow>
</ArgTable>
