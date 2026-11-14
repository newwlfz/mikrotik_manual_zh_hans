---
sidebar_key: "cli-reference/interface/sstp-server/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/sstp-server/monitor
captured_at: '2026-11-01T21:23:02+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/sstp-server/monitor {#interfacesstp-servermonitor}
**类型：** 命令

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">当前连接状态。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">连接运行时间。</ArgTableRow>
<ArgTableRow arg="user" typ="string">已认证的用户名。</ArgTableRow>
<ArgTableRow arg="caller-id" typ="string">已连接客户端的呼叫方 ID。</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">使用的加密编码方式。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">连接的当前 MTU。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ipAddr">连接的本地 IP 地址。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="ipAddr">连接的远端 IP 地址。</ArgTableRow>
<ArgTableRow arg="local-ipv6-address" typ="ip6Addr">连接的本地 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="remote-ipv6-address" typ="ip6Addr">连接的远端 IPv6 地址。</ArgTableRow>
</ArgTable>
