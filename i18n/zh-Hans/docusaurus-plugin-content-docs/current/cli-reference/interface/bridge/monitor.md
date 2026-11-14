---
sidebar_key: "cli-reference/interface/bridge/monitor"
sidebar_position: 5
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/interface/bridge/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/bridge/monitor {#interfacebridgemonitor}
**类型：** 命令

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="state" typ="enum (disabled | disabled | enabled | enabled)"></ArgTableRow>
<ArgTableRow arg="current-mac-address" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="bridge-id" typ="composite { prio: num
, mac: macAddr
 }"></ArgTableRow>
<ArgTableRow arg="root-bridge" typ="bool"></ArgTableRow>
<ArgTableRow arg="root-bridge-id" typ="composite { prio: num
, mac: macAddr
 }"></ArgTableRow>
<ArgTableRow arg="regional-root-bridge-id" typ="composite { prio: num
, mac: macAddr
 }"></ArgTableRow>
<ArgTableRow arg="root-path-cost" typ="num"></ArgTableRow>
<ArgTableRow arg="root-port" typ="iface_enum { none:0 }"></ArgTableRow>
<ArgTableRow arg="port-count" typ="num"></ArgTableRow>
<ArgTableRow arg="designated-port-count" typ="num"></ArgTableRow>
<ArgTableRow arg="topology-changes" typ="num"></ArgTableRow>
<ArgTableRow arg="last-topology-change" typ="time"></ArgTableRow>
<ArgTableRow arg="max-age" typ="num"></ArgTableRow>
<ArgTableRow arg="hello-time" typ="num"></ArgTableRow>
<ArgTableRow arg="forward-delay" typ="num"></ArgTableRow>
<ArgTableRow arg="mst-config-digest" typ="string"></ArgTableRow>
<ArgTableRow arg="fast-forward" typ="bool"></ArgTableRow>
<ArgTableRow arg="multicast-router" typ="bool"></ArgTableRow>
<ArgTableRow arg="igmp-querier" typ="composite { interface: iface_enum { none:0 }
, ip-address: ipAddr
 }"></ArgTableRow>
<ArgTableRow arg="mld-querier" typ="composite { interface: iface_enum { none:0 }
, ipv6-address: ip6Addr
 }"></ArgTableRow>
<ArgTableRow arg="declared-vlan-ids" typ="multi { vlan-range: range
 }"></ArgTableRow>
<ArgTableRow arg="registered-vlan-ids" typ="multi { vlan-range: range
 }"></ArgTableRow>
<ArgTableRow arg="mlag-state" typ="string">显示 MLAG 连接状态：当 ICCP 建立后为 `connected`，当对等体建立或重新建立连接时为 `connecting`，或者当配置的对等端口不可用时显示诸如 `peer port not running` 之类的错误。</ArgTableRow>
<ArgTableRow arg="mlag-active-role" typ="enum (primary | secondary)">具有最低 `priority` 的对等体会充当主设备。如果优先级相同，则具有最低桥 MAC 地址的对等体成为主设备。主设备的 `system-id` 用于发送 (R/M)STP BPDU 桥标识符和 LACP 系统 ID。该角色在 MLAG 连接成功后会显示。</ArgTableRow>
</ArgTable>
