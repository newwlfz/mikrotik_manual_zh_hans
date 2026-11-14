---
sidebar_key: "cli-reference/interface/vrrp"
sidebar_position: 38
title: "vrrp"
sidebar_label: 'vrrp'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/vrrp
captured_at: '2026-11-01T21:23:08+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/vrrp {#interfacevrrp}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">VRRP 接口已被用户禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">VRRP 接口处于 invalid 状态，例如由于配置错误。</ArgTableRow>
<ArgTableRow arg="G" typ="grp-authority">VRRP 接口为 `group-authority`。它控制其他组成员的状态，并且是唯一发送 VRRP 通告的接口。</ArgTableRow>
<ArgTableRow arg="g" typ="grp-member">VRRP 接口是组成员。其状态机跟随指定 `group-authority` 接口的状态。</ArgTableRow>
<ArgTableRow arg="R" typ="running">running.</ArgTableRow>
<ArgTableRow arg="M" typ="master">VRRP 接口处于 master 状态。</ArgTableRow>
<ArgTableRow arg="B" typ="backup">VRRP 接口处于 backup 状态。</ArgTableRow>
<ArgTableRow arg="F" typ="failure">VRRP 接口处于 failure 状态，例如由于其父接口 link-down。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">VRRP 接口名称。</ArgTableRow>
<ArgTableRow arg="arp" typ="enum (disabled | enabled | proxy-arp | reply-only | local-proxy-arp) { disabled:0, enabled:1, proxy-arp:2, reply-only:3, local-proxy-arp:4 }">[地址解析协议](../../getting-started/networking-fundamentals/index.md#arp-and-tying-it-all-together) 模式。</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }">在未从 IP 收到数据包后，ARP 记录在 ARP 表中保留多长时间。值 `auto` 等于 IP/Settings 中 `arp-timeout` 的值，默认为 30s。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">VRRP 实例将在其上运行的接口名称。</ArgTableRow>
<ArgTableRow arg="group-master" typ="iface_enum { :0, none:0, self }">deprecated.</ArgTableRow>
<ArgTableRow arg="group-authority" typ="iface_enum { :0, none:0, self }">
允许将多个 VRRP 接口分组，以便它们共享相同的 VRRP 状态。在一个组内，会选择一个组权威接口。它控制其他组成员的状态，并且是唯一发送 VRRP 通告的接口。当 group-authority VRRP 接口转换到 backup 状态时，所有组成员也会转换到 backup 状态。如果在任何组成员上检测到故障，例如由于其父接口 link-down，则所有组成员都会转换到 failure 状态。
- `none` - VRRP 接口不进行分组，并以其自身的 VRRP 状态机独立运行。
- `self` - VRRP 接口充当组权威。它控制其他已分组 VRRP 接口的状态机，并负责发送和接收 VRRP 通告。
- `vrrp-interface` - VRRP 接口是组成员。其状态机跟随指定 VRRP 接口的状态。
</ArgTableRow>
<ArgTableRow arg="vrid" typ="num">虚拟路由器标识符。每个虚拟路由器必须具有唯一的 id 编号。</ArgTableRow>
<ArgTableRow arg="priority" typ="num">Master 选举算法中使用的 VRRP 节点优先级。数字越大表示优先级越高。`255` 保留给拥有 VR IP 的路由器，`0` 保留给 Master 路由器，以表示其正在释放职责。</ArgTableRow>
<ArgTableRow arg="interval" typ="time">
VRRP interval 定义 VRRP master 路由器向 backup 路由器发送 Advertisement 数据包的频率。此间隔直接决定 backup 接收 keepalive 信息的频率，这些信息确认 master 正在运行。
较短的间隔会提高 Advertisement 数据包的发送速率，从而可以更快地检测到 master 故障，但也会增加对数据包丢失、处理延迟和计时器不准确的敏感度。较长的间隔会减少控制流量并提高稳定性，但代价是故障转移检测更慢。Master Down 间隔由配置的 VRRP interval 和路由器优先级推导出来，其计算会允许在触发故障转移前错过多个 Advertisement。

**警告：** 将 VRRP interval 配置为低于 1 秒可能导致不可预测的行为和意外的 master 角色变更。
</ArgTableRow>
<ArgTableRow arg="preemption-mode" typ="bool">master 节点是否始终具有优先权。设置为 `no` 时，即使 backup 节点具有更高优先级，在当前 master 发生故障之前，也不会将 backup 节点选举为 master。</ArgTableRow>
<ArgTableRow arg="authentication" typ="enum (none | simple | ah) { none:0, simple:1, ah:2 }">
用于 VRRP 通告数据包的认证方法。
- `none` - 仅在低安全性网络中使用，例如 LAN 上的两个 VRRP 节点。
- `ah` - IP Authentication Header。此算法针对配置错误、重放攻击以及数据包损坏或修改提供强保护。当你对 LAN 上节点的管理控制有限时，应使用它。使用 HMAC-MD5。
- `simple` - 使用明文密码。防止本地网络上路由器的意外错误配置。
</ArgTableRow>
<ArgTableRow arg="password" typ="string">认证所需的密码。如果未使用认证，则可以忽略。</ArgTableRow>
<ArgTableRow arg="on-backup" typ="alt { script: string
 }">节点切换到 backup 状态时要执行的脚本。</ArgTableRow>
<ArgTableRow arg="on-master" typ="alt { script: string
 }">节点切换到 master 状态时要执行的脚本。</ArgTableRow>
<ArgTableRow arg="on-fail" typ="alt { script: string
 }">节点发生故障时要执行的脚本。</ArgTableRow>
<ArgTableRow arg="version" typ="enum (2 | 3) { 2:2, 3:3 }">要使用的 VRRP 版本。</ArgTableRow>
<ArgTableRow arg="v3-protocol" typ="enum (ipv4 | ipv6) { ipv4:1, ipv6:2 }">VRRPv3 将使用的协议。仅当 `version` 为 3 时有效。</ArgTableRow>
<ArgTableRow arg="v3-checksum-as-v2" typ="bool">
控制 VRRPv3 IPv4 校验和的计算是否包含 IPv4 伪首部。
不同供应商对 RFC 5798 第 5.2.8 节中有关 IPv4 校验和计算中伪首部的解释不同。基于 Linux 的实现（包括 FRR）会为 IPv4 和 IPv6 都包含伪首部，而 Cisco 仅为 IPv6 包含伪首部。
- `no`（默认）- 在校验和计算中包含 IPv4 伪首部。与其他基于 Linux 的 VRRPv3 实现兼容。
- `yes` - 在校验和计算中排除 IPv4 伪首部。与 Cisco 及其他不为 IPv4 包含伪首部的供应商兼容时使用此设置。

此设置仅适用于使用 IPv4 的 VRRPv3。它对 VRRPv3 IPv6 或 VRRPv2 没有影响。

同一虚拟路由器中的所有 VRRP 路由器必须对此设置使用相同的值。值不匹配会导致 "bad checksum" 错误，并且 VRRP 通告数据包将被丢弃。
</ArgTableRow>
<ArgTableRow arg="sync-connection-tracking" typ="bool">将连接跟踪条目从 Master 同步到 Backup 设备。VRRP 连接跟踪同步要求 RouterOS 连接跟踪正在运行。</ArgTableRow>
<ArgTableRow arg="remote-address" typ="ipAddr">
指定另一台 VRRP 路由器的远程地址，用于连接跟踪同步。如果未设置，系统会通过 VRRP 自动检测远程地址。仅当启用了 `sync-connection-tracking` 时才会使用远程地址。显式设置远程地址有以下好处：
- 连接跟踪同步启动更快，因为无需等待 VRRP 的初始消息交换来检测远程地址。
- VRRP Master 选举更快。
- 连接跟踪数据可以通过不同的网络接口发送，例如两台路由器之间的专用安全线路。
同步连接跟踪使用 UDP 端口 8275。
</ArgTableRow>
<ArgTableRow arg="connection-tracking-mode" typ="enum (passive-active | active-active) { passive-active:0, active-active:1 }">
指定连接跟踪同步的模式。此设置仅在启用了 `sync-connection-tracking` 时相关。
- `passive-active` - 将此模式用于传统 VRRP 设置，即使用一个 master 和一个或多个 backup 路由器。在此模式下，只有 master 设备通过向 backup 设备发送更新来执行连接跟踪同步。Backup 设备不发送连接跟踪数据。
- `active-active` - 将此模式用于具有多个 VRRP 组以实现负载均衡的设置。每个 VRRP 组都有自己的 master，而这些 master 可以位于不同的物理设备上。在 active-active 模式下，所有活动 master 可以相互同步连接跟踪数据。active-active 模式下的每个 VRRP 组必须使用唯一的 connection-tracking-port 值。在多个组之间重复使用同一端口可能导致连接跟踪表不同步。

将多个 VRRP 组与 **passive-active** 模式一起使用可能导致连接跟踪表不同步，因为只有一个 master 处理同步，其他 master 不交换跟踪数据。
</ArgTableRow>
<ArgTableRow arg="connection-tracking-port" typ="num">指定用于连接跟踪同步的 UDP 端口。此设置仅在启用了 `sync-connection-tracking` 时相关。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mtu" typ="num">Layer3 MTU 大小。VRRP 接口始终使用 slave 接口的 MTU。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">VRRP 接口的 MAC 地址。</ArgTableRow>
</ArgTable>
