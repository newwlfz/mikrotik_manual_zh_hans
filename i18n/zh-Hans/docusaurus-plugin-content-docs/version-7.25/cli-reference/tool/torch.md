---
sidebar_key: "cli-reference/tool/torch"
sidebar_position: 23
title: "torch"
sidebar_label: 'torch'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/torch
captured_at: '2026-11-01T21:26:01+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/torch {#tooltorch}
**类型：** 命令

显示当前经过某个接口的流量，按地址、协议、端口和 DSCP 分组为流，并显示每个流在两个方向上的速率。Torch 会看到防火墙之前的数据包，并在运行期间关闭 IP 快速路径。它会一直运行，直到通过 Ctrl-C 停止，或直到 `duration` 结束。有关示例以及如何阅读输出，请参阅 [Torch](../../diagnostics-monitoring-and-troubleshooting/torch.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">要监视的接口。名称可以不带 `interface=` 给出，例如 `/tool/torch bridge`。</ArgTableRow>
<ArgTableRow arg="src-address" typ="super { !
, src-address: ipPrefix
 }">仅显示其 `src-address` 位于此 IPv4 前缀中的流。流的 `src-address` 是接口远端一侧的地址，即接口接收其流量的一侧。默认值：any。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="super { !
, dst-address: ipPrefix
 }">仅显示其 `dst-address`（流的另一端）位于此 IPv4 前缀中的流。默认值：any。</ArgTableRow>
<ArgTableRow arg="src-address6" typ="super { !
, src-address6: ip6Prefix
 }">`src-address` 的 IPv6 前缀，即接口远端一侧。默认值：any。</ArgTableRow>
<ArgTableRow arg="dst-address6" typ="super { !
, dst-address6: ip6Prefix
 }">`dst-address` 的 IPv6 前缀，即流的另一端。默认值：any。</ArgTableRow>
<ArgTableRow arg="mac-protocol" typ="enum (any) { any:3 }">仅显示此 MAC 协议的流，例如 `ip`。默认值：any。</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="enum (any) { any:256 }">仅显示此 IP 协议的流，例如 `tcp`。默认值：any。</ArgTableRow>
<ArgTableRow arg="port" typ="enum (any) { any:0 }">仅显示以此端口作为 `src-port` 或 `dst-port` 的流，可为一个端口或 `any`。该过滤器适用于有端口的流：没有端口的流（例如 ICMP）仍会显示。默认值：any。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="alt { number: num [ .. 4095]
, enum: enum (any) { any:0xffff }
 }">仅显示具有此 VLAN ID 的帧，`0..4095`，或 `any`。父接口上的带标签帧即使没有此过滤器也会获得 `VLAN-ID` 列。默认值：any。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">仅显示具有此 DSCP 值的流，`0..63`，例如 `46` 表示 Expedited Forwarding。默认值：any。</ArgTableRow>
<ArgTableRow arg="cpu" typ="num">使用 `any` 时，会添加 `CPU` 列：每个处理过某个流的数据包的 CPU 占一行。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="cpu" typ="num">处理该行数据包的 CPU。使用 `cpu=any` 时显示。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num">流的 VLAN ID。在父接口上对带标签帧显示；在 VLAN 接口本身上，帧不带标签，因此该列不会出现。</ArgTableRow>
<ArgTableRow arg="mac-protocol" typ="enum ()">流的 MAC 协议，例如 `ip`。</ArgTableRow>
<ArgTableRow arg="ip-protocol" typ="enum ()">流的 IP 协议，例如 `tcp`、`udp` 或 `icmp`。</ArgTableRow>
<ArgTableRow arg="dscp" typ="num">流的 DSCP 值。</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }">接口远端一侧的地址：即接口接收其流量的一侧，即使会话由路由器发起也是如此。</ArgTableRow>
<ArgTableRow arg="src-port" typ="enum ()">位于 `src-address` 一侧的端口，适用于 TCP 和 UDP 流，并显示其服务名称。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="alt { ip: ipAddr
, ipv6: ip6Addr
 }">流的另一端。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="enum ()">位于 `dst-address` 一侧的端口，适用于 TCP 和 UDP 流，并显示其服务名称，例如 `2000 (btserv)`。</ArgTableRow>
<ArgTableRow arg="tx" typ="num">接口发往 `src-address` 的流量速率，单位为比特每秒。</ArgTableRow>
<ArgTableRow arg="rx" typ="num">接口从 `src-address` 接收的流量速率，单位为比特每秒。</ArgTableRow>
<ArgTableRow arg="tx-packets" typ="num">接口每秒发往 `src-address` 的数据包数。</ArgTableRow>
<ArgTableRow arg="rx-packets" typ="num">接口每秒从 `src-address` 接收的数据包数。</ArgTableRow>
</ArgTable>
