---
title: "port-leakage"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/port-leakage
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/interface/ethernet/switch/port-isolation"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/ethernet/switch/port-leakage 
**Syscap：** musicswitch
**类型：** Directory

端口泄漏允许绕过端口上的出站 VLAN 过滤。泄漏端口允许访问其他端口，用于安全、网络控制和管理等各类应用。注意：当同一端口同时应用隔离和泄漏时，该端口将被隔离。

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
