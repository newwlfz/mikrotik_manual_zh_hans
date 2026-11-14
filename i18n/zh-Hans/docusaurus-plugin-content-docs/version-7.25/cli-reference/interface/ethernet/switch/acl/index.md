---
sidebar_key: "cli-reference/interface/ethernet/switch/acl/index"
sidebar_position: 1
title: "acl"
sidebar_label: 'acl'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/acl
captured_at: '2026-11-01T21:22:33+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/acl {#interfaceethernetswitchacl}
**系统能力：** musicswitch
**类型：** 目录

访问控制列表由入站策略和出站策略引擎组成，最多允许配置 128 条策略规则（受 RouterOS 限制）。它是一种高级工具，可基于二层、三层和四层协议头字段条件进行线速数据包过滤、转发、整形和修改。

:::note
由于硬件限制，无法在特定端口上匹配广播/组播流量。应使用端口隔离、在入方向端口上丢弃流量，或使用 VLAN 过滤来阻止某些广播/组播流量被转发。
:::

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="table" typ="enum (ingress | egress) { ingress:0, egress:1 }">选择用于入站或出站数据包的策略表。</ArgTableRow>
<ArgTableRow arg="invert-match" typ="bool">反转整个 ACL 规则的匹配结果。</ArgTableRow>
<ArgTableRow arg="src-ports" typ="multi { array-id }">匹配物理源端口或 trunk。</ArgTableRow>
<ArgTableRow arg="dst-ports" typ="multi { array-id }">匹配物理目标端口或 trunk。由于硬件限制，无法在出站端口上匹配广播/组播流量。</ArgTableRow>
<ArgTableRow arg="service-vid" typ="super { !
, service-vid: range [ .. 4095]
 }">匹配服务 VLAN ID。</ArgTableRow>
<ArgTableRow arg="service-pcp" typ="num">匹配服务 PCP。</ArgTableRow>
<ArgTableRow arg="service-dei" typ="num">匹配服务 DEI。</ArgTableRow>
<ArgTableRow arg="customer-vid" typ="super { !
, customer-vid: range [ .. 4095]
 }">匹配客户 VLAN ID。</ArgTableRow>
<ArgTableRow arg="customer-pcp" typ="num">匹配客户 PCP。</ArgTableRow>
<ArgTableRow arg="customer-dei" typ="num">匹配客户 DEI。</ArgTableRow>
<ArgTableRow arg="src-l3-port" typ="super { !
, src-l3-port: range [ .. 65535]
 }">匹配 Layer3 源端口。</ArgTableRow>
<ArgTableRow arg="dst-l3-port" typ="super { !
, dst-l3-port: range [ .. 65535]
 }">匹配 Layer3 目标端口。</ArgTableRow>
<ArgTableRow arg="custom-fields" typ="object { custom-field: super { !
, custom-field: super { base: enum (start-of-frame | end-of-l2-header | end-of-l3-header) { start-of-frame:0, end-of-l2-header:1, end-of-l3-header:2 }
, [offset] :num [ .. 127]
, [range] :range [ .. 65535]
, [mask] [ /num [ .. 65535]]
 }
 }
 }"></ArgTableRow>
<ArgTableRow arg="priority" typ="num">匹配内部优先级。仅在 egress 表中有效。</ArgTableRow>
<ArgTableRow arg="drop-precedence" typ="enum (green | yellow | red | drop)">匹配内部丢弃优先级。仅在 egress 表中有效。</ArgTableRow>
<ArgTableRow arg="dst-addr-registered" typ="bool">定义是否匹配具有已注册状态的数据包——即目标 MAC 地址位于 UFDB/MFDB/RFDB 中的数据包。仅在 egress 表中有效。</ArgTableRow>
<ArgTableRow arg="service-tag" typ="enum (untagged | priority-tagged | tagged | tagged-or-priority-tagged) { untagged:0, priority-tagged:1, tagged:2, tagged-or-priority-tagged:3 }">服务标签的格式。</ArgTableRow>
<ArgTableRow arg="customer-tag" typ="enum (untagged | priority-tagged | tagged | tagged-or-priority-tagged) { untagged:0, priority-tagged:1, tagged:2, tagged-or-priority-tagged:3 }">客户标签的格式。</ArgTableRow>
<ArgTableRow arg="mac-src-address" typ="super { address: macAddr
, [mask] [ /macAddr]
 }">源 MAC 地址和掩码。</ArgTableRow>
<ArgTableRow arg="mac-dst-address" typ="super { address: macAddr
, [mask] [ /macAddr]
 }">目标 MAC 地址和掩码。</ArgTableRow>
<ArgTableRow arg="mac-protocol" typ="alt { protocol-name: enum (ip-or-ipv6 | non-ip) { ip-or-ipv6:0x10000, non-ip:0x10001 }
, protocol-number: num [ .. 65535]
 }">
以太网载荷类型（MAC 层协议）。
- `802.2` - 802.2 帧（0x0004）
- `arp` - Address Resolution Protocol（0x0806）
- `capsman` - CAPsMAN 到 CAP 的 MAC 层连接（0x88BB）
- `dot1x` - EAPoL IEEE 802.1X（0x888E）
- `homeplug-av` - HomePlug AV MME（0x88E1）
- `ip` - Internet Protocol version 4（0x0800）
- `ip-or-ipv6` - IPv4 或 IPv6（0x0800 或 0x86DD）
- `ipv6` - Internet Protocol Version 6（0x86DD）
- `ipx` - Internetwork Packet Exchange（0x8137）
- `lacp` - Link Aggregation Control Protocol（0x8809）
- `lldp` - Link Layer Discovery Protocol（0x88CC）
- `loop-protect` - Loop Protect Protocol（0x9003）
- `macsec` - MAC security IEEE 802.1AE（0x88E5）
- `mpls-multicast` - MPLS 组播（0x8848）
- `mpls-unicast` - MPLS 单播（0x8847）
- `mvrp` - Multiple VLAN Registration protocol（0x88F5）
- `non-ip` - 非 Internet Protocol version 4（不是 0x0800）
- `packing-compr` - 使用压缩 [IP packing](../../../../ip/packing.md) 的封装数据包（0x9001）
- `packing-simple` - 使用简单 [IP packing](../../../../ip/packing.md) 的封装数据包（0x9000）
- `pppoe` - PPPoE 会话阶段（0x8864）
- `pppoe-discovery` - PPPoE 发现阶段（0x8863）
- `rarp` - Reverse Address Resolution Protocol（0x8035）
- `romon` - Router Management Overlay Network [RoMON](../../../../../management-tools/romon.md)（0x88BF）
- `service-vlan` - Provider Bridging IEEE 802.1ad 和 Shortest Path Bridging IEEE 802.1aq（0x88A8）
- `vlan` - 带 VLAN 标记的帧 IEEE 802.1Q 和具有 NNI 兼容性的 Shortest Path Bridging IEEE 802.1aq（0x8100）
</ArgTableRow>
<ArgTableRow arg="lookup-vid" typ="num">用于查找的 VLAN ID。它可以在到达 egress 表之前被更改。</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="enum (tcp | udp | udp-lite | other) { tcp:0, udp:1, udp-lite:2, other:3 }">IP 协议类型。</ArgTableRow>
<ArgTableRow arg="fragmented" typ="bool">是否匹配分片数据包。</ArgTableRow>
<ArgTableRow arg="first-fragment" typ="bool">YES 匹配未分片的数据包和首片，NO 匹配其他分片。</ArgTableRow>
<ArgTableRow arg="ttl" typ="enum (0 | 1 | max | other) { 0:0, 1:1, max:2, other:3 }">匹配数据包的 TTL 字段。</ArgTableRow>
<ArgTableRow arg="ip-dst" typ="composite { address: ipAddr
, netmask: [ num [ .. 32]]
 }">匹配目标 IPv4 地址。</ArgTableRow>
<ArgTableRow arg="ip-src" typ="composite { address: ipAddr
, netmask: [ num [ .. 32]]
 }">匹配源 IPv4 地址。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">匹配数据包的 DSCP 字段。</ArgTableRow>
<ArgTableRow arg="ecn" typ="num">匹配数据包的 ECN 字段。</ArgTableRow>
<ArgTableRow arg="ipv6-dst" typ="ip6Prefix">匹配目标 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="ipv6-src" typ="ip6Prefix">匹配源 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="mac-isolation-profile" typ="enum (promiscuous | isolated | community1 | community2) { promiscuous:0, isolated:1, community1:2, community2:3 }">根据 UFDB 匹配隔离配置文件。仅在 egress 策略表中有效。</ArgTableRow>
<ArgTableRow arg="src-mac-addr-state" typ="enum (sa-found | sa-not-found | dynamic-station-move | static-station-move) { sa-found:0, sa-not-found:1, dynamic-station-move:2, static-station-move:3 }">定义是否匹配具有已注册状态的数据包——即目标 MAC 地址位于 UFDB/MFDB/RFDB 中的数据包。仅在 egress 策略表中有效。</ArgTableRow>
<ArgTableRow arg="flow-id" typ="num"></ArgTableRow>
<ArgTableRow arg="action" typ="enum (forward | redirect-to-cpu | copy-to-cpu | send-to-new-dst-ports | drop) { forward:0, redirect-to-cpu:1, copy-to-cpu:2, send-to-new-dst-ports:3, drop:7 }">
对匹配 ACL 的数据包执行的动作。
- `copy-to-cpu` - 数据包被复制到 CPU。
- `drop` - 数据包被丢弃。
- `forward` - 数据包被转发。
- `redirect-to-cpu` - 数据包被重定向到 CPU。
- `send-to-new-dst-ports` - 数据包被发送到新的目标端口。
</ArgTableRow>
<ArgTableRow arg="new-dst-ports" typ="multi { array-id }">如果动作为 `send-to-new-dst-ports`，则此属性设置哪些端口/trunk 作为新的目标。</ArgTableRow>
<ArgTableRow arg="new-flow-id" typ="num"></ArgTableRow>
<ArgTableRow arg="attack-filter-bypass" typ="bool"></ArgTableRow>
<ArgTableRow arg="ingress-vlan-filter-bypass" typ="bool">允许匹配的数据包绕过 VLAN 表中的入站 VLAN 过滤。这仅适用于 ingress 策略表。</ArgTableRow>
<ArgTableRow arg="egress-vlan-filter-bypass" typ="bool">允许匹配的数据包绕过 VLAN 表中的出站 VLAN 过滤。这仅适用于 ingress 策略表。</ArgTableRow>
<ArgTableRow arg="isolation-filter-bypass" typ="bool">允许匹配的数据包绕过 Isolation 表。这仅适用于 ingress 策略表。</ArgTableRow>
<ArgTableRow arg="new-registered-state" typ="bool">是否修改数据包状态。YES 将数据包状态设置为 registered，NO 设置为 unregistered。仅在 ingress 策略表中有效。</ArgTableRow>
<ArgTableRow arg="src-mac-learn" typ="bool">是否学习匹配 ACL 的数据包的源 MAC。仅在 ingress 策略表中有效。</ArgTableRow>
<ArgTableRow arg="mirror-to" typ="enum (mirror0 | mirror1) { mirror0:0, mirror1:1 }">ACL 数据包的镜像目标。</ArgTableRow>
<ArgTableRow arg="new-service-vid" typ="num">ACL 数据包的新的服务 VLAN ID。</ArgTableRow>
<ArgTableRow arg="new-customer-vid" typ="num">ACL 数据包的新的客户 VLAN ID。如果设置为 4095，则流量会被丢弃。</ArgTableRow>
<ArgTableRow arg="egress-vlan-translate-bypass" typ="bool">允许匹配的数据包绕过出站 VLAN 转换表。</ArgTableRow>
<ArgTableRow arg="new-service-pcp" typ="num">ACL 数据包的新的服务 PCP。</ArgTableRow>
<ArgTableRow arg="new-service-dei" typ="num">ACL 数据包的新的服务 DEI。</ArgTableRow>
<ArgTableRow arg="new-customer-pcp" typ="num">ACL 数据包的新的客户 PCP。</ArgTableRow>
<ArgTableRow arg="new-customer-dei" typ="num">ACL 数据包的新的客户 DEI。</ArgTableRow>
<ArgTableRow arg="new-dscp" typ="num">ACL 数据包的新的 DSCP。</ArgTableRow>
<ArgTableRow arg="new-priority" typ="num">ACL 数据包的新的内部优先级。</ArgTableRow>
<ArgTableRow arg="new-drop-precedence" typ="enum (green | yellow | red | drop)">ACL 数据包的新的内部丢弃优先级。</ArgTableRow>
<ArgTableRow arg="policer" typ="enum">应用于 ACL 数据包的 ACL Policer。</ArgTableRow>
</ArgTable>
