---
sidebar_key: "cli-reference/interface/bridge"
title: "bridge"
sidebar_label: 'bridge'
source: https://manual.mikrotik.com/docs/cli-reference/interface/bridge
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/bridge {#interfacebridge}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="Y" typ="managed">managed</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="R" typ="running">running</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="mtu" typ="num"></ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp) { disabled:0, enabled:1, proxy-arp:2, reply-only:3, local-proxy-arp:4 }"></ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }"></ArgTableRow>
<ArgTableRow arg="protocol-mode" typ="enum (none | stp | rstp | mstp) { none:0, stp:1, rstp:2, mstp:3 }"></ArgTableRow>
<ArgTableRow arg="fast-forward" typ="bool"></ArgTableRow>
<ArgTableRow arg="igmp-snooping" typ="bool"></ArgTableRow>
<ArgTableRow arg="multicast-router" typ="enum (disabled | temporary-query | permanent) { disabled:0, temporary-query:1, permanent:2 }"></ArgTableRow>
<ArgTableRow arg="multicast-querier" typ="bool"></ArgTableRow>
<ArgTableRow arg="querier-uses-bridge-address" typ="bool"></ArgTableRow>
<ArgTableRow arg="startup-query-count" typ="num"></ArgTableRow>
<ArgTableRow arg="last-member-query-count" typ="num"></ArgTableRow>
<ArgTableRow arg="last-member-interval" typ="time" deprecated="1"></ArgTableRow>
<ArgTableRow arg="last-member-query-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="membership-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="querier-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="query-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="query-response-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="startup-query-interval" typ="time"></ArgTableRow>
<ArgTableRow arg="igmp-version" typ="enum (2 | 3) { 2:2, 3:3 }"></ArgTableRow>
<ArgTableRow arg="mld-version" typ="enum (1 | 2) { 1:1, 2:2 }"></ArgTableRow>
<ArgTableRow arg="auto-mac" typ="bool"></ArgTableRow>
<ArgTableRow arg="admin-mac" typ="macAddr"></ArgTableRow>
<ArgTableRow arg="ageing-time" typ="time"></ArgTableRow>
<ArgTableRow arg="priority" typ="alt { priority: enum (0x0000 | 0x1000 | 0x2000 | 0x3000 | 0x4000 | 0x5000 | 0x6000 | 0x7000 | 0x8000 | 0x9000 | 0xa000 | 0xb000 | 0xc000 | 0xd000 | 0xe000 | 0xf000) { 0x0000:0x0000, 0x1000:0x1000, 0x2000:0x2000, 0x3000:0x3000, 0x4000:0x4000, 0x5000:0x5000, 0x6000:0x6000, 0x7000:0x7000, 0x8000:0x8000, 0x9000:0x9000, 0xa000:0xa000, 0xb000:0xb000, 0xc000:0xc000, 0xd000:0xd000, 0xe000:0xe000, 0xf000:0xf000 }
, priority: num [0 .. 65535]
 }"></ArgTableRow>
<ArgTableRow arg="max-message-age" typ="time"></ArgTableRow>
<ArgTableRow arg="forward-delay" typ="time"></ArgTableRow>
<ArgTableRow arg="transmit-hold-count" typ="num"></ArgTableRow>
<ArgTableRow arg="region-name" typ="string"></ArgTableRow>
<ArgTableRow arg="region-revision" typ="num"></ArgTableRow>
<ArgTableRow arg="max-hops" typ="num"></ArgTableRow>
<ArgTableRow arg="vlan-filtering" typ="bool"></ArgTableRow>
<ArgTableRow arg="ether-type" typ="enum (0x8100 | 0x88a8 | 0x9100) { 0x8100:0x8100, 0x88a8:0x88a8, 0x9100:0x9100 }"></ArgTableRow>
<ArgTableRow arg="pvid" typ="num"></ArgTableRow>
<ArgTableRow arg="frame-types" typ="enum (admit-all | admit-only-vlan-tagged | admit-only-untagged-and-priority-tagged) { admit-all:0, admit-only-vlan-tagged:1, admit-only-untagged-and-priority-tagged:2 }"></ArgTableRow>
<ArgTableRow arg="ingress-filtering" typ="bool"></ArgTableRow>
<ArgTableRow arg="dhcp-snooping" typ="bool"></ArgTableRow>
<ArgTableRow arg="dhcp-snooping-vlan-ids" typ="multi { vlan-id-range: range [1 .. 4094]
 }">应用 DHCP snooping 的 VLAN ID。列表之外的 VLAN 在不进行 snooping 的情况下转发。默认情况下，所有 VLAN 都会进行 snooping。仅当 `dhcp-snooping` 和 `vlan-filtering` 设置为 `yes` 时，此属性才生效。</ArgTableRow>
<ArgTableRow arg="dhcp-agent-circuit-id" typ="string">
指定要添加到经过桥的 DHCP 报文中的 option 82 的 relay agent circuit-id 子选项值。
字符串长度限制为 255 个字符，默认值为：$(INTERFACE):$(VID)。
字符串值可以包含变量，变量名必须放在括号内，并在前面加上美元符号。
示例：'some_arbitrary_text $(VID) another_piece_of_text $(INTERFACE)'。
支持以下变量：HOSTNAME、INTERFACE、VID 和 BRIDGEMAC。
为了与早期版本兼容（当时 remote-id 值是固定的），当未启用 VLAN 过滤时，默认值表达式中出现的分号不会
包含在 remote-id 值中。
</ArgTableRow>
<ArgTableRow arg="dhcp-agent-remote-id" typ="string">
指定要添加到经过桥的 DHCP 报文中的 option 82 的 relay agent remote-id 子选项值。
字符串长度限制为 255 个字符，默认值为：$(BRIDGEMAC)。
字符串值可以包含变量，变量名必须放在括号内，并在前面加上美元符号。
示例：'some_arbitrary_text $(HOSTNAME) another_piece_of_text $(BRIDGEMAC)'。
支持以下变量：HOSTNAME、INTERFACE、VID 和 BRIDGEMAC。
</ArgTableRow>
<ArgTableRow arg="dhcp-snooping-option82-policy" typ="enum (drop | keep | replace)">对于已经包含 Option 82 的 DHCP 消息经过网桥时的操作：`drop` 丢弃该消息，`keep` 保留现有选项，或 `replace` 使用 `dhcp-agent-circuit-id` 和 `dhcp-agent-remote-id` 中设置的值替换它。默认值：drop。仅当 `dhcp-snooping` 设置为 `yes` 时，此属性才生效。</ArgTableRow>
<ArgTableRow arg="arp-inspection" typ="bool"></ArgTableRow>
<ArgTableRow arg="dhcpv6-snooping" typ="bool"></ArgTableRow>
<ArgTableRow arg="dhcpv6-agent-circuit-id" typ="string">
指定要添加到经过桥的 DHCPv6 报文中的 DHCPv6 option 18 值。
字符串长度限制为 255 个字符，默认值为：$(INTERFACE):$(VID)。
字符串值可以包含变量，变量名必须放在括号内，并在前面加上美元符号。
示例：'some_arbitrary_text $(VID) another_piece_of_text $(INTERFACE)'。
支持以下变量：HOSTNAME、INTERFACE、VID 和 BRIDGEMAC。
</ArgTableRow>
<ArgTableRow arg="dhcpv6-agent-remote-id" typ="string">
指定要添加到经过桥的 DHCPv6 报文中的 DHCPv6 option 37 值。
字符串长度限制为 255 个字符，默认值为：$(BRIDGEMAC)。
字符串值可以包含变量，变量名必须放在括号内，并在前面加上美元符号。
示例：'some_arbitrary_text $(VID) another_piece_of_text $(INTERFACE)'。
支持以下变量：HOSTNAME、INTERFACE、VID 和 BRIDGEMAC。
</ArgTableRow>
<ArgTableRow arg="ip-source-guard" typ="bool"></ArgTableRow>
<ArgTableRow arg="ra-guard" typ="bool"></ArgTableRow>
<ArgTableRow arg="port-cost-mode" typ="enum (short | long)"></ArgTableRow>
<ArgTableRow arg="mvrp" typ="bool"></ArgTableRow>
<ArgTableRow arg="forward-reserved-addresses" typ="bool"></ArgTableRow>
<ArgTableRow arg="max-learned-entries" typ="alt { max-learned-entries: enum (unlimited | auto)
, max-learned-entries: num
 }"></ArgTableRow>
<ArgTableRow arg="mlag-peer-port" typ="alt { interface: iface_enum { none }
, interface-bond: iface_enum
 }">
将用作 peer port 的接口。两个 peer 设备通过这些 peer port 进行跨机箱通信，以建立 MLAG 并更新主机表。
peer port 可以配置为单个以太网接口或 bonding 接口。不过，建议使用 bonding 接口，因为它有助于防止单个接口故障影响连通性，尤其是当两个 MLAG 节点仍在运行且保持连接时。
建议将 peer port 使用的未标记 VLAN 与网络其余部分分开，可以通过分配专用未标记 VLAN（使用 `pvid`），或将 peer port 设置为仅允许 VLAN 标记帧（使用 `frame-types=admit-only-vlan-tagged`）。
用于桥从端口的全部 VLAN 也必须为 peer-port 配置为标记 VLAN（在 `/interface/bridge/vlan` 表中），这样 peer-port 才是这些 VLAN 的成员，并能够转发数据。
</ArgTableRow>
<ArgTableRow arg="mlag-priority" typ="num">此设置会更改选择主 MLAG 节点的优先级。数字越小表示优先级越高。如果两个 MLAG 节点的优先级相同，则桥 MAC 地址最低的节点将成为主设备。</ArgTableRow>
<ArgTableRow arg="mlag-heartbeat" typ="alt { mlag-heartbeat: enum (none) { none:0 }
, mlag-heartbeat: time [1s .. 10s]
 }">此设置控制发送心跳消息以检查 peer 之间连接的频率。如果连续三个间隔未收到心跳消息，peer 会记录一条有关潜在通信问题的警告。如果设置为 `none`，则完全不发送心跳消息。</ArgTableRow>
<ArgTableRow arg="mlag-init-delay" typ="time">
设备重启后，在指定时间内或直到 MLAG peer 同步其系统 ID（以先发生者为准），使双连接（MLAG）bond 的从接口不加入 LACP bond。将延迟设置得长于设备启动并重新连接到 MLAG peer 所需的时间。这可以防止 bond 在 MLAG 系统 ID 同步之前使用本地生成的系统 ID 激活，否则会重置对端上的 LACP 会话。
默认值：1 分钟。
</ArgTableRow>
<ArgTableRow arg="mlag-lacp-fallback" typ="bool">
指定当 MLAG peer 链路丢失时，双连接（MLAG）bond 的 LACP 系统 ID 会发生什么。设置为 `yes` 时，bond 会恢复为其自身的 LACP 系统 ID。设置为 `no` 时，bond 会保留 MLAG 系统 ID，这会阻止 LACP 对端在一个 MLAG 节点重启或其 peer 链路故障时重新协商 bond。
默认值：yes。
</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-mtu" typ="num"></ArgTableRow>
<ArgTableRow arg="l2mtu" typ="num"></ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr"></ArgTableRow>
</ArgTable>
