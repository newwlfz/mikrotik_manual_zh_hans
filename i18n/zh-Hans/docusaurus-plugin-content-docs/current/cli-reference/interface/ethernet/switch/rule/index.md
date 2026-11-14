---
sidebar_key: "cli-reference/interface/ethernet/switch/rule"
title: "rule"
sidebar_label: 'rule'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/rule
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/rule {#interfaceethernetswitchrule}
**系统能力：** rbswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="switch" typ="enum" mandatory="1">匹配该规则将应用的交换机组。</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id, port: enum
 }" syscap="!crs_prestera">匹配规则将对入站流量生效的交换机接口。可选择多个端口以及[硬件卸载 bonding](../../../../../bridging-and-switching/l3-hardware-offloading.md#l3hw-feature-support) 接口。请注意，不能选择 `switch1-cpu` 端口。如果 `ports` 属性留空，则规则将应用于所有交换机接口。</ArgTableRow>
<ArgTableRow arg="src-mac-address" typ="super { address: macAddr
, [mask] /macAddr
 }">匹配源 MAC 地址和掩码。</ArgTableRow>
<ArgTableRow arg="dst-mac-address" typ="super { address: macAddr
, [mask] /macAddr
 }">匹配目标 MAC 地址和掩码。</ArgTableRow>
<ArgTableRow arg="mac-protocol" typ="alt { protocol-name: enum ()
, protocol-number: num [ .. 65535]
 }">匹配由协议名称或编号指定的特定 MAC 协议（如果有 VLAN 标签则跳过）。</ArgTableRow>
<ArgTableRow arg="vlan-header" typ="enum (not-present | present)">匹配 VLAN 头，即 VLAN 头是否存在。需要 `vlan-filtering=yes`。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num">匹配 VLAN ID。需要 `vlan-filtering=yes`。</ArgTableRow>
<ArgTableRow arg="vlan-priority" typ="num">匹配 VLAN 优先级（优先级代码点）。</ArgTableRow>
<ArgTableRow arg="src-address" typ="super { address: ipAddr
, [mask] /alt { bitmask: ipAddr
, netmask: num [ .. 32]
 }
 }">匹配源 IPv4 地址和掩码。如果指定了 `mac-protocol=arp`，则匹配 ARP 数据包中的源 IP。若未指定 `mac-protocol`，则仅匹配 IPv4 数据包。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { address: ipAddr
, [mask] /alt { bitmask: ipAddr
, netmask: num [ .. 32]
 }
 }">匹配目标 IPv4 地址和掩码。如果指定了 `mac-protocol=arp`，则匹配 ARP 数据包中的目标 IP。若未指定 `mac-protocol`，则仅匹配 IPv4 数据包。</ArgTableRow>
<ArgTableRow arg="protocol" typ="alt { protocol-name: enum ()
, protocol-number: num [ .. 255]
 }">匹配由协议名称或编号指定的特定 IP 协议。仅在未指定 `mac-protocol` 时适用于 IPv4 数据包。要匹配某些 IPv6 协议，请使用 `mac-protocol=ipv6` 设置。</ArgTableRow>
<ArgTableRow arg="src-port" typ="range">匹配源协议端口号（若未指定 `mac-protocol`，则适用于 IPv4 和 IPv6 数据包）。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="range">匹配目标协议端口号或端口范围（若未指定 mac-protocol，则适用于 IPv4 和 IPv6 数据包）。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">匹配数据包的 DSCP 字段（仅适用于 IPv4 数据包）。</ArgTableRow>
<ArgTableRow arg="src-address6" typ="super { address: ip6Addr
, [mask] /alt { bitmask: ip6Addr
, netmask: num
 }
 }">匹配源 IPv6 地址和掩码。</ArgTableRow>
<ArgTableRow arg="dst-address6" typ="super { address: ip6Addr
, [mask] /alt { bitmask: ip6Addr
, netmask: num
 }
 }">匹配目标 IPv6 地址和掩码。</ArgTableRow>
<ArgTableRow arg="traffic-class" typ="num">匹配 IPv6 流量类别。</ArgTableRow>
<ArgTableRow arg="flow-label" typ="num">匹配 IPv6 流标签。</ArgTableRow>
<ArgTableRow arg="copy-to-cpu" typ="bool">克隆匹配的数据包并将其发送到 CPU。</ArgTableRow>
<ArgTableRow arg="redirect-to-cpu" typ="bool">将匹配数据包的目标端口更改为交换机 CPU。</ArgTableRow>
<ArgTableRow arg="mirror" typ="bool" syscap="switch-mirror-prestera">克隆匹配的数据包并将其发送到 `mirror-target` 端口。</ArgTableRow>
<ArgTableRow arg="new-dst-ports" typ="multi { array-id, port: alt { port: enum
, bond: iface_enum
 }
 }">
按指定方式更改目标端口，允许指定多个端口，包括交换机 CPU 端口。
- 如果该设置留空（例如 `new-dst-ports=""`），则数据包将被丢弃；
- 如果指定了端口或[硬件卸载 bonding](../../../../../bridging-and-switching/marvell-prestera-switch-chip-features.md#bonding) 接口，则数据包将被重定向到该端口。仅支持单个端口或 bond 接口；
- 如果使用 `all` 参数，则允许数据包通过并进入出站处理，而不会被丢弃；
- 如果不使用此参数，则数据包将按原样被接受。
</ArgTableRow>
<ArgTableRow arg="mirror-ports" typ="multi { array-id, port: enum
 }" syscap="switch-mv88e6xxx">选择多个镜像目标端口，仅在 **88E6393X** 交换机芯片上可用。ACL 规则中匹配的数据包将被复制并发送到所选端口。</ArgTableRow>
<ArgTableRow arg="new-qos-profile" typ="enum" syscap="crs_prestera">要分配给匹配数据包的 QoS 配置文件名称。</ArgTableRow>
<ArgTableRow arg="keep-qos-fields" typ="bool" syscap="crs_prestera">应保留 QoS 字段（PCP、DSCP）的原始值（`yes`），还是将其替换为所分配 QoS 配置文件中的值（`no`）？仅在设置了 `new-qos-profile` 时才有意义。</ArgTableRow>
<ArgTableRow arg="new-vlan-id" typ="num">将 VLAN ID 更改为指定的值。需要 `vlan-filtering=yes`。</ArgTableRow>
<ArgTableRow arg="new-vlan-priority" typ="num">更改 VLAN 优先级（优先级代码点）。需要 `vlan-filtering=yes`。</ArgTableRow>
<ArgTableRow arg="new-vrf" typ="enum" syscap="crs_prestera">将入站流量分配到指定的 VRF。需要交换机芯片支持[硬件卸载 VRF](../../../../../bridging-and-switching/l3-hardware-offloading.md#l3hw-feature-support)。在不感知 VRF 的交换机（98DX3xxx 和 98DX2xxx 系列）上，将 `new-vrf` 设置为 `main` 以外的任何值都将被视为 `redirect-to-cpu=yes`。</ArgTableRow>
<ArgTableRow arg="rate" typ="num">为匹配的流量设置入站流量限制（比特每秒）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="packets" typ="num" syscap="crs_prestera"></ArgTableRow>
<ArgTableRow arg="bytes" typ="num" syscap="crs_prestera"></ArgTableRow>
<ArgTableRow arg="internal-priority" typ="num"></ArgTableRow>
</ArgTable>
