---
sidebar_key: "cli-reference/interface/ethernet/switch/port-isolation/index"
sidebar_position: 15
title: "port-isolation"
sidebar_label: 'port-isolation'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/port-isolation
captured_at: '2026-11-01T21:22:36+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/port-isolation {#interfaceethernetswitchport-isolation}
**系统能力：** musicswitch
**类型：** 目录

CRS 交换机支持灵活的多级隔离功能，可用于用户访问控制、流量工程以及高级安全和网络管理。隔离功能提供有组织的结构，使用户可以轻松地按端口、MAC 地址、VLAN、协议、流和帧类型编程和控制访问。支持以下隔离和泄漏功能：

- 端口级隔离
- MAC 级隔离
- VLAN 级隔离
- 协议级隔离
- 流级隔离
- 上述功能的自由组合

端口级隔离在源端口和目标端口上支持不同的控制方案。每个条目可以为源端口或目标端口编程访问控制。

- 当条目配置为源端口访问控制时，该条目会。

应用于入站数据包。

- 当条目配置为目的地端口访问控制时，该条目

应用于出站数据包。

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

## interface/ethernet/switch/port-isolation {#interfaceethernetswitchport-isolation-1}
**系统能力：** rbswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="forwarding-override" typ="multi { array-id, port: enum
 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="switch" typ="enum"></ArgTableRow>
</ArgTable>
