---
sidebar_key: "cli-reference/interface/pptp-client"
title: "pptp-client"
sidebar_label: 'pptp-client'
source: https://manual.mikrotik.com/docs/cli-reference/interface/pptp-client
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/pptp-client {#interfacepptp-client}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口的描述性名称。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。PPTP 接口在不进行数据包分片的情况下能够发送的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">最大接收单元。PPTP 接口在不进行数据包分片的情况下能够接收的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，则会被拆分为多个数据包，从而允许通过隧道发送全尺寸的 IP 或以太网数据包。</ArgTableRow>
<ArgTableRow arg="connect-to" typ="alt { address: ipAddr
, name: string
 }" mandatory="1">PPTP 服务器的远程地址。</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">用于身份验证的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于身份验证的密码。</ArgTableRow>
<ArgTableRow arg="profile" typ="enum">指定建立隧道时使用的 PPP 配置文件。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">保活超时时间（秒）。</ArgTableRow>
<ArgTableRow arg="use-peer-dns" typ="enum (no | yes | exclusively) { no:0, yes:1, exclusively:2 }">是否使用对端的 DNS 设置。</ArgTableRow>
<ArgTableRow arg="add-default-route" typ="bool">是否将 PPTP 远程地址添加为默认路由。</ArgTableRow>
<ArgTableRow arg="default-route-distance" typ="num">启用 add-default-route 时应用于自动创建的默认路由的距离值。</ArgTableRow>
<ArgTableRow arg="dial-on-demand" typ="bool">仅在产生出站流量时才连接到 PPTP 服务器。如果启用，则在连接尚未建立时会添加一条网关地址来自 10.112.112.0/24 网络的路由。</ArgTableRow>
<ArgTableRow arg="allow" typ="ubit (pap, chap, mschap1, mschap2)">允许的身份验证方法。</ArgTableRow>
</ArgTable>
