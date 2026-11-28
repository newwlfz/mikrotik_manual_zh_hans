---
title: "port-isolation"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/port-isolation
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/port-isolation 
**Syscap：** musicswitch
**类型：** 目录

CRS 交换机支持灵活的多级隔离功能，可用于用户访问控制、流量工程以及高级安全和网络管理。隔离功能提供有组织的交换结构，使用户能够轻松编程并按端口、MAC 地址、VLAN、协议、流和帧类型控制访问。支持以下隔离和泄漏功能：

- 端口级隔离
- MAC 级隔离
- VLAN 级隔离
- 协议级隔离
- 流级隔离
- 以上功能的自由组合

端口级隔离支持在源端口和目的端口上使用不同的控制方案。每个表项都可以针对源端口或目的端口编程访问控制。

- 当表项编程为源端口访问控制时，该表项为。

应用于入站数据包。

- 当该条目配置了目标端口访问控制时，该条目

应用于出站数据包。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="ports" typ="multi { array-id }">Isolated/leaked ports.</ArgTableRow>
<ArgTableRow arg="type" typ="enum (src | dst) { src:0, dst:1 }">
Lookup type of the isolation/leakage entry:
- src - Entry applies to ingress packets of the ports.
- dst - Entry applies to egress packets of the ports.
</ArgTableRow>
<ArgTableRow arg="forwarding-type" typ="ubit (bridged, routed)">Matching traffic forwarding type on Cloud Router Switch.</ArgTableRow>
<ArgTableRow arg="traffic-type" typ="ubit (unicast, multicast, broadcast)">Matching traffic type.</ArgTableRow>
<ArgTableRow arg="registration-status" typ="ubit (known, unknown)">Registration status for matching packets. Known ones are present in UFDB and MFDB, and unknown ones are not.</ArgTableRow>
<ArgTableRow arg="protocol-type" typ="ubit (arp, nd, dhcpv4, dhcpv6, ripv1)">Included protocols for isolation/leakage.</ArgTableRow>
<ArgTableRow arg="flow-id" typ="num"></ArgTableRow>
<ArgTableRow arg="mac-profile" typ="enum (promiscuous | isolated | community1 | community2) { promiscuous:0, isolated:1, community1:2, community2:3 }">Matching MAC isolation/leakage profile.</ArgTableRow>
<ArgTableRow arg="port-profile" typ="num">Matching Port isolation/leakage profile.</ArgTableRow>
<ArgTableRow arg="vlan-profile" typ="enum (promiscuous | isolated | community1 | community2) { promiscuous:0, isolated:1, community1:2, community2:3 }">Matching VLAN isolation/leakage profile.</ArgTableRow>
</ArgTable>

## interface/ethernet/switch/port-isolation 
**Syscap：** rbswitch
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="forwarding-override" typ="multi { array-id, port: enum
 }"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="switch" typ="enum"></ArgTableRow>
</ArgTable>
