---
sidebar_key: "cli-reference/interface/ethernet/switch/port/index"
sidebar_position: 1
title: "port"
sidebar_label: 'port'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/port
captured_at: '2026-11-01T21:22:37+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/port {#interfaceethernetswitchport}
**系统能力：** musicswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="ingress-customer-tpid-override" typ="num">入站客户 TPID 覆盖允许接收带有自定义客户标签 TPID 的特定帧。默认值用于 802.1Q 帧的标签。</ArgTableRow>
<ArgTableRow arg="egress-customer-tpid-override" typ="num">出站客户 TPID 覆盖允许对带有客户标签的出站帧进行自定义标识。默认值用于 802.1Q 帧的标签。</ArgTableRow>
<ArgTableRow arg="ingress-service-tpid-override" typ="num">入站服务 TPID 覆盖允许接收带有自定义服务标签 TPID 的特定帧。默认值用于 802.1AD 帧的服务标签。</ArgTableRow>
<ArgTableRow arg="egress-service-tpid-override" typ="num">出站服务 TPID 覆盖允许对带有服务标签的出站帧进行自定义标识。默认值用于 802.1AD 帧的服务标签。</ArgTableRow>
<ArgTableRow arg="drop-secure-static-mac-move" typ="bool">如果 MAC 已在另一个端口上学习到，则在 UFDB 超时之前阻止静态条目的 MAC 重新学习。</ArgTableRow>
<ArgTableRow arg="drop-dynamic-mac-move" typ="bool">如果 MAC 已在另一个端口上学习到，则在 UFDB 超时之前阻止 MAC 重新学习。</ArgTableRow>
<ArgTableRow arg="learn-limit" typ="num">启用或禁用 MAC 地址学习，并设置端口上的 MAC 限制。默认情况下禁用 MAC 学习限制。</ArgTableRow>
<ArgTableRow arg="allow-unicast-loopback" typ="bool">端口上的单播环回。启用后，对于已知单播数据包，当源端口和目标端口相同时，允许将其发回。</ArgTableRow>
<ArgTableRow arg="allow-multicast-loopback" typ="bool">端口上的组播环回。启用后，对于已注册的组播或广播数据包，当源端口和目标端口相同时，允许将其发回。</ArgTableRow>
<ArgTableRow arg="action-on-static-station-move" typ="enum (forward | redirect-to-cpu | copy-to-cpu | drop) { forward:0, redirect-to-cpu:1, copy-to-cpu:2, drop:3 }">当 UFDB 已包含具有此类 MAC 但端口不同的静态条目时，对数据包执行的动作。</ArgTableRow>
<ArgTableRow arg="drop-when-ufdb-entry-src-drop" typ="bool">启用或禁用当 UFDB 条目的动作为 src-drop 时丢弃数据包。</ArgTableRow>
<ArgTableRow arg="isolation-leakage-profile-override" typ="num">
用于端口隔离/泄漏配置的自定义端口配置文件。
- 端口级隔离配置文件 0。上行端口 - 允许该端口与设备中的所有端口通信。
- 端口级隔离配置文件 1。隔离端口 - 允许该端口仅与上行端口通信。
- 端口级隔离配置文件 2 - 31。团体端口 - 允许同一团体端口和上行端口之间通信。
</ArgTableRow>
<ArgTableRow arg="vlan-type" typ="enum (edge-port | network-port) { edge-port:0, network-port:1 }">端口 VLAN 类型指定在 UFDB 学习中是否使用 VLAN ID。网络端口在 UFDB 中学习 VLAN ID，边缘端口不学习 - VLAN 0。只能在 IVL 学习模式中观察到。</ArgTableRow>
<ArgTableRow arg="allow-fdb-based-vlan-translate" typ="bool">启用或禁用端口上基于 MAC 的 VLAN 转换。</ArgTableRow>
<ArgTableRow arg="allow-mac-based-service-vlan-assignment-for" typ="enum (none | untagged-and-priority-tagged-frame-only | tagged-frame-only | all) { none:0, untagged-and-priority-tagged-frame-only:1, tagged-frame-only:2, all:3 }">应用基于 MAC 的服务 VLAN 转换的帧类型。</ArgTableRow>
<ArgTableRow arg="allow-mac-based-customer-vlan-assignment-for" typ="enum (none | untagged-and-priority-tagged-frame-only | tagged-frame-only | all) { none:0, untagged-and-priority-tagged-frame-only:1, tagged-frame-only:2, all:3 }">应用基于 MAC 的客户 VLAN 转换的帧类型。</ArgTableRow>
<ArgTableRow arg="filter-untagged-frame" typ="bool">是否在端口上过滤未标记帧。</ArgTableRow>
<ArgTableRow arg="filter-priority-tagged-frame" typ="bool">是否在端口上过滤带优先级的标记帧。</ArgTableRow>
<ArgTableRow arg="filter-tagged-frame" typ="bool">是否在端口上过滤标记帧。</ArgTableRow>
<ArgTableRow arg="egress-vlan-tag-table-lookup-key" typ="enum (egress-vid | according-to-bridge-type) { egress-vid:0, according-to-bridge-type:1 }">
出站 VLAN 表（VLAN 标记）查找：
- `egress-vid` - 当配置为边缘端口时，查找 VLAN ID 为 `CVID`；当配置为网络端口时，为 `SVID`。
- `according-to-bridge-type` - 当配置为客户 VLAN 网桥时，查找 VLAN ID 为 `CVID`；当配置为服务 VLAN 网桥时，为 `SVID`。
</ArgTableRow>
<ArgTableRow arg="egress-vlan-mode" typ="enum (untagged | tagged | unmodified) { untagged:0, tagged:1, unmodified:2 }">端口上的出站 VLAN 标记动作。</ArgTableRow>
<ArgTableRow arg="ingress-mirror-to" typ="enum (none | mirror0 | mirror1) { none:0xffffffff, mirror0:0, mirror1:1 }">用于基于端口的入站镜像的分析仪端口。</ArgTableRow>
<ArgTableRow arg="ingress-mirroring-according-to-vlan" typ="bool"></ArgTableRow>
<ArgTableRow arg="egress-mirror-to" typ="enum (none | mirror0 | mirror1) { none:0xffffffff, mirror0:0, mirror1:1 }">用于基于端口的出站镜像的分析仪端口。</ArgTableRow>
<ArgTableRow arg="qos-scheme-precedence" typ="multi { array-id, qos-type: enum (pcp-based | vlan-based | protocol-based | da-based | sa-based | dscp-based | ingress-acl-based) { pcp-based:0, vlan-based:1, protocol-based:2, da-based:3, sa-based:4, dscp-based:5, ingress-acl-based:6 }
 }">指定在端口入站方向应用的 QoS 分配方案。</ArgTableRow>
<ArgTableRow arg="default-customer-pcp" typ="num">端口的默认客户 PCP。</ArgTableRow>
<ArgTableRow arg="default-service-pcp" typ="num">端口的默认服务 PCP。</ArgTableRow>
<ArgTableRow arg="pcp-propagation-for-initial-pcp" typ="bool">
启用或禁用入站方向上初始 PCP 分配时的 PCP 传播。
- 如果端口 `vlan-type` 为边缘端口，则服务 PCP 从客户 PCP 复制。
- 如果端口 `vlan-type` 为网络端口，则客户 PCP 从服务 PCP 复制。
</ArgTableRow>
<ArgTableRow arg="egress-pcp-propagation" typ="bool">启用或禁用出站 PCP 传播。如果端口 `vlan-type` 为边缘端口，则服务 PCP 从客户 PCP 复制。如果端口 `vlan-type` 为网络端口，则客户 PCP 从服务 PCP 复制。</ArgTableRow>
<ArgTableRow arg="dscp-based-qos-dscp-to-dscp-mapping" typ="bool">启用或禁用端口上的 DSCP 到内部 DSCP 映射。</ArgTableRow>
<ArgTableRow arg="pcp-or-dscp-based-qos-change-dei" typ="bool">启用或禁用端口上基于 PCP 或 DSCP 的 DEI 更改。</ArgTableRow>
<ArgTableRow arg="pcp-or-dscp-based-qos-change-pcp" typ="bool">启用或禁用端口上基于 PCP 或 DSCP 的 PCP 更改。</ArgTableRow>
<ArgTableRow arg="pcp-or-dscp-based-qos-change-dscp" typ="bool">启用或禁用端口上基于 PCP 或 DSCP 的 DSCP 更改。</ArgTableRow>
<ArgTableRow arg="pcp-based-qos-drop-precedence-mapping" typ="object { range-and-drop-precedence: composite { pcp-dei-range: range [ .. 15]
, drop-precedence: enum (green | yellow | red | drop)
 }
 }">PCP/DEI 到丢弃优先级（drop | green | red | yellow）映射的新丢弃优先级值。允许多个映射，以逗号分隔，例如 "0-7:yellow,8-15:red"。</ArgTableRow>
<ArgTableRow arg="pcp-based-qos-dscp-mapping" typ="object { range-and-dscp: composite { pcp-dei-range: range [ .. 15]
, dscp: num [ .. 63]
 }
 }">PCP/DEI 到 DSCP 映射的新 DSCP 值。允许多个映射，以逗号分隔，例如 "0-7:25,8-15:50"。</ArgTableRow>
<ArgTableRow arg="pcp-based-qos-dei-mapping" typ="object { range-and-dei: composite { pcp-dei-range: range [ .. 15]
, dei: num [ .. 1]
 }
 }">PCP/DEI 到 DEI 映射的新 DEI 值。允许多个映射，以逗号分隔，例如 "0-7:0,8-15:1"。</ArgTableRow>
<ArgTableRow arg="pcp-based-qos-pcp-mapping" typ="object { range-and-pcp: composite { pcp-dei-range: range [ .. 15]
, pcp: num [ .. 7]
 }
 }">PCP/DEI 到 PCP 映射的新 PCP 值。允许多个映射，以逗号分隔，例如 "0-7:3,8-15:4"。</ArgTableRow>
<ArgTableRow arg="pcp-based-qos-priority-mapping" typ="object { range-and-priority: composite { pcp-dei-range: range [ .. 15]
, priority: num [ .. 15]
 }
 }">PCP/DEI 到优先级映射的新内部优先级值。允许多个映射，以逗号分隔，例如 "0-7:5,8-15:15"。</ArgTableRow>
<ArgTableRow arg="priority-to-queue" typ="object { priority-range-and-queue: composite { priority-range: range [ .. 15]
, queue: num [ .. 7]
 }
 }">每个端口的内部优先级（0..15）到队列（0..7）的映射。</ArgTableRow>
<ArgTableRow arg="per-queue-scheduling" typ="object { scheduling-type-and-weight: composite { scheduling-type: enum (strict-priority | wrr-group0 | wrr-group1) { strict-priority:0, wrr-group0:1, wrr-group1:2 }
, weight: [ num [ .. 255]]
 }
 }">设置端口对每个队列组使用严格优先级或加权轮询策略进行流量整形。</ArgTableRow>
<ArgTableRow arg="custom-drop-counter-includes" typ="ubit (device-loopback, fdb-hash-violation, exceeded-port-learn-limitation, dynamic-station-move, static-station-move, ufdb-source-drop, host-source-drop, unknown-host, ingress-vlan-filtered)">用于为交换机端口 custom-drop-packet 计数器统计丢弃数据包的自定义包含项。</ArgTableRow>
<ArgTableRow arg="queue-custom-drop-counter0-includes" typ="ubit (red, yellow, green, queue0, queue1, queue2, queue3, queue4, queue5, queue6, queue7)">用于为交换机端口 tx-queue-custom0-drop-packet 和 tx-queue-custom0-drop-byte 计数器统计丢弃数据包及字节数的自定义包含项。</ArgTableRow>
<ArgTableRow arg="queue-custom-drop-counter1-includes" typ="ubit (red, yellow, green, queue0, queue1, queue2, queue3, queue4, queue5, queue6, queue7)">用于为交换机端口 tx-queue-custom1-drop-packet 和 tx-queue-custom1-drop-byte 计数器统计丢弃数据包及字节数的自定义包含项。</ArgTableRow>
<ArgTableRow arg="policy-drop-counter-includes" typ="ubit (ingress-policing, ingress-acl, egress-policing, egress-acl)">用于为交换机端口 policy-drop-packet 计数器统计丢弃数据包的自定义包含项。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="ingress-customer-tpid" typ="num"></ArgTableRow>
<ArgTableRow arg="egress-customer-tpid" typ="num"></ArgTableRow>
<ArgTableRow arg="ingress-service-tpid" typ="num"></ArgTableRow>
<ArgTableRow arg="egress-service-tpid" typ="num"></ArgTableRow>
<ArgTableRow arg="learn" typ="bool"></ArgTableRow>
<ArgTableRow arg="isolation-leakage-profile" typ="num"></ArgTableRow>
<ArgTableRow arg="driver-rx-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-rx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-tx-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-tx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-bytes" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-too-short" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-too-long" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-broadcast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-pause" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-multicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-fcs-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-align-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-fragment" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-overflow" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-control" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-unknown-op" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-length-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-code-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-carrier-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-jabber" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-drop" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-ip-header-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-tcp-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-udp-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-bytes" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-too-short" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-too-long" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-broadcast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-pause" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-multicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-underrun" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-excessive-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-multiple-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-single-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-excessive-deferred" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-deferred" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-late-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-total-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-pause-honored" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-jabber" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-fcs-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-control" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-fragment" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-carrier-sense-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom0-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom0-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom1-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom1-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="policy-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="custom-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="current-learned" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="not-learned" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-unicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-unicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-error-events" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-codewords" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-corrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-uncorrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-symbol-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-rx-block" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-block-corrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-block-uncorrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue0-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue0-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue1-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue1-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue2-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue2-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue3-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue3-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue4-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue4-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue5-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue5-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue6-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue6-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue7-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue7-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue0-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue0-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue1-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue1-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue2-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue2-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue3-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue3-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue4-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue4-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue5-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue5-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue6-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue6-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue7-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue7-byte" typ="multi { counter: num
 }"></ArgTableRow>
</ArgTable>

## interface/ethernet/switch/port {#interfaceethernetswitchport-1}
**系统能力：** rbswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="R" typ="running"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="vlan-mode" typ="enum (disabled | fallback | check | secure) { disabled:0, fallback:1, check:2, secure:3 }" syscap="oldswitch">更改入站流量针对 VLAN 表的 VLAN 查找机制。`disabled` - 完全禁用针对 VLAN 表的检查，不丢弃任何流量。`fallback` - 针对 VLAN 表检查标记流量，转发所有未标记流量。`check` - 检查标记流量，丢弃所有未标记流量。`secure` - 检查标记流量，丢弃所有未标记流量，入站和出站端口都必须在 VLAN 表中找到，否则流量会被丢弃。</ArgTableRow>
<ArgTableRow arg="vlan-header" typ="enum (leave-as-is | always-strip | add-if-missing) { leave-as-is:0, always-strip:1, add-if-missing:2 }" syscap="oldswitch">设置端口对出站流量执行的动作。`add-if-missing` - 使用入站端口的 `default-vlan-id` 添加 VLAN 标签，用于 trunk 端口。`always-strip` - 移除 VLAN 标签，用于 access 端口。`leave-as-is` - 不添加也不移除 VLAN 标签，用于 hybrid 端口。</ArgTableRow>
<ArgTableRow arg="default-vlan-id" typ="num" syscap="oldswitch">在端口上的所有未标记入站流量上添加具有指定 VLAN ID 的 VLAN 标签。应与 `vlan-header=always-strip` 一起使用，以将端口配置为 access 端口。对于 hybrid 端口，`default-vlan-id` 用于为未标记流量添加标签。如果两个端口具有相同的 `default-vlan-id`，则不会添加 VLAN 标签，因为交换机芯片假定流量正在 access 端口之间转发。</ArgTableRow>
<ArgTableRow arg="mirror-ingress" typ="bool" syscap="switch-mirror-prestera">是否将入站数据包副本发送到 `mirror-target` 端口。</ArgTableRow>
<ArgTableRow arg="mirror-egress" typ="bool" syscap="switch-mirror-prestera">是否将出站数据包副本发送到 `mirror-target` 端口。</ArgTableRow>
<ArgTableRow arg="mirror-ingress-target" typ="enum (none) { none:0 }" syscap="switch-mv88e6xxx">选择单个镜像入站目标端口。来自 `mirror-ingress` 的镜像数据包将发送到所选端口。</ArgTableRow>
<ArgTableRow arg="ingress-rate" typ="num" syscap="switch-rate">通过丢包限制接收（入站）流量。超过所定义限制的一切流量都会被丢弃。</ArgTableRow>
<ArgTableRow arg="egress-rate" typ="num" syscap="switch-rate">限制发送（出站）流量。整形器会尝试将超过限制的数据包排队，而不是将其丢弃。</ArgTableRow>
<ArgTableRow arg="storm-rate" typ="num" syscap="crs_prestera">将广播、未知组播和/或未知单播流量限制为链路速度的百分比。</ArgTableRow>
<ArgTableRow arg="limit-unknown-unicasts" typ="bool" syscap="crs_prestera">限制交换机端口上的未知单播流量。</ArgTableRow>
<ArgTableRow arg="limit-unknown-multicasts" typ="bool" syscap="crs_prestera">限制交换机端口上的未知组播流量。</ArgTableRow>
<ArgTableRow arg="limit-broadcasts" typ="bool" syscap="crs_prestera">限制交换机端口上的广播流量。</ArgTableRow>
<ArgTableRow arg="l3-hw-offloading" typ="bool" syscap="crs_prestera">三层硬件卸载。通过此端口进行硬件路由。设置为 `no` 时，仅禁用进出此特定端口的硬件路由。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="switch" typ="enum"></ArgTableRow>
<ArgTableRow arg="driver-rx-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-rx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-tx-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="driver-tx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-bytes" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-too-short" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-too-long" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-broadcast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-pause" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-multicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-fcs-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-align-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-fragment" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-overflow" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-control" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-unknown-op" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-length-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-code-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-carrier-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-jabber" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-drop" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-ip-header-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-tcp-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-udp-checksum-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-bytes" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-too-short" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-too-long" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-broadcast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-pause" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-multicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-underrun" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-excessive-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-multiple-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-single-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-excessive-deferred" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-deferred" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-late-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-total-collision" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-pause-honored" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-jabber" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-fcs-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-control" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-fragment" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-carrier-sense-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-64" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-65-127" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-128-255" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-256-511" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-512-1023" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1024-1518" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1519-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom0-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom0-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom1-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue-custom1-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="policy-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="custom-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="current-learned" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="not-learned" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-unicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-unicast" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-error-events" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-rx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-1024-max" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-codewords" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-corrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-uncorrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="rs-fec-symbol-error" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-rx-block" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-block-corrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="fc-fec-block-uncorrected" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue0-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue0-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue1-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue1-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue2-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue2-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue3-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue3-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue4-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue4-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue5-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue5-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue6-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue6-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue7-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-queue7-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue0-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue0-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue1-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue1-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue2-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue2-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue3-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue3-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue4-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue4-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue5-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue5-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue6-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue6-byte" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue7-packet" typ="multi { counter: num
 }"></ArgTableRow>
<ArgTableRow arg="tx-drop-queue7-byte" typ="multi { counter: num
 }"></ArgTableRow>
</ArgTable>
