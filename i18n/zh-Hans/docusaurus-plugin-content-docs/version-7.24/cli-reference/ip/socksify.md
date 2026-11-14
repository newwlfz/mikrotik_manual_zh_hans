---
sidebar_key: "cli-reference/ip/socksify"
sidebar_position: 24
title: "socksify"
sidebar_label: "socksify"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/socksify
captured_at: '2026-11-01T21:28:57+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/socksify {#ipsocksify}
**类型：** 目录

完整文档请参阅 [Socksify](../../network-management/socks/socksify.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">disabled（默认设置）</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">Socksify 服务的名称</ArgTableRow>
<ArgTableRow arg="connection-timeout" typ="num">连接建立期间等待 SOCKS 代理或目标响应的秒数，超时后将中止并报错。设为 0 可禁用超时（默认值：**60s**）</ArgTableRow>
<ArgTableRow arg="port" typ="num">Socksify 服务使用的 TCP 端口（默认值：**952**）</ArgTableRow>
<ArgTableRow arg="socks5-server" typ="ipAddr">SOCKS5 代理服务器的 IP 地址，仅支持 IPv4（默认值：**0.0.0.0**）</ArgTableRow>
<ArgTableRow arg="socks5-port" typ="num">SOCKS5 代理服务器的监听端口（默认值：**1080**）</ArgTableRow>
<ArgTableRow arg="socks5-user" typ="string">用于访问 SOCKS5 代理服务器的用户名</ArgTableRow>
<ArgTableRow arg="socks5-password" typ="string">用于访问 SOCKS5 代理服务器的密码</ArgTableRow>
</ArgTable>
