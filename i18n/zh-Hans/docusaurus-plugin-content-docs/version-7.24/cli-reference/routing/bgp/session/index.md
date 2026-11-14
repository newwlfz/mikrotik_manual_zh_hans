---
sidebar_key: "cli-reference/routing/bgp/session/index"
sidebar_position: 3
title: "session"
sidebar_label: "session"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/bgp/session
captured_at: '2026-11-01T21:29:28+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/session {#routingbgpsession}
**条件：** !smips
**类型：** 目录

已建立、尚未连接或已断开的 BGP 会话列表。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="E" typ="established">established</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="instance" typ="enum"></ArgTableRow>
<ArgTableRow arg="remote.address" typ="address (flags=46iv+:)"></ArgTableRow>
<ArgTableRow arg="remote.port" typ="num"></ArgTableRow>
<ArgTableRow arg="remote.as" typ="super { as: as
, [sub-as] [ /as]
 }"></ArgTableRow>
<ArgTableRow arg="remote.id" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="remote.refused-cap-opt" typ="bool"></ArgTableRow>
<ArgTableRow arg="remote.capabilities" typ="ubit (mp, rr, orf, enhe, em, sec, ml, role, gr, as4, dyn, ms, ap, err, llgr, fqdn)">远端对等体通告/支持的能力。</ArgTableRow>
<ArgTableRow arg="remote.afi" typ="ubit (ip, ipv6, l2vpn, l2vpn-cisco, vpnv4, vpnv6, evpn)">远端对等体通告/支持的地址族。</ArgTableRow>
<ArgTableRow arg="remote.hold-time" typ="alt { special: enum (infinity) { infinity:0 }
, number: time [3 .. 65535]
 }"></ArgTableRow>
<ArgTableRow arg="remote.messages" typ="num">从远端对等体接收的 BGP 消息数。</ArgTableRow>
<ArgTableRow arg="remote.bytes" typ="num">从远端对等体接收的总字节数。</ArgTableRow>
<ArgTableRow arg="remote.gr-restart" typ="bool"></ArgTableRow>
<ArgTableRow arg="remote.gr-time" typ="num"></ArgTableRow>
<ArgTableRow arg="remote.gr-afi" typ="ubit (ip, ipv6, l2vpn, l2vpn-cisco, vpnv4, vpnv6)"></ArgTableRow>
<ArgTableRow arg="remote.gr-afi-fwp" typ="ubit (ip, ipv6, l2vpn, l2vpn-cisco, vpnv4, vpnv6)"></ArgTableRow>
<ArgTableRow arg="remote.eor" typ="ubit (ip, ipv6, l2vpn, l2vpn-cisco, vpnv4, vpnv6, evpn)">从远端对等体收到 end-of-rib 的地址族列表。</ArgTableRow>
<ArgTableRow arg="remote.role" typ="enum (provider | route-server | route-server-client | customer | peer)"></ArgTableRow>
<ArgTableRow arg="local.role" typ="enum (ibgp | ibgp-rr | ebgp | ebgp-provider | ebgp-rs | ebgp-rs-client | ebgp-customer | ebgp-peer)"></ArgTableRow>
<ArgTableRow arg="local.address" typ="address (flags=46iv:)"></ArgTableRow>
<ArgTableRow arg="local.port" typ="num"></ArgTableRow>
<ArgTableRow arg="local.as" typ="super { as: as
, [sub-as] [ /as]
 }"></ArgTableRow>
<ArgTableRow arg="local.id" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="local.cluster-id" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="local.capabilities" typ="ubit (mp, rr, enhe, role, gr, as4, ap)"></ArgTableRow>
<ArgTableRow arg="local.afi" typ="ubit (ip, ipv6, l2vpn, l2vpn-cisco, vpnv4, vpnv6, evpn)"></ArgTableRow>
<ArgTableRow arg="local.messages" typ="num"></ArgTableRow>
<ArgTableRow arg="local.bytes" typ="num"></ArgTableRow>
<ArgTableRow arg="local.eor" typ="ubit (ip, ipv6, l2vpn, l2vpn-cisco, vpnv4)"></ArgTableRow>
<ArgTableRow arg="output.affinity" typ="enum (main | alone | remote-as | instance | afi | vrf | input)"></ArgTableRow>
<ArgTableRow arg="output.procid" typ="num"></ArgTableRow>
<ArgTableRow arg="output.filter-select" typ="enum"></ArgTableRow>
<ArgTableRow arg="output.filter-chain" typ="enum"></ArgTableRow>
<ArgTableRow arg="output.network" typ="enum"></ArgTableRow>
<ArgTableRow arg="output.add-path" typ="ubit (ip, ipv6)"></ArgTableRow>
<ArgTableRow arg="output.remove-private-as" typ="bool"></ArgTableRow>
<ArgTableRow arg="output.default-originate" typ="enum (never | if-installed | always)"></ArgTableRow>
<ArgTableRow arg="output.default-prepend" typ="num"></ArgTableRow>
<ArgTableRow arg="output.no-client-to-client-reflection" typ="bool"></ArgTableRow>
<ArgTableRow arg="output.no-early-cut" typ="bool"></ArgTableRow>
<ArgTableRow arg="output.keep-sent-attributes" typ="bool"></ArgTableRow>
<ArgTableRow arg="output.last-notification" typ="string">最后发送的 notification 消息内容。</ArgTableRow>
<ArgTableRow arg="input.affinity" typ="enum (main | alone | remote-as | instance | afi | vrf)"></ArgTableRow>
<ArgTableRow arg="input.procid" typ="num">显示该会话绑定到哪个路由进程。</ArgTableRow>
<ArgTableRow arg="input.filter" typ="enum"></ArgTableRow>
<ArgTableRow arg="input.allow-as" typ="num"></ArgTableRow>
<ArgTableRow arg="input.as-override" typ="bool"></ArgTableRow>
<ArgTableRow arg="input.ignore-as-path-len" typ="bool"></ArgTableRow>
<ArgTableRow arg="input.limit-process-routes" typ="num"></ArgTableRow>
<ArgTableRow arg="input.add-path" typ="ubit (ip, ipv6)"></ArgTableRow>
<ArgTableRow arg="input.last-notification" typ="string">最后接收的 notification 消息内容。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum"></ArgTableRow>
<ArgTableRow arg="ibgp" typ="switch">指示该会话是否为 iBGP。</ArgTableRow>
<ArgTableRow arg="ebgp" typ="switch">指示该会话是否为 eBGP。</ArgTableRow>
<ArgTableRow arg="limit-exceeded" typ="switch">指示接收的前缀数量是否超过由 `input.limit-process-routes-ipv4` 和/或 `input.limit-process-routes-ipv6` 配置的前缀限制。</ArgTableRow>
<ArgTableRow arg="stopped" typ="switch">指示该会话是否已被管理性关闭。</ArgTableRow>
<ArgTableRow arg="routing-table" typ="enum"></ArgTableRow>
<ArgTableRow arg="nexthop-choice" typ="enum (default | force-self | propagate)"></ArgTableRow>
<ArgTableRow arg="cisco-vpls-nlri-len-fmt" typ="enum (auto-bits | auto-bytes | bits | bytes)"></ArgTableRow>
<ArgTableRow arg="multihop" typ="bool"></ArgTableRow>
<ArgTableRow arg="hold-time" typ="alt { special: enum (infinity) { infinity:0 }
, number: time [3 .. 65535]
 }"></ArgTableRow>
<ArgTableRow arg="keepalive-time" typ="time"></ArgTableRow>
<ArgTableRow arg="use-bfd" typ="bool"></ArgTableRow>
<ArgTableRow arg="uptime" typ="time">已建立会话的运行时间。</ArgTableRow>
<ArgTableRow arg="last-started" typ="date"></ArgTableRow>
<ArgTableRow arg="last-stopped" typ="date"></ArgTableRow>
<ArgTableRow arg="save-to" typ="string"></ArgTableRow>
<ArgTableRow arg="prefix-count" typ="num"></ArgTableRow>
<ArgTableRow arg="keepalive-timer" typ="time"></ArgTableRow>
<ArgTableRow arg="restart-timer" typ="time"></ArgTableRow>
</ArgTable>
