---
sidebar_key: "cli-reference/interface/ethernet/switch/port-leakage"
sidebar_position: 16
title: "port-leakage"
sidebar_label: 'port-leakage'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/port-leakage
captured_at: '2026-11-01T21:22:37+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/port-leakage {#interfaceethernetswitchport-leakage}
**系统能力：** musicswitch
**类型：** 目录

端口泄漏允许绕过端口上的出站 VLAN 过滤。允许泄漏端口访问其他端口，用于安全、网络控制和管理等各种应用。注意：当同一端口同时应用隔离和泄漏时，该端口被隔离。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ports" typ="multi { array-id }">隔离/泄漏的端口。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (src | dst) { src:0, dst:1 }">
隔离/泄漏条目的查找类型：
- src - 条目应用于端口的入方向数据包。
- dst - 条目应用于端口的出方向数据包。
</ArgTableRow>
<ArgTableRow arg="forwarding-type" typ="ubit (bridged, routed)">匹配 Cloud Router Switch 上的流量转发类型。</ArgTableRow>
<ArgTableRow arg="traffic-type" typ="ubit (unicast, multicast, broadcast)">匹配流量类型。</ArgTableRow>
<ArgTableRow arg="registration-status" typ="ubit (known, unknown)">匹配数据包的注册状态。已知数据包存在于 UFDB 和 MFDB 中，未知数据包则不存在。</ArgTableRow>
<ArgTableRow arg="protocol-type" typ="ubit (arp, nd, dhcpv4, dhcpv6, ripv1)">用于隔离/泄漏的协议。</ArgTableRow>
<ArgTableRow arg="flow-id" typ="num"></ArgTableRow>
<ArgTableRow arg="mac-profile" typ="enum (promiscuous | isolated | community1 | community2) { promiscuous:0, isolated:1, community1:2, community2:3 }">匹配 MAC 隔离/泄漏配置文件。</ArgTableRow>
<ArgTableRow arg="port-profile" typ="num">匹配端口隔离/泄漏配置文件。</ArgTableRow>
<ArgTableRow arg="vlan-profile" typ="enum (promiscuous | isolated | community1 | community2) { promiscuous:0, isolated:1, community1:2, community2:3 }">匹配 VLAN 隔离/泄漏配置文件。</ArgTableRow>
</ArgTable>
