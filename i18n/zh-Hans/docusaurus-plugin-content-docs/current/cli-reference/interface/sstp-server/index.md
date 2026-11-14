---
sidebar_key: "cli-reference/interface/sstp-server"
title: "sstp-server"
sidebar_label: 'sstp-server'
source: https://manual.mikrotik.com/docs/cli-reference/interface/sstp-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/sstp-server {#interfacesstp-server}
**类型：** 目录

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
