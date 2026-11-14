---
sidebar_key: "cli-reference/zerotier/interface"
sidebar_position: 2
title: "interface"
sidebar_label: 'interface'
source: https://manual.mikrotik.com/docs/cli-reference/zerotier/interface
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## zerotier/interface {#zerotierinterface}
**包：** zerotier
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">接口是否动态创建。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">项目是否已禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口的短名称。</ArgTableRow>
<ArgTableRow arg="arp-timeout" typ="alt { arp-timeout: enum (auto) { auto:0 }
, arp-timeout: time
 }">ARP 超时值。</ArgTableRow>
<ArgTableRow arg="disable-running-check" typ="bool">强制接口进入运行状态。</ArgTableRow>
<ArgTableRow arg="network" typ="string" mandatory="1">16 位网络 ID。</ArgTableRow>
<ArgTableRow arg="instance" typ="enum" mandatory="1">ZeroTier 实例名称。</ArgTableRow>
<ArgTableRow arg="allow-managed" typ="bool">分配由 ZeroTier 管理的 IP 地址和路由。</ArgTableRow>
<ArgTableRow arg="allow-global" typ="bool">ZeroTier IP 地址和路由可以与公网 IP 空间重叠。</ArgTableRow>
<ArgTableRow arg="allow-default" typ="bool">网络可以覆盖系统默认路由（强制 VPN 模式）。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="mac-address" typ="macAddr">ZeroTier 接口的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">接口的最大传输单元。</ArgTableRow>
<ArgTableRow arg="bridge" typ="bool">接口是否充当网桥。</ArgTableRow>
<ArgTableRow arg="dhcp" typ="bool">接口上是否启用 DHCP。</ArgTableRow>
<ArgTableRow arg="network-name" typ="string">来自控制器的可读网络名称。</ArgTableRow>
<ArgTableRow arg="status" typ="string">接口在网络上的当前状态。</ArgTableRow>
<ArgTableRow arg="type" typ="string">网络接口的类型。</ArgTableRow>
</ArgTable>
