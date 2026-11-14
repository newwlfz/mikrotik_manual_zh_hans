---
sidebar_key: "cli-reference/interface/pptp-server/index"
sidebar_position: 1
title: "pptp-server"
sidebar_label: 'pptp-server'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/pptp-server
captured_at: '2026-11-01T21:22:58+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/pptp-server {#interfacepptp-server}
**类型：** 目录

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
