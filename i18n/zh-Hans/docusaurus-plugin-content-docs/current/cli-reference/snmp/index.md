---
sidebar_key: "cli-reference/snmp"
title: "snmp"
sidebar_label: 'snmp'
source: https://manual.mikrotik.com/docs/cli-reference/snmp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## snmp {#snmp}
**类型：** 设置目录

`/snmp` 菜单用于启用 SNMP agent 并设置其常规行为：用于向 SNMPv3 客户端标识路由器的 engine ID、它响应的地址和 VRF，以及 trap 的发送方式。该 agent 默认处于关闭状态。实际可读取或写入的 community 在 `/snmp/community` 菜单中定义。有关配置示例，请参阅 [SNMP 指南](../../diagnostics-monitoring-and-troubleshooting/snmp.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">SNMP 代理是否应答查询并发送 trap。默认值：no。</ArgTableRow>
<ArgTableRow arg="contact" typ="string">管理联系人信息，任何收集器都可读取。默认值：empty。</ArgTableRow>
<ArgTableRow arg="location" typ="string">管理位置信息，任何收集器都可读取。默认值：empty。</ArgTableRow>
<ArgTableRow arg="engine-id-suffix" typ="string">代理 SNMP 引擎 ID 的尾部。路由器用前缀 `80003a8c04` 和以 ASCII 十六进制写出的给定值组成完整引擎 ID；例如后缀 `1234` 生成的引擎 ID 为 `80003a8c0431323334`。将后缀留空则使用自动生成的引擎 ID，该 ID 每台路由器各不相同，且重启后保持不变。默认值：empty。</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ip6: ip6Addr
 }">SNMP 消息的源地址。设置该值后，代理只应答发往该地址的请求，且 IPv4 值会使其停止应答 IPv6 请求。默认值：`::` - 回复来自接收请求的接口的地址。</ArgTableRow>
<ArgTableRow arg="trap-target" typ="object { ip-addresses: alt { ipv6: ip6Addr
, ip: ipAddr
 }
 }">接收 SNMP trap 的收集器地址列表；trap 会发送到每个地址的 UDP 端口 162。默认值：empty。</ArgTableRow>
<ArgTableRow arg="trap-community" typ="enum">用于发送 trap 的 community。它必须存在于 `/snmp/community` 菜单中；其安全级别决定 trap 的保护方式。默认值：`public`。</ArgTableRow>
<ArgTableRow arg="trap-version" typ="enum (1 | 2 | 3) { 1:0, 2:1, 3:3 }">
trap 协议的版本。
- `1`（默认）- SNMPv1 trap。
- `2` - SNMPv2c trap。
- `3` - SNMPv3 trap，使用 `trap-community` 的认证和加密。
</ArgTableRow>
<ArgTableRow arg="trap-generators" typ="multi { array-id, generator: enum
 }">
生成 trap 的事件；多个值可以组合。
- `interfaces` - 当接口状态变化时生成 `linkDown`/`linkUp` trap；可用 `trap-interfaces` 缩小范围。
- `start-trap` - 当 SNMP 服务启动时生成 trap。
- `temp-exception`（默认） - 当 CPU 温度达到 `/system/health` 阈值时生成 trap。
</ArgTableRow>
<ArgTableRow arg="trap-interfaces" typ="object { interface: iface_enum
 }">状态变化会生成 `interfaces` trap 的接口列表；其他接口保持静默。为空表示任意接口。默认值：empty.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">SNMP 代理运行所在的 VRF。到达其他 VRF 的请求不会收到回复。默认值：`main`.</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="engine-id" typ="string">代理的完整 SNMP engine ID：前缀 `80003a8c04` 后跟以 ASCII 十六进制表示的 `engine-id-suffix` 值；当后缀为空时，为自动生成的 ID。SNMPv3 客户端通过此值寻址代理，并在每个请求中都包含它。</ArgTableRow>
</ArgTable>
