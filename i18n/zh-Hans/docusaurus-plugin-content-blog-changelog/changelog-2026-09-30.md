---
title: "文档更新 - 2026年9月30日"
date: 2026-09-30
slug: /changelog-2026-09-30
source: https://manual.mikrotik.com/changelog/changelog-2026-09-30
captured_at: '2026-11-04T06:08:53+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 9 月 30 日文档变更摘要。

## 诊断与监控 {#diagnostics--monitoring}

- **[Ping](/docs/diagnostics-monitoring-and-troubleshooting/ping)**：围绕读者实际要完成的任务重写，所有输出均在 RouterOS 7.26 上通过三跳测试网络捕获：

- 按地址和按名称检查互联网连通性；无法解析的名称会以 resolve failed 失败。
- 一张状态值表格（timeout、net unreachable、host unreachable、admin prohibited、TTL exceeded、no route to host、两个 Don't Fragment 状态以及 echo reply）及各自的含义。
- 用 do-not-fragment 查找路径 MTU：哪台路由器会应答、为什么更大的 ping 随即失败，以及通过 MSS clamping 进行的修复。
- 从 LAN 地址发起 ping 以测试 IPsec 隧道、从 VRF 发起 ping，以及通过带 src-address 和路由规则的政策路由表发起 ping。
- 用 ARP ping 和 ND ping 访问丢弃 ICMP 的主机，用 ff02::1 发现 IPv6 主机，对 MAC 地址执行 ping，并在脚本中使用 ping。
- 已更正：size 是整个 IP 包（含包头），因此 size=1500 相当于 Windows 上的 ping -l 1472；晚于 interval 的应答会被计为 timeout；WinBox 4 和 WebFig 使用路由器的 DNS 解析名称（只有 WinBox 3 使用电脑的 DNS）。

- **[Traceroute](/docs/diagnostics-monitoring-and-troubleshooting/traceroute)**：从一个两跳示例重写为阅读跟踪结果的指南。它解释了各列的含义以及 RouterOS 如何执行跟踪（ICMP 探测、最多 30 跳、多轮重复并给出每跳统计）。新增了故障排查案例，每个案例都附有捕获的输出：某些跳不再应答、某台路由器拒绝流量（status 列显示 network unreachable、host unreachable 和 packet filtered）、路由环路、某一跳的丢包但并非路径丢包，以及往返时间持续上升。此外新增：使用 use-dns 获取主机名、用 do-not-fragment 找出 MTU 较小的那一跳，以及从 VRF 或指定源地址进行跟踪。
- **[Torch](/docs/diagnostics-monitoring-and-troubleshooting/torch)**：重写了输出含义的说明，并在 RouterOS 7.26 上用已知大小和速率的流量做了测试。每一行是一个流。SRC-ADDRESS 始终是被监视接口的对端，因此在 LAN 网桥上，TX 是主机下载的流量，RX 是主机上传的流量。新增了带捕获输出的任务：找出占用带宽的主机、监视某个协议或端口、检查 VLAN 标签和 DSCP 标记（只在一个方向上标记的流会显示为两行）、查看被防火墙丢弃的流量，以及查看哪个 CPU 处理某个流。已更正：port 只接受一个端口（旧的 port=80,443 示例会失败）；Torch 运行期间 IP fast path 和 FastTrack 处于关闭状态。
- **[IP Scan](/docs/diagnostics-monitoring-and-troubleshooting/ip-scan)**：围绕任务进行了重写，输出在 RouterOS 7.26 上捕获：查找 LAN 上的设备、确认某个地址是否空闲、通过在某个接口上监听来找出使用未知静态地址的设备（然后用临时地址访问它），以及扫描远程网络。新增：扫描会发送什么（ARP、ping、用于获取系统名称的 SNMP 查询、NetBIOS 查询、反向 DNS 查询，以及一个 BOOTP 请求）。已更正：同时设置 interface 和 address-range 时会扫描该范围，因此删除了原先关于结果不确定的警告。
- **[Flood Ping](/docs/diagnostics-monitoring-and-troubleshooting/flood-ping)**：围绕丢包测试进行了重写。新增：flood ping 需要 traffic-gen device-mode 功能（否则命令会以 not allowed by device-mode 失败）以及如何启用它，还有从路由器上读到的参数限制（每次运行最多 1000 个请求，size 为 10 到 1500）。移除了关于发送速率的无法验证的说法和一段旧输出。
- **[Graphing](/docs/diagnostics-monitoring-and-troubleshooting/graphing)**：新增了针对接口、资源和队列规则以及 graphing 设置的 WinBox 步骤（附截图），并将旧的 WinBox 图形截图替换为原生截图。

## 系统 {#system}

- **[Services](/docs/system-information-and-utilities/services)**：围绕路由器监听什么进行了重写：/ip/service 中的动态条目及其对防火墙的意义、同时为多个服务设置 available-from（只含 IPv4 前缀的列表会拒绝 IPv6 客户端），以及 VRF 中的管理服务。协议和端口列表现在分为三张表（TCP、UDP、IP 协议），并已针对各功能打开的监听端口做了核对：

- 移除了 RouterOS 7 不使用的端口：MME 和基于 UDP 的 RSVP。
- 已更正：OpenFlow 连接到其控制器而不监听，TCP 端口 20 也不是监听端口。
- 已新增：TFTP、OpenVPN、RADIUS incoming、IPsec NAT traversal、用于 WiFi 的 CAPsMAN、WireGuard 和 ICMPv6。
- 一条说明指出，IP 防火墙无法阻止 MAC Telnet、MAC WinBox 和 MAC ping，而 /tool/mac-server 中的 allowed-interface-list 可以。

- **[Wake on LAN](/docs/system-information-and-utilities/wake-on-lan)**：用任务形式重写，每项任务都经过测试：唤醒 LAN 上的一台电脑、从网络外部通过 VPN 唤醒、在指定时间唤醒，以及用脚本在工作日唤醒一组办公电脑。说明：指定 interface 时，RouterOS 会把 magic packet 作为以太网帧从该接口发出；不指定时，则作为 UDP 广播经默认路由（通常是互联网连接）发出，因此请始终给出 LAN 接口。
- **[Note](/docs/system-information-and-utilities/note)**：重写了 note 显示位置的章节，每种情况都经过测试：在交互式 SSH、Telnet 和 MAC Telnet 登录时显示在 banner 之后；配合 show-at-cli-login 时还会显示在 Telnet 登录提示之前，任何能连接的人都能读到（新增警告）。已更正：sys-note.txt 文件只在下次启动时才设置 note。
- **[Identity](/docs/system-information-and-utilities/identity)**：名称出现的位置（提示符、邻居发现、SNMP 系统名称、DHCP 主机名）、64 字符的限制，以及一个已更正的 SNMP 示例：设置名称需要具有写权限的 community，因为 public 只能读取。新增了关于写 community 允许哪些操作的警告。
- **[Clock](/docs/system-information-and-utilities/clock)、[Device mode](/docs/system-information-and-utilities/device-mode)、[E-mail](/docs/system-information-and-utilities/e-mail)、[Fetch](/docs/system-information-and-utilities/fetch)、[Files](/docs/system-information-and-utilities/files)、[Identity](/docs/system-information-and-utilities/identity)、[IP packing](/docs/system-information-and-utilities/ip-packing)、[Neighbor discovery](/docs/system-information-and-utilities/neighbor-discovery)、[Note](/docs/system-information-and-utilities/note)、[NTP](/docs/system-information-and-utilities/ntp)、[Partitions](/docs/system-information-and-utilities/partitions)、[Scheduler](/docs/system-information-and-utilities/scheduler)、[Services](/docs/system-information-and-utilities/services)、[TFTP](/docs/system-information-and-utilities/tftp)、[Wake on LAN](/docs/system-information-and-utilities/wake-on-lan)**：每个页面现在都有一个简短的 WinBox 小节，附有同一任务对应的原生 WinBox 窗口的带标注截图。

## 管理工具 {#management-tools}

- **[MAC server](/docs/management-tools/mac-server)**：围绕使用 MAC Telnet（或按 MAC 地址使用 WinBox）连接、用 MAC scan 查找路由器，以及只在可信接口上允许 MAC 访问进行了重写，并在两台路由器之间做了测试。新增并已验证：

- MAC Telnet 不加密：命令和输出以明文经过链路，但密码不会。
- IP 防火墙无法阻止 MAC 访问；allowed-interface-list 或某个端口上的网桥过滤规则可以。
- 应把网桥（而不是它的端口）加入列表；none 会关闭访问；已打开的会话会保持打开。
- 用户的 address 设置不适用于 MAC 登录。
- 已更正：MAC scan 会列出发送邻居发现的设备，无论其 MAC server 设置如何；关闭 MAC ping 不影响 ARP ping。

- **[Quick Set](/docs/management-tools/quick-set)**：用带标注的 WinBox 截图进行说明：Home AP Dual 模式的主要区域、网络名称和 Wi-Fi 密码、互联网连接类型以及本地网络设置。

## CLI 参考 {#cli-reference}

- **[/tool/ping](/docs/cli-reference/tool/ping)**：每一行现在都有取值范围和默认值，并用抓包进行了核对：size 为整个 IP 包（IPv4 为 28..65535，IPv6 为 48..65535）、ttl（IPv4 为 255，IPv6 的 hop limit 为 64）、interval、dscp、源地址选择、interface，以及各个 status 值。
- **[/tool/traceroute](/docs/cli-reference/tool/traceroute)**：描述了所有行：探测类型和大小、max-hops（30）、timeout（1 秒）、port（UDP 探测为 33434）、use-dns、vrf，以及某一跳可能报告的 status 值。
- **[/tool/mac-server](/docs/cli-reference/tool/mac-server)、[/tool/mac-telnet](/docs/cli-reference/tool/mac-telnet)、[/tool/mac-scan](/docs/cli-reference/tool/mac-scan)**：描述了所有行和菜单简介：允许的接口列表（默认 all，默认配置会设为 LAN）、MAC ping、会话列表、客户端的 interface，以及 MAC scan 显示的内容。
- **[/tool/torch](/docs/cli-reference/tool/torch)**：描述了全部 24 行：各个过滤器及其匹配方式、port 每次一个端口、cpu=any，以及 tx 和 rx 的方向与单位。
- **[/tool/wol](/docs/cli-reference/tool/wol)、[/tool/ip-scan](/docs/cli-reference/tool/ip-scan)**：描述了 Wake on LAN 的两种数据包形式，以及 IP scan 的每一行及其各列的来源。
- **[/system/note](/docs/cli-reference/system/note)、[/system/identity](/docs/cli-reference/system/identity)、[/tool/flood-ping](/docs/cli-reference/tool/flood-ping)**：描述了所有行，包括 flood ping 的限制及其 device-mode 要求。

## 硬件 {#hardware}

- **[KNOT](/hardware/knot) 及其他 IoT 产品页面**：每个页面现在都有一个 A4 PDF 版本，链接位于页面标题下方。
