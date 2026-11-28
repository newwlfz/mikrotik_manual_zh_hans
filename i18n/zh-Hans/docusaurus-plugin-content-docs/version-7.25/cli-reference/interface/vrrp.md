---
title: "vrrp"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/vrrp
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/interface/vxlan"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/vrrp
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">The VRRP interface is disabled by the user.</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">The VRRP interface is in the invalid state, for example due to a configuration error.</ArgTableRow>
<ArgTableRow arg="G" typ="grp-authority">The VRRP interface is `group-authority`. It controls the state of the other group members and is the only interface that sends VRRP advertisements.</ArgTableRow>
<ArgTableRow arg="g" typ="grp-member">The VRRP interface is a group member. Its state machine follows the state of the specified `group-authority` interface.</ArgTableRow>
<ArgTableRow arg="R" typ="running">running.</ArgTableRow>
<ArgTableRow arg="M" typ="master">The VRRP interface is in the master state.</ArgTableRow>
<ArgTableRow arg="B" typ="backup">The VRRP interface is in the backup state.</ArgTableRow>
<ArgTableRow arg="F" typ="failure">The VRRP interface is in the failure state, for example due to a link-down on its parent interface.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">VRRP interface name.</ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp) { disabled:0, enabled:1, proxy-arp:2, reply-only:3, local-proxy-arp:4 }">[Address Resolution Protocol](/docs/getting-started/networking-fundamentals#arp-and-tying-it-all-together) mode.</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }">How long the ARP record is kept in the ARP table after no packets are received from IP. Value `auto` equals the value of `arp-timeout` in IP/Settings, default is 30s.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">Interface name on which VRRP instance will be running.</ArgTableRow>
<ArgTableRow arg="group-master" typ="iface_enum { :0, none:0, self }">deprecated.</ArgTableRow>
<ArgTableRow arg="group-authority" typ="iface_enum { :0, none:0, self }">
Allows multiple VRRP interfaces to be grouped so they share the same VRRP state. Within a group, a single group authority interface is selected. It controls the state of the other group members and is the only interface that sends VRRP advertisements. When the group-authority VRRP interface transitions to the backup state, all group members also transition to the backup state. If a failure is detected on any group member, for example due to a link-down on its parent interface, all group members transition to the failure state.
- `none` - The VRRP interface is not grouped and operates independently, with its own VRRP state machine.
- `self` - The VRRP interface acts as the group authority. It controls the state machines of other grouped VRRP interfaces and is responsible for sending and receiving VRRP advertisements.
- `vrrp-interface` - The VRRP interface is a group member. Its state machine follows the state of the specified VRRP interface.
</ArgTableRow>
<ArgTableRow arg="vrid" typ="num">Virtual Router identifier. Each Virtual router must have a unique id number.</ArgTableRow>
<ArgTableRow arg="priority" typ="num">Priority of VRRP node used in Master election algorithm. A higher number means higher priority. `255` is reserved for the router that owns the VR IP and `0` is reserved for the Master router to indicate that it is releasing responsibility.</ArgTableRow>
<ArgTableRow arg="interval" typ="time">
The VRRP interval defines how often the VRRP master router sends Advertisement packets to backup routers. This interval directly determines the frequency at which backups receive keepalive information confirming that the master is operational.
A shorter interval increases the rate of Advertisement packets, allowing faster detection of master failure, but also increases sensitivity to packet loss, processing delays, and timer inaccuracies. Longer intervals reduce control traffic and improve stability, at the cost of slower failover detection. The Master Down interval is derived from the configured VRRP interval and the router's priority, and is calculated to allow multiple missed Advertisements before triggering failover.

**警告：** 将 VRRP 间隔配置为低于 1 秒可能导致不可预测的行为以及意外的主角色变更。
</ArgTableRow>
<ArgTableRow arg="preemption-mode" typ="bool">主节点是否始终具有优先级。设置为 `no` 时，即使备份节点具有更高优先级，在当前主节点故障之前也不会选举备份节点为主节点。</ArgTableRow>
<ArgTableRow arg="authentication" typ="enum (none | simple | ah) { none:0, simple:1, ah:2 }">
用于 VRRP 通告数据包的身份验证方法。
- `none` - 仅用于低安全性网络，例如 LAN 上的两个 VRRP 节点。
- `ah` - IP Authentication Header。该算法可针对配置错误、重放攻击以及数据包损坏或篡改提供强保护。当你对 LAN 上节点管理的控制有限时，应使用该方法。使用 HMAC-MD5。
- `simple` - 使用明文密码。可防止本地网络中的路由器被意外错误配置。
</ArgTableRow>
<ArgTableRow arg="password" typ="string">身份验证所需的密码。如果未使用身份验证，可以忽略该参数。</ArgTableRow>
<ArgTableRow arg="on-backup" typ="alt { script: string
 }">节点切换到备份状态时执行的脚本。</ArgTableRow>
<ArgTableRow arg="on-master" typ="alt { script: string
 }">节点切换到主状态时执行的脚本。</ArgTableRow>
<ArgTableRow arg="on-fail" typ="alt { script: string
 }">节点故障时执行的脚本。</ArgTableRow>
<ArgTableRow arg="version" typ="enum (2 | 3) { 2:2, 3:3 }">要使用的 VRRP 版本。</ArgTableRow>
<ArgTableRow arg="v3-protocol" typ="enum (ipv4 | ipv6) { ipv4:1, ipv6:2 }">VRRPv3 将使用的协议。仅当 `version` 为 3 时有效。</ArgTableRow>
<ArgTableRow arg="v3-checksum-as-v2" typ="bool">
控制 VRRPv3 IPv4 校验和是否使用 IPv4 伪首部计算。
不同厂商对 RFC 5798 第 5.2.8 节中有关 IPv4 校验和计算伪首部的内容有不同解释。基于 Linux 的实现（包括 FRR）在 IPv4 和 IPv6 中都包含伪首部，而 Cisco 仅在 IPv6 中包含伪首部。
- `no`（默认）- 在校验和计算中包含 IPv4 伪首部。与其他基于 Linux 的 VRRPv3 实现兼容。
- `yes` - 在校验和计算中排除 IPv4 伪首部。使用该设置可与 Cisco 以及其他不在 IPv4 中包含伪首部的厂商兼容。

该设置仅适用于使用 IPv4 的 VRRPv3。对 VRRPv3 IPv6 或 VRRPv2 无效。

同一 Virtual Router 中的所有 VRRP 路由器必须为该设置使用相同的值。值不匹配将导致“bad checksum”错误，并且 VRRP 通告数据包将被丢弃。
</ArgTableRow>
<ArgTableRow arg="sync-connection-tracking" typ="bool">将连接跟踪条目从 Master 设备同步到 Backup 设备。VRRP 连接跟踪同步要求 RouterOS 连接跟踪正在运行。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="ipAddr">
指定用于连接跟踪同步的另一台 VRRP 路由器的远程地址。如果未设置，系统会通过 VRRP 自动检测远程地址。仅当启用 `sync-connection-tracking` 时才使用远程地址。显式设置远程地址具有以下优点：
- 连接跟踪同步启动更快，因为无需等待 VRRP 的初始消息交换来检测远程地址。
- VRRP Master 选举更快。
- 连接跟踪数据可以通过其他网络接口发送，例如两台路由器之间的专用安全线路。
同步连接跟踪使用 UDP 端口 8275。
</ArgTableRow>
<ArgTableRow arg="connection-tracking-mode" typ="enum (passive-active | active-active) { passive-active:0, active-active:1 }">
指定连接跟踪同步模式。仅当启用 `sync-connection-tracking` 时，该设置才相关。
- `passive-active` - 将该模式用于传统 VRRP 部署，即使用一个主路由器和一个或多个备份路由器。在该模式下，只有主设备通过向备份设备发送更新来执行连接跟踪同步。备份设备不发送连接跟踪数据。
- `active-active` - 将该模式用于具有多个 VRRP 组的部署，以实现负载均衡。每个 VRRP 组都有自己的主设备，这些主设备可以位于不同的物理设备上。在 active-active 模式下，所有活动主设备都可以彼此同步连接跟踪数据。active-active 模式下的每个 VRRP 组都必须使用唯一的 connection-tracking-port 值。在多个组中重复使用同一端口可能导致连接跟踪表不同步。

将多个 VRRP 组与 **passive-active** 模式一起使用可能导致连接跟踪表不同步，因为只有一个主设备处理同步，其他设备不交换跟踪数据。
</ArgTableRow>
<ArgTableRow arg="connection-tracking-port" typ="num">指定用于连接跟踪同步的 UDP 端口。仅当启用 `sync-connection-tracking` 时，该设置才相关。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="mtu" typ="num">Layer3 MTU size. The VRRP interface always uses slave interface MTU.</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">MAC address of the VRRP interface.</ArgTableRow>
</ArgTable>
