---
sidebar_key: "cli-reference/interface/pppoe-client/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/interface/pppoe-client/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/pppoe-client/monitor {#interfacepppoe-clientmonitor}
**类型：** 命令

该命令将显示当前 PPPoE 状态。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">
当前链路状态。可用值有：
- dialing，
- verifying password...，
- connected，
- disconnected。
</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">连接时间，以天、小时、分钟和秒显示。</ArgTableRow>
<ArgTableRow arg="active-links" typ="num">绑定的 MLPPP 连接数量（如果未使用 MLPPP，则为 1）。</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">此连接所使用的加密和编码方式（如果不对称，则用 '/' 分隔）。</ArgTableRow>
<ArgTableRow arg="service-name" typ="string">所使用的服务名称。</ArgTableRow>
<ArgTableRow arg="ac-name" typ="string">接入集中器的名称。</ArgTableRow>
<ArgTableRow arg="ac-mac" typ="macAddr">客户端所连接的接入集中器（AC）的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">链路的有效 MTU。</ArgTableRow>
<ArgTableRow arg="mru" typ="num">链路的有效 MRU。</ArgTableRow>
<ArgTableRow arg="local-address" typ="ipAddr">分配给客户端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="ipAddr">分配给服务器的远端 IP 地址（即网关地址）。</ArgTableRow>
<ArgTableRow arg="local-ipv6-address" typ="ip6Addr">连接的本地 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="remote-ipv6-address" typ="ip6Addr">连接的远端 IPv6 地址。</ArgTableRow>
</ArgTable>
