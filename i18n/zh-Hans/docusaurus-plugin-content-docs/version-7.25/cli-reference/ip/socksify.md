---
sidebar_key: "cli-reference/ip/socksify"
sidebar_position: 24
title: "socksify"
sidebar_label: 'socksify'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/socksify
captured_at: '2026-11-01T21:24:28+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/socksify {#ipsocksify}
**类型：** 目录

该服务会将防火墙 NAT 规则（`action=socksify`，通常位于 `dstnat` 链中）重定向到它的流量，通过上游 SOCKS5 服务器转发。修改记录属性后，需要先禁用再重新启用该记录才会生效。

完整文档请参阅 [Socksify](../../network-management/socks/socksify.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">disabled（默认设置）</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">socksify 服务记录的名称。</ArgTableRow>
<ArgTableRow arg="connection-timeout" typ="num">连接建立期间等待 SOCKS 服务器和目标的时间，单位为秒（0 到 3000），超时后将以错误中止。设置为 0 可禁用超时。默认值：`60`。</ArgTableRow>
<ArgTableRow arg="port" typ="num">服务监听的本地 TCP 端口；`socksify` NAT 动作会将截获的连接重定向到此端口。默认值：`952`。</ArgTableRow>
<ArgTableRow arg="socks5-server" typ="ipAddr">上游 SOCKS5 服务器的 IPv4 地址。不接受 IPv6 地址。默认值：`0.0.0.0`。</ArgTableRow>
<ArgTableRow arg="socks5-port" typ="num">SOCKS5 服务器的监听端口。默认值：`1080`。</ArgTableRow>
<ArgTableRow arg="socks5-user" typ="string">上游 SOCKS5 服务器的用户名。在 `print detail` 输出中以明文显示。默认值：空。</ArgTableRow>
<ArgTableRow arg="socks5-password" typ="string">上游 SOCKS5 服务器的密码。在 `print detail` 输出中以明文显示。默认值：空。</ArgTableRow>
</ArgTable>
