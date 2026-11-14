---
sidebar_key: "cli-reference/ip/ipsec/active-peers/index"
sidebar_position: 1
title: "active-peers"
sidebar_label: 'active-peers'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/active-peers
captured_at: '2026-11-01T21:24:07+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/active-peers {#ipipsecactive-peers}
**类型：** 目录

此菜单提供有关当前已建立 Phase 1 连接的远程对等体的各种统计信息。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="R" typ="responder">该对端是否为响应方。</ArgTableRow>
<ArgTableRow arg="N" typ="natt-peer">该对端是否使用 NAT 穿透。</ArgTableRow>
<ArgTableRow arg="P" typ="ppk">是否使用后量子预共享密钥。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="id" typ="string">对端标识符。</ArgTableRow>
<ArgTableRow arg="local-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">本地 IP 地址。</ArgTableRow>
<ArgTableRow arg="port" typ="num">远程端口。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">远程 IP 地址。</ArgTableRow>
<ArgTableRow arg="state" typ="enum (spawning | starting | message-1-received | message-1-sent | message-2-received | message-2-sent | message-3-received | message-3-sent | message-4-received | established | expired | no-phase1 | eap | crypto | qkd) { spawning:0, starting:1, message-1-received:2, message-1-sent:3, message-2-received:4, message-2-sent:5, message-3-received:6, message-3-sent:7, message-4-received:8, established:9, expired:10, no-phase1:11 }">当前 IKE 第 1 阶段状态。</ArgTableRow>
<ArgTableRow arg="side" typ="enum (initiator | responder)">该对端是否充当响应方。</ArgTableRow>
<ArgTableRow arg="dynamic-address" typ="alt { ip: ipAddr
 }">动态分配的地址。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">连接运行时间。</ArgTableRow>
<ArgTableRow arg="last-seen" typ="time">自上次收到数据包以来的时间。</ArgTableRow>
<ArgTableRow arg="ph2-total" typ="num">第 2 阶段交换的总数。</ArgTableRow>
<ArgTableRow arg="spii" typ="string">发起方 SPI 值。</ArgTableRow>
<ArgTableRow arg="spir" typ="string">响应方 SPI 值。</ArgTableRow>
<ArgTableRow arg="rx-packets" typ="num">接收的数据包数量。</ArgTableRow>
<ArgTableRow arg="rx-bytes" typ="num">接收的字节数。</ArgTableRow>
<ArgTableRow arg="tx-packets" typ="num">发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-bytes" typ="num">发送的字节数。</ArgTableRow>
</ArgTable>
